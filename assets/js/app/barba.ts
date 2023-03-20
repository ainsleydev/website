/**
 * barba.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import Scroll from './scroll';
import { Params } from '../params';
import barba, { HookMethods, ITransitionData } from '@barba/core';
import anime from 'animejs/lib/anime.es';
import { Elements } from '../util/els';
import { Transitions } from '@barba/core/dist/core/src/modules/Transitions';
import { ITransitionPage } from '@barba/core/dist/core/src/defs';
import { Navigation } from '../components/nav';

/**
 *
 */
export class Barba {
	/**
	 * Alias for the Barba hooks.
	 */
	public hooks: HookMethods;

	private nav: Navigation;

	/**
	 *
	 */
	constructor() {
		this.hooks = barba.hooks;
	}

	/**
	 * Initialises Barba & page transitions.
	 */
	init(nav: Navigation) {
		this.nav = nav;
		barba.init({
			debug: Params.appDebug,
			// timeout: 5000,
			transitions: [this.defaultTransition(), this.portfolioTransition()],
		});
	}

	/**
	 * The default page transition.
	 *
	 * @private
	 */
	private defaultTransition(): ITransitionPage {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		return {
			name: 'opacity-transition',
			leave(data: ITransitionData): Promise<unknown> | void {
				return anime({
					targets: data.current.container,
					opacity: 0,
					duration: 500,
					easing: 'linear',
				}).finished;
				if (!self.nav.isOpen) {
					// This is always false as nav gets triggered before.
					// timeline
					// 	.add({
					// 		targets: ".transition-logo",
					// 		opacity: [0, 1],
					// 		duration: 300,
					// 		easing: "linear",
					// 	})
					// 	.add({
					// 		targets: ".transition-logo",
					// 		translateY: [-200, 200],
					// 		duration: 1000,
					// 		easing: "easeOutInCirc",
					// 	}, "-=300")
					// 	.add({
					// 		targets: ".transition-logo",
					// 		opacity: [1, 0],
					// 		duration: 300,
					// 		easing: "linear",
					// 	}, "-=300")
				}
				// return timeline.finished;
			},
			enter(data: ITransitionData) {
				anime({
					targets: data.next.container,
					opacity: [0, 1],
					easing: 'linear',
					duration: 500,
				});
			},
		};
	}

	/**
	 * Portfolio circle transition.
	 *
	 * @private
	 */
	private portfolioTransition(): ITransitionPage {
		return {
			name: 'portfolio-card',
			from: {
				namespace: ['home', 'section-portfolio'],
			},
			to: {
				namespace: ['page-portfolio'],
			},
			leave(data: ITransitionData): Promise<unknown> | void {
				const cord = {
					x: parseInt(Elements.HTML.getAttribute('percent-x')),
					y: parseInt(Elements.HTML.getAttribute('percent-y')),
				};
				anime.set('.cursor-circle', {
					clipPath: `circle(${0}% at ${cord.x}% ${cord.y}%)`,
					display: 'block',
					opacity: 1,
				});
				return anime
					.timeline()
					.add({
						targets: '.cursor-circle-white',
						clipPath: `circle(${100}% at ${cord.x}% ${cord.y}%)`,
						duration: 1000,
						easing: 'easeInSine',
					})
					.add(
						{
							targets: '.cursor-circle-black',
							clipPath: `circle(${100}% at ${cord.x}% ${cord.y}%)`,
							duration: 1000,
							delay: 400,
							easing: 'easeInSine',
						},
						0,
					)
					.add(
						{
							targets: data.next.container,
							opacity: [0, 1],
							easing: 'linear',
							duration: 500,
							delay: 200,
						},
						0,
					).finished;
			},
			enter(data: ITransitionData) {
				anime({
					targets: data.next.container,
					opacity: [0, 1],
					easing: 'linear',
					duration: 500,
				});
				anime({
					targets: '.cursor-circle',
					opacity: [1, 0],
					duration: 600,
					easing: 'easeOutExpo',
				});
				anime({
					targets: ".header",
					opacity: [0, 1],
					duration: 600,
					easing: 'linear',
				})
			},
			after() {
				anime.set('.cursor-circle', { display: 'none' });
			},
		};
	}
}
