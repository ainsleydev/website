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
import {} from "./animations/skew";
import LazyLoad from 'vanilla-lazyload';
import {Cursor, CursorClasses} from "./components/cursor";

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


const arrow = document.querySelector(".hero-arrow") as HTMLElement;
if (arrow) {
	arrow.addEventListener("mousemove", e => {
		Cursor.addClass(CursorClasses.Invert, CursorClasses.InvertBlack);

		const pos = arrow.getBoundingClientRect();
		const mx = e.clientX - pos.left - pos.width/2;
		const my = e.clientY - pos.top - pos.height/2;
		console.log('translate('+ mx * 0.15 +'px, '+ my * 0.3 +'px)');

		arrow.style.transform = 'translate('+ mx * 0.15 +'px, '+ my * 0.3 +'px)';
		arrow.style.transform += 'rotate3d('+ mx * -0.1 +', '+ my * -0.3 +', 0, 12deg)';
	});
	arrow.addEventListener("mouseleave", e => {
		Cursor.removeClass(CursorClasses.Invert, CursorClasses.InvertBlack);

		arrow.style.transform = 'translate3d(0, 0, 0)';
		arrow.style.transform += 'rotate3d(0, 0, 0, 0deg)';
	});
}


