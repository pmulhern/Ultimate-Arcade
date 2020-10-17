import Phaser, { Scene } from "phaser";
import { config } from "..";

class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    // uncomment code bellow to make background scroll
    // this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");

    this.background = this.add.image(0,0,"background");
    this.background.setOrigin(0,0);

    this.ship1 = this.add.sprite(this.game.config.width / 2 - 50, this.game.config.height / 2, "ship");
    this.ship2 = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "ship2");
    this.ship3 = this.add.sprite(this.game.config.width / 2 + 50, this.game.config.height / 2, "ship3");
    
    this.player = this.physics.add.sprite(this.game.config.width / 2 - 8, this.game.config.height - 64, "player");
    this.player.play("thrust");

    // assinn keys so player can move
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    // assign spacebar key so player can shoot (fire wheapon)
    this.spacbar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.add.text(20, 20, "Playing game", {font: "25px Areial", fill: "yellow"});

    this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();

    // Add multiple objects
    var maxObjects = 4;
    for (var i = 0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
       powerUp.setRandomPosition(0, 0, this.game.config.width, this.game.config.height);

      // set random animation
      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      // setVelocity
      powerUp.setVelocity(100, 100);
      // set boundaries
      powerUp.setCollideWorldBounds(true);
      // make power-ups bounce around screen
      powerUp.setBounce(1);
    }
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionY -= 0.5;
    
    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacbar)) {
      console.log("Fire!");
    }
}

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0)
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-200);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(200);
    } else {
      this.player.setVelocityY(0)
    }
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > this.game.config.height) {
        this.resetShipPos(ship);
    }
}

  resetShipPos(ship) {
      ship.y = 0;
      var randomX = Phaser.Math.Between(0, this.game.config.width);
      ship.x = randomX;
  }

  destroyShip(pointer, gameObject) {
      gameObject.setTexture("explosion");
      gameObject.play("explode");
  }
}

export default Scene2;