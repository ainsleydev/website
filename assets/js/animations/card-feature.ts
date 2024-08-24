/**
 * card-feature.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 *
 */

/**
 * Interface to define the state of the image animation.
 */
interface ImageAnimationState {
	targetX: number;
	targetY: number;
	currentX: number;
	currentY: number;
	isFirstMove: boolean;
	animationFrameId: number;
}

/**
 * Updates the position of the image based on the cursor position.
 *
 * @param e - The mouse event.
 * @param card - The card element.
 * @param image - The image element.
 * @param state - The state object containing animation variables.
 */
const updateImagePosition = (
	e: MouseEvent,
	card: HTMLElement,
	image: HTMLElement,
	state: ImageAnimationState,
): void => {
	const rect = card.getBoundingClientRect();
	const imageWidth = image.offsetWidth;
	const imageHeight = image.offsetHeight;

	// Calculate position to center the image on the cursor
	state.targetX = e.clientX - rect.left - imageWidth / 2;
	state.targetY = e.clientY - rect.top - imageHeight / 2;

	if (state.isFirstMove) {
		// Set image position instantly on the first move without transition
		image.style.transition = 'opacity 300ms linear';
		image.style.transform = `translate(${state.targetX}px, ${state.targetY}px) rotate(0deg)`;
		image.style.opacity = '1';
		state.currentX = state.targetX;
		state.currentY = state.targetY;
		state.isFirstMove = false;

		// Enable the transform transition after the first move
		requestAnimationFrame(() => {
			image.style.transition = 'opacity 300ms linear, transform 300ms linear';
		});

		return;
	}

	// Start animating towards the target position
	if (!state.animationFrameId) {
		state.animationFrameId = requestAnimationFrame(() => animateImage(image, state));
	}
};

/**
 * Animates the image towards the target position.
 *
 * @param image - The image element.
 * @param state - The state object containing animation variables.
 */
const animateImage = (image: HTMLElement, state: ImageAnimationState): void => {
	const speed = 0.1; // Interpolation speed

	// Smoothly interpolate the image position
	state.currentX += (state.targetX - state.currentX) * speed;
	state.currentY += (state.targetY - state.currentY) * speed;

	// Calculate rotation based on movement direction
	const deltaX = state.targetX - state.currentX;
	const rotation = deltaX * 0.4; // Rotation intensity

	// Apply interpolated position and rotation
	image.style.transform = `translate(${state.currentX}px, ${state.currentY}px) rotate(${rotation}deg)`;

	// Continue the animation if the position is not yet reached
	if (Math.abs(state.targetX - state.currentX) > 0.1 || Math.abs(state.targetY - state.currentY) > 0.1) {
		state.animationFrameId = requestAnimationFrame(() => animateImage(image, state));
	} else {
		state.animationFrameId = 0; // Reset animation frame ID
	}
};

/**
 * Initializes card feature animations.
 */
export const cardFeatureAnimation = (): void => {
	if (window.innerWidth < 1024) return;

	const cards = document.querySelectorAll('.card-feature');

	cards.forEach((card) => {
		const image = card.querySelector('.card-feature-image') as HTMLElement;

		// State object to hold variables
		const state: ImageAnimationState = {
			targetX: 0,
			targetY: 0,
			currentX: 0,
			currentY: 0,
			isFirstMove: true,
			animationFrameId: 0,
		};

		card.addEventListener('mouseenter', (e: MouseEvent) => {
			state.isFirstMove = true;
			updateImagePosition(e, card, image, state);
		});

		card.addEventListener('mousemove', (e: MouseEvent) => updateImagePosition(e, card, image, state));

		card.addEventListener('mouseleave', () => {
			if (state.animationFrameId) {
				cancelAnimationFrame(state.animationFrameId);
				state.animationFrameId = 0;
			}
			image.style.opacity = '0';
			image.style.transform = `translate(${state.currentX}px, ${state.currentY}px) rotate(0deg)`;
			state.isFirstMove = true;
		});
	});
};
