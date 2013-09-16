var song = Scheduler(ctx);
var pattern = song.createPattern('a');
var voice = song.createVoice('square');

voice.set(pattern, 'A___B___C___D___E___F___G___A___');
voice.set(pattern, 'A___B___C___D___E___F___G___A___');

