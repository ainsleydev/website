/**
 * text.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { IsTouchDevice } from '../util/css';
import { Log } from '../util/log';
import { WayPoint } from './waypoint';
import SplitType from 'split-type';
import anime from 'animejs/lib/anime.es';
import { RemoveBRs } from '../type/util';

/**
 * Adds an `underline` span to an element if
 * the passed argument contains a <u> tag.
 *
 * @param el
 * @constructor
 */
const addUnderline = (el: Element): void => {
	const underline = el.querySelector('u');
	if (underline) {
		underline.innerHTML += `<span class="underline">`;
	}
};

/**
 * Adds a `mark` class to an asterisk within the
 * char elements.
 *
 * @param els
 */
const addMark = (els: HTMLElement[] | null): void => {
	if (!els) {
		return;
	}
	els.forEach((el) => {
		if (el.innerHTML === '*') {
			el.classList.add('mark');
			el.classList.remove('char');
		}
	});
};

/**
 * Hero Animation (H1 & Lead)
 */
export const animationHero = () => {
	const wrapper = document.querySelector('.hero-animate'),
		heading = document.querySelector('.hero-animate h1');
	if (!wrapper || !heading) {
		return;
	}
	const text = new SplitType(heading as HTMLElement, { types: 'chars' });

	addUnderline(heading);
	addMark(text.chars);

	const els = Array.from(heading.querySelectorAll('.char, .mark, .underline')),
		markIndex = [...els].indexOf(heading.querySelector('.mark')),
		lineIndex = [...els].indexOf(heading.querySelector('.underline'));

	anime
		.timeline({
			complete: () => text.revert(),
		})
		.add({
			targets: heading.querySelectorAll('.char'),
			translateY: [100, 0],
			translateZ: 0,
			opacity: [0, 1],
			easing: 'easeOutExpo',
			duration: 1400,
			delay: (el, i) => 300 + 50 * i,
		})
		.add(
			{
				targets: heading.querySelectorAll('.mark'),
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
				targets: heading.querySelectorAll('.underline'),
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


export const animationHeroLogos = (): void => {
	document.querySelectorAll(".hero-logos figure").forEach((logo, index) => {
		anime.set(logo, { opacity: 0 });
		anime({
			targets: logo,
			translateY: [100, 0],
			opacity: [0, 1],
			delay: (el, i) => 60 * index,
			easing: 'easeOutExpo',
			duration: 1300,
		});
	});
}

/**
 *
 */
export const animationLine = (): void => {
	document.querySelectorAll('.animate-line').forEach((an) => {
		const heading = an.querySelector('.animate-line-heading'),
			lead = an.querySelector('.animate-line-lead');

		if (IsTouchDevice()) {
			RemoveBRs(an);
			return;
		}

		if (!heading) {
			Log.error('Animate line does not exist TODO');
			return;
		}

		const text = new SplitType(heading as HTMLElement, { types: 'lines' });
		WayPoint(heading, {
			rootMargin: '-100px',
			callback: () => {
				anime
					.timeline({
						complete: () => text.revert(),
					})
					.add({
						targets: text.lines,
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
}


/**
 *
 */
export const animationUp = (): void => {
	document.querySelectorAll('.animate-up').forEach((an) => {
		anime.set(an, { opacity: 0 });
		WayPoint(an, {
			rootMargin: window.innerWidth > 1024 ? '-200px' : '-50px',
			callback: (el: Element) => {
				anime({
					targets: el,
					translateY: [100, 0],
					opacity: [0, 1],
					easing: 'easeOutExpo',
					duration: 1300,
					delay: el.hasAttribute('data-animate-delay') ? parseInt(el.getAttribute('data-animate-delay')) : 0,
				});
			},
		});
	});
}

/**
 *
 */
export const animationFade = (): void => {
	document.querySelectorAll('.animate-fade').forEach((an) => {
		anime.set(an, { opacity: 0 });
		WayPoint(an, {
			rootMargin: '-100px',
			callback: (el: Element) => {
				anime({
					targets: el,
					opacity: [0, 1],
					easing: 'easeOutExpo',
					duration: 1500,
					delay: el.hasAttribute('data-animate-delay') ? parseInt(el.getAttribute('data-animate-delay')) : 0,
				});
			},
		});
	});
}
