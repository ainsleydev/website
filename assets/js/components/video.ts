/**
 * video.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

/**
 * Video - Adds the video playing class when a user
 * clicks the play button on the video Element.
 *
 * @constructor
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event|play_event}
 */
export const video = (): void => {
	document.querySelectorAll('video').forEach((vid) => {
		vid.addEventListener('play', () => vid.classList.add('video-playing'));
	});
};
