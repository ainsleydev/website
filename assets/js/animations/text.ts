/**
 * text.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import anime from 'animejs/lib/anime.es';
import { WayPoint } from './waypoint';
import { AddUnderline, SplitLetter, SplitLine } from '../type/split';
import { Log } from '../util/log';

/**
 *
 */
const heroAnimation = () => {
	const wrapper = document.querySelector('.animate-hero'),
		heading = document.querySelector('.animate-hero h1');
	if (!wrapper || !heading) {
		return;
	}
	SplitLetter(heading);
	AddUnderline(heading);

	const els = Array.from(heading.querySelectorAll('.text-mark, .text-letter, .text-underline')),
		markIndex = [...els].indexOf(heading.querySelector('.text-mark')),
		lineIndex = [...els].indexOf(heading.querySelector('.text-underline'));

	anime
		.timeline()
		.add({
			targets: heading.querySelectorAll('.text-letter'),
			translateY: [100, 0],
			translateZ: 0,
			opacity: [0, 1],
			easing: 'easeOutExpo',
			duration: 1400,
			delay: (el, i) => 300 + 50 * i,
		})
		.add(
			{
				targets: heading.querySelectorAll('.text-mark'),
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
				targets: heading.querySelectorAll('.text-underline'),
				opacity: [0.5, 1],
				scaleX: [0, 1],
				easing: 'easeInOutExpo',
				duration: 1000,
			},
			300 + 50 * lineIndex,
		)
		.add(
			{
				targets: wrapper.querySelector('.lead'),
				translateY: [50, 0],
				translateZ: 0,
				easing: 'easeOutExpo',
				opacity: [0, 1],
				duration: 1500,
			},
			'-=900',
		);
};

heroAnimation();

/**
 *
 */
document.querySelectorAll('.animate-line').forEach((an) => {
	const heading = an.querySelector('.animate-line-heading'),
		lead = an.querySelector('.animate-line-lead');
	if (!heading || !lead) {
		Log.error('Animate line does not exist TODO');
		return;
	}
	SplitLine(heading);
	WayPoint(heading, {
		rootMargin: '-100px',
		callback: (el) => {
			anime
				.timeline()
				.add({
					// TODO, these classes should be enums.
					targets: el.querySelectorAll('.text-line'),
					translateY: [100, 0],
					opacity: [0, 1],
					easing: 'easeOutExpo',
					duration: 2000,
					delay: (el, i) => 300 + 100 * i,
				})
				.add(
					{
						targets: lead,
						translateY: [100, 0],
						opacity: [0, 1],
						easing: 'easeOutExpo',
						duration: 2000,
					},
					'-=1600',
				);
		},
	});
});

/**
 *
 */
document.querySelectorAll('.animate-up').forEach((an) => {
	anime.set(an, { opacity: 0 });
	WayPoint(an, {
		rootMargin: window.innerWidth > 1024 ? '-200px' : '0px',
		callback: (el: Element) => {
			anime.timeline().add({
				targets: el,
				translateY: [100, 0],
				opacity: [0, 1],
				easing: 'easeOutExpo',
				duration: 1300,
			});
		},
	});
});

/**
 *
 */
document.querySelectorAll('.animate-fade').forEach((an) => {
	anime.set(an, { opacity: 0 });
	WayPoint(an, {
		rootMargin: '-100px',
		callback: (el: Element) => {
			anime.timeline().add({
				targets: el,
				opacity: [0, 1],
				easing: 'easeOutExpo',
				duration: 1500,
			});
		},
	});
});
