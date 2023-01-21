/**
 * accordion.js
 * Accordion component logic.
 * @author Ainsley Clark
 * @author URL:   https://reddico.co.uk
 * @author Email: ainsley@reddico.co.uk
 */

export function Accordion(options) {
	let defaultOpt = {
		parent: document.body,
		accordion: false,
		outer: '.accordion-item',
		header: '.accordion-title',
		inner: '.accordion-content'
	};
	this.options = Object.assign(defaultOpt, options);
	this.elements = {};

	this.options.parent._collapse = this;
	this.init();
}

Accordion.prototype.init = function () {
	let opt = this.options,
		ele = this.elements,
		self = this;

	let collapses = ele.collapses = opt.parent.querySelectorAll(opt.outer);
	collapses.forEach(function (collapse) {
		let headers = collapse.querySelectorAll(opt.header);
		headers.forEach(function (header) {
			header.addEventListener('click', e => {
				e.preventDefault();

				console.log("heyr");

				if (opt.accordion) {
					self.accordion(headers, header);
				} else {
					self.toggle(header.parentNode, false);
				}
			})
		})
	})
};

Accordion.prototype.accordion = function(header, current) {
	let s = this;
	header.forEach(function (el) {
		s.toggle(el.parentNode, el !== current);
	})
};

Accordion.prototype.toggle = function(item, closeForce) {
	let height = 0;
	let inner = item.querySelector(this.options.inner);
	if (!item.classList.contains('active') && !closeForce) {
		height = this.calcHeight(inner);
		item.classList.add('active');
	} else {
		item.classList.remove('active');
	}
	console.log(height);
	inner.style.maxHeight = height + 'px';
};

Accordion.prototype.calcHeight = function(inner) {
	let children = inner.children;
	let height = 0;
	for (let i = 0; i < children.length; i++) {
		height += children[i].clientHeight;
	}
	return height;
};

for(const el of document.querySelectorAll(".accordion")) {
	let accordion = new Accordion({
		accordion: true,
		parent: document.body.querySelector('.accordion')
	});
}
