/**
 * site.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

require('./../vendor/modernizr');
import { Params } from '../params';
import { Navigation } from '../components/nav';
import { Cursor } from '../animations/cursor';
import { Skew } from '../animations/skew';
import { FitText } from '../components/fit-text';
import { Card } from '../components/card';
import { Arrow } from '../animations/arrow';
import { Collapse, CollapseOptions } from '../components/accordion';
import { Log } from '../util/log';
import { beforeAfter } from '../components/before-after';
import { bookmark } from '../components/bookmark';
import { buttonGoBack } from '../components/button';
import { copyToClipboard } from '../components/copy';
import { lazyImages } from '../components/image';
import { video } from '../components/video';
import { WebVitals } from '../analytics/web-vitals';
import { animationLine, animationFade, animationHero, animationHeroLogos, animationUp } from '../animations/text';
import { Elements } from '../util/els';
import { Barba } from './barba';
import Scroll from './scroll';
import { ITransitionData } from '@barba/core';

/**
 *
 */
declare global {
	interface Window {
		plausible: (args: string) => unknown;
	}
}

type ThemeColour = 'black' | 'white';

/**
 *
 */
class App {
	/**
	 *
	 * @private
	 */
	private hooksAdded = false;

	/**
	 *
	 * @private
	 */
	private cursor: Cursor;

	/**
	 *
	 * @private
	 */
	private barba: Barba;

	private nav: Navigation;

	/**
	 *
	 */
	boot(): void {
		Log.debug('Booting ainsley.dev JS');
		Log.debug('JS Params', Params);

		// Instantiate JS
		this.removeJSClasses();

		// Hooks
		if (!this.hooksAdded) {
			this.barba = new Barba();
			this.nav = new Navigation();
			this.barba.init();
			this.before();
			this.beforeEnter();
			this.after();
			this.hooksAdded = true;
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

		// Functions
		beforeAfter();
		bookmark();
		buttonGoBack();
		copyToClipboard();
		lazyImages();
		video();

		// Animations
		this.initAnimations();

		// Analytics
		this.webVitals();
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
	 * Initialises the main pages animations. If the navigational
	 * element is currently animating, a delay will be applied.
	 *
	 * @private
	 */
	private initAnimations(): void {
		setTimeout(
			() => {
				animationHero();
				animationHeroLogos();
				animationLine();
				animationUp();
				animationFade();
			},
			this.nav.isAnimating ? 300 : 0,
		);
	}

	/**
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
	 *
	 * @private
	 */
	private after(): void {
		this.barba.hooks.after((data: ITransitionData) => {
			Elements.HTML.scrollTop = 0;
			Elements.Body.scrollTop = 0;
			Scroll.init(data.next.container);
			this.boot();
		});
	}

	/**
	 *
	 * @private
	 */
	private beforeEnter(): void {
		this.barba.hooks.beforeEnter((data: ITransitionData) => {
			this.updateHeader(data.next.container);
			this.reloadJS(data.next.container);
		});
	}

	/**
	 *
	 * @private
	 */
	private before(): void {
		this.barba.hooks.before(() => {
			if (this.nav.isOpen) {
				this.nav.play();
			}
			this.cursor.destroy();
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
	 *
	 * @param container
	 * @private
	 */
	private updateHeader(container: HTMLElement): void {
		const header = Elements.Header,
			colour = this.getThemeColour(container);
		header.classList.forEach((c) => {
			if (c.startsWith('header-colour')) {
				header.classList.remove(c);
			}
		});
		header.classList.add(`header-colour-${colour}`);
		Elements.Nav.setAttribute('data-colour', colour);
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
	 * Returns the current page theme colour.
	 *
	 * @private
	 */
	private getThemeColour(container: HTMLElement): string {
		return <'black' | 'white'>container.querySelector('main').getAttribute('data-theme') ?? 'black';
	}
}

export default new App();
