var SmallWorld = SmallWorld || {};

SmallWorld.LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

SmallWorld.prototype = Object.create(Phaser.State.prototype);
SmallWorld.prototype.constructor = SmallWorld.LoadingState;

SmallWorld.LoadingState.prototype.init = function (gameData) {
    "use strict";
    this.gameData = gameData;
    SmallWorld.globals = {};
    SmallWorld.globals.drawTitle = false;
    SmallWorld.globals.currentLevel = 0;
}

SmallWorld.LoadingState.prototype.preload = function () {
    "use strict";

    var font = new FontFaceObserver('04b_19regular');
    font.load().then(function () {
      SmallWorld.globals.drawTitle = true;
    });

    var assets, asset_loader, asset_key, asset;
    assets = this.gameData.assets;

    for (asset_key in assets) { // load assets according to asset key
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch (asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap":
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            case "imageCollection":
                //this.load.
            case "audio":
                this.load.audio(asset_key, asset.source);
                break;
            }
        }
    }
    this.load.start();
}

SmallWorld.LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start("GameState", true, false, this.gameData);
}
