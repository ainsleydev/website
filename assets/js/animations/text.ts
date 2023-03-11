/**
 * text.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import anime from 'animejs/lib/anime.es';

const textWrapper = document.querySelector('.text-animate');
if (textWrapper) {
	// TODO, strings.Trim whitespace around text.
	textWrapper.innerHTML = textWrapper.innerHTML.replace(/(?![^<]*>)[^<]/g, (c) => {
		if (c == ' ') {
			return c;
		}
		if (c == '*') {
			return `<span class="text-animate-mark">${c}</span>`;
		}
		return `<span class="text-animate-letter">${c}</span>`;
	});
	const underline = textWrapper.querySelector('u');
	if (underline) {
		underline.innerHTML += `<span class="text-animate-underline">`;
	}

	anime.set('h1', { opacity: 1 });

	const els = textWrapper.querySelectorAll('.text-animate-mark, .text-animate-letter, .text-animate-underline');
	const markIndex = [...els].indexOf(textWrapper.querySelector('.text-animate-mark')),
		lineIndex = [...els].indexOf(textWrapper.querySelector('.text-animate-underline'));

	// TODO, we can pass in the elements instead of the text string.
	anime
		.timeline()
		.add({
			targets: '.text-animate-letter',
			translateY: [100, 0],
			translateZ: 0,
			opacity: [0, 1],
			easing: 'easeOutExpo',
			duration: 1400,
			delay: (el, i) => 300 + 50 * i,
		})
		.add(
			{
				targets: '.text-animate-mark',
				scale: [3.6, 1],
				opacity: [0, 1],
				rotateZ: [45, 0],
				easing: 'easeInOutExpo',
				duration: 1000,
			},
			300 + 50 * markIndex,
		)
		.add(
			{
				targets: '.text-animate-underline',
				opacity: [0.5, 1],
				scaleX: [0, 1],
				easing: 'easeInOutExpo',
				duration: 1000,
			},
			250 + 50 * lineIndex,
		)
		.add(
			{
				targets: '.text-animate-lead',
				translateY: [50, 0],
				translateZ: 0,
				easing: 'easeOutExpo',
				opacity: [0, 1],
				duration: 1500,
			},
			'-=900',
		)
		.play();
}
