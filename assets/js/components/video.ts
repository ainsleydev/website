/**
 * video.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';
import { IsTouchDevice } from '../util/css';
import Scroll from '../app/scroll';

/**
 * playVideo plays a video element.
 *
 * @param vid
 */
const playVideo = (vid: HTMLVideoElement) => {
	vid.play()
		.then((res) => {
			Log.debug('Video playing: ', res);
		})
		.catch((err) => {
			Log.error('Failed to play video: ', err);
		});
};

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
		vid.addEventListener('pause', () => vid.classList.remove('video-playing'));
		if (vid.hasAttribute('data-plausible') && window.plausible) {
			window.plausible(vid.getAttribute('data-plausible'));
		}
	});

	/**
	 * Handle lazy load
	 */
	Scroll.onScroll((y: number) => {
		if (y < 1) {
			return;
		}
		document.querySelectorAll('video').forEach((vid) => {
			if (!vid.hasAttribute('data-lazy')) {
				return;
			}
			if (vid.classList.contains('video-playing')) {
				return;
			}
			playVideo(vid);
		});
	});

	/**
	 * Full screen.
	 */
	document.querySelectorAll('[data-video-fullscreen-btn]').forEach((button) => {
		const container = document.querySelector(button.getAttribute('data-video-fullscreen-btn')) as HTMLElement;
		if (!container) {
			Log.error('Video fullscreen not found');
			return;
		}
		const video = container.querySelector('video');
		if (!video) {
			Log.error('Video not found');
			return;
		}
		/**
		 * Open full screen.
		 */
		button.addEventListener('click', () => {
			container.classList.add('video-full-active');
			playVideo(video);
		});
		/**
		 * Close full screen.
		 */
		container.querySelectorAll('.video-full-close').forEach((btn) => {
			btn.addEventListener('click', () => {
				container.classList.remove('video-full-active');
				video.pause();
			});
		});
	});
};
