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
import { RemoveBRs } from '../type/util';
import SplitType from 'split-type';
import anime from 'animejs/lib/anime.es';
import { calculateArrowAngles } from './arrow';
import { AnimeParams, AnimeTimelineInstance } from 'animejs';

/**
 * Playable is the type that defines the callback to
 * play an animation.
 */
type Playable = () => void;

/**
 * Animations are responsible for initialising and
 * playing site wide animations.
 */
export class Animations {
	/**
	 * Playables defines the array of animatable instances.
	 */
	private playables: Playable[] = [];

	/**
	 * Creates a new Animation instance and sets up the CSS properties.
	 * E.g. set opacity to 0
	 */
	constructor() {
		this.playables.push(hero());
		this.playables.push(...heroLogos());
		this.playables.push(...line());
		this.playables.push(...up());
		this.playables.push(...fade());
	}

	/**
	 * Plays the animations.
	 */
	play(): void {
		this.playables.forEach((play) => {
			if (play) {
				play();
			}
		});
	}
}

/**
 * Retrieves the delay for an animation element.
 *
 * @param el
 */
const getDelay = (el: Element) =>
	el.hasAttribute('data-animate-delay') ? parseInt(el.getAttribute('data-animate-delay')) : 0;

/**
 * Retrieves the duration for an animation element.
 *
 * @param el
 */
const getDuration = (el: Element) =>
	el.hasAttribute('data-animate-duration') ? parseInt(el.getAttribute('data-animate-duration')) : 1500;

/**
 * Determines if the animation should be disabled for touch devices.
 *
 * @param el
 */
const getDisableTouch = (el: Element) => {
	return el.hasAttribute('data-animate-no-touch') && IsTouchDevice();
};

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
		underline.innerHTML += `<span class='underline'>`;
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
const hero = (): Playable => {
	const wrapper = document.querySelector('.hero-animate'),
		heading = document.querySelector('.hero-animate h1');
	if (!wrapper || !heading) {
		return;
	}


	// Ensure there is a space between the br elements when minified.
	heading.innerHTML = heading.innerHTML.replace(/<br.*?>/gi, re =>re + `&nbsp;`);
	heading.innerHTML = heading.innerHTML.replace(/<\/u>/, re =>re + `&nbsp;`);

	const text = new SplitType(heading as HTMLElement, { types: 'chars, words' });

	addUnderline(heading);
	addMark(text.chars);

	const els = Array.from(heading.querySelectorAll('.char, .mark, .underline')),
		markIndex = [...els].indexOf(heading.querySelector('.mark')),
		lineIndex = [...els].indexOf(heading.querySelector('.underline'));

	anime.set(heading.querySelectorAll('.word'), { opacity: 1 });
	anime.set(heading.querySelectorAll('.char'), { opacity: 0 });
	anime.set(heading.querySelectorAll('.hero .arrow-hover'), { opacity: 0 });
	const timeline = anime
		.timeline({
			// complete: () => text.revert(),
			autoplay: false,
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
		.add({
			targets: heading.querySelectorAll('.mark'),
			scale: [3.6, 1],
			opacity: [0, 1],
			rotateZ: [45, 0],
			easing: 'easeInOutExpo',
			duration: 1000,
		}, 300 + 50 * markIndex)
		.add({
			targets: heading.querySelectorAll('.underline'),
			opacity: [0.5, 1],
			scaleX: [0, 1],
			easing: 'easeInOutExpo',
			duration: 1000,
		}, 300 + 50 * lineIndex)
		.add({
			targets: wrapper.querySelector('.lead'),
			translateY: [50, 0],
			translateZ: 0,
			easing: 'easeOutExpo',
			opacity: [0, 1],
			duration: 1500,
		}, '-=900')

	const arrow = document.querySelector(".hero .arrow-hover");
	if (arrow) {
		const angles = calculateArrowAngles(arrow);
		timeline.add({
			targets: arrow,
			opacity: [0, 1],
			translateX: [angles.x, 0],
			translateY: [angles.y, 0],
			easing: 'easeOutExpo',
			duration: 1500,
		}, '-=1400')
	}

	return timeline.play
};

/**
 * Hero logo animation.
 */
const heroLogos = (): Playable[] => {
	const playables: Playable[] = [];
	document.querySelectorAll('.hero-logos figure').forEach((logo) => {
		anime.set(logo, { opacity: 0 });
		playables.push(() => {
			anime({
				targets: logo,
				translateY: [100, 0],
				opacity: [0, 1],
				delay: (el, i) => 60 * i,
				easing: 'easeOutExpo',
				duration: 1300,
			});
		});
	});
	return playables;
};

/**
 * Line animation for headings & lead texts.
 */
const line = (): Playable[] => {
	const playables: Playable[] = [];
	document.querySelectorAll('.animate-line').forEach((an) => {
		const heading = an.querySelector('.animate-line-heading'),
			lead = an.querySelector('.animate-line-lead');

		if (getDisableTouch(an)) {
			RemoveBRs(an);
			return;
		}

		if (!heading) {
			Log.error('Animate line does not exist TODO');
			return;
		}

		const text = new SplitType(heading as HTMLElement, { types: 'lines' });
		anime.set(lead, { opacity: 0 });
		playables.push(() => {
			WayPoint(heading, {
				rootMargin: '-100px',
				callback: () => {
					anime
						.timeline({
							complete: () => text.revert(),
							delay: getDelay(an),
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
	});
	return playables;
};

/**
 * A fade up animation with transform.
 */
const up = (): Playable[] => {
	const playables: Playable[] = [];
	document.querySelectorAll('.animate-up').forEach((an) => {
		if (getDisableTouch(an)) {
			return;
		}
		anime.set(an, { opacity: 0 });
		const props = {
			opacity: [0, 1],
			translateY: [100, 0],
		} as AnimeParams;

		if (an.classList.contains("animate-fade-desk") && window.innerWidth > 1024) {
			delete props.translateY;
		}

		playables.push(() => {
			WayPoint(an, {
				rootMargin: window.innerWidth > 1024 ? '-200px' : '-50px',
				callback: (el: Element) => {
					anime({
						targets: el,
						...props,
						easing: 'easeOutExpo',
						duration: getDuration(el),
						delay: getDelay(el),
					});
				},
			});
		});
	});
	return playables;
};

/**
 * A simple fade animation.
 */
const fade = (): Playable[] => {
	const playables: Playable[] = [];
	document.querySelectorAll('.animate-fade').forEach((an) => {
		if (getDisableTouch(an)) {
			return;
		}
		anime.set(an, { opacity: 0 });
		playables.push(() => {
			WayPoint(an, {
				rootMargin: '-100px',
				callback: (el: Element) => {
					anime({
						targets: el,
						opacity: [0, 1],
						easing: 'easeOutExpo',
						duration: getDuration(el),
						delay: getDelay(el),
					});
				},
			});
		});
	});
	return playables;
};
