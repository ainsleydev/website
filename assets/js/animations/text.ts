/**
 * text.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import anime from 'animejs/lib/anime.es';

/**
 *
 * @param el
 */
const splitLetter = (el: Element): void => {
	el.innerHTML = el.innerHTML.trim().replace(/(?![^<]*>)[^<]/g, (c) => {
		if (c == ' ') {
			return c;
		}
		if (c == '*') {
			return `<span class="text-animate-mark">${c}</span>`;
		}
		return `<span class="text-animate-letter">${c}</span>`;
	});
};

/**
 *
 * @param el
 */
const splitWord = (el: Element): void => {
	el.innerHTML = el.innerHTML
		.trim()
		.split(' ')
		.map((word) => {
			return `<span class="text-animate-word">${word}</span>`;
		})
		.join(' ');
};

/**
 *
 * @param el
 */
const splitLine = (el: Element): void => {
	el.innerHTML = el.innerHTML
		.trim()
		.split('\n')
		.map((word) => {
			return `<span class="text-animate-line">${word}</span>`;
		})
		.join(' ');
};

const test = document.querySelector('#test');
if (test) {
	splitLine(test);
	//
	// test.querySelectorAll(".text-animate-line").forEach(line => {
	// 	splitWord(line);
	// });
}

const textWrapper = document.querySelector('.text-animate');
if (textWrapper) {
	splitLetter(textWrapper);
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

// Basic

document.querySelectorAll('.animate-fade').forEach((fade) => {
	anime.timeline().add({
		targets: fade,
		opacity: [0, 1],
		duration: 2400,
		easing: 'easeOutSine',
	});
});

// scrollTrigger("#test", {
// 	rootMargin: '-100px',
// 	threshold: 0.2,
// 	cb: (el) => {
// 		anime.timeline()
// 			.add({
// 				targets: el.querySelectorAll(".text-animate-line"),
// 				translateY: [100, 0],
// 				opacity: [0, 1],
// 				easing: 'easeOutExpo',
// 				duration: 2000,
// 				delay: (el, i) => 300 + 100 * i,
// 			})
// 			.add({
// 				targets: document.querySelector("#test2"),
// 				translateY: [100, 0],
// 				opacity: [0, 1],
// 				easing: 'easeOutExpo',
// 				duration: 2000,
// 			}, '-=1600')
// 	}
// })
//
// scrollTrigger("#test3", {
// 	cb: (el) => {
// 		anime.timeline()
// 			.add({
// 				targets: el,
// 				opacity: [0, 1],
// 				easing: 'easeOutExpo',
// 				duration: 1300,
// 			})
// 	}
// })

// Example usages:
// scrollTrigger('.intro-text')
// scrollTrigger('.scroll-reveal', {
// 	rootMargin: '-200px',
// })
// scrollTrigger('.loader', {
// 	rootMargin: '-200px',
// 	cb: function(el){
// 		el.innerText = 'Loading...'
// 		setTimeout(() => {
// 			el.innerText = 'Task Complete!'
// 		}, 1000)
// 	}
// })
