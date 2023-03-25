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
 * Home hero animation for 3d asset.
 */
export const homeAnimation = () => {
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
			easing: 'easeInSine',
		})
		.add(
			{
				targets: wrapper,
				filter: ['grayscale(100%)', 'grayscale(0%)'],
				duration: 3000,
			},
			0,
		)
		.add(
			{
				targets: wrapper,
				opacity: [0.4, 1],
				duration: 3000,
			},
			0,
		);

	const newTL = anime
		.timeline({
			autoplay: false,
		})
		.add(
			{
				targets: '.home-show-reel img',
				rotateY: [-90, 0],
				scale: [0, 1],
				easing: 'linear',
				duration: 10000,
			},
			'-=10000',
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
