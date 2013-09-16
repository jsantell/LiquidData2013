var Scheduler = require('./src/index.js');
var patterns = Scheduler.patterns;
var notes = ['C','C#','D','D#','E','F','F#','G','G#', 'A','A#','B'];
var minorScale = [0,2,3,5,7,8,10,12,0,2,3,5];
var ctx = new (window.AudioContext || window.webkitAudioContext)();
var VOICE_MAP = ['bass', 'melody1', 'melody2', 'kick', 'snare', 'hihat'];

var OUTPUT = ctx.createGain();
var filter = ctx.createBiquadFilter();
OUTPUT.connect(filter);
filter.connect(ctx.destination);
filter.type = 0;

var drone = Scheduler.drone(ctx, 60, 50);
drone.gain.value = 9;
drone.connect(OUTPUT);

var scheduler = new Scheduler(ctx);
scheduler.setTempo(120);
var pattern = scheduler.createPattern('1');

var voices = {
  'kick': scheduler.createVoice('samples/kick/b_1.wav'),
  'snare': scheduler.createVoice('samples/snare/s_2.wav'),
  'hihat': scheduler.createVoice('samples/hihat/h_2.wav'),
  'bass': scheduler.createVoice('triangle'),
  'melody1': scheduler.createVoice('sine'),
  'melody2': scheduler.createVoice('square'),
  'lead': scheduler.createVoice('square'),
  'samples': scheduler.createVoice('samples/bar_samples/Samples 1.wav')
};

pattern.set(voices['kick'],  'x---x---x---x---');
pattern.set(voices['snare'], '----x-------x---');
pattern.set(voices['hihat'], 'x-x-x-xxx-x-x-x-');
pattern.set(voices['bass'], 'E2_______________');
scheduler.play('1');

voices['kick'].connect(OUTPUT);
voices['snare'].connect(OUTPUT);
voices['hihat'].connect(OUTPUT);
voices['bass'].connect(OUTPUT);
voices['samples'].connect(OUTPUT);
voices['lead'].connect(OUTPUT);
voices['lead'].node.start(0);
voices['lead'].gain.gain.value = 0;
createDelay(voices['melody1']);
createDelay(voices['melody2']);


voices['bass'].volume = 0.4;

var PROC_ARPS = {
  'melody1': ['E','G','B'],
  'melody2': ['G','B','D']
};

setInterval(function () {
  pattern.set(voices['melody1'], makeScale(PROC_ARPS.melody1,true));
  pattern.set(voices['melody2'], makeScale(PROC_ARPS.melody2));

  if (!~~(Math.random() * 3)) {
    var num = ~~(Math.random() * 10) + 1;
    voices['samples'].setURL('samples/bar_samples/Sample ' + num + '.wav');
    voices['samples'].play(scheduler.ctx.currentTime, scheduler.ctx.currentTime);
    voices['samples'].gain.gain.value = 0.2;
  }
}, 1750);

scheduler.on('data', function (data) {
  data = data.split(',');
  Object.keys(PROC_ARPS).forEach(function (key) {
    PROC_ARPS[key] = [];
  });
  ['kick', 'snare', 'hihat', 'bass'].forEach(function (inst) {
    pattern.set(voices[inst], '----------------');
  });
  var leadSet = false;
  var filterSet = false;
  data.forEach(function (row, rowNum) {
    row.split('').forEach(function (el, i) {
      if (+el) {
        if (rowNum === 4) {
          var note = ['E5','F#5','G5','A5','B5','C6','D6','E6'][i];
          voices.lead.gain.gain.setValueAtTime(0.05, scheduler.ctx.currentTime);
          var current = voices.lead.node.frequency.value;
          voices.lead.node.frequency.setValueAtTime(current, scheduler.ctx.currentTime);
          voices.lead.node.frequency.linearRampToValueAtTime(Scheduler.noteToFreq(note), scheduler.ctx.currentTime + 0.15);
          console.log("RAMP");
          leadSet = true;
          return;
        }

        var voice = VOICE_MAP[i];
        if (~[0, 3, 4, 5].indexOf(i)) {
          pattern.set(voices[voice], patterns[voice][rowNum]);
        } else if (~[1,2].indexOf(i)) {
          PROC_ARPS[voice] = patterns[voice][rowNum];
        } else if (i === 6) {
          filter.frequency.linearRampToValueAtTime((200 * rowNum) + 400, scheduler.ctx.currentTime);
          filterSet = true;
        }
      }
    });
  });

  if (!filterSet) {
    filter.frequency.setValueAtTime(22100, scheduler.ctx.currentTime);
  }

  if (!leadSet) {
    voices.lead.gain.gain.setValueAtTime(0.05, scheduler.ctx.currentTime);
    voices.lead.gain.gain.linearRampToValueAtTime(0, scheduler.ctx.currentTime + 0.2);
  }
});

function makeScale (notes, sustain) {
  var beats = 8;
  var string = '';
  if (!notes || !notes.length)
    return '----------------';
  while (beats) {
    var note = getNote();
    var duration = ~~(Math.random() * 4) + 1;
    string += note + (sustain ? '_' : '-');
    beats--;
    for (var i = 0; i < duration && beats; i++) {
      string += sustain ? '__' : '--';
      beats--;
    }
  }
  return string;

  function getNote () {
    var note = notes[~~(Math.random() * 3)];
    var octave = [4,5,6][~~(Math.random()*3)];
    return note + octave;
  }
}

function createDelay (node) {
  var delay1 = ctx.createDelay();
  var delay2 = ctx.createDelay();
  var gain1 = ctx.createGain();
  var gain2 = ctx.createGain();
  var splitter = ctx.createChannelSplitter(2);
  var merger = ctx.createChannelMerger(2);


  node.connect(splitter);
  splitter.connect(delay1, 0);
  splitter.connect(delay2, 1);
  delay1.delayTime.value = 60 / scheduler.tempo / 2
  delay2.delayTime.value = 60 / scheduler.tempo / 4
  gain1.gain.value = 0.7;
  gain2.gain.value = 0.5;

  delay1.connect(gain1);
  delay2.connect(gain2);

  gain1.connect(merger, 0, 0);
  gain2.connect(merger, 0, 1);
  node.connect(OUTPUT);
  merger.connect(OUTPUT);
}
