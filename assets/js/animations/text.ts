/**
 * text.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import anime from 'animejs/lib/anime.es';

const textWrapper = document.querySelector('h1');
if (textWrapper && textWrapper.textContent) {
	textWrapper.innerHTML = textWrapper.innerHTML.replace(/(?![^<]*>)[^<]/g, (c) => {
		if (c == ' ') {
			return c;
		}
		if (c == '*') {
			return `<span class="mark">${c}</span>`;
		}
		return `<span class="letter">${c}</span>`;
	});
	textWrapper.querySelector('u').innerHTML += `<span class="underline">`;
}

anime.set('h1', { opacity: 1 });

// const test = anime.timeline()
// 	.add({
// 		targets: 'h1 .letter',
// 		translateY: [100,0],
// 		translateZ: 0,
// 		opacity: [0,1],
// 		easing: "easeOutExpo",
// 		duration: 1400,
// 		delay: (el, i) => 300 + 50 * i,
// 	})
// 	.add({
// 		targets: 'h1 .mark',
// 		scale: [3.6, 1],
// 		opacity: [0, 1],
// 		rotateZ: [45, 0],
// 		easing: "easeInOutExpo",
// 		duration: 1000,
// 	})
// 	.add({
// 		targets: ".underline",
// 		opacity: [0.5,1],
// 		scaleX: [0, 1],
// 		easing: "easeInOutExpo",
// 		duration: 700
// 	}, '-=1200')
// 	.add({
// 		targets: ".lead",
// 		translateY: [100,0],
// 		translateZ: 0,
// 		easing: "easeOutExpo",
// 		opacity: [0,1],
// 	}, "-=1000")

const timeline = anime.timeline({
	autoplay: false,
});
textWrapper.querySelectorAll('.letter, .mark').forEach((child, index) => {
	const delay = index * 50;
	if (child.classList.contains('letter')) {
		timeline.add(
			{
				targets: child,
				translateY: [100, 0],
				translateZ: 0,
				opacity: [0, 1],
				easing: 'easeOutExpo',
			},
			delay,
		);
	} else if (child.classList.contains('mark')) {
		timeline.add(
			{
				targets: 'h1 .mark',
				scale: [3.6, 1],
				opacity: [0, 1],
				rotateZ: [45, 0],
				easing: 'easeInOutExpo',
			},
			delay,
		);
	}
});
timeline.play();
