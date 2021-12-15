(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/vanilla-lazyload/dist/lazyload.min.js
  var require_lazyload_min = __commonJS({
    "node_modules/vanilla-lazyload/dist/lazyload.min.js"(exports, module) {
      !function(t, n) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = n() : typeof define == "function" && define.amd ? define(n) : (t = typeof globalThis != "undefined" ? globalThis : t || self).LazyLoad = n();
      }(exports, function() {
        "use strict";
        function t() {
          return (t = Object.assign || function(t2) {
            for (var n2 = 1; n2 < arguments.length; n2++) {
              var e2 = arguments[n2];
              for (var i2 in e2)
                Object.prototype.hasOwnProperty.call(e2, i2) && (t2[i2] = e2[i2]);
            }
            return t2;
          }).apply(this, arguments);
        }
        var n = typeof window != "undefined", e = n && !("onscroll" in window) || typeof navigator != "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), i = n && "IntersectionObserver" in window, o = n && "classList" in document.createElement("p"), r = n && window.devicePixelRatio > 1, a = { elements_selector: ".lazy", container: e || n ? document : null, threshold: 300, thresholds: null, data_src: "src", data_srcset: "srcset", data_sizes: "sizes", data_bg: "bg", data_bg_hidpi: "bg-hidpi", data_bg_multi: "bg-multi", data_bg_multi_hidpi: "bg-multi-hidpi", data_poster: "poster", class_applied: "applied", class_loading: "loading", class_loaded: "loaded", class_error: "error", class_entered: "entered", class_exited: "exited", unobserve_completed: true, unobserve_entered: false, cancel_on_exit: true, callback_enter: null, callback_exit: null, callback_applied: null, callback_loading: null, callback_loaded: null, callback_error: null, callback_finish: null, callback_cancel: null, use_native: false }, c = function(n2) {
          return t({}, a, n2);
        }, s = function(t2, n2) {
          var e2, i2 = "LazyLoad::Initialized", o2 = new t2(n2);
          try {
            e2 = new CustomEvent(i2, { detail: { instance: o2 } });
          } catch (t3) {
            (e2 = document.createEvent("CustomEvent")).initCustomEvent(i2, false, false, { instance: o2 });
          }
          window.dispatchEvent(e2);
        }, l = "loading", u = "loaded", d = "applied", f = "error", _ = "native", g = "data-", v = "ll-status", b = function(t2, n2) {
          return t2.getAttribute(g + n2);
        }, p = function(t2) {
          return b(t2, v);
        }, h = function(t2, n2) {
          return function(t3, n3, e2) {
            var i2 = "data-ll-status";
            e2 !== null ? t3.setAttribute(i2, e2) : t3.removeAttribute(i2);
          }(t2, 0, n2);
        }, m = function(t2) {
          return h(t2, null);
        }, E = function(t2) {
          return p(t2) === null;
        }, y = function(t2) {
          return p(t2) === _;
        }, I = [l, u, d, f], A = function(t2, n2, e2, i2) {
          t2 && (i2 === void 0 ? e2 === void 0 ? t2(n2) : t2(n2, e2) : t2(n2, e2, i2));
        }, L = function(t2, n2) {
          o ? t2.classList.add(n2) : t2.className += (t2.className ? " " : "") + n2;
        }, w = function(t2, n2) {
          o ? t2.classList.remove(n2) : t2.className = t2.className.replace(new RegExp("(^|\\s+)" + n2 + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
        }, k = function(t2) {
          return t2.llTempImage;
        }, O = function(t2, n2) {
          if (n2) {
            var e2 = n2._observer;
            e2 && e2.unobserve(t2);
          }
        }, x = function(t2, n2) {
          t2 && (t2.loadingCount += n2);
        }, z = function(t2, n2) {
          t2 && (t2.toLoadCount = n2);
        }, C = function(t2) {
          for (var n2, e2 = [], i2 = 0; n2 = t2.children[i2]; i2 += 1)
            n2.tagName === "SOURCE" && e2.push(n2);
          return e2;
        }, N = function(t2, n2, e2) {
          e2 && t2.setAttribute(n2, e2);
        }, M = function(t2, n2) {
          t2.removeAttribute(n2);
        }, R = function(t2) {
          return !!t2.llOriginalAttrs;
        }, T = function(t2) {
          if (!R(t2)) {
            var n2 = {};
            n2.src = t2.getAttribute("src"), n2.srcset = t2.getAttribute("srcset"), n2.sizes = t2.getAttribute("sizes"), t2.llOriginalAttrs = n2;
          }
        }, G = function(t2) {
          if (R(t2)) {
            var n2 = t2.llOriginalAttrs;
            N(t2, "src", n2.src), N(t2, "srcset", n2.srcset), N(t2, "sizes", n2.sizes);
          }
        }, D = function(t2, n2) {
          N(t2, "sizes", b(t2, n2.data_sizes)), N(t2, "srcset", b(t2, n2.data_srcset)), N(t2, "src", b(t2, n2.data_src));
        }, V = function(t2) {
          M(t2, "src"), M(t2, "srcset"), M(t2, "sizes");
        }, j = function(t2, n2) {
          var e2 = t2.parentNode;
          e2 && e2.tagName === "PICTURE" && C(e2).forEach(n2);
        }, F = { IMG: function(t2, n2) {
          j(t2, function(t3) {
            T(t3), D(t3, n2);
          }), T(t2), D(t2, n2);
        }, IFRAME: function(t2, n2) {
          N(t2, "src", b(t2, n2.data_src));
        }, VIDEO: function(t2, n2) {
          !function(t3, e2) {
            C(t3).forEach(function(t4) {
              N(t4, "src", b(t4, n2.data_src));
            });
          }(t2), N(t2, "poster", b(t2, n2.data_poster)), N(t2, "src", b(t2, n2.data_src)), t2.load();
        } }, P = function(t2, n2) {
          var e2 = F[t2.tagName];
          e2 && e2(t2, n2);
        }, S = function(t2, n2, e2) {
          x(e2, 1), L(t2, n2.class_loading), h(t2, l), A(n2.callback_loading, t2, e2);
        }, U = ["IMG", "IFRAME", "VIDEO"], $ = function(t2, n2) {
          !n2 || function(t3) {
            return t3.loadingCount > 0;
          }(n2) || function(t3) {
            return t3.toLoadCount > 0;
          }(n2) || A(t2.callback_finish, n2);
        }, q = function(t2, n2, e2) {
          t2.addEventListener(n2, e2), t2.llEvLisnrs[n2] = e2;
        }, H = function(t2, n2, e2) {
          t2.removeEventListener(n2, e2);
        }, B = function(t2) {
          return !!t2.llEvLisnrs;
        }, J = function(t2) {
          if (B(t2)) {
            var n2 = t2.llEvLisnrs;
            for (var e2 in n2) {
              var i2 = n2[e2];
              H(t2, e2, i2);
            }
            delete t2.llEvLisnrs;
          }
        }, K = function(t2, n2, e2) {
          !function(t3) {
            delete t3.llTempImage;
          }(t2), x(e2, -1), function(t3) {
            t3 && (t3.toLoadCount -= 1);
          }(e2), w(t2, n2.class_loading), n2.unobserve_completed && O(t2, e2);
        }, Q = function(t2, n2, e2) {
          var i2 = k(t2) || t2;
          B(i2) || function(t3, n3, e3) {
            B(t3) || (t3.llEvLisnrs = {});
            var i3 = t3.tagName === "VIDEO" ? "loadeddata" : "load";
            q(t3, i3, n3), q(t3, "error", e3);
          }(i2, function(o2) {
            !function(t3, n3, e3, i3) {
              var o3 = y(n3);
              K(n3, e3, i3), L(n3, e3.class_loaded), h(n3, u), A(e3.callback_loaded, n3, i3), o3 || $(e3, i3);
            }(0, t2, n2, e2), J(i2);
          }, function(o2) {
            !function(t3, n3, e3, i3) {
              var o3 = y(n3);
              K(n3, e3, i3), L(n3, e3.class_error), h(n3, f), A(e3.callback_error, n3, i3), o3 || $(e3, i3);
            }(0, t2, n2, e2), J(i2);
          });
        }, W = function(t2, n2, e2) {
          !function(t3) {
            t3.llTempImage = document.createElement("IMG");
          }(t2), Q(t2, n2, e2), function(t3, n3, e3) {
            var i2 = b(t3, n3.data_bg), o2 = b(t3, n3.data_bg_hidpi), a2 = r && o2 ? o2 : i2;
            a2 && (t3.style.backgroundImage = 'url("'.concat(a2, '")'), k(t3).setAttribute("src", a2), S(t3, n3, e3));
          }(t2, n2, e2), function(t3, n3, e3) {
            var i2 = b(t3, n3.data_bg_multi), o2 = b(t3, n3.data_bg_multi_hidpi), a2 = r && o2 ? o2 : i2;
            a2 && (t3.style.backgroundImage = a2, function(t4, n4, e4) {
              L(t4, n4.class_applied), h(t4, d), n4.unobserve_completed && O(t4, n4), A(n4.callback_applied, t4, e4);
            }(t3, n3, e3));
          }(t2, n2, e2);
        }, X = function(t2, n2, e2) {
          !function(t3) {
            return U.indexOf(t3.tagName) > -1;
          }(t2) ? W(t2, n2, e2) : function(t3, n3, e3) {
            Q(t3, n3, e3), P(t3, n3), S(t3, n3, e3);
          }(t2, n2, e2);
        }, Y = ["IMG", "IFRAME", "VIDEO"], Z = function(t2) {
          return t2.use_native && "loading" in HTMLImageElement.prototype;
        }, tt = function(t2, n2, e2) {
          t2.forEach(function(t3) {
            return function(t4) {
              return t4.isIntersecting || t4.intersectionRatio > 0;
            }(t3) ? function(t4, n3, e3, i2) {
              var o2 = function(t5) {
                return I.indexOf(p(t5)) >= 0;
              }(t4);
              h(t4, "entered"), L(t4, e3.class_entered), w(t4, e3.class_exited), function(t5, n4, e4) {
                n4.unobserve_entered && O(t5, e4);
              }(t4, e3, i2), A(e3.callback_enter, t4, n3, i2), o2 || X(t4, e3, i2);
            }(t3.target, t3, n2, e2) : function(t4, n3, e3, i2) {
              E(t4) || (L(t4, e3.class_exited), function(t5, n4, e4, i3) {
                e4.cancel_on_exit && function(t6) {
                  return p(t6) === l;
                }(t5) && t5.tagName === "IMG" && (J(t5), function(t6) {
                  j(t6, function(t7) {
                    V(t7);
                  }), V(t6);
                }(t5), function(t6) {
                  j(t6, function(t7) {
                    G(t7);
                  }), G(t6);
                }(t5), w(t5, e4.class_loading), x(i3, -1), m(t5), A(e4.callback_cancel, t5, n4, i3));
              }(t4, n3, e3, i2), A(e3.callback_exit, t4, n3, i2));
            }(t3.target, t3, n2, e2);
          });
        }, nt = function(t2) {
          return Array.prototype.slice.call(t2);
        }, et = function(t2) {
          return t2.container.querySelectorAll(t2.elements_selector);
        }, it = function(t2) {
          return function(t3) {
            return p(t3) === f;
          }(t2);
        }, ot = function(t2, n2) {
          return function(t3) {
            return nt(t3).filter(E);
          }(t2 || et(n2));
        }, rt = function(t2, e2) {
          var o2 = c(t2);
          this._settings = o2, this.loadingCount = 0, function(t3, n2) {
            i && !Z(t3) && (n2._observer = new IntersectionObserver(function(e3) {
              tt(e3, t3, n2);
            }, function(t4) {
              return { root: t4.container === document ? null : t4.container, rootMargin: t4.thresholds || t4.threshold + "px" };
            }(t3)));
          }(o2, this), function(t3, e3) {
            n && window.addEventListener("online", function() {
              !function(t4, n2) {
                var e4;
                (e4 = et(t4), nt(e4).filter(it)).forEach(function(n3) {
                  w(n3, t4.class_error), m(n3);
                }), n2.update();
              }(t3, e3);
            });
          }(o2, this), this.update(e2);
        };
        return rt.prototype = { update: function(t2) {
          var n2, o2, r2 = this._settings, a2 = ot(t2, r2);
          z(this, a2.length), !e && i ? Z(r2) ? function(t3, n3, e2) {
            t3.forEach(function(t4) {
              Y.indexOf(t4.tagName) !== -1 && function(t5, n4, e3) {
                t5.setAttribute("loading", "lazy"), Q(t5, n4, e3), P(t5, n4), h(t5, _);
              }(t4, n3, e2);
            }), z(e2, 0);
          }(a2, r2, this) : (o2 = a2, function(t3) {
            t3.disconnect();
          }(n2 = this._observer), function(t3, n3) {
            n3.forEach(function(n4) {
              t3.observe(n4);
            });
          }(n2, o2)) : this.loadAll(a2);
        }, destroy: function() {
          this._observer && this._observer.disconnect(), et(this._settings).forEach(function(t2) {
            delete t2.llOriginalAttrs;
          }), delete this._observer, delete this._settings, delete this.loadingCount, delete this.toLoadCount;
        }, loadAll: function(t2) {
          var n2 = this, e2 = this._settings;
          ot(t2, e2).forEach(function(t3) {
            O(t3, n2), X(t3, e2, n2);
          });
        } }, rt.load = function(t2, n2) {
          var e2 = c(n2);
          X(t2, e2);
        }, rt.resetStatus = function(t2) {
          m(t2);
        }, n && function(t2, n2) {
          if (n2)
            if (n2.length)
              for (var e2, i2 = 0; e2 = n2[i2]; i2 += 1)
                s(t2, e2);
            else
              s(t2, n2);
        }(rt, window.lazyLoadOptions), rt;
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

  // ns-hugo:/Users/ainsley/Desktop/Reddico/boilerplates/resource/themes/reddico/assets/js/scripts/polyfills.js
  var polyfills_exports = {};
  __markAsModule(polyfills_exports);
  function isInternetExplorer() {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");
    return msie > 0;
  }
  var smoothscroll;
  var init_polyfills = __esm({
    "ns-hugo:/Users/ainsley/Desktop/Reddico/boilerplates/resource/themes/reddico/assets/js/scripts/polyfills.js"() {
      smoothscroll = __toModule(require_smoothscroll());
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
  var import_vanilla_lazyload = __toModule(require_lazyload_min());
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
