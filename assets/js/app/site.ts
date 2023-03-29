/**
 * site.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { sentry } from '../analytics/sentry';

require('./../vendor/modernizr');
import { Params } from '../params';
import { Navigation } from '../components/nav';
import { Cursor } from '../animations/cursor';
import { Skew } from '../animations/skew';
import { FitText } from '../components/fit-text';
import { Card } from '../components/card';
import { Arrow } from '../animations/arrow';
import { Collapse, CollapseOptions } from '../components/collapse';
import { Log } from '../util/log';
import { IsTouchDevice } from '../util/css';
import { beforeAfter } from '../components/before-after';
import { bookmark } from '../components/bookmark';
import { buttonGoBack } from '../components/button';
import { copyToClipboard } from '../components/copy';
import { lazyImages } from '../components/image';
import { video } from '../components/video';
import { WebVitals } from '../analytics/web-vitals';
import { Animations } from '../animations/text';
import { Elements } from '../util/els';
import { Barba } from './barba';
import Scroll from './scroll';
import { aside } from '../animations/aside';
import { homeAnimation } from '../pages/home';
import { ITransitionData } from '@barba/core';
import anime from 'animejs/lib/anime.es';

/**
 * App is the main type for the site which bootstraps the
 * application and initialises types.
 */
class App {
	/**
	 * Determines if the app has already been booted.
	 *
	 * @private
	 */
	private booted = false;

	/**
	 * The page transition type.
	 *
	 * @private
	 */
	private barba: Barba;

	/**
	 * The navigation type used for determining if the nav
	 * is open and playing animations.
	 *
	 * @private
	 */
	private nav: Navigation;

	/**
	 * The cursor type used for destroy and initialising
	 * cursor animations.
	 *
	 * @private
	 */
	private cursor: Cursor;

	/**
	 * Bootstraps the application.
	 */
	boot(): void {
		Log.debug('Booting ainsley.dev JS');
		Log.debug('JS Params', Params);

		// Instantiate JS
		this.removeJSClasses();

		// Hooks
		if (!this.booted) {
			this.once();
		}

		// Classes
		this.cursor = new Cursor();
		new Skew();
		new FitText();
		new Card();
		new Arrow();
		new Collapse({
			accordion: true,
			container: '.accordion',
			item: '.accordion-item',
			inner: '.accordion-content',
			activeClass: 'accordion-item-active',
		} as CollapseOptions);

		// Prevent the page from refreshing if it's the same URL.
		this.preventInternalLinks();

		// Functions
		beforeAfter();
		bookmark();
		buttonGoBack();
		copyToClipboard();
		lazyImages();
		video();
		aside();

		// Animations
		this.initAnimations();

		// Analytics
		sentry();
		this.webVitals();
	}

	/**
	 * Obtains the Barba namespace.
	 */
	public nameSpace(): string {
		return document.querySelector('.barba-container').getAttribute('data-barba-namespace');
	}

	/**
	 * Initialises types only once (singletons).
	 *
	 * @private
	 */
	private once(): void {
		this.barba = new Barba();
		this.nav = new Navigation();
		this.barba.init(this.nav);
		this.before();
		this.beforeEnter();
		this.after();
		this.mouseMoveHandler();
		this.booted = true;
	}

	/**
	 * Removes/adds the no Javascript classes from
	 * the HTML element.
	 *
	 * @private
	 */
	private removeJSClasses(): void {
		Elements.HTML.classList.remove('no-js');
		Elements.HTML.classList.add('js');
	}

	/**
	 * Initialises the global animations. If the navigational
	 * element is currently animating, a delay will be applied.
	 *
	 * @private
	 */
	private initAnimations(): void {
		const animations = new Animations(),
			timeout = this.nav.duration() / 2 - 350;
		setTimeout(() => animations.play(), this.nav.isAnimating ? timeout : 0);

		if (this.nameSpace() === 'home') {
			homeAnimation();
		}
	}

	/**
	 * Before Enter Hook - Before enter transition/view
	 *
	 * @private
	 * @see https://barba.js.org/docs/advanced/hooks/
	 */
	private beforeEnter(): void {
		this.barba.hooks.beforeEnter((data: ITransitionData) => {
			Scroll.destroy();
			this.reloadJS(data.next.container);
			if (!this.hasSmoothScroll()) {
				// Prevent reflow when changing page.
				setTimeout(() => {
					Elements.HTML.style.scrollBehavior = 'smooth';
				}, 200);
			}
		});
	}

