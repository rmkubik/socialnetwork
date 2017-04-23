var SmallWorld = SmallWorld || {};

SmallWorld.World = function (gameState, position, properties) {
    "use strict";
    SmallWorld.Prefab.call(this, gameState, position, properties);
    this.anchor.setTo(0.5, 0.5);

    this.starCount = 100;
    this.starMaxSize = 10;
    this.starMinSize = 1;

    this.gameState = gameState;
    this.bmd = gameState.add.bitmapData(480,480);
    this.drawStars();
    var sprite = gameState.game.add.sprite(0, 0, this.bmd);
};

SmallWorld.World.prototype = Object.create(SmallWorld.Prefab.prototype);
SmallWorld.World.prototype.constructor = SmallWorld.World;

SmallWorld.World.prototype.drawStars = function () {
  for (var i = 0; i < this.starCount; i++) {
    this.bmd.ctx.beginPath();
    var radius = this.gameState.game.rnd.integerInRange(this.starMinSize, this.starMaxSize);
    this.bmd.ctx.rect(
      this.gameState.game.rnd.integerInRange(0, 480), //x
      this.gameState.game.rnd.integerInRange(0, 480), //y
      radius, //width
      radius //height
    );
    this.bmd.ctx.fillStyle = '#F7E26B';
    this.bmd.ctx.fill();
    this.bmd.ctx.closePath();
  }
};
