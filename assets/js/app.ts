/**
 * app.js
 * All custom JS for application stored here.
 *
 * @author Ainsley Clark
 * @author URL:   https://www.ainsleyclark.com
 * @author Email: info@ainsleyclark.com
 */

import { Cursor } from './animations/cursor';
import { Skew } from './animations/skew';
import { FitText } from './components/fit-text';
import { Collapse, CollapseOptions } from './components/accordion';
import { Card } from './components/card';
import { Navigation } from './components/nav';

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
document.addEventListener('DOMContentLoaded', () => {
	new Navigation();
	new Cursor();
	new Skew();
	new FitText();
	new Card();
	new Collapse({
		accordion: true,
		container: '.accordion',
		item: '.accordion-item',
		inner: '.accordion-content',
		activeClass: 'accordion-item-active',
	} as CollapseOptions);
});

/**
 * Button - Go Back
 */
document.querySelectorAll('[data-go-back]').forEach((btn) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		history.back();
	});
});
