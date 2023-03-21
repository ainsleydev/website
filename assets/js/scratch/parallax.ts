/**
 * parallax.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

// import Scroll from './app/scroll';
// import anime from 'animejs/lib/anime.es';
// import { Elements } from './util/els';
//
// let triggered = false;
//
// Scroll.onScroll((y: number) => {
//
//
// 	document.querySelectorAll<HTMLElement>(".portfolio-next").forEach(el => {
//
// 		let y = window.innerHeight - el.getBoundingClientRect().top
// 		if (y > 200 && !triggered) {
// 			console.log("in")
// 			anime({
// 				targets: el,
// 				translateY: [0, -400],
// 				duration: 2000,
// 				easing: "easeOutSine"
// 			})
// 			console.log("triggered");
// 			triggered = true;
// 			// anime({
// 			// 	targets: el,
// 			// 	translateY: (0.15 * 5).toString() + "px",
// 			// 	duration: 1000,
// 			// })
// 			// el.style.transform = 'translate3d(0, -' + (0.1 * y) + 'px ,0)'
// 			// Elements.Footer.style.transform = 'translate3d(0, -' + (0.1 * y) + 'px ,0)'
// 		}
// 	});
// });
