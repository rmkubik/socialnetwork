var SmallWorld = SmallWorld || {};

SmallWorld.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

SmallWorld.prototype = Object.create(Phaser.State.prototype);
SmallWorld.prototype.constructor = SmallWorld.BootState;

SmallWorld.BootState.prototype.init = function (gameDataFile) {
    "use strict";
    this.gameDataFile = gameDataFile;
    this.game.stage.backgroundColor = '#1d2b53';
}

SmallWorld.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("game_data", this.gameDataFile);
}

SmallWorld.BootState.prototype.create = function () {
    "use strict";
    var gameDataText, gameData;
    gameDataText = this.game.cache.getText("game_data");
    gameData = JSON.parse(gameDataText);
    this.game.state.start("LoadingState", true, false, gameData);
}
