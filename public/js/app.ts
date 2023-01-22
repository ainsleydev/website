"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/vanilla-lazyload/dist/lazyload.min.js
  var require_lazyload_min = __commonJS({
    "node_modules/vanilla-lazyload/dist/lazyload.min.js"(exports, module) {
      !function(n, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (n = "undefined" != typeof globalThis ? globalThis : n || self).LazyLoad = t();
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
        var t = "undefined" != typeof window, e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), i = t && "IntersectionObserver" in window, o = t && "classList" in document.createElement("p"), a = t && window.devicePixelRatio > 1, r = { elements_selector: ".lazy", container: e || t ? document : null, threshold: 300, thresholds: null, data_src: "src", data_srcset: "srcset", data_sizes: "sizes", data_bg: "bg", data_bg_hidpi: "bg-hidpi", data_bg_multi: "bg-multi", data_bg_multi_hidpi: "bg-multi-hidpi", data_bg_set: "bg-set", data_poster: "poster", class_applied: "applied", class_loading: "loading", class_loaded: "loaded", class_error: "error", class_entered: "entered", class_exited: "exited", unobserve_completed: true, unobserve_entered: false, cancel_on_exit: true, callback_enter: null, callback_exit: null, callback_applied: null, callback_loading: null, callback_loaded: null, callback_error: null, callback_finish: null, callback_cancel: null, use_native: false, restore_on_error: false }, c = function(t2) {
          return n({}, r, t2);
        }, l = function(n2, t2) {
          var e2, i2 = "LazyLoad::Initialized", o2 = new n2(t2);
          try {
            e2 = new CustomEvent(i2, { detail: { instance: o2 } });
          } catch (n3) {
            (e2 = document.createEvent("CustomEvent")).initCustomEvent(i2, false, false, { instance: o2 });
          }
          window.dispatchEvent(e2);
        }, u = "src", s = "srcset", d = "sizes", f = "poster", _ = "llOriginalAttrs", g = "data", v = "loading", b = "loaded", m = "applied", p = "error", h = "native", E = "data-", I = "ll-status", y = function(n2, t2) {
          return n2.getAttribute(E + t2);
        }, k = function(n2) {
          return y(n2, I);
        }, w = function(n2, t2) {
          return function(n3, t3, e2) {
            var i2 = "data-ll-status";
            null !== e2 ? n3.setAttribute(i2, e2) : n3.removeAttribute(i2);
          }(n2, 0, t2);
        }, A = function(n2) {
          return w(n2, null);
        }, L = function(n2) {
          return null === k(n2);
        }, O = function(n2) {
          return k(n2) === h;
        }, x = [v, b, m, p], C = function(n2, t2, e2, i2) {
          n2 && (void 0 === i2 ? void 0 === e2 ? n2(t2) : n2(t2, e2) : n2(t2, e2, i2));
        }, N = function(n2, t2) {
          o ? n2.classList.add(t2) : n2.className += (n2.className ? " " : "") + t2;
        }, M = function(n2, t2) {
          o ? n2.classList.remove(t2) : n2.className = n2.className.replace(new RegExp("(^|\\s+)" + t2 + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
        }, z = function(n2) {
          return n2.llTempImage;
        }, T = function(n2, t2) {
          if (t2) {
            var e2 = t2._observer;
            e2 && e2.unobserve(n2);
          }
        }, R = function(n2, t2) {
          n2 && (n2.loadingCount += t2);
        }, G = function(n2, t2) {
          n2 && (n2.toLoadCount = t2);
        }, j = function(n2) {
          for (var t2, e2 = [], i2 = 0; t2 = n2.children[i2]; i2 += 1)
            "SOURCE" === t2.tagName && e2.push(t2);
          return e2;
        }, D = function(n2, t2) {
          var e2 = n2.parentNode;
          e2 && "PICTURE" === e2.tagName && j(e2).forEach(t2);
        }, H = function(n2, t2) {
          j(n2).forEach(t2);
        }, V = [u], F = [u, f], B = [u, s, d], J = [g], P = function(n2) {
          return !!n2[_];
        }, S = function(n2) {
          return n2[_];
        }, U = function(n2) {
          return delete n2[_];
        }, $ = function(n2, t2) {
          if (!P(n2)) {
            var e2 = {};
            t2.forEach(function(t3) {
              e2[t3] = n2.getAttribute(t3);
            }), n2[_] = e2;
          }
        }, q = function(n2, t2) {
          if (P(n2)) {
            var e2 = S(n2);
            t2.forEach(function(t3) {
              !function(n3, t4, e3) {
                e3 ? n3.setAttribute(t4, e3) : n3.removeAttribute(t4);
              }(n2, t3, e2[t3]);
            });
          }
        }, K = function(n2, t2, e2) {
          N(n2, t2.class_applied), w(n2, m), e2 && (t2.unobserve_completed && T(n2, t2), C(t2.callback_applied, n2, e2));
        }, Q = function(n2, t2, e2) {
          N(n2, t2.class_loading), w(n2, v), e2 && (R(e2, 1), C(t2.callback_loading, n2, e2));
        }, W = function(n2, t2, e2) {
          e2 && n2.setAttribute(t2, e2);
        }, X = function(n2, t2) {
          W(n2, d, y(n2, t2.data_sizes)), W(n2, s, y(n2, t2.data_srcset)), W(n2, u, y(n2, t2.data_src));
        }, Y = { IMG: function(n2, t2) {
          D(n2, function(n3) {
            $(n3, B), X(n3, t2);
          }), $(n2, B), X(n2, t2);
        }, IFRAME: function(n2, t2) {
          $(n2, V), W(n2, u, y(n2, t2.data_src));
        }, VIDEO: function(n2, t2) {
          H(n2, function(n3) {
            $(n3, V), W(n3, u, y(n3, t2.data_src));
          }), $(n2, F), W(n2, f, y(n2, t2.data_poster)), W(n2, u, y(n2, t2.data_src)), n2.load();
        }, OBJECT: function(n2, t2) {
          $(n2, J), W(n2, g, y(n2, t2.data_src));
        } }, Z = ["IMG", "IFRAME", "VIDEO", "OBJECT"], nn = function(n2, t2) {
          !t2 || function(n3) {
            return n3.loadingCount > 0;
          }(t2) || function(n3) {
            return n3.toLoadCount > 0;
          }(t2) || C(n2.callback_finish, t2);
        }, tn = function(n2, t2, e2) {
          n2.addEventListener(t2, e2), n2.llEvLisnrs[t2] = e2;
        }, en = function(n2, t2, e2) {
          n2.removeEventListener(t2, e2);
        }, on = function(n2) {
          return !!n2.llEvLisnrs;
        }, an = function(n2) {
          if (on(n2)) {
            var t2 = n2.llEvLisnrs;
            for (var e2 in t2) {
              var i2 = t2[e2];
              en(n2, e2, i2);
            }
            delete n2.llEvLisnrs;
          }
        }, rn = function(n2, t2, e2) {
          !function(n3) {
            delete n3.llTempImage;
          }(n2), R(e2, -1), function(n3) {
            n3 && (n3.toLoadCount -= 1);
          }(e2), M(n2, t2.class_loading), t2.unobserve_completed && T(n2, e2);
        }, cn = function(n2, t2, e2) {
          var i2 = z(n2) || n2;
          on(i2) || function(n3, t3, e3) {
            on(n3) || (n3.llEvLisnrs = {});
            var i3 = "VIDEO" === n3.tagName ? "loadeddata" : "load";
            tn(n3, i3, t3), tn(n3, "error", e3);
          }(i2, function(o2) {
            !function(n3, t3, e3, i3) {
              var o3 = O(t3);
              rn(t3, e3, i3), N(t3, e3.class_loaded), w(t3, b), C(e3.callback_loaded, t3, i3), o3 || nn(e3, i3);
            }(0, n2, t2, e2), an(i2);
          }, function(o2) {
            !function(n3, t3, e3, i3) {
              var o3 = O(t3);
              rn(t3, e3, i3), N(t3, e3.class_error), w(t3, p), C(e3.callback_error, t3, i3), e3.restore_on_error && q(t3, B), o3 || nn(e3, i3);
            }(0, n2, t2, e2), an(i2);
          });
        }, ln = function(n2, t2, e2) {
          !function(n3) {
            return Z.indexOf(n3.tagName) > -1;
          }(n2) ? function(n3, t3, e3) {
            !function(n4) {
              n4.llTempImage = document.createElement("IMG");
            }(n3), cn(n3, t3, e3), function(n4) {
              P(n4) || (n4[_] = { backgroundImage: n4.style.backgroundImage });
            }(n3), function(n4, t4, e4) {
              var i2 = y(n4, t4.data_bg), o2 = y(n4, t4.data_bg_hidpi), r2 = a && o2 ? o2 : i2;
              r2 && (n4.style.backgroundImage = 'url("'.concat(r2, '")'), z(n4).setAttribute(u, r2), Q(n4, t4, e4));
            }(n3, t3, e3), function(n4, t4, e4) {
              var i2 = y(n4, t4.data_bg_multi), o2 = y(n4, t4.data_bg_multi_hidpi), r2 = a && o2 ? o2 : i2;
              r2 && (n4.style.backgroundImage = r2, K(n4, t4, e4));
            }(n3, t3, e3), function(n4, t4, e4) {
              var i2 = y(n4, t4.data_bg_set);
              if (i2) {
                var o2 = i2.split("|"), a2 = o2.map(function(n5) {
                  return "image-set(".concat(n5, ")");
                });
                n4.style.backgroundImage = a2.join(), "" === n4.style.backgroundImage && (a2 = o2.map(function(n5) {
                  return "-webkit-image-set(".concat(n5, ")");
                }), n4.style.backgroundImage = a2.join()), K(n4, t4, e4);
              }
            }(n3, t3, e3);
          }(n2, t2, e2) : function(n3, t3, e3) {
            cn(n3, t3, e3), function(n4, t4, e4) {
              var i2 = Y[n4.tagName];
              i2 && (i2(n4, t4), Q(n4, t4, e4));
            }(n3, t3, e3);
          }(n2, t2, e2);
        }, un = function(n2) {
          n2.removeAttribute(u), n2.removeAttribute(s), n2.removeAttribute(d);
        }, sn = function(n2) {
          D(n2, function(n3) {
            q(n3, B);
          }), q(n2, B);
        }, dn = { IMG: sn, IFRAME: function(n2) {
          q(n2, V);
        }, VIDEO: function(n2) {
          H(n2, function(n3) {
            q(n3, V);
          }), q(n2, F), n2.load();
        }, OBJECT: function(n2) {
          q(n2, J);
        } }, fn = function(n2, t2) {
          (function(n3) {
            var t3 = dn[n3.tagName];
            t3 ? t3(n3) : function(n4) {
              if (P(n4)) {
                var t4 = S(n4);
                n4.style.backgroundImage = t4.backgroundImage;
              }
            }(n3);
          })(n2), function(n3, t3) {
            L(n3) || O(n3) || (M(n3, t3.class_entered), M(n3, t3.class_exited), M(n3, t3.class_applied), M(n3, t3.class_loading), M(n3, t3.class_loaded), M(n3, t3.class_error));
          }(n2, t2), A(n2), U(n2);
        }, _n = ["IMG", "IFRAME", "VIDEO"], gn = function(n2) {
          return n2.use_native && "loading" in HTMLImageElement.prototype;
        }, vn = function(n2, t2, e2) {
          n2.forEach(function(n3) {
            return function(n4) {
              return n4.isIntersecting || n4.intersectionRatio > 0;
            }(n3) ? function(n4, t3, e3, i2) {
              var o2 = function(n5) {
                return x.indexOf(k(n5)) >= 0;
              }(n4);
              w(n4, "entered"), N(n4, e3.class_entered), M(n4, e3.class_exited), function(n5, t4, e4) {
                t4.unobserve_entered && T(n5, e4);
              }(n4, e3, i2), C(e3.callback_enter, n4, t3, i2), o2 || ln(n4, e3, i2);
            }(n3.target, n3, t2, e2) : function(n4, t3, e3, i2) {
              L(n4) || (N(n4, e3.class_exited), function(n5, t4, e4, i3) {
                e4.cancel_on_exit && function(n6) {
                  return k(n6) === v;
                }(n5) && "IMG" === n5.tagName && (an(n5), function(n6) {
                  D(n6, function(n7) {
                    un(n7);
                  }), un(n6);
                }(n5), sn(n5), M(n5, e4.class_loading), R(i3, -1), A(n5), C(e4.callback_cancel, n5, t4, i3));
              }(n4, t3, e3, i2), C(e3.callback_exit, n4, t3, i2));
            }(n3.target, n3, t2, e2);
          });
        }, bn = function(n2) {
          return Array.prototype.slice.call(n2);
        }, mn = function(n2) {
          return n2.container.querySelectorAll(n2.elements_selector);
        }, pn = function(n2) {
          return function(n3) {
            return k(n3) === p;
          }(n2);
        }, hn = function(n2, t2) {
          return function(n3) {
            return bn(n3).filter(L);
          }(n2 || mn(t2));
        }, En = function(n2, e2) {
          var o2 = c(n2);
          this._settings = o2, this.loadingCount = 0, function(n3, t2) {
            i && !gn(n3) && (t2._observer = new IntersectionObserver(function(e3) {
              vn(e3, n3, t2);
            }, function(n4) {
              return { root: n4.container === document ? null : n4.container, rootMargin: n4.thresholds || n4.threshold + "px" };
            }(n3)));
          }(o2, this), function(n3, e3) {
            t && (e3._onlineHandler = function() {
              !function(n4, t2) {
                var e4;
                (e4 = mn(n4), bn(e4).filter(pn)).forEach(function(t3) {
                  M(t3, n4.class_error), A(t3);
                }), t2.update();
              }(n3, e3);
            }, window.addEventListener("online", e3._onlineHandler));
          }(o2, this), this.update(e2);
        };
        return En.prototype = { update: function(n2) {
          var t2, o2, a2 = this._settings, r2 = hn(n2, a2);
          G(this, r2.length), !e && i ? gn(a2) ? function(n3, t3, e2) {
            n3.forEach(function(n4) {
              -1 !== _n.indexOf(n4.tagName) && function(n5, t4, e3) {
                n5.setAttribute("loading", "lazy"), cn(n5, t4, e3), function(n6, t5) {
                  var e4 = Y[n6.tagName];
                  e4 && e4(n6, t5);
                }(n5, t4), w(n5, h);
              }(n4, t3, e2);
            }), G(e2, 0);
          }(r2, a2, this) : (o2 = r2, function(n3) {
            n3.disconnect();
          }(t2 = this._observer), function(n3, t3) {
            t3.forEach(function(t4) {
              n3.observe(t4);
            });
          }(t2, o2)) : this.loadAll(r2);
        }, destroy: function() {
          this._observer && this._observer.disconnect(), t && window.removeEventListener("online", this._onlineHandler), mn(this._settings).forEach(function(n2) {
            U(n2);
          }), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, delete this.toLoadCount;
        }, loadAll: function(n2) {
          var t2 = this, e2 = this._settings;
          hn(n2, e2).forEach(function(n3) {
            T(n3, t2), ln(n3, e2, t2);
          });
        }, restoreAll: function() {
          var n2 = this._settings;
          mn(n2).forEach(function(t2) {
            fn(t2, n2);
          });
        } }, En.load = function(n2, t2) {
          var e2 = c(t2);
          ln(n2, e2);
        }, En.resetStatus = function(n2) {
          A(n2);
        }, t && function(n2, t2) {
          if (t2)
            if (t2.length)
              for (var e2, i2 = 0; e2 = t2[i2]; i2 += 1)
                l(n2, e2);
            else
              l(n2, t2);
        }(En, window.lazyLoadOptions), En;
      });
    }
  });

  // ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/util/log.ts
  var Log;
  var init_log = __esm({
    "ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/util/log.ts"() {
      Log = class {
        /**
         * Log a console error with a prefix.
         *
         * @param message
         */
        static error(message) {
          console.error(`${this.prefix} Error: ${message}`);
        }
        /**
         * Log a console warning with a prefix.
         *
         * @param message
         */
        static warn(message) {
          console.error(`${this.prefix} Warning: ${message}`);
        }
        /**
         * Log a console info message with a prefix.
         *
         * @param message
         */
        static info(message) {
          console.error(`${this.prefix} Info: ${message}`);
        }
      };
      /**
       * Prefix is teh string prefixed before the
       * Log message.
       */
      __publicField(Log, "prefix", "ainsley.dev");
    }
  });

  // ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/animations/cursor.ts
  var cursor_exports = {};
  __export(cursor_exports, {
    Cursor: () => Cursor
  });
  var Cursor;
  var init_cursor = __esm({
    "ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/animations/cursor.ts"() {
      init_log();
      Cursor = class {
        /**
         * The DOM selector for the element.
         *
         * @public
         */
        selector = ".cursor";
        /**
         * The DOM selector for the cursor.
         *
         * @public
         */
        elementSelector = ".cursor-element";
        /**
         * The cursor HTML element.
         *
         * @private
         */
        el;
        /**
         * Initialises the cursor element.
         *
         * @constructor
         */
        constructor() {
          const el = document.querySelector(this.selector);
          if (!el) {
            Log.error(`No ${this.selector} element found in the DOM`);
            return;
          }
          this.el = el;
          this.attachMouseMove();
          document.querySelectorAll(this.elementSelector).forEach((el2) => this.attachElementHandlers(el2));
        }
        /**
         * Attaches the mouse move to the cursor so the
         * element is moved alongside the mouse.
         *
         * @private
         */
        attachMouseMove() {
          document.addEventListener("mousemove", (e) => {
            this.el.style.left = e.clientX + "px";
            this.el.style.top = e.clientY + "px";
          });
        }
        /**
         * Attaches the elements to be animated.
         *
         * @param el
         * @private
         */
        attachElementHandlers(el) {
          const classes = el.getAttributeNames().filter((a) => a.startsWith("data-cursor"));
          el.addEventListener("mousemove", () => classes.forEach((c) => {
            this.addScale(el);
            this.el.classList.add("cursor-active");
            this.el.classList.add(c.replace("data-", ""));
          }));
          el.addEventListener("mouseleave", () => classes.forEach((c) => {
            this.removeScale(el);
            this.el.classList.remove("cursor-active");
            this.el.classList.remove(c.replace("data-", ""));
          }));
        }
        /**
         * Transforms the cursor to be bigger when the element
         * is hovered according to the data attribute set.
         *
         * @param el
         * @private
         */
        addScale(el) {
          let scale = el.getAttribute("data-cursor-scale") ?? "1.5";
          this.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
        /**
         * Removes the scale when the mouse is out.
         *
         * @param el
         * @private
         */
        removeScale(el) {
          this.el.style.transform = `translate(-50%, -50%)`;
        }
      };
    }
  });

  // ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/animations/skew.ts
  var skew_exports = {};
  __export(skew_exports, {
    Skew: () => Skew
  });
  var Skew;
  var init_skew = __esm({
    "ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/animations/skew.ts"() {
      init_log();
      Skew = class {
        /**
         * The DOM selector for the elements to skew.
         *
         * @readonly
         */
        selector = ".skew";
        /**
         * The default options for skewing elements,
         * when properties are not defined.
         *
         * @readonly
         */
        defaultOptions = {
          transform: {
            x: 0.1,
            y: 0.1
          },
          rotate: {
            x: 0.1,
            y: -0.1
          },
          shouldRotate: true
        };
        /**
         * Initialises the elements marked as Skewed.
         *
         * @constructor
         */
        constructor() {
          this.attachHandlers();
        }
        /**
         * Attaches the event handlers for all button elements
         * on the DOM.
         *
         * @private
         */
        attachHandlers() {
          document.querySelectorAll(this.selector).forEach((el) => {
            const cfg = this.getOptions(el);
            this.mouseMove(el, cfg);
            this.mouseOut(el);
          });
        }
        /**
         * Attaches the mouse move event which transforms and skews
         * the element based of the configuration.
         *
         * @param el
         * @param config
         * @private
         */
        mouseMove(el, config) {
          el.addEventListener("mousemove", (e) => {
            const pos = this.getPos(el, e);
            el.style.transform = "translate(" + pos.x * config.transform.x + "px, " + pos.y * 0.3 + "px)";
            if (config.shouldRotate && config.rotate) {
              el.style.transform += "rotate3d(" + pos.x * config.rotate.x + ", " + pos.y * config.rotate.y + ", 0, 12deg)";
            }
          });
        }
        /**
         * Removes the mouse move event and clears selectors.
         *
         * @param el
         * @private
         */
        mouseOut(el) {
          el.addEventListener("mouseleave", () => {
            el.style.transform = "translate3d(0, 0, 0)";
            el.style.transform += "rotate3d(0, 0, 0, 0deg)";
          });
        }
        /**
         * Obtains the position of the cursor in relation to
         * the element.
         *
         * @param el
         * @param event
         * @private
         */
        getPos(el, event) {
          const pos = el.getBoundingClientRect();
          return {
            x: event.clientX - pos.left - pos.width / 2,
            y: event.clientY - pos.top - pos.height / 2
          };
        }
        /**
         * Obtains the skew options by merging data
         * attributes with the default config.
         *
         * @param el
         * @private
         */
        getOptions(el) {
          return {
            shouldRotate: el.hasAttribute("data-skew-rotate"),
            transform: {
              x: this.getAttribute(el, "data-skew-transform-x") ?? this.defaultOptions.transform.x,
              y: this.getAttribute(el, "data-skew-transform-y") ?? this.defaultOptions.transform.y
            },
            rotate: {
              x: this.getAttribute(el, "data-skew-rotate-x") ?? this.defaultOptions.transform.x,
              y: this.getAttribute(el, "data-skew-rotate-y") ?? this.defaultOptions.transform.y
            }
          };
        }
        /**
         * Obtains an HTML attribute as a number, or null if it's
         * not defined.
         *
         * @param el
         * @param attr
         * @private
         */
        getAttribute(el, attr) {
          const contents = el.getAttribute(attr);
          if (!contents) {
            return null;
          }
          const num = Number(contents);
          if (isNaN(num)) {
            Log.error("Attribute is NaN: " + attr);
            return null;
          }
          return num;
        }
      };
    }
  });

  // ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/components/fit-text.ts
  var fit_text_exports = {};
  __export(fit_text_exports, {
    FitText: () => FitText
  });
  var FitText;
  var init_fit_text = __esm({
    "ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/components/fit-text.ts"() {
      init_log();
      FitText = class {
        /**
         * The DOM selector for the elements.
         *
         * @readonly
         */
        selector = ".fit-text";
        /**
         * The default configuration for fitting elements,
         * when properties are not defined.
         *
         * @readonly
         */
        defaultOptions = {
          compressor: 1,
          minFontSize: -1 / 0,
          maxFontSize: 1 / 0
        };
        /**
         * Initialises the elements marked as FitText.
         *
         * @constructor
         */
        constructor() {
          document.querySelectorAll(".fit-text").forEach((el) => {
            this.change(el, this.getOptions(el));
          });
        }
        /**
         * Change resizes the HTMLElement to be 100% of the
         * parent container.
         *
         * @param el
         * @param options
         * @private
         */
        change(el, options) {
          const resizer = () => {
            const fontSize = Math.max(Math.min(el.clientWidth / (options.compressor * 10), options.maxFontSize), options.minFontSize) + "px";
            ;
            el.style.fontSize = fontSize;
          };
          resizer();
          window.addEventListener("resize", resizer, false);
          window.addEventListener("orientationchange", resizer, false);
        }
        /**
         * Obtains the fit text options by merging data
         * attributes with the default config.
         *
         * @private
         * @param el
         */
        getOptions(el) {
          return {
            compressor: this.getAttribute(el, "data-fit-text-compressor") ?? this.defaultOptions.compressor,
            minFontSize: this.getAttribute(el, "data-fit-text-min-font-size") ?? this.defaultOptions.minFontSize,
            maxFontSize: this.getAttribute(el, "data-fit-text-max-font-size") ?? this.defaultOptions.maxFontSize
          };
        }
        /**
         * Obtains an HTML attribute as a number, or null if it's
         * not defined.
         *
         * @param el
         * @param attr
         * @private
         */
        getAttribute(el, attr) {
          const contents = el.getAttribute(attr);
          if (!contents) {
            return null;
          }
          const num = Number(contents);
          if (isNaN(num)) {
            Log.error("Attribute is NaN: " + attr);
            return null;
          }
          return num;
        }
      };
    }
  });

  // ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/components/accordion.js
  var accordion_exports = {};
  __export(accordion_exports, {
    Accordion: () => Accordion
  });
  function Accordion(options) {
    let defaultOpt = {
      parent: document.body,
      accordion: false,
      outer: ".accordion-item",
      header: ".accordion-title",
      inner: ".accordion-content"
    };
    this.options = Object.assign(defaultOpt, options);
    this.elements = {};
    this.options.parent._collapse = this;
    this.init();
  }
  var init_accordion = __esm({
    "ns-hugo:/Users/ainsley.clark/Desktop/ainsley.dev/assets/js/components/accordion.js"() {
      Accordion.prototype.init = function() {
        let opt = this.options, ele = this.elements, self2 = this;
        let collapses = ele.collapses = opt.parent.querySelectorAll(opt.outer);
        collapses.forEach(function(collapse) {
          let headers = collapse.querySelectorAll(opt.header);
          headers.forEach(function(header) {
            header.addEventListener("click", (e) => {
              e.preventDefault();
              console.log("heyr");
              if (opt.accordion) {
                self2.accordion(headers, header);
              } else {
                self2.toggle(header.parentNode, false);
              }
            });
          });
        });
      };
      Accordion.prototype.accordion = function(header, current) {
        let s = this;
        header.forEach(function(el) {
          s.toggle(el.parentNode, el !== current);
        });
      };
      Accordion.prototype.toggle = function(item, closeForce) {
        let height = 0;
        let inner = item.querySelector(this.options.inner);
        if (!item.classList.contains("active") && !closeForce) {
          height = this.calcHeight(inner);
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
        console.log(height);
        inner.style.maxHeight = height + "px";
      };
      Accordion.prototype.calcHeight = function(inner) {
        let children = inner.children;
        let height = 0;
        for (let i = 0; i < children.length; i++) {
          height += children[i].clientHeight;
        }
        return height;
      };
      for (const el of document.querySelectorAll(".accordion")) {
        let accordion = new Accordion({
          accordion: true,
          parent: document.body.querySelector(".accordion")
        });
      }
    }
  });

  // <stdin>
  var _vanillaLazyload = _interopRequireDefault(require_lazyload_min());
  var _cursor = (init_cursor(), __toCommonJS(cursor_exports));
  var _skew = (init_skew(), __toCommonJS(skew_exports));
  var _fitText = (init_fit_text(), __toCommonJS(fit_text_exports));
  init_accordion();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var html = document.querySelector("html");
  html.classList.remove("no-js");
  html.classList.add("js");
  document.addEventListener("DOMContentLoaded", function() {
    new _cursor.Cursor();
    new _skew.Skew();
    new _fitText.FitText();
  });
  var lazyLoadInstance = new _vanillaLazyload["default"]({
    elements_selector: ".lazy"
    // ... more custom settings?
  });
})();
