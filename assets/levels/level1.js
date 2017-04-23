var SmallWorld = SmallWorld || {};

SmallWorld.Level1 = {};

SmallWorld.Level1.setup = function (gameState) {
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 130, y: 130},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 0
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 270, y: 85},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 1
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 270, y: 280},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 2
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 120, y: 280},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 3
    }
  ));
  gameState.groups["borders"].add(new SmallWorld.Boundary(gameState, {x: 190, y: 280},
    {
      width: 75,
      height: 75,
      texture: "img_terrain",
      frame: 4
    }
  ));
  gameState.addComputer({x: 234, y: 138});
  gameState.addPerson({x: 150, y: 240});
  gameState.addPerson({x: 275, y: 255});
};
