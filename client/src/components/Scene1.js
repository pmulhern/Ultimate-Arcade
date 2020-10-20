import Phaser, { Scene } from "phaser";

class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload() { 
    this.load.image("background", "/src/assets/images/background.jpg   ");
    this.load.spritesheet("ship", "/src/assets/spritesheets/ship.png",{
      frameWidth: 71,
      frameHeight: 85
    });
    this.load.spritesheet("ship2", "/src/assets/spritesheets/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "/src/assets/spritesheets/ship3.png",{
      frameWidth: 71,
      frameHeight: 113
    });
    this.load.spritesheet("explosion", "/src/assets/spritesheets/explosion.png",{
      frameWidth: 40,
      frameHeight: 40
    });
    this.load.spritesheet("power-up", "/src/assets/images/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "/src/assets/spritesheets/player.png",{
      frameWidth: 70,
      frameHeight: 113
    });
    this.load.spritesheet("beam", "/src/assets/spritesheets/beam.png",{
      frameWidth: 13 ,
      frameHeight: 28
    });
    this.load.bitmapFont('pixelFont', '/src/assets/font/font.png', '/src/assets/font/font.fnt');
    
    this.load.audio('audio_beam', '/src/assets/sounds/beam.ogg');
    this.load.audio('audio_explosion', '/src/assets/sounds/explosion.ogg');
    this.load.audio('audio_pickup', '/src/assets/sounds/pickup.ogg');
    this.load.audio('music', '/src/assets/sounds/sci-fi.ogg');
  }
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame")

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });
  }
}

export default Scene1;