/**
 * nav.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Elements } from '../util/els';
import { Log } from '../util/log';
import anime from 'animejs/lib/anime.es';
import { AnimeTimelineInstance } from 'animejs';

/**
 * Navigation is responsible for adding animations to the
 * element when it is open and closed.
 */
export class Navigation {
	/**
	 * Determines if the navigation is currently open.
	 */
	public isOpen = false;

	/**
	 * Determines if the navigation is currently animating.
	 */
	public isAnimating = false;

	/**
	 * The navigational HTML element.
	 */
	private nav: HTMLElement = Elements.Nav;

	/**
	 * The toggle to display the navigation element.
	 */
	private readonly buttons: NodeList;

	/**
	 * The anime JS timeline that animates the navigational
	 * element.
	 *
	 * @private
	 */
	private timeline: AnimeTimelineInstance;

	/**
	 * Initialises the cursor element.
	 *
	 * @constructor
	 */
	constructor() {
		this.nav.classList.add('nav-js');
		this.buttons = document.querySelectorAll('.nav-btn');
		this.setTimeline();
		this.timeline.reverse();
		this.attachClick();
	}

	/**
	 * Plays the animation. If the nav is open, the timeline
	 * will be reversed and visa-versa.
	 */
	public play(): void {
		this.isAnimating = true;
		this.isOpen = this.timeline.reversed;
		this.animateButton();
		this.timeline.reverse();
		this.timeline.play();
	}

	/**
	 * Returns the duration of the navigation timeline.
	 */
	public duration(): number {
		return this.timeline.duration;
	}

	/**
	 * Attaches the click handler to the nav button.
	 *
	 * @private
	 */
	private attachClick(): void {
		this.buttons.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				this.play();
			});
		});
	}

	/**
	 * Instantiates the navigational timeline.
	 *
	 * @private
	 */
	private setTimeline(): void {
		this.timeline = anime
			.timeline({
				autoplay: false,
				begin: (anim) => {
					if (anim.direction === 'normal') {
						anime.set(this.nav, { display: 'flex' });
						return;
					}
				},
				complete: (anim) => {
					this.isAnimating = false;
					if (anim.direction === 'reverse') {
						anime.set(this.nav, { display: 'none' });
					}
				},
			})
			.add({
				targets: this.nav,
				opacity: [0, 1],
				duration: 500,
				easing: 'linear',
			})
			.add(
				{
					targets: this.nav.querySelector('.nav-contact'),
					opacity: [0, 1],
					easing: 'easeOutExpo',
					duration: 800,
				},
				'-=200',
			)
			.add(
				{
					targets: this.nav.querySelectorAll('.nav-item'),
					opacity: [0, 1],
					translateY: [100, 0],
					easing: 'easeOutExpo',
					delay: anime.stagger(150),
					duration: 800,
				},
				'-=800',
			);
	}

	/**
	 * Animates the hamburger.
	 *
	 * @private
	 */
	private animateButton(): void {
		anime
			.timeline({
				direction: this.isOpen ? 'normal' : 'reverse',
			})
			.add({
				targets: '.nav-btn-arrow',
				translateY: [0, '-100%'],
				translateX: [0, '100%'],
				opacity: [1, 0],
				duration: 600,
				easing: 'easeOutExpo',
			})
			.add(
				{
					targets: '.nav-btn-text-menu',
					scaleY: [1, 0],
					duration: 400,
					easing: 'easeOutExpo',
				},
				0,
			)
			.add({
				targets: Elements.Header.querySelector('.nav-btn-text-close'),
				scaleY: [0, 1],
				duration: 400,
				easing: 'easeOutExpo',
			});
	}
}
