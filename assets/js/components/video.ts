/**
 * video.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { WayPoint } from '../animations/waypoint';
import { Log } from '../util/log';

/**
 * playVideo plays a video element.
 *
 * @param vid
 */
const playVideo = (vid: HTMLVideoElement) => {
	vid.play()
		.then(res => {
			Log.debug("Video playing: ", res)
		}).catch(err => {
			Log.error("Failed to play video: ", err)
		});
}

/**
 * Video - Adds the video playing class when a user
 * clicks the play button on the video Element.
 *
 * @constructor
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event|play_event}
 */
export const video = (): void => {
	/**
	 * Add playing class to video when it's playing.
	 */
	document.querySelectorAll('video').forEach((vid) => {
		vid.addEventListener('play', () => vid.classList.add('video-playing'));
		if (vid.hasAttribute('data-plausible') && window.plausible) {
			console.log('in');
			window.plausible(vid.getAttribute('data-plausible'));
		}
	});
	/**
	 * Button click handler.
	 */
	document.querySelectorAll('.video-container').forEach((container) => {
		const button = container.querySelector('.video-button'),
			vid = container.querySelector('video') as HTMLVideoElement;
		if (!button || !vid) {
			return;
		}
		button.addEventListener('click', () => {
			console.log('vid');
			vid.play();
		});
	});
	/**
	 * Handle lazy load
	 */
	document.querySelectorAll('video').forEach((vid) => {
		if (!vid.hasAttribute('data-lazy')) {
			return;
		}
		WayPoint(vid, {
			rootMargin: '-100px',
			callback: () => {
				vid.play();
			},
		});
	});
};
