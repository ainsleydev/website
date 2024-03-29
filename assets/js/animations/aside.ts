/**
 * aside.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 *
 * @remarks
 * Adds an Anime.js animation to the aside label.
 */

import anime from 'animejs/lib/anime.es';

/**
 * Aside - Adds anime JS animation to the aside label.
 */
export const aside = (): void => {
	const check = <HTMLInputElement>document.querySelector('.aside-checkbox');
	if (check) {
		check.addEventListener('change', () => {
			const open = check.checked;
			anime({
				targets: '.aside',
				translateX: open ? ['-100%', 0] : [0, '-100%'],
				duration: 500,
				easing: 'easeOutExpo',
			});
		});
	}
};
