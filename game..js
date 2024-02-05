// Copyright 2011 Google Inc. All Rights Reserved.
(function() {
    var l, aa = function(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }, ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    , ca = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }, ea = ca(this), p = function(a, b) {
        if (b)
            a: {
                var c = ea;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c))
                        break a;
                    c = c[e]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && ba(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    };
    p("Symbol", function(a) {
        if (a)
            return a;
        var b = function(f, g) {
            this.g = f;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        };
        b.prototype.toString = function() {
            return this.g
        }
        ;
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
          , d = 0
          , e = function(f) {
            if (this instanceof e)
                throw new TypeError("Symbol is not a constructor");
            return new b(c + (f || "") + "_" + d++,f)
        };
        return e
    });
    p("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = ea[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return fa(aa(this))
                }
            })
        }
        return a
    });
    var fa = function(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }
      , ha = function(a) {
        return a.raw = a
    }
      , r = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b)
            return b.call(a);
        if ("number" == typeof a.length)
            return {
                next: aa(a)
            };
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }
      , ia = function(a) {
        if (!(a instanceof Array)) {
            a = r(a);
            for (var b, c = []; !(b = a.next()).done; )
                c.push(b.value);
            a = c
        }
        return a
    }
      , ka = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
      , ma = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    ka(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    p("Object.assign", function(a) {
        return a || ma
    });
    var oa = "function" == typeof Object.create ? Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    }
    , pa = function() {
        function a() {
            function c() {}
            new c;
            Reflect.construct(c, [], function() {});
            return new c instanceof c
        }
        if ("undefined" != typeof Reflect && Reflect.construct) {
            if (a())
                return Reflect.construct;
            var b = Reflect.construct;
            return function(c, d, e) {
                c = b(c, d);
                e && Reflect.setPrototypeOf(c, e.prototype);
                return c
            }
        }
        return function(c, d, e) {
            void 0 === e && (e = c);
            e = oa(e.prototype || Object.prototype);
            return Function.prototype.apply.call(c, e, d) || e
        }
    }(), qa;
    if ("function" == typeof Object.setPrototypeOf)
        qa = Object.setPrototypeOf;
    else {
        var ra;
        a: {
            var sa = {
                a: !0
            }
              , ta = {};
            try {
                ta.__proto__ = sa;
                ra = ta.a;
                break a
            } catch (a) {}
            ra = !1
        }
        qa = ra ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
            return a
        }
        : null
    }
    var ua = qa
      , u = function(a, b) {
        a.prototype = oa(b.prototype);
        a.prototype.constructor = a;
        if (ua)
            ua(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.Da = b.prototype
    }
      , va = function() {
        this.A = !1;
        this.o = null;
        this.h = void 0;
        this.g = 1;
        this.H = this.j = 0;
        this.l = null
    }
      , wa = function(a) {
        if (a.A)
            throw new TypeError("Generator is already running");
        a.A = !0
    };
    va.prototype.B = function(a) {
        this.h = a
    }
    ;
    var xa = function(a, b) {
        a.l = {
            ee: b,
            Rf: !0
        };
        a.g = a.j || a.H
    };
    va.prototype.return = function(a) {
        this.l = {
            return: a
        };
        this.g = this.H
    }
    ;
    var ya = function(a, b, c) {
        a.g = c;
        return {
            value: b
        }
    }
      , za = function(a) {
        a.g = 0;
        a.j = 0
    }
      , Aa = function(a) {
        a.j = 0;
        var b = a.l.ee;
        a.l = null;
        return b
    }
      , Ba = function(a) {
        this.g = new va;
        this.h = a
    }
      , Fa = function(a, b) {
        wa(a.g);
        var c = a.g.o;
        if (c)
            return Ca(a, "return"in c ? c["return"] : function(d) {
                return {
                    value: d,
                    done: !0
                }
            }
            , b, a.g.return);
        a.g.return(b);
        return Ea(a)
    }
      , Ca = function(a, b, c, d) {
        try {
            var e = b.call(a.g.o, c);
            if (!(e instanceof Object))
                throw new TypeError("Iterator result " + e + " is not an object");
            if (!e.done)
                return a.g.A = !1,
                e;
            var f = e.value
        } catch (g) {
            return a.g.o = null,
            xa(a.g, g),
            Ea(a)
        }
        a.g.o = null;
        d.call(a.g, f);
        return Ea(a)
    }
      , Ea = function(a) {
        for (; a.g.g; )
            try {
                var b = a.h(a.g);
                if (b)
                    return a.g.A = !1,
                    {
                        value: b.value,
                        done: !1
                    }
            } catch (c) {
                a.g.h = void 0,
                xa(a.g, c)
            }
        a.g.A = !1;
        if (a.g.l) {
            b = a.g.l;
            a.g.l = null;
            if (b.Rf)
                throw b.ee;
            return {
                value: b.return,
                done: !0
            }
        }
        return {
            value: void 0,
            done: !0
        }
    }
      , Ga = function(a) {
        this.next = function(b) {
            wa(a.g);
            a.g.o ? b = Ca(a, a.g.o.next, b, a.g.B) : (a.g.B(b),
            b = Ea(a));
            return b
        }
        ;
        this.throw = function(b) {
            wa(a.g);
            a.g.o ? b = Ca(a, a.g.o["throw"], b, a.g.B) : (xa(a.g, b),
            b = Ea(a));
            return b
        }
        ;
        this.return = function(b) {
            return Fa(a, b)
        }
        ;
        this[Symbol.iterator] = function() {
            return this
        }
    }
      , Ha = function(a) {
        function b(d) {
            return a.next(d)
        }
        function c(d) {
            return a.throw(d)
        }
        return new Promise(function(d, e) {
            function f(g) {
                g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
            }
            f(a.next())
        }
        )
    }
      , Ia = function(a) {
        return Ha(new Ga(new Ba(a)))
    }
      , Ja = function() {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
            b[c - a] = arguments[c];
        return b
    };
    p("Reflect", function(a) {
        return a ? a : {}
    });
    p("Reflect.construct", function() {
        return pa
    });
    p("Reflect.setPrototypeOf", function(a) {
        return a ? a : ua ? function(b, c) {
            try {
                return ua(b, c),
                !0
            } catch (d) {
                return !1
            }
        }
        : null
    });
    p("Promise", function(a) {
        function b() {
            this.g = null
        }
        function c(g) {
            return g instanceof e ? g : new e(function(h) {
                h(g)
            }
            )
        }
        if (a)
            return a;
        b.prototype.h = function(g) {
            if (null == this.g) {
                this.g = [];
                var h = this;
                this.j(function() {
                    h.l()
                })
            }
            this.g.push(g)
        }
        ;
        var d = ea.setTimeout;
        b.prototype.j = function(g) {
            d(g, 0)
        }
        ;
        b.prototype.l = function() {
            for (; this.g && this.g.length; ) {
                var g = this.g;
                this.g = [];
                for (var h = 0; h < g.length; ++h) {
                    var k = g[h];
                    g[h] = null;
                    try {
                        k()
                    } catch (m) {
                        this.o(m)
                    }
                }
            }
            this.g = null
        }
        ;
        b.prototype.o = function(g) {
            this.j(function() {
                throw g;
            })
        }
        ;
        var e = function(g) {
            this.g = 0;
            this.j = void 0;
            this.h = [];
            this.B = !1;
            var h = this.o();
            try {
                g(h.resolve, h.reject)
            } catch (k) {
                h.reject(k)
            }
        };
        e.prototype.o = function() {
            function g(m) {
                return function(n) {
                    k || (k = !0,
                    m.call(h, n))
                }
            }
            var h = this
              , k = !1;
            return {
                resolve: g(this.G),
                reject: g(this.l)
            }
        }
        ;
        e.prototype.G = function(g) {
            if (g === this)
                this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (g instanceof e)
                this.M(g);
            else {
                a: switch (typeof g) {
                case "object":
                    var h = null != g;
                    break a;
                case "function":
                    h = !0;
                    break a;
                default:
                    h = !1
                }
                h ? this.F(g) : this.A(g)
            }
        }
        ;
        e.prototype.F = function(g) {
            var h = void 0;
            try {
                h = g.then
            } catch (k) {
                this.l(k);
                return
            }
            "function" == typeof h ? this.O(h, g) : this.A(g)
        }
        ;
        e.prototype.l = function(g) {
            this.H(2, g)
        }
        ;
        e.prototype.A = function(g) {
            this.H(1, g)
        }
        ;
        e.prototype.H = function(g, h) {
            if (0 != this.g)
                throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.g);
            this.g = g;
            this.j = h;
            2 === this.g && this.I();
            this.K()
        }
        ;
        e.prototype.I = function() {
            var g = this;
            d(function() {
                if (g.D()) {
                    var h = ea.console;
                    "undefined" !== typeof h && h.error(g.j)
                }
            }, 1)
        }
        ;
        e.prototype.D = function() {
            if (this.B)
                return !1;
            var g = ea.CustomEvent
              , h = ea.Event
              , k = ea.dispatchEvent;
            if ("undefined" === typeof k)
                return !0;
            "function" === typeof g ? g = new g("unhandledrejection",{
                cancelable: !0
            }) : "function" === typeof h ? g = new h("unhandledrejection",{
                cancelable: !0
            }) : (g = ea.document.createEvent("CustomEvent"),
            g.initCustomEvent("unhandledrejection", !1, !0, g));
            g.promise = this;
            g.reason = this.j;
            return k(g)
        }
        ;
        e.prototype.K = function() {
            if (null != this.h) {
                for (var g = 0; g < this.h.length; ++g)
                    f.h(this.h[g]);
                this.h = null
            }
        }
        ;
        var f = new b;
        e.prototype.M = function(g) {
            var h = this.o();
            g.fc(h.resolve, h.reject)
        }
        ;
        e.prototype.O = function(g, h) {
            var k = this.o();
            try {
                g.call(h, k.resolve, k.reject)
            } catch (m) {
                k.reject(m)
            }
        }
        ;
        e.prototype.then = function(g, h) {
            function k(t, v) {
                return "function" == typeof t ? function(x) {
                    try {
                        m(t(x))
                    } catch (H) {
                        n(H)
                    }
                }
                : v
            }
            var m, n, q = new e(function(t, v) {
                m = t;
                n = v
            }
            );
            this.fc(k(g, m), k(h, n));
            return q
        }
        ;
        e.prototype.catch = function(g) {
            return this.then(void 0, g)
        }
        ;
        e.prototype.fc = function(g, h) {
            function k() {
                switch (m.g) {
                case 1:
                    g(m.j);
                    break;
                case 2:
                    h(m.j);
                    break;
                default:
                    throw Error("Unexpected state: " + m.g);
                }
            }
            var m = this;
            null == this.h ? f.h(k) : this.h.push(k);
            this.B = !0
        }
        ;
        e.resolve = c;
        e.reject = function(g) {
            return new e(function(h, k) {
                k(g)
            }
            )
        }
        ;
        e.race = function(g) {
            return new e(function(h, k) {
                for (var m = r(g), n = m.next(); !n.done; n = m.next())
                    c(n.value).fc(h, k)
            }
            )
        }
        ;
        e.all = function(g) {
            var h = r(g)
              , k = h.next();
            return k.done ? c([]) : new e(function(m, n) {
                function q(x) {
                    return function(H) {
                        t[x] = H;
                        v--;
                        0 == v && m(t)
                    }
                }
                var t = []
                  , v = 0;
                do
                    t.push(void 0),
                    v++,
                    c(k.value).fc(q(t.length - 1), n),
                    k = h.next();
                while (!k.done)
            }
            )
        }
        ;
        return e
    });
    p("Object.setPrototypeOf", function(a) {
        return a || ua
    });
    p("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            a: {
                var d = this;
                d instanceof String && (d = String(d));
                for (var e = d.length, f = 0; f < e; f++) {
                    var g = d[f];
                    if (b.call(c, g, f, d)) {
                        b = g;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    });
    p("WeakMap", function(a) {
        function b() {}
        function c(k) {
            var m = typeof k;
            return "object" === m && null !== k || "function" === m
        }
        function d(k) {
            if (!ka(k, f)) {
                var m = new b;
                ba(k, f, {
                    value: m
                })
            }
        }
        function e(k) {
            var m = Object[k];
            m && (Object[k] = function(n) {
                if (n instanceof b)
                    return n;
                Object.isExtensible(n) && d(n);
                return m(n)
            }
            )
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var k = Object.seal({})
                  , m = Object.seal({})
                  , n = new a([[k, 2], [m, 3]]);
                if (2 != n.get(k) || 3 != n.get(m))
                    return !1;
                n.delete(k);
                n.set(m, 4);
                return !n.has(k) && 4 == n.get(m)
            } catch (q) {
                return !1
            }
        }())
            return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var g = 0
          , h = function(k) {
            this.g = (g += Math.random() + 1).toString();
            if (k) {
                k = r(k);
                for (var m; !(m = k.next()).done; )
                    m = m.value,
                    this.set(m[0], m[1])
            }
        };
        h.prototype.set = function(k, m) {
            if (!c(k))
                throw Error("Invalid WeakMap key");
            d(k);
            if (!ka(k, f))
                throw Error("WeakMap key fail: " + k);
            k[f][this.g] = m;
            return this
        }
        ;
        h.prototype.get = function(k) {
            return c(k) && ka(k, f) ? k[f][this.g] : void 0
        }
        ;
        h.prototype.has = function(k) {
            return c(k) && ka(k, f) && ka(k[f], this.g)
        }
        ;
        h.prototype.delete = function(k) {
            return c(k) && ka(k, f) && ka(k[f], this.g) ? delete k[f][this.g] : !1
        }
        ;
        return h
    });
    p("Map", function(a) {
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var h = Object.seal({
                    x: 4
                })
                  , k = new a(r([[h, "s"]]));
                if ("s" != k.get(h) || 1 != k.size || k.get({
                    x: 4
                }) || k.set({
                    x: 4
                }, "t") != k || 2 != k.size)
                    return !1;
                var m = k.entries()
                  , n = m.next();
                if (n.done || n.value[0] != h || "s" != n.value[1])
                    return !1;
                n = m.next();
                return n.done || 4 != n.value[0].x || "t" != n.value[1] || !m.next().done ? !1 : !0
            } catch (q) {
                return !1
            }
        }())
            return a;
        var b = new WeakMap
          , c = function(h) {
            this[0] = {};
            this[1] = f();
            this.size = 0;
            if (h) {
                h = r(h);
                for (var k; !(k = h.next()).done; )
                    k = k.value,
                    this.set(k[0], k[1])
            }
        };
        c.prototype.set = function(h, k) {
            h = 0 === h ? 0 : h;
            var m = d(this, h);
            m.list || (m.list = this[0][m.id] = []);
            m.na ? m.na.value = k : (m.na = {
                next: this[1],
                Ua: this[1].Ua,
                head: this[1],
                key: h,
                value: k
            },
            m.list.push(m.na),
            this[1].Ua.next = m.na,
            this[1].Ua = m.na,
            this.size++);
            return this
        }
        ;
        c.prototype.delete = function(h) {
            h = d(this, h);
            return h.na && h.list ? (h.list.splice(h.index, 1),
            h.list.length || delete this[0][h.id],
            h.na.Ua.next = h.na.next,
            h.na.next.Ua = h.na.Ua,
            h.na.head = null,
            this.size--,
            !0) : !1
        }
        ;
        c.prototype.clear = function() {
            this[0] = {};
            this[1] = this[1].Ua = f();
            this.size = 0
        }
        ;
        c.prototype.has = function(h) {
            return !!d(this, h).na
        }
        ;
        c.prototype.get = function(h) {
            return (h = d(this, h).na) && h.value
        }
        ;
        c.prototype.entries = function() {
            return e(this, function(h) {
                return [h.key, h.value]
            })
        }
        ;
        c.prototype.keys = function() {
            return e(this, function(h) {
                return h.key
            })
        }
        ;
        c.prototype.values = function() {
            return e(this, function(h) {
                return h.value
            })
        }
        ;
        c.prototype.forEach = function(h, k) {
            for (var m = this.entries(), n; !(n = m.next()).done; )
                n = n.value,
                h.call(k, n[1], n[0], this)
        }
        ;
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(h, k) {
            var m = k && typeof k;
            "object" == m || "function" == m ? b.has(k) ? m = b.get(k) : (m = "" + ++g,
            b.set(k, m)) : m = "p_" + k;
            var n = h[0][m];
            if (n && ka(h[0], m))
                for (h = 0; h < n.length; h++) {
                    var q = n[h];
                    if (k !== k && q.key !== q.key || k === q.key)
                        return {
                            id: m,
                            list: n,
                            index: h,
                            na: q
                        }
                }
            return {
                id: m,
                list: n,
                index: -1,
                na: void 0
            }
        }
          , e = function(h, k) {
            var m = h[1];
            return fa(function() {
                if (m) {
                    for (; m.head != h[1]; )
                        m = m.Ua;
                    for (; m.next != m.head; )
                        return m = m.next,
                        {
                            done: !1,
                            value: k(m)
                        };
                    m = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
          , f = function() {
            var h = {};
            return h.Ua = h.next = h.head = h
        }
          , g = 0;
        return c
    });
    p("Math.trunc", function(a) {
        return a ? a : function(b) {
            b = Number(b);
            if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b)
                return b;
            var c = Math.floor(Math.abs(b));
            return 0 > b ? -c : c
        }
    });
    p("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                ka(b, d) && c.push(b[d]);
            return c
        }
    });
    p("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    p("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b))
                    return !0
            }
            return !1
        }
    });
    var Ka = function(a, b, c) {
        if (null == a)
            throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp)
            throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    };
    p("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== Ka(this, b, "includes").indexOf(b, c || 0)
        }
    });
    p("Number.isFinite", function(a) {
        return a ? a : function(b) {
            return "number" !== typeof b ? !1 : !isNaN(b) && Infinity !== b && -Infinity !== b
        }
    });
    p("Number.MAX_SAFE_INTEGER", function() {
        return 9007199254740991
    });
    p("Number.isInteger", function(a) {
        return a ? a : function(b) {
            return Number.isFinite(b) ? b === Math.floor(b) : !1
        }
    });
    p("Number.isSafeInteger", function(a) {
        return a ? a : function(b) {
            return Number.isInteger(b) && Math.abs(b) <= Number.MAX_SAFE_INTEGER
        }
    });
    p("Number.isNaN", function(a) {
        return a ? a : function(b) {
            return "number" === typeof b && isNaN(b)
        }
    });
    var La = function(a, b) {
        a instanceof String && (a += "");
        var c = 0
          , d = !1
          , e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
        e[Symbol.iterator] = function() {
            return e
        }
        ;
        return e
    };
    p("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return La(this, function(b, c) {
                return [b, c]
            })
        }
    });
    p("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return La(this, function(b) {
                return b
            })
        }
    });
    p("Array.prototype.values", function(a) {
        return a ? a : function() {
            return La(this, function(b, c) {
                return c
            })
        }
    });
    p("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(h) {
                return h
            }
            ;
            var e = []
              , f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var g = 0; !(f = b.next()).done; )
                    e.push(c.call(d, f.value, g++))
            } else
                for (f = b.length,
                g = 0; g < f; g++)
                    e.push(c.call(d, b[g], g));
            return e
        }
    });
    p("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                ka(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    p("String.prototype.startsWith", function(a) {
        return a ? a : function(b, c) {
            var d = Ka(this, b, "startsWith");
            b += "";
            var e = d.length
              , f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var g = 0; g < f && c < e; )
                if (d[c++] != b[g++])
                    return !1;
            return g >= f
        }
    });
    p("String.prototype.repeat", function(a) {
        return a ? a : function(b) {
            var c = Ka(this, null, "repeat");
            if (0 > b || 1342177279 < b)
                throw new RangeError("Invalid count value");
            b |= 0;
            for (var d = ""; b; )
                if (b & 1 && (d += c),
                b >>>= 1)
                    c += c;
            return d
        }
    });
    p("globalThis", function(a) {
        return a || ea
    });
    p("String.prototype.padStart", function(a) {
        return a ? a : function(b, c) {
            var d = Ka(this, null, "padStart");
            b -= d.length;
            c = void 0 !== c ? String(c) : " ";
            return (0 < b && c ? c.repeat(Math.ceil(b / c.length)).substring(0, b) : "") + d
        }
    });
    p("Math.imul", function(a) {
        return a ? a : function(b, c) {
            b = Number(b);
            c = Number(c);
            var d = b & 65535
              , e = c & 65535;
            return d * e + ((b >>> 16 & 65535) * e + d * (c >>> 16 & 65535) << 16 >>> 0) | 0
        }
    });
    p("Object.fromEntries", function(a) {
        return a ? a : function(b) {
            var c = {};
            if (!(Symbol.iterator in b))
                throw new TypeError("" + b + " is not iterable");
            b = b[Symbol.iterator].call(b);
            for (var d = b.next(); !d.done; d = b.next()) {
                d = d.value;
                if (Object(d) !== d)
                    throw new TypeError("iterable for fromEntries should yield objects");
                c[d[0]] = d[1]
            }
            return c
        }
    });
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var Ma = Ma || {}
      , w = this || self
      , y = function(a, b, c) {
        a = a.split(".");
        c = c || w;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }
      , Oa = function(a, b) {
        var c = Na("CLOSURE_FLAGS");
        a = c && c[a];
        return null != a ? a : b
    }
      , Na = function(a, b) {
        a = a.split(".");
        b = b || w;
        for (var c = 0; c < a.length; c++)
            if (b = b[a[c]],
            null == b)
                return null;
        return b
    }
      , Pa = function(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }
      , Qa = function(a) {
        var b = Pa(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
      , Ra = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
      , Ua = function(a) {
        return Object.prototype.hasOwnProperty.call(a, Sa) && a[Sa] || (a[Sa] = ++Ta)
    }
      , Wa = function(a) {
        null !== a && "removeAttribute"in a && a.removeAttribute(Sa);
        try {
            delete a[Sa]
        } catch (b) {}
    }
      , Sa = "closure_uid_" + (1E9 * Math.random() >>> 0)
      , Ta = 0
      , Ya = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
      , Za = function(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
      , ab = function(a, b, c) {
        ab = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ya : Za;
        return ab.apply(null, arguments)
    }
      , bb = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }
      , cb = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Da = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.li = function(d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
                g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    }
      , db = function(a) {
        return a
    };
    function eb(a, b) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, eb);
        else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }
    cb(eb, Error);
    eb.prototype.name = "CustomError";
    var fb;
    var gb, ib = "function" === typeof String.prototype.Uf, jb = "undefined" !== typeof TextEncoder;
    function kb(a) {
        var b = !1;
        b = void 0 === b ? !1 : b;
        if (jb) {
            if (b && (ib ? !a.Uf() : /(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(a)))
                throw Error("Found an unpaired surrogate");
            a = (gb || (gb = new TextEncoder)).encode(a)
        } else {
            for (var c = 0, d = new Uint8Array(3 * a.length), e = 0; e < a.length; e++) {
                var f = a.charCodeAt(e);
                if (128 > f)
                    d[c++] = f;
                else {
                    if (2048 > f)
                        d[c++] = f >> 6 | 192;
                    else {
                        if (55296 <= f && 57343 >= f) {
                            if (56319 >= f && e < a.length) {
                                var g = a.charCodeAt(++e);
                                if (56320 <= g && 57343 >= g) {
                                    f = 1024 * (f - 55296) + g - 56320 + 65536;
                                    d[c++] = f >> 18 | 240;
                                    d[c++] = f >> 12 & 63 | 128;
                                    d[c++] = f >> 6 & 63 | 128;
                                    d[c++] = f & 63 | 128;
                                    continue
                                } else
                                    e--
                            }
                            if (b)
                                throw Error("Found an unpaired surrogate");
                            f = 65533
                        }
                        d[c++] = f >> 12 | 224;
                        d[c++] = f >> 6 & 63 | 128
                    }
                    d[c++] = f & 63 | 128
                }
            }
            a = c === d.length ? d : d.subarray(0, c)
        }
        return a
    }
    ;function lb(a) {
        w.setTimeout(function() {
            throw a;
        }, 0)
    }
    ;var nb = function(a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c
    }
      , ob = function(a) {
        return /^[\s\xa0]*$/.test(a)
    }
      , pb = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
      , qb = function(a, b) {
        return -1 != a.indexOf(b)
    }
      , rb = function(a, b) {
        return qb(a.toLowerCase(), b.toLowerCase())
    }
      , tb = function(a, b) {
        var c = 0;
        a = pb(String(a)).split(".");
        b = pb(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || ""
              , g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length)
                    break;
                c = sb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || sb(0 == f[2].length, 0 == g[2].length) || sb(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    }
      , sb = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var ub = Oa(610401301, !1)
      , vb = Oa(572417392, !0);
    function wb() {
        var a = w.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    var xb, yb = w.navigator;
    xb = yb ? yb.userAgentData || null : null;
    function zb(a) {
        return ub ? xb ? xb.brands.some(function(b) {
            return (b = b.brand) && qb(b, a)
        }) : !1 : !1
    }
    function z(a) {
        return qb(wb(), a)
    }
    ;function Ab() {
        return ub ? !!xb && 0 < xb.brands.length : !1
    }
    function Bb() {
        return Ab() ? !1 : z("Opera")
    }
    function Cb() {
        return Ab() ? !1 : z("Trident") || z("MSIE")
    }
    function Db() {
        return z("Firefox") || z("FxiOS")
    }
    function Gb() {
        return z("Safari") && !(Hb() || (Ab() ? 0 : z("Coast")) || Bb() || (Ab() ? 0 : z("Edge")) || (Ab() ? zb("Microsoft Edge") : z("Edg/")) || (Ab() ? zb("Opera") : z("OPR")) || Db() || z("Silk") || z("Android"))
    }
    function Hb() {
        return Ab() ? zb("Chromium") : (z("Chrome") || z("CriOS")) && !(Ab() ? 0 : z("Edge")) || z("Silk")
    }
    ;function Ib() {
        return ub ? !!xb && !!xb.platform : !1
    }
    function Jb() {
        return Ib() ? "Android" === xb.platform : z("Android")
    }
    function Kb() {
        return z("iPhone") && !z("iPod") && !z("iPad")
    }
    function Lb() {
        return Ib() ? "macOS" === xb.platform : z("Macintosh")
    }
    ;var Mb = function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , Nb = function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            e in d && b.call(void 0, d[e], e, a)
    };
    function Ob(a, b) {
        for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; --d)
            d in c && b.call(void 0, c[d], d, a)
    }
    var Pb = function(a, b) {
        for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++)
            if (g in f) {
                var h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h)
            }
        return d
    }
      , Qb = function(a, b) {
        for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++)
            f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d
    }
      , Rb = function(a, b, c) {
        var d = c;
        Nb(a, function(e, f) {
            d = b.call(void 0, d, e, f, a)
        });
        return d
    }
      , Sb = function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a))
                return !0;
        return !1
    };
    function Tb(a, b) {
        b = Ub(a, b);
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    }
    function Ub(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a))
                return e;
        return -1
    }
    function Vb(a, b) {
        for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
            if (d in c && b.call(void 0, c[d], d, a))
                return d;
        return -1
    }
    function Wb(a, b) {
        return 0 <= Mb(a, b)
    }
    function Xb(a, b) {
        b = Mb(a, b);
        var c;
        (c = 0 <= b) && Yb(a, b);
        return c
    }
    function Yb(a, b) {
        return 1 == Array.prototype.splice.call(a, b, 1).length
    }
    function Zb(a, b) {
        var c = 0;
        Ob(a, function(d, e) {
            b.call(void 0, d, e, a) && Yb(a, e) && c++
        })
    }
    function $b(a) {
        return Array.prototype.concat.apply([], arguments)
    }
    function ac(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
    function bc(a) {
        for (var b = 0, c = 0, d = {}; c < a.length; ) {
            var e = a[c++]
              , f = Ra(e) ? "o" + Ua(e) : (typeof e).charAt(0) + e;
            Object.prototype.hasOwnProperty.call(d, f) || (d[f] = !0,
            a[b++] = e)
        }
        a.length = b
    }
    function cc(a, b) {
        a.sort(b || dc)
    }
    function dc(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    }
    function ec(a) {
        for (var b = [], c = 0; c < a; c++)
            b[c] = "";
        return b
    }
    ;var fc = function(a) {
        fc[" "](a);
        return a
    };
    fc[" "] = function() {}
    ;
    var gc = function(a, b) {
        try {
            return fc(a[b]),
            !0
        } catch (c) {}
        return !1
    }
      , ic = function(a) {
        var b = hc;
        return Object.prototype.hasOwnProperty.call(b, 8) ? b[8] : b[8] = a(8)
    };
    var jc = Bb(), kc = Cb(), lc = z("Edge"), mc = z("Gecko") && !(rb(wb(), "WebKit") && !z("Edge")) && !(z("Trident") || z("MSIE")) && !z("Edge"), nc = rb(wb(), "WebKit") && !z("Edge"), oc = Lb(), sc = Jb(), tc = Kb(), uc = z("iPad"), vc = z("iPod"), wc = Kb() || z("iPad") || z("iPod"), xc = function() {
        var a = w.document;
        return a ? a.documentMode : void 0
    }, yc;
    a: {
        var zc = ""
          , Ac = function() {
            var a = wb();
            if (mc)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (lc)
                return /Edge\/([\d\.]+)/.exec(a);
            if (kc)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (nc)
                return /WebKit\/(\S+)/.exec(a);
            if (jc)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Ac && (zc = Ac ? Ac[1] : "");
        if (kc) {
            var Bc = xc();
            if (null != Bc && Bc > parseFloat(zc)) {
                yc = String(Bc);
                break a
            }
        }
        yc = zc
    }
    var Cc = yc, hc = {}, Dc = function() {
        return ic(function() {
            return 0 <= tb(Cc, 8)
        })
    }, Ec;
    if (w.document && kc) {
        var Fc = xc();
        Ec = Fc ? Fc : parseInt(Cc, 10) || void 0
    } else
        Ec = void 0;
    var Ic = Ec;
    var Jc = Db()
      , Kc = z("Android") && !(Hb() || Db() || Bb() || z("Silk"))
      , Lc = Hb();
    Gb();
    var Mc = {}
      , Nc = null
      , Pc = function(a, b) {
        void 0 === b && (b = 0);
        Oc();
        b = Mc[b];
        for (var c = Array(Math.floor(a.length / 3)), d = b[64] || "", e = 0, f = 0; e < a.length - 2; e += 3) {
            var g = a[e]
              , h = a[e + 1]
              , k = a[e + 2]
              , m = b[g >> 2];
            g = b[(g & 3) << 4 | h >> 4];
            h = b[(h & 15) << 2 | k >> 6];
            k = b[k & 63];
            c[f++] = "" + m + g + h + k
        }
        m = 0;
        k = d;
        switch (a.length - e) {
        case 2:
            m = a[e + 1],
            k = b[(m & 15) << 2] || d;
        case 1:
            a = a[e],
            c[f] = "" + b[a >> 2] + b[(a & 3) << 4 | m >> 4] + k + d
        }
        return c.join("")
    }
      , Rc = function(a) {
        var b = [];
        Qc(a, function(c) {
            b.push(c)
        });
        return b
    }
      , Qc = function(a, b) {
        function c(k) {
            for (; d < a.length; ) {
                var m = a.charAt(d++)
                  , n = Nc[m];
                if (null != n)
                    return n;
                if (!ob(m))
                    throw Error("Unknown base64 encoding at char: " + m);
            }
            return k
        }
        Oc();
        for (var d = 0; ; ) {
            var e = c(-1)
              , f = c(0)
              , g = c(64)
              , h = c(64);
            if (64 === h && -1 === e)
                break;
            b(e << 2 | f >> 4);
            64 != g && (b(f << 4 & 240 | g >> 2),
            64 != h && b(g << 6 & 192 | h))
        }
    }
      , Oc = function() {
        if (!Nc) {
            Nc = {};
            for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
                var d = a.concat(b[c].split(""));
                Mc[c] = d;
                for (var e = 0; e < d.length; e++) {
                    var f = d[e];
                    void 0 === Nc[f] && (Nc[f] = e)
                }
            }
        }
    };
    var Sc = "undefined" !== typeof Uint8Array
      , Tc = !kc && "function" === typeof btoa;
    function Uc() {
        return "function" === typeof BigInt
    }
    var Vc = !vb
      , Wc = !vb;
    var Xc = 0, Yc = 0, Zc;
    function $c(a) {
        var b = 0 > a;
        a = Math.abs(a);
        var c = a >>> 0;
        a = Math.floor((a - c) / 4294967296);
        b && (c = r(ad(c, a)),
        b = c.next().value,
        a = c.next().value,
        c = b);
        Xc = c >>> 0;
        Yc = a >>> 0
    }
    function bd(a, b) {
        b >>>= 0;
        a >>>= 0;
        if (2097151 >= b)
            var c = "" + (4294967296 * b + a);
        else
            Uc() ? c = "" + (BigInt(b) << BigInt(32) | BigInt(a)) : (c = (a >>> 24 | b << 8) & 16777215,
            b = b >> 16 & 65535,
            a = (a & 16777215) + 6777216 * c + 6710656 * b,
            c += 8147497 * b,
            b *= 2,
            1E7 <= a && (c += Math.floor(a / 1E7),
            a %= 1E7),
            1E7 <= c && (b += Math.floor(c / 1E7),
            c %= 1E7),
            c = b + cd(c) + cd(a));
        return c
    }
    function cd(a) {
        a = String(a);
        return "0000000".slice(a.length) + a
    }
    function dd() {
        var a = Xc
          , b = Yc;
        b & 2147483648 ? Uc() ? a = "" + (BigInt(b | 0) << BigInt(32) | BigInt(a >>> 0)) : (b = r(ad(a, b)),
        a = b.next().value,
        b = b.next().value,
        a = "-" + bd(a, b)) : a = bd(a, b);
        return a
    }
    function ed(a) {
        if (16 > a.length)
            $c(Number(a));
        else if (Uc())
            a = BigInt(a),
            Xc = Number(a & BigInt(4294967295)) >>> 0,
            Yc = Number(a >> BigInt(32) & BigInt(4294967295));
        else {
            var b = +("-" === a[0]);
            Yc = Xc = 0;
            for (var c = a.length, d = 0 + b, e = (c - b) % 6 + b; e <= c; d = e,
            e += 6)
                d = Number(a.slice(d, e)),
                Yc *= 1E6,
                Xc = 1E6 * Xc + d,
                4294967296 <= Xc && (Yc += Math.trunc(Xc / 4294967296),
                Yc >>>= 0,
                Xc >>>= 0);
            b && (b = r(ad(Xc, Yc)),
            a = b.next().value,
            b = b.next().value,
            Xc = a,
            Yc = b)
        }
    }
    function ad(a, b) {
        b = ~b;
        a ? a = ~a + 1 : b += 1;
        return [a, b]
    }
    ;var fd = function(a, b) {
        this.h = a >>> 0;
        this.g = b >>> 0
    }, hd = function(a) {
        if (!a)
            return gd || (gd = new fd(0,0));
        if (!/^\d+$/.test(a))
            return null;
        ed(a);
        return new fd(Xc,Yc)
    }, gd, id = function(a, b) {
        this.h = a >>> 0;
        this.g = b >>> 0
    }, kd = function(a) {
        if (!a)
            return jd || (jd = new id(0,0));
        if (!/^-?\d+$/.test(a))
            return null;
        ed(a);
        return new id(Xc,Yc)
    }, jd;
    var ld = function() {
        this.g = []
    };
    ld.prototype.length = function() {
        return this.g.length
    }
    ;
    ld.prototype.end = function() {
        var a = this.g;
        this.g = [];
        return a
    }
    ;
    var md = function(a, b, c) {
        for (; 0 < c || 127 < b; )
            a.g.push(b & 127 | 128),
            b = (b >>> 7 | c << 25) >>> 0,
            c >>>= 7;
        a.g.push(b)
    }
      , nd = function(a, b) {
        for (; 127 < b; )
            a.g.push(b & 127 | 128),
            b >>>= 7;
        a.g.push(b)
    }
      , pd = function(a, b) {
        if (0 <= b)
            nd(a, b);
        else {
            for (var c = 0; 9 > c; c++)
                a.g.push(b & 127 | 128),
                b >>= 7;
            a.g.push(1)
        }
    }
      , qd = function(a, b) {
        a.g.push(b >>> 0 & 255);
        a.g.push(b >>> 8 & 255);
        a.g.push(b >>> 16 & 255);
        a.g.push(b >>> 24 & 255)
    };
    var rd = function() {
        this.j = [];
        this.h = 0;
        this.g = new ld
    }
      , sd = function(a, b) {
        0 !== b.length && (a.j.push(b),
        a.h += b.length)
    }
      , ud = function(a, b) {
        td(a, b, 2);
        b = a.g.end();
        sd(a, b);
        b.push(a.h);
        return b
    }
      , vd = function(a, b) {
        var c = b.pop();
        for (c = a.h + a.g.length() - c; 127 < c; )
            b.push(c & 127 | 128),
            c >>>= 7,
            a.h++;
        b.push(c);
        a.h++
    }
      , wd = function(a) {
        sd(a, a.g.end());
        for (var b = new Uint8Array(a.h), c = a.j, d = c.length, e = 0, f = 0; f < d; f++) {
            var g = c[f];
            b.set(g, e);
            e += g.length
        }
        a.j = [b];
        return b
    }
      , td = function(a, b, c) {
        nd(a.g, 8 * b + c)
    }
      , xd = function(a, b, c) {
        td(a, b, 2);
        nd(a.g, c.length);
        sd(a, a.g.end());
        sd(a, c)
    }
      , yd = function(a, b, c, d) {
        null != c && (b = ud(a, b),
        d(c, a),
        vd(a, b))
    }
      , Ad = function(a, b, c) {
        var d = zd;
        if (null != c)
            for (var e = 0; e < c.length; e++) {
                var f = ud(a, b);
                d(c[e], a);
                vd(a, f)
            }
    };
    var Bd = function(a, b) {
        this.g = a;
        this.Ge = b
    };
    function Cd(a) {
        return Array.prototype.slice.call(a)
    }
    ;var Dd;
    Dd = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol() : void 0;
    var Ed = Dd ? function(a, b) {
        a[Dd] |= b
    }
    : function(a, b) {
        void 0 !== a.za ? a.za |= b : Object.defineProperties(a, {
            za: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        })
    }
    ;
    function Fd(a) {
        var b = Gd(a);
        1 !== (b & 1) && (Object.isFrozen(a) && (a = Cd(a)),
        Hd(a, b | 1))
    }
    var Id = Dd ? function(a, b) {
        a[Dd] &= ~b
    }
    : function(a, b) {
        void 0 !== a.za && (a.za &= ~b)
    }
    ;
    function Jd(a, b, c) {
        return c ? a | b : a & ~b
    }
    var Gd = Dd ? function(a) {
        return a[Dd] | 0
    }
    : function(a) {
        return a.za | 0
    }
      , Kd = Dd ? function(a) {
        return a[Dd]
    }
    : function(a) {
        return a.za
    }
      , Hd = Dd ? function(a, b) {
        a[Dd] = b;
        return a
    }
    : function(a, b) {
        void 0 !== a.za ? a.za = b : Object.defineProperties(a, {
            za: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        });
        return a
    }
    ;
    function Ld() {
        var a = [];
        Ed(a, 1);
        return a
    }
    function Md(a, b) {
        Hd(b, (a | 0) & -14591)
    }
    function Nd(a, b) {
        Hd(b, (a | 34) & -14557)
    }
    function Od(a) {
        a = a >> 14 & 1023;
        return 0 === a ? 536870912 : a
    }
    function Td(a) {
        return +!!(a & 512) - 1
    }
    ;var Ud = {}
      , Vd = {};
    function Wd(a) {
        return !(!a || "object" !== typeof a || a.g !== Vd)
    }
    function Xd(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    var Yd, Zd = !vb;
    function $d(a, b, c) {
        if (!Array.isArray(a) || a.length)
            return !1;
        var d = Gd(a);
        if (d & 1)
            return !0;
        if (!(b && (Array.isArray(b) ? b.includes(c) : b.has(c))))
            return !1;
        Hd(a, d | 1);
        return !0
    }
    var ae, be = [];
    Hd(be, 55);
    ae = Object.freeze(be);
    function ce(a) {
        if (a & 2)
            throw Error();
    }
    Object.freeze(new function() {}
    );
    Object.freeze(new function() {}
    );
    function de(a) {
        a = Error(a);
        a.__closure__error__context__984382 || (a.__closure__error__context__984382 = {});
        a.__closure__error__context__984382.severity = "warning";
        return a
    }
    ;function ee(a) {
        if (null == a || "number" === typeof a)
            return a;
        if ("NaN" === a || "Infinity" === a || "-Infinity" === a)
            return Number(a)
    }
    function fe(a) {
        if ("boolean" !== typeof a)
            throw Error("Expected boolean but got " + Pa(a) + ": " + a);
        return a
    }
    function ge(a) {
        if (null == a || "boolean" === typeof a)
            return a;
        if ("number" === typeof a)
            return !!a
    }
    var he = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
    function ie(a) {
        var b = typeof a;
        return "number" === b ? Number.isFinite(a) : "string" !== b ? !1 : he.test(a)
    }
    function je(a) {
        if (!Number.isFinite(a))
            throw de("enum");
        return a | 0
    }
    function ke(a) {
        return null == a ? a : je(a)
    }
    function le(a) {
        return null == a ? a : Number.isFinite(a) ? a | 0 : void 0
    }
    function me(a) {
        if ("number" !== typeof a)
            throw de("int32");
        if (!Number.isFinite(a))
            throw de("int32");
        return a | 0
    }
    function ne(a) {
        return null == a ? a : me(a)
    }
    function oe(a) {
        if (null == a)
            return a;
        if ("string" === typeof a) {
            if (!a)
                return;
            a = +a
        }
        if ("number" === typeof a)
            return Number.isFinite(a) ? a | 0 : void 0
    }
    function pe(a) {
        if (null == a)
            return a;
        if ("string" === typeof a) {
            if (!a)
                return;
            a = +a
        }
        if ("number" === typeof a)
            return Number.isFinite(a) ? a >>> 0 : void 0
    }
    function qe(a) {
        if (null != a) {
            var b = !!b;
            if (!ie(a))
                throw de("int64");
            "string" === typeof a ? a = re(a) : b ? (a = Math.trunc(a),
            Number.isSafeInteger(a) ? a = String(a) : (b = String(a),
            se(b) ? a = b : ($c(a),
            a = dd()))) : a = te(a)
        }
        return a
    }
    function ue(a) {
        return "-" === a[0] ? !1 : 20 > a.length ? !0 : 20 === a.length && 184467 > Number(a.substring(0, 6))
    }
    function se(a) {
        return "-" === a[0] ? 20 > a.length ? !0 : 20 === a.length && -922337 < Number(a.substring(0, 7)) : 19 > a.length ? !0 : 19 === a.length && 922337 > Number(a.substring(0, 6))
    }
    function ve(a) {
        if (0 > a) {
            $c(a);
            var b = bd(Xc, Yc);
            a = Number(b);
            return Number.isSafeInteger(a) ? a : b
        }
        if (ue(String(a)))
            return a;
        $c(a);
        return 4294967296 * Yc + (Xc >>> 0)
    }
    function te(a) {
        a = Math.trunc(a);
        if (!Number.isSafeInteger(a)) {
            $c(a);
            var b = Xc
              , c = Yc;
            if (a = c & 2147483648)
                b = ~b + 1 >>> 0,
                c = ~c >>> 0,
                0 == b && (c = c + 1 >>> 0);
            b = 4294967296 * c + (b >>> 0);
            a = a ? -b : b
        }
        return a
    }
    function re(a) {
        var b = Math.trunc(Number(a));
        if (Number.isSafeInteger(b))
            return String(b);
        b = a.indexOf(".");
        -1 !== b && (a = a.substring(0, b));
        se(a) || (ed(a),
        a = dd());
        return a
    }
    function we(a) {
        if ("string" !== typeof a)
            throw Error();
        return a
    }
    function xe(a) {
        if (null != a && "string" !== typeof a)
            throw Error();
        return a
    }
    function ye(a) {
        return null == a || "string" === typeof a ? a : void 0
    }
    function ze(a, b, c) {
        if (null != a && "object" === typeof a && a.md === Ud)
            return a;
        if (Array.isArray(a)) {
            var d = Gd(a)
              , e = d;
            0 === e && (e |= c & 32);
            e |= c & 2;
            e !== d && Hd(a, e);
            return new b(a)
        }
    }
    ;var Ae;
    function Be(a, b) {
        Ae = b;
        a = new a(b);
        Ae = void 0;
        return a
    }
    var De, Ee;
    function Fe(a) {
        switch (typeof a) {
        case "boolean":
            return De || (De = [0, void 0, !0]);
        case "number":
            return 0 < a ? void 0 : 0 === a ? Ee || (Ee = [0, void 0]) : [-a, void 0];
        case "string":
            return [0, a];
        case "object":
            return a
        }
    }
    function A(a, b, c) {
        null == a && (a = Ae);
        Ae = void 0;
        if (null == a) {
            var d = 96;
            c ? (a = [c],
            d |= 512) : a = [];
            b && (d = d & -16760833 | (b & 1023) << 14)
        } else {
            if (!Array.isArray(a))
                throw Error();
            d = Gd(a);
            if (d & 64)
                return a;
            d |= 64;
            if (c && (d |= 512,
            c !== a[0]))
                throw Error();
            a: {
                c = a;
                var e = c.length;
                if (e) {
                    var f = e - 1;
                    if (Xd(c[f])) {
                        d |= 256;
                        b = f - Td(d);
                        if (1024 <= b)
                            throw Error();
                        d = d & -16760833 | (b & 1023) << 14;
                        break a
                    }
                }
                if (b) {
                    b = Math.max(b, e - Td(d));
                    if (1024 < b)
                        throw Error();
                    d = d & -16760833 | (b & 1023) << 14
                }
            }
        }
        Hd(a, d);
        return a
    }
    ;function Ge(a, b) {
        return He(b)
    }
    function He(a) {
        switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "boolean":
            return a ? 1 : 0;
        case "object":
            if (a) {
                if (Array.isArray(a))
                    return Zd || !$d(a, void 0, 9999) ? a : void 0;
                if (Sc && null != a && a instanceof Uint8Array) {
                    if (Tc) {
                        for (var b = "", c = 0, d = a.length - 10240; c < d; )
                            b += String.fromCharCode.apply(null, a.subarray(c, c += 10240));
                        b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
                        a = btoa(b)
                    } else
                        a = Pc(a);
                    return a
                }
            }
        }
        return a
    }
    ;function Ie(a, b, c) {
        a = Cd(a);
        var d = a.length
          , e = b & 256 ? a[d - 1] : void 0;
        d += e ? -1 : 0;
        for (b = b & 512 ? 1 : 0; b < d; b++)
            a[b] = c(a[b]);
        if (e) {
            b = a[b] = {};
            for (var f in e)
                b[f] = c(e[f])
        }
        return a
    }
    function Je(a, b, c, d, e, f) {
        if (null != a) {
            if (Array.isArray(a))
                a = e && 0 == a.length && Gd(a) & 1 ? void 0 : f && Gd(a) & 2 ? a : Ke(a, b, c, void 0 !== d, e, f);
            else if (Xd(a)) {
                var g = {}, h;
                for (h in a)
                    g[h] = Je(a[h], b, c, d, e, f);
                a = g
            } else
                a = b(a, d);
            return a
        }
    }
    function Ke(a, b, c, d, e, f) {
        var g = d || c ? Gd(a) : 0;
        d = d ? !!(g & 32) : void 0;
        a = Cd(a);
        for (var h = 0; h < a.length; h++)
            a[h] = Je(a[h], b, c, d, e, f);
        c && c(g, a);
        return a
    }
    function Le(a) {
        return a.md === Ud ? a.toJSON() : He(a)
    }
    ;function Me(a, b, c) {
        c = void 0 === c ? Nd : c;
        if (null != a) {
            if (Sc && a instanceof Uint8Array)
                return b ? a : new Uint8Array(a);
            if (Array.isArray(a)) {
                var d = Gd(a);
                if (d & 2)
                    return a;
                b && (b = 0 === d || !!(d & 32) && !(d & 64 || !(d & 16)));
                return b ? Hd(a, (d | 34) & -12293) : Ke(a, Me, d & 4 ? Nd : c, !0, !1, !0)
            }
            a.md === Ud && (c = a.J,
            d = Kd(c),
            a = d & 2 ? a : Be(a.constructor, Ne(c, d, !0)));
            return a
        }
    }
    function Ne(a, b, c) {
        var d = c || b & 2 ? Nd : Md
          , e = !!(b & 32);
        a = Ie(a, b, function(f) {
            return Me(f, e, d)
        });
        Ed(a, 32 | (c ? 2 : 0));
        return a
    }
    function Oe(a) {
        var b = a.J
          , c = Kd(b);
        return c & 2 ? Be(a.constructor, Ne(b, c, !1)) : a
    }
    ;var Qe = function(a, b) {
        a = a.J;
        return Pe(a, Kd(a), b)
    }
      , Pe = function(a, b, c, d) {
        if (-1 === c)
            return null;
        if (c >= Od(b)) {
            if (b & 256)
                return a[a.length - 1][c]
        } else {
            var e = a.length;
            if (d && b & 256 && (d = a[e - 1][c],
            null != d))
                return d;
            b = c + Td(b);
            if (b < e)
                return a[b]
        }
    }
      , Se = function(a, b, c) {
        var d = a.J
          , e = Kd(d);
        ce(e);
        Re(d, e, b, c);
        return a
    };
    function Re(a, b, c, d, e) {
        var f = Od(b);
        if (c >= f || e) {
            var g = b;
            if (b & 256)
                e = a[a.length - 1];
            else {
                if (null == d)
                    return g;
                e = a[f + Td(b)] = {};
                g |= 256
            }
            e[c] = d;
            c < f && (a[c + Td(b)] = void 0);
            g !== b && Hd(a, g);
            return g
        }
        a[c + Td(b)] = d;
        b & 256 && (a = a[a.length - 1],
        c in a && delete a[c]);
        return b
    }
    function Te(a, b, c) {
        a = a.J;
        var d = Kd(a)
          , e = 2 & d ? 1 : 2
          , f = Ue(a, d, b)
          , g = Gd(f);
        if (!(4 & g)) {
            if (4 & g || Object.isFrozen(f))
                f = Cd(f),
                g = Ve(g, d, !1),
                d = Re(a, d, b, f);
            for (var h = 0, k = 0; h < f.length; h++) {
                var m = c(f[h]);
                null != m && (f[k++] = m)
            }
            k < h && (f.length = k);
            g = We(g, d, !1);
            g = Jd(g, 20, !0);
            g = Jd(g, 4096, !1);
            g = Jd(g, 8192, !1);
            Hd(f, g);
            2 & g && Object.freeze(f)
        }
        Xe(g) || (c = g,
        (h = 1 === e) ? g = Jd(g, 2, !0) : g = Jd(g, 32, !1),
        g !== c && Hd(f, g),
        h && Object.freeze(f));
        2 === e && Xe(g) && (f = Cd(f),
        g = Ve(g, d, !1),
        Hd(f, g),
        Re(a, d, b, f));
        return f
    }
    function Ue(a, b, c) {
        a = Pe(a, b, c);
        return Array.isArray(a) ? a : ae
    }
    function We(a, b, c) {
        0 === a && (a = Ve(a, b, c));
        return a = Jd(a, 1, !0)
    }
    function Xe(a) {
        return !!(2 & a) && !!(4 & a) || !!(2048 & a)
    }
    function Ye(a, b, c, d) {
        var e = a.J
          , f = Kd(e);
        ce(f);
        if (null == c)
            return Re(e, f, b),
            a;
        var g = Gd(c)
          , h = g
          , k = !!(2 & g) || Object.isFrozen(c)
          , m = !k && !1;
        if (!(4 & g))
            for (g = 21,
            k && (c = Cd(c),
            h = 0,
            g = Ve(g, f, !0)),
            k = 0; k < c.length; k++)
                c[k] = d(c[k]);
        m && (c = Cd(c),
        h = 0,
        g = Ve(g, f, !0));
        g !== h && Hd(c, g);
        Re(e, f, b, c);
        return a
    }
    function Ze(a, b, c, d) {
        var e = a.J
          , f = Kd(e);
        ce(f);
        Re(e, f, b, ("0" === d ? 0 === Number(c) : c === d) ? void 0 : c);
        return a
    }
    function $e(a, b, c) {
        for (var d = 0, e = 0; e < c.length; e++) {
            var f = c[e];
            null != Pe(a, b, f) && (0 !== d && (b = Re(a, b, d)),
            d = f)
        }
        return d
    }
    function af(a, b, c, d) {
        a = a.J;
        var e = Kd(a)
          , f = Pe(a, e, c, d);
        b = ze(f, b, e);
        b !== f && null != b && Re(a, e, c, b, d);
        return b
    }
    var bf = function(a, b, c) {
        var d = void 0 === d ? !1 : d;
        b = af(a, b, c, d);
        if (null == b)
            return b;
        a = a.J;
        var e = Kd(a);
        if (!(e & 2)) {
            var f = Oe(b);
            f !== b && (b = f,
            Re(a, e, c, b, d))
        }
        return b
    };
    function cf(a, b, c, d, e, f) {
        var g = !!(2 & b)
          , h = g ? 1 : 2
          , k = 1 === h;
        h = 2 === h;
        e = !!e;
        f && (f = !g);
        g = Ue(a, b, d);
        var m = Gd(g)
          , n = !!(4 & m);
        if (!n) {
            m = We(m, b, e);
            var q = g, t = b, v;
            (v = !!(2 & m)) && (t = Jd(t, 2, !0));
            for (var x = !v, H = !0, T = 0, la = 0; T < q.length; T++) {
                var da = ze(q[T], c, t);
                if (da instanceof c) {
                    if (!v) {
                        var K = !!(Gd(da.J) & 2);
                        x && (x = !K);
                        H && (H = K)
                    }
                    q[la++] = da
                }
            }
            la < T && (q.length = la);
            m = Jd(m, 4, !0);
            m = Jd(m, 16, H);
            m = Jd(m, 8, x);
            Hd(q, m);
            v && Object.freeze(q)
        }
        c = !!(8 & m) || k && !g.length;
        if (f && !c) {
            Xe(m) && (g = Cd(g),
            m = Ve(m, b, e),
            b = Re(a, b, d, g));
            f = g;
            c = m;
            for (q = 0; q < f.length; q++)
                m = f[q],
                t = Oe(m),
                m !== t && (f[q] = t);
            c = Jd(c, 8, !0);
            c = Jd(c, 16, !f.length);
            Hd(f, c);
            m = c
        }
        Xe(m) || (f = m,
        k ? m = Jd(m, !g.length || 16 & m && (!n || 32 & m) ? 2 : 2048, !0) : e || (m = Jd(m, 32, !1)),
        m !== f && Hd(g, m),
        k && Object.freeze(g));
        h && Xe(m) && (g = Cd(g),
        m = Ve(m, b, e),
        Hd(g, m),
        Re(a, b, d, g));
        return g
    }
    var df = function(a, b, c) {
        a = a.J;
        var d = Kd(a);
        return cf(a, d, b, c, !1, !(2 & d))
    }
      , ef = function(a, b, c) {
        null == c && (c = void 0);
        return Se(a, b, c)
    }
      , ff = function(a, b, c) {
        var d = a.J
          , e = Kd(d);
        ce(e);
        if (null == c)
            return Re(d, e, b),
            a;
        for (var f = Gd(c), g = f, h = !!(2 & f) || !!(2048 & f), k = h || Object.isFrozen(c), m = !0, n = !0, q = 0; q < c.length; q++) {
            var t = c[q];
            h || (t = !!(Gd(t.J) & 2),
            m && (m = !t),
            n && (n = t))
        }
        h || (f = Jd(f, 5, !0),
        f = Jd(f, 8, m),
        f = Jd(f, 16, n));
        k && f !== g && (c = Cd(c),
        g = 0,
        f = Ve(f, e, !0));
        f !== g && Hd(c, f);
        Re(d, e, b, c);
        return a
    };
    function Ve(a, b, c) {
        a = Jd(a, 2, !!(2 & b));
        a = Jd(a, 32, !!(32 & b) && c);
        return a = Jd(a, 2048, !1)
    }
    function gf(a, b, c, d) {
        a = a.J;
        var e = Kd(a);
        ce(e);
        b = cf(a, e, c, b, !0);
        c = null != d ? d : new c;
        b.push(c);
        Gd(c.J) & 2 ? Id(b, 8) : Id(b, 16);
        return c
    }
    var hf = function(a, b) {
        a = Qe(a, b);
        var c;
        null == a ? c = a : ie(a) ? "number" === typeof a ? c = te(a) : c = re(a) : c = void 0;
        return c
    }
      , jf = function(a, b) {
        return ye(Qe(a, b))
    };
    function kf(a, b) {
        return null != a ? a : b
    }
    var lf = function(a, b) {
        return kf(ge(Qe(a, b)), !1)
    }
      , mf = function(a, b) {
        var c = void 0 === c ? 0 : c;
        return kf(oe(Qe(a, b)), c)
    }
      , nf = function(a) {
        var b = void 0 === b ? 0 : b;
        a = pe(Qe(a, 1));
        return kf(a, b)
    }
      , of = function(a, b) {
        var c = void 0 === c ? 0 : c;
        return kf(hf(a, b), c)
    }
      , pf = function(a, b) {
        return kf(jf(a, b), "")
    }
      , qf = function(a, b) {
        var c = 0;
        c = void 0 === c ? 0 : c;
        return kf(le(Qe(a, b)), c)
    }
      , rf = function(a, b, c) {
        var d = a.J;
        b = $e(d, Kd(d), c) === b ? b : -1;
        return qf(a, b)
    }
      , sf = function(a, b, c) {
        return Se(a, b, null == c ? c : fe(c))
    }
      , tf = function(a, b, c) {
        return Se(a, b, xe(c))
    };
    var B = function(a, b, c) {
        this.J = A(a, b, c)
    };
    B.prototype.toJSON = function() {
        if (Yd)
            var a = uf(this, this.J, !1);
        else
            a = Ke(this.J, Le, void 0, void 0, !1, !1),
            a = uf(this, a, !0);
        return a
    }
    ;
    var vf = function(a) {
        Yd = !0;
        try {
            return JSON.stringify(a.toJSON(), Ge)
        } finally {
            Yd = !1
        }
    };
    B.prototype.md = Ud;
    B.prototype.toString = function() {
        return uf(this, this.J, !1).toString()
    }
    ;
    function uf(a, b, c) {
        var d = a.constructor.ga
          , e = Kd(c ? a.J : b)
          , f = Od(e)
          , g = !1;
        if (d && Zd) {
            if (!c) {
                b = Cd(b);
                var h;
                if (b.length && Xd(h = b[b.length - 1]))
                    for (g = 0; g < d.length; g++)
                        if (d[g] >= f) {
                            Object.assign(b[b.length - 1] = {}, h);
                            break
                        }
                g = !0
            }
            f = b;
            c = !c;
            h = Kd(a.J);
            a = Od(h);
            h = Td(h);
            for (var k, m, n = 0; n < d.length; n++)
                if (m = d[n],
                m < a) {
                    m += h;
                    var q = f[m];
                    null == q ? f[m] = c ? ae : Ld() : c && q !== ae && Fd(q)
                } else
                    k || (q = void 0,
                    f.length && Xd(q = f[f.length - 1]) ? k = q : f.push(k = {})),
                    q = k[m],
                    null == k[m] ? k[m] = c ? ae : Ld() : c && q !== ae && Fd(q)
        }
        k = b.length;
        if (!k)
            return b;
        var t;
        if (Xd(f = b[k - 1])) {
            a: {
                var v = f;
                c = {};
                a = !1;
                for (var x in v) {
                    h = v[x];
                    if (Array.isArray(h)) {
                        n = h;
                        if (!Wc && $d(h, d, +x) || !Vc && Wd(h) && 0 === h.size)
                            h = null;
                        h != n && (a = !0)
                    }
                    null != h ? c[x] = h : a = !0
                }
                if (a) {
                    for (var H in c) {
                        v = c;
                        break a
                    }
                    v = null
                }
            }
            v != f && (t = !0);
            k--
        }
        for (e = Td(e); 0 < k; k--) {
            x = k - 1;
            f = b[x];
            if (!(null == f || !Wc && $d(f, d, x - e) || !Vc && Wd(f) && 0 === f.size))
                break;
            var T = !0
        }
        if (!t && !T)
            return b;
        var la;
        g ? la = b : la = Array.prototype.slice.call(b, 0, k);
        b = la;
        g && (b.length = k);
        v && b.push(v);
        return b
    }
    ;function wf(a, b, c) {
        a[b] = c
    }
    var xf = Symbol();
    function yf(a) {
        var b = a[xf];
        if (!b) {
            var c = zf(a);
            b = function(d, e) {
                return Af(d, e, c)
            }
            ;
            a[xf] = b
        }
        return b
    }
    var Bf = Symbol();
    function Cf(a) {
        return a.g
    }
    function Df(a, b) {
        var c, d, e = a.g;
        return function(f, g, h) {
            return e(f, g, h, d || (d = zf(b).g), c || (c = yf(b)))
        }
    }
    function zf(a) {
        var b = a[Bf];
        if (b)
            return b;
        b = a[Bf] = {};
        var c = Cf
          , d = Df;
        var e = void 0 === e ? wf : e;
        b.g = Fe(a[0]);
        var f = 0
          , g = a[++f];
        g && g.constructor === Object && (b.zf = g,
        g = a[++f],
        "function" === typeof g && (b.j = g,
        b.h = a[++f],
        g = a[++f]));
        for (var h = {}; Array.isArray(g) && "number" === typeof g[0] && 0 < g[0]; ) {
            for (var k = 0; k < g.length; k++)
                h[g[k]] = g;
            g = a[++f]
        }
        for (k = 1; void 0 !== g; ) {
            "number" === typeof g && (k += g,
            g = a[++f]);
            var m = void 0;
            if (g instanceof Bd)
                var n = g;
            else
                n = Ef,
                f--;
            if (n.Ge) {
                g = a[++f];
                m = a;
                var q = f;
                "function" == typeof g && (g = g(),
                m[q] = g);
                m = g
            }
            g = a[++f];
            q = k + 1;
            "number" === typeof g && 0 > g && (q -= g,
            g = a[++f]);
            for (; k < q; k++) {
                var t = h[k];
                e(b, k, m ? d(n, m, t) : c(n, t))
            }
        }
        Ff in a && Bf in a && (a.length = 0);
        return b
    }
    var Ff = Symbol();
    function Gf(a, b) {
        var c = a[b];
        if (c)
            return c;
        if (c = a.zf)
            if (c = c[b]) {
                c = Array.isArray(c) ? c[0]instanceof Bd ? c : [Hf, c] : [c, void 0];
                var d = c[0].g;
                if (c = c[1]) {
                    var e = yf(c)
                      , f = zf(c).g;
                    c = (c = a.h) ? c(f, e) : function(g, h, k) {
                        return d(g, h, k, f, e)
                    }
                } else
                    c = d;
                return a[b] = c
            }
    }
    function Af(a, b, c) {
        for (var d = Kd(a), e = Td(d), f = a.length, g = f + (d & 256 ? -1 : 0), h = d & 512 ? 1 : 0; h < g; h++) {
            var k = a[h];
            if (null != k) {
                var m = h - e
                  , n = Gf(c, m);
                n && n(b, k, m)
            }
        }
        if (d & 256) {
            a = a[f - 1];
            for (var q in a)
                d = +q,
                Number.isNaN(d) || (e = a[q],
                null != e && (f = Gf(c, d)) && f(b, e, d))
        }
    }
    var If = function(a, b) {
        var c = new rd;
        Af(a.J, c, zf(b));
        return wd(c)
    };
    function Jf(a) {
        return new Bd(a,!1)
    }
    function Kf(a, b, c) {
        a: if (null != b) {
            if (ie(b)) {
                if ("string" === typeof b) {
                    b = re(b);
                    break a
                }
                if ("number" === typeof b) {
                    b = te(b);
                    break a
                }
            }
            b = void 0
        }
        null != b && ("string" === typeof b && kd(b),
        null != b && (td(a, c, 0),
        "number" === typeof b ? (a = a.g,
        $c(b),
        md(a, Xc, Yc)) : (c = kd(b),
        md(a.g, c.h, c.g))))
    }
    function Lf(a, b, c) {
        b = oe(b);
        null != b && null != b && (td(a, c, 0),
        pd(a.g, b))
    }
    function Mf(a, b, c) {
        b = ye(b);
        null != b && xd(a, c, kb(b))
    }
    function Nf(a, b, c, d, e) {
        yd(a, c, b instanceof B ? b.J : Array.isArray(b) ? A(b, d[0], d[1]) : void 0, e)
    }
    function Of(a, b, c) {
        b = oe(b);
        null != b && (b = parseInt(b, 10),
        td(a, c, 0),
        pd(a.g, b))
    }
    var Pf = Jf(function(a, b, c) {
        b = ee(b);
        null != b && (td(a, c, 1),
        a = a.g,
        c = Zc || (Zc = new DataView(new ArrayBuffer(8))),
        c.setFloat64(0, +b, !0),
        Xc = c.getUint32(0, !0),
        Yc = c.getUint32(4, !0),
        qd(a, Xc),
        qd(a, Yc))
    }), Qf = Jf(function(a, b, c) {
        b = ee(b);
        null != b && (td(a, c, 5),
        a = a.g,
        c = Zc || (Zc = new DataView(new ArrayBuffer(8))),
        c.setFloat32(0, +b, !0),
        Yc = 0,
        Xc = c.getUint32(0, !0),
        qd(a, Xc))
    }), Rf = Jf(Kf), Sf = Jf(Kf), Uf = Jf(function(a, b, c) {
        a: if (null != b) {
            if (ie(b)) {
                if ("string" === typeof b) {
                    var d = Math.trunc(Number(b));
                    Number.isSafeInteger(d) && 0 <= d ? b = String(d) : (d = b.indexOf("."),
                    -1 !== d && (b = b.substring(0, d)),
                    ue(b) || (ed(b),
                    b = bd(Xc, Yc)));
                    break a
                }
                if ("number" === typeof b) {
                    b = Math.trunc(b);
                    b = 0 <= b && Number.isSafeInteger(b) ? b : ve(b);
                    break a
                }
            }
            b = void 0
        }
        null != b && ("string" === typeof b && hd(b),
        null != b && (td(a, c, 0),
        "number" === typeof b ? (a = a.g,
        $c(b),
        md(a, Xc, Yc)) : (c = hd(b),
        md(a.g, c.h, c.g))))
    }), Vf = Jf(Lf), Wf = Jf(Lf), Xf = Jf(function(a, b, c) {
        b = ge(b);
        null != b && (td(a, c, 0),
        a.g.g.push(b ? 1 : 0))
    }), Yf = Jf(Mf), Zf = Jf(Mf), $f;
    $f = new Bd(function(a, b, c) {
        if (Array.isArray(b)) {
            var d = Gd(b);
            if (!(d & 4)) {
                for (var e = 0, f = 0; e < b.length; e++) {
                    var g = ye(b[e]);
                    null != g && (b[f++] = g)
                }
                f < e && (b.length = f);
                Hd(b, (d | 5) & -12289);
                d & 2 && Object.freeze(b)
            }
        } else
            b = void 0;
        if (null != b)
            for (d = 0; d < b.length; d++)
                e = a,
                f = c,
                g = b[d],
                null != g && xd(e, f, kb(g))
    }
    ,!1);
    var Hf = new Bd(Nf,!0), Ef = new Bd(Nf,!0), ag;
    ag = new Bd(function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                Nf(a, b[f], c, d, e)
    }
    ,!0);
    var bg = Jf(Of)
      , cg = Jf(Of);
    function dg(a) {
        return function(b) {
            return If(b, a)
        }
    }
    function eg(a) {
        return function() {
            return If(this, a)
        }
    }
    function fg(a) {
        return function(b) {
            if (null == b || "" == b)
                b = new a;
            else {
                b = JSON.parse(b);
                if (!Array.isArray(b))
                    throw Error(void 0);
                Ed(b, 32);
                b = Be(a, b)
            }
            return b
        }
    }
    ;var gg = function(a) {
        this.J = A(a)
    };
    u(gg, B);
    var hg = dg([0, cg, Zf]);
    var ig = function(a, b, c) {
        c = void 0 === c ? {} : c;
        this.error = a;
        this.context = b.context;
        this.msg = b.message || "";
        this.id = b.id || "jserror";
        this.meta = c
    }
      , jg = function(a) {
        return !!(a.error && a.meta && a.id)
    };
    var kg = function(a) {
        var b = void 0 === b ? [] : b;
        this.g = a;
        this.defaultValue = b
    };
    var lg = function() {}
      , mg = function(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }
      , ng = function(a) {
        var b = a;
        return function() {
            if (b) {
                var c = b;
                b = null;
                c()
            }
        }
    }
      , og = function(a) {
        var b = 0
          , c = !1
          , d = []
          , e = function() {
            b = 0;
            c && (c = !1,
            f())
        }
          , f = function() {
            b = w.setTimeout(e, 1E3);
            var g = d;
            d = [];
            a.apply(void 0, g)
        };
        return function(g) {
            d = arguments;
            b ? c = !0 : f()
        }
    };
    var pg = mg(function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
            w.addEventListener("test", null, b)
        } catch (c) {}
        return a
    });
    function qg(a) {
        return a ? a.passive && pg() ? a : a.capture || !1 : !1
    }
    var rg = function(a, b, c, d) {
        return a.addEventListener ? (a.addEventListener(b, c, qg(d)),
        !0) : !1
    }
      , sg = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, qg())
    };
    var C = function(a) {
        var b = "qb";
        if (a.qb && a.hasOwnProperty(b))
            return a.qb;
        b = new a;
        return a.qb = b
    };
    var tg = function() {
        var a = {};
        this.h = function(b, c) {
            return null != a[b] ? a[b] : c
        }
        ;
        this.g = function(b, c) {
            return null != a[b] ? a[b] : c
        }
    };
    function ug() {
        var a = vg;
        return C(tg).h(a.g, a.defaultValue)
    }
    ;var wg = kc || nc;
    function xg(a, b, c) {
        for (var d in a)
            b.call(c, a[d], d, a)
    }
    function yg(a, b) {
        var c = {}, d;
        for (d in a)
            b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    }
    function zg(a) {
        var b = Ag, c;
        for (c in b)
            if (!a.call(void 0, b[c], c, b))
                return !1;
        return !0
    }
    function Bg(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = a[d];
        return b
    }
    function Cg(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = d;
        return b
    }
    function Dg(a, b) {
        var c = Qa(b)
          , d = c ? b : arguments;
        for (c = c ? 0 : 1; c < d.length; c++) {
            if (null == a)
                return;
            a = a[d[c]]
        }
        return a
    }
    function Eg(a, b) {
        return null !== a && b in a
    }
    function Fg(a, b) {
        for (var c in a)
            if (a[c] == b)
                return !0;
        return !1
    }
    function Gg(a) {
        var b = Hg, c;
        for (c in b)
            if (a.call(void 0, b[c], c, b))
                return c
    }
    function Ig(a) {
        for (var b in a)
            return !1;
        return !0
    }
    function Jg(a) {
        for (var b in a)
            delete a[b]
    }
    function Kg(a, b, c) {
        return null !== a && b in a ? a[b] : c
    }
    var Lg = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Mg(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < Lg.length; f++)
                c = Lg[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
    ;var Ng, Og = function() {
        if (void 0 === Ng) {
            var a = null
              , b = w.trustedTypes;
            if (b && b.createPolicy) {
                try {
                    a = b.createPolicy("goog#html", {
                        createHTML: db,
                        createScript: db,
                        createScriptURL: db
                    })
                } catch (c) {
                    w.console && w.console.error(c.message)
                }
                Ng = a
            } else
                Ng = a
        }
        return Ng
    };
    var Pg = function(a) {
        this.g = a
    };
    Pg.prototype.toString = function() {
        return this.g + ""
    }
    ;
    var Qg = {}
      , Rg = function(a) {
        var b = Og();
        a = b ? b.createScriptURL(a) : a;
        return new Pg(a,Qg)
    };
    var Sg = function(a) {
        this.g = a
    };
    Sg.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    var Tg = {}
      , Ug = new Sg("about:invalid#zClosurez",Tg);
    var Vg = {}
      , Wg = function(a) {
        this.g = a
    };
    Wg.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    var Xg = new Wg("",Vg);
    var Yg = {}
      , Zg = function(a) {
        this.g = a
    };
    Zg.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    var $g = function(a) {
        return a instanceof Zg && a.constructor === Zg ? a.g : "type_error:SafeHtml"
    };
    var ah = function(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    ah.prototype.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    ah.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    ah.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    var D = function(a, b) {
        this.width = a;
        this.height = b
    };
    l = D.prototype;
    l.aspectRatio = function() {
        return this.width / this.height
    }
    ;
    l.isEmpty = function() {
        return !(this.width * this.height)
    }
    ;
    l.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    l.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    l.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    var bh = function(a) {
        return decodeURIComponent(a.replace(/\+/g, " "))
    }
      , ch = function(a, b) {
        a.length > b && (a = a.substring(0, b - 3) + "...");
        return a
    }
      , dh = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    }
    : function(a, b) {
        return Array(b + 1).join(a)
    }
      , eh = function(a) {
        return null == a ? "" : String(a)
    }
      , fh = 2147483648 * Math.random() | 0
      , gh = function(a) {
        return String(a).replace(/\-([a-z])/g, function(b, c) {
            return c.toUpperCase()
        })
    }
      , hh = function() {
        return "googleAvInapp".replace(/([A-Z])/g, "-$1").toLowerCase()
    }
      , ih = function(a) {
        return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function(b, c, d) {
            return c + d.toUpperCase()
        })
    }
      , jh = function(a) {
        isFinite(a) && (a = String(a));
        return "string" === typeof a ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
    };
    var mh = function(a) {
        return a ? new kh(lh(a)) : fb || (fb = new kh)
    }
      , nh = function(a) {
        var b = document;
        return "string" === typeof a ? b.getElementById(a) : a
    }
      , th = function(a, b) {
        xg(b, function(c, d) {
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : oh.hasOwnProperty(d) ? a.setAttribute(oh[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
        })
    }
      , oh = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    }
      , vh = function(a) {
        a = a.document;
        a = uh(a) ? a.documentElement : a.body;
        return new D(a.clientWidth,a.clientHeight)
    }
      , wh = function(a) {
        var b = a.scrollingElement ? a.scrollingElement : !nc && uh(a) ? a.documentElement : a.body || a.documentElement;
        a = a.parentWindow || a.defaultView;
        return kc && a.pageYOffset != b.scrollTop ? new ah(b.scrollLeft,b.scrollTop) : new ah(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
    }
      , E = function(a) {
        return a ? a.parentWindow || a.defaultView : window
    }
      , zh = function(a, b, c) {
        var d = arguments
          , e = document
          , f = d[1]
          , g = xh(e, String(d[0]));
        f && ("string" === typeof f ? g.className = f : Array.isArray(f) ? g.className = f.join(" ") : th(g, f));
        2 < d.length && yh(e, g, d, 2);
        return g
    }
      , yh = function(a, b, c, d) {
        function e(h) {
            h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (!Qa(f) || Ra(f) && 0 < f.nodeType)
                e(f);
            else {
                a: {
                    if (f && "number" == typeof f.length) {
                        if (Ra(f)) {
                            var g = "function" == typeof f.item || "string" == typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            g = "function" == typeof f.item;
                            break a
                        }
                    }
                    g = !1
                }
                Nb(g ? ac(f) : f, e)
            }
        }
    }
      , xh = function(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }
      , uh = function(a) {
        return "CSS1Compat" == a.compatMode
    }
      , Ah = function(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    }
      , Bh = function(a) {
        var b;
        if (wg && (b = a.parentElement))
            return b;
        b = a.parentNode;
        return Ra(b) && 1 == b.nodeType ? b : null
    }
      , Ch = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
      , lh = function(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
      , Dh = function(a) {
        try {
            return a.contentWindow || (a.contentDocument ? E(a.contentDocument) : null)
        } catch (b) {}
        return null
    }
      , Eh = function(a, b) {
        a && (a = a.parentNode);
        for (var c = 0; a; ) {
            if (b(a))
                return a;
            a = a.parentNode;
            c++
        }
        return null
    }
      , kh = function(a) {
        this.g = a || w.document || document
    };
    l = kh.prototype;
    l.getElementsByTagName = function(a, b) {
        return (b || this.g).getElementsByTagName(String(a))
    }
    ;
    l.appendChild = function(a, b) {
        a.appendChild(b)
    }
    ;
    l.append = function(a, b) {
        yh(lh(a), a, arguments, 1)
    }
    ;
    l.canHaveChildren = function(a) {
        if (1 != a.nodeType)
            return !1;
        switch (a.tagName) {
        case "APPLET":
        case "AREA":
        case "BASE":
        case "BR":
        case "COL":
        case "COMMAND":
        case "EMBED":
        case "FRAME":
        case "HR":
        case "IMG":
        case "INPUT":
        case "IFRAME":
        case "ISINDEX":
        case "KEYGEN":
        case "LINK":
        case "NOFRAMES":
        case "NOSCRIPT":
        case "META":
        case "OBJECT":
        case "PARAM":
        case "SCRIPT":
        case "SOURCE":
        case "STYLE":
        case "TRACK":
        case "WBR":
            return !1
        }
        return !0
    }
    ;
    l.contains = Ch;
    var Gh = function() {
        return ub && xb ? xb.mobile : !Fh() && (z("iPod") || z("iPhone") || z("Android") || z("IEMobile"))
    }
      , Fh = function() {
        return ub && xb ? !xb.mobile && (z("iPad") || z("Android") || z("Silk")) : z("iPad") || z("Android") && !z("Mobile") || z("Silk")
    };
    var Hh = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$")
      , Ih = function(a) {
        var b = a.match(Hh);
        a = b[1];
        var c = b[3];
        b = b[4];
        var d = "";
        a && (d += a + ":");
        c && (d = d + "//" + c,
        b && (d += ":" + b));
        return d
    }
      , Jh = function(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? bh(e) : "")
            }
        }
    }
      , Kh = /#|$/
      , Lh = function(a, b) {
        var c = a.search(Kh);
        a: {
            var d = 0;
            for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c; ) {
                var f = a.charCodeAt(d - 1);
                if (38 == f || 63 == f)
                    if (f = a.charCodeAt(d + e),
                    !f || 61 == f || 38 == f || 35 == f)
                        break a;
                d += e + 1
            }
            d = -1
        }
        if (0 > d)
            return null;
        e = a.indexOf("&", d);
        if (0 > e || e > c)
            e = c;
        d += b.length + 1;
        return bh(a.slice(d, -1 !== e ? e : 0))
    };
    var Mh = function(a) {
        var b = []
          , c = []
          , d = {}
          , e = function(f, g) {
            var h = g + "  ";
            try {
                if (void 0 === f)
                    b.push("undefined");
                else if (null === f)
                    b.push("NULL");
                else if ("string" === typeof f)
                    b.push('"' + f.replace(/\n/g, "\n" + g) + '"');
                else if ("function" === typeof f)
                    b.push(String(f).replace(/\n/g, "\n" + g));
                else if (Ra(f)) {
                    f[Sa] || c.push(f);
                    var k = Ua(f);
                    if (d[k])
                        b.push("*** reference loop detected (id=" + k + ") ***");
                    else {
                        d[k] = !0;
                        b.push("{");
                        for (var m in f)
                            "function" !== typeof f[m] && (b.push("\n"),
                            b.push(h),
                            b.push(m + " = "),
                            e(f[m], h));
                        b.push("\n" + g + "}");
                        delete d[k]
                    }
                } else
                    b.push(f)
            } catch (n) {
                b.push("*** " + n + " ***")
            }
        };
        e(a, "");
        for (a = 0; a < c.length; a++)
            Wa(c[a]);
        return b.join("")
    };
    /*

 SPDX-License-Identifier: Apache-2.0
*/
    var Nh = function(a) {
        this.Tf = a
    };
    function Oh(a) {
        return new Nh(function(b) {
            return b.substr(0, a.length + 1).toLowerCase() === a + ":"
        }
        )
    }
    var Ph = [Oh("data"), Oh("http"), Oh("https"), Oh("mailto"), Oh("ftp"), new Nh(function(a) {
        return /^[^:]*([/?#]|$)/.test(a)
    }
    )];
    function Qh(a) {
        if ("undefined" !== typeof MediaSource && a instanceof MediaSource)
            return new Sg(URL.createObjectURL(a),Tg);
        var b = a.type.match(/^([^;]+)(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i);
        if (2 !== (null == b ? void 0 : b.length) || !(/^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon|heic|heif|avif|x-ms-bmp)$/i.test(b[1]) || /^video\/(?:mpeg|mp4|ogg|webm|x-matroska|quicktime|x-ms-wmv)$/i.test(b[1]) || /^audio\/(?:3gpp2|3gpp|aac|amr|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)$/i.test(b[1]) || /^font\/\w+/i.test(b[1])))
            throw Error("");
        return new Sg(URL.createObjectURL(a),Tg)
    }
    var Rh = "function" === typeof URL;
    function Sh(a, b) {
        if (1 === a.nodeType) {
            var c = a.tagName;
            if ("SCRIPT" === c || "STYLE" === c)
                throw Error("");
        }
        a.innerHTML = $g(b)
    }
    ;function Th(a, b) {
        a.src = b instanceof Pg && b.constructor === Pg ? b.g : "type_error:TrustedResourceUrl";
        var c, d;
        (c = (b = null == (d = (c = (a.ownerDocument && a.ownerDocument.defaultView || window).document).querySelector) ? void 0 : d.call(c, "script[nonce]")) ? b.nonce || b.getAttribute("nonce") || "" : "") && a.setAttribute("nonce", c)
    }
    ;function Uh(a, b) {
        a.write($g(b))
    }
    ;var Vh = function(a) {
        try {
            return !!a && null != a.location.href && gc(a, "foo")
        } catch (b) {
            return !1
        }
    }
      , Xh = function(a) {
        var b = void 0 === b ? !1 : b;
        var c = void 0 === c ? w : c;
        for (var d = 0; c && 40 > d++ && (!b && !Vh(c) || !a(c)); )
            c = Wh(c)
    }
      , Yh = function() {
        var a = window;
        Xh(function(b) {
            a = b;
            return !1
        });
        return a
    }
      , Wh = function(a) {
        try {
            var b = a.parent;
            if (b && b != a)
                return b
        } catch (c) {}
        return null
    }
      , Zh = function() {
        var a = window;
        return Vh(a.top) ? a.top : null
    }
      , $h = function() {
        if (!globalThis.crypto)
            return Math.random();
        try {
            var a = new Uint32Array(1);
            globalThis.crypto.getRandomValues(a);
            return a[0] / 65536 / 65536
        } catch (b) {
            return Math.random()
        }
    }
      , ai = function(a, b) {
        if (a)
            for (var c in a)
                Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a)
    }
      , bi = function(a) {
        var b = a.length;
        if (0 == b)
            return 0;
        for (var c = 305419896, d = 0; d < b; d++)
            c ^= (c << 5) + (c >> 2) + a.charCodeAt(d) & 4294967295;
        return 0 < c ? c : 4294967296 + c
    };
    function ci(a) {
        var b, c;
        return null != (c = null == (b = /https?:\/\/[^\/]+/.exec(a)) ? void 0 : b[0]) ? c : ""
    }
    var di = function() {
        var a = w;
        try {
            for (var b = null; b != a; b = a,
            a = a.parent)
                switch (a.location.protocol) {
                case "https:":
                    return !0;
                case "file:":
                    return !0;
                case "http:":
                    return !1
                }
        } catch (c) {}
        return !0
    }
      , ei = function(a, b) {
        try {
            return !(!a.frames || !a.frames[b])
        } catch (c) {
            return !1
        }
    }
      , fi = function(a, b) {
        for (var c = 0; 50 > c; ++c) {
            if (ei(a, b))
                return a;
            if (!(a = Wh(a)))
                break
        }
        return null
    }
      , gi = function(a, b) {
        b = void 0 === b ? document : b;
        return b.createElement(String(a).toLowerCase())
    }
      , hi = function(a) {
        for (var b = a; a && a != a.parent; )
            a = a.parent,
            Vh(a) && (b = a);
        return b
    };
    var ii = RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)")
      , ki = function() {
        var a = (this.g = w) || w;
        this.h = a.top == a ? 1 : Vh(a.top) ? 2 : 3;
        3 != this.h && (a = w.top.document,
        this.j = a.referrer,
        Date.parse(a.lastModified));
        ji(this.g)
    }
      , ni = function(a) {
        a = a || ji();
        for (var b = new li(w.location.href,!1), c = null, d = a.length - 1, e = d; 0 <= e; --e) {
            var f = a[e];
            !c && ii.test(f.url) && (c = f);
            if (f.url && !f.jd) {
                b = f;
                break
            }
        }
        e = null;
        f = a.length && a[d].url;
        0 != b.depth && f && (e = a[d]);
        return new mi(b,e,c)
    }
      , ji = function(a) {
        var b = a || w
          , c = []
          , d = null;
        do {
            var e = b;
            if (Vh(e)) {
                var f = e.location.href;
                d = e.document && e.document.referrer || null
            } else
                f = d,
                d = null;
            c.push(new li(f || ""));
            try {
                b = e.parent
            } catch (g) {
                b = null
            }
        } while (b && e != b);
        e = 0;
        for (b = c.length - 1; e <= b; ++e)
            c[e].depth = b - e;
        e = a || w;
        if (e.location && e.location.ancestorOrigins && e.location.ancestorOrigins.length == c.length - 1)
            for (a = 1; a < c.length; ++a)
                b = c[a],
                b.url || (b.url = e.location.ancestorOrigins[a - 1] || "",
                b.jd = !0);
        return c
    }
      , mi = function(a, b, c) {
        this.g = a;
        this.h = b;
        this.j = c
    }
      , li = function(a, b) {
        this.url = a;
        this.jd = !!b;
        this.depth = null
    };
    var oi = null;
    function pi() {
        var a = void 0 === a ? w : a;
        return (a = a.performance) && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Date.now()
    }
    function qi() {
        var a = void 0 === a ? w : a;
        return (a = a.performance) && a.now ? a.now() : null
    }
    function ri(a, b) {
        b = void 0 === b ? w : b;
        var c, d;
        return (null == (c = b.performance) ? void 0 : null == (d = c.timing) ? void 0 : d[a]) || 0
    }
    function si() {
        var a = void 0 === a ? w : a;
        var b = Math.min(ri("domLoading", a) || Infinity, ri("domInteractive", a) || Infinity);
        return Infinity === b ? Math.max(ri("responseEnd", a), ri("navigationStart", a)) : b
    }
    ;var ti = function(a, b, c, d) {
        this.label = a;
        this.type = b;
        this.value = c;
        this.duration = void 0 === d ? 0 : d;
        this.taskId = this.slotId = void 0;
        this.uniqueId = Math.random()
    };
    var ui = w.performance
      , vi = !!(ui && ui.mark && ui.measure && ui.clearMarks)
      , wi = mg(function() {
        var a;
        if (a = vi) {
            var b;
            if (null === oi) {
                oi = "";
                try {
                    a = "";
                    try {
                        a = w.top.location.hash
                    } catch (c) {
                        a = w.location.hash
                    }
                    a && (oi = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                } catch (c) {}
            }
            b = oi;
            a = !!b.indexOf && 0 <= b.indexOf("1337")
        }
        return a
    })
      , xi = function(a, b) {
        this.A = [];
        this.g = b || w;
        var c = null;
        b && (b.google_js_reporting_queue = b.google_js_reporting_queue || [],
        this.A = b.google_js_reporting_queue,
        c = b.google_measure_js_timing);
        this.j = wi() || (null != c ? c : Math.random() < a)
    };
    xi.prototype.B = function() {
        this.j = !1;
        this.A != this.g.google_js_reporting_queue && (wi() && Nb(this.A, yi),
        this.A.length = 0)
    }
    ;
    xi.prototype.H = function(a) {
        !this.j || 2048 < this.A.length || this.A.push(a)
    }
    ;
    var yi = function(a) {
        a && ui && wi() && (ui.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"),
        ui.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"))
    };
    xi.prototype.start = function(a, b) {
        if (!this.j)
            return null;
        a = new ti(a,b,qi() || pi());
        b = "goog_" + a.label + "_" + a.uniqueId + "_start";
        ui && wi() && ui.mark(b);
        return a
    }
    ;
    xi.prototype.end = function(a) {
        if (this.j && "number" === typeof a.value) {
            a.duration = (qi() || pi()) - a.value;
            var b = "goog_" + a.label + "_" + a.uniqueId + "_end";
            ui && wi() && ui.mark(b);
            this.H(a)
        }
    }
    ;
    var zi = function() {
        this.j = "&";
        this.h = {};
        this.o = 0;
        this.g = []
    }
      , Ai = function(a, b) {
        var c = {};
        c[a] = b;
        return [c]
    }
      , Ci = function(a, b, c, d, e) {
        var f = [];
        ai(a, function(g, h) {
            (g = Bi(g, b, c, d, e)) && f.push(h + "=" + g)
        });
        return f.join(b)
    }
      , Bi = function(a, b, c, d, e) {
        if (null == a)
            return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0,
            d < c.length) {
                for (var f = [], g = 0; g < a.length; g++)
                    f.push(Bi(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a)
            return e = e || 0,
            2 > e ? encodeURIComponent(Ci(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    }
      , Di = function(a, b, c) {
        a.g.push(b);
        a.h[b] = c
    }
      , Ei = function(a, b, c, d) {
        a.g.push(b);
        a.h[b] = Ai(c, d)
    }
      , Gi = function(a, b, c) {
        b = b + "//pagead2.googlesyndication.com" + c;
        var d = Fi(a) - c.length;
        if (0 > d)
            return "";
        a.g.sort(function(n, q) {
            return n - q
        });
        c = null;
        for (var e = "", f = 0; f < a.g.length; f++)
            for (var g = a.g[f], h = a.h[g], k = 0; k < h.length; k++) {
                if (!d) {
                    c = null == c ? g : c;
                    break
                }
                var m = Ci(h[k], a.j, ",$");
                if (m) {
                    m = e + m;
                    if (d >= m.length) {
                        d -= m.length;
                        b += m;
                        e = a.j;
                        break
                    }
                    c = null == c ? g : c
                }
            }
        a = "";
        null != c && (a = e + "trn=" + c);
        return b + a
    }
      , Fi = function(a) {
        var b = 1, c;
        for (c in a.h)
            b = c.length > b ? c.length : b;
        return 3997 - b - a.j.length - 1
    };
    var Ji = function() {
        var a = Hi;
        this.l = Ii;
        this.A = "jserror";
        this.o = !0;
        this.g = void 0 === a ? null : a;
        this.h = null;
        this.j = !1;
        this.B = this.Sa
    };
    l = Ji.prototype;
    l.Qc = function(a) {
        this.h = a
    }
    ;
    l.Ed = function(a) {
        this.A = a
    }
    ;
    l.Fd = function(a) {
        this.o = a
    }
    ;
    l.Gd = function(a) {
        this.j = a
    }
    ;
    l.tb = function(a, b, c) {
        try {
            if (this.g && this.g.j) {
                var d = this.g.start(a.toString(), 3);
                var e = b();
                this.g.end(d)
            } else
                e = b()
        } catch (h) {
            b = this.o;
            try {
                yi(d),
                b = this.B(a, new ig(h,{
                    message: Ki(h)
                }), void 0, c)
            } catch (k) {
                this.Sa(217, k)
            }
            if (b) {
                var f, g;
                null == (f = window.console) || null == (g = f.error) || g.call(f, h)
            } else
                throw h;
        }
        return e
    }
    ;
    l.wd = function(a, b, c, d) {
        var e = this;
        return function() {
            var f = Ja.apply(0, arguments);
            return e.tb(a, function() {
                return b.apply(c, f)
            }, d)
        }
    }
    ;
    l.Sa = function(a, b, c, d, e) {
        e = e || this.A;
        try {
            var f = new zi;
            Ei(f, 1, "context", a);
            jg(b) || (b = new ig(b,{
                message: Ki(b)
            }));
            if (b.msg) {
                var g = b.msg;
                null == g.substring && (g = "b/320546888 " + typeof g + " " + g);
                Ei(f, 2, "msg", g.substring(0, 512))
            }
            var h = b.meta || {};
            if (this.h)
                try {
                    this.h(h)
                } catch (m) {}
            if (d)
                try {
                    d(h)
                } catch (m) {}
            Di(f, 3, [h]);
            var k = ni();
            k.h && Ei(f, 4, "top", k.h.url || "");
            Di(f, 5, [{
                url: k.g.url || ""
            }, {
                url: k.g.url ? Ih(k.g.url) : ""
            }]);
            Li(this.l, e, f, this.j, c)
        } catch (m) {
            try {
                Li(this.l, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: Ki(m),
                    url: k && k.g.url
                }, this.j, c)
            } catch (n) {}
        }
        return this.o
    }
    ;
    var Ki = function(a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                for (var d; a != d; )
                    d = a,
                    a = a.replace(RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"), "$1");
                b = a.replace(RegExp("\n *", "g"), "\n")
            } catch (e) {
                b = c
            }
        }
        return b
    };
    var Ni = function(a, b, c, d, e) {
        Mi(a, b, void 0 === c ? null : c, void 0 === d ? !1 : d, void 0 === e ? !1 : e)
    };
    function Mi(a, b, c, d, e) {
        e = void 0 === e ? !1 : e;
        a.google_image_requests || (a.google_image_requests = []);
        var f = gi("IMG", a.document);
        if (c || d) {
            var g = function(h) {
                c && c(h);
                d && Xb(a.google_image_requests, f);
                sg(f, "load", g);
                sg(f, "error", g)
            };
            rg(f, "load", g);
            rg(f, "error", g)
        }
        e && (f.attributionSrc = "");
        f.src = b;
        a.google_image_requests.push(f)
    }
    var Pi = function(a, b) {
        var c = void 0 === c ? !1 : c;
        var d = "https://pagead2.googlesyndication.com/pagead/gen_204?id=" + b;
        ai(a, function(e, f) {
            if (e || 0 === e)
                d += "&" + f + "=" + encodeURIComponent("" + e)
        });
        Oi(d, c)
    }
      , Oi = function(a, b) {
        var c = window;
        b = void 0 === b ? !1 : b;
        var d = void 0 === d ? !1 : d;
        c.fetch ? (b = {
            keepalive: !0,
            credentials: "include",
            redirect: "follow",
            method: "get",
            mode: "no-cors"
        },
        d && (b.mode = "cors",
        "setAttributionReporting"in XMLHttpRequest.prototype ? b.attributionReporting = {
            eventSourceEligible: "true",
            triggerEligible: "false"
        } : b.headers = {
            "Attribution-Reporting-Eligible": "event-source"
        }),
        c.fetch(a, b)) : Ni(c, a, void 0, b, d)
    };
    function Qi(a, b) {
        var c = new rd;
        try {
            var d = a.filter(function(f) {
                return f.pe
            }).map(Ri);
            Ad(c, 1, d);
            yd(c, 2, hg(b), zd);
            var e = a.filter(function(f) {
                return !f.pe
            }).map(Ri);
            Ad(c, 3, e)
        } catch (f) {
            Si(f, b)
        }
        return wd(c)
    }
    function Si(a, b) {
        try {
            Pi({
                m: Ki(a instanceof Error ? a : Error(String(a))),
                b: qf(b, 1) || null,
                v: pf(b, 2) || null
            }, "rcs_internal")
        } catch (c) {}
    }
    function Ri(a) {
        var b = new rd;
        yd(b, a.tg, a.jg, zd);
        return wd(b)
    }
    function zd(a, b) {
        a = a.subarray(0, a.length);
        sd(b, b.g.end());
        sd(b, a)
    }
    var Ti = function(a, b) {
        var c = new gg;
        a = Ze(c, 1, ke(a), 0);
        b = Ze(a, 2, xe(b), "");
        a = b.J;
        c = Kd(a);
        this.g = c & 2 ? b : Be(b.constructor, Ne(a, c, !0))
    };
    var Ui = function(a) {
        this.J = A(a)
    };
    u(Ui, B);
    Ui.prototype.getTagSessionCorrelator = function() {
        return of(this, 1)
    }
    ;
    var Vi = function(a, b) {
        return Ze(a, 1, qe(b), "0")
    }
      , Wi = function(a, b) {
        return Ze(a, 2, qe(b), "0")
    }
      , Xi = dg([0, Sf, -1]);
    var Yi = function() {
        Ti.apply(this, arguments)
    };
    u(Yi, Ti);
    var Zi = function() {
        Yi.apply(this, arguments)
    };
    u(Zi, Yi);
    Zi.prototype.o = function() {
        this.l.apply(this, ia(Ja.apply(0, arguments).map(function(a) {
            return {
                pe: !0,
                tg: 16,
                jg: Xi(a)
            }
        })))
    }
    ;
    var $i = function() {
        var a;
        this.g = a = void 0 === a ? {} : a
    };
    $i.prototype.reset = function() {
        this.g = {}
    }
    ;
    var F = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    F.prototype.getWidth = function() {
        return this.right - this.left
    }
    ;
    F.prototype.getHeight = function() {
        return this.bottom - this.top
    }
    ;
    var aj = function(a) {
        return new F(a.top,a.right,a.bottom,a.left)
    };
    l = F.prototype;
    l.contains = function(a) {
        return this && a ? a instanceof F ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    }
    ;
    l.expand = function(a, b, c, d) {
        Ra(a) ? (this.top -= a.top,
        this.right += a.right,
        this.bottom += a.bottom,
        this.left -= a.left) : (this.top -= a,
        this.right += Number(b),
        this.bottom += Number(c),
        this.left -= Number(d));
        return this
    }
    ;
    l.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    }
    ;
    l.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    }
    ;
    l.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    }
    ;
    var bj = function(a, b, c) {
        b instanceof ah ? (a.left += b.x,
        a.right += b.x,
        a.top += b.y,
        a.bottom += b.y) : (a.left += b,
        a.right += b,
        "number" === typeof c && (a.top += c,
        a.bottom += c));
        return a
    };
    var cj = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    }
      , dj = function(a) {
        return new F(a.top,a.left + a.width,a.top + a.height,a.left)
    };
    l = cj.prototype;
    l.contains = function(a) {
        return a instanceof ah ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    }
    ;
    l.getSize = function() {
        return new D(this.width,this.height)
    }
    ;
    l.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    l.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    l.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    function ej(a) {
        var b = Ja.apply(1, arguments);
        if (0 === b.length)
            return Rg(a[0]);
        for (var c = a[0], d = 0; d < b.length; d++)
            c += encodeURIComponent(b[d]) + a[d + 1];
        return Rg(c)
    }
    ;function fj(a) {
        for (var b = Ja.apply(1, arguments), c = a[0], d = 0; d < a.length - 1; d++)
            c += String(b[d]) + a[d + 1];
        if (/[<>]/.test(c))
            throw Error("Forbidden characters in style string: " + c);
        return new Wg(c,Vg)
    }
    ;function gj(a) {
        a = void 0 === a ? w : a;
        var b = a.context || a.AMP_CONTEXT_DATA;
        if (!b)
            try {
                b = a.parent.context || a.parent.AMP_CONTEXT_DATA
            } catch (e) {}
        var c, d;
        return (null == (c = b) ? 0 : c.pageViewId) && (null == (d = b) ? 0 : d.canonicalUrl) ? b : null
    }
    ;var hj = function() {
        this.S = {}
    }
      , ij = function() {
        var a = gj(window);
        if (a) {
            if (a) {
                var b = a.pageViewId;
                a = a.clientId;
                "string" === typeof a && (b += a.replace(/\D/g, "").substr(0, 6))
            } else
                b = null;
            return +b
        }
        b = hi(window);
        a = b.google_global_correlator;
        a || (b.google_global_correlator = a = 1 + Math.floor(Math.random() * Math.pow(2, 43)));
        return a
    }
      , kj = function(a, b) {
        var c = jj[7] || "google_ps_7";
        a = a.S;
        var d = a[c];
        return void 0 === d ? (a[c] = b(),
        a[c]) : d
    }
      , lj = function(a) {
        var b = ij();
        return kj(a, function() {
            return b
        })
    }
      , nj = function() {
        if (mj)
            var a = mj;
        else {
            a = ((a = void 0 === a ? gj() : a) ? Vh(a.master) ? a.master : null : null) || window;
            var b = a.google_persistent_state_async;
            a = null != b && "object" == typeof b && null != b.S && "object" == typeof b.S ? mj = b : a.google_persistent_state_async = mj = new hj
        }
        return lj(a)
    }
      , mj = null
      , oj = {}
      , jj = (oj[8] = "google_prev_ad_formats_by_region",
    oj[9] = "google_prev_ad_slotnames_by_region",
    oj);
    var pj = ha(["https://pagead2.googlesyndication.com/pagead/js/err_rep.js"])
      , qj = function() {
        var a = void 0 === a ? "jserror" : a;
        var b = void 0 === b ? .01 : b;
        var c = void 0 === c ? ej(pj) : c;
        this.h = a;
        this.j = !1;
        this.g = null;
        this.o = !1;
        this.B = Math.random();
        this.l = b;
        this.A = this.Sa;
        this.H = c
    };
    l = qj.prototype;
    l.Ed = function(a) {
        this.h = a
    }
    ;
    l.Qc = function(a) {
        this.g = a
    }
    ;
    l.Fd = function(a) {
        this.j = a
    }
    ;
    l.Gd = function(a) {
        this.o = a
    }
    ;
    l.Sa = function(a, b, c, d, e) {
        c = void 0 === c ? this.l : c;
        e = void 0 === e ? this.h : e;
        if ((this.o ? this.B : Math.random()) > c)
            return this.j;
        jg(b) || (b = new ig(b,{
            context: a,
            id: e
        }));
        if (d || this.g)
            b.meta = {},
            this.g && this.g(b.meta),
            d && d(b.meta);
        w.google_js_errors = w.google_js_errors || [];
        w.google_js_errors.push(b);
        w.error_rep_loaded || (b = w.document,
        a = gi("SCRIPT", b),
        Th(a, this.H),
        (b = b.getElementsByTagName("script")[0]) && b.parentNode && b.parentNode.insertBefore(a, b),
        w.error_rep_loaded = !0);
        return this.j
    }
    ;
    l.tb = function(a, b, c) {
        try {
            return b()
        } catch (d) {
            if (!this.A(a, d, this.l, c, this.h))
                throw d;
        }
    }
    ;
    l.wd = function(a, b, c, d) {
        var e = this;
        return function() {
            var f = Ja.apply(0, arguments);
            return e.tb(a, function() {
                return b.apply(c, f)
            }, d)
        }
    }
    ;
    var rj = function(a) {
        return a.prerendering ? 3 : {
            visible: 1,
            hidden: 2,
            prerender: 3,
            preview: 4,
            unloaded: 5
        }[a.visibilityState || a.webkitVisibilityState || a.mozVisibilityState || ""] || 0
    }
      , sj = function(a) {
        var b;
        a.visibilityState ? b = "visibilitychange" : a.mozVisibilityState ? b = "mozvisibilitychange" : a.webkitVisibilityState && (b = "webkitvisibilitychange");
        return b
    };
    var tj = function(a) {
        a = a._google_rum_ns_ = a._google_rum_ns_ || {};
        return a.pq = a.pq || []
    };
    function uj(a) {
        a = null === a ? "null" : void 0 === a ? "undefined" : a;
        var b = Og();
        a = b ? b.createHTML(a) : a;
        return new Zg(a,Yg)
    }
    ;function vj(a, b, c) {
        ai(b, function(d, e) {
            var f = c && c[e];
            !d && 0 !== d || f || (a += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(String(d)),
            c && (c[e] = !0))
        });
        return a
    }
    var Bj = function(a, b, c, d, e, f, g, h) {
        f = void 0 === f ? Infinity : f;
        g = void 0 === g ? !1 : g;
        xi.call(this, a, h);
        var k = this;
        this.I = b;
        this.domain = c;
        this.path = d;
        this.V = e;
        this.K = 0;
        this.l = {};
        this.G = {};
        this.aa = [];
        this.report = {};
        this.h = 0;
        this.F = [];
        this.M = f;
        this.I = b;
        this.domain = c;
        this.path = d;
        this.V = e;
        a = this.g.navigator;
        this.Z = !("csi.gstatic.com" !== this.domain || !a || !a.sendBeacon);
        this.g.performance && this.g.performance.now || wj(this, "dat", 1);
        a && a.deviceMemory && wj(this, "dmc", a.deviceMemory);
        this.g === this.g.top && wj(this, "top", 1);
        this.X = !g;
        this.O = function() {
            k.g.setTimeout(function() {
                xj(k)
            }, 1100)
        }
        ;
        this.U = function() {
            wj(k, "uet", 2);
            for (var n = r(k.aa), q = n.next(); !q.done; q = n.next()) {
                q = q.value;
                try {
                    q()
                } catch (v) {}
            }
            n = k.g;
            var t = void 0 === t ? {} : t;
            "function" === typeof window.CustomEvent ? q = new CustomEvent("rum_blp",t) : (q = document.createEvent("CustomEvent"),
            q.initCustomEvent("rum_blp", !!t.bubbles, !!t.cancelable, t.detail));
            n.dispatchEvent(q);
            xj(k);
            null != k.l.uet && (k.o -= 3 + k.l.uet.length + 2,
            delete k.l.uet)
        }
        ;
        this.ha = og(function() {
            xj(k)
        });
        this.ba = function() {
            var n = k.g.document;
            (null != n.hidden ? n.hidden : null != n.mozHidden ? n.mozHidden : null != n.webkitHidden && n.webkitHidden) && k.ha()
        }
        ;
        this.D = this.g.setTimeout(function() {
            xj(k)
        }, 5E3);
        this.o = b.length + c.length + d.length + e.length + 3;
        Nb(this.A, function(n) {
            yj(k, n)
        });
        b = tj(this.g);
        var m = function() {
            var n = Ja.apply(0, arguments)[0]
              , q = n[0];
            n = n[1];
            var t = q.length + n.length + 2;
            8E3 < k.o + k.h + t && xj(k);
            k.F.push([q, n]);
            k.h += t;
            zj(k);
            return 0
        };
        Nb(b, function(n) {
            return m(n)
        });
        b.length = 0;
        b.push = m;
        wj(this, "puid", (this.K + 1).toString(36) + "~" + Date.now().toString(36));
        Aj(this)
    };
    u(Bj, xi);
    var Aj = function(a) {
        "complete" === a.g.document.readyState ? a.g.setTimeout(function() {
            xj(a)
        }, 0) : rg(a.g, "load", a.O);
        var b = sj(a.g.document);
        "undefined" !== typeof b && rg(a.g, b, a.ba);
        rg(a.g, "pagehide", a.U)
    }
      , wj = function(a, b, c) {
        c = String(c);
        a.o = null != a.l[b] ? a.o + (c.length - a.l[b].length) : a.o + (b.length + c.length + 2);
        a.l[b] = c
    }
      , Ej = function(a, b, c, d, e) {
        e = void 0 === e ? "" : e;
        var f = Cj(a, b, c, d, e);
        8E3 < a.o + a.h + f && (xj(a),
        f = b.length + c.length + 2);
        Dj(a, b, c, d, e);
        a.h += f;
        zj(a)
    }
      , Cj = function(a, b, c, d, e) {
        return null == a.report[b] ? b.length + c.length + 2 : d ? c.length + (void 0 === e ? "" : e).length : c.length - a.report[b].length
    }
      , Dj = function(a, b, c, d, e) {
        a.report[b] = d && null != a.report[b] ? a.report[b] + ("" + (void 0 === e ? "" : e) + c) : c
    }
      , zj = function(a) {
        6E3 <= a.o + a.h && xj(a)
    }
      , xj = function(a) {
        if (a.j && a.X) {
            try {
                a.h && (a.sendBeacon(a.report),
                a.K === a.M && a.B())
            } catch (b) {
                (new qj).Sa(358, b)
            }
            a.report = {};
            a.h = 0;
            a.A.length = 0;
            a.g.clearTimeout(a.D);
            a.D = 0
        }
    }
      , Fj = function(a, b) {
        var c = a.I + "//" + a.domain + a.path + a.V
          , d = {};
        c = vj(c, a.l, d);
        c = vj(c, b, d);
        b = a.g;
        b.google_timing_params && (c = vj(c, b.google_timing_params, d),
        b.google_timing_params = void 0);
        Nb(a.F, function(e) {
            var f = r(e);
            e = f.next().value;
            f = f.next().value;
            var g = {};
            c = vj(c, (g[e] = f,
            g))
        });
        a.F.length = 0;
        return c
    };
    Bj.prototype.sendBeacon = function(a) {
        this.K++;
        a = Fj(this, a);
        var b = !1;
        try {
            b = !!(this.Z && this.g.navigator && this.g.navigator.sendBeacon(a, null))
        } catch (c) {
            this.Z = !1
        }
        b || Ni(this.g, a);
        wj(this, "puid", (this.K + 1).toString(36) + "~" + Date.now().toString(36))
    }
    ;
    var yj = function(a, b) {
        var c = "met." + b.type
          , d = "number" === typeof b.value ? Math.round(b.value).toString(36) : b.value
          , e = Math.round(b.duration);
        b = "" + b.label + (null != b.slotId ? "_" + b.slotId : "") + ("." + d) + (0 < e ? "_" + e.toString(36) : "") + (null != b.taskId ? "__" + Math.round(b.taskId).toString(36) : "");
        Ej(a, c, b, !0, "~")
    };
    Bj.prototype.H = function(a) {
        this.j && this.K < this.M && (xi.prototype.H.call(this, a),
        yj(this, a))
    }
    ;
    Bj.prototype.B = function() {
        xi.prototype.B.call(this);
        this.g.clearTimeout(this.D);
        this.h = this.D = 0;
        this.report = {};
        Jg(this.G);
        Jg(this.l);
        sg(this.g, "load", this.O);
        sg(this.g, "pagehide", this.U)
    }
    ;
    var G = function() {
        this.g = new Bj(1,"https:","csi.gstatic.com","/csi?v=2&s=","ima",void 0,!0);
        var a = nj();
        null != a && wj(this.g, "c", a);
        a = parseInt(this.g.l.c, 10) / 2;
        null != a && wj(this.g, "slotId", a)
    }
      , I = function(a, b, c) {
        if (null != c) {
            a = a.g;
            var d = b + "=" + c;
            a.G[d] || (Ej(a, b, c, !1),
            1E3 > d.length && (a.G[d] = !0))
        }
    }
      , Gj = function(a, b) {
        for (var c in b)
            b[c] = "object" === typeof b[c] ? encodeURIComponent(JSON.stringify(b[c])) : encodeURIComponent(String(b[c]));
        a = a.g;
        var d = !1;
        c = 0;
        for (var e = r(Object.keys(b)), f = e.next(); !f.done; f = e.next())
            f = f.value,
            null != a.report[f] && (d = !0),
            c += Cj(a, f, b[f], !1);
        (8E3 < a.o + a.h + c || d) && xj(a);
        d = r(Object.keys(b));
        for (e = d.next(); !e.done; e = d.next())
            e = e.value,
            Dj(a, e, b[e], !1);
        a.h += c;
        zj(a)
    }
      , J = function(a) {
        var b = G.g().g;
        b.j && b.H(new ti(a,4,pi() - 0,0))
    };
    G.prototype.recordClick = function(a, b, c, d) {
        for (var e = !1, f = "notag"; void 0 != d && d != document.documentElement; ) {
            var g = void 0
              , h = void 0;
            if ((null == (g = d) ? 0 : g.getAttribute("data-ck-navigates")) || (null == (h = d) ? 0 : h.getAttribute("data-ck-tag"))) {
                g = f = void 0;
                e = null != (g = null == (f = d) ? void 0 : f.getAttribute("data-ck-navigates")) ? g : !1;
                h = g = void 0;
                f = null != (h = null == (g = d) ? void 0 : g.getAttribute("data-ck-tag")) ? h : "notag";
                break
            }
            g = void 0;
            d = null != (g = d.parentElement) ? g : void 0
        }
        d = this.g;
        d.j && d.H(new ti(a + "_" + b + "x" + c + "|" + e + "|" + f,4,pi(),0))
    }
    ;
    G.g = function() {
        return C(G)
    }
    ;
    var Hj = function(a) {
        return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    }
      , Ij = function(a) {
        try {
            return w.JSON.parse(a)
        } catch (b) {}
        a = String(a);
        if (Hj(a))
            try {
                return eval("(" + a + ")")
            } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }
      , Kj = function() {
        this.g = Jj
    }
      , Lj = function(a, b, c) {
        if (null == b)
            c.push("null");
        else {
            if ("object" == typeof b) {
                if (Array.isArray(b)) {
                    var d = b;
                    b = d.length;
                    c.push("[");
                    for (var e = "", f = 0; f < b; f++)
                        c.push(e),
                        e = d[f],
                        Lj(a, a.g ? a.g.call(d, String(f), e) : e, c),
                        e = ",";
                    c.push("]");
                    return
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean)
                    b = b.valueOf();
                else {
                    c.push("{");
                    f = "";
                    for (d in b)
                        Object.prototype.hasOwnProperty.call(b, d) && (e = b[d],
                        "function" != typeof e && (c.push(f),
                        Mj(d, c),
                        c.push(":"),
                        Lj(a, a.g ? a.g.call(b, d, e) : e, c),
                        f = ","));
                    c.push("}");
                    return
                }
            }
            switch (typeof b) {
            case "string":
                Mj(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                break;
            case "boolean":
                c.push(String(b));
                break;
            case "function":
                c.push("null");
                break;
            default:
                throw Error("Unknown type: " + typeof b);
            }
        }
    }
      , Nj = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\v": "\\u000b"
    }
      , Oj = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g
      , Mj = function(a, b) {
        b.push('"', a.replace(Oj, function(c) {
            var d = Nj[c];
            d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).slice(1),
            Nj[c] = d);
            return d
        }), '"')
    };
    var Pj = function() {
        this.j = null;
        this.g = "missing-id";
        this.h = !1
    }
      , Rj = function(a) {
        var b = null;
        try {
            b = document.getElementsByClassName("lima-exp-data")
        } catch (c) {
            return Qj("missing-element", a.g),
            null
        }
        if (1 < b.length)
            return Qj("multiple-elements", a.g),
            null;
        b = b[0];
        return b ? b.innerHTML : (Qj("missing-element", a.g),
        null)
    }
      , Tj = function() {
        var a = Sj
          , b = Rj(a);
        if (null !== b)
            if (Hj(b)) {
                var c = JSON.parse(b);
                b = c.experimentIds;
                var d = c.binaryIdentifier;
                c = c.adEventId;
                var e = "string" === typeof d;
                if ("string" == typeof c) {
                    var f = G.g();
                    null != c && wj(f.g, "qqid", c)
                }
                e && (a.g = d);
                "string" !== typeof b ? Qj("missing-flags", a.g) : (e || Qj("missing-binary-id", a.g),
                a.j = b)
            } else
                Qj("invalid-json", a.g)
    };
    Pj.prototype.reset = function() {
        this.j = null;
        this.g = "missing-id"
    }
    ;
    var Vj = function(a, b, c, d, e) {
        this.id = a;
        this.C = b;
        this.o = c;
        this.g = !1;
        this.j = d;
        this.h = e;
        this.o && Uj(this)
    }
      , L = function(a) {
        return a.g || a.o
    }
      , Uj = function(a) {
        if (a.j && a.h) {
            var b = a.h;
            (a = a.j) && Object.assign(b.g, a)
        }
    }
      , Wj = function() {
        this.g = []
    }
      , Xj = function() {
        this.g = new Map;
        this.h = !1;
        this.l = new Wj;
        this.A = new Vj(0,0,!1);
        this.j = [this.l];
        this.o = new $i
    }
      , M = function(a) {
        var b = Yj;
        if (b.h || b.g.has(a.id) || null == a.C && null == a.control || 0 == a.tf)
            return b.A;
        var c = b.l;
        if (null != a.control)
            for (var d = r(b.j), e = d.next(); !e.done; e = d.next()) {
                if (e = e.value,
                e.g.includes(a.control)) {
                    c = e;
                    break
                }
            }
        else
            null != a.T && (c = a.T);
        d = 0;
        null != a.control ? d = a.control.C : null != a.C && (d = a.C);
        a = new Vj(a.id,d,!!a.ti,a.flags,b.o);
        c.g.push(a);
        b.j.includes(c) || b.j.push(c);
        b.g.set(a.id, a);
        return a
    }
      , ek = function() {
        var a = Yj;
        return [].concat(ia(a.g.keys())).filter(function(b) {
            return L(this.g.get(b))
        }, a)
    }
      , fk = function(a) {
        var b = Yj;
        b.h || (a.g(b.j, b.g),
        b.h = !0)
    };
    Xj.prototype.reset = function() {
        for (var a = r(this.g), b = a.next(); !b.done; b = a.next())
            b = r(b.value),
            b.next(),
            b.next().value.g = !1;
        this.h = !1;
        this.o.reset()
    }
    ;
    var Yj = new Xj
      , hk = function() {
        return gk.g.filter(function(a) {
            return L(a)
        }).map(function(a) {
            return a.id
        })
    };
    var ik = function() {};
    ik.prototype.g = function(a) {
        a = r(a);
        for (var b = a.next(); !b.done; b = a.next()) {
            var c = 0
              , d = Math.floor(1E3 * Math.random());
            b = r(b.value.g);
            for (var e = b.next(); !e.done; e = b.next())
                if (e = e.value,
                c += e.C,
                d < c) {
                    e.g = !0;
                    Uj(e);
                    break
                }
        }
    }
    ;
    var jk = function(a) {
        this.J = A(a)
    };
    u(jk, B);
    jk.ga = [2, 8];
    var kk = [3, 4, 5];
    var lk = function(a) {
        this.J = A(a)
    };
    u(lk, B);
    lk.ga = [4];
    var mk = function(a) {
        this.J = A(a)
    };
    u(mk, B);
    mk.ga = [5];
    var nk = [1, 2, 3, 6, 7];
    var ok = function(a) {
        this.J = A(a)
    };
    u(ok, B);
    ok.prototype.getId = function() {
        return mf(this, 1)
    }
    ;
    ok.ga = [2];
    var pk = function(a) {
        this.J = A(a)
    };
    u(pk, B);
    pk.ga = [2];
    var qk = function(a) {
        this.J = A(a)
    };
    u(qk, B);
    qk.ga = [2];
    var rk = function(a) {
        this.J = A(a)
    };
    u(rk, B);
    rk.ga = [1, 4, 2, 3];
    var sk = function(a) {
        this.g = a || {
            cookie: ""
        }
    };
    l = sk.prototype;
    l.set = function(a, b, c) {
        var d = !1;
        if ("object" === typeof c) {
            var e = c.Bi;
            d = c.ig || !1;
            var f = c.domain || void 0;
            var g = c.path || void 0;
            var h = c.qe
        }
        if (/[;=\s]/.test(a))
            throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test(b))
            throw Error('Invalid cookie value "' + b + '"');
        void 0 === h && (h = -1);
        this.g.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970,1,1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
    }
    ;
    l.get = function(a, b) {
        for (var c = a + "=", d = (this.g.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
            f = pb(d[e]);
            if (0 == f.lastIndexOf(c, 0))
                return f.slice(c.length);
            if (f == a)
                return ""
        }
        return b
    }
    ;
    l.remove = function(a, b, c) {
        var d = void 0 !== this.get(a);
        this.set(a, "", {
            qe: 0,
            path: b,
            domain: c
        });
        return d
    }
    ;
    l.tc = function() {
        return tk(this).keys
    }
    ;
    l.Bb = function() {
        return tk(this).values
    }
    ;
    l.isEmpty = function() {
        return !this.g.cookie
    }
    ;
    l.clear = function() {
        for (var a = tk(this).keys, b = a.length - 1; 0 <= b; b--)
            this.remove(a[b])
    }
    ;
    var tk = function(a) {
        a = (a.g.cookie || "").split(";");
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
            e = pb(a[f]),
            d = e.indexOf("="),
            -1 == d ? (b.push(""),
            c.push(e)) : (b.push(e.substring(0, d)),
            c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    };
    function uk(a) {
        return "null" !== a.origin
    }
    function vk(a, b, c) {
        b = lf(b, 5) && uk(c) ? c.document.cookie : null;
        return null === b ? null : (new sk({
            cookie: b
        })).get(a) || ""
    }
    ;function wk(a, b) {
        switch (b) {
        case 1:
            return rf(a, 1, nk);
        case 2:
            return rf(a, 2, nk);
        case 3:
            return rf(a, 3, nk);
        case 6:
            return rf(a, 6, nk);
        default:
            return null
        }
    }
    function xk(a, b) {
        if (!a)
            return null;
        switch (b) {
        case 1:
            return lf(a, 1);
        case 7:
            return pf(a, 3);
        case 2:
            var c = void 0 === c ? 0 : c;
            a = a.J;
            b = Kd(a);
            var d = Pe(a, b, 2)
              , e = ee(d);
            null != e && e !== d && Re(a, b, 2, e);
            return kf(e, c);
        case 3:
            return pf(a, 3);
        case 6:
            return Te(a, 4, ye);
        default:
            return null
        }
    }
    ;var yk = {}
      , zk = (yk[47] = Jc,
    yk);
    function Ak() {
        var a = Bk
          , b = df(new rk(Ck), qk, 2);
        1 == b.length && 16 == qf(b[0], 1) && df(b[0], pk, 2).forEach(function(c) {
            var d = nf(c)
              , e = bf(c, jk, 3)
              , f = a[qf(c, 4)];
            df(c, ok, 2).forEach(function(g) {
                var h = d || mf(g, 4)
                  , k = g.getId()
                  , m = e || bf(g, jk, 3);
                m = m ? rf(m, 3, kk) : null;
                m = zk[m];
                g = df(g, mk, 2);
                g = Dk(g);
                M({
                    id: k,
                    C: h,
                    T: f,
                    tf: m,
                    flags: g
                })
            })
        })
    }
    function Dk(a) {
        if (a.length) {
            var b = {};
            a.forEach(function(c) {
                var d = c.J;
                d = $e(d, Kd(d), nk);
                var e = bf(c, lk, 4);
                e && (c = wk(c, d),
                d = xk(e, d),
                b[c] = d)
            });
            return b
        }
    }
    ;var Ek = function(a) {
        this.h = a
    };
    Ek.prototype.g = function(a, b) {
        a = r(this.h);
        for (var c = a.next(); !c.done; c = a.next())
            if (c = b.get(c.value))
                c.g = !0,
                Uj(c)
    }
    ;
    var Fk = function(a, b) {
        this.h = a;
        this.j = b
    };
    u(Fk, Ek);
    Fk.prototype.g = function(a, b) {
        Ek.prototype.g.call(this, a, b);
        var c = [];
        a = [];
        for (var d = r(this.h), e = d.next(); !e.done; e = d.next())
            e = e.value,
            b.get(e) ? c.push(e) : a.push(e);
        b = c.map(String).join(",") || "0";
        a = a.map(String).join(",") || "0";
        I(G.g(), "sei", b);
        I(G.g(), "nsei", a);
        I(G.g(), "bi", this.j)
    }
    ;
    var Gk = function() {
        Pj.apply(this, arguments)
    };
    u(Gk, Pj);
    var Qj = function(a, b) {
        var c = G.g();
        I(c, "eee", a);
        I(c, "bi", b)
    };
    Gk.g = function() {
        return C(Gk)
    }
    ;
    function Hk() {
        return Ik.split(",").map(function(a) {
            return parseInt(a, 10)
        }).filter(function(a) {
            return !isNaN(a)
        })
    }
    ;var gk = new Wj
      , Jk = new Wj
      , Kk = new Wj
      , Lk = new Wj
      , Mk = new Wj
      , Nk = new Wj
      , Ok = new Wj
      , Pk = new Wj
      , Qk = new Wj
      , Rk = new Wj
      , Sk = new Wj
      , Tk = new Wj
      , Uk = new Wj
      , Vk = new Wj
      , Wk = new Wj
      , Xk = new Wj
      , Yk = new Wj;
    M({
        id: 457864198,
        C: 0
    });
    M({
        id: 457864188,
        C: 0
    });
    M({
        id: 45786216,
        C: 10
    });
    M({
        id: 318475490,
        C: 0
    });
    M({
        id: 324123032,
        C: 0
    });
    M({
        id: 418572103,
        C: 0
    });
    M({
        id: 420706097,
        C: 10
    });
    M({
        id: 420706098,
        C: 10
    });
    M({
        id: 21062100,
        C: 0
    });
    M({
        id: 420706105,
        C: 0
    });
    M({
        id: 420706106,
        C: 0
    });
    M({
        id: 21064018,
        C: 0
    });
    M({
        id: 21064020,
        C: 0
    });
    M({
        id: 21064022,
        C: 0
    });
    M({
        id: 21064024,
        C: 0
    });
    M({
        id: 21064075,
        C: 0
    });
    M({
        id: 21064201,
        C: 0
    });
    M({
        id: 420706142,
        C: 0
    });
    M({
        id: 21064347,
        C: 0
    });
    M({
        id: 44745813,
        C: 0
    });
    M({
        id: 44746068,
        C: 0
    });
    M({
        id: 21064565,
        C: 0
    });
    M({
        id: 21064567,
        C: 0
    });
    M({
        id: 418572006,
        C: 10
    });
    M({
        id: 318513471,
        C: 0
    });
    M({
        id: 318513497,
        C: 0
    });
    var Zk = M({
        id: 44768716,
        C: 10,
        T: Sk
    })
      , $k = M({
        id: 44768717,
        C: 10,
        T: Sk
    })
      , al = M({
        id: 44787137,
        C: 0,
        T: Sk
    })
      , bl = M({
        id: 44744588,
        C: 10
    })
      , cl = M({
        id: 44747319,
        C: 10
    });
    M({
        id: 44740339,
        C: 10
    });
    var dl = M({
        id: 44740340,
        C: 10
    });
    M({
        id: 44749839,
        C: 0
    });
    var el = M({
        id: 44749840,
        C: 0
    });
    M({
        id: 44749841,
        C: 0
    });
    var fl = M({
        id: 44749842,
        C: 0
    });
    M({
        id: 44749843,
        C: 1
    });
    var gl = M({
        id: 44749844,
        C: 1
    });
    M({
        id: 44749845,
        C: 1
    });
    var hl = M({
        id: 44749846,
        C: 1
    });
    M({
        id: 44714743,
        C: 0
    });
    M({
        id: 44719216,
        C: 0
    });
    M({
        id: 44730895,
        C: 10
    });
    M({
        id: 44730896,
        C: 10
    });
    M({
        id: 44736292,
        C: 10
    });
    M({
        id: 44736293,
        C: 10
    });
    M({
        id: 44772138,
        C: 0,
        T: Mk
    });
    M({
        id: 44772139,
        T: Mk,
        C: 1E3
    });
    M({
        id: 31061774,
        C: 10
    });
    var il = M({
        id: 31061775,
        C: 10
    });
    M({
        id: 44715336,
        C: 10
    });
    M({
        id: 75259410,
        C: 0
    });
    M({
        id: 75259412,
        C: 0
    });
    M({
        id: 75259413,
        C: 0
    });
    M({
        id: 44773378,
        C: 10,
        T: Kk
    });
    var jl = M({
        id: 44773379,
        C: 10,
        T: Kk
    });
    M({
        id: 44724516,
        C: 0
    });
    M({
        id: 44726389,
        C: 10
    });
    M({
        id: 44752711,
        C: 50
    });
    M({
        id: 44752052,
        C: 50
    });
    M({
        id: 44752657,
        C: 50
    });
    M({
        id: 44781407,
        T: Lk,
        C: 0
    });
    M({
        id: 44781408,
        T: Lk,
        C: 0
    });
    M({
        id: 44781409,
        T: Lk,
        C: 1E3
    });
    M({
        id: 44777647,
        T: Nk,
        C: 0
    });
    M({
        id: 44777648,
        T: Nk,
        C: 0
    });
    M({
        id: 44777649,
        T: Nk,
        C: 1E3
    });
    M({
        id: 44727953,
        C: 0
    });
    M({
        id: 44782089,
        T: Ok,
        C: 10
    });
    M({
        id: 44782090,
        T: Ok,
        C: 10
    });
    M({
        id: 44733246,
        C: 10
    });
    M({
        id: 44750823,
        C: 10,
        T: Qk
    });
    M({
        id: 44750824,
        C: 10,
        T: Qk
    });
    M({
        id: 44794282,
        C: 10,
        T: Qk
    });
    M({
        id: 44797013,
        C: 10,
        T: Qk
    });
    M({
        id: 44797014,
        C: 10,
        T: Qk
    });
    M({
        id: 44750822,
        C: 10,
        T: Qk
    });
    M({
        id: 44737473,
        C: 0,
        T: Jk
    });
    M({
        id: 44771450,
        C: 0,
        T: Jk
    });
    M({
        id: 44751889,
        C: 10
    });
    M({
        id: 44751890,
        C: 10
    });
    M({
        id: 44752995,
        C: 10
    });
    M({
        id: 44752996,
        C: 10
    });
    M({
        id: 44762627,
        C: 0
    });
    M({
        id: 44762628,
        C: 0
    });
    M({
        id: 44801479,
        C: 10,
        T: Rk
    });
    M({
        id: 44801480,
        C: 10,
        T: Rk
    });
    M({
        id: 44752538,
        C: 0
    });
    M({
        id: 44754608,
        C: 10
    });
    M({
        id: 44754609,
        C: 10
    });
    M({
        id: 44770822,
        C: 10
    });
    M({
        id: 44770823,
        C: 10
    });
    M({
        id: 44770824,
        C: 10
    });
    M({
        id: 44770825,
        C: 10
    });
    M({
        id: 75259414,
        C: 0
    });
    M({
        id: 44731964,
        C: 50,
        T: gk
    });
    M({
        id: 44731965,
        C: 50,
        T: gk
    });
    M({
        id: 44767584,
        C: 0
    });
    var kl, ll = (null == (kl = window.document.featurePolicy) ? 0 : kl.allowedFeatures().includes("attribution-reporting")) ? 300 : 0;
    M({
        id: 44776494,
        C: ll,
        T: Tk
    });
    M({
        id: 44776495,
        C: ll,
        T: Tk
    });
    var ml, nl = (null == (ml = window.document.featurePolicy) || ml.allowedFeatures().includes("attribution-reporting"),
    0);
    M({
        id: 44769484,
        C: nl,
        T: Uk
    });
    M({
        id: 44769485,
        C: nl,
        T: Uk
    });
    M({
        id: 44776384,
        C: 0
    });
    M({
        id: 95322945,
        C: 10
    });
    var ol = M({
        id: 95322946,
        C: 10
    });
    M({
        id: 44787954,
        C: 0
    });
    M({
        id: 44789282,
        C: 0
    });
    M({
        id: 44792636,
        C: 0
    });
    M({
        id: 44794298,
        C: 0
    });
    M({
        id: 44803996,
        C: 0
    });
    M({
        id: 44805453,
        C: 0
    });
    M({
        id: 44804917,
        C: 0
    });
    M({
        id: 44809796,
        C: 0
    });
    M({
        id: 75259415,
        C: 0
    });
    var pl = M({
        id: 75259416,
        C: 0
    })
      , ql = M({
        id: 75259420,
        C: 0
    })
      , rl = M({
        id: 75259421,
        C: 0
    });
    M({
        id: 44785452,
        C: 10
    });
    M({
        id: 44785453,
        C: 10
    });
    M({
        id: 45401791,
        C: 0
    });
    M({
        id: 44795414,
        C: 1,
        T: Vk
    });
    var sl = M({
        id: 44795415,
        C: 1,
        T: Vk
    })
      , tl = M({
        id: 44795416,
        C: 1,
        T: Vk
    })
      , ul = M({
        id: 44795417,
        C: 1,
        T: Vk
    });
    M({
        id: 44805102,
        C: 5,
        T: Wk
    });
    var vl = M({
        id: 44805103,
        C: 5,
        T: Wk
    })
      , wl = M({
        id: 44805104,
        C: 5,
        T: Wk
    })
      , xl = M({
        id: 44805105,
        C: 5,
        T: Wk
    })
      , yl = M({
        id: 44805106,
        C: 5,
        T: Wk
    });
    M({
        id: 44806631,
        C: 50,
        T: Xk
    });
    M({
        id: 44806632,
        C: 50,
        T: Xk
    });
    M({
        id: 44802172,
        C: 10
    });
    var zl = M({
        id: 44802173,
        C: 10
    });
    M({
        id: 44805638,
        C: 10
    });
    M({
        id: 44805639,
        C: 10
    });
    M({
        id: 44805640,
        C: 10
    });
    M({
        id: 44806074,
        C: 50
    });
    M({
        id: 44806075,
        C: 50
    });
    M({
        id: 44806732,
        C: 10
    });
    M({
        id: 44806733,
        C: 10
    });
    var Al = window.navigator || {}
      , Bl = Al.cookieDeprecationLabel ? 990 : 0;
    M({
        id: 95322906,
        C: Al.cookieDeprecationLabel ? 10 : 0,
        T: Yk
    });
    var Cl = M({
        id: 95320461,
        C: 0,
        T: Yk
    })
      , Dl = M({
        id: 95322907,
        C: Bl,
        T: Yk
    });
    M({
        id: 44807614,
        C: 10
    });
    M({
        id: 44807615,
        C: 10
    });
    M({
        id: 95322545,
        C: 10
    });
    var El = M({
        id: 95322546,
        C: 10
    })
      , Fl = M({
        id: 95322547,
        C: 10
    })
      , Gl = M({
        id: 95322548,
        C: 10
    });
    M({
        id: 44809192,
        C: 5
    });
    M({
        id: 44809193,
        C: 5
    });
    M({
        id: 31079198,
        C: 1
    });
    var Hl = M({
        id: 31079199,
        C: 1
    });
    M({
        id: 95321946,
        C: 10
    });
    M({
        id: 95321947,
        C: 10
    });
    M({
        id: 95321698,
        C: 0
    });
    var Il = M({
        id: 95321699,
        C: 0
    });
    M({
        id: 95322026,
        C: 10
    });
    M({
        id: 95322027,
        C: 10
    });
    M({
        id: 95321700,
        C: 0
    });
    var Jl = M({
        id: 95321701,
        C: 0
    })
      , Kl = {}
      , Bk = (Kl[32] = gk,
    Kl[35] = Pk,
    Kl);
    Bk = void 0 === Bk ? {} : Bk;
    if (!/^\{+IMA_EXPERIMENT_STATE_JSPB\}+$/.test("{{IMA_EXPERIMENT_STATE_JSPB}}"))
        try {
            var Ck = JSON.parse("{{IMA_EXPERIMENT_STATE_JSPB}}");
            Ck instanceof Array && Ak()
        } catch (a) {
            I(G.g(), "espe", a.message)
        }
    if ("undefined" === typeof window.v8_flag_map) {
        var Sj = Gk.g();
        Sj.h || (Tj(),
        Sj.h = !0);
        var Ik = Sj.j, Ll;
        Sj.h || (Tj(),
        Sj.h = !0);
        Ll = Sj.g;
        if (null != Ik) {
            var Ml = new Fk(Hk(),Ll);
            fk(Ml)
        }
    }
    ;Yj.reset();
    fk(new ik);
    var Nl = function(a) {
        var b = {};
        Nb(a, function(c) {
            var d = c.g
              , e = b[d];
            b.hasOwnProperty(d) ? null !== e && (c.h(e) || (b[d] = null)) : b[d] = c
        });
        Zb(a, function(c) {
            return null === b[c.g]
        })
    };
    var Ol = {
        NONE: 0,
        Sg: 1
    }
      , Pl = {
        Qg: 0,
        Mh: 1,
        Lh: 2,
        Nh: 3
    }
      , Ql = {
        Ie: "a",
        Rg: "d",
        mf: "v"
    };
    var Rl = function() {
        this.Y = 0;
        this.g = !1;
        this.h = -1;
        this.rb = !1;
        this.sa = 0
    };
    Rl.prototype.isVisible = function() {
        return this.rb ? .3 <= this.Y : .5 <= this.Y
    }
    ;
    var Sl = {
        Pg: 0,
        Vg: 1
    }
      , Tl = {
        668123728: 0,
        668123729: 1
    }
      , Ul = {
        44731964: 0,
        44731965: 1
    }
      , Vl = {
        NONE: 0,
        wh: 1,
        ah: 2
    }
      , Wl = {
        480596784: 0,
        480596785: 1,
        21063355: 2
    };
    var Xl = function() {
        this.g = null;
        this.o = !1;
        this.j = null
    }
      , Yl = function(a) {
        a.o = !0;
        return a
    }
      , Zl = function(a, b) {
        a.j && Nb(b, function(c) {
            c = a.j[c];
            void 0 !== c && a.h(c)
        })
    };
    Xl.prototype.getValue = function() {
        return this.g
    }
    ;
    var $l = function(a) {
        Xl.call(this);
        this.l = a
    };
    u($l, Xl);
    $l.prototype.h = function(a) {
        null === this.g && Fg(this.l, a) && (this.g = a)
    }
    ;
    var am = function() {
        Xl.call(this)
    };
    u(am, Xl);
    am.prototype.h = function(a) {
        null === this.g && "number" === typeof a && (this.g = a)
    }
    ;
    var bm = function() {
        Xl.call(this)
    };
    u(bm, Xl);
    bm.prototype.h = function(a) {
        null === this.g && "string" === typeof a && (this.g = a)
    }
    ;
    var cm = function() {
        this.g = {};
        this.j = !0;
        this.h = {}
    };
    cm.prototype.reset = function() {
        this.g = {};
        this.j = !0;
        this.h = {}
    }
    ;
    var dm = function(a, b, c) {
        a.g[b] || (a.g[b] = new $l(c));
        return a.g[b]
    }
      , em = function(a) {
        a.g.queryid || (a.g.queryid = new bm)
    }
      , fm = function(a, b, c) {
        (a = a.g[b]) && a.h(c)
    }
      , gm = function(a, b) {
        if (Eg(a.h, b))
            return a.h[b];
        if (a = a.g[b])
            return a.getValue()
    }
      , hm = function(a) {
        var b = {}
          , c = yg(a.g, function(d) {
            return d.o
        });
        xg(c, function(d, e) {
            d = void 0 !== a.h[e] ? String(a.h[e]) : d.o && null !== d.g ? String(d.g) : "";
            0 < d.length && (b[e] = d)
        }, a);
        return b
    }
      , im = function(a) {
        a = hm(a);
        var b = [];
        xg(a, function(c, d) {
            d in Object.prototype || "undefined" != typeof c && b.push([d, ":", c].join(""))
        });
        return b
    }
      , jm = function() {
        var a = N().P
          , b = hk();
        a.j && Nb(Bg(a.g), function(c) {
            return Zl(c, b)
        })
    };
    var km = function(a) {
        dm(a, "od", Ol);
        Yl(dm(a, "opac", Sl));
        Yl(dm(a, "sbeos", Sl));
        Yl(dm(a, "prf", Sl));
        Yl(dm(a, "mwt", Sl));
        dm(a, "iogeo", Sl)
    };
    var lm = document
      , O = window;
    var mm = !kc && !Gb();
    var nm = function() {
        this.g = this.gb = null
    };
    var om = function() {};
    om.prototype.now = function() {
        return 0
    }
    ;
    om.prototype.h = function() {
        return 0
    }
    ;
    om.prototype.j = function() {
        return 0
    }
    ;
    om.prototype.g = function() {
        return 0
    }
    ;
    var qm = function() {
        if (!pm())
            throw Error();
    };
    u(qm, om);
    var pm = function() {
        return !(!O || !O.performance)
    };
    qm.prototype.now = function() {
        return pm() && O.performance.now ? O.performance.now() : om.prototype.now.call(this)
    }
    ;
    qm.prototype.h = function() {
        return pm() && O.performance.memory ? O.performance.memory.totalJSHeapSize || 0 : om.prototype.h.call(this)
    }
    ;
    qm.prototype.j = function() {
        return pm() && O.performance.memory ? O.performance.memory.usedJSHeapSize || 0 : om.prototype.j.call(this)
    }
    ;
    qm.prototype.g = function() {
        return pm() && O.performance.memory ? O.performance.memory.jsHeapSizeLimit || 0 : om.prototype.g.call(this)
    }
    ;
    var rm = function() {};
    rm.prototype.isVisible = function() {
        return 1 === rj(lm)
    }
    ;
    var sm = function(a, b) {
        this.g = a;
        this.depth = b
    }
      , um = function() {
        var a = ji()
          , b = Math.max(a.length - 1, 0)
          , c = ni(a);
        a = c.g;
        var d = c.h
          , e = c.j
          , f = [];
        c = function(h, k) {
            return null == h ? k : h
        }
        ;
        e && f.push(new sm([e.url, e.jd ? 2 : 0],c(e.depth, 1)));
        d && d != e && f.push(new sm([d.url, 2],0));
        a.url && a != e && f.push(new sm([a.url, 0],c(a.depth, b)));
        var g = Qb(f, function(h, k) {
            return f.slice(0, f.length - k)
        });
        !a.url || (e || d) && a != e || (d = ci(a.url)) && g.push([new sm([d, 1],c(a.depth, b))]);
        g.push([]);
        return Qb(g, function(h) {
            return tm(b, h)
        })
    };
    function tm(a, b) {
        var c = Rb(b, function(e, f) {
            return Math.max(e, f.depth)
        }, -1)
          , d = ec(c + 2);
        d[0] = a;
        Nb(b, function(e) {
            return d[e.depth + 1] = e.g
        });
        return d
    }
    function vm() {
        var a = void 0 === a ? um() : a;
        return a.map(function(b) {
            return Bi(b)
        })
    }
    ;var wm = function() {
        this.h = new rm;
        this.g = pm() ? new qm : new om
    }
      , ym = function() {
        xm();
        var a = O.document;
        return !!(a && a.body && a.body.getBoundingClientRect && "function" === typeof O.setInterval && "function" === typeof O.clearInterval && "function" === typeof O.setTimeout && "function" === typeof O.clearTimeout)
    };
    wm.prototype.setTimeout = function(a, b) {
        return O.setTimeout(a, b)
    }
    ;
    wm.prototype.clearTimeout = function(a) {
        O.clearTimeout(a)
    }
    ;
    var zm = function() {
        xm();
        return vm()
    };
    var Am = function() {}
      , xm = function() {
        var a = C(Am);
        if (!a.g) {
            if (!O)
                throw Error("Context has not been set and window is undefined.");
            a.g = C(wm)
        }
        return a.g
    };
    var Bm = function(a) {
        this.J = A(a)
    };
    u(Bm, B);
    Bm.prototype.g = eg([0, Pf, Sf, -2, Wf]);
    var Cm = function(a) {
        this.j = a;
        this.g = -1;
        this.h = this.o = 0
    }
      , Dm = function(a, b) {
        return function() {
            var c = Ja.apply(0, arguments);
            if (-1 < a.g)
                return b.apply(null, ia(c));
            try {
                return a.g = a.j.g.now(),
                b.apply(null, ia(c))
            } finally {
                a.o += a.j.g.now() - a.g,
                a.g = -1,
                a.h += 1
            }
        }
    };
    var Em = function(a, b) {
        this.h = a;
        this.j = b;
        this.g = new Cm(a)
    };
    var Fm = function() {
        this.g = {}
    }
      , Hm = function() {
        var a = N().flags
          , b = Gm;
        a = a.g[b.key];
        if ("proto" === b.valueType) {
            try {
                var c = JSON.parse(a);
                if (Array.isArray(c))
                    return c
            } catch (d) {}
            return b.defaultValue
        }
        return typeof a === typeof b.defaultValue ? a : b.defaultValue
    };
    var Im = {
        Hh: 1,
        ei: 2,
        Bh: 3
    };
    var Jm = function() {
        this.j = void 0;
        this.h = this.A = 0;
        this.l = -1;
        this.P = new cm;
        Yl(dm(this.P, "mv", Vl)).j = void 0 === Wl ? null : Wl;
        dm(this.P, "omid", Sl);
        Yl(dm(this.P, "epoh", Sl));
        Yl(dm(this.P, "epph", Sl));
        Yl(dm(this.P, "umt", Sl)).j = void 0 === Tl ? null : Tl;
        Yl(dm(this.P, "phel", Sl));
        Yl(dm(this.P, "phell", Sl));
        Yl(dm(this.P, "oseid", Im));
        var a = this.P;
        a.g.sloi || (a.g.sloi = new am);
        Yl(a.g.sloi);
        dm(this.P, "mm", Ql);
        Yl(dm(this.P, "ovms", Pl));
        Yl(dm(this.P, "xdi", Sl));
        Yl(dm(this.P, "amp", Sl));
        Yl(dm(this.P, "prf", Sl));
        Yl(dm(this.P, "gtx", Sl));
        Yl(dm(this.P, "mvp_lv", Sl));
        Yl(dm(this.P, "ssmol", Sl)).j = void 0 === Ul ? null : Ul;
        Yl(dm(this.P, "fmd", Sl));
        dm(this.P, "gen204simple", Sl);
        this.g = new Em(xm(),this.P);
        this.o = !1;
        this.flags = new Fm
    };
    Jm.prototype.ud = function(a) {
        if ("string" === typeof a && 0 != a.length) {
            var b = this.P;
            if (b.j) {
                a = a.split("&");
                for (var c = a.length - 1; 0 <= c; c--) {
                    var d = a[c].split("=")
                      , e = decodeURIComponent(d[0]);
                    1 < d.length ? (d = decodeURIComponent(d[1]),
                    d = /^[0-9]+$/g.exec(d) ? parseInt(d, 10) : d) : d = 1;
                    (e = b.g[e]) && e.h(d)
                }
            }
        }
    }
    ;
    var N = function() {
        return C(Jm)
    };
    var Km = function(a, b, c, d, e) {
        if ((d ? a.j : Math.random()) < (e || a.g))
            try {
                if (c instanceof zi)
                    var f = c;
                else
                    f = new zi,
                    ai(c, function(h, k) {
                        var m = f
                          , n = m.o++;
                        Di(m, n, Ai(k, h))
                    });
                var g = Gi(f, a.h, "/pagead/gen_204?id=" + b + "&");
                g && (xm(),
                Ni(O, g))
            } catch (h) {}
    };
    var Nm = function() {
        var a = Lm;
        this.A = Mm;
        this.l = "jserror";
        this.j = !0;
        this.h = null;
        this.B = this.Sa;
        this.g = void 0 === a ? null : a;
        this.o = !1
    };
    l = Nm.prototype;
    l.Qc = function(a) {
        this.h = a
    }
    ;
    l.Ed = function(a) {
        this.l = a
    }
    ;
    l.Fd = function(a) {
        this.j = a
    }
    ;
    l.Gd = function(a) {
        this.o = a
    }
    ;
    l.tb = function(a, b, c) {
        var d = this;
        return Dm(N().g.g, function() {
            try {
                if (d.g && d.g.j) {
                    var e = d.g.start(a.toString(), 3);
                    var f = b();
                    d.g.end(e)
                } else
                    f = b()
            } catch (h) {
                var g = d.j;
                try {
                    yi(e),
                    g = d.B(a, new Om(Pm(h)), void 0, c)
                } catch (k) {
                    d.Sa(217, k)
                }
                if (!g)
                    throw h;
            }
            return f
        })()
    }
    ;
    l.wd = function(a, b, c, d) {
        var e = this;
        return Dm(N().g.g, function() {
            var f = Ja.apply(0, arguments);
            return e.tb(a, function() {
                return b.apply(c, f)
            }, d)
        })
    }
    ;
    l.Sa = function(a, b, c, d, e) {
        e = e || this.l;
        try {
            var f = new zi;
            Ei(f, 1, "context", a);
            jg(b) || (b = new Om(Pm(b)));
            b.msg && Ei(f, 2, "msg", b.msg.substring(0, 512));
            var g = b.meta || {};
            if (this.h)
                try {
                    this.h(g)
                } catch (k) {}
            if (d)
                try {
                    d(g)
                } catch (k) {}
            Di(f, 3, [g]);
            var h = ni();
            h.h && Ei(f, 4, "top", h.h.url || "");
            Di(f, 5, [{
                url: h.g.url || ""
            }, {
                url: h.g.url ? Ih(h.g.url) : ""
            }]);
            Km(this.A, e, f, this.o, c)
        } catch (k) {
            try {
                Km(this.A, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: Pm(k),
                    url: h && h.g.url
                }, this.o, c)
            } catch (m) {}
        }
        return this.j
    }
    ;
    var Pm = function(a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                for (var d; a != d; )
                    d = a,
                    a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                b = a.replace(/\n */g, "\n")
            } catch (e) {
                b = c
            }
        }
        return b
    }
      , Om = function(a) {
        ig.call(this, Error(a), {
            message: a
        })
    };
    u(Om, ig);
    var Mm, Qm, Lm = new xi(1,window), Rm = function() {
        O && "undefined" != typeof O.google_measure_js_timing && (O.google_measure_js_timing || Lm.B())
    };
    Mm = new function() {
        var a = "https:";
        O && O.location && "http:" === O.location.protocol && (a = "http:");
        this.h = a;
        this.g = .01;
        this.j = Math.random()
    }
    ;
    Qm = new Nm;
    O && O.document && ("complete" == O.document.readyState ? Rm() : Lm.j && rg(O, "load", function() {
        Rm()
    }));
    var Sm = function(a) {
        Qm.Qc(function(b) {
            Nb(a, function(c) {
                c(b)
            })
        })
    }
      , Tm = function(a, b) {
        return Qm.tb(a, b)
    }
      , Um = function(a, b, c, d) {
        return Qm.wd(a, b, c, d)
    }
      , Vm = function(a, b, c, d) {
        Qm.Sa(a, b, c, d)
    };
    var Wm = Date.now(), Xm = -1, Ym = -1, Zm, $m = -1, an = !1, bn = function() {
        return Date.now() - Wm
    }, cn = function() {
        var a = N().j
          , b = 0 <= Ym ? bn() - Ym : -1
          , c = an ? bn() - Xm : -1
          , d = 0 <= $m ? bn() - $m : -1;
        if (947190542 == a)
            return 100;
        if (79463069 == a)
            return 200;
        a = [2E3, 4E3];
        var e = [250, 500, 1E3];
        Vm(637, Error(), .001);
        var f = b;
        -1 != c && c < b && (f = c);
        for (b = 0; b < a.length; ++b)
            if (f < a[b]) {
                var g = e[b];
                break
            }
        void 0 === g && (g = e[a.length]);
        return -1 != d && 1500 < d && 4E3 > d ? 500 : g
    };
    var dn = function(a, b, c) {
        var d = new F(0,0,0,0);
        this.time = a;
        this.volume = null;
        this.j = b;
        this.g = d;
        this.h = c
    };
    var en = function(a, b, c, d, e, f, g) {
        this.j = a;
        this.h = b;
        this.l = c;
        this.g = d;
        this.o = e;
        this.B = f;
        this.A = g
    };
    en.prototype.getTimestamp = function() {
        return this.B
    }
    ;
    var fn = {
        currentTime: 1,
        duration: 2,
        isVpaid: 4,
        volume: 8,
        isYouTube: 16,
        isPlaying: 32
    }
      , Hg = {
        Ud: "start",
        FIRST_QUARTILE: "firstquartile",
        MIDPOINT: "midpoint",
        THIRD_QUARTILE: "thirdquartile",
        COMPLETE: "complete",
        ERROR: "error",
        We: "metric",
        Td: "pause",
        gf: "resume",
        SKIPPED: "skip",
        VIEWABLE_IMPRESSION: "viewable_impression",
        Xe: "mute",
        lf: "unmute",
        FULLSCREEN: "fullscreen",
        Se: "exitfullscreen",
        Ne: "bufferstart",
        Me: "bufferfinish",
        Od: "fully_viewable_audible_half_duration_impression",
        Sd: "measurable_impression",
        He: "abandon",
        Nd: "engagedview",
        IMPRESSION: "impression",
        Pe: "creativeview",
        LOADED: "loaded",
        Jh: "progress",
        Jg: "close",
        Kg: "collapse",
        Ye: "overlay_resize",
        Ze: "overlay_unmeasurable_impression",
        af: "overlay_unviewable_impression",
        cf: "overlay_viewable_immediate_impression",
        bf: "overlay_viewable_end_of_session_impression",
        Qe: "custom_metric_viewable",
        Je: "audio_audible",
        Le: "audio_measurable",
        Ke: "audio_impression"
    }
      , gn = "start firstquartile midpoint thirdquartile resume loaded".split(" ")
      , hn = ["start", "firstquartile", "midpoint", "thirdquartile"]
      , jn = ["abandon"]
      , kn = {
        Zh: -1,
        Ud: 0,
        FIRST_QUARTILE: 1,
        MIDPOINT: 2,
        THIRD_QUARTILE: 3,
        COMPLETE: 4,
        We: 5,
        Td: 6,
        gf: 7,
        SKIPPED: 8,
        VIEWABLE_IMPRESSION: 9,
        Xe: 10,
        lf: 11,
        FULLSCREEN: 12,
        Se: 13,
        Od: 14,
        Sd: 15,
        He: 16,
        Nd: 17,
        IMPRESSION: 18,
        Pe: 19,
        LOADED: 20,
        Qe: 21,
        Ne: 22,
        Me: 23,
        Ke: 27,
        Le: 28,
        Je: 29
    };
    var Ag = {
        Dg: "addEventListener",
        bh: "getMaxSize",
        eh: "getScreenSize",
        fh: "getState",
        gh: "getVersion",
        Kh: "removeEventListener",
        xh: "isViewable"
    }
      , ln = function(a) {
        var b = a !== a.top
          , c = a.top === hi(a)
          , d = -1
          , e = 0;
        if (b && c && a.top.mraid) {
            d = 3;
            var f = a.top.mraid
        } else
            d = (f = a.mraid) ? b ? c ? 2 : 1 : 0 : -1;
        f && (f.IS_GMA_SDK || (e = 2),
        zg(function(g) {
            return "function" === typeof f[g]
        }) || (e = 1));
        return {
            Ba: f,
            kc: e,
            og: d
        }
    };
    var mn = function() {
        var a = window.document;
        return a && "function" === typeof a.elementFromPoint
    };
    function nn(a, b, c) {
        try {
            a && (b = b.top);
            var d = b;
            a && null !== d && d != d.top && (d = d.top);
            try {
                var e = (void 0 === c ? 0 : c) ? (new D(d.innerWidth,d.innerHeight)).round() : vh(d || window).round()
            } catch (n) {
                e = new D(-12245933,-12245933)
            }
            a = e;
            var f = a.height
              , g = a.width;
            if (-12245933 === g)
                return new F(g,g,g,g);
            var h = wh(mh(b.document).g)
              , k = h.x
              , m = h.y;
            return new F(m,k + g,m + f,k)
        } catch (n) {
            return new F(-12245933,-12245933,-12245933,-12245933)
        }
    }
    ;var pn = function(a, b) {
        if ("string" === typeof b)
            (b = on(a, b)) && (a.style[b] = void 0);
        else
            for (var c in b) {
                var d = a
                  , e = b[c]
                  , f = on(d, c);
                f && (d.style[f] = e)
            }
    }
      , qn = {}
      , on = function(a, b) {
        var c = qn[b];
        if (!c) {
            var d = gh(b);
            c = d;
            void 0 === a.style[d] && (d = (nc ? "Webkit" : mc ? "Moz" : kc ? "ms" : null) + ih(d),
            void 0 !== a.style[d] && (c = d));
            qn[b] = c
        }
        return c
    }
      , rn = function(a, b) {
        var c = a.style[gh(b)];
        return "undefined" !== typeof c ? c : a.style[on(a, b)] || ""
    }
      , sn = function(a, b) {
        var c = lh(a);
        return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : ""
    }
      , tn = function(a) {
        try {
            return a.getBoundingClientRect()
        } catch (b) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
    }
      , un = function(a) {
        var b = lh(a)
          , c = new ah(0,0);
        var d = b ? lh(b) : document;
        d = !kc || 9 <= Number(Ic) || uh(mh(d).g) ? d.documentElement : d.body;
        if (a == d)
            return c;
        a = tn(a);
        b = wh(mh(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }
      , vn = function(a, b) {
        var c = new ah(0,0)
          , d = E(lh(a));
        if (!gc(d, "parent"))
            return c;
        do {
            if (d == b)
                var e = un(a);
            else
                e = tn(a),
                e = new ah(e.left,e.top);
            c.x += e.x;
            c.y += e.y
        } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));
        return c
    }
      , wn = function() {
        var a = "100%";
        "number" == typeof a && (a = Math.round(a) + "px");
        return a
    }
      , yn = function(a) {
        var b = xn;
        if ("none" != (sn(a, "display") || (a.currentStyle ? a.currentStyle.display : null) || a.style && a.style.display))
            return b(a);
        var c = a.style
          , d = c.display
          , e = c.visibility
          , f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }
      , xn = function(a) {
        var b = a.offsetWidth
          , c = a.offsetHeight
          , d = nc && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect ? (a = tn(a),
        new D(a.right - a.left,a.bottom - a.top)) : new D(b,c)
    }
      , Cn = function(a) {
        var b = lh(a)
          , c = kc && a.currentStyle;
        if (c && uh(mh(b).g) && "auto" != c.width && "auto" != c.height && !c.boxSizing)
            return b = zn(a, c.width, "width", "pixelWidth"),
            a = zn(a, c.height, "height", "pixelHeight"),
            new D(b,a);
        c = new D(a.offsetWidth,a.offsetHeight);
        if (kc) {
            b = An(a, "paddingLeft");
            var d = An(a, "paddingRight")
              , e = An(a, "paddingTop")
              , f = An(a, "paddingBottom");
            b = new F(e,d,f,b)
        } else
            b = sn(a, "paddingLeft"),
            d = sn(a, "paddingRight"),
            e = sn(a, "paddingTop"),
            f = sn(a, "paddingBottom"),
            b = new F(parseFloat(e),parseFloat(d),parseFloat(f),parseFloat(b));
        !kc || 9 <= Number(Ic) ? (d = sn(a, "borderLeftWidth"),
        e = sn(a, "borderRightWidth"),
        f = sn(a, "borderTopWidth"),
        a = sn(a, "borderBottomWidth"),
        a = new F(parseFloat(f),parseFloat(e),parseFloat(a),parseFloat(d))) : (d = Bn(a, "borderLeft"),
        e = Bn(a, "borderRight"),
        f = Bn(a, "borderTop"),
        a = Bn(a, "borderBottom"),
        a = new F(f,e,a,d));
        return new D(c.width - a.left - b.left - b.right - a.right,c.height - a.top - b.top - b.bottom - a.bottom)
    }
      , zn = function(a, b, c, d) {
        if (/^\d+px?$/.test(b))
            return parseInt(b, 10);
        var e = a.style[c]
          , f = a.runtimeStyle[c];
        a.runtimeStyle[c] = a.currentStyle[c];
        a.style[c] = b;
        b = a.style[d];
        a.style[c] = e;
        a.runtimeStyle[c] = f;
        return +b
    }
      , An = function(a, b) {
        return (b = a.currentStyle ? a.currentStyle[b] : null) ? zn(a, b, "left", "pixelLeft") : 0
    }
      , Dn = {
        thin: 2,
        medium: 4,
        thick: 6
    }
      , Bn = function(a, b) {
        if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null))
            return 0;
        b = a.currentStyle ? a.currentStyle[b + "Width"] : null;
        return b in Dn ? Dn[b] : zn(a, b, "left", "pixelLeft")
    };
    var En = function(a, b) {
        b = Math.pow(10, b);
        return Math.floor(a * b) / b
    };
    function Fn(a, b, c, d) {
        if (!a)
            return {
                value: d,
                done: !1
            };
        d = b(d, a);
        var e = c(d, a);
        return !e && gc(a, "parentElement") ? Fn(Bh(a), b, c, d) : {
            done: e,
            value: d
        }
    }
    var Gn = function(a, b, c, d) {
        if (!a)
            return d;
        d = Fn(a, b, c, d);
        if (!d.done)
            try {
                var e = lh(a)
                  , f = e && E(e);
                return Gn(f && f.frameElement, b, c, d.value)
            } catch (g) {}
        return d.value
    };
    function Hn(a) {
        var b = !kc || Dc();
        return Gn(a, function(c, d) {
            c = gc(d, "style") && d.style && rn(d, "visibility");
            return {
                hidden: "hidden" === c,
                visible: b && "visible" === c
            }
        }, function(c) {
            return c.hidden || c.visible
        }, {
            hidden: !1,
            visible: !1
        }).hidden
    }
    var In = function(a) {
        return Gn(a, function(b, c) {
            return !(!gc(c, "style") || !c.style || "none" !== rn(c, "display"))
        }, function(b) {
            return b
        }, !1) ? !0 : Hn(a)
    }
      , Jn = function(a) {
        return new F(a.top,a.right,a.bottom,a.left)
    }
      , Kn = function(a) {
        var b = a.top || 0
          , c = a.left || 0;
        return new F(b,c + (a.width || 0),b + (a.height || 0),c)
    }
      , Ln = function(a) {
        return null != a && 0 <= a && 1 >= a
    };
    function Mn() {
        var a = wb();
        return a ? Sb("AmazonWebAppPlatform;Android TV;Apple TV;AppleTV;BRAVIA;BeyondTV;Freebox;GoogleTV;HbbTV;LongTV;MiBOX;MiTV;NetCast.TV;Netcast;Opera TV;PANASONIC;POV_TV;SMART-TV;SMART_TV;SWTV;Smart TV;SmartTV;TV Store;UnionTV;WebOS".split(";"), function(b) {
            return rb(a, b)
        }) || rb(a, "OMI/") && !rb(a, "XiaoMi/") ? !0 : rb(a, "Presto") && rb(a, "Linux") && !rb(a, "X11") && !rb(a, "Android") && !rb(a, "Mobi") : !1
    }
    function Nn() {
        var a = wb();
        return rb(a, "AppleTV") || rb(a, "Apple TV") || rb(a, "CFNetwork") || rb(a, "tvOS")
    }
    function On() {
        var a;
        (a = rb(wb(), "CrKey") || rb(wb(), "PlayStation") || rb(wb(), "Roku") || Mn() || rb(wb(), "Xbox") || Nn()) || (a = wb(),
        a = rb(a, "sdk_google_atv_x86") || rb(a, "Android TV"));
        return a
    }
    ;var Qn = function() {
        this.j = !Vh(O.top);
        this.B = Fh() || Gh();
        var a = ji();
        a = 0 < a.length && null != a[a.length - 1] && null != a[a.length - 1].url ? ((a = a[a.length - 1].url.match(Hh)[3] || null) ? decodeURI(a) : a) || "" : "";
        this.domain = a;
        this.g = new F(0,0,0,0);
        this.l = new D(0,0);
        this.o = new D(0,0);
        this.H = new F(0,0,0,0);
        this.A = 0;
        this.K = !1;
        this.h = !(!O || !ln(O).Ba);
        Pn(this)
    }
      , Rn = function(a, b) {
        b && b.screen && (a.l = new D(b.screen.width,b.screen.height))
    }
      , Sn = function(a, b) {
        var c = a.g ? new D(a.g.getWidth(),a.g.getHeight()) : new D(0,0);
        b = void 0 === b ? O : b;
        null !== b && b != b.top && (b = b.top);
        var d = 0
          , e = 0;
        try {
            var f = b.document
              , g = f.body
              , h = f.documentElement;
            if ("CSS1Compat" == f.compatMode && h.scrollHeight)
                d = h.scrollHeight != c.height ? h.scrollHeight : h.offsetHeight,
                e = h.scrollWidth != c.width ? h.scrollWidth : h.offsetWidth;
            else {
                var k = h.scrollHeight
                  , m = h.scrollWidth
                  , n = h.offsetHeight
                  , q = h.offsetWidth;
                h.clientHeight != n && (k = g.scrollHeight,
                m = g.scrollWidth,
                n = g.offsetHeight,
                q = g.offsetWidth);
                k > c.height ? k > n ? (d = k,
                e = m) : (d = n,
                e = q) : k < n ? (d = k,
                e = m) : (d = n,
                e = q)
            }
            var t = new D(e,d)
        } catch (v) {
            t = new D(-12245933,-12245933)
        }
        a.o = t
    }
      , Pn = function(a) {
        O && O.document && (a.H = nn(!1, O, a.B),
        a.g = nn(!0, O, a.B),
        Sn(a, O),
        Rn(a, O))
    }
      , Un = function() {
        var a = Tn();
        if (0 < a.A || a.K)
            return !0;
        a = xm().h.isVisible();
        var b = 0 === rj(lm);
        return a || b
    }
      , Tn = function() {
        return C(Qn)
    };
    var Vn = function(a) {
        this.j = a;
        this.h = 0;
        this.g = null
    };
    Vn.prototype.cancel = function() {
        xm().clearTimeout(this.g);
        this.g = null
    }
    ;
    var Wn = function(a) {
        var b = xm()
          , c = N().g.g;
        a.g = b.setTimeout(Dm(c, Um(143, function() {
            a.h++;
            a.j.sample()
        })), cn())
    };
    var Xn = function(a, b, c) {
        this.j = a;
        this.ma = void 0 === c ? "na" : c;
        this.l = [];
        this.ua = !1;
        this.o = new dn(-1,!0,this);
        this.g = this;
        this.K = b;
        this.G = this.D = !1;
        this.X = "uk";
        this.O = !1;
        this.B = !0
    };
    Xn.prototype.F = function() {
        return !1
    }
    ;
    Xn.prototype.initialize = function() {
        return this.ua = !0
    }
    ;
    Xn.prototype.Ab = function() {
        return this.g.X
    }
    ;
    Xn.prototype.Qb = function() {
        return this.g.G
    }
    ;
    var Zn = function(a, b, c) {
        if (!a.G || (void 0 === c ? 0 : c))
            a.G = !0,
            a.X = b,
            a.K = 0,
            a.g != a || Yn(a)
    };
    Xn.prototype.getName = function() {
        return this.g.ma
    }
    ;
    Xn.prototype.Za = function() {
        return this.g.Z()
    }
    ;
    Xn.prototype.Z = function() {
        return {}
    }
    ;
    Xn.prototype.Oa = function() {
        return this.g.K
    }
    ;
    var $n = function(a, b) {
        Wb(a.l, b) || (a.l.push(b),
        b.Cb(a.g),
        b.ab(a.o),
        b.Ka() && (a.D = !0))
    };
    Xn.prototype.U = function() {
        var a = Tn();
        a.g = nn(!0, this.j, a.B)
    }
    ;
    Xn.prototype.V = function() {
        Rn(Tn(), this.j)
    }
    ;
    Xn.prototype.aa = function() {
        return this.o.g
    }
    ;
    var ao = function(a) {
        a = a.g;
        a.V();
        a.U();
        var b = Tn();
        b.H = nn(!1, a.j, b.B);
        Sn(Tn(), a.j);
        a.o.g = a.aa()
    };
    Xn.prototype.sample = function() {}
    ;
    Xn.prototype.isActive = function() {
        return this.g.B
    }
    ;
    var bo = function(a) {
        a.D = a.l.length ? Sb(a.l, function(b) {
            return b.Ka()
        }) : !1
    }
      , co = function(a) {
        var b = ac(a.l);
        Nb(b, function(c) {
            c.ab(a.o)
        })
    }
      , Yn = function(a) {
        var b = ac(a.l);
        Nb(b, function(c) {
            c.Cb(a.g)
        });
        a.g != a || co(a)
    };
    l = Xn.prototype;
    l.Cb = function(a) {
        var b = this.g;
        this.g = a.Oa() >= this.K ? a : this;
        b !== this.g ? (this.B = this.g.B,
        Yn(this)) : this.B !== this.g.B && (this.B = this.g.B,
        Yn(this))
    }
    ;
    l.ab = function(a) {
        if (a.h === this.g) {
            var b = this.o
              , c = this.D;
            if (c = a && (void 0 === c || !c || b.volume == a.volume) && b.j == a.j)
                b = b.g,
                c = a.g,
                c = b == c ? !0 : b && c ? b.top == c.top && b.right == c.right && b.bottom == c.bottom && b.left == c.left : !1;
            this.o = a;
            !c && co(this)
        }
    }
    ;
    l.Ka = function() {
        return this.D
    }
    ;
    l.W = function() {
        this.O = !0
    }
    ;
    l.Aa = function() {
        return this.O
    }
    ;
    var eo = function(a, b, c, d) {
        this.j = a;
        this.g = new F(0,0,0,0);
        this.l = new F(0,0,0,0);
        this.h = b;
        this.P = c;
        this.G = d;
        this.F = !1;
        this.timestamp = -1;
        this.H = new en(b.o,this.g,new F(0,0,0,0),0,0,bn(),0)
    };
    l = eo.prototype;
    l.Vc = function() {
        return !0
    }
    ;
    l.Xb = function() {}
    ;
    l.W = function() {
        if (!this.Aa()) {
            var a = this.h;
            Xb(a.l, this);
            a.D && this.Ka() && bo(a);
            this.Xb();
            this.F = !0
        }
    }
    ;
    l.Aa = function() {
        return this.F
    }
    ;
    l.Za = function() {
        return this.h.Za()
    }
    ;
    l.Oa = function() {
        return this.h.Oa()
    }
    ;
    l.Ab = function() {
        return this.h.Ab()
    }
    ;
    l.Qb = function() {
        return this.h.Qb()
    }
    ;
    l.Cb = function() {}
    ;
    l.ab = function() {
        this.Xa()
    }
    ;
    l.Ka = function() {
        return this.G
    }
    ;
    var fo = function(a) {
        this.l = !1;
        this.g = a;
        this.o = function() {}
    };
    l = fo.prototype;
    l.Oa = function() {
        return this.g.Oa()
    }
    ;
    l.Ab = function() {
        return this.g.Ab()
    }
    ;
    l.Qb = function() {
        return this.g.Qb()
    }
    ;
    l.create = function(a, b, c) {
        var d = null;
        this.g && (d = this.Yb(a, b, c),
        $n(this.g, d));
        return d
    }
    ;
    l.Pd = function() {
        return this.Ib()
    }
    ;
    l.Ib = function() {
        return !1
    }
    ;
    l.init = function(a) {
        return this.g.initialize() ? ($n(this.g, this),
        this.o = a,
        !0) : !1
    }
    ;
    l.Cb = function(a) {
        0 == a.Oa() && this.o(a.Ab(), this)
    }
    ;
    l.ab = function() {}
    ;
    l.Ka = function() {
        return !1
    }
    ;
    l.W = function() {
        this.l = !0
    }
    ;
    l.Aa = function() {
        return this.l
    }
    ;
    l.Za = function() {
        return {}
    }
    ;
    var go = function(a, b, c) {
        this.j = void 0 === c ? 0 : c;
        this.h = a;
        this.g = null == b ? "" : b
    }
      , ho = function(a) {
        switch (Math.trunc(a.j)) {
        case -16:
            return -16;
        case -8:
            return -8;
        case 0:
            return 0;
        case 8:
            return 8;
        case 16:
            return 16;
        default:
            return 16
        }
    }
      , io = function(a, b) {
        return a.j < b.j ? !0 : a.j > b.j ? !1 : a.h < b.h ? !0 : a.h > b.h ? !1 : typeof a.g < typeof b.g ? !0 : typeof a.g > typeof b.g ? !1 : a.g < b.g
    };
    var jo = function() {
        this.j = 0;
        this.g = [];
        this.h = !1
    };
    jo.prototype.add = function(a, b, c) {
        ++this.j;
        a = new go(a,b,c);
        this.g.push(new go(a.h,a.g,a.j + this.j / 4096));
        this.h = !0;
        return this
    }
    ;
    var ko = function(a, b) {
        Nb(b.g, function(c) {
            a.add(c.h, c.g, ho(c))
        })
    }
      , lo = function(a, b) {
        var c = void 0 === c ? 0 : c;
        var d = void 0 === d ? !0 : d;
        ai(b, function(e, f) {
            d && void 0 === e || a.add(f, e, c)
        });
        return a
    }
      , no = function(a) {
        var b = mo;
        a.h && (cc(a.g, function(c, d) {
            return io(d, c) ? 1 : io(c, d) ? -1 : 0
        }),
        a.h = !1);
        return Rb(a.g, function(c, d) {
            d = b(d);
            return "" + c + ("" != c && "" != d ? "&" : "") + d
        }, "")
    };
    var mo = function(a) {
        var b = a.h;
        a = a.g;
        return "" === a ? b : "boolean" === typeof a ? a ? b : "" : Array.isArray(a) ? 0 === a.length ? b : b + "=" + a.join() : b + "=" + (Wb(["mtos", "tos", "p"], b) ? a : encodeURIComponent(a))
    };
    var oo = function(a) {
        var b = void 0 === b ? !0 : b;
        this.g = new jo;
        void 0 !== a && ko(this.g, a);
        b && this.g.add("v", "unreleased", -16)
    };
    oo.prototype.toString = function() {
        var a = "//pagead2.googlesyndication.com//pagead/gen_204"
          , b = no(this.g);
        0 < b.length && (a += "?" + b);
        return a
    }
    ;
    var po = function(a) {
        var b = []
          , c = [];
        xg(a, function(d, e) {
            if (!(e in Object.prototype) && "undefined" != typeof d)
                switch (Array.isArray(d) && (d = d.join(",")),
                d = [e, "=", d].join(""),
                e) {
                case "adk":
                case "r":
                case "tt":
                case "error":
                case "mtos":
                case "tos":
                case "p":
                case "bs":
                    b.unshift(d);
                    break;
                case "req":
                case "url":
                case "referrer":
                case "iframe_loc":
                    c.push(d);
                    break;
                default:
                    b.push(d)
                }
        });
        return b.concat(c)
    }
      , qo = function(a) {
        a = a.toString();
        xm();
        Ni(O, a)
    };
    var ro = function() {
        this.g = 0
    };
    function so(a) {
        a && "function" == typeof a.W && a.W()
    }
    ;var P = function() {
        this.K = this.K;
        this.H = this.H
    };
    P.prototype.K = !1;
    P.prototype.Aa = function() {
        return this.K
    }
    ;
    P.prototype.W = function() {
        this.K || (this.K = !0,
        this.L())
    }
    ;
    var uo = function(a, b) {
        to(a, bb(so, b))
    }
      , to = function(a, b) {
        a.K ? b() : (a.H || (a.H = []),
        a.H.push(b))
    };
    P.prototype.L = function() {
        if (this.H)
            for (; this.H.length; )
                this.H.shift()()
    }
    ;
    var vo = function(a, b, c) {
        Nb(a.j, function(d) {
            var e = a.g;
            if (!d.g && (d.j(b, c),
            d.o())) {
                d.g = !0;
                var f = d.h()
                  , g = new jo;
                g.add("id", "av-js");
                g.add("type", "verif");
                g.add("vtype", d.l);
                d = C(ro);
                g.add("i", d.g++);
                g.add("adk", e);
                lo(g, f);
                e = new oo(g);
                qo(e)
            }
        })
    };
    var wo = function() {
        this.h = this.j = this.o = this.g = 0
    }
      , xo = function(a, b, c, d) {
        b && (a.g += c,
        a.h += c,
        a.o += c,
        a.j = Math.max(a.j, a.o));
        if (void 0 === d ? !b : d)
            a.o = 0
    };
    var yo = [1, .75, .5, .3, 0]
      , zo = function(a) {
        this.h = a = void 0 === a ? yo : a;
        this.g = Qb(this.h, function() {
            return new wo
        })
    }
      , Bo = function(a, b) {
        return Ao(a, function(c) {
            return c.g
        }, void 0 === b ? !0 : b)
    }
      , Do = function(a, b) {
        return Co(a, b, function(c) {
            return c.g
        })
    }
      , Eo = function(a, b) {
        return Ao(a, function(c) {
            return c.j
        }, void 0 === b ? !0 : b)
    }
      , Fo = function(a, b) {
        return Co(a, b, function(c) {
            return c.j
        })
    }
      , Go = function(a, b) {
        return Co(a, b, function(c) {
            return c.h
        })
    }
      , Ho = function(a) {
        Nb(a.g, function(b) {
            b.h = 0
        })
    }
      , Io = function(a, b, c, d, e, f, g) {
        g = void 0 === g ? !0 : g;
        c = f ? Math.min(b, c) : c;
        for (f = 0; f < a.h.length; f++) {
            var h = a.h[f]
              , k = 0 < c && c >= h;
            h = !(0 < b && b >= h) || d;
            xo(a.g[f], g && k, e, !g || h)
        }
    }
      , Ao = function(a, b, c) {
        a = Qb(a.g, function(d) {
            return b(d)
        });
        return c ? a : Jo(a)
    }
      , Co = function(a, b, c) {
        var d = Vb(a.h, function(e) {
            return b <= e
        });
        return -1 == d ? 0 : c(a.g[d])
    }
      , Jo = function(a) {
        return Qb(a, function(b, c, d) {
            return 0 < c ? d[c] - d[c - 1] : d[c]
        })
    };
    var Ko = function() {
        this.h = new zo;
        this.X = new wo;
        this.G = this.B = -1;
        this.ha = 1E3;
        this.ba = new zo([1, .9, .8, .7, .6, .5, .4, .3, .2, .1, 0]);
        this.O = this.I = -1
    }
      , Lo = function(a, b) {
        return Eo(a.h, void 0 === b ? !0 : b)
    };
    Ko.prototype.K = function(a, b, c, d) {
        this.B = -1 != this.B ? Math.min(this.B, b.Y) : b.Y;
        this.G = Math.max(this.G, b.Y);
        this.I = -1 != this.I ? Math.min(this.I, b.sa) : b.sa;
        this.O = Math.max(this.O, b.sa);
        Io(this.ba, b.sa, c.sa, b.g, a, d);
        Io(this.h, b.Y, c.Y, b.g, a, d);
        c = d || c.rb != b.rb ? c.isVisible() && b.isVisible() : c.isVisible();
        b = !b.isVisible() || b.g;
        xo(this.X, c, a, b)
    }
    ;
    Ko.prototype.Ra = function() {
        return this.X.j >= this.ha
    }
    ;
    if (lm && lm.URL) {
        var Mo = lm.URL, No;
        if (No = !!Mo) {
            var Oo;
            a: {
                if (Mo) {
                    var Po = RegExp(".*[&#?]google_debug(=[^&]*)?(&.*)?$");
                    try {
                        var Qo = Po.exec(decodeURIComponent(Mo));
                        if (Qo) {
                            Oo = Qo[1] && 1 < Qo[1].length ? Qo[1].substring(1) : "true";
                            break a
                        }
                    } catch (a) {}
                }
                Oo = ""
            }
            No = 0 < Oo.length
        }
        Qm.Fd(!No)
    }
    var Ro = function(a, b, c, d) {
        var e = void 0 === e ? !1 : e;
        c = Um(d, c);
        rg(a, b, c, {
            capture: e
        })
    };
    var So = new F(0,0,0,0);
    function To(a, b) {
        b = Uo(b);
        return 0 === b ? 0 : Uo(a) / b
    }
    function Uo(a) {
        return Math.max(a.bottom - a.top, 0) * Math.max(a.right - a.left, 0)
    }
    function Vo(a, b) {
        if (!a || !b)
            return !1;
        for (var c = 0; null !== a && 100 > c++; ) {
            if (a === b)
                return !0;
            try {
                if (a = Bh(a) || a) {
                    var d = lh(a)
                      , e = d && E(d)
                      , f = e && e.frameElement;
                    f && (a = f)
                }
            } catch (g) {
                break
            }
        }
        return !1
    }
    function Wo(a, b, c) {
        if (!a || !b)
            return !1;
        b = bj(aj(a), -b.left, -b.top);
        a = (b.left + b.right) / 2;
        b = (b.top + b.bottom) / 2;
        Vh(window.top) && window.top && window.top.document && (window = window.top);
        if (!mn())
            return !1;
        a = window.document.elementFromPoint(a, b);
        if (!a)
            return !1;
        b = (b = (b = lh(c)) && b.defaultView && b.defaultView.frameElement) && Vo(b, a);
        var d = a === c;
        a = !d && a && Eh(a, function(e) {
            return e === c
        });
        return !(b || d || a)
    }
    function Xo(a, b, c, d) {
        return Tn().j ? !1 : 0 >= a.getWidth() || 0 >= a.getHeight() ? !0 : c && d ? Tm(208, function() {
            return Wo(a, b, c)
        }) : !1
    }
    ;var Yo = new F(0,0,0,0)
      , $o = function(a, b, c) {
        P.call(this);
        this.position = aj(Yo);
        this.Gc = this.uc();
        this.kd = -2;
        this.sg = Date.now();
        this.Ce = -1;
        this.yc = b;
        this.xc = null;
        this.Mb = !1;
        this.Lc = null;
        this.opacity = -1;
        this.gg = c;
        this.ug = !1;
        this.ld = function() {}
        ;
        this.De = function() {}
        ;
        this.ta = new nm;
        this.ta.gb = a;
        this.ta.g = a;
        this.Pa = !1;
        this.nb = {
            od: null,
            nd: null
        };
        this.ye = !0;
        this.Wb = null;
        this.Db = this.Sf = !1;
        N().A++;
        this.pa = this.ed();
        this.Be = -1;
        this.ca = null;
        this.je = this.Qf = !1;
        this.P = new cm;
        km(this.P);
        Zo(this);
        1 == this.gg ? fm(this.P, "od", 1) : fm(this.P, "od", 0)
    };
    u($o, P);
    $o.prototype.L = function() {
        this.ta.g && (this.nb.od && (sg(this.ta.g, "mouseover", this.nb.od),
        this.nb.od = null),
        this.nb.nd && (sg(this.ta.g, "mouseout", this.nb.nd),
        this.nb.nd = null));
        this.Wb && this.Wb.W();
        this.ca && this.ca.W();
        delete this.Gc;
        delete this.ld;
        delete this.De;
        delete this.ta.gb;
        delete this.ta.g;
        delete this.nb;
        delete this.Wb;
        delete this.ca;
        delete this.P;
        P.prototype.L.call(this)
    }
    ;
    $o.prototype.pb = function() {
        return this.ca ? this.ca.g : this.position
    }
    ;
    $o.prototype.ud = function(a) {
        N().ud(a)
    }
    ;
    var Zo = function(a) {
        a = a.ta.gb;
        var b;
        if (b = a && a.getAttribute)
            b = /-[a-z]/.test("googleAvInapp") ? !1 : mm && a.dataset ? "googleAvInapp"in a.dataset : a.hasAttribute ? a.hasAttribute("data-" + hh()) : !!a.getAttribute("data-" + hh());
        b && (Tn().h = !0)
    };
    $o.prototype.Ka = function() {
        return !1
    }
    ;
    $o.prototype.uc = function() {
        return new Ko
    }
    ;
    $o.prototype.oa = function() {
        return this.Gc
    }
    ;
    var ap = function(a, b) {
        b != a.Db && (a.Db = b,
        a = Tn(),
        b ? a.A++ : 0 < a.A && a.A--)
    }
      , bp = function(a, b) {
        if (a.ca) {
            if (b.getName() === a.ca.getName())
                return;
            a.ca.W();
            a.ca = null
        }
        b = b.create(a.ta.g, a.P, a.Ka());
        if (b = null != b && b.Vc() ? b : null)
            a.ca = b
    }
      , cp = function(a, b, c) {
        if (!a.xc || -1 == a.yc || -1 === b.getTimestamp() || -1 === a.xc.getTimestamp())
            return 0;
        a = b.getTimestamp() - a.xc.getTimestamp();
        return a > c ? 0 : a
    };
    $o.prototype.ge = function(a) {
        return cp(this, a, 1E4)
    }
    ;
    var dp = function(a, b, c) {
        if (a.ca) {
            a.ca.Xa();
            var d = a.ca.H
              , e = d.j
              , f = e.g;
            if (null != d.l) {
                var g = d.h;
                a.Lc = new ah(g.left - f.left,g.top - f.top)
            }
            f = a.Sc() ? Math.max(d.g, d.o) : d.g;
            g = {};
            null !== e.volume && (g.volume = e.volume);
            e = a.ge(d);
            a.xc = d;
            a.Jd(f, b, c, !1, g, e, d.A)
        }
    }
      , ep = function(a) {
        if (a.Mb && a.Wb) {
            var b = 1 == gm(a.P, "od")
              , c = Tn().g
              , d = a.Wb
              , e = a.ca ? a.ca.getName() : "ns"
              , f = a.Lc
              , g = new D(c.getWidth(),c.getHeight());
            c = a.Sc();
            a = {
                qg: e,
                Lc: f,
                Cg: g,
                Sc: c,
                Y: a.pa.Y,
                xg: b
            };
            if (b = d.h) {
                b.Xa();
                e = b.H;
                f = e.j.g;
                var h = g = null;
                null != e.l && f && (g = e.h,
                g = new ah(g.left - f.left,g.top - f.top),
                h = new D(f.right - f.left,f.bottom - f.top));
                e = c ? Math.max(e.g, e.o) : e.g;
                c = {
                    qg: b.getName(),
                    Lc: g,
                    Cg: h,
                    Sc: c,
                    xg: !1,
                    Y: e
                }
            } else
                c = null;
            c && vo(d, a, c)
        }
    };
    l = $o.prototype;
    l.Jd = function(a, b, c, d, e, f, g) {
        this.Pa || (this.Mb && (a = this.Wc(a, c, e, g),
        d = d && this.pa.Y >= (this.rb() ? .3 : .5),
        this.Kd(f, a, d),
        this.yc = b,
        0 < a.Y && -1 === this.Be && (this.Be = b),
        -1 == this.Ce && this.Ra() && (this.Ce = b),
        -2 == this.kd && (this.kd = Uo(this.pb()) ? a.Y : -1),
        this.pa = a),
        this.ld(this))
    }
    ;
    l.Kd = function(a, b, c) {
        this.oa().K(a, b, this.pa, c)
    }
    ;
    l.ed = function() {
        return new Rl
    }
    ;
    l.Wc = function(a, b, c, d) {
        c = this.ed();
        c.g = b;
        b = xm().h;
        b = 0 === rj(lm) ? -1 : b.isVisible() ? 0 : 1;
        c.h = b;
        c.Y = this.Zc(a);
        c.rb = this.rb();
        c.sa = d;
        return c
    }
    ;
    l.Zc = function(a) {
        return 0 === this.opacity && 1 === gm(this.P, "opac") ? 0 : a
    }
    ;
    l.rb = function() {
        return !1
    }
    ;
    l.Sc = function() {
        return this.Qf || this.Sf
    }
    ;
    l.wa = function() {
        return 0
    }
    ;
    l.Ra = function() {
        return this.Gc.Ra()
    }
    ;
    l.ie = function() {
        var a = this.Mb;
        a = (this.je || this.Aa()) && !a;
        var b = 2 !== N().h || this.ug;
        return this.Pa || b && a ? 2 : this.Ra() ? 4 : 3
    }
    ;
    l.sc = function() {
        return 0
    }
    ;
    var fp = function(a, b, c) {
        b && (a.ld = b);
        c && (a.De = c)
    };
    var gp = function() {};
    gp.prototype.next = function() {
        return hp
    }
    ;
    var hp = {
        done: !0,
        value: void 0
    };
    gp.prototype.yb = function() {
        return this
    }
    ;
    var ip = function() {
        this.o = this.g = this.j = this.h = this.l = 0
    }
      , jp = function(a) {
        var b = {};
        b = (b.ptlt = Date.now() - a.l,
        b);
        var c = a.h;
        c && (b.pnk = c);
        (c = a.j) && (b.pnc = c);
        (c = a.o) && (b.pnmm = c);
        (a = a.g) && (b.pns = a);
        return b
    };
    var kp = function() {
        Rl.call(this);
        this.fullscreen = !1;
        this.volume = void 0;
        this.j = !1;
        this.mediaTime = -1
    };
    u(kp, Rl);
    var lp = function(a) {
        return Ln(a.volume) && 0 < a.volume
    };
    var yp = function(a, b, c, d) {
        c = void 0 === c ? !0 : c;
        d = void 0 === d ? function() {
            return !0
        }
        : d;
        return function(e) {
            var f = e[a];
            if (Array.isArray(f) && d(e))
                return mp(f, b, c)
        }
    }
      , zp = function(a, b) {
        return function(c) {
            return b(c) ? c[a] : void 0
        }
    }
      , Ap = function(a) {
        return function(b) {
            for (var c = 0; c < a.length; c++)
                if (a[c] === b.e || void 0 === a[c] && !b.hasOwnProperty("e"))
                    return !0;
            return !1
        }
    }
      , mp = function(a, b, c) {
        return void 0 === c || c ? Pb(a, function(d, e) {
            return Wb(b, e)
        }) : Qb(b, function(d, e, f) {
            return a.slice(0 < e ? f[e - 1] + 1 : 0, d + 1).reduce(function(g, h) {
                return g + h
            }, 0)
        })
    };
    var Bp = Ap([void 0, 1, 2, 3, 4, 8, 16])
      , Cp = Ap([void 0, 4, 8, 16])
      , Dp = {
        sv: "sv",
        v: "v",
        cb: "cb",
        e: "e",
        nas: "nas",
        msg: "msg",
        "if": "if",
        sdk: "sdk",
        p: "p",
        p0: zp("p0", Cp),
        p1: zp("p1", Cp),
        p2: zp("p2", Cp),
        p3: zp("p3", Cp),
        cp: "cp",
        tos: "tos",
        mtos: "mtos",
        amtos: "amtos",
        mtos1: yp("mtos1", [0, 2, 4], !1, Cp),
        mtos2: yp("mtos2", [0, 2, 4], !1, Cp),
        mtos3: yp("mtos3", [0, 2, 4], !1, Cp),
        mcvt: "mcvt",
        ps: "ps",
        scs: "scs",
        bs: "bs",
        vht: "vht",
        mut: "mut",
        a: "a",
        a0: zp("a0", Cp),
        a1: zp("a1", Cp),
        a2: zp("a2", Cp),
        a3: zp("a3", Cp),
        ft: "ft",
        dft: "dft",
        at: "at",
        dat: "dat",
        as: "as",
        vpt: "vpt",
        gmm: "gmm",
        std: "std",
        efpf: "efpf",
        swf: "swf",
        nio: "nio",
        px: "px",
        nnut: "nnut",
        vmer: "vmer",
        vmmk: "vmmk",
        vmiec: "vmiec",
        nmt: "nmt",
        tcm: "tcm",
        bt: "bt",
        pst: "pst",
        vpaid: "vpaid",
        dur: "dur",
        vmtime: "vmtime",
        dtos: "dtos",
        dtoss: "dtoss",
        dvs: "dvs",
        dfvs: "dfvs",
        dvpt: "dvpt",
        fmf: "fmf",
        vds: "vds",
        is: "is",
        i0: "i0",
        i1: "i1",
        i2: "i2",
        i3: "i3",
        ic: "ic",
        cs: "cs",
        c: "c",
        c0: zp("c0", Cp),
        c1: zp("c1", Cp),
        c2: zp("c2", Cp),
        c3: zp("c3", Cp),
        mc: "mc",
        nc: "nc",
        mv: "mv",
        nv: "nv",
        qmt: zp("qmtos", Bp),
        qnc: zp("qnc", Bp),
        qmv: zp("qmv", Bp),
        qnv: zp("qnv", Bp),
        raf: "raf",
        rafc: "rafc",
        lte: "lte",
        ces: "ces",
        tth: "tth",
        femt: "femt",
        femvt: "femvt",
        emc: "emc",
        emuc: "emuc",
        emb: "emb",
        avms: "avms",
        nvat: "nvat",
        qi: "qi",
        psm: "psm",
        psv: "psv",
        psfv: "psfv",
        psa: "psa",
        pnk: "pnk",
        pnc: "pnc",
        pnmm: "pnmm",
        pns: "pns",
        ptlt: "ptlt",
        pngs: "pings",
        veid: "veid",
        ssb: "ssb",
        ss0: zp("ss0", Cp),
        ss1: zp("ss1", Cp),
        ss2: zp("ss2", Cp),
        ss3: zp("ss3", Cp),
        dc_rfl: "urlsigs",
        obd: "obd",
        omidp: "omidp",
        omidr: "omidr",
        omidv: "omidv",
        omida: "omida",
        omids: "omids",
        omidpv: "omidpv",
        omidam: "omidam",
        omidct: "omidct",
        omidia: "omidia",
        omiddc: "omiddc",
        omidlat: "omidlat",
        omiddit: "omiddit",
        nopd: "nopd",
        co: "co"
    }
      , Ep = Object.assign({}, Dp, {
        avid: function(a) {
            return function() {
                return a
            }
        }("audio"),
        avas: "avas",
        vs: "vs"
    })
      , Fp = {
        atos: "atos",
        avt: yp("atos", [2]),
        davs: "davs",
        dafvs: "dafvs",
        dav: "dav",
        ss: function(a, b) {
            return function(c) {
                return void 0 === c[a] && void 0 !== b ? b : c[a]
            }
        }("ss", 0),
        t: "t"
    };
    var Gp = function() {
        this.h = this.g = ""
    };
    var Hp = function() {}
      , Ip = function(a, b) {
        var c = {};
        if (void 0 !== a)
            if (null != b)
                for (var d in b) {
                    var e = b[d];
                    d in Object.prototype || null != e && (c[d] = "function" === typeof e ? e(a) : a[e])
                }
            else
                Mg(c, a);
        return no(lo(new jo, c))
    };
    var Jp = function() {
        var a = {};
        this.h = (a.vs = [1, 0],
        a.vw = [0, 1],
        a.am = [2, 2],
        a.a = [4, 4],
        a.f = [8, 8],
        a.bm = [16, 16],
        a.b = [32, 32],
        a.avw = [0, 64],
        a.avs = [64, 0],
        a.pv = [256, 256],
        a.gdr = [0, 512],
        a.p = [0, 1024],
        a.r = [0, 2048],
        a.m = [0, 4096],
        a.um = [0, 8192],
        a.ef = [0, 16384],
        a.s = [0, 32768],
        a.pmx = [0, 16777216],
        a.mut = [33554432, 33554432],
        a.umutb = [67108864, 67108864],
        a.tvoff = [134217728, 134217728],
        a);
        this.g = {};
        for (var b in this.h)
            0 < this.h[b][1] && (this.g[b] = 0);
        this.j = 0
    };
    Jp.prototype.reportEvent = function(a) {
        var b = this.h[a]
          , c = b[1];
        this.j += b[0];
        0 < c && 0 == this.g[a] && (this.g[a] = 1)
    }
    ;
    var Kp = function(a) {
        var b = Cg(a.h), c = 0, d;
        for (d in a.g)
            Wb(b, d) && 1 == a.g[d] && (c += a.h[d][1],
            a.g[d] = 2);
        return c
    }
      , Lp = function(a) {
        var b = 0, c;
        for (c in a.g) {
            var d = a.g[c];
            if (1 == d || 2 == d)
                b += a.h[c][1]
        }
        return b
    };
    var Mp = function() {
        this.g = this.h = 0
    };
    Mp.prototype.getValue = function() {
        return this.h
    }
    ;
    var Np = function(a, b, c) {
        32 <= b || (a.g & 1 << b && !c ? a.h &= ~(1 << b) : a.g & 1 << b || !c || (a.h |= 1 << b),
        a.g |= 1 << b)
    };
    var Op = function() {
        Ko.call(this);
        this.j = new wo;
        this.V = this.D = this.M = 0;
        this.H = -1;
        this.ma = new wo;
        this.l = new wo;
        this.g = new zo;
        this.A = this.o = -1;
        this.F = new wo;
        this.ha = 2E3;
        this.U = new Mp;
        this.aa = new Mp;
        this.Z = new Mp
    };
    u(Op, Ko);
    var Pp = function(a, b, c) {
        var d = a.V;
        an || c || -1 == a.H || (d += b - a.H);
        return d
    };
    Op.prototype.K = function(a, b, c, d) {
        if (!b.j) {
            Ko.prototype.K.call(this, a, b, c, d);
            var e = lp(b) && lp(c)
              , f = .5 <= (d ? Math.min(b.Y, c.Y) : c.Y);
            Ln(b.volume) && (this.o = -1 != this.o ? Math.min(this.o, b.volume) : b.volume,
            this.A = Math.max(this.A, b.volume));
            f && (this.M += a,
            this.D += e ? a : 0);
            Io(this.g, b.Y, c.Y, b.g, a, d, e);
            xo(this.j, !0, a);
            xo(this.l, e, a);
            xo(this.F, c.fullscreen, a);
            xo(this.ma, e && !f, a);
            a = Math.floor(b.mediaTime / 1E3);
            Np(this.U, a, b.isVisible());
            Np(this.aa, a, 1 <= b.Y);
            Np(this.Z, a, lp(b))
        }
    }
    ;
    var Qp = function() {
        this.j = !1
    };
    Qp.prototype.h = function(a) {
        this.j || (this.g(a) ? (a = this.K.report(this.o, a),
        this.l |= a,
        a = 0 == a) : a = !1,
        this.j = a)
    }
    ;
    var Rp = function(a, b) {
        this.j = !1;
        this.o = a;
        this.K = b;
        this.l = 0
    };
    u(Rp, Qp);
    Rp.prototype.g = function() {
        return !0
    }
    ;
    Rp.prototype.A = function() {
        return !1
    }
    ;
    Rp.prototype.getId = function() {
        var a = this
          , b = Gg(function(c) {
            return c == a.o
        });
        return kn[b].toString()
    }
    ;
    Rp.prototype.toString = function() {
        var a = "";
        this.A() && (a += "c");
        this.j && (a += "s");
        0 < this.l && (a += ":" + this.l);
        return this.getId() + a
    }
    ;
    var Sp = function(a, b) {
        Rp.call(this, a, b);
        this.B = []
    };
    u(Sp, Rp);
    Sp.prototype.h = function(a, b) {
        b = void 0 === b ? null : b;
        null != b && this.B.push(b);
        Rp.prototype.h.call(this, a)
    }
    ;
    var Tp = function() {};
    var Up = function() {};
    u(Up, Tp);
    Up.prototype.h = function() {
        return null
    }
    ;
    Up.prototype.j = function() {
        return []
    }
    ;
    var Vp = function(a, b, c, d) {
        eo.call(this, a, b, c, d)
    };
    u(Vp, eo);
    l = Vp.prototype;
    l.Xc = function() {
        if (this.j) {
            var a = this.j
              , b = this.h.g.j;
            try {
                try {
                    var c = Jn(a.getBoundingClientRect())
                } catch (m) {
                    c = new F(0,0,0,0)
                }
                var d = c.right - c.left
                  , e = c.bottom - c.top
                  , f = vn(a, b)
                  , g = f.x
                  , h = f.y;
                var k = new F(Math.round(h),Math.round(g + d),Math.round(h + e),Math.round(g))
            } catch (m) {
                k = aj(So)
            }
            this.g = k
        }
    }
    ;
    l.Yd = function() {
        this.l = this.h.o.g
    }
    ;
    l.ke = function(a) {
        var b = 1 == gm(this.P, "od");
        return Xo(a, this.l, this.j, b)
    }
    ;
    l.Zd = function() {
        this.timestamp = bn()
    }
    ;
    l.Xa = function() {
        this.Zd();
        this.Xc();
        if (this.j && "number" === typeof this.j.videoWidth && "number" === typeof this.j.videoHeight) {
            var a = this.j;
            var b = new D(a.videoWidth,a.videoHeight);
            a = this.g;
            var c = a.getWidth()
              , d = a.getHeight()
              , e = b.width;
            b = b.height;
            0 >= e || 0 >= b || 0 >= c || 0 >= d || (e /= b,
            a = aj(a),
            e > c / d ? (c /= e,
            d = (d - c) / 2,
            0 < d && (d = a.top + d,
            a.top = Math.round(d),
            a.bottom = Math.round(d + c))) : (d *= e,
            c = Math.round((c - d) / 2),
            0 < c && (c = a.left + c,
            a.left = Math.round(c),
            a.right = Math.round(c + d))));
            this.g = a
        }
        this.Yd();
        a = this.g;
        c = this.l;
        a = a.left <= c.right && c.left <= a.right && a.top <= c.bottom && c.top <= a.bottom ? new F(Math.max(a.top, c.top),Math.min(a.right, c.right),Math.min(a.bottom, c.bottom),Math.max(a.left, c.left)) : new F(0,0,0,0);
        c = a.top >= a.bottom || a.left >= a.right ? new F(0,0,0,0) : a;
        a = this.h.o;
        b = e = d = 0;
        0 < (this.g.bottom - this.g.top) * (this.g.right - this.g.left) && (this.ke(c) ? c = new F(0,0,0,0) : (d = Tn().l,
        b = new F(0,d.height,d.width,0),
        d = To(c, this.g),
        e = To(c, Tn().g),
        b = To(c, b)));
        c = c.top >= c.bottom || c.left >= c.right ? new F(0,0,0,0) : bj(c, -this.g.left, -this.g.top);
        Un() || (e = d = 0);
        this.H = new en(a,this.g,c,d,e,this.timestamp,b)
    }
    ;
    l.getName = function() {
        return this.h.getName()
    }
    ;
    var Wp = new F(0,0,0,0)
      , Xp = function(a, b, c) {
        eo.call(this, null, a, b, c);
        this.B = a.isActive();
        this.A = 0
    };
    u(Xp, Vp);
    l = Xp.prototype;
    l.Vc = function() {
        this.o();
        return !0
    }
    ;
    l.ab = function() {
        Vp.prototype.Xa.call(this)
    }
    ;
    l.Zd = function() {}
    ;
    l.Xc = function() {}
    ;
    l.Xa = function() {
        this.o();
        Vp.prototype.Xa.call(this)
    }
    ;
    l.Cb = function(a) {
        a = a.isActive();
        a !== this.B && (a ? this.o() : (Tn().g = new F(0,0,0,0),
        this.g = new F(0,0,0,0),
        this.l = new F(0,0,0,0),
        this.timestamp = -1));
        this.B = a
    }
    ;
    function Yp(a) {
        return [a.top, a.left, a.bottom, a.right]
    }
    var Zp = {}
      , $p = (Zp.firstquartile = 0,
    Zp.midpoint = 1,
    Zp.thirdquartile = 2,
    Zp.complete = 3,
    Zp)
      , aq = function(a, b, c, d, e, f) {
        f = void 0 === f ? new Up : f;
        $o.call(this, b, c, d);
        this.td = e;
        this.dd = 0;
        this.ia = {};
        this.fa = new Jp;
        this.Fe = {};
        this.la = "";
        this.ib = null;
        this.Na = !1;
        this.g = [];
        this.Ta = f.h();
        this.A = f.j();
        this.l = null;
        this.j = -1;
        this.Z = this.F = void 0;
        this.I = this.G = 0;
        this.U = -1;
        this.ma = this.ba = !1;
        this.O = this.D = this.h = this.Hb = this.Ma = 0;
        new zo;
        this.V = this.aa = 0;
        this.ha = -1;
        this.ka = 0;
        this.B = lg;
        this.M = [this.uc()];
        this.zb = 2;
        this.wb = {};
        this.wb.pause = "p";
        this.wb.resume = "r";
        this.wb.skip = "s";
        this.wb.mute = "m";
        this.wb.unmute = "um";
        this.wb.exitfullscreen = "ef";
        this.o = null;
        this.Ea = this.Fa = !1;
        this.xb = Math.floor(Date.now() / 1E3 - 1704067200);
        this.X = 0
    };
    u(aq, $o);
    aq.prototype.Ka = function() {
        return !0
    }
    ;
    var bq = function(a) {
        a.je = !0;
        0 != a.ka && (a.ka = 3)
    }
      , cq = function(a) {
        return void 0 === a ? a : Number(a) ? En(a, 3) : 0
    };
    l = aq.prototype;
    l.ge = function(a) {
        return cp(this, a, Math.max(1E4, this.j / 3))
    }
    ;
    l.Jd = function(a, b, c, d, e, f, g) {
        var h = this
          , k = this.B(this) || {};
        Mg(k, e);
        this.j = k.duration || this.j;
        this.F = k.isVpaid || this.F;
        this.Z = k.isYouTube || this.Z;
        xm();
        this.Ea = !1;
        e = dq(this, b);
        1 === eq(this) && (f = e);
        $o.prototype.Jd.call(this, a, b, c, d, k, f, g);
        this.Ta && this.Ta.j && Nb(this.A, function(m) {
            m.h(h)
        })
    }
    ;
    l.Kd = function(a, b, c) {
        $o.prototype.Kd.call(this, a, b, c);
        fq(this).K(a, b, this.pa, c);
        this.ma = lp(this.pa) && lp(b);
        -1 == this.U && this.ba && (this.U = this.oa().j.g);
        this.fa.j = 0;
        a = this.Ra();
        b.isVisible() && this.fa.reportEvent("vs");
        a && this.fa.reportEvent("vw");
        Ln(b.volume) && this.fa.reportEvent("am");
        lp(b) ? this.fa.reportEvent("a") : this.fa.reportEvent("mut");
        this.Db && this.fa.reportEvent("f");
        -1 != b.h && (this.fa.reportEvent("bm"),
        1 == b.h && (this.fa.reportEvent("b"),
        lp(b) && this.fa.reportEvent("umutb")));
        lp(b) && b.isVisible() && this.fa.reportEvent("avs");
        this.ma && a && this.fa.reportEvent("avw");
        0 < b.Y && this.fa.reportEvent("pv");
        gq(this, this.oa().j.g, !0) && this.fa.reportEvent("gdr");
        2E3 <= Fo(this.oa().h, 1) && this.fa.reportEvent("pmx");
        this.Ea && this.fa.reportEvent("tvoff")
    }
    ;
    l.uc = function() {
        return new Op
    }
    ;
    l.oa = function() {
        return this.Gc
    }
    ;
    var fq = function(a, b) {
        return a.M[null != b && b < a.M.length ? b : a.M.length - 1]
    };
    aq.prototype.ed = function() {
        return new kp
    }
    ;
    aq.prototype.Wc = function(a, b, c, d) {
        a = $o.prototype.Wc.call(this, a, b, c, void 0 === d ? -1 : d);
        a.fullscreen = this.Db;
        a.j = 2 == this.ka;
        a.volume = c.volume;
        Ln(a.volume) || (this.Ma++,
        b = this.pa,
        Ln(b.volume) && (a.volume = b.volume));
        c = c.currentTime;
        a.mediaTime = void 0 !== c && 0 <= c ? c : -1;
        return a
    }
    ;
    var eq = function(a) {
        var b = !!gm(N().P, "umt");
        return a.F || !b && !a.Z ? 0 : 1
    }
      , dq = function(a, b) {
        2 == a.ka ? b = 0 : -1 == a.yc ? b = 0 : (b -= a.yc,
        b = b > Math.max(1E4, a.j / 3) ? 0 : b);
        var c = a.B(a) || {};
        c = void 0 !== c.currentTime ? c.currentTime : a.G;
        var d = c - a.G
          , e = 0;
        0 <= d ? (a.I += b,
        a.V += Math.max(b - d, 0),
        e = Math.min(d, a.I)) : a.aa += Math.abs(d);
        0 != d && (a.I = 0);
        -1 == a.ha && 0 < d && (a.ha = 0 <= $m ? bn() - $m : -1);
        a.G = c;
        return e
    };
    aq.prototype.Zc = function(a) {
        return Tn(),
        this.Db ? 1 : $o.prototype.Zc.call(this, a)
    }
    ;
    aq.prototype.wa = function() {
        return 1
    }
    ;
    aq.prototype.getDuration = function() {
        return this.j
    }
    ;
    var hq = function(a, b) {
        Sb(a.A, function(c) {
            return c.o == b.o
        }) || a.A.push(b)
    }
      , iq = function(a) {
        var b = Do(a.oa().g, 1);
        return gq(a, b)
    }
      , gq = function(a, b, c) {
        return 15E3 <= b ? !0 : a.ba ? (void 0 === c ? 0 : c) ? !0 : 0 < a.j ? b >= a.j / 2 : 0 < a.U ? b >= a.U : !1 : !1
    }
      , jq = function(a) {
        var b = {}
          , c = Tn();
        b.insideIframe = c.j;
        b.unmeasurable = a.Pa;
        b.position = a.pb();
        b.exposure = a.pa.Y;
        b.documentSize = c.o;
        b.viewportSize = new D(c.g.getWidth(),c.g.getHeight());
        null != a.o && (b.presenceData = a.o);
        b.screenShare = a.pa.sa;
        return b
    }
      , kq = function(a) {
        var b = En(a.pa.Y, 2)
          , c = a.fa.j
          , d = a.pa
          , e = fq(a)
          , f = cq(e.o)
          , g = cq(e.A)
          , h = cq(d.volume)
          , k = En(e.B, 2)
          , m = En(e.G, 2)
          , n = En(d.Y, 2)
          , q = En(e.I, 2)
          , t = En(e.O, 2);
        d = En(d.sa, 2);
        a = aj(a.pb());
        a.round();
        e = Lo(e, !1);
        return {
            Bg: b,
            Rb: c,
            Hc: f,
            Dc: g,
            Jb: h,
            Ic: k,
            Ec: m,
            Y: n,
            Jc: q,
            Fc: t,
            sa: d,
            position: a,
            Kc: e
        }
    }
      , mq = function(a, b) {
        lq(a.g, b, function() {
            return {
                Bg: 0,
                Rb: void 0,
                Hc: -1,
                Dc: -1,
                Jb: -1,
                Ic: -1,
                Ec: -1,
                Y: -1,
                Jc: -1,
                Fc: -1,
                sa: -1,
                position: void 0,
                Kc: []
            }
        });
        a.g[b] = kq(a)
    }
      , lq = function(a, b, c) {
        for (var d = a.length; d < b + 1; )
            a.push(c()),
            d++
    }
      , pq = function(a, b, c) {
        var d = a.Fe[b];
        if (null != d)
            return d;
        d = nq(a, b);
        var e = Gg(function(f) {
            return f == b
        });
        a = oq(a, d, d, c, $p[Hg[e]]);
        "fully_viewable_audible_half_duration_impression" == b && (a.std = "csm");
        return a
    }
      , qq = function(a, b, c) {
        var d = [b];
        if (a != b || c != b)
            d.unshift(a),
            d.push(c);
        return d
    }
      , oq = function(a, b, c, d, e) {
        if (a.Pa)
            return {
                "if": 0,
                vs: 0
            };
        var f = aj(a.pb());
        f.round();
        var g = Tn()
          , h = N()
          , k = a.oa()
          , m = a.ca ? a.ca.getName() : "ns"
          , n = {};
        n["if"] = g.j ? 1 : void 0;
        n.sdk = a.l ? a.l : void 0;
        n.t = a.sg;
        n.p = [f.top, f.left, f.bottom, f.right];
        n.tos = Bo(k.h, !1);
        n.mtos = Lo(k);
        n.mcvt = k.X.j;
        n.ps = void 0;
        n.vht = Pp(k, bn(), 2 == a.ka);
        n.mut = k.ma.j;
        n.a = cq(a.pa.volume);
        n.mv = cq(k.A);
        n.fs = a.Db ? 1 : 0;
        n.ft = k.F.g;
        n.at = k.l.g;
        n.as = 0 < k.o ? 1 : 0;
        n.atos = Bo(k.g);
        n.ssb = Bo(k.ba, !1);
        n.amtos = Eo(k.g, !1);
        n.uac = a.Ma;
        n.vpt = k.j.g;
        "nio" == m && (n.nio = 1,
        n.avms = "nio");
        n.gmm = "4";
        n.gdr = gq(a, k.j.g, !0) ? 1 : 0;
        n.efpf = a.zb;
        if ("gsv" == m || "nis" == m)
            f = a.ca,
            0 < f.A && (n.nnut = f.A);
        n.tcm = eq(a);
        n.nmt = a.aa;
        n.bt = a.V;
        n.pst = a.ha;
        n.vpaid = a.F;
        n.dur = a.j;
        n.vmtime = a.G;
        n.is = a.fa.j;
        1 <= a.g.length && (n.i0 = a.g[0].Rb,
        n.a0 = [a.g[0].Jb],
        n.c0 = [a.g[0].Y],
        n.ss0 = [a.g[0].sa],
        f = a.g[0].position,
        n.p0 = f ? Yp(f) : void 0);
        2 <= a.g.length && (n.i1 = a.g[1].Rb,
        n.a1 = qq(a.g[1].Hc, a.g[1].Jb, a.g[1].Dc),
        n.c1 = qq(a.g[1].Ic, a.g[1].Y, a.g[1].Ec),
        n.ss1 = qq(a.g[1].Jc, a.g[1].sa, a.g[1].Fc),
        f = a.g[1].position,
        n.p1 = f ? Yp(f) : void 0,
        n.mtos1 = a.g[1].Kc);
        3 <= a.g.length && (n.i2 = a.g[2].Rb,
        n.a2 = qq(a.g[2].Hc, a.g[2].Jb, a.g[2].Dc),
        n.c2 = qq(a.g[2].Ic, a.g[2].Y, a.g[2].Ec),
        n.ss2 = qq(a.g[2].Jc, a.g[2].sa, a.g[2].Fc),
        f = a.g[2].position,
        n.p2 = f ? Yp(f) : void 0,
        n.mtos2 = a.g[2].Kc);
        4 <= a.g.length && (n.i3 = a.g[3].Rb,
        n.a3 = qq(a.g[3].Hc, a.g[3].Jb, a.g[3].Dc),
        n.c3 = qq(a.g[3].Ic, a.g[3].Y, a.g[3].Ec),
        n.ss3 = qq(a.g[3].Jc, a.g[3].sa, a.g[3].Fc),
        f = a.g[3].position,
        n.p3 = f ? Yp(f) : void 0,
        n.mtos3 = a.g[3].Kc);
        n.cs = Lp(a.fa);
        b && (n.ic = Kp(a.fa),
        n.dvpt = k.j.h,
        n.dvs = Go(k.h, .5),
        n.dfvs = Go(k.h, 1),
        n.davs = Go(k.g, .5),
        n.dafvs = Go(k.g, 1),
        c && (k.j.h = 0,
        Ho(k.h),
        Ho(k.g)),
        a.Ra() && (n.dtos = k.M,
        n.dav = k.D,
        n.dtoss = a.dd + 1,
        c && (k.M = 0,
        k.D = 0,
        a.dd++)),
        n.dat = k.l.h,
        n.dft = k.F.h,
        c && (k.l.h = 0,
        k.F.h = 0));
        n.ps = [g.o.width, g.o.height];
        n.bs = [g.g.getWidth(), g.g.getHeight()];
        n.scs = [g.l.width, g.l.height];
        n.dom = g.domain;
        a.Hb && (n.vds = a.Hb);
        if (0 < a.A.length || a.Ta)
            b = ac(a.A),
            a.Ta && b.push(a.Ta),
            n.pings = Qb(b, function(q) {
                return q.toString()
            });
        b = Qb(Pb(a.A, function(q) {
            return q.A()
        }), function(q) {
            return q.getId()
        });
        bc(b);
        n.ces = b;
        a.h && (n.vmer = a.h);
        a.D && (n.vmmk = a.D);
        a.O && (n.vmiec = a.O);
        n.avms = a.ca ? a.ca.getName() : "ns";
        a.ca && Mg(n, a.ca.Za());
        d ? (n.c = En(a.pa.Y, 2),
        n.ss = En(a.pa.sa, 2)) : n.tth = bn() - Zm;
        n.mc = En(k.G, 2);
        n.nc = En(k.B, 2);
        n.mv = cq(k.A);
        n.nv = cq(k.o);
        n.lte = En(a.kd, 2);
        d = fq(a, e);
        Lo(k);
        n.qmtos = Lo(d);
        n.qnc = En(d.B, 2);
        n.qmv = cq(d.A);
        n.qnv = cq(d.o);
        n.qas = 0 < d.o ? 1 : 0;
        n.qi = a.la;
        n.avms || (n.avms = "geo");
        n.psm = k.U.g;
        n.psv = k.U.getValue();
        n.psfv = k.aa.getValue();
        n.psa = k.Z.getValue();
        h = im(h.P);
        h.length && (n.veid = h);
        a.o && Mg(n, jp(a.o));
        n.avas = a.sc();
        n.vs = a.ie();
        n.co = rq(a);
        return n
    }
      , nq = function(a, b) {
        if (Wb(jn, b))
            return !0;
        var c = a.ia[b];
        return void 0 !== c ? (a.ia[b] = !0,
        !c) : !1
    };
    aq.prototype.ie = function() {
        return this.Pa ? 2 : iq(this) ? 5 : this.Ra() ? 4 : 3
    }
    ;
    aq.prototype.sc = function() {
        return this.Fa ? 2E3 <= this.oa().l.j ? 4 : 3 : 2
    }
    ;
    var rq = function(a) {
        var b = a.X.toString(10).padStart(2, "0");
        b = "" + a.xb + b;
        99 > a.X && a.X++;
        return b
    };
    var sq = Date.now()
      , vq = function() {
        this.g = {};
        var a = E();
        tq(this, a, document);
        var b = uq();
        try {
            if ("1" == b) {
                for (var c = a.parent; c != a.top; c = c.parent)
                    tq(this, c, c.document);
                tq(this, a.top, a.top.document)
            }
        } catch (d) {}
    }
      , uq = function() {
        var a = document.documentElement;
        try {
            if (!Vh(E().top))
                return "2";
            var b = []
              , c = E(a.ownerDocument);
            for (a = c; a != c.top; a = a.parent)
                if (a.frameElement)
                    b.push(a.frameElement);
                else
                    break;
            return b && 0 != b.length ? "1" : "0"
        } catch (d) {
            return "2"
        }
    }
      , tq = function(a, b, c) {
        Ro(c, "mousedown", function() {
            return wq(a)
        }, 301);
        Ro(b, "scroll", function() {
            return xq(a)
        }, 302);
        Ro(c, "touchmove", function() {
            return yq(a)
        }, 303);
        Ro(c, "mousemove", function() {
            return zq(a)
        }, 304);
        Ro(c, "keydown", function() {
            return Aq(a)
        }, 305)
    }
      , wq = function(a) {
        xg(a.g, function(b) {
            1E5 < b.j || ++b.j
        })
    }
      , xq = function(a) {
        xg(a.g, function(b) {
            1E5 < b.g || ++b.g
        })
    }
      , yq = function(a) {
        xg(a.g, function(b) {
            1E5 < b.g || ++b.g
        })
    }
      , Aq = function(a) {
        xg(a.g, function(b) {
            1E5 < b.h || ++b.h
        })
    }
      , zq = function(a) {
        xg(a.g, function(b) {
            1E5 < b.o || ++b.o
        })
    };
    var Bq = function() {
        this.g = [];
        this.h = []
    }
      , Cq = function(a, b) {
        return Tb(a.g, function(c) {
            return c.la == b
        })
    }
      , Dq = function(a, b) {
        return b ? Tb(a.g, function(c) {
            return c.ta.gb == b
        }) : null
    }
      , Eq = function(a, b) {
        return Tb(a.h, function(c) {
            return 2 == c.wa() && c.la == b
        })
    }
      , Gq = function() {
        var a = Fq;
        return 0 == a.g.length ? a.h : 0 == a.h.length ? a.g : $b(a.h, a.g)
    };
    Bq.prototype.reset = function() {
        this.g = [];
        this.h = []
    }
    ;
    var Hq = function(a, b) {
        a = 1 == b.wa() ? a.g : a.h;
        var c = Ub(a, function(d) {
            return d == b
        });
        return -1 != c ? (a.splice(c, 1),
        b.ca && b.ca.Xb(),
        b.W(),
        !0) : !1
    }
      , Iq = function(a) {
        var b = Fq;
        if (Hq(b, a)) {
            switch (a.wa()) {
            case 0:
                var c = function() {
                    return null
                };
            case 2:
                c = function() {
                    return Eq(b, a.la)
                }
                ;
                break;
            case 1:
                c = function() {
                    return Cq(b, a.la)
                }
            }
            for (var d = c(); d; d = c())
                Hq(b, d)
        }
    }
      , Jq = function(a) {
        var b = Fq;
        a = Pb(a, function(c) {
            return !Dq(b, c.ta.gb)
        });
        b.g.push.apply(b.g, ia(a))
    }
      , Kq = function(a) {
        var b = [];
        Nb(a, function(c) {
            Sb(Fq.g, function(d) {
                return d.ta.gb === c.ta.gb && d.la === c.la
            }) || (Fq.g.push(c),
            b.push(c))
        })
    }
      , Fq = C(Bq);
    var Lq = function() {
        this.g = this.h = null
    }
      , Mq = function(a, b) {
        if (null == a.h)
            return !1;
        var c = function(d, e) {
            b(d, e)
        };
        a.g = Tb(a.h, function(d) {
            return null != d && d.Pd()
        });
        a.g && (a.g.init(c) ? ao(a.g.g) : b(a.g.g.Ab(), a.g));
        return null != a.g
    };
    var Oq = function(a) {
        a = Nq(a);
        fo.call(this, a.length ? a[a.length - 1] : new Xn(O,0));
        this.j = a;
        this.h = null
    };
    u(Oq, fo);
    l = Oq.prototype;
    l.getName = function() {
        return (this.h ? this.h : this.g).getName()
    }
    ;
    l.Za = function() {
        return (this.h ? this.h : this.g).Za()
    }
    ;
    l.Oa = function() {
        return (this.h ? this.h : this.g).Oa()
    }
    ;
    l.init = function(a) {
        var b = !1;
        Nb(this.j, function(c) {
            c.initialize() && (b = !0)
        });
        b && (this.o = a,
        $n(this.g, this));
        return b
    }
    ;
    l.W = function() {
        Nb(this.j, function(a) {
            a.W()
        });
        fo.prototype.W.call(this)
    }
    ;
    l.Pd = function() {
        return Sb(this.j, function(a) {
            return a.F()
        })
    }
    ;
    l.Ib = function() {
        return Sb(this.j, function(a) {
            return a.F()
        })
    }
    ;
    l.Yb = function(a, b, c) {
        return new Vp(a,this.g,b,c)
    }
    ;
    l.ab = function(a) {
        this.h = a.h
    }
    ;
    var Nq = function(a) {
        if (!a.length)
            return [];
        a = Pb(a, function(c) {
            return null != c && c.F()
        });
        for (var b = 1; b < a.length; b++)
            $n(a[b - 1], a[b]);
        return a
    };
    var Pq = {
        threshold: [0, .3, .5, .75, 1]
    }
      , Qq = function(a, b, c, d) {
        eo.call(this, a, b, c, d);
        this.D = this.K = this.A = this.B = this.o = null
    };
    u(Qq, Vp);
    Qq.prototype.Vc = function() {
        var a = this;
        this.D || (this.D = bn());
        if (Tm(298, function() {
            return Rq(a)
        }))
            return !0;
        Zn(this.h, "msf");
        return !1
    }
    ;
    Qq.prototype.Xb = function() {
        if (this.o && this.j)
            try {
                this.o.unobserve(this.j),
                this.B ? (this.B.unobserve(this.j),
                this.B = null) : this.A && (this.A.disconnect(),
                this.A = null)
            } catch (a) {}
    }
    ;
    var Sq = function(a) {
        return a.o && a.o.takeRecords ? a.o.takeRecords() : []
    }
      , Rq = function(a) {
        if (!a.j)
            return !1;
        var b = a.j
          , c = a.h.g.j
          , d = N().g.g;
        a.o = new c.IntersectionObserver(Dm(d, function(e) {
            return Tq(a, e)
        }),Pq);
        d = Dm(d, function() {
            a.o.unobserve(b);
            a.o.observe(b);
            Tq(a, Sq(a))
        });
        c.ResizeObserver ? (a.B = new c.ResizeObserver(d),
        a.B.observe(b)) : c.MutationObserver && (a.A = new w.MutationObserver(d),
        a.A.observe(b, {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0
        }));
        a.o.observe(b);
        Tq(a, Sq(a));
        return !0
    }
      , Tq = function(a, b) {
        try {
            if (b.length) {
                a.K || (a.K = bn());
                var c = Uq(b)
                  , d = vn(a.j, a.h.g.j)
                  , e = d.x
                  , f = d.y;
                a.g = new F(Math.round(f),Math.round(e) + c.boundingClientRect.width,Math.round(f) + c.boundingClientRect.height,Math.round(e));
                var g = Jn(c.intersectionRect);
                a.l = bj(g, a.g.left - g.left, a.g.top - g.top)
            }
        } catch (h) {
            a.Xb(),
            Vm(299, h)
        }
    }
      , Uq = function(a) {
        return Rb(a, function(b, c) {
            return b.time > c.time ? b : c
        }, a[0])
    };
    l = Qq.prototype;
    l.Xa = function() {
        var a = Sq(this);
        0 < a.length && Tq(this, a);
        Vp.prototype.Xa.call(this)
    }
    ;
    l.Xc = function() {}
    ;
    l.ke = function() {
        return !1
    }
    ;
    l.Yd = function() {}
    ;
    l.Za = function() {
        var a = {};
        return Object.assign(this.h.Za(), (a.niot_obs = this.D,
        a.niot_cbk = this.K,
        a))
    }
    ;
    l.getName = function() {
        return "nio"
    }
    ;
    var Vq = function(a) {
        a = void 0 === a ? O : a;
        fo.call(this, new Xn(a,2))
    };
    u(Vq, fo);
    Vq.prototype.getName = function() {
        return "nio"
    }
    ;
    Vq.prototype.Ib = function() {
        return !Tn().h && null != this.g.g.j.IntersectionObserver
    }
    ;
    Vq.prototype.Yb = function(a, b, c) {
        return new Qq(a,this.g,b,c)
    }
    ;
    var Xq = function() {
        var a = Wq();
        Xn.call(this, O.top, a, "geo")
    };
    u(Xq, Xn);
    Xq.prototype.aa = function() {
        return Tn().g
    }
    ;
    Xq.prototype.F = function() {
        var a = Wq();
        this.K !== a && (this.g != this && a > this.g.K && (this.g = this,
        Yn(this)),
        this.K = a);
        return 2 == a
    }
    ;
    var Wq = function() {
        N();
        var a = Tn();
        return a.j || a.h ? 0 : 2
    };
    var Yq = function() {};
    var Zq = function() {
        this.done = !1;
        this.g = {
            nf: 0,
            Vd: 0,
            Ci: 0,
            de: 0,
            hd: -1,
            vf: 0,
            uf: 0,
            wf: 0,
            pg: 0
        };
        this.l = null;
        this.A = !1;
        this.j = null;
        this.B = 0;
        this.h = new Vn(this)
    }
      , br = function() {
        var a = $q;
        a.A || (a.A = !0,
        ar(a, function() {
            return a.o.apply(a, ia(Ja.apply(0, arguments)))
        }),
        a.o())
    };
    Zq.prototype.sample = function() {
        cr(this, Gq(), !1)
    }
    ;
    var dr = function() {
        C(Yq);
        var a = C(Lq);
        null != a.g && a.g.g ? ao(a.g.g) : Pn(Tn())
    }
      , cr = function(a, b, c) {
        if (!a.done && (a.h.cancel(),
        0 != b.length)) {
            a.j = null;
            try {
                dr();
                var d = bn();
                N().l = d;
                if (null != C(Lq).g)
                    for (var e = 0; e < b.length; e++)
                        dp(b[e], d, c);
                for (d = 0; d < b.length; d++)
                    ep(b[d]);
                ++a.g.de
            } finally {
                c ? Nb(b, function(f) {
                    f.pa.Y = 0
                }) : Wn(a.h)
            }
        }
    }
      , ar = function(a, b) {
        if (!a.l) {
            b = Um(142, b);
            xm();
            var c = sj(lm);
            c && rg(lm, c, b, {
                capture: !1
            }) && (a.l = b)
        }
    };
    Zq.prototype.o = function() {
        var a = Un()
          , b = bn();
        a ? (an || (Xm = b,
        Nb(Fq.g, function(c) {
            var d = c.oa();
            d.V = Pp(d, b, 1 != c.ka)
        })),
        an = !0) : (this.B = er(this, b),
        an = !1,
        Zm = b,
        Nb(Fq.g, function(c) {
            c.Mb && (c.oa().H = b)
        }));
        cr(this, Gq(), !a)
    }
    ;
    var fr = function() {
        var a = C(Lq);
        if (null != a.g) {
            var b = a.g;
            Nb(Gq(), function(c) {
                return bp(c, b)
            })
        }
    }
      , er = function(a, b) {
        a = a.B;
        an && (a += b - Xm);
        return a
    }
      , gr = function(a) {
        a = void 0 === a ? function() {
            return {}
        }
        : a;
        Qm.Ed("av-js");
        Mm.g = .01;
        Sm([function(b) {
            var c = N()
              , d = {};
            d = (d.bin = c.h,
            d.type = "error",
            d);
            c = hm(c.P);
            if (!$q.j) {
                var e = $q
                  , f = O.document
                  , g = 0 <= Ym ? bn() - Ym : -1
                  , h = bn();
                -1 == e.g.hd && (g = h);
                var k = Tn()
                  , m = N()
                  , n = hm(m.P)
                  , q = Gq();
                try {
                    if (0 < q.length) {
                        var t = k.g;
                        t && (n.bs = [t.getWidth(), t.getHeight()]);
                        var v = k.o;
                        v && (n.ps = [v.width, v.height]);
                        O.screen && (n.scs = [O.screen.width, O.screen.height])
                    } else
                        n.url = encodeURIComponent(O.location.href.substring(0, 512)),
                        f.referrer && (n.referrer = encodeURIComponent(f.referrer.substring(0, 512)));
                    n.tt = g;
                    n.pt = Ym;
                    n.bin = m.h;
                    void 0 !== O.google_osd_load_pub_page_exp && (n.olpp = O.google_osd_load_pub_page_exp);
                    n.deb = [1, e.g.nf, e.g.Vd, e.g.de, e.g.hd, 0, e.h.h, e.g.vf, e.g.uf, e.g.wf, e.g.pg, -1].join(";");
                    n.tvt = er(e, h);
                    k.h && (n.inapp = 1);
                    if (null !== O && O != O.top) {
                        0 < q.length && (n.iframe_loc = encodeURIComponent(O.location.href.substring(0, 512)));
                        var x = k.H;
                        n.is = [x.getWidth(), x.getHeight()]
                    }
                } catch (T) {
                    n.error = 1
                }
                $q.j = n
            }
            v = $q.j;
            t = {};
            for (var H in v)
                t[H] = v[H];
            H = N().g;
            if (1 == gm(H.j, "prf")) {
                v = new Bm;
                x = H.g;
                e = 0;
                -1 < x.g && (e = x.j.g.now() - x.g);
                x = x.o + e;
                if (null != x && "number" !== typeof x)
                    throw Error("Value of float/double field must be a number, found " + typeof x + ": " + x);
                v = Ze(v, 1, x, 0);
                x = H.g;
                v = Ze(v, 5, ne(-1 < x.g ? x.h + 1 : x.h), 0);
                v = Ze(v, 2, qe(H.h.g.j()), "0");
                v = Ze(v, 3, qe(H.h.g.h()), "0");
                H = Ze(v, 4, qe(H.h.g.g()), "0");
                v = {};
                H = (v.pf = Pc(H.g()),
                v)
            } else
                H = {};
            Mg(t, H);
            Mg(b, d, c, t, a())
        }
        ])
    }
      , $q = C(Zq);
    var hr = null
      , ir = ""
      , jr = !1
      , kr = function() {
        var a = hr || O;
        if (!a)
            return "";
        var b = [];
        if (!a.location || !a.location.href)
            return "";
        b.push("url=" + encodeURIComponent(a.location.href.substring(0, 512)));
        a.document && a.document.referrer && b.push("referrer=" + encodeURIComponent(a.document.referrer.substring(0, 512)));
        return b.join("&")
    };
    function lr() {
        var a = "av.default_js_unreleased_RCxx".match(/_(\d{8})_RC\d+$/) || "av.default_js_unreleased_RCxx".match(/_(\d{8})_\d+_\d+$/) || "av.default_js_unreleased_RCxx".match(/_(\d{8})_\d+\.\d+$/) || "av.default_js_unreleased_RCxx".match(/_(\d{8})_\d+_RC\d+$/), b;
        if (2 == (null == (b = a) ? void 0 : b.length))
            return a[1];
        a = "av.default_js_unreleased_RCxx".match(/.*_(\d{2})\.(\d{4})\.\d+_RC\d+$/);
        var c;
        return 3 == (null == (c = a) ? void 0 : c.length) ? "20" + a[1] + a[2] : null
    }
    var mr = function() {
        return "ima_html5_sdk".includes("ima_html5_sdk") ? {
            Ha: "ima",
            Ia: null
        } : "ima_html5_sdk".includes("ima_native_sdk") ? {
            Ha: "nima",
            Ia: null
        } : "ima_html5_sdk".includes("admob-native-video-javascript") ? {
            Ha: "an",
            Ia: null
        } : "av.default_js_unreleased_RCxx".includes("cast_js_sdk") ? {
            Ha: "cast",
            Ia: lr()
        } : "av.default_js_unreleased_RCxx".includes("youtube.player.web") ? {
            Ha: "yw",
            Ia: lr()
        } : "av.default_js_unreleased_RCxx".includes("outstream_web_client") ? {
            Ha: "out",
            Ia: lr()
        } : "av.default_js_unreleased_RCxx".includes("drx_rewarded_web") ? {
            Ha: "r",
            Ia: lr()
        } : "av.default_js_unreleased_RCxx".includes("gam_native_web_video") ? {
            Ha: "n",
            Ia: lr()
        } : "av.default_js_unreleased_RCxx".includes("admob_interstitial_video") ? {
            Ha: "int",
            Ia: lr()
        } : {
            Ha: "j",
            Ia: null
        }
    }
      , nr = mr().Ha
      , or = mr().Ia;
    var qr = function(a, b) {
        var c = {
            sv: "961"
        };
        null !== or && (c.v = or);
        c.cb = nr;
        c.nas = Fq.g.length;
        c.msg = a;
        void 0 !== b && (a = pr(b)) && (c.e = kn[a]);
        return c
    }
      , rr = function(a) {
        return 0 == a.lastIndexOf("custom_metric_viewable", 0)
    }
      , pr = function(a) {
        var b = rr(a) ? "custom_metric_viewable" : a.toLowerCase();
        return Gg(function(c) {
            return c == b
        })
    };
    var sr = {
        Wg: "visible",
        Fg: "audible",
        Th: "time",
        Vh: "timetype"
    }
      , tr = {
        visible: function(a) {
            return /^(100|[0-9]{1,2})$/.test(a)
        },
        audible: function(a) {
            return "0" == a || "1" == a
        },
        timetype: function(a) {
            return "mtos" == a || "tos" == a
        },
        time: function(a) {
            return /^(100|[0-9]{1,2})%$/.test(a) || /^([0-9])+ms$/.test(a)
        }
    }
      , ur = function() {
        this.g = void 0;
        this.h = !1;
        this.j = 0;
        this.o = -1;
        this.l = "tos"
    }
      , vr = function(a) {
        try {
            var b = a.split(",");
            return b.length > Cg(sr).length ? null : Rb(b, function(c, d) {
                d = d.toLowerCase().split("=");
                if (2 != d.length || void 0 === tr[d[0]] || !tr[d[0]](d[1]))
                    throw Error("Entry (" + d[0] + ", " + d[1] + ") is invalid.");
                c[d[0]] = d[1];
                return c
            }, {})
        } catch (c) {
            return null
        }
    }
      , wr = function(a, b) {
        if (void 0 == a.g)
            return 0;
        switch (a.l) {
        case "mtos":
            return a.h ? Fo(b.g, a.g) : Fo(b.h, a.g);
        case "tos":
            return a.h ? Do(b.g, a.g) : Do(b.h, a.g)
        }
        return 0
    };
    var xr = function(a, b, c, d) {
        Rp.call(this, b, d);
        this.B = a;
        this.H = c
    };
    u(xr, Rp);
    xr.prototype.getId = function() {
        return this.B
    }
    ;
    xr.prototype.A = function() {
        return !0
    }
    ;
    xr.prototype.g = function(a) {
        var b = a.oa()
          , c = a.getDuration();
        return Sb(this.H, function(d) {
            if (void 0 != d.g)
                var e = wr(d, b);
            else
                b: {
                    switch (d.l) {
                    case "mtos":
                        e = d.h ? b.l.j : b.j.g;
                        break b;
                    case "tos":
                        e = d.h ? b.l.g : b.j.g;
                        break b
                    }
                    e = 0
                }
            0 == e ? d = !1 : (d = -1 != d.j ? d.j : void 0 !== c && 0 < c ? d.o * c : -1,
            d = -1 != d && e >= d);
            return d
        })
    }
    ;
    var yr = function() {};
    u(yr, Hp);
    yr.prototype.g = function(a) {
        var b = new Gp;
        b.g = Ip(a, Dp);
        b.h = Ip(a, Fp);
        return b
    }
    ;
    var zr = function(a) {
        Rp.call(this, "fully_viewable_audible_half_duration_impression", a)
    };
    u(zr, Rp);
    zr.prototype.g = function(a) {
        return iq(a)
    }
    ;
    var Ar = function(a) {
        this.g = a
    };
    u(Ar, Tp);
    var Br = function(a, b) {
        Rp.call(this, a, b)
    };
    u(Br, Rp);
    Br.prototype.g = function(a) {
        return a.oa().Ra()
    }
    ;
    var Cr = function(a) {
        Sp.call(this, "measurable_impression", a)
    };
    u(Cr, Sp);
    Cr.prototype.g = function(a) {
        var b = Wb(this.B, gm(N().P, "ovms"));
        return !a.Pa && (0 != a.ka || b)
    }
    ;
    var Dr = function() {
        Ar.apply(this, arguments)
    };
    u(Dr, Ar);
    Dr.prototype.h = function() {
        return new Cr(this.g)
    }
    ;
    Dr.prototype.j = function() {
        return [new Br("viewable_impression",this.g), new zr(this.g)]
    }
    ;
    var Er = function(a, b, c) {
        Xp.call(this, a, b, c)
    };
    u(Er, Xp);
    Er.prototype.o = function() {
        var a = Na("ima.admob.getViewability")
          , b = gm(this.P, "queryid");
        "function" === typeof a && b && a(b)
    }
    ;
    Er.prototype.getName = function() {
        return "gsv"
    }
    ;
    var Fr = function(a) {
        a = void 0 === a ? O : a;
        fo.call(this, new Xn(a,2))
    };
    u(Fr, fo);
    Fr.prototype.getName = function() {
        return "gsv"
    }
    ;
    Fr.prototype.Ib = function() {
        var a = Tn();
        N();
        return a.h && !1
    }
    ;
    Fr.prototype.Yb = function(a, b, c) {
        return new Er(this.g,b,c)
    }
    ;
    var Gr = function(a, b, c) {
        Xp.call(this, a, b, c)
    };
    u(Gr, Xp);
    Gr.prototype.o = function() {
        var a = this
          , b = Na("ima.bridge.getNativeViewability")
          , c = gm(this.P, "queryid");
        "function" === typeof b && c && b(c, function(d) {
            Ig(d) && a.A++;
            var e = d.opt_nativeViewVisibleBounds || {}
              , f = d.opt_nativeViewHidden;
            a.g = Kn(d.opt_nativeViewBounds || {});
            var g = a.h.o;
            g.g = f ? aj(Wp) : Kn(e);
            a.timestamp = d.opt_nativeTime || -1;
            Tn().g = g.g;
            d = d.opt_nativeVolume;
            void 0 !== d && (g.volume = d)
        })
    }
    ;
    Gr.prototype.getName = function() {
        return "nis"
    }
    ;
    var Hr = function(a) {
        a = void 0 === a ? O : a;
        fo.call(this, new Xn(a,2))
    };
    u(Hr, fo);
    Hr.prototype.getName = function() {
        return "nis"
    }
    ;
    Hr.prototype.Ib = function() {
        var a = Tn();
        N();
        return a.h && !1
    }
    ;
    Hr.prototype.Yb = function(a, b, c) {
        return new Gr(this.g,b,c)
    }
    ;
    var Ir = function() {
        Xn.call(this, O, 2, "mraid");
        this.ha = 0;
        this.I = this.M = !1;
        this.H = null;
        this.h = ln(this.j);
        this.o.g = new F(0,0,0,0);
        this.ba = !1
    };
    u(Ir, Xn);
    Ir.prototype.F = function() {
        return null != this.h.Ba
    }
    ;
    Ir.prototype.Z = function() {
        var a = {};
        this.ha && (a.mraid = this.ha);
        this.M && (a.mlc = 1);
        a.mtop = this.h.og;
        this.H && (a.mse = this.H);
        this.ba && (a.msc = 1);
        a.mcp = this.h.kc;
        return a
    }
    ;
    Ir.prototype.A = function(a) {
        var b = Ja.apply(1, arguments);
        try {
            return this.h.Ba[a].apply(this.h.Ba, b)
        } catch (c) {
            Vm(538, c, .01, function(d) {
                d.method = a
            })
        }
    }
    ;
    var Jr = function(a, b, c) {
        a.A("addEventListener", b, c)
    };
    Ir.prototype.initialize = function() {
        var a = this;
        if (this.ua)
            return !this.Qb();
        this.ua = !0;
        if (2 === this.h.kc)
            return this.H = "ng",
            Zn(this, "w"),
            !1;
        if (1 === this.h.kc)
            return this.H = "mm",
            Zn(this, "w"),
            !1;
        Tn().K = !0;
        this.j.document.readyState && "complete" == this.j.document.readyState ? Kr(this) : Ro(this.j, "load", function() {
            xm().setTimeout(Um(292, function() {
                return Kr(a)
            }), 100)
        }, 292);
        return !0
    }
    ;
    var Kr = function(a) {
        N().o = !!a.A("isViewable");
        Jr(a, "viewableChange", Lr);
        "loading" === a.A("getState") ? Jr(a, "ready", Mr) : Nr(a)
    }
      , Nr = function(a) {
        "string" === typeof a.h.Ba.AFMA_LIDAR ? (a.M = !0,
        Or(a)) : (a.h.kc = 3,
        a.H = "nc",
        Zn(a, "w"))
    }
      , Or = function(a) {
        a.I = !1;
        var b = 1 == gm(N().P, "rmmt")
          , c = !!a.A("isViewable");
        (b ? !c : 1) && xm().setTimeout(Um(524, function() {
            a.I || (Pr(a),
            Vm(540, Error()),
            a.H = "mt",
            Zn(a, "w"))
        }), 500);
        Qr(a);
        Jr(a, a.h.Ba.AFMA_LIDAR, Rr)
    }
      , Qr = function(a) {
        var b = 1 == gm(N().P, "sneio")
          , c = void 0 !== a.h.Ba.AFMA_LIDAR_EXP_1
          , d = void 0 !== a.h.Ba.AFMA_LIDAR_EXP_2;
        (b = b && d) && (a.h.Ba.AFMA_LIDAR_EXP_2 = !0);
        c && (a.h.Ba.AFMA_LIDAR_EXP_1 = !b)
    }
      , Pr = function(a) {
        a.A("removeEventListener", a.h.Ba.AFMA_LIDAR, Rr);
        a.M = !1
    };
    Ir.prototype.U = function() {
        var a = Tn()
          , b = Sr(this, "getMaxSize");
        a.g = new F(0,b.width,b.height,0)
    }
    ;
    Ir.prototype.V = function() {
        Tn().l = Sr(this, "getScreenSize")
    }
    ;
    var Sr = function(a, b) {
        if ("loading" === a.A("getState"))
            return new D(-1,-1);
        b = a.A(b);
        if (!b)
            return new D(-1,-1);
        a = parseInt(b.width, 10);
        b = parseInt(b.height, 10);
        return isNaN(a) || isNaN(b) ? new D(-1,-1) : new D(a,b)
    };
    Ir.prototype.W = function() {
        Pr(this);
        Xn.prototype.W.call(this)
    }
    ;
    var Mr = function() {
        try {
            var a = C(Ir);
            a.A("removeEventListener", "ready", Mr);
            Nr(a)
        } catch (b) {
            Vm(541, b)
        }
    }
      , Rr = function(a, b) {
        try {
            var c = C(Ir);
            c.I = !0;
            var d = a ? new F(a.y,a.x + a.width,a.y + a.height,a.x) : new F(0,0,0,0);
            var e = bn()
              , f = Un();
            var g = new dn(e,f,c);
            g.g = d;
            g.volume = b;
            c.ab(g)
        } catch (h) {
            Vm(542, h)
        }
    }
      , Lr = function(a) {
        var b = N()
          , c = C(Ir);
        a && !b.o && (b.o = !0,
        c.ba = !0,
        c.H && Zn(c, "w", !0))
    };
    var Gm = new function(a, b) {
        this.key = a;
        this.defaultValue = void 0 === b ? !1 : b;
        this.valueType = "boolean"
    }
    ("45378663");
    var Ur = function() {
        this.j = this.ua = !1;
        this.g = this.h = null;
        var a = {};
        this.M = (a.start = this.Nf,
        a.firstquartile = this.If,
        a.midpoint = this.Kf,
        a.thirdquartile = this.Of,
        a.complete = this.Ff,
        a.error = this.Gf,
        a.pause = this.rd,
        a.resume = this.xe,
        a.skip = this.Mf,
        a.viewable_impression = this.Ja,
        a.mute = this.Gb,
        a.unmute = this.Gb,
        a.fullscreen = this.Jf,
        a.exitfullscreen = this.Hf,
        a.fully_viewable_audible_half_duration_impression = this.Ja,
        a.measurable_impression = this.Ja,
        a.abandon = this.rd,
        a.engagedview = this.Ja,
        a.impression = this.Ja,
        a.creativeview = this.Ja,
        a.progress = this.Gb,
        a.custom_metric_viewable = this.Ja,
        a.bufferstart = this.rd,
        a.bufferfinish = this.xe,
        a.audio_measurable = this.Ja,
        a.audio_audible = this.Ja,
        a);
        a = {};
        this.U = (a.overlay_resize = this.Lf,
        a.abandon = this.gd,
        a.close = this.gd,
        a.collapse = this.gd,
        a.overlay_unmeasurable_impression = function(b) {
            return pq(b, "overlay_unmeasurable_impression", Un())
        }
        ,
        a.overlay_viewable_immediate_impression = function(b) {
            return pq(b, "overlay_viewable_immediate_impression", Un())
        }
        ,
        a.overlay_unviewable_impression = function(b) {
            return pq(b, "overlay_unviewable_impression", Un())
        }
        ,
        a.overlay_viewable_end_of_session_impression = function(b) {
            return pq(b, "overlay_viewable_end_of_session_impression", Un())
        }
        ,
        a);
        N().h = 3;
        Tr(this)
    };
    Ur.prototype.l = function(a) {
        ap(a, !1);
        Iq(a)
    }
    ;
    Ur.prototype.H = function() {}
    ;
    var Vr = function(a, b, c, d) {
        a = a.A(null, d, !0, b);
        a.l = c;
        Jq([a]);
        return a
    };
    Ur.prototype.A = function(a, b, c, d) {
        var e = this;
        a = new aq(O,a,c ? b : -1,7,this.bd(),this.be());
        a.la = d;
        em(a.P);
        fm(a.P, "queryid", a.la);
        a.ud("");
        fp(a, function() {
            return e.I.apply(e, ia(Ja.apply(0, arguments)))
        }, function() {
            return e.O.apply(e, ia(Ja.apply(0, arguments)))
        });
        (d = C(Lq).g) && bp(a, d);
        a.ta.gb && C(Yq);
        return a
    }
    ;
    var Wr = function(a, b, c) {
        Nl(b);
        var d = a.g;
        Nb(b, function(e) {
            var f = Qb(e.j, function(g) {
                var h = vr(g);
                if (null == h)
                    g = null;
                else if (g = new ur,
                null != h.visible && (g.g = h.visible / 100),
                null != h.audible && (g.h = 1 == h.audible),
                null != h.time) {
                    var k = "mtos" == h.timetype ? "mtos" : "tos"
                      , m = nb(h.time, "%") ? "%" : "ms";
                    h = parseInt(h.time, 10);
                    "%" == m && (h /= 100);
                    "ms" == m ? (g.j = h,
                    g.o = -1) : (g.j = -1,
                    g.o = h);
                    g.l = void 0 === k ? "tos" : k
                }
                return g
            });
            Sb(f, function(g) {
                return null == g
            }) || hq(c, new xr(e.id,e.g,f,d))
        })
    }
      , Xr = function() {
        var a = []
          , b = N();
        a.push(C(Xq));
        gm(b.P, "mvp_lv") && a.push(C(Ir));
        b = [new Fr, new Hr];
        b.push(new Oq(a));
        b.push(new Vq(O));
        return b
    }
      , Zr = function(a) {
        if (!a.ua) {
            a.ua = !0;
            try {
                var b = bn()
                  , c = N()
                  , d = Tn();
                Ym = b;
                c.j = 79463069;
                "o" !== a.h && (hr = hi(O));
                if (ym()) {
                    $q.g.Vd = 0;
                    $q.g.hd = bn() - b;
                    var e = Xr()
                      , f = C(Lq);
                    f.h = e;
                    Mq(f, function() {
                        Yr()
                    }) ? $q.done || (fr(),
                    $n(f.g.g, a),
                    br()) : d.j ? Yr() : br()
                } else
                    jr = !0
            } catch (g) {
                throw Fq.reset(),
                g;
            }
        }
    }
      , $r = function(a) {
        $q.h.cancel();
        ir = a;
        $q.done = !0
    }
      , as = function(a) {
        if (a.h)
            return a.h;
        var b = C(Lq).g;
        if (b)
            switch (b.getName()) {
            case "nis":
                a.h = "n";
                break;
            case "gsv":
                a.h = "m"
            }
        a.h || (a.h = "h");
        return a.h
    }
      , bs = function(a, b, c) {
        if (null == a.g)
            return b.Hb |= 4,
            !1;
        a = a.g.report(c, b);
        b.Hb |= a;
        return 0 == a
    };
    Ur.prototype.Cb = function(a) {
        switch (a.Oa()) {
        case 0:
            if (a = C(Lq).g)
                a = a.g,
                Xb(a.l, this),
                a.D && this.Ka() && bo(a);
            Yr();
            break;
        case 2:
            br()
        }
    }
    ;
    Ur.prototype.ab = function() {}
    ;
    Ur.prototype.Ka = function() {
        return !1
    }
    ;
    var Yr = function() {
        var a = [new Vq(O)]
          , b = C(Lq);
        b.h = a;
        Mq(b, function() {
            $r("i")
        }) ? $q.done || (fr(),
        br()) : $r("i")
    };
    Ur.prototype.O = function(a, b) {
        a.Pa = !0;
        switch (a.wa()) {
        case 1:
            cs(a, b);
            break;
        case 2:
            this.yd(a)
        }
        this.Dd(a)
    }
    ;
    var cs = function(a, b) {
        if (!a.Na) {
            var c = pq(a, "start", Un());
            c = a.td.g(c).g;
            var d = {
                id: "lidarv"
            };
            d.r = b;
            d.sv = "961";
            null !== or && (d.v = or);
            Jh(c, function(e, f) {
                return d[e] = "mtos" == e || "tos" == e ? f : encodeURIComponent(f)
            });
            b = kr();
            Jh(b, function(e, f) {
                return d[e] = encodeURIComponent(f)
            });
            b = "//pagead2.googlesyndication.com/pagead/gen_204?" + no(lo(new jo, d));
            qo(b);
            a.Na = !0
        }
    };
    l = Ur.prototype;
    l.Nf = function(a) {
        var b = a.B(a);
        b && (b = b.volume,
        a.Fa = Ln(b) && 0 < b);
        mq(a, 0);
        return pq(a, "start", Un())
    }
    ;
    l.Gb = function(a, b, c) {
        cr($q, [a], !Un());
        return this.Ja(a, b, c)
    }
    ;
    l.Ja = function(a, b, c) {
        return pq(a, c, Un())
    }
    ;
    l.If = function(a) {
        return ds(a, "firstquartile", 1)
    }
    ;
    l.Kf = function(a) {
        a.ba = !0;
        return ds(a, "midpoint", 2)
    }
    ;
    l.Of = function(a) {
        return ds(a, "thirdquartile", 3)
    }
    ;
    l.Ff = function(a) {
        var b = ds(a, "complete", 4);
        bq(a);
        return b
    }
    ;
    l.Gf = function(a) {
        a.ka = 3;
        return pq(a, "error", Un())
    }
    ;
    var ds = function(a, b, c) {
        cr($q, [a], !Un());
        mq(a, c);
        4 != c && lq(a.M, c, a.uc);
        return pq(a, b, Un())
    };
    l = Ur.prototype;
    l.xe = function(a, b, c) {
        b = Un();
        2 != a.ka || b || (a.oa().H = bn());
        cr($q, [a], !b);
        2 == a.ka && (a.ka = 1);
        return pq(a, c, b)
    }
    ;
    l.Mf = function(a, b) {
        b = this.Gb(a, b || {}, "skip");
        bq(a);
        return b
    }
    ;
    l.Jf = function(a, b) {
        ap(a, !0);
        return this.Gb(a, b || {}, "fullscreen")
    }
    ;
    l.Hf = function(a, b) {
        ap(a, !1);
        return this.Gb(a, b || {}, "exitfullscreen")
    }
    ;
    l.rd = function(a, b, c) {
        b = a.oa();
        b.V = Pp(b, bn(), 1 != a.ka);
        cr($q, [a], !Un());
        1 == a.ka && (a.ka = 2);
        return pq(a, c, Un())
    }
    ;
    l.Lf = function(a) {
        cr($q, [a], !Un());
        return a.h()
    }
    ;
    l.gd = function(a) {
        cr($q, [a], !Un());
        this.ue(a);
        bq(a);
        return a.h()
    }
    ;
    var Tr = function(a) {
        gr(function() {
            var b = es();
            null != a.h && (b.sdk = a.h);
            var c = C(Lq);
            null != c.g && (b.avms = c.g.getName());
            return b
        })
    }
      , fs = function(a, b, c, d) {
        var e = Dq(Fq, c);
        null !== e && e.la !== b && (a.l(e),
        e = null);
        e || (b = a.A(c, bn(), !1, b),
        0 == Fq.h.length && (N().j = 79463069),
        Kq([b]),
        e = b,
        e.l = as(a),
        d && (e.ib = d));
        return e
    };
    Ur.prototype.I = function() {}
    ;
    var hs = function(a, b) {
        b.D = 0;
        for (var c in fn)
            null == a[c] && (b.D |= fn[c]);
        gs(a, "currentTime");
        gs(a, "duration")
    };
    l = Ur.prototype;
    l.yd = function() {}
    ;
    l.ue = function() {}
    ;
    l.Qd = function() {}
    ;
    l.Dd = function() {}
    ;
    l.cd = function() {}
    ;
    l.be = function() {
        this.g || (this.g = this.cd());
        return null == this.g || this.j ? new Up : new Dr(this.g)
    }
    ;
    l.bd = function() {
        return new yr
    }
    ;
    var gs = function(a, b) {
        var c = a[b];
        void 0 !== c && 0 < c && (a[b] = Math.floor(1E3 * c))
    }
      , es = function() {
        var a = Tn()
          , b = {}
          , c = {}
          , d = {};
        return Object.assign({}, (b.sv = "961",
        b), null !== or && (c.v = or,
        c), (d["if"] = a.j ? "1" : "0",
        d.nas = String(Fq.g.length),
        d))
    };
    var is = function(a) {
        Rp.call(this, "audio_audible", a)
    };
    u(is, Rp);
    is.prototype.g = function(a) {
        return 4 == a.sc()
    }
    ;
    var js = function(a) {
        Sp.call(this, "audio_measurable", a)
    };
    u(js, Sp);
    js.prototype.g = function(a) {
        a = a.sc();
        return 3 == a || 4 == a
    }
    ;
    var ks = function() {
        Ar.apply(this, arguments)
    };
    u(ks, Ar);
    ks.prototype.h = function() {
        return new js(this.g)
    }
    ;
    ks.prototype.j = function() {
        return [new is(this.g)]
    }
    ;
    var ls = function() {};
    u(ls, Hp);
    ls.prototype.g = function(a) {
        a && (28 === a.e && (a = Object.assign({}, a, {
            avas: 3
        })),
        4 === a.vs || 5 === a.vs) && (a = Object.assign({}, a, {
            vs: 3
        }));
        var b = new Gp;
        b.g = Ip(a, Ep);
        b.h = Ip(a, Fp);
        return b
    }
    ;
    var ms = function(a) {
        this.h = a
    };
    ms.prototype.report = function(a, b) {
        var c = this.g(b);
        if ("function" === typeof c) {
            var d = {};
            var e = {};
            d = Object.assign({}, null !== or && (d.v = or,
            d), (e.sv = "961",
            e.cb = nr,
            e.e = ns(a),
            e));
            e = pq(b, a, Un());
            Mg(d, e);
            b.Fe[a] = e;
            d = 2 == b.wa() ? po(d).join("&") : b.td.g(d).g;
            try {
                return c(b.la, d, a),
                0
            } catch (f) {
                return 2
            }
        } else
            return 1
    }
    ;
    var ns = function(a) {
        var b = rr(a) ? "custom_metric_viewable" : a;
        a = Gg(function(c) {
            return c == b
        });
        return kn[a]
    };
    ms.prototype.g = function() {
        return Na(this.h)
    }
    ;
    var os = function(a, b) {
        this.h = a;
        this.j = b
    };
    u(os, ms);
    os.prototype.g = function(a) {
        if (!a.ib)
            return ms.prototype.g.call(this, a);
        if (this.j[a.ib])
            return function() {}
            ;
        Vm(393, Error());
        return null
    }
    ;
    var ps = function() {
        Ur.call(this);
        this.D = void 0;
        this.F = null;
        this.K = !1;
        this.o = {};
        this.G = 0;
        this.B = "ACTIVE_VIEW_TRAFFIC_TYPE_UNSPECIFIED"
    };
    u(ps, Ur);
    ps.prototype.H = function(a, b) {
        var c = this
          , d = C(Lq);
        if (null != d.g)
            switch (d.g.getName()) {
            case "nis":
                var e = qs(this, a, b);
                break;
            case "gsv":
                e = rs(this, a, b);
                break;
            case "exc":
                e = ts(this, a)
            }
        e || (b.opt_overlayAdElement ? e = void 0 : b.opt_adElement && (e = fs(this, a, b.opt_adElement, b.opt_osdId)));
        e && 1 == e.wa() && (e.B == lg && (e.B = function(f) {
            return c.Qd(f)
        }
        ),
        us(this, e, b));
        return e
    }
    ;
    var us = function(a, b, c) {
        c = c.opt_configurable_tracking_events;
        null != a.g && Array.isArray(c) && Wr(a, c, b)
    };
    ps.prototype.Qd = function(a) {
        a.h = 0;
        a.O = 0;
        if ("h" == a.l || "n" == a.l) {
            var b;
            N();
            if (a.ib && vs(this)) {
                var c = this.o[a.ib];
                c ? b = function(e) {
                    return ws(c, e)
                }
                : null !== c && Vm(379, Error())
            } else
                b = Na("ima.common.getVideoMetadata");
            if ("function" === typeof b)
                try {
                    var d = b(a.la)
                } catch (e) {
                    a.h |= 4
                }
            else
                a.h |= 2
        } else if ("b" == a.l)
            if (b = Na("ytads.bulleit.getVideoMetadata"),
            "function" === typeof b)
                try {
                    d = b(a.la)
                } catch (e) {
                    a.h |= 4
                }
            else
                a.h |= 2;
        else if ("ml" == a.l)
            if (b = Na("ima.common.getVideoMetadata"),
            "function" === typeof b)
                try {
                    d = b(a.la)
                } catch (e) {
                    a.h |= 4
                }
            else
                a.h |= 2;
        else
            a.h |= 1;
        a.h || (void 0 === d ? a.h |= 8 : null === d ? a.h |= 16 : Ig(d) ? a.h |= 32 : null != d.errorCode && (a.O = d.errorCode,
        a.h |= 64));
        null == d && (d = {});
        hs(d, a);
        Ln(d.volume) && Ln(this.D) && (d.volume *= this.D);
        return d
    }
    ;
    var rs = function(a, b, c) {
        var d = Cq(Fq, b);
        d || (d = c.opt_nativeTime || -1,
        d = Vr(a, b, as(a), d),
        c.opt_osdId && (d.ib = c.opt_osdId));
        return d
    }
      , qs = function(a, b, c) {
        var d = Cq(Fq, b);
        d || (d = Vr(a, b, "n", c.opt_nativeTime || -1));
        return d
    }
      , ts = function(a, b) {
        var c = Cq(Fq, b);
        c || (c = Vr(a, b, "h", -1));
        return c
    };
    ps.prototype.cd = function() {
        if (vs(this))
            return new os("ima.common.triggerExternalActivityEvent",this.o);
        var a = xs(this);
        return null != a ? new ms(a) : null
    }
    ;
    var xs = function(a) {
        N();
        switch (as(a)) {
        case "b":
            return "ytads.bulleit.triggerExternalActivityEvent";
        case "n":
            return "ima.bridge.triggerExternalActivityEvent";
        case "h":
        case "m":
        case "ml":
            return "ima.common.triggerExternalActivityEvent"
        }
        return null
    };
    ps.prototype.yd = function(a) {
        !a.g && a.Pa && bs(this, a, "overlay_unmeasurable_impression") && (a.g = !0)
    }
    ;
    ps.prototype.ue = function(a) {
        a.ye && (a.Ra() ? bs(this, a, "overlay_viewable_end_of_session_impression") : bs(this, a, "overlay_unviewable_impression"),
        a.ye = !1)
    }
    ;
    var ys = function(a, b, c, d) {
        c = void 0 === c ? {} : c;
        var e = {};
        Mg(e, {
            opt_adElement: void 0,
            opt_fullscreen: void 0
        }, c);
        var f = a.H(b, c);
        c = f ? f.td : a.bd();
        if (e.opt_bounds)
            return c.g(qr("ol", d));
        if (void 0 !== d)
            if (void 0 !== pr(d))
                if (jr)
                    a = qr("ue", d);
                else if (Zr(a),
                "i" == ir)
                    a = qr("i", d),
                    a["if"] = 0;
                else if (b = a.H(b, e)) {
                    b: {
                        "i" == ir && (b.Pa = !0,
                        a.Dd(b));
                        f = e.opt_fullscreen;
                        void 0 !== f && ap(b, !!f);
                        var g;
                        if (f = !Tn().h && !On())
                            xm(),
                            f = 0 === rj(lm);
                        if (g = f) {
                            switch (b.wa()) {
                            case 1:
                                cs(b, "pv");
                                break;
                            case 2:
                                a.yd(b)
                            }
                            $r("pv")
                        }
                        f = d.toLowerCase();
                        if (g = !g)
                            c: {
                                if (gm(N().P, "ssmol") && (g = a.j,
                                "loaded" === f))
                                    break c;
                                g = Wb(gn, f)
                            }
                        if (g && 0 == b.ka) {
                            "i" != ir && ($q.done = !1);
                            g = void 0 !== e ? e.opt_nativeTime : void 0;
                            $m = g = "number" === typeof g ? g : bn();
                            b.Mb = !0;
                            var h = Un();
                            b.ka = 1;
                            b.ia = {};
                            b.ia.start = !1;
                            b.ia.firstquartile = !1;
                            b.ia.midpoint = !1;
                            b.ia.thirdquartile = !1;
                            b.ia.complete = !1;
                            b.ia.resume = !1;
                            b.ia.pause = !1;
                            b.ia.skip = !1;
                            b.ia.mute = !1;
                            b.ia.unmute = !1;
                            b.ia.viewable_impression = !1;
                            b.ia.measurable_impression = !1;
                            b.ia.fully_viewable_audible_half_duration_impression = !1;
                            b.ia.fullscreen = !1;
                            b.ia.exitfullscreen = !1;
                            b.dd = 0;
                            h || (b.oa().H = g);
                            cr($q, [b], !h)
                        }
                        (g = b.wb[f]) && b.fa.reportEvent(g);
                        gm(N().P, "fmd") || Wb(hn, f) && b.Ta && b.Ta.h(b, null);
                        switch (b.wa()) {
                        case 1:
                            var k = rr(f) ? a.M.custom_metric_viewable : a.M[f];
                            break;
                        case 2:
                            k = a.U[f]
                        }
                        if (k && (d = k.call(a, b, e, d),
                        gm(N().P, "fmd") && Wb(hn, f) && b.Ta && b.Ta.h(b, null),
                        void 0 !== d)) {
                            e = qr(void 0, f);
                            Mg(e, d);
                            d = e;
                            break b
                        }
                        d = void 0
                    }
                    3 == b.ka && a.l(b);
                    a = d
                } else
                    a = qr("nf", d);
            else
                a = void 0;
        else
            jr ? a = qr("ue") : f ? (a = qr(),
            Mg(a, oq(f, !0, !1, !1))) : a = qr("nf");
        return "string" === typeof a ? c.g() : c.g(a)
    };
    ps.prototype.I = function(a) {
        this.j && 1 == a.wa() && zs(this, a)
    }
    ;
    ps.prototype.Dd = function(a) {
        this.j && 1 == a.wa() && zs(this, a)
    }
    ;
    var zs = function(a, b) {
        var c;
        if (b.ib && vs(a)) {
            var d = a.o[b.ib];
            d ? c = function(f, g) {
                As(d, f, g)
            }
            : null !== d && Vm(379, Error())
        } else
            c = Na("ima.common.triggerViewabilityMeasurementUpdate");
        if ("function" === typeof c) {
            var e = jq(b);
            e.nativeVolume = a.D;
            c(b.la, e)
        }
    }
      , Bs = function(a, b, c) {
        a.o[b] = c
    }
      , vs = function(a) {
        return (N(),
        "h" != as(a) && "m" != as(a)) ? !1 : 0 != a.G
    };
    ps.prototype.A = function(a, b, c, d) {
        if (Hm()) {
            var e = gm(N().P, "mm")
              , f = {};
            (e = (f[Ql.Ie] = "ACTIVE_VIEW_TRAFFIC_TYPE_AUDIO",
            f[Ql.mf] = "ACTIVE_VIEW_TRAFFIC_TYPE_VIDEO",
            f)[e]) && e && (this.B = e);
            "ACTIVE_VIEW_TRAFFIC_TYPE_UNSPECIFIED" === this.B && Vm(1044, Error())
        }
        a = Ur.prototype.A.call(this, a, b, c, d);
        this.K && (b = this.F,
        null == a.o && (a.o = new ip),
        b.g[a.la] = a.o,
        a.o.l = sq);
        return a
    }
    ;
    ps.prototype.l = function(a) {
        a && 1 == a.wa() && this.K && delete this.F.g[a.la];
        return Ur.prototype.l.call(this, a)
    }
    ;
    ps.prototype.be = function() {
        this.g || (this.g = this.cd());
        return null == this.g || this.j ? new Up : "ACTIVE_VIEW_TRAFFIC_TYPE_AUDIO" === this.B ? new ks(this.g) : new Dr(this.g)
    }
    ;
    ps.prototype.bd = function() {
        return "ACTIVE_VIEW_TRAFFIC_TYPE_AUDIO" === this.B ? new ls : new yr
    }
    ;
    var Cs = function(a) {
        var b = {};
        return b.viewability = a.g,
        b.googleViewability = a.h,
        b
    }
      , Ds = function(a, b, c) {
        c = void 0 === c ? {} : c;
        a = ys(C(ps), b, c, a);
        return Cs(a)
    }
      , Es = Um(193, Ds, void 0, es);
    y("Goog_AdSense_Lidar_sendVastEvent", Es);
    var Fs = Um(194, function(a, b) {
        b = void 0 === b ? {} : b;
        a = ys(C(ps), a, b);
        return Cs(a)
    });
    y("Goog_AdSense_Lidar_getViewability", Fs);
    var Gs = Um(195, function() {
        return zm()
    });
    y("Goog_AdSense_Lidar_getUrlSignalsArray", Gs);
    var Hs = Um(196, function() {
        return JSON.stringify(zm())
    });
    y("Goog_AdSense_Lidar_getUrlSignalsList", Hs);
    w.console && "function" === typeof w.console.log && ab(w.console.log, w.console);
    var Is = function(a) {
        for (var b = [], c = a = E(a.ownerDocument); c != a.top; c = c.parent)
            if (c.frameElement)
                b.push(c.frameElement);
            else
                break;
        return b
    };
    var Js = function(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.h = !1
    };
    Js.prototype.stopPropagation = function() {
        this.h = !0
    }
    ;
    Js.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    var Ks = function() {
        if (!w.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        try {
            var c = function() {};
            w.addEventListener("test", c, b);
            w.removeEventListener("test", c, b)
        } catch (d) {}
        return a
    }();
    var Ls = function(a, b) {
        Js.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.g = null;
        a && this.init(a, b)
    };
    cb(Ls, Js);
    var Ms = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    Ls.prototype.init = function(a, b) {
        var c = this.type = a.type
          , d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        (b = a.relatedTarget) ? mc && (gc(b, "nodeName") || (b = null)) : "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
        this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
        this.screenX = d.screenX || 0,
        this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
        this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
        this.screenX = a.screenX || 0,
        this.screenY = a.screenY || 0);
        this.button = a.button;
        this.key = a.key || "";
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Ms[a.pointerType] || "";
        this.state = a.state;
        this.g = a;
        a.defaultPrevented && Ls.Da.preventDefault.call(this)
    }
    ;
    Ls.prototype.stopPropagation = function() {
        Ls.Da.stopPropagation.call(this);
        this.g.stopPropagation ? this.g.stopPropagation() : this.g.cancelBubble = !0
    }
    ;
    Ls.prototype.preventDefault = function() {
        Ls.Da.preventDefault.call(this);
        var a = this.g;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
    ;
    var Ns = "closure_listenable_" + (1E6 * Math.random() | 0)
      , Os = function(a) {
        return !(!a || !a[Ns])
    };
    var Ps = 0;
    var Qs = function(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.vc = e;
        this.key = ++Ps;
        this.Vb = this.ec = !1
    }
      , Rs = function(a) {
        a.Vb = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.vc = null
    };
    var Ss = function(a) {
        this.src = a;
        this.g = {};
        this.h = 0
    };
    Ss.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [],
        this.h++);
        var g = Ts(a, b, d, e);
        -1 < g ? (b = a[g],
        c || (b.ec = !1)) : (b = new Qs(b,this.src,f,!!d,e),
        b.ec = c,
        a.push(b));
        return b
    }
    ;
    Ss.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.g))
            return !1;
        var e = this.g[a];
        b = Ts(e, b, c, d);
        return -1 < b ? (Rs(e[b]),
        Yb(e, b),
        0 == e.length && (delete this.g[a],
        this.h--),
        !0) : !1
    }
    ;
    var Us = function(a, b) {
        var c = b.type;
        c in a.g && Xb(a.g[c], b) && (Rs(b),
        0 == a.g[c].length && (delete a.g[c],
        a.h--))
    };
    Ss.prototype.Ob = function(a, b, c, d) {
        a = this.g[a.toString()];
        var e = -1;
        a && (e = Ts(a, b, c, d));
        return -1 < e ? a[e] : null
    }
    ;
    var Ts = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Vb && f.listener == b && f.capture == !!c && f.vc == d)
                return e
        }
        return -1
    };
    var Vs = "closure_lm_" + (1E6 * Math.random() | 0)
      , Ws = {}
      , Xs = 0
      , Zs = function(a, b, c, d, e) {
        if (d && d.once)
            return Ys(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Zs(a, b[f], c, d, e);
            return null
        }
        c = $s(c);
        return Os(a) ? a.N(b, c, Ra(d) ? !!d.capture : !!d, e) : at(a, b, c, !1, d, e)
    }
      , at = function(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var g = Ra(e) ? !!e.capture : !!e
          , h = bt(a);
        h || (a[Vs] = h = new Ss(a));
        c = h.add(b, c, d, g, f);
        if (c.proxy)
            return c;
        d = ct();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            Ks || (e = g),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(dt(b.toString()), d);
        else if (a.addListener && a.removeListener)
            a.addListener(d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        Xs++;
        return c
    }
      , ct = function() {
        var a = et
          , b = function(c) {
            return a.call(b.src, b.listener, c)
        };
        return b
    }
      , Ys = function(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Ys(a, b[f], c, d, e);
            return null
        }
        c = $s(c);
        return Os(a) ? a.Sb(b, c, Ra(d) ? !!d.capture : !!d, e) : at(a, b, c, !0, d, e)
    }
      , ft = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                ft(a, b[f], c, d, e);
        else
            d = Ra(d) ? !!d.capture : !!d,
            c = $s(c),
            Os(a) ? a.vb(b, c, d, e) : a && (a = bt(a)) && (b = a.Ob(b, c, d, e)) && gt(b)
    }
      , gt = function(a) {
        if ("number" !== typeof a && a && !a.Vb) {
            var b = a.src;
            if (Os(b))
                Us(b.o, a);
            else {
                var c = a.type
                  , d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(dt(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                Xs--;
                (c = bt(b)) ? (Us(c, a),
                0 == c.h && (c.src = null,
                b[Vs] = null)) : Rs(a)
            }
        }
    }
      , dt = function(a) {
        return a in Ws ? Ws[a] : Ws[a] = "on" + a
    }
      , et = function(a, b) {
        if (a.Vb)
            a = !0;
        else {
            b = new Ls(b,this);
            var c = a.listener
              , d = a.vc || a.src;
            a.ec && gt(a);
            a = c.call(d, b)
        }
        return a
    }
      , bt = function(a) {
        a = a[Vs];
        return a instanceof Ss ? a : null
    }
      , ht = "__closure_events_fn_" + (1E9 * Math.random() >>> 0)
      , $s = function(a) {
        if ("function" === typeof a)
            return a;
        a[ht] || (a[ht] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[ht]
    };
    var Q = function() {
        P.call(this);
        this.o = new Ss(this);
        this.xb = this;
        this.ha = null
    };
    cb(Q, P);
    Q.prototype[Ns] = !0;
    l = Q.prototype;
    l.addEventListener = function(a, b, c, d) {
        Zs(this, a, b, c, d)
    }
    ;
    l.removeEventListener = function(a, b, c, d) {
        ft(this, a, b, c, d)
    }
    ;
    l.dispatchEvent = function(a) {
        var b, c = this.ha;
        if (c)
            for (b = []; c; c = c.ha)
                b.push(c);
        c = this.xb;
        var d = a.type || a;
        if ("string" === typeof a)
            a = new Js(a,c);
        else if (a instanceof Js)
            a.target = a.target || c;
        else {
            var e = a;
            a = new Js(d,c);
            Mg(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; !a.h && 0 <= f; f--) {
                var g = a.currentTarget = b[f];
                e = it(g, d, !0, a) && e
            }
        a.h || (g = a.currentTarget = c,
        e = it(g, d, !0, a) && e,
        a.h || (e = it(g, d, !1, a) && e));
        if (b)
            for (f = 0; !a.h && f < b.length; f++)
                g = a.currentTarget = b[f],
                e = it(g, d, !1, a) && e;
        return e
    }
    ;
    l.L = function() {
        Q.Da.L.call(this);
        if (this.o) {
            var a = this.o, b = 0, c;
            for (c in a.g) {
                for (var d = a.g[c], e = 0; e < d.length; e++)
                    ++b,
                    Rs(d[e]);
                delete a.g[c];
                a.h--
            }
        }
        this.ha = null
    }
    ;
    l.N = function(a, b, c, d) {
        return this.o.add(String(a), b, !1, c, d)
    }
    ;
    l.Sb = function(a, b, c, d) {
        return this.o.add(String(a), b, !0, c, d)
    }
    ;
    l.vb = function(a, b, c, d) {
        this.o.remove(String(a), b, c, d)
    }
    ;
    var it = function(a, b, c, d) {
        b = a.o.g[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.Vb && g.capture == c) {
                var h = g.listener
                  , k = g.vc || g.src;
                g.ec && Us(a.o, g);
                e = !1 !== h.call(k, d) && e
            }
        }
        return e && !d.defaultPrevented
    };
    Q.prototype.Ob = function(a, b, c, d) {
        return this.o.Ob(String(a), b, c, d)
    }
    ;
    var jt = function(a, b) {
        this.j = a;
        this.o = b;
        this.h = 0;
        this.g = null
    };
    jt.prototype.get = function() {
        if (0 < this.h) {
            this.h--;
            var a = this.g;
            this.g = a.next;
            a.next = null
        } else
            a = this.j();
        return a
    }
    ;
    var kt = function(a, b) {
        a.o(b);
        100 > a.h && (a.h++,
        b.next = a.g,
        a.g = b)
    };
    var lt, mt = function() {
        var a = w.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !z("Presto") && (a = function() {
            var e = xh(document, "IFRAME");
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var f = e.contentWindow;
            e = f.document;
            e.open();
            e.close();
            var g = "callImmediate" + Math.random()
              , h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
            e = ab(function(k) {
                if (("*" == h || k.origin == h) && k.data == g)
                    this.port1.onmessage()
            }, this);
            f.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    f.postMessage(g, h)
                }
            }
        }
        );
        if ("undefined" !== typeof a && !Cb()) {
            var b = new a
              , c = {}
              , d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.ae;
                    c.ae = null;
                    e()
                }
            }
            ;
            return function(e) {
                d.next = {
                    ae: e
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return function(e) {
            w.setTimeout(e, 0)
        }
    };
    var nt = function() {
        this.h = this.g = null
    };
    nt.prototype.add = function(a, b) {
        var c = ot.get();
        c.set(a, b);
        this.h ? this.h.next = c : this.g = c;
        this.h = c
    }
    ;
    nt.prototype.remove = function() {
        var a = null;
        this.g && (a = this.g,
        this.g = this.g.next,
        this.g || (this.h = null),
        a.next = null);
        return a
    }
    ;
    var ot = new jt(function() {
        return new pt
    }
    ,function(a) {
        return a.reset()
    }
    )
      , pt = function() {
        this.next = this.g = this.h = null
    };
    pt.prototype.set = function(a, b) {
        this.h = a;
        this.g = b;
        this.next = null
    }
    ;
    pt.prototype.reset = function() {
        this.next = this.g = this.h = null
    }
    ;
    var qt, rt = !1, tt = new nt, vt = function(a, b) {
        qt || ut();
        rt || (qt(),
        rt = !0);
        tt.add(a, b)
    }, ut = function() {
        if (w.Promise && w.Promise.resolve) {
            var a = w.Promise.resolve(void 0);
            qt = function() {
                a.then(wt)
            }
        } else
            qt = function() {
                var b = wt;
                "function" !== typeof w.setImmediate || w.Window && w.Window.prototype && (Ab() || !z("Edge")) && w.Window.prototype.setImmediate == w.setImmediate ? (lt || (lt = mt()),
                lt(b)) : w.setImmediate(b)
            }
    }, wt = function() {
        for (var a; a = tt.remove(); ) {
            try {
                a.h.call(a.g)
            } catch (b) {
                lb(b)
            }
            kt(ot, a)
        }
        rt = !1
    };
    var xt = function(a) {
        if (!a)
            return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    var zt = function(a) {
        this.g = 0;
        this.B = void 0;
        this.o = this.h = this.j = null;
        this.l = this.A = !1;
        if (a != lg)
            try {
                var b = this;
                a.call(void 0, function(c) {
                    yt(b, 2, c)
                }, function(c) {
                    yt(b, 3, c)
                })
            } catch (c) {
                yt(this, 3, c)
            }
    }
      , At = function() {
        this.next = this.context = this.h = this.j = this.g = null;
        this.o = !1
    };
    At.prototype.reset = function() {
        this.context = this.h = this.j = this.g = null;
        this.o = !1
    }
    ;
    var Bt = new jt(function() {
        return new At
    }
    ,function(a) {
        a.reset()
    }
    )
      , Ct = function(a, b, c) {
        var d = Bt.get();
        d.j = a;
        d.h = b;
        d.context = c;
        return d
    };
    zt.prototype.then = function(a, b, c) {
        return Dt(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
    }
    ;
    zt.prototype.$goog_Thenable = !0;
    zt.prototype.H = function(a, b) {
        return Dt(this, null, a, b)
    }
    ;
    zt.prototype.catch = zt.prototype.H;
    zt.prototype.cancel = function(a) {
        if (0 == this.g) {
            var b = new Et(a);
            vt(function() {
                Ft(this, b)
            }, this)
        }
    }
    ;
    var Ft = function(a, b) {
        if (0 == a.g)
            if (a.j) {
                var c = a.j;
                if (c.h) {
                    for (var d = 0, e = null, f = null, g = c.h; g && (g.o || (d++,
                    g.g == a && (e = g),
                    !(e && 1 < d))); g = g.next)
                        e || (f = g);
                    e && (0 == c.g && 1 == d ? Ft(c, b) : (f ? (d = f,
                    d.next == c.o && (c.o = d),
                    d.next = d.next.next) : Gt(c),
                    Ht(c, e, 3, b)))
                }
                a.j = null
            } else
                yt(a, 3, b)
    }
      , Jt = function(a, b) {
        a.h || 2 != a.g && 3 != a.g || It(a);
        a.o ? a.o.next = b : a.h = b;
        a.o = b
    }
      , Dt = function(a, b, c, d) {
        var e = Ct(null, null, null);
        e.g = new zt(function(f, g) {
            e.j = b ? function(h) {
                try {
                    var k = b.call(d, h);
                    f(k)
                } catch (m) {
                    g(m)
                }
            }
            : f;
            e.h = c ? function(h) {
                try {
                    var k = c.call(d, h);
                    void 0 === k && h instanceof Et ? g(h) : f(k)
                } catch (m) {
                    g(m)
                }
            }
            : g
        }
        );
        e.g.j = a;
        Jt(a, e);
        return e.g
    };
    zt.prototype.D = function(a) {
        this.g = 0;
        yt(this, 2, a)
    }
    ;
    zt.prototype.F = function(a) {
        this.g = 0;
        yt(this, 3, a)
    }
    ;
    var yt = function(a, b, c) {
        if (0 == a.g) {
            a === c && (b = 3,
            c = new TypeError("Promise cannot resolve to itself"));
            a.g = 1;
            a: {
                var d = c
                  , e = a.D
                  , f = a.F;
                if (d instanceof zt) {
                    Jt(d, Ct(e || lg, f || null, a));
                    var g = !0
                } else if (xt(d))
                    d.then(e, f, a),
                    g = !0;
                else {
                    if (Ra(d))
                        try {
                            var h = d.then;
                            if ("function" === typeof h) {
                                Kt(d, h, e, f, a);
                                g = !0;
                                break a
                            }
                        } catch (k) {
                            f.call(a, k);
                            g = !0;
                            break a
                        }
                    g = !1
                }
            }
            g || (a.B = c,
            a.g = b,
            a.j = null,
            It(a),
            3 != b || c instanceof Et || Lt(a, c))
        }
    }
      , Kt = function(a, b, c, d, e) {
        var f = !1
          , g = function(k) {
            f || (f = !0,
            c.call(e, k))
        }
          , h = function(k) {
            f || (f = !0,
            d.call(e, k))
        };
        try {
            b.call(a, g, h)
        } catch (k) {
            h(k)
        }
    }
      , It = function(a) {
        a.A || (a.A = !0,
        vt(a.K, a))
    }
      , Gt = function(a) {
        var b = null;
        a.h && (b = a.h,
        a.h = b.next,
        b.next = null);
        a.h || (a.o = null);
        return b
    };
    zt.prototype.K = function() {
        for (var a; a = Gt(this); )
            Ht(this, a, this.g, this.B);
        this.A = !1
    }
    ;
    var Ht = function(a, b, c, d) {
        if (3 == c && b.h && !b.o)
            for (; a && a.l; a = a.j)
                a.l = !1;
        if (b.g)
            b.g.j = null,
            Mt(b, c, d);
        else
            try {
                b.o ? b.j.call(b.context) : Mt(b, c, d)
            } catch (e) {
                Nt.call(null, e)
            }
        kt(Bt, b)
    }
      , Mt = function(a, b, c) {
        2 == b ? a.j.call(a.context, c) : a.h && a.h.call(a.context, c)
    }
      , Lt = function(a, b) {
        a.l = !0;
        vt(function() {
            a.l && Nt.call(null, b)
        })
    }
      , Nt = lb
      , Et = function(a) {
        eb.call(this, a)
    };
    cb(Et, eb);
    Et.prototype.name = "cancel";
    var Ot = function(a, b) {
        Q.call(this);
        this.h = a || 1;
        this.g = b || w;
        this.j = ab(this.rg, this);
        this.l = Date.now()
    };
    cb(Ot, Q);
    l = Ot.prototype;
    l.enabled = !1;
    l.La = null;
    l.rg = function() {
        if (this.enabled) {
            var a = Date.now() - this.l;
            0 < a && a < .8 * this.h ? this.La = this.g.setTimeout(this.j, this.h - a) : (this.La && (this.g.clearTimeout(this.La),
            this.La = null),
            this.dispatchEvent("tick"),
            this.enabled && (this.stop(),
            this.start()))
        }
    }
    ;
    l.start = function() {
        this.enabled = !0;
        this.La || (this.La = this.g.setTimeout(this.j, this.h),
        this.l = Date.now())
    }
    ;
    l.stop = function() {
        this.enabled = !1;
        this.La && (this.g.clearTimeout(this.La),
        this.La = null)
    }
    ;
    l.L = function() {
        Ot.Da.L.call(this);
        this.stop();
        delete this.g
    }
    ;
    var Pt = function(a, b, c) {
        if ("function" === typeof a)
            c && (a = ab(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = ab(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : w.setTimeout(a, b || 0)
    }
      , Qt = function(a, b) {
        var c = null;
        return (new zt(function(d, e) {
            c = Pt(function() {
                d(b)
            }, a);
            -1 == c && e(Error("Failed to schedule timer."))
        }
        )).H(function(d) {
            w.clearTimeout(c);
            throw d;
        })
    };
    var Rt = function() {
        return Math.round(Date.now() / 1E3)
    };
    var St = function() {
        this.g = {};
        return this
    };
    St.prototype.remove = function(a) {
        var b = this.g;
        a in b && delete b[a]
    }
    ;
    St.prototype.set = function(a, b) {
        this.g[a] = b
    }
    ;
    var Tt = function(a, b) {
        a.g.eb = Kg(a.g, "eb", 0) | b
    };
    St.prototype.get = function(a) {
        return Kg(this.g, a, null)
    }
    ;
    var Ut = null
      , Vt = function() {
        this.g = {};
        this.h = 0
    }
      , Wt = function() {
        Ut || (Ut = new Vt);
        return Ut
    }
      , Xt = function(a, b) {
        a.g[b.getName()] = b
    }
      , Yt = function(a, b) {
        this.o = a;
        this.j = !0;
        this.g = b
    };
    Yt.prototype.getName = function() {
        return this.o
    }
    ;
    Yt.prototype.getValue = function() {
        return this.g
    }
    ;
    Yt.prototype.h = function() {
        return String(this.g)
    }
    ;
    var Zt = function(a, b) {
        Yt.call(this, String(a), b);
        this.l = a;
        this.g = !!b
    };
    u(Zt, Yt);
    Zt.prototype.h = function() {
        return this.g ? "1" : "0"
    }
    ;
    var $t = function(a, b) {
        Yt.call(this, a, b)
    };
    u($t, Yt);
    $t.prototype.h = function() {
        return this.g ? Math.round(this.g.top) + "." + Math.round(this.g.left) + "." + (Math.round(this.g.top) + Math.round(this.g.height)) + "." + (Math.round(this.g.left) + Math.round(this.g.width)) : ""
    }
    ;
    var au = function(a) {
        if (a.match(/^-?[0-9]+\.-?[0-9]+\.-?[0-9]+\.-?[0-9]+$/)) {
            a = a.split(".");
            var b = Number(a[0])
              , c = Number(a[1]);
            return new $t("",new cj(c,b,Number(a[3]) - c,Number(a[2]) - b))
        }
        return new $t("",new cj(0,0,0,0))
    };
    var bu = function(a) {
        var b = new cj(-Number.MAX_VALUE / 2,-Number.MAX_VALUE / 2,Number.MAX_VALUE,Number.MAX_VALUE)
          , c = new cj(0,0,0,0);
        if (!a || 0 == a.length)
            return c;
        for (var d = 0; d < a.length; d++) {
            a: {
                var e = b;
                var f = a[d]
                  , g = Math.max(e.left, f.left)
                  , h = Math.min(e.left + e.width, f.left + f.width);
                if (g <= h) {
                    var k = Math.max(e.top, f.top);
                    f = Math.min(e.top + e.height, f.top + f.height);
                    if (k <= f) {
                        e.left = g;
                        e.top = k;
                        e.width = h - g;
                        e.height = f - k;
                        e = !0;
                        break a
                    }
                }
                e = !1
            }
            if (!e)
                return c
        }
        return b
    }
      , cu = function(a, b) {
        var c = a.getBoundingClientRect();
        a = vn(a, b);
        return new cj(Math.round(a.x),Math.round(a.y),Math.round(c.right - c.left),Math.round(c.bottom - c.top))
    }
      , du = function(a, b, c) {
        if (b && c) {
            a: {
                var d = Math.max(b.left, c.left);
                var e = Math.min(b.left + b.width, c.left + c.width);
                if (d <= e) {
                    var f = Math.max(b.top, c.top)
                      , g = Math.min(b.top + b.height, c.top + c.height);
                    if (f <= g) {
                        d = new cj(d,f,e - d,g - f);
                        break a
                    }
                }
                d = null
            }
            e = d ? d.height * d.width : 0;
            f = d ? b.height * b.width : 0;
            d = d && f ? Math.round(e / f * 100) : 0;
            Xt(a, new Yt("vp",d));
            d && 0 < d ? (e = dj(b),
            f = dj(c),
            e = e.top >= f.top && e.top < f.bottom) : e = !1;
            Xt(a, new Zt(512,e));
            d && 0 < d ? (e = dj(b),
            f = dj(c),
            e = e.bottom <= f.bottom && e.bottom > f.top) : e = !1;
            Xt(a, new Zt(1024,e));
            d && 0 < d ? (e = dj(b),
            f = dj(c),
            e = e.left >= f.left && e.left < f.right) : e = !1;
            Xt(a, new Zt(2048,e));
            d && 0 < d ? (b = dj(b),
            c = dj(c),
            c = b.right <= c.right && b.right > c.left) : c = !1;
            Xt(a, new Zt(4096,c))
        }
    };
    var eu = function(a, b) {
        var c = 0;
        Dg(E(), "ima", "video", "client", "tagged") && (c = 1);
        var d = null;
        a && (d = a());
        if (d) {
            a = Wt();
            a.g = {};
            var e = new Zt(32,!0);
            e.j = !1;
            Xt(a, e);
            e = E().document;
            e = e.visibilityState || e.webkitVisibilityState || e.mozVisibilityState || e.msVisibilityState || "";
            Xt(a, new Zt(64,"hidden" != e.toLowerCase().substring(e.length - 6) ? !0 : !1));
            try {
                var f = E().top;
                try {
                    var g = !!f.location.href || "" === f.location.href
                } catch (n) {
                    g = !1
                }
                if (g) {
                    var h = Is(d);
                    var k = h && 0 != h.length ? "1" : "0"
                } else
                    k = "2"
            } catch (n) {
                k = "2"
            }
            Xt(a, new Zt(256,"2" == k));
            Xt(a, new Zt(128,"1" == k));
            h = g = E().top;
            "2" == k && (h = E());
            f = cu(d, h);
            Xt(a, new $t("er",f));
            try {
                var m = h.document && !h.document.body ? null : vh(h || window)
            } catch (n) {
                m = null
            }
            m ? (h = wh(mh(h.document).g),
            Xt(a, new Zt(16384,!!h)),
            m = h ? new cj(h.x,h.y,m.width,m.height) : null) : m = null;
            Xt(a, new $t("vi",m));
            if (m && "1" == k) {
                k = Is(d);
                d = [];
                for (h = 0; h < k.length; h++)
                    (e = cu(k[h], g)) && d.push(e);
                d.push(m);
                m = bu(d)
            }
            du(a, f, m);
            a.h && Xt(a, new Yt("ts",Rt() - a.h));
            a.h = Rt()
        } else
            a = Wt(),
            a.g = {},
            a.h = Rt(),
            Xt(a, new Zt(32,!1));
        this.j = a;
        this.g = new St;
        this.g.set("ve", 4);
        c && Tt(this.g, 1);
        Dg(E(), "ima", "video", "client", "crossdomainTag") && Tt(this.g, 4);
        Dg(E(), "ima", "video", "client", "sdkTag") && Tt(this.g, 8);
        Dg(E(), "ima", "video", "client", "jsTag") && Tt(this.g, 2);
        b && Kg(b, "fullscreen", !1) && Tt(this.g, 16);
        this.h = b = null;
        if (c && (c = Dg(E(), "ima", "video", "client"),
        c.getEData)) {
            this.h = c.getEData();
            if (c = Dg(E(), "ima", "video", "client", "getLastSnapshotFromTop"))
                if (a = c())
                    this.h.extendWithDataFromTopIframe(a.tagstamp, a.playstamp, a.lactstamp),
                    c = this.j,
                    b = a.er,
                    a = a.vi,
                    b && a && (b = au(b).getValue(),
                    a = au(a).getValue(),
                    k = null,
                    Kg(c.g, "er", null) && (k = Kg(c.g, "er", null).getValue(),
                    k.top += b.top,
                    k.left += b.left,
                    Xt(c, new $t("er",k))),
                    Kg(c.g, "vi", null) && (m = Kg(c.g, "vi", null).getValue(),
                    m.top += b.top,
                    m.left += b.left,
                    d = [],
                    d.push(m),
                    d.push(b),
                    d.push(a),
                    b = bu(d),
                    du(c, k, b),
                    Xt(c, new $t("vi",a))));
            a: {
                if (this.h) {
                    if (this.h.getTagLoadTimestamp) {
                        b = this.h.getTagLoadTimestamp();
                        break a
                    }
                    if (this.h.getTimeSinceTagLoadSeconds) {
                        b = this.h.getTimeSinceTagLoadSeconds();
                        break a
                    }
                }
                b = null
            }
        }
        c = this.g;
        a = window.performance && window.performance.timing && window.performance.timing.domLoading && 0 < window.performance.timing.domLoading ? Math.round(window.performance.timing.domLoading / 1E3) : null;
        c.set.call(c, "td", Rt() - (null != a ? a : null != b ? b : Rt()))
    };
    var fu = new Ot(200)
      , gu = function(a, b) {
        try {
            var c = new eu(a,b);
            a = [];
            var d = Number(c.g.get("eb"));
            c.g.remove("eb");
            var e, f = c.g;
            b = [];
            for (var g in f.g)
                b.push(g + f.g[g]);
            (e = b.join("_")) && a.push(e);
            if (c.h) {
                var h = c.h.serialize();
                h && a.push(h)
            }
            var k, m = c.j;
            e = d;
            f = [];
            e || (e = 0);
            for (var n in m.g) {
                var q = m.g[n];
                if (q instanceof Zt)
                    q.getValue() && (e |= q.l);
                else {
                    var t = m.g[n]
                      , v = t.j ? t.h() : "";
                    v && f.push(n + v)
                }
            }
            f.push("eb" + String(e));
            (k = f.join("_")) && a.push(k);
            c.g.set("eb", d);
            return a.join("_")
        } catch (x) {
            return "tle;" + ch(x.name, 12) + ";" + ch(x.message, 40)
        }
    }
      , hu = function(a, b) {
        Zs(fu, "tick", function() {
            var c = gu(b);
            a(c)
        });
        fu.start();
        fu.dispatchEvent("tick")
    };
    var iu = function(a) {
        this.J = A(a)
    };
    u(iu, B);
    iu.prototype.getId = function() {
        return pf(this, 1)
    }
    ;
    var ju = [0, Yf];
    var ku = function(a) {
        this.J = A(a)
    };
    u(ku, B);
    ku.prototype.getWidth = function() {
        return mf(this, 1)
    }
    ;
    ku.prototype.getHeight = function() {
        return mf(this, 2)
    }
    ;
    var lu = [0, Vf, -1];
    var mu = function(a) {
        this.J = A(a)
    };
    u(mu, B);
    var nu = [0, Rf, Xf, Yf];
    var ou = function(a) {
        this.J = A(a)
    };
    u(ou, B);
    ou.prototype.getAdId = function() {
        return pf(this, 1)
    }
    ;
    ou.prototype.getSize = function() {
        return bf(this, ku, 7)
    }
    ;
    ou.prototype.Pb = function() {
        return bf(this, mu, 9)
    }
    ;
    ou.ga = [4];
    var pu = [0, Yf, Rf, Yf, $f, bg, ju, lu, Rf, nu];
    var qu = function(a) {
        this.J = A(a)
    };
    u(qu, B);
    var ru = function(a, b) {
        return Se(a, 1, ke(b))
    }
      , tu = function(a, b) {
        return sf(a, 4, b)
    }
      , uu = function(a, b) {
        return Se(a, 2, ne(b))
    }
      , vu = [0, bg, Vf, Yf, Xf];
    var wu = function(a) {
        this.J = A(a)
    };
    u(wu, B);
    var xu = function(a, b) {
        return tf(a, 1, b)
    }
      , yu = function(a, b) {
        gf(a, 3, ou, b);
        return a
    }
      , zu = function(a, b) {
        return Se(a, 4, ke(b))
    };
    wu.ga = [10, 3];
    var Au = [0, Yf, Rf, ag, pu, bg, vu, Xf, bg, 2, $f];
    var Bu = function(a) {
        this.J = A(a)
    };
    u(Bu, B);
    var Cu = [0, bg, Xf, Rf];
    var Du = function(a) {
        this.J = A(a)
    };
    u(Du, B);
    var Eu = function(a, b) {
        return gf(a, 2, wu, b)
    }
      , Fu = function(a, b) {
        ef(a, 5, b)
    };
    Du.ga = [2];
    var Gu = [0, bg, ag, Au, bg, Yf, vu, Yf, Xf, Vf, Cu];
    var Hu = function(a) {
        this.J = A(a)
    };
    u(Hu, B);
    var Iu = function(a) {
        var b = new Du;
        b = Se(b, 1, ke(1));
        return gf(a, 1, Du, b)
    };
    Hu.ga = [1];
    Hu.prototype.g = eg([0, ag, Gu]);
    var Ju = function(a) {
        this.J = A(a)
    };
    u(Ju, B);
    var Ku = function(a) {
        this.J = A(a)
    };
    u(Ku, B);
    Ku.ga = [1];
    var Lu = function(a) {
        this.J = A(a)
    };
    u(Lu, B);
    var Mu = fg(Lu);
    Lu.ga = [1];
    var Nu = function(a) {
        this.J = A(a)
    };
    u(Nu, B);
    var Ou = function(a) {
        var b = new Nu;
        return Se(b, 1, ke(a))
    }
      , Pu = [0, bg];
    var Qu = function(a) {
        this.J = A(a)
    };
    u(Qu, B);
    var Ru = function(a) {
        var b = new Qu;
        return tf(b, 1, a)
    }
      , Su = function(a) {
        var b = window.Date.now();
        b = Number.isFinite(b) ? Math.round(b) : 0;
        return Se(a, 3, qe(b))
    };
    Qu.prototype.getError = function() {
        return bf(this, Nu, 10)
    }
    ;
    Qu.prototype.jb = function(a) {
        return ef(this, 10, a)
    }
    ;
    var Tu = fg(Qu)
      , Uu = [0, Yf, -1, Rf, Vf, -2, Rf, Qf, Xf, Pu, Xf];
    var Vu = [0, 1, [0, Uf, -2], -1, Yf, -1, Xf, [0, 3, bg, Yf], Rf];
    var Wu = function(a) {
        this.J = A(a)
    };
    u(Wu, B);
    Wu.ga = [1, 2];
    Wu.prototype.g = eg([0, ag, Vu, ag, Uu]);
    var Xu = function() {};
    var Yu = function() {
        this.g = Math.random()
    }
      , Zu = function() {
        var a = Ii
          , b = window.google_srt;
        0 <= b && 1 >= b && (a.g = b)
    }
      , Li = function(a, b, c, d, e) {
        if (((void 0 === d ? 0 : d) ? a.g : Math.random()) < (e || .01))
            try {
                if (c instanceof zi)
                    var f = c;
                else
                    f = new zi,
                    ai(c, function(h, k) {
                        var m = f
                          , n = m.o++;
                        Di(m, n, Ai(k, h))
                    });
                var g = Gi(f, "https:", "/pagead/gen_204?id=" + b + "&");
                g && Ni(w, g)
            } catch (h) {}
    };
    var Ii, $u, Hi = new xi(1,window);
    (function(a) {
        Ii = null != a ? a : new Yu;
        "number" !== typeof window.google_srt && (window.google_srt = Math.random());
        Zu();
        $u = new Ji;
        $u.Qc(function() {});
        $u.Gd(!0);
        "complete" == window.document.readyState ? window.google_measure_js_timing || Hi.B() : Hi.j && rg(window, "load", function() {
            window.google_measure_js_timing || Hi.B()
        })
    }
    )();
    var av = (new Date).getTime();
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function(a, b) {
        return a + b
    });
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function(a, b) {
        return a + b
    });
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function(a, b) {
        return a + b
    });
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function(a, b) {
        return a + b
    });
    var bv = function(a) {
        this.J = A(a)
    };
    u(bv, B);
    bv.ga = [3];
    var cv = function(a) {
        this.J = A(a)
    };
    u(cv, B);
    var dv = function(a, b) {
        return Ye(a, 1, b, je)
    }
      , ev = function(a, b) {
        return Ye(a, 2, b, je)
    }
      , fv = function(a, b) {
        return Ye(a, 3, b, me)
    }
      , gv = function(a, b) {
        Ye(a, 4, b, me)
    };
    cv.ga = [1, 2, 3, 4];
    var hv = function(a) {
        this.J = A(a)
    };
    u(hv, B);
    var iv = function(a) {
        this.J = A(a)
    };
    u(iv, B);
    iv.prototype.getVersion = function() {
        return mf(this, 1)
    }
    ;
    var jv = function(a, b) {
        return Ze(a, 1, ne(b), 0)
    }
      , kv = function(a, b) {
        return ef(a, 2, b)
    }
      , lv = function(a, b) {
        return ef(a, 3, b)
    }
      , mv = function(a, b) {
        return Ze(a, 4, ne(b), 0)
    }
      , nv = function(a, b) {
        return Ze(a, 5, ne(b), 0)
    }
      , ov = function(a, b) {
        return Ze(a, 6, ne(b), 0)
    }
      , pv = function(a, b) {
        return Ze(a, 7, xe(b), "")
    }
      , qv = function(a, b) {
        return Ze(a, 8, ne(b), 0)
    }
      , rv = function(a, b) {
        return Ze(a, 9, ne(b), 0)
    }
      , tv = function(a, b) {
        return Ze(a, 10, null == b ? b : fe(b), !1)
    }
      , uv = function(a, b) {
        return Ze(a, 11, null == b ? b : fe(b), !1)
    }
      , vv = function(a, b) {
        return Ye(a, 12, b, je)
    }
      , wv = function(a, b) {
        return Ye(a, 13, b, je)
    }
      , xv = function(a, b) {
        return Ye(a, 14, b, je)
    }
      , yv = function(a, b) {
        return Ze(a, 15, null == b ? b : fe(b), !1)
    }
      , zv = function(a, b) {
        return Ze(a, 16, xe(b), "")
    }
      , Av = function(a, b) {
        return Ye(a, 17, b, me)
    }
      , Bv = function(a, b) {
        return Ye(a, 18, b, me)
    }
      , Cv = function(a, b) {
        return ff(a, 19, b)
    };
    iv.ga = [12, 13, 14, 17, 18, 19];
    var Dv = function(a) {
        this.J = A(a)
    };
    u(Dv, B);
    var Ev = "a".charCodeAt()
      , Fv = Bg({
        rh: 0,
        qh: 1,
        nh: 2,
        ih: 3,
        oh: 4,
        jh: 5,
        ph: 6,
        lh: 7,
        mh: 8,
        hh: 9,
        kh: 10,
        sh: 11
    })
      , Gv = Bg({
        uh: 0,
        vh: 1,
        th: 2
    });
    var Hv = function(a) {
        if (/[^01]/.test(a))
            throw Error("Input bitstring " + a + " is malformed!");
        this.h = a;
        this.g = 0
    }
      , Jv = function(a) {
        a = Iv(a, 36);
        var b = new hv;
        b = Ze(b, 1, qe(Math.floor(a / 10)), "0");
        return Ze(b, 2, ne(a % 10 * 1E8), 0)
    }
      , Kv = function(a) {
        return String.fromCharCode(Ev + Iv(a, 6)) + String.fromCharCode(Ev + Iv(a, 6))
    }
      , Nv = function(a) {
        var b = Iv(a, 16);
        return !0 === !!Iv(a, 1) ? (a = Lv(a),
        a.forEach(function(c) {
            if (c > b)
                throw Error("ID " + c + " is past MaxVendorId " + b + "!");
        }),
        a) : Mv(a, b)
    }
      , Ov = function(a) {
        for (var b = [], c = Iv(a, 12); c--; ) {
            var d = Iv(a, 6)
              , e = Iv(a, 2)
              , f = Lv(a)
              , g = b
              , h = g.push
              , k = new bv;
            d = Ze(k, 1, ke(d), 0);
            e = Ze(d, 2, ke(e), 0);
            f = Ye(e, 3, f, me);
            h.call(g, f)
        }
        return b
    }
      , Lv = function(a) {
        for (var b = Iv(a, 12), c = []; b--; ) {
            var d = !0 === !!Iv(a, 1)
              , e = Iv(a, 16);
            if (d)
                for (d = Iv(a, 16); e <= d; e++)
                    c.push(e);
            else
                c.push(e)
        }
        c.sort(function(f, g) {
            return f - g
        });
        return c
    }
      , Mv = function(a, b, c) {
        for (var d = [], e = 0; e < b; e++)
            if (Iv(a, 1)) {
                var f = e + 1;
                if (c && -1 === c.indexOf(f))
                    throw Error("ID: " + f + " is outside of allowed values!");
                d.push(f)
            }
        return d
    }
      , Iv = function(a, b) {
        if (a.g + b > a.h.length)
            throw Error("Requested length " + b + " is past end of string.");
        var c = a.h.substring(a.g, a.g + b);
        a.g += b;
        return parseInt(c, 2)
    };
    Hv.prototype.skip = function(a) {
        this.g += a
    }
    ;
    var Pv = function(a) {
        try {
            var b = Rc(a).map(function(f) {
                return f.toString(2).padStart(8, "0")
            }).join("")
              , c = new Hv(b);
            if (3 !== Iv(c, 3))
                return null;
            var d = ev(dv(new cv, Mv(c, 24, Fv)), Mv(c, 24, Fv))
              , e = Iv(c, 6);
            0 !== e && gv(fv(d, Mv(c, e)), Mv(c, e));
            return d
        } catch (f) {
            return null
        }
    };
    var Qv = function(a) {
        try {
            var b = Rc(a).map(function(d) {
                return d.toString(2).padStart(8, "0")
            }).join("")
              , c = new Hv(b);
            return Cv(Bv(Av(zv(yv(xv(wv(vv(uv(tv(rv(qv(pv(ov(nv(mv(lv(kv(jv(new iv, Iv(c, 6)), Jv(c)), Jv(c)), Iv(c, 12)), Iv(c, 12)), Iv(c, 6)), Kv(c)), Iv(c, 12)), Iv(c, 6)), !!Iv(c, 1)), !!Iv(c, 1)), Mv(c, 12, Gv)), Mv(c, 24, Fv)), Mv(c, 24, Fv)), !!Iv(c, 1)), Kv(c)), Nv(c)), Nv(c)), Ov(c))
        } catch (d) {
            return null
        }
    };
    var Sv = function(a) {
        if (!a)
            return null;
        var b = a.split(".");
        if (4 < b.length)
            return null;
        a = Qv(b[0]);
        if (!a)
            return null;
        var c = new Dv;
        a = ef(c, 1, a);
        b.shift();
        b = r(b);
        for (c = b.next(); !c.done; c = b.next())
            switch (c = c.value,
            Rv(c)) {
            case 1:
            case 2:
                break;
            case 3:
                c = Pv(c);
                if (!c)
                    return null;
                ef(a, 2, c);
                break;
            default:
                return null
            }
        return a
    }
      , Rv = function(a) {
        try {
            var b = Rc(a).map(function(c) {
                return c.toString(2).padStart(8, "0")
            }).join("");
            return Iv(new Hv(b), 3)
        } catch (c) {
            return -1
        }
    };
    var Tv = function(a, b) {
        var c = {};
        if (Array.isArray(b) && 0 !== b.length) {
            b = r(b);
            for (var d = b.next(); !d.done; d = b.next())
                d = d.value,
                c[d] = -1 !== a.indexOf(d)
        } else
            for (a = r(a),
            b = a.next(); !b.done; b = a.next())
                c[b.value] = !0;
        delete c[0];
        return c
    };
    var Uv = function(a, b, c, d) {
        Zi.call(this, a, b);
        this.j = c;
        this.h = d
    };
    u(Uv, Zi);
    Uv.prototype.l = function() {
        var a = Ja.apply(0, arguments);
        try {
            var b = encodeURIComponent(Pc(Qi(a, this.g), 3));
            this.h(this.j + "?e=4&d=" + b)
        } catch (c) {
            Si(c, this.g)
        }
    }
    ;
    var vg = new function(a, b) {
        this.g = a;
        this.defaultValue = void 0 === b ? 0 : b
    }
    (494575051)
      , Vv = new kg(489560439)
      , Wv = new kg(505762507);
    var Xv = function(a) {
        this.J = A(a)
    };
    u(Xv, B);
    var Yv = function(a) {
        var b = new Xv
          , c = b.J
          , d = Gd(c);
        ce(Kd(b.J));
        var e = d & 2;
        b = Pe(c, d, 1, !1);
        Array.isArray(b) || (b = ae);
        var f = !!(d & 32)
          , g = Gd(b);
        0 === g && f && !e ? (g |= 33,
        Hd(b, g)) : g & 1 || (g |= 1,
        Hd(b, g));
        if (e)
            g & 2 || Ed(b, 34),
            Object.freeze(b);
        else if (2 & g || 2048 & g)
            b = Cd(b),
            e = 1,
            f && (e |= 32),
            Hd(b, e),
            Re(c, d, 1, b, !1);
        c = b;
        d = Gd(c);
        d = !!(4 & d) && !!(4096 & d);
        if (Array.isArray(a))
            for (b = 0; b < a.length; b++)
                c.push(je(a[b], d));
        else
            for (a = r(a),
            b = a.next(); !b.done; b = a.next())
                c.push(je(b.value, d))
    };
    Xv.ga = [1];
    var Zv = /^((market|itms|intent|itms-appss):\/\/)/i;
    var $v = "ad_type vpos mridx pos vad_type videoad_start_delay".split(" ");
    var aw = function(a) {
        var b = a.Wa
          , c = a.height
          , d = a.width
          , e = void 0 === a.Ca ? !1 : a.Ca;
        this.lb = a.lb;
        this.Wa = b;
        this.height = c;
        this.width = d;
        this.Ca = e
    };
    aw.prototype.getHeight = function() {
        return this.height
    }
    ;
    aw.prototype.getWidth = function() {
        return this.width
    }
    ;
    var bw = function(a) {
        var b = a.Ag
          , c = a.rf
          , d = a.zg
          , e = a.qf;
        aw.call(this, {
            lb: a.lb,
            Wa: a.Wa,
            height: a.height,
            width: a.width,
            Ca: void 0 === a.Ca ? !1 : a.Ca
        });
        this.o = b;
        this.h = c;
        this.j = d;
        this.g = e
    };
    u(bw, aw);
    var cw = function(a) {
        var b = a.Vf;
        aw.call(this, {
            lb: a.lb,
            Wa: a.Wa,
            height: a.height,
            width: a.width,
            Ca: void 0 === a.Ca ? !1 : a.Ca
        });
        this.g = b
    };
    u(cw, aw);
    cw.prototype.getMediaUrl = function() {
        return this.g
    }
    ;
    function dw(a) {
        return new (Function.prototype.bind.apply(a, [null].concat(ia(Ja.apply(1, arguments)))))
    }
    ;var ew = function(a, b, c, d) {
        P.call(this);
        this.F = b;
        this.D = c;
        this.B = d;
        this.l = new Map;
        this.G = 0;
        this.o = new Map;
        this.A = new Map;
        this.j = void 0;
        this.h = a
    };
    u(ew, P);
    ew.prototype.L = function() {
        delete this.g;
        this.l.clear();
        this.o.clear();
        this.A.clear();
        this.j && (sg(this.h, "message", this.j),
        delete this.j);
        delete this.h;
        delete this.B;
        P.prototype.L.call(this)
    }
    ;
    var fw = function(a) {
        if (a.g)
            return a.g;
        a.D && a.D(a.h) ? a.g = a.h : a.g = fi(a.h, a.F);
        var b;
        return null != (b = a.g) ? b : null
    }
      , hw = function(a, b, c) {
        if (fw(a))
            if (a.g === a.h)
                (b = a.l.get(b)) && b(a.g, c);
            else {
                var d = a.o.get(b);
                if (d && d.Tb) {
                    gw(a);
                    var e = ++a.G;
                    a.A.set(e, {
                        Eb: d.Eb,
                        xf: d.Cc(c),
                        fg: "addEventListener" === b
                    });
                    a.g.postMessage(d.Tb(c, e), "*")
                }
            }
    }
      , gw = function(a) {
        a.j || (a.j = function(b) {
            try {
                var c = a.B ? a.B(b) : void 0;
                if (c) {
                    var d = c.se
                      , e = a.A.get(d);
                    if (e) {
                        e.fg || a.A.delete(d);
                        var f;
                        null == (f = e.Eb) || f.call(e, e.xf, c.payload)
                    }
                }
            } catch (g) {}
        }
        ,
        rg(a.h, "message", a.j))
    };
    var iw = function(a, b) {
        b = b.listener;
        (a = (0,
        a.__gpp)("addEventListener", b)) && b(a, !0)
    }
      , jw = function(a, b) {
        (0,
        a.__gpp)("removeEventListener", b.listener, b.listenerId)
    }
      , kw = function(a, b) {
        (0,
        a.__gpp)("getSection", function(c) {
            b.callback({
                lc: null != c ? c : void 0,
                rc: c ? void 0 : 4
            })
        }, b.apiPrefix)
    }
      , lw = {
        Cc: function(a) {
            return a.listener
        },
        Tb: function(a, b) {
            a = {};
            return a.__gppCall = {
                callId: b,
                command: "addEventListener",
                version: "1.1"
            },
            a
        },
        Eb: function(a, b) {
            b = b.__gppReturn;
            a(b.returnValue, b.success)
        }
    }
      , mw = {
        Cc: function(a) {
            return a.listener
        },
        Tb: function(a, b) {
            var c = {};
            return c.__gppCall = {
                callId: b,
                command: "removeEventListener",
                version: "1.1",
                parameter: a.listenerId
            },
            c
        },
        Eb: function(a, b) {
            b = b.__gppReturn;
            var c = b.returnValue.data;
            null == a || a(c, b.success)
        }
    }
      , nw = {
        Cc: function(a) {
            return a.callback
        },
        Tb: function(a, b) {
            var c = {};
            return c.__gppCall = {
                callId: b,
                command: "getSection",
                version: "1.1",
                parameter: a.apiPrefix
            },
            c
        },
        Eb: function(a, b) {
            b = b.__gppReturn;
            var c;
            a({
                lc: null != (c = b.returnValue) ? c : void 0,
                rc: b.success ? void 0 : 2
            })
        }
    };
    function ow(a) {
        var b = {};
        "string" === typeof a.data ? b = JSON.parse(a.data) : b = a.data;
        return {
            payload: b,
            se: b.__gppReturn.callId
        }
    }
    var pw = function(a, b) {
        var c = void 0 === b ? {} : b;
        b = c.gppApiDetectionMode;
        c = c.timeoutMs;
        P.call(this);
        this.caller = new ew(a,b && 1 !== b && 3 !== b ? "__gppLocator_non_existent" : "__gppLocator",b && 1 !== b && 2 !== b ? void 0 : function(d) {
            return "function" === typeof d.__gpp
        }
        ,ow);
        this.caller.l.set("addEventListener", iw);
        this.caller.o.set("addEventListener", lw);
        this.caller.l.set("removeEventListener", jw);
        this.caller.o.set("removeEventListener", mw);
        this.caller.l.set("getDataWithCallback", kw);
        this.caller.o.set("getDataWithCallback", nw);
        this.timeoutMs = null != c ? c : 500
    };
    u(pw, P);
    pw.prototype.L = function() {
        this.caller.W();
        P.prototype.L.call(this)
    }
    ;
    pw.prototype.addEventListener = function(a) {
        var b = this
          , c = ng(function() {
            a(qw, !0)
        })
          , d = -1 === this.timeoutMs ? void 0 : setTimeout(function() {
            c()
        }, this.timeoutMs);
        hw(this.caller, "addEventListener", {
            listener: function(e, f) {
                clearTimeout(d);
                try {
                    var g;
                    if (void 0 === (null == (g = e.pingData) ? void 0 : g.gppVersion) || "1" === e.pingData.gppVersion || "1.0" === e.pingData.gppVersion) {
                        b.removeEventListener(e.listenerId);
                        var h = {
                            eventName: "signalStatus",
                            data: "ready",
                            pingData: {
                                internalErrorState: 1,
                                gppString: "GPP_ERROR_STRING_IS_DEPRECATED_SPEC",
                                applicableSections: [-1]
                            }
                        }
                    } else
                        Array.isArray(e.pingData.applicableSections) && 0 !== e.pingData.applicableSections.length ? h = e : (b.removeEventListener(e.listenerId),
                        h = {
                            eventName: "signalStatus",
                            data: "ready",
                            pingData: {
                                internalErrorState: 2,
                                gppString: "GPP_ERROR_STRING_EXPECTED_APPLICATION_SECTION_ARRAY",
                                applicableSections: [-1]
                            }
                        });
                    a(h, f)
                } catch (k) {
                    if (null == e ? 0 : e.listenerId)
                        try {
                            b.removeEventListener(e.listenerId)
                        } catch (m) {
                            a(rw, !0);
                            return
                        }
                    a(tw, !0)
                }
            }
        })
    }
    ;
    pw.prototype.removeEventListener = function(a) {
        hw(this.caller, "removeEventListener", {
            listenerId: a
        })
    }
    ;
    var tw = {
        eventName: "signalStatus",
        data: "ready",
        pingData: {
            internalErrorState: 2,
            gppString: "GPP_ERROR_STRING_UNAVAILABLE",
            applicableSections: [-1]
        },
        listenerId: -1
    }
      , qw = {
        eventName: "signalStatus",
        data: "ready",
        pingData: {
            gppString: "GPP_ERROR_STRING_LISTENER_REGISTRATION_TIMEOUT",
            internalErrorState: 2,
            applicableSections: [-1]
        },
        listenerId: -1
    }
      , rw = {
        eventName: "signalStatus",
        data: "ready",
        pingData: {
            gppString: "GPP_ERROR_STRING_REMOVE_EVENT_LISTENER_ERROR",
            internalErrorState: 2,
            applicableSections: [-1]
        },
        listenerId: -1
    };
    var uw = function(a) {
        void 0 !== a.addtlConsent && "string" !== typeof a.addtlConsent && (a.addtlConsent = void 0);
        void 0 !== a.gdprApplies && "boolean" !== typeof a.gdprApplies && (a.gdprApplies = void 0);
        return void 0 !== a.tcString && "string" !== typeof a.tcString || void 0 !== a.listenerId && "number" !== typeof a.listenerId ? 2 : a.cmpStatus && "error" !== a.cmpStatus ? 0 : 3
    }
      , vw = function(a, b) {
        b = void 0 === b ? {} : b;
        P.call(this);
        this.h = a;
        this.g = null;
        this.A = {};
        this.B = 0;
        var c;
        this.o = null != (c = b.timeoutMs) ? c : 500;
        var d;
        this.l = null != (d = b.mi) ? d : !1;
        this.j = null
    };
    u(vw, P);
    vw.prototype.L = function() {
        this.A = {};
        this.j && (sg(this.h, "message", this.j),
        delete this.j);
        delete this.A;
        delete this.h;
        delete this.g;
        P.prototype.L.call(this)
    }
    ;
    var xw = function(a) {
        return "function" === typeof a.h.__tcfapi || null != ww(a)
    }
      , Aw = function(a, b) {
        var c = {
            internalErrorState: 0,
            internalBlockOnErrors: a.l
        }
          , d = ng(function() {
            return b(c)
        })
          , e = 0;
        -1 !== a.o && (e = setTimeout(function() {
            e = 0;
            c.tcString = "tcunavailable";
            c.internalErrorState = 1;
            d()
        }, a.o));
        yw(a, "addEventListener", function(f) {
            f && (c = f,
            c.internalErrorState = uw(c),
            c.internalBlockOnErrors = a.l,
            zw(c) ? (0 != c.internalErrorState && (c.tcString = "tcunavailable"),
            yw(a, "removeEventListener", null, c.listenerId),
            (f = e) && clearTimeout(f),
            d()) : ("error" === c.cmpStatus || 0 !== c.internalErrorState) && (f = e) && clearTimeout(f))
        })
    };
    vw.prototype.addEventListener = function(a) {
        var b = this
          , c = {
            internalBlockOnErrors: this.l
        }
          , d = ng(function() {
            return a(c)
        })
          , e = 0;
        -1 !== this.o && (e = setTimeout(function() {
            c.tcString = "tcunavailable";
            c.internalErrorState = 1;
            d()
        }, this.o));
        var f = function(g, h) {
            clearTimeout(e);
            g ? (c = g,
            c.internalErrorState = uw(c),
            c.internalBlockOnErrors = b.l,
            h && 0 === c.internalErrorState || (c.tcString = "tcunavailable",
            h || (c.internalErrorState = 3))) : (c.tcString = "tcunavailable",
            c.internalErrorState = 3);
            a(c)
        };
        try {
            yw(this, "addEventListener", f)
        } catch (g) {
            c.tcString = "tcunavailable",
            c.internalErrorState = 3,
            e && (clearTimeout(e),
            e = 0),
            d()
        }
    }
    ;
    vw.prototype.removeEventListener = function(a) {
        a && a.listenerId && yw(this, "removeEventListener", null, a.listenerId)
    }
    ;
    var yw = function(a, b, c, d) {
        c || (c = function() {}
        );
        if ("function" === typeof a.h.__tcfapi)
            a = a.h.__tcfapi,
            a(b, 2, c, d);
        else if (ww(a)) {
            Bw(a);
            var e = ++a.B;
            a.A[e] = c;
            a.g && (c = {},
            a.g.postMessage((c.__tcfapiCall = {
                command: b,
                version: 2,
                callId: e,
                parameter: d
            },
            c), "*"))
        } else
            c({}, !1)
    }
      , ww = function(a) {
        if (a.g)
            return a.g;
        a.g = fi(a.h, "__tcfapiLocator");
        return a.g
    }
      , Bw = function(a) {
        a.j || (a.j = function(b) {
            try {
                var c = ("string" === typeof b.data ? JSON.parse(b.data) : b.data).__tcfapiReturn;
                a.A[c.callId](c.returnValue, c.success)
            } catch (d) {}
        }
        ,
        rg(a.h, "message", a.j))
    }
      , zw = function(a) {
        if (!1 === a.gdprApplies)
            return !0;
        void 0 === a.internalErrorState && (a.internalErrorState = uw(a));
        return "error" === a.cmpStatus || 0 !== a.internalErrorState ? a.internalBlockOnErrors ? (Pi({
            e: String(a.internalErrorState)
        }, "tcfe"),
        !1) : !0 : "loaded" !== a.cmpStatus || "tcloaded" !== a.eventStatus && "useractioncomplete" !== a.eventStatus ? !1 : !0
    };
    Yv([1, 8, 10, 11, 12, 2, 3, 4, 5, 15, 16]);
    Yv([1, 6, 7, 9, 10, 11, 12, 2, 3, 4, 5, 13, 14]);
    Yv([1, 6, 7, 9, 10, 11, 12, 2, 3, 4, 5, 13, 14]);
    new Xv;
    var R = function(a, b) {
        this.h = this.A = this.o = "";
        this.H = null;
        this.K = this.j = "";
        this.l = !1;
        var c;
        a instanceof R ? (this.l = void 0 !== b ? b : a.l,
        Cw(this, a.o),
        this.A = a.A,
        this.h = a.h,
        Dw(this, a.H),
        this.j = a.j,
        Ew(this, Fw(a.g)),
        this.K = a.D()) : a && (c = String(a).match(Hh)) ? (this.l = !!b,
        Cw(this, c[1] || "", !0),
        this.A = Gw(c[2] || ""),
        this.h = Gw(c[3] || "", !0),
        Dw(this, c[4]),
        this.j = Gw(c[5] || "", !0),
        Ew(this, c[6] || "", !0),
        this.K = Gw(c[7] || "")) : (this.l = !!b,
        this.g = new Hw(null,this.l))
    };
    R.prototype.toString = function() {
        var a = []
          , b = this.o;
        b && a.push(Iw(b, Jw, !0), ":");
        var c = this.h;
        if (c || "file" == b)
            a.push("//"),
            (b = this.A) && a.push(Iw(b, Jw, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.H,
            null != c && a.push(":", String(c));
        if (c = this.j)
            this.h && "/" != c.charAt(0) && a.push("/"),
            a.push(Iw(c, "/" == c.charAt(0) ? Kw : Lw, !0));
        (c = this.g.toString()) && a.push("?", c);
        (c = this.D()) && a.push("#", Iw(c, Mw));
        return a.join("")
    }
    ;
    R.prototype.resolve = function(a) {
        var b = this.F()
          , c = !!a.o;
        c ? Cw(b, a.o) : c = !!a.A;
        c ? b.A = a.A : c = !!a.h;
        c ? b.h = a.h : c = null != a.H;
        var d = a.j;
        if (c)
            Dw(b, a.H);
        else if (c = !!a.j) {
            if ("/" != d.charAt(0))
                if (this.h && !this.j)
                    d = "/" + d;
                else {
                    var e = b.j.lastIndexOf("/");
                    -1 != e && (d = b.j.slice(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e)
                d = "";
            else if (qb(e, "./") || qb(e, "/.")) {
                d = 0 == e.lastIndexOf("/", 0);
                e = e.split("/");
                for (var f = [], g = 0; g < e.length; ) {
                    var h = e[g++];
                    "." == h ? d && g == e.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(),
                    d && g == e.length && f.push("")) : (f.push(h),
                    d = !0)
                }
                d = f.join("/")
            } else
                d = e
        }
        c ? b.j = d : c = "" !== a.g.toString();
        c ? Ew(b, Fw(a.g)) : c = !!a.K;
        c && (b.K = a.D());
        return b
    }
    ;
    R.prototype.F = function() {
        return new R(this)
    }
    ;
    var Cw = function(a, b, c) {
        a.o = c ? Gw(b, !0) : b;
        a.o && (a.o = a.o.replace(/:$/, ""))
    }
      , Dw = function(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
            a.H = b
        } else
            a.H = null
    }
      , Ew = function(a, b, c) {
        b instanceof Hw ? (a.g = b,
        Nw(a.g, a.l)) : (c || (b = Iw(b, Ow)),
        a.g = new Hw(b,a.l))
    }
      , Pw = function(a, b, c) {
        a.g.set(b, c);
        return a
    };
    R.prototype.D = function() {
        return this.K
    }
    ;
    var Qw = function(a) {
        return a instanceof R ? a.F() : new R(a,void 0)
    }
      , Gw = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
      , Iw = function(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, Rw),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
      , Rw = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
      , Jw = /[#\/\?@]/g
      , Lw = /[#\?:]/g
      , Kw = /[#\?]/g
      , Ow = /[#\?@]/g
      , Mw = /#/g
      , Hw = function(a, b) {
        this.h = this.g = null;
        this.j = a || null;
        this.o = !!b
    }
      , Sw = function(a) {
        a.g || (a.g = new Map,
        a.h = 0,
        a.j && Jh(a.j, function(b, c) {
            a.add(bh(b), c)
        }))
    };
    Hw.prototype.add = function(a, b) {
        Sw(this);
        this.j = null;
        a = Tw(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.h += 1;
        return this
    }
    ;
    Hw.prototype.remove = function(a) {
        Sw(this);
        a = Tw(this, a);
        return this.g.has(a) ? (this.j = null,
        this.h -= this.g.get(a).length,
        this.g.delete(a)) : !1
    }
    ;
    Hw.prototype.clear = function() {
        this.g = this.j = null;
        this.h = 0
    }
    ;
    Hw.prototype.isEmpty = function() {
        Sw(this);
        return 0 == this.h
    }
    ;
    var Uw = function(a, b) {
        Sw(a);
        b = Tw(a, b);
        return a.g.has(b)
    };
    l = Hw.prototype;
    l.forEach = function(a, b) {
        Sw(this);
        this.g.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    }
    ;
    l.tc = function() {
        Sw(this);
        for (var a = Array.from(this.g.values()), b = Array.from(this.g.keys()), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
        return c
    }
    ;
    l.Bb = function(a) {
        Sw(this);
        var b = [];
        if ("string" === typeof a)
            Uw(this, a) && (b = b.concat(this.g.get(Tw(this, a))));
        else {
            a = Array.from(this.g.values());
            for (var c = 0; c < a.length; c++)
                b = b.concat(a[c])
        }
        return b
    }
    ;
    l.set = function(a, b) {
        Sw(this);
        this.j = null;
        a = Tw(this, a);
        Uw(this, a) && (this.h -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.h += 1;
        return this
    }
    ;
    l.get = function(a, b) {
        if (!a)
            return b;
        a = this.Bb(a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    l.toString = function() {
        if (this.j)
            return this.j;
        if (!this.g)
            return "";
        for (var a = [], b = Array.from(this.g.keys()), c = 0; c < b.length; c++) {
            var d = b[c]
              , e = encodeURIComponent(String(d));
            d = this.Bb(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        }
        return this.j = a.join("&")
    }
    ;
    var Fw = function(a) {
        var b = new Hw;
        b.j = a.j;
        a.g && (b.g = new Map(a.g),
        b.h = a.h);
        return b
    }
      , Tw = function(a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b
    }
      , Nw = function(a, b) {
        b && !a.o && (Sw(a),
        a.j = null,
        a.g.forEach(function(c, d) {
            var e = d.toLowerCase();
            d != e && (this.remove(d),
            this.remove(e),
            0 < c.length && (this.j = null,
            this.g.set(Tw(this, e), ac(c)),
            this.h += c.length))
        }, a));
        a.o = b
    };
    var Vw, Ww, Xw, Yw = function() {
        return w.navigator ? w.navigator.userAgent : ""
    }, Zw = qb(Yw(), "(iPad") || qb(Yw(), "(Macintosh") || qb(Yw(), "(iPod") || qb(Yw(), "(iPhone");
    var $w = "ad.doubleclick.net bid.g.doubleclick.net ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" ")
      , ax = ["c.googlesyndication.com"];
    function bx(a, b) {
        b = void 0 === b ? window.location.protocol : b;
        var c = !1;
        null == a || !a.startsWith("http") || (null == a ? 0 : a.startsWith("https")) ? c = !1 : cx(a, ax) ? c = !1 : b.includes("https") && cx(a, $w) && (c = !0);
        return c ? (a = new R(a),
        I(G.g(), "htp", "1"),
        Cw(a, "https"),
        a.toString()) : a
    }
    function dx(a) {
        if (!a)
            return !1;
        try {
            var b = "string" === typeof a ? new R(a) : a;
            return "gcache" == b.o && !!b.g.get("url")
        } catch (c) {
            return !1
        }
    }
    function ex(a) {
        try {
            var b = "string" === typeof a ? new R(a) : a;
            if (dx(b)) {
                var c = b.g.get("url");
                return "undefined" === typeof c ? null : c
            }
        } catch (d) {}
        return null
    }
    function cx(a, b) {
        return (new RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + b.join("|").replace(/\./g, "\\.") + ")(:[0-9]+)?([/?#]|$)","i")).test(a)
    }
    function fx(a) {
        a = new R(a);
        var b = a.h;
        if ("http" != a.o && "https" != a.o)
            a = !1;
        else if (-1 == b.indexOf(".") || b.match(/^[\.0-9]*$/))
            a = !1;
        else
            a: {
                try {
                    bh(a.toString())
                } catch (c) {
                    a = !1;
                    break a
                }
                a = !0
            }
        return a
    }
    ;var gx = -1;
    function hx(a, b) {
        b = null != b ? b : "";
        kc && (b = "");
        if (!ob(eh(a))) {
            var c = a instanceof Sg || !Zv.test(a) ? a : new Sg(a,Tg);
            if (c instanceof Sg)
                var d = c;
            else {
                d = void 0 === d ? Ph : d;
                a: if (d = void 0 === d ? Ph : d,
                !(a instanceof Sg)) {
                    for (c = 0; c < d.length; ++c) {
                        var e = d[c];
                        if (e instanceof Nh && e.Tf(a)) {
                            a = new Sg(a,Tg);
                            break a
                        }
                    }
                    a = void 0
                }
                d = a || Ug
            }
            a = window;
            if (d instanceof Sg)
                var f = d instanceof Sg && d.constructor === Sg ? d.g : "type_error:SafeUrl";
            else {
                b: if (Rh) {
                    try {
                        f = new URL(d)
                    } catch (g) {
                        f = "https:";
                        break b
                    }
                    f = f.protocol
                } else
                    c: {
                        f = document.createElement("a");
                        try {
                            f.href = d
                        } catch (g) {
                            f = void 0;
                            break c
                        }
                        f = f.protocol;
                        f = ":" === f || "" === f ? "https:" : f
                    }
                f = "javascript:" !== f ? d : void 0
            }
            void 0 !== f && a.open(f, "_blank", b)
        }
    }
    ;var ix = /OS (\S+) like/
      , jx = /Android ([\d\.]+)/;
    function kx(a, b) {
        a = (a = a.exec(wb())) ? a[1] : "";
        a = a.replace(/_/g, ".");
        return 0 <= tb(a, b)
    }
    var lx = function() {
        return oc && "ontouchstart"in document.documentElement
    }
      , mx = function(a) {
        return wc && kx(ix, a)
    }
      , nx = function(a) {
        return (a = void 0 === a ? null : a) && "function" === typeof a.getAttribute ? a.getAttribute("playsinline") ? !0 : !1 : !1
    };
    var ox = function(a) {
        Q.call(this);
        this.h = a;
        this.l = this.A = !1;
        this.B = this.D = 0;
        this.g = new Ot(1E3);
        uo(this, this.g);
        Zs(this.g, "tick", this.F, !1, this);
        Zs(this.h, "pause", this.j, !1, this);
        Zs(this.h, "playing", this.j, !1, this);
        Zs(this.h, "ended", this.j, !1, this);
        Zs(this.h, "timeupdate", this.j, !1, this)
    };
    u(ox, Q);
    var px = function(a) {
        var b;
        return null != (b = a.h.currentTime) ? b : a.h.getCurrentTime()
    };
    ox.prototype.j = function(a) {
        switch (a.type) {
        case "playing":
            qx(this);
            break;
        case "pause":
        case "ended":
            this.g.enabled && this.g.stop();
            break;
        case "timeupdate":
            !this.A && 0 < px(this) && (this.A = !0,
            qx(this))
        }
    }
    ;
    var qx = function(a) {
        !a.g.enabled && a.A && (a.D = 1E3 * px(a),
        a.B = Date.now(),
        a.l = !1,
        a.g.start())
    };
    ox.prototype.F = function() {
        var a = Date.now()
          , b = a - this.B
          , c = 1E3 * px(this);
        c - this.D < .5 * b ? this.l || (this.l = !0,
        this.dispatchEvent("playbackStalled")) : this.l = !1;
        this.D = c;
        this.B = a
    }
    ;
    var rx = "://secure-...imrworldwide.com/ ://cdn.imrworldwide.com/ ://aksecure.imrworldwide.com/ ://[^.]*.moatads.com ://youtube[0-9]+.moatpixel.com ://pm.adsafeprotected.com/youtube ://pm.test-adsafeprotected.com/youtube ://e[0-9]+.yt.srs.doubleverify.com www.google.com/pagead/xsul www.youtube.com/pagead/slav".split(" ")
      , sx = /\bocr\b/;
    function tx(a) {
        if (ob(eh(a)) || kc && 2048 < a.length)
            return !1;
        try {
            if ((new R(a)).D().match(sx))
                return !0
        } catch (b) {}
        return null != rx.find(function(b) {
            return null != a.match(b)
        })
    }
    ;var ux = new Map
      , vx = function() {
        this.h = this.g = null
    };
    function wx(a, b, c, d) {
        var e = yn(a);
        b.width <= e.width && b.height <= e.height ? (xx(d),
        c(e)) : (e = setTimeout(function() {
            return wx(a, b, c, d)
        }, 200),
        d.h = e)
    }
    function yx(a, b) {
        b = void 0 === b ? new D(1,1) : b;
        var c = new vx
          , d = new Promise(function(e) {
            var f = yn(a);
            if (b.width <= f.width && b.height <= f.height)
                return e(f);
            "ResizeObserver"in window ? (f = new ResizeObserver(function(g) {
                window.requestAnimationFrame(function() {
                    for (var h = new D(0,0), k = r(g), m = k.next(); !m.done; m = k.next())
                        if (m = m.value,
                        m.contentBoxSize ? (m = Array.isArray(m.contentBoxSize) ? m.contentBoxSize[0] : m.contentBoxSize,
                        h.width = Math.floor(m.inlineSize),
                        h.height = Math.floor(m.blockSize)) : (h.width = Math.floor(m.contentRect.width),
                        h.height = Math.floor(m.contentRect.height)),
                        b.width <= h.width && b.height <= h.height)
                            return xx(c),
                            e(h)
                })
            }
            ),
            c.g = f,
            f.observe(a)) : wx(a, b, e, c)
        }
        );
        ux.set(d, c);
        return d
    }
    function xx(a) {
        a.h && window.clearTimeout(a.h);
        a.g && (a.g.disconnect(),
        a.g = null)
    }
    ;function zx(a, b) {
        return ob(b) ? !1 : (new RegExp(a)).test(b)
    }
    function Ax(a) {
        var b = {};
        a.split(",").forEach(function(c) {
            var d = c.split("=");
            2 == d.length && (c = pb(d[0]),
            d = pb(d[1]),
            0 < c.length && (b[c] = d))
        });
        return b
    }
    function Bx(a) {
        var b = "af am ar_eg ar_sa ar_xb ar be bg bn ca cs da de_at de_cn de el en_au en_ca en_gb en_ie en_in en_sg en_xa en_xc en_za en es_419 es_ar es_bo es_cl es_co es_cr es_do es_ec es_gt es_hn es_mx es_ni es_pa es_pe es_pr es_py es_sv es_us es_uy es_ve es et eu fa fi fil fr_ca fr_ch fr gl gsw gu he hi hr hu id in is it iw ja kn ko ln lo lt lv ml mo mr ms nb ne nl no pl pt_br pt_pt pt ro ru sk sl sr_latn sr sv sw ta te th tl tr uk ur vi zh_cn zh_hk zh_tw zh zu".split(" ");
        if (!a)
            return null;
        a = a.toLowerCase().replace("-", "_");
        if (b.includes(a))
            return a;
        a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "";
        return b.includes(a) ? a : null
    }
    ;var Cx = function(a) {
        this.h = a;
        this.g = Date.now()
    };
    Cx.prototype.reset = function() {
        this.g = Date.now()
    }
    ;
    var Dx = function(a) {
        a = a.g + a.h - Date.now();
        return 0 < a ? a : 0
    };
    var Ex = function(a, b) {
        this.url = a;
        this.g = void 0 === b ? null : b
    };
    var Fx = function(a) {
        switch (a) {
        case 0:
            return "No Error";
        case 1:
            return "Access denied to content document";
        case 2:
            return "File not found";
        case 3:
            return "Firefox silently errored";
        case 4:
            return "Application custom error";
        case 5:
            return "An exception occurred";
        case 6:
            return "Http response at 400 or 500 level";
        case 7:
            return "Request was aborted";
        case 8:
            return "Request timed out";
        case 9:
            return "The resource is not available offline";
        default:
            return "Unrecognized error code"
        }
    };
    var Gx = function(a, b) {
        var c = Error.call(this, a);
        this.message = c.message;
        "stack"in c && (this.stack = c.stack);
        this.errorCode = a;
        this.g = b
    };
    u(Gx, Error);
    var Hx = function() {
        if (!kc)
            return !1;
        try {
            return new ActiveXObject("MSXML2.DOMDocument"),
            !0
        } catch (a) {
            return !1
        }
    }
      , Ix = kc && Hx();
    var Jx = function(a) {
        P.call(this);
        this.o = a;
        this.h = {}
    };
    cb(Jx, P);
    var Kx = [];
    Jx.prototype.N = function(a, b, c, d) {
        return Lx(this, a, b, c, d)
    }
    ;
    var Lx = function(a, b, c, d, e, f) {
        Array.isArray(c) || (c && (Kx[0] = c.toString()),
        c = Kx);
        for (var g = 0; g < c.length; g++) {
            var h = Zs(b, c[g], d || a.handleEvent, e || !1, f || a.o || a);
            if (!h)
                break;
            a.h[h.key] = h
        }
        return a
    };
    Jx.prototype.Sb = function(a, b, c, d) {
        return Mx(this, a, b, c, d)
    }
    ;
    var Mx = function(a, b, c, d, e, f) {
        if (Array.isArray(c))
            for (var g = 0; g < c.length; g++)
                Mx(a, b, c[g], d, e, f);
        else {
            b = Ys(b, c, d || a.handleEvent, e, f || a.o || a);
            if (!b)
                return a;
            a.h[b.key] = b
        }
        return a
    };
    Jx.prototype.vb = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                this.vb(a, b[f], c, d, e);
        else
            c = c || this.handleEvent,
            d = Ra(d) ? !!d.capture : !!d,
            e = e || this.o || this,
            c = $s(c),
            d = !!d,
            b = Os(a) ? a.Ob(b, c, d, e) : a ? (a = bt(a)) ? a.Ob(b, c, d, e) : null : null,
            b && (gt(b),
            delete this.h[b.key])
    }
    ;
    var Nx = function(a) {
        xg(a.h, function(b, c) {
            this.h.hasOwnProperty(c) && gt(b)
        }, a);
        a.h = {}
    };
    Jx.prototype.L = function() {
        Jx.Da.L.call(this);
        Nx(this)
    }
    ;
    Jx.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    }
    ;
    var Ox = function() {};
    Ox.prototype.g = null;
    var Qx = function(a) {
        var b;
        (b = a.g) || (b = {},
        Px(a) && (b[0] = !0,
        b[1] = !0),
        b = a.g = b);
        return b
    };
    var Rx, Sx = function() {};
    cb(Sx, Ox);
    var Tx = function(a) {
        return (a = Px(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
      , Px = function(a) {
        if (!a.h && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.h = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.h
    };
    Rx = new Sx;
    var Ux = function(a) {
        Q.call(this);
        this.headers = new Map;
        this.G = a || null;
        this.h = !1;
        this.F = this.g = null;
        this.O = "";
        this.l = 0;
        this.j = this.M = this.A = this.I = !1;
        this.D = 0;
        this.B = null;
        this.Z = "";
        this.U = this.V = !1
    };
    cb(Ux, Q);
    var Vx = /^https?$/i
      , Wx = ["POST", "PUT"]
      , $x = function(a, b, c, d) {
        if (a.g)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + a.O + "; newUri=" + b);
        c = c ? c.toUpperCase() : "GET";
        a.O = b;
        a.l = 0;
        a.I = !1;
        a.h = !0;
        a.g = a.G ? Tx(a.G) : Tx(Rx);
        a.F = a.G ? Qx(a.G) : Qx(Rx);
        a.g.onreadystatechange = ab(a.X, a);
        try {
            a.M = !0,
            a.g.open(c, String(b), !0),
            a.M = !1
        } catch (g) {
            Xx(a);
            return
        }
        b = d || "";
        d = new Map(a.headers);
        var e = Array.from(d.keys()).find(function(g) {
            return "content-type" == g.toLowerCase()
        })
          , f = w.FormData && b instanceof w.FormData;
        !Wb(Wx, c) || e || f || d.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        c = r(d);
        for (d = c.next(); !d.done; d = c.next())
            e = r(d.value),
            d = e.next().value,
            e = e.next().value,
            a.g.setRequestHeader(d, e);
        a.Z && (a.g.responseType = a.Z);
        "withCredentials"in a.g && a.g.withCredentials !== a.V && (a.g.withCredentials = a.V);
        try {
            Yx(a),
            0 < a.D && (a.U = Zx(a.g),
            a.U ? (a.g.timeout = a.D,
            a.g.ontimeout = ab(a.aa, a)) : a.B = Pt(a.aa, a.D, a)),
            a.A = !0,
            a.g.send(b),
            a.A = !1
        } catch (g) {
            Xx(a)
        }
    }
      , Zx = function(a) {
        return kc && "number" === typeof a.timeout && void 0 !== a.ontimeout
    };
    Ux.prototype.aa = function() {
        "undefined" != typeof Ma && this.g && (this.l = 8,
        this.dispatchEvent("timeout"),
        this.abort(8))
    }
    ;
    var Xx = function(a) {
        a.h = !1;
        a.g && (a.j = !0,
        a.g.abort(),
        a.j = !1);
        a.l = 5;
        ay(a);
        by(a)
    }
      , ay = function(a) {
        a.I || (a.I = !0,
        a.dispatchEvent("complete"),
        a.dispatchEvent("error"))
    };
    Ux.prototype.abort = function(a) {
        this.g && this.h && (this.h = !1,
        this.j = !0,
        this.g.abort(),
        this.j = !1,
        this.l = a || 7,
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        by(this))
    }
    ;
    Ux.prototype.L = function() {
        this.g && (this.h && (this.h = !1,
        this.j = !0,
        this.g.abort(),
        this.j = !1),
        by(this, !0));
        Ux.Da.L.call(this)
    }
    ;
    Ux.prototype.X = function() {
        this.Aa() || (this.M || this.A || this.j ? Ly(this) : this.ba())
    }
    ;
    Ux.prototype.ba = function() {
        Ly(this)
    }
    ;
    var Ly = function(a) {
        if (a.h && "undefined" != typeof Ma && (!a.F[1] || 4 != My(a) || 2 != Ny(a)))
            if (a.A && 4 == My(a))
                Pt(a.X, 0, a);
            else if (a.dispatchEvent("readystatechange"),
            4 == My(a)) {
                a.h = !1;
                try {
                    var b = Ny(a);
                    a: switch (b) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var c = !0;
                        break a;
                    default:
                        c = !1
                    }
                    var d;
                    if (!(d = c)) {
                        var e;
                        if (e = 0 === b) {
                            var f = String(a.O).match(Hh)[1] || null;
                            !f && w.self && w.self.location && (f = w.self.location.protocol.slice(0, -1));
                            e = !Vx.test(f ? f.toLowerCase() : "")
                        }
                        d = e
                    }
                    d ? (a.dispatchEvent("complete"),
                    a.dispatchEvent("success")) : (a.l = 6,
                    ay(a))
                } finally {
                    by(a)
                }
            }
    }
      , by = function(a, b) {
        if (a.g) {
            Yx(a);
            var c = a.g
              , d = a.F[0] ? function() {}
            : null;
            a.g = null;
            a.F = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }
      , Yx = function(a) {
        a.g && a.U && (a.g.ontimeout = null);
        a.B && (w.clearTimeout(a.B),
        a.B = null)
    };
    Ux.prototype.isActive = function() {
        return !!this.g
    }
    ;
    var My = function(a) {
        return a.g ? a.g.readyState : 0
    }
      , Ny = function(a) {
        try {
            return 2 < My(a) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    }
      , Oy = function(a) {
        if (a.g) {
            a: {
                a = a.g.responseText;
                if (w.JSON)
                    try {
                        var b = w.JSON.parse(a);
                        break a
                    } catch (c) {}
                b = Ij(a)
            }
            return b
        }
    };
    var Py = function() {};
    Py.prototype.get = function(a) {
        return Qy({
            url: a.url,
            timeout: a.timeout,
            withCredentials: void 0 === a.withCredentials ? !0 : a.withCredentials,
            method: "GET",
            headers: void 0 === a.headers ? {} : a.headers
        })
    }
    ;
    var Qy = function(a) {
        var b = a.url
          , c = a.timeout
          , d = a.withCredentials
          , e = a.method
          , f = void 0 === a.content ? void 0 : a.content
          , g = void 0 === a.headers ? {} : a.headers;
        return Ry({
            url: b,
            timeout: c,
            withCredentials: d,
            method: e,
            content: f,
            headers: g
        }).then(function(h) {
            return Promise.resolve(h)
        }, function(h) {
            return h instanceof Error && 6 == h.message && d ? Ry({
                url: b,
                timeout: c,
                withCredentials: !d,
                method: e,
                content: f,
                headers: g
            }) : Promise.reject(h)
        })
    }
      , Ry = function(a) {
        var b = a.url
          , c = a.timeout
          , d = a.withCredentials
          , e = a.method
          , f = void 0 === a.content ? void 0 : a.content;
        a = void 0 === a.headers ? {} : a.headers;
        var g = new Ux;
        g.V = d;
        g.D = Math.max(0, Dx(c));
        for (var h in a)
            g.headers.set(h, a[h]);
        var k = new Jx;
        return new Promise(function(m, n) {
            k.Sb(g, "success", function() {
                a: {
                    if (Nn())
                        try {
                            Oy(g);
                            var q = "application/json";
                            break a
                        } catch (x) {
                            q = "application/xml";
                            break a
                        }
                    g.g && 4 == My(g) ? (q = g.g.getResponseHeader("Content-Type"),
                    q = null === q ? void 0 : q) : q = void 0;
                    q = q || ""
                }
                if (-1 != q.indexOf("application/json"))
                    m(Oy(g) || {});
                else {
                    try {
                        var t = g.g ? g.g.responseXML : null
                    } catch (x) {
                        t = null
                    }
                    if (null == t) {
                        try {
                            var v = g.g ? g.g.responseText : ""
                        } catch (x) {
                            v = ""
                        }
                        t = v;
                        if ("undefined" != typeof DOMParser)
                            v = new DOMParser,
                            t = uj(t),
                            t = v.parseFromString($g(t), "application/xml");
                        else if (Ix) {
                            v = new ActiveXObject("MSXML2.DOMDocument");
                            v.resolveExternals = !1;
                            v.validateOnParse = !1;
                            try {
                                v.setProperty("ProhibitDTD", !0),
                                v.setProperty("MaxXMLSize", 2048),
                                v.setProperty("MaxElementDepth", 256)
                            } catch (x) {}
                            v.loadXML(t);
                            t = v
                        } else
                            throw Error("Your browser does not support loading xml documents");
                    }
                    m(t)
                }
                k.W();
                g.W()
            });
            k.Sb(g, ["error", "timeout"], function() {
                n(new Gx(g.l,Ny(g)));
                k.W();
                g.W()
            });
            $x(g, bx(b), e, f)
        }
        )
    };
    y("google.javascript.ads.imalib.common.UrlLoader", Py);
    var Sy = ["A9AxgGSwmnfgzzkyJHILUr3H8nJ/3D+57oAsL4DBt4USlng4jZ0weq+fZtHC/Qwwn6gd4QSa5DzT3OBif+kXVA0AAAB4eyJvcmlnaW4iOiJodHRwczovL2ltYXNkay5nb29nbGVhcGlzLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjk1MTY3OTk5LCJpc1RoaXJkUGFydHkiOnRydWV9", "As0hBNJ8h++fNYlkq8cTye2qDLyom8NddByiVytXGGD0YVE+2CEuTCpqXMDxdhOMILKoaiaYifwEvCRlJ/9GcQ8AAAB8eyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiV2ViVmlld1hSZXF1ZXN0ZWRXaXRoRGVwcmVjYXRpb24iLCJleHBpcnkiOjE3MTk1MzI3OTksImlzU3ViZG9tYWluIjp0cnVlfQ=="];
    function Ty() {
        var a = void 0 === a ? document : a;
        var b;
        return !(null == (b = a.featurePolicy) || !b.features().includes("attribution-reporting"))
    }
    ;var Uy = RegExp("ad\\.doubleclick\\.net/ddm/track(imp|clk)")
      , Yy = function(a, b, c, d, e) {
        c = void 0 === c ? !1 : c;
        e = void 0 === e ? null : e;
        try {
            if (b = (void 0 === d ? 0 : d) ? bx(b, "https") : bx(b),
            Uy.test(b) && (b = b.replace("?", ";tpsrc=ima?"),
            e = e || ""),
            c = c || tx(b),
            a.h || null != e)
                Vy(a, b, c, e);
            else {
                var f = Ty() ? e : null;
                Nn() ? Wy(b) : Xy(a, b, c, f)
            }
        } catch (g) {}
    }
      , Zy = function(a, b) {
        var c = {
            keepalive: !0,
            method: "get",
            redirect: "follow"
        };
        a && (c.referrerPolicy = "no-referrer");
        b ? "setAttributionReporting"in XMLHttpRequest.prototype ? (c.attributionReporting = {
            eventSourceEligible: !0,
            triggerEligible: !1
        },
        c.mode = "no-cors") : c.headers = {
            "Attribution-Reporting-Eligible": "event-source"
        } : c.mode = "no-cors";
        return c
    }
      , Vy = function(a, b, c, d) {
        d = void 0 === d ? null : d;
        I(G.g(), "faa", "1");
        var e = Ty();
        fetch(b, Zy(c, "" === d && e)).then(function() {
            I(G.g(), "fas", "1")
        }).catch(function() {
            I(G.g(), "faf", "1");
            a.h = !1;
            var f = d;
            f = Ty() ? f : null;
            Nn() ? Wy(b) : Xy(a, b, c, f)
        });
        e && d && fetch(d, Zy(c, !0))
    }
      , Xy = function(a, b, c, d) {
        var e = new Image
          , f = (a.j++).toString();
        a.g.set(f, e);
        e.onload = e.onerror = function() {
            a.g.delete(f)
        }
        ;
        c && (e.referrerPolicy = "no-referrer");
        null != d && (e.attributionSrc = d);
        e.src = b
    }
      , Wy = function(a) {
        (new Py).get({
            url: a,
            timeout: new Cx(5E3)
        })
    };
    var $y = {
        AUTOPLAY_DISALLOWED: "autoplayDisallowed",
        Gg: "beginFullscreen",
        Hg: "canPlay",
        Ig: "canPlayThrough",
        CLICK: "click",
        DURATION_CHANGE: "durationChange",
        Tg: "end",
        Ug: "endFullscreen",
        ERROR: "error",
        Yg: "focusSkipButton",
        Ve: "loadStart",
        LOADED: "loaded",
        yh: "mediaLoadTimeout",
        zh: "mediaPlaybackTimeout",
        Td: "pause",
        Fh: "play",
        Gh: "playing",
        Oh: "seeked",
        Ph: "seeking",
        Qh: "skip",
        hf: "skipShown",
        Rh: "stalled",
        Ud: "start",
        Wh: "timeUpdate",
        Uh: "timedMetadata",
        fi: "volumeChange",
        gi: "waiting",
        hi: "windowFocusChanged",
        Zg: "fullyLoaded"
    };
    var az = function() {
        Q.apply(this, arguments)
    };
    u(az, Q);
    az.prototype.B = function() {
        return !1
    }
    ;
    az.prototype.F = function() {
        return -1
    }
    ;
    az.prototype.G = function() {}
    ;
    var S = {}
      , bz = (S[18] = -1,
    S[22] = -1,
    S[43] = 350,
    S[44] = 350,
    S[45] = 350,
    S[59] = -1,
    S[133] = 350,
    S[134] = 350,
    S[135] = 350,
    S[136] = 350,
    S[139] = 50,
    S[140] = 50,
    S[141] = 50,
    S[160] = 350,
    S[242] = 150,
    S[243] = 150,
    S[244] = 150,
    S[245] = 150,
    S[247] = 150,
    S[249] = 50,
    S[250] = 50,
    S[251] = 50,
    S[278] = 150,
    S[342] = -1,
    S[343] = -1,
    S[344] = -1,
    S[345] = -1,
    S[346] = -1,
    S[347] = -1,
    S[396] = -1,
    S[398] = -1,
    S)
      , cz = {}
      , dz = (cz[18] = !1,
    cz[22] = !1,
    cz[43] = !0,
    cz[44] = !0,
    cz[45] = !0,
    cz[59] = !1,
    cz[133] = !0,
    cz[134] = !0,
    cz[135] = !0,
    cz[136] = !0,
    cz[139] = !0,
    cz[140] = !0,
    cz[141] = !0,
    cz[160] = !0,
    cz[242] = !0,
    cz[243] = !0,
    cz[244] = !0,
    cz[245] = !0,
    cz[247] = !0,
    cz[249] = !0,
    cz[250] = !0,
    cz[251] = !0,
    cz[278] = !0,
    cz[342] = !1,
    cz[343] = !1,
    cz[344] = !1,
    cz[345] = !1,
    cz[346] = !1,
    cz[347] = !1,
    cz[396] = !0,
    cz[398] = !0,
    cz)
      , ez = {}
      , fz = (ez[18] = "video/mp4",
    ez[22] = "video/mp4",
    ez[43] = "video/webm",
    ez[44] = "video/webm",
    ez[45] = "video/webm",
    ez[59] = "video/mp4",
    ez[133] = "video/mp4",
    ez[134] = "video/mp4",
    ez[135] = "video/mp4",
    ez[136] = "video/mp4",
    ez[139] = "audio/mp4",
    ez[140] = "audio/mp4",
    ez[141] = "audio/mp4",
    ez[160] = "video/mp4",
    ez[242] = "video/webm",
    ez[243] = "video/webm",
    ez[244] = "video/webm",
    ez[245] = "video/webm",
    ez[247] = "video/webm",
    ez[249] = "audio/webm",
    ez[250] = "audio/webm",
    ez[251] = "audio/webm",
    ez[278] = "video/webm",
    ez[342] = "video/mp4",
    ez[343] = "video/mp4",
    ez[344] = "video/mp4",
    ez[345] = "video/mp4",
    ez[346] = "video/mp4",
    ez[347] = "video/mp4",
    ez[396] = "video/mp4",
    ez[398] = "video/mp4",
    ez)
      , gz = {}
      , hz = (gz[18] = "avc1.42001E, mp4a.40.2",
    gz[22] = "avc1.64001F, mp4a.40.2",
    gz[43] = "vp8, vorbis",
    gz[44] = "vp8, vorbis",
    gz[45] = "vp8, vorbis",
    gz[59] = "avc1.4D001F, mp4a.40.2",
    gz[133] = "avc1.4D401E",
    gz[134] = "avc1.4D401E",
    gz[135] = "avc1.4D401E",
    gz[136] = "avc1.4D401E",
    gz[139] = "mp4a.40.2",
    gz[140] = "mp4a.40.2",
    gz[141] = "mp4a.40.2",
    gz[160] = "avc1.4D401E",
    gz[242] = "vp9",
    gz[243] = "vp9",
    gz[244] = "vp9",
    gz[245] = "vp9",
    gz[247] = "vp9",
    gz[249] = "opus",
    gz[250] = "opus",
    gz[251] = "opus",
    gz[278] = "vp9",
    gz[342] = "avc1.42E01E, mp4a.40.2",
    gz[343] = "avc1.42E01E, mp4a.40.2",
    gz[344] = "avc1.42E01E, mp4a.40.2",
    gz[345] = "avc1.42E01E, mp4a.40.2",
    gz[346] = "avc1.42E01E, mp4a.40.2",
    gz[347] = "avc1.4D001F, mp4a.40.2",
    gz[396] = "av01.0.05M.08",
    gz[398] = "av01.0.05M.08",
    gz);
    var iz = RegExp("/itag/(\\d+)/");
    function jz(a) {
        var b = Number(Lh(a, "itag"));
        return b ? b : (a = a.match(iz)) && 2 === a.length ? Number(a[1]) : null
    }
    function kz(a) {
        var b = fz[a];
        a = hz[a];
        b ? (b = eh(b).toLowerCase(),
        b = a ? b + '; codecs="' + eh(a) + '"' : b) : b = "";
        return b
    }
    function lz(a, b) {
        if ("function" === typeof CustomEvent)
            return new CustomEvent(a,{
                detail: b
            });
        var c = document.createEvent("CustomEvent");
        c.initCustomEvent(a, !1, !0, b);
        return c
    }
    ;var mz = function(a, b) {
        az.call(this);
        var c = this;
        this.h = b;
        this.A = this.j = this.g = 0;
        this.l = null;
        this.uri = new R(a);
        this.state = 0;
        var d;
        this.D = null == (d = this.h) ? void 0 : d.initialize();
        to(this, function() {
            so(c.h)
        })
    };
    u(mz, az);
    mz.prototype.F = function() {
        return this.g
    }
    ;
    mz.prototype.B = function() {
        return 3 === this.state
    }
    ;
    mz.prototype.G = function(a) {
        1 === this.state ? (this.g += a,
        this.state = 2) : 0 === this.state && (this.g += a,
        this.state = 1,
        nz(this))
    }
    ;
    var nz = function(a) {
        Ia(function(b) {
            if (1 == b.g)
                return 2 === a.state && (a.state = 1),
                ya(b, oz(a), 4);
            var c = 3 < a.A;
            if (c) {
                null === a.l && (a.l = 400);
                var d = lz("media_source_error", {
                    code: 0 < a.j ? MediaError.MEDIA_ERR_NETWORK : MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
                    message: 'Response code "' + a.l + '" with ' + a.g + " bytes requested and " + a.j + " bytes loaded"
                });
                a.dispatchEvent(d)
            }
            a.j < a.g && 3 !== a.state && !c ? b.g = 1 : (3 !== a.state && (a.state = 0),
            b.g = 0)
        })
    }
      , oz = function(a) {
        var b;
        return Ia(function(c) {
            switch (c.g) {
            case 1:
                b = a.j + "-" + (a.g - 1);
                Pw(a.uri, "range", b);
                if (!a.h) {
                    c.g = 2;
                    break
                }
                return ya(c, a.D, 3);
            case 3:
                return c.return(pz(a));
            case 2:
                return c.j = 4,
                ya(c, qz(a), 6);
            case 6:
                za(c);
                break;
            case 4:
                Aa(c),
                a.A++,
                c.g = 0
            }
        })
    }
      , pz = function(a) {
        var b;
        return Ia(function(c) {
            switch (c.g) {
            case 1:
                return a.h ? ya(c, a.h.Pb(a.uri), 2) : c.return(Promise.reject());
            case 2:
                if (b = c.h)
                    return b.va && (a.state = 3),
                    rz(a, b.video),
                    c.return();
                c.j = 3;
                return ya(c, qz(a), 5);
            case 5:
                za(c);
                break;
            case 3:
                Aa(c),
                a.A++,
                c.g = 0
            }
        })
    }
      , qz = function(a) {
        var b, c, d, e, f, g, h;
        return Ia(function(k) {
            if (1 == k.g)
                return b = 0,
                c = a.g - a.j,
                ya(k, fetch(a.uri.toString()), 2);
            d = k.h;
            if (400 <= d.status)
                return I(G.g(), "lvlfes", d.status.toString()),
                a.l = d.status,
                k.return(Promise.reject());
            f = null == (e = d.body) ? void 0 : e.getReader();
            if (!f)
                return J("lvlmr"),
                a.l = d.status,
                k.return(Promise.reject());
            g = [];
            h = function() {
                var m, n, q, t, v, x;
                return Ia(function(H) {
                    if (1 == H.g)
                        return ya(H, f.read(), 2);
                    m = H.h;
                    n = m.done;
                    q = m.value;
                    if (n)
                        return t = b < c,
                        sz(a, g, t),
                        H.return();
                    g.push(q);
                    b += null == (v = q) ? void 0 : v.length;
                    rz(a, null == (x = q) ? void 0 : x.buffer);
                    return ya(H, h(), 0)
                })
            }
            ;
            return ya(k, h(), 0)
        })
    }
      , sz = function(a, b, c) {
        c && (a.state = 3,
        rz(a, new ArrayBuffer(0)));
        var d = new Uint8Array(b.reduce(function(g, h) {
            return g + h.length
        }, 0))
          , e = 0;
        b = r(b);
        for (var f = b.next(); !f.done; f = b.next())
            f = f.value,
            d.set(f, e),
            e += f.length;
        a.h && 0 < d.buffer.byteLength && a.h.bc(d.buffer, a.uri, 0, c)
    }
      , rz = function(a, b) {
        null !== b && (b = b.slice(0),
        a.j += b.byteLength,
        a.dispatchEvent({
            type: "progress",
            Yc: b
        }))
    };
    mz.prototype.L = function() {
        var a;
        (null == (a = this.h) ? 0 : a.Qa()) && this.h.close();
        az.prototype.L.call(this)
    }
    ;
    var uz = function(a) {
        this.uri = a;
        this.g = tz(a)
    }
      , tz = function(a) {
        return new Map(a.j.split("/").reduce(function(b, c, d, e) {
            d % 2 && b.set(e[d - 1], c);
            return b
        }, new Map))
    };
    uz.prototype.getId = function() {
        return vz(this, "id")
    }
    ;
    var wz = function(a) {
        a = a.uri.g.get("range");
        if (!a)
            return null;
        a = a.split("-")[0];
        return !a || isNaN(Number(a)) ? null : Number(a)
    }
      , vz = function(a, b) {
        var c = a.uri.g.get(b);
        return c ? c : (a = a.g.get(b)) ? a : null
    };
    var xz = function() {};
    var yz = ["doubleclick.net"];
    function zz() {
        if (Kb() || z("iPad") || z("iPod"))
            return !1;
        if (Jb()) {
            if (void 0 === Xw) {
                a: {
                    if (void 0 === Vw) {
                        if (Zw) {
                            var a = qb(Yw(), "Safari");
                            var b = (new R(window.location.href)).g.Bb("js");
                            b: {
                                if ((b = b.length ? b[0] : "") && 0 == b.lastIndexOf("afma-", 0)) {
                                    var c = b.lastIndexOf("v");
                                    if (-1 < c && (b = b.substr(c + 1).match(/^(\d+\.\d+\.\d+|^\d+\.\d+|^\d+)(-.*)?$/))) {
                                        b = b[1];
                                        break b
                                    }
                                }
                                b = "0.0.0"
                            }
                            if (!a || "0.0.0" !== b) {
                                a = Vw = !0;
                                break a
                            }
                        }
                        Vw = !1
                    }
                    a = Vw
                }
                a || (void 0 === Ww && (Ww = qb(Yw(), "afma-sdk-a") ? !0 : !1),
                a = Ww);
                Xw = a
            }
            return Xw ? !0 : Fh() ? !1 : Az()
        }
        a = Lb() || (Ib() ? "Linux" === xb.platform : z("Linux")) || (Ib() ? "Windows" === xb.platform : z("Windows")) || (Ib() ? "Chrome OS" === xb.platform : z("CrOS"));
        return (L(dl) || L(bl) || L(cl)) && a && Hb() ? Az() : !1
    }
    function Az() {
        var a = !1
          , b = (new R(window.location.href)).h;
        yz.forEach(function(c) {
            b.includes(c) && (a = !0)
        });
        return a
    }
    ;var Bz, Ez = function(a, b, c) {
        if ("number" === typeof a)
            var d = {
                name: Cz(a)
            };
        else
            d = a,
            a = Dz(a.name);
        this.code = a;
        this.g = d;
        b = "Error " + b + ": " + this.getName();
        c && (b += ", " + c);
        eb.call(this, b)
    };
    cb(Ez, eb);
    Ez.prototype.getName = function() {
        return this.g.name || ""
    }
    ;
    var Fz = {
        kf: 1,
        Dh: 2,
        NOT_FOUND_ERR: 3,
        Oe: 4,
        Re: 5,
        Eh: 6,
        jf: 7,
        ABORT_ERR: 8,
        ff: 9,
        Yh: 10,
        TIMEOUT_ERR: 11,
        df: 12,
        INVALID_ACCESS_ERR: 13,
        INVALID_STATE_ERR: 14
    }
      , Gz = (w.g || w.h || Fz).kf
      , Hz = (w.g || w.h || Fz).NOT_FOUND_ERR
      , Iz = (w.g || w.h || Fz).Oe
      , Jz = (w.g || w.h || Fz).Re
      , Kz = (w.g || w.h || Fz).jf
      , Lz = (w.g || w.h || Fz).ABORT_ERR
      , Mz = (w.g || w.h || Fz).ff
      , Nz = (w.g || w.h || Fz).TIMEOUT_ERR
      , Oz = (w.g || w.h || Fz).df
      , Pz = (w.DOMException || Fz).INVALID_ACCESS_ERR
      , Qz = (w.DOMException || Fz).INVALID_STATE_ERR
      , Dz = function(a) {
        switch (a) {
        case "UnknownError":
            return Gz;
        case "NotFoundError":
            return Hz;
        case "ConstraintError":
            return Iz;
        case "DataError":
            return Jz;
        case "TransactionInactiveError":
            return Kz;
        case "AbortError":
            return Lz;
        case "ReadOnlyError":
            return Mz;
        case "TimeoutError":
            return Nz;
        case "QuotaExceededError":
            return Oz;
        case "InvalidAccessError":
            return Pz;
        case "InvalidStateError":
            return Qz;
        default:
            return Gz
        }
    }
      , Cz = function(a) {
        switch (a) {
        case Gz:
            return "UnknownError";
        case Hz:
            return "NotFoundError";
        case Iz:
            return "ConstraintError";
        case Jz:
            return "DataError";
        case Kz:
            return "TransactionInactiveError";
        case Lz:
            return "AbortError";
        case Mz:
            return "ReadOnlyError";
        case Nz:
            return "TimeoutError";
        case Oz:
            return "QuotaExceededError";
        case Pz:
            return "InvalidAccessError";
        case Qz:
            return "InvalidStateError";
        default:
            return "UnknownError"
        }
    }
      , Rz = function(a, b) {
        return "error"in a ? new Ez(a.error,b) : new Ez({
            name: "UnknownError"
        },b)
    }
      , Sz = function(a, b) {
        return "name"in a ? new Ez(a,b + ": " + a.message) : new Ez({
            name: "UnknownError"
        },b)
    };
    var Tz = function(a) {
        this.g = a
    }
      , Uz = w.IDBKeyRange || w.webkitIDBKeyRange;
    function Vz() {}
    ;/*

 Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: MIT
*/
    var Wz = function(a, b) {
        this.l = [];
        this.G = a;
        this.F = b || null;
        this.o = this.j = !1;
        this.h = void 0;
        this.K = this.I = this.B = !1;
        this.A = 0;
        this.g = null;
        this.H = 0
    };
    cb(Wz, Vz);
    Wz.prototype.cancel = function(a) {
        if (this.j)
            this.h instanceof Wz && this.h.cancel();
        else {
            if (this.g) {
                var b = this.g;
                delete this.g;
                a ? b.cancel(a) : (b.H--,
                0 >= b.H && b.cancel())
            }
            this.G ? this.G.call(this.F, this) : this.K = !0;
            this.j || Xz(this, new Yz(this))
        }
    }
    ;
    Wz.prototype.D = function(a, b) {
        this.B = !1;
        Zz(this, a, b)
    }
    ;
    var Zz = function(a, b, c) {
        a.j = !0;
        a.h = c;
        a.o = !b;
        $z(a)
    }
      , bA = function(a) {
        if (a.j) {
            if (!a.K)
                throw new aA(a);
            a.K = !1
        }
    };
    Wz.prototype.callback = function(a) {
        bA(this);
        Zz(this, !0, a)
    }
    ;
    var Xz = function(a, b) {
        bA(a);
        Zz(a, !1, b)
    }
      , dA = function(a, b) {
        return cA(a, b, null)
    }
      , cA = function(a, b, c, d) {
        a.l.push([b, c, d]);
        a.j && $z(a);
        return a
    };
    Wz.prototype.then = function(a, b, c) {
        var d, e, f = new zt(function(g, h) {
            e = g;
            d = h
        }
        );
        cA(this, e, function(g) {
            g instanceof Yz ? f.cancel() : d(g);
            return eA
        }, this);
        return f.then(a, b, c)
    }
    ;
    Wz.prototype.$goog_Thenable = !0;
    var fA = function(a) {
        return Sb(a.l, function(b) {
            return "function" === typeof b[1]
        })
    }
      , eA = {}
      , $z = function(a) {
        if (a.A && a.j && fA(a)) {
            var b = a.A
              , c = gA[b];
            c && (w.clearTimeout(c.g),
            delete gA[b]);
            a.A = 0
        }
        a.g && (a.g.H--,
        delete a.g);
        b = a.h;
        for (var d = c = !1; a.l.length && !a.B; ) {
            var e = a.l.shift()
              , f = e[0]
              , g = e[1];
            e = e[2];
            if (f = a.o ? g : f)
                try {
                    var h = f.call(e || a.F, b);
                    h === eA && (h = void 0);
                    void 0 !== h && (a.o = a.o && (h == b || h instanceof Error),
                    a.h = b = h);
                    if (xt(b) || "function" === typeof w.Promise && b instanceof w.Promise)
                        d = !0,
                        a.B = !0
                } catch (k) {
                    b = k,
                    a.o = !0,
                    fA(a) || (c = !0)
                }
        }
        a.h = b;
        d && (h = ab(a.D, a, !0),
        d = ab(a.D, a, !1),
        b instanceof Wz ? (cA(b, h, d),
        b.I = !0) : b.then(h, d));
        c && (b = new hA(b),
        gA[b.g] = b,
        a.A = b.g)
    }
      , aA = function() {
        eb.call(this)
    };
    cb(aA, eb);
    aA.prototype.message = "Deferred has already fired";
    aA.prototype.name = "AlreadyCalledError";
    var Yz = function() {
        eb.call(this)
    };
    cb(Yz, eb);
    Yz.prototype.message = "Deferred was canceled";
    Yz.prototype.name = "CanceledError";
    var hA = function(a) {
        this.g = w.setTimeout(ab(this.j, this), 0);
        this.h = a
    };
    hA.prototype.j = function() {
        delete gA[this.g];
        throw this.h;
    }
    ;
    var gA = {};
    var iA = function() {
        Q.call(this)
    };
    cb(iA, Q);
    iA.prototype.g = null;
    iA.prototype.next = function(a) {
        if (a)
            this.g["continue"](a);
        else
            this.g["continue"]()
    }
    ;
    iA.prototype.remove = function() {
        var a = new Wz;
        try {
            var b = this.g["delete"]()
        } catch (c) {
            return Xz(a, Sz(c, "deleting via cursor")),
            a
        }
        b.onsuccess = function() {
            a.callback()
        }
        ;
        b.onerror = function(c) {
            Xz(a, Rz(c.target, "deleting via cursor"))
        }
        ;
        return a
    }
    ;
    iA.prototype.getValue = function() {
        return this.g.value
    }
    ;
    var jA = function(a, b) {
        var c = new iA;
        try {
            var d = a.openCursor(b ? b.g : null)
        } catch (e) {
            throw c.W(),
            Sz(e, a.name);
        }
        d.onsuccess = function(e) {
            c.g = e.target.result || null;
            c.g ? c.dispatchEvent("n") : c.dispatchEvent("c")
        }
        ;
        d.onerror = function() {
            c.dispatchEvent("e")
        }
        ;
        return c
    };
    var kA = function(a) {
        this.g = a
    };
    kA.prototype.getName = function() {
        return this.g.name
    }
    ;
    var lA = function(a, b, c) {
        var d = new Wz;
        try {
            var e = a.g.get(c)
        } catch (f) {
            return b += " with key " + Mh(c),
            Xz(d, Sz(f, b)),
            d
        }
        e.onsuccess = function(f) {
            d.callback(f.target.result)
        }
        ;
        e.onerror = function(f) {
            b += " with key " + Mh(c);
            Xz(d, Rz(f.target, b))
        }
        ;
        return d
    };
    kA.prototype.get = function(a) {
        return lA(this, "getting from index " + this.getName(), a)
    }
    ;
    var mA = function(a, b) {
        return jA(a.g, b)
    };
    var nA = function(a) {
        this.g = a
    };
    nA.prototype.getName = function() {
        return this.g.name
    }
    ;
    var oA = function(a, b, c, d, e) {
        var f = new Wz;
        try {
            var g = e ? a.g[b](d, e) : a.g[b](d)
        } catch (h) {
            return c += Mh(d),
            e && (c += ", with key " + Mh(e)),
            Xz(f, Sz(h, c)),
            f
        }
        g.onsuccess = function(h) {
            f.callback(h.target.result)
        }
        ;
        g.onerror = function(h) {
            c += Mh(d);
            e && (c += ", with key " + Mh(e));
            Xz(f, Rz(h.target, c))
        }
        ;
        return f
    }
      , pA = function(a, b) {
        return oA(a, "put", "putting into " + a.getName() + " with value", b)
    };
    nA.prototype.add = function(a, b) {
        return oA(this, "add", "adding into " + this.getName() + " with value ", a, b)
    }
    ;
    nA.prototype.remove = function(a) {
        var b = new Wz;
        try {
            var c = this.g["delete"](a instanceof Tz ? a.g : a)
        } catch (e) {
            return c = "removing from " + this.getName() + " with key " + Mh(a),
            Xz(b, Sz(e, c)),
            b
        }
        c.onsuccess = function() {
            b.callback()
        }
        ;
        var d = this;
        c.onerror = function(e) {
            var f = "removing from " + d.getName() + " with key " + Mh(a);
            Xz(b, Rz(e.target, f))
        }
        ;
        return b
    }
    ;
    nA.prototype.get = function(a) {
        var b = new Wz;
        try {
            var c = this.g.get(a)
        } catch (e) {
            return c = "getting from " + this.getName() + " with key " + Mh(a),
            Xz(b, Sz(e, c)),
            b
        }
        c.onsuccess = function(e) {
            b.callback(e.target.result)
        }
        ;
        var d = this;
        c.onerror = function(e) {
            var f = "getting from " + d.getName() + " with key " + Mh(a);
            Xz(b, Rz(e.target, f))
        }
        ;
        return b
    }
    ;
    nA.prototype.clear = function() {
        var a = "clearing store " + this.getName()
          , b = new Wz;
        try {
            var c = this.g.clear()
        } catch (d) {
            return Xz(b, Sz(d, a)),
            b
        }
        c.onsuccess = function() {
            b.callback()
        }
        ;
        c.onerror = function(d) {
            Xz(b, Rz(d.target, a))
        }
        ;
        return b
    }
    ;
    var qA = function(a) {
        try {
            return new kA(a.g.index("timestamp"))
        } catch (b) {
            throw Sz(b, "getting index timestamp");
        }
    };
    var rA = function(a, b) {
        Q.call(this);
        this.g = a;
        this.j = b;
        this.h = new Jx(this);
        this.h.N(this.g, "complete", ab(this.dispatchEvent, this, "complete"));
        this.h.N(this.g, "abort", ab(this.dispatchEvent, this, "abort"));
        this.h.N(this.g, "error", this.Te)
    };
    cb(rA, Q);
    l = rA.prototype;
    l.Te = function(a) {
        a.target instanceof Ez ? this.dispatchEvent({
            type: "error",
            target: a.target
        }) : this.dispatchEvent({
            type: "error",
            target: Rz(a.target, "in transaction")
        })
    }
    ;
    l.objectStore = function(a) {
        try {
            return new nA(this.g.objectStore(a))
        } catch (b) {
            throw Sz(b, "getting object store " + a);
        }
    }
    ;
    l.commit = function(a) {
        if (this.g.commit || !a)
            try {
                this.g.commit()
            } catch (b) {
                throw Sz(b, "cannot commit the transaction");
            }
    }
    ;
    l.wait = function() {
        var a = new Wz;
        Ys(this, "complete", ab(a.callback, a));
        var b = Ys(this, "abort", function() {
            gt(c);
            Xz(a, new Ez(Lz,"waiting for transaction to complete"))
        });
        var c = Ys(this, "error", function(e) {
            gt(b);
            Xz(a, e.target)
        });
        var d = this.j;
        return dA(a, function() {
            return d
        })
    }
    ;
    l.abort = function() {
        this.g.abort()
    }
    ;
    l.L = function() {
        rA.Da.L.call(this);
        this.h.W()
    }
    ;
    var sA = function(a) {
        Q.call(this);
        this.g = a;
        this.h = new Jx(this);
        this.h.N(this.g, "abort", ab(this.dispatchEvent, this, "abort"));
        this.h.N(this.g, "error", this.Ue);
        this.h.N(this.g, "versionchange", this.yf);
        this.h.N(this.g, "close", ab(this.dispatchEvent, this, "close"))
    };
    cb(sA, Q);
    l = sA.prototype;
    l.pd = !0;
    l.Ue = function(a) {
        a = (a = a.target) && a.error;
        this.dispatchEvent({
            type: "error",
            errorCode: a && a.severity
        })
    }
    ;
    l.yf = function(a) {
        this.dispatchEvent(new tA(a.oldVersion,a.newVersion))
    }
    ;
    l.close = function() {
        this.pd && (this.g.close(),
        this.pd = !1)
    }
    ;
    l.Qa = function() {
        return this.pd
    }
    ;
    l.getName = function() {
        return this.g.name
    }
    ;
    l.getVersion = function() {
        return Number(this.g.version)
    }
    ;
    var uA = function(a) {
        var b = ["MediaSourceVideoChunk"];
        try {
            var c = a.g.transaction(b, "readwrite");
            return new rA(c,a)
        } catch (d) {
            throw Sz(d, "creating transaction");
        }
    };
    sA.prototype.L = function() {
        sA.Da.L.call(this);
        this.h.W()
    }
    ;
    var tA = function(a, b) {
        Js.call(this, "versionchange");
        this.oldVersion = a;
        this.newVersion = b
    };
    cb(tA, Js);
    var vA = function(a) {
        var b = new Wz;
        void 0 == Bz && (Bz = w.indexedDB || w.mozIndexedDB || w.webkitIndexedDB || w.moz_indexedDB);
        var c = Bz.open("IndexedDbVideoChunkPersistentStorage", 6);
        c.onsuccess = function(d) {
            d = new sA(d.target.result);
            b.callback(d)
        }
        ;
        c.onerror = function(d) {
            Xz(b, Rz(d.target, "opening database IndexedDbVideoChunkPersistentStorage"))
        }
        ;
        c.onupgradeneeded = function(d) {
            if (a) {
                var e = new sA(d.target.result);
                a(new tA(d.oldVersion,d.newVersion), e, new rA(d.target.transaction,e))
            }
        }
        ;
        c.onblocked = function() {}
        ;
        return b
    };
    var wA = function() {
        Q.apply(this, arguments);
        this.g = null
    };
    u(wA, Q);
    wA.prototype.initialize = function() {
        var a = this;
        return Promise.resolve(vA(this.h)).then(function(b) {
            a.g = b
        }, function(b) {
            I(G.g(), "codf", b.message)
        })
    }
    ;
    wA.prototype.Qa = function() {
        return null !== this.g && this.g.Qa()
    }
    ;
    wA.prototype.close = function() {
        var a = this;
        return (new Promise(function(b) {
            xA(a, b)
        }
        )).then(function() {
            return yA()
        }).then(function() {
            a.g.close()
        })
    }
    ;
    var yA = function() {
        var a;
        return (null == (a = navigator.storage) ? 0 : a.estimate) ? navigator.storage.estimate().then(function(b) {
            I(G.g(), "csue", String(b.usage))
        }) : Promise.resolve(void 0)
    };
    wA.prototype.Pb = function(a) {
        return (a = zA(a, 0)) ? AA(this, BA(a), a.zc) : Promise.resolve(null)
    }
    ;
    wA.prototype.bc = function(a, b, c, d) {
        (b = zA(b, c)) ? (c = b.Hd,
        CA(this, {
            pi: BA(b),
            Hd: c,
            qc: c + a.byteLength - 1,
            zc: b.zc,
            timestamp: new Date(Date.now()),
            va: d,
            sb: b.sb,
            video: a
        })) : Promise.resolve(void 0)
    }
    ;
    wA.prototype.h = function(a, b) {
        if (b.g.objectStoreNames.contains("MediaSourceVideoChunk"))
            try {
                b.g.deleteObjectStore("MediaSourceVideoChunk")
            } catch (d) {
                throw Sz(d, "deleting object store MediaSourceVideoChunk");
            }
        a = {
            keyPath: "cacheId"
        };
        try {
            var c = new nA(b.g.createObjectStore("MediaSourceVideoChunk", a))
        } catch (d) {
            throw Sz(d, "creating object store MediaSourceVideoChunk");
        }
        b = {
            unique: !1
        };
        try {
            c.g.createIndex("timestamp", "timestamp", b)
        } catch (d) {
            throw Sz(d, "creating new index timestamp with key path timestamp");
        }
    }
    ;
    var xA = function(a, b) {
        var c = new Date(Date.now());
        c.setDate(c.getDate() - 30);
        c = new Tz(Uz.upperBound(c, void 0));
        var d = mA(qA(uA(a.g).objectStore("MediaSourceVideoChunk")), c)
          , e = d.N("n", function() {
            d.remove();
            d.next()
        });
        Ys(d, "c", function() {
            gt(e);
            b()
        })
    }
      , zA = function(a, b) {
        var c = new uz(a);
        a = c.getId();
        var d = vz(c, "itag")
          , e = vz(c, "source")
          , f = vz(c, "lmt");
        c = wz(c);
        var g = [];
        a ? d ? e ? f ? null === c && g.push("startIndex") : g.push("lmt") : g.push("source") : g.push("itag") : g.push("videoId");
        return 0 < g.length ? (I(G.g(), "civp", g.join("-")),
        null) : {
            yg: a,
            sb: d,
            source: e,
            zc: f,
            Hd: c + b
        }
    }
      , BA = function(a) {
        for (var b = [a.yg, a.source, a.Hd].join(), c = 0, d = 0; d < b.length; d++)
            c = Math.imul(31, c) + b.charCodeAt(d) | 0;
        return c.toString() + "," + a.sb
    }
      , AA = function(a, b, c) {
        var d = uA(a.g).objectStore("MediaSourceVideoChunk");
        return Promise.resolve(d.get(b)).then(function(e) {
            if (!e)
                return I(G.g(), "cenf", "1"),
                null;
            if (e.zc !== c)
                return I(G.g(), "cdl", "1"),
                d.remove(b).then(null, function(f) {
                    I(G.g(), "crdlvf", f.message)
                }),
                null;
            I(G.g(), "cefml", "1");
            return {
                sb: e.sb,
                qc: e.qc,
                va: e.va,
                video: e.video
            }
        }, function(e) {
            I(G.g(), "cgvf", e.message);
            return null
        })
    }
      , CA = function(a, b) {
        a = uA(a.g).objectStore("MediaSourceVideoChunk");
        Promise.resolve(pA(a, b)).then(function() {
            I(G.g(), "cavs", "1")
        }, function(c) {
            I(G.g(), "cavf", c.message)
        })
    };
    var DA = function(a) {
        az.call(this);
        var b = this;
        this.D = this.h = this.g = 0;
        this.l = this.I = null;
        this.uri = new R(a);
        this.state = 0;
        this.j = (this.A = zz()) ? dw(wA) : null;
        to(this, function() {
            so(b.j)
        });
        this.I = this.A ? this.j.initialize() : null
    };
    u(DA, az);
    DA.prototype.F = function() {
        return this.g
    }
    ;
    DA.prototype.B = function() {
        return 3 === this.state
    }
    ;
    DA.prototype.G = function(a) {
        1 === this.state ? (this.g += a,
        this.state = 2) : 0 === this.state && (this.g += a,
        this.state = 1,
        EA(this))
    }
    ;
    var EA = function(a) {
        Ia(function(b) {
            if (1 == b.g)
                return 2 === a.state && (a.state = 1),
                ya(b, FA(a), 4);
            var c = 3 < a.D;
            if (c && null !== a.l) {
                var d = lz("media_source_error", {
                    code: 0 < a.h ? MediaError.MEDIA_ERR_NETWORK : MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
                    message: 'Response code "' + a.l + '" with ' + a.g + " bytes requested and " + a.h + " bytes loaded"
                });
                a.dispatchEvent(d)
            }
            a.h < a.g && 3 !== a.state && !c ? b.g = 1 : (3 !== a.state && (a.state = 0),
            b.g = 0)
        })
    }
      , FA = function(a) {
        var b;
        return Ia(function(c) {
            switch (c.g) {
            case 1:
                b = a.h + "-" + (a.g - 1);
                Pw(a.uri, "range", b);
                if (!a.A) {
                    c.g = 2;
                    break
                }
                return ya(c, a.I, 3);
            case 3:
                return c.return(GA(a));
            case 2:
                return c.j = 4,
                ya(c, HA(a), 6);
            case 6:
                za(c);
                break;
            case 4:
                Aa(c),
                a.D++,
                c.g = 0
            }
        })
    }
      , GA = function(a) {
        var b;
        return Ia(function(c) {
            switch (c.g) {
            case 1:
                return ya(c, a.j.Pb(a.uri), 2);
            case 2:
                if (b = c.h) {
                    b.va && (a.state = 3);
                    IA(a, b.video, 0);
                    c.g = 0;
                    break
                }
                c.j = 4;
                return ya(c, HA(a), 6);
            case 6:
                za(c);
                break;
            case 4:
                Aa(c),
                a.D++,
                c.g = 0
            }
        })
    }
      , HA = function(a) {
        return new Promise(function(b, c) {
            var d = new XMLHttpRequest
              , e = 0
              , f = a.g - a.h;
            d.addEventListener("load", function() {
                J("lvlcl");
                if (400 <= d.status)
                    return I(G.g(), "lvlxes", d.status.toString()),
                    a.l = d.status,
                    c();
                var g = d.response;
                g.byteLength < f && (a.state = 3);
                var h = IA(a, g, e);
                e += h;
                a.A && 0 < g.byteLength && a.j.bc(g, a.uri, 0, g.byteLength < f);
                b()
            });
            d.addEventListener("timeout", function() {
                J("lvlct");
                a.l = d.status;
                c()
            });
            d.addEventListener("error", function() {
                J("lvlce");
                a.l = d.status;
                c()
            });
            d.addEventListener("progress", function() {
                if (400 <= d.status)
                    a.l = d.status;
                else {
                    var g = IA(a, d.response, e);
                    e += g
                }
            });
            d.responseType = "arraybuffer";
            d.open("get", a.uri.toString());
            d.send(null)
        }
        )
    }
      , IA = function(a, b, c) {
        if (null === b)
            return 0;
        b = b.slice(c);
        a.h += b.byteLength;
        a.dispatchEvent({
            type: "progress",
            Yc: b
        });
        return b.byteLength
    };
    DA.prototype.L = function() {
        this.A && this.j.Qa() && this.j.close();
        az.prototype.L.call(this)
    }
    ;
    var JA = {
        Ai: 2E5,
        yi: 7E4,
        Ga: 3E5,
        xi: 5E3,
        Fi: 5E3,
        zi: 6E3
    };
    function KA() {
        return !!window.MediaSource
    }
    function LA(a) {
        return [43, 44, 45].includes(a) && Jc ? !1 : dz[a] ? (a = kz(a),
        !!a && KA() && MediaSource.isTypeSupported(a)) : !1
    }
    ;var MA = function() {};
    MA.prototype.Wf = function(a, b, c) {
        return 0 === c ? 1E6 : 5E3 > b - a ? 3E5 : 0
    }
    ;
    var OA = function(a, b) {
        var c = this;
        this.g = a;
        this.index = b;
        this.h = [];
        this.g || J("msms_sbf" + this.index);
        this.g.addEventListener("updateend", function() {
            NA(c)
        });
        this.g.addEventListener("error", function() {
            J("msms_sbe" + c.index)
        })
    }
      , NA = function(a) {
        if (0 < a.h.length && !a.g.updating) {
            var b = a.h.shift();
            a.g.appendBuffer(b)
        }
    };
    var PA = function() {
        this.g = this.cache = null
    };
    l = PA.prototype;
    l.initialize = function() {
        var a = this;
        return window.caches.open("CACHE_VIDEO_CHUNK_PERSISTENT_STORAGE").then(function(b) {
            a.cache = b
        }, function(b) {
            I(G.g(), "codf", b.message)
        })
    }
    ;
    l.Qa = function() {
        return null !== this.cache
    }
    ;
    l.close = function() {
        return Promise.resolve()
    }
    ;
    l.Pb = function(a) {
        var b = this;
        a = QA(this, a);
        return this.Qa() && a ? this.cache.match(a).then(function(c) {
            if (!c)
                return I(G.g(), "cenf", "1"),
                Promise.resolve(null);
            I(G.g(), "cef", "1");
            return c.arrayBuffer().then(function(d) {
                var e = wz(b.g), f;
                (f = b.g.uri.g.get("range")) ? (f = f.split("-")[1],
                f = !f || isNaN(Number(f)) ? null : Number(f)) : f = null;
                e = e + d.byteLength - 1;
                f = f > e;
                return {
                    sb: vz(b.g, "itag"),
                    qc: e,
                    va: f,
                    video: d
                }
            })
        }, function(c) {
            I(G.g(), "cgvf", c.message);
            return Promise.resolve(null)
        }) : (I(G.g(), "cgvf", "1"),
        Promise.resolve(null))
    }
    ;
    l.bc = function(a, b) {
        b = QA(this, b);
        a = new Response(a);
        this.Qa() && b ? this.cache.put(b, a).then(function() {
            I(G.g(), "cavs", "1")
        }, function(c) {
            I(G.g(), "cavf", c.message)
        }) : (I(G.g(), "cavf", "1"),
        Promise.resolve())
    }
    ;
    var QA = function(a, b) {
        a.g = new uz(b);
        b = a.g.getId();
        var c = vz(a.g, "itag")
          , d = vz(a.g, "source")
          , e = vz(a.g, "lmt");
        a = vz(a.g, "range");
        if (b && c && d && a)
            return new Request("http://url/videoplayback?id=" + b + "&itag=" + c + "&source=" + d + "&lmt=" + e + "&range=" + a);
        I(G.g(), "civp", "1");
        return null
    };
    var TA = function(a) {
        Q.call(this);
        var b = this;
        this.j = a;
        this.g = [];
        this.A = null;
        this.B = 0;
        this.M = !1;
        this.F = 0;
        this.D = [];
        if (L(pl)) {
            var c = null;
            zz() && (L(rl) ? c = dw(PA) : c = dw(wA));
            this.l = this.j.map(function(d) {
                return dw(mz, d.url, c)
            })
        } else
            this.l = this.j.map(function(d) {
                return dw(DA, d.url)
            });
        this.h = dw(MediaSource);
        this.G = function() {
            RA(b)
        }
        ;
        this.h.addEventListener("sourceopen", this.G);
        this.I = SA(this)
    };
    u(TA, Q);
    var SA = function(a) {
        for (var b = [], c = 0; c < a.j.length; ++c)
            b.push(new MA);
        return b
    }
      , RA = function(a) {
        J("msms_oso");
        for (var b = {
            xa: 0
        }; b.xa < a.j.length; b = {
            xd: void 0,
            Ac: void 0,
            kb: void 0,
            xa: b.xa,
            Bc: void 0
        },
        ++b.xa) {
            var c = a.j[b.xa];
            I(G.g(), "msms_mime" + b.xa, c.mimeType);
            I(G.g(), "msms_cs" + b.xa, c.Ga.toString());
            L(ql) ? (b.xd = new OA(a.h.addSourceBuffer(c.mimeType),b.xa),
            b.Ac = a.l[b.xa],
            b.Ac.N("progress", function(d) {
                return function(e) {
                    var f = d.xd
                      , g = d.Ac;
                    e = e.Yc;
                    0 !== e.byteLength && (f.h.push(e),
                    NA(f));
                    g.B() && (a.B++,
                    a.B === a.g.length && UA(a))
                }
            }(b)),
            b.Ac.N("media_source_error", function(d) {
                a.dispatchEvent(d)
            }),
            a.g.push(b.xd.g)) : (b.kb = a.h.addSourceBuffer(c.mimeType),
            b.kb ? (b.Bc = a.l[b.xa],
            L(pl) && b.kb.addEventListener("updateend", function(d) {
                return function() {
                    if (0 < a.D.length && !d.kb.updating) {
                        var e = a.D.shift();
                        d.kb.appendBuffer(e)
                    }
                }
            }(b)),
            b.kb.addEventListener("error", function(d) {
                return function() {
                    J("msms_sbe" + d.xa)
                }
            }(b)),
            b.Bc.N("progress", function(d) {
                return function(e) {
                    var f = d.kb
                      , g = d.Bc;
                    e = e.Yc;
                    0 !== e.byteLength && (L(pl) ? f.updating ? a.D.push(e) : f.appendBuffer(e) : f.appendBuffer(e));
                    g.B() && (a.B++,
                    a.B === a.g.length && UA(a))
                }
            }(b)),
            b.Bc.N("media_source_error", function(d) {
                a.dispatchEvent(d)
            }),
            a.g.push(b.kb)) : J("msms_sbf" + b.xa))
        }
        I(G.g(), "msms_ns", a.g.length.toString());
        a.M = !0;
        VA(a)
    }
      , UA = function(a) {
        Promise.all(a.g.map(function(b) {
            return new Promise(function(c) {
                b.updating ? b.addEventListener("updateend", function() {
                    c()
                }) : c()
            }
            )
        })).then(function() {
            a.h.endOfStream()
        })
    }
      , VA = function(a) {
        if (a.M)
            for (var b = 0; b < a.j.length; ++b) {
                var c = a.l[b]
                  , d = a.g[b];
                d = 0 === d.buffered.length ? 0 : 1E3 * d.buffered.end(0);
                d = a.I[b].Wf(a.F, d, c.F());
                0 !== d && c.G(d)
            }
    }
      , WA = function(a) {
        a.A = Qh(a.h).toString();
        return a.A
    };
    TA.prototype.L = function() {
        this.A && window.URL.revokeObjectURL(this.A);
        for (var a = r(this.l), b = a.next(); !b.done; b = a.next())
            b.value.W();
        this.h.removeEventListener("sourceopen", this.G);
        Q.prototype.L.call(this)
    }
    ;
    TA.prototype.Rc = function(a) {
        this.I.filter(function() {
            return !1
        }).map(function(b) {
            return b
        }).forEach(function(b) {
            b.g = Object.assign({}, JA, b.g, a)
        })
    }
    ;
    var XA = RegExp("/pagead/conversion|/pagead/adview|/pagead/gen_204|/activeview?|csi.gstatic.com/csi|google.com/pagead/xsul|google.com/ads/measurement/l|googleads.g.doubleclick.net/pagead/ide_cookie|googleads.g.doubleclick.net/xbbe/pixel")
      , YA = RegExp("outstream.min.js")
      , ZA = RegExp("outstream.min.css")
      , $A = RegExp("fonts.gstatic.com")
      , aB = RegExp("googlevideo.com/videoplayback|c.2mdn.net/videoplayback|gcdn.2mdn.net/videoplayback")
      , bB = RegExp("custom.elements.min.js");
    function cB(a, b) {
        var c = 0
          , d = 0
          , e = 0
          , f = 0
          , g = 0
          , h = 0
          , k = 0
          , m = !1
          , n = !1;
        if ("function" === typeof Na("performance.getEntriesByType", w) && "transferSize"in w.PerformanceResourceTiming.prototype) {
            var q = w.performance.getEntriesByType("resource");
            q = r(q);
            for (var t = q.next(); !t.done; t = q.next())
                t = t.value,
                XA.test(t.name) || (f += 1,
                t.transferSize ? (c += t.transferSize,
                t.encodedBodySize && t.transferSize < t.encodedBodySize && (h += 1,
                e += t.encodedBodySize,
                YA.test(t.name) && (m = !0),
                ZA.test(t.name) && (n = !0)),
                aB.test(t.name) && (d += t.transferSize)) : 0 === t.transferSize && 0 === t.encodedBodySize ? bB.test(t.name) ? c += 6686 : $A.test(t.name) || (k += 1,
                Gj(G.g(), {
                    event_name: "unmeasurable_asset",
                    resource_name: t.name,
                    encoded_body_size: t.encodedBodySize,
                    transfer_size: t.transferSize
                })) : (g += 1,
                e += t.encodedBodySize,
                YA.test(t.name) && (m = !0),
                ZA.test(t.name) && (n = !0)));
            q = 0;
            if (a.duration) {
                for (t = 0; t < a.buffered.length; t++)
                    q += a.buffered.end(t) - a.buffered.start(t);
                q = Math.min(q, a.duration)
            }
            Gj(G.g(), {
                event_name: b,
                asset_bytes: c,
                video_bytes: d,
                cached_data_bytes: e,
                js_cached: m,
                css_cached: n,
                num_assets: f,
                num_assets_cached: g,
                num_assets_cache_validated: h,
                num_assets_unmeasurable: k,
                video_played_seconds: a.currentTime.toFixed(2),
                video_muted: a.muted,
                video_seconds_loaded: q.toFixed(2)
            })
        } else
            I(G.g(), "error", "reporting_timing_not_supported")
    }
    ;var dB = function(a, b, c, d) {
        this.url = a;
        this.mimeType = b;
        this.Ga = c;
        this.g = void 0 === d ? null : d
    };
    function eB(a) {
        var b = G.g()
          , c = a.getVideoPlaybackQuality && a.getVideoPlaybackQuality();
        c ? (a = a.currentTime,
        I(b, "vqdf", String(c.droppedVideoFrames)),
        I(b, "vqtf", String(c.totalVideoFrames)),
        I(b, "vqfr", String(Math.round(c.totalVideoFrames / a)))) : I(b, "vqu", "1")
    }
    ;var fB = function(a) {
        this.g = a
    };
    fB.prototype.toString = function() {
        return this.g
    }
    ;
    var gB = new fB("video_mute")
      , hB = new fB("video_caption_visibility");
    var iB = function(a) {
        P.call(this);
        this.A = 1;
        this.j = [];
        this.o = 0;
        this.g = [];
        this.h = {};
        this.D = !!a
    };
    cb(iB, P);
    var jB = function(a, b, c) {
        var d = hB.toString()
          , e = a.h[d];
        e || (e = a.h[d] = []);
        var f = a.A;
        a.g[f] = d;
        a.g[f + 1] = b;
        a.g[f + 2] = c;
        a.A = f + 3;
        e.push(f)
    }
      , kB = function(a, b, c) {
        var d = a.h[hB.toString()];
        if (d) {
            var e = a.g;
            (d = d.find(function(f) {
                return e[f + 1] == b && e[f + 2] == c
            })) && a.l(d)
        }
    };
    iB.prototype.l = function(a) {
        var b = this.g[a];
        if (b) {
            var c = this.h[b];
            0 != this.o ? (this.j.push(a),
            this.g[a + 1] = function() {}
            ) : (c && Xb(c, a),
            delete this.g[a],
            delete this.g[a + 1],
            delete this.g[a + 2])
        }
        return !!b
    }
    ;
    iB.prototype.B = function(a, b) {
        var c = this.h[a];
        if (c) {
            for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++)
                d[e - 1] = arguments[e];
            if (this.D)
                for (e = 0; e < c.length; e++) {
                    var g = c[e];
                    lB(this.g[g + 1], this.g[g + 2], d)
                }
            else {
                this.o++;
                try {
                    for (e = 0,
                    f = c.length; e < f && !this.Aa(); e++)
                        g = c[e],
                        this.g[g + 1].apply(this.g[g + 2], d)
                } finally {
                    if (this.o--,
                    0 < this.j.length && 0 == this.o)
                        for (; c = this.j.pop(); )
                            this.l(c)
                }
            }
        }
    }
    ;
    var lB = function(a, b, c) {
        vt(function() {
            a.apply(b, c)
        })
    };
    iB.prototype.clear = function(a) {
        if (a) {
            var b = this.h[a];
            b && (b.forEach(this.l, this),
            delete this.h[a])
        } else
            this.g.length = 0,
            this.h = {}
    }
    ;
    iB.prototype.L = function() {
        iB.Da.L.call(this);
        this.clear();
        this.j.length = 0
    }
    ;
    var mB = function(a) {
        P.call(this);
        this.g = new iB(a);
        uo(this, this.g)
    };
    cb(mB, P);
    mB.prototype.clear = function(a) {
        this.g.clear(void 0 !== a ? a.toString() : void 0)
    }
    ;
    var nB = function(a) {
        a = void 0 === a ? null : a;
        P.call(this);
        this.g = new Jx(this);
        uo(this, this.g);
        this.ub = a
    };
    u(nB, P);
    var oB = function(a, b, c) {
        a.ub && (jB(a.ub.g, b, c),
        to(a, function() {
            kB(a.ub.g, b, c)
        }))
    };
    var pB = function(a, b) {
        nB.call(this, b);
        oB(this, function(c) {
            c ? a.g.mode = "showing" : a.bb()
        }, this)
    };
    u(pB, nB);
    var qB = function() {
        Q.call(this);
        this.h = new Jx(this);
        uo(this, this.h)
    };
    u(qB, Q);
    var sB = function(a, b, c) {
        c = void 0 === c ? !0 : c;
        qB.call(this);
        a.setAttribute("crossorigin", "anonymous");
        var d = zh("TRACK");
        d.setAttribute("kind", "captions");
        d.setAttribute("src", b);
        d.setAttribute("default", "");
        a.appendChild(d);
        this.g = a.textTracks[0];
        rB(this);
        c ? this.g.mode = "showing" : this.bb()
    };
    u(sB, qB);
    var rB = function(a) {
        var b = a.g;
        b.addEventListener("cuechange", function() {
            for (var c = b.cues, d = 0; d < c.length; d++) {
                var e = c[d];
                e.align = "center";
                e.position = "auto"
            }
        }, {
            once: !0
        })
    };
    sB.prototype.bb = function() {
        this.g.mode = "hidden"
    }
    ;
    function tB(a, b) {
        if ("undefined" !== typeof ReportingObserver) {
            var c = function(e) {
                e = r(e);
                for (var f = e.next(); !f.done; f = e.next())
                    f = f.value,
                    a(f) && b(f)
            }
              , d = new ReportingObserver(c,{
                buffered: !0
            });
            w.addEventListener("pagehide", function() {
                c(d.takeRecords(), d);
                d.disconnect()
            });
            d.observe()
        }
    }
    function uB(a) {
        a = void 0 === a ? null : a;
        tB(function(b) {
            return b.body && "HeavyAdIntervention" === b.body.id
        }, function(b) {
            var c = b.body.message
              , d = G.g();
            I(d, "ham", c);
            c.includes("CPU") ? I(d, "hacpu", "true") : c.includes("network") && I(d, "habytes", "true");
            a && a(b)
        })
    }
    ;var vB = "autoplay controls crossorigin demuxedaudiosrc demuxedvideosrc loop muted playsinline poster preload src webkit-playsinline x-webkit-airplay".split(" ")
      , wB = "autoplay buffered controls crossOrigin currentSrc currentTime defaultMuted defaultPlaybackRate disableRemotePlayback duration ended loop muted networkState onerror onwaitingforkey paused played playsinline poster preload preservesPitch mozPreservesPitch webkitPreservesPitch readyState seekable videoWidth videoHeight volume textTracks canPlayType captureStream getVideoPlaybackQuality load pause play setSinkId oncanplay oncanplaythrough onload onplay onpause onended onfullscreenchange onfullscreenerror addEventListener dispatchEvent removeEventListener requestFullscreen".split(" ")
      , xB = {
        childList: !0
    }
      , yB = !RegExp("^\\s*class\\s*\\{\\s*\\}\\s*$").test(function() {}
    .toString())
      , zB = HTMLElement;
    yB && (zB = function() {
        var a = Object.getPrototypeOf(this).constructor;
        return w.Reflect.construct(HTMLElement, [], a)
    }
    ,
    Object.setPrototypeOf(zB, HTMLElement),
    Object.setPrototypeOf(zB.prototype, HTMLElement.prototype));
    var AB = function(a) {
        if (null !== a) {
            a = r(a);
            for (var b = a.next(); !b.done; b = a.next())
                if (b = b.value,
                b.nodeName === "TRACK".toString())
                    return b
        }
        return null
    }
      , BB = function(a, b) {
        this.code = a;
        this.message = void 0 === b ? "" : b
    }
      , CB = function(a) {
        BB.call(this, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED, void 0 === a ? "" : a)
    };
    u(CB, BB);
    var GB = function(a, b) {
        b = void 0 === b ? !1 : b;
        var c = zB.call(this) || this;
        I(G.g(), "ulv", "1");
        c.vg = b;
        c.qa = null;
        c.te = null;
        c.Wd = null;
        c.R = zh("VIDEO");
        DB(c);
        c.ub = a || new mB;
        EB(c);
        c.hc = null;
        FB(c);
        c.attachShadow({
            mode: "open"
        });
        c.shadowRoot.appendChild(c.R);
        uB(function() {
            I(G.g(), "has", c.src || c.Ya);
            I(G.g(), "hat", String(c.R.currentTime))
        });
        c.Pc = !1;
        c.ve = !1;
        c.Ub = null;
        c.Uc = null;
        c.wg = !1;
        c.ze = !1;
        c.si = null;
        c.Kb = null;
        return c
    };
    u(GB, zB);
    GB.prototype.attributeChangedCallback = function(a, b, c) {
        switch (a) {
        case "src":
            HB(this, c);
            break;
        case "demuxedaudiosrc":
        case "demuxedvideosrc":
            IB(this);
            break;
        case "muted":
            this.R[a] = "" === c ? !0 : !!c;
            JB(this, a, c);
            break;
        default:
            JB(this, a, c)
        }
    }
    ;
    GB.prototype.Rc = function(a) {
        this.Kb = a;
        var b;
        null == (b = this.qa) || b.Rc(a)
    }
    ;
    var JB = function(a, b, c) {
        c !== a.R.getAttribute(b) && (null === c ? a.R.removeAttribute(b) : a.R.setAttribute(b, c))
    }
      , KB = function(a) {
        a.qa && (a.R.removeEventListener("timeupdate", a.Ub),
        a.qa.W(),
        a.qa = null)
    }
      , LB = function(a, b) {
        a.Wd = b;
        a.R.dispatchEvent(new Event("error"))
    }
      , DB = function(a) {
        MB(a);
        NB(a);
        a.R.addEventListener("loadedmetadata", function() {
            a.Uc = yx(a);
            a.Uc.then(function(b) {
                var c = a.R.videoWidth
                  , d = a.R.videoHeight
                  , e = b.width
                  , f = b.height;
                0 < c && 0 < d && 0 < e && 0 < f && (b = b.width / b.height,
                c /= d,
                .97 <= Math.min(c, b) / Math.max(c, b) ? pn(a.R, {
                    "object-fit": "cover"
                }) : pn(a.R, {
                    "object-fit": "contain"
                }))
            })
        });
        a.R.addEventListener("play", function() {
            a.ve || (cB(a.R, "first_play"),
            a.ve = !0)
        });
        a.R.addEventListener("pause", function() {
            a.Pc || (cB(a.R, "first_pause"),
            eB(a.R),
            a.Pc = !0)
        });
        Zs(w, "pagehide", function() {
            a.Pc || (cB(a.R, "first_pause"),
            eB(a.R),
            a.Pc = !0)
        });
        a.R.addEventListener("stalled", function() {
            I(G.g(), "ves", "1")
        });
        (new ox(a.R)).N("playbackStalled", function() {
            return I(G.g(), "pbs", "1")
        });
        a.R.addEventListener("media_source_error", function(b) {
            KB(a);
            b = b.detail;
            LB(a, new BB(b.code,b.message))
        });
        OB(a)
    }
      , FB = function(a) {
        var b = AB(a.childNodes);
        b && PB(a, b);
        null === a.hc && QB(a)
    }
      , QB = function(a) {
        if (w.MutationObserver) {
            var b = new MutationObserver(function(c) {
                c = r(c);
                for (var d = c.next(); !d.done; d = c.next())
                    if (d = d.value,
                    "childList" === d.type && (d = AB(d.addedNodes))) {
                        PB(a, d);
                        b.disconnect();
                        break
                    }
            }
            );
            b.observe(a, xB)
        }
    }
      , EB = function(a) {
        a.R.addEventListener("volumechange", function() {
            a.ub.g.B(gB.toString(), a.R.muted);
            a.vg || a.ub.g.B(hB.toString(), a.R.muted)
        })
    }
      , PB = function(a, b) {
        if (null === a.hc && b.hasAttribute("src")) {
            var c = b.getAttribute("src");
            a.hc = new sB(a.R,c,b.hasAttribute("default"));
            new pB(a.hc,a.ub);
            c.includes("kind=asr") && I(G.g(), "act", "1")
        }
    }
      , HB = function(a, b) {
        if (b !== a.te) {
            a.te = b;
            a.wg && b && dx(b) && (b = ex(b));
            var c = b ? jz(b) : null
              , d = !!c && LA(c);
            I(G.g(), "umsem", d ? "1" : "0");
            d ? (b = dw(dB, b, kz(c), 1E3 * bz[c], null),
            a.qa = dw(TA, [b]),
            a.Kb && a.qa.Rc(a.Kb),
            a.qa.N("media_source_error", function(e) {
                e = lz("media_source_error", e.detail);
                a.R.dispatchEvent(e)
            }),
            a.Ub = function() {
                var e = a.qa;
                e.F = 1E3 * a.R.currentTime;
                VA(e)
            }
            ,
            a.R.addEventListener("timeupdate", a.Ub),
            JB(a, "src", WA(a.qa))) : (KB(a),
            JB(a, "src", b));
            a.ze || a.R.load()
        }
    }
      , IB = function(a) {
        a.src && LB(a, new BB(MediaError.MEDIA_ERR_ABORTED,"Setting demuxed src after src is already set."));
        if (!a.ob && !a.Ya && a.qa)
            KB(a),
            JB(a, "src", null),
            a.R.load();
        else if (a.ob && a.Ya) {
            var b = jz(dx(a.Ya) ? ex(a.Ya) : a.Ya)
              , c = jz(dx(a.ob) ? ex(a.ob) : a.ob);
            if (b && LA(b))
                if (c && LA(c)) {
                    var d = !!b && LA(b) && !!c && LA(c);
                    I(G.g(), "umsed", d ? "1" : "0");
                    b = dw(dB, a.Ya, kz(b), -1, null);
                    c = dw(dB, a.ob, kz(c), -1, null);
                    a.qa = dw(TA, [b, c]);
                    a.Kb && a.qa.Rc(a.Kb);
                    a.qa.N("media_source_error", function(e) {
                        e = lz("media_source_error", e.detail);
                        a.R.dispatchEvent(e)
                    });
                    a.Ub = function() {
                        var e = a.qa;
                        e.F = 1E3 * a.R.currentTime;
                        VA(e)
                    }
                    ;
                    a.R.addEventListener("timeupdate", a.Ub);
                    JB(a, "src", WA(a.qa));
                    a.ze || a.R.load()
                } else
                    LB(a, new CB('Audio itag "' + c + '" not supported.'));
            else
                LB(a, new CB('Video itag "' + b + '" not supported.'))
        }
    }
      , MB = function(a) {
        for (var b = r(wB), c = b.next(), d = {}; !c.done; d = {
            Va: void 0,
            getValue: void 0
        },
        c = b.next())
            d.Va = c.value,
            d.Va in a.R && ("function" === typeof a.R[d.Va] ? (d.getValue = a.R[d.Va].bind(a.R),
            Object.defineProperty(a, d.Va, {
                set: function(e) {
                    return function(f) {
                        a.R[e.Va] = f
                    }
                }(d),
                get: function(e) {
                    return function() {
                        return e.getValue
                    }
                }(d)
            })) : Object.defineProperty(a, d.Va, {
                set: function(e) {
                    return function(f) {
                        a.R[e.Va] = f
                    }
                }(d),
                get: function(e) {
                    return function() {
                        return a.R[e.Va]
                    }
                }(d)
            }))
    }
      , NB = function(a) {
        Object.defineProperty(a, "error", {
            set: function() {},
            get: function() {
                return a.R.error ? a.R.error : a.Wd
            }
        })
    }
      , OB = function(a) {
        a.R.style.width = wn();
        a.R.style.height = wn()
    };
    GB.prototype.disconnectedCallback = function() {
        if (this.Uc) {
            var a = ux.get(this.Uc);
            xx(a)
        }
        zB.prototype.disconnectedCallback && zB.prototype.disconnectedCallback.call(this)
    }
    ;
    ea.Object.defineProperties(GB.prototype, {
        ob: {
            configurable: !0,
            enumerable: !0,
            set: function(a) {
                this.setAttribute("demuxedaudiosrc", a)
            },
            get: function() {
                return this.getAttribute("demuxedaudiosrc")
            }
        },
        Ya: {
            configurable: !0,
            enumerable: !0,
            set: function(a) {
                this.setAttribute("demuxedvideosrc", a)
            },
            get: function() {
                return this.getAttribute("demuxedvideosrc")
            }
        },
        src: {
            configurable: !0,
            enumerable: !0,
            set: function(a) {
                this.setAttribute("src", a)
            },
            get: function() {
                return this.getAttribute("src")
            }
        }
    });
    ea.Object.defineProperties(GB, {
        observedAttributes: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return vB
            }
        }
    });
    w.customElements && (w.customElements.get("lima-video") || w.customElements.define("lima-video", GB));
    function RB() {
        var a = dw(wA);
        a.initialize().then(function() {
            var b = lz("initialized");
            a.dispatchEvent(b)
        });
        return a
    }
    var TB = function(a, b, c, d, e) {
        P.call(this);
        this.F = a;
        this.h = c;
        this.o = e;
        this.Z = this.U = this.xb = this.D = this.j = this.Na = 0;
        this.B = [];
        this.I = !1;
        this.aa = this.ba = this.ha = null;
        this.Ea = !1;
        this.zb = this.G = this.l = this.Fa = this.Ma = null;
        this.va = !1;
        this.M = new R(b.url);
        this.Ga = b.Ga;
        this.ma = d;
        (this.O = b.g) || this.M.g.remove("alr");
        I(G.g(), "sl_dv" + this.o, (null !== this.O).toString());
        this.V = !this.O;
        this.g = new XMLHttpRequest;
        this.X = .1;
        if (this.A = zz())
            this.l = RB(),
            uo(this, this.l);
        SB(this)
    };
    u(TB, P);
    var UB = function(a, b) {
        b = lz("media_source_error", b);
        a.F.dispatchEvent(b)
    }
      , VB = function(a, b) {
        UB(a, {
            code: 1 < a.j ? MediaError.MEDIA_ERR_NETWORK : MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
            message: b
        })
    }
      , SB = function(a) {
        a.ha = function() {
            WB(a);
            if (a.V) {
                var b = a.g.responseText;
                a.I = !b || b.length < a.Ga;
                a.U = 0;
                J("sl_cc" + a.o + "_" + a.j);
                a.D++;
                XB(a)
            }
        }
        ;
        a.ba = function() {
            WB(a)
        }
        ;
        a.aa = function() {
            J("sl_ec" + a.o + "_" + a.j);
            VB(a, "Failed to load chunk " + a.j + " for stream " + a.o)
        }
        ;
        a.g.addEventListener("load", a.ha);
        a.g.addEventListener("progress", a.ba);
        a.g.addEventListener("error", a.aa);
        a.h.addEventListener("updateend", function() {
            a.h.buffered.length && (a.xb = a.h.buffered.end(0),
            a.A ? a.va && !a.h.updating && a.j === a.D && (J("sl_lc" + a.o),
            a.ma()) : a.I && !a.h.updating && a.j === a.D && (J("sl_lc" + a.o),
            a.ma()));
            !a.Ea && 1 < a.F.buffered.length && (I(G.g(), "dbr", "1"),
            a.Ea = !0)
        });
        a.h.addEventListener("update", function() {
            a.B.length && !a.h.updating && a.h.appendBuffer(a.B.shift())
        });
        a.h.addEventListener("error", function() {
            J("msb_err" + a.o);
            UB(a, {
                code: MediaError.MEDIA_ERR_DECODE,
                message: "Error on SourceBuffer " + a.o
            })
        });
        a.A ? (a.l.Qa() ? YB(a) : a.Ma = Zs(a.l, "initialized", function() {
            YB(a)
        }),
        a.Fa = Zs(a.l, "get_video_succeeded", function() {
            XB(a)
        })) : YB(a)
    }
      , $B = function(a) {
        J("sl_rc" + a.o + "_" + a.j);
        var b = ZB(a);
        a.g.open("get", b);
        a.g.overrideMimeType("text/plain; charset=x-user-defined");
        a.g.send(null);
        a.A && (a.G = null,
        a.zb = b)
    }
      , WB = function(a) {
        if (400 <= a.g.status)
            VB(a, 'Response code "' + a.g.status + '" on loading chunk ' + a.j + " for stream " + a.o);
        else {
            if (!a.V) {
                var b = a.g.getResponseHeader("content-type");
                if (b && 0 <= b.indexOf("text/plain")) {
                    a.g.readyState === XMLHttpRequest.DONE && (a.M = new R(a.g.response),
                    a.j = 0,
                    a.D = 0,
                    a.Na++,
                    YB(a));
                    return
                }
                a.V = !0;
                J("sl_redc" + a.o);
                I(G.g(), "sl_tr" + a.o, a.Na.toString())
            }
            a.M.g.remove("alr");
            if (a.g.readyState === XMLHttpRequest.LOADING || a.g.readyState === XMLHttpRequest.DONE)
                b = aC(a, a.U),
                a.U = a.g.response.length,
                a.Z += b.byteLength,
                bC(a, b);
            if (a.A && a.g.readyState === XMLHttpRequest.DONE && (b = aC(a, 0),
            0 < b.byteLength)) {
                var c = a.g.responseText;
                a.va = !c || c.length < a.Ga;
                a.l.bc(b, new R(a.zb), 0, a.va)
            }
        }
    }
      , bC = function(a, b) {
        0 < b.byteLength && (a.h.updating || a.B.length ? a.B.push(b) : a.h.appendBuffer(b))
    }
      , aC = function(a, b) {
        a = a.g.response;
        for (var c = new Uint8Array(a.length - b), d = 0; d < c.length; d++)
            c[d] = a.charCodeAt(d + b) & 255;
        return c.buffer
    }
      , XB = function(a) {
        var b = gx;
        -1 !== b && b < a.Z + a.Ga ? (a.F.pause(),
        gx = -1,
        b = !1) : (b = a.D === a.j && !a.h.updating && !a.B.length,
        b = a.A ? !a.va && b && a.F.currentTime >= a.X : !a.I && b && a.F.currentTime >= a.X);
        b && (a.X = a.xb + .1,
        YB(a))
    }
      , ZB = function(a) {
        var b = a.A && a.G ? a.G + 1 : a.j * a.Ga;
        return Pw(a.M, "range", b + "-" + (b + a.Ga - 1)).toString()
    }
      , YB = function(a) {
        if (a.A) {
            var b = new R(ZB(a));
            a.l.Pb(b).then(function(c) {
                c ? (a.G = Number(c.qc),
                a.va = c.va,
                bC(a, c.video),
                c = lz("get_video_succeeded"),
                a.l.dispatchEvent(c),
                a.D++) : $B(a);
                a.j++
            })
        } else
            $B(a),
            a.j++
    };
    TB.prototype.L = function() {
        this.A && this.l.Qa() && this.l.close();
        this.g.removeEventListener("load", this.ha);
        this.g.removeEventListener("progress", this.ba);
        this.g.removeEventListener("error", this.aa);
        gt(this.Ma);
        gt(this.Fa);
        P.prototype.L.call(this)
    }
    ;
    var dC = function(a, b) {
        P.call(this);
        var c = this;
        this.l = a;
        this.F = b;
        this.g = new MediaSource;
        this.D = [];
        this.j = [];
        this.h = this.o = null;
        this.A = !1;
        this.B = function() {
            cC(c)
        }
        ;
        this.g.addEventListener("sourceopen", this.B)
    };
    u(dC, P);
    var eC = function(a) {
        a.o && a.l.removeEventListener("timeupdate", a.o)
    }
      , cC = function(a) {
        J("msmsw_oso");
        a.o = function() {
            if (!a.A)
                for (var e = r(a.j), f = e.next(); !f.done; f = e.next())
                    XB(f.value)
        }
        ;
        a.l.addEventListener("timeupdate", a.o);
        for (var b = 0; b < a.F.length; b++) {
            var c = a.F[b];
            I(G.g(), "msmsw_mime" + b, c.mimeType);
            I(G.g(), "msmsw_cs" + b, c.Ga.toString());
            var d = a.g.addSourceBuffer(c.mimeType);
            d ? (a.D.push(d),
            c = dw(TB, a.l, c, d, function() {
                a: if (!a.A) {
                    for (var e = r(a.j), f = e.next(); !f.done; f = e.next())
                        if (f = f.value,
                        f.A ? !f.va || f.h.updating || f.B.length : !f.I || f.h.updating || f.B.length)
                            break a;
                    a.g.endOfStream();
                    a.A = !0;
                    eC(a)
                }
            }, b),
            a.j.push(c)) : J("msmsw_sbf" + b)
        }
        I(G.g(), "msmsw_ns", a.D.length.toString())
    };
    dC.prototype.L = function() {
        this.h && window.URL.revokeObjectURL(this.h);
        for (var a = r(this.j), b = a.next(); !b.done; b = a.next())
            b.value.W();
        eC(this);
        this.g.removeEventListener("sourceopen", this.B);
        P.prototype.L.call(this)
    }
    ;
    /*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
    var fC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
      , gC = function() {
        for (var a = Array(36), b = 0, c, d = 0; 36 > d; d++)
            8 == d || 13 == d || 18 == d || 23 == d ? a[d] = "-" : 14 == d ? a[d] = "4" : (2 >= b && (b = 33554432 + 16777216 * Math.random() | 0),
            c = b & 15,
            b >>= 4,
            a[d] = fC[19 == d ? c & 3 | 8 : c]);
        return a.join("")
    };
    var iC = function(a) {
        R.call(this, a);
        this.B = new Map;
        a = this.j;
        var b = a.indexOf(";")
          , c = null;
        0 <= b ? (this.j = a.substring(0, b),
        c = a.substring(b + 1)) : this.j = a;
        hC(this, c)
    };
    u(iC, R);
    iC.prototype.toString = function() {
        return jC(this, R.prototype.toString.call(this))
    }
    ;
    iC.prototype.D = function() {
        return ""
    }
    ;
    var hC = function(a, b) {
        ob(eh(b)) || b.split(";").forEach(function(c) {
            var d = c.indexOf("=");
            if (!(0 >= d)) {
                var e = bh(c.substring(0, d));
                c = bh(c.substring(d + 1));
                d = a.B.get(e);
                null != d ? d.includes(c) || d.push(c) : d = [eh(c)];
                a.B.set(e, d)
            }
        }, a)
    }
      , kC = function(a) {
        if (ob(eh("ord")))
            return null;
        a = a.B.get("ord");
        return null != a ? a : null
    }
      , lC = function(a, b) {
        ob(eh("ord")) || (b = b.map(eh),
        a.B.set("ord", b))
    }
      , jC = function(a, b) {
        b = [eh(b)];
        b.push.apply(b, ia(mC(a)));
        return b.join(";")
    }
      , mC = function(a) {
        var b = kC(a);
        null == b ? b = [eh(Date.now())] : ob(eh("ord")) || a.B.delete("ord");
        var c = [];
        a.B.forEach(function(d, e) {
            d.forEach(function(f) {
                c.push(e + "=" + f)
            })
        });
        c.push("ord=" + b[0]);
        lC(a, b);
        return c
    };
    iC.prototype.F = function() {
        return new iC(this.toString())
    }
    ;
    function nC(a) {
        var b = new iC(a);
        a = b.h;
        b = jC(b, b.j);
        return !nb(a, ".g.doubleclick.net") && (nb(a, "doubleclick.net") || nb(a, "pagead2.googlesyndication.com")) && zx("/(ad|pfad)[x|i|j]?/", b)
    }
    function oC(a) {
        return "bid.g.doubleclick.net" == (new R(a)).h
    }
    function pC(a) {
        a = new R(a);
        var b = a.j;
        return nb(a.h, "googleads.g.doubleclick.net") && zx("/pagead/(live/)?ads", b)
    }
    function qC(a) {
        a = new R(a);
        var b = a.j;
        return nb(a.h, "doubleclick.net") && zx("/gampad/(live/)?ads", b)
    }
    function rC(a) {
        a = new R(a);
        var b = a.j;
        return "ad.doubleclick.net" === a.h && zx("/dv3/adv", b)
    }
    ;var U = {
        DEPRECATED_ERROR_CODE: -1,
        VAST_MALFORMED_RESPONSE: 100,
        VAST_SCHEMA_VALIDATION_ERROR: 101,
        VAST_UNSUPPORTED_VERSION: 102,
        VAST_TRAFFICKING_ERROR: 200,
        VAST_UNEXPECTED_LINEARITY: 201,
        VAST_UNEXPECTED_DURATION_ERROR: 202,
        VAST_WRAPPER_ERROR: 300,
        VAST_LOAD_TIMEOUT: 301,
        VAST_TOO_MANY_REDIRECTS: 302,
        VAST_NO_ADS_AFTER_WRAPPER: 303,
        VIDEO_PLAY_ERROR: 400,
        VAST_MEDIA_LOAD_TIMEOUT: 402,
        VAST_LINEAR_ASSET_MISMATCH: 403,
        VAST_PROBLEM_DISPLAYING_MEDIA_FILE: 405,
        OVERLAY_AD_PLAYING_FAILED: 500,
        NONLINEAR_DIMENSIONS_ERROR: 501,
        OVERLAY_AD_LOADING_FAILED: 502,
        VAST_NONLINEAR_ASSET_MISMATCH: 503,
        COMPANION_REQUIRED_ERROR: 602,
        COMPANION_AD_LOADING_FAILED: 603,
        UNKNOWN_ERROR: 900,
        VPAID_ERROR: 901,
        FAILED_TO_REQUEST_ADS: 1005,
        VAST_ASSET_NOT_FOUND: 1007,
        VAST_EMPTY_RESPONSE: 1009,
        UNKNOWN_AD_RESPONSE: 1010,
        UNSUPPORTED_LOCALE: 1011,
        ADS_REQUEST_NETWORK_ERROR: 1012,
        INVALID_AD_TAG: 1013,
        STREAM_INITIALIZATION_FAILED: 1020,
        ASSET_FALLBACK_FAILED: 1021,
        INVALID_ARGUMENTS: 1101,
        NATIVE_MESSAGE_ERROR: 1204,
        AUTOPLAY_DISALLOWED: 1205,
        CONSENT_MANAGEMENT_PROVIDER_NOT_READY: 1300,
        Sh: 2002
    };
    U[-1] = "DEPRECATED_ERROR_CODE";
    U[100] = "VAST_MALFORMED_RESPONSE";
    U[101] = "VAST_SCHEMA_VALIDATION_ERROR";
    U[102] = "VAST_UNSUPPORTED_VERSION";
    U[200] = "VAST_TRAFFICKING_ERROR";
    U[201] = "VAST_UNEXPECTED_LINEARITY";
    U[202] = "VAST_UNEXPECTED_DURATION_ERROR";
    U[300] = "VAST_WRAPPER_ERROR";
    U[301] = "VAST_LOAD_TIMEOUT";
    U[302] = "VAST_TOO_MANY_REDIRECTS";
    U[303] = "VAST_NO_ADS_AFTER_WRAPPER";
    U[400] = "VIDEO_PLAY_ERROR";
    U[402] = "VAST_MEDIA_LOAD_TIMEOUT";
    U[403] = "VAST_LINEAR_ASSET_MISMATCH";
    U[405] = "VAST_PROBLEM_DISPLAYING_MEDIA_FILE";
    U[500] = "OVERLAY_AD_PLAYING_FAILED";
    U[501] = "NONLINEAR_DIMENSIONS_ERROR";
    U[502] = "OVERLAY_AD_LOADING_FAILED";
    U[503] = "VAST_NONLINEAR_ASSET_MISMATCH";
    U[602] = "COMPANION_REQUIRED_ERROR";
    U[603] = "COMPANION_AD_LOADING_FAILED";
    U[900] = "UNKNOWN_ERROR";
    U[901] = "VPAID_ERROR";
    U[1005] = "FAILED_TO_REQUEST_ADS";
    U[1007] = "VAST_ASSET_NOT_FOUND";
    U[1009] = "VAST_EMPTY_RESPONSE";
    U[1010] = "UNKNOWN_AD_RESPONSE";
    U[1011] = "UNSUPPORTED_LOCALE";
    U[1012] = "ADS_REQUEST_NETWORK_ERROR";
    U[1013] = "INVALID_AD_TAG";
    U[1020] = "STREAM_INITIALIZATION_FAILED";
    U[1021] = "ASSET_FALLBACK_FAILED";
    U[1101] = "INVALID_ARGUMENTS";
    U[1204] = "NATIVE_MESSAGE_ERROR";
    U[1205] = "AUTOPLAY_DISALLOWED";
    U[1300] = "CONSENT_MANAGEMENT_PROVIDER_NOT_READY";
    U[2002] = "SUPPORTED_ADS_NOT_FOUND";
    var sC = function(a, b, c) {
        var d = Error.call(this);
        this.message = d.message;
        "stack"in d && (this.stack = d.stack);
        this.type = a;
        this.errorMessage = b;
        this.errorCode = c;
        this.ad = this.g = null
    };
    u(sC, Error);
    l = sC.prototype;
    l.getAd = function() {
        return this.ad
    }
    ;
    l.getInnerError = function() {
        return this.g
    }
    ;
    l.getMessage = function() {
        return this.errorMessage
    }
    ;
    l.getErrorCode = function() {
        return this.errorCode
    }
    ;
    l.getVastErrorCode = function() {
        return 1E3 > this.errorCode ? this.errorCode : 900
    }
    ;
    l.getType = function() {
        return this.type
    }
    ;
    l.toString = function() {
        return "AdError " + this.getErrorCode() + ": " + this.getMessage() + (null != this.getInnerError() ? " Caused by: " + this.getInnerError() : "")
    }
    ;
    var tC = ha(["https://imasdk.googleapis.com/js/sdkloader/car.js"])
      , uC = ej(tC);
    function vC(a) {
        if ("" === a)
            return null;
        a = new R(a);
        var b;
        var c = null != (b = a.g.get("iu")) ? b : "";
        b = c ? (b = /\/(\d+)(?:,\d+){0,2}\//.exec(c)) && 2 === b.length ? b[1] : null : null;
        if (!b) {
            var d;
            b = (a = null != (d = a.g.get("client")) ? d : "") ? a : null
        }
        return b
    }
    ;var wC = function(a) {
        var b = {};
        b = (b.IABUSPrivacy_String = "uspString",
        b.IABTCF_gdprApplies = "gdprApplies",
        b.IABTCF_TCString = "tcString",
        b.IABTCF_AddtlConsent = "addtlConsent",
        b.IABGPP_HDR_GppString = "gppString",
        b.IABGPP_GppSID = "gppSid",
        b);
        for (var c in b)
            null != a[c] && (a[b[c]] = a[c],
            delete a[c]);
        this.me = !!a.isGdprLoader;
        c = a.uspString;
        this.uspString = "string" === typeof c ? c : "";
        c = a.gdprApplies;
        this.h = "boolean" === typeof c ? c ? "1" : "0" : "number" !== typeof c || 1 !== c && 0 !== c ? "string" !== typeof c || "1" !== c && "0" !== c ? "" : "1" === c ? "1" : "0" : 1 === c ? "1" : "0";
        c = a.tcString;
        this.g = "string" === typeof c ? c : "";
        /^[\.\w_-]*$/.test(this.g) || (this.g = encodeURIComponent(this.g));
        a = a.gppString;
        this.gppString = "string" === typeof a ? a : ""
    };
    var xC = function(a) {
        this.g = a
    }
      , yC = function(a, b) {
        return Eg(a.g, b) && (a = a.g[b],
        "boolean" === typeof a) ? a : !1
    }
      , zC = function(a) {
        return Eg(a.g, "videoElementFakeDuration") && (a = a.g.videoElementFakeDuration,
        "number" === typeof a) ? a : NaN
    }
      , AC = function(a) {
        if (Eg(a.g, "forceExperimentIds")) {
            a = a.g.forceExperimentIds;
            var b = []
              , c = 0;
            Array.isArray(a) && a.forEach(function(d) {
                "number" === typeof d && (b[c++] = d)
            });
            return b
        }
        return null
    };
    var V = function() {
        this.F = "always";
        this.U = 4;
        this.ppid = null;
        this.l = 1;
        this.g = 0;
        this.o = !0;
        this.locale = "en";
        this.j = null;
        this.h = !1;
        this.playerVersion = this.playerType = "";
        this.B = null;
        this.D = this.K = -1;
        this.A = "";
        this.M = !1;
        this.I = !0;
        this.sessionId = gC();
        this.O = {};
        this.H = "";
        this.G = 0;
        try {
            this.V = um()[0]
        } catch (a) {}
    }
      , BC = function(a) {
        a = eh(a);
        ob(a) || (a = a.substring(0, 20));
        return a
    };
    l = V.prototype;
    l.setCompanionBackfill = function(a) {
        this.F = a
    }
    ;
    l.getCompanionBackfill = function() {
        return this.F
    }
    ;
    l.setNumRedirects = function(a) {
        this.U = a
    }
    ;
    l.getNumRedirects = function() {
        return this.U
    }
    ;
    l.setPpid = function(a) {
        this.ppid = a
    }
    ;
    l.getPpid = function() {
        return this.ppid
    }
    ;
    l.setVpaidAllowed = function(a) {
        "boolean" === typeof a && (this.l = a ? 1 : 0)
    }
    ;
    l.setVpaidMode = function(a) {
        this.l = a
    }
    ;
    l.Ef = function() {
        return this.l
    }
    ;
    l.setAutoPlayAdBreaks = function(a) {
        this.o = a
    }
    ;
    l.Pf = function() {
        return this.o
    }
    ;
    l.lg = function(a) {
        this.h = a
    }
    ;
    l.Df = function() {
        return this.h
    }
    ;
    l.setLocale = function(a) {
        if (a = Bx(a))
            this.locale = a
    }
    ;
    l.getLocale = function() {
        return this.locale
    }
    ;
    l.setPlayerType = function(a) {
        this.playerType = BC(a)
    }
    ;
    l.getPlayerType = function() {
        return this.playerType
    }
    ;
    l.setPlayerVersion = function(a) {
        this.playerVersion = BC(a)
    }
    ;
    l.getPlayerVersion = function() {
        return this.playerVersion
    }
    ;
    var CC = function(a) {
        if (null == a.B) {
            var b = {};
            var c = (new R(E().location.href)).g;
            if (Uw(c, "tcnfp"))
                try {
                    b = JSON.parse(c.get("tcnfp"))
                } catch (d) {}
            a.B = new xC(b)
        }
        return a.B
    };
    l = V.prototype;
    l.mg = function(a) {
        this.K = a
    }
    ;
    l.ng = function(a) {
        this.D = a
    }
    ;
    l.setDisableCustomPlaybackForIOS10Plus = function(a) {
        this.M = a
    }
    ;
    l.getDisableCustomPlaybackForIOS10Plus = function() {
        return this.M
    }
    ;
    l.isCookiesEnabled = function() {
        return this.I
    }
    ;
    l.setCookiesEnabled = function(a) {
        null != a && (this.I = a)
    }
    ;
    l.setSessionId = function(a) {
        this.sessionId = a
    }
    ;
    l.kg = function() {}
    ;
    l.Cf = function() {
        return !0
    }
    ;
    l.setFeatureFlags = function(a) {
        this.O = a
    }
    ;
    l.getFeatureFlags = function() {
        return this.O
    }
    ;
    V.prototype.getFeatureFlags = V.prototype.getFeatureFlags;
    V.prototype.setFeatureFlags = V.prototype.setFeatureFlags;
    V.prototype.getDisableFlashAds = V.prototype.Cf;
    V.prototype.setDisableFlashAds = V.prototype.kg;
    V.prototype.setSessionId = V.prototype.setSessionId;
    V.prototype.setCookiesEnabled = V.prototype.setCookiesEnabled;
    V.prototype.isCookiesEnabled = V.prototype.isCookiesEnabled;
    V.prototype.getDisableCustomPlaybackForIOS10Plus = V.prototype.getDisableCustomPlaybackForIOS10Plus;
    V.prototype.setDisableCustomPlaybackForIOS10Plus = V.prototype.setDisableCustomPlaybackForIOS10Plus;
    V.prototype.setStreamCorrelator = V.prototype.ng;
    V.prototype.setPageCorrelator = V.prototype.mg;
    V.prototype.getPlayerVersion = V.prototype.getPlayerVersion;
    V.prototype.setPlayerVersion = V.prototype.setPlayerVersion;
    V.prototype.getPlayerType = V.prototype.getPlayerType;
    V.prototype.setPlayerType = V.prototype.setPlayerType;
    V.prototype.getLocale = V.prototype.getLocale;
    V.prototype.setLocale = V.prototype.setLocale;
    V.prototype.getIsVpaidAdapter = V.prototype.Df;
    V.prototype.setIsVpaidAdapter = V.prototype.lg;
    V.prototype.isAutoPlayAdBreaks = V.prototype.Pf;
    V.prototype.setAutoPlayAdBreaks = V.prototype.setAutoPlayAdBreaks;
    V.prototype.getVpaidMode = V.prototype.Ef;
    V.prototype.setVpaidMode = V.prototype.setVpaidMode;
    V.prototype.setVpaidAllowed = V.prototype.setVpaidAllowed;
    V.prototype.getPpid = V.prototype.getPpid;
    V.prototype.setPpid = V.prototype.setPpid;
    V.prototype.getNumRedirects = V.prototype.getNumRedirects;
    V.prototype.setNumRedirects = V.prototype.setNumRedirects;
    V.prototype.getCompanionBackfill = V.prototype.getCompanionBackfill;
    V.prototype.setCompanionBackfill = V.prototype.setCompanionBackfill;
    var DC = new V;
    var EC = function(a) {
        this.J = A(a)
    };
    u(EC, B);
    EC.ga = [10];
    function FC(a) {
        var b = {};
        (new R(a)).g.forEach(function(c, d) {
            b[d] = c
        });
        return b
    }
    var GC = function(a, b) {
        a = void 0 === a ? {} : a;
        b = void 0 === b ? {} : b;
        var c = {};
        a = r(Object.entries(a));
        for (var d = a.next(); !d.done; d = a.next()) {
            var e = r(d.value);
            d = e.next().value;
            e = e.next().value;
            null != e && (c[d] = String(e))
        }
        this.g = c;
        this.h = new wC(b)
    }
      , HC = function(a, b) {
        if (!(pC(a) || nC(a) || qC(a) || oC(a) || rC(a))) {
            var c = new R(a)
              , d = c.j;
            "pubads.g.doubleclick.net" === c.h && (zx("/ssai/", d) || zx("/ondemand/", d))
        }
        return new GC(FC(a),b)
    }
      , IC = function(a, b) {
        if (a.g.hasOwnProperty(b))
            return a.g[b]
    }
      , JC = function(a) {
        var b = IC(a, "ltd");
        if (!(b = "1" === b || "true" === b)) {
            b = IC(a, "gdpr");
            var c = a.h.h;
            b = ("1" === c || "0" === c ? c : void 0 !== b ? b : "").toLowerCase();
            if ("true" === b || "1" === b)
                if (b = a.h.g,
                a = IC(a, "gdpr_consent"),
                a = b && "tcunavailable" !== b ? b : "tcunavailable" === b ? a || b : a || "",
                "tcunavailable" === a)
                    var d = !1;
                else {
                    if ((b = Sv(a)) && a) {
                        var e = bf(b, iv, 1);
                        b = bf(b, cv, 2) || new cv;
                        c = mf(e, 9);
                        var f = mf(e, 4)
                          , g = mf(e, 5)
                          , h = lf(e, 10)
                          , k = lf(e, 11)
                          , m = pf(e, 16)
                          , n = lf(e, 15)
                          , q = {
                            consents: Tv(Te(e, 13, le), Fv),
                            legitimateInterests: Tv(Te(e, 14, le), Fv)
                        }
                          , t = {
                            consents: Tv(Te(e, 17, oe)),
                            legitimateInterests: Tv(Te(e, 18, oe))
                        }
                          , v = Tv(Te(e, 12, le), Gv)
                          , x = df(e, bv, 19);
                        e = {};
                        x = r(x);
                        for (var H = x.next(); !H.done; H = x.next()) {
                            H = H.value;
                            var T = qf(H, 1);
                            e[T] = e[T] || {};
                            var la = Te(H, 3, oe);
                            la = r(la);
                            for (var da = la.next(); !da.done; da = la.next())
                                e[T][da.value] = qf(H, 2)
                        }
                        a = {
                            tcString: a,
                            tcfPolicyVersion: c,
                            gdprApplies: !0,
                            cmpId: f,
                            cmpVersion: g,
                            isServiceSpecific: h,
                            useNonStandardStacks: k,
                            publisherCC: m,
                            purposeOneTreatment: n,
                            purpose: q,
                            vendor: t,
                            specialFeatureOptins: v,
                            publisher: {
                                restrictions: e,
                                consents: Tv(Te(b, 1, le), Fv),
                                legitimateInterests: Tv(Te(b, 2, le), Fv),
                                customPurposes: {
                                    consents: Tv(Te(b, 3, oe)),
                                    legitimateInterests: Tv(Te(b, 4, oe))
                                }
                            }
                        }
                    } else
                        a = null;
                    if (a) {
                        var K = void 0 === K ? {} : K;
                        if (zw(a))
                            if (!1 === a.gdprApplies)
                                d = !0;
                            else if ("tcunavailable" === a.tcString || void 0 === a.gdprApplies && !K.ui || "string" !== typeof a.tcString || !a.tcString.length)
                                d = !K.wi;
                            else {
                                d = void 0 === d ? "755" : d;
                                c: {
                                    if (a.publisher && a.publisher.restrictions && (K = a.publisher.restrictions["1"],
                                    void 0 !== K)) {
                                        K = K[void 0 === d ? "755" : d];
                                        break c
                                    }
                                    K = void 0
                                }
                                0 === K ? d = !1 : a.purpose && a.vendor ? (K = a.vendor.consents,
                                (d = !(!K || !K[void 0 === d ? "755" : d])) && a.purposeOneTreatment && "CH" === a.publisherCC ? d = !0 : d && (d = a.purpose.consents,
                                d = !(!d || !d["1"]))) : d = !0
                            }
                        else
                            d = !1
                    } else
                        d = !1
                }
            else
                d = !0;
            b = !d
        }
        return b
    }
      , KC = function(a) {
        var b = new EC;
        a = !JC(a);
        sf(b, 5, a);
        return b
    };
    var LC = function(a) {
        this.J = A(a)
    };
    u(LC, B);
    LC.prototype.getVersion = function() {
        return pf(this, 2)
    }
    ;
    var MC = function(a) {
        this.J = A(a)
    };
    u(MC, B);
    var NC = function(a, b) {
        return tf(a, 2, b)
    }
      , OC = function(a, b) {
        return tf(a, 3, b)
    }
      , PC = function(a, b) {
        return tf(a, 4, b)
    }
      , QC = function(a, b) {
        return tf(a, 5, b)
    }
      , RC = function(a, b) {
        return tf(a, 9, b)
    }
      , SC = function(a, b) {
        return ff(a, 10, b)
    }
      , TC = function(a, b) {
        return sf(a, 11, b)
    }
      , UC = function(a, b) {
        return tf(a, 1, b)
    }
      , VC = function(a, b) {
        return sf(a, 7, b)
    };
    MC.ga = [10, 6];
    var WC = "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(" ");
    function XC(a) {
        var b;
        return null != (b = a.google_tag_data) ? b : a.google_tag_data = {}
    }
    function YC(a) {
        var b, c;
        return "function" === typeof (null == (b = a.navigator) ? void 0 : null == (c = b.userAgentData) ? void 0 : c.getHighEntropyValues)
    }
    function ZC() {
        var a = window;
        if (!YC(a))
            return null;
        var b = XC(a);
        if (b.uach_promise)
            return b.uach_promise;
        a = a.navigator.userAgentData.getHighEntropyValues(WC).then(function(c) {
            null != b.uach || (b.uach = c);
            return c
        });
        return b.uach_promise = a
    }
    function $C(a) {
        var b;
        return TC(SC(QC(NC(UC(PC(VC(RC(OC(new MC, a.architecture || ""), a.bitness || ""), a.mobile || !1), a.model || ""), a.platform || ""), a.platformVersion || ""), a.uaFullVersion || ""), (null == (b = a.fullVersionList) ? void 0 : b.map(function(c) {
            var d = new LC;
            d = tf(d, 1, c.brand);
            return tf(d, 2, c.version)
        })) || []), a.wow64 || !1)
    }
    function aD() {
        var a, b;
        return null != (b = null == (a = ZC()) ? void 0 : a.then(function(c) {
            return $C(c)
        })) ? b : null
    }
    ;var cD = function() {
        new GC;
        gC();
        this.deviceId = "";
        this.g = Math.floor(4503599627370496 * Math.random());
        this.h = this.referrer = this.ppid = null;
        bD(this)
    }
      , dD = function() {
        cD.g();
        var a = "h.3.616.1";
        DC.h && (a += "/vpaid_adapter");
        return a
    }
      , bD = function(a) {
        var b = aD();
        b && b.then(function(c) {
            if (null == c)
                c = null;
            else {
                c = vf(c);
                for (var d = [], e = 0, f = 0; f < c.length; f++) {
                    var g = c.charCodeAt(f);
                    255 < g && (d[e++] = g & 255,
                    g >>= 8);
                    d[e++] = g
                }
                c = Pc(d, 3)
            }
            a.h = c
        })
    };
    cD.g = function() {
        return C(cD)
    }
    ;
    var fD = function(a) {
        a = void 0 === a ? !1 : a;
        var b = CC(DC);
        if (b && yC(b, "forceCustomPlayback") || DC.h)
            return !0;
        if ((uc || lx()) && a)
            return !1;
        a = a && (uc || lx() || mx(10)) && DC.getDisableCustomPlaybackForIOS10Plus();
        return (tc || vc) && !a || sc && (!sc || !kx(jx, 4)) || eD() ? !0 : !1
    }
      , gD = function(a) {
        return null === a ? !1 : DC.h ? !0 : wc || uc || lx() ? nx(a) ? uc || lx() || mx(10) && DC.getDisableCustomPlaybackForIOS10Plus() ? !1 : !0 : !0 : sc && (!sc || !kx(jx, 4)) || eD() ? !0 : !1
    }
      , hD = function() {
        var a = CC(DC);
        return a && yC(a, "disableOnScreenDetection") ? !1 : !Nn()
    }
      , eD = function() {
        return 1 === iD() || 2 === iD()
    }
      , iD = function() {
        switch (cD.g(),
        0) {
        case 1:
            return 3;
        case 2:
            return 1
        }
        return (cD.g(),
        cD.g(),
        "tvos" === (cD.g(),
        null)) ? 1 : On() ? 2 : 0
    };
    var jD = function(a, b) {
        return 0 == a.indexOf(b) ? a.substr(b.length) : null
    };
    function kD() {
        if (Nn())
            return window.location.href;
        var a = ni()
          , b = a.h
          , c = a.g;
        a = a.j;
        var d = null;
        if (a)
            try {
                var e = Qw(a.url)
                  , f = e.j
                  , g = jD(f, "/v/");
                g || (g = jD(f, "/a/"));
                if (!g)
                    throw Error("Can not extract standalone amp url.");
                var h = jD("/" + g, "/s/")
                  , k = Fw(e.g);
                k.remove("amp_js_v");
                k.remove("amp_lite");
                var m = h ? Qw("https://" + h) : Qw("http://" + g);
                Ew(m, k);
                d = m.toString()
            } catch (n) {
                d = null
            }
        return d ? d : b && b.url ? b.url : c && c.url ? c.url : ""
    }
    function lD() {
        var a = ji();
        a = r(a);
        for (var b = a.next(); !b.done; b = a.next())
            if (b = b.value,
            b.url && b.url.includes("amp=1"))
                return !0;
        return null != window.context ? (a = Number(window.context.ampcontextVersion),
        isNaN(a) ? !1 : 0 < Math.floor(a)) : null != ni().j
    }
    function mD() {
        var a = E().location.ancestorOrigins;
        return a ? 0 < a.length ? [].concat(ia(a)).join(",") : "" : ""
    }
    ;function nD() {
        var a = E()
          , b = document;
        return new R(a.parent === a ? a.location.href : b.referrer)
    }
    function oD(a, b) {
        Pw(a, "url", "");
        try {
            var c = 2083 - a.toString().length - 1;
            if (0 >= c)
                return a.toString();
            for (var d = b.slice(0, c), e = encodeURIComponent(d), f = c; 0 < f && e.length > c; )
                d = b.slice(0, f--),
                e = encodeURIComponent(d);
            Pw(a, "url", d)
        } catch (g) {}
        return a.toString()
    }
    ;var W = {}
      , pD = (W.creativeView = "creativeview",
    W.start = "start",
    W.midpoint = "midpoint",
    W.firstQuartile = "firstquartile",
    W.thirdQuartile = "thirdquartile",
    W.complete = "complete",
    W.mute = "mute",
    W.unmute = "unmute",
    W.pause = "pause",
    W.rewind = "rewind",
    W.resume = "resume",
    W.fullscreen = "fullscreen",
    W.exitFullscreen = "exitfullscreen",
    W.expand = "expand",
    W.collapse = "collapse",
    W.close = "close",
    W.acceptInvitation = "acceptinvitation",
    W.adCanPlay = "adCanPlay",
    W.adStarted = "adStarted",
    W.abandon = "abandon",
    W.acceptInvitationLinear = "acceptinvitationlinear",
    W.engagedView = "engagedview",
    W.instreamAdComplete = "instreamAdComplete",
    W.skipShown = "skipshown",
    W.skippableStateChanged = "skippableStateChanged",
    W.skip = "skip",
    W.progress = "progress",
    W.publisher_invoked_skip = "PUBLISHER_INVOKED_SKIP",
    W.annotation_start = "annotation_start",
    W.annotation_click = "annotation_click",
    W.annotation_close = "annotation_close",
    W.cta_annotation_shown = "cta_annotation_shown",
    W.cta_annotation_clicked = "cta_annotation_clicked",
    W.cta_annotation_closed = "cta_annotation_closed",
    W.replay = "replay",
    W.stop = "stop",
    W.autoplayDisallowed = "autoplayDisallowed",
    W.error = "error",
    W.mediaLoadTimeout = "mediaLoadTimeout",
    W.linearChanged = "linearChanged",
    W.click = "click",
    W.contentPauseRequested = "contentPauseRequested",
    W.contentResumeRequested = "contentResumeRequested",
    W.discardAdBreak = "discardAdBreak",
    W.updateAdsRenderingSettings = "updateAdsRenderingSettings",
    W.durationChange = "durationChange",
    W.expandedChanged = "expandedChanged",
    W.autoClose = "autoClose",
    W.userClose = "userClose",
    W.userRecall = "userRecall",
    W.prefetched = "prefetched",
    W.loaded = "loaded",
    W.init = "init",
    W.allAdsCompleted = "allAdsCompleted",
    W.adMetadata = "adMetadata",
    W.adBreakReady = "adBreakReady",
    W.adBreakFetchError = "adBreakFetchError",
    W.log = "log",
    W.volumeChange = "volumeChange",
    W.companionBackfill = "companionBackfill",
    W.companionInitialized = "companionInitialized",
    W.companionImpression = "companionImpression",
    W.companionClick = "companionClick",
    W.impression = "impression",
    W.interaction = "interaction",
    W.adProgress = "adProgress",
    W.adBuffering = "adBuffering",
    W.trackingUrlPinged = "trackingUrlPinged",
    W.measurable_impression = "measurable_impression",
    W.custom_metric_viewable = "custom_metric_viewable",
    W.viewable_impression = "viewable_impression",
    W.fully_viewable_audible_half_duration_impression = "fully_viewable_audible_half_duration_impression",
    W.audio_audible = "audio_audible",
    W.audio_measurable = "audio_measurable",
    W.overlay_resize = "overlay_resize",
    W.overlay_unmeasurable_impression = "overlay_unmeasurable_impression",
    W.overlay_unviewable_impression = "overlay_unviewable_impression",
    W.overlay_viewable_immediate_impression = "overlay_viewable_immediate_impression",
    W.overlay_viewable_end_of_session_impression = "overlay_viewable_end_of_session_impression",
    W.externalActivityEvent = "externalActivityEvent",
    W.adEvent = "adEvent",
    W.configure = "configure",
    W.remainingTime = "remainingTime",
    W.destroy = "destroy",
    W.resize = "resize",
    W.volume = "volume",
    W.authorIconClicked = "videoAuthorIconClicked",
    W.authorNameClicked = "videoAuthorClicked",
    W.videoClicked = "videoClicked",
    W.videoIconClicked = "videoIconClicked",
    W.learnMoreClicked = "videoLearnMoreClicked",
    W.muteClicked = "videoMuteClicked",
    W.titleClicked = "videoTitleClicked",
    W.videoSkipClicked = "SKIPPED",
    W.unmuteClicked = "videoUnmuteClicked",
    W.vpaidEvent = "vpaidEvent",
    W.show_ad = "show_ad",
    W.video_card_endcap_collapse = "video_card_endcap_collapse",
    W.video_card_endcap_dismiss = "video_card_endcap_dismiss",
    W.video_card_endcap_impression = "video_card_endcap_impression",
    W.mediaUrlPinged = "mediaUrlPinged",
    W.breakStart = "breakstart",
    W.breakEnd = "breakend",
    W.omidReady = "omidReady",
    W.omidUnavailable = "omidUnavailable",
    W.omidAdSessionCompleted = "omidAdSessionCompleted",
    W.omidAdSessionAbandoned = "omidAdSessionAbandoned",
    W.verificationNotExecuted = "verificationNotExecuted",
    W.loadStart = "loadStart",
    W.seeked = "seeked",
    W.seeking = "seeking",
    W);
    var qD = new function() {
        this.g = new Map;
        this.j = 0;
        this.h = null != window.fetch
    }
    ;
    function rD(a) {
        var b = void 0 === b ? qD : b;
        var c = void 0 === c ? null : c;
        a = new Ex(a,c ? c : c);
        var d = void 0 === d ? !1 : d;
        var e = void 0 === e ? !1 : e;
        null != a.g || e ? Yy(b, a.url, d, e, a.g) : Yy(b, a.url, d)
    }
    ;var X = function() {
        this.j = .01 > Math.random();
        this.h = Math.floor(4503599627370496 * Math.random());
        this.g = null
    };
    X.prototype.report = function(a, b, c) {
        b = void 0 === b ? {} : b;
        if (null == w.G_testRunner && (this.j || (void 0 === c ? 0 : c))) {
            b.lid = a;
            dD() && (b.sdkv = dD());
            this.g && (b.palv = this.g);
            a = ek().sort().join(",");
            ob(eh(a)) || (b.e = a);
            b = sD(this, b);
            var d = new R("http://pagead2.googlesyndication.com/pagead/gen_204");
            xg(b, function(e, f) {
                null != e && Pw(d, f, null == e ? "" : "boolean" === typeof e ? e ? "t" : "f" : "" + e)
            }, this);
            b = nD().o;
            "http" !== b && "https" !== b || Cw(d, b);
            b = d.toString();
            a = d.g.get("url");
            null != a && Cb() && 2083 < b.length && (b = oD(d, a));
            rD(b)
        }
    }
    ;
    var sD = function(a, b) {
        b.id = "ima_html5";
        var c = nD();
        b.c = a.h;
        b.domain = c.h;
        return b
    };
    X.g = function() {
        return C(X)
    }
    ;
    function tD(a) {
        var b = Date.now()
          , c = {};
        a = (c["x-afma-token-requester-type"] = a,
        c);
        c = "https://pubads.g.doubleclick.net/adsid/integrator.json?aos=" + encodeURIComponent(mD());
        return (new Py).get({
            url: c,
            withCredentials: !0,
            timeout: new Cx(5E3),
            headers: a
        }).then(function(d) {
            var e = Date.now();
            d = d.newToken || "";
            var f = {};
            X.g().report(182, (f.t = e - b,
            f.aos = mD(),
            f));
            return new uD(d)
        }).catch(function(d) {
            var e = "not instanceof Error";
            d instanceof Error && (e = Fx(Number(d.message)));
            d = Date.now();
            var f = {};
            X.g().report(182, (f.except = e,
            f.t = d - b,
            f));
            return Promise.resolve(vD)
        })
    }
    var wD = function() {
        Q.call(this);
        this.g = null;
        this.l = new Jx(this);
        uo(this, this.l);
        this.h = new Ot(72E5);
        this.j = Promise.resolve(vD)
    };
    u(wD, Q);
    var xD = function(a) {
        var b = "requester_type_8";
        b = void 0 === b ? "requester_type_9" : b;
        var c = function(d) {
            a.g = d;
            return a.g
        };
        a.j = tD(b).then(c);
        a.h = new Ot(72E5);
        a.l.N(a.h, "tick", function() {
            a.j = tD(b).then(c)
        });
        a.h.start();
        to(a, function() {
            a.h.stop()
        })
    };
    wD.prototype.getId = function() {
        var a = this;
        return Ia(function(b) {
            if (1 == b.g)
                return null != a.g && a.g !== vD ? (b.g = 2,
                b = void 0) : b = ya(b, a.j, 3),
                b;
            2 != b.g && (a.g = b.h);
            return b.return(a.g)
        })
    }
    ;
    var uD = function(a) {
        this.id = a
    }
      , vD = new uD("");
    var yD = function(a) {
        Q.call(this);
        this.j = [];
        this.h = !1;
        this.sessionId = a || "goog_" + fh++
    };
    u(yD, Q);
    yD.prototype.connect = function() {
        for (this.h = !0; 0 !== this.j.length; ) {
            var a = this.j.shift();
            a && this.sendMessage(a.name, a.type, a.data)
        }
    }
    ;
    var zD = function(a, b, c, d) {
        a.h ? a.sendMessage(b, c, d) : a.j.push({
            name: b,
            type: c,
            data: d
        })
    };
    yD.prototype.sendMessage = function() {}
    ;
    var AD = function(a, b, c, d, e) {
        e = void 0 === e ? "" : e;
        Js.call(this, a);
        this.messageType = b;
        this.ra = c;
        this.sessionId = d;
        this.origin = e
    };
    u(AD, Js);
    AD.prototype.toString = function() {
        return ""
    }
    ;
    var BD = {
        IMAGE: "Image",
        FLASH: "Flash",
        ALL: "All"
    }
      , CD = {
        HTML: "Html",
        IFRAME: "IFrame",
        STATIC: "Static",
        ALL: "All"
    }
      , DD = {
        IGNORE: "IgnoreSize",
        SELECT_EXACT_MATCH: "SelectExactMatch",
        SELECT_NEAR_MATCH: "SelectNearMatch",
        SELECT_FLUID: "SelectFluid"
    }
      , ED = function() {
        this.allowCustom = !0;
        this.creativeType = this.resourceType = "All";
        this.sizeCriteria = "SelectExactMatch";
        this.nearMatchPercent = 90;
        this.adSlotIds = []
    };
    y("module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$companion_ad_selection_settings.CompanionAdSelectionSettings.CreativeType", BD);
    y("module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$companion_ad_selection_settings.CompanionAdSelectionSettings.ResourceType", CD);
    y("module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$companion_ad_selection_settings.CompanionAdSelectionSettings.SizeCriteria", DD);
    var GD = function(a, b) {
        b = void 0 === b ? new ED : b;
        this.g = a;
        this.settings = b ? b : new ED;
        this.resourceType = FD(CD, this.settings.resourceType) ? this.settings.resourceType : "All";
        this.creativeType = FD(BD, this.settings.creativeType) ? this.settings.creativeType : "All";
        this.sizeCriteria = FD(DD, this.settings.sizeCriteria) ? this.settings.sizeCriteria : "SelectExactMatch";
        this.adSlotIds = null != this.settings.adSlotIds ? this.settings.adSlotIds : [];
        this.nearMatchPercent = "number" === typeof this.settings.nearMatchPercent && 0 < this.settings.nearMatchPercent && 100 >= this.settings.nearMatchPercent ? this.settings.nearMatchPercent : 90
    }
      , JD = function(a, b) {
        var c = [];
        b.forEach(function(d) {
            a.settings.allowCustom && (!ob(d.getContent()) && (isNaN(d.data.sequenceNumber) || isNaN(d.data.mainAdSequenceNumber) || d.data.mainAdSequenceNumber === d.data.sequenceNumber) && HD(a, d) ? c.push(d) : (d = ID(a, d),
            null != d && !ob(d.getContent()) && c.push(d)))
        });
        return c
    };
    GD.prototype.he = function() {
        return this.resourceType
    }
    ;
    var HD = function(a, b) {
        var c;
        if (c = "Flash" !== b.getContentType()) {
            if (c = "All" === a.resourceType || a.resourceType === b.he())
                c = b.getContentType(),
                c = null == c ? !0 : "All" === a.creativeType || a.creativeType === c;
            c && (c = b.getAdSlotId(),
            c = 0 === a.adSlotIds.length ? !0 : null != c ? a.adSlotIds.includes(c) : !1)
        }
        if (c)
            if (c = b.getSize(),
            (b = !!b.data.fluidSize) || a.g.fe)
                a = b && a.g.fe;
            else if ((b = "IgnoreSize" === a.sizeCriteria) || (b = a.g.size,
            b = b == c ? !0 : b && c ? b.width == c.width && b.height == c.height : !1),
            b)
                a = !0;
            else {
                if (b = "SelectNearMatch" === a.sizeCriteria)
                    b = c.width,
                    c = c.height,
                    b = b > a.g.size.width || c > a.g.size.height || b < a.nearMatchPercent / 100 * a.g.size.width || c < a.nearMatchPercent / 100 * a.g.size.height ? !1 : !0;
                a = b
            }
        else
            a = !1;
        return a
    }
      , ID = function(a, b) {
        b = KD(b);
        return null == b ? null : b.find(function(c) {
            return HD(a, c)
        }) || null
    }
      , FD = function(a, b) {
        return null != b && Fg(a, b)
    };
    var LD = function(a, b) {
        this.message = a;
        this.errorCode = b
    };
    LD.prototype.getErrorCode = function() {
        return this.errorCode
    }
    ;
    LD.prototype.getMessage = function() {
        return this.message
    }
    ;
    var MD = new LD("Failed to initialize ad playback element before starting ad playback.",400)
      , ND = new LD("The provided {0} information: {1} is invalid.",1101);
    function OD(a, b) {
        var c = void 0 === b ? null : b;
        var d = Ja.apply(2, arguments);
        if (!(c instanceof sC)) {
            var e = a.getErrorCode()
              , f = a.getMessage();
            if (0 < d.length)
                for (var g = 0; g < d.length; g++)
                    f = f.replace(new RegExp("\\{" + g + "\\}","ig"), d[g]);
            d = new sC("adPlayError",f,e);
            d.g = c;
            c = d
        }
        return c
    }
    ;var PD = function() {};
    PD.g = function() {
        throw Error("Must be overridden");
    }
    ;
    var QD = function() {
        this.g = 0
    };
    u(QD, PD);
    QD.qb = void 0;
    QD.g = function() {
        return QD.qb ? QD.qb : QD.qb = new QD
    }
    ;
    function RD(a, b, c, d) {
        c = void 0 === c ? null : c;
        d = void 0 === d ? {} : d;
        var e = QD.g();
        0 === e.g && (e.g = .001 > Math.random() ? 2 : 1);
        if (2 === e.g) {
            e = {};
            var f = Object
              , g = f.assign;
            e.c = String(a);
            a = String;
            var h = window;
            if ("number" !== typeof h.goog_pvsid)
                try {
                    var k = Object
                      , m = k.defineProperty
                      , n = void 0;
                    n = void 0 === n ? Math.random : n;
                    var q = Math.floor(n() * Math.pow(2, 52));
                    m.call(k, h, "goog_pvsid", {
                        value: q,
                        configurable: !1
                    })
                } catch (t) {}
            e.pc = a(Number(h.goog_pvsid) || -1);
            e.em = c;
            e.lid = b;
            C(Xu);
            Pi(g.call(f, {}, (e.eids = "",
            e), d), "esp")
        }
    }
    ;function SD() {
        var a = window;
        var b = void 0 === b ? function() {}
        : b;
        return new Promise(function(c) {
            var d = function() {
                c(b());
                sg(a, "load", d)
            };
            rg(a, "load", d)
        }
        )
    }
    ;var TD = function() {
        this.cache = {}
    }
      , VD = function() {
        UD || (UD = new TD);
        return UD
    }
      , WD = function(a) {
        var b = hf(a, 3);
        if (!b)
            return 3;
        if (void 0 === jf(a, 2))
            return 4;
        a = Date.now();
        return a > b + 2592E5 ? 2 : a > b + 432E5 ? 1 : 0
    };
    TD.prototype.get = function(a, b) {
        if (this.cache[a])
            return {
                Fb: this.cache[a],
                success: !0
            };
        var c = "";
        try {
            c = b.getItem("_GESPSK-" + a)
        } catch (g) {
            var d;
            RD(6, a, null == (d = g) ? void 0 : d.message);
            return {
                Fb: null,
                success: !1
            }
        }
        if (!c)
            return {
                Fb: null,
                success: !0
            };
        try {
            var e = Tu(c);
            this.cache[a] = e;
            return {
                Fb: e,
                success: !0
            }
        } catch (g) {
            var f;
            RD(5, a, null == (f = g) ? void 0 : f.message);
            return {
                Fb: null,
                success: !1
            }
        }
    }
    ;
    TD.prototype.set = function(a, b) {
        var c = jf(a, 1)
          , d = "_GESPSK-" + c;
        Su(a);
        try {
            b.setItem(d, vf(a))
        } catch (f) {
            var e;
            RD(7, c, null == (e = f) ? void 0 : e.message);
            return !1
        }
        this.cache[c] = a;
        return !0
    }
    ;
    TD.prototype.remove = function(a, b) {
        a = jf(a, 1);
        try {
            b.removeItem("_GESPSK-" + a),
            delete this.cache[a]
        } catch (d) {
            var c;
            RD(8, a, null == (c = d) ? void 0 : c.message)
        }
    }
    ;
    var UD = null;
    var XD = function() {
        P.apply(this, arguments);
        this.g = [];
        this.h = [];
        this.j = [];
        this.o = []
    };
    u(XD, P);
    var YD = function(a, b) {
        a.h.push({
            Xd: !1,
            ce: b
        })
    };
    XD.prototype.L = function() {
        this.g.length = 0;
        this.j.length = 0;
        this.h.length = 0;
        this.o.length = 0;
        P.prototype.L.call(this)
    }
    ;
    var ZD = function() {
        var a = this;
        this.promise = new Promise(function(b, c) {
            a.resolve = b;
            a.reject = c
        }
        )
    };
    var $D = function(a) {
        a = Error.call(this, a);
        this.message = a.message;
        "stack"in a && (this.stack = a.stack);
        Object.setPrototypeOf(this, $D.prototype);
        this.name = "InputError"
    };
    u($D, Error);
    var aE = function() {
        this.fb = !1
    }
      , bE = function() {
        aE.apply(this, arguments);
        this.Nc = new ZD
    };
    u(bE, aE);
    var cE = function(a, b) {
        a.fb || (a.fb = !0,
        a.Mc = b,
        a.Nc.resolve(b))
    };
    ea.Object.defineProperties(bE.prototype, {
        promise: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.Nc.promise
            }
        },
        we: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.fb
            }
        },
        error: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.qd
            }
        }
    });
    var dE = function() {
        bE.apply(this, arguments)
    };
    u(dE, bE);
    var eE = function(a, b) {
        cE(a, b)
    }
      , fE = function(a, b) {
        b.then(function(c) {
            cE(a, c)
        })
    };
    dE.prototype.jb = function(a) {
        this.fb || (this.fb = !0,
        this.Mc = null,
        this.qd = a,
        this.Nc.reject(a))
    }
    ;
    var gE = function(a) {
        this.fb = !1;
        this.g = a
    };
    u(gE, aE);
    gE.prototype.we = function() {
        return this.g.fb
    }
    ;
    ea.Object.defineProperties(gE.prototype, {
        error: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.g.qd
            }
        }
    });
    var hE = function(a) {
        gE.call(this, a);
        this.g = a
    };
    u(hE, gE);
    ea.Object.defineProperties(hE.prototype, {
        value: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.g.Mc
            }
        }
    });
    var iE = function(a) {
        gE.call(this, a);
        this.g = a
    };
    u(iE, gE);
    ea.Object.defineProperties(iE.prototype, {
        value: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                var a;
                return null != (a = this.g.Mc) ? a : null
            }
        }
    });
    var jE = function() {
        bE.apply(this, arguments)
    };
    u(jE, bE);
    jE.prototype.notify = function() {
        cE(this, null)
    }
    ;
    function kE(a, b) {
        var c, d;
        return Ia(function(e) {
            if (1 == e.g)
                return c = b ? a.filter(function(f) {
                    return !f.Xd
                }) : a,
                ya(e, Promise.all(c.map(function(f) {
                    return f.ce.promise
                })), 2);
            if (a.length === c.length)
                return e.return();
            d = a.filter(function(f) {
                return f.Xd
            });
            return ya(e, Promise.race([Promise.all(d.map(function(f) {
                return f.ce.promise
            })), new Promise(function(f) {
                return void setTimeout(f, b)
            }
            )]), 0)
        })
    }
    var lE = function(a, b, c) {
        P.call(this);
        this.id = a;
        this.timeoutMs = b;
        this.o = c;
        this.A = !1;
        this.g = new XD;
        uo(this, this.g)
    };
    u(lE, P);
    lE.prototype.start = function() {
        var a = this, b;
        return Ia(function(c) {
            if (1 == c.g) {
                if (a.A)
                    return c.return();
                a.A = !0;
                c.j = 2;
                return ya(c, kE(a.g.h, a.timeoutMs), 4)
            }
            if (2 != c.g) {
                if (!a.Aa()) {
                    for (var d = 0, e = r(a.g.j), f = e.next(); !f.done; f = e.next()) {
                        if (null == f.value.g.Mc)
                            throw Error("missing input: " + a.id + "/" + d);
                        ++d
                    }
                    a.h()
                }
                return za(c)
            }
            b = Aa(c);
            if (a.Aa())
                return c.return();
            if (!(b instanceof $D) && b instanceof Error && (a.o ? a.o(a.id, b) : a.B(a.id, b),
            !a.o && a.g.g.length))
                for (d = new $D(b.message),
                e = r(a.g.g),
                f = e.next(); !f.done; f = e.next())
                    if (f = f.value,
                    !f.we) {
                        var g = d;
                        f.fb = !0;
                        f.qd = g;
                        f.Nc.reject(g)
                    }
            c.g = 0
        })
    }
    ;
    var mE = function(a) {
        var b = void 0 === b ? new dE : b;
        a.g.g.push(b);
        return b
    }
      , nE = function(a) {
        var b = void 0 === b ? new jE : b;
        a.g.g.push(b);
        return b
    }
      , oE = function(a, b) {
        YD(a.g, b);
        b = new hE(b);
        a.g.j.push(b);
        return b
    }
      , pE = function(a, b) {
        YD(a.g, b);
        return new iE(b)
    };
    var qE = function(a, b) {
        lE.call(this, a);
        this.id = a;
        this.B = b
    };
    u(qE, lE);
    function rE(a, b) {
        return df(a, Qu, 2).some(function(c) {
            return jf(c, 1) === b && null != jf(c, 2)
        })
    }
    ;function sE(a) {
        var b = new Wu;
        if (a) {
            var c = []
              , d = RegExp("^_GESPSK-(.+)$");
            try {
                for (var e = 0; e < a.length; e++) {
                    var f = (d.exec(a.key(e)) || [])[1];
                    f && c.push(f)
                }
            } catch (g) {}
            c = r(c);
            e = c.next();
            for (d = {}; !e.done; d = {
                wc: void 0
            },
            e = c.next())
                d.wc = e.value,
                (e = VD().get(d.wc, a).Fb) && !rE(b, d.wc) && (f = WD(e),
                2 !== f && 3 !== f && (sf(e, 9, !1),
                f = jf(e, 2),
                gf(b, 2, Qu, e),
                e = {},
                RD(19, d.wc, null, (e.hs = f ? "1" : "0",
                e))))
        }
        if (!df(b, Qu, 2).length)
            return null;
        RD(50, "");
        return Pc(b.g(), 3)
    }
    ;var tE = {
        Ee: !1
    };
    var uE = function() {
        P.call(this);
        this.o = [];
        this.A = [];
        this.l = {};
        this.g = [];
        this.h = new ZD;
        this.j = {}
    };
    u(uE, P);
    var vE = function(a, b) {
        uo(a, b);
        a.o.push(b)
    }
      , wE = function(a, b) {
        b = r(b);
        for (var c = b.next(); !c.done; c = b.next())
            vE(a, c.value)
    }
      , xE = function(a) {
        var b, c, d, e, f, g, h, k, m, n, q, t;
        Ia(function(v) {
            switch (v.g) {
            case 1:
                if (!a.g.length) {
                    v.g = 2;
                    break
                }
                return ya(v, Promise.all(a.g.map(function(x) {
                    return x.h.promise
                })), 2);
            case 2:
                b = r(a.o);
                for (c = b.next(); !c.done; c = b.next())
                    d = c.value,
                    d.start();
                e = r(a.A);
                for (f = e.next(); !f.done; f = e.next())
                    g = f.value,
                    xE(g);
                if (!a.j) {
                    v.g = 4;
                    break
                }
                h = Object.keys(a.j);
                if (!h.length) {
                    v.g = 4;
                    break
                }
                return ya(v, Promise.all(Object.values(a.j).map(function(x) {
                    return x.promise
                })), 6);
            case 6:
                for (k = v.h,
                m = 0,
                n = r(h),
                q = n.next(); !q.done; q = n.next())
                    t = q.value,
                    a.l[t] = k[m++];
            case 4:
                return a.h.resolve(a.l),
                v.return(a.h.promise)
            }
        })
    };
    uE.prototype.run = function() {
        xE(this)
    }
    ;
    uE.prototype.L = function() {
        P.prototype.L.call(this);
        this.o.length = 0;
        this.A.length = 0;
        this.g.length = 0
    }
    ;
    var yE = function(a, b, c, d) {
        qE.call(this, 1041, d);
        this.storage = b;
        this.l = oE(this, a);
        c && (this.j = pE(this, c))
    };
    u(yE, qE);
    yE.prototype.h = function() {
        var a = this.l.value, b, c, d = null != (c = this.storage) ? c : null == (b = this.j) ? void 0 : b.value;
        d && VD().set(a, d) && null != jf(a, 2) && RD(27, jf(a, 1))
    }
    ;
    var zE = function(a, b) {
        qE.call(this, 1094, b);
        this.j = nE(this);
        this.l = oE(this, a)
    };
    u(zE, qE);
    zE.prototype.h = function() {
        var a = this.l.value;
        if (a) {
            if (void 0 !== a)
                for (var b = r(Object.keys(a)), c = b.next(); !c.done; c = b.next())
                    if (c = c.value,
                    c.startsWith("_GESPSK"))
                        try {
                            a.removeItem(c)
                        } catch (d) {}
            UD = new TD;
            this.j.notify()
        }
    }
    ;
    var AE = function(a, b) {
        qE.call(this, 1048, b);
        this.j = mE(this);
        this.l = mE(this);
        this.D = oE(this, a)
    };
    u(AE, qE);
    AE.prototype.h = function() {
        var a = this.D.value
          , b = function(c) {
            var d = {};
            RD(c, jf(a, 1), null, (d.tic = String(Math.round((Date.now() - hf(a, 3)) / 6E4)),
            d))
        };
        switch (WD(a)) {
        case 0:
            b(24);
            break;
        case 1:
            b(25);
            cE(this.l, a);
            break;
        case 2:
            b(26);
            cE(this.j, a);
            break;
        case 3:
            RD(9, jf(a, 1));
            cE(this.j, a);
            break;
        case 4:
            b(23),
            cE(this.j, a)
        }
    }
    ;
    var BE = function(a, b, c) {
        qE.call(this, 1027, c);
        this.jc = a;
        this.storage = b;
        this.j = mE(this);
        this.l = mE(this)
    };
    u(BE, qE);
    BE.prototype.h = function() {
        var a = VD().get(this.jc, this.storage).Fb;
        if (!a) {
            a = Su(Ru(this.jc));
            var b = this.l
              , c = a.jb(Ou(100));
            cE(b, c)
        }
        cE(this.j, a)
    }
    ;
    var CE = function(a, b, c) {
        qE.call(this, 1046, c);
        this.output = nE(this);
        this.j = mE(this);
        this.l = oE(this, b);
        YD(this.g, a)
    };
    u(CE, qE);
    CE.prototype.h = function() {
        cE(this.j, this.l.value)
    }
    ;
    var DE = function(a, b, c) {
        qE.call(this, 1047, c);
        this.collectorFunction = a;
        this.j = mE(this);
        this.l = mE(this);
        this.D = mE(this);
        this.F = oE(this, b)
    };
    u(DE, qE);
    DE.prototype.h = function() {
        var a = this
          , b = this.F.value
          , c = jf(b, 1);
        RD(18, c);
        try {
            var d = pi();
            this.collectorFunction().then(function(e) {
                RD(29, c, null, {
                    delta: String(pi() - d)
                });
                var f = a.j
                  , g = tf(b, 2, e);
                cE(f, g);
                cE(a.D, null != e ? e : null)
            }).catch(function(e) {
                RD(28, c, EE(e));
                e = a.l;
                var f = b.jb(Ou(106));
                cE(e, f)
            })
        } catch (e) {
            RD(1, c, EE(e)),
            eE(this.l, b.jb(Ou(107)))
        }
    }
    ;
    function EE(a) {
        return "string" === typeof a ? a : a instanceof Error ? a.message : null
    }
    ;var FE = function(a, b) {
        qE.call(this, 1028, b);
        this.j = mE(this);
        this.l = oE(this, a)
    };
    u(FE, qE);
    FE.prototype.h = function() {
        var a = this.l.value
          , b = jf(a, 1);
        null != hf(a, 3) || RD(35, b);
        cE(this.j, a)
    }
    ;
    var GE = function(a, b, c, d, e) {
        qE.call(this, 1050, e);
        this.F = c;
        this.D = d;
        this.j = mE(this);
        this.l = oE(this, a);
        this.G = pE(this, b)
    };
    u(GE, qE);
    GE.prototype.h = function() {
        var a = this.l.value
          , b = jf(a, 1)
          , c = this.G.value;
        if (null == c)
            RD(41, b),
            a.jb(Ou(111)),
            cE(this.j, a);
        else if ("string" !== typeof c)
            RD(21, b),
            b = this.j,
            a = a.jb(Ou(113)),
            cE(b, a);
        else {
            if (c.length > (/^(\d+)$/.test(b) ? this.D : this.F)) {
                var d = {};
                RD(12, b, null, (d.sl = String(c.length),
                d));
                b = a.jb(Ou(108));
                Se(b, 2)
            } else
                c.length || RD(20, b),
                Se(a, 10);
            cE(this.j, a)
        }
    }
    ;
    var HE = function(a) {
        qE.call(this, 1046, a);
        this.output = nE(this)
    };
    u(HE, qE);
    HE.prototype.h = function() {
        var a = this;
        SD().then(function() {
            a.output.notify()
        })
    }
    ;
    function IE(a, b, c, d, e, f) {
        f = void 0 === f ? tE : f;
        var g, h, k, m, n, q, t, v, x, H, T, la, da;
        return Ia(function(K) {
            return 1 == K.g ? (g = new uE,
            h = new BE(a,c,e),
            vE(g, h),
            vE(g, new yE(h.l,void 0,d,e)),
            k = new FE(h.j,e),
            vE(g, k),
            m = new AE(k.j,e),
            vE(g, m),
            n = new DE(b,m.j,e),
            vE(g, n),
            vE(g, new yE(n.l,void 0,d,e)),
            q = new GE(n.j,n.D,f.Ee ? 1024 : 300,f.Ee ? 1024 : 1E3,e),
            vE(g, q),
            vE(g, new yE(q.j,void 0,d,e)),
            t = new HE(e),
            vE(g, t),
            v = new CE(t.output,m.l,e),
            vE(g, v),
            x = new DE(b,v.j,e),
            vE(g, x),
            H = new yE(x.j,void 0,d,e),
            vE(g, H),
            g.run(),
            da = a,
            ya(K, q.j.promise, 2)) : K.return({
                id: da,
                collectorGeneratedData: null != (la = null == (T = K.h) ? void 0 : jf(T, 2)) ? la : null
            })
        })
    }
    ;var JE = function(a, b, c, d, e) {
        e = void 0 === e ? tE : e;
        qE.call(this, 1059, d);
        this.G = b;
        this.F = c;
        this.l = e;
        this.j = mE(this);
        this.I = oE(this, a);
        this.D = pE(this, c)
    };
    u(JE, qE);
    JE.prototype.h = function() {
        var a = this.D.value;
        if (a) {
            var b = this.I.value, c = b.id, d = b.collectorFunction, e;
            b = null != (e = b.networkCode) ? e : c;
            c = {};
            RD(42, b, null, (c.ea = String(Number(this.G)),
            c));
            fE(this.j, IE(b, d, a, this.F, this.B, this.l))
        }
    }
    ;
    var KE = function(a, b) {
        qE.call(this, 1057, b);
        this.j = a;
        this.l = mE(this);
        this.D = mE(this)
    };
    u(KE, qE);
    KE.prototype.h = function() {
        if (this.j)
            if ("object" !== typeof this.j)
                RD(46, "UNKNOWN_COLLECTOR_ID"),
                LE(this, "UNKNOWN_COLLECTOR_ID", 112);
            else {
                var a = this.j.id
                  , b = this.j.networkCode;
                a && b && (delete this.j.id,
                RD(47, a + ";" + b));
                a = null != b ? b : a;
                "string" !== typeof a ? (b = {},
                RD(37, "INVALID_COLLECTOR_ID", null, (b.ii = JSON.stringify(a),
                b)),
                LE(this, "INVALID_COLLECTOR_ID", 102)) : "function" !== typeof this.j.collectorFunction ? (RD(14, a),
                LE(this, a, 105)) : C(tg).g(Wv.g, Wv.defaultValue).includes(a) ? (RD(22, a),
                LE(this, a, 104)) : cE(this.D, this.j)
            }
        else
            RD(39, "UNKNOWN_COLLECTOR_ID"),
            LE(this, "UNKNOWN_COLLECTOR_ID", 110)
    }
    ;
    var LE = function(a, b, c) {
        a = a.l;
        b = Ru(b).jb(Ou(c));
        cE(a, b)
    };
    var ME = function(a, b, c, d, e) {
        var f = document;
        f = void 0 === f ? document : f;
        e = void 0 === e ? tE : e;
        this.g = b;
        this.j = c;
        this.o = f;
        this.K = d;
        this.H = e;
        this.B = [];
        this.A = [];
        this.l = [];
        this.h = 0;
        a = r(a);
        for (b = a.next(); !b.done; b = a.next())
            this.push(b.value)
    };
    ME.prototype.push = function(a) {
        var b = this;
        this.j || this.K();
        var c = function(f, g) {
            return void NE(b, f, g)
        };
        a = new KE(a,c);
        var d = new yE(a.l,void 0,this.g,c);
        c = new JE(a.D,this.j,this.g,c,this.H);
        var e = new uE;
        wE(e, [a, d, c]);
        e.run();
        a = c.j.promise;
        this.B.push(a);
        d = r(this.A);
        for (c = d.next(); !c.done; c = d.next())
            a.then(c.value)
    }
    ;
    ME.prototype.addOnSignalResolveCallback = function(a) {
        this.A.push(a);
        for (var b = r(this.B), c = b.next(); !c.done; c = b.next())
            c.value.then(a)
    }
    ;
    ME.prototype.addErrorHandler = function(a) {
        this.l.push(a)
    }
    ;
    ME.prototype.clearAllCache = function() {
        var a = this
          , b = this.o.currentScript instanceof HTMLScriptElement ? this.o.currentScript.src : "";
        if (1 === this.h) {
            var c = {};
            RD(49, "", null, (c.url = b,
            c))
        } else if (c = String(bi(null != b ? b : "")),
        C(tg).g(Vv.g, Vv.defaultValue).includes(c))
            c = {},
            RD(48, "", null, (c.url = b,
            c));
        else {
            var d = new uE;
            c = new zE(this.g,function(e, f) {
                return void NE(a, e, f)
            }
            );
            vE(d, c);
            d.run();
            this.h = 1;
            setTimeout(function() {
                a.h = 0
            }, 1E3 * ug());
            d = {};
            RD(43, "", null, (d.url = b,
            d));
            return c.j.promise
        }
    }
    ;
    var NE = function(a, b, c) {
        a = r(a.l);
        for (var d = a.next(); !d.done; d = a.next())
            d = d.value,
            d(b, c)
    }
      , OE = function(a) {
        this.push = function(b) {
            a.push(b)
        }
        ;
        this.addOnSignalResolveCallback = function(b) {
            a.addOnSignalResolveCallback(b)
        }
        ;
        this.addErrorHandler = function(b) {
            a.addErrorHandler(b)
        }
        ;
        this.clearAllCache = function() {
            a.clearAllCache()
        }
    };
    function PE(a, b, c, d, e, f) {
        f = void 0 === f ? tE : f;
        Yh() !== Zh() ? RD(16, "") : QE(a, "encryptedSignalProviders", c, e) && QE(a, "secureSignalProviders", c, e) || (RD(38, ""),
        RE(a, "encryptedSignalProviders", b, f, c, d, e),
        RE(a, "secureSignalProviders", b, f, c, function() {}, e))
    }
    function QE(a, b, c, d) {
        if (void 0 === a[b] || a[b]instanceof Array)
            return !1;
        a = a[b];
        d && a.addOnSignalResolveCallback(d);
        a.addErrorHandler(c);
        return !0
    }
    function RE(a, b, c, d, e, f, g) {
        var h, k = new ME(null != (h = a[b]) ? h : [],c,"secureSignalProviders" === b,f,d);
        a[b] = new OE(k);
        g && k.addOnSignalResolveCallback(g);
        k.addErrorHandler(e)
    }
    function SE(a, b, c, d, e) {
        var f = void 0 === f ? tE : f;
        var g = new dE;
        cE(g, b);
        PE(a, g, c, d, e, f)
    }
    function TE(a, b, c, d) {
        var e = UE
          , f = new Map;
        b = b.map(function(g) {
            var h = g.jc;
            return new Promise(function(k) {
                f.set(h, k)
            }
            )
        });
        SE(a, c, d, e, function(g) {
            var h = g.collectorGeneratedData;
            g = g.id;
            var k;
            return void (null == (k = f.get(g)) ? void 0 : k({
                collectorGeneratedData: h,
                id: g
            }))
        });
        return b
    }
    ;function VE() {
        var a;
        return null != (a = w.googletag) ? a : w.googletag = {
            cmd: []
        }
    }
    ;function WE(a) {
        if (!a || JC(a))
            return null;
        try {
            return window.localStorage
        } catch (b) {
            return null
        }
    }
    function XE(a, b) {
        (a = WE(a)) && SE(VE(), a, function() {}, UE, b)
    }
    function YE(a, b) {
        return (b = WE(b)) && 0 !== a.length ? TE(VE(), a, b, function() {}) : null
    }
    function UE() {}
    ;function ZE(a, b, c, d) {
        var e = new ZD
          , f = ""
          , g = function(k) {
            try {
                var m = "object" === typeof k.data ? k.data : JSON.parse(k.data);
                f === m.paw_id && (sg(a, "message", g),
                m.error ? e.reject(Error(m.error)) : e.resolve(d(m)))
            } catch (n) {}
        }
          , h = $E(a);
        return h ? (rg(a, "message", g),
        f = c(h),
        e.promise) : (c = aF(a)) ? (f = String(Math.floor(2147483647 * $h())),
        rg(a, "message", g),
        b(c, f),
        e.promise) : null
    }
    function bF(a) {
        return ZE(a, function(b, c) {
            var d, e;
            return void (null == (d = null != (e = b.getGmaQueryInfo) ? e : b.getGmaSig) ? void 0 : d.postMessage(c))
        }, function(b) {
            return b.getQueryInfo()
        }, function(b) {
            return b.signal
        })
    }
    function cF() {
        var a = window;
        return !!$E(a) || !!aF(a)
    }
    function $E(a) {
        var b;
        if ("function" === typeof (null == (b = a.gmaSdk) ? void 0 : b.getQueryInfo))
            return a.gmaSdk
    }
    function aF(a) {
        var b, c, d, e, f, g;
        if ("function" === typeof (null == (b = a.webkit) ? void 0 : null == (c = b.messageHandlers) ? void 0 : null == (d = c.getGmaQueryInfo) ? void 0 : d.postMessage) || "function" === typeof (null == (e = a.webkit) ? void 0 : null == (f = e.messageHandlers) ? void 0 : null == (g = f.getGmaSig) ? void 0 : g.postMessage))
            return a.webkit.messageHandlers
    }
    ;var dF = function() {
        this.timeoutMs = 500;
        this.h = bF;
        this.signal = null;
        this.g = 0
    }
      , eF = function(a) {
        if (L(ol) || !cF())
            return Promise.resolve(null);
        var b;
        return (null != (b = a.h(window)) ? b : Promise.resolve(null)).catch(function() {
            return "0"
        })
    }
      , gF = function(a) {
        var b;
        return Ia(function(c) {
            if (1 == c.g)
                return b = Date.now() - a.g,
                !a.signal || 3E5 < b ? c = ya(c, fF(a), 3) : (c.g = 2,
                c = void 0),
                c;
            2 != c.g && (a.signal = c.h,
            a.g = Date.now());
            return c.return(a.signal)
        })
    }
      , fF = function(a) {
        return Promise.race([eF(a).then(function(b) {
            if (null == b)
                return null;
            a.signal = 1E4 < b.length ? "0" : b;
            a.g = Date.now();
            return a.signal
        }), Qt(a.timeoutMs, "0")])
    };
    function Jj(a, b) {
        return b instanceof RegExp ? "__REGEXP" + b.toString() : b
    }
    function hF(a, b) {
        return b && 0 === b.toString().indexOf("__REGEXP") ? (a = b.split("__REGEXP")[1].match(/\/(.*)\/(.*)?/),
        new RegExp(a[1],a[2] || "")) : b
    }
    var iF = function(a, b) {
        yD.call(this, b);
        this.l = a;
        this.g = null;
        this.A = new Jx(this);
        this.A.N(E(), "message", this.B)
    };
    u(iF, yD);
    var jF = function(a) {
        if (null == a || "string" !== typeof a || !a.startsWith("ima://"))
            return null;
        a = a.substr(6);
        try {
            return JSON.parse(a, hF)
        } catch (b) {
            return null
        }
    };
    iF.prototype.sendMessage = function(a, b, c) {
        if (null != this.g && null != this.g.postMessage) {
            var d = this.g
              , e = d.postMessage
              , f = {};
            f.name = a;
            f.type = b;
            null != c && (f.data = c);
            f.sid = this.sessionId;
            f.channel = this.l;
            a = [];
            Lj(new Kj, f, a);
            e.call(d, "ima://" + a.join(""), "*")
        }
        null != this.g && null == this.g.postMessage && X.g().report(11)
    }
    ;
    iF.prototype.L = function() {
        so(this.A);
        this.g = null;
        yD.prototype.L.call(this)
    }
    ;
    iF.prototype.B = function(a) {
        a = a.g;
        var b = jF(a.data);
        if (kF(this, b)) {
            if (null === this.g)
                this.g = a.source,
                this.h || this.connect();
            else if (this.g !== a.source)
                return;
            kF(this, b) && this.dispatchEvent(new AD(b.name,b.type,b.data || {},b.sid,a.origin))
        }
    }
    ;
    var kF = function(a, b) {
        if (null == b)
            return !1;
        var c = b.channel;
        if (null == c || c !== a.l)
            return !1;
        b = b.sid;
        return null == b || "*" !== a.sessionId && b !== a.sessionId ? !1 : !0
    };
    var lF = function() {
        Q.call(this);
        this.F = !1;
        this.g = null;
        this.A = this.D = this.M = !1;
        this.h = 0;
        this.l = [];
        this.B = !1;
        this.U = this.O = Infinity;
        this.j = 0;
        this.G = {};
        this.I = new Jx(this);
        uo(this, this.I)
    };
    u(lF, Q);
    var nF = function(a, b) {
        null == b || a.F || (a.g = b,
        mF(a),
        a.F = !0)
    }
      , pF = function(a) {
        null != a.g && a.F && (oF(a),
        a.F = !1,
        a.D = !1,
        a.A = !1,
        a.h = 0,
        a.l = [],
        a.B = !1)
    }
      , mF = function(a) {
        oF(a);
        !(a.g instanceof Q) && "ontouchstart"in document.documentElement && wc ? (a.G = {
            touchstart: function(b) {
                a.D = !0;
                a.h = b.touches.length;
                a.j && (window.clearTimeout(a.j),
                a.j = 0,
                a.M = !0);
                a.B = qF(a, b.touches) || 1 !== b.touches.length;
                a.B ? (a.O = Infinity,
                a.U = Infinity) : (a.O = b.touches[0].clientX,
                a.U = b.touches[0].clientY);
                b = b.touches;
                a.l = [];
                for (var c = 0; c < b.length; c++)
                    a.l.push(b[c].identifier)
            },
            touchmove: function(b) {
                a.h = b.touches.length;
                if (!mx(8) || Math.pow(b.changedTouches[0].clientX - a.O, 2) + Math.pow(b.changedTouches[0].clientY - a.U, 2) > Math.pow(5, 2))
                    a.A = !0
            },
            touchend: function(b) {
                return void rF(a, b)
            }
        },
        xg(a.G, function(b, c) {
            a.g.addEventListener(c, b, !1)
        })) : a.I.N(a.g, "click", a.V)
    }
      , oF = function(a) {
        a.I.vb(a.g, "click", a.V);
        xg(a.G, function(b, c) {
            this.g.removeEventListener(c, b, !1)
        }, a);
        a.G = {}
    }
      , rF = function(a, b) {
        !a.D || 1 !== a.h || a.A || a.M || a.B || !qF(a, b.changedTouches) || (a.j = window.setTimeout(function() {
            return void sF(a)
        }, 300));
        a.h = b.touches.length;
        0 === a.h && (a.D = !1,
        a.A = !1,
        a.l = []);
        a.M = !1
    };
    lF.prototype.V = function() {
        sF(this)
    }
    ;
    var qF = function(a, b) {
        for (var c = 0; c < b.length; c++)
            if (a.l.includes(b[c].identifier))
                return !0;
        return !1
    }
      , sF = function(a) {
        a.j = 0;
        a.dispatchEvent(new Js("click"))
    };
    lF.prototype.L = function() {
        pF(this);
        Q.prototype.L.call(this)
    }
    ;
    var tF = gC().toString();
    function uF(a) {
        return "number" === typeof a ? a.toString() : ""
    }
    ;var vF = function() {
        var a;
        this.j = a = void 0 === a ? new Py : a;
        this.g = new ZD;
        this.h = !1
    }
      , xF = function(a) {
        if (!a.h) {
            a.h = !0;
            var b = wF();
            a.j.get({
                url: b,
                timeout: new Cx(6E4),
                withCredentials: !1
            }).then(function(c) {
                c = JSON.stringify(c);
                a.g.resolve(Mu(c))
            }).catch(function(c) {
                X.g().report(189, {
                    errorCode: c.errorCode,
                    httpStatus: c.g,
                    message: c.message
                }, !0);
                a.g.resolve(null)
            })
        }
    };
    vF.prototype.getConfig = function() {
        this.h || xF(this);
        return this.g.promise
    }
    ;
    var wF = function() {
        var a = kD();
        return Pw(new R("https://securepubads.g.doubleclick.net/pagead/ima_ppub_config"), "ippd", a).toString()
    }
      , yF = new vF;
    var zF = "abort canplay canplaythrough durationchange emptied loadstart loadeddata loadedmetadata progress ratechange seeked seeking stalled suspend waiting".split(" ");
    var AF = function(a, b) {
        P.call(this);
        this.g = a;
        this.timeoutMs = b;
        uo(this, this.g)
    };
    u(AF, P);
    var CF = function(a) {
        if (!fw(a.g.caller))
            return Promise.resolve(null);
        var b = new ZD
          , c = null;
        a.g.addEventListener(function(e) {
            if (1 === e.pingData.internalErrorState)
                b.resolve(null);
            else if ("listenerRegistered" === e.eventName)
                c = e.listenerId,
                1 === e.pingData.applicableSections.length && -1 === e.pingData.applicableSections[0] && b.resolve(new BF("","-1"));
            else if ("signalStatus" === e.eventName && "ready" === e.data) {
                e = e.pingData;
                var f, g = (null != (f = e.applicableSections) ? f : []).join("_");
                b.resolve(new BF(e.gppString,g))
            }
        });
        var d = new Promise(function(e) {
            setTimeout(function() {
                e(null)
            }, a.timeoutMs)
        }
        );
        d = Promise.race([b.promise, d]);
        d.then(function() {
            null !== c && a.g.removeEventListener(c)
        });
        return d
    }
      , BF = function(a, b) {
        this.gppString = a;
        this.sid = b
    };
    var DF = ha(["https://pagead2.googlesyndication.com/omsdk/releases/live/omweb-v1.js"])
      , EF = ha(["https://pagead2.googlesyndication.com/omsdk/releases/control/omweb-v1.js"])
      , FF = ha(["https://pagead2.googlesyndication.com/omsdk/releases/canary/omweb-v1.js"])
      , GF = ha(["https://pagead2.googlesyndication.com/omsdk/releases/experimental/omweb-v1.js"])
      , HF = ej(DF)
      , IF = ej(EF)
      , JF = ej(FF)
      , KF = ej(GF);
    function LF(a) {
        return (a = Dh(a)) && a.omidSessionInterface ? a.omidSessionInterface : null
    }
    function MF(a) {
        var b, c, d, e, f, g;
        return Ia(function(h) {
            if (1 == h.g)
                return b = zh("IFRAME", {
                    sandbox: "allow-scripts allow-same-origin",
                    style: "display: none"
                }),
                c = new Promise(function(k) {
                    b.addEventListener("load", function() {
                        k()
                    })
                }
                ),
                a.appendChild(b),
                ya(h, c, 2);
            d = zh("SCRIPT");
            e = HF;
            L(Zk) ? e = IF : L($k) ? e = JF : L(al) && (e = KF);
            Th(d, e);
            f = new Promise(function(k, m) {
                d.addEventListener("load", function() {
                    LF(b) ? k(b) : m()
                })
            }
            );
            g = b.contentDocument || b.contentWindow.document;
            g.head.appendChild(d);
            return h.return(f)
        })
    }
    ;var NF = function(a, b) {
        Q.call(this);
        this.h = b;
        this.g = LF(a)
    };
    u(NF, Q);
    var PF = function(a) {
        try {
            a.g && a.g.registerSessionObserver(function(b) {
                "sessionStart" === b.type ? OF(a, a.h) : "sessionFinish" === b.type && PF(a)
            })
        } catch (b) {
            a.dispatchEvent(new Event("error"))
        }
    }
      , OF = function(a, b) {
        b instanceof GB && (b = b.R);
        var c;
        if ("AUDIO" !== (null == (c = b.tagName) ? void 0 : c.toUpperCase()))
            try {
                a.g && a.g.setVideoElement(b)
            } catch (d) {
                a.dispatchEvent(new Event("error"))
            }
    }
      , QF = function(a, b) {
        try {
            a.g && a.g.setSessionClientWindow(b)
        } catch (c) {
            a.dispatchEvent(new Event("error"))
        }
    };
    var RF = function(a) {
        this.data = a
    };
    l = RF.prototype;
    l.getTotalAds = function() {
        return this.data.totalAds
    }
    ;
    l.getMaxDuration = function() {
        return this.data.maxDuration
    }
    ;
    l.getAdPosition = function() {
        return this.data.adPosition
    }
    ;
    l.getPodIndex = function() {
        return this.data.podIndex
    }
    ;
    l.getTimeOffset = function() {
        return this.data.timeOffset
    }
    ;
    l.getIsBumper = function() {
        return this.data.isBumper
    }
    ;
    RF.prototype.getIsBumper = RF.prototype.getIsBumper;
    RF.prototype.getTimeOffset = RF.prototype.getTimeOffset;
    RF.prototype.getPodIndex = RF.prototype.getPodIndex;
    RF.prototype.getAdPosition = RF.prototype.getAdPosition;
    RF.prototype.getMaxDuration = RF.prototype.getMaxDuration;
    RF.prototype.getTotalAds = RF.prototype.getTotalAds;
    var SF = function(a) {
        this.data = a
    };
    l = SF.prototype;
    l.getContent = function() {
        return this.data.content
    }
    ;
    l.getContentType = function() {
        return this.data.contentType
    }
    ;
    l.getWidth = function() {
        return this.getSize().width
    }
    ;
    l.getHeight = function() {
        return this.getSize().height
    }
    ;
    l.getAdSlotId = function() {
        return this.data.adSlotId
    }
    ;
    l.getSize = function() {
        return this.data.size
    }
    ;
    l.he = function() {
        return this.data.resourceType
    }
    ;
    var KD = function(a) {
        return (a = a.data.backupCompanions) ? a.map(function(b) {
            return new SF(b)
        }) : []
    };
    SF.prototype.getAdSlotId = SF.prototype.getAdSlotId;
    SF.prototype.getHeight = SF.prototype.getHeight;
    SF.prototype.getWidth = SF.prototype.getWidth;
    SF.prototype.getContentType = SF.prototype.getContentType;
    SF.prototype.getContent = SF.prototype.getContent;
    var TF = function(a, b) {
        this.h = a;
        this.g = b
    };
    TF.prototype.getAdIdValue = function() {
        return this.h
    }
    ;
    TF.prototype.getAdIdRegistry = function() {
        return this.g
    }
    ;
    TF.prototype.getAdIdRegistry = TF.prototype.getAdIdRegistry;
    TF.prototype.getAdIdValue = TF.prototype.getAdIdValue;
    var Y = function(a) {
        this.data = a
    };
    Y.prototype.getAdId = function() {
        return this.data.adId
    }
    ;
    Y.prototype.getCreativeAdId = function() {
        return this.data.creativeAdId
    }
    ;
    Y.prototype.getCreativeId = function() {
        return this.data.creativeId
    }
    ;
    var UF = function(a) {
        return a.data.adQueryId
    };
    l = Y.prototype;
    l.getAdSystem = function() {
        return this.data.adSystem
    }
    ;
    l.getAdvertiserName = function() {
        return this.data.advertiserName
    }
    ;
    l.getApiFramework = function() {
        return this.data.apiFramework
    }
    ;
    l.getWrapperAdIds = function() {
        return this.data.adWrapperIds
    }
    ;
    l.getWrapperCreativeIds = function() {
        return this.data.adWrapperCreativeIds
    }
    ;
    l.getWrapperAdSystems = function() {
        return this.data.adWrapperSystems
    }
    ;
    l.isLinear = function() {
        return this.data.linear
    }
    ;
    l.isSkippable = function() {
        return this.data.skippable
    }
    ;
    l.getContentType = function() {
        return this.data.contentType
    }
    ;
    l.getDescription = function() {
        return this.data.description
    }
    ;
    l.getTitle = function() {
        return this.data.title
    }
    ;
    l.getDuration = function() {
        return this.data.duration
    }
    ;
    l.getVastMediaWidth = function() {
        return this.data.vastMediaWidth
    }
    ;
    l.getVastMediaHeight = function() {
        return this.data.vastMediaHeight
    }
    ;
    l.getWidth = function() {
        return this.data.width
    }
    ;
    l.getHeight = function() {
        return this.data.height
    }
    ;
    l.getUiElements = function() {
        return this.data.uiElements
    }
    ;
    l.getMinSuggestedDuration = function() {
        return this.data.minSuggestedDuration
    }
    ;
    l.getAdPodInfo = function() {
        return new RF(this.data.adPodInfo)
    }
    ;
    l.getCompanionAds = function(a, b, c) {
        if (!this.data.companions)
            return [];
        var d = this.data.companions.map(function(e) {
            return new SF(e)
        });
        return JD(new GD({
            size: new D(a,b),
            fe: c ? "SelectFluid" === c.sizeCriteria : !1
        },c), d)
    }
    ;
    l.getTraffickingParameters = function() {
        return Ax(eh(this.data.traffickingParameters))
    }
    ;
    l.getTraffickingParametersString = function() {
        return this.data.traffickingParameters
    }
    ;
    l.getVastMediaBitrate = function() {
        return this.data.vastMediaBitrate
    }
    ;
    l.getMediaUrl = function() {
        return this.data.mediaUrl
    }
    ;
    l.getSurveyUrl = function() {
        return this.data.surveyUrl
    }
    ;
    l.getDealId = function() {
        return this.data.dealId
    }
    ;
    l.getUniversalAdIds = function() {
        return (this.data.universalAdIds || []).map(function(a) {
            return new TF(a.adIdValue,a.adIdRegistry)
        })
    }
    ;
    l.getUniversalAdIdValue = function() {
        return this.data.universalAdIdValue
    }
    ;
    l.getUniversalAdIdRegistry = function() {
        return this.data.universalAdIdRegistry
    }
    ;
    l.getSkipTimeOffset = function() {
        return this.data.skipTimeOffset
    }
    ;
    l.oe = function() {
        return this.data.disableUi
    }
    ;
    Y.prototype.isUiDisabled = Y.prototype.oe;
    Y.prototype.getSkipTimeOffset = Y.prototype.getSkipTimeOffset;
    Y.prototype.getUniversalAdIdRegistry = Y.prototype.getUniversalAdIdRegistry;
    Y.prototype.getUniversalAdIdValue = Y.prototype.getUniversalAdIdValue;
    Y.prototype.getUniversalAdIds = Y.prototype.getUniversalAdIds;
    Y.prototype.getDealId = Y.prototype.getDealId;
    Y.prototype.getSurveyUrl = Y.prototype.getSurveyUrl;
    Y.prototype.getMediaUrl = Y.prototype.getMediaUrl;
    Y.prototype.getVastMediaBitrate = Y.prototype.getVastMediaBitrate;
    Y.prototype.getTraffickingParametersString = Y.prototype.getTraffickingParametersString;
    Y.prototype.getTraffickingParameters = Y.prototype.getTraffickingParameters;
    Y.prototype.getCompanionAds = Y.prototype.getCompanionAds;
    Y.prototype.getAdPodInfo = Y.prototype.getAdPodInfo;
    Y.prototype.getMinSuggestedDuration = Y.prototype.getMinSuggestedDuration;
    Y.prototype.getUiElements = Y.prototype.getUiElements;
    Y.prototype.getHeight = Y.prototype.getHeight;
    Y.prototype.getWidth = Y.prototype.getWidth;
    Y.prototype.getVastMediaHeight = Y.prototype.getVastMediaHeight;
    Y.prototype.getVastMediaWidth = Y.prototype.getVastMediaWidth;
    Y.prototype.getDuration = Y.prototype.getDuration;
    Y.prototype.getTitle = Y.prototype.getTitle;
    Y.prototype.getDescription = Y.prototype.getDescription;
    Y.prototype.getContentType = Y.prototype.getContentType;
    Y.prototype.isSkippable = Y.prototype.isSkippable;
    Y.prototype.isLinear = Y.prototype.isLinear;
    Y.prototype.getWrapperAdSystems = Y.prototype.getWrapperAdSystems;
    Y.prototype.getWrapperCreativeIds = Y.prototype.getWrapperCreativeIds;
    Y.prototype.getWrapperAdIds = Y.prototype.getWrapperAdIds;
    Y.prototype.getApiFramework = Y.prototype.getApiFramework;
    Y.prototype.getAdvertiserName = Y.prototype.getAdvertiserName;
    Y.prototype.getAdSystem = Y.prototype.getAdSystem;
    Y.prototype.getCreativeId = Y.prototype.getCreativeId;
    Y.prototype.getCreativeAdId = Y.prototype.getCreativeAdId;
    Y.prototype.getAdId = Y.prototype.getAdId;
    var VF = function(a) {
        this.g = a
    };
    VF.prototype.getCuePoints = function() {
        return this.g
    }
    ;
    VF.prototype.getCuePoints = VF.prototype.getCuePoints;
    var XF = function() {
        this.useLearnMoreButton = this.disableUi = this.disableClickThrough = !1;
        this.autoAlign = this.useVideoAdUi = !0;
        this.bitrate = -1;
        this.enablePreloading = !1;
        this.loadVideoTimeout = WF;
        this.mimeTypes = null;
        this.playAdsAfterTime = -1;
        this.restoreCustomPlaybackStateOnAdBreakComplete = !1;
        this.uiElements = null;
        this.useStyledNonLinearAds = this.useStyledLinearAds = !1
    }
      , YF = function(a, b) {
        var c = {};
        Object.assign(c, a);
        b && (c.disableClickThrough = !0);
        return c
    };
    XF.prototype.append = function(a) {
        if (a) {
            var b = a.autoAlign;
            null != b && (this.autoAlign = b);
            b = jh(a.bitrate);
            "number" === typeof b && !isNaN(b) && 0 < b && (this.bitrate = b);
            this.disableClickThrough = a.disableClickThrough || this.disableClickThrough;
            this.disableUi = a.disableUi || this.disableUi;
            this.enablePreloading = a.enablePreloading || this.enablePreloading;
            (b = a.mimeTypes) && 0 !== b.length && (this.mimeTypes = b);
            b = jh(a.playAdsAfterTime);
            "number" === typeof b && !isNaN(b) && 0 < b && (this.playAdsAfterTime = b);
            this.restoreCustomPlaybackStateOnAdBreakComplete = a.restoreCustomPlaybackStateOnAdBreakComplete || this.restoreCustomPlaybackStateOnAdBreakComplete;
            b = jh(a.loadVideoTimeout);
            "number" === typeof b && !isNaN(b) && 0 < b && (this.loadVideoTimeout = b);
            this.uiElements = a.uiElements || this.uiElements;
            this.useLearnMoreButton = a.useLearnMoreButton || this.useLearnMoreButton;
            this.useStyledLinearAds = a.useStyledLinearAds || this.useStyledLinearAds;
            this.useStyledNonLinearAds = a.useStyledNonLinearAds || this.useStyledNonLinearAds;
            this.useVideoAdUi = !1 === a.useVideoAdUi ? !1 : this.useVideoAdUi
        }
    }
    ;
    y("module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ads_rendering_settings.AdsRenderingSettings.AUTO_SCALE", -1);
    var WF = L(sl) ? 4E3 : L(tl) ? 6500 : L(ul) ? 12E3 : 8E3;
    var $F = function(a, b, c) {
        P.call(this);
        this.B = a;
        this.l = b;
        this.A = c;
        this.g = this.h = this.j = null;
        this.o = 0;
        a = new Jx(this);
        uo(this, a);
        ZF(this);
        a.N(this.l, "adsManager", this.D)
    };
    u($F, P);
    var aG = function(a, b) {
        a.j = b;
        a.g && a.j && QF(a.g, a.j)
    }
      , ZF = function(a) {
        MF(a.B).then(function(b) {
            return void bG(a, b)
        }).catch(function() {
            return void cG(a)
        })
    };
    $F.prototype.D = function(a) {
        if (["complete", "skip", "error"].includes(a.messageType)) {
            this.o++;
            if (10 === this.o) {
                this.o = 0;
                var b;
                null == (b = this.g) || b.W();
                ZF(this)
            }
            a = Dh(this.h);
            var c;
            a && (null == (c = a.frames) ? 0 : c.omid_v1_present) || X.g().report(188, {})
        }
    }
    ;
    var bG = function(a, b) {
        a.h = b;
        a.g = new NF(b,a.A);
        a.g.N("error", function() {
            return void cG(a)
        });
        PF(a.g);
        a.g && a.j && QF(a.g, a.j)
    }
      , cG = function(a) {
        zD(a.l, "omid", "iframeFailed");
        a.W()
    };
    $F.prototype.L = function() {
        this.h && (Ah(this.h),
        this.h = null);
        P.prototype.L.call(this)
    }
    ;
    var dG = function(a, b, c, d) {
        P.call(this);
        this.o = a;
        this.j = b;
        this.g = c;
        this.B = d;
        this.h = new Jx(this);
        uo(this, this.h);
        this.h.N(this.o, d, this.A)
    };
    u(dG, P);
    var eG = function(a, b) {
        var c = b.ra;
        switch (b.messageType) {
        case "showVideo":
            a.j.Tc();
            break;
        case "hide":
            a.j.bb();
            break;
        case "resizeAndPositionVideo":
            b = c.resizeAndPositionVideo;
            a.j.zd(new cj(b.x,b.y,b.width,b.height));
            break;
        case "restoreSizeAndPositionVideo":
            a.j.Bd()
        }
    };
    dG.prototype.A = function(a) {
        var b = a.ra;
        switch (a.messageType) {
        case "activate":
            this.j.ac(this.g);
            break;
        case "startTracking":
            a = this.g;
            var c = this.l;
            this.h.N(a, Bg($y), c);
            this.h.N(a, zF, c);
            a = this.g;
            fG(a);
            a.h.N(a.g, zF, a.Ma);
            a.h.N(a.g, "ended", a.Xf);
            a.h.N(a.g, "webkitbeginfullscreen", a.Na);
            a.h.N(a.g, "webkitendfullscreen", a.ba);
            a.h.N(a.g, "loadedmetadata", a.Zf);
            a.h.N(a.g, "pause", a.bg);
            a.h.N(a.g, "playing", a.re);
            a.h.N(a.g, "timeupdate", a.cg);
            a.h.N(a.g, "volumechange", a.eg);
            a.h.N(a.g, "error", a.X);
            a.h.N(a.g, Kc || wc && !mx(8) ? "loadeddata" : "canplay", a.Yf);
            a.l = new lF;
            a.h.N(a.l, "click", a.ma);
            nF(a.l, a.g);
            a.F = new Ot(1E3);
            a.h.N(a.F, "tick", a.Fa);
            a.F.start();
            break;
        case "stopTracking":
            a = this.g;
            c = this.l;
            this.h.vb(a, Bg($y), c);
            this.h.vb(a, zF, c);
            fG(this.g);
            break;
        case "exitFullscreen":
            a = this.g;
            (tc || vc) && a.g.webkitDisplayingFullscreen && a.g.webkitExitFullscreen();
            break;
        case "play":
            gG(this.g);
            break;
        case "pause":
            this.g.pause();
            break;
        case "load":
            a = this.g;
            c = b.videoUrl;
            var d = b.muxedMediaUrl
              , e = b.muxedMimeType
              , f = b.muxedAudioCodec
              , g = b.muxedVideoCodec
              , h = b.demuxedAudioUrl
              , k = b.demuxedVideoUrl
              , m = b.demuxedAudioMimeType
              , n = b.demuxedVideoMimeType
              , q = b.demuxedAudioCodec
              , t = b.demuxedVideoCodec;
            b = b.mseCompatible;
            var v = null;
            k && h && b && n && m && t && q && (v = new bw({
                Ag: k,
                rf: h,
                Ei: null,
                ki: null,
                zg: n,
                qf: m,
                lb: t,
                Wa: q,
                height: null,
                width: null,
                Ca: b,
                Di: null,
                ji: null
            }));
            h = null;
            d && e && g && f && (h = new cw({
                Vf: d,
                sb: null,
                mimeType: e,
                lb: g,
                Wa: f,
                height: null,
                width: null,
                Ca: b,
                ri: null
            }));
            v ? a.load(c, v) : h ? a.load(c, h) : a.load(c, null);
            break;
        case "unload":
            a = this.g;
            hG(a);
            a.U = !1;
            "removeAttribute"in a.g ? a.g.removeAttribute("src") : a.g.src = "";
            a.g.load();
            break;
        case "setCurrentTime":
            this.g.g.currentTime = b.currentTime;
            break;
        case "setVolume":
            this.g.setVolume(b.volume)
        }
    }
    ;
    dG.prototype.l = function(a) {
        var b = {};
        switch (a.type) {
        case "autoplayDisallowed":
            a = "autoplayDisallowed";
            break;
        case "beginFullscreen":
            a = "fullscreen";
            break;
        case "endFullscreen":
            a = "exitFullscreen";
            break;
        case "click":
            a = "click";
            break;
        case "end":
            a = "end";
            break;
        case "error":
            a = "error";
            break;
        case "loaded":
            a = "loaded";
            break;
        case "mediaLoadTimeout":
            a = "mediaLoadTimeout";
            break;
        case "pause":
            a = "pause";
            b.ended = this.g.g.ended;
            break;
        case "play":
            a = "play";
            break;
        case "skip":
            a = "skip";
            break;
        case "start":
            a = "start";
            b.volume = this.g.getVolume();
            break;
        case "timeUpdate":
            a = "timeupdate";
            b.currentTime = this.g.getCurrentTime();
            b.duration = this.g.getDuration();
            break;
        case "volumeChange":
            a = "volumeChange";
            b.volume = this.g.getVolume();
            break;
        case "loadedmetadata":
            a = a.type;
            b.duration = this.g.getDuration();
            break;
        case "abort":
        case "canplay":
        case "canplaythrough":
        case "durationchange":
        case "emptied":
        case "loadstart":
        case "loadeddata":
        case "progress":
        case "ratechange":
        case "seeked":
        case "seeking":
        case "stalled":
        case "suspend":
        case "waiting":
            a = a.type;
            break;
        default:
            return
        }
        zD(this.o, this.B, a, b)
    }
    ;
    var iG = function(a, b) {
        P.call(this);
        this.h = b;
        this.g = null;
        this.j = new dG(a,b,this.h.da,"videoDisplay1");
        uo(this, this.j);
        var c = this.h.ya;
        null != c && (this.g = new dG(a,b,c,"videoDisplay2"),
        uo(this, this.g))
    };
    u(iG, P);
    var jG = function(a, b, c, d) {
        var e = gi("IFRAME");
        e.id = b;
        e.name = b;
        e.width = String(c);
        e.height = String(d);
        e.allowTransparency = "true";
        e.scrolling = "no";
        e.marginWidth = "0";
        e.marginHeight = "0";
        e.frameBorder = "0";
        e.style.border = "0";
        e.style.verticalAlign = "bottom";
        e.src = "about:blank";
        e.setAttribute("aria-label", "Advertisement");
        e.title = "3rd party ad content";
        e.tabIndex = 0;
        a.appendChild(e);
        return e
    };
    function kG() {
        var a, b, c, d = E();
        d = void 0 === d ? window : d;
        d = (null != (c = void 0 === d ? null : d) ? c : window).googletag;
        c = (null == d ? 0 : d.apiReady) ? d : void 0;
        return null != (b = null == c ? void 0 : null == (a = c.companionAds) ? void 0 : a.call(c)) ? b : null
    }
    function lG(a) {
        var b = {};
        b.slotId = a.getSlotId().getId();
        var c = [];
        a = r(a.getSizes() || []);
        for (var d = a.next(); !d.done; d = a.next())
            if (d = d.value,
            "string" !== typeof d) {
                var e = {};
                c.push((e.adWidth = d.getWidth(),
                e.adHeight = d.getHeight(),
                e))
            } else
                "fluid" === d && (d = {},
                c.push((d.fluidSize = !0,
                d)));
        return b.adSizes = c,
        b
    }
    function mG(a) {
        var b = kG();
        if (b && a && Array.isArray(a)) {
            var c = new Map(b.getSlots().map(function(t) {
                return [t.getSlotId().getId(), t]
            }));
            a = r(a);
            for (var d = a.next(); !d.done; d = a.next()) {
                var e = d.value
                  , f = c.get(e.slotId);
                if (f && !b.isSlotAPersistentRoadblock(f)) {
                    var g = e.adContent;
                    if (g && (d = nh(f.getSlotId().getDomId()))) {
                        d.style.display = "";
                        var h = e.adWidth
                          , k = e.adHeight;
                        e.fluidSize && (k = Cn(d),
                        h = k.width,
                        k = k.height);
                        d.textContent = "";
                        if (e.friendlyIframeRendering)
                            try {
                                var m = "google_companion_" + f.getSlotId().getId()
                                  , n = jG(d, m, h, k)
                                  , q = n.contentWindow ? n.contentWindow.document : n.contentDocument;
                                mc && q.open("text/html", "replace");
                                Uh(q, uj(g));
                                q.close()
                            } catch (t) {}
                        else
                            Sh(d, uj(g)),
                            d.style.width = h + "px",
                            d.style.height = k + "px";
                        b.slotRenderEnded(f, h, k);
                        (e = e.onAdContentSet) && e(d)
                    }
                }
            }
        }
    }
    ;var nG = function(a, b, c, d, e, f) {
        AD.call(this, a, b, c, d, e);
        this.g = f
    };
    u(nG, AD);
    var oG = function(a, b) {
        Q.call(this);
        this.messageName = a;
        this.l = b;
        this.g = {};
        this.h = new Jx(this);
        uo(this, this.h);
        this.h.N(E(), "message", this.j)
    };
    u(oG, Q);
    var pG = function(a, b) {
        var c = b.g;
        a.g.hasOwnProperty(c) && zD(a.g[c], b.type, b.messageType, b.ra)
    }
      , qG = function(a, b, c, d) {
        a.g.hasOwnProperty(b) || (c = new iF(b,c),
        a.h.N(c, a.messageName, function(e) {
            this.dispatchEvent(new nG(e.type,e.messageType,e.ra,e.sessionId,e.origin,b))
        }),
        c.g = d,
        c.connect(),
        a.g[b] = c)
    };
    oG.prototype.L = function() {
        for (var a = r(Object.values(this.g)), b = a.next(); !b.done; b = a.next())
            so(b.value);
        Q.prototype.L.call(this)
    }
    ;
    oG.prototype.j = function(a) {
        a = a.g;
        var b = jF(a.data);
        if (null != b) {
            var c = b.channel;
            if (this.l && !this.g.hasOwnProperty(c)) {
                var d = b.sid;
                qG(this, c, d, a.source);
                this.dispatchEvent(new nG(b.name,b.type,b.data || {},d,a.origin,c))
            }
        }
    }
    ;
    function rG() {
        return !!Na("googletag.cmd", E())
    }
    function sG() {
        var a = Na("googletag.console", E());
        return null != a ? a : null
    }
    var tG = function() {
        Jx.call(this);
        this.g = null;
        this.j = new oG("gpt",!0);
        uo(this, this.j);
        this.N(this.j, "gpt", this.A);
        rG() || E().top === E() || (this.g = new oG("gpt",!1),
        uo(this, this.g),
        this.N(this.g, "gpt", this.l))
    };
    u(tG, Jx);
    tG.prototype.A = function(a) {
        var b = a.origin
          , c = "//imasdk.googleapis.com".match(Hh);
        b = b.match(Hh);
        if (c[3] == b[3] && c[4] == b[4])
            if (null != this.g)
                qG(this.g, a.g, a.sessionId, E().parent),
                null != this.g && pG(this.g, a);
            else if (c = a.ra,
            null != c && void 0 !== c.scope) {
                b = c.scope;
                c = c.args;
                var d;
                if ("proxy" === b) {
                    var e = a.messageType;
                    "isGptPresent" === e ? d = rG() : "isConsolePresent" === e && (d = null != sG())
                } else if (rG())
                    if ("pubads" === b || "companionAds" === b) {
                        d = a.messageType;
                        var f = E().googletag;
                        if (null != f && null != f[b] && (b = f[b](),
                        null != b && (d = b[d],
                        null != d)))
                            try {
                                e = d.apply(b, c)
                            } catch (g) {}
                        d = e
                    } else if ("console" === b) {
                        if (e = sG(),
                        null != e && (b = e[a.messageType],
                        null != b))
                            try {
                                b.apply(e, c)
                            } catch (g) {}
                    } else
                        null === b && (e = a.messageType,
                        "googleGetCompanionAdSlots" === e ? (e = kG()) ? (e = e.getSlots().map(lG),
                        d = e.length ? e : null) : d = null : ("googleSetCompanionAdContents" === e && mG(null == c ? void 0 : c[0]),
                        d = null));
                void 0 !== d && (a.ra.returnValue = d,
                pG(this.j, a))
            }
    }
    ;
    tG.prototype.l = function(a) {
        pG(this.j, a)
    }
    ;
    var uG = function(a, b) {
        if (a.g) {
            var c = a.g;
            so(c.g[b]);
            delete c.g[b]
        }
        a.j && (a = a.j,
        so(a.g[b]),
        delete a.g[b])
    };
    var vG = ha(["https://securepubads.g.doubleclick.net/pagead/js/car.js"])
      , wG = ej(vG);
    function xG(a) {
        for (var b = [], c = 0; 8 > c; ++c) {
            var d = new Uv(7,"","https://pagead2.googlesyndication.com/pagead/ping",function(f) {
                b.push({
                    url: f
                })
            }
            )
              , e = Wi(Vi(new Ui, a), c);
            d.o(e)
        }
        return b
    }
    function yG(a, b, c) {
        var d = uC;
        d = void 0 === d ? wG : d;
        var e, f;
        Ia(function(g) {
            switch (g.g) {
            case 1:
                e = a;
                if (e.sharedStorage) {
                    var h = pi();
                    c || e.sharedStorage.set("privacy-sandbox-client-creation-timestamp", String(h), {
                        ignoreIfPresent: !0
                    });
                    h = e.sharedStorage.set("ps_cct", String(h), {
                        ignoreIfPresent: !0
                    });
                    g = ya(g, h, 2)
                } else
                    g = g.return();
                return g;
            case 2:
                return ya(g, e.sharedStorage.worklet.addModule(d.toString()), 3);
            case 3:
                return ya(g, e.sharedStorage.selectURL("ps_caus", xG(b), {
                    resolveToConfig: !0,
                    data: {
                        useObfuscatedKey: c
                    }
                }), 4);
            case 4:
                f = g.h;
                h = e.document.body;
                var k = f
                  , m = document.createElement("fencedframe");
                m.id = c ? "ps_caff" : "privacy-sandbox-client-age-fencedframe";
                m.name = c ? "ps_caff" : "privacy-sandbox-client-age-fencedframe";
                m.mode = "opaque-ads";
                m.config = k;
                h.appendChild(m);
                g.g = 0
            }
        })
    }
    ;var AG = function(a, b) {
        var c = Array.prototype.slice.call(arguments)
          , d = c.shift();
        if ("undefined" == typeof d)
            throw Error("[goog.string.format] Template required");
        return d.replace(/%([0\- \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(e, f, g, h, k, m, n, q) {
            if ("%" == m)
                return "%";
            var t = c.shift();
            if ("undefined" == typeof t)
                throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = t;
            return zG[m].apply(null, arguments)
        })
    }
      , zG = {
        s: function(a, b, c) {
            return isNaN(c) || "" == c || a.length >= Number(c) ? a : a = -1 < b.indexOf("-", 0) ? a + dh(" ", Number(c) - a.length) : dh(" ", Number(c) - a.length) + a
        },
        f: function(a, b, c, d, e) {
            d = a.toString();
            isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
            var f = 0 > Number(a) ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
            0 <= Number(a) && (d = f + d);
            if (isNaN(c) || d.length >= Number(c))
                return d;
            d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e);
            a = Number(c) - d.length - f.length;
            return d = 0 <= b.indexOf("-", 0) ? f + d + dh(" ", a) : f + dh(0 <= b.indexOf("0", 0) ? "0" : " ", a) + d
        },
        d: function(a, b, c, d, e, f, g, h) {
            return zG.f(parseInt(a, 10), b, c, d, 0, f, g, h)
        }
    };
    zG.i = zG.d;
    zG.u = zG.d;
    function BG() {
        return ["autoplay", "attribution-reporting"].filter(function(a) {
            var b = document.featurePolicy;
            return void 0 !== b && "function" == typeof b.allowedFeatures && "object" == typeof b.allowedFeatures() && b.allowedFeatures().includes(a)
        }).join(";")
    }
    var DG = function(a, b) {
        Q.call(this);
        this.D = b;
        this.M = this.I = null;
        this.G = !1;
        this.F = "goog_" + fh++;
        this.A = new Map;
        this.h = null;
        var c = E();
        var d = Na("google.ima.gptProxyInstance", c);
        null != d ? c = d : (d = new tG,
        y("google.ima.gptProxyInstance", d, c),
        c = d);
        this.V = c;
        this.B = null;
        this.j = new Jx(this);
        uo(this, this.j);
        c = this.F;
        d = (di() ? "https:" : "http:") + AG("//imasdk.googleapis.com/js/core/bridge3.616.1_%s.html", DC.getLocale());
        a: {
            var e = window;
            try {
                do {
                    try {
                        if (0 === e.location.href.indexOf(d) || 0 === e.document.referrer.indexOf(d)) {
                            var f = !0;
                            break a
                        }
                    } catch (k) {}
                    e = e.parent
                } while (e !== e.top)
            } catch (k) {}
            f = !1
        }
        f && (d += "?f=" + c);
        f = window.document;
        if (Sy.length && f.head) {
            e = r(Sy);
            for (var g = e.next(); !g.done; g = e.next())
                if ((g = g.value) && f.head) {
                    var h = gi("META");
                    f.head.appendChild(h);
                    h.httpEquiv = "origin-trial";
                    h.content = g
                }
        }
        f = BG();
        c = zh("IFRAME", {
            src: d + "#" + c,
            allowFullscreen: !0,
            allow: f,
            id: c,
            style: "border:0; opacity:0; margin:0; padding:0; position:relative; color-scheme: light;"
        });
        this.j.Sb(c, "load", this.aa);
        a.appendChild(c);
        this.g = c;
        this.l = CG(this);
        this.O = new iG(this.l,this.D);
        uo(this, this.O);
        this.D.da && this.j.N(this.l, "displayContainer", this.U);
        this.j.N(this.l, "mouse", this.X);
        this.j.N(this.l, "touch", this.Z);
        eD() || (this.B = new $F(a,this.l,b.da.O.g),
        uo(this, this.B))
    };
    u(DG, Q);
    var CG = function(a, b) {
        b = void 0 === b ? "*" : b;
        var c = a.A.get(b);
        null == c && (c = new iF(a.F,b),
        a.G && (c.g = Dh(a.g),
        c.connect()),
        a.A.set(b, c));
        return c
    };
    DG.prototype.ac = function(a) {
        var b;
        null != (b = this.B) && (a = a.O.g,
        b.A = a,
        b.g && (b = b.g,
        b.h = a,
        OF(b, a)))
    }
    ;
    DG.prototype.L = function() {
        null !== this.h && (this.h.W(),
        this.h = null);
        this.A.forEach(function(a) {
            so(a)
        });
        this.A.clear();
        uG(this.V, this.F);
        Ah(this.g);
        Q.prototype.L.call(this)
    }
    ;
    DG.prototype.X = function(a) {
        var b = a.ra
          , c = un(this.g)
          , d = document.createEvent("MouseEvent");
        d.initMouseEvent(a.messageType, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, null);
        this.g.dispatchEvent(d)
    }
    ;
    var EG = function(a, b) {
        var c = un(a.g)
          , d = !!("TouchEvent"in window && 0 < TouchEvent.length);
        b = b.map(function(f) {
            return d ? new Touch({
                identifier: f.identifier,
                target: a.g,
                clientX: f.clientX,
                clientY: f.clientY,
                screenX: f.screenX,
                screenY: f.screenY,
                pageX: f.pageX + c.x,
                pageY: f.pageY + c.y
            }) : document.createTouch(window, a.g, f.identifier, f.pageX + c.x, f.pageY + c.y, f.screenX, f.screenY)
        });
        if (d)
            return b;
        var e;
        return null == (e = document.createTouchList) ? void 0 : e.apply(document, b)
    };
    DG.prototype.Z = function(a) {
        var b = a.ra
          , c = un(this.g);
        if ("TouchEvent"in window && 0 < TouchEvent.length)
            b = {
                bubbles: !0,
                cancelable: !0,
                view: window,
                detail: b.detail,
                ctrlKey: b.ctrlKey,
                altKey: b.altKey,
                shiftKey: b.shiftKey,
                metaKey: b.metaKey,
                touches: EG(this, b.touches),
                targetTouches: EG(this, b.targetTouches),
                changedTouches: EG(this, b.changedTouches)
            },
            a = new TouchEvent(a.messageType,b),
            this.g.dispatchEvent(a);
        else {
            var d = document.createEvent("TouchEvent");
            d.initTouchEvent(a.messageType, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, EG(this, b.touches), EG(this, b.targetTouches), EG(this, b.changedTouches), b.scale, b.rotation);
            this.g.dispatchEvent(d)
        }
    }
    ;
    DG.prototype.U = function(a) {
        switch (a.messageType) {
        case "showVideo":
            null == this.h ? (this.h = new lF,
            this.j.N(this.h, "click", this.ba)) : pF(this.h);
            nF(this.h, this.D.Nb());
            break;
        case "hide":
            null !== this.h && (this.h.W(),
            this.h = null)
        }
        var b = this.O;
        eG(b.j, a);
        b.g && eG(b.g, a)
    }
    ;
    DG.prototype.ba = function() {
        zD(this.l, "displayContainer", "videoClick")
    }
    ;
    DG.prototype.aa = function() {
        this.I = si();
        this.M = pi();
        var a = Dh(this.g);
        this.A.forEach(function(c) {
            c.g = a;
            c.connect()
        });
        var b;
        null == (b = this.B) || aG(b, a);
        this.G = !0
    }
    ;
    var FG = ha(["https://s0.2mdn.net/instream/video/client.js"])
      , GG = null
      , HG = function() {
        Q.call(this);
        this.g = null;
        this.h = new Map;
        this.j = new Map;
        this.ua = this.B = !1;
        this.l = null;
        this.A = new Jx(this);
        uo(this, this.A)
    };
    u(HG, Q);
    var IG = function() {
        null == GG && (GG = new HG);
        return GG
    }
      , As = function(a, b, c) {
        var d = {};
        d.queryId = b;
        d.viewabilityData = c;
        a.g && zD(a.g, "activityMonitor", "viewabilityMeasurement", d)
    };
    HG.prototype.destroy = function() {
        this.A.vb(this.g, "activityMonitor", this.D);
        this.ua = !1;
        this.h.clear()
    }
    ;
    HG.prototype.L = function() {
        this.destroy();
        Q.prototype.L.call(this)
    }
    ;
    HG.prototype.init = function(a) {
        if (!this.ua) {
            if (this.g = a || null)
                this.A.N(this.g, "activityMonitor", this.D),
                JG(this);
            if (!(w.ima && w.ima.video && w.ima.video.client && w.ima.video.client.tagged)) {
                y("ima.video.client.sdkTag", !0);
                var b = w.document;
                a = xh(document, "SCRIPT");
                var c = ej(FG);
                Th(a, c);
                a.async = !0;
                a.type = "text/javascript";
                b = b.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b)
            }
            jm();
            C(ps).G = DC.g;
            this.B = !0;
            C(ps).j = !0;
            this.l = null;
            a = C(ps);
            b = "h" == as(a) || "b" == as(a);
            c = !(N(),
            !1);
            b && c && (a.K = !0,
            a.F = new vq);
            this.ua = !0
        }
    }
    ;
    var LG = function(a) {
        if (null == a)
            return !1;
        if ((tc || vc) && null !== a.webkitDisplayingFullscreen)
            return a.webkitDisplayingFullscreen;
        a = KG(a);
        var b = window.screen.availHeight || window.screen.height;
        return 0 >= (window.screen.availWidth || window.screen.width) - a.width && 42 >= b - a.height
    }
      , KG = function(a) {
        var b = {
            left: a.offsetLeft,
            top: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight
        };
        try {
            "function" === typeof a.getBoundingClientRect && Ch(lh(a), a) && (b = a.getBoundingClientRect())
        } catch (c) {}
        return b
    }
      , MG = function(a, b, c, d, e) {
        e = void 0 === e ? {} : e;
        if (a.ua) {
            d && null == e.opt_osdId && (e.opt_osdId = d);
            if (a.l)
                return a.l(b, c, e);
            if (a = d ? a.j.get(d) : DC.j)
                null == e.opt_fullscreen && (e.opt_fullscreen = LG(a)),
                null == e.opt_adElement && (e.opt_adElement = a);
            return $u.tb(469, bb(Ds, b, c, e)) || {}
        }
        return {}
    }
      , NG = function(a) {
        var b;
        0 !== DC.g ? b = C(ps).j : b = a.B;
        return b
    }
      , OG = function(a, b) {
        var c = String(Math.floor(1E9 * Math.random()));
        a.j.set(c, b);
        if (L(il))
            try {
                hu(function(d) {
                    if (a.g) {
                        var e = {};
                        e.engagementString = d;
                        zD(a.g, "activityMonitor", "engagementData", e)
                    }
                }, function() {
                    return b
                })
            } catch (d) {}
        0 !== DC.g && Bs(C(ps), c, a);
        return c
    }
      , PG = function(a, b, c) {
        if (c)
            a.h.get(c) === b && a.h.delete(c);
        else {
            var d = [];
            a.h.forEach(function(e, f) {
                e === b && d.push(f)
            });
            d.forEach(a.h.delete, a.h)
        }
    }
      , ws = function(a, b) {
        a = a.h.get(b);
        return "function" === typeof a ? a() : {}
    }
      , JG = function(a) {
        if ("function" === typeof window.Goog_AdSense_Lidar_getUrlSignalsArray) {
            var b = {};
            b.pageSignals = window.Goog_AdSense_Lidar_getUrlSignalsArray();
            var c;
            null == (c = a.g) || zD(c, "activityMonitor", "pageSignals", b)
        }
    };
    HG.prototype.D = function(a) {
        var b = a.ra
          , c = b.queryId
          , d = {}
          , e = null;
        d.eventId = b.eventId;
        switch (a.messageType) {
        case "getPageSignals":
            JG(this);
            break;
        case "reportVastEvent":
            e = b.vastEvent;
            a = b.osdId;
            var f = {};
            f.opt_fullscreen = b.isFullscreen;
            b.isOverlay && (f.opt_bounds = b.overlayBounds);
            d.viewabilityData = MG(this, e, c, a, f);
            var g;
            null == (g = this.g) || zD(g, "activityMonitor", "viewability", d);
            break;
        case "fetchAdTagUrl":
            c = {},
            c.eventId = b.eventId,
            a = b.osdId,
            Eg(b, "isFullscreen") && (e = b.isFullscreen),
            Eg(b, "loggingId") && (b = b.loggingId,
            c.loggingId = b,
            X.g().report(43, {
                step: "beforeLookup",
                logid: b,
                time: Date.now()
            })),
            c.engagementString = QG(this, a, e),
            this.g && zD(this.g, "activityMonitor", "engagement", c)
        }
    }
    ;
    var QG = function(a, b, c) {
        var d, e = b ? null != (d = a.j.get(b)) ? d : null : DC.j;
        a = {};
        null != c && (a.fullscreen = c);
        c = "";
        try {
            c = gu(function() {
                return e
            }, a)
        } catch (f) {
            c = f,
            c = "sdktle;" + ch(c.name, 12) + ";" + ch(c.message, 40)
        }
        return c
    };
    y("ima.common.getVideoMetadata", function(a) {
        return ws(IG(), a)
    });
    y("ima.common.triggerViewabilityMeasurementUpdate", function(a, b) {
        As(IG(), a, b)
    });
    var RG = function(a) {
        this.g = a;
        this.j = "";
        this.h = -1;
        this.o = !1
    }
      , TG = function(a, b) {
        if (0 <= a.h) {
            var c = null == b ? function() {}
            : b
              , d = function() {
                SG(a, c);
                a.g.removeEventListener("loadedmetadata", d, !1)
            };
            a.g.addEventListener("loadedmetadata", d, !1);
            a.g.src = a.j;
            a.g.load()
        } else
            null != b && b()
    }
      , SG = function(a, b) {
        var c = 0 < a.g.seekable.length;
        a.o ? c ? (a.g.currentTime = a.h,
        UG(a),
        b()) : setTimeout(function() {
            return void SG(a, b)
        }, 100) : (UG(a),
        b())
    }
      , UG = function(a) {
        a.h = -1;
        a.j = "";
        a.o = !1
    };
    var VG = new D(5,5)
      , WG = function(a) {
        Q.call(this);
        this.g = a;
        this.l = this.aa = null;
        this.B = 0;
        this.I = this.D = this.U = this.loaded = this.G = !1;
        this.V = this.F = this.M = this.j = null;
        this.Z = !1;
        this.A = null;
        this.O = new RG(a);
        this.h = new Jx(this);
        uo(this, this.h);
        this.size = this.getSize();
        this.fullscreen = LG(this.g)
    };
    u(WG, Q);
    l = WG.prototype;
    l.Rd = function() {
        var a = this.O;
        a.j = a.g.currentSrc;
        a.o = 0 < a.g.seekable.length;
        a.h = a.g.ended ? -1 : a.g.currentTime
    }
    ;
    l.Zb = function(a) {
        TG(this.O, a)
    }
    ;
    l.load = function(a, b) {
        var c = G.g().g;
        c.X = !0;
        xj(c);
        J("hvd_lc");
        hG(this);
        this.U = !1;
        if (b)
            if (J("hvd_ad"),
            b instanceof cw) {
                if (J("hvd_mad"),
                c = b.getMediaUrl()) {
                    J("hvd_admu");
                    J("hvd_src");
                    this.g.src = c;
                    this.g.load();
                    return
                }
            } else if (b instanceof bw) {
                J("hvd_dad");
                c = b.o;
                var d = b.h
                  , e = b.j
                  , f = b.g
                  , g = b.lb
                  , h = b.Wa;
                if (c && d && e && f && g && h && (J("hvd_addu"),
                b.Ca)) {
                    J("hvd_admse");
                    b = e + '; codecs="' + g + '"';
                    f = f + '; codecs="' + h + '"';
                    if (KA() && KA() && MediaSource.isTypeSupported(b) && KA() && MediaSource.isTypeSupported(f)) {
                        J("hvd_ymse");
                        J("hvd_mse");
                        a = !1;
                        try {
                            -1 !== window.location.search.indexOf("goog_limavideo=true") && (a = !0)
                        } catch (k) {}
                        w.customElements ? a ? a = !0 : (L(jl) && X.g().report(153, {
                            limvid: "vd"
                        }),
                        a = L(jl) || L(dl) || L(hl) || L(gl) || L(el) || L(fl) || L(bl) || L(cl) ? !0 : !1) : a = !1;
                        a && this.g instanceof GB ? (this.g.Ya = c,
                        this.g.ob = d) : (this.aa = new dC(this.g,[new dB(c,b,35E4,new xz), new dB(d,f,82E3,new xz)]),
                        uo(this, this.aa),
                        a = this.g,
                        c = this.aa,
                        c.h || (c.h = Qh(c.g).toString()),
                        c = c.h,
                        a.src = c);
                        this.g.load();
                        return
                    }
                    J("hvd_nmse")
                }
            } else
                J("hvd_uad");
        a ? (J("hvd_src"),
        this.g.src = a) : J("hvd_vn");
        this.g.load()
    }
    ;
    l.setVolume = function(a) {
        this.g.volume = Math.max(a, 0);
        this.g.muted = 0 === a ? !0 : !1
    }
    ;
    l.zd = function(a) {
        this.g.style.left = String(a.left) + "px";
        this.g.style.top = String(a.top) + "px";
        this.g.style.width = String(a.width) + "px";
        this.g.style.height = String(a.height) + "px"
    }
    ;
    l.Bd = function() {
        this.g.style.width = "100%";
        this.g.style.height = "100%";
        this.g.style.left = "0";
        this.g.style.right = "0"
    }
    ;
    l.getVolume = function() {
        return this.g.muted ? 0 : this.g.volume
    }
    ;
    var gG = function(a) {
        a.Z = !1;
        a.U || Cb() ? (a.I = !1,
        a.j = a.g.play(),
        null != a.j && (a.M = null,
        a.j.then(function() {
            a.j = null;
            a.re(a.M);
            a.M = null
        }).catch(function(b) {
            a.j = null;
            var c = "";
            null != b && null != b.name && (c = b.name);
            "AbortError" === c || "NotAllowedError" === c ? a.dispatchEvent("autoplayDisallowed") : a.X()
        }))) : a.I = !0
    };
    l = WG.prototype;
    l.pause = function() {
        null == this.j && (this.Z = !0,
        this.g.pause())
    }
    ;
    l.getCurrentTime = function() {
        return this.g.currentTime
    }
    ;
    l.getDuration = function() {
        return isNaN(this.g.duration) ? -1 : this.g.duration
    }
    ;
    l.getSize = function() {
        return new D(this.g.offsetWidth,this.g.offsetHeight)
    }
    ;
    l.L = function() {
        if (this.V) {
            var a = ux.get(this.V);
            xx(a)
        }
        fG(this);
        Q.prototype.L.call(this)
    }
    ;
    var fG = function(a) {
        null != a.l && (pF(a.l),
        a.l = null);
        null != a.F && a.F.W();
        Nx(a.h);
        hG(a)
    }
      , hG = function(a) {
        a.loaded = !1;
        a.D = !1;
        a.G = !1;
        a.I = !1;
        a.B = 0;
        a.j = null;
        a.M = null;
        so(a.A)
    };
    WG.prototype.Ma = function(a) {
        this.dispatchEvent(a.type)
    }
    ;
    var YG = function(a) {
        if (!a.D) {
            a.D = !0;
            a.dispatchEvent("start");
            try {
                if (L(jl) && w.customElements) {
                    var b = w.customElements.get("lima-video");
                    a.g instanceof b ? X.g().report(153, {
                        limvid: "limastart"
                    }) : X.g().report(153, {
                        limvid: "videostart"
                    })
                }
            } catch (c) {
                X.g().report(153, {
                    limvid: "startfail"
                })
            }
            b = "function" === typeof a.g.getAttribute && null != a.g.getAttribute("playsinline");
            b = void 0 === b ? !1 : b;
            (uc || lx() || mx(10)) && (b || (cD.g(),
            1)) || (cD.g(),
            rb(wb(), "Xbox")) || (tc || vc ? 0 : (!sc || sc && kx(jx, 4)) && (Nn() ? (cD.g(),
            !1) : !eD())) || !sc || sc && kx(jx, 3) || (tc || vc) && !mx(4) || XG(a)
        }
    };
    l = WG.prototype;
    l.Zf = function() {
        this.U = !0;
        this.I && gG(this);
        this.I = !1;
        ZG(this)
    }
    ;
    l.Yf = function() {
        this.loaded || (this.loaded = !0,
        this.dispatchEvent("loaded"))
    }
    ;
    l.re = function(a) {
        null != this.j ? this.M = a : (this.dispatchEvent("play"),
        wc || uc || lx() || Kc || YG(this))
    }
    ;
    l.cg = function(a) {
        if (!this.D && (wc || uc || lx() || Kc)) {
            if (0 >= this.getCurrentTime())
                return;
            if (Kc && this.g.ended && 1 === this.getDuration()) {
                this.X(a);
                return
            }
            YG(this)
        }
        if (wc || rb(wb(), "Nintendo WiiU")) {
            if (1.5 < this.getCurrentTime() - this.B) {
                this.G = !0;
                this.g.currentTime = this.B;
                return
            }
            this.G = !1;
            this.getCurrentTime() > this.B && (this.B = this.getCurrentTime())
        }
        this.dispatchEvent("timeUpdate")
    }
    ;
    l.eg = function() {
        this.dispatchEvent("volumeChange")
    }
    ;
    l.bg = function() {
        if (this.D && wc && !this.Z && (2 > $G(this) || this.G)) {
            this.A = new Ot(250);
            this.h.N(this.A, "tick", this.Ea);
            this.A.start();
            var a = !0
        } else
            a = !1;
        a || this.j || this.dispatchEvent("pause")
    }
    ;
    l.Xf = function() {
        var a = !0;
        if (wc || rb(wb(), "Nintendo WiiU"))
            a = this.B >= this.g.duration - 1.5;
        !this.G && a && this.dispatchEvent("end")
    }
    ;
    var XG = function(a) {
        a.dispatchEvent("beginFullscreen")
    };
    WG.prototype.ba = function() {
        this.dispatchEvent("endFullscreen")
    }
    ;
    WG.prototype.X = function() {
        this.dispatchEvent("error")
    }
    ;
    WG.prototype.ma = function() {
        this.dispatchEvent("click")
    }
    ;
    var ZG = function(a) {
        a.g instanceof HTMLElement && (a.V = yx(a.g, VG),
        a.V.then(function(b) {
            a.Aa() || I(G.g(), "ps", b.width + "x" + b.height)
        }))
    };
    WG.prototype.Fa = function() {
        var a = this.getSize()
          , b = LG(this.g);
        if (a.width !== this.size.width || a.height !== this.size.height)
            !this.fullscreen && b ? XG(this) : this.fullscreen && !b && this.ba(),
            this.size = a,
            this.fullscreen = b
    }
    ;
    WG.prototype.Ea = function() {
        if (!this.g.ended && this.g.paused && (wc || Lc ? this.g.currentTime < this.g.duration : 1)) {
            var a = this.g.duration - this.g.currentTime
              , b = $G(this);
            0 < b && (2 <= b || 2 > a) && (so(this.A),
            gG(this))
        } else
            so(this.A)
    }
    ;
    var $G = function(a) {
        var b;
        a: {
            for (b = a.g.buffered.length - 1; 0 <= b; ) {
                if (a.g.buffered.start(b) <= a.g.currentTime) {
                    b = a.g.buffered.end(b);
                    break a
                }
                b--
            }
            b = 0
        }
        return b - a.g.currentTime
    };
    WG.prototype.Na = function() {
        X.g().report(139);
        XG(this)
    }
    ;
    var aH = function(a, b) {
        this.g = a[w.Symbol.iterator]();
        this.h = b
    };
    aH.prototype[Symbol.iterator] = function() {
        return this
    }
    ;
    aH.prototype.next = function() {
        var a = this.g.next();
        return {
            value: a.done ? void 0 : this.h.call(void 0, a.value),
            done: a.done
        }
    }
    ;
    var bH = function(a, b) {
        return new aH(a,b)
    };
    var fH = function(a) {
        if (a instanceof cH || a instanceof dH || a instanceof eH)
            return a;
        if ("function" == typeof a.next)
            return new cH(function() {
                return a
            }
            );
        if ("function" == typeof a[Symbol.iterator])
            return new cH(function() {
                return a[Symbol.iterator]()
            }
            );
        if ("function" == typeof a.yb)
            return new cH(function() {
                return a.yb()
            }
            );
        throw Error("Not an iterator or iterable.");
    }
      , cH = function(a) {
        this.g = a
    };
    cH.prototype.yb = function() {
        return new dH(this.g())
    }
    ;
    cH.prototype[Symbol.iterator] = function() {
        return new eH(this.g())
    }
    ;
    cH.prototype.h = function() {
        return new eH(this.g())
    }
    ;
    var dH = function(a) {
        this.g = a
    };
    u(dH, gp);
    dH.prototype.next = function() {
        return this.g.next()
    }
    ;
    dH.prototype[Symbol.iterator] = function() {
        return new eH(this.g)
    }
    ;
    dH.prototype.h = function() {
        return new eH(this.g)
    }
    ;
    var eH = function(a) {
        cH.call(this, function() {
            return a
        });
        this.j = a
    };
    u(eH, cH);
    eH.prototype.next = function() {
        return this.j.next()
    }
    ;
    var gH = function(a, b) {
        this.h = {};
        this.g = [];
        this.j = this.size = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1])
        } else if (a)
            if (a instanceof gH)
                for (c = a.tc(),
                d = 0; d < c.length; d++)
                    this.set(c[d], a.get(c[d]));
            else
                for (d in a)
                    this.set(d, a[d])
    };
    l = gH.prototype;
    l.Bb = function() {
        hH(this);
        for (var a = [], b = 0; b < this.g.length; b++)
            a.push(this.h[this.g[b]]);
        return a
    }
    ;
    l.tc = function() {
        hH(this);
        return this.g.concat()
    }
    ;
    l.has = function(a) {
        return iH(this.h, a)
    }
    ;
    l.isEmpty = function() {
        return 0 == this.size
    }
    ;
    l.clear = function() {
        this.h = {};
        this.j = this.size = this.g.length = 0
    }
    ;
    l.remove = function(a) {
        return this.delete(a)
    }
    ;
    l.delete = function(a) {
        return iH(this.h, a) ? (delete this.h[a],
        --this.size,
        this.j++,
        this.g.length > 2 * this.size && hH(this),
        !0) : !1
    }
    ;
    var hH = function(a) {
        if (a.size != a.g.length) {
            for (var b = 0, c = 0; b < a.g.length; ) {
                var d = a.g[b];
                iH(a.h, d) && (a.g[c++] = d);
                b++
            }
            a.g.length = c
        }
        if (a.size != a.g.length) {
            var e = {};
            for (c = b = 0; b < a.g.length; )
                d = a.g[b],
                iH(e, d) || (a.g[c++] = d,
                e[d] = 1),
                b++;
            a.g.length = c
        }
    };
    l = gH.prototype;
    l.get = function(a, b) {
        return iH(this.h, a) ? this.h[a] : b
    }
    ;
    l.set = function(a, b) {
        iH(this.h, a) || (this.size += 1,
        this.g.push(a),
        this.j++);
        this.h[a] = b
    }
    ;
    l.forEach = function(a, b) {
        for (var c = this.tc(), d = 0; d < c.length; d++) {
            var e = c[d]
              , f = this.get(e);
            a.call(b, f, e, this)
        }
    }
    ;
    l.keys = function() {
        return fH(this.yb(!0)).h()
    }
    ;
    l.values = function() {
        return fH(this.yb(!1)).h()
    }
    ;
    l.entries = function() {
        var a = this;
        return bH(this.keys(), function(b) {
            return [b, a.get(b)]
        })
    }
    ;
    l.yb = function(a) {
        hH(this);
        var b = 0
          , c = this.j
          , d = this
          , e = new gp;
        e.next = function() {
            if (c != d.j)
                throw Error("The map has changed since the iterator was created");
            if (b >= d.g.length)
                return hp;
            var f = d.g[b++];
            return {
                value: a ? f : d.h[f],
                done: !1
            }
        }
        ;
        return e
    }
    ;
    var iH = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var kH = function() {
        Q.call(this);
        this.currentTime = this.B = 0;
        this.duration = NaN;
        this.h = !0;
        this.volume = 1;
        this.muted = !1;
        this.G = 1;
        this.playbackRate = 0;
        this.F = null;
        this.l = 0;
        this.j = this.g = null;
        this.buffered = new jH;
        this.I = new jH;
        this.D = "";
        this.tagName = "VIDEO";
        this.height = this.width = 0;
        this.canPlayType = function() {
            return ""
        }
        ;
        this.A = new Jx(this);
        uo(this, this.A);
        var a = CC(DC);
        a && (this.duration = zC(a))
    };
    u(kH, Q);
    var lH = function() {
        var a = ["video/mp4"]
          , b = ["video/ogg"]
          , c = new kH;
        c.canPlayType = function(d) {
            return a.includes(d) ? "probably" : b.includes(d) ? "maybe" : ""
        }
        ;
        return c
    };
    l = kH.prototype;
    l.pause = function() {
        if (!this.h) {
            var a;
            null == (a = this.F) || a.stop();
            this.h = !0;
            this.dispatchEvent("timeupdate");
            this.dispatchEvent("pause")
        }
    }
    ;
    l.load = function() {
        this.B = 0;
        this.h = !0;
        this.dispatchEvent("loadstart");
        var a;
        isNaN(this.duration) ? a = 10 + 20 * Math.random() : a = this.duration;
        this.setProperty("duration", a);
        a = this.I;
        a.g.push(new mH(this.duration));
        a.length = a.g.length;
        a = this.buffered;
        a.g.push(new mH(this.duration));
        a.length = a.g.length;
        this.dispatchEvent("loadedmetadata");
        0 < this.currentTime && this.dispatchEvent("timeupdate");
        this.dispatchEvent("loadeddata");
        this.dispatchEvent("canplay");
        this.dispatchEvent("canplaythrough");
        this.dispatchEvent("progress");
        this.playbackRate = this.G
    }
    ;
    l.setProperty = function(a, b) {
        switch (a) {
        case "currentTime":
            a = Number(b);
            this.dispatchEvent("seeking");
            this.currentTime = a;
            this.dispatchEvent("seeked");
            a = Date.now() - this.l;
            b = this.currentTime + a / 1E3;
            this.l += a;
            2 < this.B && (this.currentTime = Math.min(b, this.duration));
            this.dispatchEvent("timeupdate");
            if (this.currentTime === this.duration) {
                this.h = !0;
                var c;
                null == (c = this.F) || c.stop();
                this.dispatchEvent("ended")
            }
            break;
        case "duration":
            this.duration = Number(b);
            this.dispatchEvent("durationchange");
            break;
        case "volume":
            this.setVolume(Number(b));
            break;
        default:
            throw Error("Property setter not implemented");
        }
    }
    ;
    l.setVolume = function(a) {
        this.volume = a;
        this.dispatchEvent("volumechange")
    }
    ;
    l.setAttribute = function(a, b) {
        null != a && nH.set(a, b)
    }
    ;
    l.getAttribute = function(a) {
        return nH.get(a)
    }
    ;
    l.dg = function(a) {
        var b = null
          , c = null;
        switch (a.type) {
        case "loadeddata":
            b = "Loaded";
            break;
        case "playing":
            b = "Playing";
            c = "#00f";
            break;
        case "pause":
            b = "Paused";
            break;
        case "ended":
            b = "Ended",
            c = "#000"
        }
        b && this.j && (this.j.innerText = b);
        c && this.g && (this.g.style.backgroundColor = c)
    }
    ;
    ea.Object.defineProperties(kH.prototype, {
        src: {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return this.D
            },
            set: function(a) {
                this.D = a
            }
        }
    });
    var nH = new gH
      , mH = function(a) {
        this.startTime = 0;
        this.endTime = a
    }
      , jH = function() {
        this.length = 0;
        this.g = []
    };
    jH.prototype.start = function(a) {
        return this.g[a].startTime
    }
    ;
    jH.prototype.end = function(a) {
        return this.g[a].endTime
    }
    ;
    var qH = function(a, b) {
        P.call(this);
        this.o = a;
        this.j = this.g = null;
        this.h = oH(this);
        pH(this, b);
        uB(function() {
            I(G.g(), "haob", "1")
        })
    };
    u(qH, P);
    qH.prototype.initialize = function() {
        this.h && this.h.load()
    }
    ;
    qH.prototype.L = function() {
        Ah(this.g);
        P.prototype.L.call(this)
    }
    ;
    var pH = function(a, b) {
        a.g = zh("DIV", {
            style: "display:none;"
        });
        a.o.appendChild(a.g);
        a.g.appendChild(a.h);
        b && (a.j = zh("DIV", {
            style: "position:absolute;width:100%;height:100%;left:0px;top:0px"
        }),
        a.g.appendChild(a.j))
    }
      , oH = function(a) {
        var b = CC(DC);
        if (yC(b, "useVideoElementFake"))
            a = lH(),
            b = zh("DIV", {
                style: "position:absolute;width:100%;height:100%;top:0px;left:0px;"
            }),
            Object.assign(b, a),
            a.g = zh("DIV", {
                style: "position:absolute;width:100%;height:100%;top:0px;left:0px;background-color:#000"
            }),
            a.j = zh("P", {
                style: "position:absolute;top:25%;margin-left:10px;font-size:24px;color:#fff;"
            }),
            a.g.appendChild(a.j),
            b.appendChild(a.g),
            a.A.N(a, ["loadeddata", "playing", "pause", "ended"], a.dg),
            a = b;
        else {
            b = !1;
            try {
                -1 !== window.location.search.indexOf("goog_limavideo=true") && (b = !0)
            } catch (c) {}
            if (rH(a, b)) {
                b && console.log("force lima video in wrapper");
                a = null;
                try {
                    a = new GB
                } catch (c) {
                    a = zh("lima-video"),
                    L(jl) && X.g().report(153, {
                        limvid: "firefail"
                    })
                }
                a.style.backgroundColor = "#000";
                a.style.height = "100%";
                a.style.width = "100%";
                a.style.position = "absolute";
                a.style.left = "0";
                a.style.top = "0"
            } else
                a = zh("VIDEO", {
                    style: "background-color:#000;position:absolute;width:100%;height:100%;left:0;top:0;",
                    title: "Advertisement".toString()
                })
        }
        a.setAttribute("webkit-playsinline", "true");
        a.setAttribute("playsinline", "true");
        return a
    }
      , rH = function(a, b) {
        if (!w.customElements)
            return !1;
        if (b)
            return !0;
        if (Db() && lh(a.o) !== document)
            return !1;
        L(jl) && X.g().report(153, {
            limvid: "vw"
        });
        return L(dl) || L(jl) || L(bl) || L(cl) ? !0 : !1
    };
    qH.prototype.Nb = function() {
        return this.j
    }
    ;
    qH.prototype.bb = function() {
        var a = this.g;
        null != a && (a.style.display = "none")
    }
    ;
    var vH = function(a, b, c) {
        var d = a && a.getRootNode ? a.getRootNode({
            composed: !0
        }) : a;
        if (null == a || !Ch(lh(d), d))
            throw OD(ND, null, "containerElement", "element");
        this.h = b;
        this.O = gD(this.h || null);
        this.M = nx(this.h || null);
        this.I = String(Math.floor(1E9 * Math.random()));
        this.D = !1;
        this.Oc = a;
        this.G = null != b;
        DC.g = 2;
        this.H = sH(b ? b : null);
        d = zh("DIV", {
            style: "position:absolute"
        });
        a.insertBefore(d, a.firstChild);
        this.o = d;
        this.g = null;
        tH(this) && b ? a = new WG(b) : (this.g = new qH(this.o,!0),
        a = new WG(this.g.h));
        this.da = a;
        this.ya = this.j = null;
        if (a = this.g && DC.o)
            a = !(tH(this) || tc || vc || On() || sc && (!sc || !kx(jx, 4)));
        a && (this.j = new qH(this.o,!0),
        this.ya = new WG(this.j.h));
        this.l = c || null;
        this.F = null != this.l;
        tH(this) && b ? "function" !== typeof b.getBoundingClientRect ? (c = this.o,
        DC.j = c) : c = b : c = this.o;
        this.B = c;
        this.A = new DG(this.o,this);
        this.size = new D(0,0);
        this.K = "";
        b && (b = Qw(b.src || b.currentSrc),
        200 > b.toString().length ? this.K = b.toString() : 200 > b.h.length && (this.K = b.h));
        this.Md = new Map;
        this.Md.set("videoDisplay1", this.da);
        this.ya && this.Md.set("videoDisplay2", this.ya);
        uH(this) && !DC.h && console.warn("Custom media element must be a <video> or <audio> element. Viewability/audibility measurement will fail.")
    };
    l = vH.prototype;
    l.initialize = function() {
        this.D = !0;
        null != this.g && this.g.initialize();
        null != this.j && this.j.initialize()
    }
    ;
    l.ua = function() {
        return this.D
    }
    ;
    l.destroy = function() {
        var a = this;
        this.h = null;
        so(this.g);
        so(this.j);
        so(this.A);
        this.da.Zb(function() {
            return so(a.da)
        });
        null != this.ya && this.ya.Zb(function() {
            return so(a.ya)
        });
        Ah(this.o)
    }
    ;
    l.Tc = function() {
        if (null != this.g) {
            var a = this.g.g;
            null != a && (a.style.display = "block")
        }
    }
    ;
    l.ac = function(a) {
        this.da !== a && this.g && this.j && this.ya && (a.setVolume(this.da.getVolume()),
        a = this.da,
        this.da = this.ya,
        this.ya = a,
        a = this.g,
        this.g = this.j,
        this.j = a,
        this.j.bb(),
        this.A.ac(this.da))
    }
    ;
    l.bb = function() {
        null != this.g && this.g.bb()
    }
    ;
    l.Nb = function() {
        return this.F && this.l ? this.l : null != this.g ? this.g.Nb() : null
    }
    ;
    var tH = function(a) {
        return fD(a.H) && a.G
    }
      , uH = function(a) {
        var b = ["VIDEO", "AUDIO"], c;
        return tH(a) && !!a.h && !b.includes(null == (c = a.h.tagName) ? void 0 : c.toUpperCase())
    };
    vH.prototype.getSize = function() {
        return this.size
    }
    ;
    var sH = function(a) {
        return null != a && "function" === typeof a.getAttribute && null != a.getAttribute("playsinline") ? !0 : !1
    };
    vH.prototype.zd = function(a) {
        this.da.zd(a)
    }
    ;
    vH.prototype.Bd = function() {
        this.da.Bd()
    }
    ;
    vH.prototype.destroy = vH.prototype.destroy;
    vH.prototype.initialize = vH.prototype.initialize;
    var wH = {
        AD_LOAD: "adLoadError",
        AD_PLAY: "adPlayError"
    }
      , xH = function(a) {
        var b = Error.call(this);
        this.message = b.message;
        "stack"in b && (this.stack = b.stack);
        this.data = a
    };
    u(xH, Error);
    l = xH.prototype;
    l.getInnerError = function() {
        var a = this.data.innerError;
        return a instanceof Object ? new xH(a) : null != a ? Error(a) : null
    }
    ;
    l.getMessage = function() {
        return this.data.errorMessage
    }
    ;
    l.getErrorCode = function() {
        return this.data.errorCode
    }
    ;
    l.getVastErrorCode = function() {
        var a = this.getErrorCode();
        return 1E3 > a ? a : 900
    }
    ;
    l.getType = function() {
        return this.data.type
    }
    ;
    l.toString = function() {
        return "AdError " + this.getErrorCode() + ": " + this.getMessage() + (null != this.getInnerError() ? " Caused by: " + this.getInnerError() : "")
    }
    ;
    xH.prototype.getType = xH.prototype.getType;
    xH.prototype.getVastErrorCode = xH.prototype.getVastErrorCode;
    xH.prototype.getErrorCode = xH.prototype.getErrorCode;
    xH.prototype.getMessage = xH.prototype.getMessage;
    xH.prototype.getInnerError = xH.prototype.getInnerError;
    y("module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ad_error.AdError.Type", wH);
    var yH = {
        AD_ERROR: "adError"
    }
      , zH = function(a, b) {
        b = void 0 === b ? null : b;
        Js.call(this, "adError");
        this.error = a;
        this.g = b
    };
    u(zH, Js);
    zH.prototype.getError = function() {
        return this.error
    }
    ;
    zH.prototype.getUserRequestContext = function() {
        return this.g
    }
    ;
    zH.prototype.getUserRequestContext = zH.prototype.getUserRequestContext;
    zH.prototype.getError = zH.prototype.getError;
    y("module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ad_error_event.AdErrorEvent.Type", yH);
    var AH = {
        AD_CAN_PLAY: "adCanPlay",
        Eg: "adStarted",
        CONTENT_PAUSE_REQUESTED: "contentPauseRequested",
        CONTENT_RESUME_REQUESTED: "contentResumeRequested",
        CLICK: "click",
        VIDEO_CLICKED: "videoClicked",
        VIDEO_ICON_CLICKED: "videoIconClicked",
        Nd: "engagedView",
        EXPANDED_CHANGED: "expandedChanged",
        STARTED: "start",
        AD_PROGRESS: "adProgress",
        AD_BUFFERING: "adBuffering",
        IMPRESSION: "impression",
        Sd: "measurable_impression",
        VIEWABLE_IMPRESSION: "viewable_impression",
        Od: "fully_viewable_audible_half_duration_impression",
        Ye: "overlay_resize",
        Ze: "overlay_unmeasurable_impression",
        af: "overlay_unviewable_impression",
        cf: "overlay_viewable_immediate_impression",
        bf: "overlay_viewable_end_of_session_impression",
        Xg: "externalActivityEvent",
        PAUSED: "pause",
        RESUMED: "resume",
        FIRST_QUARTILE: "firstQuartile",
        MIDPOINT: "midpoint",
        THIRD_QUARTILE: "thirdQuartile",
        COMPLETE: "complete",
        DURATION_CHANGE: "durationChange",
        USER_CLOSE: "userClose",
        ai: "userRecall",
        Ih: "prefetched",
        LOADED: "loaded",
        ALL_ADS_COMPLETED: "allAdsCompleted",
        SKIPPED: "skip",
        hf: "skipShown",
        LINEAR_CHANGED: "linearChanged",
        SKIPPABLE_STATE_CHANGED: "skippableStateChanged",
        AD_METADATA: "adMetadata",
        AD_BREAK_FETCH_ERROR: "adBreakFetchError",
        AD_BREAK_READY: "adBreakReady",
        LOG: "log",
        VOLUME_CHANGED: "volumeChange",
        VOLUME_MUTED: "mute",
        INTERACTION: "interaction",
        Lg: "companionBackfill",
        Xh: "trackingUrlPinged",
        bi: "video_card_endcap_collapse",
        ci: "video_card_endcap_dismiss",
        di: "video_card_endcap_impression",
        Og: "companionInitialized",
        Ng: "companionImpression",
        Mg: "companionClick",
        Ah: "mediaUrlPinged",
        Ve: "loadStart",
        Ch: "navigationRequested"
    }
      , BH = function(a, b, c) {
        b = void 0 === b ? null : b;
        c = void 0 === c ? null : c;
        Js.call(this, a);
        this.ad = b;
        this.j = c
    };
    u(BH, Js);
    BH.prototype.getAd = function() {
        return this.ad
    }
    ;
    BH.prototype.getAdData = function() {
        return this.j
    }
    ;
    BH.prototype.getAdData = BH.prototype.getAdData;
    BH.prototype.getAd = BH.prototype.getAd;
    y("module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ad_event.AdEvent.Type", AH);
    var CH = function(a, b) {
        b = void 0 === b ? null : b;
        BH.call(this, "adMetadata", a);
        this.g = b
    };
    u(CH, BH);
    CH.prototype.Af = function() {
        return this.g
    }
    ;
    CH.prototype.getAdCuePoints = CH.prototype.Af;
    var DH = function(a) {
        this.adBreakDuration = a.adBreakDuration;
        this.adPosition = a.adPosition;
        this.currentTime = a.currentTime;
        this.duration = a.duration;
        this.totalAds = a.totalAds
    };
    var EH = function(a, b) {
        Q.call(this);
        this.j = a;
        this.A = b;
        this.h = this.j.currentTime;
        this.g = new Ot(250);
        uo(this, this.g);
        this.l = new Jx(this);
        uo(this, this.l);
        Lx(this.l, this.g, "tick", this.B, !1, this)
    };
    u(EH, Q);
    EH.prototype.pb = function() {
        return this.h
    }
    ;
    EH.prototype.start = function() {
        FH(this);
        this.g.start()
    }
    ;
    EH.prototype.stop = function() {
        this.g.stop()
    }
    ;
    EH.prototype.B = function() {
        var a = this.j.currentTime;
        a !== this.pb() && (this.h = a,
        FH(this))
    }
    ;
    var FH = function(a) {
        var b = {};
        b.currentTime = a.pb();
        zD(a.A, "contentTimeUpdate", "contentTimeUpdate", b)
    };
    var GH = nc && "srcdoc"in xh(document, "IFRAME")
      , HH = function(a, b) {
        a.open("text/html", "replace");
        Uh(a, uj(String(b)));
        a.close()
    };
    var IH = {
        rgb: !0,
        rgba: !0,
        alpha: !0,
        rect: !0,
        image: !0,
        "linear-gradient": !0,
        "radial-gradient": !0,
        "repeating-linear-gradient": !0,
        "repeating-radial-gradient": !0,
        "cubic-bezier": !0,
        matrix: !0,
        perspective: !0,
        rotate: !0,
        rotate3d: !0,
        rotatex: !0,
        rotatey: !0,
        steps: !0,
        rotatez: !0,
        scale: !0,
        scale3d: !0,
        scalex: !0,
        scaley: !0,
        scalez: !0,
        skew: !0,
        skewx: !0,
        skewy: !0,
        translate: !0,
        translate3d: !0,
        translatex: !0,
        translatey: !0,
        translatez: !0
    }
      , JH = function(a) {
        a = pb(a);
        if ("" == a)
            return null;
        var b = String(a.slice(0, 4)).toLowerCase();
        if (0 == ("url(" < b ? -1 : "url(" == b ? 0 : 1))
            return null;
        if (0 < a.indexOf("(")) {
            if (/"|'/.test(a))
                return null;
            b = /([\-\w]+)\(/g;
            for (var c; c = b.exec(a); )
                if (!(c[1].toLowerCase()in IH))
                    return null
        }
        return a
    };
    function KH(a, b) {
        a = w[a];
        return a && a.prototype ? (b = Object.getOwnPropertyDescriptor(a.prototype, b)) && b.get || null : null
    }
    function LH(a) {
        var b = w.CSSStyleDeclaration;
        return b && b.prototype && b.prototype[a] || null
    }
    KH("Element", "attributes") || KH("Node", "attributes");
    KH("Element", "innerHTML") || KH("HTMLElement", "innerHTML");
    KH("Node", "nodeName");
    KH("Node", "nodeType");
    KH("Node", "parentNode");
    KH("Node", "childNodes");
    KH("HTMLElement", "style") || KH("Element", "style");
    KH("HTMLStyleElement", "sheet");
    var MH = LH("getPropertyValue")
      , NH = LH("setProperty");
    KH("Element", "namespaceURI") || KH("Node", "namespaceURI");
    function OH(a, b, c, d) {
        if (a)
            return a.apply(b, d);
        if (kc && 10 > document.documentMode) {
            if (!b[c].call)
                throw Error("IE Clobbering detected");
        } else if ("function" != typeof b[c])
            throw Error("Clobbering detected");
        return b[c].apply(b, d)
    }
    ;var PH = {
        "-webkit-border-horizontal-spacing": !0,
        "-webkit-border-vertical-spacing": !0
    }
      , RH = function(a) {
        if (!a)
            return Xg;
        var b = document.createElement("div").style;
        QH(a).forEach(function(c) {
            var d = nc && c in PH ? c : c.replace(/^-(?:apple|css|epub|khtml|moz|mso?|o|rim|wap|webkit|xv)-(?=[a-z])/i, "");
            0 != d.lastIndexOf("--", 0) && 0 != d.lastIndexOf("var", 0) && (c = OH(MH, a, a.getPropertyValue ? "getPropertyValue" : "getAttribute", [c]) || "",
            c = JH(c),
            null != c && OH(NH, b, b.setProperty ? "setProperty" : "setAttribute", [d, c]))
        });
        return new Wg(b.cssText || "",Vg)
    }
      , QH = function(a) {
        Qa(a) ? a = ac(a) : (a = Cg(a),
        Xb(a, "cssText"));
        return a
    };
    var SH = ha([""])
      , TH = function(a, b, c) {
        Q.call(this);
        this.h = a;
        this.l = b;
        this.B = c;
        this.g = null;
        this.D = "";
        this.F = fj(SH);
        this.G = 0;
        this.A = this.slot = this.j = null;
        this.sessionId = ""
    };
    u(TH, Q);
    TH.prototype.init = function(a) {
        this.sessionId = a;
        a = "about:blank";
        kc && (a = "");
        this.j = zh("IFRAME", {
            src: a,
            allowtransparency: !0,
            background: "transparent"
        });
        pn(this.j, {
            display: "none",
            width: "0",
            height: "0"
        });
        a = this.h.Oc;
        a.appendChild(this.j);
        a = a.ownerDocument;
        a = a.defaultView || a.parentWindow;
        null == this.A && (this.A = new Jx(this));
        this.A.N(a, "message", this.I);
        a = '<body><script src="//imasdk.googleapis.com/js/sdkloader/loader.js">\x3c/script><script>loader = new VPAIDLoader(false, "' + (this.sessionId + '");\x3c/script></body>');
        if (Lc || Jc || lc) {
            var b = this.j.contentWindow;
            b && HH(b.document, a)
        } else
            b = this.j,
            GH ? (a = uj(a),
            b.srcdoc = $g(a)) : (b = b.contentWindow) && HH(b.document, a)
    }
    ;
    TH.prototype.I = function(a) {
        try {
            var b = a.g.data;
            try {
                var c = JSON.parse(b)
            } catch (x) {
                return
            }
            var d = c.session;
            if (null != d && this.sessionId === d)
                switch (c.type) {
                case "friendlyReady":
                    var e = UH(this);
                    if (null != e) {
                        this.g = e;
                        this.D = e.currentSrc;
                        var f = e.style.cssText;
                        if (kc && 10 > document.documentMode)
                            var g = Xg;
                        else {
                            var h = document.implementation.createHTMLDocument("").createElement("DIV");
                            h.style.cssText = f;
                            g = RH(h.style)
                        }
                        this.F = g;
                        this.G = e.currentTime
                    } else {
                        var k = this.h.Oc
                          , m = "border: 0; margin: 0; padding: 0; position: absolute; "
                          , n = this.h.getSize();
                        m += "width:" + n.width + "px;";
                        m += "height:" + n.height + "px;";
                        this.g = zh("VIDEO", {
                            style: m,
                            autoplay: !0
                        });
                        k.appendChild(this.g)
                    }
                    var q = this.h.Oc;
                    k = "border: 0; margin: 0; padding: 0;position: absolute; ";
                    var t = yn(this.g);
                    k += "width:" + t.width + "px;";
                    k += "height:" + t.height + "px;";
                    this.slot = zh("DIV", {
                        style: k
                    });
                    q.appendChild(this.slot);
                    try {
                        this.j.contentWindow.loader.initFriendly(this.g, this.slot)
                    } catch (x) {
                        VH(this)
                    }
                    zD(this.l, "vpaid", "", b);
                    break;
                case "becameLinear":
                    this.g && !Gh() && !Fh() && pn(this.g, {
                        visibility: "visible"
                    });
                    zD(this.l, "vpaid", "", b);
                    break;
                case "becameNonlinear":
                    WH(this);
                    zD(this.l, "vpaid", "", b);
                    break;
                case "startAd":
                    q = {};
                    if (this.g) {
                        m = this.g.paused;
                        var v = 0 < this.g.currentTime;
                        q.apl = v && !m ? "1" : "0";
                        q.ip = m ? "1" : "0";
                        q.iavp = v ? "1" : "0"
                    } else
                        q.apl = "n";
                    X.g().report(99, q);
                    zD(this.l, "vpaid", "", b);
                    this.Tc();
                    break;
                default:
                    zD(this.l, "vpaid", "", b)
                }
        } catch (x) {
            VH(this)
        }
    }
    ;
    var VH = function(a) {
        var b = {
            type: "error"
        };
        b.session = a.sessionId;
        b = JSON.stringify(b);
        a.postMessage(b)
    };
    TH.prototype.postMessage = function(a) {
        window.postMessage(a, "*")
    }
    ;
    var UH = function(a) {
        return ("videoDisplayUnknown" === a.B ? a.h.da : a.h.Md.get(a.B)).O.g
    };
    TH.prototype.Tc = function() {
        null != UH(this) && this.h.Tc()
    }
    ;
    var WH = function(a) {
        a.g && !Gh() && !Fh() && pn(a.g, {
            visibility: "hidden"
        })
    };
    TH.prototype.L = function() {
        so(this.A);
        this.A = null;
        Ah(this.slot);
        this.slot = null;
        Ah(this.j);
        this.j = null;
        var a = UH(this);
        if (null != a) {
            var b = this.F;
            a.style.cssText = b instanceof Wg && b.constructor === Wg ? b.g : "type_error:SafeStyle";
            Gh() || Fh() ? (a.src = this.D,
            a.currentTime = this.G) : (a.removeAttribute("src"),
            this.h.bb())
        } else
            Ah(this.g),
            this.g = null;
        Q.prototype.L.call(this)
    }
    ;
    var XH = function(a, b) {
        P.call(this);
        this.h = a;
        this.j = b;
        this.g = new Map
    };
    u(XH, P);
    var YH = function(a, b) {
        try {
            var c = b.ra
              , d = c.session;
            switch (c.vpaidEventType) {
            case "createFriendlyIframe":
                b = "videoDisplayUnknown";
                c.videoDisplayName && (b = c.videoDisplayName);
                var e = c.session
                  , f = new TH(a.h,a.j,b);
                a.g.set(e, f);
                f.init(e);
                break;
            case "vpaidNonLinear":
                var g = a.g.get(d);
                g && WH(g);
                break;
            case "destroyFriendlyIframe":
                var h = a.g.get(d);
                h && (h.W(),
                a.g.delete(d))
            }
        } catch (k) {
            X.g().report(125, {
                msg: k.message
            })
        }
    };
    XH.prototype.L = function() {
        this.g.forEach(function(a) {
            a.W()
        })
    }
    ;
    var ZH = function(a) {
        this.J = A(a)
    };
    u(ZH, B);
    ZH.prototype.getValue = function() {
        return pf(this, 1)
    }
    ;
    ZH.prototype.getVersion = function() {
        return qf(this, 5)
    }
    ;
    var $H = fg(ZH);
    var aI = function() {
        this.g = window;
        this.h = 0
    }
      , bI = function(a, b, c, d) {
        if (d) {
            var e = of(c, 2) - Date.now() / 1E3;
            e = {
                qe: Math.max(e, 0),
                path: pf(c, 3),
                domain: pf(c, 4),
                ig: !1
            };
            c = c.getValue();
            a = a.g;
            lf(d, 5) && uk(a) && (new sk(a.document)).set(b, c, e)
        }
    }
      , cI = function(a, b, c) {
        if (c && vk(b, c, a.g)) {
            var d = a.g.location.hostname;
            if ("localhost" === d)
                d = ["localhost"];
            else if (d = d.split("."),
            2 > d.length)
                d = [];
            else {
                for (var e = [], f = 0; f < d.length - 1; ++f)
                    e.push(d.slice(f).join("."));
                d = e
            }
            d = r(d);
            for (e = d.next(); !e.done; e = d.next()) {
                f = b;
                var g = a.g;
                lf(c, 5) && uk(g) && (new sk(g.document)).remove(f, "/", e.value)
            }
        }
    };
    var dI = function() {
        this.g = [];
        this.h = []
    };
    l = dI.prototype;
    l.isEmpty = function() {
        return 0 === this.g.length && 0 === this.h.length
    }
    ;
    l.clear = function() {
        this.g = [];
        this.h = []
    }
    ;
    l.contains = function(a) {
        return Wb(this.g, a) || Wb(this.h, a)
    }
    ;
    l.remove = function(a) {
        var b = this.g;
        b: {
            var c = b.length - 1;
            0 > c && (c = Math.max(0, b.length + c));
            if ("string" === typeof b)
                c = "string" !== typeof a || 1 != a.length ? -1 : b.lastIndexOf(a, c);
            else {
                for (; 0 <= c; c--)
                    if (c in b && b[c] === a)
                        break b;
                c = -1
            }
        }
        0 <= c ? (Yb(b, c),
        b = !0) : b = !1;
        return b || Xb(this.h, a)
    }
    ;
    l.Bb = function() {
        for (var a = [], b = this.g.length - 1; 0 <= b; --b)
            a.push(this.g[b]);
        var c = this.h.length;
        for (b = 0; b < c; ++b)
            a.push(this.h[b]);
        return a
    }
    ;
    var Z = function(a, b, c, d, e, f, g, h) {
        Q.call(this);
        var k = this;
        this.G = a;
        this.g = b;
        this.adTagUrl = c;
        this.ba = d;
        this.Na = e;
        this.D = g;
        this.Ma = h;
        this.l = new XF;
        this.M = !1;
        this.volume = 1;
        this.ba = d;
        this.aa = -1;
        this.B = this.j = this.h = null;
        this.A = new EH({
            currentTime: 0
        },this.D);
        this.F = new dI;
        this.ma = this.V = !1;
        this.X = new Map;
        this.Z = this.Ea = !1;
        this.Fa = new XH(b,g);
        uo(this, this.Fa);
        this.I = f && null != this.g.l;
        this.O = function() {
            var m = k.g.da
              , n = m.getCurrentTime();
            m = m.getDuration();
            return {
                currentTime: n,
                duration: m,
                isPlaying: !0,
                volume: k.volume
            }
        }
        ;
        this.U = new Jx(this);
        this.U.N(this.D, "adsManager", this.zb)
    };
    u(Z, Q);
    Z.prototype.zb = function(a) {
        var b = this
          , c = a.messageType
          , d = a.ra
          , e = {};
        switch (c) {
        case "error":
            eI(this);
            fI(this, d);
            break;
        case "contentPauseRequested":
            X.g().report(130);
            gI(this);
            this.A.stop();
            hI(this, c, d);
            break;
        case "contentResumeRequested":
            iI(this, function() {
                hI(b, c, d)
            });
            break;
        case "remainingTime":
            this.aa = d.remainingTime;
            break;
        case "skip":
            hI(this, c, d);
            break;
        case "log":
            hI(this, c, d, d.logData);
            break;
        case "companionBackfill":
            a = Na("window.google_show_companion_ad");
            null != a && a();
            break;
        case "skipShown":
            this.M = !0;
            hI(this, c, d);
            break;
        case "interaction":
            hI(this, c, d, d.interactionData);
            break;
        case "vpaidEvent":
            YH(this.Fa, a);
            break;
        case "skippableStateChanged":
            e = d.adData;
            null != e.skippable && (this.M = e.skippable);
            hI(this, c, d);
            break;
        case "volumeChange":
            e = d.adData;
            null != e && "number" === typeof e.volume && (this.volume = e.volume);
            hI(this, c, d);
            break;
        case "firstQuartile":
            hI(this, pD.firstQuartile, d);
            hI(this, c, d);
            break;
        case "thirdQuartile":
            hI(this, pD.thirdQuartile, d);
            hI(this, c, d);
            break;
        case "updateGfpCookie":
            jI(this, d);
            break;
        default:
            hI(this, c, d)
        }
    }
    ;
    var hI = function(a, b, c, d) {
        if (null == c.companions) {
            var e = a.X.get(c.adId);
            c.companions = null != e ? e : []
        }
        var f = c.adData;
        if (e = null == f ? null : new Y(f))
            a.h = e;
        switch (b) {
        case "adBreakReady":
        case "mediaUrlPinged":
            b = new BH(b,null,c);
            break;
        case "adMetadata":
            b = null;
            null != c.adCuePoints && (b = new VF(c.adCuePoints));
            b = new CH(e,b);
            break;
        case "allAdsCompleted":
            a.h = null;
            a.Ea = !0;
            b = new BH(b,e);
            break;
        case "contentPauseRequested":
            a.Z = !1;
            b = new BH(b,e);
            break;
        case "contentResumeRequested":
            a.h = null;
            a.Z = !0;
            b = new BH(b,e);
            break;
        case "loaded":
            a.aa = e.getDuration();
            a.M = !1;
            hD() && (d = a.G,
            c = a.Na,
            d.h.set(UF(e), a.O),
            NG(d) && MG(d, "loaded", UF(e), c));
            b = new BH(b,e,f);
            break;
        case "start":
            a.X.set(c.adId, c.companions);
            null != a.g.Nb() && (null == a.j ? (a.j = new lF,
            a.U.N(a.j, "click", a.ag)) : pF(a.j),
            nF(a.j, a.g.Nb()));
            b = new BH(b,e);
            break;
        case "complete":
            null != a.j && pF(a.j);
            hD() && PG(a.G, a.O, UF(e));
            a.h = null;
            a.X.delete(c.adId);
            b = new BH(b,e);
            break;
        case "log":
            c = null;
            null != d && null != d.type ? (f = d.type,
            f = "adLoadError" === f || "adPlayError" === f) : f = !1;
            f && (c = {
                adError: new xH(d)
            });
            b = new BH(b,e,c);
            break;
        case "interaction":
            b = new BH(b,e,d);
            break;
        case "adProgress":
            b = new BH(b,e,new DH(c));
            break;
        default:
            b = new BH(b,e)
        }
        a.dispatchEvent(b);
        a.Ea && a.Z && a.destroy()
    }
      , fI = function(a, b) {
        var c = new zH(new xH(b));
        a.V ? (a.dispatchEvent(c),
        hD() && a.h && PG(a.G, a.O, UF(a.h)),
        a.h = null) : a.F.h.push(c);
        a = {
            error: b.errorCode,
            vis: rj(document)
        };
        X.g().report(7, a)
    }
      , kI = function(a, b, c) {
        zD(a.D, "adsManager", b, c)
    }
      , iI = function(a, b) {
        X.g().report(131);
        eI(a, b);
        a.Aa() || a.A.start()
    }
      , gI = function(a) {
        var b = a.g.da;
        tH(a.g) && a.l.restoreCustomPlaybackStateOnAdBreakComplete && null != b.Rd && b.Rd()
    }
      , eI = function(a, b) {
        var c = a.g.da;
        tH(a.g) && a.l.restoreCustomPlaybackStateOnAdBreakComplete && null != c.Zb ? c.Zb(b) : b && b()
    };
    l = Z.prototype;
    l.configureAdsManager = function(a, b) {
        this.B = a;
        null != a.currentTime && (this.A = new EH(a,this.D),
        this.A.start());
        null != b && (this.l = lI(b))
    }
    ;
    l.init = function(a, b, c, d) {
        if (this.F.isEmpty()) {
            var e = this.g
              , f = null;
            e.h && null == d && (f = {
                vd: "setnull"
            });
            e.h && e.h === d && (f = {
                vd: "match"
            });
            if (e.h && e.h !== d) {
                f = gD(d || null);
                var g = nx(d || null);
                f = {
                    vd: "diff",
                    oc: e.O,
                    nc: f,
                    oi: e.M,
                    ni: g
                }
            }
            !e.h && d && (f = {
                vd: "new"
            });
            f && (f.custVid = e.I,
            X.g().report(93, f));
            null != d && (e.H = sH(d),
            fD(e.H) && (e.G = !0,
            so(e.g),
            so(e.j),
            so(e.ya),
            e.g = null,
            e.j = null,
            e.ya = null,
            so(e.da),
            e.da = new WG(d),
            "function" !== typeof d.getBoundingClientRect ? (e.B = e.o,
            DC.j = e.B) : e.B = d,
            e.A.ac(e.da)));
            this.V = !0;
            this.resize(a, b, c);
            d = YF(this.l, this.I);
            e = {};
            a = (e.adsRenderingSettings = d,
            e.width = a,
            e.height = b,
            e.viewMode = c,
            e);
            kI(this, "init", a)
        } else {
            for (; !this.F.isEmpty(); )
                b = a = this.F,
                0 === b.g.length && (b.g = b.h,
                b.g.reverse(),
                b.h = []),
                a = a.g.pop(),
                this.dispatchEvent(a);
            this.W()
        }
    }
    ;
    l.isCustomPlaybackUsed = function() {
        return tH(this.g)
    }
    ;
    l.isCustomClickTrackingUsed = function() {
        return this.I
    }
    ;
    l.getRemainingTime = function() {
        return this.aa
    }
    ;
    l.getAdSkippableState = function() {
        return this.M
    }
    ;
    l.discardAdBreak = function() {
        kI(this, "discardAdBreak")
    }
    ;
    l.updateAdsRenderingSettings = function(a) {
        if (null != a) {
            a = lI(a);
            var b = this.l.bitrate
              , c = a.bitrate;
            X.g().report(96, {
                init: this.V ? "1" : "0",
                start: this.ma ? "1" : "0",
                old: b,
                "new": c,
                changed: b !== c ? "1" : "0"
            });
            this.l = a;
            a = YF(this.l, this.I);
            b = {};
            a = (b.adsRenderingSettings = a,
            b);
            kI(this, "updateAdsRenderingSettings", a)
        }
    }
    ;
    l.skip = function() {
        kI(this, "skip")
    }
    ;
    l.start = function() {
        if (this.adTagUrl) {
            (tc || vc) && X.g().report(50, {
                customPlayback: tH(this.g)
            });
            this.g.ua() || X.g().report(26, {
                adtagurl: this.adTagUrl,
                customPlayback: tH(this.g)
            });
            In(this.g.o) && X.g().report(30, {
                adtagurl: this.adTagUrl,
                customPlayback: tH(this.g)
            });
            var a = this.g.l, b = this.g.o, c;
            if (c = a && b && !In(a))
                a = KG(a),
                b = KG(b),
                c = 0 < a.width && 0 < a.height && 0 < b.width && 0 < b.height && a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
            b = c;
            X.g().report(31, {
                adtagurl: this.adTagUrl,
                customPlayback: tH(this.g),
                covers: b
            })
        }
        if (!this.g.ua() && !tH(this.g))
            throw OD(MD);
        b = this.g;
        b.F = this.I && null != b.l;
        this.g.A.g.style.opacity = "1";
        if (null != this.B && 1 === this.getVolume()) {
            var d, e;
            if ("boolean" === typeof (null == (d = this.B) ? void 0 : d.muted) && (null == (e = this.B) ? 0 : e.muted))
                this.setVolume(0);
            else {
                var f;
                if ("number" === typeof (null == (f = this.B) ? void 0 : f.volume)) {
                    var g;
                    d = null == (g = this.B) ? void 0 : g.volume;
                    if (0 <= d && 1 >= d) {
                        var h;
                        this.setVolume(null == (h = this.B) ? void 0 : h.volume)
                    }
                }
            }
        }
        this.ma = !0;
        kI(this, "start")
    }
    ;
    l.ag = function() {
        if (!this.l.disableClickThrough && null != this.h) {
            var a = this.h.data.clickThroughUrl;
            null != a && hx(a, this.h.data.attributionParams)
        }
    }
    ;
    l.resize = function(a, b, c) {
        var d = this.g
          , e = d.o;
        null != e && (-1 === a ? (e.style.right = "0",
        e.style.left = "0") : e.style.width = a + "px",
        -1 === b ? (e.style.bottom = "0",
        e.style.top = "0") : e.style.height = b + "px");
        e = d.A;
        e.g.width = -1 === a ? "100%" : String(a);
        e.g.height = -1 === b ? "100%" : String(b);
        try {
            e.g.offsetTop = e.g.offsetTop
        } catch (f) {}
        d.size = new D(a,b);
        d = {};
        a = (d.width = a,
        d.height = b,
        d.viewMode = c,
        d);
        kI(this, "resize", a)
    }
    ;
    l.stop = function() {
        kI(this, "stop")
    }
    ;
    l.expand = function() {
        kI(this, "expand")
    }
    ;
    l.collapse = function() {
        kI(this, "collapse")
    }
    ;
    l.getVolume = function() {
        return this.volume
    }
    ;
    l.setVolume = function(a) {
        this.volume = a;
        this.g.da.setVolume(a);
        var b = {};
        a = (b.volume = a,
        b);
        kI(this, "volume", a)
    }
    ;
    l.pause = function() {
        kI(this, "pause")
    }
    ;
    l.resume = function() {
        kI(this, "resume")
    }
    ;
    l.destroy = function() {
        this.W()
    }
    ;
    l.getCuePoints = function() {
        return this.ba
    }
    ;
    l.Bf = function() {
        return this.h
    }
    ;
    l.L = function() {
        kI(this, "destroy");
        null != this.j && this.j.W();
        this.U.W();
        this.F.clear();
        this.A && (this.A.stop(),
        this.A.W());
        hD() && PG(this.G, this.O);
        Q.prototype.L.call(this)
    }
    ;
    l.sf = function() {
        X.g().report(124, {
            api: "clicked"
        });
        var a = this.h && this.h.data.clickThroughUrl, b;
        if (a && (null == (b = this.h) ? 0 : b.oe())) {
            var c;
            hx(a, null == (c = this.h) ? void 0 : c.data.attributionParams)
        }
        kI(this, "click")
    }
    ;
    l.focus = function() {
        zD(this.D, "userInteraction", "focusUiElement")
    }
    ;
    var jI = function(a, b) {
        var c = b.gfpCookieUserEnabled;
        b = b.gfpCookieClearData;
        var d = new ZH;
        d = tf(d, 1, c ? "0" : "1");
        d = Se(d, 2, qe(2147483647));
        d = tf(d, 3, "/");
        d = tf(d, 4, window.location.hostname);
        var e = new aI, f, g;
        a = null != (g = null == (f = a.Ma) ? void 0 : KC(f)) ? g : null;
        bI(e, "__gpi_opt_out", d, a);
        if (!c || b)
            cI(e, "__gads", a),
            cI(e, "__gpi", a)
    };
    Z.prototype.clicked = Z.prototype.sf;
    Z.prototype.getCurrentAd = Z.prototype.Bf;
    Z.prototype.getCuePoints = Z.prototype.getCuePoints;
    Z.prototype.destroy = Z.prototype.destroy;
    Z.prototype.resume = Z.prototype.resume;
    Z.prototype.pause = Z.prototype.pause;
    Z.prototype.setVolume = Z.prototype.setVolume;
    Z.prototype.getVolume = Z.prototype.getVolume;
    Z.prototype.collapse = Z.prototype.collapse;
    Z.prototype.expand = Z.prototype.expand;
    Z.prototype.stop = Z.prototype.stop;
    Z.prototype.resize = Z.prototype.resize;
    Z.prototype.start = Z.prototype.start;
    Z.prototype.skip = Z.prototype.skip;
    Z.prototype.updateAdsRenderingSettings = Z.prototype.updateAdsRenderingSettings;
    Z.prototype.discardAdBreak = Z.prototype.discardAdBreak;
    Z.prototype.getAdSkippableState = Z.prototype.getAdSkippableState;
    Z.prototype.getRemainingTime = Z.prototype.getRemainingTime;
    Z.prototype.isCustomClickTrackingUsed = Z.prototype.isCustomClickTrackingUsed;
    Z.prototype.isCustomPlaybackUsed = Z.prototype.isCustomPlaybackUsed;
    Z.prototype.init = Z.prototype.init;
    function lI(a) {
        if (a instanceof XF)
            return X.g().report(174, {
                valid: !0
            }),
            a;
        X.g().report(174, {
            valid: !1
        });
        var b = new XF;
        b.append(a);
        return b
    }
    ;var mI = {
        ADS_MANAGER_LOADED: "adsManagerLoaded"
    }
      , nI = function(a, b) {
        Js.call(this, "adsManagerLoaded");
        this.g = a;
        this.j = b
    };
    u(nI, Js);
    nI.prototype.getAdsManager = function(a, b) {
        a = a || {
            currentTime: null
        };
        this.g.configureAdsManager(a, b);
        return this.g
    }
    ;
    nI.prototype.getUserRequestContext = function() {
        return this.j
    }
    ;
    nI.prototype.getUserRequestContext = nI.prototype.getUserRequestContext;
    nI.prototype.getAdsManager = nI.prototype.getAdsManager;
    y("module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ads_manager_loaded_event.AdsManagerLoadedEvent.Type", mI);
    var oI = function() {
        this.continuousPlayback = this.adWillPlayMuted = this.adWillAutoPlay = null;
        this.descriptionUrl = "";
        this.iconsSupported = !1;
        this.nonceLengthLimit = Number.MAX_SAFE_INTEGER;
        this.ppid = this.playerVersion = this.playerType = this.omidVersion = this.omidPartnerVersion = this.omidPartnerName = "";
        this.sessionId = tF;
        this.skippablesSupported = !1;
        this.supportedApiFrameworks = [];
        this.videoWidth = this.videoHeight = -1;
        this.url = ""
    };
    y("goog.pal.NonceRequest", oI);
    var pI = function(a, b) {
        (0,
        a.__uspapi)("getUSPData", 1, function(c, d) {
            b.callback({
                lc: null != c ? c : void 0,
                rc: d ? void 0 : 2
            })
        })
    }
      , qI = {
        Cc: function(a) {
            return a.callback
        },
        Tb: function(a, b) {
            a = {};
            return a.__uspapiCall = {
                callId: b,
                command: "getUSPData",
                version: 1
            },
            a
        },
        Eb: function(a, b) {
            b = b.__uspapiReturn;
            var c;
            a({
                lc: null != (c = b.returnValue) ? c : void 0,
                rc: b.success ? void 0 : 2
            })
        }
    };
    function rI(a) {
        var b = {};
        "string" === typeof a.data ? b = JSON.parse(a.data) : b = a.data;
        return {
            payload: b,
            se: b.__uspapiReturn.callId
        }
    }
    var sI = function(a, b) {
        b = void 0 === b ? {} : b;
        P.call(this);
        var c;
        this.timeoutMs = null != (c = b.timeoutMs) ? c : 500;
        this.caller = new ew(a,"__uspapiLocator",function(d) {
            return "function" === typeof d.__uspapi
        }
        ,rI);
        this.caller.l.set("getDataWithCallback", pI);
        this.caller.o.set("getDataWithCallback", qI)
    };
    u(sI, P);
    sI.prototype.L = function() {
        this.caller.W();
        P.prototype.L.call(this)
    }
    ;
    var tI = function(a, b) {
        var c = {};
        if (fw(a.caller)) {
            var d = ng(function() {
                b(c)
            });
            hw(a.caller, "getDataWithCallback", {
                callback: function(e) {
                    e.rc || (c = e.lc);
                    d()
                }
            });
            setTimeout(d, a.timeoutMs)
        } else
            b(c)
    };
    function uI() {
        var a = window, b, c;
        return null != (c = ["pbjs"].concat(null != (b = a._pbjsGlobals) ? b : []).map(function(d) {
            return a[d]
        }).find(function(d) {
            return Array.isArray(null == d ? void 0 : d.que)
        })) ? c : null
    }
    ;function vI(a, b) {
        var c, d, e;
        null == b ? e = void 0 : e = b.get.call(b, a);
        return null != (d = null != (c = e) ? c : null == b ? void 0 : b.get(bi(a))) ? d : 0
    }
    ;var wI = /^v?\d{1,3}(\.\d{1,3}){0,2}(-pre)?$/
      , xI = new Map;
    function yI(a, b, c, d, e) {
        var f = e.getBidResponsesForAdUnitCode;
        if (f) {
            var g, h, k, m, n, q = null != (n = null == (g = f(null != (k = b.Lb) ? k : "")) ? void 0 : g.bids) ? n : null == (h = f(null != (m = b.adUnitCode) ? m : "")) ? void 0 : h.bids;
            if (null != q && q.length && (g = q.filter(function(x) {
                var H = x.adId;
                return x.auctionId !== c && Object.values(d).some(function(T) {
                    return T.includes(H)
                })
            }),
            g.length)) {
                var t, v;
                f = null == (t = e.adUnits) ? void 0 : null == (v = t.find(function(x) {
                    x = x.code;
                    return x === b.Lb || x === b.adUnitCode
                })) ? void 0 : v.mediaTypes;
                t = r(g);
                for (v = t.next(); !v.done; v = t.next())
                    v = v.value,
                    g = zI(v, d, f),
                    g = Eu(a, yu(sf(zu(xu(new wu, v.bidder), 1), 6, !0), g)),
                    AI(v.bidder, e, g),
                    "number" === typeof v.timeToRespond && Se(g, 2, qe(Math.round(v.timeToRespond)))
            }
        }
    }
    function AI(a, b, c) {
        for (var d = []; a && !d.includes(a); ) {
            d.unshift(a);
            var e = void 0
              , f = void 0;
            a = null == (e = b) ? void 0 : null == (f = e.aliasRegistry) ? void 0 : f[a]
        }
        Ye(c, 10, d, we)
    }
    function BI(a, b, c) {
        null != le(Qe(a, 3)) || (c === b.adUnitCode ? Se(a, 3, ke(1)) : c === b.Lb && Se(a, 3, ke(2)))
    }
    function CI(a, b, c, d, e, f, g) {
        f = f.get(null != g ? g : function() {
            return null
        }
        );
        1 !== (null == f ? void 0 : qf(f, 1)) && ef(b, 5, f);
        void 0 !== af(a, qu, 5, !1) || (f ? 1 === qf(f, 1) ? Fu(a, f) : Fu(a, uu(ru(tu(new qu, e), 1), vI(c, d))) : Fu(a, ru(tu(new qu, e), vI(c, d) ? 2 : 3)))
    }
    function zI(a, b, c) {
        var d = a.cpm
          , e = a.originalCpm
          , f = a.currency
          , g = a.originalCurrency
          , h = a.dealId
          , k = a.adserverTargeting
          , m = a.bidder
          , n = a.adId
          , q = a.mediaType
          , t = a.height
          , v = a.width;
        a = new ou;
        "number" === typeof d && (Se(a, 2, qe(Math.round(1E6 * d))),
        g && g !== f || (d = Math.round(1E6 * Number(e)),
        isNaN(d) || d === of(a, 2) || Se(a, 8, qe(d))));
        "string" === typeof f && tf(a, 3, f);
        ["string", "number"].includes(typeof h) && (f = new iu,
        h = tf(f, 1, String(h)),
        ef(a, 6, h));
        if ("object" === typeof k)
            for (m = r(["", "_" + m]),
            h = m.next(); !h.done; h = m.next()) {
                f = h.value;
                h = [];
                d = r(Object.entries(k));
                for (e = d.next(); !e.done; e = d.next()) {
                    e = r(e.value);
                    g = e.next().value;
                    e = e.next().value;
                    g = ("" + g + f).slice(0, 20);
                    var x = void 0;
                    if (null != (x = b[g]) && x.length)
                        if (b[g][0] === String(e))
                            h.push(g);
                        else {
                            h = [];
                            break
                        }
                }
                f = Te(a, 4, ye);
                Ye(a, 4, f.concat(h), we)
            }
        switch (q || "banner") {
        case "banner":
            Se(a, 5, ke(1));
            break;
        case "native":
            Se(a, 5, ke(2));
            break;
        case "video":
            Se(a, 5, ke(3));
            b = new mu;
            var H;
            if ("adpod" === (null == c ? void 0 : null == (H = c.video) ? void 0 : H.context)) {
                var T, la = null == c ? void 0 : null == (T = c.video) ? void 0 : T.adPodDurationSec;
                Se(b, 1, qe(la))
            } else
                T = null == c ? void 0 : null == (la = c.video) ? void 0 : la.maxduration,
                Se(b, 1, qe(T));
            var da;
            if ("number" === typeof (null == c ? void 0 : null == (da = c.video) ? void 0 : da.skip)) {
                var K;
                c = !!(null == c ? 0 : null == (K = c.video) ? 0 : K.skip);
                sf(b, 2, c)
            }
            ef(a, 9, b)
        }
        Number.isFinite(t) && Number.isFinite(v) && (K = new ku,
        v = Se(K, 1, ne(Math.round(v))),
        t = Se(v, 2, ne(Math.round(t))),
        ef(a, 7, t));
        "string" === typeof n && tf(a, 1, n);
        return a
    }
    function DI(a, b) {
        var c = new Map
          , d = function(k) {
            var m = c.get(k);
            m || (m = {},
            c.set(k, m));
            return m
        }
          , e = [];
        a = r(a);
        for (var f = a.next(); !f.done; f = a.next()) {
            f = f.value;
            var g = f.args
              , h = f.eventType;
            f = f.elapsedTime;
            "bidTimeout" === h && e.push.apply(e, ia(g));
            switch (h) {
            case "bidRequested":
                if (g.auctionId !== b)
                    continue;
                if (!Array.isArray(g.bids))
                    continue;
                g = r(g.bids);
                for (h = g.next(); !h.done; h = g.next())
                    if (h = h.value.bidId)
                        d(h).requestTime = f;
                break;
            case "noBid":
                g.auctionId === b && g.bidId && (d(g.bidId).hg = f)
            }
        }
        d = new Map;
        a = r(c.entries());
        for (f = a.next(); !f.done; f = a.next())
            g = r(f.value),
            f = g.next().value,
            h = g.next().value,
            g = h.requestTime,
            h = h.hg,
            g && h && d.set(f, {
                latency: h - g,
                ne: !1
            });
        e = r(e);
        for (a = e.next(); !a.done; a = e.next())
            if (f = a.value,
            a = f.bidId,
            f = f.auctionId,
            a && f === b && (a = d.get(a)))
                a.ne = !0;
        return d
    }
    function EI(a, b) {
        var c = {};
        c = void 0 === c ? {} : c;
        var d = void 0 === d ? new Map : d;
        var e = void 0 === e ? !1 : e;
        var f = void 0 === f ? new Map : f;
        var g = void 0 === g ? new Bu : g;
        var h = new Map, k = (0,
        a.getEvents)(), m = k.filter(function(Da) {
            var Va = Da.args;
            return "auctionEnd" === Da.eventType && Va.auctionId
        }), n = new Hu, q = function(Da) {
            return Da === b.Lb || Da === b.adUnitCode
        }, t, v, x, H = null != (x = xI.get((null != (t = b.Lb) ? t : "") + (null != (v = b.adUnitCode) ? v : ""))) ? x : 0, T;
        m = null != (T = m.filter(function(Da) {
            var Va, Tf, od;
            return Number(null == (Va = Da.args) ? void 0 : Va.timestamp) > H && (null == (Tf = Da.args) ? void 0 : null == (od = Tf.adUnitCodes) ? void 0 : od.find(q))
        })) ? T : [];
        if (!m.length)
            return null;
        var la;
        if (m = null == (la = m.reduce(function(Da, Va) {
            return Number(Va.args.timestamp) > Number(Da.args.timestamp) ? Va : Da
        })) ? void 0 : la.args) {
            T = void 0 === m.bidderRequests ? [] : m.bidderRequests;
            la = void 0 === m.bidsReceived ? [] : m.bidsReceived;
            var da = m.auctionId;
            m = m.timestamp;
            if (da && null != m && T.length) {
                var K, Pd;
                xI.set((null != (K = b.Lb) ? K : "") + (null != (Pd = b.adUnitCode) ? Pd : ""), m);
                K = Iu(n);
                a.version && wI.test(a.version) && tf(K, 6, a.version);
                ef(K, 9, g);
                g = mg(function() {
                    return DI(k, da)
                });
                Pd = r(T);
                m = Pd.next();
                for (T = {}; !m.done; T = {
                    bidderCode: void 0,
                    Ae: void 0
                },
                m = Pd.next()) {
                    t = m.value;
                    T.bidderCode = t.bidderCode;
                    v = t.bids;
                    m = t.timeout;
                    T.Ae = t.src;
                    t = t.auctionStart;
                    v = r(v);
                    var Gc = v.next();
                    for (x = {}; !Gc.done; x = {
                        dc: void 0
                    },
                    Gc = v.next()) {
                        var pc = Gc.value;
                        x.dc = pc.bidId;
                        var $a = pc.transactionId;
                        Gc = pc.adUnitCode;
                        var np = pc.getFloor;
                        pc = pc.mediaTypes;
                        if (x.dc && q(Gc)) {
                            BI(K, b, Gc);
                            $a && (null != jf(K, 4) || tf(K, 4, $a),
                            h.has($a) || h.set($a, t));
                            null == oe(Qe(K, 8)) && Number.isFinite(m) && Se(K, 8, ne(m));
                            var Qd = la.find(function(Da) {
                                return function(Va) {
                                    return Va.requestId === Da.dc
                                }
                            }(x));
                            $a = Eu(K, function(Da) {
                                return function() {
                                    var Va = xu(new wu, Da.bidderCode);
                                    AI(Da.bidderCode, a, Va);
                                    switch (Da.Ae) {
                                    case "client":
                                        Se(Va, 7, ke(1));
                                        break;
                                    case "s2s":
                                        Se(Va, 7, ke(2))
                                    }
                                    return Va
                                }
                            }(T)());
                            CI(K, $a, Gc, d, e, f, np);
                            Qd ? (zu($a, 1),
                            "number" === typeof Qd.timeToRespond && Number.isFinite(Qd.timeToRespond) && Se($a, 2, qe(Math.round(Qd.timeToRespond))),
                            x = zI(Qd, c, pc),
                            yu($a, x)) : (x = g().get(x.dc)) && !x.ne ? (zu($a, 2),
                            Number.isFinite(x.latency) && Se($a, 2, qe(Math.round(x.latency)))) : (x = zu($a, 3),
                            Number.isFinite(m) && Se(x, 2, qe(Math.round(m))))
                        }
                    }
                }
                var ph;
                (null == (ph = a.getConfig) ? 0 : ph.call(a).useBidCache) && yI(K, b, da, c, a);
                return n
            }
        }
    }
    ;var FI = function(a) {
        Q.call(this);
        var b = this;
        this.F = !1;
        var c = AC(CC(this.getSettings()));
        c && 0 < c.length && (Yj.reset(),
        fk(new Ek(c)));
        this.B = new aI;
        this.A = null;
        this.g = a;
        this.G = new Map;
        this.j = this.g.A;
        this.M = new Jx(this);
        uo(this, this.M);
        this.V = new vw(window,{
            timeoutMs: 500
        });
        this.X = new sI(window,{
            timeoutMs: 500
        });
        this.O = new dF;
        gF(this.O);
        a = new pw(window,{
            timeoutMs: 500
        });
        this.U = new AF(a,500);
        uo(this, this.U);
        this.h = null;
        this.I = {};
        0 !== DC.g ? (this.l = new HG,
        uo(this, this.l)) : this.l = IG();
        hD() && (this.l.init(CG(this.j)),
        this.D = OG(this.l, this.g.B),
        to(this, function() {
            var d = b.D;
            b.l.j.delete(d);
            0 !== DC.g && (C(ps).o[d] = null)
        }))
    };
    u(FI, Q);
    FI.prototype.destroy = function() {
        this.W()
    }
    ;
    FI.prototype.getVersion = function() {
        return "h.3.616.1"
    }
    ;
    FI.prototype.requestAds = function(a, b) {
        var c = this
          , d = []
          , e = null;
        xw(this.V) && d.push(new Promise(function(h) {
            Aw(c.V, function(k) {
                e = k;
                h()
            })
        }
        ));
        var f = null;
        fw(this.X.caller) && d.push(new Promise(function(h) {
            tI(c.X, function(k) {
                f = k;
                h()
            })
        }
        ));
        var g = null;
        d.push(CF(this.U).then(function(h) {
            g = h
        }));
        Promise.all(d).then(function() {
            GI(c, a, b, {
                Id: e,
                Ld: f,
                fd: g
            })
        })
    }
    ;
    var GI = function(a, b, c, d) {
        var e = b.adTagUrl;
        e && X.g().report(8, {
            adtagurl: e,
            customPlayback: tH(a.g),
            customClick: null != a.g.l
        });
        var f = "goog_" + fh++;
        a.G.set(f, c || null);
        var g = HI({
            adTagUrl: e,
            me: !0,
            Id: d.Id,
            Ld: d.Ld,
            fd: d.fd
        });
        a.h = HC(e, g || {});
        XE(a.h, function() {
            II(a)
        });
        c = Promise.resolve();
        L(zl) && (c = new Promise(function(n) {
            setTimeout(function() {
                n()
            }, 50)
        }
        ));
        var h, k = null == (h = b.adTagUrl) ? void 0 : h.includes("GOOGLE_INSTREAM_VIDEO_NONCE"), m = JC(a.h);
        h = JI(a, m, k);
        d = gF(a.O);
        e = Promise.resolve(null);
        if (L(El) || L(Fl) || L(Gl))
            e = 0,
            L(El) ? e = 50 : L(Fl) ? e = 500 : L(Gl) && (e = 5E3),
            e = Promise.race([yF.getConfig(), Qt(e, null)]);
        KI(a);
        Promise.all([c, h, d, e]).then(function(n) {
            var q = r(n);
            q.next();
            q.next();
            n = q.next().value;
            q = q.next().value;
            var t = {};
            X.g().report(182, (t.aid = !!DC.A,
            t.aidf = !!a.A,
            t.hsc = !m && k,
            t));
            LI(a, f, b, g, n, q)
        })
    };
    FI.prototype.getSettings = function() {
        return DC
    }
    ;
    FI.prototype.contentComplete = function() {
        zD(CG(this.j), "adsLoader", "contentComplete")
    }
    ;
    FI.prototype.Z = function(a) {
        var b = a.messageType;
        switch (b) {
        case "adsLoaded":
            b = a.ra;
            a = a.sessionId;
            b = new Z(this.l,this.g,b.adTagUrl || "",b.adCuePoints,this.D,b.isCustomClickTrackingAllowed,CG(this.j, a),this.h);
            this.dispatchEvent(new nI(b,MI(this, a)));
            break;
        case "error":
            b = a.ra;
            this.dispatchEvent(new zH(new xH(b),MI(this, a.sessionId)));
            a = {
                error: b.errorCode,
                vis: rj(document)
            };
            X.g().report(7, a);
            break;
        case "cookieUpdate":
            a = a.ra;
            if (null == a)
                break;
            if (DC.isCookiesEnabled()) {
                b = new EC;
                sf(b, 5, !0);
                var c = a.gfpCookie;
                c && bI(this.B, "__gads", $H(c), b);
                (c = a.gfpCookieV2) && bI(this.B, "__gpi", $H(c), b)
            }
            NI(this, a.encryptedSignalBidderIds || []);
            break;
        case "trackingUrlPinged":
            this.dispatchEvent(new BH(b,null,a.ra))
        }
    }
    ;
    var NI = function(a, b) {
        0 !== b.length && (b = YE(b.map(function(c) {
            return {
                jc: c
            }
        }), a.h)) && b.forEach(function(c) {
            c.then(function(d) {
                d && II(a)
            })
        })
    }
      , II = function(a) {
        var b = sE(WE(a.h));
        b && (a.I.espSignals = b,
        zD(CG(a.j), "adsLoader", "signalsRefresh", a.I))
    }
      , MI = function(a, b) {
        var c = a.G.get(b);
        a.G.delete(b);
        return null != c ? c : null
    }
      , HI = function(a) {
        var b = a.Id, c = a.Ld, d = a.fd, e, f, g, h, k, m, n = {};
        var q = void 0 === q ? w : q;
        return n.gfcLoaded = ei(q.top, "googlefcLoaded"),
        n.isGdprLoader = a.me,
        n.addtlConsent = null != (e = null == b ? void 0 : b.addtlConsent) ? e : null,
        n.gdprApplies = null != (f = null == b ? void 0 : b.gdprApplies) ? f : null,
        n.tcString = null != (g = null == b ? void 0 : b.tcString) ? g : null,
        n.uspString = null != (h = null == c ? void 0 : c.uspString) ? h : null,
        n.gppString = null != (k = null == d ? void 0 : d.gppString) ? k : null,
        n.gppSid = null != (m = null == d ? void 0 : d.sid) ? m : null,
        n
    }
      , JI = function(a, b, c) {
        if (b)
            return a.A = null,
            Promise.resolve([]);
        b = [];
        b.push(OI());
        c && b.push(PI(a));
        return Promise.all(b)
    }
      , LI = function(a, b, c, d, e, f) {
        d = QI(a, c, d, e);
        b = CG(a.j, b);
        a.M.N(b, "adsLoader", a.Z);
        zD(b, "adsLoader", "requestAds", d);
        a = {};
        X.g().report(155, (a.ws = cF(),
        a.blob = null != e ? e : "undef",
        a));
        if (f) {
            var g, h, k;
            e = null != (k = null == (g = bf(f, Ku, 2)) ? void 0 : null == (h = df(g, Ju, 1)) ? void 0 : h.map(function(q) {
                return pf(q, 1)
            })) ? k : [];
            var m;
            c = null != (m = c.adTagUrl) ? m : "";
            var n = vC(c);
            m = e.some(function(q) {
                return q === n
            });
            c = c ? pC(c) ? "adsense" : oC(c) ? "dbm" : nC(c) ? "dcm" : rC(c) ? "dv3" : qC(c) ? "xfp" : "thirdparty" : "";
            X.g().report(190, {
                fm: m,
                rt: c
            }, !0)
        }
    }
      , PI = function(a) {
        var b;
        return Ia(function(c) {
            if (1 == c.g)
                return a.A || (a.A = new wD,
                xD(a.A)),
                ya(c, a.A.getId(), 2);
            b = c.h;
            DC.A = b.id || "";
            c.g = 0
        })
    }
      , OI = function() {
        return Hb() && (L(Dl) || L(Cl)) ? L(Cl) ? new Promise(function(a) {
            setTimeout(function() {
                a()
            }, 50)
        }
        ) : RI().then(function(a) {
            var b, c = null != (b = a.label) ? b : "";
            DC.H = c;
            DC.G = a.status
        }) : Promise.resolve()
    }
      , RI = function() {
        if (navigator.cookieDeprecationLabel) {
            var a = navigator.cookieDeprecationLabel.getValue().then(function(c) {
                return {
                    label: c,
                    status: 1
                }
            }).catch(function() {
                return {
                    label: "",
                    status: 2
                }
            })
              , b = new Promise(function(c) {
                setTimeout(function() {
                    c({
                        label: "",
                        status: 5
                    })
                }, 50)
            }
            );
            return Promise.race([b, a])
        }
        return Promise.resolve({
            label: "",
            status: 3
        })
    }
      , QI = function(a, b, c, d) {
        var e = {}
          , f = (e.limaExperimentIds = ek().sort().join(","),
        e)
          , g = a.getSettings()
          , h = NG(a.l);
        h = void 0 === h ? null : h;
        var k = {};
        null != h && (k.activeViewPushUpdates = h);
        k.activityMonitorMode = g.g;
        k.adsToken = g.A;
        k.autoPlayAdBreaks = g.o;
        k.companionBackfill = g.getCompanionBackfill();
        k.cookiesEnabled = g.isCookiesEnabled();
        k.disableCustomPlaybackForIOS10Plus = g.getDisableCustomPlaybackForIOS10Plus();
        k.engagementDetection = !0;
        k.isFunctionalTest = !1;
        k.isVpaidAdapter = g.h;
        k["1pJar"] = "";
        k.numRedirects = g.getNumRedirects();
        k.pageCorrelator = g.K;
        k.persistentStateCorrelator = nj();
        k.playerType = g.getPlayerType();
        k.playerVersion = g.getPlayerVersion();
        k.ppid = g.getPpid();
        k.privacyControls = "";
        k.reportMediaRequests = !1;
        k.sessionId = g.sessionId;
        k.streamCorrelator = g.D;
        k.testingConfig = CC(g).g;
        k.urlSignals = g.V;
        k.vpaidMode = g.l;
        k.featureFlags = g.getFeatureFlags();
        k.cookieDeprecationLabel = g.H;
        k.cookieDeprecationLabelStatus = g.G;
        var m = b.adTagUrl
          , n = {};
        n.contentMediaUrl = a.g.K;
        n.customClickTrackingProvided = null != a.g.l;
        n.isAmp = lD();
        a: {
            try {
                var q = window.top.location.href
            } catch (Zj) {
                var t = 2;
                break a
            }
            t = null == q ? 2 : q == window.document.location.href ? 0 : 1
        }
        n.iframeState = t;
        n.imaHostingDomain = window.document.domain;
        n.imaHostingPageUrl = window.document.URL;
        n.topAccessiblePageUrl = kD();
        n.referrer = window.document.referrer;
        n.domLoadTime = a.j.I;
        n.sdkImplLoadTime = a.j.M;
        n.supportsResizing = !tH(a.g);
        var v = E().location.ancestorOrigins;
        n.topOrigin = v ? 0 < v.length && 200 > v[v.length - 1].length ? v[v.length - 1] : "" : null;
        n.osdId = a.D;
        n.usesCustomVideoPlayback = tH(a.g);
        n.usesProxyMediaElement = uH(a.g);
        n.usesInlinePlayback = a.g.H;
        var x = a.g.Oc
          , H = []
          , T = ""
          , la = "";
        if (null != x) {
            var da = x
              , K = !0;
            K = void 0 === K ? !1 : K;
            for (var Pd = [], Gc = 0; da && 25 > Gc; ++Gc) {
                var pc = void 0
                  , $a = "";
                void 0 !== K && K || ($a = ($a = 9 !== da.nodeType && da.id) ? "/" + $a : "");
                a: {
                    if (da && da.nodeName && da.parentElement)
                        for (var np = da.nodeName.toString().toLowerCase(), Qd = da.parentElement.childNodes, ph = 0, Da = 0; Da < Qd.length; ++Da) {
                            var Va = Qd[Da];
                            if (Va.nodeName && Va.nodeName.toString().toLowerCase() === np) {
                                if (da === Va) {
                                    pc = "." + ph;
                                    break a
                                }
                                ++ph
                            }
                        }
                    pc = ""
                }
                Pd.push((da.nodeName && da.nodeName.toString().toLowerCase()) + $a + pc);
                da = da.parentElement
            }
            T = Pd.join();
            if (x) {
                var Tf = x.ownerDocument
                  , od = Tf && (Tf.defaultView || Tf.parentWindow) || null
                  , cy = [];
                if (od)
                    try {
                        for (var qh = od.parent, dy = 0; qh && qh !== od && 25 > dy; ++dy) {
                            for (var ey = qh.frames, ak = 0; ak < ey.length; ++ak)
                                if (od === ey[ak]) {
                                    cy.push(ak);
                                    break
                                }
                            od = qh;
                            qh = od.parent
                        }
                    } catch (Zj) {}
                la = cy.join()
            } else
                la = ""
        }
        H.push(T, la);
        if (null != m) {
            for (var op = 0; op < $v.length - 1; ++op)
                H.push(Lh(m, $v[op]) || "");
            var fy = Lh(m, "videoad_start_delay")
              , gy = "";
            if (fy) {
                var hy = parseInt(fy, 10);
                gy = 0 > hy ? "postroll" : 0 == hy ? "preroll" : "midroll"
            }
            H.push(gy)
        } else
            for (var iy = 0; iy < $v.length; ++iy)
                H.push("");
        var dJ = (n.videoAdKey = bi(H.join(":")).toString(),
        n);
        var rh = {}
          , qc = (rh.consentSettings = c,
        rh.imalibExperiments = f,
        rh.settings = k,
        rh.videoEnvironment = dJ,
        rh)
          , Xa = {};
        Xa.adsResponse = b.adsResponse;
        Xa.videoPlayActivation = b.h;
        Xa.videoPlayMuted = b.j;
        Xa.videoContinuousPlay = b.g;
        Xa.adTagUrl = b.adTagUrl;
        Xa.contentDuration = b.contentDuration;
        Xa.contentKeywords = b.contentKeywords;
        Xa.contentTitle = b.contentTitle;
        Xa.linearAdSlotWidth = b.linearAdSlotWidth;
        Xa.linearAdSlotHeight = b.linearAdSlotHeight;
        Xa.nonLinearAdSlotWidth = b.nonLinearAdSlotWidth;
        Xa.nonLinearAdSlotHeight = b.nonLinearAdSlotHeight;
        Xa.forceNonLinearFullSlot = b.forceNonLinearFullSlot;
        Xa.liveStreamPrefetchSeconds = b.liveStreamPrefetchSeconds;
        Xa.vastLoadTimeout = b.vastLoadTimeout;
        Xa.omidAccessModeRules = b.omidAccessModeRules;
        Xa.pageUrl = b.pageUrl;
        Object.assign(qc, Xa);
        if (a.h && DC.isCookiesEnabled()) {
            var rc = KC(a.h)
              , Ce = a.B;
            if (0 === Ce.h) {
                if (rc && vk("__gads", rc, Ce.g))
                    var jy = !0;
                else {
                    var ky = Ce.g;
                    lf(rc, 5) && uk(ky) && (new sk(ky.document)).set("GoogleAdServingTest", "Good", void 0);
                    var ly = "Good" === vk("GoogleAdServingTest", rc, Ce.g);
                    if (ly) {
                        var my = Ce.g;
                        lf(rc, 5) && uk(my) && (new sk(my.document)).remove("GoogleAdServingTest", void 0, void 0)
                    }
                    jy = ly
                }
                Ce.h = jy ? 2 : 1
            }
            qc.isBrowserCookieEnabled = 2 === Ce.h;
            var ny = rc ? vk("__gads", rc, a.B.g) : null;
            null !== ny && (qc.gfpCookieValue = ny);
            var oy = rc ? vk("__gpi", rc, a.B.g) : null;
            null !== oy && (qc.gfpCookieV2Id = oy);
            var py = rc ? vk("__gpi_opt_out", rc, a.B.g) : null;
            null !== py && (qc.gfpCookieV2OptOut = py)
        }
        var pp = sE(WE(a.h));
        pp && (a.I.espSignals = pp,
        qc.espSignals = pp);
        if (L(vl) || L(wl) || L(xl) || L(yl))
            try {
                var na = new oI
                  , sh = null;
                b.pageUrl ? sh = b.pageUrl : fx(b.adTagUrl) && (sh = (new URL(b.adTagUrl)).searchParams.get("url"));
                sh && fx(sh) && (na.url = sh);
                na.videoHeight = b.linearAdSlotHeight;
                na.videoWidth = b.linearAdSlotWidth;
                var eJ = Map
                  , qy = []
                  , fJ = qy.concat
                  , gJ = Map
                  , ry = []
                  , hJ = ry.concat
                  , Rd = new Map;
                Rd.set("eid", ek().sort().join(","));
                Rd.set("aselc", "3");
                Rd.set("correlator", "");
                Rd.set("pal_v", "");
                Rd.set("ref", (new ki).j || window.document.referrer);
                Rd.set("useragent", wb());
                Rd.set("sdkv", "");
                var iJ = ia(Rd)
                  , Eb = new Map;
                null != na.adWillAutoPlay && Eb.set("vpa", na.adWillAutoPlay ? "auto" : "click");
                null != na.adWillPlayMuted && Eb.set("vpmute", na.adWillPlayMuted ? "1" : "0");
                null != na.continuousPlayback && Eb.set("vconp", na.continuousPlayback ? "2" : "1");
                Eb.set("wta", na.iconsSupported ? "1" : "0");
                Eb.set("pss", na.skippablesSupported ? "1" : "0");
                500 >= na.descriptionUrl.length && Eb.set("video_url_to_fetch", na.descriptionUrl);
                200 >= na.ppid.length && Eb.set("ppid", na.ppid);
                200 >= na.playerType.length && Eb.set("mpt", na.playerType);
                200 >= na.playerVersion.length && Eb.set("mpv", na.playerVersion);
                Eb.set("sid", na.sessionId);
                var bk = na.videoHeight
                  , ck = na.videoWidth;
                if (-1 !== bk || -1 !== ck) {
                    var jJ = 0 <= bk ? bk.toString() : "0"
                      , kJ = 0 <= ck ? ck.toString() : "0"
                      , sy = "l";
                    bk > ck && (sy = "p");
                    Eb.set("vp_h", jJ);
                    Eb.set("vp_w", kJ);
                    Eb.set("u_so", sy)
                }
                var lJ = ia(Eb)
                  , Hc = new Map
                  , Fb = {};
                Fb.u_tz = -(new Date).getTimezoneOffset();
                var qp = void 0 === qp ? O : qp;
                try {
                    var ty = qp.history.length
                } catch (Zj) {
                    ty = 0
                }
                Fb.u_his = ty;
                var uy;
                Fb.u_h = null == (uy = O.screen) ? void 0 : uy.height;
                var vy;
                Fb.u_w = null == (vy = O.screen) ? void 0 : vy.width;
                var wy;
                Fb.u_ah = null == (wy = O.screen) ? void 0 : wy.availHeight;
                var yy;
                Fb.u_aw = null == (yy = O.screen) ? void 0 : yy.availWidth;
                var zy;
                Fb.u_cd = null == (zy = O.screen) ? void 0 : zy.colorDepth;
                Hc.set("u_ah", uF(Fb.u_ah));
                Hc.set("u_aw", uF(Fb.u_aw));
                Hc.set("u_cd", uF(Fb.u_cd));
                Hc.set("u_his", uF(Fb.u_his));
                Hc.set("nhd", uF(Math.max(ji().length, 0)));
                Hc.set("u_h", uF(Fb.u_h));
                Hc.set("u_w", uF(Fb.u_w));
                Hc.set("dt", uF(av));
                Hc.set("u_tz", uF(Fb.u_tz));
                var mJ = ia(new gJ(hJ.call(ry, iJ, lJ, ia(Hc))))
                  , nJ = Map
                  , Ay = []
                  , oJ = Ay.concat
                  , By = new Map;
                By.set("sodar_correlator", "");
                var pJ = ia(By)
                  , Sd = new Map
                  , Cy = !1
                  , rp = na.omidVersion;
                0 < rp.length && 200 >= rp.length && Sd.set("omid_v", rp);
                var sp = na.omidPartnerName
                  , tp = na.omidPartnerVersion;
                0 < sp.length && 0 < tp.length && 200 >= sp.length && 200 >= tp.length && (Sd.set("omid_p", sp + "/" + tp),
                Cy = !0);
                var up = na.supportedApiFrameworks;
                !up.includes(7) && Cy && up.push(7);
                Sd.set("sdk_apis", up.toString());
                var qJ = kD()
                  , vp = ni();
                var Dy = vp.h ? vp.h.url : vp.g.url;
                Sd.set("top", qJ);
                na.url ? (Sd.set("url", na.url),
                Sd.set("loc", Dy)) : Sd.set("url", Dy);
                for (var dk = new eJ(fJ.call(qy, mJ, ia(new nJ(oJ.call(Ay, pJ, ia(Sd)))))), Ey = r(dk.keys()), wp = Ey.next(); !wp.done; wp = Ey.next()) {
                    var Fy = wp.value;
                    ob(dk.get(Fy)) && dk.delete(Fy)
                }
                var xp = dk
            } catch (Zj) {
                var Gy;
                X.g().report(181, {
                    message: null == (Gy = Zj) ? void 0 : Gy.message
                });
                xp = null
            }
        else
            xp = null;
        var Hy = xp;
        Hy && (qc.palSignals = Object.fromEntries(Hy));
        d && (qc.gmaSignals = d);
        qc.isEapLoader = !1;
        if (L(Hl)) {
            var Iy = uI();
            if (Iy) {
                var Jy = (new URL(b.adTagUrl)).searchParams.get("iu");
                if (Jy) {
                    var Ky = EI(Iy, {
                        adUnitCode: Jy
                    });
                    qc.clientBidsProto = Ky ? Pc(Ky.g(), 3) : void 0
                }
            }
        }
        return qc
    }
      , KI = function(a) {
        var b = E(), c, d = null == (c = a.h) ? void 0 : JC(c), e, f = b.isSecureContext;
        c = b.document;
        c = void 0 === c ? b.document : c;
        if (b = f && "sharedStorage"in b && b.sharedStorage)
            b = c,
            b = void 0 === b ? document : b,
            b = !(null == (e = b.featurePolicy) || !e.allowedFeatures().includes("shared-storage"));
        e = !!b;
        b = a.F || d || !e;
        L(Il) && (X.g().report(191, {
            enabled: !b,
            clientAgePingCalled: a.F,
            isIdless: d,
            isSharedStorageEnabled: e
        }),
        b || (a.F = !0,
        e = a.j,
        a = L(Jl),
        d = cD.g().g,
        (e = Dh(e.g)) && yG(e, d, a)))
    };
    FI.prototype.contentComplete = FI.prototype.contentComplete;
    FI.prototype.getSettings = FI.prototype.getSettings;
    FI.prototype.requestAds = FI.prototype.requestAds;
    FI.prototype.getVersion = FI.prototype.getVersion;
    FI.prototype.destroy = FI.prototype.destroy;
    var SI = function() {
        this.j = this.h = "unknown";
        this.g = "0";
        this.adsResponse = null;
        this.adTagUrl = "";
        this.contentTitle = this.contentKeywords = this.contentDuration = null;
        this.forceNonLinearFullSlot = !1;
        this.nonLinearAdSlotWidth = this.nonLinearAdSlotHeight = this.liveStreamPrefetchSeconds = this.linearAdSlotWidth = this.linearAdSlotHeight = 0;
        this.omidAccessModeRules = {};
        this.pageUrl = null;
        this.vastLoadTimeout = 5E3
    };
    SI.prototype.setAdWillAutoPlay = function(a) {
        this.h = a ? "auto" : "click"
    }
    ;
    SI.prototype.setAdWillPlayMuted = function(a) {
        this.j = a ? "muted" : "unmuted"
    }
    ;
    SI.prototype.setContinuousPlayback = function(a) {
        this.g = a ? "2" : "1"
    }
    ;
    SI.prototype.setContinuousPlayback = SI.prototype.setContinuousPlayback;
    SI.prototype.setAdWillPlayMuted = SI.prototype.setAdWillPlayMuted;
    SI.prototype.setAdWillAutoPlay = SI.prototype.setAdWillAutoPlay;
    function TI(a, b) {
        return a && (a[b] || (a[b] = {}))
    }
    function UI(a, b) {
        var c;
        if (c = void 0 === c ? "undefined" === typeof omidExports ? null : omidExports : c)
            a = a.split("."),
            a.slice(0, a.length - 1).reduce(TI, c)[a[a.length - 1]] = b
    }
    ;var VI = new Map([[2, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.moatads\.com\/.*$/]], [3, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.doubleverify\.com\/.*$/, /^(https?:\/\/|\/\/)?c\.[\w\-]+\.com\/vfw\/dv\/.*$/, /^(https?:\/\/|\/\/)?(www\.)?[\w]+\.tv\/r\/s\/d\/.*$/, /^(https?:\/\/|\/\/)?(\w\.?)+\.dv\.tech\/.*$/]], [4, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.adsafeprotected\.com\/.*$/]], [5, [/^https?:\/\/(q|cdn)\.adrta\.com\/s\/.*\/(aa|aanf)\.js.*$/, /^https:\/\/cdn\.rta247\.com\/s\/.*\/(aa|aanf)\.js.*$/]], [6, []], [7, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.voicefive\.com\/.*$/, /^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.measuread\.com\/.*$/, /^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.scorecardresearch\.com\/.*$/]], [8, [/^(https?:\/\/|\/\/)?s418\.mxcdn\.net\/bb-serve\/omid-meetrics.*\.js$/]], [9, [/^(https?:\/\/|\/\/)?pagead2\.googlesyndication\.com\/.*$/, /^(https?:\/\/|\/\/)?www\.googletagservices\.com\/.*$/]]]);
    UI("OmidSessionClient.verificationVendorIdForScriptUrl", function(a) {
        for (var b = r(VI.keys()), c = b.next(); !c.done; c = b.next()) {
            c = c.value;
            for (var d = r(VI.get(c)), e = d.next(); !e.done; e = d.next())
                if (e.value.test(a))
                    return c
        }
        return 1
    });
    UI("OmidSessionClient.VerificationVendorId", {
        OTHER: 1,
        MOAT: 2,
        DOUBLEVERIFY: 3,
        INTEGRAL_AD_SCIENCE: 4,
        PIXELATE: 5,
        NIELSEN: 6,
        COMSCORE: 7,
        MEETRICS: 8,
        GOOGLE: 9
    });
    y("google.ima.AdCuePoints.POSTROLL", -1, window);
    y("google.ima.AdCuePoints.PREROLL", 0, window);
    y("google.ima.AdDisplayContainer", vH, window);
    y("google.ima.AdError.ErrorCode", U, window);
    y("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_USED", -1, window);
    y("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_REQUIRED", -1, window);
    y("google.ima.AdError.ErrorCode.VAST_MEDIA_ERROR", -1, window);
    y("google.ima.AdError.ErrorCode.ADSLOT_NOT_VISIBLE", -1, window);
    y("google.ima.AdError.ErrorCode.OVERLAY_AD_LOADING_FAILED", -1, window);
    y("google.ima.AdError.ErrorCode.VAST_MALFORMED_RESPONSE", -1, window);
    y("google.ima.AdError.ErrorCode.COMPANION_AD_LOADING_FAILED", -1, window);
    y("google.ima.AdError.Type", wH, window);
    y("google.ima.AdErrorEvent.Type", yH, window);
    y("google.ima.AdEvent.Type", AH, window);
    y("google.ima.AdsLoader", FI, window);
    y("google.ima.AdsManagerLoadedEvent.Type", mI, window);
    y("google.ima.CompanionAdSelectionSettings", ED, window);
    y("google.ima.CompanionAdSelectionSettings.CreativeType", BD);
    y("google.ima.CompanionAdSelectionSettings.ResourceType", CD);
    y("google.ima.CompanionAdSelectionSettings.SizeCriteria", DD);
    y("google.ima.CustomContentLoadedEvent.Type.CUSTOM_CONTENT_LOADED", "deprecated-event", window);
    y("ima.ImaSdkSettings", V, window);
    y("google.ima.settings", DC, window);
    y("google.ima.ImaSdkSettings.CompanionBackfillMode", {
        ALWAYS: "always",
        ON_MASTER_AD: "on_master_ad"
    });
    y("google.ima.ImaSdkSettings.VpaidMode", {
        DISABLED: 0,
        ENABLED: 1,
        INSECURE: 2,
        0: "DISABLED",
        1: "ENABLED",
        2: "INSECURE"
    });
    y("google.ima.AdsRenderingSettings", XF, window);
    y("google.ima.AdsRenderingSettings.AUTO_SCALE", -1, window);
    y("google.ima.AdsRequest", SI, window);
    y("google.ima.VERSION", "3.616.1");
    y("google.ima.OmidAccessMode", {
        LIMITED: "limited",
        DOMAIN: "domain",
        FULL: "full"
    });
    y("google.ima.OmidVerificationVendor", {
        COMSCORE: 7,
        DOUBLEVERIFY: 3,
        GOOGLE: 9,
        INTEGRAL_AD_SCIENCE: 4,
        MEETRICS: 8,
        MOAT: 2,
        NIELSEN: 6,
        PIXELATE: 5,
        OTHER: 1,
        7: "COMSCORE",
        3: "DOUBLEVERIFY",
        9: "GOOGLE",
        4: "INTEGRAL_AD_SCIENCE",
        8: "MEETRICS",
        2: "MOAT",
        6: "NIELSEN",
        5: "PIXELATE",
        1: "OTHER"
    });
    y("google.ima.UiElements", {
        AD_ATTRIBUTION: "adAttribution",
        COUNTDOWN: "countdown"
    });
    y("google.ima.ViewMode", {
        NORMAL: "normal",
        FULLSCREEN: "fullscreen"
    });
    var WI = function(a, b, c) {
        this.h = c;
        0 === b.length && (b = [[]]);
        this.g = b.map(function(d) {
            d = a.concat(d);
            for (var e = [], f = 0, g = 0; f < d.length; ) {
                var h = d[f++];
                if (128 > h)
                    e[g++] = String.fromCharCode(h);
                else if (191 < h && 224 > h) {
                    var k = d[f++];
                    e[g++] = String.fromCharCode((h & 31) << 6 | k & 63)
                } else if (239 < h && 365 > h) {
                    k = d[f++];
                    var m = d[f++]
                      , n = d[f++];
                    h = ((h & 7) << 18 | (k & 63) << 12 | (m & 63) << 6 | n & 63) - 65536;
                    e[g++] = String.fromCharCode(55296 + (h >> 10));
                    e[g++] = String.fromCharCode(56320 + (h & 1023))
                } else
                    k = d[f++],
                    m = d[f++],
                    e[g++] = String.fromCharCode((h & 15) << 12 | (k & 63) << 6 | m & 63)
            }
            return new RegExp(e.join(""))
        })
    }
      , XI = function(a, b) {
        return b ? a.g.some(function(c) {
            c = b.match(c);
            return null == c ? !1 : !a.h || 1 <= c.length && "3.616.1" === c[1] || 2 <= c.length && "3.616.1" === c[2] ? !0 : !1
        }) : !1
    }
      , YI = [94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47]
      , ZI = [94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 115, 48, 92, 46, 50, 109, 100, 110, 92, 46, 110, 101, 116, 47, 105, 110, 115, 116, 114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47]
      , $I = [94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 112, 97, 108, 47, 115, 100, 107, 108, 111, 97, 100, 101, 114, 47]
      , aJ = [[105, 109, 97, 51, 92, 46, 106, 115], [105, 109, 97, 51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115], [105, 109, 97, 51, 95, 101, 97, 112, 46, 106, 115]]
      , bJ = [[98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [98, 114, 105, 100, 103, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]]
      , cJ = [[111, 117, 116, 115, 116, 114, 101, 97, 109, 92, 46, 106, 115], [111, 117, 116, 115, 116, 114, 101, 97, 109, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]]
      , rJ = new WI(YI,aJ,!1);
    new WI(YI,bJ,!0);
    var sJ = new WI(ZI,aJ,!1);
    new WI(ZI,bJ,!0);
    var tJ = new WI([94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 105, 109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 92, 46, 99, 111, 109, 47, 112, 114, 101, 114, 101, 108, 101, 97, 115, 101, 47, 106, 115, 47, 91, 48, 45, 57, 93, 43, 46, 91, 48, 45, 57, 46, 93, 43, 47],aJ,!1)
      , uJ = new WI([94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 40, 112, 97, 103, 101, 97, 100, 50, 124, 116, 112, 99, 41, 92, 46, 103, 111, 111, 103, 108, 101, 115, 121, 110, 100, 105, 99, 97, 116, 105, 111, 110, 92, 46, 99, 111, 109, 47, 112, 97, 103, 101, 97, 100, 47, 40, 103, 97, 100, 103, 101, 116, 115, 124, 106, 115, 41, 47],[],!1);
    new WI(YI,[[100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108], [100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]],!0);
    var vJ = new WI(YI,cJ,!1)
      , wJ = new WI(YI,cJ,!1);
    new WI($I,[[112, 97, 108, 46, 106, 115]],!1);
    new WI($I,[[99, 97, 115, 116, 95, 112, 97, 108, 46, 106, 115]],!1);
    new WI($I,[[99, 116, 118, 95, 112, 97, 108, 46, 106, 115]],!1);
    function xJ(a, b) {
        for (var c = {}, d = 0; d < b.length; c = {
            Cd: void 0
        },
        d++)
            if (c.Cd = b[d],
            a.some(function(e) {
                return function(f) {
                    return XI(f, e.Cd.src)
                }
            }(c)))
                return c.Cd;
        return null
    }
    ;if (!function(a) {
        if (a.some(function(c) {
            return XI(c, E().location.href)
        }))
            return !0;
        var b = xJ(a, document.querySelectorAll && document.querySelector ? document.querySelectorAll("SCRIPT") : document.getElementsByTagName("SCRIPT"));
        null == b && document.querySelectorAll && (b = xJ(a, document.querySelectorAll("script")));
        return null != b
    }([rJ, tJ, sJ, uJ, vJ, wJ]))
        throw Error("IMA SDK is either not loaded from a google domain or is not a supported version.");
    (L(El) || L(Fl) || L(Gl)) && xF(yF);
}
)();
