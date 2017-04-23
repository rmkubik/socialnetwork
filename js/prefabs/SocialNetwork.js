var SmallWorld = SmallWorld || {};

SmallWorld.SocialNetwork = function (gameState, position, properties) {
    "use strict";
    SmallWorld.Prefab.call(this, gameState, position, properties);

    this.gameState = gameState;
    this.graphics = this.gameState.game.add.graphics(0, 0);
    this.nextPersonId = 0;

    this.bmd = this.gameState.add.bitmapData(480,480);
    var sprite = this.gameState.game.add.sprite(0, 0, this.bmd);
};

SmallWorld.SocialNetwork.prototype = Object.create(SmallWorld.Prefab.prototype);
SmallWorld.SocialNetwork.prototype.constructor = SmallWorld.SocialNetwork;

SmallWorld.SocialNetwork.prototype.update = function () {
  "use strict";
  this.bmd.clear();
  this.bmd.ctx.beginPath();
  this.bmd.ctx.lineWidth = "4";
  this.bmd.ctx.strokeStyle = 'white';
  this.bmd.ctx.setLineDash([8, 10]);
  this.gameState.groups["people"].forEach(function(person){
    this.bmd.ctx.moveTo(person.x, person.y);
    person.friends.forEach(function(friend) {
      this.bmd.ctx.lineTo(friend.x, friend.y);
    }, this);
  }, this);
  this.bmd.ctx.stroke();
  this.bmd.ctx.closePath();

  if (this.gameState.groups.people.length > 0 && this.isNetworkComplete()) {
    this.gameState.levelComplete();
  }
};

SmallWorld.SocialNetwork.prototype.getNextPersonId = function () {
  "use strict";
  return this.nextPersonId++;
};

SmallWorld.SocialNetwork.prototype.isNetworkComplete = function () {
  "use strict";
  var visited = [];
  for (var i = 0; i < this.nextPersonId; i++) {
    visited.push(false);
  }
  var person = this.gameState.groups["people"].getFirstAlive();
  this.depthFirstSearch(person, visited)

  var isNetworkComplete = true;
  for (var i = 0; i < visited.length; i++) {
    if (visited[i] === false) {
      isNetworkComplete = false;
      break;
    }
  }
  return isNetworkComplete;
};

SmallWorld.SocialNetwork.prototype.depthFirstSearch = function (person, visited) {
  visited[person.id] = true;

  person.friends.forEach(function(friend) {
    if (!visited[friend.id]) {
      this.depthFirstSearch(friend, visited);
    }
  }, this);
};
