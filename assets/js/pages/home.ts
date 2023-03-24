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

const wrapper = <HTMLElement>document.querySelector(".svg-scroll"),
	svg = <HTMLElement>document.querySelector(".svg-scroll svg");

const amount = 3000;

const scrollTimeline = anime
	.timeline({
		autoplay: false,
		duration: 10000,
		easing: "linear",
	})
	.add({
		targets: svg,
		translateZ: [0, 2700],
		duration: 10000,
	})
	.add({
		targets: wrapper,
		filter: ["grayscale(100%)", "grayscale(0%)"],
		duration: 3000,
	}, 0)
	.add({
		targets: wrapper,
		opacity: [0.4, 1],
		duration: 3000,
	}, 0)

Scroll.onScroll((y: number) => {
	const percent = y / (amount - Elements.HTML.clientHeight) * 100;
	scrollTimeline.seek(scrollTimeline.duration * (percent * 0.01));
});

anime({
	targets: wrapper,
	opacity: [0, 0.4],
	duration: 2000,
	easing: "linear",
})