	/**
	 * Before Hook - Before everything
	 *
	 * @private
	 * @see https://barba.js.org/docs/advanced/hooks/
	 */
	private before(): void {
		this.barba.hooks.before((data: ITransitionData) => {
			this.updateHeader(data.next.container);
			if (this.nav.isOpen) {
				this.nav.play();
			}
			if (!this.hasSmoothScroll()) {
				Elements.HTML.style.scrollBehavior = 'initial';
			}
			anime({
				targets: ['.header'],
				opacity: [1, 0],
				duration: 500,
				easing: 'linear',
			});
			this.cursor.destroy();
		});
	}

	/**
	 * After Hook - After everything.
	 *
	 * @private
	 * @see https://barba.js.org/docs/advanced/hooks/
	 */
	private after(): void {
		this.barba.hooks.after((data: ITransitionData) => {
			Elements.HTML.scrollTop = 0;
			Elements.Body.scrollTop = 0;
			data.next.container.scrollTop = 0;
			Scroll.init(data.next.container);
			this.triggerPageView();
			this.boot();
			anime({
				targets: ['.header'],
				opacity: [0, 1],
				duration: 1000,
				delay: 500,
				easing: 'linear',
			});
		});
	}

	/**
	 * Triggers Web Vitals report & API call.
	 *
	 * @private
	 */
	private webVitals(): void {
		WebVitals({
			enable: Params.isProduction,
			analyticsId: Params.vercelAnalyticsID,
			debug: Params.appDebug,
		});
	}

	/**
	 * Prevents reloading of the page if the link clicked
	 * is the current URL, to avoid the page
	 * reloading.
	 *
	 * @private
	 */
	private preventInternalLinks(): void {
		document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
			link.addEventListener('click', (e: Event) => {
				const link = e.currentTarget as HTMLAnchorElement;
				if (link.href === window.location.href && this.nav.isOpen) {
					e.preventDefault();
					e.stopPropagation();
					this.nav.play();
				}
			});
		});
	}

	/**
	 * Finds all scripts within the next container and
	 * appends them to ensure JS is loaded after
	 * a page transition.
	 *
	 * @param container
	 * @private
	 */
	private reloadJS(container: HTMLElement): void {
		const js = container.querySelectorAll('script');
		js.forEach((item: HTMLScriptElement) => {
			if (item.src.includes('app')) {
				return;
			}
			const script = document.createElement('script');
			script.src = item.src;
			container.appendChild(script);
		});
	}

	/**
	 * Required, updates the header with the theme colour.
	 *
	 * @private
	 */
	private updateHeader(container: HTMLElement): void {
		const colour = container.querySelector('main').getAttribute('data-theme'),
			header = Elements.Header;
		header.classList.forEach((c) => {
			if (c.startsWith('header-colour')) {
				header.classList.remove(c);
			}
		});
		header.classList.add(`header-colour-${colour}`);
	}

	/**
	 * Triggers a page view dynamically with Plausible.
	 *
	 * @private
	 */
	private triggerPageView(): void {
		if (typeof window.plausible === 'function') {
			Log.debug('Triggering Plausible page-view');
			window.plausible('pageview');
		}
	}

	/**
	 * Updates the client mouse positions to the html element.
	 *
	 * @private
	 */
	private mouseMoveHandler(): void {
		const html = Elements.HTML;
		document.addEventListener('mousemove', (e) => {
			html.setAttribute('client-x', e.clientX.toString());
			html.setAttribute('client-y', e.clientY.toString());
			html.setAttribute('x', e.x.toString());
			html.setAttribute('y', e.y.toString());
			html.setAttribute('percent-x', ((e.x / window.innerWidth) * 100).toString());
			html.setAttribute('percent-y', ((e.y / window.innerHeight) * 100).toString());
		});
	}

	/**
	 * Determines if smooth scroll is enabled.
	 *
	 * @private
	 */
	private hasSmoothScroll(): boolean {
		return !IsTouchDevice();
	}
}

// Exports a new singleton scroll instance, only one instance should be created.
export default new App();
