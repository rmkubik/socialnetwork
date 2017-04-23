var SmallWorld = SmallWorld || {};

SmallWorld.Level2 = {};

SmallWorld.Level2.setup = function (gameState) {
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 110, y: 150},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 3
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 175, y: 150},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 4
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 280, y: 280},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 5
    }
  ));

  gameState.addPerson({x: 125, y: 140});
  gameState.addPerson({x: 155, y: 330});
};
