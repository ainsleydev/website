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
import {Barba } from './barba';
import Scroll from './scroll';
import { ITransitionData } from '@barba/core';

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
	private cursor: Cursor

	private barba: Barba

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
			this.barba.init();
			this.before();
			this.beforeEnter();
			this.after();
			this.hooksAdded = true;
		}

		// Classes
		new Navigation();
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
		animationHero();
		animationHeroLogos();
		animationLine();
		animationUp();
		animationFade();

		// Analytics
		this.webVitals();
	}

	/**
	 *
	 * @private
	 */
	private removeJSClasses(): void {
		Elements.HTML.classList.remove('no-js');
		Elements.HTML.classList.add('js');
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
			this.reloadJS(data.next.container);
		});
	}

	/**
	 *
	 * @private
	 */
	private before(): void {
		this.barba.hooks.before(() => {
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
			if (item.src.includes("app")) {
				return;
			}
			const script = document.createElement("script");
			script.src = item.src;
			container.appendChild(script);
		});
	}
}

export default new App();
