import Phaser, { Scene } from "phaser";

class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene) {

        var x = scene.player.x;
        var y = scene.player.y;

        super(scene, x, y, "beam");
        scene.projectiles.add(this);
    }
}

export default Beam;