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
