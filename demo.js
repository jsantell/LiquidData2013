var Scheduler = require('./src/index.js');
var notes = ['C','C#','D','D#','E','F','F#','G','G#', 'A','A#','B'];
var minorScale = [0,2,3,5,7,8,10,12,0,2,3,5];
var ctx = new (window.AudioContext || window.webkitAudioContext)();
var scheduler = new Scheduler(ctx);
scheduler.setTempo(120);
var pattern = scheduler.createPattern('1');

var voices = {
  'kick': scheduler.createVoice('samples/kick/b_1.wav'),
  'melody1': scheduler.createVoice('square')
};

pattern.set(voices['kick'], 'x---x---x---x---');
/*
pattern.set(voices['melody1'],
  'F#4_F#4_C#5_F#4_' +
  'D5_F#4_C#5_F#4_' +
  'C#5_B4_A4_B4_' +
  'B4_A4_G#4_E4_');
*/
scheduler.play('1');

voices['kick'].connect(ctx.destination);

createDelay(voices['melody1']);

scheduler.on('data', function (data) {
  var on = data.substr(0,8);
  var type = on.split('').indexOf("1") + 1;
  voices['melody1'].node.type = type;
});

function makeScale (scale, root, start) {
  var noteString = '';
  var rootIndex = notes.indexOf(root);
  scale.forEach(function (scale) {
    noteString += notes[(rootIndex + scale)%12];
    if ((rootIndex + scale) > 11)
      noteString += 6;
    else
      noteString += 5;
    noteString += '_';
  });
  return noteString;
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
  delay1.delayTime.value = 60 / scheduler.tempo / 8
  delay2.delayTime.value = 60 / scheduler.tempo / 16
  gain1.gain.value = 0.5;
  gain2.gain.value = 0.3;

  delay1.connect(gain1);
  delay2.connect(gain2);

  gain1.connect(merger, 0, 0);
  gain2.connect(merger, 0, 1);
  node.connect(ctx.destination);
  merger.connect(ctx.destination);
}
