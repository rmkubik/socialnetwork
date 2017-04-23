var SmallWorld = SmallWorld || {};

SmallWorld.Level3 = {};

SmallWorld.Level3.setup = function (gameState) {
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 110, y: 150},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 3
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 110, y: 225},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 4
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 285, y: 235},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 2
    }
  ));

  gameState.addPerson({x: 125, y: 140});
  gameState.addComputer({x: 155, y: 330});
};
