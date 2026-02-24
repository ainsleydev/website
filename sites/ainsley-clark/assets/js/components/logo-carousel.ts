import EmblaCarousel from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';

/**
 * LogoCarousel initialises an auto-scrolling logo ticker on all
 * .logo-carousel-embla elements using Embla Carousel with the
 * AutoScroll plugin.
 */
export class LogoCarousel {
	public readonly selector = '.logo-carousel-embla';

	constructor() {
		this.init();
	}

	private init(): void {
		document.querySelectorAll<HTMLElement>(this.selector).forEach((node) => {
			EmblaCarousel(
				node,
				{ loop: true, dragFree: true, watchDrag: false },
				[AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 1 })],
			);
		});
	}
}

new LogoCarousel();
