var SmallWorld = SmallWorld || {};

SmallWorld.SpeechBubble = function (gameState, position, properties) {
    "use strict";
    SmallWorld.Prefab.call(this, gameState, position, properties);
    this.anchor.setTo(0, 1);
};

SmallWorld.SpeechBubble.prototype = Object.create(SmallWorld.Prefab.prototype);
SmallWorld.SpeechBubble.prototype.constructor = SmallWorld.SpeechBubble;
