/**
 * QuoteCarousel initialises a timed slideshow on all
 * .quote-carousel-embla elements using Embla Carousel with the
 * Autoplay plugin, advancing every 10 seconds.
 */
export class QuoteCarousel {
	public readonly selector = '.quote-carousel-embla';

	constructor() {
		this.init();
	}

	private async init(): Promise<void> {
		const nodes = document.querySelectorAll<HTMLElement>(this.selector);
		if (!nodes.length) return;

		const [{ default: EmblaCarousel }, { default: Autoplay }] = await Promise.all([
			import('embla-carousel'),
			import('embla-carousel-autoplay'),
		]);

		nodes.forEach((node) => {
			EmblaCarousel(node, { loop: true, align: 'start' }, [
				Autoplay({ delay: 6000, stopOnInteraction: false }),
			]);
		});
	}
}
