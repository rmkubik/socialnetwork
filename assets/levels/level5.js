var SmallWorld = SmallWorld || {};

SmallWorld.Level5 = {};

SmallWorld.Level5.setup = function (gameState) {
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 116, y: 143},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 0
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 191, y: 139},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 2
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 295, y: 246},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 0
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 218, y: 242},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 6
    }
  ));

  gameState.addComputer({x: 126, y: 133});
  gameState.addPerson({x: 185, y: 140});
  gameState.addPerson({x: 210, y: 132});
  gameState.addPerson({x: 269, y: 354});
  gameState.addPerson({x: 321, y: 346});
  gameState.addComputer({x: 346, y: 354});
};
