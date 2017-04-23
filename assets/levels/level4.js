var SmallWorld = SmallWorld || {};

SmallWorld.Level4 = {};

SmallWorld.Level4.setup = function (gameState) {
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 205, y: 205},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 5
    }
  ));

  gameState.addPerson({x: 125, y: 200});
  gameState.addComputer({x: 138, y: 222});
  gameState.addComputer({x: 310, y: 148});
  gameState.addPerson({x: 320, y: 330});
  gameState.addComputer({x: 300, y: 350});
};
