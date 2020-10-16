import Phaser, { Scene } from "phaser";

class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload() {
    this.load.image("background", "/src/assets/images/background.png");
    this.load.spritesheet("ship", "/src/assets/images/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "/src/assets/images/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "/src/assets/images/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "/src/assets/images/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
  }
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame")
  }
}

export default Scene1;
