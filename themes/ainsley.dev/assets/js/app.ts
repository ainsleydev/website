/**
 * app.js
 * All custom JS for theme stored here.
 * @author Ainsley Clark
 * @author URL:   https://www.ainsleyclark.com
 * @author Email: info@ainsleyclark.com
 */

import scripts from "./scripts/polyfills";
import {} from "./components/nav";
import {} from "./components/button";
import LazyLoad from 'vanilla-lazyload';

/**
 * Variables
 *
 */
const html = document.querySelector('html'),
	header = document.querySelector('.header'),
	nav = document.querySelector('.nav'),
	hamburger = document.querySelector('.hamburger');

/*
 * Remove No JS Body Class
 *
 */
// html.classList.remove('no-js');
// html.classList.add('js');

/**
 * Vanilla Lazyload
 *
 */
let lazyLoadInstance = new LazyLoad({
	elements_selector: '.lazy'
	// ... more custom settings?
});

/*
 * Scroll To Anchor
 * Targets all links with # anchor & adds smooth scrolling
 *
 */
// let headerOffset = header.offsetHeight;
//
// window.addEventListener('resize', function(){
// 	headerOffset = header.offsetHeight;
// });
//
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// 	anchor.addEventListener('click', function (e) {
// 		e.preventDefault();
//
// 		let offset = headerOffset,
// 			section = document.querySelector(anchor.getAttribute('href')),
// 			elementPosition = section.offsetTop,
// 			offsetPosition = elementPosition - offset;
//
// 		window.scrollTo({
// 			top: offsetPosition,
// 			behavior: 'smooth'
// 		});
// 	});
// });
