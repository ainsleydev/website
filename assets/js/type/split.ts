/**
 * split.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

// TODO, these classes should be enums.

/**
 * Splits a word by a letter and wraps within a <span>
 * tag with a class of `text-letter`.
 *
 * @param el
 */
export const SplitLetter = (el: Element): void => {
	el.innerHTML = el.innerHTML.trim().replace(/(?![^<]*>)[^<]/g, (c) => {
		if (c == ' ') {
			return c;
		}
		if (c == '*') {
			return `<span class="text-mark">${c}</span>`;
		}
		return `<span class="text-letter">${c}</span>`;
	});
};

/**
 * Splits a word by a space and wraps within a <span>
 * tag with a class of `text-word`.
 *
 * @param el
 */
export const SplitWord = (el: Element): void => {
	el.innerHTML = el.innerHTML
		.trim()
		.split(' ')
		.map((word) => {
			return `<span class="text-word">${word}</span>`;
		})
		.join(' ');
};

/**
 * Splits a line by a <br> tag and wraps within a <span>
 * tag with a class of `text-line`.
 *
 * @param el
 */
export const SplitLine = (el: Element): void => {
	el.innerHTML = el.innerHTML
		.trim()
		.split('<br>')
		.map((word) => {
			return `<span class="text-line">${word}</span>`;
		})
		.join(' ');
};

/**
 * Adds an `text-underline` span to an element if
 * the passed argument contains a <u> tag.
 *
 * @param el
 * @constructor
 */
export const AddUnderline = (el: Element): void => {
	const underline = el.querySelector('u');
	if (underline) {
		underline.innerHTML += `<span class="text-underline">`;
	}
};
