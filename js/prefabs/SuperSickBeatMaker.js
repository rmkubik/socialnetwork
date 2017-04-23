var SmallWorld = SmallWorld || {};

SmallWorld.SuperSickBeatMaker = function (gameState, properties) {
  this.blip1 = gameState.game.add.audio("sfx_blip1");
  this.blip2 = gameState.game.add.audio("sfx_blip2");
  this.blip3 = gameState.game.add.audio("sfx_blip3");
  this.blip4 = gameState.game.add.audio("sfx_blip4");
  this.blip5 = gameState.game.add.audio("sfx_blip5");
  this.gameState = gameState;
}

SmallWorld.SuperSickBeatMaker.prototype.constructor = SmallWorld.SuperSickBeatMaker;

SmallWorld.SuperSickBeatMaker.prototype.dropAPhatBeat = function () {
  // var cooldown = 500//this.gameState.game.rnd.integerInRange(750, 2000);
  // this.loopNote(1, 500);
  // // cooldown = 1000//this.gameState.game.rnd.integerInRange(750, 2000);
  // // this.gameState.game.time.events.add(1000, this.playNote, this, 2);
  // // this.loopNote(2, 1000);
  // // this.loopNote(3, 250);
  // this.loopNote(4, 500);
};

SmallWorld.SuperSickBeatMaker.prototype.loopNote = function (note, delay) {
  this.playNote(note);
  this.gameState.game.time.events.add(delay, this.loopNote, this, note, delay);
};

SmallWorld.SuperSickBeatMaker.prototype.playNote = function (note) {
  if (!note) {
    note = this.gameState.game.rnd.integerInRange(1, 5);
  }
  switch (note) {
    case 1:
      this.blip1.play("", 0, 0.35, false, false);
      break;
    case 2:
      this.blip2.play("", 0, 0.35, false, false);
      break;
    case 3:
      this.blip3.play("", 0, 0.35, false, false);
      break;
    case 4:
      this.blip4.play("", 0, 0.35, false, false);
      break;
    case 5:
      this.blip5.play("", 0, 0.35, false, false);
      break;
  }
};
