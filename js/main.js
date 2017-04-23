var SmallWorld = SmallWorld || {};

var game = new Phaser.Game(480, 480, Phaser.AUTO, "smallworld");
game.state.add("BootState", new SmallWorld.BootState());
game.state.add("LoadingState", new SmallWorld.LoadingState());
game.state.add("GameState", new SmallWorld.GameState());
game.state.start("BootState", true, false, "assets/game.json");
