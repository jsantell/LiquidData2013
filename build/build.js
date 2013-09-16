require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  'kick': [
    'x---x---x---x---',
    'x-----x-x-x-x---',
    'x-x-x-x-x-x-x-x-',
    'xxxx----xxxx----'
  ],
  'snare': [
    '----x-------x---',
    '----x-------x-x-',
    '----x-------x-x-',
    '----x-------x-x-'
  ],
  'hihat': [
    'x-x-x-x-x-x-x-x-',
    'x-x-xxxxx-x-x-x-',
    'x-x-xxxxx-x-x-x-',
    'xxxxxxxxxxxxxxxx'
  ],
  'bass': [
    'E2_______________',
    'D2_______________',
    'C2_______________',
    'G2_______________'
  ],
  'melody1': [
    ['E', 'G', 'B'],
    ['G', 'B', 'D'],
    ['B', 'D', 'F#'],
    ['A', 'C', 'E']
  ],
  'melody2': [
    ['E', 'G', 'B'],
    ['G', 'B', 'D'],
    ['B', 'D', 'F#'],
    ['A', 'C', 'E']
  ]
};

},{}],2:[function(require,module,exports){
/**
 * Equal Temperament tuning
 * Source:
 *  http://www.phy.mtu.edu/~suits/notefreqs.html
 *  https://github.com/meenie/band.js
 */
var frequencies = {
  'C0': 16.35,
  'C#0': 17.32,
  'Db0': 17.32,
  'D0': 18.35,
  'D#0': 19.45,
  'Eb0': 19.45,
  'E0': 20.60,
  'F0': 21.83,
  'F#0': 23.12,
  'Gb0': 23.12,
  'G0': 24.50,
  'G#0': 25.96,
  'Ab0': 25.96,
  'A0': 27.50,
  'A#0': 29.14,
  'Bb0': 29.14,
  'B0': 30.87,
  'C1': 32.70,
  'C#1': 34.65,
  'Db1': 34.65,
  'D1': 36.71,
  'D#1': 38.89,
  'Eb1': 38.89,
  'E1': 41.20,
  'F1': 43.65,
  'F#1': 46.25,
  'Gb1': 46.25,
  'G1': 49.00,
  'G#1': 51.91,
  'Ab1': 51.91,
  'A1': 55.00,
  'A#1': 58.27,
  'Bb1': 58.27,
  'B1': 61.74,
  'C2': 65.41,
  'C#2': 69.30,
  'Db2': 69.30,
  'D2': 73.42,
  'D#2': 77.78,
  'Eb2': 77.78,
  'E2': 82.41,
  'F2': 87.31,
  'F#2': 92.50,
  'Gb2': 92.50,
  'G2': 98.00,
  'G#2': 103.83,
  'Ab2': 103.83,
  'A2': 110.00,
  'A#2': 116.54,
  'Bb2': 116.54,
  'B2': 123.47,
  'C3': 130.81,
  'C#3': 138.59,
  'Db3': 138.59,
  'D3': 146.83,
  'D#3': 155.56,
  'Eb3': 155.56,
  'E3': 164.81,
  'F3': 174.61,
  'F#3': 185.00,
  'Gb3': 185.00,
  'G3': 196.00,
  'G#3': 207.65,
  'Ab3': 207.65,
  'A3': 220.00,
  'A#3': 233.08,
  'Bb3': 233.08,
  'B3': 246.94,
  'C4': 261.63,
  'C#4': 277.18,
  'Db4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'Eb4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'Gb4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'Ab4': 415.30,
  'A4': 440.00,
  'A#4': 466.16,
  'Bb4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'C#5': 554.37,
  'Db5': 554.37,
  'D5': 587.33,
  'D#5': 622.25,
  'Eb5': 622.25,
  'E5': 659.26,
  'F5': 698.46,
  'F#5': 739.99,
  'Gb5': 739.99,
  'G5': 783.99,
  'G#5': 830.61,
  'Ab5': 830.61,
  'A5': 880.00,
  'A#5': 932.33,
  'Bb5': 932.33,
  'B5': 987.77,
  'C6': 1046.50,
  'C#6': 1108.73,
  'Db6': 1108.73,
  'D6': 1174.66,
  'D#6': 1244.51,
  'Eb6': 1244.51,
  'E6': 1318.51,
  'F6': 1396.91,
  'F#6': 1479.98,
  'Gb6': 1479.98,
  'G6': 1567.98,
  'G#6': 1661.22,
  'Ab6': 1661.22,
  'A6': 1760.00,
  'A#6': 1864.66,
  'Bb6': 1864.66,
  'B6': 1975.53,
  'C7': 2093.00,
  'C#7': 2217.46,
  'Db7': 2217.46,
  'D7': 2349.32,
  'D#7': 2489.02,
  'Eb7': 2489.02,
  'E7': 2637.02,
  'F7': 2793.83,
  'F#7': 2959.96,
  'Gb7': 2959.96,
  'G7': 3135.96,
  'G#7': 3322.44,
  'Ab7': 3322.44,
  'A7': 3520.00,
  'A#7': 3729.31,
  'Bb7': 3729.31,
  'B7': 3951.07,
  'C8': 4186.01
};

exports.freqToNote = function (freq) {
  var closestNote;
  var closestDiff = Number.POSITIVE_INFINITY;
  Object.keys(frequencies).forEach(function (note) {
    var diff = Math.abs(frequencies[note] - freq);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestNote = note;
    }
  });
  return closestNote;
};

exports.noteToFreq = function (note) {
  return frequencies[note];
};

},{}],3:[function(require,module,exports){
var process=require("__browserify_process");if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (typeof emitter._events[type] === 'function')
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

},{"__browserify_process":4}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"Hbqi/k":[function(require,module,exports){
var Pattern = require('./pattern');
var Instrument = require('./instrument');
var EventEmitter = require('events').EventEmitter;
var socket = require('./ws')('ws://192.168.50.39:8888/events');

// Wish we could use weakmaps
var schedulers = [];

function Scheduler (ctx) {
  this.ctx = ctx;
  this.patterns = {};
  this.voices = [];
  this.resolution = 16;
  this.tempo = 120;
  this.signature = {
    beatsPerMeasure: 4,
    noteType: 4
  };
  schedulers.push(this);
}

Scheduler.patterns = require('../data/patterns');

Scheduler.prototype = Object.create(EventEmitter.prototype);

Scheduler.prototype.setTimeSignature =  function (beatsPerMeasure, noteType) {
  this.signature = {
    beatsPerMeasure: beatsPerMeasure || 4,
    noteType: noteType || 4
  };
  return this;
};

Scheduler.prototype.setTempo = function (tempo) {
  this.tempo = tempo;
  return this;
};

Scheduler.prototype.createPattern = function (name) {
  var pattern = new Pattern(this, name);
  this.patterns[name] = pattern;
  return pattern;
};

Scheduler.prototype.createVoice = function (type) {
  this.voices.push(type);
  return new Instrument(this, type);
};

Scheduler.prototype.play = function (pattern) {
  var secondsPerBeat = 60 / this.tempo;
  this.timer = setInterval(play, secondsPerBeat * this.signature.noteType * 1000);
  var _this = this;

  function play () {
    console.log('play');
    if (pattern instanceof Pattern)
      pattern.play();
    else
      _this.patterns[pattern].play();
  }
};

module.exports = Scheduler;

socket.onmessage = function (e) {
  schedulers.forEach(function (sch) {
    sch.emit('data', e.data);
  });
};

},{"../data/patterns":1,"./instrument":6,"./pattern":7,"./ws":8,"events":3}],6:[function(require,module,exports){
var OSCILLATORS = {
  'sine': 0,
  'square': 1,
  'sawtooth': 2,
  'triangle': 3
};

function Voice (scheduler, type) {
  this.scheduler = scheduler;
  this.gain = this.scheduler.ctx.createGain();
  this.type = OSCILLATORS[type] != undefined ? 'osc' : 'buffer';
  if (this.type === 'osc') {
    this.gain.gain.value = 0.05;
    this.node = this.scheduler.ctx.createOscillator();
    console.log('setting', OSCILLATORS[type]);
    this.node.type = OSCILLATORS[type];
    this.node.connect(this.gain);
  } else {
    this.gain.gain.value = 1;
    this.node = this.scheduler.ctx.createBufferSource();
    this.reloadBuffer();
    this.url = type;
    var node = this.node;
  }
}

Voice.prototype = {
  setType: function (type) {
    this.node.type = OSCILLATORS[type];
  },
  setURL: function (url) {
    this.url = url;
  },
  reloadBuffer: function (cb) {
    var scheduler = this.scheduler;
    var voice = this;
    var gain = this.gain;
    voice.node.disconnect();
    getBuffer(this.url, function (e) {
      scheduler.ctx.decodeAudioData(e.target.response, function (buffer) {
        voice.node = scheduler.ctx.createBufferSource();
        voice.node.buffer = buffer;
        voice.node.connect(gain);
        cb(voice.node);
      });
    });
  },

  play: function (time, duration, freq) {
    var voice = this;
    if (this.type === 'osc') {
      this.node.frequency.setValueAtTime(freq, time, 1);
      this.gain.gain.setValueAtTime(this.volume || 0.05, time);
      this.gain.gain.setValueAtTime(0, duration - 0.004);
      this.node.start(time);
    }
    if (this.type === 'buffer') {
      setTimeout(function () {
        voice.reloadBuffer(function (node) {
          node.start(time);
        });
      }, (time - 0.05 - voice.scheduler.ctx.currentTime) * 1000);
    }
  },
  connect: function (node) {
    this.gain.connect(node);
  }
};

module.exports = Voice;

function getBuffer (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = callback;
  xhr.send();
}

},{}],7:[function(require,module,exports){
var noteToFreq = require('../lib/freq').noteToFreq;

function Pattern (scheduler, name) {
  this.scheduler = scheduler;
  this.name = name;
  this.voices = new Map();
  this.totalVoices = [];
}

Pattern.prototype = {
  set: function (voice, notes) {
    this.voices.set(voice, notes);
    if (!~this.totalVoices.indexOf(voice))
      this.totalVoices.push(voice);
  },
  play: function () {
    // Assuming 4/4
    for (var i in this.totalVoices) {
      var time = this.scheduler.ctx.currentTime;
      var unit = 60 / this.scheduler.tempo * (this.scheduler.signature.noteType / this.scheduler.resolution);

      var voice = this.totalVoices[i];
      var notes = this.voices.get(voice);

      var nextNoteType = '';
      var nextNoteStart = time;
      var nextNoteEnd = time;

      while (notes) {
        if (isNote(notes[0])) {
          // If current nextNote Type is completed, this is a
          // new note, so fire this off
          if (noteToFreq(nextNoteType) || nextNoteType === 'x') {
            voice.play(nextNoteStart, nextNoteEnd, noteToFreq(nextNoteType));
            nextNoteType = nextNoteStart = nextNoteEnd = '';
            time += unit;
          }
          if (!nextNoteType) {
            nextNoteStart = time;
            nextNoteEnd = time + unit;
          }
          // Pop character from string
          nextNoteType += notes[0];
        } else {
          if (notes[0] === '_')
            nextNoteEnd += unit;
          if (notes[0] === '-') {
            // Rest found, cut off and send note
            if (nextNoteType) {
              voice.play(nextNoteStart, nextNoteEnd, noteToFreq(nextNoteType));
              nextNoteType = nextNoteStart = nextNoteEnd = '';
              time += unit;
            }
          }
          time += unit;
        }
        notes = notes.substr(1);
        // If nothing left, terminate last note if it exists
        if (!notes && nextNoteType) {
          voice.play(nextNoteStart, nextNoteEnd, noteToFreq(nextNoteType));
          nextNoteType = nextNoteStart = nextNoteEnd = '';

        }
      }
    }
  }
};

module.exports = Pattern;

function isNote (string) {
  return !~[' ', '_', '-'].indexOf(string[0]);
}

},{"../lib/freq":2}],8:[function(require,module,exports){
function connect(address) {
  var ws = new WebSocket(address);
  ws.onopen = function() {
    console.log('Connected');
    ws.send("Hello, world");
  };
  ws.onclose = function() {
    console.log('Socket closed');
    window.setTimeout(function() {
      console.log('Reconnecting');
      connect();
    }, 1000);
  };
  return ws;
}

module.exports = connect;

},{}],"./src/index.js":[function(require,module,exports){
module.exports=require('Hbqi/k');
},{}]},{},[])
;