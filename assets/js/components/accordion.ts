/**
 * collapse.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */


interface CollapseOptions {
	accordion?: boolean
	container?: string
	header?: string
	inner?: string
	activeClass?: string,
}

export class Collapse {

	/**
	 * The default options for the collapsable content,
	 * when properties are not defined.
	 *
	 * @readonly
	 */
	public readonly defaultOptions: CollapseOptions = {
		accordion: true,
		container: '.accordion',
		header: '.accordion-item',
		inner: '.accordion-content',
		activeClass: 'accordion-item-active',
	}

	/**
	 *
	 */
	public options: CollapseOptions

	/**
	 *
	 * @private
	 */
	private container: HTMLElement

	/**
	 *
	 */
	constructor(options?: CollapseOptions) {
		this.options = this.defaultOptions;
		this.options = {...this.defaultOptions, ...options};
		const containers = document.querySelectorAll(".accordion");
		containers.forEach(contasiner => {

		})
		this.container =
		this.attachClickHandler();
	}

	/**
	 * Attaches the click event to the headers defined
	 * in the container.
	 *
	 * @private
	 */
	private attachClickHandler(container: HTMLElement): void {
		let headers =c ontainer.querySelectorAll<HTMLElement>(this.options.header);
		headers.forEach(header => {
			header.addEventListener('click', e => {
				e.preventDefault();
				this.options.accordion ? this.accordion(headers, header) : this.toggle(header, false)
			});
		});
	}

	/**
	 * Toggles and removes the active class if the
	 * option accordion is flagged.
	 *
	 * @param headers
	 * @param current
	 * @private
	 */
	private accordion(headers: any, current: HTMLElement): void {
		headers.forEach(el => this.toggle(el, el !== current));
	}

	/**
	 * Applies the active class and asserts the maximum
	 * height of the element.
	 *
	 * @param item
	 * @param force
	 * @private
	 */
	private toggle(item: HTMLElement, force: boolean): void {
		const active = this.options.activeClass;
		const inner = item.querySelector(this.options.inner) as HTMLElement;

		let height = 0;
		if (!item.classList.contains(active) && !force) {
			height = this.calculateHeight(inner);
			item.classList.add(active);
		} else {
			item.classList.remove(active);
		}

		inner.style.maxHeight = height + 'px';
	}

	/**
	 * Calculates the height of the items and child
	 * items within the given element.
	 *
	 * @param el
	 * @private
	 */
	private calculateHeight(el: HTMLElement): number {
		let children = el.children;
		let height = 0;
		for (let i = 0; i < children.length; i++) {
			height += children[i].clientHeight;
		}
		return height;
	}
}
