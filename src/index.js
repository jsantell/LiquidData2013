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
Scheduler.drone = require('../lib/drone');
Scheduler.noteToFreq = require('../lib/freq').noteToFreq;

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
