/**
 * contact.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import Scroll from '../app/scroll';
import anime from 'animejs/lib/anime.es';
import { Elements } from '../util/els';

/**
 * Home hero animation for 3D asset and show-reel.
 */
export const homeAnimation = (): void => {
	const hero = <HTMLElement>document.querySelector('.home-hero-wrapper'),
		wrapper = <HTMLElement>document.querySelector('.home-three-d'),
		svg = <HTMLElement>document.querySelector('.home-three-d svg'),
		height = hero.getBoundingClientRect().height,
		offset = 500;

	const scrollTimeline = anime
		.timeline({
			autoplay: false,
			duration: 15000,
			easing: 'linear',
		})
		.add({
			targets: svg,
			translateZ: [0, 2700],
			duration: 10000,
		})
		.add(
			{
				targets: wrapper,
				filter: ['grayscale(100%)', 'grayscale(0%)'],
				duration: 5000,
			},
			0,
		)
		.add(
			{
				targets: wrapper,
				opacity: [0.4, 1],
				duration: 2500,
			},
			0,
		)
		.add(
			{
				targets: '.home-show-reel-image img',
				rotateY: [-90, 0],
				duration: 9000,
				easing: 'easeInOutExpo',
			},
			2000,
		)
		.add(
			{
				targets: '.home-show-reel-image',
				scale: [0, 1],
				duration: 6000,
			},
			2000,
		)
		.add(
			{
				targets: '.home-show-reel-text',
				opacity: [0, 1],
				duration: 2000,
			},
			'-=4000',
		);

	Scroll.onScroll((y: number) => {
		const percent = (y / (height + offset - Elements.HTML.clientHeight)) * 100;
		scrollTimeline.seek(scrollTimeline.duration * (percent * 0.01));
	});

	anime({
		targets: wrapper,
		opacity: [0, 0.4],
		duration: 2000,
		easing: 'linear',
	});
};
