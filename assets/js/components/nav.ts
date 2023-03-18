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
 * Log is responsible for logging to the stdout
 * within the website.
 */
export class Navigation {
	/**
	 * The navigational HTML element.
	 */
	private nav: HTMLElement = Elements.Nav;

	/**
	 * The toggle to display the navigation element.
	 */
	private readonly button: HTMLElement;

	public isOpen = false;

	public isAnimating = false;

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
		Log.debug('Nav - Initialising');
		this.nav.classList.add('nav-js');
		this.button = (<HTMLElement>document.querySelector('.nav-btn')) as HTMLElement;
		if (!this.button) {
			Log.error('Nav - No navigation button found, .nav-btn');
			return;
		}
		this.setTimeline();
		this.timeline.reverse();
		this.attachClick();
		this.pictureHover();
	}

	/**
	 * Plays the animation. If the nav is open, the timeline
	 * will be reversed and visa-versa.
	 */
	public play(): void {
		this.isAnimating = true;
		this.isOpen = this.timeline.reversed;
		this.toggleClasses();
		this.animateButton();
		this.timeline.reverse();
		this.timeline.play();
	}

	/**
	 * Attaches the click handler to the nav button.
	 *
	 * @private
	 */
	private attachClick(): void {
		this.button.addEventListener('click', (e) => {
			e.preventDefault();
			this.play();
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
				targets: Elements.Header.querySelector('.nav-btn-arrow'),
				translateY: [0, '-100%'],
				translateX: [0, '100%'],
				opacity: [1, 0],
				duration: 600,
				easing: 'easeOutExpo',
			})
			.add(
				{
					targets: Elements.Header.querySelector('.nav-btn-text-menu'),
					scaleY: [1, 0],
					duration: 400,
					easing: 'easeOutExpo',
				},
				0,
			)
			.add(
				{
					targets: Elements.Header.querySelector('.nav-btn-text-close'),
					scaleY: [0, 1],
					duration: 400,
					easing: 'easeOutExpo',
				},
				'-=300',
			);
	}

	/**
	 * Adds active classes to the Navigation & Header elements when
	 * the nav button is clicked.
	 *
	 * @private
	 */
	private toggleClasses(): void {
		if (this.isOpen) {
			this.nav.classList.add('nav-active');
			Elements.Header.classList.add('header-nav-active');
			return;
		}
		this.nav.classList.remove('nav-active');
		Elements.Header.classList.remove('header-nav-active');
	}

	/**
	 * Picture Hover
	 * Adds the active class to the navigation
	 * pictures when the user hovers over them.
	 *
	 * @private
	 */
	private pictureHover(): void {
		const links = this.nav.querySelectorAll('[data-nav-image]');
		links.forEach((link) => {
			// Mouse over handler.
			link.addEventListener('mouseover', () => {
				const selector = link.getAttribute('data-nav-image');
				if (!selector) {
					Log.warn('Nav - No data-nav-image attribute found for link: ' + link);
					return;
				}
				const image = document.querySelector(selector.toString());
				if (!image) {
					Log.warn('Nav - No image found with the attribute: ' + selector.toString());
					return;
				}
				image.classList.add('nav-images-item-active');
			});

			// Mouse out handler.
			link.addEventListener('mouseout', () => {
				document.querySelectorAll('.nav-images-item-active').forEach((image) => {
					image.classList.remove('nav-images-item-active');
				});
			});
		});
	}
}
