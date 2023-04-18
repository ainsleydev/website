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
			window.plausible(vid.getAttribute('data-plausible'));
		}
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
			callback: () => playVideo(vid),
		});
	});

	/**
	 * Handle video full screen and toggle video class.
	 *
	 * @param container
	 */
	const openCloseVideo = (container: HTMLElement) => {
		const video = container.querySelector("video") as HTMLVideoElement;
		if (!video) {
			Log.error("Video not found");
			return;
		}
		if (container.classList.contains("video-full-active")) {
			container.classList.remove("video-full-active");
			video.pause();
			return;
		}
		container.classList.add("video-full-active");
	}

	document.querySelectorAll("[data-video-fullscreen-btn]").forEach((button) => {
		const container = document.querySelector(button.getAttribute("data-video-fullscreen-btn"));
		if (!video) {
			Log.error("Video fullscreen not found");
			return;
		}
		button.addEventListener("click", () => openCloseVideo(container as HTMLElement));
	});

	document.querySelectorAll(".video-full-btn").forEach((btn) => {
		btn.addEventListener("click", () => openCloseVideo(btn.closest(".video-full") as HTMLElement));
	});
};
