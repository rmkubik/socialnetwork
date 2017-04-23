var SmallWorld = SmallWorld || {};

SmallWorld.Person = function (gameState, position, properties) {
    "use strict";
    SmallWorld.Prefab.call(this, gameState, position, properties);
    this.anchor.setTo(0.5, 1);
    this.wanderSteps = 0;
    this.wanderDirection = {x: 0, y: 0}
    this.speed = properties.speed;
    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.gameState = gameState;

    this.talking = false;
    this.canTalk = true;
    this.talkingCooldown = Phaser.Timer.SECOND * 3;
    this.conversationLength = Phaser.Timer.SECOND;
    this.speechBubbleOffset = {x: 9, y: -15};
    this.speechBubble = new SmallWorld.SpeechBubble(this.gameState, this.speechBubbleOffset, {texture: "img_speech", frame: 0});
    this.speechBubble.kill();
    this.addChild(this.speechBubble);

    this.id = properties.id;
    this.friends = [];

    this.followingBeacon = false;
    this.targetBeacon;

    this.talkSound = this.game.add.audio("sfx_talk");
};

SmallWorld.Person.prototype = Object.create(SmallWorld.Prefab.prototype);
SmallWorld.Person.prototype.constructor = SmallWorld.Person;

SmallWorld.Person.prototype.update = function () {
  this.gameState.game.physics.arcade.collide(this, this.gameState.groups.people, this.socialize, null, this);
  this.gameState.game.physics.arcade.collide(this, this.gameState.groups.borders);
  this.followingBeacon = false;
  this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.beacons, this.beaconOverlap, null, this);
  if (this.followingBeacon) {

  } else {
    this.wander();
  }
};

SmallWorld.Person.prototype.beaconOverlap = function (person, beacon) {
  if (this.targetBeacon === undefined || beacon.timeCreated >= this.targetBeacon.timeCreated) {
    this.followingBeacon = true;
    this.targetBeacon = beacon;
    this.seekXY({x: beacon.body.x + beacon.body.width/2, y: beacon.body.y + beacon.body.height/2});
  }
};

SmallWorld.Person.prototype.seekXY = function (target) {
  if (target.x > this.x) {
    this.body.velocity.x = this.speed;
  } else if (target.x < this.x) {
    this.body.velocity.x = -this.speed;
  }
  if (target.y > this.y) {
    this.body.velocity.y = this.speed;
  } else if (target.y < this.y) {
    this.body.velocity.y = -this.speed;
  }
};

SmallWorld.Person.prototype.wander = function () {
  if (this.wanderSteps === 0) {
    //pick new direction to wander in
    this.wanderSteps = this.gameState.game.rnd.integerInRange(50, 150);
    this.wanderDirection.x = this.gameState.game.rnd.integerInRange(-1, 1);
    this.wanderDirection.y = this.gameState.game.rnd.integerInRange(-1, 1);
  } else {
    this.wanderSteps--;
    this.body.velocity.x = this.wanderDirection.x * this.speed;
    this.body.velocity.y = this.wanderDirection.y * this.speed;
  }
};

SmallWorld.Person.prototype.socialize = function(person, other) {
  if (!this.talking && this.canTalk) {
    this.talking = true;
    this.talkSound.play("", 0, 0.5, false, false);
    this.speechBubble.reset(this.speechBubbleOffset.x, this.speechBubbleOffset.y);
    this.speechBubble.frame = this.gameState.game.rnd.integerInRange(0, 4);
    this.gameState.game.time.events.add(this.conversationLength, this.finishConversation, this);
    person.addFriend(other);
    other.addFriend(person);
  }
}

SmallWorld.Person.prototype.finishConversation = function () {
  this.gameState.game.time.events.add(this.talkingCooldown, this.resetTalkCooldown, this);
  this.speechBubble.kill();
  this.talking = false;
};

SmallWorld.Person.prototype.resetTalkCooldown = function() {
  this.canTalk = true;
}

SmallWorld.Person.prototype.addFriend = function(newFriend) {
  var alreadyFriends = false;
  this.friends.forEach(function(friend) {
    if (newFriend.id === friend.id) {
      alreadyFriends = true;
    }
  }, this);
  if (!alreadyFriends) {
    this.friends.push(newFriend);
  }
}
