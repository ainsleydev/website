/**
 * services-single.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import Glider from 'glider-js';
import { Log } from '../util/log';

new Glider(document.querySelector('.glider'), {
	slidesToShow: '6',
	slidesToScroll: '1',
	duration: 0.1,
	draggable: true,
	responsive: [
		// {
		// 	breakpoint: 900,
		// 	settings: {
		// 		slidesToShow: 2,
		// 		slidesToScroll: 2
		// 	}
		// },
		// {
		// 	breakpoint: 575,
		// 	settings: {
		// 		slidesToShow: 3,
		// 		slidesToScroll: 3
		// 	}
		// }
	],
});

/**
 * Set the width of the glider container to match the width of the container set.
 * It's a bit tricky to do this with CSS, so we're using JS to set the width.
 */
const container = document.querySelector<HTMLElement>('[data-container-set]'),
	gliderContainer = document.querySelector<HTMLElement>('.glider-container');

const setContainer = () => {
	if (!container || !gliderContainer) {
		Log.error('Container or glider container not found.');
		return;
	}
	const x = container.getBoundingClientRect().x + 15;
	gliderContainer.style.left = x.toString() + 'px';
	gliderContainer.style.width = `calc(100% - ${x}px)`;
};

// Set the container width on load and resize.
window.addEventListener('resize', () => setContainer());
setContainer();
