/**
 * services-single.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import Glider from 'glider-js';
import { Log } from '../util/log';

const initGlider = () => {
	new Glider(document.querySelector('.glider'), {
		slidesToShow: 1.6,
		slidesToScroll: 1,
		duration: 0.1,
		draggable: true,
		responsive: [
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1.8,
					slidesToScroll: 1.8,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2.6,
					slidesToScroll: 2.6,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 'auto',
					slidesToScroll: 'auto',
					itemWidth: 370,
					exactWidth: true,
				},
			},
			{
				breakpoint: 1408,
				settings: {
					slidesToShow: 'auto',
					slidesToScroll: 'auto',
					itemWidth: 420,
					exactWidth: true,
				},
			},
		],
	});
};

/**
 * Set the width of the glider container to match the width of the container set.
 * It's a bit tricky to do this with CSS, so we're using JS to set the width.
 */
const container = document.querySelector<HTMLElement>('[data-container-set]'),
	gliderContainer = document.querySelector<HTMLElement>('.glider');

const setContainer = () => {
	if (!container || !gliderContainer) {
		Log.error('Container or glider container not found.');
		return;
	}
	const x = container.getBoundingClientRect().x + 15;
	gliderContainer.style.paddingLeft = x.toString() + 'px';
	// gliderContainer.style.width = `calc(100% - ${x}px)`;
};

/**
 * Apply everything on load otherwise it buggers things up.
 */
window.addEventListener('load', () => {
	initGlider();
	window.addEventListener('resize', () => setContainer());
	setContainer();
});
