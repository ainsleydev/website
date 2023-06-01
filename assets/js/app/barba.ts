/**
 * barba.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Params } from '../params';
import { Navigation } from '../components/nav';
import { Elements } from '../util/els';
import anime from 'animejs/lib/anime.es';
import barba, { HookMethods, ITransitionData, RequestErrorOrResponse } from '@barba/core';
import { ITransitionPage } from '@barba/core/dist/core/src/defs';

const excludedPaths = [
	{ path: 'insights', length: 2 },
	{ path: 'privacy', length: 1 },
	{ path: 'terms', length: 1 },
	{ path: 'cookies', length: 1 },
];

/**
 * Barba is responsible for mounting the LocoNative scroll
 * client for the site.
 */
export class Barba {
	/**
	 * Alias for the Barba hooks.
	 */
	public hooks: HookMethods;

	/**
	 * Navigation used to determine if the navigation
	 * is currently open.
	 *
	 * @private
	 */
	private nav: Navigation;

	/**
	 * Initialises the page transitions.
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
			timeout: 5000,
			requestError: (trigger, action, url, response: RequestErrorOrResponse) => {
				// Go to a custom 404 page if the user click on a link that return a 404 response status
				if (action === 'click' && 'status' in response && response.status && response.status === 404) {
					// barba.go('/404/');
				}
				// Prevent Barba from redirecting the user to the requested URL
				// this is equivalent to e.preventDefault() in this context
				return false;
			},
			transitions: [this.defaultTransition(), this.insightsTransition(), this.portfolioTransition()],
			prevent: (data) => {
				return this.isExcluded(data.href) || this.isExcluded(window.location.href);
			},
		});
		window.barba = barba;
	}

	/**
	 * Determines if a page is prevented from using Barba.
	 *
	 * @param href
	 */
	private isExcluded = (href: string): boolean => {
		let excluded = false;
		excludedPaths.some((exclude) => {
			const pathname = new URL(href).pathname,
				paths = pathname.split('/').filter((el) => el != '');
			if (!paths.includes(exclude.path)) {
				return false;
			}
			if (exclude.length === 1) {
				excluded = true;
				return true;
			}
			if (paths.length >= exclude.length) {
				excluded = true;
				return true;
			}
		});
		return excluded;
	};

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
				const timeline = anime
					.timeline()
					.add({
						targets: Elements.Body,
						background: '#0A0A0A',
						duration: 500,
						easing: 'linear',
					})
					.add(
						{
							targets: data.current.container,
							opacity: 0,
							duration: 500,
							easing: 'linear',
						},
						0,
					);
				if (!self.nav.isAnimating) {
					timeline
						.add({
							targets: '.transition-logo',
							opacity: [0, 1],
							duration: 300,
							easing: 'linear',
						})
						.add(
							{
								targets: '.transition-logo',
								translateY: [-200, 200],
								duration: 1000,
								easing: 'easeOutInCirc',
							},
							'-=300',
						)
						.add(
							{
								targets: '.transition-logo',
								opacity: [1, 0],
								duration: 300,
								easing: 'linear',
							},
							'-=300',
						);
				}
				return timeline.finished;
			},
			enter(data: ITransitionData) {
				anime({
					targets: data.next.container,
					opacity: [0, 1],
					easing: 'linear',
					duration: 750,
				});
			},
		};
	}

	/**
	 * White insights transition.
	 *
	 * @private
	 */
	private insightsTransition(): ITransitionPage {
		return {
			name: 'insights-transition',
			to: {
				namespace: [
					// 'page-insights',
					'section-insights',
					// 'page-legal'
				],
			},
			leave(data: ITransitionData): Promise<unknown> | void {
				return anime
					.timeline()
					.add({
						targets: Elements.Body,
						background: '#fff',
						duration: 500,
						easing: 'linear',
					})
					.add(
						{
							targets: data.current.container,
							opacity: 0,
							duration: 500,
							easing: 'linear',
						},
						0,
					).finished;
			},
			enter(data: ITransitionData) {
				anime({
					targets: data.next.container,
					opacity: [0, 1],
					easing: 'linear',
					duration: 750,
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
				namespace: ['home', 'section-portfolio', 'contact'],
			},
			to: {
				namespace: ['page-portfolio', 'thankyou'],
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
						clipPath: `circle(${110}% at ${cord.x}% ${cord.y}%)`,
						duration: 1000,
						easing: 'easeInSine',
					})
					.add(
						{
							targets: '.cursor-circle-black',
							clipPath: `circle(${110}% at ${cord.x}% ${cord.y}%)`,
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
					targets: '.header',
					opacity: [0, 1],
					duration: 600,
					easing: 'linear',
				});
			},
			after() {
				anime.set('.cursor-circle', { display: 'none' });
			},
		};
	}
}
