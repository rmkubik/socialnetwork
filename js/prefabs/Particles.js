var SmallWorld = SmallWorld || {};

SmallWorld.Emitter = function (game_state, position, properties) {
    "use strict";
    this.game_state = game_state;
    this.offset = properties.offset;
    this.emitter = game_state.game.add.emitter(position.x + this.offset.x, position.y + this.offset.y, properties.maxParticles);

    this.emitter.width = properties.width;
    switch (properties.particleClass) {
      case "fuse":
        this.emitter.particleClass = SmallWorld.FuseParticle;
        break;
      case "coin":
        this.emitter.particleClass = SmallWorld.CoinParticle;
        break;
      case "player":
        this.emitter.particleClass = SmallWorld.PlayerParticle;
        break;
      case "dirt":
        this.emitter.particleClass = SmallWorld.DirtParticle;
        break;
      default:
        console.log("invalid particle class");
        break;
    }
    this.emitter.makeParticles();

    this.minParticleSpeed = properties.minParticleSpeed;
    this.maxParticleSpeed = properties.maxParticleSpeed;

    this.direction = -1;

    if (properties.scale !== undefined) {
      this.emitter.setScale(
        properties.scale.minX,
        properties.scale.maxX,
        properties.scale.minY,
        properties.scale.maxY,
        properties.scale.rate,
        properties.scale.ease,
        properties.scale.yoyo
      );
    }

    this.emitter.minParticleSpeed.set(this.minParticleSpeed.x, this.minParticleSpeed.y);
    this.emitter.maxParticleSpeed.set(this.maxParticleSpeed.x, this.maxParticleSpeed.y);

    this.emitter.setRotation(0, 0);
    // this.emitter.setScale(0.1, 1, 0.1, 1, 12000, Phaser.Easing.Quintic.Out);
    this.emitter.gravity = properties.gravity;
    // this.emitter.start(false, 150, 65);
    this.lifetime = properties.lifetime;
    this.frequency = properties.frequency;
    if (!properties.burst) {
      this.emitter.start(properties.burst, properties.lifetime, properties.frequency);
    }
};

SmallWorld.Emitter.init = function() {
  //  Create our bitmapData which we'll use as our particle texture
  var bmd = game.add.bitmapData(8, 8);
  bmd.context.fillStyle = "#FF0000";
  bmd.context.fillRect(0, 0, 4, 4);
  //  Put the bitmapData into the cache
  game.cache.addBitmapData('particleFuse', bmd);

  var bmd2 = game.add.bitmapData(8, 8);
  bmd2.context.fillStyle = "#E7CE2F";
  bmd2.context.fillRect(0, 0, 4, 4);
  //  Put the bitmapData into the cache
  game.cache.addBitmapData('particleCoin', bmd2);

  var bmd3 = game.add.bitmapData(8, 8);
  bmd3.context.fillStyle = "#FFFFFF";
  bmd3.context.fillRect(0, 0, 4, 4);
  //  Put the bitmapData into the cache
  game.cache.addBitmapData('particlePlayer', bmd3);

  var bmd4 = game.add.bitmapData(8, 8);
  bmd4.context.fillStyle = "#A46422";
  bmd4.context.fillRect(0, 0, 4, 4);
  //  Put the bitmapData into the cache
  game.cache.addBitmapData('particleDirt', bmd4);
};

SmallWorld.Emitter.prototype = Object.create(SmallWorld.Prefab.prototype);
SmallWorld.Emitter.prototype.constructor = SmallWorld.Emitter;

SmallWorld.Emitter.prototype.updatePos = function(x, y) {
  this.emitter.x = x + this.offset.x * this.direction;
  this.emitter.y = y + this.offset.y;
}

SmallWorld.Emitter.prototype.flipDirection = function(direction) {
  this.direction = direction;
  this.emitter.minParticleSpeed.set(this.minParticleSpeed.x * direction, this.minParticleSpeed.y);
  this.emitter.maxParticleSpeed.set(this.maxParticleSpeed.x * direction, this.maxParticleSpeed.y);
}

SmallWorld.Emitter.prototype.burst = function(x, y) {
  this.updatePos(x, y);
  this.emitter.start(true, this.lifetime, 0, this.frequency);
}

SmallWorld.Emitter.prototype.updateParticles = function(updateFunc) {
  this.emitter.forEach(updateFunc, this);
}

SmallWorld.Emitter.prototype.destroy = function() {
  this.emitter.destroy();
}

SmallWorld.Emitter.prototype.returnToSpawn = function(prefab) {
  this.burst(prefab.x, prefab.y);
  var partsToSpawn = function(spawn) {
    this.updateParticles(function(particle) {
      var seekSpawnTween = this.game_state.game.add.tween(particle).to({x:spawn.x, y:spawn.y}, 0.5 * Phaser.Timer.SECOND);
      seekSpawnTween.onComplete.add(function() {
        particle.kill();
        this.game_state.restart_level();
      }, this);
      seekSpawnTween.start();
    })
  }
  game.time.events.add(Phaser.Timer.SECOND, partsToSpawn, this, prefab.spawnpoint);
}

SmallWorld.Emitter.prototype.seekParticlesToLocation = function (location, callback, context, param) {
  var initialDelay = 1;
  var travelTime = 0.5;
  param = param || null;
  var partsToLocation = function(location) {
    this.updateParticles(function(particle) {
      var seekLocationTween = this.game_state.game.add.tween(particle)
        .to({x:location.x, y:location.y}, travelTime * Phaser.Timer.SECOND);
      seekLocationTween.onComplete.add(function() {
        particle.kill();
      }, this);
      seekLocationTween.start();
    });
    if (callback !== undefined && callback !== null) {
      game.time.events.add(travelTime * Phaser.Timer.SECOND, callback, context, param);
      // callback.call(context);
    }
  }
  game.time.events.add(initialDelay * Phaser.Timer.SECOND, partsToLocation, this, location);
};

SmallWorld.DirtParticle = function (game, x, y) {
    Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('particleDirt'));
};

SmallWorld.DirtParticle.prototype = Object.create(Phaser.Particle.prototype);
SmallWorld.DirtParticle.prototype.constructor = SmallWorld.DirtParticle;

SmallWorld.FuseParticle = function (game, x, y) {
    Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('particleFuse'));
};

SmallWorld.FuseParticle.prototype = Object.create(Phaser.Particle.prototype);
SmallWorld.FuseParticle.prototype.constructor = SmallWorld.FuseParticle;

SmallWorld.CoinParticle = function (game, x, y) {
    Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('particleCoin'));
};

SmallWorld.CoinParticle.prototype = Object.create(Phaser.Particle.prototype);
SmallWorld.CoinParticle.prototype.constructor = SmallWorld.CoinParticle;

SmallWorld.PlayerParticle = function (game, x, y) {
    Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('particlePlayer'));
};

SmallWorld.PlayerParticle.prototype = Object.create(Phaser.Particle.prototype);
SmallWorld.PlayerParticle.prototype.constructor = SmallWorld.PlayerParticle;
