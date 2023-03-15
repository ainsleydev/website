/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-canvas-svg-svgfilters-touchevents-webglextensions-webp-setclasses !*/
!(function (e, n, t) {
	function o(e, n) {
		return typeof e === n;
	}

	function a() {
		var e, n, t, a, i, s, r;
		for (var A in c)
			if (c.hasOwnProperty(A)) {
				if (
					((e = []),
					(n = c[A]),
					n.name &&
						(e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
				)
					for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
				for (a = o(n.fn, 'function') ? n.fn() : n.fn, i = 0; i < e.length; i++)
					(s = e[i]),
						(r = s.split('.')),
						1 === r.length
							? (Modernizr[r[0]] = a)
							: (!Modernizr[r[0]] ||
									Modernizr[r[0]] instanceof Boolean ||
									(Modernizr[r[0]] = new Boolean(Modernizr[r[0]])),
							  (Modernizr[r[0]][r[1]] = a)),
						f.push((a ? '' : 'no-') + r.join('-'));
			}
	}

	function i(e) {
		var n = d.className,
			t = Modernizr._config.classPrefix || '';
		if ((p && (n = n.baseVal), Modernizr._config.enableJSClass)) {
			var o = new RegExp('(^|\\s)' + t + 'no-js(\\s|$)');
			n = n.replace(o, '$1' + t + 'js$2');
		}
		Modernizr._config.enableClasses &&
			((n += ' ' + t + e.join(' ' + t)), p ? (d.className.baseVal = n) : (d.className = n));
	}

	function s() {
		return 'function' != typeof n.createElement
			? n.createElement(arguments[0])
			: p
			? n.createElementNS.call(n, 'http://www.w3.org/2000/svg', arguments[0])
			: n.createElement.apply(n, arguments);
	}

	function r(e, n) {
		if ('object' == typeof e) for (var t in e) h(e, t) && r(t, e[t]);
		else {
			e = e.toLowerCase();
			var o = e.split('.'),
				a = Modernizr[o[0]];
			if ((2 == o.length && (a = a[o[1]]), 'undefined' != typeof a)) return Modernizr;
			(n = 'function' == typeof n ? n() : n),
				1 == o.length
					? (Modernizr[o[0]] = n)
					: (!Modernizr[o[0]] ||
							Modernizr[o[0]] instanceof Boolean ||
							(Modernizr[o[0]] = new Boolean(Modernizr[o[0]])),
					  (Modernizr[o[0]][o[1]] = n)),
				i([(n && 0 != n ? '' : 'no-') + o.join('-')]),
				Modernizr._trigger(e, n);
		}
		return Modernizr;
	}

	function A() {
		var e = n.body;
		return e || ((e = s(p ? 'svg' : 'body')), (e.fake = !0)), e;
	}

	function l(e, t, o, a) {
		var i,
			r,
			l,
			f,
			c = 'modernizr',
			u = s('div'),
			p = A();
		if (parseInt(o, 10)) for (; o--; ) (l = s('div')), (l.id = a ? a[o] : c + (o + 1)), u.appendChild(l);
		return (
			(i = s('style')),
			(i.type = 'text/css'),
			(i.id = 's' + c),
			(p.fake ? p : u).appendChild(i),
			p.appendChild(u),
			i.styleSheet ? (i.styleSheet.cssText = e) : i.appendChild(n.createTextNode(e)),
			(u.id = c),
			p.fake &&
				((p.style.background = ''),
				(p.style.overflow = 'hidden'),
				(f = d.style.overflow),
				(d.style.overflow = 'hidden'),
				d.appendChild(p)),
			(r = t(u, e)),
			p.fake
				? (p.parentNode.removeChild(p), (d.style.overflow = f), d.offsetHeight)
				: u.parentNode.removeChild(u),
			!!r
		);
	}

	var f = [],
		c = [],
		u = {
			_version: '3.6.0',
			_config: { classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
			_q: [],
			on: function (e, n) {
				var t = this;
				setTimeout(function () {
					n(t[e]);
				}, 0);
			},
			addTest: function (e, n, t) {
				c.push({ name: e, fn: n, options: t });
			},
			addAsyncTest: function (e) {
				c.push({ name: null, fn: e });
			},
		},
		Modernizr = function () {};
	(Modernizr.prototype = u),
		(Modernizr = new Modernizr()),
		Modernizr.addTest(
			'svg',
			!!n.createElementNS && !!n.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,
		),
		Modernizr.addTest('svgfilters', function () {
			var n = !1;
			try {
				n = 'SVGFEColorMatrixElement' in e && 2 == SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE;
			} catch (t) {}
			return n;
		});
	var d = n.documentElement,
		p = 'svg' === d.nodeName.toLowerCase(),
		g = u._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];
	(u._prefixes = g),
		Modernizr.addTest('canvas', function () {
			var e = s('canvas');
			return !(!e.getContext || !e.getContext('2d'));
		});
	var h;
	!(function () {
		var e = {}.hasOwnProperty;
		h =
			o(e, 'undefined') || o(e.call, 'undefined')
				? function (e, n) {
						return n in e && o(e.constructor.prototype[n], 'undefined');
				  }
				: function (n, t) {
						return e.call(n, t);
				  };
	})(),
		(u._l = {}),
		(u.on = function (e, n) {
			this._l[e] || (this._l[e] = []),
				this._l[e].push(n),
				Modernizr.hasOwnProperty(e) &&
					setTimeout(function () {
						Modernizr._trigger(e, Modernizr[e]);
					}, 0);
		}),
		(u._trigger = function (e, n) {
			if (this._l[e]) {
				var t = this._l[e];
				setTimeout(function () {
					var e, o;
					for (e = 0; e < t.length; e++) (o = t[e])(n);
				}, 0),
					delete this._l[e];
			}
		}),
		Modernizr._q.push(function () {
			u.addTest = r;
		}),
		Modernizr.addAsyncTest(function () {
			function e(e, n, t) {
				function o(n) {
					var o = n && 'load' === n.type ? 1 == a.width : !1,
						i = 'webp' === e;
					r(e, i && o ? new Boolean(o) : o), t && t(n);
				}

				var a = new Image();
				(a.onerror = o), (a.onload = o), (a.src = n);
			}

			var n = [
					{
						uri: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
						name: 'webp',
					},
					{
						uri: 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==',
						name: 'webp.alpha',
					},
					{
						uri: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
						name: 'webp.animation',
					},
					{
						uri: 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
						name: 'webp.lossless',
					},
				],
				t = n.shift();
			e(t.name, t.uri, function (t) {
				if (t && 'load' === t.type) for (var o = 0; o < n.length; o++) e(n[o].name, n[o].uri);
			});
		});
	var v = (u.testStyles = l);
	Modernizr.addTest('touchevents', function () {
		var t;
		if ('ontouchstart' in e || (e.DocumentTouch && n instanceof DocumentTouch)) t = !0;
		else {
			var o = [
				'@media (',
				g.join('touch-enabled),('),
				'heartz',
				')',
				'{#modernizr{top:9px;position:absolute}}',
			].join('');
			v(o, function (e) {
				t = 9 === e.offsetTop;
			});
		}
		return t;
	}),
		Modernizr.addTest('webgl', function () {
			var n = s('canvas'),
				t = 'probablySupportsContext' in n ? 'probablySupportsContext' : 'supportsContext';
			return t in n ? n[t]('webgl') || n[t]('experimental-webgl') : 'WebGLRenderingContext' in e;
		}),
		Modernizr.addAsyncTest(function () {
			if (((Modernizr.webglextensions = !1), Modernizr.webgl)) {
				var e, n, o;
				try {
					(e = s('canvas')),
						(n = e.getContext('webgl') || e.getContext('experimental-webgl')),
						(o = n.getSupportedExtensions());
				} catch (a) {
					return;
				}
				n !== t && (Modernizr.webglextensions = new Boolean(!0));
				for (var i = -1, r = o.length; ++i < r; ) Modernizr.webglextensions[o[i]] = !0;
				e = t;
			}
		}),
		a(),
		i(f),
		delete u.addTest,
		delete u.addAsyncTest;
	for (var w = 0; w < Modernizr._q.length; w++) Modernizr._q[w]();
	e.Modernizr = Modernizr;
})(window, document);
