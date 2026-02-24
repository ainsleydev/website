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

	private async init(): Promise<void> {
		const nodes = document.querySelectorAll<HTMLElement>(this.selector);
		if (!nodes.length) return;

		const [{ default: EmblaCarousel }, { default: AutoScroll }] = await Promise.all([
			import('embla-carousel'),
			import('embla-carousel-auto-scroll'),
		]);

		nodes.forEach((node) => {
			EmblaCarousel(node,
				{
					loop: true,
					align: 'start',
					dragFree: true,
					watchDrag: false,
					watchResize: true,
					watchFocus: false,
				}, [
				AutoScroll({
					playOnInit: true,
					stopOnInteraction: false,
					stopOnFocusIn: false,
					stopOnMouseEnter: false,
					speed: 1,
					startDelay: 0,
				}),
			]);
		});
	}
}
