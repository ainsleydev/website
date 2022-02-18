(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module, temp) => {
      return cache && cache.get(module) || (temp = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp), temp);
    };
  })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

  // node_modules/vanilla-lazyload/dist/lazyload.min.js
  var require_lazyload_min = __commonJS({
    "node_modules/vanilla-lazyload/dist/lazyload.min.js"(exports, module) {
      !function(n, t) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = t() : typeof define == "function" && define.amd ? define(t) : (n = typeof globalThis != "undefined" ? globalThis : n || self).LazyLoad = t();
      }(exports, function() {
        "use strict";
        function n() {
          return n = Object.assign || function(n2) {
            for (var t2 = 1; t2 < arguments.length; t2++) {
              var e2 = arguments[t2];
              for (var i2 in e2)
                Object.prototype.hasOwnProperty.call(e2, i2) && (n2[i2] = e2[i2]);
            }
            return n2;
          }, n.apply(this, arguments);
        }
        var t = typeof window != "undefined", e = t && !("onscroll" in window) || typeof navigator != "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), i = t && "IntersectionObserver" in window, o = t && "classList" in document.createElement("p"), a = t && window.devicePixelRatio > 1, r = { elements_selector: ".lazy", container: e || t ? document : null, threshold: 300, thresholds: null, data_src: "src", data_srcset: "srcset", data_sizes: "sizes", data_bg: "bg", data_bg_hidpi: "bg-hidpi", data_bg_multi: "bg-multi", data_bg_multi_hidpi: "bg-multi-hidpi", data_poster: "poster", class_applied: "applied", class_loading: "loading", class_loaded: "loaded", class_error: "error", class_entered: "entered", class_exited: "exited", unobserve_completed: true, unobserve_entered: false, cancel_on_exit: true, callback_enter: null, callback_exit: null, callback_applied: null, callback_loading: null, callback_loaded: null, callback_error: null, callback_finish: null, callback_cancel: null, use_native: false }, c = function(t2) {
          return n({}, r, t2);
        }, u = function(n2, t2) {
          var e2, i2 = "LazyLoad::Initialized", o2 = new n2(t2);
          try {
            e2 = new CustomEvent(i2, { detail: { instance: o2 } });
          } catch (n3) {
            (e2 = document.createEvent("CustomEvent")).initCustomEvent(i2, false, false, { instance: o2 });
          }
          window.dispatchEvent(e2);
        }, l = "src", s = "srcset", f = "sizes", d = "poster", _ = "llOriginalAttrs", g = "loading", v = "loaded", b = "applied", p = "error", h = "native", m = "data-", E = "ll-status", I = function(n2, t2) {
          return n2.getAttribute(m + t2);
        }, y = function(n2) {
          return I(n2, E);
        }, A = function(n2, t2) {
          return function(n3, t3, e2) {
            var i2 = "data-ll-status";
            e2 !== null ? n3.setAttribute(i2, e2) : n3.removeAttribute(i2);
          }(n2, 0, t2);
        }, k = function(n2) {
          return A(n2, null);
        }, L = function(n2) {
          return y(n2) === null;
        }, w = function(n2) {
          return y(n2) === h;
        }, x = [g, v, b, p], O = function(n2, t2, e2, i2) {
          n2 && (i2 === void 0 ? e2 === void 0 ? n2(t2) : n2(t2, e2) : n2(t2, e2, i2));
        }, N = function(n2, t2) {
          o ? n2.classList.add(t2) : n2.className += (n2.className ? " " : "") + t2;
        }, C = function(n2, t2) {
          o ? n2.classList.remove(t2) : n2.className = n2.className.replace(new RegExp("(^|\\s+)" + t2 + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
        }, M = function(n2) {
          return n2.llTempImage;
        }, z = function(n2, t2) {
          if (t2) {
            var e2 = t2._observer;
            e2 && e2.unobserve(n2);
          }
        }, R = function(n2, t2) {
          n2 && (n2.loadingCount += t2);
        }, T = function(n2, t2) {
          n2 && (n2.toLoadCount = t2);
        }, G = function(n2) {
          for (var t2, e2 = [], i2 = 0; t2 = n2.children[i2]; i2 += 1)
            t2.tagName === "SOURCE" && e2.push(t2);
          return e2;
        }, D = function(n2, t2) {
          var e2 = n2.parentNode;
          e2 && e2.tagName === "PICTURE" && G(e2).forEach(t2);
        }, V = function(n2, t2) {
          G(n2).forEach(t2);
        }, F = [l], j = [l, d], P = [l, s, f], S = function(n2) {
          return !!n2[_];
        }, U = function(n2) {
          return n2[_];
        }, $ = function(n2) {
          return delete n2[_];
        }, q = function(n2, t2) {
          if (!S(n2)) {
            var e2 = {};
            t2.forEach(function(t3) {
              e2[t3] = n2.getAttribute(t3);
            }), n2[_] = e2;
          }
        }, H = function(n2, t2) {
          if (S(n2)) {
            var e2 = U(n2);
            t2.forEach(function(t3) {
              !function(n3, t4, e3) {
                e3 ? n3.setAttribute(t4, e3) : n3.removeAttribute(t4);
              }(n2, t3, e2[t3]);
            });
          }
        }, B = function(n2, t2, e2) {
          N(n2, t2.class_loading), A(n2, g), e2 && (R(e2, 1), O(t2.callback_loading, n2, e2));
        }, J = function(n2, t2, e2) {
          e2 && n2.setAttribute(t2, e2);
        }, K = function(n2, t2) {
          J(n2, f, I(n2, t2.data_sizes)), J(n2, s, I(n2, t2.data_srcset)), J(n2, l, I(n2, t2.data_src));
        }, Q = { IMG: function(n2, t2) {
          D(n2, function(n3) {
            q(n3, P), K(n3, t2);
          }), q(n2, P), K(n2, t2);
        }, IFRAME: function(n2, t2) {
          q(n2, F), J(n2, l, I(n2, t2.data_src));
        }, VIDEO: function(n2, t2) {
          V(n2, function(n3) {
            q(n3, F), J(n3, l, I(n3, t2.data_src));
          }), q(n2, j), J(n2, d, I(n2, t2.data_poster)), J(n2, l, I(n2, t2.data_src)), n2.load();
        } }, W = ["IMG", "IFRAME", "VIDEO"], X = function(n2, t2) {
          !t2 || function(n3) {
            return n3.loadingCount > 0;
          }(t2) || function(n3) {
            return n3.toLoadCount > 0;
          }(t2) || O(n2.callback_finish, t2);
        }, Y = function(n2, t2, e2) {
          n2.addEventListener(t2, e2), n2.llEvLisnrs[t2] = e2;
        }, Z = function(n2, t2, e2) {
          n2.removeEventListener(t2, e2);
        }, nn = function(n2) {
          return !!n2.llEvLisnrs;
        }, tn = function(n2) {
          if (nn(n2)) {
            var t2 = n2.llEvLisnrs;
            for (var e2 in t2) {
              var i2 = t2[e2];
              Z(n2, e2, i2);
            }
            delete n2.llEvLisnrs;
          }
        }, en = function(n2, t2, e2) {
          !function(n3) {
            delete n3.llTempImage;
          }(n2), R(e2, -1), function(n3) {
            n3 && (n3.toLoadCount -= 1);
          }(e2), C(n2, t2.class_loading), t2.unobserve_completed && z(n2, e2);
        }, on = function(n2, t2, e2) {
          var i2 = M(n2) || n2;
          nn(i2) || function(n3, t3, e3) {
            nn(n3) || (n3.llEvLisnrs = {});
            var i3 = n3.tagName === "VIDEO" ? "loadeddata" : "load";
            Y(n3, i3, t3), Y(n3, "error", e3);
          }(i2, function(o2) {
            !function(n3, t3, e3, i3) {
              var o3 = w(t3);
              en(t3, e3, i3), N(t3, e3.class_loaded), A(t3, v), O(e3.callback_loaded, t3, i3), o3 || X(e3, i3);
            }(0, n2, t2, e2), tn(i2);
          }, function(o2) {
            !function(n3, t3, e3, i3) {
              var o3 = w(t3);
              en(t3, e3, i3), N(t3, e3.class_error), A(t3, p), O(e3.callback_error, t3, i3), o3 || X(e3, i3);
            }(0, n2, t2, e2), tn(i2);
          });
        }, an = function(n2, t2, e2) {
          !function(n3) {
            n3.llTempImage = document.createElement("IMG");
          }(n2), on(n2, t2, e2), function(n3) {
            S(n3) || (n3[_] = { backgroundImage: n3.style.backgroundImage });
          }(n2), function(n3, t3, e3) {
            var i2 = I(n3, t3.data_bg), o2 = I(n3, t3.data_bg_hidpi), r2 = a && o2 ? o2 : i2;
            r2 && (n3.style.backgroundImage = 'url("'.concat(r2, '")'), M(n3).setAttribute(l, r2), B(n3, t3, e3));
          }(n2, t2, e2), function(n3, t3, e3) {
            var i2 = I(n3, t3.data_bg_multi), o2 = I(n3, t3.data_bg_multi_hidpi), r2 = a && o2 ? o2 : i2;
            r2 && (n3.style.backgroundImage = r2, function(n4, t4, e4) {
              N(n4, t4.class_applied), A(n4, b), e4 && (t4.unobserve_completed && z(n4, t4), O(t4.callback_applied, n4, e4));
            }(n3, t3, e3));
          }(n2, t2, e2);
        }, rn = function(n2, t2, e2) {
          !function(n3) {
            return W.indexOf(n3.tagName) > -1;
          }(n2) ? an(n2, t2, e2) : function(n3, t3, e3) {
            on(n3, t3, e3), function(n4, t4, e4) {
              var i2 = Q[n4.tagName];
              i2 && (i2(n4, t4), B(n4, t4, e4));
            }(n3, t3, e3);
          }(n2, t2, e2);
        }, cn = function(n2) {
          n2.removeAttribute(l), n2.removeAttribute(s), n2.removeAttribute(f);
        }, un = function(n2) {
          D(n2, function(n3) {
            H(n3, P);
          }), H(n2, P);
        }, ln = { IMG: un, IFRAME: function(n2) {
          H(n2, F);
        }, VIDEO: function(n2) {
          V(n2, function(n3) {
            H(n3, F);
          }), H(n2, j), n2.load();
        } }, sn = function(n2, t2) {
          (function(n3) {
            var t3 = ln[n3.tagName];
            t3 ? t3(n3) : function(n4) {
              if (S(n4)) {
                var t4 = U(n4);
                n4.style.backgroundImage = t4.backgroundImage;
              }
            }(n3);
          })(n2), function(n3, t3) {
            L(n3) || w(n3) || (C(n3, t3.class_entered), C(n3, t3.class_exited), C(n3, t3.class_applied), C(n3, t3.class_loading), C(n3, t3.class_loaded), C(n3, t3.class_error));
          }(n2, t2), k(n2), $(n2);
        }, fn = ["IMG", "IFRAME", "VIDEO"], dn = function(n2) {
          return n2.use_native && "loading" in HTMLImageElement.prototype;
        }, _n = function(n2, t2, e2) {
          n2.forEach(function(n3) {
            return function(n4) {
              return n4.isIntersecting || n4.intersectionRatio > 0;
            }(n3) ? function(n4, t3, e3, i2) {
              var o2 = function(n5) {
                return x.indexOf(y(n5)) >= 0;
              }(n4);
              A(n4, "entered"), N(n4, e3.class_entered), C(n4, e3.class_exited), function(n5, t4, e4) {
                t4.unobserve_entered && z(n5, e4);
              }(n4, e3, i2), O(e3.callback_enter, n4, t3, i2), o2 || rn(n4, e3, i2);
            }(n3.target, n3, t2, e2) : function(n4, t3, e3, i2) {
              L(n4) || (N(n4, e3.class_exited), function(n5, t4, e4, i3) {
                e4.cancel_on_exit && function(n6) {
                  return y(n6) === g;
                }(n5) && n5.tagName === "IMG" && (tn(n5), function(n6) {
                  D(n6, function(n7) {
                    cn(n7);
                  }), cn(n6);
                }(n5), un(n5), C(n5, e4.class_loading), R(i3, -1), k(n5), O(e4.callback_cancel, n5, t4, i3));
              }(n4, t3, e3, i2), O(e3.callback_exit, n4, t3, i2));
            }(n3.target, n3, t2, e2);
          });
        }, gn = function(n2) {
          return Array.prototype.slice.call(n2);
        }, vn = function(n2) {
          return n2.container.querySelectorAll(n2.elements_selector);
        }, bn = function(n2) {
          return function(n3) {
            return y(n3) === p;
          }(n2);
        }, pn = function(n2, t2) {
          return function(n3) {
            return gn(n3).filter(L);
          }(n2 || vn(t2));
        }, hn = function(n2, e2) {
          var o2 = c(n2);
          this._settings = o2, this.loadingCount = 0, function(n3, t2) {
            i && !dn(n3) && (t2._observer = new IntersectionObserver(function(e3) {
              _n(e3, n3, t2);
            }, function(n4) {
              return { root: n4.container === document ? null : n4.container, rootMargin: n4.thresholds || n4.threshold + "px" };
            }(n3)));
          }(o2, this), function(n3, e3) {
            t && window.addEventListener("online", function() {
              !function(n4, t2) {
                var e4;
                (e4 = vn(n4), gn(e4).filter(bn)).forEach(function(t3) {
                  C(t3, n4.class_error), k(t3);
                }), t2.update();
              }(n3, e3);
            });
          }(o2, this), this.update(e2);
        };
        return hn.prototype = { update: function(n2) {
          var t2, o2, a2 = this._settings, r2 = pn(n2, a2);
          T(this, r2.length), !e && i ? dn(a2) ? function(n3, t3, e2) {
            n3.forEach(function(n4) {
              fn.indexOf(n4.tagName) !== -1 && function(n5, t4, e3) {
                n5.setAttribute("loading", "lazy"), on(n5, t4, e3), function(n6, t5) {
                  var e4 = Q[n6.tagName];
                  e4 && e4(n6, t5);
                }(n5, t4), A(n5, h);
              }(n4, t3, e2);
            }), T(e2, 0);
          }(r2, a2, this) : (o2 = r2, function(n3) {
            n3.disconnect();
          }(t2 = this._observer), function(n3, t3) {
            t3.forEach(function(t4) {
              n3.observe(t4);
            });
          }(t2, o2)) : this.loadAll(r2);
        }, destroy: function() {
          this._observer && this._observer.disconnect(), vn(this._settings).forEach(function(n2) {
            $(n2);
          }), delete this._observer, delete this._settings, delete this.loadingCount, delete this.toLoadCount;
        }, loadAll: function(n2) {
          var t2 = this, e2 = this._settings;
          pn(n2, e2).forEach(function(n3) {
            z(n3, t2), rn(n3, e2, t2);
          });
        }, restoreAll: function() {
          var n2 = this._settings;
          vn(n2).forEach(function(t2) {
            sn(t2, n2);
          });
        } }, hn.load = function(n2, t2) {
          var e2 = c(t2);
          rn(n2, e2);
        }, hn.resetStatus = function(n2) {
          k(n2);
        }, t && function(n2, t2) {
          if (t2)
            if (t2.length)
              for (var e2, i2 = 0; e2 = t2[i2]; i2 += 1)
                u(n2, e2);
            else
              u(n2, t2);
        }(hn, window.lazyLoadOptions), hn;
      });
    }
  });

  // node_modules/smoothscroll-polyfill/dist/smoothscroll.js
  var require_smoothscroll = __commonJS({
    "node_modules/smoothscroll-polyfill/dist/smoothscroll.js"(exports, module) {
      (function() {
        "use strict";
        function polyfill2() {
          var w = window;
          var d = document;
          if ("scrollBehavior" in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
            return;
          }
          var Element2 = w.HTMLElement || w.Element;
          var SCROLL_TIME = 468;
          var original = {
            scroll: w.scroll || w.scrollTo,
            scrollBy: w.scrollBy,
            elementScroll: Element2.prototype.scroll || scrollElement,
            scrollIntoView: Element2.prototype.scrollIntoView
          };
          var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;
          function isMicrosoftBrowser(userAgent) {
            var userAgentPatterns = ["MSIE ", "Trident/", "Edge/"];
            return new RegExp(userAgentPatterns.join("|")).test(userAgent);
          }
          var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;
          function scrollElement(x, y) {
            this.scrollLeft = x;
            this.scrollTop = y;
          }
          function ease(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
          }
          function shouldBailOut(firstArg) {
            if (firstArg === null || typeof firstArg !== "object" || firstArg.behavior === void 0 || firstArg.behavior === "auto" || firstArg.behavior === "instant") {
              return true;
            }
            if (typeof firstArg === "object" && firstArg.behavior === "smooth") {
              return false;
            }
            throw new TypeError("behavior member of ScrollOptions " + firstArg.behavior + " is not a valid value for enumeration ScrollBehavior.");
          }
          function hasScrollableSpace(el, axis) {
            if (axis === "Y") {
              return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
            }
            if (axis === "X") {
              return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
            }
          }
          function canOverflow(el, axis) {
            var overflowValue = w.getComputedStyle(el, null)["overflow" + axis];
            return overflowValue === "auto" || overflowValue === "scroll";
          }
          function isScrollable(el) {
            var isScrollableY = hasScrollableSpace(el, "Y") && canOverflow(el, "Y");
            var isScrollableX = hasScrollableSpace(el, "X") && canOverflow(el, "X");
            return isScrollableY || isScrollableX;
          }
          function findScrollableParent(el) {
            while (el !== d.body && isScrollable(el) === false) {
              el = el.parentNode || el.host;
            }
            return el;
          }
          function step(context) {
            var time = now();
            var value;
            var currentX;
            var currentY;
            var elapsed = (time - context.startTime) / SCROLL_TIME;
            elapsed = elapsed > 1 ? 1 : elapsed;
            value = ease(elapsed);
            currentX = context.startX + (context.x - context.startX) * value;
            currentY = context.startY + (context.y - context.startY) * value;
            context.method.call(context.scrollable, currentX, currentY);
            if (currentX !== context.x || currentY !== context.y) {
              w.requestAnimationFrame(step.bind(w, context));
            }
          }
          function smoothScroll(el, x, y) {
            var scrollable;
            var startX;
            var startY;
            var method;
            var startTime = now();
            if (el === d.body) {
              scrollable = w;
              startX = w.scrollX || w.pageXOffset;
              startY = w.scrollY || w.pageYOffset;
              method = original.scroll;
            } else {
              scrollable = el;
              startX = el.scrollLeft;
              startY = el.scrollTop;
              method = scrollElement;
            }
            step({
              scrollable,
              method,
              startTime,
              startX,
              startY,
              x,
              y
            });
          }
          w.scroll = w.scrollTo = function() {
            if (arguments[0] === void 0) {
              return;
            }
            if (shouldBailOut(arguments[0]) === true) {
              original.scroll.call(w, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] !== "object" ? arguments[0] : w.scrollX || w.pageXOffset, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : w.scrollY || w.pageYOffset);
              return;
            }
            smoothScroll.call(w, d.body, arguments[0].left !== void 0 ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== void 0 ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
          };
          w.scrollBy = function() {
            if (arguments[0] === void 0) {
              return;
            }
            if (shouldBailOut(arguments[0])) {
              original.scrollBy.call(w, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] !== "object" ? arguments[0] : 0, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : 0);
              return;
            }
            smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
          };
          Element2.prototype.scroll = Element2.prototype.scrollTo = function() {
            if (arguments[0] === void 0) {
              return;
            }
            if (shouldBailOut(arguments[0]) === true) {
              if (typeof arguments[0] === "number" && arguments[1] === void 0) {
                throw new SyntaxError("Value could not be converted");
              }
              original.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left : typeof arguments[0] !== "object" ? ~~arguments[0] : this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top : arguments[1] !== void 0 ? ~~arguments[1] : this.scrollTop);
              return;
            }
            var left = arguments[0].left;
            var top = arguments[0].top;
            smoothScroll.call(this, this, typeof left === "undefined" ? this.scrollLeft : ~~left, typeof top === "undefined" ? this.scrollTop : ~~top);
          };
          Element2.prototype.scrollBy = function() {
            if (arguments[0] === void 0) {
              return;
            }
            if (shouldBailOut(arguments[0]) === true) {
              original.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
              return;
            }
            this.scroll({
              left: ~~arguments[0].left + this.scrollLeft,
              top: ~~arguments[0].top + this.scrollTop,
              behavior: arguments[0].behavior
            });
          };
          Element2.prototype.scrollIntoView = function() {
            if (shouldBailOut(arguments[0]) === true) {
              original.scrollIntoView.call(this, arguments[0] === void 0 ? true : arguments[0]);
              return;
            }
            var scrollableParent = findScrollableParent(this);
            var parentRects = scrollableParent.getBoundingClientRect();
            var clientRects = this.getBoundingClientRect();
            if (scrollableParent !== d.body) {
              smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);
              if (w.getComputedStyle(scrollableParent).position !== "fixed") {
                w.scrollBy({
                  left: parentRects.left,
                  top: parentRects.top,
                  behavior: "smooth"
                });
              }
            } else {
              w.scrollBy({
                left: clientRects.left,
                top: clientRects.top,
                behavior: "smooth"
              });
            }
          };
        }
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = { polyfill: polyfill2 };
        } else {
          polyfill2();
        }
      })();
    }
  });

  // ns-hugo:/Users/ainsley/Desktop/Web/websites/ainsley.dev/themes/ainsley.dev/assets/js/scripts/polyfills.js
  var polyfills_exports = {};
  function isInternetExplorer() {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");
    return msie > 0;
  }
  var smoothscroll;
  var init_polyfills = __esm({
    "ns-hugo:/Users/ainsley/Desktop/Web/websites/ainsley.dev/themes/ainsley.dev/assets/js/scripts/polyfills.js"() {
      smoothscroll = __toESM(require_smoothscroll());
      smoothscroll.polyfill();
      if (isInternetExplorer()) {
        html.classList.add("ie");
      }
      if ("NodeList" in window && !NodeList.prototype.forEach) {
        console.info("polyfill for IE11");
        NodeList.prototype.forEach = function(callback, thisArg) {
          thisArg = thisArg || window;
          for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
          }
        };
      }
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
          var el = this;
          do {
            if (Element.prototype.matches.call(el, s))
              return el;
            el = el.parentElement || el.parentNode;
          } while (el !== null && el.nodeType === 1);
          return null;
        };
      }
    }
  });

  // <stdin>
  var import_vanilla_lazyload = __toESM(require_lazyload_min());
  init_polyfills();
  var html2 = document.querySelector("html");
  var header = document.querySelector(".header");
  var nav = document.querySelector(".nav");
  var hamburger = document.querySelector(".hamburger");
  html2.classList.remove("no-js");
  html2.classList.add("js");
  var lazyLoadInstance = new import_vanilla_lazyload.default({
    elements_selector: ".lazy"
  });
  var headerOffset = header.offsetHeight;
  window.addEventListener("resize", function() {
    headerOffset = header.offsetHeight;
  });
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      let offset = headerOffset, section = document.querySelector(anchor.getAttribute("href")), elementPosition = section.offsetTop, offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });
  var scrollPos = 100;
  window.addEventListener("scroll", function() {
    if (window.pageYOffset > scrollPos) {
      header.classList.add("header-scrolled");
      nav.classList.add("nav-scrolled");
    } else {
      header.classList.remove("header-scrolled");
      nav.classList.remove("nav-scrolled");
    }
  });
  var links = document.querySelectorAll(".header .nav .nav-item a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth < 1025) {
        header.classList.remove("header-active");
        nav.classList.remove("nav-mobile-active");
        document.querySelector("#hamburger-check").checked = "";
      }
    });
  });
})();
