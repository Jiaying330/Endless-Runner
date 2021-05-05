//Obstacle1 prehabs
class Car extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + Phaser.Math.Between(game.config.width, game.config.width * 2), game.config.height - tileSize - 185, 'Car');
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);
        this.setSize(0, this.y + 50, false)
        this.score = 20;
        this.hp = 6;
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();
        if (this.x < -this.width) {
            this.destroy();
        }
    }
}