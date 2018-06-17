!(function(t) {
  if ('object' == typeof exports && 'undefined' != typeof module)
    module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    var i;
    'undefined' != typeof window
      ? (i = window)
      : 'undefined' != typeof global
        ? (i = global)
        : 'undefined' != typeof self && (i = self),
      (i.Countdown = t());
  }
})(function() {
  return (function t(i, e, n) {
    function o(r, h) {
      if (!e[r]) {
        if (!i[r]) {
          var a = 'function' == typeof require && require;
          if (!h && a) return a(r, !0);
          if (s) return s(r, !0);
          var f = new Error("Cannot find module '" + r + "'");
          throw ((f.code = 'MODULE_NOT_FOUND'), f);
        }
        var d = (e[r] = {
          exports: {},
        });
        i[r][0].call(
          d.exports,
          function(t) {
            var e = i[r][1][t];
            return o(e || t);
          },
          d,
          d.exports,
          t,
          i,
          e,
          n,
        );
      }
      return e[r].exports;
    }
    for (
      var s = 'function' == typeof require && require, r = 0;
      r < n.length;
      r++
    )
      o(n[r]);
    return o;
  })(
    {
      1: [
        function(t, i, e) {
          var n = {
            date: 'June 7, 2087 15:03:25',
            refresh: 1e3,
            offset: 0,
            onEnd: function() {},
            render: function(t) {
              this.el.innerHTML =
                t.days +
                ' days, ' +
                this.leadingZeros(t.hours) +
                ' hours, ' +
                this.leadingZeros(t.min) +
                ' min and ' +
                this.leadingZeros(t.sec) +
                ' sec';
            },
          };
          i.exports = function(t, i) {
            (this.el = t),
              (this.options = {}),
              (this.interval = !1),
              (this.mergeOptions = function(t) {
                for (var i in n)
                  n.hasOwnProperty(i) &&
                    ((this.options[i] = void 0 !== t[i] ? t[i] : n[i]),
                    'date' === i &&
                      'object' != typeof this.options.date &&
                      (this.options.date = new Date(this.options.date)),
                    'function' == typeof this.options[i] &&
                      (this.options[i] = this.options[i].bind(this)));
                'object' != typeof this.options.date &&
                  (this.options.date = new Date(this.options.date));
              }.bind(this)),
              this.mergeOptions(i),
              (this.getDiffDate = function() {
                var t =
                    (this.options.date.getTime() -
                      Date.now() +
                      this.options.offset) /
                    1e3,
                  i = {
                    years: 0,
                    days: 0,
                    hours: 0,
                    min: 0,
                    sec: 0,
                    millisec: 0,
                  };
                return t <= 0
                  ? (this.interval && (this.stop(), this.options.onEnd()), i)
                  : (t >= 31557600 &&
                      ((i.years = Math.floor(t / 31557600)),
                      (t -= 365.25 * i.years * 86400)),
                    t >= 86400 &&
                      ((i.days = Math.floor(t / 86400)), (t -= 86400 * i.days)),
                    t >= 3600 &&
                      ((i.hours = Math.floor(t / 3600)), (t -= 3600 * i.hours)),
                    t >= 60 &&
                      ((i.min = Math.floor(t / 60)), (t -= 60 * i.min)),
                    (i.sec = Math.round(t)),
                    (i.millisec = (t % 1) * 1e3),
                    i);
              }.bind(this)),
              (this.leadingZeros = function(t, i) {
                return (
                  (i = i || 2),
                  (t = String(t)),
                  t.length > i ? t : (Array(i + 1).join('0') + t).substr(-i)
                );
              }),
              (this.update = function(t) {
                return (
                  'object' != typeof t && (t = new Date(t)),
                  (this.options.date = t),
                  this.render(),
                  this
                );
              }.bind(this)),
              (this.stop = function() {
                return (
                  this.interval &&
                    (clearInterval(this.interval), (this.interval = !1)),
                  this
                );
              }.bind(this)),
              (this.render = function() {
                return this.options.render(this.getDiffDate()), this;
              }.bind(this)),
              (this.start = function() {
                if (!this.interval)
                  return (
                    this.render(),
                    this.options.refresh &&
                      (this.interval = setInterval(
                        this.render,
                        this.options.refresh,
                      )),
                    this
                  );
              }.bind(this)),
              (this.updateOffset = function(t) {
                return (this.options.offset = t), this;
              }.bind(this)),
              (this.restart = function(t) {
                return (
                  this.mergeOptions(t), (this.interval = !1), this.start(), this
                );
              }.bind(this)),
              this.start();
          };
        },
        {},
      ],
      2: [
        function(t, i, e) {
          var n = t('./countdown.js');
          (jQuery.fn.countdown = function(t) {
            return $.each(this, function(i, e) {
              var o = $(e);
              o.data('countdown') ||
                (o.data('date') && (t.date = o.data('date')),
                o.data('countdown', new n(e, t)));
            });
          }),
            (i.exports = n);
        },
        {
          './countdown.js': 1,
        },
      ],
    },
    {},
    [2],
  )(2);
});
