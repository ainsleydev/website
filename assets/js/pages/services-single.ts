/**
 * services-single.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import Glider from 'glider-js';
import { Log } from '../util/log';
import anime from 'animejs';
import { IsTouchDevice } from '../util/css';

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
};

initGlider();
window.addEventListener('resize', () => setContainer());
setContainer();

/**
 * Hover for Related Services
 */
if (!IsTouchDevice()) {
	document.querySelectorAll('.service-related-nav-link').forEach((link) => {
		const slug = link.getAttribute('data-slug');
		const image = document.querySelector(`[data-related-slug="${slug}"]`);
		if (!image) {
			return;
		}
		link.addEventListener('mouseover', () => {
			document.querySelectorAll('.service-related-image').forEach((i) => {
				i.classList.remove('service-related-image-current');
			});
			image.classList.add('service-related-image-current');
		});
	});
}

// Define the animation
anime({
	targets: document.querySelectorAll('.carousel-item-container'),
	// Initial state: skew from left to right and off-screen
	translateY: [300, 0], // Start off-screen from bottom
	opacity: [0, 1], // Start off-screen from bottom
	easing: 'easeOutQuad',
	duration: 500, // Duration of the animation
	delay: anime.stagger(100), // Stagger animation start
	loop: false, // Loop the animation
	autoplay: true, // Start the animation immediately
});
