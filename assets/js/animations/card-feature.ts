/**
 * card-feature.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 *
 */

/**
 * Displays an image relative to x & y position of card.
 *
 * @constructor
 */
export const cardFeatureAnimation = (): void => {
	if (window.innerWidth >= 1024) {
		const cards = document.querySelectorAll('.card-feature');
		cards.forEach((card) => {
			const cards = document.querySelectorAll('.card-feature');
			cards.forEach((card) => {
				const image = card.querySelector('.card-feature-image') as HTMLElement;
				let lastX = 0;
				let lastY = 0;
				let targetX = 0;
				let targetY = 0;
				let currentX = 0;
				let currentY = 0;
				let isFirstMove = true;
				let animationFrameId: number;

				const updateImagePosition = (e: MouseEvent) => {
					const rect = card.getBoundingClientRect();
					const imageWidth = image.offsetWidth;
					const imageHeight = image.offsetHeight;

					// Calculate position to center the image on the cursor
					targetX = e.clientX - rect.left - imageWidth / 2;
					targetY = e.clientY - rect.top - imageHeight / 2;

					// Update last position
					lastX = e.clientX;
					lastY = e.clientY;

					if (isFirstMove) {
						// Instantly set image to the target position on the first move
						image.style.transform = `translate(${targetX}px, ${targetY}px) rotate(0deg)`;
						image.style.opacity = '1';
						currentX = targetX;
						currentY = targetY;
						isFirstMove = false;
					} else {
						// Start animating towards the target position
						if (!animationFrameId) {
							animateImage();
						}
					}
				};

				const animateImage = () => {
					// Interpolate position
					const speed = 0.1; // Adjust speed here

					// Smoothly interpolate the image position
					currentX += (targetX - currentX) * speed;
					currentY += (targetY - currentY) * speed;

					// Calculate rotation based on movement direction
					const deltaX = targetX - currentX;
					const rotation = deltaX * 0.4; // Adjust rotation intensity

					// Apply interpolated position and rotation
					image.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;

					// Continue the animation if the position is not yet reached
					if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
						animationFrameId = requestAnimationFrame(animateImage);
					} else {
						animationFrameId = 0; // Reset animation frame ID
					}
				};

				card.addEventListener('mouseenter', (e: MouseEvent) => {
					isFirstMove = true;
					// Directly set the image position based on mouse enter event
					updateImagePosition(e);
				});

				card.addEventListener('mousemove', updateImagePosition);

				card.addEventListener('mouseleave', () => {
					if (animationFrameId) {
						cancelAnimationFrame(animationFrameId);
						animationFrameId = 0;
					}
					image.style.opacity = '0';
					image.style.transform = `translate(${currentX}px, ${currentY}px) rotate(0deg)`;
					isFirstMove = true;
				});
			});
		});
	}
};
