var SmallWorld = SmallWorld || {};

SmallWorld.Prefab = function (game_state, position, properties) {
    "use strict";
    if (properties.texture != null) {
      if (properties.frame != null) {
        Phaser.Sprite.call(this, game_state.game, position.x, position.y, properties.texture, parseInt(properties.frame));
      } else {
        Phaser.Sprite.call(this, game_state.game, position.x, position.y, properties.texture);
      }
    } else {
      Phaser.Sprite.call(this, game_state.game, position.x, position.y);
    }
    this.game_state = game_state;
};

SmallWorld.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
SmallWorld.Prefab.prototype.constructor = SmallWorld.Prefab;
