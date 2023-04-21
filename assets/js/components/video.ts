/**
 * video.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import { Log } from '../util/log';
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

/**
 * VideoPlayer is a class that represents a custom video player with controls.
 *
 * @class
 */
export class VideoPlayer {
	public videoContainer: HTMLElement;
	public video: HTMLVideoElement;
	private playPauseButton: HTMLElement;
	private progressBar: HTMLElement;
	private progress: HTMLElement;
	private currentTimeDisplay: HTMLElement;
	private durationDisplay: HTMLElement;
	private volumeIcon: HTMLElement;
	private volumeSlider: HTMLInputElement;
	private fullscreenButton: HTMLElement;
	private isDraggingProgress = false;

	/**
	 * Initializes the VideoPlayer instance with the provided HTMLVideoElement and sets up the event listeners
	 * .
	 * @param videoContainer - The HTMLVideoElement to use for the video player.
	 */
	constructor(videoContainer: HTMLVideoElement) {
		this.videoContainer = videoContainer;
		this.video = videoContainer.querySelector('video');
		this.playPauseButton = videoContainer.querySelector('.video-play-pause');
		this.progressBar = videoContainer.querySelector('.video-progress-bar');
		this.progress = videoContainer.querySelector('.video-progress');
		this.currentTimeDisplay = videoContainer.querySelector('.video-current-time');
		this.durationDisplay = videoContainer.querySelector('.video-duration');
		this.volumeIcon = videoContainer.querySelector('.video-volume-icon');
		this.volumeSlider = videoContainer.querySelector('.video-volume-slider');
		this.fullscreenButton = videoContainer.querySelector('.video-fullscreen');
		this.setupEventListeners();
	}

	/**
	 * Sets up event listeners for the player controls.
	 *
	 * @private
	 */
	private setupEventListeners() {
		this.playPauseButton.addEventListener('click', () => this.togglePlayPause());
		this.video.addEventListener('play', () => this.updatePlayPauseButton());
		this.video.addEventListener('pause', () => this.updatePlayPauseButton());
		this.video.addEventListener('timeupdate', () => this.updateProgress());
		this.progressBar.addEventListener('mousedown', (e) => this.startDraggingProgress(e));
		this.progressBar.addEventListener('mousemove', (e) => this.dragProgress(e));
		this.progressBar.addEventListener('mouseup', (e) => this.stopDraggingProgress(e));
		this.volumeIcon.addEventListener('click', () => this.toggleMute());
		this.volumeSlider.addEventListener('input', () => this.updateVolume());
		this.fullscreenButton.addEventListener('click', () => this.toggleFullscreen());
		this.video.addEventListener('loadedmetadata', () => this.updateDuration());
		this.video.addEventListener('click', () => this.togglePlayPause());
		document.addEventListener('keydown', (e) => this.exitFullscreen(e));
		this.durationDisplay.innerHTML = this.video.duration.toString();
	}

	/**
	 * Toggles the video between playing and paused states.
	 *
	 * @private
	 */
	private togglePlayPause(): void {
		this.video.paused ? this.video.play() : this.video.pause();
	}

	/**
	 * Updates the play/pause button of the video player based on whether
	 * the video is currently paused or playing.
	 *
	 * @private
	 */
	private updatePlayPauseButton() {
		if (this.video.paused) {
			this.videoContainer.classList.add('video-paused');
			this.videoContainer.classList.remove('video-playing');
			return;
		}
		this.videoContainer.classList.remove('video-paused');
		this.videoContainer.classList.add('video-playing');
	}

	/**
	 * Updates the progress bar of the video player based on the current time of the video.
	 * If the progress bar is being dragged, the current time of the video is calculated based on the width of the progress bar.
	 * Otherwise, the current time of the video is used directly.
	 *
	 * @private
	 */
	private updateProgress() {
		const duration = this.video.duration;
		const currentTime = this.isDraggingProgress
			? (this.video.duration * parseFloat(this.progress.style.width)) / 100
			: this.video.currentTime;
		const percent = (currentTime / duration) * 100;
		this.progress.style.width = `${percent}%`;
		this.currentTimeDisplay.innerHTML = this.formatTime(currentTime);
	}

