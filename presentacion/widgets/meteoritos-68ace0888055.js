// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function x(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var S = x.prototype = new b();
	S.constructor = x, _(S, y.prototype), S.isPureReactComponent = !0;
	var C = Array.isArray;
	function w() {}
	var T = {
		H: null,
		A: null,
		T: null,
		S: null
	}, E = Object.prototype.hasOwnProperty;
	function D(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ee(e, t) {
		return D(e.type, t, e.props);
	}
	function O(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function te(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ne = /\/+/g;
	function re(e, t) {
		return typeof e == "object" && e && e.key != null ? te("" + e.key) : t.toString(36);
	}
	function ie(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(w, w) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ae(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ae(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + re(e, 0) : a, C(o) ? (i = "", c != null && (i = c.replace(ne, "$&/") + "/"), ae(o, r, i, "", function(e) {
			return e;
		})) : o != null && (O(o) && (o = ee(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ne, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (C(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + re(a, u), c += ae(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + re(a, u++), c += ae(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ae(ie(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function k(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ae(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function oe(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var se = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function ce(e) {
		var t = T.T, n = {};
		n.types = t === null ? null : t.types, T.T = n;
		try {
			var r = e(), i = T.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(w, se);
		} catch (e) {
			se(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), T.T = t;
		}
	}
	function le(e) {
		var t = T.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else ce(le.bind(null, e));
	}
	var ue = {
		map: k,
		forEach: function(e, t, n) {
			k(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return k(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return k(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!O(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = ue, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = x, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return T.H.useMemoCache(e);
		}
	}, e.addTransitionType = le, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !E.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return D(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) E.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return D(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = O, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: oe
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = ce, e.unstable_useCacheRefresh = function() {
		return T.H.useCacheRefresh();
	}, e.use = function(e) {
		return T.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return T.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return T.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return T.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return T.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return T.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return T.H.useEffectEvent(e);
	}, e.useId = function() {
		return T.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return T.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return T.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return T.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return T.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return T.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return T.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return T.H.useRef(e);
	}, e.useState = function(e) {
		return T.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return T.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return T.H.useTransition();
	}, e.version = "19.3.1";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, ee());
			else {
				var t = n(l);
				t !== null && ne(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && ne(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? ee() : S = !1;
			}
		}
	}
	var ee;
	if (typeof y == "function") ee = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var O = new MessageChannel(), te = O.port2;
		O.port1.onmessage = D, ee = function() {
			te.postMessage(null);
		};
	} else ee = function() {
		_(D, 0);
	};
	function ne(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, ne(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, ee()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function d(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = d(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = d(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = d(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = d(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.1";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function h(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && h(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function g(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function _(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function v(e) {
		var t = [null, null], n = g(e);
		return n === null || y(t, e, n.child, { foundSelf: !1 }), t;
	}
	function y(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && y(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function b(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var x = null, S = null;
	function C(e, t, n) {
		return e === n || e === t && (x = e, !0);
	}
	function w(e, t, n) {
		return e === n ? (S = e, !1) : e === t && (S !== null && (x = e), !0);
	}
	function T(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function E(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var D = Object.assign, ee = Symbol.for("react.element"), O = Symbol.for("react.transitional.element"), te = Symbol.for("react.portal"), ne = Symbol.for("react.fragment"), re = Symbol.for("react.strict_mode"), ie = Symbol.for("react.profiler"), ae = Symbol.for("react.consumer"), k = Symbol.for("react.context"), oe = Symbol.for("react.forward_ref"), se = Symbol.for("react.suspense"), ce = Symbol.for("react.suspense_list"), le = Symbol.for("react.memo"), ue = Symbol.for("react.lazy"), de = Symbol.for("react.activity"), fe = Symbol.for("react.legacy_hidden"), pe = Symbol.for("react.memo_cache_sentinel"), me = Symbol.for("react.view_transition"), he = Symbol.for("react.recoverable"), ge = Symbol.iterator;
	function _e(e) {
		return typeof e != "object" || !e ? null : (e = ge && e[ge] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ve = Symbol.for("react.client.reference");
	function ye(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ve ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case ne: return "Fragment";
			case ie: return "Profiler";
			case re: return "StrictMode";
			case se: return "Suspense";
			case ce: return "SuspenseList";
			case de: return "Activity";
			case me: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case te: return "Portal";
			case k: return e.displayName || "Context";
			case ae: return (e._context.displayName || "Context") + ".Consumer";
			case oe:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case le: return t = e.displayName || null, t === null ? ye(e.type) || "Memo" : t;
			case ue:
				t = e._payload, e = e._init;
				try {
					return ye(e(t));
				} catch {}
		}
		return null;
	}
	var be = Array.isArray, A = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, xe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, Se = [], Ce = -1;
	function we(e) {
		return { current: e };
	}
	function Te(e) {
		0 > Ce || (e.current = Se[Ce], Se[Ce] = null, Ce--);
	}
	function M(e, t) {
		Ce++, Se[Ce] = e.current, e.current = t;
	}
	var Ee = we(null), De = we(null), Oe = we(null), ke = we(null);
	function Ae(e, t) {
		switch (M(Oe, t), M(De, e), M(Ee, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? up(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = up(t), e = dp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		Te(Ee), M(Ee, e);
	}
	function je() {
		Te(Ee), Te(De), Te(Oe);
	}
	function Me(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, M(ke, e)), t = Ee.current;
		var n = dp(t, e.type);
		t !== n && (M(De, e), M(Ee, n));
	}
	function Ne(e) {
		De.current === e && (Te(Ee), Te(De)), ke.current === e && (Te(ke), sh._currentValue = xe);
	}
	var Pe, Fe;
	function Ie(e) {
		if (Pe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Pe = t && t[1] || "", Fe = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Pe + e + Fe;
	}
	var Le = !1;
	function Re(e, t) {
		if (!e || Le) return "";
		Le = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Le = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ie(n) : "";
	}
	function ze(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ie(e.type);
			case 16: return Ie("Lazy");
			case 13: return e.child !== t && t !== null ? Ie("Suspense Fallback") : Ie("Suspense");
			case 19: return Ie("SuspenseList");
			case 0:
			case 15: return Re(e.type, !1);
			case 11: return Re(e.type.render, !1);
			case 1: return Re(e.type, !0);
			case 31: return Ie("Activity");
			case 30: return Ie("ViewTransition");
			default: return "";
		}
	}
	function Be(e) {
		try {
			var t = "", n = null;
			do
				t += ze(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ve = Object.prototype.hasOwnProperty, He = t.unstable_scheduleCallback, Ue = t.unstable_cancelCallback, We = t.unstable_shouldYield, Ge = t.unstable_requestPaint, Ke = t.unstable_now, qe = t.unstable_getCurrentPriorityLevel, Je = t.unstable_ImmediatePriority, Ye = t.unstable_UserBlockingPriority, Xe = t.unstable_NormalPriority, Ze = t.unstable_LowPriority, Qe = t.unstable_IdlePriority, $e = t.log, N = t.unstable_setDisableYieldValue, et = null, tt = null;
	function nt(e) {
		if (typeof $e == "function" && N(e), tt && typeof tt.setStrictMode == "function") try {
			tt.setStrictMode(et, e);
		} catch {}
	}
	var rt = Math.clz32 ? Math.clz32 : ot, it = Math.log, at = Math.LN2;
	function ot(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (it(e) / at | 0) | 0;
	}
	var st = 256, ct = 262144, lt = 4194304;
	function ut(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function dt(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = ut(n))) : i = ut(o) : i = ut(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = ut(n))) : i = ut(o)) : i = ut(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function ft(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function pt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - rt(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function mt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function ht() {
		var e = lt;
		return lt <<= 1, !(lt & 62914560) && (lt = 4194304), e;
	}
	function gt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function _t(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function vt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - rt(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && yt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function yt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - rt(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function bt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - rt(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function xt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : St(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function St(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function Ct(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function P() {
		var e = j.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function wt(e, t) {
		var n = j.p;
		try {
			return j.p = e, t();
		} finally {
			j.p = n;
		}
	}
	var Tt = Math.random().toString(36).slice(2), Et = "__reactFiber$" + Tt, Dt = "__reactProps$" + Tt, Ot = "__reactContainer$" + Tt, kt = "__reactEvents$" + Tt, At = "__reactListeners$" + Tt, jt = "__reactHandles$" + Tt, Mt = "__reactResources$" + Tt, Nt = "__reactMarker$" + Tt, Pt = "__reactLoad$" + Tt;
	function Ft(e) {
		delete e[Et], delete e[Dt], delete e[At], delete e[jt];
	}
	function It(e) {
		var t;
		if (t = e[Et]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Ot] || n[Et]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = fm(e); e !== null;) {
					if (n = e[Et]) return n;
					e = fm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Lt(e) {
		if (e = e[Et] || e[Ot]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Rt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function zt(e) {
		var t = e[Mt];
		return t ||= e[Mt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Bt(e) {
		e[Nt] = !0;
	}
	function Vt(e) {
		e[Pt] = void 0;
	}
	var Ht = /* @__PURE__ */ new Set(), Ut = {};
	function Wt(e, t) {
		Gt(e, t), Gt(e + "Capture", t);
	}
	function Gt(e, t) {
		for (Ut[e] = t, e = 0; e < t.length; e++) Ht.add(t[e]);
	}
	var Kt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), qt = {}, Jt = {};
	function Yt(e) {
		return Ve.call(Jt, e) ? !0 : Ve.call(qt, e) ? !1 : Kt.test(e) ? Jt[e] = !0 : (qt[e] = !0, !1);
	}
	var F = !1;
	function I() {
		var e = F;
		return F = !1, e;
	}
	function Xt(e, t, n) {
		if (Yt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function Zt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function Qt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function $t(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function en(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function tn(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function nn(e) {
		if (!e._valueTracker) {
			var t = en(e) ? "checked" : "value";
			e._valueTracker = tn(e, t, "" + e[t]);
		}
	}
	function rn(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = en(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var an = /[\n"\\]/g;
	function on(e) {
		return e.replace(an, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function sn(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + $t(t)) : e.value !== "" + $t(t) && (e.value = "" + $t(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : ln(e, $t(n)) : o === "number" && e.value == t ? ln(e, $t(e.value)) : ln(e, $t(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + $t(s) : e.removeAttribute("name");
	}
	function cn(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				nn(e);
				return;
			}
			n = n == null ? "" : "" + $t(n), t = t == null ? n : "" + $t(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), nn(e);
	}
	function ln(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function un(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + $t(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function dn(e, t, n) {
		t != null && (t = "" + $t(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + $t(n);
	}
	function fn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (be(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = $t(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), nn(e);
	}
	function pn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var mn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function hn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || mn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function gn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", F = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (hn(e, a, r), F = !0);
		} else for (var o in t) t.hasOwnProperty(o) && hn(e, o, t[o]);
	}
	function L(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var _n = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), vn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function yn(e) {
		return vn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function bn() {}
	var xn = null;
	function Sn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Cn = null, wn = null;
	function Tn(e) {
		var t = Lt(e);
		if (t && (e = t.stateNode)) {
			var n = e[Dt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (sn(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + on("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Dt] || null;
								if (!a) throw Error(i(90));
								sn(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && rn(r);
					}
					break a;
				case "textarea":
					dn(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && un(e, !!n.multiple, t, !1);
			}
		}
	}
	var En = !1;
	function Dn(e, t, n) {
		if (En) return e(t, n);
		En = !0;
		try {
			return e(t);
		} finally {
			if (En = !1, (Cn !== null || wn !== null) && (Ud(), Cn && (t = Cn, e = wn, wn = Cn = null, Tn(t), e))) for (t = 0; t < e.length; t++) Tn(e[t]);
		}
	}
	function On(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Dt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var kn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, An = !1;
	if (kn) try {
		var jn = {};
		Object.defineProperty(jn, "passive", { get: function() {
			An = !0;
		} }), window.addEventListener("test", jn, jn), window.removeEventListener("test", jn, jn);
	} catch {
		An = !1;
	}
	var Mn = null, Nn = null, Pn = null;
	function Fn() {
		if (Pn) return Pn;
		var e, t = Nn, n = t.length, r, i = "value" in Mn ? Mn.value : Mn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Pn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function In(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Ln() {
		return !0;
	}
	function Rn() {
		return !1;
	}
	function zn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Ln : Rn, this.isPropagationStopped = Rn, this;
		}
		return D(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Ln);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Ln);
			},
			persist: function() {},
			isPersistent: Ln
		}), t;
	}
	var Bn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Vn = zn(Bn), Hn = D({}, Bn, {
		view: 0,
		detail: 0
	}), Un = zn(Hn), Wn, Gn, Kn, qn = D({}, Hn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: ir,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Kn && (Kn && e.type === "mousemove" ? (Wn = e.screenX - Kn.screenX, Gn = e.screenY - Kn.screenY) : Gn = Wn = 0, Kn = e), Wn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Gn;
		}
	}), Jn = zn(qn), Yn = zn(D({}, qn, { dataTransfer: 0 })), Xn = zn(D({}, Hn, { relatedTarget: 0 })), Zn = zn(D({}, Bn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Qn = zn(D({}, Bn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), $n = zn(D({}, Bn, { data: 0 })), er = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, tr = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, nr = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function rr(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = nr[e]) ? !!t[e] : !1;
	}
	function ir() {
		return rr;
	}
	var ar = zn(D({}, Hn, {
		key: function(e) {
			if (e.key) {
				var t = er[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = In(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? tr[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: ir,
		charCode: function(e) {
			return e.type === "keypress" ? In(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? In(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), or = zn(D({}, qn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), sr = zn(D({}, Bn, { submitter: 0 })), cr = zn(D({}, Hn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: ir
	})), lr = zn(D({}, Bn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), ur = zn(D({}, qn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), dr = zn(D({}, Bn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), fr = [
		9,
		13,
		27,
		32
	], pr = kn && "CompositionEvent" in window, mr = null;
	kn && "documentMode" in document && (mr = document.documentMode);
	var hr = kn && "TextEvent" in window && !mr, gr = kn && (!pr || mr && 8 < mr && 11 >= mr), _r = " ", vr = !1;
	function yr(e, t) {
		switch (e) {
			case "keyup": return fr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function br(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var xr = !1;
	function Sr(e, t) {
		switch (e) {
			case "compositionend": return br(t);
			case "keypress": return t.which === 32 ? (vr = !0, _r) : null;
			case "textInput": return e = t.data, e === _r && vr ? null : e;
			default: return null;
		}
	}
	function Cr(e, t) {
		if (xr) return e === "compositionend" || !pr && yr(e, t) ? (e = Fn(), Pn = Nn = Mn = null, xr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return gr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var wr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Tr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!wr[e.type] : t === "textarea";
	}
	function Er(e, t, n, r) {
		Cn ? wn ? wn.push(r) : wn = [r] : Cn = r, t = Jf(t, "onChange"), 0 < t.length && (n = new Vn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Dr = null, Or = null;
	function kr(e) {
		Uf(e, 0);
	}
	function Ar(e) {
		if (rn(Rt(e))) return e;
	}
	function jr(e, t) {
		if (e === "change") return t;
	}
	var Mr = !1;
	if (kn) {
		var Nr;
		if (kn) {
			var Pr = "oninput" in document;
			if (!Pr) {
				var Fr = document.createElement("div");
				Fr.setAttribute("oninput", "return;"), Pr = typeof Fr.oninput == "function";
			}
			Nr = Pr;
		} else Nr = !1;
		Mr = Nr && (!document.documentMode || 9 < document.documentMode);
	}
	function Ir() {
		Dr && (Dr.detachEvent("onpropertychange", Lr), Or = Dr = null);
	}
	function Lr(e) {
		if (e.propertyName === "value" && Ar(Or)) {
			var t = [];
			Er(t, Or, e, Sn(e)), Dn(kr, t);
		}
	}
	function Rr(e, t, n) {
		e === "focusin" ? (Ir(), Dr = t, Or = n, Dr.attachEvent("onpropertychange", Lr)) : e === "focusout" && Ir();
	}
	function zr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ar(Or);
	}
	function Br(e, t) {
		if (e === "click") return Ar(t);
	}
	function Vr(e, t) {
		if (e === "input" || e === "change") return Ar(t);
	}
	function Hr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Ur = typeof Object.is == "function" ? Object.is : Hr;
	function Wr(e, t) {
		if (Ur(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ve.call(t, i) || !Ur(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Gr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Kr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function qr(e, t) {
		var n = Kr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Kr(n);
		}
	}
	function Jr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Jr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Yr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Gr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Gr(e.document);
		}
		return t;
	}
	function Xr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Zr = kn && "documentMode" in document && 11 >= document.documentMode, Qr = null, $r = null, ei = null, ti = !1;
	function ni(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		ti || Qr == null || Qr !== Gr(r) || (r = Qr, "selectionStart" in r && Xr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), ei && Wr(ei, r) || (ei = r, r = Jf($r, "onSelect"), 0 < r.length && (t = new Vn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Qr)));
	}
	function ri(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var ii = {
		animationend: ri("Animation", "AnimationEnd"),
		animationiteration: ri("Animation", "AnimationIteration"),
		animationstart: ri("Animation", "AnimationStart"),
		transitionrun: ri("Transition", "TransitionRun"),
		transitionstart: ri("Transition", "TransitionStart"),
		transitioncancel: ri("Transition", "TransitionCancel"),
		transitionend: ri("Transition", "TransitionEnd")
	}, ai = {}, oi = {};
	kn && (oi = document.createElement("div").style, "AnimationEvent" in window || (delete ii.animationend.animation, delete ii.animationiteration.animation, delete ii.animationstart.animation), "TransitionEvent" in window || delete ii.transitionend.transition);
	function si(e) {
		if (ai[e]) return ai[e];
		if (!ii[e]) return e;
		var t = ii[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in oi) return ai[e] = t[n];
		return e;
	}
	var ci = si("animationend"), li = si("animationiteration"), ui = si("animationstart"), di = si("transitionrun"), fi = si("transitionstart"), pi = si("transitioncancel"), mi = si("transitionend"), hi = /* @__PURE__ */ new Map(), gi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	gi.push("scrollEnd");
	function _i(e, t) {
		hi.set(e, t), Wt(t, [e]);
	}
	var vi = 0;
	function yi(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = wd.identifierPrefix;
		var n = vi++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function bi(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Md;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function xi(e, t) {
		return e = bi(e), t = bi(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var Si = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Ci = [], wi = 0, Ti = 0;
	function Ei() {
		for (var e = wi, t = Ti = wi = 0; t < e;) {
			var n = Ci[t];
			Ci[t++] = null;
			var r = Ci[t];
			Ci[t++] = null;
			var i = Ci[t];
			Ci[t++] = null;
			var a = Ci[t];
			if (Ci[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Ai(n, i, a);
		}
	}
	function Di(e, t, n, r) {
		Ci[wi++] = e, Ci[wi++] = t, Ci[wi++] = n, Ci[wi++] = r, Ti |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Oi(e, t, n, r) {
		return Di(e, t, n, r), ji(e);
	}
	function ki(e, t) {
		return Di(e, null, null, t), ji(e);
	}
	function Ai(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - rt(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ji(e) {
		if (50 < Nd) throw Nd = 0, Pd = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Mi = {};
	function Ni(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Pi(e, t, n, r) {
		return new Ni(e, t, n, r);
	}
	function Fi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ii(e, t) {
		var n = e.alternate;
		return n === null ? (n = Pi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Li(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Ri(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Fi(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, Ee.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case de: return e = Pi(31, n, t, a), e.elementType = de, e.lanes = o, e;
			case ne: return zi(n.children, a, o, t);
			case re:
				s = 8, a |= 24;
				break;
			case ie: return e = Pi(12, n, t, a | 2), e.elementType = ie, e.lanes = o, e;
			case se: return e = Pi(13, n, t, a), e.elementType = se, e.lanes = o, e;
			case ce: return e = Pi(19, n, t, a), e.elementType = ce, e.lanes = o, e;
			case fe:
			case me: return e = a | 32, e = Pi(30, n, t, e), e.elementType = me, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case k:
						s = 10;
						break a;
					case ae:
						s = 9;
						break a;
					case oe:
						s = 11;
						break a;
					case le:
						s = 14;
						break a;
					case ue:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Pi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function zi(e, t, n, r) {
		return e = Pi(7, e, r, t), e.lanes = n, e;
	}
	function Bi(e, t, n) {
		return e = Pi(6, e, null, t), e.lanes = n, e;
	}
	function Vi(e) {
		var t = Pi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Hi(e, t, n) {
		return t = Pi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ui = /* @__PURE__ */ new WeakMap();
	function Wi(e, t) {
		if (typeof e == "object" && e) {
			var n = Ui.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Be(t)
			}, Ui.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Be(t)
		};
	}
	var Gi = [], Ki = 0, qi = null, Ji = 0, Yi = [], Xi = 0, Zi = null, Qi = 1, $i = "";
	function ea(e, t) {
		Gi[Ki++] = Ji, Gi[Ki++] = qi, qi = e, Ji = t;
	}
	function ta(e, t, n) {
		Yi[Xi++] = Qi, Yi[Xi++] = $i, Yi[Xi++] = Zi, Zi = e;
		var r = Qi;
		e = $i;
		var i = 32 - rt(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - rt(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Qi = 1 << 32 - rt(t) + i | n << i | r, $i = a + e;
		} else Qi = 1 << a | n << i | r, $i = e;
	}
	function na(e) {
		e.return !== null && (ea(e, 1), ta(e, 1, 0));
	}
	function ra(e) {
		for (; e === qi;) qi = Gi[--Ki], Gi[Ki] = null, Ji = Gi[--Ki], Gi[Ki] = null;
		for (; e === Zi;) Zi = Yi[--Xi], Yi[Xi] = null, $i = Yi[--Xi], Yi[Xi] = null, Qi = Yi[--Xi], Yi[Xi] = null;
	}
	function ia(e, t) {
		Yi[Xi++] = Qi, Yi[Xi++] = $i, Yi[Xi++] = Zi, Qi = t.id, $i = t.overflow, Zi = e;
	}
	var aa = null, oa = null, R = !1, sa = null, ca = !1, la = Error(i(519));
	function ua(e) {
		throw ga(Wi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), la;
	}
	function da(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Et] = e, t[Dt] = r, n) {
			case "dialog":
				X("cancel", t), X("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				X("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Vf.length; n++) X(Vf[n], t);
				break;
			case "source":
				X("error", t);
				break;
			case "img":
			case "image":
			case "link":
				X("error", t), X("load", t);
				break;
			case "details":
				X("toggle", t);
				break;
			case "input":
				X("invalid", t), cn(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				X("invalid", t);
				break;
			case "textarea": X("invalid", t), fn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || ep(t.textContent, n) ? (r.popover != null && (X("beforetoggle", t), X("toggle", t)), r.onScroll != null && X("scroll", t), r.onScrollEnd != null && X("scrollend", t), r.onClick != null && (t.onclick = bn), t = !0) : t = !1, t || ua(e, !0);
	}
	function fa(e) {
		for (aa = e.return; aa;) switch (aa.tag) {
			case 5:
			case 31:
			case 13:
				ca = !1;
				return;
			case 27:
			case 3:
				ca = !0;
				return;
			default: aa = aa.return;
		}
	}
	function pa(e) {
		if (e !== aa) return !1;
		if (!R) return fa(e), R = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && oa && ua(e), fa(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			oa = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			oa = dm(e);
		} else t === 27 ? (t = oa, Sp(e.type) ? (e = um, um = null, oa = e) : oa = t) : oa = aa ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ma() {
		oa = aa = null, R = !1;
	}
	function ha() {
		var e = sa;
		return e !== null && (gd === null ? gd = e : gd.push.apply(gd, e), sa = null), e;
	}
	function ga(e) {
		sa === null ? sa = [e] : sa.push(e);
	}
	var _a = we(null), va = null, ya = null;
	function ba(e, t, n) {
		M(_a, t._currentValue), t._currentValue = n;
	}
	function xa(e) {
		e._currentValue = _a.current, Te(_a);
	}
	function Sa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Ca(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Sa(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Sa(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Sa(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function wa(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Ur(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ke.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && Ca(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function Ta(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Ur(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Ea(e) {
		va = e, ya = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Da(e) {
		return ka(va, e);
	}
	function Oa(e, t) {
		return va === null && Ea(e), ka(e, t);
	}
	function ka(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, ya === null) {
			if (e === null) throw Error(i(308));
			ya = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else ya = ya.next = t;
		return n;
	}
	var Aa = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ja = t.unstable_scheduleCallback, Ma = t.unstable_NormalPriority, Na = {
		$$typeof: k,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Pa() {
		return {
			controller: new Aa(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Fa(e) {
		e.refCount--, e.refCount === 0 && ja(Ma, function() {
			e.controller.abort();
		});
	}
	function Ia(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var La = null;
	function Ra(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var za = null, Ba = 0, Va = 0, Ha = null;
	function Ua(e, t) {
		if (za === null) {
			var n = za = [];
			Ba = 0, Va = Rf(), Ha = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Ba++, t.then(Wa, Wa), t;
	}
	function Wa() {
		if (--Ba === 0 && (La = null, za !== null)) {
			Ha !== null && (Ha.status = "fulfilled");
			var e = za;
			za = null, Va = 0, Ha = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Ga(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ka = A.S;
	A.S = function(e, t) {
		if (yd = Ke(), typeof t == "object" && t && typeof t.then == "function" && Ua(e, t), La !== null) for (var n = wf; n !== null;) Ia(n, La), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = wf; r !== null;) Ia(r, n), r = r.next;
			if (Va !== 0) {
				r = La, r === null && (r = La = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Ka !== null && Ka(e, t);
	};
	var qa = we(null);
	function Ja() {
		var e = qa.current;
		return e === null ? rd.pooledCache : e;
	}
	function Ya(e, t) {
		t === null ? M(qa, qa.current) : M(qa, t.pool);
	}
	function Xa() {
		var e = Ja();
		return e === null ? null : {
			parent: Na._currentValue,
			pool: e
		};
	}
	var Za = Error(i(460)), Qa = Error(i(474)), $a = Error(i(542)), eo = { then: function() {} };
	function to(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function no(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(bn, bn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, oo(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(bn, bn);
				else {
					if (e = rd, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, oo(e), e;
				}
				throw io = t, Za;
		}
	}
	function ro(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (io = e, Za) : e;
		}
	}
	var io = null;
	function ao() {
		if (io === null) throw Error(i(459));
		var e = io;
		return io = null, e;
	}
	function oo(e) {
		if (e === Za || e === $a) throw Error(i(483));
	}
	var so = null, co = 0;
	function lo(e) {
		var t = co;
		return co += 1, so === null && (so = []), no(so, e, t);
	}
	function uo(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function fo(e, t) {
		throw t.$$typeof === ee ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function po(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Ii(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Bi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === ne ? (e = d(e, t, n.props.children, r, n.key), uo(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === ue && ro(i) === t.type) ? (t = a(t, n.props), uo(t, n), t.return = e, t) : (t = Ri(n.type, n.key, n.props, null, e.mode, r), uo(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Hi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = zi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Bi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case O: return n = Ri(t.type, t.key, t.props, null, e.mode, n), uo(n, t), n.return = e, n;
					case te: return t = Hi(t, e.mode, n), t.return = e, t;
					case ue: return t = ro(t), f(e, t, n);
				}
				if (be(t) || _e(t)) return t = zi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, lo(t), n);
				if (t.$$typeof === k) return f(e, Oa(e, t), n);
				fo(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case O: return n.key === i ? l(e, t, n, r) : null;
					case te: return n.key === i ? u(e, t, n, r) : null;
					case ue: return n = ro(n), p(e, t, n, r);
				}
				if (be(n) || _e(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, lo(n), r);
				if (n.$$typeof === k) return p(e, t, Oa(e, n), r);
				fo(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case O: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case te: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ue: return r = ro(r), m(e, t, n, r, i);
				}
				if (be(r) || _e(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, lo(r), i);
				if (r.$$typeof === k) return m(e, t, n, Oa(t, r), i);
				fo(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), R && ea(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return R && ea(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), R && ea(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), R && ea(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return R && ea(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), R && ea(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === ne && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case O:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === ne) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), uo(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ue && ro(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), uo(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === ne ? (c = zi(o.props.children, e.mode, c, o.key), uo(c, o), c.return = e, e = c) : (c = Ri(o.type, o.key, o.props, null, e.mode, c), uo(c, o), c.return = e, e = c);
						}
						return s(e);
					case te:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Hi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case ue: return o = ro(o), _(e, r, o, c);
				}
				if (be(o)) return h(e, r, o, c);
				if (_e(o)) {
					if (l = _e(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, lo(o), c);
				if (o.$$typeof === k) return _(e, r, Oa(e, o), c);
				fo(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Bi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				co = 0;
				var i = _(e, t, n, r);
				return so = null, i;
			} catch (t) {
				if (t === Za || t === $a) throw t;
				var a = Pi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var mo = po(!0), ho = po(!1), go = !1;
	function _o(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function vo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function yo(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function bo(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, U & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ji(e), Ai(e, null, n), t;
		}
		return Di(e, r, t, n), ji(e);
	}
	function xo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, bt(e, n);
		}
	}
	function So(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Co = !1;
	function wo() {
		if (Co) {
			var e = Ha;
			if (e !== null) throw e;
		}
	}
	function To(e, t, n, r) {
		Co = !1;
		var i = e.updateQueue;
		go = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (G & f) === f : (r & f) === f) {
					f !== 0 && f === Va && (Co = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = D({}, d, f);
								break a;
							case 2: go = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), ud |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Eo(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Do(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Eo(n[e], t);
	}
	var Oo = we(null), ko = we(0);
	function Ao(e, t) {
		e = cd, M(ko, e), M(Oo, t), cd = e | t.baseLanes;
	}
	function jo() {
		M(ko, cd), M(Oo, Oo.current);
	}
	function Mo() {
		cd = ko.current, Te(Oo), Te(ko);
	}
	var No = we(null), Po = null;
	function Fo(e) {
		var t = e.alternate;
		M(Bo, Bo.current & 1), M(No, e), Po === null && (t === null || Oo.current !== null || t.memoizedState !== null) && (Po = e);
	}
	function Io(e) {
		M(Bo, Bo.current), M(No, e), Po === null && (Po = e);
	}
	function Lo(e) {
		e.tag === 22 ? (M(Bo, Bo.current), M(No, e), Po === null && (Po = e)) : Ro();
	}
	function Ro() {
		M(Bo, Bo.current), M(No, No.current);
	}
	function zo(e) {
		Te(No), Po === e && (Po = null), Te(Bo);
	}
	var Bo = we(0);
	function Vo(e, t) {
		M(No, No.current), M(Bo, t);
	}
	function Ho(e) {
		Te(Bo), Te(No), Po === e && (Po = null);
	}
	function Uo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || om(n) || sm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Wo = 0, z = null, B = null, Go = null, Ko = !1, qo = !1, Jo = !1, Yo = 0, Xo = 0, Zo = null, Qo = 0;
	function $o() {
		throw Error(i(321));
	}
	function es(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Ur(e[n], t[n])) return !1;
		return !0;
	}
	function ts(e, t, n, r, i, a) {
		return Wo = a, z = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, A.H = e === null || e.memoizedState === null ? vc : yc, Jo = !1, a = n(r, i), Jo = !1, qo && (a = rs(t, n, r, i)), ns(e), a;
	}
	function ns(e) {
		A.H = _c;
		var t = B !== null && B.next !== null;
		if (Wo = 0, Go = B = z = null, Ko = !1, Xo = 0, Zo = null, t) throw Error(i(300));
		e === null || Ic || (e = e.dependencies, e !== null && Ta(e) && (Ic = !0));
	}
	function rs(e, t, n, r) {
		z = e;
		var a = 0;
		do {
			if (qo && (Zo = null), Xo = 0, qo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Go = B = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			A.H = bc, o = t(n, r);
		} while (qo);
		return o;
	}
	function is() {
		var e = A.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ds(t) : t, e = e.useState()[0], (B === null ? null : B.memoizedState) !== e && (z.flags |= 1024), t;
	}
	function as() {
		var e = Yo !== 0;
		return Yo = 0, e;
	}
	function os(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function ss(e) {
		if (Ko) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Ko = !1;
		}
		Wo = 0, Go = B = z = null, qo = !1, Xo = Yo = 0, Zo = null;
	}
	function cs() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Go === null ? z.memoizedState = Go = e : Go = Go.next = e, Go;
	}
	function ls() {
		if (B === null) {
			var e = z.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = B.next;
		var t = Go === null ? z.memoizedState : Go.next;
		if (t !== null) Go = t, B = e;
		else {
			if (e === null) throw z.alternate === null ? Error(i(467)) : Error(i(310));
			B = e, e = {
				memoizedState: B.memoizedState,
				baseState: B.baseState,
				baseQueue: B.baseQueue,
				queue: B.queue,
				next: null
			}, Go === null ? z.memoizedState = Go = e : Go = Go.next = e;
		}
		return Go;
	}
	function us() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ds(e) {
		var t = Xo;
		return Xo += 1, Zo === null && (Zo = []), e = no(Zo, e, t), t = z, (Go === null ? t.memoizedState : Go.next) === null && (t = t.alternate, A.H = t === null || t.memoizedState === null ? vc : yc), e;
	}
	function fs(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ds(e);
			if (e.$$typeof === he) return;
			if (e.$$typeof === k) return Da(e);
		}
		throw Error(i(438, String(e)));
	}
	function ps(e) {
		var t = null, n = z.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = z.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = us(), z.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = pe;
		return t.index++, n;
	}
	function ms(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function hs(e) {
		return gs(ls(), B, e);
	}
	function gs(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (Wo & f) === f : (G & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Va && (d = !0);
					else if ((Wo & p) === p) {
						u = u.next, p === Va && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, z.lanes |= p, ud |= p;
					f = u.action, Jo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, z.lanes |= f, ud |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Ur(o, e.memoizedState) && (Ic = !0, d && (n = Ha, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function _s(e) {
		var t = ls(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Ur(o, t.memoizedState) || (Ic = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function vs(e, t, n) {
		var r = z, a = ls(), o = R;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Ur((B || a).memoizedState, n);
		if (s && (a.memoizedState = n, Ic = !0), a = a.queue, Us(xs.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Go !== null && !!(Go.memoizedState.tag & 1), Rs(e ? 9 : 8, { destroy: void 0 }, bs.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, rd === null) throw Error(i(349));
			o || Wo & 127 || ys(r, t, n);
		}
		return n;
	}
	function ys(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = z.updateQueue, t === null ? (t = us(), z.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function bs(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Ss(t) && Cs(e);
	}
	function xs(e, t, n) {
		return n(function() {
			Ss(t) && Cs(e);
		});
	}
	function Ss(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Ur(e, n);
		} catch {
			return !0;
		}
	}
	function Cs(e) {
		var t = ki(e, 2);
		t !== null && Rd(t, e, 2);
	}
	function ws(e) {
		var t = cs();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Jo) {
				nt(!0);
				try {
					n();
				} finally {
					nt(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ms,
			lastRenderedState: e
		}, t;
	}
	function Ts(e, t, n, r) {
		return e.baseState = n, gs(e, B, typeof r == "function" ? r : ms);
	}
	function Es(e, t, n, r, a) {
		if (mc(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			A.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ds(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ds(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = A.T, o = {};
			o.types = a === null ? null : a.types, A.T = o;
			try {
				var s = n(i, r), c = A.S;
				c !== null && c(o, s), Os(e, t, s);
			} catch (n) {
				As(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), A.T = a;
			}
		} else try {
			a = n(i, r), Os(e, t, a);
		} catch (n) {
			As(e, t, n);
		}
	}
	function Os(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			ks(e, t, n);
		}, function(n) {
			return As(e, t, n);
		}) : ks(e, t, n);
	}
	function ks(e, t, n) {
		t.status = "fulfilled", t.value = n, js(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ds(e, n)));
	}
	function As(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, js(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function js(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Ms(e, t) {
		return t;
	}
	function Ns(e, t) {
		if (R) {
			var n = rd.formState;
			if (n !== null) {
				a: {
					var r = z;
					if (R) {
						if (oa) {
							b: {
								for (var i = oa, a = ca; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								oa = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ua(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = cs(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ms,
			lastRenderedState: t
		}, n.queue = r, n = dc.bind(null, z, r), r.dispatch = n, r = ws(!1), a = pc.bind(null, z, !1, r.queue), r = cs(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Es.bind(null, z, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Ps(e) {
		return Fs(ls(), B, e);
	}
	function Fs(e, t, n) {
		if (t = gs(e, t, Ms)[0], e = hs(ms)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ds(t);
		} catch (e) {
			throw e === Za ? $a : e;
		}
		else r = t;
		t = ls();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (z.flags |= 2048, Rs(9, { destroy: void 0 }, Is.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Is(e, t) {
		e.action = t;
	}
	function Ls(e) {
		var t = ls(), n = B;
		if (n !== null) return Fs(t, n, e);
		ls(), t = t.memoizedState, n = ls();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Rs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = z.updateQueue, t === null && (t = us(), z.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function zs() {
		return ls().memoizedState;
	}
	function Bs(e, t, n, r) {
		var i = cs();
		z.flags |= e, i.memoizedState = Rs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Vs(e, t, n, r) {
		var i = ls();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		B !== null && r !== null && es(r, B.memoizedState.deps) ? i.memoizedState = Rs(t, a, n, r) : (z.flags |= e, i.memoizedState = Rs(1 | t, a, n, r));
	}
	function Hs(e, t) {
		Bs(8390656, 8, e, t);
	}
	function Us(e, t) {
		Vs(2048, 8, e, t);
	}
	function Ws(e) {
		z.flags |= 4;
		var t = z.updateQueue;
		if (t === null) t = us(), z.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Gs(e) {
		var t = ls().memoizedState;
		return Ws({
			ref: t,
			nextImpl: e
		}), function() {
			if (U & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Ks(e, t) {
		return Vs(4, 2, e, t);
	}
	function qs(e, t) {
		return Vs(4, 4, e, t);
	}
	function Js(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Ys(e, t, n) {
		n = n == null ? null : n.concat([e]), Vs(4, 4, Js.bind(null, t, e), n);
	}
	function Xs() {}
	function Zs(e, t) {
		var n = ls();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && es(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Qs(e, t) {
		var n = ls();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && es(t, r[1])) return r[0];
		if (r = e(), Jo) {
			nt(!0);
			try {
				e();
			} finally {
				nt(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function $s(e, t, n) {
		return n === void 0 || Wo & 1073741824 && !(G & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Id(), z.lanes |= e, ud |= e, n);
	}
	function ec(e, t, n, r) {
		return Ur(n, t) ? n : Oo.current === null ? !(Wo & 106) || Wo & 1073741824 && !(G & 261930) ? (Ic = !0, e.memoizedState = n) : (e = Id(), z.lanes |= e, ud |= e, t) : (e = $s(e, n, r), Ur(e, t) || (Ic = !0), e);
	}
	function tc(e, t, n, r, i) {
		var a = j.p;
		j.p = a !== 0 && 8 > a ? a : 8;
		var o = A.T, s = {};
		s.types = o === null ? null : o.types, A.T = s, pc(e, !1, t, n);
		try {
			var c = i(), l = A.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? fc(e, t, Ga(c, r), Fd(e)) : fc(e, t, r, Fd(e));
		} catch (n) {
			fc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Fd());
		} finally {
			j.p = a, o !== null && s.types !== null && (o.types = s.types), A.T = o;
		}
	}
	function nc() {}
	function rc(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = ic(e).queue;
		tc(e, a, t, xe, n === null ? nc : function() {
			return ac(e), n(r);
		});
	}
	function ic(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: xe,
			baseState: xe,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ms,
				lastRenderedState: xe
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ms,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ac(e) {
		var t = ic(e);
		t.next === null && (t = e.alternate.memoizedState), fc(e, t.next.queue, {}, Fd());
	}
	function oc() {
		return Da(sh);
	}
	function sc() {
		return ls().memoizedState;
	}
	function cc() {
		return ls().memoizedState;
	}
	function lc(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Fd();
					e = yo(n);
					var r = bo(t, e, n);
					r !== null && (Rd(r, t, n), xo(r, t, n)), t = { cache: Pa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function uc(e, t, n) {
		var r = Fd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, mc(e) ? hc(t, n) : (n = Oi(e, t, n, r), n !== null && (Rd(n, e, r), gc(n, t, r)));
	}
	function dc(e, t, n) {
		fc(e, t, n, Fd());
	}
	function fc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (mc(e)) hc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Ur(s, o)) return Di(e, t, i, 0), rd === null && Ei(), !1;
			} catch {}
			if (n = Oi(e, t, i, r), n !== null) return Rd(n, e, r), gc(n, t, r), !0;
		}
		return !1;
	}
	function pc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Rf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, mc(e)) {
			if (t) throw Error(i(479));
		} else t = Oi(e, n, r, 2), t !== null && Rd(t, e, 2);
	}
	function mc(e) {
		var t = e.alternate;
		return e === z || t !== null && t === z;
	}
	function hc(e, t) {
		qo = Ko = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function gc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, bt(e, n);
		}
	}
	var _c = {
		readContext: Da,
		use: fs,
		useCallback: $o,
		useContext: $o,
		useEffect: $o,
		useImperativeHandle: $o,
		useLayoutEffect: $o,
		useInsertionEffect: $o,
		useMemo: $o,
		useReducer: $o,
		useRef: $o,
		useState: $o,
		useDebugValue: $o,
		useDeferredValue: $o,
		useTransition: $o,
		useSyncExternalStore: $o,
		useId: $o,
		useHostTransitionStatus: $o,
		useFormState: $o,
		useActionState: $o,
		useOptimistic: $o,
		useMemoCache: $o,
		useCacheRefresh: $o,
		useEffectEvent: $o
	}, vc = {
		readContext: Da,
		use: fs,
		useCallback: function(e, t) {
			return cs().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Da,
		useEffect: Hs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Bs(4194308, 4, Js.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Bs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Bs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = cs();
			t = t === void 0 ? null : t;
			var r = e();
			if (Jo) {
				nt(!0);
				try {
					e();
				} finally {
					nt(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = cs();
			if (n !== void 0) {
				var i = n(t);
				if (Jo) {
					nt(!0);
					try {
						n(t);
					} finally {
						nt(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = uc.bind(null, z, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = cs();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = ws(e);
			var t = e.queue, n = dc.bind(null, z, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Xs,
		useDeferredValue: function(e, t) {
			return $s(cs(), e, t);
		},
		useTransition: function() {
			var e = ws(!1);
			return e = tc.bind(null, z, e.queue, !0, !1), cs().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = z, a = cs();
			if (R) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), rd === null) throw Error(i(349));
				G & 127 || ys(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Hs(xs.bind(null, r, o, e), [e]), r.flags |= 2048, Rs(9, { destroy: void 0 }, bs.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = cs(), t = rd.identifierPrefix;
			if (R) {
				var n = $i, r = Qi;
				n = (r & ~(1 << 32 - rt(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Yo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Qo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: oc,
		useFormState: Ns,
		useActionState: Ns,
		useOptimistic: function(e) {
			var t = cs();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = pc.bind(null, z, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: ps,
		useCacheRefresh: function() {
			return cs().memoizedState = lc.bind(null, z);
		},
		useEffectEvent: function(e) {
			var t = cs(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (U & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, yc = {
		readContext: Da,
		use: fs,
		useCallback: Zs,
		useContext: Da,
		useEffect: Us,
		useImperativeHandle: Ys,
		useInsertionEffect: Ks,
		useLayoutEffect: qs,
		useMemo: Qs,
		useReducer: hs,
		useRef: zs,
		useState: function() {
			return hs(ms);
		},
		useDebugValue: Xs,
		useDeferredValue: function(e, t) {
			return ec(ls(), B.memoizedState, e, t);
		},
		useTransition: function() {
			var e = hs(ms)[0], t = ls().memoizedState;
			return [typeof e == "boolean" ? e : ds(e), t];
		},
		useSyncExternalStore: vs,
		useId: sc,
		useHostTransitionStatus: oc,
		useFormState: Ps,
		useActionState: Ps,
		useOptimistic: function(e, t) {
			return Ts(ls(), B, e, t);
		},
		useMemoCache: ps,
		useCacheRefresh: cc,
		useEffectEvent: Gs
	}, bc = {
		readContext: Da,
		use: fs,
		useCallback: Zs,
		useContext: Da,
		useEffect: Us,
		useImperativeHandle: Ys,
		useInsertionEffect: Ks,
		useLayoutEffect: qs,
		useMemo: Qs,
		useReducer: _s,
		useRef: zs,
		useState: function() {
			return _s(ms);
		},
		useDebugValue: Xs,
		useDeferredValue: function(e, t) {
			var n = ls();
			return B === null ? $s(n, e, t) : ec(n, B.memoizedState, e, t);
		},
		useTransition: function() {
			var e = _s(ms)[0], t = ls().memoizedState;
			return [typeof e == "boolean" ? e : ds(e), t];
		},
		useSyncExternalStore: vs,
		useId: sc,
		useHostTransitionStatus: oc,
		useFormState: Ls,
		useActionState: Ls,
		useOptimistic: function(e, t) {
			var n = ls();
			return B === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ts(n, B, e, t);
		},
		useMemoCache: ps,
		useCacheRefresh: cc,
		useEffectEvent: Gs
	};
	function xc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : D({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Sc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Fd(), i = yo(r);
			i.payload = t, n != null && (i.callback = n), t = bo(e, i, r), t !== null && (Rd(t, e, r), xo(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Fd(), i = yo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = bo(e, i, r), t !== null && (Rd(t, e, r), xo(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Fd(), r = yo(n);
			r.tag = 2, t != null && (r.callback = t), t = bo(e, r, n), t !== null && (Rd(t, e, n), xo(t, e, n));
		}
	};
	function Cc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Wr(n, r) || !Wr(i, a) : !0;
	}
	function wc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Sc.enqueueReplaceState(t, t.state, null);
	}
	function Tc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = D({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Ec(e) {
		Si(e);
	}
	function Dc(e) {
		console.error(e);
	}
	function Oc(e) {
		Si(e);
	}
	function kc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ac(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function jc(e, t, n) {
		return n = yo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			kc(e, t);
		}, n;
	}
	function Mc(e) {
		return e = yo(e), e.tag = 3, e;
	}
	function Nc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ac(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ac(t, n, r), typeof i != "function" && (Sd === null ? Sd = /* @__PURE__ */ new Set([this]) : Sd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Pc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && wa(t, n, a, !0), n = No.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Po === null ? Xd() : n.alternate === null && ld === 0 && (ld = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === eo ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), vf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === eo ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), vf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return vf(e, r, a), Xd(), !1;
		}
		if (R) return t = No.current, t === null ? (r !== la && (t = Error(i(423), { cause: r }), ga(Wi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Wi(r, n), a = jc(e.stateNode, r, a), So(e, a), ld !== 4 && (ld = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== la && (e = Error(i(422), { cause: r }), ga(Wi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Wi(o, n), hd === null ? hd = [o] : hd.push(o), ld !== 4 && (ld = 2), t === null) return !0;
		r = Wi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = jc(n.stateNode, r, e), So(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (Sd === null || !Sd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Mc(a), Nc(a, e, n, r), So(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Fc = Error(i(461)), Ic = !1;
	function Lc(e, t, n, r) {
		t.child = e === null ? ho(t, null, n, r) : mo(t, e.child, n, r);
	}
	function Rc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Ea(t), r = ts(e, t, n, o, a, i), s = as(), e !== null && !Ic ? (os(e, t, i), fl(e, t, i)) : (R && s && na(t), t.flags |= 1, Lc(e, t, r, i), t.child);
	}
	function zc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Fi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Bc(e, t, a, r, i)) : (e = Ri(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !pl(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Wr : n, n(o, r) && e.ref === t.ref) return fl(e, t, i);
		}
		return t.flags |= 1, e = Ii(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Bc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Wr(a, r) && e.ref === t.ref) {
				if (Ic = !1, t.pendingProps = r = a, pl(e, i)) e.flags & 131072 && (Ic = !0);
				else return t.lanes = e.lanes, fl(e, t, i);
			}
		}
		return Jc(e, t, n, r, i);
	}
	function Vc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Uc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ya(t, a === null ? null : a.cachePool), a === null ? jo() : Ao(t, a), Lo(t);
			else return r = t.lanes = 536870912, Uc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ya(t, null), jo(), Ro()) : (Ya(t, a.cachePool), Ao(t, a), Ro(), t.memoizedState = null);
		return Lc(e, t, i, n), t.child;
	}
	function Hc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Uc(e, t, n, r, i) {
		var a = Ja();
		return a = a === null ? null : {
			parent: Na._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ya(t, null), jo(), Lo(t), e !== null && wa(e, t, r, !0), t.childLanes = i, null;
	}
	function Wc(e, t) {
		return t = rl({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Gc(e, t, n) {
		return mo(t, e.child, null, n), e = Wc(t, t.pendingProps), e.flags |= 2, zo(t), t.memoizedState = null, e;
	}
	function Kc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (R) {
				if (r.mode === "hidden") return e = Wc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Hc(null, e);
				if (Io(t), (e = oa) ? (e = am(e, ca), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Zi === null ? null : {
						id: Qi,
						overflow: $i
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Vi(e), n.return = t, t.child = n, aa = t, oa = null)) : e = null, e === null) throw ua(t);
				return t.lanes = 536870912, null;
			}
			return Wc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Io(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Gc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Ic || wa(e, t, n, !1), a = (n & e.childLanes) !== 0, Ic || a) {
				if (Oo.current === null) {
					if (r = rd, r !== null && (s = xt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ki(e, s), Rd(r, e, s), Fc;
					Xd();
				}
				t = Gc(e, t, n);
			} else e = o.treeContext, oa = lm(s.nextSibling), aa = t, R = !0, sa = null, ca = !1, e !== null && ia(t, e), t = Wc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ii(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function qc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Jc(e, t, n, r, i) {
		return Ea(t), n = ts(e, t, n, r, void 0, i), r = as(), e !== null && !Ic ? (os(e, t, i), fl(e, t, i)) : (R && r && na(t), t.flags |= 1, Lc(e, t, n, i), t.child);
	}
	function Yc(e, t, n, r, i, a) {
		return Ea(t), t.updateQueue = null, n = rs(t, r, n, i), ns(e), r = as(), e !== null && !Ic ? (os(e, t, a), fl(e, t, a)) : (R && r && na(t), t.flags |= 1, Lc(e, t, n, a), t.child);
	}
	function Xc(e, t, n, r, i) {
		if (Ea(t), t.stateNode === null) {
			var a = Mi, o = n.contextType;
			typeof o == "object" && o && (a = Da(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Sc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, _o(t), o = n.contextType, a.context = typeof o == "object" && o ? Da(o) : Mi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (xc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Sc.enqueueReplaceState(a, a.state, null), To(t, r, a, i), wo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Tc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Mi, typeof u == "object" && u && (o = Da(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && wc(t, a, r, o), go = !1;
			var f = t.memoizedState;
			a.state = f, To(t, r, a, i), wo(), l = t.memoizedState, s || f !== l || go ? (typeof d == "function" && (xc(t, n, d, r), l = t.memoizedState), (c = go || Cc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, vo(e, t), o = t.memoizedProps, u = Tc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Mi, typeof l == "object" && l && (c = Da(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && wc(t, a, r, c), go = !1, f = t.memoizedState, a.state = f, To(t, r, a, i), wo();
			var p = t.memoizedState;
			o !== d || f !== p || go || e !== null && e.dependencies !== null && Ta(e.dependencies) ? (typeof s == "function" && (xc(t, n, s, r), p = t.memoizedState), (u = go || Cc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Ta(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, qc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = mo(t, e.child, null, i), t.child = mo(t, null, n, i)) : Lc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = fl(e, t, i), e;
	}
	function Zc(e, t, n, r) {
		return ma(), t.flags |= 256, Lc(e, t, n, r), t.child;
	}
	var Qc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function $c(e) {
		return {
			baseLanes: e,
			cachePool: Xa()
		};
	}
	function el(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= pd), e;
	}
	function tl(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Bo.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (R) {
				if (i ? Fo(t) : Ro(), (e = oa) ? (e = am(e, ca), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Zi === null ? null : {
						id: Qi,
						overflow: $i
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Vi(e), n.return = t, t.child = n, aa = t, oa = null)) : e = null, e === null) throw ua(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Ro(), i = t.mode, a = rl({
				mode: "hidden",
				children: a
			}, i), r = zi(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = $c(n), r.childLanes = el(e, o, n), t.memoizedState = Qc, Hc(null, r)) : (Fo(t), nl(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return al(e, t, a, o, r, c, s, n);
		}
		return i ? (Ro(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ii(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = zi(i, a, n, null), i.flags |= 2) : i = Ii(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Hc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = $c(n) : (a = i.cachePool, a === null ? a = Xa() : (s = Na._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = el(e, o, n), t.memoizedState = Qc, Hc(e.child, r)) : (Fo(t), n = e.child, e = n.sibling, n = Ii(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function nl(e, t) {
		return t = rl({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function rl(e, t) {
		return e = Pi(22, e, null, t), e.lanes = 0, e;
	}
	function il(e, t, n) {
		return mo(t, e.child, null, n), e = nl(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function al(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Fo(t), t.flags &= -257, il(e, t, c)) : t.memoizedState === null ? (Ro(), o = a.fallback, s = t.mode, a = rl({
			mode: "visible",
			children: a.children
		}, s), o = zi(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, mo(t, e.child, null, c), a = t.child, a.memoizedState = $c(c), a.childLanes = el(e, r, c), t.memoizedState = Qc, Hc(null, a)) : (Ro(), t.child = e.child, t.flags |= 128, null);
		if (Fo(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, ga({
				value: a,
				source: null,
				stack: null
			})), il(e, t, c);
		}
		if (Ic || wa(e, t, c, !1), r = (c & e.childLanes) !== 0, Ic || r) {
			if (Oo.current !== null) return il(e, t, c);
			if (r = rd, r !== null && (a = xt(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, ki(e, a), Rd(r, e, a), Fc;
			return om(o) || Xd(), il(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, oa = lm(o.nextSibling), aa = t, R = !0, sa = null, ca = !1, e !== null && ia(t, e), t = nl(t, a.children), t.flags |= 134221824, t);
	}
	function ol(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Sa(e.return, t, n);
	}
	function sl(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Uo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function cl(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function ll(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function ul(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Bo.current;
		if (t.flags & 128) return Vo(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, Vo(t, o), i === "backwards" && e !== null ? (ll(e), Lc(e, t, r, n), ll(e)) : Lc(e, t, r, n), r = R ? Ji : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && ol(e, n, t);
			else if (e.tag === 19) ol(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = sl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, ll(t)), cl(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Uo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				cl(t, !0, n, null, a, r);
				break;
			case "together":
				cl(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = sl(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), cl(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function dl(e, t, n) {
		var r = t.pendingProps;
		return ba(t, t.type, r.value), Lc(e, t, r.children, n), t.child;
	}
	function fl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), ud |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (wa(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ii(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ii(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function pl(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Ta(e)));
	}
	function ml(e, t, n) {
		switch (t.tag) {
			case 3:
				Ae(t, t.stateNode.containerInfo), ba(t, Na, e.memoizedState.cache), ma();
				break;
			case 27:
			case 5:
				Me(t);
				break;
			case 4:
				Ae(t, t.stateNode.containerInfo);
				break;
			case 10:
				ba(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Io(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return Fo(t), t.flags |= 128, null;
					r = wa(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? tl(e, t, n) : (Fo(t), e = fl(e, t, n), e === null ? null : e.sibling);
				}
				Fo(t);
				break;
			case 19:
				if (t.flags & 128) return ul(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (wa(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return ul(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Vo(t, Bo.current), r) break;
				return null;
			case 22: return t.lanes = 0, Vc(e, t, n, t.pendingProps);
			case 24: ba(t, Na, e.memoizedState.cache);
		}
		return fl(e, t, n);
	}
	function hl(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Ic = !0;
			else {
				if (!pl(e, n) && !(t.flags & 128)) return Ic = !1, ml(e, t, n);
				Ic = !!(e.flags & 131072);
			}
		} else Ic = !1, R && t.flags & 1048576 && ta(t, Ji, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ro(t.elementType), t.type = e, typeof e == "function") Fi(e) ? (r = Tc(e, r), t.tag = 1, t = Xc(null, t, e, r, n)) : (t.tag = 0, t = Jc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === oe) {
								t.tag = 11, t = Rc(null, t, e, r, n);
								break a;
							}
							if (a === le) {
								t.tag = 14, t = zc(null, t, e, r, n);
								break a;
							}
							if (a === k) {
								t.tag = 10, t.type = e, t = dl(null, t, n);
								break a;
							}
						}
						throw t = ye(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Jc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Tc(r, t.pendingProps), Xc(e, t, r, a, n);
			case 3:
				a: {
					if (Ae(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, vo(e, t), To(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ba(t, Na, r), r !== o.cache && Ca(t, [Na], n, !0), wo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Zc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Wi(Error(i(424)), t), ga(a), t = Zc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (oa = lm(e.firstChild), aa = t, R = !0, sa = null, ca = !0, n = ho(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (ma(), r === a) {
							t = fl(e, t, n);
							break a;
						}
						Lc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return qc(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : R || (t.stateNode = fp(t.type, t.pendingProps, Oe.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Me(t), e === null && R && (r = t.stateNode = hm(t.type, t.pendingProps, Oe.current), aa = t, ca = !0, a = oa, Sp(t.type) ? (um = a, oa = lm(r.firstChild)) : oa = a), Lc(e, t, t.pendingProps.children, n), qc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && R && ((a = r = oa) && (r = rm(r, t.type, t.pendingProps, ca), r === null ? a = !1 : (t.stateNode = r, aa = t, oa = lm(r.firstChild), ca = !1, a = !0)), a || ua(t)), Me(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = ts(e, t, is, null, null, n), sh._currentValue = a), qc(e, t), Lc(e, t, r, n), t.child;
			case 6: return e === null && R && ((e = n = oa) && (n = im(n, t.pendingProps, ca), n === null ? e = !1 : (t.stateNode = n, aa = t, oa = null, e = !0)), e || ua(t)), null;
			case 13: return tl(e, t, n);
			case 4: return Ae(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = mo(t, null, r, n) : Lc(e, t, r, n), t.child;
			case 11: return Rc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, qc(e, t), Lc(e, t, r, n), t.child;
			case 8: return Lc(e, t, t.pendingProps.children, n), t.child;
			case 12: return Lc(e, t, t.pendingProps.children, n), t.child;
			case 10: return dl(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, Ea(t), a = Da(a), r = r(a), t.flags |= 1, Lc(e, t, r, n), t.child;
			case 14: return zc(e, t, t.type, t.pendingProps, n);
			case 15: return Bc(e, t, t.type, t.pendingProps, n);
			case 19: return ul(e, t, n);
			case 31: return Kc(e, t, n);
			case 22: return Vc(e, t, n, t.pendingProps);
			case 24: return Ea(t), r = Da(Na), e === null ? (a = Ja(), a === null && (a = rd, o = Pa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, _o(t), ba(t, Na, a)) : ((e.lanes & n) !== 0 && (vo(e, t), To(t, null, null, n), wo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ba(t, Na, r), r !== a.cache && Ca(t, [Na], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ba(t, Na, r))), Lc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : R && na(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : qc(e, t), Lc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function gl(e) {
		e.flags |= 4;
	}
	function _l(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (qd()) e.flags |= 8192;
				else throw io = eo, Qa;
			}
		} else e.flags &= -16777217;
	}
	function vl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (qd()) e.flags |= 8192;
			else throw io = eo, Qa;
		}
	}
	function yl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : ht(), e.lanes |= t, md |= t);
	}
	function bl(e, t) {
		if (!R) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function xl(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Sl(e, t, n) {
		var r = t.pendingProps;
		switch (ra(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return xl(t), null;
			case 1: return xl(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), xa(Na), je(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (pa(t) ? gl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ha())), xl(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (gl(t), o === null ? (xl(t), _l(t, a, null, r, n)) : (xl(t), vl(t, o))) : o ? o === e.memoizedState ? (xl(t), t.flags &= -16777217) : (gl(t), xl(t), vl(t, o)) : (e = e.memoizedProps, e !== r && gl(t), xl(t), _l(t, a, e, r, n)), null;
			case 27:
				if (Ne(t), n = Oe.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && gl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return xl(t), t.subtreeFlags &= -33554433, null;
					}
					e = Ee.current, pa(t) ? da(t, e) : (e = hm(a, r, n), t.stateNode = e, gl(t));
				}
				return xl(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (Ne(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && gl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return xl(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = Ee.current, pa(t)) da(t, o);
					else {
						var s = lp(Oe.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Et] = t, o[Dt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (np(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && gl(t);
					}
				}
				return xl(t), t.subtreeFlags &= -33554433, _l(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && gl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = Oe.current, pa(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = aa, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Et] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || ep(e.nodeValue, n)), e || ua(t, !0);
					} else e = lp(e).createTextNode(r), e[Et] = t, t.stateNode = e;
				}
				return xl(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = pa(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Et] = t;
						} else ma(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						xl(t), e = !1;
					} else n = ha(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (zo(t), t) : (zo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return xl(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = pa(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Et] = t;
						} else ma(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						xl(t), a = !1;
					} else a = ha(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (zo(t), t) : (zo(t), null);
				}
				return zo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), yl(t, t.updateQueue), xl(t), null);
			case 4: return je(), e === null && Gf(t.stateNode.containerInfo), t.flags |= 67108864, xl(t), null;
			case 10: return xa(t.type), xl(t), null;
			case 19:
				if (Ho(t), r = t.memoizedState, r === null) return xl(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) bl(r, !1);
					else {
						if (ld !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Uo(e), o !== null) {
								for (t.flags |= 128, bl(r, !1), e = o.updateQueue, t.updateQueue = e, yl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Li(n, e), n = n.sibling;
								return Vo(t, Bo.current & 1 | 2), R && ea(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ke() > bd && (t.flags |= 128, a = !0, bl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Uo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, yl(t, e), bl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !R) return xl(t), null;
						} else 2 * Ke() - r.renderingStartTime > bd && n !== 536870912 && (t.flags |= 128, a = !0, bl(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ke(), e.sibling = null, o = Bo.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || R ? Vo(t, o) : (n = o, M(No, t), M(Bo, n), Po === null && (Po = t)), R && ea(t, r.treeForkCount), e;
				}
				return xl(t), null;
			case 22:
			case 23: return zo(t), Mo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (xl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : xl(t), n = t.updateQueue, n !== null && yl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && Te(qa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), xa(Na), xl(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, xl(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function Cl(e, t) {
		switch (ra(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return xa(Na), je(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Ne(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (zo(t), t.alternate === null) throw Error(i(340));
					ma();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (zo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ma();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Ho(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return je(), null;
			case 10: return xa(t.type), null;
			case 22:
			case 23: return zo(t), Mo(), e !== null && Te(qa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return xa(Na), null;
			case 25: return null;
			default: return null;
		}
	}
	function wl(e, t) {
		switch (ra(t), t.tag) {
			case 3:
				xa(Na), je();
				break;
			case 26:
			case 27:
			case 5:
				Ne(t);
				break;
			case 4:
				je();
				break;
			case 31:
				t.memoizedState !== null && zo(t);
				break;
			case 13:
				zo(t);
				break;
			case 19:
				Ho(t);
				break;
			case 10:
				xa(t.type);
				break;
			case 22:
			case 23:
				zo(t), Mo(), e !== null && Te(qa);
				break;
			case 24: xa(Na);
		}
	}
	function Tl(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			q(t, t.return, e);
		}
	}
	function El(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								q(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			q(t, t.return, e);
		}
	}
	function Dl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Do(t, n);
			} catch (t) {
				q(e, e.return, t);
			}
		}
	}
	function Ol(e, t, n) {
		n.props = Tc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			q(e, t, n);
		}
	}
	function kl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = yi(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Pp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Fp(e);
							h(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			q(e, t, n);
		}
	}
	function Al(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				q(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				q(e, t, n);
			}
			else n.current = null;
		}
	}
	function jl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function Ml(e) {
		for (var t = e.return; t !== null && (Fl(t) && em(e.stateNode, t.stateNode), !Pl(t));) t = t.return;
	}
	function Nl(e) {
		for (var t = e.return; t !== null && (Fl(t) && tm(e.stateNode, t.stateNode), !Pl(t));) t = t.return;
	}
	function Pl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Fl(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Il(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			q(e, e.return, t);
		}
	}
	function Ll(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[Dt] = t;
		} catch (t) {
			q(e, e.return, t);
		}
	}
	function Rl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function zl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Rl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Bl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = bn)), jl(e, r), F = !0;
		else if (i !== 4 && (i === 27 && (jl(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Bl(e, t, n, r), e = e.sibling; e !== null;) Bl(e, t, n, r), e = e.sibling;
	}
	function Vl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), jl(e, r), F = !0;
		else if (i !== 4 && (i === 27 && (jl(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Vl(e, t, n, r), e = e.sibling; e !== null;) Vl(e, t, n, r), e = e.sibling;
	}
	function Hl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[Et] = e, t[Dt] = n;
		} catch (t) {
			q(e, e.return, t);
		}
	}
	var Ul = !1, Wl = null;
	function Gl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Ul = !0);
	}
	var Kl = null;
	function ql() {
		var e = Kl;
		return Kl = null, e;
	}
	var Jl = 0;
	function Yl(e, t, n, r, i) {
		return Jl = 0, Xl(e.child, t, n, r, i);
	}
	function Xl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				Ul = !0, Tp(o, Jl === 0 ? t : t + "_" + Jl, n), Jl++;
			} else e.tag === 22 && e.memoizedState !== null || e.tag === 30 && i || Xl(e.child, t, n, r, i) && (a = !0);
			e = e.sibling;
		}
		return a;
	}
	function Zl(e, t) {
		for (; e !== null;) e.tag === 5 ? Ep(e.stateNode, e.memoizedProps) : e.tag === 22 && e.memoizedState !== null || e.tag === 30 && t || Zl(e.child, t), e = e.sibling;
	}
	function Ql(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Ql(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = xi(t.default, t.share), t !== "none" && (Yl(e, n, t, null, !1) || Zl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function $l(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = yi(r, n), a = xi(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Ql(e) : Yl(e, i, a, null, !1) ? (Ql(e), n.paired || t || Ld(e, r.onEnter)) : Zl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) $l(e, t), e = e.sibling;
		else Ql(e);
	}
	function eu(e) {
		if (Wl !== null && Wl.size !== 0) {
			var t = Wl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = xi(n.default, n.share);
								if (a !== "none" && (Yl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, Ld(e, n.onShare)) : Zl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					eu(e);
				}
				e = e.sibling;
			}
		}
	}
	function tu(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = yi(t, e.stateNode), r = Wl === null ? void 0 : Wl.get(n), i = xi(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Yl(e, n, i, null, !1) ? r === void 0 ? Ld(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Wl.delete(n), Ld(e, t.onShare)) : Zl(e.child, !1)), Wl !== null && eu(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) tu(e), e = e.sibling;
		else Wl !== null && eu(e);
	}
	function nu(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = yi(t, e.stateNode);
				t = xi(t.default, t.update), e.flags &= -5, t !== "none" && Yl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && nu(e);
			e = e.sibling;
		}
	}
	function ru(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Zl(e.child, !1));
				}
				ru(e);
			}
			e = e.sibling;
		}
	}
	function iu(e) {
		if (e.tag === 30) e.stateNode.paired = null, Zl(e.child, !1), ru(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) iu(e), e = e.sibling;
		else ru(e);
	}
	function au(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Zl(e.child, !1) : e.subtreeFlags & 33554432 && au(e), e = e.sibling;
	}
	function ou(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Jl < a.length) {
					var l = a[Jl], u = Op(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Tp(c, Jl === 0 ? n : n + "_" + Jl, i), s && e.flags & 4 || (Kl === null && (Kl = []), Kl.push(c, Jl === 0 ? r : r + "_" + Jl, t.memoizedProps)), Jl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : ou(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function su(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = yi(n, r), a = xi(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Jl = 0, i = ou(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || Ld(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && su(e, t);
			e = e.sibling;
		}
	}
	var cu = !1, V = !1, lu = !1, uu = !1, du = typeof WeakSet == "function" ? WeakSet : Set, fu = null, pu = !1, mu = !1, hu = !1, gu = !1;
	function _u(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = Yr(e), Xr(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (cp = {
			focusedElem: e,
			selectionRange: r
		}, gh = !1, n = (n & 335544064) === n, fu = t, t = n ? 9270 : 1024; fu !== null;) {
			if (e = fu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && tu(r[a]);
			if (e.alternate === null && e.flags & 2) n && Gl(e), vu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && tu(r), vu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Gl(e), vu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, fu = r) : (n && nu(e), vu(n));
			}
		}
		Wl = null;
	}
	function vu(e) {
		for (; fu !== null;) {
			var t = fu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = Tc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							q(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) nm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								nm(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = yi(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = xi(a.default, a.update), a !== "none" && Yl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, fu = r;
				break;
			}
			fu = t.return;
		}
	}
	function yu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				zu(e, n), r & 4 && Tl(5, n);
				break;
			case 1:
				if (zu(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						q(n, n.return, e);
					}
					else {
						var i = Tc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							q(n, n.return, e);
						}
					}
				}
				r & 64 && Dl(n), r & 512 && kl(n, n.return);
				break;
			case 3:
				if (zu(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Do(e, t);
					} catch (e) {
						q(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Hl(n);
			case 26:
			case 5:
				zu(e, n), t === null && r & 4 && Il(n), r & 512 && kl(n, n.return);
				break;
			case 12:
				zu(e, n);
				break;
			case 31:
				zu(e, n), r & 4 && Ou(e, n);
				break;
			case 13:
				zu(e, n), r & 4 && ku(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = xf.bind(null, n), cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || cu, !r) {
					var a = t !== null && t.memoizedState !== null || V;
					t = cu, i = V, cu = r, (V = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Vu(e, n, r)) : zu(e, n), cu = t, V = i;
				}
				break;
			case 30:
				zu(e, n), r & 512 && kl(n, n.return);
				break;
			case 7: r & 512 && kl(n, n.return);
			default: zu(e, n);
		}
	}
	function bu(e, t) {
		for (e = e.child; e !== null;) xu(e, t), e = e.sibling;
	}
	function xu(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					q(e, e.return, t);
				}
				Su(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, F = !0;
				} catch (t) {
					q(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? wp(s, !0) : wp(e.stateNode, !1);
				} catch (t) {
					q(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && bu(e, t);
				break;
			default: bu(e, t);
		}
	}
	function Su(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						xu(n, r);
						break a;
					case 22:
						n.memoizedState === null && Su(n, r);
						break a;
					default: Su(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function Cu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, Cu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ft(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var wu = null, Tu = !1;
	function Eu(e, t, n) {
		for (n = n.child; n !== null;) Du(e, t, n), n = n.sibling;
	}
	function Du(e, t, n) {
		if (tt && typeof tt.onCommitFiberUnmount == "function") try {
			tt.onCommitFiberUnmount(et, n);
		} catch {}
		switch (n.tag) {
			case 26:
				V || Al(n, t), Eu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !V && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				V || Al(n, t), Nl(n);
				var r = wu, i = Tu;
				Sp(n.type) && (wu = n.stateNode, Tu = !1), Eu(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), wu = r, Tu = i;
				break;
			case 5: V || Al(n, t), Nl(n);
			case 6:
				if (n.tag === 6 && Nl(n), r = wu, i = Tu, wu = null, Eu(e, t, n), wu = r, Tu = i, wu !== null) {
					if (Tu) try {
						(wu.nodeType === 9 ? wu.body : wu.nodeName === "HTML" ? wu.ownerDocument.body : wu).removeChild(n.stateNode), F = !0;
					} catch (e) {
						q(n, t, e);
					}
					else try {
						wu.removeChild(n.stateNode), F = !0;
					} catch (e) {
						q(n, t, e);
					}
				}
				break;
			case 18:
				wu !== null && (Tu ? (e = wu, Cp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Cp(wu, n.stateNode));
				break;
			case 4:
				r = wu, i = Tu, wu = n.stateNode.containerInfo, Tu = !0, Eu(e, t, n), wu = r, Tu = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				El(2, n, t), V || El(4, n, t), Eu(e, t, n);
				break;
			case 1:
				V || (Al(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Ol(n, t, r)), Eu(e, t, n);
				break;
			case 21:
				Eu(e, t, n);
				break;
			case 22:
				V = (r = V) || n.memoizedState !== null, Eu(e, t, n), V = r;
				break;
			case 30:
				Al(n, t), Eu(e, t, n);
				break;
			case 7:
				V || Al(n, t), Eu(e, t, n);
				break;
			default: Eu(e, t, n);
		}
	}
	function Ou(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				q(t, t.return, e);
			}
		}
	}
	function ku(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			q(t, t.return, e);
		}
	}
	function Au(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new du()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new du()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ju(e, t) {
		var n = Au(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Sf.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Mu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Sp(l.type)) {
							wu = l.stateNode, Tu = !1;
							break a;
						}
						break;
					case 5:
						wu = l.stateNode, Tu = !1;
						break a;
					case 3:
					case 4:
						wu = l.stateNode.containerInfo, Tu = !0;
						break a;
				}
				l = l.return;
			}
			if (wu === null) throw Error(i(160));
			Du(s, c, o), wu = null, Tu = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Pu(t, e, n), t = t.sibling;
	}
	var Nu = null;
	function Pu(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				Mu(t, e, n), Fu(e), a & 4 && (El(3, e, e.return), Tl(3, e), El(5, e, e.return));
				break;
			case 1:
				Mu(t, e, n), Fu(e), a & 512 && (V || r === null || Al(r, r.return)), a & 64 && cu && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Nu, Mu(t, e, n), Fu(e), a & 512 && (V || r === null || Al(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (cu) e.stateNode = fp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[Nt] || r[Et] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), np(r, t, n), r[Et] = e, Bt(r), t = r;
												break a;
											case "link":
												if (o = Gm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Gm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[Et] = e, Bt(r), t = r;
									}
									e.stateNode = t;
								}
							} else cu || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Ll(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || V || t.parentNode.removeChild(t)) : a.count--, n === null ? cu || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				Mu(t, e, n), Fu(e), a & 512 && (V || r === null || Al(r, r.return)), r !== null && a & 4 && Ll(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = lu, lu = !1, Mu(t, e, n), lu = o, Fu(e), a & 512 && (V || r === null || Al(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						pn(t, ""), F = !0;
					} catch (t) {
						q(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Ll(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (uu = !0);
				break;
			case 6:
				if (Mu(t, e, n), Fu(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, F = !0;
					} catch (t) {
						q(e, e.return, t);
					}
				}
				break;
			case 3:
				if (F = !1, Wm = null, o = Nu, Nu = bm(t.containerInfo), Mu(t, e, n), Nu = o, Fu(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					q(e, e.return, t);
				}
				uu && (uu = !1, Iu(e)), F = !1;
				break;
			case 4:
				a = lu, lu = cu, r = I(), o = Nu, Nu = bm(e.stateNode.containerInfo), Mu(t, e, n), Fu(e), Nu = o, F && mu && (hu = !0), F = r, lu = a;
				break;
			case 12:
				Mu(t, e, n), Fu(e);
				break;
			case 31:
				Mu(t, e, n), Fu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ju(e, t)));
				break;
			case 13:
				Mu(t, e, n), Fu(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (vd = Ke()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ju(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = cu, l = V, u = lu;
				cu = c || o, lu = u || o, V = l || s, Mu(t, e, n), V = l, lu = u, cu = c, Fu(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || cu || V || (t = s || V, n = cu, r = V, cu = o || cu, V = t, Bu(e, 2), cu = n, V = r), !o && lu || bu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, ju(e, n))));
				break;
			case 19:
				Mu(t, e, n), Fu(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ju(e, t)));
				break;
			case 30:
				a & 512 && (V || r === null || Al(r, r.return)), a = I(), o = mu, s = (n & 335544064) === n, c = e.memoizedProps, mu = s && xi(c.default, c.update) !== "none", Mu(t, e, n), Fu(e), s && r !== null && F && (e.flags |= 4), mu = o, F = a;
				break;
			case 21: break;
			case 7: a & 512 && (V || r === null || Al(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: Mu(t, e, n), Fu(e);
		}
	}
	function Fu(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Rl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Fl(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Pl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Vl(e, zl(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (pn(l, ""), n.flags &= -33), Vl(e, zl(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Bl(e, zl(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				q(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Iu(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Iu(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function Lu(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Ru(t, e), t = t.sibling;
		else su(t, !1);
	}
	function Ru(e, t) {
		var n = e.alternate;
		if (n === null) $l(e, !1);
		else switch (e.tag) {
			case 3:
				if (gu = pu = !1, ql(), Lu(t, e), !pu && !hu) {
					if (e = Kl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Ep(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), gu = !0;
				}
				Kl = null;
				break;
			case 5:
				Lu(t, e);
				break;
			case 4:
				r = pu, pu = !1, Lu(t, e), pu && (hu = !0), pu = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? Lu(t, e) : $l(e, !1));
				break;
			case 30:
				r = pu, i = ql(), pu = !1, Lu(t, e), pu && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = yi(a, o), o = yi(n.memoizedProps, o);
				var s = xi(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Jl = 0, t = ou(e, n, t, o, s, a, !0), Jl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (Ld(e, e.memoizedProps.onUpdate), Kl = i) : i !== null && (i.push.apply(i, Kl), Kl = i), pu = e.flags & 32 ? !0 : r;
				break;
			default: Lu(t, e);
		}
	}
	function zu(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) yu(e, t.alternate, t), t = t.sibling;
	}
	function Bu(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					El(4, n, n.return), Bu(n, r);
					break;
				case 1:
					Al(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && Ol(n, n.return, i), Bu(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					Al(n, n.return), n.tag !== 5 && n.tag !== 27 || Nl(n), Bu(n, r);
					break;
				case 6:
					Nl(n);
					break;
				case 26:
					Al(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || V || i.parentNode.removeChild(i), Bu(n, r);
					break;
				case 22:
					n.memoizedState === null && Bu(n, r);
					break;
				case 30:
					Al(n, n.return), Bu(n, r);
					break;
				case 7: Al(n, n.return);
				default: Bu(n, r);
			}
			e = e.sibling;
		}
	}
	function Vu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Vu(i, a, n), Tl(4, a);
					break;
				case 1:
					if (Vu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						q(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) Eo(l[i], c);
						} catch (e) {
							q(r, r.return, e);
						}
					}
					s && o & 64 && Dl(a), kl(a, a.return);
					break;
				case 27: n & 2 && Hl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Ml(a), Vu(i, a, n), s && r === null && o & 4 && Il(a), kl(a, a.return);
					break;
				case 6:
					Ml(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || cu || Km(bm(c.ownerDocument), a.type, c), Vu(i, a, n), s && r === null && o & 4 && Il(a), kl(a, a.return);
					break;
				case 12:
					Vu(i, a, n);
					break;
				case 31:
					Vu(i, a, n), s && o & 4 && Ou(i, a);
					break;
				case 13:
					Vu(i, a, n), s && o & 4 && ku(i, a);
					break;
				case 22:
					a.memoizedState === null && Vu(i, a, n), kl(a, a.return);
					break;
				case 30:
					Vu(i, a, n), kl(a, a.return);
					break;
				case 7: kl(a, a.return);
				default: Vu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Hu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Fa(n));
	}
	function H(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Fa(e));
	}
	function Uu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Wu(e, t, n, r), t = t.sibling;
		else i && au(t);
	}
	function Wu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && iu(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Uu(e, t, n, r), a & 2048 && Tl(9, t);
				break;
			case 1:
				Uu(e, t, n, r);
				break;
			case 3:
				Uu(e, t, n, r), i && gu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Fa(a)));
				break;
			case 12:
				if (a & 2048) {
					Uu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						q(t, t.return, e);
					}
				} else Uu(e, t, n, r);
				break;
			case 31:
				Uu(e, t, n, r);
				break;
			case 13:
				Uu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && iu(t), o._visibility & 2 ? Uu(e, t, n, r) : (o._visibility |= 2, Gu(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && iu(s), o._visibility & 2 ? Uu(e, t, n, r) : Ku(e, t)), a & 2048 && Hu(s, t);
				break;
			case 24:
				Uu(e, t, n, r), a & 2048 && H(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Zl(a.child, !0), Zl(t.child, !0))), Uu(e, t, n, r);
				break;
			default: Uu(e, t, n, r);
		}
	}
	function Gu(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Gu(a, o, s, c, i), Tl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Gu(a, o, s, c, i)) : u._visibility & 2 ? Gu(a, o, s, c, i) : Ku(a, o), i && l & 2048 && Hu(o.alternate, o);
					break;
				case 24:
					Gu(a, o, s, c, i), i && l & 2048 && H(o.alternate, o);
					break;
				default: Gu(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Ku(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Ku(n, r), i & 2048 && Hu(r.alternate, r);
					break;
				case 24:
					Ku(n, r), i & 2048 && H(r.alternate, r);
					break;
				default: Ku(n, r);
			}
			t = t.sibling;
		}
	}
	var qu = 8192;
	function Ju(e, t, n) {
		if (e.subtreeFlags & qu) for (e = e.child; e !== null;) Yu(e, t, n), e = e.sibling;
	}
	function Yu(e, t, n) {
		switch (e.tag) {
			case 26:
				Ju(e, t, n), e.flags & qu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, Nu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Ju(e, t, n), e.flags & qu && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = Nu;
				Nu = bm(e.stateNode.containerInfo), Ju(e, t, n), Nu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = qu, qu = 16777216, Ju(e, t, n), qu = r) : Ju(e, t, n));
				break;
			case 30:
				if ((e.flags & qu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Wl === null && (Wl = /* @__PURE__ */ new Map()), Wl.set(r, i);
				}
				Ju(e, t, n);
				break;
			default: Ju(e, t, n);
		}
	}
	function Xu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Zu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				fu = r, ed(r, e);
			}
			Xu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Qu(e), e = e.sibling;
	}
	function Qu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Zu(e), e.flags & 2048 && El(9, e, e.return);
				break;
			case 3:
				Zu(e);
				break;
			case 12:
				Zu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, $u(e)) : Zu(e);
				break;
			default: Zu(e);
		}
	}
	function $u(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				fu = r, ed(r, e);
			}
			Xu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					El(8, t, t.return), $u(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, $u(t));
					break;
				default: $u(t);
			}
			e = e.sibling;
		}
	}
	function ed(e, t) {
		for (; fu !== null;) {
			var n = fu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					El(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Fa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, fu = r;
			else a: for (n = e; fu !== null;) {
				r = fu;
				var i = r.sibling, a = r.return;
				if (Cu(r), r === n) {
					fu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, fu = i;
					break a;
				}
				fu = a;
			}
		}
	}
	var td = {
		getCacheForType: function(e) {
			var t = Da(Na), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Da(Na).controller.signal;
		}
	}, nd = typeof WeakMap == "function" ? WeakMap : Map, U = 0, rd = null, W = null, G = 0, K = 0, id = null, ad = !1, od = !1, sd = !1, cd = 0, ld = 0, ud = 0, dd = 0, fd = 0, pd = 0, md = 0, hd = null, gd = null, _d = !1, vd = 0, yd = 0, bd = Infinity, xd = null, Sd = null, Cd = 0, wd = null, Td = null, Ed = 0, Dd = 0, Od = null, kd = null, Ad = null, jd = null, Md = null, Nd = 0, Pd = null;
	function Fd() {
		return U & 2 && G !== 0 ? G & -G : A.T === null ? P() : Rf();
	}
	function Id() {
		if (pd === 0) {
			if (!(G & 536870912) || R) {
				var e = ct;
				ct <<= 1, !(ct & 3932160) && (ct = 262144), pd = e;
			} else pd = 536870912;
		}
		return e = No.current, e !== null && (e.flags |= 32), pd;
	}
	function Ld(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(yi(e.memoizedProps, n))), jd === null && (jd = []), jd.push(t.bind(null, r));
		}
	}
	function Rd(e, t, n) {
		(e === rd && (K === 2 || K === 9) || e.cancelPendingCommit !== null) && (Gd(e, 0), Hd(e, G, pd, !1)), _t(e, n), U & 2 && e === rd || (e === rd && (!(U & 2) && (dd |= n), ld === 4 && Hd(e, G, pd, !1)), Af(e));
	}
	function zd(e, t, n) {
		if (U & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || ft(e, t), a = r ? $d(e, t) : Zd(e, t, !0), o = r;
		do {
			if (a === 0) {
				od && !r && Hd(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Vd(n)) a = Zd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = hd;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Gd(c, s).flags |= 256), s = Zd(c, s, !1), s !== 2 && s !== 6) {
								if (sd && !l) {
									c.errorRecoveryDisabledLanes |= o, dd |= o, a = 4;
									break a;
								}
								o = gd, gd = a, o !== null && (gd === null ? gd = o : gd.push.apply(gd, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Gd(e, 0), Hd(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Hd(r, t, pd, !ad);
							break a;
						case 2:
							gd = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = vd + 300 - Ke(), 10 < a)) {
						if (Hd(r, t, pd, !ad), dt(r, 0, !0) !== 0) break a;
						Ed = t, r.timeoutHandle = gp(Bd.bind(null, r, n, gd, xd, _d, t, pd, dd, md, ad, o, "Throttled", -0, 0), a);
						break a;
					}
					Bd(r, n, gd, xd, _d, t, pd, dd, md, ad, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Af(e);
	}
	function Bd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: bn
		}, Wl = null, Yu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? vd - Ke() : (a & 4194048) === a ? yd - Ke() : 0, m = eh(d, m), m !== null) ? (Ed = a, e.cancelPendingCommit = m(sf.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Hd(e, a, o, !l)) : sf(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Vd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Ur(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Hd(e, t, n, r) {
		t = pt(e, t), t &= ~fd, t &= ~dd, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - rt(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && yt(e, n, t);
	}
	function Ud() {
		return U & 6 ? !0 : (jf(0, !1), !1);
	}
	function Wd() {
		if (W !== null) {
			if (K === 0) var e = W.return;
			else e = W, ya = va = null, ss(e), so = null, co = 0, e = W;
			for (; e !== null;) wl(e.alternate, e), e = e.return;
			W = null;
		}
	}
	function Gd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Ed = 0, Wd(), rd = e, W = n = Ii(e.current, null), G = t, K = 0, id = null, ad = !1, od = ft(e, t), sd = !1, md = pd = fd = dd = ud = ld = 0, gd = hd = null, _d = !1, cd = pt(e, t), Ei(), n;
	}
	function Kd(e, t) {
		z = null, A.H = _c, t === Za || t === $a ? (t = ao(), K = 3) : t === Qa ? (t = ao(), K = 4) : K = t === Fc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, id = t, W === null && (ld = 1, kc(e, Wi(t, e.current)));
	}
	function qd() {
		var e = No.current;
		return e === null ? !0 : (G & 4194048) === G ? Po === null : (G & 62914560) === G || G & 536870912 ? e === Po : !1;
	}
	function Jd() {
		var e = A.H;
		return A.H = _c, e === null ? _c : e;
	}
	function Yd() {
		var e = A.A;
		return A.A = td, e;
	}
	function Xd() {
		ld = 4, ad || (G & 4194048) !== G && No.current !== null || (od = !0), !(ud & 134217727) && !(dd & 134217727) || rd === null || Hd(rd, G, pd, !1);
	}
	function Zd(e, t, n) {
		var r = U;
		U |= 2;
		var i = Jd(), a = Yd();
		(rd !== e || G !== t) && (xd = null, Gd(e, t)), t = !1;
		var o = ld;
		a: do
			try {
				if (K !== 0 && W !== null) {
					var s = W, c = id;
					switch (K) {
						case 8:
							Wd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							No.current === null && (t = !0);
							var l = K;
							if (K = 0, id = null, rf(e, s, c, l), n && od) {
								o = 0;
								break a;
							}
							break;
						default: l = K, K = 0, id = null, rf(e, s, c, l);
					}
				}
				Qd(), o = ld;
				break;
			} catch (t) {
				Kd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, ya = va = null, U = r, A.H = i, A.A = a, W === null && (rd = null, G = 0, Ei()), o;
	}
	function Qd() {
		for (; W !== null;) tf(W);
	}
	function $d(e, t) {
		var n = U;
		U |= 2;
		var r = Jd(), a = Yd();
		rd !== e || G !== t ? (xd = null, bd = Ke() + 500, Gd(e, t)) : od = ft(e, t);
		a: do
			try {
				if (K !== 0 && W !== null) {
					t = W;
					var o = id;
					b: switch (K) {
						case 1:
							K = 0, id = null, rf(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (to(o)) {
								K = 0, id = null, nf(t);
								break;
							}
							t = function() {
								K !== 2 && K !== 9 || rd !== e || (K = 7), Af(e);
							}, o.then(t, t);
							break a;
						case 3:
							K = 7;
							break a;
						case 4:
							K = 5;
							break a;
						case 7:
							to(o) ? (K = 0, id = null, nf(t)) : (K = 0, id = null, rf(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (W.tag) {
								case 26: s = W.memoizedState;
								case 5:
								case 27:
									var c = W;
									if (s ? Ym(s) : c.stateNode.complete) {
										K = 0, id = null;
										var l = c.sibling;
										if (l !== null) W = l;
										else {
											var u = c.return;
											u === null ? W = null : (W = u, af(u));
										}
										break b;
									}
							}
							K = 0, id = null, rf(e, t, o, 5);
							break;
						case 6:
							K = 0, id = null, rf(e, t, o, 6);
							break;
						case 8:
							Wd(), ld = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ef();
				break;
			} catch (t) {
				Kd(e, t);
			}
		while (1);
		return ya = va = null, A.H = r, A.A = a, U = n, W === null ? (rd = null, G = 0, Ei(), ld) : 0;
	}
	function ef() {
		for (; W !== null && !We();) tf(W);
	}
	function tf(e) {
		var t = hl(e.alternate, e, cd);
		e.memoizedProps = e.pendingProps, t === null ? af(e) : W = t;
	}
	function nf(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Yc(n, t, t.pendingProps, t.type, void 0, G);
				break;
			case 11:
				t = Yc(n, t, t.pendingProps, t.type.render, t.ref, G);
				break;
			case 5:
				ss(t);
				var r = t;
				r === aa && (R ? (fa(r), r.tag === 5 && r.stateNode != null && (oa = r.stateNode)) : (fa(r), R = !0));
			default: wl(n, t), t = W = Li(t, cd), t = hl(n, t, cd);
		}
		e.memoizedProps = e.pendingProps, t === null ? af(e) : W = t;
	}
	function rf(e, t, n, r) {
		ya = va = null, ss(t), so = null, co = 0;
		var i = t.return;
		try {
			if (Pc(e, i, t, n, G)) {
				ld = 1, kc(e, Wi(n, e.current)), W = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw W = i, t;
			ld = 1, kc(e, Wi(n, e.current)), W = null;
			return;
		}
		t.flags & 32768 ? (R || r === 1 ? e = !0 : od || G & 536870912 ? e = !1 : (ad = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = No.current, r !== null && r.tag === 13 && (r.flags |= 16384))), of(t, e)) : af(t);
	}
	function af(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				of(t, ad);
				return;
			}
			e = t.return;
			var n = Sl(t.alternate, t, cd);
			if (n !== null) {
				W = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				W = t;
				return;
			}
			W = t = e;
		} while (t !== null);
		ld === 0 && (ld = 5);
	}
	function of(e, t) {
		do {
			var n = Cl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, W = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				W = e;
				return;
			}
			W = e = n;
		} while (e !== null);
		ld = 6, W = null;
	}
	function sf(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			hf();
		while (Cd !== 0);
		if (U & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === rd && (W = rd = null, G = 0), Td = t, wd = e, Ed = n, Od = a, kd = r, cf(e, t, n, s, c, l, f);
		}
	}
	function cf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (Dd = s, s |= Ti, vt(e, n, s, r, i, a), jd = null, (n & 335544064) === n ? (Md = Ra(e), r = 10262) : (Md = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Cf(Xe, function() {
			return gf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Ul = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = A.T, A.T = null, i = j.p, j.p = 2, a = U, U |= 4;
			try {
				_u(e, t, n);
			} finally {
				U = a, j.p = i, A.T = r;
			}
		}
		Cd = 1, Ul ? Ad = Mp(o, e.containerInfo, Md, df, ff, uf, pf, gf, lf, null, null) : (df(), ff(), pf());
	}
	function lf(e) {
		if (Cd !== 0) {
			var t = wd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function uf() {
		Cd === 3 && (Cd = 0, Ru(Td, wd), Cd = 4);
	}
	function df() {
		if (Cd === 1) {
			Cd = 0;
			var e = wd, t = Td, n = Ed, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = A.T, A.T = null;
				var i = j.p;
				j.p = 2;
				var a = U;
				U |= 4;
				try {
					mu = hu = !1, Pu(t, e, n), n = cp;
					var o = Yr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Jr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Xr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = qr(s, h), v = qr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					gh = !!sp, cp = sp = null;
				} finally {
					U = a, j.p = i, A.T = r;
				}
			}
			e.current = t, Cd = 2;
		}
	}
	function ff() {
		if (Cd === 2) {
			Cd = 0;
			var e = wd, t = Td, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = A.T, A.T = null;
				var r = j.p;
				j.p = 2;
				var i = U;
				U |= 4;
				try {
					yu(e, t.alternate, t);
				} finally {
					U = i, j.p = r, A.T = n;
				}
			}
			Cd = 3;
		}
	}
	function pf() {
		if (Cd === 4 || Cd === 3) {
			Cd = 0;
			var e = Ad;
			Ad = null, Ge();
			var t = wd, n = Td, r = Ed, i = kd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? Cd = 5 : (Cd = 0, Td = wd = null, mf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (Sd = null), Ct(r), n = n.stateNode, tt && typeof tt.onCommitFiberRoot == "function") try {
				tt.onCommitFiberRoot(et, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = A.T, a = j.p, j.p = 2, A.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					A.T = n, j.p = a;
				}
			}
			if (i = jd, o = Md, Md = null, i !== null && (jd = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			Ed & 3 && hf(), Af(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Pd ? Nd++ : (Nd = 0, Pd = t) : (Nd = 0, Pd = null), jf(0, !1);
		}
	}
	function mf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Fa(t)));
	}
	function hf() {
		return Ad !== null && (Ad.skipTransition(), Ad = null), df(), ff(), pf(), gf();
	}
	function gf() {
		if (Cd !== 5) return !1;
		var e = wd, t = Dd;
		Dd = 0;
		var n = Ct(Ed), r = A.T, a = j.p;
		try {
			j.p = 32 > n ? 32 : n, A.T = null, n = Od, Od = null;
			var o = wd, s = Ed;
			if (Cd = 0, Td = wd = null, Ed = 0, U & 6) throw Error(i(331));
			var c = U;
			if (U |= 4, Qu(o.current), Wu(o, o.current, s, n), U = c, jf(0, !1), tt && typeof tt.onPostCommitFiberRoot == "function") try {
				tt.onPostCommitFiberRoot(et, o);
			} catch {}
			return !0;
		} finally {
			j.p = a, A.T = r, mf(e, t);
		}
	}
	function _f(e, t, n) {
		t = Wi(n, t), t = jc(e.stateNode, t, 2), e = bo(e, t, 2), e !== null && (_t(e, 2), Af(e));
	}
	function q(e, t, n) {
		if (e.tag === 3) _f(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				_f(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Sd === null || !Sd.has(r))) {
					e = Wi(n, e), n = Mc(2), r = bo(t, n, 2), r !== null && (Nc(n, r, t, e), _t(r, 2), Af(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function vf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new nd();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (sd = !0, i.add(n), e = yf.bind(null, e, t, n), t.then(e, e));
	}
	function yf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, rd === e && (G & n) === n && (ld === 4 || ld === 3 && (G & 62914560) === G && 300 > Ke() - vd ? U & 2 ? fd |= n : Gd(e, 0) : fd |= n, md === G && (md = 0)), Af(e);
	}
	function bf(e, t) {
		t === 0 && (t = ht()), e = ki(e, t), e !== null && (_t(e, t), Af(e));
	}
	function xf(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), bf(e, n);
	}
	function Sf(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), bf(e, n);
	}
	function Cf(e, t) {
		return He(e, t);
	}
	var wf = null, Tf = null, Ef = !1, Df = !1, Of = !1, kf = 0;
	function Af(e) {
		e !== Tf && e.next === null && (Tf === null ? wf = Tf = e : Tf = Tf.next = e), Df = !0, Ef || (Ef = !0, Lf());
	}
	function jf(e, t) {
		if (!Of && Df) {
			Of = !0;
			do
				for (var n = !1, r = wf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - rt(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, If(r, a));
						} else a = G, a = dt(r, r === rd ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || ft(r, a) || (n = !0, If(r, a));
					}
					r = r.next;
				}
			while (n);
			Of = !1;
		}
	}
	function Mf() {
		Nf();
	}
	function Nf() {
		Df = Ef = !1;
		var e = 0;
		kf !== 0 && hp() && (e = kf);
		for (var t = Ke(), n = null, r = wf; r !== null;) {
			var i = r.next, a = Pf(r, t);
			a === 0 ? (r.next = null, n === null ? wf = i : n.next = i, i === null && (Tf = n)) : (n = r, (e !== 0 || a & 3) && (Df = !0)), r = i;
		}
		Cd !== 0 && Cd !== 5 || jf(e, !1), kf !== 0 && (kf = 0);
	}
	function Pf(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - rt(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = mt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = rd, n = G, n = dt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (K === 2 || K === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ue(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || ft(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ue(r), Ct(n)) {
				case 2:
				case 8:
					n = Ye;
					break;
				case 32:
					n = Xe;
					break;
				case 268435456:
					n = Qe;
					break;
				default: n = Xe;
			}
			return r = Ff.bind(null, e), n = He(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ue(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Ff(e, t) {
		if (Cd !== 0 && Cd !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (hf() && e.callbackNode !== n) return null;
		var r = G;
		return r = dt(e, e === rd ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (zd(e, r, t), Pf(e, Ke()), e.callbackNode != null && e.callbackNode === n ? Ff.bind(null, e) : null);
	}
	function If(e, t) {
		if (hf()) return null;
		zd(e, t, !0);
	}
	function Lf() {
		bp(function() {
			U & 6 ? He(Je, Mf) : Nf();
		});
	}
	function Rf() {
		if (kf === 0) {
			var e = Va;
			e === 0 && (e = st, st <<= 1, !(st & 261888) && (st = 256)), kf = e;
		}
		return kf;
	}
	function J(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : yn(e);
	}
	function zf(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = J((i[Dt] || null).action), o = r.submitter;
			o && (t = (t = o[Dt] || null) ? J(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Vn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (kf !== 0) {
								var e = new FormData(i, o);
								rc(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), rc(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Y = 0; Y < gi.length; Y++) {
		var Bf = gi[Y];
		_i(Bf.toLowerCase(), "on" + (Bf[0].toUpperCase() + Bf.slice(1)));
	}
	_i(ci, "onAnimationEnd"), _i(li, "onAnimationIteration"), _i(ui, "onAnimationStart"), _i("dblclick", "onDoubleClick"), _i("focusin", "onFocus"), _i("focusout", "onBlur"), _i(di, "onTransitionRun"), _i(fi, "onTransitionStart"), _i(pi, "onTransitionCancel"), _i(mi, "onTransitionEnd"), Gt("onMouseEnter", ["mouseout", "mouseover"]), Gt("onMouseLeave", ["mouseout", "mouseover"]), Gt("onPointerEnter", ["pointerout", "pointerover"]), Gt("onPointerLeave", ["pointerout", "pointerover"]), Wt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Wt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Wt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Wt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Wt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Wt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Vf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Hf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vf));
	function Uf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Si(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Si(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function X(e, t) {
		var n = t[kt];
		n === void 0 && (n = t[kt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Kf(t, e, 2, !1), n.add(r));
	}
	function Z(e, t, n) {
		var r = 0;
		t && (r |= 4), Kf(n, e, r, t);
	}
	var Wf = "_reactListening" + Math.random().toString(36).slice(2);
	function Gf(e) {
		if (!e[Wf]) {
			e[Wf] = !0, Ht.forEach(function(t) {
				t !== "selectionchange" && (Hf.has(t) || Z(t, !1, e), Z(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Wf] || (t[Wf] = !0, Z("selectionchange", !1, t));
		}
	}
	function Kf(e, t, n, r) {
		switch (Ch(t)) {
			case 2:
				var i = _h;
				break;
			case 8:
				i = vh;
				break;
			default: i = yh;
		}
		n = i.bind(null, t, n, e), i = void 0, !An || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function qf(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = It(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Dn(function() {
			var r = a, i = Sn(n), s = [];
			a: {
				var c = hi.get(e);
				if (c !== void 0) {
					var l = Vn, u = e;
					switch (e) {
						case "keypress": if (In(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = ar;
							break;
						case "focusin":
							u = "focus", l = Xn;
							break;
						case "focusout":
							u = "blur", l = Xn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Xn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Jn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Yn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = cr;
							break;
						case ci:
						case li:
						case ui:
							l = Zn;
							break;
						case mi:
							l = lr;
							break;
						case "scroll":
						case "scrollend":
							l = Un;
							break;
						case "wheel":
							l = ur;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Qn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = or;
							break;
						case "submit":
							l = sr;
							break;
						case "toggle":
						case "beforetoggle": l = dr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = On(m, p), g != null && d.push(Q(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== xn && (u = n.relatedTarget || n.fromElement) && (It(u) || u[Ot])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? It(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Jn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = or, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Rt(c), h = l == null ? u : Rt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, It(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? E(c, l, Yf) : null, c !== null && Xf(s, u, c, d, !1), l !== null && f !== null && Xf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Rt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = jr;
					else if (Tr(c)) {
						if (Mr) _ = Vr;
						else {
							_ = zr;
							var v = Rr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && L(r.elementType) && (_ = jr) : _ = Br;
					if (_ &&= _(e, r)) {
						Er(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Rt(r) : window, e) {
					case "focusin":
						(Tr(v) || v.contentEditable === "true") && (Qr = v, $r = r, ei = null);
						break;
					case "focusout":
						ei = $r = Qr = null;
						break;
					case "mousedown":
						ti = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						ti = !1, ni(s, n, i);
						break;
					case "selectionchange": if (Zr) break;
					case "keydown":
					case "keyup": ni(s, n, i);
				}
				var y;
				if (pr) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else xr ? yr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (gr && n.locale !== "ko" && (xr || b !== "onCompositionStart" ? b === "onCompositionEnd" && xr && (y = Fn()) : (Mn = i, Nn = "value" in Mn ? Mn.value : Mn.textContent, xr = !0)), v = Jf(r, b), 0 < v.length && (b = new $n(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = br(n), y !== null && (b.data = y)))), (y = hr ? Sr(e, n) : Cr(e, n)) && (b = Jf(r, "onBeforeInput"), 0 < b.length && (v = new $n("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), zf(s, e, r, n, i);
			}
			Uf(s, t);
		});
	}
	function Q(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Jf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = On(e, n), i != null && r.unshift(Q(e, i, a)), i = On(e, t), i != null && r.push(Q(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Yf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Xf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = On(n, a), l != null && o.unshift(Q(n, l, c))) : i || (l = On(n, a), l != null && o.push(Q(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Zf = /\r\n?/g, Qf = /\u0000|\uFFFD/g;
	function $f(e) {
		return (typeof e == "string" ? e : "" + e).replace(Zf, "\n").replace(Qf, "");
	}
	function ep(e, t) {
		return t = $f(t), $f(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || pn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && pn(e, "" + r);
				else return;
				break;
			case "className":
				Zt(e, "class", r);
				break;
			case "tabIndex":
				Zt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Zt(e, n, r);
				break;
			case "style":
				gn(e, r, o);
				return;
			case "data": if (t !== "object") {
				Zt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = yn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = yn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = bn);
				return;
			case "onScroll":
				r != null && X("scroll", e);
				return;
			case "onScrollEnd":
				r != null && X("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = yn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				X("beforetoggle", e), X("toggle", e), Xt(e, "popover", r);
				break;
			case "xlinkActuate":
				Qt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Qt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Qt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Qt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Qt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Qt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Qt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Qt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Qt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Xt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = _n.get(n) || n, Xt(e, n, r);
			else return;
		}
		F = !0;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				gn(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") pn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") pn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && X("scroll", e);
				return;
			case "onScrollEnd":
				r != null && X("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = bn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!Ut.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[Dt] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					F = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Xt(e, n, r);
				}
				return;
		}
		F = !0;
	}
	function np(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				X("error", e), X("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				X("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				cn(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in X("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && un(e, !!r, n, !0) : un(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in X("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				fn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				X("beforetoggle", e), X("toggle", e), X("cancel", e), X("close", e);
				break;
			case "iframe":
			case "object":
				X("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Vf.length; r++) X(Vf[r], e);
				break;
			case "image":
				X("error", e), X("load", e);
				break;
			case "details":
				X("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": X("error", e), X("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (L(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && tp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	var rp = {};
	function ip(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (F = !0), o = m;
							break;
						case "name":
							m !== f && (F = !0), a = m;
							break;
						case "checked":
							m !== f && (F = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (F = !0), d = m;
							break;
						case "value":
							m !== f && (F = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (F = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				sn(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (F = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (F = !0), c = o;
						break;
					case "multiple": o !== l && (F = !0), s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? un(e, !!n, n ? [] : "", !1) : un(e, !!n, t, !0)) : un(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (F = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (F = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				dn(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (F = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (L(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && tp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || tp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function ap(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function op() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && ap(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && ap(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var sp = null, cp = null;
	function lp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function up(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function dp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function fp(e, t, n, r) {
		return n = lp(n).createElement(e), n[Et] = r, n[Dt] = t, np(n, e, t), Bt(n), n;
	}
	function pp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var mp = null;
	function hp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== mp && (mp = e, !0) : (mp = null, !1);
	}
	var gp = typeof setTimeout == "function" ? setTimeout : void 0, _p = typeof clearTimeout == "function" ? clearTimeout : void 0, vp = typeof Promise == "function" ? Promise : void 0, yp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : gp, bp = typeof queueMicrotask == "function" ? queueMicrotask : vp === void 0 ? gp : function(e) {
		return vp.resolve(null).then(e).catch(xp);
	};
	function xp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Sp(e) {
		return e === "head";
	}
	function Cp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Hh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") _m(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, _m(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Nt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && _m(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Hh(t);
	}
	function wp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Tp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Ep(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Dp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Op(e) {
		return Dp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function kp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Dp(t, n, e);
	}
	function Ap(e) {
		return e.documentElement.clientHeight;
	}
	function jp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Mp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Ap(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Xm(f), u > $m) {
									s.length = o;
									break;
								}
								f = new Promise(jp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Np(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Np.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : D({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Np.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Np.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Pp(e) {
		return {
			name: e,
			group: new Np("group", e),
			imagePair: new Np("image-pair", e),
			old: new Np("old", e),
			new: new Np("new", e)
		};
	}
	function Fp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Fp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Bp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Rp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), h(this._fragmentFiber.child, !1, Ip, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Ip(e, t, n, r) {
		return b(e).addEventListener(t, n, r), !1;
	}
	Fp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Bp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Rp(i.optionsOrUseCapture), h(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Lp(e, t, n, r) {
		return b(e).removeEventListener(t, n, r), !1;
	}
	function Rp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function zp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Bp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = zp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && zp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Fp.prototype.dispatchEvent = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return !0;
		t = b(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Fp.prototype.focus = function(e) {
		h(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = b(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		h(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = g(this._fragmentFiber);
		e !== null && (e = b(e), e = lp(e).activeElement, e !== null && h(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = b(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), h(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = b(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), h(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
			for (var n = t = 0; n < Kp.length; n++) {
				var r = Kp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Kp[t++] = r;
			}
			Kp.length = t;
		}
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = b(e), t.unobserve(e)), !1;
	}
	var Kp = [], qp = !1;
	function Jp(e, t, n) {
		Kp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), qp || (qp = !0, mm(function() {
			qp = !1;
			var e = Kp;
			Kp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Fp.prototype.getClientRects = function() {
		var e = [];
		return h(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
	};
	function Yp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = b(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Fp.prototype.getRootNode = function(e) {
		var t = g(this._fragmentFiber);
		return t === null ? this : b(t).getRootNode(e);
	}, Fp.prototype.compareDocumentPosition = function(e) {
		var t = g(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		h(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
		var r = b(t);
		if (n.length === 0) {
			if (n = r, _(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = v(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = b(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = b(n[0]), i = b(n[n.length - 1]);
		var a = _(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Xp(e, t, n, r, i) {
		var a = It(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = g(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = E(n, a, T), t === null ? t = !1 : (h(t, !0, C, a, n), a = x, x = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = E(r, a, T), t === null ? t = !1 : (h(t, !0, w, a, r), a = x, S = x = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		h(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = v(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || g(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = b(r), Zp(e, n);
				return;
			}
			if (r = b(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = b(a), Zp(a, n)) : b(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function Qp(e, t) {
		return e = b(e), $p(e, t), !1;
	}
	function $p(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function em(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Kp.length; i++) {
				var a = Kp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Kp[r++] = a);
			}
			Kp.length = r, n.observe(e);
		}), $p(e, t));
	}
	function tm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Jp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function nm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					nm(n), Ft(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function rm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[Nt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function im(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function am(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function om(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var um = null;
	function dm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function fm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function mm(e) {
		yp(function() {
			yp(function(t) {
				return e(t);
			});
		});
	}
	function hm(e, t, n) {
		switch (t = lp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function gm(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && $(e, t, r, null, rp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === bn && (e.onclick = null), Ft(e);
	}
	function _m(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Ft(e);
	}
	var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
	function bm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xm = j.d;
	j.d = {
		f: Sm,
		r: Cm,
		D: Em,
		C: Dm,
		L: Om,
		m: km,
		X: jm,
		S: Am,
		M: Mm
	};
	function Sm() {
		var e = xm.f(), t = Ud();
		return e || t;
	}
	function Cm(e) {
		var t = Lt(e);
		t !== null && t.tag === 5 && t.type === "form" ? ac(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = on(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), ym.has(i) || (ym.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), np(t, "link", e), Bt(t), r.head.appendChild(t)));
		}
	}
	function Em(e) {
		xm.D(e), Tm("dns-prefetch", e, null);
	}
	function Dm(e, t) {
		xm.C(e, t), Tm("preconnect", e, t);
	}
	function Om(e, t, n) {
		xm.L(e, t, n);
		var r = wm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + on(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + on(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + on(n.imageSizes) + "\"]")) : i += "[href=\"" + on(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(vm.has(a) || (e = D({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				np(o, "link", e), t === "style" && (o[Pt] = !0, o.onload = o.onerror = function() {
					Vt(o);
				}), Bt(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		xm.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + on(r) + "\"][href=\"" + on(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!vm.has(a) && (e = D({
				rel: "modulepreload",
				href: e
			}, t), vm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zm(a))) return;
				}
				r = n.createElement("link"), np(r, "link", e), Bt(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		xm.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = zt(r).hoistableStyles, a = Pm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Fm(a))) s.loading = 5;
				else {
					e = D({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vm.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					Bt(c), np(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Vm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function jm(e, t) {
		xm.X(e, t);
		var n = wm;
		if (n && e) {
			var r = zt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Bt(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mm(e, t) {
		xm.M(e, t);
		var n = wm;
		if (n && e) {
			var r = zt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Bt(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = Oe.current) ? bm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = zt(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Pm(n.href);
					var o = zt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Fm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = vm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, vm.set(e, o)), Lm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = zt(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Pm(e) {
		return "href=\"" + on(e) + "\"";
	}
	function Fm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Im(e) {
		return D({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[Pt]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[Pt] = !0, t.onload = t.onerror = Vt.bind(null, t), np(t, "link", n), Bt(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + on(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + on(n.href) + "\"]");
				if (r) return t.instance = r, Bt(r), r;
				var a = D({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Bt(r), np(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, Bt(o), o;
				r = Im(n), (a = vm.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), Bt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), np(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, Bt(a), a) : (r = n, (a = vm.get(o)) && (r = D({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Bt(a), np(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Vm(r, n.precedence, e));
		return t.instance;
	}
	function Vm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Hm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Wm = null;
	function Gm(e, t, n) {
		if (Wm === null) {
			var r = /* @__PURE__ */ new Map(), i = Wm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Wm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[Nt] || a[Et] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Km(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function qm(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Jm(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Ym(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Xm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Zm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = rh.bind(e), t.decode().then(e, e));
	}
	function Qm(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Pm(r.href), a = t.querySelector(Fm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Bt(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = vm.get(i)) && Hm(r, i), a = a.createElement("link"), Bt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), np(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = nh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var $m = 0;
	function eh(e, t) {
		return e.stylesheets && e.count === 0 && ah(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ah(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && $m === 0 && ($m = 62500 * op());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ah(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > $m ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function th(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) ah(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function nh() {
		this.count--, th(this);
	}
	function rh() {
		this.imgCount--, th(this);
	}
	var ih = null;
	function ah(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ih = /* @__PURE__ */ new Map(), t.forEach(oh, e), ih = null, nh.call(e));
	}
	function oh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ih.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ih.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = nh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var sh = {
		$$typeof: k,
		Provider: null,
		Consumer: null,
		_currentValue: xe,
		_currentValue2: xe,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gt(0), this.hiddenUpdates = gt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Pi(3, null, null, t), e.current = a, a.stateNode = e, t = Pa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, _o(a), e;
	}
	function uh(e) {
		return e ? (e = Mi, e) : Mi;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = yo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = bo(e, r, t), n !== null && (Rd(n, e, t), xo(n, e, t));
	}
	function fh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ph(e, t) {
		fh(e, t), (e = e.alternate) && fh(e, t);
	}
	function mh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ki(e, 67108864);
			t !== null && Rd(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Fd();
			t = St(t);
			var n = ki(e, t);
			n !== null && Rd(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 2, yh(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 8, yh(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) qf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = Lt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = ut(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - rt(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Af(a), !(U & 6) && (bd = Ke() + 500, jf(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ki(a, 2), s !== null && Rd(s, a, 2), Ud(), ph(a, 2);
					}
					if (a = bh(r), a === null && qf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else qf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = Sn(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = It(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return xh = e, null;
	}
	function Ch(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (qe()) {
				case Je: return 2;
				case Ye: return 8;
				case Xe:
				case Ze: return 32;
				case Qe: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var wh = !1, Th = null, Eh = null, Dh = null, Oh = /* @__PURE__ */ new Map(), kh = /* @__PURE__ */ new Map(), Ah = [], jh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Mh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Th = null;
				break;
			case "dragenter":
			case "dragleave":
				Eh = null;
				break;
			case "mouseover":
			case "mouseout":
				Dh = null;
				break;
			case "pointerover":
			case "pointerout":
				Oh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": kh.delete(t.pointerId);
		}
	}
	function Nh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Lt(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ph(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Th = Nh(Th, e, t, n, r, i), !0;
			case "dragenter": return Eh = Nh(Eh, e, t, n, r, i), !0;
			case "mouseover": return Dh = Nh(Dh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Oh.set(a, Nh(Oh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, kh.set(a, Nh(kh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Fh(e) {
		var t = It(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, wt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, wt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Ih(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = bh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				xn = r, n.target.dispatchEvent(r), xn = null;
			} else return t = Lt(n), t !== null && mh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Lh(e, t, n) {
		Ih(e) && n.delete(t);
	}
	function Rh() {
		wh = !1, Th !== null && Ih(Th) && (Th = null), Eh !== null && Ih(Eh) && (Eh = null), Dh !== null && Ih(Dh) && (Dh = null), Oh.forEach(Lh), kh.forEach(Lh);
	}
	function zh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, wh || (wh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Rh)));
	}
	var Bh = null;
	function Vh(e) {
		Bh !== e && (Bh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Bh === e && (Bh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Sh(r || n) === null) continue;
					break;
				}
				var a = Lt(n);
				a !== null && (e.splice(t, 3), t -= 3, rc(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Hh(e) {
		function t(t) {
			return zh(t, e);
		}
		Th !== null && zh(Th, e), Eh !== null && zh(Eh, e), Dh !== null && zh(Dh, e), Oh.forEach(t), kh.forEach(t);
		for (var n = 0; n < Ah.length; n++) {
			var r = Ah[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Ah.length && (n = Ah[0], n.blockedOn === null);) Fh(n), n.blockedOn === null && Ah.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Dt] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Dt] || null) s = o.formAction;
					else if (Sh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Vh(n);
			}
		}
	}
	function Uh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Wh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.render = Wh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		dh(n, Fd(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), Ud(), t[Ot] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = P();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Ah.length && t !== 0 && t < Ah[n].priority; n++);
			Ah.splice(n, 0, e), n === 0 && Fh(e);
		}
	};
	var Kh = n.version;
	if (Kh !== "19.3.1") throw Error(i(527, Kh, "19.3.1"));
	j.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var qh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: A,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jh.isDisabled && Jh.supportsFiber) try {
			et = Jh.inject(qh), tt = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Ec, s = Dc, c = Oc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[Ot] = t.current, Gf(e), new Wh(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = (e) => e?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
// node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function v(e, t, n = []) {
	if (t == null) throw Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: _(e),
		size: 24,
		node: t,
		...n.length > 0 ? { aliases: n } : {}
	};
}
// node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var y = (e) => {
	let t = "", n = !1;
	for (let r of e) r === "-" || r === "_" || r <= " " ? n = t.length > 0 : (t.length === 0 ? t += r.toLowerCase() : t += n ? r.toUpperCase() : r, n = !1);
	return t;
}, b = (e) => {
	let t = y(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, x = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), S = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function C(e) {
	return e != null;
}
function w(e, t = {}) {
	let n = t.attributeNames ?? {}, r = (e) => n[e] ?? e, i = e.size ?? e.width ?? S.width, a = e.size ?? e.height ?? S.height, o = e.aliases?.filter((e) => typeof e == "string" && e.trim() !== "").map((e) => `lucide-${e}`) ?? [], s = [...e.name ? [`lucide-${e.name}`] : [], ...o], c = t.className?.split(" ").filter(Boolean) ?? [], l = t.includeDefaultClasses === !1 ? x(...c) : x("lucide", ...s, ...c), u = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? S["stroke-width"]) * Number(e.size ?? e.width ?? S.width) / Number(t.size ?? t.width ?? S.width) : t.strokeWidth ?? S["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(S).reduce((e, [t, n]) => (e[r(t)] = n, e), {}),
			..."color" in t && t.color && { [r("stroke")]: t.color },
			..."size" in t && C(t.size) && {
				[r("width")]: t.size,
				[r("height")]: t.size
			},
			..."width" in t && C(t.width) && { [r("width")]: t.width },
			..."height" in t && C(t.height) && { [r("height")]: t.height },
			[r("stroke-width")]: u,
			...l && { [r("class")]: l },
			[r("viewBox")]: `0 0 ${i} ${a}`,
			...t.hasA11yProp === !1 ? { [r("aria-hidden")]: "true" } : {},
			..."attributes" in t && t.attributes
		},
		e.node.map((e) => {
			let [n, i, a] = e, o = t.nonScalingStroke ? {
				[r("vector-effect")]: "non-scaling-stroke",
				...i
			} : i;
			return a ? [
				n,
				o,
				a
			] : [n, o];
		})
	];
}
// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function T(e, t = {}) {
	return w(e, {
		...t,
		attributeNames: {
			...t.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
// node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var E = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, D = /* @__PURE__ */ c(u(), 1), ee = (0, D.createContext)({}), O = () => (0, D.useContext)(ee), te = (0, D.forwardRef)(({ color: e, size: t, width: n, height: r, strokeWidth: i, absoluteStrokeWidth: a, nonScalingStroke: o, className: s = "", children: c, iconNode: l = [], icon: u = {
	node: l,
	aliases: [],
	size: 24
}, ...d }, f) => {
	let { size: p = 24, strokeWidth: m = 2, absoluteStrokeWidth: h = !1, nonScalingStroke: g = !1, color: _ = "currentColor", className: v = "" } = O() ?? {}, y = !!c || E(d), [b, S, C = []] = T(u, {
		color: e ?? _,
		width: n ?? t ?? p,
		height: r ?? t ?? p,
		strokeWidth: i ?? m,
		absoluteStrokeWidth: a ?? h,
		nonScalingStroke: o ?? g,
		className: x(v, s),
		hasA11yProp: y,
		attributes: d
	});
	return (0, D.createElement)(b, {
		ref: f,
		...S
	}, [...C.map(([e, t]) => (0, D.createElement)(e, t)), ...Array.isArray(c) ? c : [c]]);
});
// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function ne(e, t = [], n = []) {
	let r = typeof e == "string" ? v(e, t, n) : e, i = (0, D.forwardRef)(({ className: e, ...t }, n) => (0, D.createElement)(te, {
		ref: n,
		icon: r,
		className: e,
		...t
	}));
	return r.name && (i.displayName = b(r.name)), i;
}
// node_modules/lucide-react/dist/esm/icons/arrow-right.mjs
var re = {
	name: "arrow-right",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "m12 5 7 7-7 7",
		key: "xquz4c"
	}]]
};
re.node;
var ie = ne(re), ae = {
	name: "arrow-up-right",
	size: 24,
	node: [["path", {
		d: "M7 7h10v10",
		key: "1tivn9"
	}], ["path", {
		d: "M7 17 17 7",
		key: "1vkiza"
	}]]
};
ae.node;
var k = ne(ae), oe = {
	name: "external-link",
	size: 24,
	node: [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "M10 14 21 3",
			key: "gplh6r"
		}],
		["path", {
			d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
			key: "a6xqqp"
		}]
	]
};
oe.node;
var se = ne(oe), ce = {
	name: "pause",
	size: 24,
	node: [["rect", {
		x: "14",
		y: "3",
		width: "5",
		height: "18",
		rx: "1",
		key: "kaeet6"
	}], ["rect", {
		x: "5",
		y: "3",
		width: "5",
		height: "18",
		rx: "1",
		key: "1wsw3u"
	}]]
};
ce.node;
var le = ne(ce), ue = {
	name: "play",
	size: 24,
	node: [["path", {
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
		key: "10ikf1"
	}]]
};
ue.node;
var de = ne(ue), fe = g(), pe = {
	slides: [
		{
			title: "METEORITOS",
			kind: "cover",
			subtitle: "Análisis de un catálogo histórico y desarrollo de un atlas interactivo",
			image: "atlas_general.jpg",
			notes: "Presentar el proyecto del curso Herramientas de Programación con Python. Duración prevista: 20–25 minutos. Los datos corresponden a la copia histórica entregada, no a una descarga actualizada. Integrantes: Richard Michel Altamirano Galvez, Gabriel Andreas Saco Alvarado y Fina Rosmery Pretil Pocomucha. La portada usa una proyección ortográfica D3 con las 32 186 coordenadas utilizables, incluyendo registros sin año. El giro se puede pausar o controlar arrastrando. Fuente cartográfica: Natural Earth. Docente: Uwe Rojas."
		},
		{
			title: "Encontrados y vistos caer",
			kind: "text",
			lead: "¿Qué patrones geográficos, temporales y de masa aparecen en el catálogo?",
			items: [["Found", "Meteoritos encontrados después de su caída."], ["Fell", "Meteoritos cuya caída fue observada."]],
			foot: "El año de un hallazgo puede diferir del año de caída.",
			notes: "Explicar por qué separar Found y Fell cambia la interpretación. El catálogo documenta recuperaciones y observaciones, no una tasa mundial de impactos. Fuente: informe, sección 2; NASA, Meteors & Meteorites Facts, https://science.nasa.gov/solar-system/meteors-meteorites/facts/"
		},
		{
			title: "La unidad de análisis es un registro",
			kind: "stats",
			metrics: [
				["45 716", "filas originales"],
				["10", "variables originales"],
				["45 715", "registros terrestres"]
			],
			lead: "Una tabla principal, identificada por id.",
			items: [["Contenido", "Nombre, clase, masa, tipo, año y coordenadas."], ["Integridad", "Identificadores únicos y columnas originales conservadas."]],
			notes: "El registro Meridiani Planum corresponde a Marte y se excluye solo de la muestra terrestre. No equiparar cada registro con un impacto independiente. Fuente: CSV original y Excel, Calidad. TidyTuesday https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-06-11"
		},
		{
			title: "La limpieza conserva la trazabilidad",
			kind: "code",
			code: "terrestres = datos.loc[datos[\"id\"].ne(32789)].copy()\n\nmasas = terrestres.loc[terrestres[\"mass\"].gt(0)]\n\n# Cada pregunta utiliza su muestra válida.\n# El archivo original permanece intacto.",
			items: [
				["Base terrestre", "Se excluye Meridiani Planum (Marte) y se crea una copia."],
				["Masa positiva", "Se filtra mass > 0: no se imputan masas ausentes ni ceros."],
				["Muestras por pregunta", "Las reglas de coordenadas y año se aplican según el análisis."]
			],
			notes: "Código pedagógico simplificado de las reglas efectivas del notebook. La base preparada conserva las 45 716 filas. Las muestras se filtran por pregunta. No se imputan coordenadas ni masas. Fuente: notebook y hoja Calidad.",
			foot: "CSV original: 131 masas ausentes y 19 ceros. Coordenadas (0, 0) no mapeables; año 2101 inválido."
		},
		{
			title: "Flujo de trabajo del proyecto",
			kind: "pipeline",
			items: [
				["Carga", "CSV y diccionario"],
				["Unión", "Llave y pertinencia"],
				["Limpieza", "Tipos y faltantes"],
				["Transformación", "Variables y tablas"],
				["Análisis", "Preguntas y gráficos"],
				["Conclusiones", "Hallazgos y límites"]
			],
			code: "original = pd.read_csv(ruta)\noriginal.head(); original.info()\noriginal.describe()\n# groupby · pivot_table · melt\n# Matplotlib: figuras P1–P10",
			notes: "El proyecto tiene una sola tabla de observaciones. El diccionario y Natural Earth son recursos auxiliares. Por ello, el requisito condicional de tres merges no aplica. Los cálculos alimentan el notebook, el informe y el atlas. Seguir las seis etapas de la consigna. Unión: no aplica a una única tabla de observaciones; comprobar id y conservación de filas. P9 ahora incluye melt, exportación larga y reconstrucción verificada."
		},
		{
			title: "Funciones pequeñas, resultados verificables",
			kind: "code",
			code: "def resumir_por_grupo(datos, columna):\n    return datos.groupby(columna).agg(\n        registros=(\"id\", \"size\"),\n        masa_mediana_g=(\"mass\", \"median\"),\n        masa_media_g=(\"mass\", \"mean\"),\n    )",
			items: [
				["Parámetros", "La tabla y la columna de agrupación entran como argumentos."],
				["Resumen por grupo", "size cuenta registros; median y mean resumen la masa."],
				["Retorno", "Devuelve una tabla que se puede reutilizar y exportar."]
			],
			foot: "El análisis también utiliza pivot_table, crosstab y melt (P9), además de pd.cut.",
			notes: "Explicar parámetros, retorno y reutilización. No es una transcripción literal de la función más completa del notebook. Se utilizan cinco funciones principales y rutinas cartográficas. Fuente: anexo B y notebook."
		},
		{
			title: "P1 · La cobertura geográfica es desigual",
			kind: "figure",
			image: "01_mapa_mundial.png",
			metric: "32 186",
			label: "registros con ubicación utilizable",
			insight: "La cobertura alcanza 99,0 % en Fell y 69,7 % en Found.",
			foot: "Base terrestre: 45 715. Ubicación no utilizable: 13 529.",
			notes: "Fuente: hoja P1_tipo_y_mapa. Mapa Equal Earth con Cartopy y Natural Earth. La densidad refleja observación y recuperación, además de disponibilidad de coordenadas. https://www.naturalearthdata.com/; https://cartopy.readthedocs.io/"
		},
		{
			title: "P2 · La Antártida concentra los hallazgos",
			kind: "figure",
			image: "02_antartida.png",
			metric: "22 099",
			label: "registros al sur de 60° S",
			insight: "48,3 % de la base terrestre y 68,7 % de los registros mapeables.",
			foot: "Todos son Found. Entre los Found mapeables representan 71,1 %.",
			notes: "La conservación, exposición y búsqueda organizada ayudan a interpretar la concentración. El catálogo no permite atribuir causalmente cuánto aporta cada mecanismo. Fuente: P2_antartida_conteos; Tollenaar et al. (2022), https://doi.org/10.1126/sciadv.abj8138"
		},
		{
			title: "P3 · El crecimiento describe registros",
			kind: "chart",
			chart: "decadas",
			image: "03_registros_decada.png",
			metric: "17 756",
			label: "registros en la década de 2000",
			insight: "Las campañas de recuperación influyen en la serie histórica.",
			foot: "Desde 1800. La década de 2010 está incompleta: el archivo llega a 2013.",
			notes: "Fuente: hoja P3_decadas. El gráfico conserva Found y Fell separados. Los 60 registros anteriores a 1800 permanecen en Excel. No interpretar la serie como frecuencia anual de impactos."
		},
		{
			title: "P4 · L6 es la clase más frecuente",
			kind: "chart",
			chart: "clases",
			image: "04_clases_frecuentes.png",
			metric: "8 339",
			label: "registros de clase L6",
			insight: "L6 representa 18,2 % de los 45 715 registros terrestres.",
			foot: "Diez clases más frecuentes. Cada barra cuenta entradas del catálogo.",
			notes: "Fuente: hoja P4_clases. Los códigos se conservan tal como aparecen en la fuente. El patrón depende de clasificación, preservación y muestreo. Tipos: ASU, https://meteorites.asu.edu/meteorite-types"
		},
		{
			title: "P5 · La masa tiene una cola muy larga",
			kind: "chart",
			chart: "histograma",
			image: "05_histograma_masas.png",
			metric: "32,70 g",
			label: "mediana de masa positiva",
			insight: "La media asciende a 13 283,62 g por la presencia de valores muy grandes.",
			foot: "45 566 masas positivas. Histograma de log₁₀(masa en gramos).",
			notes: "Fuente: P5_histograma y P5_estadisticas. Son 40 intervalos. La transformación permite observar varios órdenes de magnitud sin sumar constantes ni reemplazar ceros."
		},
		{
			title: "P6 · Las masas típicas difieren",
			kind: "quartiles",
			image: "06_cajas_masa_tipo.png",
			metric: "91,7×",
			label: "razón entre medianas",
			insight: "Mediana Fell: 2 800 g. Mediana Found: 30,54 g.",
			foot: "44 491 Found y 1 075 Fell con masa positiva. Diferencia descriptiva.",
			notes: "Fuente: P6_masa_por_tipo. Los cuartiles y la mediana describen diferencias entre tipos. La lámina conserva el diagrama de caja del análisis, incluidos los valores atípicos. Sesgos de observación y recuperación impiden interpretar la diferencia como efecto causal."
		},
		{
			title: "P7 · Hoba encabeza el ranking",
			kind: "chart",
			chart: "ranking",
			image: "07_mas_pesados.png",
			metric: "60 t",
			label: "masa catalogada de Hoba",
			insight: "Los diez registros mayores reúnen 57,1 % de la masa positiva.",
			foot: "Masa registrada por entrada. No equivale a la masa previa a la entrada atmosférica.",
			notes: "Fuente: P7_mayores_masas y P5_estadisticas. El gráfico usa toneladas. Cada entrada puede referirse a material recuperado y no necesariamente a un único fragmento."
		},
		{
			title: "P8 · Año y masa tienen poca asociación",
			kind: "association",
			image: "08_anio_masa.png",
			metric: "ρ ≈ 0",
			label: "asociación de rangos débil",
			insight: "Found: 0,049. Fell: 0,026.",
			foot: "Desde 1800. 44 203 Found y 1 040 Fell con masa positiva y año utilizable.",
			notes: "Fuente: P8_asociacion. Spearman mide asociación monótona. La lámina muestra las nubes de puntos completas, con masa logarítmica. No sustenta causalidad ni ausencia de toda relación posible."
		},
		{
			title: "P9 · La composición cambia entre décadas",
			kind: "heatmap",
			image: "09_clases_decadas.png",
			metric: "17,4 %",
			label: "participación de L5 en 2000",
			insight: "En 1970, L5 representaba 1,9 %. El cambio es de 15,5 puntos porcentuales.",
			foot: "Porcentaje dentro de cada década. 2010 está incompleta.",
			notes: "Fuente: P9_clases_pct. Cada columna suma 100 %. No son porcentajes del catálogo total. Una mayor participación puede responder a campañas, clasificación y lugares de recuperación."
		},
		{
			title: "P10 · Tres registros corresponden al Perú",
			kind: "figure",
			image: "10_peru_carancas.png",
			metric: "Carancas",
			label: "Fell, 2007, 342 g catalogados",
			insight: "También se identifican Cerro La Tiza y Tambo Quemado.",
			foot: "Natural Earth 1:10 millones y validación documental de Carancas.",
			notes: "Fuente: P10_peru_candidatos. La frontera 1:110 millones excluía erróneamente Carancas. Se conserva esa comprobación para auditoría y se usa 1:10 millones junto con ASU. Daule corresponde a Ecuador. https://meteorites.asu.edu/news/carancas"
		}
	],
	tables: /* @__PURE__ */ JSON.parse("{\"P1_tipo_y_mapa\":[{\"tipo_registro\":\"Encontrado\",\"registros\":44608,\"registros_mapeables\":31090,\"cobertura_mapa_pct\":69.69601865136299},{\"tipo_registro\":\"Visto caer\",\"registros\":1107,\"registros_mapeables\":1096,\"cobertura_mapa_pct\":99.0063233965673}],\"P2_antartida_conteos\":[{\"tipo_registro\":\"Encontrado\",\"Región antártica\":22099,\"Resto del mundo\":8991},{\"tipo_registro\":\"Visto caer\",\"Región antártica\":0,\"Resto del mundo\":1096}],\"P2_antartida_pct\":[{\"tipo_registro\":\"Encontrado\",\"Región antártica\":71.08073335477646,\"Resto del mundo\":28.91926664522354},{\"tipo_registro\":\"Visto caer\",\"Región antártica\":0.0,\"Resto del mundo\":100.0}],\"P2_franjas\":[{\"franja_latitud\":\"90–60° S\",\"registros\":22099,\"masas_positivas\":22097,\"masa_mediana_g\":13.43,\"masa_media_g\":175.8918350907363,\"porcentaje\":68.66028708133972},{\"franja_latitud\":\"0–30° N\",\"registros\":5815,\"masas_positivas\":5796,\"masa_mediana_g\":261.325,\"masa_media_g\":19275.71680883368,\"porcentaje\":18.06686136829677},{\"franja_latitud\":\"30–60° N\",\"registros\":2680,\"masas_positivas\":2583,\"masa_mediana_g\":1990.0,\"masa_media_g\":68965.10944638017,\"porcentaje\":8.326601628037034},{\"franja_latitud\":\"30–0° S\",\"registros\":929,\"masas_positivas\":918,\"masa_mediana_g\":151.0,\"masa_media_g\":211018.9266350762,\"porcentaje\":2.886348101659106},{\"franja_latitud\":\"60–30° S\",\"registros\":608,\"masas_positivas\":602,\"masa_mediana_g\":133.5,\"masa_media_g\":74074.17518272426,\"porcentaje\":1.889020070838253},{\"franja_latitud\":\"60–90° N\",\"registros\":55,\"masas_positivas\":54,\"masa_mediana_g\":2375.0,\"masa_media_g\":1144663.685185185,\"porcentaje\":0.1708817498291182}],\"P3_decadas\":[{\"decada\":860,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":920,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":1390,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":1490,\"Encontrado\":0,\"Visto caer\":3},{\"decada\":1510,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":1570,\"Encontrado\":1,\"Visto caer\":0},{\"decada\":1580,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":1600,\"Encontrado\":1,\"Visto caer\":0},{\"decada\":1620,\"Encontrado\":0,\"Visto caer\":3},{\"decada\":1630,\"Encontrado\":0,\"Visto caer\":3},{\"decada\":1640,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":1650,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":1660,\"Encontrado\":0,\"Visto caer\":2},{\"decada\":1670,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":1680,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":1700,\"Encontrado\":0,\"Visto caer\":1},{\"decada\":1710,\"Encontrado\":1,\"Visto caer\":1},{\"decada\":1720,\"Encontrado\":1,\"Visto caer\":1},{\"decada\":1740,\"Encontrado\":1,\"Visto caer\":2},{\"decada\":1750,\"Encontrado\":0,\"Visto caer\":4},{\"decada\":1760,\"Encontrado\":0,\"Visto caer\":4},{\"decada\":1770,\"Encontrado\":1,\"Visto caer\":4},{\"decada\":1780,\"Encontrado\":3,\"Visto caer\":2},{\"decada\":1790,\"Encontrado\":3,\"Visto caer\":9},{\"decada\":1800,\"Encontrado\":5,\"Visto caer\":17},{\"decada\":1810,\"Encontrado\":6,\"Visto caer\":24},{\"decada\":1820,\"Encontrado\":5,\"Visto caer\":25},{\"decada\":1830,\"Encontrado\":12,\"Visto caer\":21},{\"decada\":1840,\"Encontrado\":18,\"Visto caer\":31},{\"decada\":1850,\"Encontrado\":35,\"Visto caer\":36},{\"decada\":1860,\"Encontrado\":39,\"Visto caer\":56},{\"decada\":1870,\"Encontrado\":38,\"Visto caer\":51},{\"decada\":1880,\"Encontrado\":83,\"Visto caer\":40},{\"decada\":1890,\"Encontrado\":75,\"Visto caer\":51},{\"decada\":1900,\"Encontrado\":83,\"Visto caer\":56},{\"decada\":1910,\"Encontrado\":88,\"Visto caer\":66},{\"decada\":1920,\"Encontrado\":89,\"Visto caer\":70},{\"decada\":1930,\"Encontrado\":218,\"Visto caer\":91},{\"decada\":1940,\"Encontrado\":138,\"Visto caer\":58},{\"decada\":1950,\"Encontrado\":152,\"Visto caer\":60},{\"decada\":1960,\"Encontrado\":335,\"Visto caer\":62},{\"decada\":1970,\"Encontrado\":4909,\"Visto caer\":60},{\"decada\":1980,\"Encontrado\":6766,\"Visto caer\":56},{\"decada\":1990,\"Encontrado\":11563,\"Visto caer\":56},{\"decada\":2000,\"Encontrado\":17697,\"Visto caer\":59},{\"decada\":2010,\"Encontrado\":1950,\"Visto caer\":13}],\"P4_clases\":[{\"class\":\"L6\",\"registros\":8339,\"masas_positivas\":8333,\"masa_mediana_g\":35.37,\"masa_media_g\":1441.241695067803,\"porcentaje\":18.24127748003938},{\"class\":\"H5\",\"registros\":7164,\"masas_positivas\":7160,\"masa_mediana_g\":24.66,\"masa_media_g\":2161.99072849162,\"porcentaje\":15.67100514054468},{\"class\":\"L5\",\"registros\":4817,\"masas_positivas\":4815,\"masa_mediana_g\":31.81,\"masa_media_g\":1789.569304880582,\"porcentaje\":10.53702285901783},{\"class\":\"H6\",\"registros\":4529,\"masas_positivas\":4528,\"masa_mediana_g\":18.95,\"masa_media_g\":862.1772782685513,\"porcentaje\":9.907032702614021},{\"class\":\"H4\",\"registros\":4222,\"masas_positivas\":4222,\"masa_mediana_g\":18.4,\"masa_media_g\":994.8434355755567,\"porcentaje\":9.23548069561413},{\"class\":\"LL5\",\"registros\":2766,\"masas_positivas\":2766,\"masa_mediana_g\":16.2,\"masa_media_g\":464.6758839479392,\"porcentaje\":6.050530460461555},{\"class\":\"LL6\",\"registros\":2045,\"masas_positivas\":2045,\"masa_mediana_g\":30.8,\"masa_media_g\":691.3023041564793,\"porcentaje\":4.473367603631194},{\"class\":\"L4\",\"registros\":1256,\"masas_positivas\":1256,\"masa_mediana_g\":69.65,\"masa_media_g\":1632.130566878981,\"porcentaje\":2.747457070983266},{\"class\":\"H4/5\",\"registros\":428,\"masas_positivas\":428,\"masa_mediana_g\":10.69,\"masa_media_g\":1601.557908878505,\"porcentaje\":0.936235371322323},{\"class\":\"CM2\",\"registros\":416,\"masas_positivas\":414,\"masa_mediana_g\":9.45,\"masa_media_g\":368.379615942029,\"porcentaje\":0.9099857814721645},{\"class\":\"H3\",\"registros\":387,\"masas_positivas\":387,\"masa_mediana_g\":20.51,\"masa_media_g\":794.0485891472869,\"porcentaje\":0.8465492726676146},{\"class\":\"L3\",\"registros\":365,\"masas_positivas\":365,\"masa_mediana_g\":44.3,\"masa_media_g\":1534.44678630137,\"porcentaje\":0.7984250246089905},{\"class\":\"CO3\",\"registros\":336,\"masas_positivas\":335,\"masa_mediana_g\":18.3,\"masa_media_g\":511.2393582089552,\"porcentaje\":0.7349885158044406},{\"class\":\"Ureilite\",\"registros\":300,\"masas_positivas\":300,\"masa_mediana_g\":77.75999999999999,\"masa_media_g\":490.0149,\"porcentaje\":0.6562397462539648},{\"class\":\"Iron, IIIAB\",\"registros\":285,\"masas_positivas\":284,\"masa_mediana_g\":16060.0,\"masa_media_g\":488805.946971831,\"porcentaje\":0.6234277589412666},{\"class\":\"LL4\",\"registros\":268,\"masas_positivas\":268,\"masa_mediana_g\":115.14,\"masa_media_g\":874.7136940298507,\"porcentaje\":0.5862408399868752},{\"class\":\"CV3\",\"registros\":256,\"masas_positivas\":256,\"masa_mediana_g\":72.65,\"masa_media_g\":8953.69018359375,\"porcentaje\":0.5599912501367166},{\"class\":\"Diogenite\",\"registros\":241,\"masas_positivas\":241,\"masa_mediana_g\":48.8,\"masa_media_g\":899.4614522821577,\"porcentaje\":0.5271792628240184},{\"class\":\"Howardite\",\"registros\":240,\"masas_positivas\":240,\"masa_mediana_g\":76.75,\"masa_media_g\":652.054125,\"porcentaje\":0.5249917970031718},{\"class\":\"LL\",\"registros\":225,\"masas_positivas\":225,\"masa_mediana_g\":7.66,\"masa_media_g\":103.2102222222222,\"porcentaje\":0.4921798096904736},{\"class\":\"Eucrite\",\"registros\":221,\"masas_positivas\":221,\"masa_mediana_g\":132.0,\"masa_media_g\":436.1987647058824,\"porcentaje\":0.4834299464070874},{\"class\":\"Eucrite-pmict\",\"registros\":207,\"masas_positivas\":207,\"masa_mediana_g\":140.0,\"masa_media_g\":481.8213043478261,\"porcentaje\":0.4528054249152357},{\"class\":\"E3\",\"registros\":206,\"masas_positivas\":206,\"masa_mediana_g\":0.795,\"masa_media_g\":2.387621359223301,\"porcentaje\":0.4506179590943892},{\"class\":\"H5/6\",\"registros\":193,\"masas_positivas\":193,\"masa_mediana_g\":164.0,\"masa_media_g\":837.3940414507772,\"porcentaje\":0.422180903423384},{\"class\":\"Mesosiderite\",\"registros\":137,\"masas_positivas\":136,\"masa_mediana_g\":106.35,\"masa_media_g\":4135.128588235294,\"porcentaje\":0.2996828174559772},{\"class\":\"CR2\",\"registros\":135,\"masas_positivas\":135,\"masa_mediana_g\":36.5,\"masa_media_g\":226.8968888888889,\"porcentaje\":0.2953078858142841},{\"class\":\"LL3\",\"registros\":128,\"masas_positivas\":128,\"masa_mediana_g\":68.375,\"masa_media_g\":448.2764296875,\"porcentaje\":0.2799956250683583},{\"class\":\"EH3\",\"registros\":120,\"masas_positivas\":120,\"masa_mediana_g\":50.5,\"masa_media_g\":293.8635833333333,\"porcentaje\":0.2624958985015859},{\"class\":\"Iron, IIAB\",\"registros\":118,\"masas_positivas\":117,\"masa_mediana_g\":10200.0,\"masa_media_g\":322715.8601709402,\"porcentaje\":0.2581209668598928},{\"class\":\"Iron, ungrouped\",\"registros\":113,\"masas_positivas\":113,\"masa_mediana_g\":6000.0,\"masa_media_g\":422159.3985840708,\"porcentaje\":0.2471836377556601},{\"class\":\"H~5\",\"registros\":111,\"masas_positivas\":111,\"masa_mediana_g\":61.7,\"masa_media_g\":820.3205405405406,\"porcentaje\":0.242808706113967},{\"class\":\"L5/6\",\"registros\":109,\"masas_positivas\":109,\"masa_mediana_g\":200.0,\"masa_media_g\":2302.949357798165,\"porcentaje\":0.2384337744722739},{\"class\":\"Eucrite-mmict\",\"registros\":108,\"masas_positivas\":108,\"masa_mediana_g\":165.775,\"masa_media_g\":5963.286018518519,\"porcentaje\":0.2362463086514273},{\"class\":\"Martian (shergottite)\",\"registros\":99,\"masas_positivas\":99,\"masa_mediana_g\":82.46,\"masa_media_g\":879.0285353535353,\"porcentaje\":0.2165591162638084},{\"class\":\"Iron\",\"registros\":94,\"masas_positivas\":76,\"masa_mediana_g\":436.0,\"masa_media_g\":32316.30578947369,\"porcentaje\":0.2056217871595756},{\"class\":\"CK5\",\"registros\":94,\"masas_positivas\":94,\"masa_mediana_g\":29.05,\"masa_media_g\":131.5678723404255,\"porcentaje\":0.2056217871595756},{\"class\":\"L~6\",\"registros\":94,\"masas_positivas\":94,\"masa_mediana_g\":127.5,\"masa_media_g\":555.9021276595745,\"porcentaje\":0.2056217871595756},{\"class\":\"L3.5\",\"registros\":88,\"masas_positivas\":88,\"masa_mediana_g\":24.0,\"masa_media_g\":561.3556818181819,\"porcentaje\":0.1924969922344963},{\"class\":\"H\",\"registros\":84,\"masas_positivas\":82,\"masa_mediana_g\":98.575,\"masa_media_g\":3537.492841463415,\"porcentaje\":0.1837471289511101},{\"class\":\"Iron, IAB-MG\",\"registros\":84,\"masas_positivas\":83,\"masa_mediana_g\":12880.0,\"masa_media_g\":1301547.231325301,\"porcentaje\":0.1837471289511101},{\"class\":\"Eucrite-br\",\"registros\":80,\"masas_positivas\":80,\"masa_mediana_g\":48.8,\"masa_media_g\":179.689,\"porcentaje\":0.1749972656677239},{\"class\":\"OC\",\"registros\":79,\"masas_positivas\":73,\"masa_mediana_g\":550.0,\"masa_media_g\":3133.017534246575,\"porcentaje\":0.1728097998468774},{\"class\":\"H3.8\",\"registros\":76,\"masas_positivas\":76,\"masa_mediana_g\":129.85,\"masa_media_g\":1473.991052631579,\"porcentaje\":0.1662474023843377},{\"class\":\"H3.7\",\"registros\":75,\"masas_positivas\":75,\"masa_mediana_g\":108.07,\"masa_media_g\":3635.498266666666,\"porcentaje\":0.1640599365634912},{\"class\":\"CK4\",\"registros\":75,\"masas_positivas\":75,\"masa_mediana_g\":28.77,\"masa_media_g\":1276.9618,\"porcentaje\":0.1640599365634912},{\"class\":\"EL6\",\"registros\":73,\"masas_positivas\":73,\"masa_mediana_g\":140.0,\"masa_media_g\":1967.157589041096,\"porcentaje\":0.1596850049217981},{\"class\":\"Lunar (anorth)\",\"registros\":69,\"masas_positivas\":69,\"masa_mediana_g\":36.7,\"masa_media_g\":147.8678260869565,\"porcentaje\":0.1509351416384119},{\"class\":\"Iron, IVA\",\"registros\":69,\"masas_positivas\":67,\"masa_mediana_g\":11500.0,\"masa_media_g\":463545.4791044776,\"porcentaje\":0.1509351416384119},{\"class\":\"H4-6\",\"registros\":67,\"masas_positivas\":67,\"masa_mediana_g\":127.2,\"masa_media_g\":1615.707313432836,\"porcentaje\":0.1465602099967188},{\"class\":\"L3.8\",\"registros\":66,\"masas_positivas\":66,\"masa_mediana_g\":159.09,\"masa_media_g\":828.0681818181819,\"porcentaje\":0.1443727441758723},{\"class\":\"Relict OC\",\"registros\":65,\"masas_positivas\":0,\"masa_mediana_g\":\"\",\"masa_media_g\":\"\",\"porcentaje\":0.1421852783550257},{\"class\":\"H5-6\",\"registros\":63,\"masas_positivas\":63,\"masa_mediana_g\":113.0,\"masa_media_g\":2883.487301587302,\"porcentaje\":0.1378103467133326},{\"class\":\"Aubrite\",\"registros\":63,\"masas_positivas\":63,\"masa_mediana_g\":159.9,\"masa_media_g\":67150.61333333333,\"porcentaje\":0.1378103467133326},{\"class\":\"L4/5\",\"registros\":59,\"masas_positivas\":59,\"masa_mediana_g\":312.0,\"masa_media_g\":1666.98520338983,\"porcentaje\":0.1290604834299464},{\"class\":\"Achondrite-ung\",\"registros\":57,\"masas_positivas\":57,\"masa_mediana_g\":136.0,\"masa_media_g\":895.8456140350877,\"porcentaje\":0.1246855517882533},{\"class\":\"LL-melt breccia\",\"registros\":54,\"masas_positivas\":54,\"masa_mediana_g\":7.8,\"masa_media_g\":44.50611111111111,\"porcentaje\":0.1181231543257137},{\"class\":\"Acapulcoite\",\"registros\":54,\"masas_positivas\":54,\"masa_mediana_g\":50.625,\"masa_media_g\":490.4244074074074,\"porcentaje\":0.1181231543257137},{\"class\":\"Iron, IAB complex\",\"registros\":53,\"masas_positivas\":51,\"masa_mediana_g\":2715.0,\"masa_media_g\":180809.1978431373,\"porcentaje\":0.1159356885048671},{\"class\":\"L3.4\",\"registros\":51,\"masas_positivas\":51,\"masa_mediana_g\":21.0,\"masa_media_g\":273.9950980392157,\"porcentaje\":0.111560756863174},{\"class\":\"Stone-uncl\",\"registros\":50,\"masas_positivas\":30,\"masa_mediana_g\":1778.0,\"masa_media_g\":10750.52833333333,\"porcentaje\":0.1093732910423275},{\"class\":\"L\",\"registros\":50,\"masas_positivas\":50,\"masa_mediana_g\":352.0,\"masa_media_g\":3130.59006,\"porcentaje\":0.1093732910423275},{\"class\":\"L3.7\",\"registros\":49,\"masas_positivas\":49,\"masa_mediana_g\":110.0,\"masa_media_g\":1082.17,\"porcentaje\":0.1071858252214809},{\"class\":\"L3.6\",\"registros\":48,\"masas_positivas\":48,\"masa_mediana_g\":107.975,\"masa_media_g\":1773.059583333333,\"porcentaje\":0.1049983594006344},{\"class\":\"LL5/6\",\"registros\":48,\"masas_positivas\":48,\"masa_mediana_g\":9.225000000000001,\"masa_media_g\":162.35625,\"porcentaje\":0.1049983594006344},{\"class\":\"H4-5\",\"registros\":47,\"masas_positivas\":47,\"masa_mediana_g\":301.2,\"masa_media_g\":747.896744680851,\"porcentaje\":0.1028108935797878},{\"class\":\"Iron, IAB-ung\",\"registros\":46,\"masas_positivas\":46,\"masa_mediana_g\":3740.0,\"masa_media_g\":686004.9673913043,\"porcentaje\":0.1006234277589413},{\"class\":\"H3.9\",\"registros\":43,\"masas_positivas\":43,\"masa_mediana_g\":182.0,\"masa_media_g\":836.2806976744185,\"porcentaje\":0.09406103029640162},{\"class\":\"H3-6\",\"registros\":43,\"masas_positivas\":43,\"masa_mediana_g\":65.0,\"masa_media_g\":6941.478372093024,\"porcentaje\":0.09406103029640162},{\"class\":\"H3.6\",\"registros\":42,\"masas_positivas\":42,\"masa_mediana_g\":63.715,\"masa_media_g\":7203.912714285713,\"porcentaje\":0.09187356447555507},{\"class\":\"R4\",\"registros\":42,\"masas_positivas\":42,\"masa_mediana_g\":118.75,\"masa_media_g\":226.0461904761905,\"porcentaje\":0.09187356447555507},{\"class\":\"L5-6\",\"registros\":41,\"masas_positivas\":41,\"masa_mediana_g\":435.8,\"masa_media_g\":8938.002195121951,\"porcentaje\":0.08968609865470852},{\"class\":\"Lunar\",\"registros\":41,\"masas_positivas\":41,\"masa_mediana_g\":128.8,\"masa_media_g\":536.849268292683,\"porcentaje\":0.08968609865470852},{\"class\":\"LL5-6\",\"registros\":40,\"masas_positivas\":40,\"masa_mediana_g\":370.5,\"masa_media_g\":917.4825000000001,\"porcentaje\":0.08749863283386197},{\"class\":\"Lodranite\",\"registros\":40,\"masas_positivas\":40,\"masa_mediana_g\":56.275,\"masa_media_g\":268.9335,\"porcentaje\":0.08749863283386197},{\"class\":\"H3-5\",\"registros\":39,\"masas_positivas\":39,\"masa_mediana_g\":210.0,\"masa_media_g\":1565.574102564103,\"porcentaje\":0.08531116701301542},{\"class\":\"Pallasite, PMG\",\"registros\":38,\"masas_positivas\":38,\"masa_mediana_g\":10100.0,\"masa_media_g\":147304.7368421053,\"porcentaje\":0.08312370119216887},{\"class\":\"Pallasite\",\"registros\":35,\"masas_positivas\":35,\"masa_mediana_g\":3000.0,\"masa_media_g\":6319.56,\"porcentaje\":0.07656130372962923},{\"class\":\"H3/4\",\"registros\":35,\"masas_positivas\":35,\"masa_mediana_g\":25.091,\"masa_media_g\":514.5274571428571,\"porcentaje\":0.07656130372962923},{\"class\":\"LL4-6\",\"registros\":34,\"masas_positivas\":34,\"masa_mediana_g\":158.5,\"masa_media_g\":927.0535294117647,\"porcentaje\":0.07437383790878267},{\"class\":\"L4-6\",\"registros\":33,\"masas_positivas\":33,\"masa_mediana_g\":299.0,\"masa_media_g\":70540.4712121212,\"porcentaje\":0.07218637208793613},{\"class\":\"Brachinite\",\"registros\":33,\"masas_positivas\":33,\"masa_mediana_g\":196.0,\"masa_media_g\":565.0403030303031,\"porcentaje\":0.07218637208793613},{\"class\":\"L~5\",\"registros\":32,\"masas_positivas\":32,\"masa_mediana_g\":98.775,\"masa_media_g\":805.2615625,\"porcentaje\":0.06999890626708957},{\"class\":\"Eucrite-unbr\",\"registros\":32,\"masas_positivas\":32,\"masa_mediana_g\":23.385,\"masa_media_g\":89.05875,\"porcentaje\":0.06999890626708957},{\"class\":\"L3-6\",\"registros\":32,\"masas_positivas\":32,\"masa_mediana_g\":213.5,\"masa_media_g\":3800.45625,\"porcentaje\":0.06999890626708957},{\"class\":\"LL3.8\",\"registros\":28,\"masas_positivas\":28,\"masa_mediana_g\":140.6,\"masa_media_g\":603.8921428571429,\"porcentaje\":0.06124904298370338},{\"class\":\"Iron, IAB-sLL\",\"registros\":28,\"masas_positivas\":27,\"masa_mediana_g\":3300.0,\"masa_media_g\":164194.6407407407,\"porcentaje\":0.06124904298370338},{\"class\":\"Lunar (feldsp. breccia)\",\"registros\":27,\"masas_positivas\":27,\"masa_mediana_g\":113.0,\"masa_media_g\":500.5888888888889,\"porcentaje\":0.05906157716285683},{\"class\":\"L3.9\",\"registros\":27,\"masas_positivas\":27,\"masa_mediana_g\":92.0,\"masa_media_g\":1513.546666666667,\"porcentaje\":0.05906157716285683},{\"class\":\"Eucrite-cm\",\"registros\":26,\"masas_positivas\":26,\"masa_mediana_g\":212.905,\"masa_media_g\":2063.807692307692,\"porcentaje\":0.05687411134201028},{\"class\":\"L/LL6\",\"registros\":26,\"masas_positivas\":26,\"masa_mediana_g\":540.5,\"masa_media_g\":12365.51076923077,\"porcentaje\":0.05687411134201028},{\"class\":\"L/LL3\",\"registros\":26,\"masas_positivas\":26,\"masa_mediana_g\":41.77,\"masa_media_g\":357.93,\"porcentaje\":0.05687411134201028},{\"class\":\"LL3.7\",\"registros\":26,\"masas_positivas\":26,\"masa_mediana_g\":251.0,\"masa_media_g\":3452.726538461538,\"porcentaje\":0.05687411134201028},{\"class\":\"Winonaite\",\"registros\":25,\"masas_positivas\":25,\"masa_mediana_g\":52.0,\"masa_media_g\":1129.0132,\"porcentaje\":0.05468664552116373},{\"class\":\"L-imp melt\",\"registros\":25,\"masas_positivas\":25,\"masa_mediana_g\":68.3,\"masa_media_g\":948.5056,\"porcentaje\":0.05468664552116373},{\"class\":\"L4-5\",\"registros\":24,\"masas_positivas\":24,\"masa_mediana_g\":464.0,\"masa_media_g\":9275.753333333332,\"porcentaje\":0.05249917970031718},{\"class\":\"Ureilite-pmict\",\"registros\":23,\"masas_positivas\":23,\"masa_mediana_g\":57.0,\"masa_media_g\":262.6856521739131,\"porcentaje\":0.05031171387947064},{\"class\":\"H~6\",\"registros\":22,\"masas_positivas\":22,\"masa_mediana_g\":104.515,\"masa_media_g\":791.4463636363636,\"porcentaje\":0.04812424805862409},{\"class\":\"LL7\",\"registros\":22,\"masas_positivas\":22,\"masa_mediana_g\":66.25999999999999,\"masa_media_g\":200.2345454545454,\"porcentaje\":0.04812424805862409},{\"class\":\"CH3\",\"registros\":22,\"masas_positivas\":22,\"masa_mediana_g\":48.005,\"masa_media_g\":216.925,\"porcentaje\":0.04812424805862409},{\"class\":\"L-melt rock\",\"registros\":21,\"masas_positivas\":21,\"masa_mediana_g\":95.0,\"masa_media_g\":2268.984761904762,\"porcentaje\":0.04593678223777754},{\"class\":\"L7\",\"registros\":21,\"masas_positivas\":21,\"masa_mediana_g\":5.7,\"masa_media_g\":661.4038095238096,\"porcentaje\":0.04593678223777754},{\"class\":\"Angrite\",\"registros\":21,\"masas_positivas\":21,\"masa_mediana_g\":392.0,\"masa_media_g\":1382.37,\"porcentaje\":0.04593678223777754},{\"class\":\"LL3.4\",\"registros\":20,\"masas_positivas\":20,\"masa_mediana_g\":49.1,\"masa_media_g\":1283.823,\"porcentaje\":0.04374931641693099},{\"class\":\"L/LL4\",\"registros\":20,\"masas_positivas\":20,\"masa_mediana_g\":408.0,\"masa_media_g\":22547.43335,\"porcentaje\":0.04374931641693099},{\"class\":\"R5\",\"registros\":20,\"masas_positivas\":20,\"masa_mediana_g\":84.4,\"masa_media_g\":1359.824,\"porcentaje\":0.04374931641693099},{\"class\":\"Iron, IID\",\"registros\":19,\"masas_positivas\":19,\"masa_mediana_g\":13600.0,\"masa_media_g\":67423.61578947368,\"porcentaje\":0.04156185059608444},{\"class\":\"CM1\",\"registros\":19,\"masas_positivas\":19,\"masa_mediana_g\":2.5,\"masa_media_g\":45.68578947368421,\"porcentaje\":0.04156185059608444},{\"class\":\"EL3\",\"registros\":19,\"masas_positivas\":19,\"masa_mediana_g\":20.6,\"masa_media_g\":135.7494736842105,\"porcentaje\":0.04156185059608444},{\"class\":\"EH4\",\"registros\":18,\"masas_positivas\":18,\"masa_mediana_g\":23.575,\"masa_media_g\":7701.782222222221,\"porcentaje\":0.03937438477523789},{\"class\":\"CM1/2\",\"registros\":18,\"masas_positivas\":18,\"masa_mediana_g\":2.3,\"masa_media_g\":175.7994444444444,\"porcentaje\":0.03937438477523789},{\"class\":\"H3.5\",\"registros\":18,\"masas_positivas\":18,\"masa_mediana_g\":76.57499999999999,\"masa_media_g\":838.1905555555555,\"porcentaje\":0.03937438477523789},{\"class\":\"H~4\",\"registros\":18,\"masas_positivas\":18,\"masa_mediana_g\":281.25,\"masa_media_g\":592.6888888888889,\"porcentaje\":0.03937438477523789},{\"class\":\"LL3.5\",\"registros\":17,\"masas_positivas\":17,\"masa_mediana_g\":56.02,\"masa_media_g\":390.4858823529412,\"porcentaje\":0.03718691895439134},{\"class\":\"CK6\",\"registros\":17,\"masas_positivas\":17,\"masa_mediana_g\":31.0,\"masa_media_g\":103.3223529411765,\"porcentaje\":0.03718691895439134},{\"class\":\"LL3.6\",\"registros\":17,\"masas_positivas\":17,\"masa_mediana_g\":136.44,\"masa_media_g\":4852.049411764706,\"porcentaje\":0.03718691895439134},{\"class\":\"Iron, IAB-sHL\",\"registros\":17,\"masas_positivas\":17,\"masa_mediana_g\":1250.0,\"masa_media_g\":9438.261176470589,\"porcentaje\":0.03718691895439134},{\"class\":\"L3.3\",\"registros\":17,\"masas_positivas\":17,\"masa_mediana_g\":40.0,\"masa_media_g\":442.1258823529412,\"porcentaje\":0.03718691895439134},{\"class\":\"Lunar (basalt)\",\"registros\":16,\"masas_positivas\":16,\"masa_mediana_g\":118.6,\"masa_media_g\":1027.10875,\"porcentaje\":0.03499945313354479},{\"class\":\"LL3.9\",\"registros\":16,\"masas_positivas\":16,\"masa_mediana_g\":185.0,\"masa_media_g\":1586.9525,\"porcentaje\":0.03499945313354479},{\"class\":\"L/LL5\",\"registros\":16,\"masas_positivas\":16,\"masa_mediana_g\":341.7,\"masa_media_g\":39847.48125,\"porcentaje\":0.03499945313354479},{\"class\":\"H3.4\",\"registros\":16,\"masas_positivas\":16,\"masa_mediana_g\":177.2935,\"masa_media_g\":652.2410625,\"porcentaje\":0.03499945313354479},{\"class\":\"L3.2\",\"registros\":15,\"masas_positivas\":15,\"masa_mediana_g\":59.4,\"masa_media_g\":1153.791333333333,\"porcentaje\":0.03281198731269824},{\"class\":\"LL3.3\",\"registros\":15,\"masas_positivas\":15,\"masa_mediana_g\":230.0,\"masa_media_g\":645.5566666666667,\"porcentaje\":0.03281198731269824},{\"class\":\"Chondrite-ung\",\"registros\":15,\"masas_positivas\":15,\"masa_mediana_g\":143.03,\"masa_media_g\":997.562,\"porcentaje\":0.03281198731269824},{\"class\":\"R3\",\"registros\":15,\"masas_positivas\":15,\"masa_mediana_g\":35.0,\"masa_media_g\":87.74066666666667,\"porcentaje\":0.03281198731269824},{\"class\":\"Iron, IIE\",\"registros\":14,\"masas_positivas\":14,\"masa_mediana_g\":1655.0,\"masa_media_g\":42413.0,\"porcentaje\":0.03062452149185169},{\"class\":\"Iron, IIIE\",\"registros\":14,\"masas_positivas\":14,\"masa_mediana_g\":47250.0,\"masa_media_g\":2076114.428571429,\"porcentaje\":0.03062452149185169},{\"class\":\"LL3.2\",\"registros\":14,\"masas_positivas\":14,\"masa_mediana_g\":344.5,\"masa_media_g\":4478.73,\"porcentaje\":0.03062452149185169},{\"class\":\"C2-ung\",\"registros\":14,\"masas_positivas\":14,\"masa_mediana_g\":253.93,\"masa_media_g\":1129.101428571429,\"porcentaje\":0.03062452149185169},{\"class\":\"Martian (nakhlite)\",\"registros\":14,\"masas_positivas\":14,\"masa_mediana_g\":454.3,\"masa_media_g\":2058.714285714286,\"porcentaje\":0.03062452149185169},{\"class\":\"Iron, IVB\",\"registros\":14,\"masas_positivas\":14,\"masa_mediana_g\":33110.0,\"masa_media_g\":4322832.857142857,\"porcentaje\":0.03062452149185169},{\"class\":\"L-melt breccia\",\"registros\":14,\"masas_positivas\":14,\"masa_mediana_g\":60.485,\"masa_media_g\":237.87,\"porcentaje\":0.03062452149185169},{\"class\":\"EL4\",\"registros\":13,\"masas_positivas\":13,\"masa_mediana_g\":22.4,\"masa_media_g\":234.9761538461539,\"porcentaje\":0.02843705567100514},{\"class\":\"L3.1\",\"registros\":13,\"masas_positivas\":13,\"masa_mediana_g\":269.8,\"masa_media_g\":876.1438461538462,\"porcentaje\":0.02843705567100514},{\"class\":\"CK3\",\"registros\":13,\"masas_positivas\":13,\"masa_mediana_g\":91.94,\"masa_media_g\":214.6569230769231,\"porcentaje\":0.02843705567100514},{\"class\":\"L3-5\",\"registros\":13,\"masas_positivas\":13,\"masa_mediana_g\":346.0,\"masa_media_g\":945.6923076923077,\"porcentaje\":0.02843705567100514},{\"class\":\"H/L4\",\"registros\":13,\"masas_positivas\":13,\"masa_mediana_g\":87.0,\"masa_media_g\":1456.988461538461,\"porcentaje\":0.02843705567100514},{\"class\":\"CK4/5\",\"registros\":12,\"masas_positivas\":12,\"masa_mediana_g\":120.45,\"masa_media_g\":241.5658333333333,\"porcentaje\":0.02624958985015859},{\"class\":\"H7\",\"registros\":12,\"masas_positivas\":12,\"masa_mediana_g\":75.815,\"masa_media_g\":228.4666666666667,\"porcentaje\":0.02624958985015859},{\"class\":\"L3/4\",\"registros\":12,\"masas_positivas\":12,\"masa_mediana_g\":88.0,\"masa_media_g\":156.0591666666667,\"porcentaje\":0.02624958985015859},{\"class\":\"CO3.5\",\"registros\":12,\"masas_positivas\":12,\"masa_mediana_g\":375.0,\"masa_media_g\":4799.423333333333,\"porcentaje\":0.02624958985015859},{\"class\":\"C3-ung\",\"registros\":12,\"masas_positivas\":12,\"masa_mediana_g\":192.4,\"masa_media_g\":617.5666666666667,\"porcentaje\":0.02624958985015859},{\"class\":\"H-imp melt\",\"registros\":11,\"masas_positivas\":11,\"masa_mediana_g\":3.2,\"masa_media_g\":11.86,\"porcentaje\":0.02406212402931204},{\"class\":\"Diogenite-pm\",\"registros\":11,\"masas_positivas\":11,\"masa_mediana_g\":117.8,\"masa_media_g\":2209.545454545455,\"porcentaje\":0.02406212402931204},{\"class\":\"H/L6\",\"registros\":11,\"masas_positivas\":11,\"masa_mediana_g\":88.1,\"masa_media_g\":86.2209090909091,\"porcentaje\":0.02406212402931204},{\"class\":\"Pallasite, PMG-an\",\"registros\":11,\"masas_positivas\":11,\"masa_mediana_g\":17000.0,\"masa_media_g\":685358.9090909091,\"porcentaje\":0.02406212402931204},{\"class\":\"L6-melt breccia\",\"registros\":10,\"masas_positivas\":10,\"masa_mediana_g\":388.7,\"masa_media_g\":844.3399999999999,\"porcentaje\":0.02187465820846549},{\"class\":\"R3-6\",\"registros\":10,\"masas_positivas\":10,\"masa_mediana_g\":85.0,\"masa_media_g\":204.45,\"porcentaje\":0.02187465820846549},{\"class\":\"L~4\",\"registros\":10,\"masas_positivas\":10,\"masa_mediana_g\":132.15,\"masa_media_g\":376.18,\"porcentaje\":0.02187465820846549},{\"class\":\"Iron, IC\",\"registros\":10,\"masas_positivas\":10,\"masa_mediana_g\":396850.0,\"masa_media_g\":892556.3,\"porcentaje\":0.02187465820846549},{\"class\":\"Iron, IAB-sLM\",\"registros\":10,\"masas_positivas\":10,\"masa_mediana_g\":10100.0,\"masa_media_g\":19816.1,\"porcentaje\":0.02187465820846549},{\"class\":\"H4-an\",\"registros\":10,\"masas_positivas\":10,\"masa_mediana_g\":207.805,\"masa_media_g\":312.901,\"porcentaje\":0.02187465820846549},{\"class\":\"H3-4\",\"registros\":10,\"masas_positivas\":10,\"masa_mediana_g\":345.5,\"masa_media_g\":9010.016,\"porcentaje\":0.02187465820846549},{\"class\":\"LL4-5\",\"registros\":10,\"masas_positivas\":10,\"masa_mediana_g\":119.0,\"masa_media_g\":199.65,\"porcentaje\":0.02187465820846549},{\"class\":\"CI1\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":12.206,\"masa_media_g\":2390.192888888889,\"porcentaje\":0.01968719238761894},{\"class\":\"LL~5\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":17.4,\"masa_media_g\":60.53222222222222,\"porcentaje\":0.01968719238761894},{\"class\":\"LL3-6\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":450.0,\"masa_media_g\":2142.635555555556,\"porcentaje\":0.01968719238761894},{\"class\":\"L3.8-6\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":64.8,\"masa_media_g\":340.3333333333333,\"porcentaje\":0.01968719238761894},{\"class\":\"Iron, IAB-sLH\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":268.0,\"masa_media_g\":7382.566666666668,\"porcentaje\":0.01968719238761894},{\"class\":\"EH4/5\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":26.0,\"masa_media_g\":39.28888888888889,\"porcentaje\":0.01968719238761894},{\"class\":\"R6\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":30.59,\"masa_media_g\":61.89111111111111,\"porcentaje\":0.01968719238761894},{\"class\":\"R3.8\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":134.0,\"masa_media_g\":301.3466666666666,\"porcentaje\":0.01968719238761894},{\"class\":\"L6/7\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":77.68,\"masa_media_g\":5855.368888888889,\"porcentaje\":0.01968719238761894},{\"class\":\"Achondrite-prim\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":678.0,\"masa_media_g\":1078.0,\"porcentaje\":0.01968719238761894},{\"class\":\"Iron, IIIF\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":17000.0,\"masa_media_g\":55777.26666666667,\"porcentaje\":0.01968719238761894},{\"class\":\"E6\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":65.0,\"masa_media_g\":345.2577777777778,\"porcentaje\":0.01968719238761894},{\"class\":\"Diogenite-olivine\",\"registros\":9,\"masas_positivas\":9,\"masa_mediana_g\":500.0,\"masa_media_g\":747.5777777777778,\"porcentaje\":0.01968719238761894},{\"class\":\"CB\",\"registros\":8,\"masas_positivas\":8,\"masa_mediana_g\":2.25,\"masa_media_g\":97.425,\"porcentaje\":0.01749972656677239},{\"class\":\"CO3.2\",\"registros\":8,\"masas_positivas\":8,\"masa_mediana_g\":513.5,\"masa_media_g\":25598.88875,\"porcentaje\":0.01749972656677239},{\"class\":\"CR\",\"registros\":8,\"masas_positivas\":8,\"masa_mediana_g\":135.0,\"masa_media_g\":271.8225,\"porcentaje\":0.01749972656677239},{\"class\":\"Iron, IIC\",\"registros\":8,\"masas_positivas\":8,\"masa_mediana_g\":14350.0,\"masa_media_g\":26483.375,\"porcentaje\":0.01749972656677239},{\"class\":\"C\",\"registros\":8,\"masas_positivas\":8,\"masa_mediana_g\":33.33,\"masa_media_g\":156.4475,\"porcentaje\":0.01749972656677239},{\"class\":\"H-melt rock\",\"registros\":8,\"masas_positivas\":8,\"masa_mediana_g\":18.05,\"masa_media_g\":121.8375,\"porcentaje\":0.01749972656677239},{\"class\":\"OC3\",\"registros\":8,\"masas_positivas\":8,\"masa_mediana_g\":67.95,\"masa_media_g\":940.7625,\"porcentaje\":0.01749972656677239},{\"class\":\"Mesosiderite-C\",\"registros\":7,\"masas_positivas\":7,\"masa_mediana_g\":1624.0,\"masa_media_g\":34843.85714285714,\"porcentaje\":0.01531226074592584},{\"class\":\"CO3.6\",\"registros\":7,\"masas_positivas\":6,\"masa_mediana_g\":529.3,\"masa_media_g\":1010.118333333333,\"porcentaje\":0.01531226074592584},{\"class\":\"H/L5\",\"registros\":7,\"masas_positivas\":7,\"masa_mediana_g\":217.44,\"masa_media_g\":289.5757142857143,\"porcentaje\":0.01531226074592584},{\"class\":\"H3.3\",\"registros\":7,\"masas_positivas\":7,\"masa_mediana_g\":33.8,\"masa_media_g\":414.2142857142857,\"porcentaje\":0.01531226074592584},{\"class\":\"Unknown\",\"registros\":7,\"masas_positivas\":0,\"masa_mediana_g\":\"\",\"masa_media_g\":\"\",\"porcentaje\":0.01531226074592584},{\"class\":\"CO3.3\",\"registros\":7,\"masas_positivas\":7,\"masa_mediana_g\":484.0,\"masa_media_g\":4314.801428571429,\"porcentaje\":0.01531226074592584},{\"class\":\"E\",\"registros\":7,\"masas_positivas\":7,\"masa_mediana_g\":124.0,\"masa_media_g\":57210.88428571429,\"porcentaje\":0.01531226074592584},{\"class\":\"Iron, IIE-an\",\"registros\":7,\"masas_positivas\":7,\"masa_mediana_g\":8940.0,\"masa_media_g\":53137.04571428571,\"porcentaje\":0.01531226074592584},{\"class\":\"LL-melt rock\",\"registros\":7,\"masas_positivas\":7,\"masa_mediana_g\":189.0,\"masa_media_g\":537.2571428571429,\"porcentaje\":0.01531226074592584},{\"class\":\"LL(L)3\",\"registros\":7,\"masas_positivas\":7,\"masa_mediana_g\":224.0,\"masa_media_g\":995.2714285714285,\"porcentaje\":0.01531226074592584},{\"class\":\"LL3.1\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":632.0,\"masa_media_g\":1405.865,\"porcentaje\":0.01312479492507929},{\"class\":\"Iron, IIG\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":24044.5,\"masa_media_g\":24303.16666666667,\"porcentaje\":0.01312479492507929},{\"class\":\"Iron, IVA-an\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":56650.0,\"masa_media_g\":73986.66666666667,\"porcentaje\":0.01312479492507929},{\"class\":\"Acapulcoite/Lodranite\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":29.8,\"masa_media_g\":31.79333333333333,\"porcentaje\":0.01312479492507929},{\"class\":\"Iron, IIF\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":9170.0,\"masa_media_g\":11156.0,\"porcentaje\":0.01312479492507929},{\"class\":\"CK5/6\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":98.05,\"masa_media_g\":145.7333333333333,\"porcentaje\":0.01312479492507929},{\"class\":\"H/L3\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":105.75,\"masa_media_g\":150.5333333333333,\"porcentaje\":0.01312479492507929},{\"class\":\"Lunar (gabbro)\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":162.0,\"masa_media_g\":413.5316666666667,\"porcentaje\":0.01312479492507929},{\"class\":\"Mesosiderite-an\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":15.4,\"masa_media_g\":2008.816666666667,\"porcentaje\":0.01312479492507929},{\"class\":\"E3-an\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":4.3,\"masa_media_g\":25.66666666666667,\"porcentaje\":0.01312479492507929},{\"class\":\"EH-imp melt\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":53.185,\"masa_media_g\":82.70333333333333,\"porcentaje\":0.01312479492507929},{\"class\":\"EH5\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":58.315,\"masa_media_g\":4654.038333333333,\"porcentaje\":0.01312479492507929},{\"class\":\"CO3.1\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":200.5,\"masa_media_g\":303.3166666666667,\"porcentaje\":0.01312479492507929},{\"class\":\"Mesosiderite-A1\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":42925.0,\"masa_media_g\":698206.3333333334,\"porcentaje\":0.01312479492507929},{\"class\":\"R3-5\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":621.0,\"masa_media_g\":604.2166666666667,\"porcentaje\":0.01312479492507929},{\"class\":\"H4/6\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":1253.15,\"masa_media_g\":1493.016666666667,\"porcentaje\":0.01312479492507929},{\"class\":\"EL5\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":166.95,\"masa_media_g\":593.9833333333333,\"porcentaje\":0.01312479492507929},{\"class\":\"H-metal\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":2.19,\"masa_media_g\":10.67,\"porcentaje\":0.01312479492507929},{\"class\":\"Aubrite-an\",\"registros\":6,\"masas_positivas\":6,\"masa_mediana_g\":71.01,\"masa_media_g\":8390.77,\"porcentaje\":0.01312479492507929},{\"class\":\"L(LL)3\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":56.6,\"masa_media_g\":55.86,\"porcentaje\":0.01093732910423275},{\"class\":\"L-metal\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":1.3,\"masa_media_g\":1.0254,\"porcentaje\":0.01093732910423275},{\"class\":\"Mesosiderite-B2\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":115.7,\"masa_media_g\":11857.342,\"porcentaje\":0.01093732910423275},{\"class\":\"Pallasite, ungrouped\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":54.86,\"masa_media_g\":7310.786,\"porcentaje\":0.01093732910423275},{\"class\":\"LL4/5\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":216.0,\"masa_media_g\":873.78,\"porcentaje\":0.01093732910423275},{\"class\":\"H3.9/4\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":252.0,\"masa_media_g\":5587.546,\"porcentaje\":0.01093732910423275},{\"class\":\"LL~6\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":42.03,\"masa_media_g\":413.222,\"porcentaje\":0.01093732910423275},{\"class\":\"E-an\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":19.9,\"masa_media_g\":18.86,\"porcentaje\":0.01093732910423275},{\"class\":\"CO3.4\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":79.47,\"masa_media_g\":1415.594,\"porcentaje\":0.01093732910423275},{\"class\":\"CBa\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":2000.0,\"masa_media_g\":44043.2,\"porcentaje\":0.01093732910423275},{\"class\":\"L/LL5/6\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":236.0,\"masa_media_g\":350.8,\"porcentaje\":0.01093732910423275},{\"class\":\"E5\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":0.38,\"masa_media_g\":1.098,\"porcentaje\":0.01093732910423275},{\"class\":\"CBb\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":30.5,\"masa_media_g\":653.5600000000001,\"porcentaje\":0.01093732910423275},{\"class\":\"EH6\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":36.923,\"masa_media_g\":92.94659999999999,\"porcentaje\":0.01093732910423275},{\"class\":\"Iron, IAB-sHH\",\"registros\":5,\"masas_positivas\":5,\"masa_mediana_g\":490.0,\"masa_media_g\":3862.2,\"porcentaje\":0.01093732910423275},{\"class\":\"R3.9\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":108.0,\"masa_media_g\":3055.7475,\"porcentaje\":0.008749863283386197},{\"class\":\"Ureilite-an\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":597.6999999999999,\"masa_media_g\":1287.125,\"porcentaje\":0.008749863283386197},{\"class\":\"Pallasite, PES\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":18175.0,\"masa_media_g\":42167.5,\"porcentaje\":0.008749863283386197},{\"class\":\"LL3.0\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":21.72,\"masa_media_g\":75.5575,\"porcentaje\":0.008749863283386197},{\"class\":\"L/LL3.4\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":2334.5,\"masa_media_g\":2994.5275,\"porcentaje\":0.008749863283386197},{\"class\":\"R3.8-6\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":142.6,\"masa_media_g\":266.55,\"porcentaje\":0.008749863283386197},{\"class\":\"Eucrite-Mg rich\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":132.3,\"masa_media_g\":207.925,\"porcentaje\":0.008749863283386197},{\"class\":\"L3-4\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":209.5,\"masa_media_g\":284.75,\"porcentaje\":0.008749863283386197},{\"class\":\"H-an\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":13.645,\"masa_media_g\":24.455,\"porcentaje\":0.008749863283386197},{\"class\":\"CO3.0\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":253.67,\"masa_media_g\":1150.16,\"porcentaje\":0.008749863283386197},{\"class\":\"Fusion crust\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":0.1,\"masa_media_g\":0.07825,\"porcentaje\":0.008749863283386197},{\"class\":\"H-melt breccia\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":45.5,\"masa_media_g\":47.0925,\"porcentaje\":0.008749863283386197},{\"class\":\"E4\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":32.925,\"masa_media_g\":42.6875,\"porcentaje\":0.008749863283386197},{\"class\":\"Iron, IAB?\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":1750.0,\"masa_media_g\":1582.75,\"porcentaje\":0.008749863283386197},{\"class\":\"Mesosiderite-B1\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":588.3,\"masa_media_g\":1324.375,\"porcentaje\":0.008749863283386197},{\"class\":\"H3.9-6\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":136.53,\"masa_media_g\":171.0475,\"porcentaje\":0.008749863283386197},{\"class\":\"Mesosiderite-B\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":428.5,\"masa_media_g\":2257.75,\"porcentaje\":0.008749863283386197},{\"class\":\"CV3-an\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":146.55,\"masa_media_g\":825.8,\"porcentaje\":0.008749863283386197},{\"class\":\"LL6/7\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":390.0,\"masa_media_g\":533.75,\"porcentaje\":0.008749863283386197},{\"class\":\"Chondrite-fusion crust\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":0.565,\"masa_media_g\":0.71,\"porcentaje\":0.008749863283386197},{\"class\":\"Iron, IIIAB?\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":9366.0,\"masa_media_g\":7795.5,\"porcentaje\":0.008749863283386197},{\"class\":\"CM\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":33.16,\"masa_media_g\":359.89,\"porcentaje\":0.008749863283386197},{\"class\":\"H5-melt breccia\",\"registros\":4,\"masas_positivas\":4,\"masa_mediana_g\":397.0,\"masa_media_g\":509.75,\"porcentaje\":0.008749863283386197},{\"class\":\"R3.6\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":308.5,\"masa_media_g\":690.4666666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"L5-melt breccia\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":126.0,\"masa_media_g\":2198.666666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"Acapulcoite/lodranite\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":3.5,\"masa_media_g\":44.93333333333334,\"porcentaje\":0.006562397462539647},{\"class\":\"Enst achon-ung\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":685.0,\"masa_media_g\":3147.666666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"Enst achon\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":132.8,\"masa_media_g\":219.6333333333333,\"porcentaje\":0.006562397462539647},{\"class\":\"Iron, IAB-an\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":1387.0,\"masa_media_g\":2154.333333333333,\"porcentaje\":0.006562397462539647},{\"class\":\"L/LL~6\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":131.2,\"masa_media_g\":700.9,\"porcentaje\":0.006562397462539647},{\"class\":\"LL~3\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":15.1,\"masa_media_g\":19.86666666666666,\"porcentaje\":0.006562397462539647},{\"class\":\"Mesosiderite-B4\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":100000.0,\"masa_media_g\":359333.3333333333,\"porcentaje\":0.006562397462539647},{\"class\":\"CK\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":68.0,\"masa_media_g\":120.7333333333333,\"porcentaje\":0.006562397462539647},{\"class\":\"CK4-an\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":3388.0,\"masa_media_g\":2932.666666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"H6-melt breccia\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":176.0,\"masa_media_g\":332.4266666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"CK3-an\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":353.0,\"masa_media_g\":540.6,\"porcentaje\":0.006562397462539647},{\"class\":\"H~4/5\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":221.3,\"masa_media_g\":256.4333333333333,\"porcentaje\":0.006562397462539647},{\"class\":\"C4-ung\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":569.0,\"masa_media_g\":1749.333333333333,\"porcentaje\":0.006562397462539647},{\"class\":\"H3.0\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":161.56,\"masa_media_g\":182.85,\"porcentaje\":0.006562397462539647},{\"class\":\"CO3.8\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":596.0,\"masa_media_g\":7901.666666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"Mesosiderite-A2\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":7000.0,\"masa_media_g\":4949.0,\"porcentaje\":0.006562397462539647},{\"class\":\"Iron, IIIAB-an\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":63000.0,\"masa_media_g\":240233.3333333333,\"porcentaje\":0.006562397462539647},{\"class\":\"Eucrite-an\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":631.0,\"masa_media_g\":6463.0,\"porcentaje\":0.006562397462539647},{\"class\":\"H3.2-an\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":233.4,\"masa_media_g\":524.4333333333334,\"porcentaje\":0.006562397462539647},{\"class\":\"Mesosiderite-A3\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":16700.0,\"masa_media_g\":30666.66666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"LL3.10\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":487.0,\"masa_media_g\":552.0666666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"Mesosiderite-A4\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":16500.0,\"masa_media_g\":19166.66666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"R\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":44.9,\"masa_media_g\":66.35333333333334,\"porcentaje\":0.006562397462539647},{\"class\":\"LL3.15\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":101.64,\"masa_media_g\":387.1033333333333,\"porcentaje\":0.006562397462539647},{\"class\":\"LL3.8-6\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":517.0,\"masa_media_g\":916.6666666666666,\"porcentaje\":0.006562397462539647},{\"class\":\"L/LL3-5\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":125.0,\"masa_media_g\":413.7666666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"Diogenite-an\",\"registros\":3,\"masas_positivas\":3,\"masa_mediana_g\":250.6,\"masa_media_g\":261.8666666666667,\"porcentaje\":0.006562397462539647},{\"class\":\"Mesosiderite-C2\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":25613.0,\"masa_media_g\":25613.0,\"porcentaje\":0.004374931641693098},{\"class\":\"L3.8-5\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":345.55,\"masa_media_g\":345.55,\"porcentaje\":0.004374931641693098},{\"class\":\"LL6-melt breccia\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":126.0,\"masa_media_g\":126.0,\"porcentaje\":0.004374931641693098},{\"class\":\"R3/4\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":80.65,\"masa_media_g\":80.65,\"porcentaje\":0.004374931641693098},{\"class\":\"C4\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":28.97,\"masa_media_g\":28.97,\"porcentaje\":0.004374931641693098},{\"class\":\"L3.9-6\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":186.0,\"masa_media_g\":186.0,\"porcentaje\":0.004374931641693098},{\"class\":\"LL3-5\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":113.565,\"masa_media_g\":113.565,\"porcentaje\":0.004374931641693098},{\"class\":\"Mesosiderite-A\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":6234.75,\"masa_media_g\":6234.75,\"porcentaje\":0.004374931641693098},{\"class\":\"Martian (chassignite)\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":2305.5,\"masa_media_g\":2305.5,\"porcentaje\":0.004374931641693098},{\"class\":\"C6\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":83.19999999999999,\"masa_media_g\":83.19999999999999,\"porcentaje\":0.004374931641693098},{\"class\":\"Martian (basaltic breccia)\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":200.0,\"masa_media_g\":200.0,\"porcentaje\":0.004374931641693098},{\"class\":\"LL-imp melt\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":92.64999999999999,\"masa_media_g\":92.64999999999999,\"porcentaje\":0.004374931641693098},{\"class\":\"Lunar (bas/anor)\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":5.585,\"masa_media_g\":5.585,\"porcentaje\":0.004374931641693098},{\"class\":\"Lunar (bas. breccia)\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":79.0,\"masa_media_g\":79.0,\"porcentaje\":0.004374931641693098},{\"class\":\"R3.7\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":236.0,\"masa_media_g\":236.0,\"porcentaje\":0.004374931641693098},{\"class\":\"CR1\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":57.55,\"masa_media_g\":57.55,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.10\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":330.0,\"masa_media_g\":330.0,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.8-an\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":2135.5,\"masa_media_g\":2135.5,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.6-6\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":623.4,\"masa_media_g\":623.4,\"porcentaje\":0.004374931641693098},{\"class\":\"H(L)3\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":791.05,\"masa_media_g\":791.05,\"porcentaje\":0.004374931641693098},{\"class\":\"K3\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":180.5,\"masa_media_g\":180.5,\"porcentaje\":0.004374931641693098},{\"class\":\"Iron, IID-an\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":11790.0,\"masa_media_g\":11790.0,\"porcentaje\":0.004374931641693098},{\"class\":\"H(5?)\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":159.9,\"masa_media_g\":159.9,\"porcentaje\":0.004374931641693098},{\"class\":\"L(?)3\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":10.235,\"masa_media_g\":10.235,\"porcentaje\":0.004374931641693098},{\"class\":\"L/LL~5\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":315.35,\"masa_media_g\":315.35,\"porcentaje\":0.004374931641693098},{\"class\":\"L/LL3.2\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":1608.2,\"masa_media_g\":1608.2,\"porcentaje\":0.004374931641693098},{\"class\":\"Iron, IC-an\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":35000.0,\"masa_media_g\":35000.0,\"porcentaje\":0.004374931641693098},{\"class\":\"EL6/7\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":58150.0,\"masa_media_g\":58150.0,\"porcentaje\":0.004374931641693098},{\"class\":\"L3.0\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":96.50500000000001,\"masa_media_g\":96.50500000000001,\"porcentaje\":0.004374931641693098},{\"class\":\"L(LL)3.05\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":491.55,\"masa_media_g\":491.55,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.8-6\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":890.345,\"masa_media_g\":890.345,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.7-5\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":2048.3705,\"masa_media_g\":2048.3705,\"porcentaje\":0.004374931641693098},{\"class\":\"EL-melt rock\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":8.3,\"masa_media_g\":8.3,\"porcentaje\":0.004374931641693098},{\"class\":\"Iron?\",\"registros\":2,\"masas_positivas\":1,\"masa_mediana_g\":2250.0,\"masa_media_g\":2250.0,\"porcentaje\":0.004374931641693098},{\"class\":\"CM-an\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":66.0,\"masa_media_g\":66.0,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.1\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":187.6,\"masa_media_g\":187.6,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.8/4\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":351.0,\"masa_media_g\":351.0,\"porcentaje\":0.004374931641693098},{\"class\":\"L3.05\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":231.15,\"masa_media_g\":231.15,\"porcentaje\":0.004374931641693098},{\"class\":\"H?\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":430.1,\"masa_media_g\":430.1,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.05\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":78.2,\"masa_media_g\":78.2,\"porcentaje\":0.004374931641693098},{\"class\":\"EH\",\"registros\":2,\"masas_positivas\":1,\"masa_mediana_g\":0.59,\"masa_media_g\":0.59,\"porcentaje\":0.004374931641693098},{\"class\":\"H5-an\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":25.95,\"masa_media_g\":25.95,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.9-5\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":161.0,\"masa_media_g\":161.0,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.2\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":88.385,\"masa_media_g\":88.385,\"porcentaje\":0.004374931641693098},{\"class\":\"H6/7\",\"registros\":2,\"masas_positivas\":2,\"masa_mediana_g\":68.5,\"masa_media_g\":68.5,\"porcentaje\":0.004374931641693098},{\"class\":\"H3.4-5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":230.3,\"masa_media_g\":230.3,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.2-6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":83.9,\"masa_media_g\":83.9,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.2-3.7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":17.7,\"masa_media_g\":17.7,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.4/3.5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":499.5,\"masa_media_g\":499.5,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.5-4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":167.3,\"masa_media_g\":167.3,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.3-3.5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":4.9,\"masa_media_g\":4.9,\"porcentaje\":0.002187465820846549},{\"class\":\"Martian (OPX)\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":1930.9,\"masa_media_g\":1930.9,\"porcentaje\":0.002187465820846549},{\"class\":\"Martian\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":9.3,\"masa_media_g\":9.3,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.7-6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":97.8,\"masa_media_g\":97.8,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.7/3.8\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":208.6,\"masa_media_g\":208.6,\"porcentaje\":0.002187465820846549},{\"class\":\"L~4-6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":45.0,\"masa_media_g\":45.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.15\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":730.0,\"masa_media_g\":730.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L~3\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":362.7,\"masa_media_g\":362.7,\"porcentaje\":0.002187465820846549},{\"class\":\"Lunar (norite)\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":633.0,\"masa_media_g\":633.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.8-5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":125.0,\"masa_media_g\":125.0,\"porcentaje\":0.002187465820846549},{\"class\":\"Lunar (bas/gab brec)\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":191.2,\"masa_media_g\":191.2,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.8/3.9\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":50.13,\"masa_media_g\":50.13,\"porcentaje\":0.002187465820846549},{\"class\":\"C1-ung\",\"registros\":1,\"masas_positivas\":0,\"masa_mediana_g\":\"\",\"masa_media_g\":\"\",\"porcentaje\":0.002187465820846549},{\"class\":\"Lodranite-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":13.8,\"masa_media_g\":13.8,\"porcentaje\":0.002187465820846549},{\"class\":\"H4(?)\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":0.4,\"masa_media_g\":0.4,\"porcentaje\":0.002187465820846549},{\"class\":\"H4-melt breccia\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":468.0,\"masa_media_g\":468.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.8-4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":50000.0,\"masa_media_g\":50000.0,\"porcentaje\":0.002187465820846549},{\"class\":\"CM2-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":12.7,\"masa_media_g\":12.7,\"porcentaje\":0.002187465820846549},{\"class\":\"Mesosiderite-A3/4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":320000.0,\"masa_media_g\":320000.0,\"porcentaje\":0.002187465820846549},{\"class\":\"EH3/4-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":28.0,\"masa_media_g\":28.0,\"porcentaje\":0.002187465820846549},{\"class\":\"EL4/5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":608.9,\"masa_media_g\":608.9,\"porcentaje\":0.002187465820846549},{\"class\":\"R3.8-5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":174.0,\"masa_media_g\":174.0,\"porcentaje\":0.002187465820846549},{\"class\":\"EL3/4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":34.6,\"masa_media_g\":34.6,\"porcentaje\":0.002187465820846549},{\"class\":\"EH7-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":4720.0,\"masa_media_g\":4720.0,\"porcentaje\":0.002187465820846549},{\"class\":\"EH7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":2427.9,\"masa_media_g\":2427.9,\"porcentaje\":0.002187465820846549},{\"class\":\"R4/5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":184.0,\"masa_media_g\":184.0,\"porcentaje\":0.002187465820846549},{\"class\":\"EH6-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":75.61,\"masa_media_g\":75.61,\"porcentaje\":0.002187465820846549},{\"class\":\"Relict H\",\"registros\":1,\"masas_positivas\":0,\"masa_mediana_g\":\"\",\"masa_media_g\":\"\",\"porcentaje\":0.002187465820846549},{\"class\":\"R3.5-6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":205.0,\"masa_media_g\":205.0,\"porcentaje\":0.002187465820846549},{\"class\":\"Relict iron\",\"registros\":1,\"masas_positivas\":0,\"masa_mediana_g\":\"\",\"masa_media_g\":\"\",\"porcentaje\":0.002187465820846549},{\"class\":\"E5-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":9.77,\"masa_media_g\":9.77,\"porcentaje\":0.002187465820846549},{\"class\":\"Stone-ung\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":0.63,\"masa_media_g\":0.63,\"porcentaje\":0.002187465820846549},{\"class\":\"CO3.7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":1600.0,\"masa_media_g\":1600.0,\"porcentaje\":0.002187465820846549},{\"class\":\"CV2\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":30.6,\"masa_media_g\":30.6,\"porcentaje\":0.002187465820846549},{\"class\":\"CR7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":868.0,\"masa_media_g\":868.0,\"porcentaje\":0.002187465820846549},{\"class\":\"CR2-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":160.0,\"masa_media_g\":160.0,\"porcentaje\":0.002187465820846549},{\"class\":\"EL7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":421.0,\"masa_media_g\":421.0,\"porcentaje\":0.002187465820846549},{\"class\":\"R3.5-4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":248.0,\"masa_media_g\":248.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H3.0-3.4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":738.0,\"masa_media_g\":738.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H/L3.9\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":7250.0,\"masa_media_g\":7250.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H3-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":61.4,\"masa_media_g\":61.4,\"porcentaje\":0.002187465820846549},{\"class\":\"LL~4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":28.7,\"masa_media_g\":28.7,\"porcentaje\":0.002187465820846549},{\"class\":\"H/L~4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":411.0,\"masa_media_g\":411.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H/L6-melt rock\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":436.4,\"masa_media_g\":436.4,\"porcentaje\":0.002187465820846549},{\"class\":\"Mesosiderite?\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":414.0,\"masa_media_g\":414.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H/L4/5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":96.8,\"masa_media_g\":96.8,\"porcentaje\":0.002187465820846549},{\"class\":\"H/L4-5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":1575.3,\"masa_media_g\":1575.3,\"porcentaje\":0.002187465820846549},{\"class\":\"H/L3.7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":47.83,\"masa_media_g\":47.83,\"porcentaje\":0.002187465820846549},{\"class\":\"R3.4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":10.5,\"masa_media_g\":10.5,\"porcentaje\":0.002187465820846549},{\"class\":\"H/L3.6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":28000.0,\"masa_media_g\":28000.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H/L3.5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":1001.0,\"masa_media_g\":1001.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H/L3-4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":2000.0,\"masa_media_g\":2000.0,\"porcentaje\":0.002187465820846549},{\"class\":\"Pallasite?\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":14180.0,\"masa_media_g\":14180.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H(L)3-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":271.0,\"masa_media_g\":271.0,\"porcentaje\":0.002187465820846549},{\"class\":\"R3-4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":171.0,\"masa_media_g\":171.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H(?)4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":16.16,\"masa_media_g\":16.16,\"porcentaje\":0.002187465820846549},{\"class\":\"LL~4/5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":23.8,\"masa_media_g\":23.8,\"porcentaje\":0.002187465820846549},{\"class\":\"LL6-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":2730.0,\"masa_media_g\":2730.0,\"porcentaje\":0.002187465820846549},{\"class\":\"H5-7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":3891.0,\"masa_media_g\":3891.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L4-melt rock\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":758.1,\"masa_media_g\":758.1,\"porcentaje\":0.002187465820846549},{\"class\":\"L3-melt breccia\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":1604.0,\"masa_media_g\":1604.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.9/4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":402.0,\"masa_media_g\":402.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3-7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":122.25,\"masa_media_g\":122.25,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL~4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":23.6,\"masa_media_g\":23.6,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL6-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":5900.0,\"masa_media_g\":5900.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L4-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":57.2,\"masa_media_g\":57.2,\"porcentaje\":0.002187465820846549},{\"class\":\"L4-melt breccia\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":5200.0,\"masa_media_g\":5200.0,\"porcentaje\":0.002187465820846549},{\"class\":\"C5/6-ung\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":169.2,\"masa_media_g\":169.2,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL3.10\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":287.0,\"masa_media_g\":287.0,\"porcentaje\":0.002187465820846549},{\"class\":\"C4/5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":226.0,\"masa_media_g\":226.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL5-6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":3287.0,\"masa_media_g\":3287.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L5-7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":929.4,\"masa_media_g\":929.4,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL4/5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":789.2,\"masa_media_g\":789.2,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL4-6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":3650.0,\"masa_media_g\":3650.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL3.6/3.7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":2618.0,\"masa_media_g\":2618.0,\"porcentaje\":0.002187465820846549},{\"class\":\"CR-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":114000.0,\"masa_media_g\":114000.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.9-5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":31.94,\"masa_media_g\":31.94,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.8-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":14040.0,\"masa_media_g\":14040.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.0-3.7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":50.1,\"masa_media_g\":50.1,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.0-3.9\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":424.1,\"masa_media_g\":424.1,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.3-3.7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":15.4,\"masa_media_g\":15.4,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.2-3.6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":65.3,\"masa_media_g\":65.3,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.4-3.7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":272.0,\"masa_media_g\":272.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.2-3.5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":351.7,\"masa_media_g\":351.7,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.5-3.7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":149.5,\"masa_media_g\":149.5,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.5-3.8\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":73.0,\"masa_media_g\":73.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.5-3.9\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":325.8,\"masa_media_g\":325.8,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.5-5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":5590.0,\"masa_media_g\":5590.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.10\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":404.0,\"masa_media_g\":404.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.6-4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":153.2,\"masa_media_g\":153.2,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.7-3.9\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":1470.0,\"masa_media_g\":1470.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.7-4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":31.4,\"masa_media_g\":31.4,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.7-6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":6100.0,\"masa_media_g\":6100.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.7/3.8\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":350.0,\"masa_media_g\":350.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.00\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":81.0,\"masa_media_g\":81.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L6-melt rock\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":22000.0,\"masa_media_g\":22000.0,\"porcentaje\":0.002187465820846549},{\"class\":\"C3/4-ung\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":12.0,\"masa_media_g\":12.0,\"porcentaje\":0.002187465820846549},{\"class\":\"LL<3.5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":200.0,\"masa_media_g\":200.0,\"porcentaje\":0.002187465820846549},{\"class\":\"LL4/6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":35.0,\"masa_media_g\":35.0,\"porcentaje\":0.002187465820846549},{\"class\":\"LL3.8-4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":3500.0,\"masa_media_g\":3500.0,\"porcentaje\":0.002187465820846549},{\"class\":\"Iron, IIAB-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":59.0,\"masa_media_g\":59.0,\"porcentaje\":0.002187465820846549},{\"class\":\"LL3.9/4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":18.6,\"masa_media_g\":18.6,\"porcentaje\":0.002187465820846549},{\"class\":\"LL3/4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":1452.0,\"masa_media_g\":1452.0,\"porcentaje\":0.002187465820846549},{\"class\":\"Iron, IAB-sHL-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":762.0,\"masa_media_g\":762.0,\"porcentaje\":0.002187465820846549},{\"class\":\"Impact melt breccia\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":172.0,\"masa_media_g\":172.0,\"porcentaje\":0.002187465820846549},{\"class\":\"Howardite-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":494.0,\"masa_media_g\":494.0,\"porcentaje\":0.002187465820846549},{\"class\":\"C2\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":0.8,\"masa_media_g\":0.8,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL3-6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":68.0,\"masa_media_g\":68.0,\"porcentaje\":0.002187465820846549},{\"class\":\"CK3.8\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":195.0,\"masa_media_g\":195.0,\"porcentaje\":0.002187465820846549},{\"class\":\"LL5-7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":87.4,\"masa_media_g\":87.4,\"porcentaje\":0.002187465820846549},{\"class\":\"C1/2-ung\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":41.73,\"masa_media_g\":41.73,\"porcentaje\":0.002187465820846549},{\"class\":\"LL6(?)\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":293.6,\"masa_media_g\":293.6,\"porcentaje\":0.002187465820846549},{\"class\":\"L3.3-3.6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":203.3,\"masa_media_g\":203.3,\"porcentaje\":0.002187465820846549},{\"class\":\"CK3/4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":167.0,\"masa_media_g\":167.0,\"porcentaje\":0.002187465820846549},{\"class\":\"LL7(?)\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":8.0,\"masa_media_g\":8.0,\"porcentaje\":0.002187465820846549},{\"class\":\"Iron, IIE?\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":4.6,\"masa_media_g\":4.6,\"porcentaje\":0.002187465820846549},{\"class\":\"LL3.7-6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":226.806,\"masa_media_g\":226.806,\"porcentaje\":0.002187465820846549},{\"class\":\"Iron, IIIE-an\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":58400.0,\"masa_media_g\":58400.0,\"porcentaje\":0.002187465820846549},{\"class\":\"CH/CBb\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":16000.0,\"masa_media_g\":16000.0,\"porcentaje\":0.002187465820846549},{\"class\":\"LL(L)3.1\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":3200.0,\"masa_media_g\":3200.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL-melt rock\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":23.2,\"masa_media_g\":23.2,\"porcentaje\":0.002187465820846549},{\"class\":\"C3.0-ung\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":286.0,\"masa_media_g\":286.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL(?)3\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":2.0,\"masa_media_g\":2.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":11.8,\"masa_media_g\":11.8,\"porcentaje\":0.002187465820846549},{\"class\":\"LL3-4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":383.0,\"masa_media_g\":383.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L(LL)~4\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":331.0,\"masa_media_g\":331.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L(LL)6\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":265.0,\"masa_media_g\":265.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L(LL)5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":1056.0,\"masa_media_g\":1056.0,\"porcentaje\":0.002187465820846549},{\"class\":\"LL3.00\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":691.0,\"masa_media_g\":691.0,\"porcentaje\":0.002187465820846549},{\"class\":\"LL3.05\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":128.0,\"masa_media_g\":128.0,\"porcentaje\":0.002187465820846549},{\"class\":\"L(LL)3.5-3.7\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":1228.1,\"masa_media_g\":1228.1,\"porcentaje\":0.002187465820846549},{\"class\":\"LL3.1-3.5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":80.1,\"masa_media_g\":80.1,\"porcentaje\":0.002187465820846549},{\"class\":\"L(H)3\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":65.7,\"masa_media_g\":65.7,\"porcentaje\":0.002187465820846549},{\"class\":\"K\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":23.1,\"masa_media_g\":23.1,\"porcentaje\":0.002187465820846549},{\"class\":\"L/LL3.5\",\"registros\":1,\"masas_positivas\":1,\"masa_mediana_g\":32.4,\"masa_media_g\":32.4,\"porcentaje\":0.002187465820846549}],\"P5_histograma\":[{\"log10_desde\":-2.0,\"log10_hasta\":-1.755546218740409,\"registros\":3},{\"log10_desde\":-1.755546218740409,\"log10_hasta\":-1.511092437480818,\"registros\":2},{\"log10_desde\":-1.511092437480818,\"log10_hasta\":-1.266638656221227,\"registros\":2},{\"log10_desde\":-1.266638656221227,\"log10_hasta\":-1.022184874961636,\"registros\":8},{\"log10_desde\":-1.022184874961636,\"log10_hasta\":-0.7777310937020445,\"registros\":48},{\"log10_desde\":-0.7777310937020445,\"log10_hasta\":-0.5332773124424532,\"registros\":130},{\"log10_desde\":-0.5332773124424532,\"log10_hasta\":-0.2888235311828622,\"registros\":554},{\"log10_desde\":-0.2888235311828622,\"log10_hasta\":-0.04436974992327114,\"registros\":1058},{\"log10_desde\":-0.04436974992327114,\"log10_hasta\":0.2000840313363201,\"registros\":1650},{\"log10_desde\":0.2000840313363201,\"log10_hasta\":0.444537812595911,\"registros\":2232},{\"log10_desde\":0.444537812595911,\"log10_hasta\":0.6889915938555022,\"registros\":3123},{\"log10_desde\":0.6889915938555022,\"log10_hasta\":0.9334453751150935,\"registros\":3817},{\"log10_desde\":0.9334453751150935,\"log10_hasta\":1.177899156374684,\"registros\":4288},{\"log10_desde\":1.177899156374684,\"log10_hasta\":1.422352937634276,\"registros\":4330},{\"log10_desde\":1.422352937634276,\"log10_hasta\":1.666806718893866,\"registros\":3947},{\"log10_desde\":1.666806718893866,\"log10_hasta\":1.911260500153458,\"registros\":3677},{\"log10_desde\":1.911260500153458,\"log10_hasta\":2.155714281413049,\"registros\":3435},{\"log10_desde\":2.155714281413049,\"log10_hasta\":2.40016806267264,\"registros\":3027},{\"log10_desde\":2.40016806267264,\"log10_hasta\":2.644621843932231,\"registros\":2680},{\"log10_desde\":2.644621843932231,\"log10_hasta\":2.889075625191822,\"registros\":1962},{\"log10_desde\":2.889075625191822,\"log10_hasta\":3.133529406451413,\"registros\":1491},{\"log10_desde\":3.133529406451413,\"log10_hasta\":3.377983187711004,\"registros\":1083},{\"log10_desde\":3.377983187711004,\"log10_hasta\":3.622436968970596,\"registros\":796},{\"log10_desde\":3.622436968970596,\"log10_hasta\":3.866890750230187,\"registros\":601},{\"log10_desde\":3.866890750230187,\"log10_hasta\":4.111344531489777,\"registros\":448},{\"log10_desde\":4.111344531489777,\"log10_hasta\":4.355798312749369,\"registros\":360},{\"log10_desde\":4.355798312749369,\"log10_hasta\":4.60025209400896,\"registros\":231},{\"log10_desde\":4.60025209400896,\"log10_hasta\":4.844705875268551,\"registros\":198},{\"log10_desde\":4.844705875268551,\"log10_hasta\":5.089159656528143,\"registros\":139},{\"log10_desde\":5.089159656528143,\"log10_hasta\":5.333613437787733,\"registros\":85},{\"log10_desde\":5.333613437787733,\"log10_hasta\":5.578067219047324,\"registros\":57},{\"log10_desde\":5.578067219047324,\"log10_hasta\":5.822521000306915,\"registros\":32},{\"log10_desde\":5.822521000306915,\"log10_hasta\":6.066974781566506,\"registros\":24},{\"log10_desde\":6.066974781566506,\"log10_hasta\":6.311428562826098,\"registros\":18},{\"log10_desde\":6.311428562826098,\"log10_hasta\":6.555882344085688,\"registros\":9},{\"log10_desde\":6.555882344085688,\"log10_hasta\":6.800336125345281,\"registros\":5},{\"log10_desde\":6.800336125345281,\"log10_hasta\":7.044789906604871,\"registros\":4},{\"log10_desde\":7.044789906604871,\"log10_hasta\":7.289243687864461,\"registros\":2},{\"log10_desde\":7.289243687864461,\"log10_hasta\":7.533697469124053,\"registros\":7},{\"log10_desde\":7.533697469124053,\"log10_hasta\":7.778151250383644,\"registros\":3}],\"P5_estadisticas\":[{\"estadistica\":\"Registros\",\"valor\":45566.0,\"unidad\":\"registros\"},{\"estadistica\":\"Media\",\"valor\":13283.6152095422,\"unidad\":\"g\"},{\"estadistica\":\"Desviación estándar\",\"valor\":575108.6813361832,\"unidad\":\"g\"},{\"estadistica\":\"Mínimo\",\"valor\":0.01,\"unidad\":\"g\"},{\"estadistica\":\"Percentil 25\",\"valor\":7.2,\"unidad\":\"g\"},{\"estadistica\":\"Mediana\",\"valor\":32.695,\"unidad\":\"g\"},{\"estadistica\":\"Percentil 75\",\"valor\":202.8,\"unidad\":\"g\"},{\"estadistica\":\"Percentil 90\",\"valor\":1110.3,\"unidad\":\"g\"},{\"estadistica\":\"Percentil 99\",\"valor\":50600.0,\"unidad\":\"g\"},{\"estadistica\":\"Máximo\",\"valor\":60000000.0,\"unidad\":\"g\"}],\"P6_masa_por_tipo\":[{\"tipo_registro\":\"Encontrado\",\"registros\":44491,\"masas_positivas\":44491,\"masa_mediana_g\":30.54,\"masa_media_g\":12467.24488071745,\"porcentaje\":97.64078479568099,\"p25_g\":6.97,\"p75_g\":178.35},{\"tipo_registro\":\"Visto caer\",\"registros\":1075,\"masas_positivas\":1075,\"masa_mediana_g\":2800.0,\"masa_media_g\":47070.71502325581,\"porcentaje\":2.35921520431901,\"p25_g\":686.0,\"p75_g\":10450.0}],\"P7_mayores_masas\":[{\"id\":11890,\"name\":\"Hoba\",\"class\":\"Iron, IVB\",\"tipo_registro\":\"Encontrado\",\"anio\":1920,\"mass\":60000000,\"masa_kg\":60000,\"masa_t\":60.0},{\"id\":5262,\"name\":\"Cape York\",\"class\":\"Iron, IIIAB\",\"tipo_registro\":\"Encontrado\",\"anio\":1818,\"mass\":58200000,\"masa_kg\":58200,\"masa_t\":58.2},{\"id\":5247,\"name\":\"Campo del Cielo\",\"class\":\"Iron, IAB-MG\",\"tipo_registro\":\"Encontrado\",\"anio\":1575,\"mass\":50000000,\"masa_kg\":50000,\"masa_t\":50.0},{\"id\":5257,\"name\":\"Canyon Diablo\",\"class\":\"Iron, IAB-MG\",\"tipo_registro\":\"Encontrado\",\"anio\":1891,\"mass\":30000000,\"masa_kg\":30000,\"masa_t\":30.0},{\"id\":2335,\"name\":\"Armanty\",\"class\":\"Iron, IIIE\",\"tipo_registro\":\"Encontrado\",\"anio\":1898,\"mass\":28000000,\"masa_kg\":28000,\"masa_t\":28.0},{\"id\":10912,\"name\":\"Gibeon\",\"class\":\"Iron, IVA\",\"tipo_registro\":\"Encontrado\",\"anio\":1836,\"mass\":26000000,\"masa_kg\":26000,\"masa_t\":26.0},{\"id\":5363,\"name\":\"Chupaderos\",\"class\":\"Iron, IIIAB\",\"tipo_registro\":\"Encontrado\",\"anio\":1852,\"mass\":24300000,\"masa_kg\":24300,\"masa_t\":24.3},{\"id\":16852,\"name\":\"Mundrabilla\",\"class\":\"Iron, IAB-ung\",\"tipo_registro\":\"Encontrado\",\"anio\":1911,\"mass\":24000000,\"masa_kg\":24000,\"masa_t\":24.0},{\"id\":23593,\"name\":\"Sikhote-Alin\",\"class\":\"Iron, IIAB\",\"tipo_registro\":\"Visto caer\",\"anio\":1947,\"mass\":23000000,\"masa_kg\":23000,\"masa_t\":23.0},{\"id\":4919,\"name\":\"Bacubirito\",\"class\":\"Iron, ungrouped\",\"tipo_registro\":\"Encontrado\",\"anio\":1863,\"mass\":22000000,\"masa_kg\":22000,\"masa_t\":22.0}],\"P8_asociacion\":[{\"tipo_registro\":\"Encontrado\",\"registros\":44203,\"rho_spearman\":0.04912104557297153},{\"tipo_registro\":\"Visto caer\",\"registros\":1040,\"rho_spearman\":0.02557528690565251}],\"P9_clases_conteos\":[{\"clase_grafico\":\"L6\",\"1900\":22,\"1910\":27,\"1920\":26,\"1930\":49,\"1940\":35,\"1950\":30,\"1960\":58,\"1970\":739,\"1980\":1336,\"1990\":2742,\"2000\":2792,\"2010\":321},{\"clase_grafico\":\"H5\",\"1900\":13,\"1910\":12,\"1920\":20,\"1930\":35,\"1940\":28,\"1950\":30,\"1960\":69,\"1970\":903,\"1980\":1664,\"1990\":1797,\"2000\":2277,\"2010\":209},{\"clase_grafico\":\"L5\",\"1900\":9,\"1910\":8,\"1920\":6,\"1930\":17,\"1940\":11,\"1950\":12,\"1960\":24,\"1970\":96,\"1980\":219,\"1990\":1110,\"2000\":3088,\"2010\":148},{\"clase_grafico\":\"H6\",\"1900\":4,\"1910\":5,\"1920\":4,\"1930\":22,\"1940\":13,\"1950\":9,\"1960\":27,\"1970\":537,\"1980\":729,\"1990\":1210,\"2000\":1724,\"2010\":186},{\"clase_grafico\":\"H4\",\"1900\":6,\"1910\":10,\"1920\":7,\"1930\":34,\"1940\":10,\"1950\":16,\"1960\":39,\"1970\":869,\"1980\":1287,\"1990\":843,\"2000\":898,\"2010\":155},{\"clase_grafico\":\"LL5\",\"1900\":0,\"1910\":2,\"1920\":1,\"1930\":3,\"1940\":2,\"1950\":0,\"1960\":5,\"1970\":15,\"1980\":25,\"1990\":1506,\"2000\":1110,\"2010\":85},{\"clase_grafico\":\"LL6\",\"1900\":3,\"1910\":1,\"1920\":3,\"1930\":8,\"1940\":3,\"1950\":3,\"1960\":6,\"1970\":221,\"1980\":178,\"1990\":284,\"2000\":1172,\"2010\":145},{\"clase_grafico\":\"L4\",\"1900\":0,\"1910\":4,\"1920\":5,\"1930\":5,\"1940\":8,\"1950\":4,\"1960\":18,\"1970\":154,\"1980\":158,\"1990\":232,\"2000\":562,\"2010\":61},{\"clase_grafico\":\"Otras clases\",\"1900\":82,\"1910\":85,\"1920\":87,\"1930\":136,\"1940\":86,\"1950\":108,\"1960\":151,\"1970\":1435,\"1980\":1226,\"1990\":1895,\"2000\":4133,\"2010\":653}],\"P9_clases_pct\":[{\"clase_grafico\":\"L6\",\"1900\":15.8273381294964,\"1910\":17.53246753246753,\"1920\":16.35220125786163,\"1930\":15.85760517799353,\"1940\":17.85714285714286,\"1950\":14.15094339622642,\"1960\":14.6095717884131,\"1970\":14.87220768766351,\"1980\":19.58369979478159,\"1990\":23.5992770462174,\"2000\":15.724262221221,\"2010\":16.3525216505349},{\"clase_grafico\":\"H5\",\"1900\":9.352517985611511,\"1910\":7.792207792207792,\"1920\":12.57861635220126,\"1930\":11.32686084142395,\"1940\":14.28571428571428,\"1950\":14.15094339622642,\"1960\":17.38035264483627,\"1970\":18.17267055745623,\"1980\":24.39167399589563,\"1990\":15.46604699199587,\"2000\":12.82383419689119,\"2010\":10.64696892511462},{\"clase_grafico\":\"L5\",\"1900\":6.474820143884892,\"1910\":5.194805194805195,\"1920\":3.773584905660377,\"1930\":5.501618122977346,\"1940\":5.612244897959184,\"1950\":5.660377358490567,\"1960\":6.045340050377834,\"1970\":1.931978265244516,\"1980\":3.210202286719437,\"1990\":9.553317841466564,\"2000\":17.39130434782609,\"2010\":7.539480387162506},{\"clase_grafico\":\"H6\",\"1900\":2.877697841726619,\"1910\":3.246753246753246,\"1920\":2.515723270440252,\"1930\":7.119741100323624,\"1940\":6.63265306122449,\"1950\":4.245283018867925,\"1960\":6.801007556675064,\"1970\":10.80700342121151,\"1980\":10.68601583113456,\"1990\":10.41397710646355,\"2000\":9.709394007659384,\"2010\":9.475292919001529},{\"clase_grafico\":\"H4\",\"1900\":4.316546762589928,\"1910\":6.493506493506493,\"1920\":4.40251572327044,\"1930\":11.00323624595469,\"1940\":5.102040816326531,\"1950\":7.547169811320755,\"1960\":9.82367758186398,\"1970\":17.48842825518213,\"1980\":18.86543535620053,\"1990\":7.255357603924606,\"2000\":5.057445370578959,\"2010\":7.896077432501274},{\"clase_grafico\":\"LL5\",\"1900\":0.0,\"1910\":1.298701298701299,\"1920\":0.628930817610063,\"1930\":0.9708737864077669,\"1940\":1.020408163265306,\"1950\":0.0,\"1960\":1.259445843828715,\"1970\":0.3018716039444557,\"1980\":0.3664614482556435,\"1990\":12.96152853085463,\"2000\":6.251407974769092,\"2010\":4.330106979113602},{\"clase_grafico\":\"LL6\",\"1900\":2.158273381294964,\"1910\":0.6493506493506493,\"1920\":1.886792452830189,\"1930\":2.588996763754046,\"1940\":1.530612244897959,\"1950\":1.415094339622642,\"1960\":1.511335012594458,\"1970\":4.447574964781646,\"1980\":2.609205511580182,\"1990\":2.444272312591445,\"2000\":6.600585717503943,\"2010\":7.386653082017321},{\"clase_grafico\":\"L4\",\"1900\":0.0,\"1910\":2.597402597402597,\"1920\":3.144654088050315,\"1930\":1.618122977346278,\"1940\":4.081632653061225,\"1950\":1.886792452830189,\"1960\":4.534005037783375,\"1970\":3.099215133829745,\"1980\":2.316036352975667,\"1990\":1.996729494793011,\"2000\":3.165127280919126,\"2010\":3.107488537952114},{\"clase_grafico\":\"Otras clases\",\"1900\":58.99280575539569,\"1910\":55.1948051948052,\"1920\":54.71698113207547,\"1930\":44.01294498381877,\"1940\":43.87755102040816,\"1950\":50.9433962264151,\"1960\":38.0352644836272,\"1970\":28.87905011068625,\"1980\":17.97126942245676,\"1990\":16.30949307169292,\"2000\":23.27663888263122,\"2010\":33.26541008660214}],\"P10_peru_candidatos\":[{\"id\":45817,\"name\":\"Carancas\",\"class\":\"H4-5\",\"mass\":342,\"tipo_registro\":\"Visto caer\",\"anio\":2007,\"lat\":-16.66444,\"long\":-69.04389,\"dentro_peru_cartografia\":false,\"dentro_peru_10m\":true,\"peru_analisis\":true,\"criterio_pais\":\"Perú confirmado por Arizona State University y Natural Earth 1:10m\"},{\"id\":51559,\"name\":\"Daule\",\"class\":\"L5\",\"mass\":6580,\"tipo_registro\":\"Visto caer\",\"anio\":2008,\"lat\":-1.87089,\"long\":-79.95756,\"dentro_peru_cartografia\":false,\"dentro_peru_10m\":false,\"peru_analisis\":false,\"criterio_pais\":\"Cartografía Natural Earth 1:10m (aproximada)\"},{\"id\":44877,\"name\":\"Cerro La Tiza\",\"class\":\"H4\",\"mass\":3740,\"tipo_registro\":\"Encontrado\",\"anio\":2002,\"lat\":-14.53321,\"long\":-75.77511,\"dentro_peru_cartografia\":true,\"dentro_peru_10m\":true,\"peru_analisis\":true,\"criterio_pais\":\"Cartografía Natural Earth 1:10m (aproximada)\"},{\"id\":23797,\"name\":\"Tambo Quemado\",\"class\":\"Iron, IIIAB\",\"mass\":141000,\"tipo_registro\":\"Encontrado\",\"anio\":1950,\"lat\":-14.66667,\"long\":-74.5,\"dentro_peru_cartografia\":true,\"dentro_peru_10m\":true,\"peru_analisis\":true,\"criterio_pais\":\"Cartografía Natural Earth 1:10m (aproximada)\"}]}")
}, me = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), he = /* @__PURE__ */ o(((e, t) => {
	t.exports = me();
})), ge = /* @__PURE__ */ (0, D.createContext)({});
// node_modules/framer-motion/dist/es/utils/use-constant.mjs
function _e(e) {
	let t = (0, D.useRef)(null);
	return t.current === null && (t.current = e()), t.current;
}
// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var ve = typeof window < "u" ? D.useLayoutEffect : D.useEffect, ye = /* @__PURE__ */ (0, D.createContext)(null);
// node_modules/motion-utils/dist/es/array.mjs
function be(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function A(e, t) {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
// node_modules/motion-utils/dist/es/clamp.mjs
var j = (e, t, n) => n > t ? t : n < e ? e : n, xe = {}, Se = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), Ce = (e) => typeof e == "object" && !!e, we = (e) => /^0[^.\s]+$/u.test(e);
// node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function Te(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
// node_modules/motion-utils/dist/es/noop.mjs
var M = /* @__NO_SIDE_EFFECTS__ */ (e) => e, Ee = (...e) => e.reduce((e, t) => (n) => t(e(n))), De = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
	let r = t - e;
	return r ? (n - e) / r : 1;
}, Oe = class {
	constructor() {
		this.subscriptions = [];
	}
	add(e) {
		return be(this.subscriptions, e), () => this.remove(e);
	}
	remove(e) {
		A(this.subscriptions, e);
	}
	notify(e, t, n) {
		let r = this.subscriptions.length;
		if (r) {
			if (r === 1) this.subscriptions[0](e, t, n);
			else for (let i = 0; i < r; i++) {
				let r = this.subscriptions[i];
				r && r(e, t, n);
			}
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}, ke = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, Ae = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, je = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? 1e3 / t * e : 0, Me = (e, t, n) => e * (3 * (1 - e) * ((1 - e) * t + e * n) + e * e);
/*#__NO_SIDE_EFFECTS__*/
function Ne(e, t, n, r) {
	return e === t && n === r ? M : (i) => {
		let a = 0, o = 1, s = i;
		for (let t = 0;; t++) {
			s >= a && s <= o || (s = (a + o) / 2);
			let r = Me(s, e, n) - i;
			if (r * r < 1e-28 || t === 40) break;
			r > 0 ? o = s : a = s, s -= r * 1e-7 / (Me(s + 1e-7, e, n) - i - r);
		}
		return Me(s, t, r);
	};
}
// node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var Pe = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Fe = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), Ie = /*@__PURE__*/ Ne(.33, 1.53, .69, .99), Le = /*@__PURE__*/ Fe(Ie), Re = /*@__PURE__*/ Pe(Le), ze = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * Le(e) : .5 * (2 - 2 ** (-10 * (e - 1))), Be = (e) => 1 - Math.sin(Math.acos(e)), Ve = /* @__PURE__ */ Fe(Be), He = /* @__PURE__ */ Pe(Be), Ue = /*@__PURE__*/ Ne(.42, 0, 1, 1), We = /*@__PURE__*/ Ne(0, 0, .58, 1), Ge = /*@__PURE__*/ Ne(.42, 0, .58, 1), Ke = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number", qe = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", Je = {
	linear: M,
	easeIn: Ue,
	easeInOut: Ge,
	easeOut: We,
	circIn: Be,
	circInOut: He,
	circOut: Ve,
	backIn: Le,
	backInOut: Re,
	backOut: Ie,
	anticipate: ze
}, Ye = (e) => typeof e == "string", Xe = (e) => {
	if (/* @__PURE__ */ qe(e)) {
		let [t, n, r, i] = e;
		return /* @__PURE__ */ Ne(t, n, r, i);
	}
	return Ye(e) ? Je[e] : e;
}, Ze = {
	delta: 0,
	timestamp: 0,
	isProcessing: !1
}, Qe;
function $e() {
	Qe = void 0;
}
var N = {
	now: () => (Qe === void 0 && N.set(Ze.isProcessing || xe.useManualTiming ? Ze.timestamp : performance.now()), Qe),
	set: (e) => {
		Qe = e, queueMicrotask($e);
	}
}, et = (e) => Math.round(e * 1e5) / 1e5, tt = (e) => (t) => typeof t == "string" && t.startsWith(e), nt = /*@__PURE__*/ tt("--"), rt = /*@__PURE__*/ tt("var(--"), it = (e) => rt(e) ? at.test(e.split("/*")[0].trim()) : !1, at = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ot(e) {
	return typeof e == "string" && e.split("/*")[0].includes("var(--");
}
// node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var st = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, ct = {
	...st,
	transform: (e) => j(0, 1, e)
}, lt = {
	...st,
	default: 1
}, ut = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
// node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function dt(e) {
	return e == null;
}
// node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var ft = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, pt = (e, t) => (n) => !!(typeof n == "string" && ft.test(n) && n.startsWith(e) || t && !dt(n) && Object.prototype.hasOwnProperty.call(n, t)), mt = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(ut);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, ht = (e) => j(0, 255, e), gt = {
	...st,
	transform: (e) => Math.round(ht(e))
}, _t = {
	test: /*@__PURE__*/ pt("rgb", "red"),
	parse: /*@__PURE__*/ mt("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + gt.transform(e) + ", " + gt.transform(t) + ", " + gt.transform(n) + ", " + et(ct.transform(r)) + ")"
}, vt = (e, t, n) => {
	let r = e.substring(1 + t * n, 1 + (t + 1) * n);
	return n > 1 ? r : r + r;
};
function yt(e) {
	let t = e.length > 5 ? 2 : 1, n = vt(e, 3, t);
	return {
		red: parseInt(vt(e, 0, t), 16),
		green: parseInt(vt(e, 1, t), 16),
		blue: parseInt(vt(e, 2, t), 16),
		alpha: n ? parseInt(n, 16) / 255 : 1
	};
}
var bt = {
	test: /*@__PURE__*/ pt("#"),
	parse: yt,
	transform: _t.transform
}, xt = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), St = /*@__PURE__*/ xt("deg"), Ct = /*@__PURE__*/ xt("%"), P = /*@__PURE__*/ xt("px"), wt = /*@__PURE__*/ xt("vh"), Tt = /*@__PURE__*/ xt("vw"), Et = {
	...Ct,
	parse: (e) => Ct.parse(e) / 100,
	transform: (e) => Ct.transform(e * 100)
}, Dt = {
	test: /*@__PURE__*/ pt("hsl", "hue"),
	parse: /*@__PURE__*/ mt("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + Ct.transform(et(t)) + ", " + Ct.transform(et(n)) + ", " + et(ct.transform(r)) + ")"
}, Ot = {
	test: (e) => _t.test(e) || bt.test(e) || Dt.test(e),
	parse: (e) => _t.test(e) ? _t.parse(e) : Dt.test(e) ? Dt.parse(e) : bt.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? _t.transform(e) : Dt.transform(e),
	getAnimatableNone: (e) => {
		let t = Ot.parse(e);
		return t.alpha = 0, Ot.transform(t);
	}
}, kt = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu, At = /*@__PURE__*/ new RegExp(ut.source), jt = /*@__PURE__*/ new RegExp(kt.source, "i");
function Mt(e) {
	return isNaN(e) && typeof e == "string" && (At.test(e) || jt.test(e));
}
var Nt = "number", Pt = "color", Ft = "var", It = "var(", Lt = "${}", Rt = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)(?![a-z]*\()/giu;
function zt(e) {
	let t = e.toString();
	return At.test(t) || jt.test(t);
}
function Bt(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(Rt, (e) => (Ot.test(e) ? (r.color.push(a), i.push(Pt), n.push(Ot.parse(e))) : e.startsWith(It) ? (r.var.push(a), i.push(Ft), n.push(e)) : (r.number.push(a), i.push(Nt), n.push(parseFloat(e))), ++a, Lt)).split(Lt),
		indexes: r,
		types: i
	};
}
function Vt(e) {
	return Bt(e).values;
}
function Ht({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === Nt ? et(r[a]) : e === Pt ? Ot.transform(r[a]) : r[a];
		}
		return i;
	};
}
function Ut(e) {
	return Ht(Bt(e));
}
var Wt = (e) => typeof e == "number" ? 0 : Ot.test(e) ? Ot.getAnimatableNone(e) : e, Gt = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : Wt(e);
function Kt(e) {
	let t = Bt(e);
	return Ht(t)(t.values.map((e, n) => Gt(e, t.split[n])));
}
var qt = {
	test: Mt,
	parse: Vt,
	createTransformer: Ut,
	getAnimatableNone: Kt
};
// node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function Jt(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Yt({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = Jt(s, r, e + 1 / 3), a = Jt(s, r, e), o = Jt(s, r, e - 1 / 3);
	}
	return {
		red: Math.round(i * 255),
		green: Math.round(a * 255),
		blue: Math.round(o * 255),
		alpha: r
	};
}
// node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function F(e, t) {
	return (n) => n > 0 ? t : e;
}
// node_modules/motion-dom/dist/es/utils/mix/number.mjs
var I = (e, t, n) => e + (t - e) * n, Xt = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, Zt = [
	bt,
	_t,
	Dt
], Qt = (e) => Zt.find((t) => t.test(e));
function $t(e) {
	let t = Qt(e);
	if (!t) return !1;
	let n = t.parse(e);
	return t === Dt && (n = Yt(n)), n;
}
var en = (e, t) => {
	let n = $t(e), r = $t(t);
	if (!n || !r) return F(e, t);
	let i = { ...n };
	return (e) => (i.red = Xt(n.red, r.red, e), i.green = Xt(n.green, r.green, e), i.blue = Xt(n.blue, r.blue, e), i.alpha = I(n.alpha, r.alpha, e), _t.transform(i));
}, tn = /* @__PURE__ */ new Set(["none", "hidden"]);
function nn(e, t) {
	return tn.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
// node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function rn(e, t) {
	return (n) => I(e, t, n);
}
function an(e) {
	return typeof e == "number" ? rn : typeof e == "string" ? it(e) ? F : Ot.test(e) ? en : ln : Array.isArray(e) ? on : typeof e == "object" ? Ot.test(e) ? en : sn : F;
}
function on(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => an(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function sn(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = an(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function cn(e, t) {
	let n = [], r = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let i = 0; i < t.values.length; i++) {
		let a = t.types[i], o = e.indexes[a][r[a]], s = e.values[o] ?? 0;
		n[i] = s, r[a]++;
	}
	return n;
}
var ln = (e, t) => {
	let n = Bt(e), r = Bt(t);
	return n.indexes.var.length === r.indexes.var.length && n.indexes.color.length === r.indexes.color.length && n.indexes.number.length >= r.indexes.number.length ? tn.has(e) && !r.values.length || tn.has(t) && !n.values.length ? nn(e, t) : Ee(on(cn(n, r), r.values), Ht(r)) : F(e, t);
}, un = /^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;
function dn(e, t) {
	let n = un.exec(e);
	if (!n) return;
	let r = un.exec(t);
	if (!r || n[2] !== r[2]) return;
	let i = n[2], a = parseFloat(n[1]), o = parseFloat(r[1]);
	return (e) => et(I(a, o, e)) + i;
}
function fn(e, t, n) {
	if (typeof e == "number" && typeof t == "number" && typeof n == "number") return I(e, t, n);
	if (typeof e == "string" && typeof t == "string") {
		let n = dn(e, t);
		if (n) return n;
	}
	return an(e)(e, t);
}
// node_modules/motion-dom/dist/es/frameloop/order.mjs
var pn = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
// node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function mn(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = !1, i = !1, a, o = /* @__PURE__ */ new Set(), s = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	};
	function c(t) {
		o.has(t) && (n.add(t), e()), (a = t)(s);
	}
	let l = {
		schedule: (e, i = !1, s = !1) => {
			let c = s && r, l = c ? t : n;
			return i && o.add(e), c && e !== a && l.delete(e), l.add(e), e;
		},
		cancel: (e) => {
			n.delete(e), o.delete(e);
		},
		process: (e) => {
			if (s = e, r) {
				i = !0;
				return;
			}
			r = !0;
			let o = t;
			t = n, n = o, t.forEach(c), t.clear(), a = void 0, r = !1, i && (i = !1, l.process(e));
		}
	};
	return l;
}
// node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var hn = 40;
function gn(e, t, n = {
	delta: 0,
	timestamp: 0,
	isProcessing: !1
}) {
	let r = !1, i = !0, a = () => r = !0, o = pn.reduce((e, t) => (e[t] = mn(a), e), {}), { setup: s, read: c, resolveKeyframes: l, preUpdate: u, update: d, preRender: f, render: p, postRender: m } = o, h = () => {
		let a = xe.useManualTiming, o = a ? n.timestamp : performance.now();
		r = !1, a || (n.delta = i ? 1e3 / 60 : Math.max(Math.min(o - n.timestamp, hn), 1)), n.timestamp = o, n.isProcessing = !0, s.process(n), c.process(n), l.process(n), u.process(n), d.process(n), f.process(n), p.process(n), m.process(n), n.isProcessing = !1, r && t && (i = !1, e(h));
	}, g = () => {
		r = !0, i = !0, n.isProcessing || e(h);
	};
	return {
		schedule: pn.reduce((e, t) => {
			let n = o[t];
			return e[t] = (e, t = !1, i = !1) => (r || g(), n.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < pn.length; t++) o[pn[t]].cancel(e);
		},
		state: n,
		steps: o
	};
}
// node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: L, cancel: _n, steps: vn } = /* @__PURE__ */ gn(typeof requestAnimationFrame < "u" ? requestAnimationFrame : M, !0, Ze), yn = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => L.update(t, e),
		stop: () => _n(t),
		now: () => Ze.isProcessing ? Ze.timestamp : N.now()
	};
}, bn = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, xn = 2e4;
function Sn(e, t = 50, n = xn, r) {
	let i = 0, a = e.next(i);
	for (r?.push(a.value); !a.done && i < n;) i += t, a = e.next(i), r?.push(a.value);
	return i >= n ? Infinity : i;
}
// node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function Cn(e, t = 100, n) {
	let { keyframes: r, velocity: i } = e, a = r && r[r.length - 1] - r[0], o = n({
		...e,
		velocity: i && a ? i * t / a : i,
		keyframes: [0, t]
	}), s = Math.min(Sn(o), xn);
	return {
		type: "keyframes",
		ease: (e) => o.next(s * e).value / t,
		duration: /* @__PURE__ */ Ae(s)
	};
}
// node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var wn = 100, Tn = 10, En = 1, Dn = 800, On = .3, kn = .3, An = .01, jn = 2, Mn = .005, Nn = .5, Pn = .01, Fn = 10, In = .05, Ln = (e) => e < 0 ? 1 / Math.max(1 + e, In) : Math.max(1 - e, In);
function Rn(e, t) {
	if (!(e > 1)) return 1;
	let n = Math.sqrt(e * e - 1), r = e - n, i = e + n, a = 2 * n * Math.exp(-t) * (1 + t);
	return Vn((e) => i * Math.exp(-r * e) - r * Math.exp(-i * e) - a, (e) => Math.exp(-i * e) - Math.exp(-r * e), t) / t;
}
function zn(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var Bn = 12;
function Vn(e, t, n) {
	let r = n;
	for (let n = 1; n < Bn; n++) r -= e(r) / t(r);
	return r;
}
var Hn = .001;
function Un({ duration: e = Dn, bounce: t = On }) {
	let n, r, i = Ln(t);
	e = j(Pn, Fn, /* @__PURE__ */ Ae(e)), i < 1 ? (n = (t) => {
		let n = t * i, r = n * e, a = zn(t, i), o = Math.exp(-r);
		return Hn - n / a * o;
	}, r = (t) => {
		let r = t * i * e, a = i * i * t * t * e, o = Math.exp(-r), s = zn(t * t, i);
		return (-n(t) + Hn > 0 ? -1 : 1) * -a * o / s;
	}) : (n = (t) => -.001 + Math.exp(-t * e) * (t * e + 1), r = (t) => Math.exp(-t * e) * (-t * (e * e)));
	let a = 5 / e, o = Vn(n, r, a), s = o * Rn(i, o * e), c = s * s;
	return {
		stiffness: c,
		damping: i * 2 * Math.sqrt(c),
		duration: /* @__PURE__ */ ke(e)
	};
}
var Wn = (e, t) => (t ? e >= 0 : e > 0) && e < Infinity;
function Gn(e, t) {
	if (Wn(e, t)) return e;
}
function Kn(e) {
	let t = Gn(e.stiffness), n = Gn(e.damping, !0), r = Gn(e.mass), i = {
		...e,
		stiffness: t ?? wn,
		damping: n ?? Tn,
		mass: r ?? En,
		isResolvedFromDuration: !1,
		isTimeDefined: (t ?? n ?? r) === void 0 && (e.duration !== void 0 || e.bounce !== void 0)
	};
	if (i.isTimeDefined) {
		if (e.visualDuration) {
			let t = Ln(e.bounce || 0), n = 2 * Math.PI / (e.visualDuration * 1.2) * Rn(t, 2 * Math.PI / 1.2);
			i.stiffness = n * n, i.damping = 2 * t * Math.sqrt(i.stiffness);
		} else Object.assign(i, Un(i)), i.isResolvedFromDuration = !0;
		Wn(i.stiffness) && Wn(i.damping, !0) || (i.stiffness = wn, i.damping = Tn);
	}
	return i;
}
function qn(e = kn, t = On) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, r = n.keyframes[0], i = n.keyframes[n.keyframes.length - 1], a = {
		done: !1,
		value: r
	}, { stiffness: o, damping: s, mass: c, duration: l, isResolvedFromDuration: u, isTimeDefined: d } = Kn({ ...n }), f = (e) => u ? 0 : -/* @__PURE__ */ Ae(e), p = s / (2 * Math.sqrt(o * c)), m = /* @__PURE__ */ Ae(Math.sqrt(o / c)), h = p * m, g = {
		target: i,
		delta: i - r,
		velocity: f(n.velocity) || 0,
		restSpeed: 0,
		restDelta: 0
	}, _ = () => {
		let e = Math.abs(g.delta) < 5;
		g.restSpeed = n.restSpeed || (e ? An : jn), g.restDelta = n.restDelta || (e ? Mn : Nn);
	};
	_();
	let v, y, b;
	if (p < 1) {
		let e = zn(m, p), t = {
			A: 0,
			sinC: 0,
			cosC: 0,
			t: -1,
			env: 0,
			sin: 0,
			cos: 0
		};
		b = () => {
			t.A = (g.velocity + h * g.delta) / e, t.sinC = h * t.A + g.delta * e, t.cosC = h * g.delta - t.A * e;
		};
		let n = (n) => {
			n !== t.t && (t.t = n, t.env = Math.exp(-h * n), t.sin = Math.sin(e * n), t.cos = Math.cos(e * n));
		};
		v = (e) => (n(e), g.target - t.env * (t.A * t.sin + g.delta * t.cos)), y = (e) => (n(e), t.env * (t.sinC * t.sin + t.cosC * t.cos));
	} else if (p === 1) {
		v = (e) => g.target - Math.exp(-m * e) * (g.delta + (g.velocity + m * g.delta) * e);
		let e = { C: 0 };
		b = () => {
			e.C = g.velocity + m * g.delta;
		}, y = (t) => Math.exp(-m * t) * (m * e.C * t - g.velocity);
	} else {
		let e = m * Math.sqrt(p * p - 1), t = h - e, n = h + e, r = e < 1 || d ? Infinity : 300 / e, i = (e, t) => Math.exp(t > r ? (h - e) * r - h * t : -e * t), a = {
			S: 0,
			F: 0
		};
		b = () => {
			let t = (g.velocity + h * g.delta) / e;
			a.S = (g.delta + t) / 2, a.F = (g.delta - t) / 2;
		}, v = (e) => g.target - a.S * i(t, e) - a.F * i(n, e), y = (e) => t * a.S * i(t, e) + n * a.F * i(n, e);
	}
	b();
	let x = u && l || null, S = {
		calculatedDuration: x,
		retarget: (e, t) => {
			g.target = e[e.length - 1], g.delta = g.target - e[0], g.velocity = f(t), n.restSpeed && n.restDelta || _(), S.calculatedDuration = x, a.done = !1, b();
		},
		velocity: (e) => /* @__PURE__ */ ke(y(e)),
		next: (e) => {
			let t = v(e);
			if (u) a.done = e >= l;
			else {
				let n = /* @__PURE__ */ ke(y(e));
				a.done = Math.abs(n) <= g.restSpeed && Math.abs(g.target - t) <= g.restDelta;
			}
			return a.value = a.done ? g.target : t, a;
		},
		toString: () => {
			let e = Math.min(Sn(S), xn), t = bn((t) => S.next(e * t).value, e, 30);
			return e + "ms " + t;
		}
	};
	return S;
}
var Jn = /* @__PURE__ */ Object.assign(qn, { applyToOptions: (e) => {
	let t = Cn(e, 100, qn);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ ke(t.duration), e.type = "keyframes", e;
} });
// node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function Yn({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => e < s || e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o ? o(g) : g;
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => {
		let t = v(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : e ? _ + t : d;
	}, b, x, S = (e) => {
		p(f.value) && (b = e, x = Jn({
			keyframes: [f.value, m(f.value)],
			velocity: -v(e) / r * 1e3,
			damping: i,
			stiffness: a,
			restDelta: l,
			restSpeed: u
		}));
	};
	return S(0), {
		calculatedDuration: null,
		next: (e) => {
			let t = !1;
			return !x && b === void 0 && (t = !0, y(e), S(e)), b !== void 0 && e >= b ? x.next(e - b) : (!t && y(e), f);
		}
	};
}
// node_modules/motion-dom/dist/es/utils/interpolate.mjs
function Xn(e, t, n) {
	let r = [], i = xe.mix || fn, a = e.length - 1;
	for (let o = 0; o < a; o++) {
		let a = n?.(e[o], e[o + 1]) || i(e[o], e[o + 1]);
		t && (a = Ee(Array.isArray(t) ? t[o] || M : t, a)), r.push(a);
	}
	return r;
}
function Zn(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
	let a = e.length;
	if (a === 1) return () => t[0];
	if (a === 2 && t[0] === t[1]) return () => t[1];
	let o = e[0] === e[1];
	e[0] > e[a - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let s = Xn(t, r, i), c = s.length, l = (n) => {
		if (o && n < e[0]) return t[0];
		let r = 0;
		if (c > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
		let i = /* @__PURE__ */ De(e[r], e[r + 1], n);
		return s[r](i);
	};
	return n ? (t) => l(j(e[0], e[a - 1], t)) : l;
}
// node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function Qn(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ De(0, t, r);
		e.push(I(n, 1, i));
	}
}
// node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function $n(e) {
	let t = [0];
	return Qn(t, e.length - 1), t;
}
// node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function er(e, t) {
	return e.map((e) => e * t);
}
// node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function tr(e, t) {
	return e.map(() => t || Ge).splice(0, e.length - 1);
}
function nr({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut", mixer: i }) {
	let a = typeof t[0] == "number" ? void 0 : i, o = /* @__PURE__ */ Ke(r) ? r.map(Xe) : Xe(r) || Ge, s = {
		done: !1,
		value: t[0]
	}, c = -1;
	if (!a) {
		for (let e = 1; e < t.length; e++) if (t[e] !== t[e - 1]) {
			if (c >= 0) {
				c = -2;
				break;
			}
			c = e - 1;
		}
	}
	if (c >= 0) {
		let r = n && n.length === t.length ? n : $n(t), i = r[c] * e, a = r[c + 1] * e, l = t[c], u = t[c + 1], d = Array.isArray(o) ? o[c] : o, f = (xe.mix || fn)(l, u), p = t.length - 2;
		return {
			calculatedDuration: e,
			next: (t) => (s.value = c && t < i ? f(0) : c < p && (t >= a || !e) ? typeof u == "number" ? u : f(1) : f(d(t >= a || !e ? 1 : t <= i ? 0 : (t - i) / (a - i))), s.done = t >= e, s)
		};
	}
	let l = Zn(er(n && n.length === t.length ? n : $n(t), e), t, {
		ease: Array.isArray(o) ? o : tr(t, o),
		mixer: a
	});
	return {
		calculatedDuration: e,
		next: (t) => (s.value = l(t), s.done = t >= e, s)
	};
}
// node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var rr = 5;
function ir(e, t, n) {
	let r = Math.max(t - rr, 0);
	return /* @__PURE__ */ je(n - e(r), t - r);
}
function ar(e, t, n = 0) {
	return t <= 0 ? n : e.velocity ? e.velocity(t) : ir((t) => e.next(t).value, t, e.next(t).value);
}
// node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
function or(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a, o, s = 0;
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		n !== null && (s++ || (a = n), o = n);
	}
	let c = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : s - 1;
	return !c || r === void 0 ? c ? o : a : r;
}
// node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var sr = {
	decay: Yn,
	inertia: Yn,
	tween: nr,
	keyframes: nr,
	spring: Jn
};
function cr(e) {
	typeof e.type == "string" && (e.type = sr[e.type]);
}
// node_modules/motion-dom/dist/es/animation/utils/resolve-start-time.mjs
var lr = 40, ur = (e, t) => t - e > lr && !xe.useManualTiming ? t : e;
// node_modules/motion-dom/dist/es/animation/utils/notify-inspector.mjs
function dr(e, t) {
	return {
		kind: e,
		animation: t,
		timestamp: N.now(),
		frameTimestamp: Ze.timestamp,
		frameIsProcessing: Ze.isProcessing
	};
}
function fr(e, t, n) {
	let r = globalThis.__MOTION_INSPECT__;
	if (r) try {
		r({
			...dr("animation-start", e),
			options: n ? {
				...t,
				...n
			} : t
		});
	} catch {}
}
function pr(e, t) {
	let n = globalThis.__MOTION_INSPECT__;
	if (n) try {
		n({
			...dr("layout-animation-start", e),
			node: t
		});
	} catch {}
}
// node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var mr = class {
	constructor() {
		this.isResolved = !1;
	}
	get finished() {
		return this._finished ||= this.isResolved ? Promise.resolve() : new Promise((e) => {
			this._resolve = e;
		}), this._finished;
	}
	updateFinished() {
		this._finished = this._resolve = void 0, this.isResolved = !1;
	}
	notifyFinished() {
		this.isResolved = !0, this._resolve?.();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
}, hr = (e) => e / 100, gr = (e) => Math.round(e * 1e4) / 1e4, _r = class extends mr {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options, t = N.now();
			e && e.updatedAt !== t && this.tick(e.updatedAt = t), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause(), fr(this, this.options);
	}
	initAnimation() {
		let { options: e } = this;
		cr(e);
		let { type: t = nr, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || nr;
		this.mixKeyframes = void 0, s !== nr && typeof o[0] != "number" && (this.mixKeyframes = Ee(hr, e.mixer?.(o[0], o[1]) || fn(o[0], o[1])), o = [0, 100]);
		let c = s(o === e.keyframes ? e : {
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = Sn(c));
		let { calculatedDuration: l } = c;
		this.calculatedDuration = l, this.resolvedDuration = l + r, this.totalDuration = this.resolvedDuration * (n + 1) - r, this.generator = c;
	}
	updateTime(e) {
		this.currentTime = this.holdTime ?? Math.round(e - this.startTime) * this.playbackSpeed;
	}
	tick(e, t = !1) {
		let { generator: n, totalDuration: r, calculatedDuration: i } = this;
		if (this.startTime === null) return n.next(0);
		let { delay: a = 0, keyframes: o, type: s, onUpdate: c, finalKeyframe: l } = this.options;
		this.startTime === this.pendingStartTime && (this.startTime = ur(this.startTime, e)), this.pendingStartTime = void 0, this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), t ? this.currentTime = e : this.updateTime(e);
		let u = this.currentTime - a * (this.playbackSpeed >= 0 ? 1 : -1), d = this.playbackSpeed >= 0 ? u < 0 : u > r;
		this.currentTime = Math.max(u, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
		let f = this.generate(this.currentTime, d), { done: p } = f;
		d || (p = this.playbackSpeed >= 0 ? i < Infinity ? this.currentTime >= r : p : this.currentTime <= 0);
		let m = this.holdTime === null && (this.state === "finished" || this.state === "running" && p);
		return m && s !== Yn && (f.value = or(o, this.options, l, this.speed)), c && c(f.value), m && this.finish(), f;
	}
	at(e) {
		return this.holdTime ?? gr((e - this.startTime) * this.playbackSpeed);
	}
	sampleAt(e, t) {
		let { options: n, totalDuration: r } = this, i = this.at(e) - (n.delay || 0);
		return i >= r && n.type !== Yn ? or(n.keyframes, n, t ? void 0 : n.finalKeyframe) : this.generate(Math.max(i, 0), i < 0).value;
	}
	generate(e, t) {
		let { generator: n, totalDuration: r, mixKeyframes: i, mirroredGenerator: a, resolvedDuration: o } = this, { keyframes: s, repeat: c, repeatType: l, repeatDelay: u } = this.options, d = e, f = n;
		if (c) {
			let t = Math.min(e, r) / o, n = Math.floor(t), i = t % 1;
			!i && t >= 1 && (i = 1), i === 1 && n--, n = Math.min(n, c + 1), n % 2 && (l === "reverse" ? (i = 1 - i, u && (i -= u / o)) : l === "mirror" && (f = a)), d = j(0, 1, i) * o;
		}
		let p;
		return t ? (this.delayState.value = s[0], p = this.delayState) : p = f.next(d), i && !t && (p.value = i(p.value)), p;
	}
	get duration() {
		return /* @__PURE__ */ Ae(this.calculatedDuration);
	}
	get iterationDuration() {
		return this.duration + /* @__PURE__ */ Ae(this.options.delay ?? 0);
	}
	get time() {
		return /* @__PURE__ */ Ae(this.currentTime);
	}
	set time(e) {
		this.state === "finished" && this.updateFinished(), e = /* @__PURE__ */ ke(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
	}
	getGeneratorVelocity() {
		return ar(this.generator, this.currentTime, this.options.velocity);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(N.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ Ae(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = yn, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? (this.pendingStartTime = n) : this.startTime = n - this.holdTime / (this.playbackSpeed || 1), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(N.now()), this.holdTime = this.currentTime;
	}
	complete() {
		this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
	}
	finish() {
		this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle", this.driver?.stop(), this.driver = void 0, this.startTime = this.holdTime = null;
	}
	sample(e) {
		return this.startTime = 0, this.tick(e, !0);
	}
	attachTimeline(e) {
		return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
	}
}, vr = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function yr(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(ut) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!vr.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var br = /\b([a-z-]*)\(.*?\)/gu, xr = {
	...qt,
	getAnimatableNone: (e) => {
		let t = e.match(br);
		return t ? t.map(yr).join(" ") : e;
	}
}, Sr = {
	...qt,
	getAnimatableNone: (e) => {
		let t = qt.parse(e);
		return qt.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, Cr = {
	...st,
	transform: Math.round
}, wr = {
	rotate: St,
	pathRotation: St,
	rotateX: St,
	rotateY: St,
	rotateZ: St,
	scale: lt,
	scaleX: lt,
	scaleY: lt,
	scaleZ: lt,
	skew: St,
	skewX: St,
	skewY: St,
	distance: P,
	translateX: P,
	translateY: P,
	translateZ: P,
	x: P,
	y: P,
	z: P,
	perspective: P,
	transformPerspective: P,
	opacity: ct,
	originX: Et,
	originY: Et,
	originZ: P
}, Tr = {
	borderWidth: P,
	borderTopWidth: P,
	borderRightWidth: P,
	borderBottomWidth: P,
	borderLeftWidth: P,
	borderRadius: P,
	borderTopLeftRadius: P,
	borderTopRightRadius: P,
	borderBottomRightRadius: P,
	borderBottomLeftRadius: P,
	width: P,
	maxWidth: P,
	height: P,
	maxHeight: P,
	top: P,
	right: P,
	bottom: P,
	left: P,
	inset: P,
	insetBlock: P,
	insetBlockStart: P,
	insetBlockEnd: P,
	insetInline: P,
	insetInlineStart: P,
	insetInlineEnd: P,
	padding: P,
	paddingTop: P,
	paddingRight: P,
	paddingBottom: P,
	paddingLeft: P,
	paddingBlock: P,
	paddingBlockStart: P,
	paddingBlockEnd: P,
	paddingInline: P,
	paddingInlineStart: P,
	paddingInlineEnd: P,
	margin: P,
	marginTop: P,
	marginRight: P,
	marginBottom: P,
	marginLeft: P,
	marginBlock: P,
	marginBlockStart: P,
	marginBlockEnd: P,
	marginInline: P,
	marginInlineStart: P,
	marginInlineEnd: P,
	fontSize: P,
	backgroundPositionX: P,
	backgroundPositionY: P,
	...wr,
	zIndex: Cr,
	fillOpacity: ct,
	strokeOpacity: ct,
	numOctaves: Cr
}, Er = {
	...Tr,
	color: Ot,
	backgroundColor: Ot,
	outlineColor: Ot,
	fill: Ot,
	stroke: Ot,
	borderColor: Ot,
	borderTopColor: Ot,
	borderRightColor: Ot,
	borderBottomColor: Ot,
	borderLeftColor: Ot,
	filter: xr,
	WebkitFilter: xr,
	mask: Sr,
	WebkitMask: Sr
}, Dr = (e) => Er[e], Or = /*@__PURE__*/ new Set([xr, Sr]), kr, Ar, jr;
function Mr(e, t) {
	if (e === kr && t === Ar) return jr;
	let n = Dr(e);
	return Or.has(n) || (n = qt), jr = n.getAnimatableNone ? n.getAnimatableNone(t) : void 0, kr = e, Ar = t, jr;
}
// node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function Nr(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
// node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var Pr = (e) => e * 180 / Math.PI, Fr = (e) => Lr(Pr(Math.atan2(e[1], e[0]))), Ir = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scaleZ: () => 1,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: Fr,
	rotateZ: Fr,
	skewX: (e) => Pr(Math.atan(e[1])),
	skewY: (e) => Pr(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Lr = (e) => (e %= 360, e < 0 && (e += 360), e), Rr = Fr, zr = (e) => Math.hypot(e[0], e[1]), Br = (e) => Math.hypot(e[4], e[5]), Vr = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: zr,
	scaleY: Br,
	scaleZ: (e) => Math.hypot(e[8], e[9], e[10]),
	scale: (e) => (zr(e) + Br(e)) / 2,
	rotateX: (e) => Lr(Pr(Math.atan2(e[6], e[5]))),
	rotateY: (e) => Lr(Pr(Math.atan2(-e[2], e[0]))),
	rotateZ: Rr,
	rotate: Rr,
	skewX: (e) => Pr(Math.atan(e[4])),
	skewY: (e) => Pr(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Hr(e) {
	return +!!e.includes("scale");
}
function Ur(e, t) {
	if (!e || e === "none") return Hr(t);
	let n = e.match(/^matrix(3d)?\(([-\d.e\s,]+)\)$/u);
	if (!n) return Hr(t);
	let r = (n[1] ? Vr : Ir)[t], i = n[2].split(",").map((e) => parseFloat(e));
	return typeof r == "function" ? r(i) : i[r];
}
var Wr = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return Ur(n, t);
}, Gr = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"scaleZ",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
], Kr = /* @__PURE__ */ new Set([...Gr, "pathRotation"]), qr = (e) => e === st || e === P, Jr = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), Yr = /* @__PURE__ */ Gr.filter((e) => !Jr.has(e));
function Xr(e) {
	let t = [];
	return Yr.forEach((n) => {
		let r = e.getValue(n);
		if (r !== void 0) {
			let e = r.get(), i = +!!n.startsWith("scale");
			if (e === i) return;
			t.push([n, e]), r.set(i);
		}
	}), t;
}
var Zr = /* @__PURE__ */ new Set(["bottom", "right"]);
function Qr(e, t, n, r, i, a) {
	let o = parseFloat(e);
	if (!isNaN(o)) return o;
	let { min: s, max: c } = t()[n], l = c - s;
	return a === "border-box" ? l : l - parseFloat(r) - parseFloat(i);
}
var $r = ({ transform: e }) => Ur(e, "x"), ei = ({ transform: e }) => Ur(e, "y"), ti = {
	width: ({ width: e, paddingLeft: t = "0", paddingRight: n = "0", boxSizing: r }, i) => Qr(e, i, "x", t, n, r),
	height: ({ height: e, paddingTop: t = "0", paddingBottom: n = "0", boxSizing: r }, i) => Qr(e, i, "y", t, n, r),
	top: ({ top: e }) => parseFloat(e),
	left: ({ left: e }) => parseFloat(e),
	bottom: ({ top: e }, t) => {
		let { y: n } = t();
		return parseFloat(e) + (n.max - n.min);
	},
	right: ({ left: e }, t) => {
		let { x: n } = t();
		return parseFloat(e) + (n.max - n.min);
	},
	x: $r,
	y: ei,
	translateX: $r,
	translateY: ei
}, ni = /* @__PURE__ */ new Set(), ri = !1, ii = !1, ai = !1;
function oi() {
	if (ii) {
		let e = [], t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		ni.forEach((r) => {
			r.needsMeasurement && (e.push(r), t.add(r.element), Zr.has(r.name) && n.add(r.element));
		});
		let r = /* @__PURE__ */ new Map();
		n.forEach((e) => {
			let t = Xr(e);
			t.length && (r.set(e, t), e.render());
		}), e.forEach((e) => e.measureInitialState()), t.forEach((e) => {
			e.render();
			let t = r.get(e);
			t && t.forEach(([t, n]) => {
				e.getValue(t)?.set(n);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	ii = !1, ri = !1, ni.forEach((e) => e.complete(ai)), ni.clear();
}
function si() {
	ni.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (ii = !0);
	});
}
function ci() {
	ai = !0, si(), oi(), ai = !1;
}
function li(e, t, n) {
	if (typeof e == "string") {
		if (Se(e) || we(e)) return parseFloat(e);
		if (!qt.test(e) && qt.test(n)) return Mr(t, n);
	}
	return e ?? void 0;
}
var ui = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (ni.add(this), ri || (ri = !0, L.read(si), L.resolveKeyframes(oi))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
		if (e[0] === null) {
			let i = r?.get(), a = e[e.length - 1];
			if (i !== void 0) e[0] = i;
			else if (n && t) {
				let r = li(n.readValue(t, a), t, a);
				r !== void 0 && (e[0] = r);
			}
			e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
		}
		Nr(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ni.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (ni.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, di = (e) => e.startsWith("--");
// node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function fi(e, t, n) {
	di(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
// node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var pi = {};
// node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function mi(e, t) {
	let n = /* @__PURE__ */ Te(e);
	return () => pi[t] ?? n();
}
// node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var hi = /* @__PURE__ */ mi(() => window.ScrollTimeline !== void 0, "scrollTimeline"), gi = /*@__PURE__*/ mi(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), _i = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, vi = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ _i([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ _i([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ _i([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ _i([
		.33,
		1.53,
		.69,
		.99
	])
};
// node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function yi(e, t) {
	if (e) return typeof e == "function" ? gi() ? bn(e, t) : "ease-out" : /* @__PURE__ */ qe(e) ? _i(e) : Array.isArray(e) ? e.map((e) => yi(e, t) || vi.easeOut) : vi[e];
}
// node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function bi(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = yi(s, i);
	Array.isArray(d) && (u.easing = d);
	let f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? "linear" : d,
		fill: "both",
		iterations: a + 1,
		direction: o === "reverse" ? "alternate" : "normal"
	};
	return l && (f.pseudoElement = l), e.animate(u, f);
}
// node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function xi(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
// node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function Si({ type: e, ...t }) {
	return xi(e) && gi() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
// node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var Ci = class extends mr {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e;
		let c = Si(e);
		this.animation = bi(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = this.onFinish = () => {
			if (this.animation.onfinish = null, this.finishedTime = this.time, !i) {
				let e = or(r, this.options, o, this.speed);
				this.updateMotionValue?.(e), fi(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		}, fr(this, e, c);
	}
	play() {
		this.isStopped || (this.manualStartTime = null, this.animation.onfinish = this.onFinish, this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.isStopped || (this.animation.onfinish = this.onFinish), this.animation.finish?.();
	}
	cancel() {
		this.animation.onfinish = null;
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		this.isStopped || (this.isStopped = !0, this.state !== "idle" && this.finishedTime === null && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel()));
	}
	commitStyles() {
		let e = this.options?.element;
		!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ Ae(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ Ae(e);
	}
	get time() {
		return /* @__PURE__ */ Ae(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ ke(e), t && (this.animation.pause(), this.updateFinished());
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(e) {
		this.manualStartTime = this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, onAttach: t, observe: n }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = this.onFinish = null, e && hi() ? (this.animation.timeline = e, t?.(this.animation), M) : n(this);
	}
}, wi = {
	anticipate: ze,
	backInOut: Re,
	circInOut: He
};
function Ti(e) {
	return e in wi;
}
function Ei(e) {
	typeof e.ease == "string" && Ti(e.ease) && (e.ease = wi[e.ease]);
}
var Di = class extends Ci {
	constructor(e) {
		Ei(e), cr(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	elapsed() {
		return this.state === "running" ? (N.now() - this.startTime) * this.speed : this.time * 1e3;
	}
	sample(e) {
		if (!this.sampler) {
			let { motionValue: e, onUpdate: t, onComplete: n, onPlay: r, onStop: i, element: a, ...o } = this.options;
			this.sampler = new _r({
				...o,
				autoplay: !1
			}), this.sampler.stop();
		}
		return this.sampler.sample(Math.max(0, e)).value;
	}
	liveValue() {
		let { state: e } = this;
		if (e === "running" || e === "paused") return this.sample(this.elapsed());
	}
	updateMotionValue(e) {
		let { motionValue: t, element: n, name: r } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let { speed: i } = this, a = this.elapsed(), o = this.state === "running" && i ? j(0, 10, a) : 0, s = this.sample(a);
		n && r && fi(n, r, s), t.setWithVelocity(this.sample(a - o * Math.sign(i)), s, o / Math.abs(i || 1));
	}
}, Oi = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (qt.test(e) || e === "0") && !e.startsWith("url("));
// node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function ki(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Ai(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = Oi(i, t), s = Oi(a, t);
	return !o || !s ? !1 : ki(e) || (n === "spring" || xi(n)) && r;
}
// node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function ji(e) {
	e.duration = 0, e.type = "keyframes";
}
// node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var Mi = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform"
]), Ni = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Pi(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && Ni.test(e[t])) return !0;
	return !1;
}
// node_modules/motion-dom/dist/es/animation/waapi/utils/needs-mixer.mjs
var Fi = ({ mixer: e, keyframes: t }) => e && typeof t[0] != "number" && t.some((n, r) => r && e(t[r - 1], n)), Ii = /* @__PURE__ */ new Set([
	"color",
	"backgroundColor",
	"outlineColor",
	"fill",
	"stroke",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor"
]), Li = () => !xe.useManualTiming && Object.hasOwnProperty.call(Element.prototype, "animate");
function Ri(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e;
	if (!n || !(Mi.has(n) || Ii.has(n))) return !1;
	let c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return Li() && (Mi.has(n) || Ii.has(n) && Pi(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia" && !Fi(e);
}
// node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var zi = (e, t) => t && typeof e == "number" ? t.transform(e) : e, Bi = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, Vi = Gr.length, Hi = {}, Ui = (e, t, n = zi(t, wr[e])) => (Hi[e] || (Hi[e] = (Bi[e] || e) + "(")) + n + ")", Wi = (e, t) => (typeof t == "number" ? t : parseFloat(t)) === +!!e.startsWith("scale");
function Gi(e, t, n) {
	let r = "";
	for (let i = 0; i < Vi; i++) {
		let a = Gr[i], o = e[a];
		if (o === void 0) continue;
		let s = n && (t[a] = zi(o, Tr[a]));
		Wi(a, o) || (r += Ui(a, o, s || void 0) + " ");
	}
	let i = e.pathRotation;
	return i && (r += Ui("rotate", i)), r = r.trim(), n ? n(t, r) : r || "none";
}
// node_modules/motion-dom/dist/es/animation/waapi/transforms/groups.mjs
var Ki = /* @__PURE__ */ new WeakMap(), qi = 200, Ji = .001, Yi = .1, Xi = .001, Zi = 100, Qi = 100, $i = /* @__PURE__ */ new Set([
	"linear",
	"easeIn",
	"easeOut",
	"easeInOut"
]), ea = (e) => $i.has(e), ta = /* @__PURE__ */ new WeakMap(), na = (e, t) => {
	let n = ta.get(e);
	return n?.[0] !== t && (n = [t, "linear(" + $n(Array(t + 1)).map((t) => gr(e(t)) + " " + gr(t * 100) + "%") + ")"], ta.set(e, n)), n[1];
}, ra = (e, t) => Math.min(qi, Math.max(2, Math.ceil((t - e) / 10))), ia = (e, t) => Math.abs(e - t) <= Ji, aa = (e, t) => e - t, oa = (e, t, n) => $n(Array(n + 1)).map((n) => I(e, t, n)), R = (e) => e.motionValue.owner, sa = (e) => Ki.get(e), ca = ({ state: e }) => e === "idle" || e === "finished", la = (e, t) => e.latestValues ? e.latestValues[t] : e.getValue(t)?.get(), ua = ({ name: e, motionValue: t }) => e && Gr.includes(e) && t?.owner?.current instanceof HTMLElement && Li() && gi();
function da(e) {
	let t = R(e), { onUpdate: n, transformTemplate: r } = t.getProps();
	return !e.isHandoff && !n && !e.hasOnUpdate && !r && e.type !== "inertia" && (la(t, "transform") || "none") === "none" && !la(t, "pathRotation") && !t.projection?.isProjecting() && !Fi(e);
}
var fa = class {
	constructor(e, t, n, r) {
		this.element = e, this.update = t, this.makeDriver = n, this.animation = r;
	}
	get js() {
		return this.driver ||= this.makeDriver(this.update);
	}
	now() {
		return this.driver || this.makeDriver !== yn ? this.js.now() : Ze.isProcessing ? Ze.timestamp : N.now();
	}
	start(e = !0) {
		let t = sa(this.element);
		!t || t.isJS ? this.js.start(e) : t.schedule(!1, !e);
	}
	stopJS() {
		this.driver?.stop();
	}
	stop() {
		this.stopJS();
		let e = sa(this.element);
		e && !e.isFinishing && e.release(this.animation);
	}
}, pa, ma = class extends _r {
	constructor(e) {
		let t = R(e).current, { driver: n = yn } = e, r, i = da(e);
		e.driver = (e) => new fa(t, e, n, r), super(e), r = this;
		let a = this.driver;
		a && (a.animation = this), this.canAccelerate = i;
		let { stop: o } = this;
		this.stop = () => {
			this.isAccelerated() && this.sync(), o();
		};
	}
	offsets() {
		let { keyframes: e, times: t } = this.options;
		return t || (this.offsetsOf !== e && (this.offsetsOf = e, this.cachedOffsets = $n(e)), this.cachedOffsets);
	}
	get group() {
		return sa(R(this.options).current);
	}
	get js() {
		return this.driver?.js;
	}
	stopJS() {
		this.driver?.stopJS();
	}
	get name() {
		return this.options.name;
	}
	timing() {
		let { startTime: e, speed: t, totalDuration: n } = this, { delay: r = 0, repeatType: i } = this.options;
		return this.holdTime === null ? n === Infinity ? [e + r / t, this.resolvedDuration * (i === "loop" ? 1 : 2) / t || 1] : [e + (r + n) / t, 0] : [Infinity, 0];
	}
	isAccelerated() {
		let { group: e, state: t } = this;
		return e?.tracks.has(this) && !e.isJS && this.canAccelerate && (t === "running" || t === "paused");
	}
	liveValue() {
		return this.isAccelerated() ? this.sampleAt(N.now()) : void 0;
	}
	tween() {
		let { keyframes: e, type: t, repeat: n, delay: r = 0 } = this.options, i = -1;
		if (n || t !== nr || this.holdTime !== null) return;
		for (let t = 1; t < e.length; t++) if (e[t] !== e[t - 1]) {
			if (i >= 0) return;
			i = t - 1;
		}
		let { ease: a } = this.options;
		/* @__PURE__ */ Ke(a) && (a = a[i]);
		let o = this.offsets(), s = (e) => this.startTime + (r + o[e] * this.totalDuration) / this.speed;
		if (i >= 0) {
			let e = /* @__PURE__ */ qe(a) ? _i(a) : ea(a) ? vi[a] : Xe(a);
			return [
				s(i),
				s(i + 1),
				typeof e == "string" || ia(e(0), 0) && ia(e(1), 1) ? e : void 0
			];
		}
	}
	boundaries(e, t) {
		let { startTime: n, speed: r, resolvedDuration: i, options: a } = this, { delay: o = 0, repeat: s = 0, repeatDelay: c = 0, repeatType: l, type: u } = a, d = (u || nr) === nr ? this.offsets() : [0, 1], f = n + o / r, p = [];
		if (this.holdTime !== null || !(i > 0)) return p;
		for (let n = Math.max(0, Math.floor((e - f) * r / i)); n <= s; n++) {
			let a = f + n * i / r;
			if (a > t) break;
			for (let o of d) {
				let s = a + (n % 2 && l && l !== "loop" ? 1 - o : o) * (i - c) / r;
				s > e && s < t && p.push(s);
			}
		}
		return p;
	}
	numberAt(e) {
		return parseFloat(this.sampleAt(e, !0));
	}
	sync() {
		let e = N.now(), t = this.sampleAt(e, !0);
		this.options.motionValue.setWithVelocity(this.holdTime === null ? this.sampleAt(e - 10, !0) : t, t, 10);
	}
	play() {
		this.isStopped || ((this.group || _a(R(this.options))).tracks.add(this), super.play());
	}
	pause() {
		super.pause(), this.isAccelerated() && this.group.schedule(!1);
	}
	complete() {
		super.complete();
		let { group: e } = this;
		e && !e.isJS && this.tick(N.now());
	}
	get time() {
		return this.isAccelerated() ? /* @__PURE__ */ Ae(j(0, this.totalDuration, this.at(N.now()) - (this.options.delay || 0))) : super.time;
	}
	set time(e) {
		(pa ??= Object.getOwnPropertyDescriptor(_r.prototype, "time").set).call(this, e);
	}
	attachTimeline(e) {
		return this.canAccelerate = !1, this.group?.demote(!0), super.attachTimeline(e);
	}
}, ha, ga = (e) => {
	ha || queueMicrotask(() => {
		let e = ha;
		ha = void 0, e.forEach((e) => e());
	}), (ha ||= []).push(e);
};
function _a(e) {
	let t = e.current, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = {}, a = [], o = /* @__PURE__ */ new Map(), s = [], c = !1, l = !1, u = !1, d = !1, f = -Infinity, p, m = Infinity, h, g = (e) => {
		for (let t of n) if (t.name === e) return !0;
	}, _ = (t, n) => {
		let o = {};
		for (let s of t === void 0 ? Gr : a) {
			let a = r.get(s), c = t === void 0 ? la(e, s) : a ? a.sampleAt(n > t && !a.timing()[1] ? n : t) : i[s];
			c !== void 0 && (o[s] = c);
		}
		return o;
	}, v = (e, t) => {
		let n = "";
		for (let r in e) {
			let i = e[r];
			t && Wi(r, i) || (n += Ui(r, i) + " ");
		}
		return (t ? n.trim() : n) || "none";
	}, y = (e, t) => v(_(e, t)), b = (e = _()) => {
		t.style.transform = v(e, !0);
	}, x = (e) => {
		e.onfinish = e.oncancel = null, e.cancel();
	}, S = (e = !0) => {
		clearTimeout(p), m = Infinity, h = void 0, e && b(), s.forEach(({ animation: e }) => x(e)), s = [];
	}, C = (e, n) => new Animation(new KeyframeEffect(t, e, n)), w = (e, t, n = Infinity) => {
		let r = {
			animation: e,
			offset: t,
			end: n
		};
		e.startTime = N.now() + t, n < Infinity && (e.onfinish = () => {
			r.isDone = !0, s.some((e) => e.end === Infinity) && (x(e), s = s.filter((e) => e !== r)), k.schedule(!1);
		}), e.oncancel = () => s.includes(r) && k.demote(), s.push(r);
	}, T = (e, t, n) => {
		let r = (t, n) => Math.abs(e(n) - e(t)), i = r(t, n);
		for (; n - t > .01;) {
			let e = (t + n) / 2;
			r(t, e) > r(e, n) ? n = e : t = e;
		}
		return r(t, n) > i / 2 ? [t, n] : [];
	}, E = (e, t, n, r) => {
		let i = ra(t, n);
		if (r.length * 4 > i) return;
		let a;
		for (let r of e) {
			let e = r.numberAt(t), i = (r.numberAt((t + n) / 2) - e) / (r.numberAt(n) - e);
			if (i === i) {
				if (a === void 0) a = i;
				else if (!ia(i, a)) return;
			}
		}
		let o = oa(t, n, i).concat(r).sort(aa), s = (e) => /* @__PURE__ */ De(t, n, e), c, l;
		for (let n of e) {
			let e = n.numberAt(t), r = o.map((t) => n.numberAt(t) - e), i = r[r.length - 1], a = r.some((e) => Math.abs(e) * Ji > Math.abs(i)) ? 0 : i, s = r.map((e) => a ? e / a : e);
			if (a && !c) c = s, l = (t) => (n.numberAt(t) - e) / a;
			else if (s.some((e, t) => !ia(e, a && c[t]))) return;
		}
		if (!c || c.every((e, t) => ia(e, s(o[t])))) return "linear";
		let u = [], d = (e, t = l(e)) => u.push(gr(t) + " " + gr(s(e) * 100) + "%");
		return c.forEach((e, t) => {
			t && Math.abs(e - c[t - 1]) > .2 && T(l, o[t - 1], o[t]).forEach((e) => d(e)), d(o[t], e);
		}), "linear(" + u + ")";
	}, D = (e, t, n, r) => {
		let i = [t], a = [], o = n, s = t;
		for (let r of e) {
			let e = r.tween();
			if (e?.[2] !== "linear") {
				let [i, c] = r.timing(), [l, u] = e || [t, c ? n : i];
				o = Math.min(o, l), s = Math.max(s, u), a.push(r);
			}
		}
		o = Math.max(t, o), s = Math.min(n, s);
		let c = (e, t) => a.every((n) => !(Math.abs(n.numberAt((e + t) / 2) - (n.numberAt(e) + n.numberAt(t)) / 2) > (n.name.startsWith("scale") ? Xi : Yi))), l = (t, n, r) => {
			if (n - t < 1 || c(t, n)) i.push(n);
			else if (r < 4) l(t, (t + n) / 2, r + 1), l((t + n) / 2, n, r + 1);
			else {
				for (let r of e) i.push(...T((e) => r.numberAt(e), t, n));
				i.push(n);
			}
		}, u = s > o ? oa(o, s, Math.ceil((s - o) / 100)) : [];
		u.push(n);
		for (let e of r) u.push(e, Math.min(e + .01, n));
		let d = t;
		for (let e of u.sort(aa)) e > d && l(d, e, 0), d = e;
		return i.sort(aa);
	}, ee = (e) => {
		let t;
		for (let n of e) {
			let e = n.tween();
			if (!e || t && (Math.abs(e[0] - t[0]) > 1 || Math.abs(e[1] - t[1]) > 1)) return;
			t = [
				e[0],
				e[1],
				!t || e[2] === t[2] ? e[2] : void 0
			];
		}
		return t;
	}, O = (e, t, n, r, i = { fill: "both" }, a) => {
		let o = r ? [] : e.flatMap((e) => e.boundaries(t, n)), s = r || E(e, t, n, o), c = s ? [t, n] : D(e, t, n, o), l = c.map((e) => y(e, a)), u = { transform: l };
		return s || (u.offset = c.map((e) => /* @__PURE__ */ De(t, n, e))), l.every((e) => e === l[0]) && (b(_(t, a)), u = null), C(u, {
			...i,
			duration: n - t,
			easing: s || "linear"
		});
	}, te = (e) => {
		let t = N.now() + e;
		t < m && (clearTimeout(p), m = t, p = setTimeout(() => {
			m = Infinity, k.schedule(!1);
		}, e));
	}, ne = (t) => {
		let c = t, l = 0, u = 0, d = [], f = [], p = /* @__PURE__ */ new Set();
		r.clear(), o = /* @__PURE__ */ new Map();
		for (let e of n) {
			r.set(e.name, e);
			let [n, i] = e.timing(), a = n === Infinity;
			if (o.set(e, [
				e.at(t),
				e.speed,
				a
			]), !a) {
				if (e.speed < 0) return;
				if (i) {
					if (l) {
						let e = (n - u) / i;
						if (Math.abs(i - l) > 1 || Math.abs(e - Math.round(e)) * l > 1) return;
					} else l = i, u = n;
					f.push(e);
				} else p.add(n);
				d.push(e), c = Math.max(c, n);
			}
		}
		i = {}, a = Gr.filter((t) => {
			if (r.has(t)) return !0;
			let n = i[t] = la(e, t);
			return n !== void 0 && !Wi(t, n);
		}), S(!1);
		let m = !l && ee(d);
		try {
			if (c > t) {
				let e;
				if (m && m[1] > t) {
					let [n, r, i] = m;
					if (n - t > Qi) return d.forEach((e) => e.sync()), te(h = n - t - Qi), !0;
					e = typeof i == "string" ? i : i ? na(i, ra(n, r)) : E(d, n, r, []), e && w(O(d, n, r, e, {
						fill: "both",
						endDelay: c - r
					}), n - t, c - n);
				}
				e || w(O(d, t, c), 0, c - t), p.forEach((e) => e < c - 1 && w(C(null, { duration: e - t }), 0, e - t));
			}
			if (l) {
				let e = u + Math.floor((c - u) / l) * l;
				w(O(f, e, e + l, void 0, {
					iterations: Infinity,
					iterationStart: (c - e) / l,
					fill: "forwards"
				}, c), c - t);
			}
		} catch {
			return;
		}
		return s.length || S(), !0;
	}, re = (e, t) => {
		let r, i = 0;
		for (let t of n) {
			let n = o.get(t);
			if (!n) return !1;
			let [a, c, l] = n, u = t.at(e), d = t.timing()[0] === Infinity;
			if (l) {
				if (d && (u === a || !s.length)) continue;
				return !1;
			}
			let f = (u - a) / c, p = d ? 0 : t.speed / c;
			if (r === void 0) r = f, i = p;
			else if (Math.abs(f - r) > 1 || p !== i) return !1;
		}
		if (r === void 0) return !0;
		if (!s.length) {
			if (h === void 0 || t && i) return !1;
			if (i) {
				let e = (h - r) / i;
				if (e < 1) return !1;
				te(e);
			}
			return !0;
		}
		for (let { offset: e, end: n, isDone: i } of s) {
			let a = r - e;
			if (n < Infinity && (i ? a < n - 1 : a < 0 && (t || e <= 0) || a >= n)) return !1;
		}
		for (let { animation: t, offset: n, isDone: a } of s) {
			if (a) continue;
			let o = r - n;
			i && t.updatePlaybackRate && t.playState === "running" && Math.abs(Number(t.currentTime) - o) < 20 ? t.playbackRate !== i && t.updatePlaybackRate(i) : i ? (t.playbackRate !== i && (t.playbackRate = i), t.startTime = e - o / i) : (t.startTime = null, t.currentTime = o);
		}
		return !0;
	}, ie = () => !n.size && (u = !0, sa(t) === k && Ki.delete(t), k.isJS || S(), !0), ae = () => {
		let t = N.now();
		if (k.isJS || (k.isFinishing = !0, n.forEach((n) => {
			let [r, a] = n.timing();
			n.state === "running" && n.speed > 0 && !a && r <= t + 1 && (n.complete(), i[n.name] = la(e, n.name), o.has(n) || (c = !0));
		}), k.isFinishing = !1), l = !1, u || (n.forEach((e) => ca(e) && n.delete(e)), ie())) return;
		for (let e of n) if (!e.canAccelerate) return k.demote(!0);
		k.isJS && (k.isJS = !1, c = !0, n.forEach((e) => e.stopJS()));
		let r = c, a = d;
		if (c = d = !1, r || !re(t, a)) {
			if (a) {
				if (t - f < Zi) return k.demote();
				f = t;
			}
			if (!ne(t)) return k.demote();
		} else if (h !== void 0 && !a) return;
		n.forEach((e) => e.timing()[0] === Infinity && e.sync());
	}, k = {
		tracks: n,
		isJS: !1,
		isFinishing: !1,
		schedule(e, t) {
			u || (c ||= e, d ||= !!t, l || (l = !0, Ze.isProcessing ? L.render(ae, !1, !0) : ga(ae)));
		},
		release(e) {
			ca(e) && n.delete(e), ie() || k.schedule(!0);
		},
		check() {
			if (!k.isJS) {
				for (let t in i) if (la(e, t) !== i[t] && !g(t)) return k.schedule(!0, !0);
			}
		},
		demote(e) {
			if (!(k.isJS || u)) return n.forEach((t) => {
				t.isAccelerated() && t.sync(), e || (t.canAccelerate = !1);
			}), k.isJS = !0, o = /* @__PURE__ */ new Map(), S(), n.forEach((e) => e.state === "running" && e.js?.start()), !0;
		}
	};
	return Ki.set(t, k), k;
}
// node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var va = class extends mr {
	constructor(e) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = N.now();
		let { keyframes: t, name: n, motionValue: r, element: i } = e, a = e;
		a.autoplay ??= !0, a.delay ??= 0, a.type ??= "keyframes", a.repeat ??= 0, a.repeatDelay ??= 0, a.repeatType ??= "loop";
		let o = i?.KeyframeResolver || ui;
		this.keyframeResolver = new o(t, (e, t, n) => this.onKeyframesResolved(e, t, a, !n), n, r, i), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, r) {
		this.keyframeResolver = void 0;
		let { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
		this.resolvedAt = N.now();
		let u = Ai(e, i, a, o);
		u || ((xe.instantAnimations || !s) && l?.(or(e, n, t)), e[0] = e[e.length - 1], ji(n), n.repeat = 0);
		let { onComplete: d } = n;
		n.finalKeyframe = t, n.keyframes = e, n.onComplete = () => {
			d?.(), this.notifyFinished();
		};
		let f = u && !c && Ri(n), p = !f && ua(n);
		r && (f || p || this.resolvedAt !== this.createdAt) && (n.startTime ??= ur(this.createdAt, this.resolvedAt));
		let m;
		if (f) {
			n.element = n.motionValue?.owner?.current;
			try {
				m = new Di(n);
			} catch {
				m = new _r(n);
			}
		} else m = p ? new ma(n) : new _r(n);
		this.pendingTimeline &&= (this.stopTimeline = m.attachTimeline(this.pendingTimeline), void 0), this._animation = m;
	}
	get finished() {
		return this._animation ? this._animation.finished : super.finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	liveValue() {
		return this._animation?.liveValue?.();
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), ci()), this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(e) {
		this.animation.time = e;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(e) {
		this.animation.speed = e;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(e) {
		return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		this._animation?.cancel(), this.keyframeResolver?.cancel();
	}
};
// node_modules/motion-dom/dist/es/animation/utils/calc-child-stagger.mjs
function ya(e, t, n, r = 0, i = 1) {
	let a = Array.from(e).sort((e, t) => e.sortNodePosition(t)).indexOf(t), o = e.size, s = (o - 1) * r;
	return typeof n == "function" ? n(a, o) : i === 1 ? a * r : s - a * r;
}
// node_modules/motion-dom/dist/es/value/index.mjs
var ba = 30, xa = (e) => !isNaN(parseFloat(e)), Sa = { current: void 0 }, Ca = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = N.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.dirty(), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = N.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = xa(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return this.on("change", e);
	}
	on(e, t) {
		var n;
		return e === "change" ? this.onChangeSubscribe(t) : ((n = this.events)[e] || (n[e] = new Oe())).add(t);
	}
	onChangeSubscribe(e) {
		let { events: t } = this;
		return !t.change && !this.changeSubscriber ? this.changeSubscriber = e : (t.change || (t.change = new Oe(), t.change.add(this.changeSubscriber), this.changeSubscriber = void 0), t.change.add(e)), () => {
			this.changeSubscriber === e ? this.changeSubscriber = void 0 : t.change?.remove(e), this.stopIfUnobserved();
		};
	}
	stopIfUnobserved() {
		L.read(() => {
			!this.changeSubscriber && !this.events.change?.getSize() && this.stop();
		});
	}
	clearListeners() {
		this.changeSubscriber = void 0;
		for (let e in this.events) this.events[e].clear();
	}
	attach(e, t) {
		this.passiveEffect = e, this.stopPassiveEffect = t;
	}
	set(e) {
		this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
	}
	setWithVelocity(e, t, n) {
		this.set(t), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - n;
	}
	jump(e, t = !0) {
		t && (this.updatedAt = N.now(), this.stop()), this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, this.stopPassiveEffect?.();
	}
	dirty() {
		let { current: e, changeSubscriber: t } = this;
		t ? t(e) : this.events.change?.notify(e);
	}
	addDependent(e) {
		(this.dependents ||= /* @__PURE__ */ new Set()).add(e);
	}
	removeDependent(e) {
		this.dependents?.delete(e);
	}
	get() {
		Sa.current?.push(this);
		let e = this.animation?.liveValue?.();
		return e === void 0 ? this.current : e;
	}
	getCurrent() {
		return this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = N.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > ba) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, ba);
		return /* @__PURE__ */ je(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
	}
	start(e) {
		return new Promise((t) => this.run(e, t));
	}
	run(e, t) {
		this.stop(), this.hasAnimated = !0;
		let n = !1, r;
		r = e(() => {
			n = !0, this.events.animationComplete?.notify(), this.animation === r && (this.animation = void 0), t?.();
		}), n || (this.animation = r), this.events.animationStart?.notify();
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel?.notify()), this.animation = void 0;
	}
	isAnimating() {
		return !!this.animation;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect?.();
	}
};
function wa(e, t) {
	return new Ca(e, t);
}
// node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function Ta(e, t) {
	if (e?.inherit && t) {
		let { inherit: n, ...r } = e;
		return {
			...t,
			...r
		};
	}
	return e;
}
// node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function Ea(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : Ta(n, e);
}
// node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var Da = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, Oa = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), ka = {
	type: "keyframes",
	duration: .8
}, Aa = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, ja = (e, { keyframes: t }) => t.length > 2 ? ka : Kr.has(e) ? e.startsWith("scale") ? Oa(t[1]) : Da : Aa, Ma = /* @__PURE__ */ new Set([
	"when",
	"delay",
	"delayChildren",
	"staggerChildren",
	"staggerDirection",
	"repeat",
	"repeatType",
	"repeatDelay",
	"from",
	"elapsed",
	"out",
	"mixer"
]);
function Na(e) {
	for (let t in e) if (!Ma.has(t)) return !0;
	return !1;
}
// node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var Pa = (e, t, n, r = {}, i, a) => (o) => {
	let s = Ea(r, e) || {}, c = s.delay || r.delay || 0, { elapsed: l = 0 } = r;
	l -= /* @__PURE__ */ ke(c);
	let u = {
		keyframes: Array.isArray(n) ? n : [null, n],
		ease: "easeOut",
		velocity: t.getVelocity(),
		...s,
		delay: -l,
		onUpdate: (e) => {
			t.set(e), s.onUpdate && s.onUpdate(e);
		},
		onComplete: () => {
			o(), s.onComplete && s.onComplete();
		},
		name: e,
		motionValue: t,
		element: a ? void 0 : i,
		hasOnUpdate: !!s.onUpdate
	};
	Na(s) || Object.assign(u, ja(e, u)), u.duration &&= /* @__PURE__ */ ke(u.duration), u.repeatDelay &&= /* @__PURE__ */ ke(u.repeatDelay), u.from !== void 0 && (u.keyframes[0] = u.from);
	let d = !1;
	if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (ji(u), u.delay === 0 && (d = !0)), (xe.instantAnimations || xe.skipAnimations || i?.shouldSkipAnimations || s.skipAnimations) && (d = !0, ji(u), u.delay = 0), u.allowFlatten = !s.type && !s.ease, d && !a && t.get() !== void 0) {
		let e = or(u.keyframes, s);
		if (e !== void 0) {
			L.update(() => {
				u.onUpdate(e), u.onComplete();
			});
			return;
		}
	}
	return s.isSync ? new _r(u) : new va(u);
}, Fa = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Ia(e) {
	let t = Fa.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
function La(e, t, n = 1) {
	let [r, i] = Ia(e);
	if (!r) return;
	let a = window.getComputedStyle(t).getPropertyValue(r);
	if (a) {
		let e = a.trim();
		return Se(e) ? parseFloat(e) : e;
	}
	return it(i) ? La(i, t, n + 1) : i;
}
// node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function Ra(e) {
	let t = [{}, {}];
	return e?.values.forEach((e, n) => {
		t[0][n] = e.get(), t[1][n] = e.getVelocity();
	}), t;
}
function za(e, t, n, r) {
	let i = (t) => typeof t == "function" ? t(n === void 0 ? e.custom : n, ...Ra(r)) : t;
	return t = i(t), typeof t == "string" && (t = e.variants && e.variants[t]), i(t);
}
// node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function Ba(e, t, n) {
	return za(e.getProps(), t, n, e);
}
var Va = (e, t) => t === "exit" ? e.presenceContext?.custom : void 0, Ha = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...Gr
]), Ua = (e) => Array.isArray(e);
// node_modules/motion-dom/dist/es/render/utils/setters.mjs
function Wa(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, wa(n));
}
function Ga(e) {
	return Ua(e) ? e[e.length - 1] || 0 : e;
}
function Ka(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = Ba(e, t) || {};
	i = {
		...i,
		...n
	};
	for (let t in i) Wa(e, t, Ga(i[t]));
}
// node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var qa = (e) => !!(e && e.getVelocity);
// node_modules/motion-dom/dist/es/value/will-change/is.mjs
function Ja(e) {
	return !!(qa(e) && e.add);
}
// node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function Ya(e, t) {
	let n = e.getValue("willChange");
	if (Ja(n)) return n.add(t);
	if (!n && xe.WillChange) {
		let n = new xe.WillChange("auto");
		e.addValue("willChange", n), n.add(t);
	}
}
// node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs
var Xa = "data-framer-appear-id";
// node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function Za(e) {
	return e.props[Xa];
}
// node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
var Qa = typeof window < "u";
function $a({ protectedKeys: e, needsAnimating: t }, n) {
	let r = n in e && !t[n];
	return t[n] = !1, r;
}
function eo(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
	let { transition: a, transitionEnd: o, ...s } = t, c = e.getDefaultTransition();
	a = a ? Ta(a, c) : c;
	let l = a?.reduceMotion, u = a?.skipAnimations;
	r && (a = r);
	let d = [], f = i && e.animationState?.getState()[i], p = a?.path;
	p && (p.animateValues ? p.animateValues((t) => e.getValue(t, e.latestValues[t] ?? 0), s, a, n, d) : p.animateVisualElement?.(e, s, a, n, d));
	for (let t in s) {
		let r = e.getValue(t, e.latestValues[t] ?? null), i = s[t];
		if (i === void 0 || f && $a(f, t)) continue;
		let o = {
			delay: n,
			...Ea(f?.out[t] || a || {}, t)
		};
		u && (o.skipAnimations = !0);
		let c = r.get();
		if (c !== void 0 && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
			L.update(() => r.set(i));
			continue;
		}
		let p = !1;
		if (Qa && window.MotionHandoffAnimation) {
			let n = Za(e);
			if (n) {
				let e = window.MotionHandoffAnimation(n, t, L);
				e !== null && (o.startTime = e, p = !0);
			}
		}
		Ya(e, t);
		let m = l ?? e.shouldReduceMotion;
		r.run(Pa(t, r, i, m && Ha.has(t) ? { type: !1 } : o, e, p));
		let h = r.animation;
		h && d.push(h);
	}
	if (o) {
		let t = () => L.update(() => {
			o && Ka(e, o);
		});
		d.length ? Promise.all(d).then(t) : t();
	}
	return d;
}
// node_modules/motion-dom/dist/es/animation/interfaces/visual-element-variant.mjs
function to(e, t, n = {}) {
	let r = Ba(e, t, Va(e, n.type)), i = n.transitionOverride || (r?.transition ?? (e.getDefaultTransition() || {})), a = () => Promise.all(r ? eo(e, r, n) : []), o = (r = 0) => {
		let { variantChildren: a } = e, { delayChildren: o = 0, staggerChildren: s, staggerDirection: c } = i, l = [];
		return a?.forEach((e) => {
			e.notify("AnimationStart", t), l.push(to(e, t, {
				...n,
				delay: r + (typeof o == "function" ? 0 : o) + ya(a, e, o, s, c)
			}).then(() => e.notify("AnimationComplete", t)));
		}), Promise.all(l);
	}, { when: s } = i;
	return s ? s === "beforeChildren" ? a().then(() => o()) : o().then(a) : Promise.all([a(), o(n.delay)]);
}
// node_modules/motion-dom/dist/es/animation/interfaces/visual-element.mjs
function no(e, t, n = {}) {
	return e.notify("AnimationStart", t), (Array.isArray(t) ? Promise.all(t.map((t) => to(e, t, n))) : typeof t == "string" ? to(e, t, n) : Promise.all(eo(e, Ba(e, t, n.custom), n))).then(() => {
		e.notify("AnimationComplete", t);
	});
}
// node_modules/motion-dom/dist/es/value/types/auto.mjs
var ro = {
	test: (e) => e === "auto",
	parse: (e) => e
}, io = (e) => (t) => t.test(e), ao = [
	st,
	P,
	Ct,
	St,
	Tt,
	wt,
	ro
], oo = (e) => ao.find(io(e));
// node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function so(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || we(e);
}
// node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var co = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function lo(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !co.has(t) && zt(t) && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] !== i && (e[r] = Mr(n, i));
}
// node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var uo = class extends ui {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	scheduleResolve() {
		if (this.canReadNow() && (this.readKeyframes(), !this.needsMeasurement)) return this.complete();
		super.scheduleResolve();
	}
	canReadNow() {
		let { unresolvedKeyframes: e, element: t, motionValue: n } = this, r = e[0] ?? n?.get();
		if (!t?.current || r === void 0) return !1;
		for (let t = 0; t < e.length; t++) if (ot(t ? e[t] : r)) return !1;
		return !0;
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t?.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), it(r))) {
				let i = La(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !Ha.has(n) || e.length !== 2) return;
		let [r, i] = e;
		if (typeof r == "number" && typeof i == "number") return;
		let a = oo(r), o = oo(i);
		if (ot(r) !== ot(i) && ti[n]) this.needsMeasurement = !0;
		else if (a !== o) {
			if (qr(a) && qr(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else ti[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || so(e[t])) && n.push(t);
		n.length && lo(e, n, t);
	}
	measure() {
		let { element: e, name: t } = this;
		return ti[t](window.getComputedStyle(e.current), () => e.measureViewportBox());
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e?.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = this.measure(), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && this.motionValue?.jump(r, !1);
	}
	measureEndState() {
		let { element: e, unresolvedKeyframes: t } = this;
		if (!e?.current) return;
		this.motionValue?.jump(this.measuredOrigin, !1);
		let n = t.length - 1, r = t[n];
		t[n] = this.measure(), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.resolveNoneKeyframes();
	}
}, fo = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
];
// node_modules/motion-dom/dist/es/utils/is-html-element.mjs
function po(e) {
	return Ce(e) && "offsetHeight" in e && !("ownerSVGElement" in e);
}
// node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function mo(e) {
	return Ce(e) && "ownerSVGElement" in e;
}
// node_modules/motion-dom/dist/es/scope/active.mjs
var ho = {};
function go(e) {
	return ho.current?.add(e), e;
}
var _o = (e) => ho.current ? ho.current.bind(e) : e;
// node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function vo(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let r = t ? t.current : ho.current?.root || document, i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
// node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function yo(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
// node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function bo(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e, o = !1, s = !1;
	for (let e in t) {
		let n = t[e];
		if (Kr.has(e)) o = !0;
		else if (nt(e)) i[e] = n;
		else {
			let t = zi(n, Tr[e]);
			e.startsWith("origin") ? (s = !0, a[e] = t) : r[e] = t;
		}
	}
	if (t.transform || (o || n ? r.transform = Gi(t, e.transform, n) : r.transform &&= "none"), s) {
		let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
// node_modules/motion-dom/dist/es/render/svg/utils/path.mjs
var xo = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, So = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function Co(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	let a = i ? xo : So;
	e[a.offset] = `${-r}`, e[a.array] = `${t} ${n}`;
}
// node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var wo = [
	"transform",
	"opacity",
	"clipPath",
	"filter",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
function To(e, { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s }, c, l, u) {
	if (bo(e, s, l), c) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: d, style: f } = e;
	for (let e of wo) d[e] !== void 0 && (f[e] = d[e], delete d[e]);
	(f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete d.transformBox), t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && Co(d, i, a, o, !1);
}
// node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function Eo({ top: e, left: t, right: n, bottom: r }) {
	return {
		x: {
			min: t,
			max: n
		},
		y: {
			min: e,
			max: r
		}
	};
}
function Do({ x: e, y: t }) {
	return {
		top: t.min,
		right: e.max,
		bottom: t.max,
		left: e.min
	};
}
function Oo(e, t) {
	if (!t) return e;
	let n = t({
		x: e.left,
		y: e.top
	}), r = t({
		x: e.right,
		y: e.bottom
	});
	return {
		top: n.y,
		left: n.x,
		bottom: r.y,
		right: r.x
	};
}
// node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs
function ko(e) {
	return e === void 0 || e === 1;
}
function Ao({ scale: e, scaleX: t, scaleY: n }) {
	return !ko(e) || !ko(t) || !ko(n);
}
var jo = [
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skewX",
	"skewY"
];
function Mo(e) {
	return Ao(e) || Po(e) || No(e);
}
function No(e) {
	return e.z || e.rotate || e.rotateX || e.rotateY || e.rotateZ || e.skewX || e.skewY;
}
function Po(e) {
	return Fo(e.x) || Fo(e.y);
}
function Fo(e) {
	return e && e !== "0%";
}
// node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs
function Io(e, t, n) {
	return n + t * (e - n);
}
function Lo(e, t, n, r, i) {
	return i !== void 0 && (e = Io(e, i, r)), Io(e, n, r) + t;
}
function Ro(e, t = 0, n = 1, r, i) {
	e.min = Lo(e.min, t, n, r, i), e.max = Lo(e.max, t, n, r, i);
}
function zo(e, { x: t, y: n }) {
	Ro(e.x, t.translate, t.scale, t.originPoint), Ro(e.y, n.translate, n.scale, n.originPoint);
}
var Bo = .999999999999, Vo = 1.0000000000001;
function Ho(e, t, n, r = !1) {
	let i = n.length;
	if (!i) return;
	t.x = t.y = 1;
	let a, o;
	for (let s = 0; s < i; s++) a = n[s], o = a.projectionDelta, a.options.visualElement?.props.style?.display !== "contents" && (r === !0 && a.options.layoutScroll && a.scroll && a !== a.root && (Uo(e.x, -a.scroll.offset.x), Uo(e.y, -a.scroll.offset.y)), o && (t.x *= o.x.scale, t.y *= o.y.scale, zo(e, o)), r && (r.path?.[s] || r) !== a && Mo(a.latestValues) && B(e, a.latestValues, a.layout?.layoutBox));
	t.x < Vo && t.x > Bo && (t.x = 1), t.y < Vo && t.y > Bo && (t.y = 1);
}
function Uo(e, t) {
	e.min += t, e.max += t;
}
function Wo(e, t, n, r, i = .5) {
	Ro(e, t, n, I(e.min, e.max, i), r);
}
function z(e, t) {
	return typeof e == "string" ? parseFloat(e) / 100 * (t.max - t.min) : e;
}
function B(e, t, n) {
	let r = n ?? e;
	Wo(e.x, z(t.x, r.x), t.scaleX, t.scale, t.originX), Wo(e.y, z(t.y, r.y), t.scaleY, t.scale, t.originY);
}
// node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function Go(e, t) {
	return Eo(Oo(e.getBoundingClientRect(), t));
}
function Ko(e, t, n) {
	let r = Go(e, n), { scroll: i } = t;
	return i && (Uo(r.x, i.offset.x), Uo(r.y, i.offset.y)), r;
}
var qo = () => ({
	x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
	y: document.documentElement.scrollTop || document.body?.scrollTop || 0
}), { schedule: Jo, cancel: Yo } = /* @__PURE__ */ gn(queueMicrotask, !1);
// node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function Xo(e, t, n) {
	let r = qa(e) ? e : wa(e);
	return r.run(Pa("", r, t, n)), r.animation;
}
// node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs
var Zo = {}, Qo = {
	value: null,
	addProjectionMetrics: null,
	countProjection: void 0
};
// node_modules/motion-dom/dist/es/utils/delay.mjs
function $o(e, t) {
	let n = N.now();
	e = _o(e);
	let r = ({ timestamp: i }) => {
		let a = i - n;
		a >= t && (_n(r), e(a - t));
	};
	return L.setup(r, !0), go(() => _n(r));
}
// node_modules/motion-dom/dist/es/utils/is-ref-object.mjs
function es(e) {
	return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
// node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function ts(e) {
	return mo(e) && e.tagName === "svg";
}
// node_modules/motion-dom/dist/es/value/utils/resolve-motion-value.mjs
function ns(e) {
	return qa(e) ? e.get() : e;
}
// node_modules/motion-dom/dist/es/value/utils/as-number.mjs
var rs = (e) => typeof e == "number" ? e : parseFloat(e), is = fo.length, as = (e) => typeof e == "number" || P.test(e);
function os(e, t, n, r, i, a) {
	i ? (e.opacity = I(0, n.opacity ?? 1, cs(r)), e.opacityExit = I(t.opacity ?? 1, 0, ls(r))) : a && (e.opacity = I(t.opacity ?? 1, n.opacity ?? 1, r));
	for (let i = 0; i < is; i++) {
		let a = fo[i], o = ss(t, a), s = ss(n, a);
		(o !== void 0 || s !== void 0) && (o ||= 0, s ||= 0, o === 0 || s === 0 || as(o) === as(s) ? (e[a] = Math.max(I(rs(o), rs(s), r), 0), (Ct.test(s) || Ct.test(o)) && (e[a] += "%")) : e[a] = s);
	}
	for (let i = 0; i < jo.length; i++) {
		let a = jo[i];
		(t[a] || n[a]) && (e[a] = I(t[a] || 0, n[a] || 0, r));
	}
}
function ss(e, t) {
	return e[t] === void 0 ? e.borderRadius : e[t];
}
var cs = /*@__PURE__*/ us(0, .5, Ve), ls = /*@__PURE__*/ us(.5, .95, M);
function us(e, t, n) {
	return (r) => r < e ? 0 : r > t ? 1 : n(/* @__PURE__ */ De(e, t, r));
}
// node_modules/motion-dom/dist/es/projection/animation/layout-velocity.mjs
var ds = (e, t, { x: n, y: r }) => {
	let i = e * e + t * t;
	return i < 1 ? 0 : -1e3 * (n * e + r * t) / i;
}, fs = (e, t = 300) => {
	let n = j(.25, 2, t / 300), { stiffness: r, damping: i } = Kn({
		...e,
		duration: e.duration && /* @__PURE__ */ ke(e.duration)
	});
	return {
		...e,
		stiffness: r,
		damping: i * Math.sqrt(n),
		mass: n
	};
};
// node_modules/motion-dom/dist/es/projection/geometry/copy.mjs
function ps(e, t) {
	e.min = t.min, e.max = t.max;
}
function ms(e, t) {
	ps(e.x, t.x), ps(e.y, t.y);
}
function hs(e, t) {
	e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin;
}
// node_modules/motion-dom/dist/es/projection/geometry/delta-calc.mjs
var gs = .9999, _s = 1.0001, vs = -.01, ys = .01;
function bs(e) {
	return e.max - e.min;
}
function xs(e, t, n) {
	return Math.abs(e - t) <= n;
}
function Ss(e, t, n, r = .5) {
	e.origin = r, e.originPoint = I(t.min, t.max, e.origin), e.scale = bs(n) / bs(t), e.translate = I(n.min, n.max, e.origin) - e.originPoint, (e.scale >= gs && e.scale <= _s || isNaN(e.scale)) && (e.scale = 1), (e.translate >= vs && e.translate <= ys || isNaN(e.translate)) && (e.translate = 0);
}
function Cs(e, t, n, r) {
	Ss(e.x, t.x, n.x, r?.originX), Ss(e.y, t.y, n.y, r?.originY);
}
function ws(e, t, n, r = 0) {
	e.min = (r ? I(n.min, n.max, r) : n.min) + t.min, e.max = e.min + bs(t);
}
function Ts(e, t, n, r) {
	ws(e.x, t.x, n.x, r?.x), ws(e.y, t.y, n.y, r?.y);
}
function Es(e, t, n, r = 0) {
	let i = r ? I(n.min, n.max, r) : n.min;
	e.min = t.min - i, e.max = e.min + bs(t);
}
function Ds(e, t, n, r) {
	Es(e.x, t.x, n.x, r?.x), Es(e.y, t.y, n.y, r?.y);
}
// node_modules/motion-dom/dist/es/projection/geometry/delta-remove.mjs
function Os(e, t, n, r, i) {
	return e -= t, e = Io(e, 1 / n, r), i !== void 0 && (e = Io(e, 1 / i, r)), e;
}
function ks(e, t = 0, n = 1, r = .5, i, a = e, o = e) {
	if (Ct.test(t) && (t = parseFloat(t), t = I(o.min, o.max, t / 100) - o.min), typeof t != "number") return;
	let s = I(a.min, a.max, r);
	e === a && (s -= t), e.min = Os(e.min, t, n, s, i), e.max = Os(e.max, t, n, s, i);
}
function As(e, t, [n, r, i], a, o) {
	ks(e, t[n], t[r], t[i], t.scale, a, o);
}
var js = [
	"x",
	"scaleX",
	"originX"
], Ms = [
	"y",
	"scaleY",
	"originY"
];
function Ns(e, t, n, r) {
	As(e.x, t, js, n?.x, r?.x), As(e.y, t, Ms, n?.y, r?.y);
}
// node_modules/motion-dom/dist/es/projection/geometry/round.mjs
var Ps = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), Fs = Ps("applewebkit/") && !Ps("chrome/") ? Math.round : M;
function Is(e) {
	e.min = Fs(e.min), e.max = Fs(e.max);
}
function Ls(e) {
	Is(e.x), Is(e.y);
}
// node_modules/motion-dom/dist/es/projection/geometry/models.mjs
var Rs = () => ({
	translate: 0,
	scale: 1,
	origin: 0,
	originPoint: 0
}), zs = () => ({
	x: Rs(),
	y: Rs()
}), Bs = () => ({
	min: 0,
	max: 0
}), Vs = () => ({
	x: Bs(),
	y: Bs()
});
// node_modules/motion-dom/dist/es/projection/geometry/utils.mjs
function Hs(e) {
	return e.translate === 0 && e.scale === 1;
}
function Us(e) {
	return Hs(e.x) && Hs(e.y);
}
function Ws(e, t) {
	return e.min === t.min && e.max === t.max;
}
function Gs(e, t) {
	return Ws(e.x, t.x) && Ws(e.y, t.y);
}
function Ks(e, t) {
	return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function qs(e, t) {
	return Ks(e.x, t.x) && Ks(e.y, t.y);
}
function Js(e) {
	return bs(e.x) / bs(e.y);
}
function Ys(e, t) {
	return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
// node_modules/motion-dom/dist/es/projection/shared/stack.mjs
var Xs = class {
	constructor() {
		this.members = [];
	}
	add(e) {
		be(this.members, e);
		for (let t = this.members.length - 1; t >= 0; t--) {
			let n = this.members[t];
			if (n === e || n === this.lead || n === this.prevLead) continue;
			let r = n.instance;
			r && r.isConnected !== !1 || n.snapshot || (A(this.members, n), n.unmount());
		}
		e.scheduleRender();
	}
	remove(e) {
		if (A(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
			let e = this.members[this.members.length - 1];
			e && this.promote(e);
		}
	}
	relegate(e) {
		for (let t = this.members.indexOf(e) - 1; t >= 0; t--) {
			let e = this.members[t];
			if (e.isPresent !== !1 && e.instance?.isConnected !== !1) return this.promote(e), !0;
		}
		return !1;
	}
	promote(e, t) {
		let n = this.lead;
		if (e !== n && (this.prevLead = n, this.lead = e, e.show(), n)) {
			n.updateSnapshot(), e.scheduleRender();
			let { layoutDependency: r } = n.options, { layoutDependency: i } = e.options;
			(r === void 0 || r !== i) && (e.resumeFrom = n, t && (n.preserveOpacity = !0), n.snapshot && (e.snapshot = n.snapshot, e.snapshot.latestValues = n.animationValues || n.latestValues), e.root?.isUpdating && (e.isLayoutDirty = !0)), e.options.crossfade === !1 && n.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((e) => {
			e.options.onExitComplete?.(), e.resumingFrom?.options.onExitComplete?.();
		});
	}
	scheduleRender() {
		this.members.forEach((e) => e.instance && e.scheduleRender(!1));
	}
	removeLeadSnapshot() {
		this.lead?.snapshot && (this.lead.snapshot = void 0);
	}
};
// node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function Zs(e, t) {
	return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
var Qs = { correct: (e, t) => {
	if (!t.target) return e;
	if (typeof e == "string") {
		if (P.test(e)) e = parseFloat(e);
		else return e;
	}
	return `${Zs(e, t.target.x)}% ${Zs(e, t.target.y)}%`;
} }, $s = {
	borderRadius: /* @__PURE__ */ Object.assign({}, Qs, { applyTo: /* @__PURE__ */ fo.slice() }),
	borderTopLeftRadius: Qs,
	borderTopRightRadius: Qs,
	borderBottomLeftRadius: Qs,
	borderBottomRightRadius: Qs,
	boxShadow: { correct: (e, { treeScale: t, projectionDelta: n }) => {
		let r = e, i = qt.parse(e);
		if (i.length > 5) return r;
		let a = qt.createTransformer(e), o = typeof i[0] == "number" ? 0 : 1, s = n.x.scale * t.x, c = n.y.scale * t.y;
		i[0 + o] /= s, i[1 + o] /= c;
		let l = I(s, c, .5);
		return typeof i[2 + o] == "number" && (i[2 + o] /= l), typeof i[3 + o] == "number" && (i[3 + o] /= l), a(i);
	} }
};
// node_modules/motion-dom/dist/es/projection/styles/transform.mjs
function ec(e, t, n) {
	let r = "", i = e.x.translate / t.x, a = e.y.translate / t.y, o = n?.z || 0;
	(i || a || o) && (r = `translate3d(${i}px, ${a}px, ${o}px) `);
	let s = "";
	if (n) {
		let { transformPerspective: e } = n;
		e && (r = `perspective(${e}px) ${r}`);
		for (let e = 0; e < jo.length; e++) {
			let t = jo[e], r = n[t];
			r && (s += `${t}(${r}deg) `), !e && n.pathRotation && (s += `rotate(${n.pathRotation}deg) `);
		}
	}
	if (s) {
		(t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `), r += s;
		let n = e.x.scale * t.x, i = e.y.scale * t.y;
		(n !== 1 || i !== 1) && (r += `scale(${n}, ${i})`);
	} else e.x.scale !== 1 || e.y.scale !== 1 ? r += `scale(${e.x.scale}, ${e.y.scale})` : r || t.x === 1 && t.y === 1 || (r = "scale(1, 1)");
	return r || "none";
}
// node_modules/motion-dom/dist/es/projection/utils/each-axis.mjs
function tc(e) {
	return [e("x"), e("y")];
}
// node_modules/motion-dom/dist/es/projection/utils/compare-by-depth.mjs
var nc = (e, t) => e.depth - t.depth, rc = class {
	constructor() {
		this.children = [], this.isDirty = !1;
	}
	add(e) {
		be(this.children, e), this.isDirty = !0;
	}
	remove(e) {
		A(this.children, e), this.isDirty = !0;
	}
	forEach(e) {
		this.isDirty && this.children.sort(nc), this.isDirty = !1, this.children.forEach(e);
	}
}, ic = {
	hasAnimatedSinceResize: !0,
	hasEverUpdated: !1
}, ac = [
	"z",
	"skew",
	"skewZ"
], oc = 1e3, sc = 0;
function cc(e, t, n, r) {
	let { latestValues: i } = t;
	i[e] && (n[e] = i[e], t.setStaticValue(e, 0), r && (r[e] = 0));
}
var lc = (e) => e.instance && Ki.get(e.instance)?.demote() && e.resetSkewAndRotation();
function uc(e) {
	if (e.hasCheckedOptimisedAppear = !0, e.root === e) return;
	let { visualElement: t } = e.options;
	if (!t) return;
	let n = Za(t);
	if (window.MotionHasOptimisedAnimation(n, "transform")) {
		let { layout: t, layoutId: r } = e.options;
		window.MotionCancelOptimisedAnimation(n, "transform", L, !(t || r));
	}
	let { parent: r } = e;
	r && !r.hasCheckedOptimisedAppear && uc(r);
}
function dc(e) {
	if (e) return e.options.allowProjection === !1 ? dc(e.parent) : e.projection;
}
function fc({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: i }) {
	return Object.assign(Zo, {
		...$s,
		...Zo
	}), class {
		static create(e, t, n) {
			let { layoutId: r, layout: i, drag: a, dragConstraints: o, layoutScroll: s, layoutRoot: c, layoutAnchor: l, layoutCrossfade: u } = t, d = e.projection = new this(e.latestValues, t["data-framer-portal-id"] ? void 0 : dc(e.parent));
			d.setOptions({
				layoutId: r,
				layout: i,
				alwaysMeasureLayout: !!a || o && es(o),
				visualElement: e,
				animationType: typeof i == "string" ? i : "both",
				initialPromotionConfig: n,
				crossfade: u,
				layoutScroll: s,
				layoutRoot: c,
				layoutAnchor: l
			});
			let f = d.getStack()?.lead;
			f && !d.root.isUpdateBlocked() && (f.willUpdate(), f.scheduleCheckAfterUnmount());
		}
		constructor(e = {}, n = t?.()) {
			this.id = sc++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = {
				x: 1,
				y: 1
			}, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
				this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
			}, this.updateProjection = () => {
				this.projectionUpdateScheduled = !1, this.nodes.forEach(hc), this.nodes.forEach(Ec), this.nodes.forEach(Dc), this.nodes.forEach(gc), Qo.countProjection?.();
			}, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = e, this.root = n ? n.root || n : this, this.path = n ? [...n.path, n] : [], this.parent = n, this.depth = n ? n.depth + 1 : 0;
			for (let e = 0; e < this.path.length; e++) this.path[e].shouldResetTransform = !0;
			this.root === this && (this.nodes = new rc());
		}
		addEventListener(e, t) {
			return this.eventHandlers.has(e) || this.eventHandlers.set(e, new Oe()), this.eventHandlers.get(e).add(t);
		}
		notifyListeners(e, ...t) {
			this.eventHandlers.get(e)?.notify(...t);
		}
		hasListeners(e) {
			return this.eventHandlers.has(e);
		}
		mount(t) {
			if (this.instance) return;
			this.isSVG = mo(t) && !ts(t), this.instance = t;
			let { layoutId: n, layout: r, visualElement: i } = this.options;
			if (i && !i.current && i.mount(t), this.root.nodes.add(this), this.parent?.children.add(this), this.root.hasTreeAnimated && (r || n) && (this.isLayoutDirty = !0), e) {
				let n, r = 0, i = () => this.root.updateBlockedByResize = !1;
				L.read(() => {
					r = window.innerWidth;
				}), e(t, () => {
					let e = window.innerWidth;
					e !== r && (r = e, this.root.updateBlockedByResize = !0, n?.(), n = $o(i, 250), ic.hasAnimatedSinceResize && (ic.hasAnimatedSinceResize = !1, this.nodes.forEach(Tc)));
				});
			}
			n && this.root.registerSharedNode(n, this), this.addLayoutListener();
		}
		addLayoutListener() {
			let { layoutId: e, layout: t, visualElement: n, animate: r } = this.options;
			this.instance && !this.hasLayoutListener && r !== !1 && n && (e || t) && (this.hasLayoutListener = !0, this.addEventListener("didUpdate", ({ delta: e, hasLayoutChanged: t, hasRelativeLayoutChanged: r, layout: i }) => {
				if (this.isAnimationBlocked) {
					this.target = void 0, this.relativeTarget = void 0;
					return;
				}
				let a = this.options.transition || n.getDefaultTransition() || Pc, { onLayoutAnimationStart: o, onLayoutAnimationComplete: s } = n.getProps(), c = !this.targetLayout || !qs(this.targetLayout, i), l = !t && r;
				if (this.options.layoutRoot || this.resumeFrom || l || t && (c || !this.currentAnimation)) {
					this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
					let t = {
						...Ea(a, "layout"),
						onPlay: o,
						onComplete: s
					};
					(n.shouldReduceMotion || this.options.layoutRoot) && (t.delay = 0, t.type = !1), this.startAnimation(t), this.setAnimationOrigin(e, l, t.path);
				} else t || Tc(this), this.isLead() && this.options.onExitComplete?.();
				this.targetLayout = i;
			}));
		}
		unmount() {
			this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this), this.getStack()?.remove(this), this.parent?.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), this.hasLayoutListener = !1, _n(this.updateProjection);
		}
		blockUpdate() {
			this.updateManuallyBlocked = !0;
		}
		unblockUpdate() {
			this.updateManuallyBlocked = !1;
		}
		isUpdateBlocked() {
			return this.updateManuallyBlocked || this.updateBlockedByResize;
		}
		startUpdate() {
			this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes?.forEach(Oc), this.animationId++);
		}
		getTransformTemplate() {
			let { visualElement: e } = this.options;
			return e && e.getProps().transformTemplate;
		}
		willUpdate(e = !0) {
			if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
				this.options.onExitComplete?.();
				return;
			}
			if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && uc(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
			lc(this), this.isLayoutDirty = !0;
			for (let e = 0; e < this.path.length; e++) {
				let t = this.path[e];
				t.shouldResetTransform = !0, lc(t), (typeof t.latestValues.x == "string" || typeof t.latestValues.y == "string") && (t.isLayoutDirty = !0), t.updateScroll("snapshot"), t.options.layoutRoot && t.willUpdate(!1), t.isAnimationBlocked && (t.dragSnapshot ||= t.measure(), this.dragAncestor = t);
			}
			let { layoutId: t, layout: n } = this.options;
			if (t === void 0 && !n) return;
			let r = this.getTransformTemplate();
			this.prevTransformTemplateValue = r ? r(this.latestValues, "") : void 0, this.updateSnapshot(), e && this.notifyListeners("willUpdate");
		}
		update() {
			if (this.updateScheduled = !1, this.isUpdateBlocked()) {
				let e = this.updateBlockedByResize;
				this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), e && this.nodes.forEach(yc), this.nodes.forEach(vc);
				return;
			}
			if (this.animationId <= this.animationCommitId) {
				this.nodes.forEach(bc);
				return;
			}
			this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(Sc), this.nodes.forEach(Cc), this.nodes.forEach(wc), this.nodes.forEach(pc), this.nodes.forEach(mc)) : this.nodes.forEach(bc), this.clearAllSnapshots();
			let e = N.now();
			Ze.delta = j(0, 1e3 / 60, e - Ze.timestamp), Ze.timestamp = e, Ze.isProcessing = !0, vn.update.process(Ze), vn.preRender.process(Ze), vn.render.process(Ze), Ze.isProcessing = !1;
		}
		didUpdate() {
			this.updateScheduled || (this.updateScheduled = !0, Jo.read(this.scheduleUpdate));
		}
		clearAllSnapshots() {
			this.nodes.forEach(_c), this.sharedNodes.forEach((e, t) => e.members.length ? e.removeLeadSnapshot() : this.sharedNodes.delete(t));
		}
		scheduleUpdateProjection() {
			this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, L.preRender(this.updateProjection, !1, !0));
		}
		scheduleCheckAfterUnmount() {
			L.postRender(() => {
				this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
			});
		}
		updateSnapshot() {
			if (!this.snapshot && this.instance && (this.snapshot = this.measure(), this.snapshot && !bs(this.snapshot.measuredBox.x) && !bs(this.snapshot.measuredBox.y) && (this.snapshot = void 0), this.snapshot)) {
				let { visualElement: e } = this.options, t = this.currentAnimation?.state === "running", n = t && this.animationEdges;
				t && this.relativeTarget && (this.snapshot.relativeVelocity = this.relativeVelocity?.slice() || []);
				let r = n && this.motionValue?.getVelocity() || 0, i = [
					0,
					1,
					2,
					3,
					4,
					5
				].map((t) => (t < 4 ? n && (this.edgeValues ? this.edgeVelocity(t) : -n[t] * r / 1e3) : e?.getValue(t < 5 ? "x" : "y")?.getVelocity()) || 0);
				i.some(Boolean) && (this.snapshot.velocity = i);
			}
		}
		updateLayout() {
			if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
			if (this.resumeFrom && !this.resumeFrom.instance) for (let e = 0; e < this.path.length; e++) this.path[e].updateScroll();
			let e = this.layout;
			this.layout = this.measure(!1), this.layoutCorrected ||= Vs(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
			let { visualElement: t } = this.options;
			t?.notify("LayoutMeasure", this.layout.layoutBox, e?.layoutBox);
		}
		updateScroll(e = "measure") {
			let { scroll: t, instance: i } = this, { animationId: a } = this.root;
			if (this.options.layoutScroll && i && !(t && t.animationId === a && t.phase === e)) {
				let o = r(i);
				this.scroll = {
					animationId: a,
					phase: e,
					isRoot: o,
					offset: n(i),
					wasRoot: t ? t.isRoot : o
				};
			}
		}
		resetTransform() {
			if (!i) return;
			let e = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
			e && lc(this);
			let t = this.projectionDelta && !Us(this.projectionDelta), n = this.getTransformTemplate(), r = n ? n(this.latestValues, "") : void 0, a = r !== this.prevTransformTemplateValue;
			e && this.instance && (t || Mo(this.latestValues) || a) && (i(this.instance, r), this.shouldResetTransform = !1, this.scheduleRender());
		}
		measure(e = !0) {
			let t = this.measurePageBox(), n = this.removeElementScroll(t);
			return e && (n = this.removeTransform(n)), Ls(n), {
				animationId: this.root.animationId,
				measuredBox: t,
				layoutBox: n,
				latestValues: {},
				source: this.id
			};
		}
		measurePageBox() {
			let { visualElement: e } = this.options;
			if (!e) return Vs();
			let t = e.measureViewportBox();
			if (!(this.scroll?.wasRoot || this.path.some(Lc))) {
				let { scroll: e } = this.root;
				e && (Uo(t.x, e.offset.x), Uo(t.y, e.offset.y));
			}
			return t;
		}
		removeElementScroll(e) {
			let t = Vs();
			if (ms(t, e), this.scroll?.wasRoot) return t;
			for (let n = 0; n < this.path.length; n++) {
				let r = this.path[n], { scroll: i, options: a } = r;
				r !== this.root && i && a.layoutScroll && (i.wasRoot && ms(t, e), Uo(t.x, i.offset.x), Uo(t.y, i.offset.y));
			}
			return t;
		}
		applyTransform(e, t = !1, n, r, i = 0) {
			let a = n || Vs();
			ms(a, e);
			for (let e = i; e < this.path.length; e++) {
				let n = this.path[e];
				!t && n.options.layoutScroll && n.scroll && n !== n.root && (Uo(a.x, -n.scroll.offset.x), Uo(a.y, -n.scroll.offset.y)), Mo(n.latestValues) && B(a, n.latestValues, n.layout?.layoutBox);
			}
			return !r && Mo(this.latestValues) && B(a, this.latestValues, this.layout?.layoutBox), a;
		}
		removeTransform(e) {
			let t = Vs();
			ms(t, e);
			for (let e = 0; e < this.path.length; e++) {
				let n = this.path[e];
				if (!Mo(n.latestValues)) continue;
				let r;
				n.instance && (Ao(n.latestValues) && n.updateSnapshot(), r = Vs(), ms(r, n.measurePageBox())), Ns(t, n.latestValues, n.snapshot?.layoutBox, r);
			}
			return Mo(this.latestValues) && Ns(t, this.latestValues), t;
		}
		setTargetDelta(e) {
			this.targetDelta = e, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
		}
		setOptions(e) {
			this.options = {
				...this.options,
				...e,
				crossfade: e.crossfade === void 0 || e.crossfade
			}, this.addLayoutListener();
		}
		clearMeasurements() {
			this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
		}
		forceRelativeParentToResolveTarget() {
			this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Ze.timestamp && this.relativeParent.resolveTargetDelta(!0);
		}
		resolveTargetDelta(e = !1) {
			let t = this.getLead();
			this.isProjectionDirty ||= t.isProjectionDirty, this.isTransformDirty ||= t.isTransformDirty, this.isSharedProjectionDirty ||= t.isSharedProjectionDirty;
			let n = !!this.resumingFrom || this !== t;
			if (!(e || n && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
			let { layout: r, layoutId: i } = this.options;
			if (!this.layout || !(r || i)) return;
			this.resolvedRelativeTargetAt = Ze.timestamp;
			let a = this.getClosestProjectingParent();
			!this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && a && a.layout ? this.createRelativeTarget(a, this.layout.layoutBox, a.layout.layoutBox) : this.removeRelativeTarget()), (this.relativeTarget || this.targetDelta) && (this.target || (this.target = Vs(), this.targetWithTransforms = Vs()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Ts(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target, !0) : ms(this.target, this.layout.layoutBox), zo(this.target, this.targetDelta)) : ms(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && a && (!a.resumingFrom == !this.resumingFrom || a.options.layoutRoot && !a.resumingFrom) && !a.options.layoutScroll && a.target && this.animationProgress !== 1 ? this.createRelativeTarget(a, this.target, a.target) : this.relativeParent = this.relativeTarget = void 0), Qo.countProjection?.(1));
		}
		getClosestProjectingParent() {
			if (!(!this.parent || Ao(this.parent.latestValues) || Po(this.parent.latestValues))) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
		}
		createRelativeTarget(e, t, n) {
			this.relativeParent = e, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Vs(), this.relativeTargetOrigin = Vs(), Ds(this.relativeTargetOrigin, t, n, this.options.layoutAnchor || void 0), ms(this.relativeTarget, this.relativeTargetOrigin);
		}
		removeRelativeTarget() {
			this.relativeParent = this.relativeTarget = void 0;
		}
		calcProjection() {
			let e = this.getLead(), t = !!this.resumingFrom || this !== e, n = !0;
			if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (n = !1), t && (this.isSharedProjectionDirty || this.isTransformDirty) && (n = !1), this.resolvedRelativeTargetAt === Ze.timestamp && (n = !1), n) return;
			let { layout: r, layoutId: i } = this.options;
			if (this.isTreeAnimating = !!(this.parent?.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(r || i)) return;
			ms(this.layoutCorrected, this.layout.layoutBox);
			let a = this.treeScale.x, o = this.treeScale.y;
			Ho(this.layoutCorrected, this.treeScale, this.path, t && (e.relativeTarget && !e.relativeParent.resumingFrom ? e.relativeParent : !0)), e.layout && !e.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (e.target = e.layout.layoutBox, e.targetWithTransforms = Vs());
			let { target: s } = e;
			s ? (!this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (hs(this.prevProjectionDelta.x, this.projectionDelta.x), hs(this.prevProjectionDelta.y, this.projectionDelta.y)), Cs(this.projectionDelta, this.layoutCorrected, s, this.latestValues), this.treeScale.x === a && this.treeScale.y === o && Ys(this.projectionDelta.x, this.prevProjectionDelta.x) && Ys(this.projectionDelta.y, this.prevProjectionDelta.y) || (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", s)), Qo.countProjection?.(2)) : this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
		}
		hide() {
			this.isVisible = !1;
		}
		show() {
			this.isVisible = !0;
		}
		scheduleRender(e = !0) {
			this.options.visualElement?.scheduleRender(), e && this.getStack()?.scheduleRender(), this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
		}
		createProjectionDeltas() {
			this.prevProjectionDelta = zs(), this.projectionDelta = zs(), this.projectionDeltaWithTransform = zs();
		}
		setAnimationOrigin(e, t = !1, n) {
			let r = this.snapshot, i = r ? r.latestValues : {}, a = { ...this.latestValues }, o = zs();
			this.relativeParent && this.relativeParent.options.layoutRoot || (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !t;
			let s = Vs(), c = r?.source !== this.layout?.source, l = this.getStack(), u = !l || l.members.length <= 1, d = !(!c || u || this.options.crossfade !== !0 || this.path.some(Nc));
			this.animationProgress = 0;
			let f, p = n?.interpolateProjection(e), m = this.layout?.layoutBox, h = m && [
				m.x.min,
				m.x.max,
				m.y.min,
				m.y.max
			].map((t, n) => {
				let { translate: r, scale: i, originPoint: a } = e[n < 2 ? "x" : "y"];
				return (t - a) * (i - 1) + r;
			});
			h?.every(isFinite) || (h = void 0), this.animationEdges = h, this.edgeValues = this.startVelocity = this.impulse = this.relativeVelocity = this.relativeStart = void 0;
			let g = r?.velocity, _ = r?.relativeVelocity || g;
			if (_?.slice(0, 4).some(Boolean) && this.getClosestProjectingParent() && (this.relativeStart = _), g && h) {
				let t = g.slice(0, 4).map((e, t) => e + (c ? g[4 + (t >> 1)] : 0));
				t.some(Boolean) && (this.startVelocity = p ? ds(e.x.translate, e.y.translate, {
					x: (t[0] + t[1]) / 2,
					y: (t[2] + t[3]) / 2
				}) : t);
			}
			this.mixTargetDelta = (t) => {
				let n = t / 1e3, r = p?.(n), l = this.edgeValues;
				for (let t = 0; t < 2; t++) {
					let r = t ? "y" : "x";
					l ? kc(o[r], e[r], this.layout.layoutBox[r], l[t * 2], l[t * 2 + 1]) : Ac(o[r], e[r], n);
				}
				if (r && (o.x.translate = r.x, o.y.translate = r.y), this.setTargetDelta(o), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
					Ds(s, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0);
					let e = this.relativeTargetOrigin, t = s;
					if (Mc(this.relativeTarget, e, t, n), this.isSpringLayout) {
						let e = this.relativeTarget, t = this.impulse || 0, n = this.relativeStart, r = N.now(), i = (r - this.relativeTime) / 1e3;
						this.relativeTime = r;
						let a = this.relativeVelocity ||= [
							0,
							0,
							0,
							0
						];
						for (let r = 0; r < 4; r++) {
							let o = r < 2 ? "x" : "y", s = r & 1 ? "max" : "min";
							n && (e[o][s] += n[r] * t), f && i > 0 && (a[r] = (e[o][s] - f[o][s]) / i);
						}
					}
					f && Gs(this.relativeTarget, f) && (this.isProjectionDirty = !1), f ||= Vs(), ms(f, this.relativeTarget);
				}
				c && (this.animationValues = a, os(a, i, this.latestValues, n, d, u)), r?.rotate !== void 0 && (this.animationValues ||= a, this.animationValues.pathRotation = r.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = n;
			}, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(e) {
			this.notifyListeners("animationStart");
			let t = this.isSpringLayout = e.type === "spring";
			this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.resumingFrom && (this.resumingFrom.edgeValues = void 0), this.pendingAnimation &&= (_n(this.pendingAnimation), void 0), this.pendingAnimation = L.update(() => {
				ic.hasAnimatedSinceResize = !0, this.motionValue ||= wa(0), this.motionValue.jump(0, !1);
				let n = this.startVelocity;
				this.startVelocity = void 0;
				let r = e, i = 0;
				if (t) {
					if (e.mass === "auto") {
						let t = this.layout?.layoutBox;
						r = fs(e, t && Math.sqrt(bs(t.x) * bs(t.y)));
					}
					let t = this.relativeStart;
					if ((n || t) && !e.repeat) {
						if (typeof n == "number") i = n;
						else {
							let e = n && this.animationEdges;
							r = {
								...r,
								type: (r) => {
									let i = [r.velocity, ...n || []].map((t, n) => Jn({
										...r,
										keyframes: n ? [e[n - 1], 0] : r.keyframes,
										velocity: t
									})), a = i.length;
									t && i.push(Jn({
										...r,
										keyframes: [0, 0],
										velocity: 1e3,
										restDelta: .5,
										restSpeed: 5
									}));
									let o = 0, s = [], c = {
										calculatedDuration: null,
										next: (t) => {
											o = t;
											let n = i[0].next(t), r = n.done;
											for (let e = 1; e < i.length; e++) {
												let { value: n, done: o } = i[e].next(t);
												e < a ? s[e - 1] = n : this.impulse = n / 1e3, r &&= o;
											}
											return e && (this.edgeValues = s), n.done = r, n;
										}
									};
									return c.calculatedDuration = Sn(c), c.next(0), this.edgeVelocity = (e) => i[e + 1].velocity(o), c;
								}
							};
						}
					}
				}
				let a = Xo(this.motionValue, [0, 1e3], {
					...r,
					velocity: i,
					isSync: !0,
					onUpdate: (t) => {
						this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t);
					},
					onComplete: () => {
						e.onComplete && e.onComplete(), this.completeAnimation();
					}
				});
				this.currentAnimation = a, pr(this.currentAnimation, this), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
			});
		}
		completeAnimation() {
			this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
			let e = this.getStack();
			e && e.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = this.edgeValues = this.edgeVelocity = this.impulse = void 0, this.notifyListeners("animationComplete");
		}
		finishAnimation() {
			this.currentAnimation && (this.edgeValues = this.impulse = void 0, this.mixTargetDelta?.(oc), this.currentAnimation.stop()), this.completeAnimation();
		}
		applyTransformsToTarget() {
			let e = this.getLead(), { targetWithTransforms: t, layout: n, latestValues: r } = e, { target: i } = e;
			if (t && i && n) {
				if (this !== e && this.layout && n && Ic(this.options.animationType, this.layout.layoutBox, n.layoutBox)) {
					let { layoutBox: e } = this.layout, t = i;
					i = this.target || Vs(), Fc(i.x, t.x, e.x), Fc(i.y, t.y, e.y);
				}
				ms(t, i), B(t, r), Cs(this.projectionDeltaWithTransform, this.layoutCorrected, t, r);
			}
		}
		registerSharedNode(e, t) {
			this.sharedNodes.has(e) || this.sharedNodes.set(e, new Xs()), this.sharedNodes.get(e).add(t);
			let n = t.options.initialPromotionConfig;
			t.promote({
				transition: n?.transition,
				preserveFollowOpacity: n?.shouldPreserveFollowOpacity ? n.shouldPreserveFollowOpacity(t) : void 0
			});
		}
		isLead() {
			let e = this.getStack();
			return !e || e.lead === this;
		}
		getLead() {
			let { layoutId: e } = this.options;
			return e && this.getStack()?.lead || this;
		}
		getPrevLead() {
			let { layoutId: e } = this.options;
			return e ? this.getStack()?.prevLead : void 0;
		}
		getStack() {
			let { layoutId: e } = this.options;
			if (e) return this.root.sharedNodes.get(e);
		}
		promote({ needsReset: e, transition: t, preserveFollowOpacity: n } = {}) {
			this.getStack()?.promote(this, n), e && (this.projectionDelta = void 0, this.needsReset = !0), t && this.setOptions({ transition: t });
		}
		relegate() {
			return this.getStack()?.relegate(this) || !1;
		}
		resetSkewAndRotation() {
			let { visualElement: e } = this.options;
			if (!e) return;
			let { latestValues: t } = e;
			if (!No(t)) return;
			let n = {};
			for (let t = 0; t < ac.length; t++) cc(ac[t], e, n, this.animationValues);
			for (let t = 0; t < jo.length; t++) cc(jo[t], e, n, this.animationValues);
			e.render();
			for (let t in n) e.setStaticValue(t, n[t]), this.animationValues && (this.animationValues[t] = n[t]);
			e.scheduleRender();
		}
		applyProjectionStyles(e, t) {
			if (!this.instance || this.isSVG) return;
			let n = this.getLead();
			if (!this.isVisible && n !== this) {
				e.visibility = "hidden";
				return;
			}
			let r = this.getTransformTemplate();
			if (this.needsReset) {
				this.needsReset = !1, e.visibility = "", e.opacity = "", e.pointerEvents = ns(t?.pointerEvents) || "", e.transform = r ? r(this.latestValues, "") : "none";
				return;
			}
			if (!this.projectionDelta || !this.layout || !n.target) {
				(this.options.layoutId || this.needsShow) && (this.needsShow = !1, e.visibility = "", e.opacity = this.latestValues.opacity === void 0 ? 1 : this.latestValues.opacity, e.pointerEvents = ns(t?.pointerEvents) || ""), this.hasProjected && !Mo(this.latestValues) && (e.transform = r ? r({}, "") : "none", this.hasProjected = !1);
				return;
			}
			e.visibility = "";
			let i = n.animationValues || n.latestValues;
			this.applyTransformsToTarget();
			let a = ec(this.projectionDeltaWithTransform, this.treeScale, i);
			r && (a = r(i, a)), e.transform = a;
			let { x: o, y: s } = this.projectionDelta;
			e.transformOrigin = `${o.origin * 100}% ${s.origin * 100}% 0`, e.opacity = n.animationValues ? n === this ? i.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : i.opacityExit : n === this ? i.opacity === void 0 ? "" : i.opacity : i.opacityExit === void 0 ? 0 : i.opacityExit;
			for (let t in Zo) {
				if (i[t] === void 0) continue;
				let { correct: r, applyTo: o, isCSSVariable: s } = Zo[t], c = a === "none" ? i[t] : r(i[t], n);
				if (o) {
					let t = o.length;
					for (let n = 0; n < t; n++) e[o[n]] = c;
				} else s ? this.options.visualElement.renderState.vars[t] = c : e[t] = c;
			}
			this.options.layoutId && (e.pointerEvents = n === this ? ns(t?.pointerEvents) || "" : "none");
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = this.dragSnapshot = this.dragAncestor = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((e) => e.currentAnimation?.stop()), this.root.nodes.forEach(vc), this.root.sharedNodes.clear();
		}
	};
}
function pc(e) {
	e.updateLayout(), xc(e);
}
function mc(e) {
	let t = e.resumeFrom?.snapshot || e.snapshot;
	if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
		let { layoutBox: n, measuredBox: r } = e.layout, { animationType: i } = e.options, a = t.source !== e.layout.source, o = (r, a) => {
			if (i === "size") tc((e) => {
				let t = bs(r[e]);
				r[e].min = a[e].min, r[e].max = r[e].min + t;
			});
			else if (i === "x" || i === "y") {
				let e = i === "x" ? "y" : "x";
				ps(r[e], a[e]);
			} else Ic(i, t.layoutBox, n) && tc((t) => {
				let n = bs(a[t]);
				r[t].max = r[t].min + n, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[t].max = e.relativeTarget[t].min + n);
			});
		}, s = a ? t.measuredBox : t.layoutBox;
		o(s, n);
		let c = zs();
		Cs(c, n, t.layoutBox);
		let l = zs();
		Cs(l, a ? e.applyTransform(r, !0) : n, s);
		let u = !Us(c), d = !1, f = e.getClosestProjectingParent();
		if ((!a || f?.options.layoutRoot && e.resumeFrom?.path.includes(f)) && f && !f.resumeFrom) {
			let { snapshot: r, layout: i } = f;
			if (r && i) {
				let s = e.options.layoutAnchor || void 0, c = Vs();
				Ds(c, a ? e.resumeFrom.applyTransform(t.layoutBox, !0, void 0, !0, f.depth + 1) : t.layoutBox, r.layoutBox, s);
				let l = Vs();
				Ds(l, n, i.layoutBox, s), a && o(c, l), qs(c, l) || (d = !0), f.options.layoutRoot && (e.relativeTarget = l, e.relativeTargetOrigin = c, e.relativeParent = f);
			}
		}
		e.notifyListeners("didUpdate", {
			layout: n,
			snapshot: t,
			delta: l,
			layoutDelta: c,
			hasLayoutChanged: u,
			hasRelativeLayoutChanged: d
		});
	} else e.isLead() && e.options.onExitComplete?.();
	e.options.transition = void 0;
}
function hc(e) {
	Qo.countProjection?.(0), e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty ||= !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty), e.isTransformDirty ||= e.parent.isTransformDirty);
}
function gc(e) {
	e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function _c(e) {
	e.clearSnapshot();
}
function vc(e) {
	e.clearMeasurements();
}
function yc(e) {
	e.isLayoutDirty = !0, e.updateLayout();
}
function bc(e) {
	e.isLayoutDirty = !1;
}
function xc(e) {
	let { snapshot: t, dragAncestor: n } = e, r = n?.isAnimationBlocked && n.layout;
	if (!t || !r || e.resumeFrom || e.isAnimationBlocked) return;
	let i = n.dragSnapshot;
	tc((e) => Uo(t.layoutBox[e], r.layoutBox[e].min - i.layoutBox[e].min));
}
function Sc(e) {
	e.isAnimationBlocked && e.layout && !e.isLayoutDirty && (e.snapshot = e.dragSnapshot || e.layout, e.isLayoutDirty = !0);
}
function Cc(e) {
	e.relativeTarget && e.relativeParent?.isLayoutDirty && (e.currentAnimation ? e.isLayoutDirty = !0 : (e.targetDelta = void 0, e.removeRelativeTarget()));
}
function wc(e) {
	let { visualElement: t } = e.options;
	t?.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function Tc(e) {
	e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function Ec(e) {
	e.resolveTargetDelta();
}
function Dc(e) {
	e.calcProjection();
}
function Oc(e) {
	e.resetSkewAndRotation();
}
function kc(e, t, n, r, i) {
	let a = n.max - n.min, o = a ? Math.max(0, (a + i - r) / a) : 1, s = e.originPoint = t.originPoint;
	e.origin = t.origin, e.scale = o, e.translate = n.min + r - (s + (n.min - s) * o);
}
function Ac(e, t, n) {
	e.translate = I(t.translate, 0, n), e.scale = I(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function jc(e, t, n, r) {
	e.min = I(t.min, n.min, r), e.max = I(t.max, n.max, r);
}
function Mc(e, t, n, r) {
	jc(e.x, t.x, n.x, r), jc(e.y, t.y, n.y, r);
}
function Nc(e) {
	return e.animationValues?.opacityExit !== void 0;
}
var Pc = {
	duration: .45,
	ease: [
		.4,
		0,
		.1,
		1
	]
};
function Fc(e, t, n) {
	e.max = bs(n) + (e.min = t.min);
}
function Ic(e, t, n) {
	return e === "position" || e === "preserve-aspect" && !xs(Js(t), Js(n), .2);
}
function Lc(e) {
	return e !== e.root && e.scroll?.wasRoot;
}
// node_modules/motion-dom/dist/es/events/add-dom-event.mjs
function Rc(e, t, n, r = { passive: !0 }) {
	return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
}
// node_modules/motion-dom/dist/es/projection/node/DocumentProjectionNode.mjs
var zc = /* @__PURE__ */ fc({
	attachResizeListener: (e, t) => Rc(e, "resize", t),
	measureScroll: qo,
	checkIsScrollRoot: () => !0
}), Bc = { current: void 0 }, Vc = /* @__PURE__ */ fc({
	measureScroll: (e) => ({
		x: e.scrollLeft,
		y: e.scrollTop
	}),
	defaultParent: () => {
		if (!Bc.current) {
			let e = new zc({});
			e.mount(window), e.setOptions({ layoutScroll: !0 }), Bc.current = e;
		}
		return Bc.current;
	},
	resetTransform: (e, t) => {
		e.style.transform = t === void 0 ? "none" : t;
	},
	checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), Hc = /* @__PURE__ */ new WeakMap();
// node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function Uc(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
// node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function Wc(e) {
	return typeof e == "string" || Array.isArray(e);
}
// node_modules/motion-dom/dist/es/render/utils/variant-props.mjs
var Gc = [
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"whilePinch",
	"exit"
], Kc = /* @__PURE__ */ ["initial"].concat(Gc);
// node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function qc(e) {
	if (Uc(e.animate)) return !0;
	for (let t = 0; t < Kc.length; t++) if (Wc(e[Kc[t]])) return !0;
	return !1;
}
function Jc(e) {
	return !!(qc(e) || e.variants);
}
// node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function Yc(e, t, n) {
	for (let r in t) {
		let i = t[r], a = n[r];
		if (qa(i)) e.addValue(r, i);
		else if (qa(a)) e.addValue(r, wa(i, { owner: e }));
		else if (a !== i) {
			if (e.hasValue(r)) {
				let t = e.getValue(r);
				t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
			} else {
				let t = e.getStaticValue(r);
				e.addValue(r, wa(t === void 0 ? i : t, { owner: e }));
			}
		}
	}
	for (let r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
// node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var Xc = { current: null }, Zc = { current: !1 }, Qc = typeof window < "u";
function $c() {
	if (Zc.current = !0, Qc) {
		if (window.matchMedia) {
			let e = window.matchMedia("(prefers-reduced-motion)"), t = () => Xc.current = e.matches;
			e.addEventListener("change", t), t();
		} else Xc.current = !1;
	}
}
// node_modules/motion-dom/dist/es/render/VisualElement.mjs
var el = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], tl = {};
function nl(e) {
	tl = e;
}
function rl() {
	return tl;
}
var il = class {
	scrapeMotionValuesFromProps(e, t, n) {
		return {};
	}
	constructor({ parent: e, props: t, presenceContext: n, reducedMotionConfig: r, skipAnimations: i, blockInitialAnimation: a, visualState: o }, s = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = ui, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = N.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, L.render(this.render, !1, !0));
		};
		let { latestValues: c, renderState: l } = o;
		this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = t.initial ? { ...c } : {}, this.renderState = l, this.parent = e, this.props = t, this.presenceContext = n, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = i, this.options = s, this.blockInitialAnimation = !!a, this.isControllingVariants = qc(t), this.isVariantNode = Jc(t), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
		for (let e in d) {
			let t = d[e];
			c[e] !== void 0 && qa(t) && t.set(c[e]);
		}
	}
	mount(e) {
		let t = this.presenceContext;
		if (this.hasBeenMounted && t?.isPresent !== !1 && !t?.keepValuesOnRemount) for (let e in this.initialValues) this.values.get(e)?.jump(this.initialValues[e]), this.latestValues[e] = this.initialValues[e];
		if (this.current = e, Hc.set(e, this), this.projection?.instance || this.projection?.mount(e), this.isVariantNode && !this.isControllingVariants) {
			let e = this;
			do
				e = e.props.inherit !== !1 && e.parent;
			while (e && !e.isVariantNode);
			if (e) {
				let { variantChildren: t } = e;
				t.add(this), this.removeFromVariantTree = () => t.delete(this);
			}
		}
		this.values.forEach((e, t) => this.bindToMotionValue(t, e)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Zc.current || $c(), this.shouldReduceMotion = Xc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
	}
	unmount() {
		this.projection?.unmount(), _n(this.notifyUpdate), _n(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree?.(), this.parent?.removeChild(this);
		for (let e in this.events) this.events[e].clear();
		for (let e in this.features) {
			let t = this.features[e];
			t && (t.unmount(), t.isMounted = !1);
		}
		this.current = null;
	}
	addChild(e) {
		this.children.add(e), (this.enteringChildren ||= /* @__PURE__ */ new Set()).add(e);
	}
	removeChild(e) {
		this.children.delete(e), this.enteringChildren?.delete(e);
	}
	bindToMotionValue(e, t) {
		if (this.valueSubscriptions.get(e)?.(), t.accelerate && Mi.has(e) && this.current instanceof HTMLElement) {
			let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate, s = new Ci({
				element: this.current,
				name: e,
				keyframes: r,
				times: i,
				ease: a,
				duration: /* @__PURE__ */ ke(o)
			}), c = n(s);
			this.valueSubscriptions.set(e, () => {
				c(), s.cancel();
			});
			return;
		}
		let n = Kr.has(e);
		n && this.onBindTransform && this.onBindTransform();
		let r = t.on("change", (t) => {
			this.latestValues[e] = t, this.props.onUpdate && L.preRender(this.notifyUpdate), n && (this.projection && (this.projection.isTransformDirty = !0), Ki.get(this.current)?.check()), this.scheduleRender();
		}), i;
		typeof window < "u" && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, e, t)), this.valueSubscriptions.set(e, () => {
			r(), i?.();
		});
	}
	sortNodePosition(e) {
		return !this.current || !e.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
	}
	updateFeatures() {
		let e = "animation";
		for (e in tl) {
			let t = tl[e];
			if (!t) continue;
			let { isEnabled: n, Feature: r } = t;
			if (!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)), this.features[e]) {
				let t = this.features[e];
				t.isMounted ? t.update() : (t.mount(), t.isMounted = !0);
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Vs();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, t) {
		this.latestValues[e] = t;
	}
	update(e, t) {
		let { transformTemplate: n, onUpdate: r } = this.props;
		(e.transformTemplate || n) && this.scheduleRender(), (e.transformTemplate && !n || e.onUpdate && !r) && Ki.get(this.current)?.demote(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = t;
		for (let t = 0; t < el.length; t++) {
			let n = el[t];
			this.propEventSubscriptions[n]?.(), delete this.propEventSubscriptions[n];
			let r = e["on" + n];
			r && (this.propEventSubscriptions[n] = this.on(n, r));
		}
		this.prevMotionValues = Yc(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue?.();
	}
	getProps() {
		return this.props;
	}
	getVariant(e) {
		return this.props.variants?.[e];
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	addValue(e, t) {
		let n = this.values.get(e);
		if (t !== n) {
			n && this.removeValue(e), this.bindToMotionValue(e, t), this.values.set(e, t);
			let r = t.get();
			r !== void 0 && (this.latestValues[e] = r);
		}
	}
	removeValue(e) {
		this.values.delete(e), this.valueSubscriptions.get(e)?.(), this.valueSubscriptions.delete(e), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
	}
	hasValue(e) {
		return this.values.has(e);
	}
	getValue(e, t) {
		let n = this.props.values?.[e];
		return n || (n = this.values.get(e), n === void 0 && t !== void 0 && (n = wa(t ?? this.getDefaultValue?.(e), { owner: this }), this.addValue(e, n)), n);
	}
	readValue(e, t) {
		let n = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return n != null && (typeof n == "string" && (Se(n) || we(n)) ? n = parseFloat(n) : typeof n != "number" && !qt.test(n) && qt.test(t) && (n = Mr(e, t)), this.setBaseTarget(e, qa(n) ? n.get() : n)), qa(n) ? n.get() : n;
	}
	setBaseTarget(e, t) {
		this.baseTarget[e] = t;
	}
	on(e, t) {
		return (this.events[e] || (this.events[e] = new Oe())).add(t);
	}
	notify(e, ...t) {
		this.events[e]?.notify(...t);
	}
	scheduleRenderMicrotask() {
		Jo.render(this.render);
	}
}, al = class extends il {
	constructor() {
		super(...arguments), this.KeyframeResolver = uo;
	}
	sortInstanceNodePosition(e, t) {
		return e.compareDocumentPosition(t) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(e, t) {
		let n = e.style;
		return n ? n[t] : void 0;
	}
	removeValueFromRenderState(e, { vars: t, style: n }) {
		delete t[e], delete n[e];
	}
	handleChildMotionValue() {
		this.childSubscription && (this.childSubscription(), delete this.childSubscription);
		let { children: e } = this.props;
		qa(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
};
// node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function ol(e, { style: t, vars: n }, r, i) {
	let a = e.style, o;
	for (o in t) a[o] = t[o];
	for (o in i?.applyProjectionStyles(a, r), n) a.setProperty(o, n[o]);
}
// node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function sl(e, { layout: t, layoutId: n }) {
	return Kr.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Zo[e] || e === "opacity");
}
// node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function cl(e, t, n) {
	let r = e.style, i = t?.style, a = {};
	if (!r) return a;
	for (let t in r) (qa(r[t]) || i && qa(i[t]) || sl(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
// node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function ll(e) {
	return window.getComputedStyle(e);
}
var ul = class extends al {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = ol;
	}
	mount(e) {
		super.mount(e);
	}
	readValueFromInstance(e, t) {
		if (Kr.has(t)) return this.projection?.isProjecting ? Hr(t) : Wr(e, t);
		{
			let n = ll(e), r = (nt(t) ? n.getPropertyValue(t) : n[t]) || 0;
			return typeof r == "string" ? r.trim() : r;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: t }) {
		return Go(e, t);
	}
	build(e, t, n) {
		bo(e, t, n.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return cl(e, t, n);
	}
}, dl = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1;
// node_modules/motion-dom/dist/es/events/event-info.mjs
function fl(e) {
	return { point: {
		x: e.pageX,
		y: e.pageY
	} };
}
var pl = (e) => (t) => dl(t) && e(t, fl(t));
// node_modules/motion-dom/dist/es/events/add-pointer-event.mjs
function ml(e, t, n, r) {
	return Rc(e, t, pl(n), r);
}
// node_modules/motion-dom/dist/es/resize/handle-element.mjs
var hl = /* @__PURE__ */ new WeakMap(), gl, _l = (e, t, n) => (r, i) => i && i[0] ? i[0][e + "Size"] : mo(r) && "getBBox" in r ? r.getBBox()[t] : r[n], vl = /*@__PURE__*/ _l("inline", "width", "offsetWidth"), yl = /*@__PURE__*/ _l("block", "height", "offsetHeight");
function bl({ target: e, borderBoxSize: t }) {
	hl.get(e)?.forEach((n) => {
		n(e, {
			get width() {
				return vl(e, t);
			},
			get height() {
				return yl(e, t);
			}
		});
	});
}
function xl(e) {
	e.forEach(bl);
}
function Sl() {
	typeof ResizeObserver < "u" && (gl = new ResizeObserver(xl));
}
function Cl(e, t) {
	gl || Sl();
	let n = vo(e);
	return n.forEach((e) => {
		let n = hl.get(e);
		n || (n = /* @__PURE__ */ new Set(), hl.set(e, n)), n.add(t), gl?.observe(e);
	}), () => {
		n.forEach((e) => {
			let n = hl.get(e);
			n?.delete(t), n?.size || gl?.unobserve(e);
		});
	};
}
// node_modules/motion-dom/dist/es/resize/handle-window.mjs
var wl = /* @__PURE__ */ new Set(), Tl;
function El() {
	Tl = () => {
		let e = {
			get width() {
				return window.innerWidth;
			},
			get height() {
				return window.innerHeight;
			}
		};
		wl.forEach((t) => t(e));
	}, window.addEventListener("resize", Tl);
}
function Dl(e) {
	return wl.add(e), Tl || El(), () => {
		wl.delete(e), !wl.size && typeof Tl == "function" && (window.removeEventListener("resize", Tl), Tl = void 0);
	};
}
// node_modules/motion-dom/dist/es/resize/index.mjs
function Ol(e, t) {
	return go(typeof e == "function" ? Dl(e) : Cl(e, t));
}
// node_modules/motion-dom/dist/es/utils/distance.mjs
var kl = (e, t) => Math.abs(e - t);
function Al(e, t) {
	let n = kl(e.x, t.x), r = kl(e.y, t.y);
	return Math.sqrt(n ** 2 + r ** 2);
}
// node_modules/motion-dom/dist/es/gestures/pan/PanSession.mjs
var jl = /*#__PURE__*/ new Set(["auto", "scroll"]), Ml = class {
	constructor(e, t, { transformPagePoint: n, contextWindow: r = window, dragSnapToOrigin: i = !1, distanceThreshold: a = 3, element: o, immediate: s } = {}) {
		if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.onElementScroll = (e) => {
			this.handleScroll(e.target);
		}, this.onWindowScroll = () => {
			this.handleScroll(window);
		}, this.updatePoint = () => {
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			this.hasPendingMove = !1, this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Pl(this.lastRawMoveEventInfo, this.transformPagePoint));
			let e = Il(this.lastMoveEventInfo, this.history), t = this.startEvent !== null, n = Al(e.offset, {
				x: 0,
				y: 0
			}) >= this.distanceThreshold;
			if (!t && !n) return;
			let { point: r } = e;
			this.history.push({
				...r,
				timestamp: N.now()
			});
			let { onStart: i, onMove: a } = this.handlers;
			t || (i?.(this.lastMoveEvent, e), this.startEvent = this.lastMoveEvent), a?.(this.lastMoveEvent, e);
		}, this.handlePointerMove = (e, t) => {
			this.handleScroll(window), this.lastMoveEvent = e, this.lastRawMoveEventInfo = t, this.lastMoveEventInfo = Pl(t, this.transformPagePoint), this.hasPendingMove = !0, L.update(this.updatePoint, !0);
		}, this.handlePointerUp = (e, t) => {
			this.hasPendingMove && this.updatePoint(), this.end();
			let { onEnd: n, onSessionEnd: r, resumeAnimation: i } = this.handlers;
			if ((this.dragSnapToOrigin || !this.startEvent) && i?.(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			let a = Il(e.type === "pointercancel" ? this.lastMoveEventInfo : Pl(t, this.transformPagePoint), this.history);
			this.startEvent && n?.(e, a), r?.(e, a);
		}, !dl(e)) return;
		this.dragSnapToOrigin = i, this.handlers = t, this.transformPagePoint = n, this.distanceThreshold = s ? 0 : a, this.contextWindow = r || window;
		let c = fl(e), l = Pl(c, this.transformPagePoint), { point: u } = l;
		this.history = [{
			...u,
			timestamp: N.now()
		}];
		let { onSessionStart: d } = t;
		d && d(e, Il(l, this.history));
		let f = {
			passive: !0,
			capture: !0
		};
		this.removeListeners = Ee(ml(this.contextWindow, "pointermove", this.handlePointerMove, f), ml(this.contextWindow, "pointerup", this.handlePointerUp, f), ml(this.contextWindow, "pointercancel", this.handlePointerUp, f)), o && this.startScrollTracking(o), s && (this.handlePointerMove(e, c), this.updatePoint());
	}
	startScrollTracking(e) {
		let t = e.parentElement;
		for (; t;) {
			let e = getComputedStyle(t);
			(jl.has(e.overflowX) || jl.has(e.overflowY)) && this.scrollPositions.set(t, Nl(t)), t = t.parentElement;
		}
		this.scrollPositions.set(window, Nl(window)), this.removeScrollListeners = Ee(Rc(window, "scroll", this.onElementScroll, { capture: !0 }), Rc(window, "scroll", this.onWindowScroll, {}));
	}
	handleScroll(e) {
		let t = this.scrollPositions.get(e);
		if (!t) return;
		let n = e === window, r = Nl(e), i = {
			x: r.x - t.x,
			y: r.y - t.y
		};
		(i.x !== 0 || i.y !== 0) && (n ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += i.x, this.lastMoveEventInfo.point.y += i.y) : this.history.length > 0 && (this.history[0].x -= i.x, this.history[0].y -= i.y), this.scrollPositions.set(e, r), L.update(this.updatePoint, !0));
	}
	updateHandlers(e) {
		this.handlers = e;
	}
	end() {
		this.removeListeners?.(), this.removeScrollListeners?.(), this.scrollPositions.clear(), _n(this.updatePoint);
	}
}, Nl = (e) => e === window ? {
	x: window.scrollX,
	y: window.scrollY
} : {
	x: e.scrollLeft,
	y: e.scrollTop
};
function Pl(e, t) {
	return t ? { point: t(e.point) } : e;
}
function Fl(e, t) {
	return {
		x: e.x - t.x,
		y: e.y - t.y
	};
}
function Il({ point: e }, t) {
	return {
		point: e,
		delta: Fl(e, Rl(t)),
		offset: Fl(e, Ll(t)),
		velocity: zl(t, .1)
	};
}
function Ll(e) {
	return e[0];
}
function Rl(e) {
	return e[e.length - 1];
}
function zl(e, t) {
	if (e.length < 2) return {
		x: 0,
		y: 0
	};
	let n = e.length - 1, r = null, i = Rl(e);
	for (; n >= 0 && (r = e[n], !(i.timestamp - r.timestamp > /* @__PURE__ */ ke(t)));) n--;
	if (!r) return {
		x: 0,
		y: 0
	};
	r === e[0] && e.length > 2 && i.timestamp - r.timestamp > /* @__PURE__ */ ke(t) * 2 && (r = e[1]);
	let a = /* @__PURE__ */ Ae(i.timestamp - r.timestamp);
	if (a === 0) return {
		x: 0,
		y: 0
	};
	let o = {
		x: (i.x - r.x) / a,
		y: (i.y - r.y) / a
	};
	return o.x === Infinity && (o.x = 0), o.y === Infinity && (o.y = 0), o;
}
// node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs
var Bl = /* @__PURE__ */ new Set([
	"BUTTON",
	"INPUT",
	"SELECT",
	"TEXTAREA",
	"A"
]);
function Vl(e) {
	return Bl.has(e.tagName) || e.isContentEditable === !0;
}
var Hl = /* @__PURE__ */ new Set([
	"INPUT",
	"SELECT",
	"TEXTAREA"
]);
function Ul(e) {
	return Hl.has(e.tagName) || e.isContentEditable === !0;
}
// node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs
var Wl = {
	x: !1,
	y: !1
};
function Gl() {
	return Wl.x || Wl.y;
}
// node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs
function Kl(e) {
	return e === "x" || e === "y" ? Wl[e] ? null : (Wl[e] = !0, () => {
		Wl[e] = !1;
	}) : Wl.x || Wl.y ? null : (Wl.x = Wl.y = !0, () => {
		Wl.x = Wl.y = !1;
	});
}
// node_modules/motion-dom/dist/es/gestures/drag/utils/constraints.mjs
function ql(e, { min: t, max: n }, r) {
	return t !== void 0 && e < t ? e = r ? I(t, e, r.min) : Math.max(e, t) : n !== void 0 && e > n && (e = r ? I(n, e, r.max) : Math.min(e, n)), e;
}
function Jl(e, t, n) {
	return {
		min: t === void 0 ? void 0 : e.min + t,
		max: n === void 0 ? void 0 : e.max + n - (e.max - e.min)
	};
}
function Yl(e, { top: t, left: n, bottom: r, right: i }) {
	return {
		x: Jl(e.x, n, i),
		y: Jl(e.y, t, r)
	};
}
function Xl(e, t) {
	let n = t.min - e.min, r = t.max - e.max;
	return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), {
		min: n,
		max: r
	};
}
function Zl(e, t) {
	return {
		x: Xl(e.x, t.x),
		y: Xl(e.y, t.y)
	};
}
function Ql(e, t) {
	let n = .5, r = bs(e), i = bs(t);
	return i > r ? n = /* @__PURE__ */ De(t.min, t.max - r, e.min) : r > i && (n = /* @__PURE__ */ De(e.min, e.max - i, t.min)), j(0, 1, n);
}
function $l(e, t) {
	let n = {};
	return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
var eu = .35;
function tu(e = eu) {
	return e === !1 ? e = 0 : e === !0 && (e = eu), {
		x: nu(e, "left", "right"),
		y: nu(e, "top", "bottom")
	};
}
function nu(e, t, n) {
	return {
		min: ru(e, t),
		max: ru(e, n)
	};
}
function ru(e, t) {
	return typeof e == "number" ? e : e[t] || 0;
}
// node_modules/motion-dom/dist/es/gestures/drag/VisualElementDragControls.mjs
function iu(e) {
	let t = "";
	for (let n of e.path) {
		n.scroll = void 0, n.updateScroll();
		let { scroll: r } = n;
		n !== e.root && r && (t += r.offset.x + "," + r.offset.y + ",");
	}
	return t;
}
var au = /* @__PURE__ */ new WeakMap(), ou = class {
	constructor(e, t = () => e.getProps()) {
		this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
			x: 0,
			y: 0
		}, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Vs(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e, this.readProps = t;
	}
	start(e, t = {}) {
		if (this.visualElement.presenceContext?.isPresent === !1) return;
		let n = (e) => {
			t.snapToCursor && this.snapToCursor(e), this.stopAnimation();
		}, r = (e, t) => {
			let { drag: n, dragConstraints: r, dragPropagation: i, onDragStart: a } = this.getProps();
			if (n && !i && (this.openDragLock?.(), this.openDragLock = Kl(n), !this.openDragLock)) return;
			this.latestPointerEvent = e, this.latestPanInfo = t, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints();
			let { projection: o } = this.visualElement;
			o && (o.isAnimationBlocked = !0, o.target = void 0), tc((e) => {
				let t = this.getAxisMotionValue(e).get() || 0;
				if (it(t) && (t = La(t, this.visualElement.current) || 0), P.test(t)) t = parseFloat(t);
				else if (Ct.test(t)) {
					let n = o?.layout?.layoutBox[e];
					n && (t = bs(n) * (parseFloat(t) / 100));
				}
				this.originPoint[e] = t;
			}), this.point = typeof r == "function" && r(this), a && L.update(() => a(e, t), !1, !0), Ya(this.visualElement, "transform"), this.visualElement.animationState?.setActive("whileDrag", !0);
		}, i = (e, t) => {
			this.latestPointerEvent = e, this.latestPanInfo = t;
			let { dragPropagation: n, dragDirectionLock: r, onDirectionLock: i, onDrag: a } = this.getProps();
			if (!n && !this.openDragLock) return;
			let { offset: o } = t;
			if (r && this.currentDirection === null) {
				if (this.currentDirection = du(o), this.currentDirection === null) return;
				i && i(this.currentDirection);
			}
			this.updateAxis("x", o), this.updateAxis("y", o), this.point && this.point.move(), this.visualElement.render(), a && L.update(() => a(e, t), !1, !0);
		}, a = (e, t) => {
			this.latestPointerEvent = e, this.latestPanInfo = t, this.stop(e, t), this.latestPointerEvent = null, this.latestPanInfo = null;
		}, o = () => {
			let { dragSnapToOrigin: e } = this.getProps();
			(e || this.constraints || this.point) && this.startAnimation({
				x: 0,
				y: 0
			});
		}, { dragSnapToOrigin: s } = this.getProps();
		this.panSession = new Ml(e, {
			onSessionStart: n,
			onStart: r,
			onMove: i,
			onSessionEnd: a,
			resumeAnimation: o
		}, {
			...t,
			transformPagePoint: this.visualElement.getTransformPagePoint(),
			dragSnapToOrigin: s,
			contextWindow: this.visualElement.current?.ownerDocument.defaultView,
			element: this.visualElement.current
		});
	}
	stop(e, t, n) {
		let r = e || this.latestPointerEvent, i = t || this.latestPanInfo, a = this.isDragging;
		if (this.cancel(), !a || !i || !r) return;
		let { velocity: o } = i;
		this.startAnimation(o, n);
		let { onDragEnd: s } = this.getProps();
		s && L.postRender(() => s(r, i));
	}
	cancel() {
		this.isDragging = !1;
		let { projection: e, animationState: t } = this.visualElement;
		e && (e.isAnimationBlocked = !1), this.endPanSession(), !this.getProps().dragPropagation && this.openDragLock && (this.openDragLock(), this.openDragLock = null), t?.setActive("whileDrag", !1);
	}
	endPanSession() {
		this.panSession?.end(), this.panSession = void 0;
	}
	updateAxis(e, t) {
		let { drag: n } = this.readProps();
		if (!t || !uu(e, n, this.currentDirection)) return;
		let r = this.getAxisMotionValue(e), i = this.originPoint[e] + t[e], a = this.constraints && this.constraints[e];
		a && (i = ql(i, a, this.elastic[e])), this.point ? this.point[e] = i : r.set(i);
	}
	resolveConstraints() {
		let { dragConstraints: e, dragElastic: t } = this.getProps(), { projection: n } = this.visualElement, r = n && (n.layout || n.measure(!1)), i = this.constraints;
		su(e) ? this.constraints && this.scroll === iu(n) || (this.constraints = this.resolveRefConstraints()) : this.constraints = e && r && typeof e == "object" ? Yl(r.layoutBox, e) : !1, this.elastic = tu(t), i !== this.constraints && !su(e) && r && this.constraints && !this.hasMutatedConstraints && tc((e) => {
			this.constraints !== !1 && this.getAxisMotionValue(e) && (this.constraints[e] = $l(r.layoutBox[e], this.constraints[e]));
		});
	}
	resolveRefConstraints() {
		let { dragConstraints: e, onMeasureDragConstraints: t } = this.getProps();
		if (!su(e)) return !1;
		let n = cu(e), { projection: r } = this.visualElement;
		if (!r || !r.layout) return !1;
		this.scroll = iu(r);
		let i = Ko(n, r.root, this.visualElement.getTransformPagePoint()), a = Zl(r.layout.layoutBox, r.removeElementScroll(i));
		if (t) {
			let e = t(Do(a));
			this.hasMutatedConstraints = !!e, e && (a = Eo(e));
		}
		return a;
	}
	startAnimation(e, t) {
		let { drag: n, dragMomentum: r, dragElastic: i, dragTransition: a, dragSnapToOrigin: o, onDragTransitionEnd: s } = this.getProps(), c = {
			bounceStiffness: i ? 200 : 1e6,
			bounceDamping: i ? 40 : 1e7,
			timeConstant: 750,
			restDelta: 1,
			restSpeed: 10,
			...a
		}, l = (i) => r && !(this.point && o) && uu(i, t || n, this.currentDirection) ? e[i] : 0;
		if (this.point && !o) return this.point.release({
			x: l("x"),
			y: l("y")
		}, c).then(s);
		let u = this.constraints || {}, d = tc((e) => {
			if (!uu(e, t || n, this.currentDirection)) return;
			let r = u[e] || {};
			(o === !0 || o === e) && (r = {
				min: 0,
				max: 0
			});
			let i = {
				type: "inertia",
				velocity: l(e),
				...c,
				...r
			};
			return this.startAxisValueAnimation(e, i);
		});
		return Promise.all(d).then(s);
	}
	startAxisValueAnimation(e, t) {
		let n = this.getAxisMotionValue(e);
		return Ya(this.visualElement, e), n.start(Pa(e, n, 0, t, this.visualElement, !1));
	}
	stopAnimation() {
		tc((e) => this.getAxisMotionValue(e).stop());
	}
	getAxisMotionValue(e) {
		let t = `_drag${e.toUpperCase()}`;
		return this.readProps()[t] || this.visualElement.getValue(e, this.visualElement.latestValues[e] ?? 0);
	}
	snapToCursor({ clientX: e, clientY: t }) {
		let { drag: n } = this.getProps(), r = {
			x: e,
			y: t
		}, i = this.visualElement.getTransformPagePoint()?.(r) || r, a = this.visualElement.measureViewportBox();
		tc((e) => {
			if (!uu(e, n, this.currentDirection)) return;
			let t = this.getAxisMotionValue(e), { min: r, max: o } = a[e];
			t.set((t.get() || 0) + i[e] - I(r, o, .5));
		});
	}
	scalePositionWithinConstraints() {
		if (!this.visualElement.current) return;
		let { drag: e, dragConstraints: t } = this.getProps(), { projection: n } = this.visualElement;
		if (!su(t) || !n || !this.constraints) return;
		this.stopAnimation();
		let r = this.constraints, i = {
			x: 0,
			y: 0
		};
		tc((e) => {
			let t = this.getAxisMotionValue(e).get();
			i[e] = Ql({
				min: t,
				max: t
			}, r[e]);
		});
		let { transformTemplate: a } = this.visualElement.getProps();
		this.visualElement.current.style.transform = a ? a({}, "") : "none", n.root?.updateScroll(), n.updateLayout(), this.constraints = !1, this.resolveConstraints(), tc((t) => {
			let n = this.getAxisMotionValue(t);
			if (!uu(t, e, null) || !n.get()) return;
			let { min: r, max: a } = this.constraints[t];
			n.set(I(r, a, i[t]));
		}), this.visualElement.render();
	}
	addListeners() {
		if (!this.visualElement.current) return;
		au.set(this.visualElement, this);
		let e = this.visualElement.current, t = ml(e, "pointerdown", (t) => {
			let { drag: n, dragListener: r = !0 } = this.getProps(), i = t.target, a = i !== e && Ul(i);
			n && r && !a && this.start(t);
		}), n, r = () => {
			let { dragConstraints: t } = this.getProps(), r = su(t) && cu(t);
			r && (this.constraints = this.resolveRefConstraints(), n ||= lu(e, r, () => this.scalePositionWithinConstraints()));
		}, { projection: i } = this.visualElement, a = i.addEventListener("measure", r);
		i.layout || (i.root?.updateScroll(), i.updateLayout()), L.read(r);
		let o = Rc(window, "resize", () => this.scalePositionWithinConstraints()), s = i.addEventListener("didUpdate", (({ delta: e, hasLayoutChanged: t }) => {
			this.isDragging && t && (tc((t) => {
				if (!uu(t, this.getProps().drag, this.currentDirection)) return;
				let n = this.getAxisMotionValue(t);
				this.originPoint[t] += e[t].translate, n.set(n.get() + e[t].translate);
			}), this.visualElement.render());
		}));
		return () => {
			o(), t(), a(), s(), n?.();
		};
	}
	getProps() {
		let e = this.readProps(), { dragElastic: t = eu, dragMomentum: n = !0 } = e;
		return {
			...e,
			dragElastic: t,
			dragMomentum: n
		};
	}
};
function su(e) {
	return !!e && typeof e == "object" && ("current" in e || "nodeType" in e);
}
var cu = (e) => "current" in e ? e.current : e;
function V(e) {
	let t = !0;
	return () => {
		t ? t = !1 : e();
	};
}
function lu(e, t, n) {
	let r = Ol(e, V(n)), i = Ol(t, V(n));
	return () => {
		r(), i();
	};
}
function uu(e, t, n) {
	return (t === !0 || t === e) && (n === null || n === e);
}
function du(e, t = 10) {
	let n = null;
	return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
// node_modules/motion-dom/dist/es/gestures/utils/setup.mjs
function fu(e, t) {
	let n = vo(e), r = new AbortController();
	return [
		n,
		{
			passive: !0,
			...t,
			signal: r.signal
		},
		go(() => r.abort())
	];
}
// node_modules/motion-dom/dist/es/gestures/hover.mjs
function pu(e) {
	return !(e.pointerType === "touch" || Gl());
}
function mu(e, t, n = {}) {
	t = _o(t);
	let [r, i, a] = fu(e, n);
	return r.forEach((e) => {
		let n = !1, r = !1, a, o = () => {
			e.removeEventListener("pointerleave", u);
		}, s = (e) => {
			a &&= (a(e), void 0), o();
		}, c = (e) => {
			n = !1, window.removeEventListener("pointerup", c), window.removeEventListener("pointercancel", c), r && (r = !1, s(e));
		}, l = () => {
			n = !0, window.addEventListener("pointerup", c, i), window.addEventListener("pointercancel", c, i);
		}, u = (e) => {
			e.pointerType !== "touch" && (n ? r = !0 : s(e));
		};
		e.addEventListener("pointerenter", (n) => {
			if (!pu(n)) return;
			r = !1;
			let o = t(e, n);
			typeof o == "function" && (a = o, e.addEventListener("pointerleave", u, i));
		}, i), e.addEventListener("pointerdown", l, i);
	}), a;
}
// node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs
var hu = (e, t) => t ? e === t || hu(e, t.parentElement) : !1, gu = /* @__PURE__ */ new WeakSet();
// node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs
function _u(e) {
	return (t) => {
		t.key === "Enter" && e(t);
	};
}
function vu(e, t) {
	e.dispatchEvent(new PointerEvent("pointer" + t, {
		isPrimary: !0,
		bubbles: !0
	}));
}
var yu = (e, t) => {
	let n = !1, r = _u(() => {
		n || gu.has(e) || (n = !0, vu(e, "down"));
	}), i = _u(() => {
		n && (n = !1, vu(e, "up"));
	});
	e.addEventListener("keydown", r, t), e.addEventListener("keyup", i, t), e.addEventListener("blur", () => {
		e.removeEventListener("keydown", r), e.removeEventListener("keyup", i), n && vu(e, "cancel");
	}, {
		...t,
		once: !0
	});
};
// node_modules/motion-dom/dist/es/gestures/press/index.mjs
function bu(e) {
	return dl(e) && !Gl();
}
var xu = /* @__PURE__ */ new WeakSet(), Su = 100, Cu = 8, wu = (e, t, n) => Math.hypot(e.clientX - t.clientX, e.clientY - t.clientY) > n, Tu = (e) => e.preventDefault();
function Eu(e, t, n = {}) {
	t = _o(t);
	let [r, i, a] = fu(e, n), o = /* @__PURE__ */ new WeakMap(), s = (e) => {
		let r = e.currentTarget;
		if (!bu(e) || xu.has(e)) return;
		n.stopPropagation && xu.add(e);
		let { count: a = 1, countTimeout: s = .3, hold: c = 0, repeat: l } = n, u = N.now(), d = /* @__PURE__ */ ke(c), f = /* @__PURE__ */ ke(s), p = o.get(r);
		p?.expire(wu(p.event, e, Su)) ? p = void 0 : p && (_n(p.expire), o.delete(r));
		let m = p ? p.count + 1 : 1, h = m >= a, g = h && (c || l), _ = !c, v = 0, y;
		if (gu.add(r), p) y = p.handlers;
		else {
			let n = t(r, e);
			y = typeof n == "function" ? { onComplete: n } : n || {};
		}
		h && _ && y.onActive?.();
		let b = /* @__PURE__ */ ke(l), x = d || b, S = u + x, C = !0, w = () => {
			if (i.signal.aborted) return _n(w);
			let e = Math.min(1 - (S - N.now()) / x, 1);
			C && e < 1 && (e = 0), C = !1, y.onHold?.(e), e < 1 || (_ ? y.onRepeat?.(++v) : (_ = !0, y.onActive?.()), l ? (C = !0, S += x = b) : _n(w));
		}, T = {
			...i,
			capture: !0
		}, E = (t, n) => {
			if (dl(t)) {
				if (window.removeEventListener("pointerup", D, T), window.removeEventListener("pointercancel", ee, T), window.removeEventListener("pointermove", O, T), r.removeEventListener("contextmenu", Tu), _n(w), gu.delete(r), Gl() && (n = !1), n && !h) {
					let n = N.now(), a = (e) => {
						let s = i.signal.aborted;
						if (s || e === !0 || N.now() - n > f) return _n(a), o.delete(r), s || y.onComplete?.(t, { success: !1 }), !0;
					};
					o.set(r, {
						count: m,
						event: e,
						handlers: y,
						expire: a
					}), L.update(a, !0);
				} else y.onComplete?.(t, { success: n && _ });
			}
		}, D = (e) => {
			E(e, r === window || r === document || n.useGlobalTarget || hu(r, e.target));
		}, ee = (e) => {
			E(e, !1);
		}, O = (t) => {
			dl(t) && ((l || !_) && wu(e, t, Cu) || a > 1 && Gl()) && ee(t);
		};
		window.addEventListener("pointerup", D, T), window.addEventListener("pointercancel", ee, T), (g || a > 1) && window.addEventListener("pointermove", O, T), g && (L.update(w, !0), r.addEventListener("contextmenu", Tu, {
			...i,
			passive: !1
		}));
	};
	return r.forEach((e) => {
		(n.useGlobalTarget ? window : e).addEventListener("pointerdown", s, i), po(e) && (e.addEventListener("focus", () => yu(e, i), i), !Vl(e) && !e.hasAttribute("tabindex") && (e.tabIndex = 0));
	}), a;
}
// node_modules/motion-dom/dist/es/render/Feature.mjs
var Du = class {
	constructor(e) {
		this.isMounted = !1, this.node = e;
	}
	update() {}
}, Ou = /* @__PURE__ */ new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]), ku = (e) => typeof e == "string" && e.toLowerCase() === "svg";
// node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function Au(e, t, n, r) {
	ol(e, t, void 0, r);
	for (let n in t.attrs) e.setAttribute(Ou.has(n) ? n : yo(n), t.attrs[n]);
}
// node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function ju(e, t, n) {
	let r = cl(e, t, n);
	for (let n in e) if (n !== "children" && (qa(e[n]) || qa(t[n]))) {
		let t = Gr.indexOf(n) === -1 ? n : "attr" + n.charAt(0).toUpperCase() + n.substring(1);
		r[t] = e[n];
	}
	return r;
}
// node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var Mu = class extends al {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Vs;
	}
	getBaseTargetFromProps(e, t) {
		return Kr.has(t) ? super.getBaseTargetFromProps(e, t) ?? Hr(t) : e[t];
	}
	getDefaultValue(e) {
		return Kr.has(e) ? this.latestValues[e] ?? Hr(e) : void 0;
	}
	readValueFromInstance(e, t) {
		if (Kr.has(t)) {
			let e = Dr(t);
			return e && e.default || 0;
		}
		if (wo.includes(t)) {
			let n = getComputedStyle(e)[t];
			if (typeof n == "string" && n) return n.trim();
		}
		return t = Ou.has(t) ? t : yo(t), e.getAttribute(t);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return ju(e, t, n);
	}
	build(e, t, n) {
		To(e, t, this.isSVGTag, n.transformTemplate, n.style);
	}
	renderInstance(e, t, n, r) {
		Au(e, t, n, r);
	}
	mount(e) {
		this.isSVGTag = ku(e.tagName), super.mount(e);
	}
};
// node_modules/motion-dom/dist/es/render/utils/shallow-compare.mjs
function Nu(e, t) {
	if (!Array.isArray(t)) return !1;
	let n = t.length;
	if (n !== e.length) return !1;
	for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
	return !0;
}
// node_modules/motion-dom/dist/es/render/utils/animation-state.mjs
var Pu = [...Gc].reverse(), Fu = (e) => e?.out === !0 ? e : e?.out;
function Iu(e) {
	let t = (t) => Promise.all(t.map(({ animation: t, options: n }) => no(e, t, n))), n = Ru(), r = !0, i = !1;
	function a(a) {
		let { props: o, parent: s, manuallyAnimateOnMount: c } = e, { initial: l } = o, u = r || i, d = [], f = (t = l) => typeof t != "boolean" && Ba(e, Array.isArray(t) ? t[0] : t, e.presenceContext?.custom) || void 0, p = /* @__PURE__ */ new Map(), m = {}, h = Infinity, g = e;
		do
			g = g.props.inherit !== !1 && g.parent;
		while (g && !g.isControllingVariants);
		let _ = u && Fu(f(l ?? (g && g.props.initial))?.transition);
		if (Pu.forEach((t, r) => {
			let i = n[t], l = o[t], f = g && g.props[t], v = l === void 0 ? Wc(f) || f === !1 ? f : void 0 : l, y = Wc(v), b = t === a ? i.isActive : null, x = y && l === void 0 && !(u && c);
			if (i.protectedKeys = { ...m }, !i.isActive && b === null || !v && !i.prevProp || Uc(v) || typeof v == "boolean") return;
			if (b === !1 && (h = r), t === "exit" && i.isActive && b !== !0) {
				m = {
					...m,
					...i.prevResolvedValues
				};
				return;
			}
			let S = Lu(i.prevProp, v), C = S || y && (b && !x || r > h), w = !1, T = Array.isArray(v) ? v : [v], E = {}, D;
			if (b !== !1) for (let n of T) {
				let { transition: r, transitionEnd: i, ...a } = Ba(e, n, Va(e, t)) || {};
				E = {
					...E,
					...a,
					...i
				}, D = Fu(r) || D;
			}
			let { prevResolvedValues: ee } = i;
			for (let t in {
				...ee,
				...E
			}) {
				if (t in m) continue;
				let n = E[t], r = ee[t], a = Array.isArray(n) && Array.isArray(r) ? !Nu(n, r) || S : n !== r, o;
				if (a && n == null) p.has(t) || p.set(t, i.prevOut);
				else if (a || n !== void 0 && p.has(t)) {
					C = !0, o = p.get(t) || _, p.delete(t) && (w = !0), i.needsAnimating[t] = !0;
					let n = e.getValue(t);
					n && (n.liveStyle = !1);
				} else i.protectedKeys[t] = !0;
				i.out[t] = o;
			}
			if (i.prevProp = v, i.prevResolvedValues = E, i.prevOut = D, i.isActive && (m = {
				...m,
				...E
			}), C && (!(x && S) || w)) for (let n of T) {
				let r = { type: t };
				if (typeof n == "string" && u && c && s?.enteringChildren) {
					let t = Ba(s, n)?.transition?.delayChildren;
					r.delay = ya(s.enteringChildren, e, t);
				}
				d.push({
					animation: n,
					options: r
				});
			}
		}), p.size) {
			let t = {}, n = f(), r = n?.transition;
			p.forEach((i, a) => {
				i && (r = {
					...r || e.getDefaultTransition(),
					[a]: i
				});
				let s = e.getValue(a);
				s && (s.liveStyle = !0);
				let c = n && !Array.isArray(l) ? n[a] : void 0, u = e.getBaseTargetFromProps(o, a);
				t[a] = (c === void 0 ? u !== void 0 && !qa(u) ? u : e.initialValues[a] === void 0 ? e.baseTarget[a] : void 0 : c) ?? null;
			}), r && (t.transition = r), d.push({ animation: t });
		}
		let v = u && e.blockInitialAnimation || r && !c && (o.initial === !1 || o.initial === o.animate);
		return r = i = !1, !v && d.length ? t(d) : Promise.resolve();
	}
	function o(t, r) {
		if (n[t].isActive === r) return Promise.resolve();
		e.variantChildren?.forEach((e) => e.animationState?.setActive(t, r)), n[t].isActive = r;
		let i = a(t);
		for (let e in n) n[e].protectedKeys = {};
		return i;
	}
	return {
		animateChanges: a,
		setActive: o,
		setAnimateFunction: (n) => {
			t = n(e);
		},
		getState: () => n,
		reset: () => {
			n = Ru(), i = !0;
		}
	};
}
function Lu(e, t) {
	return typeof t == "string" ? t !== e : Array.isArray(t) ? !Nu(t, e) : !1;
}
function Ru() {
	let e = {};
	for (let t of Gc) e[t] = {
		isActive: t === "animate",
		protectedKeys: {},
		needsAnimating: {},
		prevResolvedValues: {},
		out: {}
	};
	return e;
}
// node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
var zu = /* @__PURE__ */ (0, D.createContext)({
	transformPagePoint: (e) => e,
	isStatic: !1,
	reducedMotion: "never"
});
// node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs
function Bu(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function Vu(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Bu(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Bu(e[t], null);
			}
		};
	};
}
function Hu(...e) {
	return D.useCallback(Vu(...e), e);
}
// node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
var H = he(), Uu = (e) => {
	let { width: t, height: n } = e?.getBoundingClientRect() || {};
	return [t / e?.offsetWidth || 1, n / e?.offsetHeight || 1];
}, Wu = (e) => {
	let { left: t, top: n } = e.getBoundingClientRect(), r = e;
	for (; r = r.parentElement || r.parentNode?.host;) {
		let { scrollLeft: e, scrollTop: i } = r;
		if (e || i) {
			let [a, o] = Uu(r);
			t += e * a, n += i * o;
		}
		if (getComputedStyle(r).position === "fixed") break;
	}
	let [i, a] = Uu(e.offsetParent);
	return [t / i, n / a];
}, Gu = class extends D.Component {
	getSnapshotBeforeUpdate(e) {
		let t = this.props.getElement();
		if (po(t) && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
			let e = t.offsetParent, n = po(e) && e.offsetWidth || 0, r = po(e) && e.offsetHeight || 0, i = getComputedStyle(t), a = this.props.sizeRef.current;
			a.height = parseFloat(i.height), a.width = parseFloat(i.width), a.top = t.offsetTop, a.left = t.offsetLeft, a.right = n - a.width - a.left, a.bottom = r - a.height - a.top, a.direction = i.direction, a.point = Wu(t);
		}
		return null;
	}
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function Ku({ children: e, isPresent: t, anchorX: n, anchorY: r, root: i, pop: a, popNode: o }) {
	let s = (0, D.useId)(), c = (0, D.useRef)(null), l = (0, D.useRef)({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		direction: "ltr"
	}), { nonce: u } = (0, D.useContext)(zu), d = Hu(c, a === !1 ? void 0 : e.props?.ref ?? e?.ref), f = () => c.current || o?.current?.current, p = (e) => {
		let { width: t, height: i, top: a, left: o, right: c, bottom: u, direction: d } = l.current, f = d === "rtl", p = n === "left" ? f ? `right:${c}` : `left:${o}` : f ? `left:${o}` : `right:${c}`, m = r === "bottom" ? `bottom:${u}` : `top:${a}`;
		e?.insertRule(`[data-motion-pop-id="${s}"]{position:absolute!important;width:${t}px!important;height:${i}px!important;${p}px!important;${m}px!important}`);
	};
	return (0, D.useInsertionEffect)(() => {
		let { width: e, height: n } = l.current, r = f();
		if (t || a === !1 || !r || !e || !n) return;
		r.dataset.motionPopId = s;
		let o = r.ownerDocument, c = o.createElement("style");
		u && (c.nonce = u);
		let d = i ?? o.head;
		d.appendChild(c), p(c.sheet);
		let m = 0, h = 0;
		return Jo.setup(() => {
			let [e, t] = Wu(r);
			m = l.current.point[0] - e, h = l.current.point[1] - t;
		}), Jo.read(() => {
			let { sheet: e } = c;
			if (!e || !m && !h) return;
			let t = l.current;
			t.left += m, t.right -= m, t.top += h, t.bottom -= h, e.deleteRule(0), p(e);
		}), () => {
			r.removeAttribute("data-motion-pop-id"), d.contains(c) && d.removeChild(c);
		};
	}, [t]), (0, H.jsx)(Gu, {
		isPresent: t,
		getElement: f,
		sizeRef: l,
		pop: a,
		children: a === !1 ? e : D.cloneElement(e, { ref: d })
	});
}
// node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var qu = ({ children: e, initial: t, isPresent: n, onExitComplete: r, custom: i, presenceAffectsLayout: a, mode: o, anchorX: s, anchorY: c, root: l }) => {
	let u = _e(Ju), d = (0, D.useId)(), f = (0, D.useRef)(), p = (0, D.useRef)(n), m = (0, D.useRef)(r);
	ve(() => {
		p.current = n, m.current = r;
	});
	let h = !0, g = (0, D.useMemo)(() => (h = !1, {
		id: d,
		initial: t,
		isPresent: n,
		custom: i,
		onExitComplete: (e) => {
			u.set(e, !0);
			for (let e of u.values()) if (!e) return;
			r && r();
		},
		register: (e, t) => (u.set(e, !1), t && t.parent?.presenceContext?.id !== d && (f.current = t), () => {
			u.delete(e), !p.current && !u.size && m.current?.();
		})
	}), [
		n,
		u,
		r
	]);
	return a && h && (g = { ...g }), (0, D.useMemo)(() => {
		u.forEach((e, t) => u.set(t, !1));
	}, [n]), D.useEffect(() => {
		!n && !u.size && r && r();
	}, [n]), e = (0, H.jsx)(Ku, {
		pop: o === "popLayout",
		isPresent: n,
		anchorX: s,
		anchorY: c,
		root: l,
		popNode: f,
		children: e
	}), (0, H.jsx)(ye.Provider, {
		value: g,
		children: e
	});
};
function Ju() {
	return /* @__PURE__ */ new Map();
}
// node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
function Yu(e = !0) {
	let t = (0, D.useContext)(ye);
	if (t === null) return [!0, null];
	let { isPresent: n, onExitComplete: r, register: i } = t, a = (0, D.useId)();
	(0, D.useEffect)(() => {
		if (e) return i(a);
	}, [e]);
	let o = (0, D.useCallback)(() => e && r && r(a), [
		a,
		r,
		e
	]);
	return !n && r ? [!1, o] : [!0];
}
// node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs
var Xu = (e) => e.key || "";
function Zu(e) {
	let t = [];
	return D.Children.forEach(e, (e) => {
		(0, D.isValidElement)(e) && t.push(e);
	}), t;
}
// node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var Qu = ({ children: e, custom: t, initial: n = !0, onExitComplete: r, presenceAffectsLayout: i = !0, mode: a = "sync", propagate: o = !1, anchorX: s = "left", anchorY: c = "top", root: l }) => {
	let [u, d] = Yu(o), f = (0, D.useMemo)(() => Zu(e), [e]), p = o && !u ? [] : f.map(Xu), m = (0, D.useRef)(!0), h = _e(() => /* @__PURE__ */ new Map()), g = (0, D.useRef)(/* @__PURE__ */ new Set()), [_, v] = (0, D.useState)(f), [y, b] = (0, D.useState)(f);
	ve(() => {
		o && !u && !y.length && d?.();
	}, [
		u,
		o,
		y.length,
		d
	]);
	let x = (0, D.useRef)();
	(0, D.useEffect)(() => () => {
		let e = x.current;
		x.current = void 0, e?.();
	}, [y]), ve(() => {
		m.current = !1;
		for (let e = 0; e < y.length; e++) {
			let t = Xu(y[e]);
			p.includes(t) ? (h.delete(t), g.current.delete(t)) : h.get(t) !== !0 && h.set(t, !1);
		}
	}, [
		y,
		p.length,
		p.join("-")
	]);
	let S = [];
	if (f !== _) {
		let e = [...f], t = 0;
		for (let n of y) {
			let r = p.indexOf(Xu(n));
			r === -1 ? (e.splice(t++, 0, n), S.push(n)) : t = r + S.length + 1;
		}
		return S.every((e) => h.get(Xu(e))) ? e = f : a === "wait" && (e = S), b(Zu(e)), v(f), null;
	}
	let { forceRender: C } = (0, D.useContext)(ge);
	return (0, H.jsx)(H.Fragment, { children: y.map((e) => {
		let _ = Xu(e), b = o && !u ? !1 : f === y || p.includes(_);
		return (0, H.jsx)(qu, {
			isPresent: b,
			initial: !m.current || n ? void 0 : !1,
			custom: t,
			presenceAffectsLayout: i,
			mode: a,
			root: l,
			onExitComplete: b ? void 0 : () => {
				if (g.current.has(_)) return;
				if (h.has(_)) g.current.add(_), h.set(_, !0);
				else return;
				let e = !0;
				h.forEach((t) => {
					t || (e = !1);
				}), e && (C?.(), v([]), o && d?.(), x.current = r);
			},
			anchorX: s,
			anchorY: c,
			children: e
		}, _);
	}) });
}, $u = /* @__PURE__ */ (0, D.createContext)({ strict: !1 }), ed = {
	animation: ["variants", ...Gc],
	exit: ["exit"],
	drag: ["drag", "dragControls"],
	focus: ["whileFocus"],
	hover: [
		"whileHover",
		"onHoverStart",
		"onHoverEnd"
	],
	tap: [
		"whileTap",
		"onTap",
		"onTapStart",
		"onTapCancel"
	],
	pan: [
		"onPan",
		"onPanStart",
		"onPanSessionStart",
		"onPanEnd"
	],
	inView: [
		"whileInView",
		"onViewportEnter",
		"onViewportLeave"
	],
	layout: ["layout", "layoutId"]
}, td = !1;
function nd() {
	if (td) return;
	let e = {};
	for (let t in ed) e[t] = { isEnabled: (e) => ed[t].some((t) => !!e[t]) };
	nl(e), td = !0;
}
function U() {
	return nd(), rl();
}
// node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function rd(e) {
	let t = U();
	for (let n in e) t[n] = {
		...t[n],
		...e[n]
	};
	nl(t);
}
// node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs
function W({ children: e, ...t }) {
	let n = (0, D.useContext)(zu);
	t = {
		...n,
		...t
	}, t.transition = Ta(t.transition, n.transition), t.isStatic = _e(() => t.isStatic);
	let r = (0, D.useMemo)(() => t, [
		JSON.stringify(t.transition),
		t.transformPagePoint,
		t.reducedMotion,
		t.skipAnimations,
		t.isValidProp
	]);
	return (0, H.jsx)(zu.Provider, {
		value: r,
		children: e
	});
}
// node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
var G = /* @__PURE__ */ (0, D.createContext)({});
// node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function K(e, t) {
	if (qc(e)) {
		let { initial: t, animate: n } = e;
		return {
			initial: t === !1 || Wc(t) ? t : void 0,
			animate: Wc(n) ? n : void 0
		};
	}
	return e.inherit === !1 ? {} : t;
}
// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function id(e) {
	let { initial: t, animate: n } = K(e, (0, D.useContext)(G));
	return (0, D.useMemo)(() => ({
		initial: t,
		animate: n
	}), [ad(t), ad(n)]);
}
function ad(e) {
	return Array.isArray(e) ? e.join(" ") : e;
}
// node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var od = () => ({
	style: {},
	transform: {},
	transformOrigin: {},
	vars: {}
});
// node_modules/framer-motion/dist/es/render/html/use-props.mjs
function sd(e, t, n) {
	for (let r in t) !qa(t[r]) && !sl(r, n) && (e[r] = t[r]);
}
function cd({ transformTemplate: e }, t) {
	return (0, D.useMemo)(() => {
		let n = od();
		return bo(n, t, e), Object.assign({}, n.vars, n.style);
	}, [t]);
}
function ld(e, t) {
	let n = e.style || {}, r = {};
	return sd(r, n, e), Object.assign(r, cd(e, t)), r;
}
function ud(e, t) {
	let n = {}, r = ld(e, t);
	return e.drag && e.dragListener !== !1 && (n.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = r, n;
}
// node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var dd = () => ({
	...od(),
	attrs: {}
});
// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function fd(e, t, n, r) {
	let i = (0, D.useMemo)(() => {
		let n = dd();
		return To(n, t, ku(r), e.transformTemplate, e.style), {
			...n.attrs,
			style: { ...n.style }
		};
	}, [t]);
	if (e.style) {
		let t = {};
		return sd(t, e.style, e), {
			...i,
			style: {
				...t,
				...i.style
			}
		};
	}
	return i;
}
// node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
var pd = /* @__PURE__ */ new Set(/* @__PURE__ */ "animate.exit.variants.initial.style.values.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.tap.propagate.ignoreStrict.viewport.pinch".split("."));
function md(e) {
	return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || pd.has(e);
}
// node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
function hd(e, t) {
	return e.startsWith("on") ? !md(e) : t?.(e) ?? !md(e);
}
function gd(e, t, n, r) {
	let i = {};
	for (let a in e) a === "values" && typeof e.values == "object" || qa(e[a]) || (hd(a, r) || n === !0 && md(a) || !t && !md(a) || e.draggable && a.startsWith("onDrag")) && (i[a] = e[a]);
	return i;
}
// node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
var _d = [
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"switch",
	"symbol",
	"svg",
	"text",
	"tspan",
	"use",
	"view"
];
// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function vd(e) {
	return typeof e != "string" || e.includes("-") ? !1 : !!(_d.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function yd(e, t, n, { latestValues: r }, i, a = !1, o, s) {
	let c = (o ?? vd(e) ? fd : ud)(t, r, i, e), l = gd(t, typeof e == "string", a, s), u = e === D.Fragment ? {} : {
		...l,
		...c,
		ref: n
	}, { children: d } = t, f = (0, D.useMemo)(() => qa(d) ? d.get() : d, [d]);
	return (0, D.createElement)(e, {
		...u,
		children: f
	});
}
// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function bd({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, r, i) {
	return {
		latestValues: xd(n, r, i, e),
		renderState: t()
	};
}
function xd(e, t, n, r) {
	let i = {}, a = r(e, {});
	for (let e in a) i[e] = ns(a[e]);
	let { initial: o, animate: s } = e, c = qc(e), l = Jc(e);
	t && l && !c && e.inherit !== !1 && (o === void 0 && (o = t.initial), s === void 0 && (s = t.animate));
	let u = n ? n.initial === !1 : !1;
	u ||= o === !1;
	let d = u ? s : o;
	if (d && typeof d != "boolean" && !Uc(d)) {
		let t = Array.isArray(d) ? d : [d];
		for (let n = 0; n < t.length; n++) {
			let r = za(e, t[n]);
			if (r) {
				let { transitionEnd: e, transition: t, ...n } = r;
				for (let e in n) {
					let t = n[e];
					if (Array.isArray(t)) {
						let e = u ? t.length - 1 : 0;
						t = t[e];
					}
					t !== null && (i[e] = t);
				}
				for (let t in e) i[t] = e[t];
			}
		}
	}
	return i;
}
var Sd = (e) => (t, n) => {
	let r = (0, D.useContext)(G), i = (0, D.useContext)(ye), a = () => bd(e, t, r, i);
	return n ? a() : _e(a);
}, Cd = /*@__PURE__*/ Sd({
	scrapeMotionValuesFromProps: cl,
	createRenderState: od
}), wd = /*@__PURE__*/ Sd({
	scrapeMotionValuesFromProps: ju,
	createRenderState: dd
}), Td = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function Ed(e, t, n) {
	let r = (0, D.useRef)(n);
	(0, D.useInsertionEffect)(() => {
		r.current = n;
	});
	let i = (0, D.useRef)(null);
	return (0, D.useCallback)((n) => {
		n && e.onMount?.(n), t && (n ? t.mount(n) : t.unmount());
		let a = r.current;
		if (typeof a == "function") {
			if (n) {
				let e = a(n);
				typeof e == "function" && (i.current = e);
			} else i.current ? (i.current(), i.current = null) : a(n);
		} else a && (a.current = n);
	}, [t]);
}
// node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
var Dd = /* @__PURE__ */ (0, D.createContext)({});
// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function Od(e, t, n, r, i, a) {
	let { visualElement: o } = (0, D.useContext)(G), s = (0, D.useContext)($u), c = (0, D.useContext)(ye), l = (0, D.useContext)(zu), u = l.reducedMotion, d = l.skipAnimations, f = (0, D.useRef)(null), p = (0, D.useRef)(!1);
	r ||= s.renderer, !f.current && r && (f.current = r(e, {
		visualState: t,
		parent: o,
		props: n,
		presenceContext: c,
		blockInitialAnimation: c ? c.initial === !1 : !1,
		reducedMotionConfig: u,
		skipAnimations: d,
		isSVG: a
	}), p.current && f.current && (f.current.manuallyAnimateOnMount = !0));
	let m = f.current, h = (0, D.useContext)(Dd);
	m && !m.projection && i && (m.type === "html" || m.type === "svg") && i.create(m, n, h), (0, D.useInsertionEffect)(() => {
		m && m.props !== n && m.update(n, c);
	});
	let g = n[Xa], _ = (0, D.useRef)(!!g && typeof window < "u" && !window.MotionHandoffIsComplete?.(g) && window.MotionHasOptimisedAnimation?.(g));
	return ve(() => {
		p.current && m && (m.animationState?.animateChanges(), m.enteringChildren = void 0);
	}, []), ve(() => {
		p.current = !0, m && (window.MotionIsMounted = !0, m.updateFeatures(), m.scheduleRenderMicrotask(), _.current && m.animationState && m.animationState.animateChanges());
	}), (0, D.useEffect)(() => {
		m && (!_.current && m.animationState && m.animationState.animateChanges(), _.current &&= (queueMicrotask(() => {
			window.MotionHandoffMarkAsComplete?.(g);
		}), !1), m.enteringChildren = void 0);
	}), m;
}
// node_modules/framer-motion/dist/es/motion/index.mjs
function kd(e, { forwardMotionProps: t = !1, type: n } = {}, r, i) {
	r && rd(r);
	let a = n ? n === "svg" : vd(e), o = a ? wd : Cd;
	function s(n, s) {
		let c, l = Ad(n);
		_e(() => !!Bc.current?.sharedNodes.get(l)?.lead && n.initial) && (n = {
			...n,
			initial: !1
		});
		let u = {
			...(0, D.useContext)(zu),
			...n,
			layoutId: l
		}, { isStatic: d, isValidProp: f } = u, p = id(n), m = o(n, d);
		if (!d && typeof window < "u") {
			jd(u, r);
			let t = Md(u);
			p.visualElement = Od(e, m, u, i, t.ProjectionNode, a), (t.isEnabled || p.visualElement?.projection?.options.layoutId) && (c = t.MeasureLayout);
		}
		return (0, H.jsxs)(G.Provider, {
			value: p,
			children: [c && p.visualElement ? (0, H.jsx)(c, {
				visualElement: p.visualElement,
				...u
			}) : null, yd(e, n, Ed(m, p.visualElement, s), m, d, t, a, f)]
		});
	}
	s.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
	let c = (0, D.forwardRef)(s);
	return c[Td] = e, c;
}
function Ad({ layoutId: e }) {
	let t = (0, D.useContext)(ge).id;
	return t && e !== void 0 ? t + "-" + e : e;
}
function jd(e, t) {
	(0, D.useContext)($u).strict;
}
function Md(e) {
	let { drag: t, layout: n } = U();
	if (!t && !n) return {};
	let r = {
		...t,
		...n
	};
	return {
		MeasureLayout: r.MeasureLayout,
		isEnabled: t?.isEnabled(e) || n?.isEnabled(e),
		ProjectionNode: r.ProjectionNode
	};
}
// node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function Nd(e, t) {
	if (typeof Proxy > "u") return kd;
	let n = /* @__PURE__ */ new Map(), r = (n, r) => kd(n, r, e, t);
	return new Proxy((e, t) => r(e, t), { get: (i, a) => a === "create" ? r : (n.has(a) || n.set(a, kd(a, void 0, e, t)), n.get(a)) });
}
// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var Pd = (e, t) => t.isSVG ?? vd(e) ? new Mu(t) : new ul(t, { allowProjection: e !== D.Fragment }), Fd = class extends Du {
	constructor(e) {
		super(e), e.animationState ||= Iu(e);
	}
	updateAnimationControlsSubscription() {
		let { animate: e } = this.node.getProps();
		Uc(e) && (this.unmountControls = e.subscribe(this.node));
	}
	mount() {
		this.updateAnimationControlsSubscription();
	}
	update() {
		this.node.getProps().animate !== this.node.prevProps?.animate && this.updateAnimationControlsSubscription();
	}
	unmount() {
		this.node.animationState.reset(), this.unmountControls?.();
	}
}, Id = 0, Ld = {
	animation: { Feature: Fd },
	exit: { Feature: class extends Du {
		constructor() {
			super(...arguments), this.id = Id++;
		}
		update() {
			let { presenceContext: e, animationState: t } = this.node;
			if (!e || !t) return;
			let { isPresent: n, onExitComplete: r } = e;
			if (n === !this.exit) return;
			if (n) {
				if (this.exit === !0) {
					let { initial: e } = this.node.getProps();
					if (e && !Array.isArray(e)) {
						let { transition: t, transitionEnd: n, ...r } = Ba(this.node, e) || {};
						for (let e in r) this.node.getValue(e)?.jump(r[e]);
					}
					this.node.blockInitialAnimation = !1, t.reset(), t.animateChanges();
				} else t.setActive("exit", !1);
				this.exit = void 0;
				return;
			}
			let i = this.exit = t.setActive("exit", !0);
			r && i.then(() => {
				this.exit === i && (this.exit = !0, r(this.id));
			});
		}
		mount() {
			let { register: e } = this.node.presenceContext || {};
			e && (this.unmount = e(this.id, this.node)), this.update();
		}
		unmount() {}
	} }
}, Rd = class extends Du {
	constructor(e) {
		super(e), this.removeGroupControls = M, this.removeListeners = M, this.controls = new ou(e);
	}
	mount() {
		let { dragControls: e } = this.node.getProps();
		e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || M;
	}
	update() {
		let { dragControls: e, drag: t } = this.node.getProps(), { dragControls: n, drag: r } = this.node.prevProps || {};
		e !== n && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls))), r && !t && this.controls.stop(void 0, void 0, r);
	}
	unmount() {
		this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
	}
}, zd = (e) => (t, n) => {
	e && L.update(() => e(t, n), !1, !0);
}, Bd = class extends Du {
	constructor() {
		super(...arguments), this.removePointerDownListener = M;
	}
	onPointerDown(e) {
		this.session = new Ml(e, this.createPanHandlers(), {
			transformPagePoint: this.node.getTransformPagePoint(),
			contextWindow: this.node.current?.ownerDocument.defaultView
		});
	}
	createPanHandlers() {
		let { onPanSessionStart: e, onPanStart: t, onPan: n, onPanEnd: r } = this.node.getProps();
		return {
			onSessionStart: zd(e),
			onStart: zd(t),
			onMove: zd(n),
			onEnd: (e, t) => {
				delete this.session, r && L.postRender(() => r(e, t));
			}
		};
	}
	mount() {
		this.removePointerDownListener = ml(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
	}
	update() {
		this.session?.updateHandlers(this.createPanHandlers());
	}
	unmount() {
		this.removePointerDownListener(), this.session?.end();
	}
}, Vd = !1, Hd = ({ layout: e, layoutDependency: t, layoutAnchor: n }) => ({
	layout: e,
	layoutDependency: t,
	layoutAnchor: n,
	animationType: typeof e == "string" ? e : "both"
}), Ud = (e, t) => {
	let { snapshot: n } = e, r = e.getStack();
	r?.remove(e);
	let i = r?.lead;
	if (r?.prevLead === e && i.resumeFrom === e && (i.resumeFrom = i.currentAnimation = e.resumingFrom = void 0), e.options.layoutId = t, !t) e.needsShow = !0;
	else return e.root.registerSharedNode(t, e), () => {
		let { resumeFrom: t } = e;
		t?.isPresent !== !1 && e.getStack().members.includes(t) && (t.hide(), e.resumeFrom = void 0, e.snapshot = n);
	};
}, Wd = class extends D.Component {
	componentDidMount() {
		let { visualElement: e, layoutGroup: t, switchLayoutGroup: n, layoutId: r } = this.props, { projection: i } = e;
		i && (t.group?.add(i), r && n?.register?.(i), Vd && i.root.didUpdate(), i.options.layoutId !== r && Ud(i, r)?.(), i.addEventListener("animationComplete", () => this.safeToRemove()), i.setOptions({
			...i.options,
			...Hd(this.props),
			onExitComplete: () => this.safeToRemove()
		})), ic.hasEverUpdated = !0;
	}
	getSnapshotBeforeUpdate(e) {
		let { layoutDependency: t, layoutId: n, visualElement: r, drag: i, isPresent: a } = this.props, { projection: o } = r;
		return o && (o.isPresent = a, this.takeOver = e.layoutId === n ? void 0 : (o.willUpdate(), Ud(o, n)), o.setOptions({
			...o.options,
			...Hd(this.props)
		}), Vd = !0, i || e.layoutDependency !== t || t === void 0 || e.isPresent !== a ? o.willUpdate() : this.safeToRemove(), e.isPresent !== a && (a ? o.promote() : o.relegate() || L.postRender(() => {
			o.getStack()?.members.length || this.safeToRemove();
		}))), null;
	}
	componentDidUpdate() {
		let { projection: e } = this.props.visualElement;
		e && (this.takeOver?.(), e.root.didUpdate(), Jo.postRender(() => {
			!e.currentAnimation && e.isLead() && this.safeToRemove();
		}));
	}
	componentWillUnmount() {
		let { visualElement: e, layoutGroup: t, switchLayoutGroup: n } = this.props, { projection: r } = e;
		Vd = !0, r && (r.scheduleCheckAfterUnmount(), t.group?.remove(r), n?.deregister?.(r));
	}
	safeToRemove() {
		this.props.safeToRemove?.();
	}
	render() {
		return null;
	}
};
function Gd(e) {
	let [t, n] = Yu(), r = (0, D.useContext)(ge);
	return (0, H.jsx)(Wd, {
		...e,
		layoutGroup: r,
		switchLayoutGroup: (0, D.useContext)(Dd),
		isPresent: t,
		safeToRemove: n
	});
}
// node_modules/framer-motion/dist/es/motion/features/drag.mjs
var Kd = {
	pan: { Feature: Bd },
	drag: {
		Feature: Rd,
		ProjectionNode: Vc,
		MeasureLayout: Gd
	}
};
// node_modules/framer-motion/dist/es/gestures/hover.mjs
function qd(e, t, n, r, i) {
	let { props: a } = e, o = "while" + n;
	!i && e.animationState && a[o] && e.animationState.setActive(o, r === "Start");
	let s = a["on" + n + r];
	s && L.postRender(() => s(t, fl(t)));
}
var Jd = class extends Du {
	mount() {
		let { current: e } = this.node;
		e && (this.unmount = mu(e, (e, t) => (qd(this.node, t, "Hover", "Start"), (e) => qd(this.node, e, "Hover", "End"))));
	}
	unmount() {}
}, Yd = class extends Du {
	constructor() {
		super(...arguments), this.isActive = !1;
	}
	onFocus() {
		let e = !1;
		try {
			e = this.node.current.matches(":focus-visible");
		} catch {
			e = !0;
		}
		e && this.node.animationState && (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
	}
	onBlur() {
		this.isActive && this.node.animationState && (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
	}
	mount() {
		this.unmount = Ee(Rc(this.node.current, "focus", () => this.onFocus()), Rc(this.node.current, "blur", () => this.onBlur()));
	}
	unmount() {}
};
// node_modules/framer-motion/dist/es/gestures/press.mjs
function Xd(e, t, n, r) {
	e.current instanceof HTMLButtonElement && e.current.disabled || qd(e, t, "Tap", n, r);
}
var Zd = class extends Du {
	constructor() {
		super(...arguments), this.options = {};
	}
	mount() {
		let { current: e } = this.node;
		e && (this.update(), this.unmount = Eu(e, (e, t) => (Xd(this.node, t, "Start"), {
			onComplete: (e, { success: t }) => Xd(this.node, e, t ? "" : "Cancel"),
			onRepeat: () => Xd(this.node, t, "", !0)
		}), this.options));
	}
	update() {
		let { options: e, node: t } = this, { globalTapTarget: n, propagate: r, tap: i } = t.props;
		for (let t in e) delete e[t];
		Object.assign(e, i, {
			useGlobalTarget: n,
			stopPropagation: r?.tap === !1
		});
	}
	unmount() {}
}, Qd = /* @__PURE__ */ new WeakMap(), $d = /* @__PURE__ */ new WeakMap(), ef = (e) => {
	let t = Qd.get(e.target);
	t && t(e);
}, tf = (e) => {
	e.forEach(ef);
};
function nf({ root: e, ...t }) {
	let n = e || document;
	$d.has(n) || $d.set(n, {});
	let r = $d.get(n), i = JSON.stringify(t);
	return r[i] || (r[i] = new IntersectionObserver(tf, {
		root: e,
		...t
	})), r[i];
}
function rf(e, t, n) {
	let r = nf(t);
	return Qd.set(e, n), r.observe(e), () => {
		Qd.delete(e), r.unobserve(e);
	};
}
// node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
var af = {
	some: 0,
	all: 1
}, of = class extends Du {
	constructor() {
		super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
	}
	startObserver() {
		this.stopObserver?.();
		let { viewport: e = {} } = this.node.getProps(), { root: t, margin: n, amount: r = "some", once: i } = e, a = {
			root: t ? t.current : void 0,
			rootMargin: n,
			threshold: typeof r == "number" ? r : af[r]
		}, o = (e) => {
			let { isIntersecting: t } = e;
			if (this.isInView === t || (this.isInView = t, i && !t && this.hasEnteredView)) return;
			t && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", t);
			let { onViewportEnter: n, onViewportLeave: r } = this.node.getProps(), a = t ? n : r;
			a && a(e);
		};
		this.stopObserver = rf(this.node.current, a, o);
	}
	mount() {
		this.startObserver();
	}
	update() {
		if (typeof IntersectionObserver > "u") return;
		let { props: e, prevProps: t } = this.node;
		[
			"amount",
			"margin",
			"root"
		].some(sf(e, t)) && this.startObserver();
	}
	unmount() {
		this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
	}
};
function sf({ viewport: e = {} }, { viewport: t = {} } = {}) {
	return (n) => e[n] !== t[n];
}
// node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs
var cf = /*@__PURE__*/ Nd(/* @__PURE__ */ Object.assign({}, Ld, {
	inView: { Feature: of },
	tap: { Feature: Zd },
	focus: { Feature: Yd },
	hover: { Feature: Jd }
}, Kd, { layout: {
	ProjectionNode: Vc,
	MeasureLayout: Gd
} }), Pd);
// node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs
function lf() {
	!Zc.current && $c();
	let [e] = (0, D.useState)(Xc.current);
	return e;
}
// node_modules/motion/dist/es/react.mjs
var uf = cf, df = "#7de2dd", ff = "#f4bd70", pf = "#a5b9b8", mf = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }), hf = 880, gf = 490;
function _f({ children: e, label: t }) {
	return /* @__PURE__ */ (0, H.jsx)("svg", {
		className: "data-chart",
		viewBox: `0 0 ${hf} ${gf}`,
		role: "img",
		"aria-label": t,
		children: e
	});
}
function q({ max: e, x: t = 185, y: n = 40, w: r = 620, h: i = 390, ticks: a = 4 }) {
	return Array.from({ length: a + 1 }, (o, s) => {
		let c = t + r * s / a;
		return /* @__PURE__ */ (0, H.jsxs)("g", { children: [/* @__PURE__ */ (0, H.jsx)("line", {
			x1: c,
			x2: c,
			y1: n,
			y2: n + i,
			stroke: "#35525b"
		}), /* @__PURE__ */ (0, H.jsx)("text", {
			x: c,
			y: n + i + 28,
			textAnchor: "middle",
			fill: pf,
			fontSize: "15",
			children: mf.format(e * s / a)
		})] }, s);
	});
}
function vf({ rows: e, ranking: t }) {
	let [n, r] = (0, D.useState)(null), i = lf(), a = e.slice(0, 10).map((e) => ({
		label: t ? e.name : e.class,
		value: t ? e.masa_t : e.registros,
		color: t && e.tipo_registro === "Visto caer" ? ff : df
	})), o = t ? 60 : 1e4;
	return /* @__PURE__ */ (0, H.jsxs)(_f, {
		label: t ? "Diez mayores masas catalogadas, en toneladas" : "Diez clases más frecuentes, en registros",
		children: [
			/* @__PURE__ */ (0, H.jsx)(q, { max: o }),
			a.map((e, t) => /* @__PURE__ */ (0, H.jsxs)("g", {
				tabIndex: "0",
				role: "img",
				"aria-label": `${e.label}: ${mf.format(e.value)}`,
				onMouseEnter: () => r(t),
				onMouseLeave: () => r(null),
				onFocus: () => r(t),
				onBlur: () => r(null),
				children: [
					/* @__PURE__ */ (0, H.jsx)("text", {
						x: "172",
						y: 65 + t * 37,
						textAnchor: "end",
						fill: n === t ? "#fff" : pf,
						fontSize: "17",
						children: e.label
					}),
					/* @__PURE__ */ (0, H.jsx)(uf.rect, {
						x: "185",
						y: 46 + t * 37,
						height: "26",
						rx: "3",
						fill: e.color,
						opacity: n === null || n === t ? 1 : .35,
						initial: { width: i ? e.value / o * 620 : 0 },
						animate: { width: e.value / o * 620 },
						transition: {
							duration: i ? 0 : .7,
							delay: i ? 0 : t * .035
						}
					}),
					/* @__PURE__ */ (0, H.jsx)("text", {
						x: 195 + e.value / o * 620,
						y: 65 + t * 37,
						fill: "#eef3ed",
						fontSize: "16",
						children: mf.format(e.value)
					}),
					/* @__PURE__ */ (0, H.jsxs)("title", { children: [
						e.label,
						": ",
						mf.format(e.value)
					] })
				]
			}, e.label)),
			/* @__PURE__ */ (0, H.jsx)("text", {
				x: "500",
				y: "483",
				textAnchor: "middle",
				fill: pf,
				fontSize: "16",
				children: t ? "Masa catalogada (toneladas)" : "Número de registros"
			})
		]
	});
}
function yf({ rows: e }) {
	let t = lf();
	e = e.filter((e) => e.decada >= 1800);
	let n = (t) => 66 + t / (e.length - 1) * 755;
	return /* @__PURE__ */ (0, H.jsxs)(_f, {
		label: "Registros por década, con escalas separadas para Found y Fell",
		children: [["Encontrado", "Visto caer"].map((r, i) => {
			let a = i ? 270 : 38, o = i ? 100 : 2e4, s = (e) => a + 145 - e / o * 145, c = e.map((e, t) => `${n(t)},${s(e[r])}`).join(" ");
			return /* @__PURE__ */ (0, H.jsxs)("g", { children: [
				/* @__PURE__ */ (0, H.jsx)("rect", {
					x: n(e.length - 1) - 14,
					y: a,
					width: "30",
					height: 145,
					fill: "#f4bd7018"
				}),
				[
					0,
					.5,
					1
				].map((e) => /* @__PURE__ */ (0, H.jsxs)("g", { children: [/* @__PURE__ */ (0, H.jsx)("line", {
					x1: "66",
					x2: "830",
					y1: s(e * o),
					y2: s(e * o),
					stroke: "#35525b"
				}), /* @__PURE__ */ (0, H.jsx)("text", {
					x: "54",
					y: s(e * o) + 5,
					textAnchor: "end",
					fontSize: "15",
					fill: pf,
					children: mf.format(e * o)
				})] }, e)),
				/* @__PURE__ */ (0, H.jsx)("text", {
					x: "66",
					y: a - 14,
					fontSize: "17",
					fill: i ? ff : df,
					children: r
				}),
				/* @__PURE__ */ (0, H.jsx)("polygon", {
					points: `${n(0)},${a + 145} ${c} ${n(e.length - 1)},${a + 145}`,
					fill: i ? "#f4bd7012" : "#7de2dd12"
				}),
				/* @__PURE__ */ (0, H.jsx)(uf.polyline, {
					points: c,
					fill: "none",
					stroke: i ? ff : df,
					strokeWidth: "3",
					initial: { pathLength: +!!t },
					animate: { pathLength: 1 },
					transition: { duration: +!t }
				}),
				e.map((e, t) => t % 3 == 0 && /* @__PURE__ */ (0, H.jsx)("text", {
					x: n(t),
					y: a + 145 + 25,
					fill: pf,
					textAnchor: "middle",
					fontSize: "15",
					children: e.decada
				}, t)),
				e.map((e, t) => /* @__PURE__ */ (0, H.jsx)("circle", {
					cx: n(t),
					cy: s(e[r]),
					r: "4",
					fill: i ? ff : df,
					children: /* @__PURE__ */ (0, H.jsxs)("title", { children: [
						e.decada,
						": ",
						e[r],
						" ",
						r
					] })
				}, t))
			] }, r);
		}), /* @__PURE__ */ (0, H.jsx)("text", {
			x: "450",
			y: "483",
			fill: pf,
			fontSize: "16",
			textAnchor: "middle",
			children: "Década del año catalogado"
		})]
	});
}
function bf({ rows: e }) {
	let t = lf(), n = 5e3, r = e[0].log10_desde, i = e.at(-1).log10_hasta, a = (e) => 65 + (e - r) / (i - r) * 750, o = (e) => 410 - e / n * 350;
	return /* @__PURE__ */ (0, H.jsxs)(_f, {
		label: "Histograma de la masa positiva, logaritmo base diez en gramos",
		children: [
			[
				0,
				.25,
				.5,
				.75,
				1
			].map((e) => /* @__PURE__ */ (0, H.jsxs)("g", { children: [/* @__PURE__ */ (0, H.jsx)("line", {
				x1: "65",
				x2: "820",
				y1: o(e * n),
				y2: o(e * n),
				stroke: "#35525b"
			}), /* @__PURE__ */ (0, H.jsx)("text", {
				x: "52",
				y: o(e * n) + 5,
				textAnchor: "end",
				fill: pf,
				fontSize: "15",
				children: mf.format(n * e)
			})] }, e)),
			e.map((e, n) => /* @__PURE__ */ (0, H.jsx)(uf.rect, {
				x: a(e.log10_desde),
				width: Math.max(1, a(e.log10_hasta) - a(e.log10_desde) - 1),
				y: o(e.registros),
				height: 410 - o(e.registros),
				fill: n > 9 && n < 17 ? df : "#489c9f",
				initial: { opacity: +!!t },
				animate: { opacity: 1 },
				transition: { delay: t ? 0 : n * .012 },
				children: /* @__PURE__ */ (0, H.jsxs)("title", { children: [
					e.log10_desde.toFixed(2),
					"–",
					e.log10_hasta.toFixed(2),
					": ",
					e.registros,
					" ",
					"registros"
				] })
			}, n)),
			[
				-2,
				0,
				2,
				4,
				6
			].map((e) => /* @__PURE__ */ (0, H.jsx)("text", {
				x: a(e),
				y: "440",
				fill: pf,
				textAnchor: "middle",
				fontSize: "16",
				children: e
			}, e)),
			/* @__PURE__ */ (0, H.jsx)("line", {
				x1: a(Math.log10(32.695)),
				x2: a(Math.log10(32.695)),
				y1: "35",
				y2: "410",
				stroke: ff,
				strokeWidth: "2",
				strokeDasharray: "6 5"
			}),
			/* @__PURE__ */ (0, H.jsx)("text", {
				x: a(Math.log10(32.695)) + 12,
				y: "32",
				fill: ff,
				fontSize: "17",
				children: "Mediana: 32,70 g"
			}),
			/* @__PURE__ */ (0, H.jsx)("text", {
				x: "450",
				y: "483",
				fill: pf,
				textAnchor: "middle",
				fontSize: "16",
				children: "Logaritmo de la masa en gramos, log₁₀(g)"
			})
		]
	});
}
function xf({ rows: e }) {
	let [t, n] = (0, D.useState)("Cada columna suma 100 %"), r = Object.keys(e[0]).filter((e) => e !== "clase_grafico");
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "heatmap-wrap",
		children: [/* @__PURE__ */ (0, H.jsxs)(_f, {
			label: "Composición porcentual de clases por década",
			children: [
				/* @__PURE__ */ (0, H.jsx)("defs", { children: /* @__PURE__ */ (0, H.jsxs)("linearGradient", {
					id: "scale",
					children: [/* @__PURE__ */ (0, H.jsx)("stop", { stopColor: "#15353f" }), /* @__PURE__ */ (0, H.jsx)("stop", {
						offset: "100%",
						stopColor: df
					})]
				}) }),
				e.map((e, t) => /* @__PURE__ */ (0, H.jsxs)("g", { children: [/* @__PURE__ */ (0, H.jsx)("text", {
					x: "95",
					y: 53 + t * 40,
					textAnchor: "end",
					fill: pf,
					fontSize: "16",
					children: e.clase_grafico
				}), r.map((r, i) => {
					let a = e[r];
					return /* @__PURE__ */ (0, H.jsxs)("g", {
						tabIndex: "0",
						role: "img",
						"aria-label": `${e.clase_grafico}, ${r}: ${a.toFixed(1)} %`,
						onMouseEnter: () => n(`${e.clase_grafico} · ${r} · ${mf.format(a)} %`),
						onFocus: () => n(`${e.clase_grafico} · ${r} · ${mf.format(a)} %`),
						children: [/* @__PURE__ */ (0, H.jsx)("rect", {
							x: 110 + i * 58,
							y: 27 + t * 40,
							width: "55",
							height: "37",
							rx: "2",
							fill: `rgb(${21 + a * 1.04},${53 + a * 1.73},${63 + a * 1.58})`
						}), /* @__PURE__ */ (0, H.jsx)("text", {
							x: 137 + i * 58,
							y: 52 + t * 40,
							textAnchor: "middle",
							fontSize: "15",
							fill: a > 50 ? "#102b36" : "#eef3ed",
							children: a.toFixed(1)
						})]
					}, r);
				})] }, e.clase_grafico)),
				r.map((e, t) => /* @__PURE__ */ (0, H.jsx)("text", {
					x: 137 + t * 58,
					y: "412",
					textAnchor: "middle",
					fill: pf,
					fontSize: "15",
					children: e
				}, e)),
				/* @__PURE__ */ (0, H.jsx)("rect", {
					x: "110",
					y: "450",
					width: "220",
					height: "8",
					fill: "url(#scale)"
				}),
				/* @__PURE__ */ (0, H.jsx)("text", {
					x: "110",
					y: "480",
					fill: pf,
					fontSize: "15",
					children: "0 %"
				}),
				/* @__PURE__ */ (0, H.jsx)("text", {
					x: "330",
					y: "480",
					fill: pf,
					textAnchor: "end",
					fontSize: "15",
					children: "100 %"
				})
			]
		}), /* @__PURE__ */ (0, H.jsx)("div", {
			className: "chart-tip",
			"aria-live": "polite",
			children: t
		})]
	});
}
function Sf({ spec: e, tables: t }) {
	return e.chart === "clases" ? /* @__PURE__ */ (0, H.jsx)(vf, { rows: t.P4_clases }) : e.chart === "ranking" ? /* @__PURE__ */ (0, H.jsx)(vf, {
		rows: t.P7_mayores_masas,
		ranking: !0
	}) : e.chart === "decadas" ? /* @__PURE__ */ (0, H.jsx)(yf, { rows: t.P3_decadas }) : e.chart === "histograma" ? /* @__PURE__ */ (0, H.jsx)(bf, { rows: t.P5_histograma }) : e.kind === "heatmap" ? /* @__PURE__ */ (0, H.jsx)(xf, { rows: t.P9_clases_pct }) : /* @__PURE__ */ (0, H.jsx)("img", {
		className: "source-chart",
		src: `assets/${e.image}?v=d0520d80df18`,
		alt: e.title
	});
}
// src/datos.js
var Cf = new Intl.NumberFormat("es-PE"), wf = (e) => e == null ? "Sin dato" : e >= 1e6 ? `${Cf.format(e / 1e6)} t` : e >= 1e3 ? `${Cf.format(e / 1e3)} kg` : `${Cf.format(e)} g`;
function Tf(e) {
	return e > 0 ? Math.min(1, Math.log10(1 + e) / Math.log10(60000001)) : 0;
}
function Ef(e, t, n = "all", r = 0) {
	return e.filter((e) => e.terrestrial && e.mappable && e.year != null && e.year <= t && (n === "all" || e.fall === n) && (r === 0 || e.mass != null && e.mass >= r));
}
var Df = (e, t, n, r) => [(e + 180) / 360 * n, (90 - t) / 180 * r];
// src/Mapa.jsx
function Of({ records: e = [], world: t, compact: n = !1 }) {
	let [r, i] = (0, D.useState)(2013), [a, o] = (0, D.useState)("all"), [s, c] = (0, D.useState)(0), [l, u] = (0, D.useState)(!1), [d, f] = (0, D.useState)(null), [p, m] = (0, D.useState)(!0), h = lf(), g = (0, D.useRef)(null), _ = (0, D.useRef)([]), v = (0, D.useMemo)(() => Ef(e, r, a, s), [
		e,
		r,
		a,
		s
	]), y = (0, D.useMemo)(() => t?.features.flatMap((e) => (e.geometry.type === "MultiPolygon" ? e.geometry.coordinates : [e.geometry.coordinates]).map((e) => e.map((e) => e.map(([e, t], n) => `${n ? "L" : "M"}${Df(e, t, 1e3, 500).join(",")}`).join("") + "Z").join(""))) || [], [t]);
	(0, D.useEffect)(() => {
		if (!l) return;
		let e = setInterval(() => i((e) => e >= 2013 ? (u(!1), 2013) : e + 1), 120);
		return () => clearInterval(e);
	}, [l]), (0, D.useEffect)(() => {
		let e = g.current;
		if (!e) return;
		let t, n = !1, r = e.getContext("2d");
		function i() {
			let i = e.clientWidth, a = e.clientHeight;
			if (!i || !a) return;
			let o = Math.min(devicePixelRatio || 1, 2);
			e.width = i * o, e.height = a * o, r.setTransform(o, 0, 0, o, 0, 0);
			let s = document.createElement("canvas");
			s.width = e.width, s.height = e.height;
			let c = s.getContext("2d");
			c.scale(o, o);
			let l = v.map((e) => {
				let [t, n] = Df(e.lon, e.lat, i, a);
				return {
					r: e,
					x: t,
					y: n
				};
			});
			_.current = l, l.forEach(({ r: e, x: t, y: n }) => {
				c.fillStyle = e.fall === "Fell" ? "#f4bd70" : "#7de2dd", c.globalAlpha = e.fall === "Fell" ? .95 : .4, c.beginPath(), c.arc(t, n, 1.2 + Tf(e.mass) * 1.8, 0, Math.PI * 2), c.fill();
			});
			let u = l.filter((e) => e.r.fall === "Fell"), f = u.filter((e, t) => t % Math.max(1, Math.floor(u.length / 35)) === 0).slice(0, 35), m = (e) => {
				if (!n) {
					if (r.clearRect(0, 0, i, a), r.drawImage(s, 0, 0, i, a), p && !h && f.forEach(({ r: t, x: n, y: i }) => {
						let a = (e + t.id * 43) % 2800 / 2800;
						r.beginPath(), r.arc(n, i, 3 + a * (10 + 28 * Tf(t.mass)), 0, Math.PI * 2), r.strokeStyle = `rgba(244,189,112,${.65 * (1 - a)})`, r.lineWidth = 1.6, r.stroke();
					}), d) {
						let e = l.find((e) => e.r.id === d.id);
						e && (r.strokeStyle = "#fff", r.lineWidth = 2, r.beginPath(), r.arc(e.x, e.y, 8, 0, Math.PI * 2), r.stroke());
					}
					p && !h && (t = requestAnimationFrame(m));
				}
			};
			cancelAnimationFrame(t), m(performance.now());
		}
		let a = new ResizeObserver(i);
		return a.observe(e), i(), () => {
			n = !0, cancelAnimationFrame(t), a.disconnect();
		};
	}, [
		v,
		p,
		h,
		d
	]);
	function b(e) {
		let t = e.currentTarget.getBoundingClientRect(), n = (e.clientX - t.left) * e.currentTarget.clientWidth / t.width, r = (e.clientY - t.top) * e.currentTarget.clientHeight / t.height, i = null, a = 20;
		for (let e of _.current) {
			let t = Math.hypot(e.x - n, e.y - r);
			t < a && (i = e.r, a = t);
		}
		f(i);
	}
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: `map-demo ${n ? "compact" : ""}`,
		children: [/* @__PURE__ */ (0, H.jsxs)("div", {
			className: "map-surface",
			children: [
				/* @__PURE__ */ (0, H.jsx)("svg", {
					viewBox: "0 0 1000 500",
					preserveAspectRatio: "none",
					"aria-hidden": "true",
					children: y.map((e, t) => /* @__PURE__ */ (0, H.jsx)("path", { d: e }, t))
				}),
				/* @__PURE__ */ (0, H.jsx)("canvas", {
					ref: g,
					onClick: b,
					"aria-label": "Mapa de meteoritos con coordenadas reales"
				}),
				/* @__PURE__ */ (0, H.jsxs)("div", {
					className: "map-count",
					children: [/* @__PURE__ */ (0, H.jsx)("strong", { children: Cf.format(v.length) }), /* @__PURE__ */ (0, H.jsxs)("span", { children: ["registros mapeables hasta ", r] })]
				}),
				d && /* @__PURE__ */ (0, H.jsxs)("div", {
					className: "record",
					children: [
						/* @__PURE__ */ (0, H.jsx)("button", {
							"aria-label": "Cerrar ficha",
							onClick: () => f(null),
							children: "×"
						}),
						/* @__PURE__ */ (0, H.jsx)("strong", { children: d.name }),
						/* @__PURE__ */ (0, H.jsxs)("span", { children: [
							d.year,
							" · ",
							d.fall,
							" · ",
							wf(d.mass)
						] })
					]
				}),
				/* @__PURE__ */ (0, H.jsxs)("div", {
					className: "map-legend",
					children: [/* @__PURE__ */ (0, H.jsx)("span", { children: "● Found" }), /* @__PURE__ */ (0, H.jsx)("span", { children: "● Fell" })]
				})
			]
		}), !n && /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "map-controls",
			children: [
				/* @__PURE__ */ (0, H.jsxs)("div", {
					className: "filters",
					children: [
						/* @__PURE__ */ (0, H.jsxs)("label", { children: ["Tipo", /* @__PURE__ */ (0, H.jsxs)("select", {
							value: a,
							onChange: (e) => {
								o(e.target.value), f(null);
							},
							children: [
								/* @__PURE__ */ (0, H.jsx)("option", {
									value: "all",
									children: "Todos"
								}),
								/* @__PURE__ */ (0, H.jsx)("option", {
									value: "Found",
									children: "Found · encontrados"
								}),
								/* @__PURE__ */ (0, H.jsx)("option", {
									value: "Fell",
									children: "Fell · vistos caer"
								})
							]
						})] }),
						/* @__PURE__ */ (0, H.jsxs)("label", { children: ["Masa mínima", /* @__PURE__ */ (0, H.jsxs)("select", {
							value: s,
							onChange: (e) => {
								c(Number(e.target.value)), f(null);
							},
							children: [
								/* @__PURE__ */ (0, H.jsx)("option", {
									value: "0",
									children: "Todas las masas"
								}),
								/* @__PURE__ */ (0, H.jsx)("option", {
									value: "1000",
									children: "1 kg"
								}),
								/* @__PURE__ */ (0, H.jsx)("option", {
									value: "1000000",
									children: "1 t"
								})
							]
						})] }),
						/* @__PURE__ */ (0, H.jsxs)("label", {
							className: "switch",
							children: [/* @__PURE__ */ (0, H.jsx)("input", {
								type: "checkbox",
								checked: p,
								onChange: (e) => m(e.target.checked)
							}), "Pulsos"]
						}),
						/* @__PURE__ */ (0, H.jsx)("button", {
							onClick: () => {
								i(2007), o("Fell"), c(0), f(e.find((e) => e.name === "Carancas"));
							},
							children: "Carancas"
						})
					]
				}),
				/* @__PURE__ */ (0, H.jsxs)("div", {
					className: "time-control",
					children: [
						/* @__PURE__ */ (0, H.jsx)("button", {
							"aria-label": l ? "Pausar años" : "Reproducir años",
							onClick: () => {
								r === 2013 && i(1800), u(!l);
							},
							children: l ? /* @__PURE__ */ (0, H.jsx)(le, {}) : /* @__PURE__ */ (0, H.jsx)(de, {})
						}),
						/* @__PURE__ */ (0, H.jsx)("span", { children: "1800" }),
						/* @__PURE__ */ (0, H.jsx)("input", {
							"aria-label": "Año máximo",
							type: "range",
							min: "1800",
							max: "2013",
							value: r,
							onChange: (e) => {
								i(+e.target.value), f(null);
							}
						}),
						/* @__PURE__ */ (0, H.jsx)("strong", { children: r })
					]
				}),
				/* @__PURE__ */ (0, H.jsx)("p", { children: "Acumulado por año catalogado. Sin registros de año desconocido. Las ondas son simbólicas. Cartografía: Natural Earth." })
			]
		})]
	});
}
// node_modules/d3-array/dist/d3-array.mjs
function kf(e, t) {
	return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Af(e, t) {
	return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function jf(e) {
	let t, n, r;
	e.length === 2 ? (t = e === kf || e === Af ? e : Mf, n = e, r = e) : (t = kf, n = (t, n) => kf(e(t), n), r = (t, n) => e(t) - n);
	function i(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) < 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function a(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) <= 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function o(e, t, n = 0, a = e.length) {
		let o = i(e, t, n, a - 1);
		return o > n && r(e[o - 1], t) > -r(e[o], t) ? o - 1 : o;
	}
	return {
		left: i,
		center: o,
		right: a
	};
}
function Mf() {
	return 0;
}
function Nf(e) {
	return e === null ? NaN : +e;
}
var Pf = jf(kf);
Pf.right, Pf.left, jf(Nf).center;
var Ff = class {
	constructor() {
		this._partials = /* @__PURE__ */ new Float64Array(32), this._n = 0;
	}
	add(e) {
		let t = this._partials, n = 0;
		for (let r = 0; r < this._n && r < 32; r++) {
			let i = t[r], a = e + i, o = Math.abs(e) < Math.abs(i) ? e - (a - i) : i - (a - e);
			o && (t[n++] = o), e = a;
		}
		return t[n] = e, this._n = n + 1, this;
	}
	valueOf() {
		let e = this._partials, t = this._n, n, r, i, a = 0;
		if (t > 0) {
			for (a = e[--t]; t > 0 && (n = a, r = e[--t], a = n + r, i = r - (a - n), !i););
			t > 0 && (i < 0 && e[t - 1] < 0 || i > 0 && e[t - 1] > 0) && (r = i * 2, n = a + r, r == n - a && (a = n));
		}
		return a;
	}
};
Array.prototype.slice;
function* If(e) {
	for (let t of e) yield* t;
}
function Lf(e) {
	return Array.from(If(e));
}
function Rf(e, t, n) {
	e = +e, t = +t, n = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +n;
	for (var r = -1, i = Math.max(0, Math.ceil((t - e) / n)) | 0, a = Array(i); ++r < i;) a[r] = e + r * n;
	return a;
}
// node_modules/d3-geo/dist/d3-geo.mjs
var J = 1e-6, zf = 1e-12, Y = Math.PI, Bf = Y / 2, Vf = Y / 4, Hf = Y * 2, Uf = 180 / Y, X = Y / 180, Z = Math.abs, Wf = Math.atan, Gf = Math.atan2, Kf = Math.cos, qf = Math.ceil, Q = Math.sin, Jf = Math.sign || function(e) {
	return e > 0 ? 1 : e < 0 ? -1 : 0;
}, Yf = Math.sqrt;
function Xf(e) {
	return e > 1 ? 0 : e < -1 ? Y : Math.acos(e);
}
function Zf(e) {
	return e > 1 ? Bf : e < -1 ? -Bf : Math.asin(e);
}
function Qf() {}
function $f(e, t) {
	e && $.hasOwnProperty(e.type) && $[e.type](e, t);
}
var ep = {
	Feature: function(e, t) {
		$f(e.geometry, t);
	},
	FeatureCollection: function(e, t) {
		for (var n = e.features, r = -1, i = n.length; ++r < i;) $f(n[r].geometry, t);
	}
}, $ = {
	Sphere: function(e, t) {
		t.sphere();
	},
	Point: function(e, t) {
		e = e.coordinates, t.point(e[0], e[1], e[2]);
	},
	MultiPoint: function(e, t) {
		for (var n = e.coordinates, r = -1, i = n.length; ++r < i;) e = n[r], t.point(e[0], e[1], e[2]);
	},
	LineString: function(e, t) {
		tp(e.coordinates, t, 0);
	},
	MultiLineString: function(e, t) {
		for (var n = e.coordinates, r = -1, i = n.length; ++r < i;) tp(n[r], t, 0);
	},
	Polygon: function(e, t) {
		np(e.coordinates, t);
	},
	MultiPolygon: function(e, t) {
		for (var n = e.coordinates, r = -1, i = n.length; ++r < i;) np(n[r], t);
	},
	GeometryCollection: function(e, t) {
		for (var n = e.geometries, r = -1, i = n.length; ++r < i;) $f(n[r], t);
	}
};
function tp(e, t, n) {
	var r = -1, i = e.length - n, a;
	for (t.lineStart(); ++r < i;) a = e[r], t.point(a[0], a[1], a[2]);
	t.lineEnd();
}
function np(e, t) {
	var n = -1, r = e.length;
	for (t.polygonStart(); ++n < r;) tp(e[n], t, 1);
	t.polygonEnd();
}
function rp(e, t) {
	e && ep.hasOwnProperty(e.type) ? ep[e.type](e, t) : $f(e, t);
}
new Ff(), new Ff();
function ip(e) {
	return [Gf(e[1], e[0]), Zf(e[2])];
}
function ap(e) {
	var t = e[0], n = e[1], r = Kf(n);
	return [
		r * Kf(t),
		r * Q(t),
		Q(n)
	];
}
function op(e, t) {
	return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function sp(e, t) {
	return [
		e[1] * t[2] - e[2] * t[1],
		e[2] * t[0] - e[0] * t[2],
		e[0] * t[1] - e[1] * t[0]
	];
}
function cp(e, t) {
	e[0] += t[0], e[1] += t[1], e[2] += t[2];
}
function lp(e, t) {
	return [
		e[0] * t,
		e[1] * t,
		e[2] * t
	];
}
function up(e) {
	var t = Yf(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
	e[0] /= t, e[1] /= t, e[2] /= t;
}
function dp(e, t) {
	function n(n, r) {
		return n = e(n, r), t(n[0], n[1]);
	}
	return e.invert && t.invert && (n.invert = function(n, r) {
		return n = t.invert(n, r), n && e.invert(n[0], n[1]);
	}), n;
}
function fp(e, t) {
	return Z(e) > Y && (e -= Math.round(e / Hf) * Hf), [e, t];
}
fp.invert = fp;
function pp(e, t, n) {
	return (e %= Hf) ? t || n ? dp(hp(e), gp(t, n)) : hp(e) : t || n ? gp(t, n) : fp;
}
function mp(e) {
	return function(t, n) {
		return t += e, Z(t) > Y && (t -= Math.round(t / Hf) * Hf), [t, n];
	};
}
function hp(e) {
	var t = mp(e);
	return t.invert = mp(-e), t;
}
function gp(e, t) {
	var n = Kf(e), r = Q(e), i = Kf(t), a = Q(t);
	function o(e, t) {
		var o = Kf(t), s = Kf(e) * o, c = Q(e) * o, l = Q(t), u = l * n + s * r;
		return [Gf(c * i - u * a, s * n - l * r), Zf(u * i + c * a)];
	}
	return o.invert = function(e, t) {
		var o = Kf(t), s = Kf(e) * o, c = Q(e) * o, l = Q(t), u = l * i - c * a;
		return [Gf(c * i + l * a, s * n + u * r), Zf(u * n - s * r)];
	}, o;
}
function _p(e, t, n, r, i, a) {
	if (n) {
		var o = Kf(t), s = Q(t), c = r * n;
		i == null ? (i = t + r * Hf, a = t - c / 2) : (i = vp(o, i), a = vp(o, a), (r > 0 ? i < a : i > a) && (i += r * Hf));
		for (var l, u = i; r > 0 ? u > a : u < a; u -= c) l = ip([
			o,
			-s * Kf(u),
			-s * Q(u)
		]), e.point(l[0], l[1]);
	}
}
function vp(e, t) {
	t = ap(t), t[0] -= e, up(t);
	var n = Xf(-t[1]);
	return ((-t[2] < 0 ? -n : n) + Hf - J) % Hf;
}
function yp() {
	var e = [], t;
	return {
		point: function(e, n, r) {
			t.push([
				e,
				n,
				r
			]);
		},
		lineStart: function() {
			e.push(t = []);
		},
		lineEnd: Qf,
		rejoin: function() {
			e.length > 1 && e.push(e.pop().concat(e.shift()));
		},
		result: function() {
			var n = e;
			return e = [], t = null, n;
		}
	};
}
function bp(e, t) {
	return Z(e[0] - t[0]) < J && Z(e[1] - t[1]) < J;
}
function xp(e, t, n, r) {
	this.x = e, this.z = t, this.o = n, this.e = r, this.v = !1, this.n = this.p = null;
}
function Sp(e, t, n, r, i) {
	var a = [], o = [], s, c;
	if (e.forEach(function(e) {
		if (!((t = e.length - 1) <= 0)) {
			var t, n = e[0], r = e[t], c;
			if (bp(n, r)) {
				if (!n[2] && !r[2]) {
					for (i.lineStart(), s = 0; s < t; ++s) i.point((n = e[s])[0], n[1]);
					i.lineEnd();
					return;
				}
				r[0] += 2 * J;
			}
			a.push(c = new xp(n, e, null, !0)), o.push(c.o = new xp(n, null, c, !1)), a.push(c = new xp(r, e, null, !1)), o.push(c.o = new xp(r, null, c, !0));
		}
	}), a.length) {
		for (o.sort(t), Cp(a), Cp(o), s = 0, c = o.length; s < c; ++s) o[s].e = n = !n;
		for (var l = a[0], u, d;;) {
			for (var f = l, p = !0; f.v;) if ((f = f.n) === l) return;
			u = f.z, i.lineStart();
			do {
				if (f.v = f.o.v = !0, f.e) {
					if (p) for (s = 0, c = u.length; s < c; ++s) i.point((d = u[s])[0], d[1]);
					else r(f.x, f.n.x, 1, i);
					f = f.n;
				} else {
					if (p) for (u = f.p.z, s = u.length - 1; s >= 0; --s) i.point((d = u[s])[0], d[1]);
					else r(f.x, f.p.x, -1, i);
					f = f.p;
				}
				f = f.o, u = f.z, p = !p;
			} while (!f.v);
			i.lineEnd();
		}
	}
}
function Cp(e) {
	if (t = e.length) {
		for (var t, n = 0, r = e[0], i; ++n < t;) r.n = i = e[n], i.p = r, r = i;
		r.n = i = e[0], i.p = r;
	}
}
function wp(e) {
	return Z(e[0]) <= Y ? e[0] : Jf(e[0]) * ((Z(e[0]) + Y) % Hf - Y);
}
function Tp(e, t) {
	var n = wp(t), r = t[1], i = Q(r), a = [
		Q(n),
		-Kf(n),
		0
	], o = 0, s = 0, c = new Ff();
	i === 1 ? r = Bf + J : i === -1 && (r = -Bf - J);
	for (var l = 0, u = e.length; l < u; ++l) if (f = (d = e[l]).length) for (var d, f, p = d[f - 1], m = wp(p), h = p[1] / 2 + Vf, g = Q(h), _ = Kf(h), v = 0; v < f; ++v, m = b, g = S, _ = C, p = y) {
		var y = d[v], b = wp(y), x = y[1] / 2 + Vf, S = Q(x), C = Kf(x), w = b - m, T = w >= 0 ? 1 : -1, E = T * w, D = E > Y, ee = g * S;
		if (c.add(Gf(ee * T * Q(E), _ * C + ee * Kf(E))), o += D ? w + T * Hf : w, D ^ m >= n ^ b >= n) {
			var O = sp(ap(p), ap(y));
			up(O);
			var te = sp(a, O);
			up(te);
			var ne = (D ^ w >= 0 ? -1 : 1) * Zf(te[2]);
			(r > ne || r === ne && (O[0] || O[1])) && (s += D ^ w >= 0 ? 1 : -1);
		}
	}
	return (o < -J || o < J && c < -zf) ^ s & 1;
}
function Ep(e, t, n, r) {
	return function(i) {
		var a = t(i), o = yp(), s = t(o), c = !1, l, u, d, f = {
			point: p,
			lineStart: h,
			lineEnd: g,
			polygonStart: function() {
				f.point = _, f.lineStart = v, f.lineEnd = y, u = [], l = [];
			},
			polygonEnd: function() {
				f.point = p, f.lineStart = h, f.lineEnd = g, u = Lf(u);
				var e = Tp(l, r);
				u.length ? (c ||= (i.polygonStart(), !0), Sp(u, Op, e, n, i)) : e && (c ||= (i.polygonStart(), !0), i.lineStart(), n(null, null, 1, i), i.lineEnd()), c &&= (i.polygonEnd(), !1), u = l = null;
			},
			sphere: function() {
				i.polygonStart(), i.lineStart(), n(null, null, 1, i), i.lineEnd(), i.polygonEnd();
			}
		};
		function p(t, n) {
			e(t, n) && i.point(t, n);
		}
		function m(e, t) {
			a.point(e, t);
		}
		function h() {
			f.point = m, a.lineStart();
		}
		function g() {
			f.point = p, a.lineEnd();
		}
		function _(e, t) {
			d.push([e, t]), s.point(e, t);
		}
		function v() {
			s.lineStart(), d = [];
		}
		function y() {
			_(d[0][0], d[0][1]), s.lineEnd();
			var e = s.clean(), t = o.result(), n, r = t.length, a, f, p;
			if (d.pop(), l.push(d), d = null, r) {
				if (e & 1) {
					if (f = t[0], (a = f.length - 1) > 0) {
						for (c ||= (i.polygonStart(), !0), i.lineStart(), n = 0; n < a; ++n) i.point((p = f[n])[0], p[1]);
						i.lineEnd();
					}
				} else r > 1 && e & 2 && t.push(t.pop().concat(t.shift())), u.push(t.filter(Dp));
			}
		}
		return f;
	};
}
function Dp(e) {
	return e.length > 1;
}
function Op(e, t) {
	return ((e = e.x)[0] < 0 ? e[1] - Bf - J : Bf - e[1]) - ((t = t.x)[0] < 0 ? t[1] - Bf - J : Bf - t[1]);
}
var kp = Ep(function() {
	return !0;
}, Ap, Mp, [-Y, -Bf]);
function Ap(e) {
	var t = NaN, n = NaN, r = NaN, i;
	return {
		lineStart: function() {
			e.lineStart(), i = 1;
		},
		point: function(a, o) {
			var s = a > 0 ? Y : -Y, c = Z(a - t);
			Z(c - Y) < J ? (e.point(t, n = (n + o) / 2 > 0 ? Bf : -Bf), e.point(r, n), e.lineEnd(), e.lineStart(), e.point(s, n), e.point(a, n), i = 0) : r !== s && c >= Y && (Z(t - r) < J && (t -= r * J), Z(a - s) < J && (a -= s * J), n = jp(t, n, a, o), e.point(r, n), e.lineEnd(), e.lineStart(), e.point(s, n), i = 0), e.point(t = a, n = o), r = s;
		},
		lineEnd: function() {
			e.lineEnd(), t = n = NaN;
		},
		clean: function() {
			return 2 - i;
		}
	};
}
function jp(e, t, n, r) {
	var i, a, o = Q(e - n);
	return Z(o) > J ? Wf((Q(t) * (a = Kf(r)) * Q(n) - Q(r) * (i = Kf(t)) * Q(e)) / (i * a * o)) : (t + r) / 2;
}
function Mp(e, t, n, r) {
	var i;
	if (e == null) i = n * Bf, r.point(-Y, i), r.point(0, i), r.point(Y, i), r.point(Y, 0), r.point(Y, -i), r.point(0, -i), r.point(-Y, -i), r.point(-Y, 0), r.point(-Y, i);
	else if (Z(e[0] - t[0]) > J) {
		var a = e[0] < t[0] ? Y : -Y;
		i = n * a / 2, r.point(-a, i), r.point(0, i), r.point(a, i);
	} else r.point(t[0], t[1]);
}
function Np(e) {
	var t = Kf(e), n = 2 * X, r = t > 0, i = Z(t) > J;
	function a(t, r, i, a) {
		_p(a, e, n, i, t, r);
	}
	function o(e, n) {
		return Kf(e) * Kf(n) > t;
	}
	function s(e) {
		var t, n, a, s, u;
		return {
			lineStart: function() {
				s = a = !1, u = 1;
			},
			point: function(d, f) {
				var p = [d, f], m, h = o(d, f), g = r ? h ? 0 : l(d, f) : h ? l(d + (d < 0 ? Y : -Y), f) : 0;
				if (!t && (s = a = h) && e.lineStart(), h !== a && (m = c(t, p), (!m || bp(t, m) || bp(p, m)) && (p[2] = 1)), h !== a) u = 0, h ? (e.lineStart(), m = c(p, t), e.point(m[0], m[1])) : (m = c(t, p), e.point(m[0], m[1], 2), e.lineEnd()), t = m;
				else if (i && t && r ^ h) {
					var _;
					!(g & n) && (_ = c(p, t, !0)) && (u = 0, r ? (e.lineStart(), e.point(_[0][0], _[0][1]), e.point(_[1][0], _[1][1]), e.lineEnd()) : (e.point(_[1][0], _[1][1]), e.lineEnd(), e.lineStart(), e.point(_[0][0], _[0][1], 3)));
				}
				!h || t && bp(t, p) || e.point(p[0], p[1]), t = p, a = h, n = g;
			},
			lineEnd: function() {
				a && e.lineEnd(), t = null;
			},
			clean: function() {
				return u | (s && a) << 1;
			}
		};
	}
	function c(e, n, r) {
		var i = ap(e), a = ap(n), o = [
			1,
			0,
			0
		], s = sp(i, a), c = op(s, s), l = s[0], u = c - l * l;
		if (!u) return !r && e;
		var d = t * c / u, f = -t * l / u, p = sp(o, s), m = lp(o, d);
		cp(m, lp(s, f));
		var h = p, g = op(m, h), _ = op(h, h), v = g * g - _ * (op(m, m) - 1);
		if (!(v < 0)) {
			var y = Yf(v), b = lp(h, (-g - y) / _);
			if (cp(b, m), b = ip(b), !r) return b;
			var x = e[0], S = n[0], C = e[1], w = n[1], T;
			S < x && (T = x, x = S, S = T);
			var E = S - x, D = Z(E - Y) < J, ee = D || E < J;
			if (!D && w < C && (T = C, C = w, w = T), ee ? D ? C + w > 0 ^ b[1] < (Z(b[0] - x) < J ? C : w) : C <= b[1] && b[1] <= w : E > Y ^ (x <= b[0] && b[0] <= S)) {
				var O = lp(h, (-g + y) / _);
				return cp(O, m), [b, ip(O)];
			}
		}
	}
	function l(t, n) {
		var i = r ? e : Y - e, a = 0;
		return t < -i ? a |= 1 : t > i && (a |= 2), n < -i ? a |= 4 : n > i && (a |= 8), a;
	}
	return Ep(o, s, a, r ? [0, -e] : [-Y, e - Y]);
}
function Pp(e, t, n, r, i, a) {
	var o = e[0], s = e[1], c = t[0], l = t[1], u = 0, d = 1, f = c - o, p = l - s, m = n - o;
	if (!(!f && m > 0)) {
		if (m /= f, f < 0) {
			if (m < u) return;
			m < d && (d = m);
		} else if (f > 0) {
			if (m > d) return;
			m > u && (u = m);
		}
		if (m = i - o, !(!f && m < 0)) {
			if (m /= f, f < 0) {
				if (m > d) return;
				m > u && (u = m);
			} else if (f > 0) {
				if (m < u) return;
				m < d && (d = m);
			}
			if (m = r - s, !(!p && m > 0)) {
				if (m /= p, p < 0) {
					if (m < u) return;
					m < d && (d = m);
				} else if (p > 0) {
					if (m > d) return;
					m > u && (u = m);
				}
				if (m = a - s, !(!p && m < 0)) {
					if (m /= p, p < 0) {
						if (m > d) return;
						m > u && (u = m);
					} else if (p > 0) {
						if (m < u) return;
						m < d && (d = m);
					}
					return u > 0 && (e[0] = o + u * f, e[1] = s + u * p), d < 1 && (t[0] = o + d * f, t[1] = s + d * p), !0;
				}
			}
		}
	}
}
var Fp = 1e9, Ip = -Fp;
function Lp(e, t, n, r) {
	function i(i, a) {
		return e <= i && i <= n && t <= a && a <= r;
	}
	function a(i, a, s, l) {
		var u = 0, d = 0;
		if (i == null || (u = o(i, s)) !== (d = o(a, s)) || c(i, a) < 0 ^ s > 0) do
			l.point(u === 0 || u === 3 ? e : n, u > 1 ? r : t);
		while ((u = (u + s + 4) % 4) !== d);
		else l.point(a[0], a[1]);
	}
	function o(r, i) {
		return Z(r[0] - e) < J ? i > 0 ? 0 : 3 : Z(r[0] - n) < J ? i > 0 ? 2 : 1 : Z(r[1] - t) < J ? +(i > 0) : i > 0 ? 3 : 2;
	}
	function s(e, t) {
		return c(e.x, t.x);
	}
	function c(e, t) {
		var n = o(e, 1), r = o(t, 1);
		return n === r ? n === 0 ? t[1] - e[1] : n === 1 ? e[0] - t[0] : n === 2 ? e[1] - t[1] : t[0] - e[0] : n - r;
	}
	return function(o) {
		var c = o, l = yp(), u, d, f, p, m, h, g, _, v, y, b, x = {
			point: S,
			lineStart: E,
			lineEnd: D,
			polygonStart: w,
			polygonEnd: T
		};
		function S(e, t) {
			i(e, t) && c.point(e, t);
		}
		function C() {
			for (var t = 0, n = 0, i = d.length; n < i; ++n) for (var a = d[n], o = 1, s = a.length, c = a[0], l, u, f = c[0], p = c[1]; o < s; ++o) l = f, u = p, c = a[o], f = c[0], p = c[1], u <= r ? p > r && (f - l) * (r - u) > (p - u) * (e - l) && ++t : p <= r && (f - l) * (r - u) < (p - u) * (e - l) && --t;
			return t;
		}
		function w() {
			c = l, u = [], d = [], b = !0;
		}
		function T() {
			var e = C(), t = b && e, n = (u = Lf(u)).length;
			(t || n) && (o.polygonStart(), t && (o.lineStart(), a(null, null, 1, o), o.lineEnd()), n && Sp(u, s, e, a, o), o.polygonEnd()), c = o, u = d = f = null;
		}
		function E() {
			x.point = ee, d && d.push(f = []), y = !0, v = !1, g = _ = NaN;
		}
		function D() {
			u && (ee(p, m), h && v && l.rejoin(), u.push(l.result())), x.point = S, v && c.lineEnd();
		}
		function ee(a, o) {
			var s = i(a, o);
			if (d && f.push([a, o]), y) p = a, m = o, h = s, y = !1, s && (c.lineStart(), c.point(a, o));
			else if (s && v) c.point(a, o);
			else {
				var l = [g = Math.max(Ip, Math.min(Fp, g)), _ = Math.max(Ip, Math.min(Fp, _))], u = [a = Math.max(Ip, Math.min(Fp, a)), o = Math.max(Ip, Math.min(Fp, o))];
				Pp(l, u, e, t, n, r) ? (v || (c.lineStart(), c.point(l[0], l[1])), c.point(u[0], u[1]), s || c.lineEnd(), b = !1) : s && (c.lineStart(), c.point(a, o), b = !1);
			}
			g = a, _ = o, v = s;
		}
		return x;
	};
}
function Rp(e, t, n) {
	var r = Rf(e, t - J, n).concat(t);
	return function(e) {
		return r.map(function(t) {
			return [e, t];
		});
	};
}
function zp(e, t, n) {
	var r = Rf(e, t - J, n).concat(t);
	return function(e) {
		return r.map(function(t) {
			return [t, e];
		});
	};
}
function Bp() {
	var e, t, n, r, i, a, o, s, c = 10, l = c, u = 90, d = 360, f, p, m, h, g = 2.5;
	function _() {
		return {
			type: "MultiLineString",
			coordinates: v()
		};
	}
	function v() {
		return Rf(qf(r / u) * u, n, u).map(m).concat(Rf(qf(s / d) * d, o, d).map(h)).concat(Rf(qf(t / c) * c, e, c).filter(function(e) {
			return Z(e % u) > J;
		}).map(f)).concat(Rf(qf(a / l) * l, i, l).filter(function(e) {
			return Z(e % d) > J;
		}).map(p));
	}
	return _.lines = function() {
		return v().map(function(e) {
			return {
				type: "LineString",
				coordinates: e
			};
		});
	}, _.outline = function() {
		return {
			type: "Polygon",
			coordinates: [m(r).concat(h(o).slice(1), m(n).reverse().slice(1), h(s).reverse().slice(1))]
		};
	}, _.extent = function(e) {
		return arguments.length ? _.extentMajor(e).extentMinor(e) : _.extentMinor();
	}, _.extentMajor = function(e) {
		return arguments.length ? (r = +e[0][0], n = +e[1][0], s = +e[0][1], o = +e[1][1], r > n && (e = r, r = n, n = e), s > o && (e = s, s = o, o = e), _.precision(g)) : [[r, s], [n, o]];
	}, _.extentMinor = function(n) {
		return arguments.length ? (t = +n[0][0], e = +n[1][0], a = +n[0][1], i = +n[1][1], t > e && (n = t, t = e, e = n), a > i && (n = a, a = i, i = n), _.precision(g)) : [[t, a], [e, i]];
	}, _.step = function(e) {
		return arguments.length ? _.stepMajor(e).stepMinor(e) : _.stepMinor();
	}, _.stepMajor = function(e) {
		return arguments.length ? (u = +e[0], d = +e[1], _) : [u, d];
	}, _.stepMinor = function(e) {
		return arguments.length ? (c = +e[0], l = +e[1], _) : [c, l];
	}, _.precision = function(c) {
		return arguments.length ? (g = +c, f = Rp(a, i, 90), p = zp(t, e, g), m = Rp(s, o, 90), h = zp(r, n, g), _) : g;
	}, _.extentMajor([[-180, -90 + J], [180, 90 - J]]).extentMinor([[-180, -80 - J], [180, 80 + J]]);
}
function Vp() {
	return Bp()();
}
var Hp = (e) => e, Up = new Ff(), Wp = new Ff(), Gp, Kp, qp, Jp, Yp = {
	point: Qf,
	lineStart: Qf,
	lineEnd: Qf,
	polygonStart: function() {
		Yp.lineStart = Xp, Yp.lineEnd = $p;
	},
	polygonEnd: function() {
		Yp.lineStart = Yp.lineEnd = Yp.point = Qf, Up.add(Z(Wp)), Wp = new Ff();
	},
	result: function() {
		var e = Up / 2;
		return Up = new Ff(), e;
	}
};
function Xp() {
	Yp.point = Zp;
}
function Zp(e, t) {
	Yp.point = Qp, Gp = qp = e, Kp = Jp = t;
}
function Qp(e, t) {
	Wp.add(Jp * e - qp * t), qp = e, Jp = t;
}
function $p() {
	Qp(Gp, Kp);
}
var em = Infinity, tm = em, nm = -em, rm = nm, im = {
	point: am,
	lineStart: Qf,
	lineEnd: Qf,
	polygonStart: Qf,
	polygonEnd: Qf,
	result: function() {
		var e = [[em, tm], [nm, rm]];
		return nm = rm = -(tm = em = Infinity), e;
	}
};
function am(e, t) {
	e < em && (em = e), e > nm && (nm = e), t < tm && (tm = t), t > rm && (rm = t);
}
var om = 0, sm = 0, cm = 0, lm = 0, um = 0, dm = 0, fm = 0, pm = 0, mm = 0, hm, gm, _m, vm, ym = {
	point: bm,
	lineStart: xm,
	lineEnd: wm,
	polygonStart: function() {
		ym.lineStart = Tm, ym.lineEnd = Em;
	},
	polygonEnd: function() {
		ym.point = bm, ym.lineStart = xm, ym.lineEnd = wm;
	},
	result: function() {
		var e = mm ? [fm / mm, pm / mm] : dm ? [lm / dm, um / dm] : cm ? [om / cm, sm / cm] : [NaN, NaN];
		return om = sm = cm = lm = um = dm = fm = pm = mm = 0, e;
	}
};
function bm(e, t) {
	om += e, sm += t, ++cm;
}
function xm() {
	ym.point = Sm;
}
function Sm(e, t) {
	ym.point = Cm, bm(_m = e, vm = t);
}
function Cm(e, t) {
	var n = e - _m, r = t - vm, i = Yf(n * n + r * r);
	lm += i * (_m + e) / 2, um += i * (vm + t) / 2, dm += i, bm(_m = e, vm = t);
}
function wm() {
	ym.point = bm;
}
function Tm() {
	ym.point = Dm;
}
function Em() {
	Om(hm, gm);
}
function Dm(e, t) {
	ym.point = Om, bm(hm = _m = e, gm = vm = t);
}
function Om(e, t) {
	var n = e - _m, r = t - vm, i = Yf(n * n + r * r);
	lm += i * (_m + e) / 2, um += i * (vm + t) / 2, dm += i, i = vm * e - _m * t, fm += i * (_m + e), pm += i * (vm + t), mm += i * 3, bm(_m = e, vm = t);
}
function km(e) {
	this._context = e;
}
km.prototype = {
	_radius: 4.5,
	pointRadius: function(e) {
		return this._radius = e, this;
	},
	polygonStart: function() {
		this._line = 0;
	},
	polygonEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		this._line === 0 && this._context.closePath(), this._point = NaN;
	},
	point: function(e, t) {
		switch (this._point) {
			case 0:
				this._context.moveTo(e, t), this._point = 1;
				break;
			case 1:
				this._context.lineTo(e, t);
				break;
			default: this._context.moveTo(e + this._radius, t), this._context.arc(e, t, this._radius, 0, Hf);
		}
	},
	result: Qf
};
var Am = new Ff(), jm, Mm, Nm, Pm, Fm, Im = {
	point: Qf,
	lineStart: function() {
		Im.point = Lm;
	},
	lineEnd: function() {
		jm && Rm(Mm, Nm), Im.point = Qf;
	},
	polygonStart: function() {
		jm = !0;
	},
	polygonEnd: function() {
		jm = null;
	},
	result: function() {
		var e = +Am;
		return Am = new Ff(), e;
	}
};
function Lm(e, t) {
	Im.point = Rm, Mm = Pm = e, Nm = Fm = t;
}
function Rm(e, t) {
	Pm -= e, Fm -= t, Am.add(Yf(Pm * Pm + Fm * Fm)), Pm = e, Fm = t;
}
var zm, Bm, Vm, Hm, Um = class {
	constructor(e) {
		this._append = e == null ? Wm : Gm(e), this._radius = 4.5, this._ = "";
	}
	pointRadius(e) {
		return this._radius = +e, this;
	}
	polygonStart() {
		this._line = 0;
	}
	polygonEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		this._line === 0 && (this._ += "Z"), this._point = NaN;
	}
	point(e, t) {
		switch (this._point) {
			case 0:
				this._append`M${e},${t}`, this._point = 1;
				break;
			case 1:
				this._append`L${e},${t}`;
				break;
			default:
				if (this._append`M${e},${t}`, this._radius !== Vm || this._append !== Bm) {
					let e = this._radius, t = this._;
					this._ = "", this._append`m0,${e}a${e},${e} 0 1,1 0,${-2 * e}a${e},${e} 0 1,1 0,${2 * e}z`, Vm = e, Bm = this._append, Hm = this._, this._ = t;
				}
				this._ += Hm;
		}
	}
	result() {
		let e = this._;
		return this._ = "", e.length ? e : null;
	}
};
function Wm(e) {
	let t = 1;
	this._ += e[0];
	for (let n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function Gm(e) {
	let t = Math.floor(e);
	if (!(t >= 0)) throw RangeError(`invalid digits: ${e}`);
	if (t > 15) return Wm;
	if (t !== zm) {
		let e = 10 ** t;
		zm = t, Bm = function(t) {
			let n = 1;
			this._ += t[0];
			for (let r = t.length; n < r; ++n) this._ += Math.round(arguments[n] * e) / e + t[n];
		};
	}
	return Bm;
}
function Km(e, t) {
	let n = 3, r = 4.5, i, a;
	function o(e) {
		return e && (typeof r == "function" && a.pointRadius(+r.apply(this, arguments)), rp(e, i(a))), a.result();
	}
	return o.area = function(e) {
		return rp(e, i(Yp)), Yp.result();
	}, o.measure = function(e) {
		return rp(e, i(Im)), Im.result();
	}, o.bounds = function(e) {
		return rp(e, i(im)), im.result();
	}, o.centroid = function(e) {
		return rp(e, i(ym)), ym.result();
	}, o.projection = function(t) {
		return arguments.length ? (i = t == null ? (e = null, Hp) : (e = t).stream, o) : e;
	}, o.context = function(e) {
		return arguments.length ? (a = e == null ? (t = null, new Um(n)) : new km(t = e), typeof r != "function" && a.pointRadius(r), o) : t;
	}, o.pointRadius = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : (a.pointRadius(+e), +e), o) : r;
	}, o.digits = function(e) {
		if (!arguments.length) return n;
		if (e == null) n = null;
		else {
			let t = Math.floor(e);
			if (!(t >= 0)) throw RangeError(`invalid digits: ${e}`);
			n = t;
		}
		return t === null && (a = new Um(n)), o;
	}, o.projection(e).digits(n).context(t);
}
function qm(e) {
	return function(t) {
		var n = new Jm();
		for (var r in e) n[r] = e[r];
		return n.stream = t, n;
	};
}
function Jm() {}
Jm.prototype = {
	constructor: Jm,
	point: function(e, t) {
		this.stream.point(e, t);
	},
	sphere: function() {
		this.stream.sphere();
	},
	lineStart: function() {
		this.stream.lineStart();
	},
	lineEnd: function() {
		this.stream.lineEnd();
	},
	polygonStart: function() {
		this.stream.polygonStart();
	},
	polygonEnd: function() {
		this.stream.polygonEnd();
	}
};
function Ym(e, t, n) {
	var r = e.clipExtent && e.clipExtent();
	return e.scale(150).translate([0, 0]), r != null && e.clipExtent(null), rp(n, e.stream(im)), t(im.result()), r != null && e.clipExtent(r), e;
}
function Xm(e, t, n) {
	return Ym(e, function(n) {
		var r = t[1][0] - t[0][0], i = t[1][1] - t[0][1], a = Math.min(r / (n[1][0] - n[0][0]), i / (n[1][1] - n[0][1])), o = +t[0][0] + (r - a * (n[1][0] + n[0][0])) / 2, s = +t[0][1] + (i - a * (n[1][1] + n[0][1])) / 2;
		e.scale(150 * a).translate([o, s]);
	}, n);
}
function Zm(e, t, n) {
	return Xm(e, [[0, 0], t], n);
}
function Qm(e, t, n) {
	return Ym(e, function(n) {
		var r = +t, i = r / (n[1][0] - n[0][0]), a = (r - i * (n[1][0] + n[0][0])) / 2, o = -i * n[0][1];
		e.scale(150 * i).translate([a, o]);
	}, n);
}
function $m(e, t, n) {
	return Ym(e, function(n) {
		var r = +t, i = r / (n[1][1] - n[0][1]), a = -i * n[0][0], o = (r - i * (n[1][1] + n[0][1])) / 2;
		e.scale(150 * i).translate([a, o]);
	}, n);
}
var eh = 16, th = Kf(30 * X);
function nh(e, t) {
	return +t ? ih(e, t) : rh(e);
}
function rh(e) {
	return qm({ point: function(t, n) {
		t = e(t, n), this.stream.point(t[0], t[1]);
	} });
}
function ih(e, t) {
	function n(r, i, a, o, s, c, l, u, d, f, p, m, h, g) {
		var _ = l - r, v = u - i, y = _ * _ + v * v;
		if (y > 4 * t && h--) {
			var b = o + f, x = s + p, S = c + m, C = Yf(b * b + x * x + S * S), w = Zf(S /= C), T = Z(Z(S) - 1) < J || Z(a - d) < J ? (a + d) / 2 : Gf(x, b), E = e(T, w), D = E[0], ee = E[1], O = D - r, te = ee - i, ne = v * O - _ * te;
			(ne * ne / y > t || Z((_ * O + v * te) / y - .5) > .3 || o * f + s * p + c * m < th) && (n(r, i, a, o, s, c, D, ee, T, b /= C, x /= C, S, h, g), g.point(D, ee), n(D, ee, T, b, x, S, l, u, d, f, p, m, h, g));
		}
	}
	return function(t) {
		var r, i, a, o, s, c, l, u, d, f, p, m, h = {
			point: g,
			lineStart: _,
			lineEnd: y,
			polygonStart: function() {
				t.polygonStart(), h.lineStart = b;
			},
			polygonEnd: function() {
				t.polygonEnd(), h.lineStart = _;
			}
		};
		function g(n, r) {
			n = e(n, r), t.point(n[0], n[1]);
		}
		function _() {
			u = NaN, h.point = v, t.lineStart();
		}
		function v(r, i) {
			var a = ap([r, i]), o = e(r, i);
			n(u, d, l, f, p, m, u = o[0], d = o[1], l = r, f = a[0], p = a[1], m = a[2], eh, t), t.point(u, d);
		}
		function y() {
			h.point = g, t.lineEnd();
		}
		function b() {
			_(), h.point = x, h.lineEnd = S;
		}
		function x(e, t) {
			v(r = e, t), i = u, a = d, o = f, s = p, c = m, h.point = v;
		}
		function S() {
			n(u, d, l, f, p, m, i, a, r, o, s, c, eh, t), h.lineEnd = y, y();
		}
		return h;
	};
}
var ah = qm({ point: function(e, t) {
	this.stream.point(e * X, t * X);
} });
function oh(e) {
	return qm({ point: function(t, n) {
		var r = e(t, n);
		return this.stream.point(r[0], r[1]);
	} });
}
function sh(e, t, n, r, i) {
	function a(a, o) {
		return a *= r, o *= i, [t + e * a, n - e * o];
	}
	return a.invert = function(a, o) {
		return [(a - t) / e * r, (n - o) / e * i];
	}, a;
}
function ch(e, t, n, r, i, a) {
	if (!a) return sh(e, t, n, r, i);
	var o = Kf(a), s = Q(a), c = o * e, l = s * e, u = o / e, d = s / e, f = (s * n - o * t) / e, p = (s * t + o * n) / e;
	function m(e, a) {
		return e *= r, a *= i, [c * e - l * a + t, n - l * e - c * a];
	}
	return m.invert = function(e, t) {
		return [r * (u * e - d * t + f), i * (p - d * e - u * t)];
	}, m;
}
function lh(e) {
	return uh(function() {
		return e;
	})();
}
function uh(e) {
	var t, n = 150, r = 480, i = 250, a = 0, o = 0, s = 0, c = 0, l = 0, u, d = 0, f = 1, p = 1, m = null, h = kp, g = null, _, v, y, b = Hp, x = .5, S, C, w, T, E;
	function D(e) {
		return w(e[0] * X, e[1] * X);
	}
	function ee(e) {
		return e = w.invert(e[0], e[1]), e && [e[0] * Uf, e[1] * Uf];
	}
	D.stream = function(e) {
		return T && E === e ? T : T = ah(oh(u)(h(S(b(E = e)))));
	}, D.preclip = function(e) {
		return arguments.length ? (h = e, m = void 0, te()) : h;
	}, D.postclip = function(e) {
		return arguments.length ? (b = e, g = _ = v = y = null, te()) : b;
	}, D.clipAngle = function(e) {
		return arguments.length ? (h = +e ? Np(m = e * X) : (m = null, kp), te()) : m * Uf;
	}, D.clipExtent = function(e) {
		return arguments.length ? (b = e == null ? (g = _ = v = y = null, Hp) : Lp(g = +e[0][0], _ = +e[0][1], v = +e[1][0], y = +e[1][1]), te()) : g == null ? null : [[g, _], [v, y]];
	}, D.scale = function(e) {
		return arguments.length ? (n = +e, O()) : n;
	}, D.translate = function(e) {
		return arguments.length ? (r = +e[0], i = +e[1], O()) : [r, i];
	}, D.center = function(e) {
		return arguments.length ? (a = e[0] % 360 * X, o = e[1] % 360 * X, O()) : [a * Uf, o * Uf];
	}, D.rotate = function(e) {
		return arguments.length ? (s = e[0] % 360 * X, c = e[1] % 360 * X, l = e.length > 2 ? e[2] % 360 * X : 0, O()) : [
			s * Uf,
			c * Uf,
			l * Uf
		];
	}, D.angle = function(e) {
		return arguments.length ? (d = e % 360 * X, O()) : d * Uf;
	}, D.reflectX = function(e) {
		return arguments.length ? (f = e ? -1 : 1, O()) : f < 0;
	}, D.reflectY = function(e) {
		return arguments.length ? (p = e ? -1 : 1, O()) : p < 0;
	}, D.precision = function(e) {
		return arguments.length ? (S = nh(C, x = e * e), te()) : Yf(x);
	}, D.fitExtent = function(e, t) {
		return Xm(D, e, t);
	}, D.fitSize = function(e, t) {
		return Zm(D, e, t);
	}, D.fitWidth = function(e, t) {
		return Qm(D, e, t);
	}, D.fitHeight = function(e, t) {
		return $m(D, e, t);
	};
	function O() {
		var e = ch(n, 0, 0, f, p, d).apply(null, t(a, o)), m = ch(n, r - e[0], i - e[1], f, p, d);
		return u = pp(s, c, l), C = dp(t, m), w = dp(u, C), S = nh(C, x), te();
	}
	function te() {
		return T = E = null, D;
	}
	return function() {
		return t = e.apply(this, arguments), D.invert = t.invert && ee, O();
	};
}
function dh(e) {
	return function(t, n) {
		var r = Kf(t), i = Kf(n), a = e(r * i);
		return a === Infinity ? [2, 0] : [a * i * Q(t), a * Q(n)];
	};
}
function fh(e) {
	return function(t, n) {
		var r = Yf(t * t + n * n), i = e(r), a = Q(i), o = Kf(i);
		return [Gf(t * a, r * o), Zf(r && n * a / r)];
	};
}
var ph = dh(function(e) {
	return Yf(2 / (1 + e));
});
ph.invert = fh(function(e) {
	return 2 * Zf(e / 2);
});
var mh = dh(function(e) {
	return (e = Xf(e)) && e / Q(e);
});
mh.invert = fh(function(e) {
	return e;
});
function hh(e, t) {
	return [e, t];
}
hh.invert = hh, Yf(3) / 2;
function gh(e, t) {
	return [Kf(t) * Q(e), Q(t)];
}
gh.invert = fh(Zf);
function _h() {
	return lh(gh).scale(249.5).clipAngle(90 + J);
}
// src/Globe.jsx
function vh({ records: e, world: t }) {
	let n = (0, D.useRef)(null), r = (0, D.useRef)(65), i = (0, D.useRef)(null), a = (0, D.useRef)(() => {}), o = lf(), [s, c] = (0, D.useState)(!1), l = (0, D.useMemo)(() => e.filter((e) => e.terrestrial && e.mappable).map((e) => {
		let t = e.lat * Math.PI / 180, n = e.lon * Math.PI / 180;
		return {
			x: Math.cos(t) * Math.cos(n),
			y: Math.cos(t) * Math.sin(n),
			z: Math.sin(t),
			fell: e.fall === "Fell",
			id: e.id
		};
	}), [e]);
	return (0, D.useEffect)(() => {
		let e = n.current;
		if (!e || !t) return;
		let c = e.getContext("2d"), u = Math.min(devicePixelRatio || 1, 2);
		e.width = 800 * u, e.height = 800 * u, c.scale(u, u);
		let d = _h().translate([400, 400]).scale(343), f = Km(d, c), p = Vp(), m, h = 0;
		function g(e) {
			if (!s && !o && (m = requestAnimationFrame(g)), !s && !o && e - h < 33) return;
			let n = Math.min(80, e - h);
			h = e, s || o || i.current || (r.current += n * .002), d.rotate([r.current, 16]), c.clearRect(0, 0, 800, 800);
			let a = c.createRadialGradient(290, 220, 20, 400, 400, 343);
			a.addColorStop(0, "#163a44"), a.addColorStop(1, "#071a23"), c.beginPath(), f({ type: "Sphere" }), c.fillStyle = a, c.fill(), c.strokeStyle = "#31575c", c.lineWidth = .8, c.stroke(), c.beginPath(), f(p), c.strokeStyle = "#7de2dd12", c.stroke(), c.beginPath(), f(t), c.fillStyle = "#244a4b", c.fill(), c.strokeStyle = "#67928a66", c.lineWidth = .6, c.stroke();
			let u = r.current * Math.PI / 180, _ = 16 * Math.PI / 180, v = Math.cos(u), y = Math.sin(u), b = Math.cos(_), x = Math.sin(_);
			for (let t of l) {
				let n = t.x * v - t.y * y, r = t.x * y + t.y * v;
				if (n * b - t.z * x < 0) continue;
				let i = 400 + 343 * r, a = 400 - 343 * (t.z * b + n * x);
				if (c.fillStyle = t.fell ? "#f4bd70" : "#7de2dd", c.globalAlpha = t.fell ? .95 : .38, c.beginPath(), c.arc(i, a, t.fell ? 1.9 : 1.1, 0, 2 * Math.PI), c.fill(), t.fell && t.id % 47 == 0 && !s && !o) {
					let n = (e + t.id * 19) % 2800 / 2800;
					c.beginPath(), c.arc(i, a, 3 + n * 19, 0, 2 * Math.PI), c.globalAlpha = .7 * (1 - n), c.strokeStyle = "#f4bd70", c.lineWidth = 1.2, c.stroke();
				}
			}
			c.globalAlpha = 1;
		}
		return a.current = () => g(performance.now()), m = requestAnimationFrame(g), () => {
			cancelAnimationFrame(m), a.current = () => {};
		};
	}, [
		t,
		l,
		s,
		o
	]), /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "globe-wrap",
		children: [/* @__PURE__ */ (0, H.jsx)("canvas", {
			ref: n,
			"aria-label": "Globo de 32 186 registros terrestres con coordenadas utilizables. Arrastra para girar.",
			onPointerDown: (e) => {
				i.current = e.clientX, e.currentTarget.setPointerCapture(e.pointerId);
			},
			onPointerMove: (e) => {
				i.current !== null && (r.current += (e.clientX - i.current) * .28, i.current = e.clientX, (s || o) && a.current());
			},
			onPointerUp: () => {
				i.current = null;
			},
			onPointerCancel: () => {
				i.current = null;
			}
		}), /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "globe-caption",
			children: [/* @__PURE__ */ (0, H.jsxs)("span", { children: [
				/* @__PURE__ */ (0, H.jsx)("i", {}),
				" Found ",
				/* @__PURE__ */ (0, H.jsx)("i", { className: "gold" }),
				" Fell"
			] }), /* @__PURE__ */ (0, H.jsxs)("button", {
				onClick: () => c((e) => !e),
				"aria-label": s ? "Girar globo" : "Pausar globo",
				children: [
					s ? /* @__PURE__ */ (0, H.jsx)(de, { size: 15 }) : /* @__PURE__ */ (0, H.jsx)(le, { size: 15 }),
					" ",
					s ? "Girar" : "Pausar"
				]
			})]
		})]
	});
}
// src/Explorers.jsx
function yh({ children: e, delay: t = 0, className: n = "" }) {
	let r = lf();
	return /* @__PURE__ */ (0, H.jsx)(uf.div, {
		className: n,
		initial: {
			opacity: 0,
			y: r ? 0 : 18
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: r ? 0 : .65,
			delay: t,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children: e
	});
}
function bh({ line: e }) {
	return /^\s*(#|\/\/)/.test(e) ? /* @__PURE__ */ (0, H.jsx)("span", {
		className: "token-comment",
		children: e
	}) : e.split(/("[^"]*"|'[^']*'|\b(?:def|return|const|Math|useMemo|requestAnimationFrame)\b|\b\d[\d._]*\b)/g).map((e, t) => /* @__PURE__ */ (0, H.jsx)("span", {
		className: /^["']/.test(e) ? "token-string" : /^\d/.test(e) ? "token-number" : /^(def|return|const|Math|useMemo|requestAnimationFrame)$/.test(e) ? "token-keyword" : "",
		children: e
	}, t));
}
function xh({ code: e, focus: t = null, language: n = "Python" }) {
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "code-window",
		children: [/* @__PURE__ */ (0, H.jsxs)("div", {
			className: "code-caption",
			children: [/* @__PURE__ */ (0, H.jsx)("span", { children: n }), /* @__PURE__ */ (0, H.jsx)("span", { children: "LECTURA DEL CÓDIGO" })]
		}), /* @__PURE__ */ (0, H.jsx)("pre", { children: /* @__PURE__ */ (0, H.jsx)("code", { children: e.split("\n").map((e, n) => /* @__PURE__ */ (0, H.jsxs)("span", {
			className: `code-line ${t?.includes(n) ? "is-focused" : ""} ${t && !t.includes(n) ? "is-muted" : ""}`,
			children: [/* @__PURE__ */ (0, H.jsx)("em", { children: String(n + 1).padStart(2, "0") }), /* @__PURE__ */ (0, H.jsx)(bh, { line: e || " " })]
		}, n)) }) })]
	});
}
function Sh() {
	let [e, t] = (0, D.useState)("Found"), n = e === "Found";
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: `comparison ${n ? "found" : "fell"}`,
		children: [/* @__PURE__ */ (0, H.jsxs)("div", {
			className: "comparison-copy",
			children: [/* @__PURE__ */ (0, H.jsxs)("p", {
				className: "big-question",
				children: [
					"¿Qué nos dice",
					/* @__PURE__ */ (0, H.jsx)("br", {}),
					"un meteorito",
					/* @__PURE__ */ (0, H.jsx)("br", {}),
					/* @__PURE__ */ (0, H.jsx)("em", { children: "registrado?" })
				]
			}), /* @__PURE__ */ (0, H.jsx)("p", {
				className: "support",
				children: "Geografía, tiempo y masa en un catálogo histórico."
			})]
		}), /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "comparison-evidence",
			children: [
				/* @__PURE__ */ (0, H.jsx)("div", {
					className: "segmented",
					"aria-label": "Tipo de registro",
					children: ["Found", "Fell"].map((n) => /* @__PURE__ */ (0, H.jsxs)("button", {
						"aria-pressed": e === n,
						onClick: () => t(n),
						children: [n, /* @__PURE__ */ (0, H.jsx)(k, { size: 18 })]
					}, n))
				}),
				/* @__PURE__ */ (0, H.jsx)(Qu, {
					mode: "wait",
					children: /* @__PURE__ */ (0, H.jsxs)(uf.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: { opacity: 0 },
						transition: { duration: .18 },
						children: [
							/* @__PURE__ */ (0, H.jsx)("strong", {
								className: "comparison-number",
								children: n ? "44 608" : "1 107"
							}),
							/* @__PURE__ */ (0, H.jsx)("h3", { children: n ? "Encontrados" : "Vistos caer" }),
							/* @__PURE__ */ (0, H.jsx)("p", { children: n ? "Recuperados después de su caída. El año puede corresponder al hallazgo." : "La caída fue observada. Son una pequeña parte del catálogo terrestre." })
						]
					}, e)
				}),
				/* @__PURE__ */ (0, H.jsxs)("div", {
					className: "proportion",
					"aria-label": "97,6 % Found y 2,4 % Fell",
					children: [/* @__PURE__ */ (0, H.jsx)("span", {}), /* @__PURE__ */ (0, H.jsx)("span", {})]
				}),
				/* @__PURE__ */ (0, H.jsxs)("div", {
					className: "proportion-label",
					children: [/* @__PURE__ */ (0, H.jsx)("span", { children: "97,6 % Found" }), /* @__PURE__ */ (0, H.jsx)("span", { children: "2,4 % Fell" })]
				})
			]
		})]
	});
}
var Ch = [
	["Lectura y estructura", "read_csv carga los archivos; head, info y describe revisan el catálogo. El diccionario define las variables."],
	["Una llave, una tabla", "id es único. El diccionario y la cartografía son auxiliares: no corresponde inventar un merge. Se verifica la conservación de filas."],
	["Reglas explícitas", "Se revisan tipos, faltantes, duplicados, textos y años. No se imputan valores; cada pregunta utiliza su muestra válida."],
	["Reestructurar para analizar", "groupby resume grupos; pivot_table organiza décadas; melt convierte P9 a formato largo y se verifica su reconstrucción."],
	["Diez preguntas verificables", "pandas calcula las estadísticas. Matplotlib produce las figuras; Cartopy añade las proyecciones cartográficas."],
	["Interpretación y entrega", "Los hallazgos se explican en lenguaje sencillo, con límites de cobertura y selección. Se entregan informe, notebook, CSV, Excel y capturas."]
], wh = [
	["Un documento editable", "El archivo .qmd reúne las 22 láminas, las notas del expositor y la configuración de la presentación."],
	["Navegación para exponer", "Flechas para avanzar, Esc para la vista general y S para abrir las notas del expositor."],
	["Interacción con estado", "Los filtros actualizan los datos visibles. Los componentes se activan al entrar y detienen sus animaciones al salir."],
	["Dos superficies de dibujo", "SVG conserva gráficos nítidos e interactivos. Canvas dibuja miles de puntos y ondas en un solo lienzo."]
];
function Th({ spec: e, architecture: t }) {
	let [n, r] = (0, D.useState)(0), i = t ? wh : Ch;
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: `process ${t ? "architecture" : "workflow"}`,
		children: [/* @__PURE__ */ (0, H.jsx)("div", {
			className: "process-track",
			children: e.items.map(([e, t], i) => /* @__PURE__ */ (0, H.jsxs)("button", {
				onClick: () => r(i),
				"aria-pressed": n === i,
				children: [
					/* @__PURE__ */ (0, H.jsxs)("span", {
						className: "step-index",
						children: ["0", i + 1]
					}),
					/* @__PURE__ */ (0, H.jsx)("h3", { children: e.replace(/^\d+ · /, "") }),
					/* @__PURE__ */ (0, H.jsx)("p", { children: t }),
					/* @__PURE__ */ (0, H.jsx)("span", { className: "step-line" })
				]
			}, e))
		}), /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "process-detail",
			children: [/* @__PURE__ */ (0, H.jsxs)("div", {
				className: "process-description",
				children: [
					/* @__PURE__ */ (0, H.jsxs)("span", {
						className: "micro",
						children: ["ETAPA 0", n + 1]
					}),
					/* @__PURE__ */ (0, H.jsx)("h3", { children: i[n][0] }),
					/* @__PURE__ */ (0, H.jsx)("p", { children: i[n][1] })
				]
			}, n), /* @__PURE__ */ (0, H.jsx)(xh, {
				code: e.code,
				language: t ? "React / JavaScript" : "Python"
			})]
		})]
	});
}
function Eh({ spec: e, index: t }) {
	let [n, r] = (0, D.useState)(null), i = t === 3 ? [
		[0],
		[2],
		[4, 5]
	] : t === 5 ? [
		[0],
		[
			1,
			2,
			3,
			4
		],
		[1, 5]
	] : [
		[
			0,
			1,
			2
		],
		[3],
		[5]
	];
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "code-layout",
		children: [/* @__PURE__ */ (0, H.jsx)(xh, {
			code: e.code,
			focus: n === null ? null : i[n],
			language: t === 18 ? "JavaScript" : "Python"
		}), /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "code-annotations",
			children: [/* @__PURE__ */ (0, H.jsx)("span", {
				className: "micro",
				children: "EXPLORA LA IMPLEMENTACIÓN"
			}), e.items.map(([e, t], i) => /* @__PURE__ */ (0, H.jsxs)("button", {
				onClick: () => r(n === i ? null : i),
				"aria-pressed": n === i,
				children: [/* @__PURE__ */ (0, H.jsxs)("span", {
					className: "annotation-num",
					children: ["0", i + 1]
				}), /* @__PURE__ */ (0, H.jsxs)("div", { children: [/* @__PURE__ */ (0, H.jsx)("h3", { children: e }), /* @__PURE__ */ (0, H.jsx)("p", { children: t })] })]
			}, e))]
		})]
	});
}
function Dh() {
	let [e, t] = (0, D.useState)(3), n = Math.round(10 ** e), r = Tf(n), i = 2.2 + 6.2 * r;
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "mass-lab",
		children: [
			/* @__PURE__ */ (0, H.jsxs)("label", { children: [
				"Prueba la escala",
				" ",
				/* @__PURE__ */ (0, H.jsx)("input", {
					"aria-label": "Masa del ejemplo",
					type: "range",
					min: "0",
					max: Math.log10(6e7),
					step: ".01",
					value: e,
					onChange: (e) => t(+e.target.value)
				})
			] }),
			/* @__PURE__ */ (0, H.jsxs)("div", { children: [/* @__PURE__ */ (0, H.jsx)("span", { children: "Masa catalogada" }), /* @__PURE__ */ (0, H.jsxs)("strong", { children: [new Intl.NumberFormat("es-PE").format(n), " g"] })] }),
			/* @__PURE__ */ (0, H.jsxs)("div", { children: [/* @__PURE__ */ (0, H.jsx)("span", { children: "Fuerza normalizada" }), /* @__PURE__ */ (0, H.jsx)("strong", { children: r.toFixed(3) })] }),
			/* @__PURE__ */ (0, H.jsxs)("div", { children: [/* @__PURE__ */ (0, H.jsx)("span", { children: "Radio simbólico" }), /* @__PURE__ */ (0, H.jsxs)("strong", { children: [i.toFixed(2), " px"] })] }),
			/* @__PURE__ */ (0, H.jsxs)("svg", {
				width: "90",
				height: "70",
				viewBox: "0 0 90 70",
				role: "img",
				"aria-label": `Radio simbólico: ${i.toFixed(2)} píxeles`,
				children: [/* @__PURE__ */ (0, H.jsx)("circle", {
					cx: "45",
					cy: "35",
					r: i,
					fill: "#f4bd70"
				}), /* @__PURE__ */ (0, H.jsx)("circle", {
					cx: "45",
					cy: "35",
					r: i * 3,
					fill: "none",
					stroke: "#f4bd7070"
				})]
			})
		]
	});
}
// src/Slide.jsx
var Oh = [
	"Richard Michel Altamirano Galvez",
	"Gabriel Andreas Saco Alvarado",
	"Fina Rosmery Pretil Pocomucha"
], kh = [
	{
		label: "El catálogo",
		start: 0
	},
	{
		label: "Método",
		start: 3
	},
	{
		label: "Hallazgos",
		start: 6
	}
];
function Ah({ index: e }) {
	let t = kh.findLastIndex((t) => e >= t.start);
	return /* @__PURE__ */ (0, H.jsxs)("nav", {
		className: "chapter-nav",
		"aria-label": "Secciones de la presentación",
		children: [/* @__PURE__ */ (0, H.jsx)("span", {
			className: "wordmark",
			children: "M / METEORITOS"
		}), /* @__PURE__ */ (0, H.jsx)("div", { children: kh.map((e, n) => /* @__PURE__ */ (0, H.jsxs)("button", {
			"aria-current": n === t ? "step" : void 0,
			onClick: () => window.Reveal.slide(e.start),
			children: [/* @__PURE__ */ (0, H.jsxs)("span", { children: ["0", n + 1] }), e.label]
		}, e.label)) })]
	});
}
function jh({ items: e }) {
	return /* @__PURE__ */ (0, H.jsx)("div", {
		className: "items",
		children: e?.map(([e, t], n) => /* @__PURE__ */ (0, H.jsxs)(yh, {
			delay: n * .08,
			children: [
				/* @__PURE__ */ (0, H.jsxs)("span", {
					className: "item-index",
					children: ["0", n + 1]
				}),
				/* @__PURE__ */ (0, H.jsx)("h3", { children: e }),
				/* @__PURE__ */ (0, H.jsx)("p", { children: t })
			]
		}, e))
	});
}
function Mh({ s: e, index: t, data: n, world: r, error: i, active: a }) {
	let o = [
		"figure",
		"chart",
		"quartiles",
		"association",
		"heatmap"
	].includes(e.kind);
	return e.kind === "cover" ? /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [
		/* @__PURE__ */ (0, H.jsx)("div", {
			className: "cover-data",
			children: a && !i && /* @__PURE__ */ (0, H.jsx)(vh, {
				records: n,
				world: r
			})
		}),
		/* @__PURE__ */ (0, H.jsxs)(yh, {
			className: "cover-copy",
			children: [
				/* @__PURE__ */ (0, H.jsx)("p", {
					className: "eyebrow",
					children: "UNIVERSIDAD DEL PACÍFICO · 2026–2"
				}),
				/* @__PURE__ */ (0, H.jsxs)("h1", { children: ["Meteoritos", /* @__PURE__ */ (0, H.jsxs)("span", { children: [
					"Un catálogo.",
					/* @__PURE__ */ (0, H.jsx)("br", {}),
					"Miles de historias."
				] })] }),
				/* @__PURE__ */ (0, H.jsxs)("button", {
					className: "begin",
					onClick: () => window.Reveal.next(),
					children: ["Explorar el proyecto ", /* @__PURE__ */ (0, H.jsx)(ie, { size: 22 })]
				}),
				/* @__PURE__ */ (0, H.jsx)("div", {
					className: "authors",
					children: Oh.map((e) => /* @__PURE__ */ (0, H.jsx)("span", { children: e }, e))
				})
			]
		}),
		/* @__PURE__ */ (0, H.jsxs)("footer", {
			className: "cover-bottom",
			children: [/* @__PURE__ */ (0, H.jsx)("span", { children: "Herramientas de Programación con Python · Docente: Uwe Rojas" }), /* @__PURE__ */ (0, H.jsx)("span", { children: "20–25 MIN · ARRASTRA EL GLOBO PARA GIRAR" })]
		})
	] }) : /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [
		e.kind !== "demo" && /* @__PURE__ */ (0, H.jsxs)(yh, {
			className: "slide-heading",
			children: [/* @__PURE__ */ (0, H.jsx)("p", {
				className: "eyebrow",
				children: o ? `PREGUNTA ${String(t - 5).padStart(2, "0")} / 10` : t < 6 ? "DATOS Y MÉTODO" : t < 20 ? "DESARROLLO INTERACTIVO" : "SÍNTESIS"
			}), /* @__PURE__ */ (0, H.jsx)("h2", { children: e.title.replace(/^P\d+ · /, "") })]
		}),
		t === 1 ? /* @__PURE__ */ (0, H.jsx)(Sh, {}) : o ? /* @__PURE__ */ (0, H.jsxs)("div", {
			className: `result-layout ${e.kind === "figure" ? "cartography" : ""}`,
			children: [/* @__PURE__ */ (0, H.jsx)(yh, {
				className: "figure-wrap",
				delay: .08,
				children: /* @__PURE__ */ (0, H.jsx)(Sf, {
					spec: e,
					tables: pe.tables
				})
			}), /* @__PURE__ */ (0, H.jsxs)(yh, {
				className: "finding",
				delay: .16,
				children: [
					/* @__PURE__ */ (0, H.jsx)("span", {
						className: "micro",
						children: "LECTURA DEL RESULTADO"
					}),
					/* @__PURE__ */ (0, H.jsx)("strong", { children: e.metric }),
					/* @__PURE__ */ (0, H.jsx)("span", {
						className: "metric-label",
						children: e.label
					}),
					/* @__PURE__ */ (0, H.jsx)("p", { children: e.insight })
				]
			})]
		}) : e.kind === "stats" ? /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsx)("div", {
			className: "metrics",
			children: e.metrics.map(([e, t], n) => /* @__PURE__ */ (0, H.jsxs)(yh, {
				delay: n * .12,
				children: [/* @__PURE__ */ (0, H.jsx)("strong", { children: e }), /* @__PURE__ */ (0, H.jsx)("span", { children: t })]
			}, t))
		}), /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "stats-detail",
			children: [/* @__PURE__ */ (0, H.jsx)("p", {
				className: "lead",
				children: e.lead
			}), /* @__PURE__ */ (0, H.jsx)(jh, { items: e.items })]
		})] }) : e.kind === "code" ? /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsx)(Eh, {
			spec: e,
			index: t
		}), t === 18 && /* @__PURE__ */ (0, H.jsx)(Dh, {})] }) : e.kind === "pipeline" ? /* @__PURE__ */ (0, H.jsx)(Th, {
			spec: e,
			architecture: t === 16
		}) : e.kind === "demo" ? /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [i ? /* @__PURE__ */ (0, H.jsx)("p", {
			role: "alert",
			children: "No se pudieron cargar los datos. Recarga la página."
		}) : /* @__PURE__ */ (0, H.jsx)(Of, {
			records: n,
			world: r
		}), /* @__PURE__ */ (0, H.jsxs)("a", {
			className: "atlas-link",
			href: "https://gsaco.github.io/Meteorito/",
			target: "_blank",
			rel: "noreferrer",
			children: ["Abrir el atlas original ", /* @__PURE__ */ (0, H.jsx)(se, { size: 17 })]
		})] }) : /* @__PURE__ */ (0, H.jsxs)("div", {
			className: `text-content ${e.kind}`,
			children: [/* @__PURE__ */ (0, H.jsx)(yh, { children: /* @__PURE__ */ (0, H.jsx)("p", {
				className: "lead",
				children: e.lead
			}) }), /* @__PURE__ */ (0, H.jsx)(jh, { items: e.items })]
		}),
		e.foot && e.kind !== "demo" && /* @__PURE__ */ (0, H.jsx)("p", {
			className: "footnote",
			children: e.foot
		})
	] });
}
// src/entry.jsx
var Nh;
function Ph() {
	return Nh ??= Promise.all(["meteoritos.json", "paises_110m.geojson"].map((e) => fetch(`assets/${e}`).then((t) => {
		if (!t.ok) throw Error(e);
		return t.json();
	})));
}
function Fh({ index: e, active: t }) {
	let [n, r] = (0, D.useState)([]), [i, a] = (0, D.useState)(null), [o, s] = (0, D.useState)(!1);
	return (0, D.useEffect)(() => {
		if (![0, 17].includes(e) || !t) return;
		let n = !1;
		return Ph().then(([e, t]) => {
			n || (r(e.records), a(t));
		}).catch(() => s(!0)), () => {
			n = !0;
		};
	}, [e, t]), e === 17 && !t ? /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "slide demo",
		children: [/* @__PURE__ */ (0, H.jsx)("h2", { children: "Demostración con datos reales" }), /* @__PURE__ */ (0, H.jsx)("p", { children: "Filtros temporales y de masa sobre las coordenadas del catálogo." })]
	}) : /* @__PURE__ */ (0, H.jsx)(W, {
		reducedMotion: "user",
		children: /* @__PURE__ */ (0, H.jsxs)("div", {
			"data-active": t,
			className: `slide ${pe.slides[e].kind} slide-${e + 1}`,
			children: [
				/* @__PURE__ */ (0, H.jsx)(Ah, { index: e }),
				/* @__PURE__ */ (0, H.jsx)(Mh, {
					s: pe.slides[e],
					index: e,
					data: n,
					world: i,
					error: o,
					active: t
				}, t ? "active" : "idle"),
				/* @__PURE__ */ (0, H.jsxs)("div", {
					className: "slide-number",
					children: [String(e + 1).padStart(2, "0"), /* @__PURE__ */ (0, H.jsxs)("span", { children: ["/ ", pe.slides.length] })]
				})
			]
		})
	});
}
var Ih = [];
function Lh() {
	let e = window.Reveal?.getCurrentSlide();
	for (let { node: t, root: n, index: r } of Ih) {
		let i = t.closest("section") === e;
		n.render(/* @__PURE__ */ (0, H.jsx)(Fh, {
			index: r,
			active: i
		}));
	}
}
function Rh() {
	window.Reveal ? (document.querySelectorAll("[data-react-slide]").forEach((e) => {
		Ih.push({
			node: e,
			root: (0, fe.createRoot)(e),
			index: Number(e.dataset.reactSlide)
		});
	}), Reveal.on("ready", Lh), Reveal.on("slidechanged", Lh), Lh(), matchMedia("(prefers-reduced-motion: reduce)").matches && Reveal.configure({
		transition: "none",
		backgroundTransition: "none"
	}), document.addEventListener("keydown", (e) => {
		(["INPUT", "SELECT"].includes(e.target.tagName) || e.target.tagName === "BUTTON" && [" ", "Enter"].includes(e.key)) && e.stopPropagation();
	}, !0), window.__meteoritosReady = !0) : setTimeout(Rh, 50);
}
Rh();
