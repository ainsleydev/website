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
		if (y < 100) {
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
	 * Open full screen.
	 */
	document.querySelectorAll('[data-video-fullscreen-btn]').forEach((button) => {
		const video = document.querySelector(button.getAttribute('data-video-fullscreen-btn')) as HTMLVideoElement;
		if (!video) {
			Log.error('Video fullscreen not found');
			return;
		}
		button.addEventListener('click', () => {
			video.classList.add('video-full-active');
			if (video.requestFullscreen) {
				video.requestFullscreen();
			} else if (video.webkitRequestFullscreen) {
				/* Safari */
				video.webkitRequestFullscreen();
			} else if (video.msRequestFullscreen) {
				/* IE11 */
				video.msRequestFullscreen();
			}
			playVideo(video);
		});
	});

	/**
	 * Close full screen.
	 */
	document.querySelectorAll('.video-full').forEach((video: HTMLVideoElement) => {
		if (IsTouchDevice()) {
			video.addEventListener('pause', () => {
				if (video.webkitDisplayingFullscreen) {
					video.classList.remove('video-full-active');
					video.pause();
				}
			});
		}
		video.addEventListener('fullscreenchange', () => {
			if (
				!document.fullscreenElement &&
				!document.webkitIsFullScreen &&
				!document.mozFullScreen &&
				!document.msFullscreenElement
			) {
				video.classList.remove('video-full-active');
				video.pause();
			}
		});
	});
};
