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
		outer: '.collapse',
		header: '.collapse-header',
		inner: '.collapse-content',
	};
	this.options = Object.assign(defaultOpt, options);
	this.elements = {};

	this.options.parent._collapse = this;
	this.init();
}

Accordion.prototype.init = function () {
	let headers = this.options.parent.querySelectorAll(this.options.header);
	headers.forEach(header => {
		header.addEventListener('click', e => {
			e.preventDefault();
			if (this.options.accordion) {
				this.accordion(headers, header);
			} else {
				this.toggle(header.parentNode, false);
			}
		})
	})
};

Accordion.prototype.accordion = function(headers, current) {
	headers.forEach(el => this.toggle(el.parentNode, el !== current))
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
	console.log(item, closeForce);
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
		parent: document.body.querySelector('.accordion'),
		outer: '.accordion-item',
		header: '.accordion-title',
		inner: '.accordion-content'
	});
}


