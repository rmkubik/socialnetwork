var SmallWorld = SmallWorld || {};

SmallWorld.Beacon = function (gameState, position, properties) {
    "use strict";
    SmallWorld.Prefab.call(this, gameState, position, properties);

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.anchor.setTo(0.5);
    this.body.setCircle(properties.radius, -properties.radius + this.width/2, -properties.radius + this.height/2);
    // this.body.setSize(properties.width, properties.height); //width, height, offsetX, offsetY

    this.timeCreated = gameState.game.time.elapsed;

    gameState.game.time.events.add(Phaser.Timer.SECOND * 2, this.destroy, this);
};

SmallWorld.Beacon.prototype = Object.create(SmallWorld.Prefab.prototype);
SmallWorld.Beacon.prototype.constructor = SmallWorld.Beacon;

SmallWorld.Beacon.prototype.checkOverlap = function(other) {

    var beaconBounds = this.getBounds();
    var otherBounds = other.getBounds();

    return Phaser.Rectangle.intersects(beaconBounds, otherBounds);
}
