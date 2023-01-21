/**
 * app.js
 * All custom JS for theme stored here.
 * @author Ainsley Clark
 * @author URL:   https://www.ainsleyclark.com
 * @author Email: info@ainsleyclark.com
 */

// import scripts from "./scripts/polyfills";
import LazyLoad from 'vanilla-lazyload';
import { Cursor } from "./animations/cursor";
import { Skew } from "./animations/skew";
import { FitText } from "./components/fit-text";
import {}  from "./components/accordion";

/**
 * Variables
 *
 */
const html = document.querySelector('html');

/*
 * Remove No JS Body Class
 *
 */
html.classList.remove('no-js');
html.classList.add('js');

/**
 * Initialise components & types.
 */
document.addEventListener("DOMContentLoaded", () => {
	new Cursor();
	new Skew();
	new FitText();
});

/**
 * Vanilla Lazyload
 *
 */
let lazyLoadInstance = new LazyLoad({
	elements_selector: '.lazy'
	// ... more custom settings?
});
