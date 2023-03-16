/**
 * video.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/**
 * Video - Adds the video playing class to any
 * videos on the document.
 *
 * @constructor
 */
export const video = (): void => {
	document.querySelectorAll('video').forEach((vid) => {
		vid.addEventListener('play', () => {
			vid.classList.add('video-playing');
		});
	});
}


