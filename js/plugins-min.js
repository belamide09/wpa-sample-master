+function(t) {
    "use strict";
    var e='[data-dismiss="alert"]', n=function(n) {
        t(n).on("click", e, this.close)
    }
    ;
    n.prototype.close=function(e) {
        function n() {
            a.trigger("closed.bs.alert").remove()
        }
        var o=t(this),
        i=o.attr("data-target");
        i||(i=o.attr("href"),
        i=i&&i.replace(/.*(?=#[^\s]*$)/,
        ""));
        var a=t(i);
        e&&e.preventDefault(),
        a.length||(a=o.hasClass("alert")?o:o.parent()),
        a.trigger(e=t.Event("close.bs.alert")),
        e.isDefaultPrevented()||(a.removeClass("in"),
        t.support.transition&&a.hasClass("fade")?a.one(t.support.transition.end,
        n).emulateTransitionEnd(150):n())
    }
    ;
    var o=t.fn.alert;
    t.fn.alert=function(e) {
        return this.each(function() {
            var o=t(this), i=o.data("bs.alert");
            i||o.data("bs.alert", i=new n(this)), "string"==typeof e&&i[e].call(o)
        }
        )
    }
    ,
    t.fn.alert.Constructor=n,
    t.fn.alert.noConflict=function() {
        return t.fn.alert=o, this
    }
    ,
    t(document).on("click.bs.alert.data-api",
    e,
    n.prototype.close)
}
(jQuery),
+function(t) {
    "use strict";
    var e=function(n, o) {
        this.$element=t(n), this.options=t.extend( {}, e.DEFAULTS, o)
    }
    ;
    e.DEFAULTS= {
        loadingText: "loading..."
    }
    ,
    e.prototype.setState=function(t) {
        var e="disabled", n=this.$element, o=n.is("input")?"val": "html", i=n.data();
        t+="Text", i.resetText||n.data("resetText", n[o]()), n[o](i[t]||this.options[t]), setTimeout(function() {
            "loadingText"==t?n.addClass(e).attr(e, e): n.removeClass(e).removeAttr(e)
        }
        ,
        0)
    }
    ,
    e.prototype.toggle=function() {
        var t=this.$element.closest('[data-toggle="buttons"]'), e=!0;
        if(t.length) {
            var n=this.$element.find("input");
            "radio"===n.prop("type")&&(n.prop("checked")&&this.$element.hasClass("active")?e=!1: t.find(".active").removeClass("active")), e&&n.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        e&&this.$element.toggleClass("active")
    }
    ;
    var n=t.fn.button;
    t.fn.button=function(n) {
        return this.each(function() {
            var o=t(this), i=o.data("bs.button"), a="object"==typeof n&&n;
            i||o.data("bs.button", i=new e(this, a)), "toggle"==n?i.toggle(): n&&i.setState(n)
        }
        )
    }
    ,
    t.fn.button.Constructor=e,
    t.fn.button.noConflict=function() {
        return t.fn.button=n, this
    }
    ,
    t(document).on("click.bs.button.data-api",
    "[data-toggle^=button]",
    function(e) {
        var n=t(e.target);
        n.hasClass("btn")||(n=n.closest(".btn")), n.button("toggle"), e.preventDefault()
    }
    )
}
(jQuery),
+function(t) {
    "use strict";
    var e=function(e, n) {
        this.$element=t(e), this.$indicators=this.$element.find(".carousel-indicators"), this.options=n, this.paused=this.sliding=this.interval=this.$active=this.$items=null, "hover"==this.options.pause&&this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    }
    ;
    e.DEFAULTS= {
        interval: 5e3, pause: "hover", wrap: !0
    }
    ,
    e.prototype.cycle=function(e) {
        return e||(this.paused=!1), this.interval&&clearInterval(this.interval), this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next, this), this.options.interval)), this
    }
    ,
    e.prototype.getActiveIndex=function() {
        return this.$active=this.$element.find(".item.active"), this.$items=this.$active.parent().children(), this.$items.index(this.$active)
    }
    ,
    e.prototype.to=function(e) {
        var n=this, o=this.getActiveIndex();
        if(!(e>this.$items.length-1||0>e))return this.sliding?this.$element.one("slid.bs.carousel", function() {
            n.to(e)
        }
        ):o==e?this.pause().cycle():this.slide(e>o?"next":"prev",
        t(this.$items[e]))
    }
    ,
    e.prototype.pause=function(e) {
        return e||(this.paused=!0), this.$element.find(".next, .prev").length&&t.support.transition.end&&(this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval=clearInterval(this.interval), this
    }
    ,
    e.prototype.next=function() {
        return this.sliding?void 0: this.slide("next")
    }
    ,
    e.prototype.prev=function() {
        return this.sliding?void 0: this.slide("prev")
    }
    ,
    e.prototype.slide=function(e,
    n) {
        var o=this.$element.find(".item.active"), i=n||o[e](), a=this.interval, s="next"==e?"left": "right", r="next"==e?"first": "last", l=this;
        if(!i.length) {
            if(!this.options.wrap)return;
            i=this.$element.find(".item")[r]()
        }
        this.sliding=!0,
        a&&this.pause();
        var c=t.Event("slide.bs.carousel",
        {
            relatedTarget: i[0], direction: s
        }
        );
        if(!i.hasClass("active")) {
            if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function() {
                var e=t(l.$indicators.children()[l.getActiveIndex()]);
                e&&e.addClass("active")
            }
            )),
            t.support.transition&&this.$element.hasClass("slide")) {
                if(this.$element.trigger(c), c.isDefaultPrevented())return;
                i.addClass(e), i[0].offsetWidth, o.addClass(s), i.addClass(s), o.one(t.support.transition.end, function() {
                    i.removeClass([e, s].join(" ")).addClass("active"), o.removeClass(["active", s].join(" ")), l.sliding=!1, setTimeout(function() {
                        l.$element.trigger("slid.bs.carousel")
                    }
                    ,
                    0)
                }
                ).emulateTransitionEnd(600)
            }
            else {
                if(this.$element.trigger(c), c.isDefaultPrevented())return;
                o.removeClass("active"), i.addClass("active"), this.sliding=!1, this.$element.trigger("slid.bs.carousel")
            }
            return a&&this.cycle(),
            this
        }
    }
    ;
    var n=t.fn.carousel;
    t.fn.carousel=function(n) {
        return this.each(function() {
            var o=t(this), i=o.data("bs.carousel"), a=t.extend( {}, e.DEFAULTS, o.data(), "object"==typeof n&&n), s="string"==typeof n?n: a.slide;
            i||o.data("bs.carousel", i=new e(this, a)), "number"==typeof n?i.to(n): s?i[s](): a.interval&&i.pause().cycle()
        }
        )
    }
    ,
    t.fn.carousel.Constructor=e,
    t.fn.carousel.noConflict=function() {
        return t.fn.carousel=n, this
    }
    ,
    t(document).on("click.bs.carousel.data-api",
    "[data-slide], [data-slide-to]",
    function(e) {
        var n=t(this), o, i=t(n.attr("data-target")||(o=n.attr("href"))&&o.replace(/.*(?=#[^\s]+$)/, "")), a=t.extend( {}, i.data(), n.data()), s=n.attr("data-slide-to");
        s&&(a.interval=!1), i.carousel(a), (s=n.attr("data-slide-to"))&&i.data("bs.carousel").to(s), e.preventDefault()
    }
    ),
    t(window).on("load",
    function() {
        t('[data-ride="carousel"]').each(function() {
            var e=t(this);
            e.carousel(e.data())
        }
        )
    }
    )
}
(jQuery),
+function(t) {
    function e() {
        t(o).remove(), t(i).each(function(e) {
            var o=n(t(this));
            o.hasClass("open")&&(o.trigger(e=t.Event("hide.bs.dropdown")), e.isDefaultPrevented()||o.removeClass("open").trigger("hidden.bs.dropdown"))
        }
        )
    }
    function n(e) {
        var n=e.attr("data-target");
        n||(n=e.attr("href"), n=n&&/#/.test(n)&&n.replace(/.*(?=#[^\s]*$)/, ""));
        var o=n&&t(n);
        return o&&o.length?o: e.parent()
    }
    var o=".dropdown-backdrop",
    i="[data-toggle=dropdown]",
    a=function(e) {
        t(e).on("click.bs.dropdown", this.toggle)
    }
    ;
    a.prototype.toggle=function(o) {
        var i=t(this);
        if(!i.is(".disabled, :disabled")) {
            var a=n(i), s=a.hasClass("open");
            if(e(), !s) {
                if("ontouchstart"in document.documentElement&&!a.closest(".navbar-nav").length&&t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e), a.trigger(o=t.Event("show.bs.dropdown")), o.isDefaultPrevented())return;
                a.toggleClass("open").trigger("shown.bs.dropdown"), i.focus()
            }
            return!1
        }
    }
    ,
    a.prototype.keydown=function(e) {
        if(/(38|40|27)/.test(e.keyCode)) {
            var o=t(this);
            if(e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled")) {
                var a=n(o), s=a.hasClass("open");
                if(!s||s&&27==e.keyCode)return 27==e.which&&a.find(i).focus(), o.click();
                var r=t("[role=menu] li:not(.divider):visible a", a);
                if(r.length) {
                    var l=r.index(r.filter(":focus"));
                    38==e.keyCode&&l>0&&l--, 40==e.keyCode&&l<r.length-1&&l++, ~l||(l=0), r.eq(l).focus()
                }
            }
        }
    }
    ;
    var s=t.fn.dropdown;
    t.fn.dropdown=function(e) {
        return this.each(function() {
            var n=t(this), o=n.data("bs.dropdown");
            o||n.data("bs.dropdown", o=new a(this)), "string"==typeof e&&o[e].call(n)
        }
        )
    }
    ,
    t.fn.dropdown.Constructor=a,
    t.fn.dropdown.noConflict=function() {
        return t.fn.dropdown=s, this
    }
    ,
    t(document).on("click.bs.dropdown.data-api",
    e).on("click.bs.dropdown.data-api",
    ".dropdown form",
    function(t) {
        t.stopPropagation()
    }
    ).on("click.bs.dropdown.data-api",
    i,
    a.prototype.toggle).on("keydown.bs.dropdown.data-api",
    i+", [role=menu]",
    a.prototype.keydown)
}
(jQuery),
+function(t) {
    "use strict";
    var e=function(e, n) {
        this.options=n, this.$element=t(e), this.$backdrop=this.isShown=null, this.options.remote&&this.$element.load(this.options.remote)
    }
    ;
    e.DEFAULTS= {
        backdrop: !0, keyboard: !0, show: !0
    }
    ,
    e.prototype.toggle=function(t) {
        return this[this.isShown?"hide": "show"](t)
    }
    ,
    e.prototype.show=function(e) {
        var n=this, o=t.Event("show.bs.modal", {
            relatedTarget: e
        }
        );
        this.$element.trigger(o),
        this.isShown||o.isDefaultPrevented()||(this.isShown=!0,
        this.escape(),
        this.$element.on("click.dismiss.modal",
        '[data-dismiss="modal"]',
        t.proxy(this.hide,
        this)),
        this.backdrop(function() {
            var o=t.support.transition&&n.$element.hasClass("fade");
            n.$element.parent().length||n.$element.appendTo(document.body), n.$element.show(), o&&n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), n.enforceFocus();
            var i=t.Event("shown.bs.modal", {
                relatedTarget: e
            }
            );
            o?n.$element.find(".modal-dialog").one(t.support.transition.end,
            function() {
                n.$element.focus().trigger(i)
            }
            ).emulateTransitionEnd(300):n.$element.focus().trigger(i)
        }
        ))
    }
    ,
    e.prototype.hide=function(e) {
        e&&e.preventDefault(), e=t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1, this.escape(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), t.support.transition&&this.$element.hasClass("fade")?this.$element.one(t.support.transition.end, t.proxy(this.hideModal, this)).emulateTransitionEnd(300): this.hideModal())
    }
    ,
    e.prototype.enforceFocus=function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0]!==t.target&&!this.$element.has(t.target).length&&this.$element.focus()
        }
        ,
        this))
    }
    ,
    e.prototype.escape=function() {
        this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal", t.proxy(function(t) {
            27==t.which&&this.hide()
        }
        ,
        this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")
    }
    ,
    e.prototype.hideModal=function() {
        var t=this;
        this.$element.hide(), this.backdrop(function() {
            t.removeBackdrop(), t.$element.trigger("hidden.bs.modal")
        }
        )
    }
    ,
    e.prototype.removeBackdrop=function() {
        this.$backdrop&&this.$backdrop.remove(), this.$backdrop=null
    }
    ,
    e.prototype.backdrop=function(e) {
        var n=this, o=this.$element.hasClass("fade")?"fade": "";
        if(this.isShown&&this.options.backdrop) {
            var i=t.support.transition&&o;
            if(this.$backdrop=t('<div class="modal-backdrop '+o+'" />').appendTo(document.body), this.$element.on("click.dismiss.modal", t.proxy(function(t) {
                t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]): this.hide.call(this))
            }
            ,
            this)),
            i&&this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !e)return;
            i?this.$backdrop.one(t.support.transition.end,
            e).emulateTransitionEnd(150):e()
        }
        else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),
        t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(t.support.transition.end,
        e).emulateTransitionEnd(150):e()):e&&e()
    }
    ;
    var n=t.fn.modal;
    t.fn.modal=function(n,
    o) {
        return this.each(function() {
            var i=t(this), a=i.data("bs.modal"), s=t.extend( {}, e.DEFAULTS, i.data(), "object"==typeof n&&n);
            a||i.data("bs.modal", a=new e(this, s)), "string"==typeof n?a[n](o): s.show&&a.show(o)
        }
        )
    }
    ,
    t.fn.modal.Constructor=e,
    t.fn.modal.noConflict=function() {
        return t.fn.modal=n, this
    }
    ,
    t(document).on("click.bs.modal.data-api",
    '[data-toggle="modal"]',
    function(e) {
        var n=t(this), o=n.attr("href"), i=t(n.attr("data-target")||o&&o.replace(/.*(?=#[^\s]+$)/, "")), a=i.data("modal")?"toggle":t.extend( {
            remote: !/#/.test(o)&&o
        }
        ,
        i.data(),
        n.data());
        e.preventDefault(),
        i.modal(a,
        this).one("hide",
        function() {
            n.is(":visible")&&n.focus()
        }
        )
    }
    ),
    t(document).on("show.bs.modal",
    ".modal",
    function() {
        t(document.body).addClass("modal-open")
    }
    ).on("hidden.bs.modal",
    ".modal",
    function() {
        t(document.body).removeClass("modal-open")
    }
    )
}
(jQuery),
+function(t) {
    "use strict";
    var e=function(t, e) {
        this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null, this.init("tooltip", t, e)
    }
    ;
    e.DEFAULTS= {
        animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1
    }
    ,
    e.prototype.init=function(e,
    n,
    o) {
        this.enabled=!0, this.type=e, this.$element=t(n), this.options=this.getOptions(o);
        for(var i=this.options.trigger.split(" "), a=i.length;
        a--;
        ) {
            var s=i[a];
            if("click"==s)this.$element.on("click."+this.type, this.options.selector, t.proxy(this.toggle, this));
            else if("manual"!=s) {
                var r="hover"==s?"mouseenter": "focus", l="hover"==s?"mouseleave": "blur";
                this.$element.on(r+"."+this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l+"."+this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector?this._options=t.extend( {},
        this.options,
        {
            trigger: "manual", selector: ""
        }
        ):this.fixTitle()
    }
    ,
    e.prototype.getDefaults=function() {
        return e.DEFAULTS
    }
    ,
    e.prototype.getOptions=function(e) {
        return e=t.extend( {}, this.getDefaults(), this.$element.data(), e), e.delay&&"number"==typeof e.delay&&(e.delay= {
            show: e.delay, hide: e.delay
        }
        ),
        e
    }
    ,
    e.prototype.getDelegateOptions=function() {
        var e= {}, n=this.getDefaults();
        return this._options&&t.each(this._options, function(t, o) {
            n[t]!=o&&(e[t]=o)
        }
        ),
        e
    }
    ,
    e.prototype.enter=function(e) {
        var n=e instanceof this.constructor?e: t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);
        return clearTimeout(n.timeout), n.hoverState="in", n.options.delay&&n.options.delay.show?void(n.timeout=setTimeout(function() {
            "in"==n.hoverState&&n.show()
        }
        ,
        n.options.delay.show)):n.show()
    }
    ,
    e.prototype.leave=function(e) {
        var n=e instanceof this.constructor?e: t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);
        return clearTimeout(n.timeout), n.hoverState="out", n.options.delay&&n.options.delay.hide?void(n.timeout=setTimeout(function() {
            "out"==n.hoverState&&n.hide()
        }
        ,
        n.options.delay.hide)):n.hide()
    }
    ,
    e.prototype.show=function() {
        var e=t.Event("show.bs."+this.type);
        if(this.hasContent()&&this.enabled) {
            if(this.$element.trigger(e), e.isDefaultPrevented())return;
            var n=this.tip();
            this.setContent(), this.options.animation&&n.addClass("fade");
            var o="function"==typeof this.options.placement?this.options.placement.call(this, n[0], this.$element[0]): this.options.placement, i=/\s?auto?\s?/i, a=i.test(o);
            a&&(o=o.replace(i, "")||"top"), n.detach().css( {
                top: 0, left: 0, display: "block"
            }
            ).addClass(o),
            this.options.container?n.appendTo(this.options.container):n.insertAfter(this.$element);
            var s=this.getPosition(),
            r=n[0].offsetWidth,
            l=n[0].offsetHeight;
            if(a) {
                var c=this.$element.parent(), d=o, u=document.documentElement.scrollTop||document.body.scrollTop, p="body"==this.options.container?window.innerWidth: c.outerWidth(), f="body"==this.options.container?window.innerHeight: c.outerHeight(), h="body"==this.options.container?0: c.offset().left;
                o="bottom"==o&&s.top+s.height+l-u>f?"top": "top"==o&&s.top-u-l<0?"bottom": "right"==o&&s.right+r>p?"left": "left"==o&&s.left-r<h?"right": o, n.removeClass(d).addClass(o)
            }
            var m=this.getCalculatedOffset(o,
            s,
            r,
            l);
            this.applyPlacement(m,
            o),
            this.$element.trigger("shown.bs."+this.type)
        }
    }
    ,
    e.prototype.applyPlacement=function(t,
    e) {
        var n, o=this.tip(), i=o[0].offsetWidth, a=o[0].offsetHeight, s=parseInt(o.css("margin-top"), 10), r=parseInt(o.css("margin-left"), 10);
        isNaN(s)&&(s=0), isNaN(r)&&(r=0), t.top=t.top+s, t.left=t.left+r, o.offset(t).addClass("in");
        var l=o[0].offsetWidth, c=o[0].offsetHeight;
        if("top"==e&&c!=a&&(n=!0, t.top=t.top+a-c), /bottom|top/.test(e)) {
            var d=0;
            t.left<0&&(d=-2*t.left, t.left=0, o.offset(t), l=o[0].offsetWidth, c=o[0].offsetHeight), this.replaceArrow(d-i+l, l, "left")
        }
        else this.replaceArrow(c-a,
        c,
        "top");
        n&&o.offset(t)
    }
    ,
    e.prototype.replaceArrow=function(t,
    e,
    n) {
        this.arrow().css(n, t?50*(1-t/e)+"%": "")
    }
    ,
    e.prototype.setContent=function() {
        var t=this.tip(), e=this.getTitle();
        t.find(".tooltip-inner")[this.options.html?"html": "text"](e), t.removeClass("fade in top bottom left right")
    }
    ,
    e.prototype.hide=function() {
        function e() {
            "in"!=n.hoverState&&o.detach()
        }
        var n=this,
        o=this.tip(),
        i=t.Event("hide.bs."+this.type);
        return this.$element.trigger(i),
        i.isDefaultPrevented()?void 0:(o.removeClass("in"),
        t.support.transition&&this.$tip.hasClass("fade")?o.one(t.support.transition.end,
        e).emulateTransitionEnd(150):e(),
        this.$element.trigger("hidden.bs."+this.type),
        this)
    }
    ,
    e.prototype.fixTitle=function() {
        var t=this.$element;
        (t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title", t.attr("title")||"").attr("title", "")
    }
    ,
    e.prototype.hasContent=function() {
        return this.getTitle()
    }
    ,
    e.prototype.getPosition=function() {
        var e=this.$element[0];
        return t.extend( {}, "function"==typeof e.getBoundingClientRect?e.getBoundingClientRect(): {
            width: e.offsetWidth, height: e.offsetHeight
        }
        ,
        this.$element.offset())
    }
    ,
    e.prototype.getCalculatedOffset=function(t,
    e,
    n,
    o) {
        return"bottom"==t? {
            top: e.top+e.height, left: e.left+e.width/2-n/2
        }
        :"top"==t? {
            top: e.top-o, left: e.left+e.width/2-n/2
        }
        :"left"==t? {
            top: e.top+e.height/2-o/2, left: e.left-n
        }
        : {
            top: e.top+e.height/2-o/2, left: e.left+e.width
        }
    }
    ,
    e.prototype.getTitle=function() {
        var t, e=this.$element, n=this.options;
        return t=e.attr("data-original-title")||("function"==typeof n.title?n.title.call(e[0]): n.title)
    }
    ,
    e.prototype.tip=function() {
        return this.$tip=this.$tip||t(this.options.template)
    }
    ,
    e.prototype.arrow=function() {
        return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")
    }
    ,
    e.prototype.validate=function() {
        this.$element[0].parentNode||(this.hide(), this.$element=null, this.options=null)
    }
    ,
    e.prototype.enable=function() {
        this.enabled=!0
    }
    ,
    e.prototype.disable=function() {
        this.enabled=!1
    }
    ,
    e.prototype.toggleEnabled=function() {
        this.enabled=!this.enabled
    }
    ,
    e.prototype.toggle=function(e) {
        var n=e?t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type): this;
        n.tip().hasClass("in")?n.leave(n): n.enter(n)
    }
    ,
    e.prototype.destroy=function() {
        this.hide().$element.off("."+this.type).removeData("bs."+this.type)
    }
    ;
    var n=t.fn.tooltip;
    t.fn.tooltip=function(n) {
        return this.each(function() {
            var o=t(this), i=o.data("bs.tooltip"), a="object"==typeof n&&n;
            i||o.data("bs.tooltip", i=new e(this, a)), "string"==typeof n&&i[n]()
        }
        )
    }
    ,
    t.fn.tooltip.Constructor=e,
    t.fn.tooltip.noConflict=function() {
        return t.fn.tooltip=n, this
    }
}
(jQuery),
+function(t) {
    "use strict";
    var e=function(t, e) {
        this.init("popover", t, e)
    }
    ;
    if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");
    e.DEFAULTS=t.extend( {},
    t.fn.tooltip.Constructor.DEFAULTS,
    {
        placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }
    ),
    e.prototype=t.extend( {},
    t.fn.tooltip.Constructor.prototype),
    e.prototype.constructor=e,
    e.prototype.getDefaults=function() {
        return e.DEFAULTS
    }
    ,
    e.prototype.setContent=function() {
        var t=this.tip(), e=this.getTitle(), n=this.getContent();
        t.find(".popover-title")[this.options.html?"html": "text"](e), t.find(".popover-content")[this.options.html?"html": "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html()||t.find(".popover-title").hide()
    }
    ,
    e.prototype.hasContent=function() {
        return this.getTitle()||this.getContent()
    }
    ,
    e.prototype.getContent=function() {
        var t=this.$element, e=this.options;
        return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]): e.content)
    }
    ,
    e.prototype.arrow=function() {
        return this.$arrow=this.$arrow||this.tip().find(".arrow")
    }
    ,
    e.prototype.tip=function() {
        return this.$tip||(this.$tip=t(this.options.template)), this.$tip
    }
    ;
    var n=t.fn.popover;
    t.fn.popover=function(n) {
        return this.each(function() {
            var o=t(this), i=o.data("bs.popover"), a="object"==typeof n&&n;
            i||o.data("bs.popover", i=new e(this, a)), "string"==typeof n&&i[n]()
        }
        )
    }
    ,
    t.fn.popover.Constructor=e,
    t.fn.popover.noConflict=function() {
        return t.fn.popover=n, this
    }
}
(jQuery),
+function(t) {
    "use strict";
    var e=function(e) {
        this.element=t(e)
    }
    ;
    e.prototype.show=function() {
        var e=this.element, n=e.closest("ul:not(.dropdown-menu)"), o=e.data("target");
        if(o||(o=e.attr("href"), o=o&&o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var i=n.find(".active:last a")[0], a=t.Event("show.bs.tab", {
                relatedTarget: i
            }
            );
            if(e.trigger(a),
            !a.isDefaultPrevented()) {
                var s=t(o);
                this.activate(e.parent("li"), n), this.activate(s, s.parent(), function() {
                    e.trigger( {
                        type: "shown.bs.tab", relatedTarget: i
                    }
                    )
                }
                )
            }
        }
    }
    ,
    e.prototype.activate=function(e,
    n,
    o) {
        function i() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), s?(e[0].offsetWidth, e.addClass("in")): e.removeClass("fade"), e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active"), o&&o()
        }
        var a=n.find("> .active"),
        s=o&&t.support.transition&&a.hasClass("fade");
        s?a.one(t.support.transition.end,
        i).emulateTransitionEnd(150):i(),
        a.removeClass("in")
    }
    ;
    var n=t.fn.tab;
    t.fn.tab=function(n) {
        return this.each(function() {
            var o=t(this), i=o.data("bs.tab");
            i||o.data("bs.tab", i=new e(this)), "string"==typeof n&&i[n]()
        }
        )
    }
    ,
    t.fn.tab.Constructor=e,
    t.fn.tab.noConflict=function() {
        return t.fn.tab=n, this
    }
    ,
    t(document).on("click.bs.tab.data-api",
    '[data-toggle="tab"], [data-toggle="pill"]',
    function(e) {
        e.preventDefault(), t(this).tab("show")
    }
    )
}
(jQuery),
+function(t) {
    "use strict";
    var e=function(n, o) {
        this.options=t.extend( {}, e.DEFAULTS, o), this.$window=t(window).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element=t(n), this.affixed=this.unpin=null, this.checkPosition()
    }
    ;
    e.RESET="affix affix-top affix-bottom",
    e.DEFAULTS= {
        offset: 0
    }
    ,
    e.prototype.checkPositionWithEventLoop=function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }
    ,
    e.prototype.checkPosition=function() {
        if(this.$element.is(":visible")) {
            var n=t(document).height(), o=this.$window.scrollTop(), i=this.$element.offset(), a=this.options.offset, s=a.top, r=a.bottom;
            "object"!=typeof a&&(r=s=a), "function"==typeof s&&(s=a.top()), "function"==typeof r&&(r=a.bottom());
            var l=null!=this.unpin&&o+this.unpin<=i.top?!1: null!=r&&i.top+this.$element.height()>=n-r?"bottom": null!=s&&s>=o?"top": !1;
            this.affixed!==l&&(this.unpin&&this.$element.css("top", ""), this.affixed=l, this.unpin="bottom"==l?i.top-o: null, this.$element.removeClass(e.RESET).addClass("affix"+(l?"-"+l: "")), "bottom"==l&&this.$element.offset( {
                top: document.body.offsetHeight-r-this.$element.height()
            }
            ))
        }
    }
    ;
    var n=t.fn.affix;
    t.fn.affix=function(n) {
        return this.each(function() {
            var o=t(this), i=o.data("bs.affix"), a="object"==typeof n&&n;
            i||o.data("bs.affix", i=new e(this, a)), "string"==typeof n&&i[n]()
        }
        )
    }
    ,
    t.fn.affix.Constructor=e,
    t.fn.affix.noConflict=function() {
        return t.fn.affix=n, this
    }
    ,
    t(window).on("load",
    function() {
        t('[data-spy="affix"]').each(function() {
            var e=t(this), n=e.data();
            n.offset=n.offset|| {}, n.offsetBottom&&(n.offset.bottom=n.offsetBottom), n.offsetTop&&(n.offset.top=n.offsetTop), e.affix(n)
        }
        )
    }
    )
}
(jQuery),
+function(t) {
    "use strict";
    var e=function(n, o) {
        this.$element=t(n), this.options=t.extend( {}, e.DEFAULTS, o), this.transitioning=null, this.options.parent&&(this.$parent=t(this.options.parent)), this.options.toggle&&this.toggle()
    }
    ;
    e.DEFAULTS= {
        toggle: !0
    }
    ,
    e.prototype.dimension=function() {
        var t=this.$element.hasClass("width");
        return t?"width": "height"
    }
    ,
    e.prototype.show=function() {
        if(!this.transitioning&&!this.$element.hasClass("in")) {
            var e=t.Event("show.bs.collapse");
            if(this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n=this.$parent&&this.$parent.find("> .panel > .in");
                if(n&&n.length) {
                    var o=n.data("bs.collapse");
                    if(o&&o.transitioning)return;
                    n.collapse("hide"), o||n.data("bs.collapse", null)
                }
                var i=this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[i](0),
                this.transitioning=1;
                var a=function() {
                    this.$element.removeClass("collapsing").addClass("in")[i]("auto"), this.transitioning=0, this.$element.trigger("shown.bs.collapse")
                }
                ;
                if(!t.support.transition)return a.call(this);
                var s=t.camelCase(["scroll",
                i].join("-"));
                this.$element.one(t.support.transition.end,
                t.proxy(a,
                this)).emulateTransitionEnd(350)[i](this.$element[0][s])
            }
        }
    }
    ,
    e.prototype.hide=function() {
        if(!this.transitioning&&this.$element.hasClass("in")) {
            var e=t.Event("hide.bs.collapse");
            if(this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n=this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning=1;
                var o=function() {
                    this.transitioning=0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                }
                ;
                return t.support.transition?void this.$element[n](0).one(t.support.transition.end,
                t.proxy(o,
                this)).emulateTransitionEnd(350):o.call(this)
            }
        }
    }
    ,
    e.prototype.toggle=function() {
        this[this.$element.hasClass("in")?"hide": "show"]()
    }
    ;
    var n=t.fn.collapse;
    t.fn.collapse=function(n) {
        return this.each(function() {
            var o=t(this), i=o.data("bs.collapse"), a=t.extend( {}, e.DEFAULTS, o.data(), "object"==typeof n&&n);
            i||o.data("bs.collapse", i=new e(this, a)), "string"==typeof n&&i[n]()
        }
        )
    }
    ,
    t.fn.collapse.Constructor=e,
    t.fn.collapse.noConflict=function() {
        return t.fn.collapse=n, this
    }
    ,
    t(document).on("click.bs.collapse.data-api",
    "[data-toggle=collapse]",
    function(e) {
        var n=t(this), o, i=n.attr("data-target")||e.preventDefault()||(o=n.attr("href"))&&o.replace(/.*(?=#[^\s]+$)/, ""), a=t(i), s=a.data("bs.collapse"), r=s?"toggle": n.data(), l=n.attr("data-parent"), c=l&&t(l);
        s&&s.transitioning||(c&&c.find('[data-toggle=collapse][data-parent="'+l+'"]').not(n).addClass("collapsed"), n[a.hasClass("in")?"addClass": "removeClass"]("collapsed")), a.collapse(r)
    }
    )
}
(jQuery),
+function(t) {
    function e(n, o) {
        var i, a=t.proxy(this.process, this);
        this.$element=t(t(n).is("body")?window: n), this.$body=t("body"), this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api", a), this.options=t.extend( {}, e.DEFAULTS, o), this.selector=(this.options.target||(i=t(n).attr("href"))&&i.replace(/.*(?=#[^\s]+$)/, "")||"")+" .nav li > a", this.offsets=t([]), this.targets=t([]), this.activeTarget=null, this.refresh(), this.process()
    }
    e.DEFAULTS= {
        offset: 10
    }
    ,
    e.prototype.refresh=function() {
        var e=this.$element[0]==window?"offset": "position";
        this.offsets=t([]), this.targets=t([]);
        var n=this, o=this.$body.find(this.selector).map(function() {
            var o=t(this), i=o.data("target")||o.attr("href"), a=/^#\w/.test(i)&&t(i);
            return a&&a.length&&[[a[e]().top+(!t.isWindow(n.$scrollElement.get(0))&&n.$scrollElement.scrollTop()), i]]||null
        }
        ).sort(function(t,
        e) {
            return t[0]-e[0]
        }
        ).each(function() {
            n.offsets.push(this[0]), n.targets.push(this[1])
        }
        )
    }
    ,
    e.prototype.process=function() {
        var t=this.$scrollElement.scrollTop()+this.options.offset, e=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight, n=e-this.$scrollElement.height(), o=this.offsets, i=this.targets, a=this.activeTarget, s;
        if(t>=n)return a!=(s=i.last()[0])&&this.activate(s);
        for(s=o.length;
        s--;
        )a!=i[s]&&t>=o[s]&&(!o[s+1]||t<=o[s+1])&&this.activate(i[s])
    }
    ,
    e.prototype.activate=function(e) {
        this.activeTarget=e, t(this.selector).parents(".active").removeClass("active");
        var n=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]', o=t(n).parents("li").addClass("active");
        o.parent(".dropdown-menu").length&&(o=o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
    }
    ;
    var n=t.fn.scrollspy;
    t.fn.scrollspy=function(n) {
        return this.each(function() {
            var o=t(this), i=o.data("bs.scrollspy"), a="object"==typeof n&&n;
            i||o.data("bs.scrollspy", i=new e(this, a)), "string"==typeof n&&i[n]()
        }
        )
    }
    ,
    t.fn.scrollspy.Constructor=e,
    t.fn.scrollspy.noConflict=function() {
        return t.fn.scrollspy=n, this
    }
    ,
    t(window).on("load",
    function() {
        t('[data-spy="scroll"]').each(function() {
            var e=t(this);
            e.scrollspy(e.data())
        }
        )
    }
    )
}
(jQuery),
+function(t) {
    function e() {
        var t=document.createElement("bootstrap"), e= {
            WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"
        }
        ;
        for(var n in e)if(void 0!==t.style[n])return {
            end: e[n]
        }
    }
    t.fn.emulateTransitionEnd=function(e) {
        var n=!1, o=this;
        t(this).one(t.support.transition.end, function() {
            n=!0
        }
        );
        var i=function() {
            n||t(o).trigger(t.support.transition.end)
        }
        ;
        return setTimeout(i,
        e),
        this
    }
    ,
    t(function() {
        t.support.transition=e()
    }
    )
}
(jQuery),
!function(t) {
    t.flexslider=function(e, n) {
        var o=t(e);
        o.vars=t.extend( {}, t.flexslider.defaults, n);
        var i, a=o.vars.namespace, s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture, r=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&o.vars.touch, l="click touchend MSPointerUp", c="", d="vertical"===o.vars.direction, u=o.vars.reverse, p=o.vars.itemWidth>0, f="fade"===o.vars.animation, h=""!==o.vars.asNavFor, m= {}, g=!0;
        t.data(e, "flexslider", o), m= {
            init: function() {
                o.animating=!1, o.currentSlide=parseInt(o.vars.startAt?o.vars.startAt: 0, 10), isNaN(o.currentSlide)&&(o.currentSlide=0), o.animatingTo=o.currentSlide, o.atEnd=0===o.currentSlide||o.currentSlide===o.last, o.containerSelector=o.vars.selector.substr(0, o.vars.selector.search(" ")), o.slides=t(o.vars.selector, o), o.container=t(o.containerSelector, o), o.count=o.slides.length, o.syncExists=t(o.vars.sync).length>0, "slide"===o.vars.animation&&(o.vars.animation="swing"), o.prop=d?"top":"marginLeft", o.args= {}, o.manualPause=!1, o.stopped=!1, o.started=!1, o.startTimeout=null, o.transitions=!o.vars.video&&!f&&o.vars.useCSS&&function() {
                    var t=document.createElement("div"), e=["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for(var n in e)if(void 0!==t.style[e[n]])return o.pfx=e[n].replace("Perspective", "").toLowerCase(), o.prop="-"+o.pfx+"-transform", !0;
                    return!1
                }
                (),
                o.ensureAnimationEnd="",
                ""!==o.vars.controlsContainer&&(o.controlsContainer=t(o.vars.controlsContainer).length>0&&t(o.vars.controlsContainer)),
                ""!==o.vars.manualControls&&(o.manualControls=t(o.vars.manualControls).length>0&&t(o.vars.manualControls)),
                o.vars.randomize&&(o.slides.sort(function() {
                    return Math.round(Math.random())-.5
                }
                ),
                o.container.empty().append(o.slides)),
                o.doMath(),
                o.setup("init"),
                o.vars.controlNav&&m.controlNav.setup(),
                o.vars.directionNav&&m.directionNav.setup(),
                o.vars.keyboard&&(1===t(o.containerSelector).length||o.vars.multipleKeyboard)&&t(document).bind("keyup",
                function(t) {
                    var e=t.keyCode;
                    if(!o.animating&&(39===e||37===e)) {
                        var n=39===e?o.getTarget("next"): 37===e?o.getTarget("prev"): !1;
                        o.flexAnimate(n, o.vars.pauseOnAction)
                    }
                }
                ),
                o.vars.mousewheel&&o.bind("mousewheel",
                function(t,
                e) {
                    t.preventDefault();
                    var n=o.getTarget(0>e?"next": "prev");
                    o.flexAnimate(n, o.vars.pauseOnAction)
                }
                ),
                o.vars.pausePlay&&m.pausePlay.setup(),
                o.vars.slideshow&&o.vars.pauseInvisible&&m.pauseInvisible.init(),
                o.vars.slideshow&&(o.vars.pauseOnHover&&o.hover(function() {
                    o.manualPlay||o.manualPause||o.pause()
                }
                ,
                function() {
                    o.manualPause||o.manualPlay||o.stopped||o.play()
                }
                ),
                o.vars.pauseInvisible&&m.pauseInvisible.isHidden()||(o.vars.initDelay>0?o.startTimeout=setTimeout(o.play,
                o.vars.initDelay):o.play())),
                h&&m.asNav.setup(),
                r&&o.vars.touch&&m.touch(),
                (!f||f&&o.vars.smoothHeight)&&t(window).bind("resize orientationchange focus",
                m.resize),
                o.find("img").attr("draggable",
                "false"),
                setTimeout(function() {
                    o.vars.start(o)
                }
                ,
                200)
            }
            ,
            asNav: {
                setup: function() {
                    o.asNav=!0, o.animatingTo=Math.floor(o.currentSlide/o.move), o.currentItem=o.currentSlide, o.slides.removeClass(a+"active-slide").eq(o.currentItem).addClass(a+"active-slide"), s?(e._slider=o, o.slides.each(function() {
                        var e=this;
                        e._gesture=new MSGesture, e._gesture.target=e, e.addEventListener("MSPointerDown", function(t) {
                            t.preventDefault(), t.currentTarget._gesture&&t.currentTarget._gesture.addPointer(t.pointerId)
                        }
                        ,
                        !1),
                        e.addEventListener("MSGestureTap",
                        function(e) {
                            e.preventDefault();
                            var n=t(this), i=n.index();
                            t(o.vars.asNavFor).data("flexslider").animating||n.hasClass("active")||(o.direction=o.currentItem<i?"next": "prev", o.flexAnimate(i, o.vars.pauseOnAction, !1, !0, !0))
                        }
                        )
                    }
                    )):o.slides.on(l,
                    function(e) {
                        e.preventDefault();
                        var n=t(this), i=n.index(), s=n.offset().left-t(o).scrollLeft();
                        0>=s&&n.hasClass(a+"active-slide")?o.flexAnimate(o.getTarget("prev"), !0): t(o.vars.asNavFor).data("flexslider").animating||n.hasClass(a+"active-slide")||(o.direction=o.currentItem<i?"next": "prev", o.flexAnimate(i, o.vars.pauseOnAction, !1, !0, !0))
                    }
                    )
                }
            }
            ,
            controlNav: {
                setup: function() {
                    o.manualControls?m.controlNav.setupManual(): m.controlNav.setupPaging()
                }
                ,
                setupPaging:function() {
                    var e, n, i="thumbnails"===o.vars.controlNav?"control-thumbs": "control-paging", s=1;
                    if(o.controlNavScaffold=t('<ol class="'+a+"control-nav "+a+i+'"></ol>'), o.pagingCount>1)for(var r=0;
                    r<o.pagingCount;
                    r++) {
                        if(n=o.slides.eq(r), e="thumbnails"===o.vars.controlNav?'<img src="'+n.attr("data-thumb")+'"/>': "<a>"+s+"</a>", "thumbnails"===o.vars.controlNav&&!0===o.vars.thumbCaptions) {
                            var d=n.attr("data-thumbcaption");
                            ""!=d&&void 0!=d&&(e+='<span class="'+a+'caption">'+d+"</span>")
                        }
                        o.controlNavScaffold.append("<li>"+e+"</li>"),
                        s++
                    }
                    o.controlsContainer?t(o.controlsContainer).append(o.controlNavScaffold):o.append(o.controlNavScaffold),
                    m.controlNav.set(),
                    m.controlNav.active(),
                    o.controlNavScaffold.delegate("a, img",
                    l,
                    function(e) {
                        if(e.preventDefault(), ""===c||c===e.type) {
                            var n=t(this), i=o.controlNav.index(n);
                            n.hasClass(a+"active")||(o.direction=i>o.currentSlide?"next": "prev", o.flexAnimate(i, o.vars.pauseOnAction))
                        }
                        ""===c&&(c=e.type),
                        m.setToClearWatchedEvent()
                    }
                    )
                }
                ,
                setupManual:function() {
                    o.controlNav=o.manualControls, m.controlNav.active(), o.controlNav.bind(l, function(e) {
                        if(e.preventDefault(), ""===c||c===e.type) {
                            var n=t(this), i=o.controlNav.index(n);
                            n.hasClass(a+"active")||(o.direction=i>o.currentSlide?"next": "prev", o.flexAnimate(i, o.vars.pauseOnAction))
                        }
                        ""===c&&(c=e.type),
                        m.setToClearWatchedEvent()
                    }
                    )
                }
                ,
                set:function() {
                    var e="thumbnails"===o.vars.controlNav?"img": "a";
                    o.controlNav=t("."+a+"control-nav li "+e, o.controlsContainer?o.controlsContainer: o)
                }
                ,
                active:function() {
                    o.controlNav.removeClass(a+"active").eq(o.animatingTo).addClass(a+"active")
                }
                ,
                update:function(e,
                n) {
                    o.pagingCount>1&&"add"===e?o.controlNavScaffold.append(t("<li><a>"+o.count+"</a></li>")): 1===o.pagingCount?o.controlNavScaffold.find("li").remove(): o.controlNav.eq(n).closest("li").remove(), m.controlNav.set(), o.pagingCount>1&&o.pagingCount!==o.controlNav.length?o.update(n, e): m.controlNav.active()
                }
            }
            ,
            directionNav: {
                setup: function() {
                    var e=t('<ul class="'+a+'direction-nav"><li><a class="'+a+'prev" href="#">'+o.vars.prevText+'</a></li><li><a class="'+a+'next" href="#">'+o.vars.nextText+"</a></li></ul>");
                    o.controlsContainer?(t(o.controlsContainer).append(e), o.directionNav=t("."+a+"direction-nav li a", o.controlsContainer)): (o.append(e), o.directionNav=t("."+a+"direction-nav li a", o)), m.directionNav.update(), o.directionNav.bind(l, function(e) {
                        e.preventDefault();
                        var n;
                        (""===c||c===e.type)&&(n=o.getTarget(t(this).hasClass(a+"next")?"next": "prev"), o.flexAnimate(n, o.vars.pauseOnAction)), ""===c&&(c=e.type), m.setToClearWatchedEvent()
                    }
                    )
                }
                ,
                update:function() {
                    var t=a+"disabled";
                    1===o.pagingCount?o.directionNav.addClass(t).attr("tabindex", "-1"): o.vars.animationLoop?o.directionNav.removeClass(t).removeAttr("tabindex"): 0===o.animatingTo?o.directionNav.removeClass(t).filter("."+a+"prev").addClass(t).attr("tabindex", "-1"): o.animatingTo===o.last?o.directionNav.removeClass(t).filter("."+a+"next").addClass(t).attr("tabindex", "-1"): o.directionNav.removeClass(t).removeAttr("tabindex")
                }
            }
            ,
            pausePlay: {
                setup: function() {
                    var e=t('<div class="'+a+'pauseplay"><a></a></div>');
                    o.controlsContainer?(o.controlsContainer.append(e), o.pausePlay=t("."+a+"pauseplay a", o.controlsContainer)): (o.append(e), o.pausePlay=t("."+a+"pauseplay a", o)), m.pausePlay.update(o.vars.slideshow?a+"pause": a+"play"), o.pausePlay.bind(l, function(e) {
                        e.preventDefault(), (""===c||c===e.type)&&(t(this).hasClass(a+"pause")?(o.manualPause=!0, o.manualPlay=!1, o.pause()): (o.manualPause=!1, o.manualPlay=!0, o.play())), ""===c&&(c=e.type), m.setToClearWatchedEvent()
                    }
                    )
                }
                ,
                update:function(t) {
                    "play"===t?o.pausePlay.removeClass(a+"pause").addClass(a+"play").html(o.vars.playText): o.pausePlay.removeClass(a+"play").addClass(a+"pause").html(o.vars.pauseText)
                }
            }
            ,
            touch:function() {
                function t(t) {
                    o.animating?t.preventDefault(): (window.navigator.msPointerEnabled||1===t.touches.length)&&(o.pause(), g=d?o.h: o.w, b=Number(new Date), w=t.touches[0].pageX, C=t.touches[0].pageY, m=p&&u&&o.animatingTo===o.last?0: p&&u?o.limit-(o.itemW+o.vars.itemMargin)*o.move*o.animatingTo: p&&o.currentSlide===o.last?o.limit: p?(o.itemW+o.vars.itemMargin)*o.move*o.currentSlide: u?(o.last-o.currentSlide+o.cloneOffset)*g: (o.currentSlide+o.cloneOffset)*g, c=d?C: w, h=d?w: C, e.addEventListener("touchmove", n, !1), e.addEventListener("touchend", i, !1))
                }
                function n(t) {
                    w=t.touches[0].pageX, C=t.touches[0].pageY, v=d?c-C: c-w, y=d?Math.abs(v)<Math.abs(w-h): Math.abs(v)<Math.abs(C-h);
                    var e=500;
                    (!y||Number(new Date)-b>e)&&(t.preventDefault(), !f&&o.transitions&&(o.vars.animationLoop||(v/=0===o.currentSlide&&0>v||o.currentSlide===o.last&&v>0?Math.abs(v)/g+2: 1), o.setProps(m+v, "setTouch")))
                }
                function i() {
                    if(e.removeEventListener("touchmove", n, !1), o.animatingTo===o.currentSlide&&!y&&null!==v) {
                        var t=u?-v: v, a=o.getTarget(t>0?"next": "prev");
                        o.canAdvance(a)&&(Number(new Date)-b<550&&Math.abs(t)>50||Math.abs(t)>g/2)?o.flexAnimate(a, o.vars.pauseOnAction): f||o.flexAnimate(o.currentSlide, o.vars.pauseOnAction, !0)
                    }
                    e.removeEventListener("touchend",
                    i,
                    !1),
                    c=null,
                    h=null,
                    v=null,
                    m=null
                }
                function a(t) {
                    t.stopPropagation(), o.animating?t.preventDefault(): (o.pause(), e._gesture.addPointer(t.pointerId), E=0, g=d?o.h: o.w, b=Number(new Date), m=p&&u&&o.animatingTo===o.last?0: p&&u?o.limit-(o.itemW+o.vars.itemMargin)*o.move*o.animatingTo: p&&o.currentSlide===o.last?o.limit: p?(o.itemW+o.vars.itemMargin)*o.move*o.currentSlide: u?(o.last-o.currentSlide+o.cloneOffset)*g: (o.currentSlide+o.cloneOffset)*g)
                }
                function r(t) {
                    t.stopPropagation();
                    var n=t.target._slider;
                    if(n) {
                        var o=-t.translationX, i=-t.translationY;
                        return E+=d?i: o, v=E, y=d?Math.abs(E)<Math.abs(-o): Math.abs(E)<Math.abs(-i), t.detail===t.MSGESTURE_FLAG_INERTIA?void setImmediate(function() {
                            e._gesture.stop()
                        }
                        ):void((!y||Number(new Date)-b>500)&&(t.preventDefault(),
                        !f&&n.transitions&&(n.vars.animationLoop||(v=E/(0===n.currentSlide&&0>E||n.currentSlide===n.last&&E>0?Math.abs(E)/g+2:1)),
                        n.setProps(m+v,
                        "setTouch"))))
                    }
                }
                function l(t) {
                    t.stopPropagation();
                    var e=t.target._slider;
                    if(e) {
                        if(e.animatingTo===e.currentSlide&&!y&&null!==v) {
                            var n=u?-v: v, o=e.getTarget(n>0?"next": "prev");
                            e.canAdvance(o)&&(Number(new Date)-b<550&&Math.abs(n)>50||Math.abs(n)>g/2)?e.flexAnimate(o, e.vars.pauseOnAction): f||e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
                        }
                        c=null,
                        h=null,
                        v=null,
                        m=null,
                        E=0
                    }
                }
                var c,
                h,
                m,
                g,
                v,
                b,
                y=!1,
                w=0,
                C=0,
                E=0;
                s?(e.style.msTouchAction="none",
                e._gesture=new MSGesture,
                e._gesture.target=e,
                e.addEventListener("MSPointerDown",
                a,
                !1),
                e._slider=o,
                e.addEventListener("MSGestureChange",
                r,
                !1),
                e.addEventListener("MSGestureEnd",
                l,
                !1)):e.addEventListener("touchstart",
                t,
                !1)
            }
            ,
            resize:function() {
                !o.animating&&o.is(":visible")&&(p||o.doMath(), f?m.smoothHeight(): p?(o.slides.width(o.computedW), o.update(o.pagingCount), o.setProps()): d?(o.viewport.height(o.h), o.setProps(o.h, "setTotal")): (o.vars.smoothHeight&&m.smoothHeight(), o.newSlides.width(o.computedW), o.setProps(o.computedW, "setTotal")))
            }
            ,
            smoothHeight:function(t) {
                if(!d||f) {
                    var e=f?o: o.viewport;
                    t?e.animate( {
                        height: o.slides.eq(o.animatingTo).height()
                    }
                    ,
                    t):e.height(o.slides.eq(o.animatingTo).height())
                }
            }
            ,
            sync:function(e) {
                var n=t(o.vars.sync).data("flexslider"), i=o.animatingTo;
                switch(e) {
                    case"animate": n.flexAnimate(i, o.vars.pauseOnAction, !1, !0);
                    break;
                    case"play": n.playing||n.asNav||n.play();
                    break;
                    case"pause": n.pause()
                }
            }
            ,
            uniqueID:function(e) {
                return e.find("[id]").each(function() {
                    var e=t(this);
                    e.attr("id", e.attr("id")+"_clone")
                }
                ),
                e
            }
            ,
            pauseInvisible: {
                visProp: null, init: function() {
                    var t=["webkit", "moz", "ms", "o"];
                    if("hidden"in document)return"hidden";
                    for(var e=0;
                    e<t.length;
                    e++)t[e]+"Hidden"in document&&(m.pauseInvisible.visProp=t[e]+"Hidden");
                    if(m.pauseInvisible.visProp) {
                        var n=m.pauseInvisible.visProp.replace(/[H|h]idden/, "")+"visibilitychange";
                        document.addEventListener(n, function() {
                            m.pauseInvisible.isHidden()?o.startTimeout?clearTimeout(o.startTimeout): o.pause(): o.started?o.play(): o.vars.initDelay>0?setTimeout(o.play, o.vars.initDelay): o.play()
                        }
                        )
                    }
                }
                ,
                isHidden:function() {
                    return document[m.pauseInvisible.visProp]||!1
                }
            }
            ,
            setToClearWatchedEvent:function() {
                clearTimeout(i), i=setTimeout(function() {
                    c=""
                }
                ,
                3e3)
            }
        }
        ,
        o.flexAnimate=function(e,
        n,
        i,
        s,
        l) {
            if(o.vars.animationLoop||e===o.currentSlide||(o.direction=e>o.currentSlide?"next": "prev"), h&&1===o.pagingCount&&(o.direction=o.currentItem<e?"next": "prev"), !o.animating&&(o.canAdvance(e, l)||i)&&o.is(":visible")) {
                if(h&&s) {
                    var c=t(o.vars.asNavFor).data("flexslider");
                    if(o.atEnd=0===e||e===o.count-1, c.flexAnimate(e, !0, !1, !0, l), o.direction=o.currentItem<e?"next": "prev", c.direction=o.direction, Math.ceil((e+1)/o.visible)-1===o.currentSlide||0===e)return o.currentItem=e, o.slides.removeClass(a+"active-slide").eq(e).addClass(a+"active-slide"), !1;
                    o.currentItem=e, o.slides.removeClass(a+"active-slide").eq(e).addClass(a+"active-slide"), e=Math.floor(e/o.visible)
                }
                if(o.animating=!0,
                o.animatingTo=e,
                n&&o.pause(),
                o.vars.before(o),
                o.syncExists&&!l&&m.sync("animate"),
                o.vars.controlNav&&m.controlNav.active(),
                p||o.slides.removeClass(a+"active-slide").eq(e).addClass(a+"active-slide"),
                o.atEnd=0===e||e===o.last,
                o.vars.directionNav&&m.directionNav.update(),
                e===o.last&&(o.vars.end(o),
                o.vars.animationLoop||o.pause()),
                f)r?(o.slides.eq(o.currentSlide).css( {
                    opacity: 0, zIndex: 1
                }
                ),
                o.slides.eq(e).css( {
                    opacity: 1, zIndex: 2
                }
                ),
                o.wrapup(y)):(o.slides.eq(o.currentSlide).css( {
                    zIndex: 1
                }
                ).animate( {
                    opacity: 0
                }
                ,
                o.vars.animationSpeed,
                o.vars.easing),
                o.slides.eq(e).css( {
                    zIndex: 2
                }
                ).animate( {
                    opacity: 1
                }
                ,
                o.vars.animationSpeed,
                o.vars.easing,
                o.wrapup));
                else {
                    var g, v, b, y=d?o.slides.filter(":first").height(): o.computedW;
                    p?(g=o.vars.itemMargin, b=(o.itemW+g)*o.move*o.animatingTo, v=b>o.limit&&1!==o.visible?o.limit: b): v=0===o.currentSlide&&e===o.count-1&&o.vars.animationLoop&&"next"!==o.direction?u?(o.count+o.cloneOffset)*y: 0: o.currentSlide===o.last&&0===e&&o.vars.animationLoop&&"prev"!==o.direction?u?0: (o.count+1)*y: u?(o.count-1-e+o.cloneOffset)*y: (e+o.cloneOffset)*y, o.setProps(v, "", o.vars.animationSpeed), o.transitions?(o.vars.animationLoop&&o.atEnd||(o.animating=!1, o.currentSlide=o.animatingTo), o.container.unbind("webkitTransitionEnd transitionend"), o.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(o.ensureAnimationEnd), o.wrapup(y)
                    }
                    ),
                    clearTimeout(o.ensureAnimationEnd),
                    o.ensureAnimationEnd=setTimeout(function() {
                        o.wrapup(y)
                    }
                    ,
                    o.vars.animationSpeed+100)):o.container.animate(o.args,
                    o.vars.animationSpeed,
                    o.vars.easing,
                    function() {
                        o.wrapup(y)
                    }
                    )
                }
                o.vars.smoothHeight&&m.smoothHeight(o.vars.animationSpeed)
            }
        }
        ,
        o.wrapup=function(t) {
            f||p||(0===o.currentSlide&&o.animatingTo===o.last&&o.vars.animationLoop?o.setProps(t, "jumpEnd"): o.currentSlide===o.last&&0===o.animatingTo&&o.vars.animationLoop&&o.setProps(t, "jumpStart")), o.animating=!1, o.currentSlide=o.animatingTo, o.vars.after(o)
        }
        ,
        o.animateSlides=function() {
            !o.animating&&g&&o.flexAnimate(o.getTarget("next"))
        }
        ,
        o.pause=function() {
            clearInterval(o.animatedSlides), o.animatedSlides=null, o.playing=!1, o.vars.pausePlay&&m.pausePlay.update("play"), o.syncExists&&m.sync("pause")
        }
        ,
        o.play=function() {
            o.playing&&clearInterval(o.animatedSlides), o.animatedSlides=o.animatedSlides||setInterval(o.animateSlides, o.vars.slideshowSpeed), o.started=o.playing=!0, o.vars.pausePlay&&m.pausePlay.update("pause"), o.syncExists&&m.sync("play")
        }
        ,
        o.stop=function() {
            o.pause(), o.stopped=!0
        }
        ,
        o.canAdvance=function(t,
        e) {
            var n=h?o.pagingCount-1: o.last;
            return e?!0: h&&o.currentItem===o.count-1&&0===t&&"prev"===o.direction?!0: h&&0===o.currentItem&&t===o.pagingCount-1&&"next"!==o.direction?!1: t!==o.currentSlide||h?o.vars.animationLoop?!0: o.atEnd&&0===o.currentSlide&&t===n&&"next"!==o.direction?!1: o.atEnd&&o.currentSlide===n&&0===t&&"next"===o.direction?!1: !0: !1
        }
        ,
        o.getTarget=function(t) {
            return o.direction=t, "next"===t?o.currentSlide===o.last?0: o.currentSlide+1: 0===o.currentSlide?o.last: o.currentSlide-1
        }
        ,
        o.setProps=function(t,
        e,
        n) {
            var i=function() {
                var n=t?t: (o.itemW+o.vars.itemMargin)*o.move*o.animatingTo, i=function() {
                    if(p)return"setTouch"===e?t: u&&o.animatingTo===o.last?0: u?o.limit-(o.itemW+o.vars.itemMargin)*o.move*o.animatingTo: o.animatingTo===o.last?o.limit: n;
                    switch(e) {
                        case"setTotal": return u?(o.count-1-o.currentSlide+o.cloneOffset)*t: (o.currentSlide+o.cloneOffset)*t;
                        case"setTouch": return u?t: t;
                        case"jumpEnd": return u?t: o.count*t;
                        case"jumpStart": return u?o.count*t: t;
                        default: return t
                    }
                }
                ();
                return-1*i+"px"
            }
            ();
            o.transitions&&(i=d?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",
            n=void 0!==n?n/1e3+"s":"0s",
            o.container.css("-"+o.pfx+"-transition-duration",
            n),
            o.container.css("transition-duration",
            n)),
            o.args[o.prop]=i,
            (o.transitions||void 0===n)&&o.container.css(o.args),
            o.container.css("transform",
            i)
        }
        ,
        o.setup=function(e) {
            if(f)o.slides.css( {
                width: "100%", "float": "left", marginRight: "-100%", position: "relative"
            }
            ),
            "init"===e&&(r?o.slides.css( {
                opacity: 0, display: "block", webkitTransition: "opacity "+o.vars.animationSpeed/1e3+"s ease", zIndex: 1
            }
            ).eq(o.currentSlide).css( {
                opacity: 1, zIndex: 2
            }
            ):o.slides.css( {
                opacity: 0, display: "block", zIndex: 1
            }
            ).eq(o.currentSlide).css( {
                zIndex: 2
            }
            ).animate( {
                opacity: 1
            }
            ,
            o.vars.animationSpeed,
            o.vars.easing)),
            o.vars.smoothHeight&&m.smoothHeight();
            else {
                var n, i;
                "init"===e&&(o.viewport=t('<div class="'+a+'viewport"></div>').css( {
                    overflow: "hidden", position: "relative"
                }
                ).appendTo(o).append(o.container),
                o.cloneCount=0,
                o.cloneOffset=0,
                u&&(i=t.makeArray(o.slides).reverse(),
                o.slides=t(i),
                o.container.empty().append(o.slides))),
                o.vars.animationLoop&&!p&&(o.cloneCount=2,
                o.cloneOffset=1,
                "init"!==e&&o.container.find(".clone").remove(),
                m.uniqueID(o.slides.first().clone().addClass("clone").attr("aria-hidden",
                "true")).appendTo(o.container),
                m.uniqueID(o.slides.last().clone().addClass("clone").attr("aria-hidden",
                "true")).prependTo(o.container)),
                o.newSlides=t(o.vars.selector,
                o),
                n=u?o.count-1-o.currentSlide+o.cloneOffset:o.currentSlide+o.cloneOffset,
                d&&!p?(o.container.height(200*(o.count+o.cloneCount)+"%").css("position",
                "absolute").width("100%"),
                setTimeout(function() {
                    o.newSlides.css( {
                        display: "block"
                    }
                    ),
                    o.doMath(),
                    o.viewport.height(o.h),
                    o.setProps(n*o.h,
                    "init")
                }
                ,
                "init"===e?100:0)):(o.container.width(200*(o.count+o.cloneCount)+"%"),
                o.setProps(n*o.computedW,
                "init"),
                setTimeout(function() {
                    o.doMath(), o.newSlides.css( {
                        width: o.computedW, "float": "left", display: "block"
                    }
                    ),
                    o.vars.smoothHeight&&m.smoothHeight()
                }
                ,
                "init"===e?100:0))
            }
            p||o.slides.removeClass(a+"active-slide").eq(o.currentSlide).addClass(a+"active-slide"),
            o.vars.init(o)
        }
        ,
        o.doMath=function() {
            var t=o.slides.first(), e=o.vars.itemMargin, n=o.vars.minItems, i=o.vars.maxItems;
            o.w=void 0===o.viewport?o.width(): o.viewport.width(), o.h=t.height(), o.boxPadding=t.outerWidth()-t.width(), p?(o.itemT=o.vars.itemWidth+e, o.minW=n?n*o.itemT: o.w, o.maxW=i?i*o.itemT-e: o.w, o.itemW=o.minW>o.w?(o.w-e*(n-1))/n: o.maxW<o.w?(o.w-e*(i-1))/i: o.vars.itemWidth>o.w?o.w: o.vars.itemWidth, o.visible=Math.floor(o.w/o.itemW), o.move=o.vars.move>0&&o.vars.move<o.visible?o.vars.move: o.visible, o.pagingCount=Math.ceil((o.count-o.visible)/o.move+1), o.last=o.pagingCount-1, o.limit=1===o.pagingCount?0: o.vars.itemWidth>o.w?o.itemW*(o.count-1)+e*(o.count-1): (o.itemW+e)*o.count-o.w-e): (o.itemW=o.w, o.pagingCount=o.count, o.last=o.count-1), o.computedW=o.itemW-o.boxPadding
        }
        ,
        o.update=function(t,
        e) {
            o.doMath(), p||(t<o.currentSlide?o.currentSlide+=1: t<=o.currentSlide&&0!==t&&(o.currentSlide-=1), o.animatingTo=o.currentSlide), o.vars.controlNav&&!o.manualControls&&("add"===e&&!p||o.pagingCount>o.controlNav.length?m.controlNav.update("add"): ("remove"===e&&!p||o.pagingCount<o.controlNav.length)&&(p&&o.currentSlide>o.last&&(o.currentSlide-=1, o.animatingTo-=1), m.controlNav.update("remove", o.last))), o.vars.directionNav&&m.directionNav.update()
        }
        ,
        o.addSlide=function(e,
        n) {
            var i=t(e);
            o.count+=1, o.last=o.count-1, d&&u?void 0!==n?o.slides.eq(o.count-n).after(i): o.container.prepend(i): void 0!==n?o.slides.eq(n).before(i): o.container.append(i), o.update(n, "add"), o.slides=t(o.vars.selector+":not(.clone)", o), o.setup(), o.vars.added(o)
        }
        ,
        o.removeSlide=function(e) {
            var n=isNaN(e)?o.slides.index(t(e)): e;
            o.count-=1, o.last=o.count-1, isNaN(e)?t(e, o.slides).remove(): d&&u?o.slides.eq(o.last).remove(): o.slides.eq(e).remove(), o.doMath(), o.update(n, "remove"), o.slides=t(o.vars.selector+":not(.clone)", o), o.setup(), o.vars.removed(o)
        }
        ,
        m.init()
    }
    ,
    t(window).blur(function() {
        focused=!1
    }
    ).focus(function() {
        focused=!0
    }
    ),
    t.flexslider.defaults= {
        namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: !1, animationLoop: !0, smoothHeight: !1, startAt: 0, slideshow: !0, slideshowSpeed: 7e3, animationSpeed: 600, initDelay: 0, randomize: !1, thumbCaptions: !1, pauseOnAction: !0, pauseOnHover: !1, pauseInvisible: !0, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: "Previous", nextText: "Next", keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 1, maxItems: 0, move: 0, allowOneSlide: !0, start: function() {}, before: function() {}, after: function() {}, end: function() {}, added: function() {}, removed: function() {}, init: function() {}
    }
    ,
    t.fn.flexslider=function(e) {
        if(void 0===e&&(e= {}), "object"==typeof e)return this.each(function() {
            var n=t(this), o=e.selector?e.selector: ".slides > li", i=n.find(o);
            1===i.length&&e.allowOneSlide===!0||0===i.length?(i.fadeIn(400), e.start&&e.start(n)): void 0===n.data("flexslider")&&new t.flexslider(this, e)
        }
        );
        var n=t(this).data("flexslider");
        switch(e) {
            case"play": n.play();
            break;
            case"pause": n.pause();
            break;
            case"stop": n.stop();
            break;
            case"next": n.flexAnimate(n.getTarget("next"), !0);
            break;
            case"prev": case"previous": n.flexAnimate(n.getTarget("prev"), !0);
            break;
            default: "number"==typeof e&&n.flexAnimate(e, !0)
        }
    }
}
(jQuery),
eval(function(t,
e,
n,
o,
i,
a) {
    if(i=function(t) {
        return(e>t?"": i(parseInt(t/e)))+((t%=e)>35?String.fromCharCode(t+29): t.toString(36))
    }
    ,
    !"".replace(/^/,
    String)) {
        for(;
        n--;
        )a[i(n)]=o[n]||i(n);
        o=[function(t) {
            return a[t]
        }
        ],
        i=function() {
            return"\\w+"
        }
        ,
        n=1
    }
    for(;
    n--;
    )o[n]&&(t=t.replace(new RegExp("\\b"+i(n)+"\\b",
    "g"),
    o[n]));
    return t
}
("(D($){8($.1s.1v){H}$.1s.6i=$.1s.1v=D(u,w){8(1l.S==0){18(J,'6j 55 6k 1j \"'+1l.4o+'\".');H 1l}8(1l.S>1){H 1l.1W(D(){$(1l).1v(u,w)})}F y=1l,$12=1l[0],56=L;8(y.1q('57')){56=y.1P('3o','4p');y.T('3o',['4q',J])}F z={};z.59=D(o,a,b){o=3S($12,o);o.E=6l($12,o.E);o.1K=6m($12,o.1K);o.N=6n($12,o.N);o.14=5a($12,o.14);o.16=5a($12,o.16);o.1b=6o($12,o.1b);o.1r=6p($12,o.1r);o.1Q=6q($12,o.1Q);8(a){31=$.1L(J,{},$.1s.1v.5b,o)}7=$.1L(J,{},$.1s.1v.5b,o);7.d=6r(7);A.2l=(7.2l=='5c'||7.2l=='1m')?'16':'14';F c=y.13(),2m=5d($1n,7,'P');8(3p(7.25)){7.25='7Q'+G.3T}7.3U=5e(7,2m);7.E=6s(7.E,7,c,b);7[7.d['P']]=6t(7[7.d['P']],7,c);7[7.d['1e']]=6u(7[7.d['1e']],7,c);8(7.2H){8(!3V(7[7.d['P']])){7[7.d['P']]='2I%'}}8(3V(7[7.d['P']])){A.6v=J;A.4r=7[7.d['P']];7[7.d['P']]=4s(2m,A.4r);8(!7.E.M){7.E.U.1d=J}}8(7.2H){7.1R=L;7.1i=[0,0,0,0];7.1B=L;7.E.U.1d=L}O{8(!7.E.M){7=6w(7,2m)}8(!7[7.d['P']]){8(!7.E.U.1d&&Y(7.E[7.d['P']])&&7.E.1t=='*'){7[7.d['P']]=7.E.M*7.E[7.d['P']];7.1B=L}O{7[7.d['P']]='1d'}}8(1z(7.1B)){7.1B=(Y(7[7.d['P']]))?'5f':L}8(7.E.U.1d){7.E.M=32(c,7,0)}}8(7.E.1t!='*'&&!7.E.U.1d){7.E.U.4t=7.E.M;7.E.M=3W(c,7,0)}7.E.M=2x(7.E.M,7,7.E.U.2c,$12);7.E.U.20=7.E.M;8(7.2H){8(!7.E.U.34){7.E.U.34=7.E.M}8(!7.E.U.1X){7.E.U.1X=7.E.M}7=5g(7,c,2m)}O{7.1i=6x(7.1i);8(7.1B=='3q'){7.1B='1m'}O 8(7.1B=='5h'){7.1B='35'}1F(7.1B){R'5f':R'1m':R'35':8(7[7.d['P']]!='1d'){7=5i(7,c);7.1R=J}17;2J:7.1B=L;7.1R=(7.1i[0]==0&&7.1i[1]==0&&7.1i[2]==0&&7.1i[3]==0)?L:J;17}}8(!Y(7.1K.1M)){7.1K.1M=6y}8(1z(7.1K.E)){7.1K.E=(7.2H||7.E.U.1d||7.E.1t!='*')?'M':7.E.M}7.N=$.1L(J,{},7.1K,7.N);7.14=$.1L(J,{},7.1K,7.14);7.16=$.1L(J,{},7.1K,7.16);7.1b=$.1L(J,{},7.1K,7.1b);7.N=6z($12,7.N);7.14=5j($12,7.14);7.16=5j($12,7.16);7.1b=6A($12,7.1b);7.1r=6B($12,7.1r);7.1Q=6C($12,7.1Q);8(7.2n){7.2n=5k(7.2n)}8(7.N.5l){7.N.4u=7.N.5l;3X('N.5l','N.4u')}8(7.N.5m){7.N.4v=7.N.5m;3X('N.5m','N.4v')}8(7.N.5n){7.N.4w=7.N.5n;3X('N.5n','N.4w')}8(7.N.5o){7.N.2K=7.N.5o;3X('N.5o','N.2K')}};z.6D=D(){y.1q('57',J);F a=y.13(),3Y=6E(y,['6F','6G','3r','3q','35','5h','1m','3Z','P','1e','6H','1S','5p','6I']),5q='7R';1F(3Y.3r){R'6J':R'7S':5q=3Y.3r;17}8(G.3s=='36'){41($1n)}O{$1n.Z(3Y)}$1n.Z({'7T':'3t','3r':5q});41(y);y.1q('6K',3Y.3Z);y.Z({'6F':'1m','6G':'42','3r':'6J','3q':0,'35':'N','5h':'N','1m':0,'6H':0,'1S':0,'5p':0,'6I':0});4x(a,7);41(a);8(7.2H){5r(7,a)}};z.6L=D(){z.5s();y.11(I('6M',G),D(e,a){e.1g();8(!A.2d){8(7.N.W){7.N.W.3a(2y('4y',G))}}A.2d=J;8(7.N.1G){7.N.1G=L;y.T(I('3b',G),a)}H J});y.11(I('5t',G),D(e){e.1g();8(A.26){43(V)}H J});y.11(I('3b',G),D(e,a,b){e.1g();1u=3u(1u);8(a&&A.26){V.2d=J;F c=2o()-V.2L;V.1M-=c;8(V.4z){V.4z.1M-=c}8(V.4A){V.4A.1M-=c}43(V,L)}8(!A.27&&!A.26){8(b){1u.3v+=2o()-1u.2L}}8(!A.27){8(7.N.W){7.N.W.3a(2y('6N',G))}}A.27=J;8(7.N.4v){F d=7.N.2K-1u.3v,3c=2I-1H.2z(d*2I/7.N.2K);7.N.4v.1h($12,3c,d)}H J});y.11(I('1G',G),D(e,b,c,d){e.1g();1u=3u(1u);F v=[b,c,d],t=['2M','28','3d'],a=3e(v,t);b=a[0];c=a[1];d=a[2];8(b!='14'&&b!='16'){b=A.2l}8(!Y(c)){c=0}8(!1k(d)){d=L}8(d){A.2d=L;7.N.1G=J}8(!7.N.1G){e.2e();H 18(G,'3w 4y: 2p 3f.')}8(A.27){8(7.N.W){7.N.W.2N(2y('4y',G));7.N.W.2N(2y('6N',G))}}A.27=L;1u.2L=2o();F f=7.N.2K+c;44=f-1u.3v;3c=2I-1H.2z(44*2I/f);8(7.N.1f){1u.1f=7U(D(){F a=2o()-1u.2L+1u.3v,3c=1H.2z(a*2I/f);7.N.1f.4B.1h(7.N.1f.2q[0],3c)},7.N.1f.5u)}1u.N=7V(D(){8(7.N.1f){7.N.1f.4B.1h(7.N.1f.2q[0],2I)}8(7.N.4w){7.N.4w.1h($12,3c,44)}8(A.26){y.T(I('1G',G),b)}O{y.T(I(b,G),7.N)}},44);8(7.N.4u){7.N.4u.1h($12,3c,44)}H J});y.11(I('3g',G),D(e){e.1g();8(V.2d){V.2d=L;A.27=L;A.26=J;V.2L=2o();3x(V,G)}O{y.T(I('1G',G))}H J});y.11(I('14',G)+' '+I('16',G),D(e,b,f,g,h){e.1g();8(A.2d||y.2f(':3t')){e.2e();H 18(G,'3w 4y 7W 3t: 2p 3f.')}F i=(Y(7.E.4C))?7.E.4C:7.E.M+1;8(i>K.Q){e.2e();H 18(G,'2p 6O E ('+K.Q+' Q, '+i+' 6P): 2p 3f.')}F v=[b,f,g,h],t=['2A','28/2M','D','3d'],a=3e(v,t);b=a[0];f=a[1];g=a[2];h=a[3];F k=e.5v.19(G.3y.45.S);8(!1T(b)){b={}}8(1o(g)){b.3h=g}8(1k(h)){b.2O=h}b=$.1L(J,{},7[k],b);8(b.5w&&!b.5w.1h($12,k)){e.2e();H 18(G,'7X \"5w\" 7Y L.')}8(!Y(f)){8(7.E.1t!='*'){f='M'}O{F m=[f,b.E,7[k].E];1j(F a=0,l=m.S;a<l;a++){8(Y(m[a])||m[a]=='6Q'||m[a]=='M'){f=m[a];17}}}1F(f){R'6Q':e.2e();H y.1P(I(k+'7Z',G),[b,g]);17;R'M':8(!7.E.U.1d&&7.E.1t=='*'){f=7.E.M}17}}8(V.2d){y.T(I('3g',G));y.T(I('2O',G),[k,[b,f,g]]);e.2e();H 18(G,'3w 80 3f.')}8(b.1M>0){8(A.26){8(b.2O){8(b.2O=='2P'){2g=[]}8(b.2O!='X'||2g.S==0){y.T(I('2O',G),[k,[b,f,g]])}}e.2e();H 18(G,'3w 81 3f.')}}1u.3v=0;y.T(I('6R'+k,G),[b,f]);8(7.2n){F s=7.2n,c=[b,f];1j(F j=0,l=s.S;j<l;j++){F d=k;8(!s[j][2]){d=(d=='14')?'16':'14'}8(!s[j][1]){c[0]=s[j][0].1P('3o',['6S',d])}c[1]=f+s[j][3];s[j][0].T('3o',['6R'+d,c])}}H J});y.11(I('82',G),D(e,b,c){e.1g();F d=y.13();8(!7.1U){8(K.X==0){8(7.3z){y.T(I('16',G),K.Q-1)}H e.2e()}}1Y(d,7);8(!Y(c)){8(7.E.U.1d){c=4D(d,7,K.Q-1)}O 8(7.E.1t!='*'){F f=(Y(b.E))?b.E:5x(y,7);c=6T(d,7,K.Q-1,f)}O{c=7.E.M}c=4E(c,7,b.E,$12)}8(!7.1U){8(K.Q-c<K.X){c=K.Q-K.X}}7.E.U.20=7.E.M;8(7.E.U.1d){F g=2x(32(d,7,K.Q-c),7,7.E.U.2c,$12);8(7.E.M+c<=g&&c<K.Q){c++;g=2x(32(d,7,K.Q-c),7,7.E.U.2c,$12)}7.E.M=g}O 8(7.E.1t!='*'){F g=3W(d,7,K.Q-c);7.E.M=2x(g,7,7.E.U.2c,$12)}1Y(d,7,J);8(c==0){e.2e();H 18(G,'0 E 46 1K: 2p 3f.')}18(G,'6U '+c+' E 5y.');K.X+=c;2h(K.X>=K.Q){K.X-=K.Q}8(!7.1U){8(K.X==0&&b.4F){b.4F.1h($12,'14')}8(!7.3z){3A(7,K.X,G)}}y.13().19(K.Q-c,K.Q).83(y);8(K.Q<7.E.M+c){y.13().19(0,(7.E.M+c)-K.Q).4G(J).47(y)}F d=y.13(),3i=6V(d,7,c),2i=6W(d,7),1Z=d.1N(c-1),21=3i.2P(),2r=2i.2P();1Y(d,7);F h=0,2B=0;8(7.1B){F p=4H(2i,7);h=p[0];2B=p[1]}F i=(h<0)?7.1i[7.d[3]]:0;F j=L,2Q=$();8(7.E.M<c){2Q=d.19(7.E.U.20,c);8(b.1V=='6X'){F k=7.E[7.d['P']];j=2Q;1Z=2r;5z(j);7.E[7.d['P']]='1d'}}F l=L,3B=2R(d.19(0,c),7,'P'),2j=4I(4J(2i,7,J),7,!7.1R),3C=0,29={},4K={},2s={},2S={},4L={},2T={},5A={},2U=5B(b,7,c,3B);1F(b.1V){R'1I':R'1I-1w':3C=2R(d.19(0,7.E.M),7,'P');17}8(j){7.E[7.d['P']]=k}1Y(d,7,J);8(2B>=0){1Y(21,7,7.1i[7.d[1]])}8(h>=0){1Y(1Z,7,7.1i[7.d[3]])}8(7.1B){7.1i[7.d[1]]=2B;7.1i[7.d[3]]=h}2T[7.d['1m']]=-(3B-i);5A[7.d['1m']]=-(3C-i);4K[7.d['1m']]=2j[7.d['P']];F m=D(){},1O=D(){},1C=D(){},3D=D(){},2C=D(){},5C=D(){},1D=D(){},3E=D(){},1x=D(){},1y=D(){},1J=D(){};1F(b.1V){R'3j':R'1I':R'1I-1w':R'22':R'22-1w':l=y.4G(J).47($1n);17}1F(b.1V){R'3j':R'22':R'22-1w':l.13().19(0,c).2t();l.13().19(7.E.U.20).2t();17;R'1I':R'1I-1w':l.13().19(7.E.M).2t();l.Z(5A);17}y.Z(2T);V=48(2U,b.2u,G);29[7.d['1m']]=(7.1R)?7.1i[7.d[3]]:0;8(7[7.d['P']]=='1d'||7[7.d['1e']]=='1d'){m=D(){$1n.Z(2j)};1O=D(){V.1a.1c([$1n,2j])}}8(7.1R){8(2r.4M(1Z).S){2s[7.d['1S']]=1Z.1q('2a');8(h<0){1Z.Z(2s)}O{1D=D(){1Z.Z(2s)};3E=D(){V.1a.1c([1Z,2s])}}}1F(b.1V){R'1I':R'1I-1w':l.13().1N(c-1).Z(2s);17}8(2r.4M(21).S){2S[7.d['1S']]=21.1q('2a');1C=D(){21.Z(2S)};3D=D(){V.1a.1c([21,2S])}}8(2B>=0){4L[7.d['1S']]=2r.1q('2a')+7.1i[7.d[1]];2C=D(){2r.Z(4L)};5C=D(){V.1a.1c([2r,4L])}}}1J=D(){y.Z(29)};F n=7.E.M+c-K.Q;1y=D(){8(n>0){y.13().19(K.Q).2t();3i=$(y.13().19(K.Q-(7.E.M-n)).3F().6Y(y.13().19(0,n).3F()))}5D(j);8(7.1R){F a=y.13().1N(7.E.M+c-1);a.Z(7.d['1S'],a.1q('2a'))}};F o=5E(3i,2Q,2i,c,'14',2U,2j);1x=D(){5F(y,l,b);A.26=L;2b.3h=4a($12,b,'3h',o,2b);2g=5G(y,2g,G);8(!A.27){y.T(I('1G',G))}};A.26=J;1u=3u(1u);2b.3G=4a($12,b,'3G',o,2b);1F(b.1V){R'42':y.Z(29);m();1C();2C();1D();1J();1y();1x();17;R'1w':V.1a.1c([y,{'1E':0},D(){m();1C();2C();1D();1J();1y();V=48(2U,b.2u,G);V.1a.1c([y,{'1E':1},1x]);3x(V,G)}]);17;R'3j':y.Z({'1E':0});V.1a.1c([l,{'1E':0}]);V.1a.1c([y,{'1E':1},1x]);1O();1C();2C();1D();1J();1y();17;R'1I':V.1a.1c([l,29,D(){1C();2C();1D();1J();1y();1x()}]);1O();17;R'1I-1w':V.1a.1c([y,{'1E':0}]);V.1a.1c([l,29,D(){y.Z({'1E':1});1C();2C();1D();1J();1y();1x()}]);1O();17;R'22':V.1a.1c([l,4K,1x]);1O();1C();2C();1D();1J();1y();17;R'22-1w':y.Z({'1E':0});V.1a.1c([y,{'1E':1}]);V.1a.1c([l,4K,1x]);1O();1C();2C();1D();1J();1y();17;2J:V.1a.1c([y,29,D(){1y();1x()}]);1O();3D();5C();3E();17}3x(V,G);5H(7.25,y,G);y.T(I('3H',G),[L,2j]);H J});y.11(I('84',G),D(e,c,d){e.1g();F f=y.13();8(!7.1U){8(K.X==7.E.M){8(7.3z){y.T(I('14',G),K.Q-1)}H e.2e()}}1Y(f,7);8(!Y(d)){8(7.E.1t!='*'){F g=(Y(c.E))?c.E:5x(y,7);d=6Z(f,7,0,g)}O{d=7.E.M}d=4E(d,7,c.E,$12)}F h=(K.X==0)?K.Q:K.X;8(!7.1U){8(7.E.U.1d){F i=32(f,7,d),g=4D(f,7,h-1)}O{F i=7.E.M,g=7.E.M}8(d+i>h){d=h-g}}7.E.U.20=7.E.M;8(7.E.U.1d){F i=2x(5I(f,7,d,h),7,7.E.U.2c,$12);2h(7.E.M-d>=i&&d<K.Q){d++;i=2x(5I(f,7,d,h),7,7.E.U.2c,$12)}7.E.M=i}O 8(7.E.1t!='*'){F i=3W(f,7,d);7.E.M=2x(i,7,7.E.U.2c,$12)}1Y(f,7,J);8(d==0){e.2e();H 18(G,'0 E 46 1K: 2p 3f.')}18(G,'6U '+d+' E 70.');K.X-=d;2h(K.X<0){K.X+=K.Q}8(!7.1U){8(K.X==7.E.M&&c.4F){c.4F.1h($12,'16')}8(!7.3z){3A(7,K.X,G)}}8(K.Q<7.E.M+d){y.13().19(0,(7.E.M+d)-K.Q).4G(J).47(y)}F f=y.13(),3i=71(f,7),2i=72(f,7,d),1Z=f.1N(d-1),21=3i.2P(),2r=2i.2P();1Y(f,7);F j=0,2B=0;8(7.1B){F p=4H(2i,7);j=p[0];2B=p[1]}F k=L,2Q=$();8(7.E.U.20<d){2Q=f.19(7.E.U.20,d);8(c.1V=='6X'){F l=7.E[7.d['P']];k=2Q;1Z=21;5z(k);7.E[7.d['P']]='1d'}}F m=L,3B=2R(f.19(0,d),7,'P'),2j=4I(4J(2i,7,J),7,!7.1R),3C=0,29={},4N={},2s={},2S={},2T={},2U=5B(c,7,d,3B);1F(c.1V){R'22':R'22-1w':3C=2R(f.19(0,7.E.U.20),7,'P');17}8(k){7.E[7.d['P']]=l}8(7.1B){8(7.1i[7.d[1]]<0){7.1i[7.d[1]]=0}}1Y(f,7,J);1Y(21,7,7.1i[7.d[1]]);8(7.1B){7.1i[7.d[1]]=2B;7.1i[7.d[3]]=j}2T[7.d['1m']]=(7.1R)?7.1i[7.d[3]]:0;F n=D(){},1O=D(){},1C=D(){},3D=D(){},1D=D(){},3E=D(){},1x=D(){},1y=D(){},1J=D(){};1F(c.1V){R'3j':R'1I':R'1I-1w':R'22':R'22-1w':m=y.4G(J).47($1n);m.13().19(7.E.U.20).2t();17}1F(c.1V){R'3j':R'1I':R'1I-1w':y.Z('3Z',1);m.Z('3Z',0);17}V=48(2U,c.2u,G);29[7.d['1m']]=-3B;4N[7.d['1m']]=-3C;8(j<0){29[7.d['1m']]+=j}8(7[7.d['P']]=='1d'||7[7.d['1e']]=='1d'){n=D(){$1n.Z(2j)};1O=D(){V.1a.1c([$1n,2j])}}8(7.1R){F o=2r.1q('2a');8(2B>=0){o+=7.1i[7.d[1]]}2r.Z(7.d['1S'],o);8(1Z.4M(21).S){2S[7.d['1S']]=21.1q('2a')}1C=D(){21.Z(2S)};3D=D(){V.1a.1c([21,2S])};F q=1Z.1q('2a');8(j>0){q+=7.1i[7.d[3]]}2s[7.d['1S']]=q;1D=D(){1Z.Z(2s)};3E=D(){V.1a.1c([1Z,2s])}}1J=D(){y.Z(2T)};F r=7.E.M+d-K.Q;1y=D(){8(r>0){y.13().19(K.Q).2t()}F a=y.13().19(0,d).47(y).2P();8(r>0){2i=3I(f,7)}5D(k);8(7.1R){8(K.Q<7.E.M+d){F b=y.13().1N(7.E.M-1);b.Z(7.d['1S'],b.1q('2a')+7.1i[7.d[1]])}a.Z(7.d['1S'],a.1q('2a'))}};F s=5E(3i,2Q,2i,d,'16',2U,2j);1x=D(){y.Z('3Z',y.1q('6K'));5F(y,m,c);A.26=L;2b.3h=4a($12,c,'3h',s,2b);2g=5G(y,2g,G);8(!A.27){y.T(I('1G',G))}};A.26=J;1u=3u(1u);2b.3G=4a($12,c,'3G',s,2b);1F(c.1V){R'42':y.Z(29);n();1C();1D();1J();1y();1x();17;R'1w':V.1a.1c([y,{'1E':0},D(){n();1C();1D();1J();1y();V=48(2U,c.2u,G);V.1a.1c([y,{'1E':1},1x]);3x(V,G)}]);17;R'3j':y.Z({'1E':0});V.1a.1c([m,{'1E':0}]);V.1a.1c([y,{'1E':1},1x]);1O();1C();1D();1J();1y();17;R'1I':y.Z(7.d['1m'],$1n[7.d['P']]());V.1a.1c([y,2T,1x]);1O();1C();1D();1y();17;R'1I-1w':y.Z(7.d['1m'],$1n[7.d['P']]());V.1a.1c([m,{'1E':0}]);V.1a.1c([y,2T,1x]);1O();1C();1D();1y();17;R'22':V.1a.1c([m,4N,1x]);1O();1C();1D();1J();1y();17;R'22-1w':y.Z({'1E':0});V.1a.1c([y,{'1E':1}]);V.1a.1c([m,4N,1x]);1O();1C();1D();1J();1y();17;2J:V.1a.1c([y,29,D(){1J();1y();1x()}]);1O();3D();3E();17}3x(V,G);5H(7.25,y,G);y.T(I('3H',G),[L,2j]);H J});y.11(I('3k',G),D(e,b,c,d,f,g,h){e.1g();F v=[b,c,d,f,g,h],t=['2M/28/2A','28','3d','2A','2M','D'],a=3e(v,t);f=a[3];g=a[4];h=a[5];b=3J(a[0],a[1],a[2],K,y);8(b==0){H L}8(!1T(f)){f=L}8(g!='14'&&g!='16'){8(7.1U){g=(b<=K.Q/2)?'16':'14'}O{g=(K.X==0||K.X>b)?'16':'14'}}8(g=='14'){b=K.Q-b}y.T(I(g,G),[f,b,h]);H J});y.11(I('85',G),D(e,a,b){e.1g();F c=y.1P(I('4b',G));H y.1P(I('5J',G),[c-1,a,'14',b])});y.11(I('86',G),D(e,a,b){e.1g();F c=y.1P(I('4b',G));H y.1P(I('5J',G),[c+1,a,'16',b])});y.11(I('5J',G),D(e,a,b,c,d){e.1g();8(!Y(a)){a=y.1P(I('4b',G))}F f=7.1b.E||7.E.M,1X=1H.2z(K.Q/f)-1;8(a<0){a=1X}8(a>1X){a=0}H y.1P(I('3k',G),[a*f,0,J,b,c,d])});y.11(I('73',G),D(e,s){e.1g();8(s){s=3J(s,0,J,K,y)}O{s=0}s+=K.X;8(s!=0){8(K.Q>0){2h(s>K.Q){s-=K.Q}}y.87(y.13().19(s,K.Q))}H J});y.11(I('2n',G),D(e,s){e.1g();8(s){s=5k(s)}O 8(7.2n){s=7.2n}O{H 18(G,'6j 88 46 2n.')}F n=y.1P(I('4p',G)),x=J;1j(F j=0,l=s.S;j<l;j++){8(!s[j][0].1P(I('3k',G),[n,s[j][3],J])){x=L}}H x});y.11(I('2O',G),D(e,a,b){e.1g();8(1o(a)){a.1h($12,2g)}O 8(2V(a)){2g=a}O 8(!1z(a)){2g.1c([a,b])}H 2g});y.11(I('89',G),D(e,b,c,d,f){e.1g();F v=[b,c,d,f],t=['2M/2A','2M/28/2A','3d','28'],a=3e(v,t);b=a[0];c=a[1];d=a[2];f=a[3];8(1T(b)&&!2v(b)){b=$(b)}O 8(1p(b)){b=$(b)}8(!2v(b)||b.S==0){H 18(G,'2p a 5K 2A.')}8(1z(c)){c='4c'}4x(b,7);41(b);F g=c,4d='4d';8(c=='4c'){8(d){8(K.X==0){c=K.Q-1;4d='74'}O{c=K.X;K.X+=b.S}8(c<0){c=0}}O{c=K.Q-1;4d='74'}}O{c=3J(c,f,d,K,y)}F h=y.13().1N(c);8(h.S){h[4d](b)}O{18(G,'8a 8b-3r 4M 6k! 8c 8d 46 75 4c.');y.76(b)}8(g!='4c'&&!d){8(c<K.X){K.X+=b.S}}K.Q=y.13().S;8(K.X>=K.Q){K.X-=K.Q}y.T(I('4O',G));y.T(I('5L',G));H J});y.11(I('77',G),D(e,c,d,f){e.1g();F v=[c,d,f],t=['2M/28/2A','3d','28'],a=3e(v,t);c=a[0];d=a[1];f=a[2];F g=L;8(c 2W $&&c.S>1){h=$();c.1W(D(i,a){F b=y.T(I('77',G),[$(1l),d,f]);8(b){h=h.8e(b)}});H h}8(1z(c)||c=='4c'){h=y.13().2P()}O{c=3J(c,f,d,K,y);F h=y.13().1N(c);8(h.S){8(c<K.X){K.X-=h.S}}}8(h&&h.S){h.8f();K.Q=y.13().S;y.T(I('4O',G))}H h});y.11(I('3G',G)+' '+I('3h',G),D(e,a){e.1g();F b=e.5v.19(G.3y.45.S);8(2V(a)){2b[b]=a}8(1o(a)){2b[b].1c(a)}H 2b[b]});y.11(I('4p',G),D(e,a){e.1g();8(K.X==0){F b=0}O{F b=K.Q-K.X}8(1o(a)){a.1h($12,b)}H b});y.11(I('4b',G),D(e,a){e.1g();F b=7.1b.E||7.E.M,1X=1H.2z(K.Q/b-1),2k;8(K.X==0){2k=0}O 8(K.X<K.Q%b){2k=0}O 8(K.X==b&&!7.1U){2k=1X}O{2k=1H.78((K.Q-K.X)/b)}8(2k<0){2k=0}8(2k>1X){2k=1X}8(1o(a)){a.1h($12,2k)}H 2k});y.11(I('8g',G),D(e,a){e.1g();F b=3I(y.13(),7);8(1o(a)){a.1h($12,b)}H b});y.11(I('19',G),D(e,f,l,b){e.1g();8(K.Q==0){H L}F v=[f,l,b],t=['28','28','D'],a=3e(v,t);f=(Y(a[0]))?a[0]:0;l=(Y(a[1]))?a[1]:K.Q;b=a[2];f+=K.X;l+=K.X;8(E.Q>0){2h(f>K.Q){f-=K.Q}2h(l>K.Q){l-=K.Q}2h(f<0){f+=K.Q}2h(l<0){l+=K.Q}}F c=y.13(),$i;8(l>f){$i=c.19(f,l)}O{$i=$(c.19(f,K.Q).3F().6Y(c.19(0,l).3F()))}8(1o(b)){b.1h($12,$i)}H $i});y.11(I('27',G)+' '+I('2d',G)+' '+I('26',G),D(e,a){e.1g();F b=e.5v.19(G.3y.45.S),5M=A[b];8(1o(a)){a.1h($12,5M)}H 5M});y.11(I('6S',G),D(e,a,b,c){e.1g();F d=L;8(1o(a)){a.1h($12,7)}O 8(1T(a)){31=$.1L(J,{},31,a);8(b!==L)d=J;O 7=$.1L(J,{},7,a)}O 8(!1z(a)){8(1o(b)){F f=4P('7.'+a);8(1z(f)){f=''}b.1h($12,f)}O 8(!1z(b)){8(2X c!=='3d')c=J;4P('31.'+a+' = b');8(c!==L)d=J;O 4P('7.'+a+' = b')}O{H 4P('7.'+a)}}8(d){1Y(y.13(),7);z.59(31);z.5N();F g=4Q(y,7);y.T(I('3H',G),[J,g])}H 7});y.11(I('5L',G),D(e,a,b){e.1g();8(1z(a)){a=$('8h')}O 8(1p(a)){a=$(a)}8(!2v(a)||a.S==0){H 18(G,'2p a 5K 2A.')}8(!1p(b)){b='a.6i'}a.8i(b).1W(D(){F h=1l.79||'';8(h.S>0&&y.13().7a($(h))!=-1){$(1l).23('5O').5O(D(e){e.2D();y.T(I('3k',G),h)})}});H J});y.11(I('3H',G),D(e,b,c){e.1g();8(!7.1b.1A){H}F d=7.1b.E||7.E.M,4R=1H.2z(K.Q/d);8(b){8(7.1b.3K){7.1b.1A.13().2t();7.1b.1A.1W(D(){1j(F a=0;a<4R;a++){F i=y.13().1N(3J(a*d,0,J,K,y));$(1l).76(7.1b.3K.1h(i[0],a+1))}})}7.1b.1A.1W(D(){$(1l).13().23(7.1b.3L).1W(D(a){$(1l).11(7.1b.3L,D(e){e.2D();y.T(I('3k',G),[a*d,-7.1b.4S,J,7.1b])})})})}F f=y.1P(I('4b',G))+7.1b.4S;8(f>=4R){f=0}8(f<0){f=4R-1}7.1b.1A.1W(D(){$(1l).13().2N(2y('7b',G)).1N(f).3a(2y('7b',G))});H J});y.11(I('4O',G),D(e){F a=7.E.M,2E=y.13(),2m=5d($1n,7,'P');K.Q=2E.S;8(A.4r){7.3U=2m;7[7.d['P']]=4s(2m,A.4r)}O{7.3U=5e(7,2m)}8(7.2H){7.E.P=7.E.3M.P;7.E.1e=7.E.3M.1e;7=5g(7,2E,2m);a=7.E.M;5r(7,2E)}O 8(7.E.U.1d){a=32(2E,7,0)}O 8(7.E.1t!='*'){a=3W(2E,7,0)}8(!7.1U&&K.X!=0&&a>K.X){8(7.E.U.1d){F b=4D(2E,7,K.X)-K.X}O 8(7.E.1t!='*'){F b=7c(2E,7,K.X)-K.X}O{F b=7.E.M-K.X}18(G,'8j 8k-1U: 8l '+b+' E 5y.');y.T(I('14',G),b)}7.E.M=2x(a,7,7.E.U.2c,$12);7.E.U.20=7.E.M;7=5i(7,2E);F c=4Q(y,7);y.T(I('3H',G),[J,c]);4T(7,K.Q,G);3A(7,K.X,G);H c});y.11(I('4q',G),D(e,a){e.1g();1u=3u(1u);y.1q('57',L);y.T(I('5t',G));8(a){y.T(I('73',G))}4U(y.13());4U(y);z.5s();z.5P();8(G.3s=='36'){4U($1n)}O{$1n.8m(y)}H J});y.11(I('18',G),D(e){18(G,'3w P: '+7.P);18(G,'3w 1e: '+7.1e);18(G,'7d 8n: '+7.E.P);18(G,'7d 8o: '+7.E.1e);18(G,'4e 4f E M: '+7.E.M);8(7.N.1G){18(G,'4e 4f E 5Q 8p: '+7.N.E)}8(7.14.W){18(G,'4e 4f E 5Q 5y: '+7.14.E)}8(7.16.W){18(G,'4e 4f E 5Q 70: '+7.16.E)}H G.18});y.11('3o',D(e,n,o){e.1g();H y.1P(I(n,G),o)})};z.5s=D(){y.23(I('',G));y.23(I('',G,L));y.23('3o')};z.5N=D(){z.5P();4T(7,K.Q,G);3A(7,K.X,G);8(7.N.2F){F b=3N(7.N.2F);$1n.11(I('4V',G,L),D(){y.T(I('3b',G),b)}).11(I('4W',G,L),D(){y.T(I('3g',G))})}8(7.N.W){7.N.W.11(I(7.N.3L,G,L),D(e){e.2D();F a=L,b=3O;8(A.27){a='1G'}O 8(7.N.4X){a='3b';b=3N(7.N.4X)}8(a){y.T(I(a,G),b)}})}8(7.14.W){7.14.W.11(I(7.14.3L,G,L),D(e){e.2D();y.T(I('14',G))});8(7.14.2F){F b=3N(7.14.2F);7.14.W.11(I('4V',G,L),D(){y.T(I('3b',G),b)}).11(I('4W',G,L),D(){y.T(I('3g',G))})}}8(7.16.W){7.16.W.11(I(7.16.3L,G,L),D(e){e.2D();y.T(I('16',G))});8(7.16.2F){F b=3N(7.16.2F);7.16.W.11(I('4V',G,L),D(){y.T(I('3b',G),b)}).11(I('4W',G,L),D(){y.T(I('3g',G))})}}8(7.1b.1A){8(7.1b.2F){F b=3N(7.1b.2F);7.1b.1A.11(I('4V',G,L),D(){y.T(I('3b',G),b)}).11(I('4W',G,L),D(){y.T(I('3g',G))})}}8(7.14.2Y||7.16.2Y){$(4g).11(I('7e',G,L,J,J),D(e){F k=e.7f;8(k==7.16.2Y){e.2D();y.T(I('16',G))}8(k==7.14.2Y){e.2D();y.T(I('14',G))}})}8(7.1b.4Y){$(4g).11(I('7e',G,L,J,J),D(e){F k=e.7f;8(k>=49&&k<58){k=(k-49)*7.E.M;8(k<=K.Q){e.2D();y.T(I('3k',G),[k,0,J,7.1b])}}})}8($.1s.1r){F c='8q'8r 3l;8((c&&7.1r.4h)||(!c&&7.1r.5R)){F d=$.1L(J,{},7.14,7.1r),7g=$.1L(J,{},7.16,7.1r),5S=D(){y.T(I('14',G),[d])},5T=D(){y.T(I('16',G),[7g])};1F(7.2l){R'5c':R'7h':7.1r.2G.8s=5T;7.1r.2G.8t=5S;17;2J:7.1r.2G.8u=5T;7.1r.2G.8v=5S}8(A.1r){y.1r('4q')}$1n.1r(7.1r.2G);$1n.Z('7i','8w');A.1r=J}}8($.1s.1Q){8(7.1Q){F f=$.1L(J,{},7.14,7.1Q),7j=$.1L(J,{},7.16,7.1Q);8(A.1Q){$1n.23(I('1Q',G,L))}$1n.11(I('1Q',G,L),D(e,a){e.2D();8(a>0){y.T(I('14',G),[f])}O{y.T(I('16',G),[7j])}});A.1Q=J}}8(7.N.1G){y.T(I('1G',G),7.N.5U)}8(A.6v){F g=D(e){y.T(I('5t',G));8(7.N.5V&&!A.27){y.T(I('1G',G))}1Y(y.13(),7);y.T(I('4O',G))};F h=$(3l),4i=3O;8($.5W&&G.5X=='5W'){4i=$.5W(8x,g)}O 8($.4Z&&G.5X=='4Z'){4i=$.4Z(8y,g)}O{F i=0,5Y=0;4i=D(){F a=h.P(),5Z=h.1e();8(a!=i||5Z!=5Y){g();i=a;5Y=5Z}}}h.11(I('8z',G,L,J,J),4i)}};z.5P=D(){F a=I('',G),3P=I('',G,L);61=I('',G,L,J,J);$(4g).23(61);$(3l).23(61);$1n.23(3P);8(7.N.W){7.N.W.23(3P)}8(7.14.W){7.14.W.23(3P)}8(7.16.W){7.16.W.23(3P)}8(7.1b.1A){7.1b.1A.23(3P);8(7.1b.3K){7.1b.1A.13().2t()}}8(A.1r){y.1r('4q');$1n.Z('7i','2J');A.1r=L}8(A.1Q){A.1Q=L}4T(7,'4j',G);3A(7,'2N',G)};8(1k(w)){w={'18':w}}F A={'2l':'16','27':J,'26':L,'2d':L,'1Q':L,'1r':L},K={'Q':y.13().S,'X':0},1u={'N':3O,'1f':3O,'2L':2o(),'3v':0},V={'2d':L,'1M':0,'2L':0,'2u':'','1a':[]},2b={'3G':[],'3h':[]},2g=[],G=$.1L(J,{},$.1s.1v.7k,w),7={},31=$.1L(J,{},u),$1n=(G.3s=='36')?y.36():y.8A('<'+G.3s.55+' 8B=\"'+G.3s.7l+'\" />').36();G.4o=y.4o;G.3T=$.1s.1v.3T++;G.2Z=(G.2Z&&$.1s.2Z)?'2Z':'8C';z.59(31,J,56);z.6D();z.6L();z.5N();8(2V(7.E.3m)){F B=7.E.3m}O{F B=[];8(7.E.3m!=0){B.1c(7.E.3m)}}8(7.25){B.8D(4k(7m(7.25),10))}8(B.S>0){1j(F a=0,l=B.S;a<l;a++){F s=B[a];8(s==0){62}8(s===J){s=3l.8E.79;8(s.S<1){62}}O 8(s==='7n'){s=1H.4l(1H.7n()*K.Q)}8(y.1P(I('3k',G),[s,0,J,{1V:'42'}])){17}}}F C=4Q(y,7),7o=3I(y.13(),7);8(7.7p){7.7p.1h($12,{'P':C.P,'1e':C.1e,'E':7o})}y.T(I('3H',G),[J,C]);y.T(I('5L',G));8(G.18){y.T(I('18',G))}H y};$.1s.1v.3T=1;$.1s.1v.5b={'2n':L,'3z':J,'1U':J,'2H':L,'2l':'1m','E':{'3m':0},'1K':{'2u':'7q','1M':6y,'2F':L,'3L':'5O','2O':L}};$.1s.1v.7k={'18':L,'2Z':L,'5X':'4Z','3y':{'45':'','7r':'8F'},'3s':{'55':'8G','7l':'8H'},'63':{}};$.1s.1v.7s=D(a){H'<a 8I=\"#\"><7t>'+a+'</7t></a>'};$.1s.1v.7u=D(a){$(1l).Z('P',a+'%')};$.1s.1v.25={3F:D(n){n+='=';F b=4g.25.3Q(';');1j(F a=0,l=b.S;a<l;a++){F c=b[a];2h(c.8J(0)==' '){c=c.19(1)}8(c.3R(n)==0){H c.19(n.S)}}H 0},64:D(n,v,d){F e=\"\";8(d){F a=7v 7w();a.8K(a.2o()+(d*24*60*60*8L));e=\"; 8M=\"+a.8N()}4g.25=n+'='+v+e+'; 8O=/'},2t:D(n){$.1s.1v.25.64(n,\"\",-1)}};D 48(d,e,c){8(c.2Z=='2Z'){8(e=='7q'){e='8P'}}H{1a:[],1M:d,8Q:d,2u:e,2L:2o()}}D 3x(s,c){1j(F a=0,l=s.1a.S;a<l;a++){F b=s.1a[a];8(!b){62}b[0][c.2Z](b[1],s.1M,s.2u,b[2])}}D 43(s,c){8(!1k(c)){c=J}8(1T(s.4z)){43(s.4z,c)}1j(F a=0,l=s.1a.S;a<l;a++){F b=s.1a[a];b[0].6M(J);8(c){b[0].Z(b[1]);8(1o(b[2])){b[2]()}}}8(1T(s.4A)){43(s.4A,c)}}D 5F(a,b,o){8(b){b.2t()}1F(o.1V){R'1w':R'3j':R'1I-1w':R'22-1w':a.Z('1t','');a.Z('1E',1);17}}D 4a(d,o,b,a,c){8(o[b]){o[b].1h(d,a)}8(c[b].S){1j(F i=0,l=c[b].S;i<l;i++){c[b][i].1h(d,a)}}H[]}D 5G(a,q,c){8(q.S){a.T(I(q[0][0],c),q[0][1]);q.8R()}H q}D 5z(b){b.1W(D(){F a=$(1l);a.1q('7x',a.2f(':3t')).4j()})}D 5D(b){8(b){b.1W(D(){F a=$(1l);8(!a.1q('7x')){a.4m()}})}}D 3u(t){8(t.N){8S(t.N)}8(t.1f){8T(t.1f)}H t}D 5E(a,b,c,d,e,f,g){H{'P':g.P,'1e':g.1e,'E':{'20':a,'8U':b,'M':c},'1K':{'E':d,'2l':e,'1M':f}}}D 5B(a,o,b,c){F d=a.1M;8(a.1V=='42'){H 0}8(d=='N'){d=o.1K.1M/o.1K.E*b}O 8(d<10){d=c/d}8(d<1){H 0}8(a.1V=='1w'){d=d/2}H 1H.78(d)}D 4T(o,t,c){F a=(Y(o.E.4C))?o.E.4C:o.E.M+1;8(t=='4m'||t=='4j'){F f=t}O 8(a>t){18(c,'2p 6O E ('+t+' Q, '+a+' 6P): 8V 8W.');F f='4j'}O{F f='4m'}F s=(f=='4m')?'2N':'3a',h=2y('3t',c);8(o.N.W){o.N.W[f]()[s](h)}8(o.14.W){o.14.W[f]()[s](h)}8(o.16.W){o.16.W[f]()[s](h)}8(o.1b.1A){o.1b.1A[f]()[s](h)}}D 3A(o,f,c){8(o.1U||o.3z)H;F a=(f=='2N'||f=='3a')?f:L,51=2y('8X',c);8(o.N.W&&a){o.N.W[a](51)}8(o.14.W){F b=a||(f==0)?'3a':'2N';o.14.W[b](51)}8(o.16.W){F b=a||(f==o.E.M)?'3a':'2N';o.16.W[b](51)}}D 3S(a,b){8(1o(b)){b=b.1h(a)}O 8(1z(b)){b={}}H b}D 6l(a,b){b=3S(a,b);8(Y(b)){b={'M':b}}O 8(b=='1d'){b={'M':b,'P':b,'1e':b}}O 8(!1T(b)){b={}}H b}D 6m(a,b){b=3S(a,b);8(Y(b)){8(b<=50){b={'E':b}}O{b={'1M':b}}}O 8(1p(b)){b={'2u':b}}O 8(!1T(b)){b={}}H b}D 52(a,b){b=3S(a,b);8(1p(b)){F c=65(b);8(c==-1){b=$(b)}O{b=c}}H b}D 6n(a,b){b=52(a,b);8(2v(b)){b={'W':b}}O 8(1k(b)){b={'1G':b}}O 8(Y(b)){b={'2K':b}}8(b.1f){8(1p(b.1f)||2v(b.1f)){b.1f={'2q':b.1f}}}H b}D 6z(a,b){8(1o(b.W)){b.W=b.W.1h(a)}8(1p(b.W)){b.W=$(b.W)}8(!1k(b.1G)){b.1G=J}8(!Y(b.5U)){b.5U=0}8(1z(b.4X)){b.4X=J}8(!1k(b.5V)){b.5V=J}8(!Y(b.2K)){b.2K=(b.1M<10)?8Y:b.1M*5}8(b.1f){8(1o(b.1f.2q)){b.1f.2q=b.1f.2q.1h(a)}8(1p(b.1f.2q)){b.1f.2q=$(b.1f.2q)}8(b.1f.2q){8(!1o(b.1f.4B)){b.1f.4B=$.1s.1v.7u}8(!Y(b.1f.5u)){b.1f.5u=50}}O{b.1f=L}}H b}D 5a(a,b){b=52(a,b);8(2v(b)){b={'W':b}}O 8(Y(b)){b={'2Y':b}}H b}D 5j(a,b){8(1o(b.W)){b.W=b.W.1h(a)}8(1p(b.W)){b.W=$(b.W)}8(1p(b.2Y)){b.2Y=65(b.2Y)}H b}D 6o(a,b){b=52(a,b);8(2v(b)){b={'1A':b}}O 8(1k(b)){b={'4Y':b}}H b}D 6A(a,b){8(1o(b.1A)){b.1A=b.1A.1h(a)}8(1p(b.1A)){b.1A=$(b.1A)}8(!Y(b.E)){b.E=L}8(!1k(b.4Y)){b.4Y=L}8(!1o(b.3K)&&!53(b.3K)){b.3K=$.1s.1v.7s}8(!Y(b.4S)){b.4S=0}H b}D 6p(a,b){8(1o(b)){b=b.1h(a)}8(1z(b)){b={'4h':L}}8(3p(b)){b={'4h':b}}O 8(Y(b)){b={'E':b}}H b}D 6B(a,b){8(!1k(b.4h)){b.4h=J}8(!1k(b.5R)){b.5R=L}8(!1T(b.2G)){b.2G={}}8(!1k(b.2G.7y)){b.2G.7y=L}H b}D 6q(a,b){8(1o(b)){b=b.1h(a)}8(3p(b)){b={}}O 8(Y(b)){b={'E':b}}O 8(1z(b)){b=L}H b}D 6C(a,b){H b}D 3J(a,b,c,d,e){8(1p(a)){a=$(a,e)}8(1T(a)){a=$(a,e)}8(2v(a)){a=e.13().7a(a);8(!1k(c)){c=L}}O{8(!1k(c)){c=J}}8(!Y(a)){a=0}8(!Y(b)){b=0}8(c){a+=d.X}a+=b;8(d.Q>0){2h(a>=d.Q){a-=d.Q}2h(a<0){a+=d.Q}}H a}D 4D(i,o,s){F t=0,x=0;1j(F a=s;a>=0;a--){F j=i.1N(a);t+=(j.2f(':M'))?j[o.d['2w']](J):0;8(t>o.3U){H x}8(a==0){a=i.S}x++}}D 7c(i,o,s){H 66(i,o.E.1t,o.E.U.4t,s)}D 6T(i,o,s,m){H 66(i,o.E.1t,m,s)}D 66(i,f,m,s){F t=0,x=0;1j(F a=s,l=i.S;a>=0;a--){x++;8(x==l){H x}F j=i.1N(a);8(j.2f(f)){t++;8(t==m){H x}}8(a==0){a=l}}}D 5x(a,o){H o.E.U.4t||a.13().19(0,o.E.M).1t(o.E.1t).S}D 32(i,o,s){F t=0,x=0;1j(F a=s,l=i.S-1;a<=l;a++){F j=i.1N(a);t+=(j.2f(':M'))?j[o.d['2w']](J):0;8(t>o.3U){H x}x++;8(x==l+1){H x}8(a==l){a=-1}}}D 5I(i,o,s,l){F v=32(i,o,s);8(!o.1U){8(s+v>l){v=l-s}}H v}D 3W(i,o,s){H 68(i,o.E.1t,o.E.U.4t,s,o.1U)}D 6Z(i,o,s,m){H 68(i,o.E.1t,m+1,s,o.1U)-1}D 68(i,f,m,s,c){F t=0,x=0;1j(F a=s,l=i.S-1;a<=l;a++){x++;8(x>=l){H x}F j=i.1N(a);8(j.2f(f)){t++;8(t==m){H x}}8(a==l){a=-1}}}D 3I(i,o){H i.19(0,o.E.M)}D 6V(i,o,n){H i.19(n,o.E.U.20+n)}D 6W(i,o){H i.19(0,o.E.M)}D 71(i,o){H i.19(0,o.E.U.20)}D 72(i,o,n){H i.19(n,o.E.M+n)}D 4x(i,o,d){8(o.1R){8(!1p(d)){d='2a'}i.1W(D(){F j=$(1l),m=4k(j.Z(o.d['1S']),10);8(!Y(m)){m=0}j.1q(d,m)})}}D 1Y(i,o,m){8(o.1R){F x=(1k(m))?m:L;8(!Y(m)){m=0}4x(i,o,'7z');i.1W(D(){F j=$(1l);j.Z(o.d['1S'],((x)?j.1q('7z'):m+j.1q('2a')))})}}D 41(i){i.1W(D(){F j=$(1l);j.1q('7A',j.7B('7C')||'')})}D 4U(i){i.1W(D(){F j=$(1l);j.7B('7C',j.1q('7A')||'')})}D 5r(o,b){F c=o.E.M,7D=o.E[o.d['P']],69=o[o.d['1e']],7E=3V(69);b.1W(D(){F a=$(1l),6a=7D-7F(a,o,'8Z');a[o.d['P']](6a);8(7E){a[o.d['1e']](4s(6a,69))}})}D 4Q(a,o){F b=a.36(),$i=a.13(),$v=3I($i,o),54=4I(4J($v,o,J),o,L);b.Z(54);8(o.1R){F p=o.1i,r=p[o.d[1]];8(o.1B&&r<0){r=0}F c=$v.2P();c.Z(o.d['1S'],c.1q('2a')+r);a.Z(o.d['3q'],p[o.d[0]]);a.Z(o.d['1m'],p[o.d[3]])}a.Z(o.d['P'],54[o.d['P']]+(2R($i,o,'P')*2));a.Z(o.d['1e'],6b($i,o,'1e'));H 54}D 4J(i,o,a){H[2R(i,o,'P',a),6b(i,o,'1e',a)]}D 6b(i,o,a,b){8(!1k(b)){b=L}8(Y(o[o.d[a]])&&b){H o[o.d[a]]}8(Y(o.E[o.d[a]])){H o.E[o.d[a]]}a=(a.6c().3R('P')>-1)?'2w':'3n';H 4n(i,o,a)}D 4n(i,o,b){F s=0;1j(F a=0,l=i.S;a<l;a++){F j=i.1N(a);F m=(j.2f(':M'))?j[o.d[b]](J):0;8(s<m){s=m}}H s}D 2R(i,o,b,c){8(!1k(c)){c=L}8(Y(o[o.d[b]])&&c){H o[o.d[b]]}8(Y(o.E[o.d[b]])){H o.E[o.d[b]]*i.S}F d=(b.6c().3R('P')>-1)?'2w':'3n',s=0;1j(F a=0,l=i.S;a<l;a++){F j=i.1N(a);s+=(j.2f(':M'))?j[o.d[d]](J):0}H s}D 5d(a,o,d){F b=a.2f(':M');8(b){a.4j()}F s=a.36()[o.d[d]]();8(b){a.4m()}H s}D 5e(o,a){H(Y(o[o.d['P']]))?o[o.d['P']]:a}D 6d(i,o,b){F s=L,v=L;1j(F a=0,l=i.S;a<l;a++){F j=i.1N(a);F c=(j.2f(':M'))?j[o.d[b]](J):0;8(s===L){s=c}O 8(s!=c){v=J}8(s==0){v=J}}H v}D 7F(i,o,d){H i[o.d['90'+d]](J)-i[o.d[d.6c()]]()}D 4s(s,o){8(3V(o)){o=4k(o.19(0,-1),10);8(!Y(o)){H s}s*=o/2I}H s}D I(n,c,a,b,d){8(!1k(a)){a=J}8(!1k(b)){b=J}8(!1k(d)){d=L}8(a){n=c.3y.45+n}8(b){n=n+'.'+c.3y.7r}8(b&&d){n+=c.3T}H n}D 2y(n,c){H(1p(c.63[n]))?c.63[n]:n}D 4I(a,o,p){8(!1k(p)){p=J}F b=(o.1R&&p)?o.1i:[0,0,0,0];F c={};c[o.d['P']]=a[0]+b[1]+b[3];c[o.d['1e']]=a[1]+b[0]+b[2];H c}D 3e(c,d){F e=[];1j(F a=0,7G=c.S;a<7G;a++){1j(F b=0,7H=d.S;b<7H;b++){8(d[b].3R(2X c[a])>-1&&1z(e[b])){e[b]=c[a];17}}}H e}D 6x(p){8(1z(p)){H[0,0,0,0]}8(Y(p)){H[p,p,p,p]}8(1p(p)){p=p.3Q('91').7I('').3Q('92').7I('').3Q(' ')}8(!2V(p)){H[0,0,0,0]}1j(F i=0;i<4;i++){p[i]=4k(p[i],10)}1F(p.S){R 0:H[0,0,0,0];R 1:H[p[0],p[0],p[0],p[0]];R 2:H[p[0],p[1],p[0],p[1]];R 3:H[p[0],p[1],p[2],p[1]];2J:H[p[0],p[1],p[2],p[3]]}}D 4H(a,o){F x=(Y(o[o.d['P']]))?1H.2z(o[o.d['P']]-2R(a,o,'P')):0;1F(o.1B){R'1m':H[0,x];R'35':H[x,0];R'5f':2J:H[1H.2z(x/2),1H.4l(x/2)]}}D 6r(o){F a=[['P','7J','2w','1e','7K','3n','1m','3q','1S',0,1,2,3],['1e','7K','3n','P','7J','2w','3q','1m','5p',3,2,1,0]];F b=a[0].S,7L=(o.2l=='35'||o.2l=='1m')?0:1;F c={};1j(F d=0;d<b;d++){c[a[0][d]]=a[7L][d]}H c}D 4E(x,o,a,b){F v=x;8(1o(a)){v=a.1h(b,v)}O 8(1p(a)){F p=a.3Q('+'),m=a.3Q('-');8(m.S>p.S){F c=J,6e=m[0],30=m[1]}O{F c=L,6e=p[0],30=p[1]}1F(6e){R'93':v=(x%2==1)?x-1:x;17;R'94':v=(x%2==0)?x-1:x;17;2J:v=x;17}30=4k(30,10);8(Y(30)){8(c){30=-30}v+=30}}8(!Y(v)||v<1){v=1}H v}D 2x(x,o,a,b){H 6f(4E(x,o,a,b),o.E.U)}D 6f(v,i){8(Y(i.34)&&v<i.34){v=i.34}8(Y(i.1X)&&v>i.1X){v=i.1X}8(v<1){v=1}H v}D 5k(s){8(!2V(s)){s=[[s]]}8(!2V(s[0])){s=[s]}1j(F j=0,l=s.S;j<l;j++){8(1p(s[j][0])){s[j][0]=$(s[j][0])}8(!1k(s[j][1])){s[j][1]=J}8(!1k(s[j][2])){s[j][2]=J}8(!Y(s[j][3])){s[j][3]=0}}H s}D 65(k){8(k=='35'){H 39}8(k=='1m'){H 37}8(k=='5c'){H 38}8(k=='7h'){H 40}H-1}D 5H(n,a,c){8(n){F v=a.1P(I('4p',c));$.1s.1v.25.64(n,v)}}D 7m(n){F c=$.1s.1v.25.3F(n);H(c=='')?0:c}D 6E(a,b){F c={};1j(F p=0,l=b.S;p<l;p++){c[b[p]]=a.Z(b[p])}H c}D 6s(a,b,c,d){8(!1T(a.U)){a.U={}}8(!1T(a.3M)){a.3M={}}8(a.3m==0&&Y(d)){a.3m=d}8(1T(a.M)){a.U.34=a.M.34;a.U.1X=a.M.1X;a.M=L}O 8(1p(a.M)){8(a.M=='1d'){a.U.1d=J}O{a.U.2c=a.M}a.M=L}O 8(1o(a.M)){a.U.2c=a.M;a.M=L}8(!1p(a.1t)){a.1t=(c.1t(':3t').S>0)?':M':'*'}8(!a[b.d['P']]){8(b.2H){18(J,'7M a '+b.d['P']+' 1j 75 E!');a[b.d['P']]=4n(c,b,'2w')}O{a[b.d['P']]=(6d(c,b,'2w'))?'1d':c[b.d['2w']](J)}}8(!a[b.d['1e']]){a[b.d['1e']]=(6d(c,b,'3n'))?'1d':c[b.d['3n']](J)}a.3M.P=a.P;a.3M.1e=a.1e;H a}D 6w(a,b){8(a.E[a.d['P']]=='1d'){a.E.U.1d=J}8(!a.E.U.1d){8(Y(a[a.d['P']])){a.E.M=1H.4l(a[a.d['P']]/a.E[a.d['P']])}O{a.E.M=1H.4l(b/a.E[a.d['P']]);a[a.d['P']]=a.E.M*a.E[a.d['P']];8(!a.E.U.2c){a.1B=L}}8(a.E.M=='95'||a.E.M<1){18(J,'2p a 5K 28 4f M E: 7M 46 \"1d\".');a.E.U.1d=J}}H a}D 6t(a,b,c){8(a=='N'){a=4n(c,b,'2w')}H a}D 6u(a,b,c){8(a=='N'){a=4n(c,b,'3n')}8(!a){a=b.E[b.d['1e']]}H a}D 5i(o,a){F p=4H(3I(a,o),o);o.1i[o.d[1]]=p[1];o.1i[o.d[3]]=p[0];H o}D 5g(o,a,b){F c=6f(1H.2z(o[o.d['P']]/o.E[o.d['P']]),o.E.U);8(c>a.S){c=a.S}F d=1H.4l(o[o.d['P']]/c);o.E.M=c;o.E[o.d['P']]=d;o[o.d['P']]=c*d;H o}D 3N(p){8(1p(p)){F i=(p.3R('96')>-1)?J:L,r=(p.3R('3g')>-1)?J:L}O{F i=r=L}H[i,r]}D 97(a){H(Y(a))?a:3O}D 6g(a){H(a===3O)}D 1z(a){H(6g(a)||2X a=='7N'||a===''||a==='7N')}D 2V(a){H(a 2W 98)}D 2v(a){H(a 2W 7O)}D 1T(a){H((a 2W 99||2X a=='2A')&&!6g(a)&&!2v(a)&&!2V(a))}D Y(a){H((a 2W 4e||2X a=='28')&&!9a(a))}D 1p(a){H((a 2W 9b||2X a=='2M')&&!1z(a)&&!3p(a)&&!53(a))}D 1o(a){H(a 2W 9c||2X a=='D')}D 1k(a){H(a 2W 9d||2X a=='3d'||3p(a)||53(a))}D 3p(a){H(a===J||a==='J')}D 53(a){H(a===L||a==='L')}D 3V(x){H(1p(x)&&x.19(-1)=='%')}D 2o(){H 7v 7w().2o()}D 3X(o,n){18(J,o+' 2f 9e, 9f 1j 9g 9h 9i 9j. 9k '+n+' 9l.')}D 18(d,m){8(!1z(3l.6h)&&!1z(3l.6h.7P)){8(1T(d)){F s=' ('+d.4o+')';d=d.18}O{F s=''}8(!d){H L}8(1p(m)){m='1v'+s+': '+m}O{m=['1v'+s+':',m]}3l.6h.7P(m)}H L}$.1L($.2u,{'9m':D(t){F a=t*t;H t*(-a*t+4*a-6*t+4)},'9n':D(t){H t*(4*t*t-9*t+6)},'9o':D(t){F a=t*t;H t*(33*a*a-9p*a*t+9q*a-67*t+15)}})})(7O);",
62,
585,
"|||||||opts|if|||||||||||||||||||||||||||||||function|items|var|conf|return|cf_e|true|itms|false|visible|auto|else|width|total|case|length|trigger|visibleConf|scrl|button|first|is_number|css||bind|tt0|children|prev||next|break|debug|slice|anims|pagination|push|variable|height|progress|stopPropagation|call|padding|for|is_boolean|this|left|wrp|is_function|is_string|data|swipe|fn|filter|tmrs|carouFredSel|fade|_onafter|_moveitems|is_undefined|container|align|_s_paddingold|_s_paddingcur|opacity|switch|play|Math|cover|_position|scroll|extend|duration|eq|_a_wrapper|triggerHandler|mousewheel|usePadding|marginRight|is_object|circular|fx|each|max|sz_resetMargin|i_cur_l|old|i_old_l|uncover|unbind||cookie|isScrolling|isPaused|number|a_cfs|_cfs_origCssMargin|clbk|adjust|isStopped|stopImmediatePropagation|is|queu|while|i_new|w_siz|nr|direction|avail_primary|synchronise|getTime|Not|bar|i_new_l|a_cur|remove|easing|is_jquery|outerWidth|cf_getItemsAdjust|cf_c|ceil|object|pR|_s_paddingnew|preventDefault|a_itm|pauseOnHover|options|responsive|100|default|timeoutDuration|startTime|string|removeClass|queue|last|i_skp|ms_getTotalSize|a_old|a_lef|a_dur|is_array|instanceof|typeof|key|transition|adj|opts_orig|gn_getVisibleItemsNext||min|right|parent||||addClass|pause|perc|boolean|cf_sortParams|scrolling|resume|onAfter|i_old|crossfade|slideTo|window|start|outerHeight|_cfs_triggerEvent|is_true|top|position|wrapper|hidden|sc_clearTimers|timePassed|Carousel|sc_startScroll|events|infinite|nv_enableNavi|i_siz|i_siz_vis|_a_paddingold|_a_paddingcur|get|onBefore|updatePageStatus|gi_getCurrentItems|gn_getItemIndex|anchorBuilder|event|sizesConf|bt_pauseOnHoverConfig|null|ns2|split|indexOf|go_getObject|serialNumber|maxDimension|is_percentage|gn_getVisibleItemsNextFilter|deprecated|orgCSS|zIndex||sz_storeOrigCss|none|sc_stopScroll|dur2|prefix|to|appendTo|sc_setScroll||sc_fireCallbacks|currentPage|end|before|Number|of|document|onTouch|onResize|hide|parseInt|floor|show|ms_getTrueLargestSize|selector|currentPosition|destroy|primarySizePercentage|ms_getPercentage|org|onTimeoutStart|onTimeoutPause|onTimeoutEnd|sz_storeMargin|stopped|pre|post|updater|minimum|gn_getVisibleItemsPrev|cf_getAdjust|onEnd|clone|cf_getAlignPadding|cf_mapWrapperSizes|ms_getSizes|a_wsz|a_new|not|a_cfs_vis|updateSizes|eval|sz_setSizes|pgs|deviation|nv_showNavi|sz_restoreOrigCss|mouseenter|mouseleave|pauseOnEvent|keys|throttle||di|go_getNaviObject|is_false|sz|element|starting_position|_cfs_isCarousel||_cfs_init|go_getPrevNextObject|defaults|up|ms_getParentSize|ms_getMaxDimension|center|in_getResponsiveValues|bottom|in_getAlignPadding|go_complementPrevNextObject|cf_getSynchArr|onPauseStart|onPausePause|onPauseEnd|pauseDuration|marginBottom|newPosition|sz_setResponsiveSizes|_cfs_unbind_events|finish|interval|type|conditions|gn_getVisibleOrg|backward|sc_hideHiddenItems|a_lef_vis|sc_getDuration|_a_paddingnew|sc_showHiddenItems|sc_mapCallbackArguments|sc_afterScroll|sc_fireQueue|cf_setCookie|gn_getVisibleItemsNextTestCircular|slideToPage|valid|linkAnchors|value|_cfs_bind_buttons|click|_cfs_unbind_buttons|scrolled|onMouse|swP|swN|delay|pauseOnResize|debounce|onWindowResize|_windowHeight|nh||ns3|continue|classnames|set|cf_getKeyCode|gn_getItemsPrevFilter||gn_getItemsNextFilter|seco|nw|ms_getLargestSize|toLowerCase|ms_hasVariableSizes|sta|cf_getItemAdjustMinMax|is_null|console|caroufredsel|No|found|go_getItemsObject|go_getScrollObject|go_getAutoObject|go_getPaginationObject|go_getSwipeObject|go_getMousewheelObject|cf_getDimensions|in_complementItems|in_complementPrimarySize|in_complementSecondarySize|upDateOnWindowResize|in_complementVisibleItems|cf_getPadding|500|go_complementAutoObject|go_complementPaginationObject|go_complementSwipeObject|go_complementMousewheelObject|_cfs_build|in_mapCss|textAlign|float|marginTop|marginLeft|absolute|_cfs_origCssZindex|_cfs_bind_events|stop|paused|enough|needed|page|slide_|configuration|gn_getScrollItemsPrevFilter|Scrolling|gi_getOldItemsPrev|gi_getNewItemsPrev|directscroll|concat|gn_getScrollItemsNextFilter|forward|gi_getOldItemsNext|gi_getNewItemsNext|jumpToStart|after|the|append|removeItem|round|hash|index|selected|gn_getVisibleItemsPrevFilter|Item|keyup|keyCode|scN|down|cursor|mcN|configs|classname|cf_getCookie|random|itm|onCreate|swing|namespace|pageAnchorBuilder|span|progressbarUpdater|new|Date|_cfs_isHidden|triggerOnTouchEnd|_cfs_tempCssMargin|_cfs_origCss|attr|style|newS|secp|ms_getPaddingBorderMargin|l1|l2|join|innerWidth|innerHeight|dx|Set|undefined|jQuery|log|caroufredsel_cookie_|relative|fixed|overflow|setInterval|setTimeout|or|Callback|returned|Page|resumed|currently|slide_prev|prependTo|slide_next|prevPage|nextPage|prepend|carousel|insertItem|Correct|insert|Appending|item|add|detach|currentVisible|body|find|Preventing|non|sliding|replaceWith|widths|heights|automatically|ontouchstart|in|swipeUp|swipeDown|swipeLeft|swipeRight|move|200|300|resize|wrap|class|animate|unshift|location|cfs|div|caroufredsel_wrapper|href|charAt|setTime|1000|expires|toGMTString|path|ease|orgDuration|shift|clearTimeout|clearInterval|skipped|Hiding|navigation|disabled|2500|Width|outer|px|em|even|odd|Infinity|immediate|bt_mousesheelNumber|Array|Object|isNaN|String|Function|Boolean|DEPRECATED|support|it|will|be|removed|Use|instead|quadratic|cubic|elastic|106|126".split("|"),
0,
{})),
function(t) {
    var e, n, o, i, a, s, r, l="Close", c="BeforeClose", d="AfterClose", u="BeforeAppend", p="MarkupParse", f="Open", h="Change", m="mfp", g="."+m, v="mfp-ready", b="mfp-removing", y="mfp-prevent-close", w=function() {}, C=!!window.jQuery, E=t(window), x=function(t, n) {
        e.ev.on(m+t+g, n)
    }
    ,
    I=function(e,
    n,
    o,
    i) {
        var a=document.createElement("div");
        return a.className="mfp-"+e, o&&(a.innerHTML=o), i?n&&n.appendChild(a): (a=t(a), n&&a.appendTo(n)), a
    }
    ,
    S=function(n,
    o) {
        e.ev.triggerHandler(m+n, o), e.st.callbacks&&(n=n.charAt(0).toLowerCase()+n.slice(1), e.st.callbacks[n]&&e.st.callbacks[n].apply(e, t.isArray(o)?o: [o]))
    }
    ,
    D=function() {
        (e.st.focus?e.content.find(e.st.focus).eq(0): e.wrap).focus()
    }
    ,
    T=function(n) {
        return n===r&&e.currTemplate.closeBtn||(e.currTemplate.closeBtn=t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r=n), e.currTemplate.closeBtn
    }
    ,
    L=function() {
        t.magnificPopup.instance||(e=new w, e.init(), t.magnificPopup.instance=e)
    }
    ,
    P=function() {
        var t=document.createElement("p").style, e=["ms", "O", "Moz", "Webkit"];
        if(void 0!==t.transition)return!0;
        for(;
        e.length;
        )if(e.pop()+"Transition"in t)return!0;
        return!1
    }
    ;
    w.prototype= {
        constructor: w, init: function() {
            var n=navigator.appVersion;
            e.isIE7=-1!==n.indexOf("MSIE 7."), e.isIE8=-1!==n.indexOf("MSIE 8."), e.isLowIE=e.isIE7||e.isIE8, e.isAndroid=/android/gi.test(n), e.isIOS=/iphone|ipad|ipod/gi.test(n), e.supportsTransition=P(), e.probablyMobile=e.isAndroid||e.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o=t(document.body), i=t(document), e.popupsCache= {}
        }
        ,
        open:function(n) {
            var o;
            if(n.isObj===!1) {
                e.items=n.items.toArray(), e.index=0;
                var a, r=n.items;
                for(o=0;
                r.length>o;
                o++)if(a=r[o], a.parsed&&(a=a.el[0]), a===n.el[0]) {
                    e.index=o;
                    break
                }
            }
            else e.items=t.isArray(n.items)?n.items:[n.items],
            e.index=n.index||0;
            if(e.isOpen)return void e.updateItemHTML();
            e.types=[],
            s="",
            e.ev=n.mainEl&&n.mainEl.length?n.mainEl.eq(0):i,
            n.key?(e.popupsCache[n.key]||(e.popupsCache[n.key]= {}),
            e.currTemplate=e.popupsCache[n.key]):e.currTemplate= {},
            e.st=t.extend(!0,
            {},
            t.magnificPopup.defaults,
            n),
            e.fixedContentPos="auto"===e.st.fixedContentPos?!e.probablyMobile:e.st.fixedContentPos,
            e.st.modal&&(e.st.closeOnContentClick=!1,
            e.st.closeOnBgClick=!1,
            e.st.showCloseBtn=!1,
            e.st.enableEscapeKey=!1),
            e.bgOverlay||(e.bgOverlay=I("bg").on("click"+g,
            function() {
                e.close()
            }
            ),
            e.wrap=I("wrap").attr("tabindex",
            -1).on("click"+g,
            function(t) {
                e._checkIfClose(t.target)&&e.close()
            }
            ),
            e.container=I("container",
            e.wrap)),
            e.contentContainer=I("content"),
            e.st.preloader&&(e.preloader=I("preloader",
            e.container,
            e.st.tLoading));
            var l=t.magnificPopup.modules;
            for(o=0;
            l.length>o;
            o++) {
                var c=l[o];
                c=c.charAt(0).toUpperCase()+c.slice(1), e["init"+c].call(e)
            }
            S("BeforeOpen"),
            e.st.showCloseBtn&&(e.st.closeBtnInside?(x(p,
            function(t,
            e,
            n,
            o) {
                n.close_replaceWith=T(o.type)
            }
            ),
            s+=" mfp-close-btn-in"):e.wrap.append(T())),
            e.st.alignTop&&(s+=" mfp-align-top"),
            e.wrap.css(e.fixedContentPos? {
                overflow: e.st.overflowY, overflowX: "hidden", overflowY: e.st.overflowY
            }
            : {
                top: E.scrollTop(), position: "absolute"
            }
            ),
            (e.st.fixedBgPos===!1||"auto"===e.st.fixedBgPos&&!e.fixedContentPos)&&e.bgOverlay.css( {
                height: i.height(), position: "absolute"
            }
            ),
            e.st.enableEscapeKey&&i.on("keyup"+g,
            function(t) {
                27===t.keyCode&&e.close()
            }
            ),
            E.on("resize"+g,
            function() {
                e.updateSize()
            }
            ),
            e.st.closeOnContentClick||(s+=" mfp-auto-cursor"),
            s&&e.wrap.addClass(s);
            var d=e.wH=E.height(),
            u= {};
            if(e.fixedContentPos&&e._hasScrollBar(d)) {
                var h=e._getScrollbarSize();
                h&&(u.marginRight=h)
            }
            e.fixedContentPos&&(e.isIE7?t("body, html").css("overflow",
            "hidden"):u.overflow="hidden");
            var m=e.st.mainClass;
            return e.isIE7&&(m+=" mfp-ie7"),
            m&&e._addClassToMFP(m),
            e.updateItemHTML(),
            S("BuildControls"),
            t("html").css(u),
            e.bgOverlay.add(e.wrap).prependTo(document.body),
            e._lastFocusedEl=document.activeElement,
            setTimeout(function() {
                e.content?(e._addClassToMFP(v), D()): e.bgOverlay.addClass(v), i.on("focusin"+g, function(n) {
                    return n.target===e.wrap[0]||t.contains(e.wrap[0], n.target)?void 0: (D(), !1)
                }
                )
            }
            ,
            16),
            e.isOpen=!0,
            e.updateSize(d),
            S(f),
            n
        }
        ,
        close:function() {
            e.isOpen&&(S(c), e.isOpen=!1, e.st.removalDelay&&!e.isLowIE&&e.supportsTransition?(e._addClassToMFP(b), setTimeout(function() {
                e._close()
            }
            ,
            e.st.removalDelay)):e._close())
        }
        ,
        _close:function() {
            S(l);
            var n=b+" "+v+" ";
            if(e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass&&(n+=e.st.mainClass+" "), e._removeClassFromMFP(n), e.fixedContentPos) {
                var o= {
                    marginRight: ""
                }
                ;
                e.isIE7?t("body, html").css("overflow",
                ""):o.overflow="",
                t("html").css(o)
            }
            i.off("keyup"+g+" focusin"+g),
            e.ev.off(g),
            e.wrap.attr("class",
            "mfp-wrap").removeAttr("style"),
            e.bgOverlay.attr("class",
            "mfp-bg"),
            e.container.attr("class",
            "mfp-container"),
            !e.st.showCloseBtn||e.st.closeBtnInside&&e.currTemplate[e.currItem.type]!==!0||e.currTemplate.closeBtn&&e.currTemplate.closeBtn.detach(),
            e._lastFocusedEl&&t(e._lastFocusedEl).focus(),
            e.currItem=null,
            e.content=null,
            e.currTemplate=null,
            e.prevHeight=0,
            S(d)
        }
        ,
        updateSize:function(t) {
            if(e.isIOS) {
                var n=document.documentElement.clientWidth/window.innerWidth, o=window.innerHeight*n;
                e.wrap.css("height", o), e.wH=o
            }
            else e.wH=t||E.height();
            e.fixedContentPos||e.wrap.css("height",
            e.wH),
            S("Resize")
        }
        ,
        updateItemHTML:function() {
            var n=e.items[e.index];
            e.contentContainer.detach(), e.content&&e.content.detach(), n.parsed||(n=e.parseEl(e.index));
            var o=n.type;
            if(S("BeforeChange", [e.currItem?e.currItem.type: "", o]), e.currItem=n, !e.currTemplate[o]) {
                var i=e.st[o]?e.st[o].markup: !1;
                S("FirstMarkupParse", i), e.currTemplate[o]=i?t(i): !0
            }
            a&&a!==n.type&&e.container.removeClass("mfp-"+a+"-holder");
            var s=e["get"+o.charAt(0).toUpperCase()+o.slice(1)](n,
            e.currTemplate[o]);
            e.appendContent(s,
            o),
            n.preloaded=!0,
            S(h,
            n),
            a=n.type,
            e.container.prepend(e.contentContainer),
            S("AfterChange")
        }
        ,
        appendContent:function(t,
        n) {
            e.content=t, t?e.st.showCloseBtn&&e.st.closeBtnInside&&e.currTemplate[n]===!0?e.content.find(".mfp-close").length||e.content.append(T()): e.content=t: e.content="", S(u), e.container.addClass("mfp-"+n+"-holder"), e.contentContainer.append(e.content)
        }
        ,
        parseEl:function(n) {
            var o=e.items[n], i=o.type;
            if(o=o.tagName? {
                el: t(o)
            }
            : {
                data: o, src: o.src
            }
            ,
            o.el) {
                for(var a=e.types, s=0;
                a.length>s;
                s++)if(o.el.hasClass("mfp-"+a[s])) {
                    i=a[s];
                    break
                }
                o.src=o.el.attr("data-mfp-src"),
                o.src||(o.src=o.el.attr("href"))
            }
            return o.type=i||e.st.type||"inline",
            o.index=n,
            o.parsed=!0,
            e.items[n]=o,
            S("ElementParse",
            o),
            e.items[n]
        }
        ,
        addGroup:function(t,
        n) {
            var o=function(o) {
                o.mfpEl=this, e._openClick(o, t, n)
            }
            ;
            n||(n= {});
            var i="click.magnificPopup";
            n.mainEl=t,
            n.items?(n.isObj=!0,
            t.off(i).on(i,
            o)):(n.isObj=!1,
            n.delegate?t.off(i).on(i,
            n.delegate,
            o):(n.items=t,
            t.off(i).on(i,
            o)))
        }
        ,
        _openClick:function(n,
        o,
        i) {
            var a=void 0!==i.midClick?i.midClick: t.magnificPopup.defaults.midClick;
            if(a||2!==n.which&&!n.ctrlKey&&!n.metaKey) {
                var s=void 0!==i.disableOn?i.disableOn: t.magnificPopup.defaults.disableOn;
                if(s)if(t.isFunction(s)) {
                    if(!s.call(e))return!0
                }
                else if(s>E.width())return!0;
                n.type&&(n.preventDefault(),
                e.isOpen&&n.stopPropagation()),
                i.el=t(n.mfpEl),
                i.delegate&&(i.items=o.find(i.delegate)),
                e.open(i)
            }
        }
        ,
        updateStatus:function(t,
        o) {
            if(e.preloader) {
                n!==t&&e.container.removeClass("mfp-s-"+n), o||"loading"!==t||(o=e.st.tLoading);
                var i= {
                    status: t, text: o
                }
                ;
                S("UpdateStatus",
                i),
                t=i.status,
                o=i.text,
                e.preloader.html(o),
                e.preloader.find("a").on("click",
                function(t) {
                    t.stopImmediatePropagation()
                }
                ),
                e.container.addClass("mfp-s-"+t),
                n=t
            }
        }
        ,
        _checkIfClose:function(n) {
            if(!t(n).hasClass(y)) {
                var o=e.st.closeOnContentClick, i=e.st.closeOnBgClick;
                if(o&&i)return!0;
                if(!e.content||t(n).hasClass("mfp-close")||e.preloader&&n===e.preloader[0])return!0;
                if(n===e.content[0]||t.contains(e.content[0], n)) {
                    if(o)return!0
                }
                else if(i&&t.contains(document,
                n))return!0;
                return!1
            }
        }
        ,
        _addClassToMFP:function(t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        }
        ,
        _removeClassFromMFP:function(t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        }
        ,
        _hasScrollBar:function(t) {
            return(e.isIE7?i.height(): document.body.scrollHeight)>(t||E.height())
        }
        ,
        _parseMarkup:function(e,
        n,
        o) {
            var i;
            o.data&&(n=t.extend(o.data, n)), S(p, [e, n, o]), t.each(n, function(t, n) {
                if(void 0===n||n===!1)return!0;
                if(i=t.split("_"), i.length>1) {
                    var o=e.find(g+"-"+i[0]);
                    if(o.length>0) {
                        var a=i[1];
                        "replaceWith"===a?o[0]!==n[0]&&o.replaceWith(n): "img"===a?o.is("img")?o.attr("src", n): o.replaceWith('<img src="'+n+'" class="'+o.attr("class")+'" />'): o.attr(i[1], n)
                    }
                }
                else e.find(g+"-"+t).html(n)
            }
            )
        }
        ,
        _getScrollbarSize:function() {
            if(void 0===e.scrollbarSize) {
                var t=document.createElement("div");
                t.id="mfp-sbm", t.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize=t.offsetWidth-t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }
    ,
    t.magnificPopup= {
        instance: null, proto: w.prototype, modules: [], open: function(e, n) {
            return L(), e=e?t.extend(!0, {}, e): {}, e.isObj=!0, e.index=n||0, this.instance.open(e)
        }
        ,
        close:function() {
            return t.magnificPopup.instance&&t.magnificPopup.instance.close()
        }
        ,
        registerModule:function(e,
        n) {
            n.options&&(t.magnificPopup.defaults[e]=n.options), t.extend(this.proto, n.proto), this.modules.push(e)
        }
        ,
        defaults: {
            disableOn: 0, key: null, midClick: !1, mainClass: "", preloader: !0, focus: "", closeOnContentClick: !1, closeOnBgClick: !0, closeBtnInside: !0, showCloseBtn: !0, enableEscapeKey: !0, modal: !1, alignTop: !1, removalDelay: 0, fixedContentPos: "auto", fixedBgPos: "auto", overflowY: "auto", closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>', tClose: "Close (Esc)", tLoading: "Loading..."
        }
    }
    ,
    t.fn.magnificPopup=function(n) {
        L();
        var o=t(this);
        if("string"==typeof n)if("open"===n) {
            var i, a=C?o.data("magnificPopup"): o[0].magnificPopup, s=parseInt(arguments[1], 10)||0;
            a.items?i=a.items[s]: (i=o, a.delegate&&(i=i.find(a.delegate)), i=i.eq(s)), e._openClick( {
                mfpEl: i
            }
            ,
            o,
            a)
        }
        else e.isOpen&&e[n].apply(e,
        Array.prototype.slice.call(arguments,
        1));
        else n=t.extend(!0,
        {},
        n),
        C?o.data("magnificPopup",
        n):o[0].magnificPopup=n,
        e.addGroup(o,
        n);
        return o
    }
    ;
    var k,
    M,
    F,
    O="inline",
    H=function() {
        F&&(M.after(F.addClass(k)).detach(), F=null)
    }
    ;
    t.magnificPopup.registerModule(O,
    {
        options: {
            hiddenClass: "hide", markup: "", tNotFound: "Content not found"
        }
        ,
        proto: {
            initInline: function() {
                e.types.push(O), x(l+"."+O, function() {
                    H()
                }
                )
            }
            ,
            getInline:function(n,
            o) {
                if(H(), n.src) {
                    var i=e.st.inline, a=t(n.src);
                    if(a.length) {
                        var s=a[0].parentNode;
                        s&&s.tagName&&(M||(k=i.hiddenClass, M=I(k), k="mfp-"+k), F=a.after(M).detach().removeClass(k)), e.updateStatus("ready")
                    }
                    else e.updateStatus("error",
                    i.tNotFound),
                    a=t("<div>");
                    return n.inlineElement=a,
                    a
                }
                return e.updateStatus("ready"),
                e._parseMarkup(o,
                {},
                n),
                o
            }
        }
    }
    );
    var _,
    j="ajax",
    N=function() {
        _&&o.removeClass(_)
    }
    ,
    G=function() {
        N(), e.req&&e.req.abort()
    }
    ;
    t.magnificPopup.registerModule(j,
    {
        options: {
            settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.'
        }
        ,
        proto: {
            initAjax: function() {
                e.types.push(j), _=e.st.ajax.cursor, x(l+"."+j, G), x("BeforeChange."+j, G)
            }
            ,
            getAjax:function(n) {
                _&&o.addClass(_), e.updateStatus("loading");
                var i=t.extend( {
                    url: n.src, success: function(o, i, a) {
                        var s= {
                            data: o, xhr: a
                        }
                        ;
                        S("ParseAjax",
                        s),
                        e.appendContent(t(s.data),
                        j),
                        n.finished=!0,
                        N(),
                        D(),
                        setTimeout(function() {
                            e.wrap.addClass(v)
                        }
                        ,
                        16),
                        e.updateStatus("ready"),
                        S("AjaxContentAdded")
                    }
                    ,
                    error:function() {
                        N(), n.finished=n.loadError=!0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", n.src))
                    }
                }
                ,
                e.st.ajax.settings);
                return e.req=t.ajax(i),
                ""
            }
        }
    }
    );
    var A,
    K=function(n) {
        if(n.data&&void 0!==n.data.title)return n.data.title;
        var o=e.st.image.titleSrc;
        if(o) {
            if(t.isFunction(o))return o.call(e, n);
            if(n.el)return n.el.attr(o)||""
        }
        return""
    }
    ;
    t.magnificPopup.registerModule("image",
    {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>', cursor: "mfp-zoom-out-cur", titleSrc: "title", verticalFit: !0, tError: '<a href="%url%">The image</a> could not be loaded.'
        }
        ,
        proto: {
            initImage: function() {
                var t=e.st.image, n=".image";
                e.types.push("image"), x(f+n, function() {
                    "image"===e.currItem.type&&t.cursor&&o.addClass(t.cursor)
                }
                ),
                x(l+n,
                function() {
                    t.cursor&&o.removeClass(t.cursor), E.off("resize"+g)
                }
                ),
                x("Resize"+n,
                e.resizeImage),
                e.isLowIE&&x("AfterChange",
                e.resizeImage)
            }
            ,
            resizeImage:function() {
                var t=e.currItem;
                if(t&&t.img&&e.st.image.verticalFit) {
                    var n=0;
                    e.isLowIE&&(n=parseInt(t.img.css("padding-top"), 10)+parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH-n)
                }
            }
            ,
            _onImageHasSize:function(t) {
                t.img&&(t.hasSize=!0, A&&clearInterval(A), t.isCheckingImgSize=!1, S("ImageHasSize", t), t.imgHidden&&(e.content&&e.content.removeClass("mfp-loading"), t.imgHidden=!1))
            }
            ,
            findImageSize:function(t) {
                var n=0, o=t.img[0], i=function(a) {
                    A&&clearInterval(A), A=setInterval(function() {
                        return o.naturalWidth>0?void e._onImageHasSize(t): (n>200&&clearInterval(A), n++, void(3===n?i(10): 40===n?i(50): 100===n&&i(500)))
                    }
                    ,
                    a)
                }
                ;
                i(1)
            }
            ,
            getImage:function(n,
            o) {
                var i=0, a=function() {
                    n&&(n.img[0].complete?(n.img.off(".mfploader"), n===e.currItem&&(e._onImageHasSize(n), e.updateStatus("ready")), n.hasSize=!0, n.loaded=!0, S("ImageLoadComplete")): (i++, 200>i?setTimeout(a, 100): s()))
                }
                ,
                s=function() {
                    n&&(n.img.off(".mfploader"), n===e.currItem&&(e._onImageHasSize(n), e.updateStatus("error", r.tError.replace("%url%", n.src))), n.hasSize=!0, n.loaded=!0, n.loadError=!0)
                }
                ,
                r=e.st.image,
                l=o.find(".mfp-img");
                if(l.length) {
                    var c=document.createElement("img");
                    c.className="mfp-img", n.img=t(c).on("load.mfploader", a).on("error.mfploader", s), c.src=n.src, l.is("img")&&(n.img=n.img.clone()), n.img[0].naturalWidth>0&&(n.hasSize=!0)
                }
                return e._parseMarkup(o,
                {
                    title: K(n), img_replaceWith: n.img
                }
                ,
                n),
                e.resizeImage(),
                n.hasSize?(A&&clearInterval(A),
                n.loadError?(o.addClass("mfp-loading"),
                e.updateStatus("error",
                r.tError.replace("%url%",
                n.src))):(o.removeClass("mfp-loading"),
                e.updateStatus("ready")),
                o):(e.updateStatus("loading"),
                n.loading=!0,
                n.hasSize||(n.imgHidden=!0,
                o.addClass("mfp-loading"),
                e.findImageSize(n)),
                o)
            }
        }
    }
    );
    var W,
    z=function() {
        return void 0===W&&(W=void 0!==document.createElement("p").style.MozTransform), W
    }
    ;
    t.magnificPopup.registerModule("zoom",
    {
        options: {
            enabled: !1, easing: "ease-in-out", duration: 300, opener: function(t) {
                return t.is("img")?t: t.find("img")
            }
        }
        ,
        proto: {
            initZoom: function() {
                var t, n=e.st.zoom, o=".zoom";
                if(n.enabled&&e.supportsTransition) {
                    var i, a, s=n.duration, r=function(t) {
                        var e=t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"), o="all "+n.duration/1e3+"s "+n.easing, i= {
                            position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden"
                        }
                        ,
                        a="transition";
                        return i["-webkit-"+a]=i["-moz-"+a]=i["-o-"+a]=i[a]=o,
                        e.css(i),
                        e
                    }
                    ,
                    d=function() {
                        e.content.css("visibility", "visible")
                    }
                    ;
                    x("BuildControls"+o,
                    function() {
                        if(e._allowZoom()) {
                            if(clearTimeout(i), e.content.css("visibility", "hidden"), t=e._getItemToZoom(), !t)return void d();
                            a=r(t), a.css(e._getOffset()), e.wrap.append(a), i=setTimeout(function() {
                                a.css(e._getOffset(!0)), i=setTimeout(function() {
                                    d(), setTimeout(function() {
                                        a.remove(), t=a=null, S("ZoomAnimationEnded")
                                    }
                                    ,
                                    16)
                                }
                                ,
                                s)
                            }
                            ,
                            16)
                        }
                    }
                    ),
                    x(c+o,
                    function() {
                        if(e._allowZoom()) {
                            if(clearTimeout(i), e.st.removalDelay=s, !t) {
                                if(t=e._getItemToZoom(), !t)return;
                                a=r(t)
                            }
                            a.css(e._getOffset(!0)),
                            e.wrap.append(a),
                            e.content.css("visibility",
                            "hidden"),
                            setTimeout(function() {
                                a.css(e._getOffset())
                            }
                            ,
                            16)
                        }
                    }
                    ),
                    x(l+o,
                    function() {
                        e._allowZoom()&&(d(), a&&a.remove(), t=null)
                    }
                    )
                }
            }
            ,
            _allowZoom:function() {
                return"image"===e.currItem.type
            }
            ,
            _getItemToZoom:function() {
                return e.currItem.hasSize?e.currItem.img: !1
            }
            ,
            _getOffset:function(n) {
                var o;
                o=n?e.currItem.img: e.st.zoom.opener(e.currItem.el||e.currItem);
                var i=o.offset(), a=parseInt(o.css("padding-top"), 10), s=parseInt(o.css("padding-bottom"), 10);
                i.top-=t(window).scrollTop()-a;
                var r= {
                    width: o.width(), height: (C?o.innerHeight(): o[0].offsetHeight)-s-a
                }
                ;
                return z()?r["-moz-transform"]=r.transform="translate("+i.left+"px,"+i.top+"px)":(r.left=i.left,
                r.top=i.top),
                r
            }
        }
    }
    );
    var J="iframe",
    B="//about:blank",
    R=function(t) {
        if(e.currTemplate[J]) {
            var n=e.currTemplate[J].find("iframe");
            n.length&&(t||(n[0].src=B), e.isIE8&&n.css("display", t?"block": "none"))
        }
    }
    ;
    t.magnificPopup.registerModule(J,
    {
        options: {
            markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>', srcAction:"iframe_src", patterns: {
                youtube: {
                    index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"
                }
                ,
                vimeo: {
                    index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"
                }
                ,
                gmaps: {
                    index: "//maps.google.", src: "%id%&output=embed"
                }
            }
        }
        ,
        proto: {
            initIframe: function() {
                e.types.push(J), x("BeforeChange", function(t, e, n) {
                    e!==n&&(e===J?R(): n===J&&R(!0))
                }
                ),
                x(l+"."+J,
                function() {
                    R()
                }
                )
            }
            ,
            getIframe:function(n,
            o) {
                var i=n.src, a=e.st.iframe;
                t.each(a.patterns, function() {
                    return i.indexOf(this.index)>-1?(this.id&&(i="string"==typeof this.id?i.substr(i.lastIndexOf(this.id)+this.id.length, i.length): this.id.call(this, i)), i=this.src.replace("%id%", i), !1): void 0
                }
                );
                var s= {};
                return a.srcAction&&(s[a.srcAction]=i),
                e._parseMarkup(o,
                s,
                n),
                e.updateStatus("ready"),
                o
            }
        }
    }
    );
    var Q=function(t) {
        var n=e.items.length;
        return t>n-1?t-n: 0>t?n+t: t
    }
    ,
    U=function(t,
    e,
    n) {
        return t.replace(/%curr%/gi, e+1).replace(/%total%/gi, n)
    }
    ;
    t.magnificPopup.registerModule("gallery",
    {
        options: {
            enabled: !1, arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', preload: [0, 2], navigateByImgClick: !0, arrows: !0, tPrev: "Previous (Left arrow key)", tNext: "Next (Right arrow key)", tCounter: "%curr% of %total%"
        }
        ,
        proto: {
            initGallery: function() {
                var n=e.st.gallery, o=".mfp-gallery", a=Boolean(t.fn.mfpFastClick);
                return e.direction=!0, n&&n.enabled?(s+=" mfp-gallery", x(f+o, function() {
                    n.navigateByImgClick&&e.wrap.on("click"+o, ".mfp-img", function() {
                        return e.items.length>1?(e.next(), !1): void 0
                    }
                    ),
                    i.on("keydown"+o,
                    function(t) {
                        37===t.keyCode?e.prev(): 39===t.keyCode&&e.next()
                    }
                    )
                }
                ),
                x("UpdateStatus"+o,
                function(t,
                n) {
                    n.text&&(n.text=U(n.text, e.currItem.index, e.items.length))
                }
                ),
                x(p+o,
                function(t,
                o,
                i,
                a) {
                    var s=e.items.length;
                    i.counter=s>1?U(n.tCounter, a.index, s): ""
                }
                ),
                x("BuildControls"+o,
                function() {
                    if(e.items.length>1&&n.arrows&&!e.arrowLeft) {
                        var o=n.arrowMarkup, i=e.arrowLeft=t(o.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y), s=e.arrowRight=t(o.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y), r=a?"mfpFastClick": "click";
                        i[r](function() {
                            e.prev()
                        }
                        ),
                        s[r](function() {
                            e.next()
                        }
                        ),
                        e.isIE7&&(I("b",
                        i[0],
                        !1,
                        !0),
                        I("a",
                        i[0],
                        !1,
                        !0),
                        I("b",
                        s[0],
                        !1,
                        !0),
                        I("a",
                        s[0],
                        !1,
                        !0)),
                        e.container.append(i.add(s))
                    }
                }
                ),
                x(h+o,
                function() {
                    e._preloadTimeout&&clearTimeout(e._preloadTimeout), e._preloadTimeout=setTimeout(function() {
                        e.preloadNearbyImages(), e._preloadTimeout=null
                    }
                    ,
                    16)
                }
                ),
                void x(l+o,
                function() {
                    i.off(o), e.wrap.off("click"+o), e.arrowLeft&&a&&e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(), e.arrowRight=e.arrowLeft=null
                }
                )):!1
            }
            ,
            next:function() {
                e.direction=!0, e.index=Q(e.index+1), e.updateItemHTML()
            }
            ,
            prev:function() {
                e.direction=!1, e.index=Q(e.index-1), e.updateItemHTML()
            }
            ,
            goTo:function(t) {
                e.direction=t>=e.index, e.index=t, e.updateItemHTML()
            }
            ,
            preloadNearbyImages:function() {
                var t, n=e.st.gallery.preload, o=Math.min(n[0], e.items.length), i=Math.min(n[1], e.items.length);
                for(t=1;
                (e.direction?i: o)>=t;
                t++)e._preloadItem(e.index+t);
                for(t=1;
                (e.direction?o: i)>=t;
                t++)e._preloadItem(e.index-t)
            }
            ,
            _preloadItem:function(n) {
                if(n=Q(n), !e.items[n].preloaded) {
                    var o=e.items[n];
                    o.parsed||(o=e.parseEl(n)), S("LazyLoad", o), "image"===o.type&&(o.img=t('<img class="mfp-img" />').on("load.mfploader", function() {
                        o.hasSize=!0
                    }
                    ).on("error.mfploader",
                    function() {
                        o.hasSize=!0, o.loadError=!0, S("LazyLoadError", o)
                    }
                    ).attr("src",
                    o.src)),
                    o.preloaded=!0
                }
            }
        }
    }
    );
    var q="retina";
    t.magnificPopup.registerModule(q,
    {
        options: {
            replaceSrc: function(t) {
                return t.src.replace(/\.\w+$/, function(t) {
                    return"@2x"+t
                }
                )
            }
            ,
            ratio:1
        }
        ,
        proto: {
            initRetina: function() {
                if(window.devicePixelRatio>1) {
                    var t=e.st.retina, n=t.ratio;
                    n=isNaN(n)?n(): n, n>1&&(x("ImageHasSize."+q, function(t, e) {
                        e.img.css( {
                            "max-width": e.img[0].naturalWidth/n, width: "100%"
                        }
                        )
                    }
                    ),
                    x("ElementParse."+q,
                    function(e,
                    o) {
                        o.src=t.replaceSrc(o, n)
                    }
                    ))
                }
            }
        }
    }
    ),
    function() {
        var e=1e3, n="ontouchstart"in window, o=function() {
            E.off("touchmove"+a+" touchend"+a)
        }
        ,
        i="mfpFastClick",
        a="."+i;
        t.fn.mfpFastClick=function(i) {
            return t(this).each(function() {
                var s, r=t(this);
                if(n) {
                    var l, c, d, u, p, f;
                    r.on("touchstart"+a, function(t) {
                        u=!1, f=1, p=t.originalEvent?t.originalEvent.touches[0]: t.touches[0], c=p.clientX, d=p.clientY, E.on("touchmove"+a, function(t) {
                            p=t.originalEvent?t.originalEvent.touches: t.touches, f=p.length, p=p[0], (Math.abs(p.clientX-c)>10||Math.abs(p.clientY-d)>10)&&(u=!0, o())
                        }
                        ).on("touchend"+a,
                        function(t) {
                            o(), u||f>1||(s=!0, t.preventDefault(), clearTimeout(l), l=setTimeout(function() {
                                s=!1
                            }
                            ,
                            e),
                            i())
                        }
                        )
                    }
                    )
                }
                r.on("click"+a,
                function() {
                    s||i()
                }
                )
            }
            )
        }
        ,
        t.fn.destroyMfpFastClick=function() {
            t(this).off("touchstart"+a+" click"+a), n&&E.off("touchmove"+a+" touchend"+a)
        }
    }
    ()
}
(window.jQuery||window.Zepto),
function() {
    function t() {}function e(t, e) {
        for(var n=t.length;
        n--;
        )if(t[n].listener===e)return n;
        return-1
    }
    function n(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var o=t.prototype,
    i=this,
    a=i.EventEmitter;
    o.getListeners=function(t) {
        var e, n, o=this._getEvents();
        if("object"==typeof t) {
            e= {};
            for(n in o)o.hasOwnProperty(n)&&t.test(n)&&(e[n]=o[n])
        }
        else e=o[t]||(o[t]=[]);
        return e
    }
    ,
    o.flattenListeners=function(t) {
        var e, n=[];
        for(e=0;
        t.length>e;
        e+=1)n.push(t[e].listener);
        return n
    }
    ,
    o.getListenersAsObject=function(t) {
        var e, n=this.getListeners(t);
        return n instanceof Array&&(e= {}, e[t]=n), e||n
    }
    ,
    o.addListener=function(t,
    n) {
        var o, i=this.getListenersAsObject(t), a="object"==typeof n;
        for(o in i)i.hasOwnProperty(o)&&-1===e(i[o], n)&&i[o].push(a?n: {
            listener: n, once: !1
        }
        );
        return this
    }
    ,
    o.on=n("addListener"),
    o.addOnceListener=function(t,
    e) {
        return this.addListener(t, {
            listener: e, once: !0
        }
        )
    }
    ,
    o.once=n("addOnceListener"),
    o.defineEvent=function(t) {
        return this.getListeners(t), this
    }
    ,
    o.defineEvents=function(t) {
        for(var e=0;
        t.length>e;
        e+=1)this.defineEvent(t[e]);
        return this
    }
    ,
    o.removeListener=function(t,
    n) {
        var o, i, a=this.getListenersAsObject(t);
        for(i in a)a.hasOwnProperty(i)&&(o=e(a[i], n), -1!==o&&a[i].splice(o, 1));
        return this
    }
    ,
    o.off=n("removeListener"),
    o.addListeners=function(t,
    e) {
        return this.manipulateListeners(!1, t, e)
    }
    ,
    o.removeListeners=function(t,
    e) {
        return this.manipulateListeners(!0, t, e)
    }
    ,
    o.manipulateListeners=function(t,
    e,
    n) {
        var o, i, a=t?this.removeListener: this.addListener, s=t?this.removeListeners: this.addListeners;
        if("object"!=typeof e||e instanceof RegExp)for(o=n.length;
        o--;
        )a.call(this, e, n[o]);
        else for(o in e)e.hasOwnProperty(o)&&(i=e[o])&&("function"==typeof i?a.call(this, o, i): s.call(this, o, i));
        return this
    }
    ,
    o.removeEvent=function(t) {
        var e, n=typeof t, o=this._getEvents();
        if("string"===n)delete o[t];
        else if("object"===n)for(e in o)o.hasOwnProperty(e)&&t.test(e)&&delete o[e];
        else delete this._events;
        return this
    }
    ,
    o.removeAllListeners=n("removeEvent"),
    o.emitEvent=function(t,
    e) {
        var n, o, i, a, s=this.getListenersAsObject(t);
        for(i in s)if(s.hasOwnProperty(i))for(o=s[i].length;
        o--;
        )n=s[i][o], n.once===!0&&this.removeListener(t, n.listener), a=n.listener.apply(this, e||[]), a===this._getOnceReturnValue()&&this.removeListener(t, n.listener);
        return this
    }
    ,
    o.trigger=n("emitEvent"),
    o.emit=function(t) {
        var e=Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }
    ,
    o.setOnceReturnValue=function(t) {
        return this._onceReturnValue=t, this
    }
    ,
    o._getOnceReturnValue=function() {
        return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue: !0
    }
    ,
    o._getEvents=function() {
        return this._events||(this._events= {})
    }
    ,
    t.noConflict=function() {
        return i.EventEmitter=a, t
    }
    ,
    "function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",
    [],
    function() {
        return t
    }
    ):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t
}
.call(this),
function(t) {
    function e(e) {
        var n=t.event;
        return n.target=n.target||n.srcElement||e, n
    }
    var n=document.documentElement,
    o=function() {};
    n.addEventListener?o=function(t,
    e,
    n) {
        t.addEventListener(e, n, !1)
    }
    :n.attachEvent&&(o=function(t,
    n,
    o) {
        t[n+o]=o.handleEvent?function() {
            var n=e(t);
            o.handleEvent.call(o, n)
        }
        :function() {
            var n=e(t);
            o.call(t, n)
        }
        ,
        t.attachEvent("on"+n,
        t[n+o])
    }
    );
    var i=function() {};
    n.removeEventListener?i=function(t,
    e,
    n) {
        t.removeEventListener(e, n, !1)
    }
    :n.detachEvent&&(i=function(t,
    e,
    n) {
        t.detachEvent("on"+e, t[e+n]);
        try {
            delete t[e+n]
        }
        catch(o) {
            t[e+n]=void 0
        }
    }
    );
    var a= {
        bind: o, unbind: i
    }
    ;
    "function"==typeof define&&define.amd?define("eventie/eventie",
    a):t.eventie=a
}
(this),
function(t,
e) {
    "function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, o) {
        return e(t, n, o)
    }
    ):"object"==typeof exports?module.exports=e(t,
    require("eventEmitter"),
    require("eventie")):t.imagesLoadedn=e(t,
    t.EventEmitter,
    t.eventie)
}
(this,
function(t,
e,
n) {
    function o(t, e) {
        for(var n in e)t[n]=e[n];
        return t
    }
    function i(t) {
        return"[object Array]"===p.call(t)
    }
    function a(t) {
        var e=[];
        if(i(t))e=t;
        else if("number"==typeof t.length)for(var n=0, o=t.length;
        o>n;
        n++)e.push(t[n]);
        else e.push(t);
        return e
    }
    function s(t,
    e,
    n) {
        if(!(this instanceof s))return new s(t, e);
        "string"==typeof t&&(t=document.querySelectorAll(t)), this.elements=a(t), this.options=o( {}, this.options), "function"==typeof e?n=e: o(this.options, e), n&&this.on("always", n), this.getImages(), c&&(this.jqDeferred=new c.Deferred);
        var i=this;
        setTimeout(function() {
            i.check()
        }
        )
    }
    function r(t) {
        this.img=t
    }
    function l(t) {
        this.src=t, f[t]=this
    }
    var c=t.jQuery,
    d=t.console,
    u=void 0!==d,
    p=Object.prototype.toString;
    s.prototype=new e,
    s.prototype.options= {},
    s.prototype.getImages=function() {
        this.images=[];
        for(var t=0, e=this.elements.length;
        e>t;
        t++) {
            var n=this.elements[t];
            "IMG"===n.nodeName&&this.addImage(n);
            for(var o=n.querySelectorAll("img"), i=0, a=o.length;
            a>i;
            i++) {
                var s=o[i];
                this.addImage(s)
            }
        }
    }
    ,
    s.prototype.addImage=function(t) {
        var e=new r(t);
        this.images.push(e)
    }
    ,
    s.prototype.check=function() {
        function t(t, i) {
            return e.options.debug&&u&&d.log("confirm", t, i), e.progress(t), n++, n===o&&e.complete(), !0
        }
        var e=this,
        n=0,
        o=this.images.length;
        if(this.hasAnyBroken=!1,
        !o)return void this.complete();
        for(var i=0;
        o>i;
        i++) {
            var a=this.images[i];
            a.on("confirm", t), a.check()
        }
    }
    ,
    s.prototype.progress=function(t) {
        this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded;
        var e=this;
        setTimeout(function() {
            e.emit("progress", e, t), e.jqDeferred&&e.jqDeferred.notify&&e.jqDeferred.notify(e, t)
        }
        )
    }
    ,
    s.prototype.complete=function() {
        var t=this.hasAnyBroken?"fail": "done";
        this.isComplete=!0;
        var e=this;
        setTimeout(function() {
            if(e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                var n=e.hasAnyBroken?"reject": "resolve";
                e.jqDeferred[n](e)
            }
        }
        )
    }
    ,
    c&&(c.fn.imagesLoadedn=function(t,
    e) {
        var n=new s(this, t, e);
        return n.jqDeferred.promise(c(this))
    }
    ),
    r.prototype=new e,
    r.prototype.check=function() {
        var t=f[this.img.src]||new l(this.img.src);
        if(t.isConfirmed)return void this.confirm(t.isLoaded, "cached was confirmed");
        if(this.img.complete&&void 0!==this.img.naturalWidth)return void this.confirm(0!==this.img.naturalWidth, "naturalWidth");
        var e=this;
        t.on("confirm", function(t, n) {
            return e.confirm(t.isLoaded, n), !0
        }
        ),
        t.check()
    }
    ,
    r.prototype.confirm=function(t,
    e) {
        this.isLoaded=t, this.emit("confirm", this, e)
    }
    ;
    var f= {};
    return l.prototype=new e,
    l.prototype.check=function() {
        if(!this.isChecked) {
            var t=new Image;
            n.bind(t, "load", this), n.bind(t, "error", this), t.src=this.src, this.isChecked=!0
        }
    }
    ,
    l.prototype.handleEvent=function(t) {
        var e="on"+t.type;
        this[e]&&this[e](t)
    }
    ,
    l.prototype.onload=function(t) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(t)
    }
    ,
    l.prototype.onerror=function(t) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
    }
    ,
    l.prototype.confirm=function(t,
    e) {
        this.isConfirmed=!0, this.isLoaded=t, this.emit("confirm", this, e)
    }
    ,
    l.prototype.unbindProxyEvents=function(t) {
        n.unbind(t.target, "load", this), n.unbind(t.target, "error", this)
    }
    ,
    s
}
),
function(t) {
    t.fn.hoverIntent=function(e, n, o) {
        var i= {
            interval: 30, sensitivity: 7, timeout: 0
        }
        ;
        i="object"==typeof e?t.extend(i,
        e):t.isFunction(n)?t.extend(i,
        {
            over: e, out: n, selector: o
        }
        ):t.extend(i,
        {
            over: e, out: e, selector: n
        }
        );
        var a,
        s,
        r,
        l,
        c=function(t) {
            a=t.pageX, s=t.pageY
        }
        ,
        d=function(e,
        n) {
            return n.hoverIntent_t=clearTimeout(n.hoverIntent_t), Math.abs(r-a)+Math.abs(l-s)<i.sensitivity?(t(n).off("mousemove.hoverIntent", c), n.hoverIntent_s=1, i.over.apply(n, [e])): (r=a, l=s, n.hoverIntent_t=setTimeout(function() {
                d(e, n)
            }
            ,
            i.interval),
            void 0)
        }
        ,
        u=function(t,
        e) {
            return e.hoverIntent_t=clearTimeout(e.hoverIntent_t), e.hoverIntent_s=0, i.out.apply(e, [t])
        }
        ,
        p=function(e) {
            var n=jQuery.extend( {}, e), o=this;
            o.hoverIntent_t&&(o.hoverIntent_t=clearTimeout(o.hoverIntent_t)), "mouseenter"==e.type?(r=n.pageX, l=n.pageY, t(o).on("mousemove.hoverIntent", c), 1!=o.hoverIntent_s&&(o.hoverIntent_t=setTimeout(function() {
                d(n, o)
            }
            ,
            i.interval))):(t(o).off("mousemove.hoverIntent",
            c),
            1==o.hoverIntent_s&&(o.hoverIntent_t=setTimeout(function() {
                u(n, o)
            }
            ,
            i.timeout)))
        }
        ;
        return this.on( {
            "mouseenter.hoverIntent": p, "mouseleave.hoverIntent": p
        }
        ,
        i.selector)
    }
}
(jQuery),
function($) {
    $.fn.superfish=function(t) {
        var e=$.fn.superfish, n=e.c, o=$('<span class="'+n.arrowClass+'"> &#187;</span>'), i=function() {
            var t=$(this), e=l(t);
            clearTimeout(e.sfTimer), t.showSuperfishUl().siblings().hideSuperfishUl()
        }
        ,
        a=function(t) {
            var n=$(this), o=l(n);
            "click"===t.type||e.ios?$.proxy(s, n, o)(): (clearTimeout(o.sfTimer), o.sfTimer=setTimeout($.proxy(s, n, o), o.delay))
        }
        ,
        s=function(t) {
            t.retainPath=$.inArray(this[0], t.$path)>-1, this.hideSuperfishUl(), this.parents("."+t.hoverClass).length||(t.onIdle.call(r(this)), t.$path.length&&$.proxy(i, t.$path)())
        }
        ,
        r=function(t) {
            return t.closest("."+n.menuClass)
        }
        ,
        l=function(t) {
            return r(t).data("sf-options")
        }
        ,
        c=function(t) {
            t.css("ms-touch-action", "none")
        }
        ,
        d=function(t,
        n) {
            var o="li:has(ul)";
            n.useClick||($.fn.hoverIntent&&!n.disableHI?t.hoverIntent(i, a, o): t.on("mouseenter", o, i).on("mouseleave", o, a));
            var s="MSPointerDown";
            e.ios||(s+=" touchstart"), e.wp7&&(s+=" mousedown"), t.on("focusin", "li", i).on("focusout", "li", a).on("click", "a", n, p).on(s, "a", u)
        }
        ,
        u=function(t) {
            var e=$(this), n=e.siblings("ul");
            return n.length>0&&n.is(":hidden")&&(e.data("follow", !1), "MSPointerDown"===t.type)?(e.trigger("focus"), !1): void 0
        }
        ,
        p=function(t) {
            var e=$(this), n=t.data, o=e.siblings("ul"), s=e.data("follow")===!1?!1: !0;
            !o.length||!n.useClick&&s||(t.preventDefault(), o.is(":hidden")?$.proxy(i, e.parent("li"))(): n.useClick&&s&&$.proxy(a, e.parent("li"), t)())
        }
        ,
        f=function(t,
        e) {
            return t.find("li."+e.pathClass).slice(0, e.pathLevels).addClass(e.hoverClass+" "+n.bcClass).filter(function() {
                return $(this).children("ul").hide().show().length
            }
            ).removeClass(e.pathClass)
        }
        ,
        h=function(t,
        e) {
            e.autoArrows&&t.children("a").each(function() {
                m($(this))
            }
            )
        }
        ,
        m=function(t) {
            t.addClass(n.anchorClass).append(o.clone())
        }
        ;
        return e.getOptions=l,
        this.addClass(n.menuClass).each(function() {
            var o=$(this), i=$.extend( {}, e.defaults, t), a=o.find("li:has(ul)");
            i.$path=f(o, i), o.data("sf-options", i), h(a, i), c(o), d(o, i), a.not("."+n.bcClass).hideSuperfishUl(!0), i.onInit.call(this)
        }
        )
    }
    ;
    var t=$.fn.superfish;
    t.o=[],
    t.op= {},
    t.c= {
        bcClass: "sf-breadcrumb", menuClass: "sf-js-enabled", anchorClass: "sf-with-ul", arrowClass: "sf-sub-indicator"
    }
    ,
    t.defaults= {
        hoverClass:"sfHover", pathClass:"overrideThisToUse", pathLevels:1, delay:800, animation: {
            opacity: "show"
        }
        ,
        animationOut: {
            opacity: "hide"
        }
        ,
        speed:"normal",
        speedOut:"fast",
        autoArrows:!0,
        disableHI:!1,
        useClick:!1,
        onInit:$.noop,
        onBeforeShow:$.noop,
        onShow:$.noop,
        onBeforeHide:$.noop,
        onHide:$.noop,
        onIdle:$.noop
    }
    ,
    t.ios=/iPhone|iPad|iPod/i.test(navigator.userAgent),
    t.wp7=function() {
        var t=document.documentElement.style;
        return"behavior"in t&&"fill"in t&&/iemobile/i.test(navigator.userAgent)
    }
    (),
    $.fn.extend( {
        hideSuperfishUl: function(e) {
            if(this.length) {
                var n=this, o=t.getOptions(n), i=o.retainPath===!0?o.$path: "", a=n.find("li."+o.hoverClass).add(this).not(i).removeClass(o.hoverClass).children("ul"), s=o.speedOut;
                e&&(a.show(), s=0), o.retainPath=!1, o.onBeforeHide.call(a), a.stop(!0, !0).animate(o.animationOut, s, function() {
                    o.onHide.call($(this)), o.useClick&&n.children("a").data("follow", !1)
                }
                )
            }
            return this
        }
        ,
        showSuperfishUl:function() {
            var e=t.getOptions(this), n=this.addClass(e.hoverClass), o=n.children("ul");
            return e.onBeforeShow.call(o), o.stop(!0, !0).animate(e.animation, e.speed, function() {
                e.onShow.call(o), n.children("a").data("follow", !0)
            }
            ),
            this
        }
    }
    ),
    t.ios&&$(window).load(function() {
        $("body").children().on("click", $.noop)
    }
    )
}
(jQuery),
function($) {
    "use strict";
    $.fn.fitVids=function(t) {
        var e= {
            customSelector: null
        }
        ;
        if(!document.getElementById("fit-vids-style")) {
            var n=document.createElement("div"), o=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0];
            n.className="fit-vids-style", n.id="fit-vids-style", n.style.display="none", n.innerHTML="&shy;<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                              }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style>", o.parentNode.insertBefore(n, o)
        }
        return t&&$.extend(e,
        t),
        this.each(function() {
            var t=["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            e.customSelector&&t.push(e.customSelector);
            var n=$(this).find(t.join(","));
            n=n.not("object object"), n.each(function() {
                var t=$(this);
                if(!("embed"===this.tagName.toLowerCase()&&t.parent("object").length||t.parent(".fluid-width-video-wrapper").length)) {
                    var e="object"===this.tagName.toLowerCase()||t.attr("height")&&!isNaN(parseInt(t.attr("height"), 10))?parseInt(t.attr("height"), 10): t.height(), n=isNaN(parseInt(t.attr("width"), 10))?t.width(): parseInt(t.attr("width"), 10), o=e/n;
                    if(!t.attr("id")) {
                        var i="fitvid"+Math.floor(999999*Math.random());
                        t.attr("id", i)
                    }
                    t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",
                    100*o+"%"),
                    t.removeAttr("height").removeAttr("width")
                }
            }
            )
        }
        )
    }
}
(jQuery),
/*!
 * jquery.customSelect() - v0.4.2
 * http://adam.co/lab/jquery/customselect/
 * 2013-05-22
 *
 * Copyright 2013 Adam Coulombe
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License
 */