	/**
	 * Formats a given time in seconds to a string in the format of 'mm:ss'.
	 *
	 * @private
	 * @param time The time to format, in seconds.
	 * @returns A formatted time string in the format of 'mm:ss'.
	 */
	private formatTime(time: number): string {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	/**
	 * Starts dragging the progress bar.
	 *
	 * @private
	 * @param event The mouse event that triggered the start of the dragging.
	 */
	private startDraggingProgress(event: MouseEvent) {
		this.isDraggingProgress = true;
		document.addEventListener('mousemove', this.dragProgress, false);
		document.addEventListener('mouseup', this.stopDraggingProgress, false);
	}

	/**
	 * Starts dragging the progress bar.
	 *
	 * @private
	 * @param event The mouse event that triggered the start of the dragging.
	 */
	private dragProgress(event: MouseEvent): void {
		if (!this.isDraggingProgress) return;
		const progressBarRect = this.progressBar.getBoundingClientRect();
		const progressWidth = progressBarRect.width;
		const clickX = event.clientX - progressBarRect.left;
		let percent = (clickX / progressWidth) * 100;

		if (percent < 0) percent = 0;
		if (percent > 100) percent = 100;

		this.progress.style.width = `${percent}%`;
		const currentTime = (percent / 100) * this.video.duration;
		this.currentTimeDisplay.innerText = this.formatTime(currentTime);
	}

	/**
	 * Stops dragging the progress bar.
	 *
	 * @private
	 * @param event The mouse event that triggered the end of the dragging.
	 */
	private stopDraggingProgress(event: MouseEvent) {
		this.isDraggingProgress = false;
		document.removeEventListener('mousemove', this.dragProgress, false);
		document.removeEventListener('mouseup', this.stopDraggingProgress, false);
		const progressBarRect = this.progressBar.getBoundingClientRect();
		const progressWidth = progressBarRect.width;
		const clickX = event.clientX - progressBarRect.left;
		const percent = (clickX / progressWidth) * 100;
		const currentTime = (percent / 100) * this.video.duration;

		if (currentTime >= 0) {
			this.video.currentTime = currentTime;
		}
	}

	/**
	 * Updates the volume of the video player.
	 *
	 * @private
	 */
	private updateVolume() {
		const value = parseFloat(this.volumeSlider.value);
		if (this.video.muted) {
			this.video.muted = false;
		} else {
			this.video.volume = value;
		}
		this.updateVolumeClass();
	}

	/**
	 * Toggles fullscreen mode of the video player.
	 *
	 * @private
	 */
	private toggleFullscreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
			return;
		}
		if (this.video.requestFullScreen) {
			this.video.requestFullscreen();
		} else if (this.video.webkitRequestFullScreen) {
			this.video.webkitRequestFullScreen();
		} else if (this.video.mozRequestFullScreen) {
			this.video.mozRequestFullScreen();
		} else if (this.video.msRequestFullscreen) {
			this.video.msRequestFullscreen();
		}
		this.video.webkitEnterFullscreen();
	}

	/**
	 * Updates the duration display of the video player.
	 *
	 * @private
	 */
	private updateDuration() {
		const duration = this.video.duration;
		this.durationDisplay.innerHTML = this.formatTime(duration);
	}

	/**
	 * Toggles mute mode of the video player.
	 *
	 * @private
	 */
	private toggleMute() {
		if (this.video.muted) {
			this.video.muted = false;
			this.volumeSlider.value = this.video.volume.toString();
			this.updateVolumeClass();
			return;
		}
		this.video.muted = true;
		this.volumeSlider.value = '0';
		this.updateVolumeClass();
	}

	/**
	 * Updates the slider track of the volume slider
	 * based on the current volume of the video.
	 *
	 * @private
	 */
	private updateSliderTrack() {
		const min = parseInt(this.volumeSlider.min),
			max = parseInt(this.volumeSlider.max),
			value = parseFloat(this.volumeSlider.value),
			percent = ((value - min) / (max - min)) * 100;
		this.volumeSlider.style.background =
			'linear-gradient(to right, #fff 0%, #fff ' + percent + '%, #0A0A0A ' + percent + '%, #0A0A0A 100%)';
	}

	/**
	 * Toggles the volume muted classes.
	 *
	 * @param muted
	 * @private
	 */
	private updateVolumeClass() {
		let muted = this.video.muted;
		if (this.volumeSlider.value === '0') muted = true;
		this.updateSliderTrack();
		if (muted) {
			this.videoContainer.classList.add('video-volume-muted');
			this.videoContainer.classList.remove('video-volume-full');
			return;
		}
		this.videoContainer.classList.remove('video-volume-muted');
		this.videoContainer.classList.add('video-volume-full');
	}

	/**
	 * Handles the event of exiting fullscreen mode by pressing the 'Escape' key.
	 *
	 * @private
	 * @param event The keyboard event that triggered the exit of fullscreen mode.
	 */
	private exitFullscreen(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.keyCode === 27) {
			document.querySelectorAll('.video-full-active').forEach((container) => {
				this.togglePlayPause();
				container.classList.remove('video-full-active');
			});
		}
	}
}
