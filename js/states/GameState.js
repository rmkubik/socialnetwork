var SmallWorld = SmallWorld || {};

SmallWorld.GameState = function () {
    "use strict";
    Phaser.State.call(this);
};

SmallWorld.prototype = Object.create(Phaser.State.prototype);
SmallWorld.prototype.constructor = SmallWorld.GameState;

SmallWorld.GameState.prototype.init = function (gameData) {
    "use strict";
    this.gameData = gameData;
    game.add.existing(new SmallWorld.World(this, {x: 240, y: 240}, {texture:"lvl_template"}));
    this.groups = {};
    this.groups["borders"] = game.add.group();
    this.socialNetwork = game.add.existing(new SmallWorld.SocialNetwork(this, {x: 0, y: 0}, {}));
    this.groups["people"] = game.add.group();
    this.groups["speech_bubbles"] = game.add.group();
    SmallWorld.Emitter.init();
    this.emitter = new SmallWorld.Emitter(this, {x: this.x, y: this.y},{
      offset:{x: 0, y: 6},
      maxParticles: 200,
      width: 2,
      minParticleSpeed: {x: -40, y: -20},
      maxParticleSpeed: {x: 40, y: 20},
      gravity: 20,
      burst: true,
      lifetime: 450,
      frequency: 12,
      particleClass: "dirt",
      scale: {
        minX: 1,
        maxX: 0,
        minY: 1,
        maxY: 0,
        rate: 1000,
        ease: Phaser.Easing.Exponential.In,
        yoyo: false
      }
    });
    this.groups["beacons"] = game.add.group();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.placeSound = this.game.add.audio("sfx_place");
    this.game.input.onDown.add(this.onWorldClick, this);
}

SmallWorld.GameState.prototype.onWorldClick = function (pointer, mouseEvent) {
  var radius = 45;
  this.placeSound.play("", 0, 1, false, true);
  this.groups["beacons"].add(new SmallWorld.Beacon(this, {x: pointer.x, y: pointer.y},
    {
      radius: radius,
      texture: "img_beacon",
      frame: 0
    }
  ));
  this.emitter.burst(pointer.x, pointer.y);
}

SmallWorld.GameState.prototype.preload = function () {
    "use strict";
}

SmallWorld.GameState.prototype.create = function () {
    "use strict";
    var collisionMap = [];

    this.tryDrawTitle();
    var addPersonButton = new SmallWorld.Prefab(this, {x: 75, y: 390},
      {
        texture: "img_terrain",
        frame: 7
      }
    );
    addPersonButton.inputEnabled = true;
    addPersonButton.events.onInputDown.add(function() {
      this.addPerson();
    }, this);
    this.groups["borders"].add(addPersonButton);

    var backLevelButton = new SmallWorld.Prefab(this, {x: 160, y: 390},
      {
        texture: "img_terrain",
        frame: 9
      }
    );
    backLevelButton.inputEnabled = true;
    backLevelButton.events.onInputDown.add(function() {
      SmallWorld.globals.currentLevel--;
      if (SmallWorld.globals.currentLevel < 0) {
        console.log("first level!!!");
        SmallWorld.globals.currentLevel++;
      } else {
        console.log("go back a level!!!");
        this.game.state.restart(true, false, this.gameData, null);
      }
    }, this);
    this.groups["borders"].add(backLevelButton);

    var skipLevelButton = new SmallWorld.Prefab(this, {x: 250, y: 390},
      {
        texture: "img_terrain",
        frame: 10
      }
    );
    skipLevelButton.inputEnabled = true;
    skipLevelButton.events.onInputDown.add(function() {
      this.levelComplete();
    }, this);
    this.groups["borders"].add(skipLevelButton);

    this.muteButton = new SmallWorld.Prefab(this, {x: 335, y: 390},
      {
        texture: "img_terrain",
        frame: 11
      }
    );
    this.muteButton.inputEnabled = true;
    this.muteButton.events.onInputDown.add(function() {
      if (game.sound.mute) {
        game.sound.mute = false;
        this.muteButton.frame = 11;
      } else {
        game.sound.mute = true;
        this.muteButton.frame = 12;
      }
    }, this);
    this.groups["borders"].add(this.muteButton);

    this.groups["borders"].add(new SmallWorld.Boundary(this, {x: 100, y: 116.5}, {width: 10, height: 247}));
    this.groups["borders"].add(new SmallWorld.Boundary(this, {x: 365, y: 116.5}, {width: 10, height: 247}));
    this.groups["borders"].add(new SmallWorld.Boundary(this, {x: 116.5, y: 100}, {width: 247, height: 10}));
    this.groups["borders"].add(new SmallWorld.Boundary(this, {x: 116.5, y: 365}, {width: 247, height: 10}));

    SmallWorld[this.gameData.levels[this.gameData.level_order[SmallWorld.globals.currentLevel]].level_class].setup(this);

    this.groups["people"].enableBody = true;
    this.groups["people"].physicsBodyType = Phaser.Physics.ARCADE;
}

SmallWorld.GameState.prototype.tryDrawTitle = function () {
  if (SmallWorld.globals.drawTitle) {
    var text = game.add.text(game.world.centerX, 50,
      this.gameData.levels[this.gameData.level_order[SmallWorld.globals.currentLevel]].title);
    text.anchor.setTo(0.5);
    text.font = '04b_19regular';
    text.fontSize = 46;
    text.fill = '#fbeb94';
  } else {
    game.time.events.add(Phaser.Timer.SECOND, this.tryDrawTitle, this);
  }
};

SmallWorld.GameState.prototype.update = function () {
  // if (game.input.activePointer.isDown) {
  //   console.log("clicking");
  // }
};

SmallWorld.GameState.prototype.render = function () {
  // this.groups["borders"].forEachAlive(function(border) {
  //   game.debug.body(border);
  // }, this);
  // this.groups["beacons"].forEachAlive(function(border) {
  //   game.debug.spriteBounds(border, "red");
  // }, this);
};

SmallWorld.GameState.prototype.levelComplete = function() {
  SmallWorld.globals.currentLevel++;
  if (SmallWorld.globals.currentLevel >= this.gameData.level_order.length) {
    console.log("game is complete!!!");
    SmallWorld.globals.currentLevel--;
  } else {
    console.log("next level!!!");
    this.game.state.restart(true, false, this.gameData, null);
  }
}

SmallWorld.GameState.prototype.addComputer = function (position) {
  if (!position) {
    position = {};
    position.x = game.rnd.integerInRange(135, 355);
    position.y = game.rnd.integerInRange(135, 355);
  }
  var computer = new SmallWorld.Person(this, position, {
    texture: "img_people",
    frame: 9,
    id: this.socialNetwork.getNextPersonId(),
    speed: 0
  });
  computer.body.immovable = true;
  this.groups["people"].add(computer);
};

SmallWorld.GameState.prototype.addPerson = function (position) {
  if (!position) {
    position = {};
    position.x = game.rnd.integerInRange(135, 355);
    position.y = game.rnd.integerInRange(135, 355);
  }
  var frame = game.rnd.integerInRange(0, 8);
  this.groups["people"].add(new SmallWorld.Person(this, position, {
    texture:"img_people",
    frame: frame,
    id: this.socialNetwork.getNextPersonId(),
    speed: 13
  }));
};
