var SmallWorld = SmallWorld || {};

SmallWorld.Obstacle = function (game_state, position, properties) {
    "use strict";
    SmallWorld.Prefab.call(this, game_state, position, properties);

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.setSize(properties.width, properties.height); //width, height, offsetX, offsetY
};

SmallWorld.Obstacle.prototype = Object.create(SmallWorld.Prefab.prototype);
SmallWorld.Obstacle.prototype.constructor = SmallWorld.Obstacle;