function(t) {
    t.fn.extend( {
        customSelect: function(e) {
            if("undefined"==typeof document.body.style.maxHeight)return this;
            var n= {
                customClass: "customSelect", mapClass: !0, mapStyle: !0
            }
            ,
            e=t.extend(n,
            e),
            o=e.customClass,
            i=function(e,
            n) {
                var o=e.find(":selected"), i=n.children(":first"), s=o.html()||"&nbsp;";
                i.html(s), o.attr("disabled")?n.addClass(a("DisabledOption")): n.removeClass(a("DisabledOption")), setTimeout(function() {
                    n.removeClass(a("Open")), t(document).off("mouseup."+a("Open"))
                }
                ,
                60)
            }
            ,
            a=function(t) {
                return o+t
            }
            ;
            return this.each(function() {
                var n=t(this), s=t("<span />").addClass(a("Inner")), r=t("<span />"), l=n.position();
                n.after(r.append(s)), r.addClass(o), e.mapClass&&r.addClass(n.attr("class")), e.mapStyle&&r.attr("style", n.attr("style")), n.addClass("hasCustomSelect").on("update", function() {
                    i(n, r);
                    var t=parseInt(n.outerWidth(), 10)-(parseInt(r.outerWidth(), 10)-parseInt(r.width(), 10));
                    r.css( {
                        display: "inline-block"
                    }
                    );
                    var e=r.outerHeight();
                    n.attr("disabled")?r.addClass(a("Disabled")):r.removeClass(a("Disabled")),
                    s.css( {
                        width: t, display: "inline-block"
                    }
                    ),
                    n.css( {
                        "-webkit-appearance": "menulist-button", width: r.outerWidth(), position: "absolute", opacity: 0, height: e, fontSize: r.css("font-size"), left: l.left, top: l.top
                    }
                    )
                }
                ).on("change",
                function() {
                    r.addClass(a("Changed")), i(n, r)
                }
                ).on("keyup",
                function(t) {
                    r.hasClass(a("Open"))?(13==t.which||27==t.which||9==t.which)&&i(n, r): (n.blur(), n.focus())
                }
                ).on("mousedown",
                function(t) {
                    r.removeClass(a("Changed"))
                }
                ).on("mouseup",
                function(e) {
                    r.hasClass(a("Open"))||(t("."+a("Open")).not(r).length>0&&"undefined"!=typeof InstallTrigger?n.focus(): (r.addClass(a("Open")), e.stopPropagation(), t(document).one("mouseup."+a("Open"), function(e) {
                        e.target!=n.get(0)&&t.inArray(e.target, n.find("*").get())<0?n.blur(): i(n, r)
                    }
                    )))
                }
                ).focus(function() {
                    r.removeClass(a("Changed")).addClass(a("Focus"))
                }
                ).blur(function() {
                    r.removeClass(a("Focus")+" "+a("Open"))
                }
                ).hover(function() {
                    r.addClass(a("Hover"))
                }
                ,
                function() {
                    r.removeClass(a("Hover"))
                }
                ).trigger("update")
            }
            )
        }
    }
    )
}
(jQuery),
function($) {
    var t=$.event, e, n;
    e=t.special.debouncedresize= {
        setup: function() {
            $(this).on("resize", e.handler)
        }
        ,
        teardown:function() {
            $(this).off("resize", e.handler)
        }
        ,
        handler:function(o,
        i) {
            var a=this, s=arguments, r=function() {
                o.type="debouncedresize", t.dispatch.apply(a, s)
            }
            ;
            n&&clearTimeout(n),
            i?r():n=setTimeout(r,
            e.threshold)
        }
        ,
        threshold:150
    }
}
(jQuery),
function(t,
e) {
    function n() {
        O||(O= {
            verbose:!1, queryLimit: {
                attempt: 5, delay: 250, random: 250
            }
            ,
            classes: {
                Map: google.maps.Map, Marker: google.maps.Marker, InfoWindow: google.maps.InfoWindow, Circle: google.maps.Circle, Rectangle: google.maps.Rectangle, OverlayView: google.maps.OverlayView, StreetViewPanorama: google.maps.StreetViewPanorama, KmlLayer: google.maps.KmlLayer, TrafficLayer: google.maps.TrafficLayer, BicyclingLayer: google.maps.BicyclingLayer, GroundOverlay: google.maps.GroundOverlay, StyledMapType: google.maps.StyledMapType, ImageMapType: google.maps.ImageMapType
            }
            ,
            map: {
                mapTypeId: google.maps.MapTypeId.ROADMAP, center: [46.578498, 2.457275], zoom: 2
            }
            ,
            overlay: {
                pane:"floatPane", content:"", offset: {
                    x: 0, y: 0
                }
            }
            ,
            geoloc: {
                getCurrentPosition: {
                    maximumAge: 6e4, timeout: 5e3
                }
            }
        }
        )
    }
    function o(t,
    n) {
        return t!==e?t: "gmap3_"+(n?H+1: ++H)
    }
    function i(t) {
        var e=function(t) {
            return parseInt(t, 10)
        }
        ,
        n=google.maps.version.split(".").map(e),
        o;
        for(t=t.split(".").map(e),
        o=0;
        o<t.length;
        o++) {
            if(!n.hasOwnProperty(o))return!1;
            if(n[o]<t[o])return!1
        }
        return!0
    }
    function a(e,
    n,
    o,
    i,
    a) {
        if(n.todo.events||n.todo.onces) {
            var s= {
                id: i, data: n.todo.data, tag: n.todo.tag
            }
            ;
            n.todo.events&&t.each(n.todo.events,
            function(n,
            i) {
                var r=e, l=i;
                t.isArray(i)&&(r=i[0], l=i[1]), google.maps.event.addListener(o, n, function(t) {
                    l.apply(r, [a?a: o, t, s])
                }
                )
            }
            ),
            n.todo.onces&&t.each(n.todo.onces,
            function(n,
            i) {
                var r=e, l=i;
                t.isArray(i)&&(r=i[0], l=i[1]), google.maps.event.addListenerOnce(o, n, function(t) {
                    l.apply(r, [a?a: o, t, s])
                }
                )
            }
            )
        }
    }
    function s() {
        var t=[];
        this.empty=function() {
            return!t.length
        }
        ,
        this.add=function(e) {
            t.push(e)
        }
        ,
        this.get=function() {
            return t.length?t[0]: !1
        }
        ,
        this.ack=function() {
            t.shift()
        }
    }
    function r(e,
    n,
    o) {
        function i(t) {
            var e= {};
            return e[t]= {}, e
        }
        function a() {
            var t;
            for(t in o)if(!(t in s))return t
        }
        var s= {},
        r=this,
        l,
        c= {
            latLng: {
                map: !1, marker: !1, infowindow: !1, circle: !1, overlay: !1, getlatlng: !1, getmaxzoom: !1, getelevation: !1, streetviewpanorama: !1, getaddress: !0
            }
            ,
            geoloc: {
                getgeoloc: !0
            }
        }
        ;
        "string"==typeof o&&(o=i(o)),
        this.run=function() {
            for(var i, r;
            i=a();
            ) {
                if("function"==typeof e[i])return l=i, r=t.extend(!0, {}, O[i]|| {}, o[i].options|| {}), void(i in c.latLng?o[i].values?P(o[i].values, e, e[i], {
                    todo: o[i], opts: r, session: s
                }
                ):L(e,
                e[i],
                c.latLng[i],
                {
                    todo: o[i], opts: r, session: s
                }
                ):i in c.geoloc?k(e,
                e[i],
                {
                    todo: o[i], opts: r, session: s
                }
                ):e[i].apply(e,
                [ {
                    todo: o[i], opts: r, session: s
                }
                ]));
                s[i]=null
            }
            n.apply(e,
            [o,
            s])
        }
        ,
        this.ack=function(t) {
            s[l]=t, r.run.apply(r, [])
        }
    }
    function l(t) {
        var e, n=[];
        for(e in t)n.push(e);
        return n
    }
    function c(e,
    n) {
        var o= {};
        if(e.todo)for(var i in e.todo)"options"!==i&&"values"!==i&&(o[i]=e.todo[i]);
        var a, s=["data", "tag", "id", "events", "onces"];
        for(a=0;
        a<s.length;
        a++)d(o, s[a], n, e.todo);
        return o.options=t.extend( {}, e.opts|| {}, n.options|| {}), o
    }
    function d(t,
    e) {
        for(var n=2;
        n<arguments.length;
        n++)if(e in arguments[n])return void(t[e]=arguments[n][e])
    }
    function u() {
        var t=[];
        this.get=function(e) {
            if(t.length) {
                var n, o, i, a, s, r=l(e);
                for(n=0;
                n<t.length;
                n++) {
                    for(a=t[n], s=r.length==a.keys.length, o=0;
                    o<r.length&&s;
                    o++)i=r[o], s=i in a.request, s&&(s="object"==typeof e[i]&&"equals"in e[i]&&"function"==typeof e[i]?e[i].equals(a.request[i]): e[i]===a.request[i]);
                    if(s)return a.results
                }
            }
        }
        ,
        this.store=function(e,
        n) {
            t.push( {
                request: e, keys: l(e), results: n
            }
            )
        }
    }
    function p(e,
    n,
    o,
    i) {
        var a=this, s=[];
        O.classes.OverlayView.call(this), this.setMap(e), this.onAdd=function() {
            var e=this.getPanes();
            n.pane in e&&t(e[n.pane]).append(i), t.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "), function(e, n) {
                s.push(google.maps.event.addDomListener(i[0], n, function(e) {
                    t.Event(e).stopPropagation(), google.maps.event.trigger(a, n, [e]), a.draw()
                }
                ))
            }
            ),
            s.push(google.maps.event.addDomListener(i[0],
            "contextmenu",
            function(e) {
                t.Event(e).stopPropagation(), google.maps.event.trigger(a, "rightclick", [e]), a.draw()
            }
            ))
        }
        ,
        this.getPosition=function() {
            return o
        }
        ,
        this.draw=function() {
            var t=this.getProjection().fromLatLngToDivPixel(o);
            i.css("left", t.x+n.offset.x+"px").css("top", t.y+n.offset.y+"px")
        }
        ,
        this.onRemove=function() {
            for(var t=0;
            t<s.length;
            t++)google.maps.event.removeListener(s[t]);
            i.remove()
        }
        ,
        this.hide=function() {
            i.hide()
        }
        ,
        this.show=function() {
            i.show()
        }
        ,
        this.toggle=function() {
            i&&(i.is(":visible")?this.show(): this.hide())
        }
        ,
        this.toggleDOM=function() {
            this.setMap(this.getMap()?null: e)
        }
        ,
        this.getDOMElement=function() {
            return i[0]
        }
    }
    function f(t,
    e) {
        function n() {
            return this.onAdd=function() {}, this.onRemove=function() {}, this.draw=function() {}, O.classes.OverlayView.apply(this, [])
        }
        n.prototype=O.classes.OverlayView.prototype;
        var o=new n;
        return o.setMap(t),
        o
    }
    function h(e,
    n,
    i) {
        function s(t) {
            T[t]||(delete L[t].options.map, T[t]=new O.classes.Marker(L[t].options), a(e, {
                todo: L[t]
            }
            ,
            T[t],
            L[t].id))
        }
        function r() {
            return(F=k.getProjection())?(y=!0, E.push(google.maps.event.addListener(n, "zoom_changed", function() {
                p()
            }
            )),
            E.push(google.maps.event.addListener(n,
            "bounds_changed",
            function() {
                p()
            }
            )),
            void m()):void setTimeout(function() {
                r.apply(C, [])
            }
            ,
            25)
        }
        function l(t) {
            "object"==typeof x[t]?("function"==typeof x[t].obj.setMap&&x[t].obj.setMap(null), "function"==typeof x[t].obj.remove&&x[t].obj.remove(), "function"==typeof x[t].shadow.remove&&x[t].obj.remove(), "function"==typeof x[t].shadow.setMap&&x[t].shadow.setMap(null), delete x[t].obj, delete x[t].shadow): T[t]&&T[t].setMap(null), delete x[t]
        }
        function c() {
            var t, e, n, o, i, a, s, r;
            return arguments[0]instanceof google.maps.LatLng?(t=arguments[0].lat(), n=arguments[0].lng(), arguments[1]instanceof google.maps.LatLng?(e=arguments[1].lat(), o=arguments[1].lng()): (e=arguments[1], o=arguments[2])): (t=arguments[0], n=arguments[1], arguments[2]instanceof google.maps.LatLng?(e=arguments[2].lat(), o=arguments[2].lng()): (e=arguments[2], o=arguments[3])), i=Math.PI*t/180, a=Math.PI*n/180, s=Math.PI*e/180, r=Math.PI*o/180, 6371e3*Math.acos(Math.min(Math.cos(i)*Math.cos(s)*Math.cos(a)*Math.cos(r)+Math.cos(i)*Math.sin(a)*Math.cos(s)*Math.sin(r)+Math.sin(i)*Math.sin(s), 1))
        }
        function d() {
            var t=c(n.getCenter(), n.getBounds().getNorthEast()), e=new google.maps.Circle( {
                center: n.getCenter(), radius: 1.25*t
            }
            );
            return e.getBounds()
        }
        function u() {
            var t= {}, e;
            for(e in x)t[e]=!0;
            return t
        }
        function p() {
            clearTimeout(M), M=setTimeout(function() {
                m()
            }
            ,
            25)
        }
        function h(t) {
            var e=F.fromLatLngToDivPixel(t), n=F.fromDivPixelToLatLng(new google.maps.Point(e.x+i.radius, e.y-i.radius)), o=F.fromDivPixelToLatLng(new google.maps.Point(e.x-i.radius, e.y+i.radius));
            return new google.maps.LatLngBounds(o, n)
        }
        function m() {
            if(!g&&!b&&y) {
                var e=[], o= {}, a=n.getZoom(), s="maxZoom"in i&&a>i.maxZoom, r=u(), c, p, f, m, C=!1, E, I, S, D, T, k, M;
                for(v=!1, a>3&&(E=d(), C=E.getSouthWest().lng()<E.getNorthEast().lng()), c=0;
                c<L.length;
                c++)!L[c]||C&&!E.contains(L[c].options.position)||H&&!H(P[c])||e.push(c);
                for(;
                ;
                ) {
                    for(c=0;
                    o[c]&&c<e.length;
                    )c++;
                    if(c==e.length)break;
                    if(m=[], w&&!s) {
                        M=10;
                        do for(D=m, m=[], M--, S=D.length?E.getCenter(): L[e[c]].options.position, E=h(S), p=c;
                        p<e.length;
                        p++)o[p]||E.contains(L[e[p]].options.position)&&m.push(p);
                        while(D.length<m.length&&m.length>1&&M)
                    }
                    else for(p=c;
                    p<e.length;
                    p++)if(!o[p]) {
                        m.push(p);
                        break
                    }
                    for(I= {
                        indexes: [], ref: []
                    }
                    ,
                    T=k=0,
                    f=0;
                    f<m.length;
                    f++)o[m[f]]=!0,
                    I.indexes.push(e[m[f]]),
                    I.ref.push(e[m[f]]),
                    T+=L[e[m[f]]].options.position.lat(),
                    k+=L[e[m[f]]].options.position.lng();
                    T/=m.length,
                    k/=m.length,
                    I.latLng=new google.maps.LatLng(T,
                    k),
                    I.ref=I.ref.join("-"),
                    I.ref in r?delete r[I.ref]:(1===m.length&&(x[I.ref]=!0),
                    _(I))
                }
                t.each(r,
                function(t) {
                    l(t)
                }
                ),
                b=!1
            }
        }
        var g=!1,
        v=!1,
        b=!1,
        y=!1,
        w=!0,
        C=this,
        E=[],
        x= {},
        I= {},
        D= {},
        T=[],
        L=[],
        P=[],
        k=f(n,
        i.radius),
        M,
        F,
        H,
        _,
        j;
        r(),
        this.getById=function(t) {
            return t in I?(s(I[t]), T[I[t]]): !1
        }
        ,
        this.rm=function(t) {
            var e=I[t];
            T[e]&&T[e].setMap(null), delete T[e], T[e]=!1, delete L[e], L[e]=!1, delete P[e], P[e]=!1, delete I[t], delete D[e], v=!0
        }
        ,
        this.clearById=function(t) {
            return t in I?(this.rm(t), !0): void 0
        }
        ,
        this.clear=function(t,
        e,
        n) {
            var o, i, a, s, r, l=[], c=S(n);
            for(t?(o=L.length-1, i=-1, a=-1): (o=0, i=L.length, a=1), s=o;
            s!=i&&(!L[s]||c&&!c(L[s].tag)||(l.push(D[s]), !e&&!t));
            s+=a);
            for(r=0;
            r<l.length;
            r++)this.rm(l[r])
        }
        ,
        this.add=function(t,
        e) {
            t.id=o(t.id), this.clearById(t.id), I[t.id]=T.length, D[T.length]=t.id, T.push(null), L.push(t), P.push(e), v=!0
        }
        ,
        this.addMarker=function(t,
        n) {
            n=n|| {}, n.id=o(n.id), this.clearById(n.id), n.options||(n.options= {}), n.options.position=t.getPosition(), a(e, {
                todo: n
            }
            ,
            t,
            n.id),
            I[n.id]=T.length,
            D[T.length]=n.id,
            T.push(t),
            L.push(n),
            P.push(n.data|| {}),
            v=!0
        }
        ,
        this.todo=function(t) {
            return L[t]
        }
        ,
        this.value=function(t) {
            return P[t]
        }
        ,
        this.marker=function(t) {
            return t in T?(s(t), T[t]): !1
        }
        ,
        this.markerIsSet=function(t) {
            return Boolean(T[t])
        }
        ,
        this.setMarker=function(t,
        e) {
            T[t]=e
        }
        ,
        this.store=function(t,
        e,
        n) {
            x[t.ref]= {
                obj: e, shadow: n
            }
        }
        ,
        this.free=function() {
            for(var e=0;
            e<E.length;
            e++)google.maps.event.removeListener(E[e]);
            E=[], t.each(x, function(t) {
                l(t)
            }
            ),
            x= {},
            t.each(L,
            function(t) {
                L[t]=null
            }
            ),
            L=[],
            t.each(T,
            function(t) {
                T[t]&&(T[t].setMap(null), delete T[t])
            }
            ),
            T=[],
            t.each(P,
            function(t) {
                delete P[t]
            }
            ),
            P=[],
            I= {},
            D= {}
        }
        ,
        this.filter=function(t) {
            H=t, m()
        }
        ,
        this.enable=function(t) {
            w!=t&&(w=t, m())
        }
        ,
        this.display=function(t) {
            _=t
        }
        ,
        this.error=function(t) {
            j=t
        }
        ,
        this.beginUpdate=function() {
            g=!0
        }
        ,
        this.endUpdate=function() {
            g=!1, v&&m()
        }
        ,
        this.autofit=function(t) {
            for(var e=0;
            e<L.length;
            e++)L[e]&&t.extend(L[e].options.position)
        }
    }
    function m(t,
    e) {
        this.id=function() {
            return t
        }
        ,
        this.filter=function(t) {
            e.filter(t)
        }
        ,
        this.enable=function() {
            e.enable(!0)
        }
        ,
        this.disable=function() {
            e.enable(!1)
        }
        ,
        this.add=function(t,
        n,
        o) {
            o||e.beginUpdate(), e.addMarker(t, n), o||e.endUpdate()
        }
        ,
        this.getById=function(t) {
            return e.getById(t)
        }
        ,
        this.clearById=function(t,
        n) {
            var o;
            return n||e.beginUpdate(), o=e.clearById(t), n||e.endUpdate(), o
        }
        ,
        this.clear=function(t,
        n,
        o,
        i) {
            i||e.beginUpdate(), e.clear(t, n, o), i||e.endUpdate()
        }
    }
    function g() {
        function n(t) {
            return {
                id: t.id, name: t.name, object: t.obj, tag: t.tag, data: t.data
            }
        }
        function i(t) {
            "function"==typeof t.setMap&&t.setMap(null), "function"==typeof t.remove&&t.remove(), "function"==typeof t.free&&t.free(), t=null
        }
        var a= {},
        s= {};
        this.add=function(t,
        e,
        n,
        i) {
            var r=t.todo|| {}, l=o(r.id);
            return a[e]||(a[e]=[]), l in s&&this.clearById(l), s[l]= {
                obj: n, sub: i, name: e, id: l, tag: r.tag, data: r.data
            }
            ,
            a[e].push(l),
            l
        }
        ,
        this.getById=function(t,
        e,
        o) {
            return t in s?e?s[t].sub: o?n(s[t]): s[t].obj: !1
        }
        ,
        this.get=function(t,
        e,
        o,
        i) {
            var r, l, c=S(o);
            if(!a[t]||!a[t].length)return null;
            for(r=a[t].length;
            r;
            )if(r--, l=a[t][e?r: a[t].length-r-1], l&&s[l]) {
                if(c&&!c(s[l].tag))continue;
                return i?n(s[l]): s[l].obj
            }
            return null
        }
        ,
        this.all=function(t,
        o,
        i) {
            var r=[], l=S(o), c=function(t) {
                var e, o;
                for(e=0;
                e<a[t].length;
                e++)if(o=a[t][e], o&&s[o]) {
                    if(l&&!l(s[o].tag))continue;
                    r.push(i?n(s[o]): s[o].obj)
                }
            }
            ;
            if(t in a)c(t);
            else if(t===e)for(t in a)c(t);
            return r
        }
        ,
        this.rm=function(t,
        e,
        n) {
            var o, i;
            if(!a[t])return!1;
            if(e)if(n)for(o=a[t].length-1;
            o>=0&&(i=a[t][o], !e(s[i].tag));
            o--);
            else for(o=0;
            o<a[t].length&&(i=a[t][o], !e(s[i].tag));
            o++);
            else o=n?a[t].length-1: 0;
            return o in a[t]?this.clearById(a[t][o], o): !1
        }
        ,
        this.clearById=function(t,
        n) {
            if(t in s) {
                var o, r=s[t].name;
                for(o=0;
                n===e&&o<a[r].length;
                o++)t===a[r][o]&&(n=o);
                return i(s[t].obj), s[t].sub&&i(s[t].sub), delete s[t], a[r].splice(n, 1), !0
            }
            return!1
        }
        ,
        this.objGetById=function(t) {
            var e;
            if(a.clusterer)for(var n in a.clusterer)if((e=s[a.clusterer[n]].obj.getById(t))!==!1)return e;
            return!1
        }
        ,
        this.objClearById=function(t) {
            if(a.clusterer)for(var e in a.clusterer)if(s[a.clusterer[e]].obj.clearById(t))return!0;
            return null
        }
        ,
        this.clear=function(t,
        e,
        n,
        o) {
            var i, s, r, l=S(o);
            if(t&&t.length)t=I(t);
            else {
                t=[];
                for(i in a)t.push(i)
            }
            for(s=0;
            s<t.length;
            s++)if(r=t[s],
            e)this.rm(r,
            l,
            !0);
            else if(n)this.rm(r,
            l,
            !1);
            else for(;
            this.rm(r,
            l,
            !1);
            );
        }
        ,
        this.objClear=function(e,
        n,
        o,
        i) {
            if(a.clusterer&&(t.inArray("marker", e)>=0||!e.length))for(var r in a.clusterer)s[a.clusterer[r]].obj.clear(n, o, i)
        }
    }
    function v() {
        return _.geocoder||(_.geocoder=new google.maps.Geocoder), _.geocoder
    }
    function b() {
        return _.directionsService||(_.directionsService=new google.maps.DirectionsService), _.directionsService
    }
    function y() {
        return _.elevationService||(_.elevationService=new google.maps.ElevationService), _.elevationService
    }
    function w() {
        return _.maxZoomService||(_.maxZoomService=new google.maps.MaxZoomService), _.maxZoomService
    }
    function C() {
        return _.distanceMatrixService||(_.distanceMatrixService=new google.maps.DistanceMatrixService), _.distanceMatrixService
    }
    function E() {
        if(O.verbose) {
            var t, e=[];
            if(window.console&&"function"==typeof console.error) {
                for(t=0;
                t<arguments.length;
                t++)e.push(arguments[t]);
                console.error.apply(console, e)
            }
            else {
                for(e="", t=0;
                t<arguments.length;
                t++)e+=arguments[t].toString()+" ";
                alert(e)
            }
        }
    }
    function x(t) {
        return("number"==typeof t||"string"==typeof t)&&""!==t&&!isNaN(t)
    }
    function I(t) {
        var n, o=[];
        if(t!==e)if("object"==typeof t)if("number"==typeof t.length)o=t;
        else for(n in t)o.push(t[n]);
        else o.push(t);
        return o
    }
    function S(n) {
        return n?"function"==typeof n?n: (n=I(n), function(o) {
            if(o===e)return!1;
            if("object"==typeof o) {
                for(var i=0;
                i<o.length;
                i++)if(t.inArray(o[i], n)>=0)return!0;
                return!1
            }
            return t.inArray(o,
            n)>=0
        }
        ):void 0
    }
    function D(e,
    n,
    o) {
        var i=n?e: null;
        return e&&"string"!=typeof e?e.latLng?D(e.latLng): e instanceof google.maps.LatLng?e: x(e.lat)?new google.maps.LatLng(e.lat, e.lng): !o&&t.isArray(e)&&x(e[0])&&x(e[1])?new google.maps.LatLng(e[0], e[1]): i: i
    }
    function T(e) {
        var n, o;
        return!e||e instanceof google.maps.LatLngBounds?e||null: (t.isArray(e)?2==e.length?(n=D(e[0]), o=D(e[1])): 4==e.length&&(n=D([e[0], e[1]]), o=D([e[2], e[3]])): "ne"in e&&"sw"in e?(n=D(e.ne), o=D(e.sw)): "n"in e&&"e"in e&&"s"in e&&"w"in e&&(n=D([e.n, e.e]), o=D([e.s, e.w])), n&&o?new google.maps.LatLngBounds(o, n): null)
    }
    function L(t,
    e,
    n,
    o,
    i) {
        var a=n?D(o.todo, !1, !0):!1, s=a? {
            latLng: a
        }
        :o.todo.address?"string"==typeof o.todo.address? {
            address: o.todo.address
        }
        :o.todo.address:!1,
        r=s?j.get(s):!1,
        l=this;
        s?(i=i||0,
        r?(o.latLng=r.results[0].geometry.location,
        o.results=r.results,
        o.status=r.status,
        e.apply(t,
        [o])):(s.location&&(s.location=D(s.location)),
        s.bounds&&(s.bounds=T(s.bounds)),
        v().geocode(s,
        function(a,
        r) {
            r===google.maps.GeocoderStatus.OK?(j.store(s, {
                results: a, status: r
            }
            ),
            o.latLng=a[0].geometry.location,
            o.results=a,
            o.status=r,
            e.apply(t,
            [o])):r===google.maps.GeocoderStatus.OVER_QUERY_LIMIT&&i<O.queryLimit.attempt?setTimeout(function() {
                L.apply(l, [t, e, n, o, i+1])
            }
            ,
            O.queryLimit.delay+Math.floor(Math.random()*O.queryLimit.random)):(E("geocode failed",
            r,
            s),
            o.latLng=o.results=!1,
            o.status=r,
            e.apply(t,
            [o]))
        }
        ))):(o.latLng=D(o.todo,
        !1,
        !0),
        e.apply(t,
        [o]))
    }
    function P(e,
    n,
    o,
    i) {
        function a() {
            do r++;
            while(r<e.length&&!("address"in e[r]));
            return r>=e.length?void o.apply(n, [i]): void L(s, function(n) {
                delete n.todo, t.extend(e[r], n), a.apply(s, [])
            }
            ,
            !0,
            {
                todo: e[r]
            }
            )
        }
        var s=this,
        r=-1;
        a()
    }
    function k(t,
    e,
    n) {
        var o=!1;
        navigator&&navigator.geolocation?navigator.geolocation.getCurrentPosition(function(i) {
            o||(o=!0, n.latLng=new google.maps.LatLng(i.coords.latitude, i.coords.longitude), e.apply(t, [n]))
        }
        ,
        function() {
            o||(o=!0, n.latLng=!1, e.apply(t, [n]))
        }
        ,
        n.opts.getCurrentPosition):(n.latLng=!1,
        e.apply(t,
        [n]))
    }
    function M(n) {
        function l() {
            !F&&(F=P.get())&&F.run()
        }
        function d() {
            F=null, P.ack(), l.call(L)
        }
        function u(e) {
            if(e.todo.callback) {
                var o=Array.prototype.slice.call(arguments, 1);
                "function"==typeof e.todo.callback?e.todo.callback.apply(n, o): t.isArray(e.todo.callback)&&"function"==typeof e.todo.callback[1]&&e.todo.callback[1].apply(e.todo.callback[0], o)
            }
        }
        function f(t,
        e,
        o) {
            o&&a(n, t, e, o), u(t, e), F.ack(e)
        }
        function v(e,
        o) {
            if(o=o|| {}, M)o.todo&&o.todo.options&&(o.todo.options.center&&(o.todo.options.center=D(o.todo.options.center)), M.setOptions(o.todo.options));
            else {
                var i=o.opts||t.extend(!0, {}, O.map, o.todo&&o.todo.options?o.todo.options: {});
                i.center=e||D(i.center), M=new O.classes.Map(n.get(0), i)
            }
        }
        function x(e,
        o,
        i) {
            var s=[], r="values"in e.todo;
            return r||(e.todo.values=[ {
                options: e.opts
            }
            ]),
            e.todo.values.length?(v(),
            t.each(e.todo.values,
            function(r,
            l) {
                var d, u, p, f, h=c(e, l);
                if(h.options[i])if(h.options[i][0][0]&&t.isArray(h.options[i][0][0]))for(u=0;
                u<h.options[i].length;
                u++)for(p=0;
                p<h.options[i][u].length;
                p++)h.options[i][u][p]=D(h.options[i][u][p]);
                else for(u=0;
                u<h.options[i].length;
                u++)h.options[i][u]=D(h.options[i][u]);
                h.options.map=M, f=new google.maps[o](h.options), s.push(f), d=k.add( {
                    todo: h
                }
                ,
                o.toLowerCase(),
                f),
                a(n,
                {
                    todo: h
                }
                ,
                f,
                d)
            }
            ),
            void f(e,
            r?s:s[0])):void f(e,
            !1)
        }
        function S(o) {
            var i=new h(n, M, o), s= {}, r= {}, l=[], c=/^[0-9]+$/, d, u;
            for(u in o)c.test(u)?(l.push(1*u), r[u]=o[u], r[u].width=r[u].width||0, r[u].height=r[u].height||0): s[u]=o[u];
            return l.sort(function(t, e) {
                return t>e
            }
            ),
            d=s.calculator?function(e) {
                var o=[];
                return t.each(e, function(t, e) {
                    o.push(i.value(e))
                }
                ),
                s.calculator.apply(n,
                [o])
            }
            :function(t) {
                return t.length
            }
            ,
            i.error(function() {
                E.apply(L, arguments)
            }
            ),
            i.display(function(c) {
                var u, p, f, h, m, g=d(c.indexes);
                if(o.force||g>1)for(u=0;
                u<l.length;
                u++)l[u]<=g&&(p=r[l[u]]);
                p?(m=p.offset||[-p.width/2, -p.height/2], f=t.extend( {}, s), f.options=t.extend( {
                    pane: "overlayLayer", content: p.content?p.content.replace("CLUSTER_COUNT", g):"", offset: {
                        x: ("x"in m?m.x: m[0])||0, y: ("y"in m?m.y: m[1])||0
                    }
                }
                ,
                s.options|| {}),
                h=L.overlay( {
                    todo: f, opts: f.options, latLng: D(c)
                }
                ,
                !0),
                f.options.pane="floatShadow",
                f.options.content=t(document.createElement("div")).width(p.width+"px").height(p.height+"px").css( {
                    cursor: "pointer"
                }
                ),
                shadow=L.overlay( {
                    todo: f, opts: f.options, latLng: D(c)
                }
                ,
                !0),
                s.data= {
                    latLng: D(c), markers: []
                }
                ,
                t.each(c.indexes,
                function(t,
                e) {
                    s.data.markers.push(i.value(e)), i.markerIsSet(e)&&i.marker(e).setMap(null)
                }
                ),
                a(n,
                {
                    todo: s
                }
                ,
                shadow,
                e,
                {
                    main: h, shadow: shadow
                }
                ),
                i.store(c,
                h,
                shadow)):t.each(c.indexes,
                function(t,
                e) {
                    i.marker(e).setMap(M)
                }
                )
            }
            ),
            i
        }
        var L=this,
        P=new s,
        k=new g,
        M=null,
        F;
        this._plan=function(t) {
            for(var e=0;
            e<t.length;
            e++)P.add(new r(L, d, t[e]));
            l()
        }
        ,
        this.map=function(t) {
            v(t.latLng, t), a(n, t, M), f(t, M)
        }
        ,
        this.destroy=function(t) {
            k.clear(), n.empty(), M&&(M=null), f(t, !0)
        }
        ,
        this.infowindow=function(o) {
            var i=[], s="values"in o.todo;
            s||(o.latLng&&(o.opts.position=o.latLng), o.todo.values=[ {
                options: o.opts
            }
            ]),
            t.each(o.todo.values,
            function(t,
            r) {
                var l, d, u=c(o, r);
                u.options.position=D(u.options.position?u.options.position: r.latLng), M||v(u.options.position), d=new O.classes.InfoWindow(u.options), d&&(u.open===e||u.open)&&(s?d.open(M, u.anchor?u.anchor: e): d.open(M, u.anchor?u.anchor: o.latLng?e: o.session.marker?o.session.marker: e)), i.push(d), l=k.add( {
                    todo: u
                }
                ,
                "infowindow",
                d),
                a(n,
                {
                    todo: u
                }
                ,
                d,
                l)
            }
            ),
            f(o,
            s?i:i[0])
        }
        ,
        this.circle=function(e) {
            var o=[], i="values"in e.todo;
            return i||(e.opts.center=e.latLng||D(e.opts.center), e.todo.values=[ {
                options: e.opts
            }
            ]),
            e.todo.values.length?(t.each(e.todo.values,
            function(t,
            i) {
                var s, r, l=c(e, i);
                l.options.center=D(l.options.center?l.options.center: i), M||v(l.options.center), l.options.map=M, r=new O.classes.Circle(l.options), o.push(r), s=k.add( {
                    todo: l
                }
                ,
                "circle",
                r),
                a(n,
                {
                    todo: l
                }
                ,
                r,
                s)
            }
            ),
            void f(e,
            i?o:o[0])):void f(e,
            !1)
        }
        ,
        this.overlay=function(e,
        o) {
            var i=[], s="values"in e.todo;
            return s||(e.todo.values=[ {
                latLng: e.latLng, options: e.opts
            }
            ]),
            e.todo.values.length?(p.__initialised||(p.prototype=new O.classes.OverlayView,
            p.__initialised=!0),
            t.each(e.todo.values,
            function(s,
            r) {
                var l, d, u=c(e, r), f=t(document.createElement("div")).css( {
                    border: "none", borderWidth: "0px", position: "absolute"
                }
                );
                f.append(u.options.content),
                d=new p(M,
                u.options,
                D(u)||D(r),
                f),
                i.push(d),
                f=null,
                o||(l=k.add(e,
                "overlay",
                d),
                a(n,
                {
                    todo: u
                }
                ,
                d,
                l))
            }
            ),
            o?i[0]:void f(e,
            s?i:i[0])):void f(e,
            !1)
        }
        ,
        this.getaddress=function(t) {
            u(t, t.results, t.status), F.ack()
        }
        ,
        this.getlatlng=function(t) {
            u(t, t.results, t.status), F.ack()
        }
        ,
        this.getmaxzoom=function(t) {
            w().getMaxZoomAtLatLng(t.latLng, function(e) {
                u(t, e.status===google.maps.MaxZoomStatus.OK?e.zoom: !1, status), F.ack()
            }
            )
        }
        ,
        this.getelevation=function(t) {
            var e, n=[], o=function(e, n) {
                u(t, n===google.maps.ElevationStatus.OK?e: !1, n), F.ack()
            }
            ;
            if(t.latLng)n.push(t.latLng);
            else for(n=I(t.todo.locations||[]),
            e=0;
            e<n.length;
            e++)n[e]=D(n[e]);
            if(n.length)y().getElevationForLocations( {
                locations: n
            }
            ,
            o);
            else {
                if(t.todo.path&&t.todo.path.length)for(e=0;
                e<t.todo.path.length;
                e++)n.push(D(t.todo.path[e]));
                n.length?y().getElevationAlongPath( {
                    path: n, samples: t.todo.samples
                }
                ,
                o):F.ack()
            }
        }
        ,
        this.defaults=function(e) {
            t.each(e.todo, function(e, n) {
                O[e]="object"==typeof O[e]?t.extend( {}, O[e], n): n
            }
            ),
            F.ack(!0)
        }
        ,
        this.rectangle=function(e) {
            var o=[], i="values"in e.todo;
            return i||(e.todo.values=[ {
                options: e.opts
            }
            ]),
            e.todo.values.length?(t.each(e.todo.values,
            function(t,
            i) {
                var s, r, l=c(e, i);
                l.options.bounds=T(l.options.bounds?l.options.bounds: i), M||v(l.options.bounds.getCenter()), l.options.map=M, r=new O.classes.Rectangle(l.options), o.push(r), s=k.add( {
                    todo: l
                }
                ,
                "rectangle",
                r),
                a(n,
                {
                    todo: l
                }
                ,
                r,
                s)
            }
            ),
            void f(e,
            i?o:o[0])):void f(e,
            !1)
        }
        ,
        this.polyline=function(t) {
            x(t, "Polyline", "path")
        }
        ,
        this.polygon=function(t) {
            x(t, "Polygon", "paths")
        }
        ,
        this.trafficlayer=function(t) {
            v();
            var e=k.get("trafficlayer");
            e||(e=new O.classes.TrafficLayer, e.setMap(M), k.add(t, "trafficlayer", e)), f(t, e)
        }
        ,
        this.bicyclinglayer=function(t) {
            v();
            var e=k.get("bicyclinglayer");
            e||(e=new O.classes.BicyclingLayer, e.setMap(M), k.add(t, "bicyclinglayer", e)), f(t, e)
        }
        ,
        this.groundoverlay=function(t) {
            t.opts.bounds=T(t.opts.bounds), t.opts.bounds&&v(t.opts.bounds.getCenter());
            var e, n=new O.classes.GroundOverlay(t.opts.url, t.opts.bounds, t.opts.opts);
            n.setMap(M), e=k.add(t, "groundoverlay", n), f(t, n, e)
        }
        ,
        this.streetviewpanorama=function(e) {
            e.opts.opts||(e.opts.opts= {}), e.latLng?e.opts.opts.position=e.latLng: e.opts.opts.position&&(e.opts.opts.position=D(e.opts.opts.position)), e.todo.divId?e.opts.container=document.getElementById(e.todo.divId): e.opts.container&&(e.opts.container=t(e.opts.container).get(0));
            var n, o=new O.classes.StreetViewPanorama(e.opts.container, e.opts.opts);
            o&&M.setStreetView(o), n=k.add(e, "streetviewpanorama", o), f(e, o, n)
        }
        ,
        this.kmllayer=function(e) {
            var o=[], s="values"in e.todo;
            return s||(e.todo.values=[ {
                options: e.opts
            }
            ]),
            e.todo.values.length?(t.each(e.todo.values,
            function(t,
            s) {
                var r, l, d, u=c(e, s);
                M||v(), d=u.options, u.options.opts&&(d=u.options.opts, u.options.url&&(d.url=u.options.url)), d.map=M, l=i("3.10")?new O.classes.KmlLayer(d): new O.classes.KmlLayer(d.url, d), o.push(l), r=k.add( {
                    todo: u
                }
                ,
                "kmllayer",
                l),
                a(n,
                {
                    todo: u
                }
                ,
                l,
                r)
            }
            ),
            void f(e,
            s?o:o[0])):void f(e,
            !1)
        }
        ,
        this.panel=function(o) {
            v();
            var i, a=0, s=0, r, l=t(document.createElement("div"));
            l.css( {
                position: "absolute", zIndex: 1e3, visibility: "hidden"
            }
            ),
            o.opts.content&&(r=t(o.opts.content),
            l.append(r),
            n.first().prepend(l),
            o.opts.left!==e?a=o.opts.left:o.opts.right!==e?a=n.width()-r.width()-o.opts.right:o.opts.center&&(a=(n.width()-r.width())/2),
            o.opts.top!==e?s=o.opts.top:o.opts.bottom!==e?s=n.height()-r.height()-o.opts.bottom:o.opts.middle&&(s=(n.height()-r.height())/2),
            l.css( {
                top: s, left: a, visibility: "visible"
            }
            )),
            i=k.add(o,
            "panel",
            l),
            f(o,
            l,
            i),
            l=null
        }
        ,
        this.marker=function(e) {
            var i="values"in e.todo, s=!M;
            if(i||(e.opts.position=e.latLng||D(e.opts.position), e.todo.values=[ {
                options: e.opts
            }
            ]),
            !e.todo.values.length)return void f(e,
            !1);
            if(s&&v(),
            e.todo.cluster&&!M.getBounds())return void google.maps.event.addListenerOnce(M,
            "bounds_changed",
            function() {
                L.marker.apply(L, [e])
            }
            );
            if(e.todo.cluster) {
                var r, l;
                e.todo.cluster instanceof m?(r=e.todo.cluster, l=k.getById(r.id(), !0)): (l=S(e.todo.cluster), r=new m(o(e.todo.id, !0), l), k.add(e, "clusterer", r, l)), l.beginUpdate(), t.each(e.todo.values, function(t, n) {
                    var o=c(e, n);
                    o.options.position=D(o.options.position?o.options.position: n), o.options.map=M, s&&(M.setCenter(o.options.position), s=!1), l.add(o, n)
                }
                ),
                l.endUpdate(),
                f(e,
                r)
            }
            else {
                var d=[];
                t.each(e.todo.values, function(t, o) {
                    var i, r, l=c(e, o);
                    l.options.position=D(l.options.position?l.options.position: o), l.options.map=M, s&&(M.setCenter(l.options.position), s=!1), r=new O.classes.Marker(l.options), d.push(r), i=k.add( {
                        todo: l
                    }
                    ,
                    "marker",
                    r),
                    a(n,
                    {
                        todo: l
                    }
                    ,
                    r,
                    i)
                }
                ),
                f(e,
                i?d:d[0])
            }
        }
        ,
        this.getroute=function(t) {
            t.opts.origin=D(t.opts.origin, !0), t.opts.destination=D(t.opts.destination, !0), b().route(t.opts, function(e, n) {
                u(t, n==google.maps.DirectionsStatus.OK?e: !1, n), F.ack()
            }
            )
        }
        ,
        this.directionsrenderer=function(e) {
            e.opts.map=M;
            var n, o=new google.maps.DirectionsRenderer(e.opts);
            e.todo.divId?o.setPanel(document.getElementById(e.todo.divId)): e.todo.container&&o.setPanel(t(e.todo.container).get(0)), n=k.add(e, "directionsrenderer", o), f(e, o, n)
        }
        ,
        this.getgeoloc=function(t) {
            f(t, t.latLng)
        }
        ,
        this.styledmaptype=function(t) {
            v();
            var e=new O.classes.StyledMapType(t.todo.styles, t.opts);
            M.mapTypes.set(t.todo.id, e), f(t, e)
        }
        ,
        this.imagemaptype=function(t) {
            v();
            var e=new O.classes.ImageMapType(t.opts);
            M.mapTypes.set(t.todo.id, e), f(t, e)
        }
        ,
        this.autofit=function(e) {
            var n=new google.maps.LatLngBounds;
            t.each(k.all(), function(t, e) {
                e.getPosition?n.extend(e.getPosition()): e.getBounds?(n.extend(e.getBounds().getNorthEast()), n.extend(e.getBounds().getSouthWest())): e.getPaths?e.getPaths().forEach(function(t) {
                    t.forEach(function(t) {
                        n.extend(t)
                    }
                    )
                }
                ):e.getPath?e.getPath().forEach(function(t) {
                    n.extend(t)
                }
                ):e.getCenter?n.extend(e.getCenter()):e instanceof m&&(e=k.getById(e.id(),
                !0),
                e&&e.autofit(n))
            }
            ),
            n.isEmpty()||M.getBounds()&&M.getBounds().equals(n)||("maxZoom"in e.todo&&google.maps.event.addListenerOnce(M,
            "bounds_changed",
            function() {
                this.getZoom()>e.todo.maxZoom&&this.setZoom(e.todo.maxZoom)
            }
            ),
            M.fitBounds(n)),
            f(e,
            !0)
        }
        ,
        this.clear=function(e) {
            if("string"==typeof e.todo) {
                if(k.clearById(e.todo)||k.objClearById(e.todo))return void f(e, !0);
                e.todo= {
                    name: e.todo
                }
            }
            e.todo.id?t.each(I(e.todo.id),
            function(t,
            e) {
                k.clearById(e)||k.objClearById(e)
            }
            ):(k.clear(I(e.todo.name),
            e.todo.last,
            e.todo.first,
            e.todo.tag),
            k.objClear(I(e.todo.name),
            e.todo.last,
            e.todo.first,
            e.todo.tag)),
            f(e,
            !0)
        }
        ,
        this.exec=function(e) {
            var o=this;
            t.each(I(e.todo.func), function(i, a) {
                t.each(o.get(e.todo, !0, e.todo.hasOwnProperty("full")?e.todo.full: !0), function(t, e) {
                    a.call(n, e)
                }
                )
            }
            ),
            f(e,
            !0)
        }
        ,
        this.get=function(n,
        o,
        i) {
            var a, s, r=o?n: n.todo;
            return o||(i=r.full), "string"==typeof r?(s=k.getById(r, !1, i)||k.objGetById(r), s===!1&&(a=r, r= {})): a=r.name, "map"===a&&(s=M), s||(s=[], r.id?(t.each(I(r.id), function(t, e) {
                s.push(k.getById(e, !1, i)||k.objGetById(e))
            }
            ),
            t.isArray(r.id)||(s=s[0])):(t.each(a?I(a):[e],
            function(e,
            n) {
                var o;
                r.first?(o=k.get(n, !1, r.tag, i), o&&s.push(o)): r.all?t.each(k.all(n, r.tag, i), function(t, e) {
                    s.push(e)
                }
                ):(o=k.get(n,
                !0,
                r.tag,
                i),
                o&&s.push(o))
            }
            ),
            r.all||t.isArray(a)||(s=s[0]))),
            s=t.isArray(s)||!r.all?s:[s],
            o?s:void f(n,
            s)
        }
        ,
        this.getdistance=function(t) {
            var e;
            for(t.opts.origins=I(t.opts.origins), e=0;
            e<t.opts.origins.length;
            e++)t.opts.origins[e]=D(t.opts.origins[e], !0);
            for(t.opts.destinations=I(t.opts.destinations), e=0;
            e<t.opts.destinations.length;
            e++)t.opts.destinations[e]=D(t.opts.destinations[e], !0);
            C().getDistanceMatrix(t.opts, function(e, n) {
                u(t, n===google.maps.DistanceMatrixStatus.OK?e: !1, n), F.ack()
            }
            )
        }
        ,
        this.trigger=function(e) {
            if("string"==typeof e.todo)google.maps.event.trigger(M, e.todo);
            else {
                var n=[M, e.todo.eventName];
                e.todo.var_args&&t.each(e.todo.var_args, function(t, e) {
                    n.push(e)
                }
                ),
                google.maps.event.trigger.apply(google.maps.event,
                n)
            }
            u(e),
            F.ack()
        }
    }
    function F(t) {
        var e;
        if(!t.hasOwnProperty("get"))return!1;
        for(e in t)if("get"!==e)return!1;
        return!t.get.hasOwnProperty("callback")
    }
    var O,
    H=0,
    _= {},
    j=new u;
    t.fn.gmap3=function() {
        var e, o=[], i=!0, a=[];
        for(n(), e=0;
        e<arguments.length;
        e++)arguments[e]&&o.push(arguments[e]);
        return o.length||o.push("map"), t.each(this, function() {
            var e=t(this), n=e.data("gmap3");
            i=!1, n||(n=new M(e), e.data("gmap3", n)), 1!==o.length||"get"!==o[0]&&!F(o[0])?n._plan(o): a.push("get"===o[0]?n.get("map", !0): n.get(o[0].get, !0, o[0].get.full))
        }
        ),
        a.length?1===a.length?a[0]:a:this
    }
}
(jQuery);
var scrolltotop= {
    setting: {
        startline: 200, scrollto: 0, scrollduration: 1200, fadeduration: [500, 100]
    }
    ,
    controlHTML:'<div class="to_the_top"><div class="icon-arrow-up"></div></div>',
    controlattrs: {
        offsetx: 0, offsety: 52
    }
    ,
    anchorkeyword:"#top",
    state: {
        isvisible: !1, shouldvisible: !1
    }
    ,
    scrollup:function() {
        this.cssfixedsupport||this.$control.css( {
            opacity: 0
        }
        );
        var t=isNaN(this.setting.scrollto)?this.setting.scrollto:parseInt(this.setting.scrollto);
        t="string"==typeof t&&1==jQuery("#"+t).length?jQuery("#"+t).offset().top:0,
        this.$body.animate( {
            scrollTop: t
        }
        ,
        this.setting.scrollduration)
    }
    ,
    keepfixed:function() {
        var t=jQuery(window), e=t.scrollLeft()+t.width()-this.$control.width()-this.controlattrs.offsetx, n=t.scrollTop()+t.height()-this.$control.height()-this.controlattrs.offsety;
        this.$control.css( {
            left: e+"px", top: n+"px"
        }
        )
    }
    ,
    togglecontrol:function() {
        var t=jQuery(window).scrollTop();
        this.cssfixedsupport||this.keepfixed(), this.state.shouldvisible=t>=this.setting.startline?!0: !1, this.state.shouldvisible&&!this.state.isvisible?(this.$control.stop().animate( {
            opacity: 1
        }
        ,
        this.setting.fadeduration[0]),
        this.state.isvisible=!0):0==this.state.shouldvisible&&this.state.isvisible&&(this.$control.stop().animate( {
            opacity: 0
        }
        ,
        this.setting.fadeduration[1]),
        this.state.isvisible=!1)
    }
    ,
    init:function() {
        jQuery(document).ready(function($) {
            var t=scrolltotop, e=document.all;
            t.cssfixedsupport=!e||e&&"CSS1Compat"==document.compatMode&&window.XMLHttpRequest, t.$body=$(window.opera?"CSS1Compat"==document.compatMode?"html": "body": "html,body"), t.$control=$('<div id="topcontrol">'+t.controlHTML+"</div>").css( {
                position: t.cssfixedsupport?"fixed": "absolute", bottom: t.controlattrs.offsety, right: t.controlattrs.offsetx, opacity: 0, cursor: "pointer"
            }
            ).attr( {
                title: "To the top!"
            }
            ).click(function() {
                return t.scrollup(), !1
            }
            ).appendTo("body"),
            document.all&&!window.XMLHttpRequest&&""!=t.$control.text()&&t.$control.css( {
                width: t.$control.width()
            }
            ),
            t.togglecontrol(),
            $('a[href="'+t.anchorkeyword+'"]').click(function() {
                return t.scrollup(), !1
            }
            ),
            $(window).bind("scroll resize",
            function(e) {
                t.togglecontrol()
            }
            )
        }
        )
    }
}
;
scrolltotop.init();