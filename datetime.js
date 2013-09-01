// Generated by CoffeeScript 1.6.3
/*!
@author Branko Vukelic <branko@brankovukelic.com>
@license MIT
*/

var define,
  __slice = [].slice;

define = (function(root) {
  if (typeof root.define === 'function' && root.define.amd) {
    return root.define;
  } else {
    if (typeof module === 'object' && module.exports) {
      return function(factory) {
        return module.exports = factory();
      };
    } else {
      return function(factory) {
        return root.datetime = factory();
      };
    }
  }
})(this);

define(function() {
  var AM, DAYS, DAY_MS, DY, MNTH, MONTHS, PARSE_TOKEN_RE, PM, REGEXP_CHARS, cycle, dt, hour24, zeroPad;
  DAY_MS = 86400000;
  REGEXP_CHARS = '^$[]().{}+*?|'.split('');
  PARSE_TOKEN_RE = /(%[bBdDfHiImMnNpsSryYz])/g;
  dt = {
    utils: {},
    datetime: {}
  };
  dt.utils.zeroPad = zeroPad = function(i, digits, tail) {
    var f, _ref;
    if (digits == null) {
      digits = 3;
    }
    if (tail == null) {
      tail = false;
    }
    if (tail === false) {
      return ((new Array(digits)).join('0') + i).slice(-digits);
    } else {
      _ref = i.toString().split('.'), i = _ref[0], f = _ref[1];
      if (tail === 0) {
        return zeroPad(i, digits - tail, false);
      } else {
        f || (f = '0');
        i = zeroPad(i, digits - 1 - tail, false);
        f = zeroPad(f.split('').reverse().join(''), tail, false);
        f = f.split('').reverse().join('');
        return [i, f].join('.');
      }
    }
  };
  dt.utils.cycle = cycle = function(i, max, zeroIndex) {
    if (zeroIndex == null) {
      zeroIndex = false;
    }
    return i % max || (zeroIndex ? 0 : max);
  };
  dt.utils.hour24 = hour24 = function(h, pm) {
    if (!pm) {
      return h;
    }
    h += 12;
    if (h === 24) {
      return 0;
    } else {
      return h;
    }
  };
  dt.MONTHS = MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dt.MNTH = MNTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dt.DAYS = DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dt.DY = DY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dt.AM = AM = 'a.m.';
  dt.PM = PM = 'p.m.';
  dt.WEEK_START = 0;
  dt.FORMAT_TOKENS = {
    '%a': function() {
      return DY[this.getDay()];
    },
    '%A': function() {
      return DAYS[this.getDay()];
    },
    '%b': function() {
      return MNTH[this.getMonth()];
    },
    '%B': function() {
      return MONTHS[this.getMonth()];
    },
    '%c': function() {
      return this.toLocaleString();
    },
    '%d': function() {
      return zeroPad(this.getDate(), 2);
    },
    '%D': function() {
      return "" + (this.getDate());
    },
    '%f': function() {
      var fs, m, s;
      s = this.getSeconds();
      m = this.getMilliseconds();
      fs = Math.round((s + m / 1000) * 100) / 100;
      return zeroPad(fs, 5, 2);
    },
    '%H': function() {
      return zeroPad(this.getHours(), 2);
    },
    '%i': function() {
      return cycle(this.getHours(), 12);
    },
    '%I': function() {
      return zeroPad(cycle(this.getHours(), 12), 2);
    },
    '%j': function() {
      var firstOfYear;
      firstOfYear = new Date(this.getFullYear(), 0, 1);
      return zeroPad(Math.ceil((this - firstOfYear) / DAY_MS), 3);
    },
    '%m': function() {
      return zeroPad(this.getMonth() + 1, 2);
    },
    '%M': function() {
      return zeroPad(this.getMinutes(), 2);
    },
    '%n': function() {
      return "" + (this.getMonth() + 1);
    },
    '%N': function() {
      return "" + (this.getMinutes());
    },
    '%p': function() {
      return (function(h) {
        if ((0 <= h && h < 12)) {
          return AM;
        } else {
          return PM;
        }
      })(this.getHours());
    },
    '%s': function() {
      return "" + (this.getSeconds());
    },
    '%S': function() {
      return zeroPad(this.getSeconds(), 2);
    },
    '%r': function() {
      return "" + (this.getMilliseconds());
    },
    '%w': function() {
      return "" + (this.getDay());
    },
    '%y': function() {
      return ("" + (this.getFullYear())).slice(-2);
    },
    '%Y': function() {
      return "" + (this.getFullYear());
    },
    '%x': function() {
      return this.toLocaleDateString();
    },
    '%X': function() {
      return this.toLocaleTimeString();
    },
    '%z': function() {
      var pfx, tz;
      pfx = this.getTimezoneOffset() >= 0 ? '+' : '-';
      tz = Math.abs(this.getTimezoneOffset());
      return "" + pfx + (zeroPad(~~(tz / 60), 2)) + (zeroPad(tz % 60, 2));
    },
    '%%': function() {
      return '%';
    },
    '%U': function() {
      return '';
    },
    '%Z': function() {
      return '';
    }
  };
  dt.PARSE_RECIPES = {
    '%b': function() {
      return {
        re: "" + (dt.MNTH.join('|')),
        fn: function(s, meta) {
          var mlc, mo, _i, _len, _ref;
          _ref = dt.MNTH;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            mo = _ref[_i];
            mlc = mo.toLowerCase();
          }
          return meta.month = mlc.indexOf(s.toLowerCase());
        }
      };
    },
    '%B': function() {
      return {
        re: "" + (dt.MONTHS.join('|')),
        fn: function(s, meta) {
          var mlc, mo, _i, _len, _ref;
          _ref = dt.MONTHS;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            mo = _ref[_i];
            mlc = mo.toLowerCase();
          }
          return meta.month = mlc.indexOf(s.toLowerCase());
        }
      };
    },
    '%d': function() {
      return {
        re: '[0-2][0-9]|3[01]',
        fn: function(s, meta) {
          return meta.date = parseInt(s, 10);
        }
      };
    },
    '%D': function() {
      return {
        re: '3[01]|[12]?\\d',
        fn: function(s, meta) {
          return meta.date = parseInt(s, 10);
        }
      };
    },
    '%f': function() {
      return {
        re: '\\d{2}\\.\\d{2}',
        fn: function(s, meta) {
          s = parseFloat(s);
          meta.second = ~~s;
          return meta.millisecond = (s - ~~s) * 1000;
        }
      };
    },
    '%H': function() {
      return {
        re: '[0-1]\\d|2[0-3]',
        fn: function(s, meta) {
          return meta.hour = parseInt(s, 10);
        }
      };
    },
    '%i': function() {
      return {
        re: '1[0-2]|\\d',
        fn: function(s, meta) {
          return meta.hour = parseInt(s, 10);
        }
      };
    },
    '%I': function() {
      return {
        re: '0\\d|1[0-2]',
        fn: function(s, meta) {
          return meta.hour = parseInt(s, 10);
        }
      };
    },
    '%m': function() {
      return {
        re: '0\\d|1[0-2]',
        fn: function(s, meta) {
          return meta.month = parseInt(s, 10) - 1;
        }
      };
    },
    '%M': function() {
      return {
        re: '[0-5]\\d',
        fn: function(s, meta) {
          return meta.minute = parseInt(s, 10);
        }
      };
    },
    '%n': function() {
      return {
        re: '1[0-2]|\\d',
        fn: function(s, meta) {
          return meta.month = parseInt(s, 10) - 1;
        }
      };
    },
    '%N': function() {
      return {
        re: '[1-5]?\\d',
        fn: function(s, meta) {
          return meta.minute = parseInt(s, 10);
        }
      };
    },
    '%p': function() {
      return {
        re: "" + (dt.PM.replace(/\./g, '\\.')) + "|" + (dt.AM.replace(/\./g, '\\.')),
        fn: function(s, meta) {
          return meta.timeAdjust = dt.PM.toLowerCase() === s.toLowerCase();
        }
      };
    },
    '%s': function() {
      return {
        re: '[1-5]?\\d',
        fn: function(s, meta) {
          return meta.second = parseInt(s, 10);
        }
      };
    },
    '%S': function() {
      return {
        re: '[0-5]\\d',
        fn: function(s, meta) {
          return meta.second = parseInt(s, 10);
        }
      };
    },
    '%r': function() {
      return {
        re: '\\d{1,3}',
        fn: function(s, meta) {
          return meta.millisecond = parseInt(s, 10);
        }
      };
    },
    '%y': function() {
      return {
        re: '\\d{2}',
        fn: function(s, meta) {
          var c;
          c = (new Date()).getFullYear().toString().slice(0, 2);
          return meta.year = parseInt(c + s, 10);
        }
      };
    },
    '%Y': function() {
      return {
        re: '\\d{4}',
        fn: function(s, meta) {
          return meta.year = parseInt(s, 10);
        }
      };
    },
    '%z': function() {
      return {
        re: '[+-](?1[01]|0\\d)[0-5]\\d|Z',
        fn: function(s, meta) {
          var h, m, mult;
          if (s === 'Z') {
            return meta.timezone = 0;
          } else {
            mult = s[0] === '-' ? -1 : 1;
            h = parseInt(s.slice(1, 3), 10);
            m = parseInt(s.slice(3, 5), 10);
            return meta.timezone = mult * (h * 60) + m;
          }
        }
      };
    }
  };
  dt.ISO_FORMAT = '%Y-%m-%dT%H:%M:%S.%r%Z';
  dt.ISO_UTC_FORMAT = '%Y-%m-%dT%H:%M:%S.%rZ';
  dt.datetime.addDays = function(d, v) {
    d = new Date(d);
    d.setDate(d.getDate() + v);
    return d;
  };
  dt.datetime.addMonths = function(d, v) {
    d = new Date(d);
    d.setMonth(d.getMonth() + v);
    return d;
  };
  dt.datetime.addYears = function(d, v) {
    d = new Date(d);
    d.setFullYear(d.getFullYear() + v);
    return d;
  };
  dt.datetime.resetTime = function(d) {
    d = new Date(d);
    d.setHours(0, 0, 0, 0);
    return d;
  };
  dt.datetime.shiftTime = function(t) {
    var d;
    d = new Date(d);
    d.setTime(d.getTime() + t);
    return d;
  };
  dt.datetime.toUTC = function(d) {
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
  };
  dt.datetime.today = function() {
    var d;
    d = new Date();
    return this.resetTime(d);
  };
  dt.datetime.thisMonth = function() {
    var d;
    d = new Date();
    d.setDate(1);
    return this.resetTime(d);
  };
  dt.datetime.thisWeek = function() {
    var d, diff;
    d = new Date();
    diff = d.getDay() - dt.WEEK_START;
    d.setDate(d.getDate() - diff);
    return this.resetTime(d);
  };
  dt.datetime.delta = function(d1, d2) {
    var absD, days, delta, hrs, mins, msecs, secs;
    d1 = new Date(d1);
    d2 = new Date(d2);
    delta = d2 - d1;
    absD = Math.abs(delta);
    days = absD / 1000 / 60 / 60 / 24;
    hrs = (days - ~~days) * 24;
    mins = (hrs - ~~hrs) * 60;
    secs = (mins - ~~mins) * 60;
    msecs = (secs - ~~secs) * 1000;
    return {
      delta: delta,
      milliseconds: absD,
      seconds: Math.ceil(absD / 1000),
      minutes: Math.ceil(absD / 1000 / 60),
      hours: Math.ceil(absD / 1000 / 60 / 60),
      days: Math.ceil(days),
      composite: [~~days, ~~hrs, ~~mins, ~~secs, msecs]
    };
  };
  dt.datetime.isBefore = function(d, d1) {
    return this.delta(d, d1).delta < 0;
  };
  dt.datetime.isAfter = function(d, d1) {
    return this.delta(d, d1).delta > 0;
  };
  dt.datetime.reorder = function() {
    var d;
    d = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    d.sort(function(d1, d2) {
      return this.delta(d1, d2).delta;
    });
    return d;
  };
  dt.datetime.isBetween = function(d, d1, d2) {
    var _ref;
    _ref = this.reorder(d1, d2), d1 = _ref[0], d2 = _ref[1];
    return this.isAfter(d, d1) && this.isBefore(d, d2);
  };
  dt.datetime.isDateBefore = function(d, d1) {
    d = this.resetTime(d);
    d1 = this.resetTime(d1);
    return this.isBefore(d, d1);
  };
  dt.datetime.isDateAfter = function(d, d1) {
    d = this.resetTime(d);
    d1 = this.resetTime(d1);
    return this.isAfter(d, d1);
  };
  dt.datetime.isDateBetween = function(d, d1, d2) {
    var _ref;
    d = this.resetTime(d);
    d1 = this.resetTime(d1);
    d2 = this.resetTime(d2);
    _ref = this.reorder(d1, d2), d1 = _ref[0], d2 = _ref[1];
    return this.isDateAfter(d, d1) && this.isDateBefore(d, d2);
  };
  dt.datetime.isLeapYear = function(d) {
    d = new Date(d);
    d.setMonth(1);
    d.setDate(29);
    return d.getDate() === 29;
  };
  dt.strftime = function(d, format) {
    var r, token;
    for (token in dt.FORMAT_TOKENS) {
      r = new RegExp(token, 'g');
      format = format.replace(r, function() {
        return dt.FORMAT_TOKENS[token].call(d);
      });
    }
    return format;
  };
  dt.strptime = function(s, format) {
    var converters, d, fn, idx, localOffset, matches, meta, offset, rxp, schr, _i, _j, _len, _len1;
    rxp = format.replace(/\\/, '\\\\');
    for (_i = 0, _len = REGEXP_CHARS.length; _i < _len; _i++) {
      schr = REGEXP_CHARS[_i];
      rxp = rxp.replace(new RegExp('\\' + schr, 'g'), "\\" + schr);
    }
    converters = [];
    rxp = rxp.replace(PARSE_TOKEN_RE, function(m, token) {
      var fn, re, _ref;
      _ref = dt.PARSE_RECIPES[token](), re = _ref.re, fn = _ref.fn;
      converters.push(fn);
      return "(" + re + ")";
    });
    rxp = new RegExp("^" + rxp + "$", "i");
    matches = s.match(rxp);
    if (!matches) {
      return null;
    }
    matches.shift();
    meta = {
      year: 0,
      month: 0,
      date: 0,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      timeAdjust: false,
      timezone: null
    };
    for (idx = _j = 0, _len1 = converters.length; _j < _len1; idx = ++_j) {
      fn = converters[idx];
      fn(matches[idx], meta);
    }
    d = new Date(meta.year, meta.month, meta.date, (meta.timeAdjust ? hour24(meta.hour) : meta.hour), meta.minute, meta.second, meta.millisecond);
    if (meta.timezone != null) {
      localOffset = d.getTimezoneOffset();
      offset = (localOffset - meta.timezone) * 60 * 1000;
      d = dt.datetime.shiftTime(offset);
    }
    return d;
  };
  return dt;
});
