/**
 * site.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */



import { it } from 'node:test';

require('./../vendor/modernizr');
import { Navigation } from '../components/nav';
import { Cursor } from '../animations/cursor';
import { Skew } from '../animations/skew';
import { FitText } from '../components/fit-text';
import { Card } from '../components/card';
import { Arrow } from '../animations/arrow';
import { Collapse, CollapseOptions } from '../components/accordion';
import { Log } from '../util/log';
import { Params } from '../params';
import { beforeAfter } from '../components/before-after';
import { bookmark } from '../components/bookmark';
import { buttonGoBack } from '../components/button';
import { copyToClipboard } from '../components/copy';
import { lazyImages } from '../components/image';
import { video } from '../components/video';
import { WebVitals } from '../analytics/web-vitals';
import { animationLine, animationFade, animationHero, animationHeroLogos, animationUp } from '../animations/text';
import { Elements } from '../util/els';
import Scroll from './scroll';
import Barba from './barba';
import barba, { ITransitionData } from '@barba/core';

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
			Barba.init();
			this.barbaBefore();
			this.barbaBeforeEnter();
			this.barbaAfter();
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
	private barbaAfter(): void {
		barba.hooks.after((data: ITransitionData) => {
			// this.cursor.destroy();
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
	private barbaBeforeEnter(): void {
		barba.hooks.beforeEnter((data: ITransitionData) => {
			this.reloadJS(data.next.container);
		});
	}

	/**
	 *
	 * @private
	 */
	private barbaBefore(): void {
		barba.hooks.before((data: ITransitionData) => {
			this.cursor.destroy();
		});
	}

	/**
	 *
	 * @param container
	 * @private
	 */
	private reloadJS(container: HTMLElement): void {
		let js = container.querySelectorAll('script');
		js.forEach((item: HTMLScriptElement) => {
			if (item.src.includes("app")) {
				return;
			}
			const script = document.createElement("script")
			script.src = item.src;
			container.appendChild(script)
		});
	}
}

export default new App();
