import React, {useEffect} from "react";
import Phaser from "phaser";
import background from "../assets/images/background.jpg";
import player from "../assets/spritesheets/player.png";
import ship from "../assets/spritesheets/ship.png";
import ship3 from "../assets/spritesheets/ship3.png";
import Explosion from "../assets/spritesheets/explosion.png";
import explosionaudio from "../assets/sounds/explosion.ogg";
import beamaudio from "../assets/sounds/beam.ogg";
import font from "../assets/font/font.png";
import fnt from "../assets/font/font.fnt";
import pickup from "../assets/sounds/pickup.ogg";
import Beam from "./beam";
// import Explosion from "./explosion";

// ***PROBLEM FILES***
// import powerup from "../../assets/images/power-up.png";  Lines 43, 76, 189
// import ship2 from "../../assets/spritesheets/ship2.png";
// import music from "../../assets/sounds/sci-fi.ogg";

export const Game = () => {
  useEffect(() => {
    // Our game scene
    // var scene = new Phaser.Scene("game");

    const config = {
      type: Phaser.AUTO,
    width: 1280,
    height: 720,
      backgrounColor: 0x00000,
      pixelArt: true,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
          debugShowVelocity: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        // pickPowerUp: pickPowerUp,
        // hurtPlayer: hurtPlayer,
        // resetPlayer: resetPlayer,
        // hitEnemy: hitEnemy,
        // zeroPad: zeroPad,
        update: update,
      },
      scale: { parent: 'mygame', autoCenter: Phaser.Scale.CENTER_BOTH }
    };

    // Create the game with our config values
    // this will also inject our canvas element into the HTML source
    // for us
    var game = new Phaser.Game(config);

    function preload() {
      this.load.image("background", background);
      this.load.spritesheet("ship", ship, {
        frameWidth: 71,
        frameHeight: 85,
      });
      // this.load.spritesheet("ship2", ship2,{
      //   frameWidth: 32,
      //   frameHeight: 16
      // });
      this.load.spritesheet("ship3", ship3, {
        frameWidth: 71,
        frameHeight: 113,
      });
      this.load.spritesheet("explosion", Explosion, {
        frameWidth: 40,
        frameHeight: 40,
      });
      // this.load.spritesheet("power-up", powerup,{
      //   frameWidth: 16,
      //   frameHeight: 16
      // });
      this.load.spritesheet("player", player, {
        frameWidth: 70,
        frameHeight: 113,
      });

      // ***THIS CODE CAUSE THE SCREEN TO GO BLACK
      // this.load.spritesheet("beam", beam,{
      //   frameWidth: 13 ,
      //   frameHeight: 28
      // });
      this.load.bitmapFont("pixelFont", font, fnt);

      this.load.audio("audio_beam", beamaudio);
      this.load.audio("audio_explosion", explosionaudio);
      this.load.audio("audio_pickup", pickup);
      // ***Music not defined - PJM comment out
      // this.load.audio('music', music);
    }

    function create() {
      this.add.text(20, 20, "Loading game...");
      // this.scene.start("playGame")
      this.background = this.add.image(0, 0, "background");
      this.background.setOrigin(0, 0);
      this.player = this.physics.add.sprite(
        this.game.config.width / 2 - 8,
        this.game.config.height - 64,
        "player"
      );
      this.player.play("thrust");
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.player.setCollideWorldBounds(true);
      this.spacbar = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
      this.projectiles = this.add.group();
      this.ship1 = this.add.sprite(
        this.game.config.width / 2 - 125,
        this.game.config.height / 3,
        "ship"
      );
      // this.ship2 = this.add.sprite(this.game.config.width / 2 + 100, this.game.config.height / 6, "ship2");
      this.ship3 = this.add.sprite(
        this.game.config.width / 2 + 200,
        this.game.config.height / 9,
        "ship3"
      );
      this.enemies = this.physics.add.group();
      this.enemies.add(this.ship1);
      // this.enemies.add(this.ship2);
      this.enemies.add(this.ship3);

// ANIMATION STARTS HERE
      this.anims.create({
        key: "ship1_anim",
        frames: this.anims.generateFrameNumbers("ship"),
        frameRate: 20,
        repeat: -1,
      });
      // this.anims.create({
      //   key: "ship2_anim",
      //   frames: this.anims.generateFrameNumbers("ship2"),
      //   frameRate: 20,
      //   repeat: -1
      // });
      this.anims.create({
        key: "ship3_anim",
        frames: this.anims.generateFrameNumbers("ship3"),
        frameRate: 20,
        repeat: -1,
      });
      this.anims.create({
        key: "explode",
        frames: this.anims.generateFrameNumbers("explosion"),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true,
      });
      this.anims.create({
        key: "red",
        frames: this.anims.generateFrameNumbers("power-up", {
          start: 0,
          end: 1,
        }),
        frameRate: 20,
        repeat: -1,
      });
      this.anims.create({
        key: "gray",
        frames: this.anims.generateFrameNumbers("power-up", {
          start: 2,
          end: 3,
        }),
        frameRate: 20,
        repeat: -1,
      });
      this.anims.create({
        key: "thrust",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 20,
        repeat: -1,
      });
      this.anims.create({
        key: "beam_anim",
        frames: this.anims.generateFrameNumbers("beam"),
        frameRate: 20,
        repeat: -1,
      });
// ANIMATION ENDS HERE

      this.ship1.play("ship1_anim");
      // this.ship2.play("ship2_anim");
      this.ship3.play("ship3_anim");
      this.ship1.setInteractive();
      // this.ship2.setInteractive();
      this.ship3.setInteractive();
      this.physics.world.setBoundsCollision();
      // this.input.on('gameobjectdown', this.destroyShip, this);
      this.powerUps = this.physics.add.group();
      var maxObjects = 4;
      for (var i = 0; i <= maxObjects; i++) {
        var powerUp = this.physics.add.sprite(16, 16, "power-up");
        this.powerUps.add(powerUp);
        powerUp.setRandomPosition(
          0,
          0,
          this.game.config.width,
          this.game.config.height
        );

        // set random animation
        // if (Math.random() > 0.5) {
        //   powerUp.play("red");
        // } else {
        //   powerUp.play("gray");
        // }

        // setVelocity
        powerUp.setVelocity(100, 100);
        // set boundaries
        powerUp.setCollideWorldBounds(true);
        // make power-ups bounce around screen
        powerUp.setBounce(1);
      }
      this.physics.add.collider(this.projectiles, this.powerUps, function (
        projectile,
        powerUp
      ) {
        projectile.destroy();
      });
      this.physics.add.overlap(
        this.player,
        this.powerUps,
        this.pickPowerUp,
        null,
        this
      );
      this.physics.add.overlap(
        this.player,
        this.enemies,
        this.hurtPlayer,
        null,
        this
      );
      this.physics.add.overlap(
        this.projectiles,
        this.enemies,
        this.hitEnemy,
        null,
        this
      );
      var graphics = this.add.graphics();
      graphics.fillStyle("Black");
      graphics.fillRect(0, 0, config.width, 20);
      this.score = 0;
      this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);
      this.beamSound = this.sound.add("audio_beam");
      this.explosionSound = this.sound.add("audio_explosion");
      this.pickupSound = this.sound.add("audio_pickup");
      // this.music = this.sound.add("music");
      var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0,
      };
      // this.music.play(musicConfig);
    }

    function update() {
      this.hurtPlayer = function (player, enemy) {
        this.resetShipPos(enemy);

        if (this.player.alpha < 1) {
          return;
        }

        // spawn a explosion animation
        var explosion = new Explosion(this, player.x, player.y);

        // disable the player and hide it
        player.disableBody(true, true);

        // after a time enable the player again
        this.time.addEvent({
          delay: 1000,
          callback: this.resetPlayer,
          callbackScope: this,
          loop: false,
        });

        this.explosionSound.play();
      };

      this.resetPlayer = function () {
        // enable the player again
        var x = config.width / 2 - 8;
        var y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);

        // make the player transparent to indicate invulnerability
        this.player.alpha = 0.5;

        // move the ship from outside the screen to its original position
        var tween = this.tweens.add({
          targets: this.player,
          y: config.height - 64,
          ease: "Power1",
          duration: 1500,
          repeat: 0,
          onComplete: function () {
            this.player.alpha = 1;
          },
          callbackScope: this,
        });
      };

      this.zeroPad = function (number, size) {
        var stringNumber = String(number);
        while (stringNumber.length < (size || 2)) {
          stringNumber = "0" + stringNumber;
        }
        return stringNumber;
      };

      this.hurtPlayer = function (player, enemy) {
        this.resetShipPos(enemy);

        if (this.player.alpha < 1) {
          return;
        }

        // spawn a explosion animation
        var explosion = new Explosion(this, player.x, player.y);

        // disable the player and hide it
        player.disableBody(true, true);

        // after a time enable the player again
        this.time.addEvent({
          delay: 1000,
          callback: this.resetPlayer,
          callbackScope: this,
          loop: false,
        });

        this.explosionSound.play();
      };

      this.pickPowerUp = function (player, powerUp) {
        powerUp.disableBody(true, true);

        this.pickupSound.play();
      };

      this.hitEnemy = function (projectile, enemy) {
        var explosion = new Explosion(this, enemy.x, enemy.y);

        projectile.destroy();
        this.resetShipPos(enemy);
        this.score += 15;

        var scoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE " + scoreFormated;

        this.explosionSound.play();
      };

      this.resetShipPos = function (ship) {
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, this.game.config.width);
        ship.x = randomX;
      };
      this.moveShip = function (ship, speed) {
        ship.y += speed;
        if (ship.y > this.game.config.height) {
          this.resetShipPos(ship);
        }
      };
      this.moveShip(this.ship1, 1);
      // this.moveShip(this.ship2, 2);
      this.moveShip(this.ship3, 3);

      this.movePlayerManager = function () {
        if (this.cursorKeys.left.isDown) {
          this.player.setVelocityX(-200);
        } else if (this.cursorKeys.right.isDown) {
          this.player.setVelocityX(200);
        } else {
          this.player.setVelocityX(0);
        }

        if (this.cursorKeys.up.isDown) {
          this.player.setVelocityY(-200);
        } else if (this.cursorKeys.down.isDown) {
          this.player.setVelocityY(200);
        } else {
          this.player.setVelocityY(0);
        }
      };
      this.movePlayerManager();

      this.background.tilePositionY -= 0.5;

      if (Phaser.Input.Keyboard.JustDown(this.spacbar)) {
        if (this.player.active) {
          this.shootBeam();
        }
        console.log("Fire!");
      }

      /* this code will iterate through each element of the projectile group to update all the beams */
      for (var i = 0; i < this.projectiles.getChildren().length; i++) {
        var beam = this.projectiles.getChildren()[i];
        beam.update();
      }

      // This causes React to error out
      this.shootBeam = function () {
        // var beam = new Beam(this);
        this.beamSound.play();
      };

      this.destroyShip = function (pointer, gameObject) {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
      };
    }

    return function cleanup() {
      console.log("clean");
      console.log(game);
      game.destroy(true);
    };
  });
  // return <div className="Game"></div>;
  return Game;
};