var OSCILLATORS = {
  'sine': 0,
  'square': 1,
  'sawtooth': 2,
  'triangle': 3
};

function Voice (scheduler, type) {
  this.scheduler = scheduler;
  this.gain = this.scheduler.ctx.createGain();
  this.gain.gain.value = 0.7;
  this.type = OSCILLATORS[type] ? 'osc' : 'buffer';
  if (this.type === 'osc') {
    this.node = this.scheduler.ctx.createOscillator();
    this.node.type = OSCILLATORS[(type || '').toLowerCase()];
    this.node.connect(this.gain);
  } else {
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
  reloadBuffer: function () {
    var scheduler = this.scheduler;
    var voice = this;
    var gain = this.gain;
    voice.node.disconnect();
    getBuffer(this.url, function (e) {
      scheduler.ctx.decodeAudioData(e.target.response, function (buffer) {
        voice.node = scheduler.ctx.createBufferSource();
        voice.node.buffer = buffer;
        voice.node.connect(gain);
      });
    });
  },

  play: function (time, duration, freq) {
    var voice = this;
    if (this.type === 'osc') {
      this.node.frequency.setValueAtTime(freq, time, 1);
      this.gain.gain.setValueAtTime(1, time);
      this.gain.gain.setValueAtTime(0, duration - 0.004);
    }
    console.log('start at ', time, 'reloading at', time + 0.1 - voice.scheduler.ctx.currentTime);
    this.node.start(time);
    if (this.type === 'buffer') {
      setTimeout(function () {
        voice.reloadBuffer();
      }, (time + 0.1 - voice.scheduler.ctx.currentTime) * 1000);
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
