//Obstacle1 prehabs
class Foot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, Phaser.Math.Between(0, game.config.width), game.config.height-800, 'Foot');
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityY(velocity);            // make it go!
        // this.clock = scene.time.delayedCall(4000, () =>{
        //     this.setVelocityY(velocity);
        // }, null, this);

        this.score = 5;
        this.hp = 1;
    }

    update() {
        // override physics sprite update()
        super.update();
        if (this.y < game.config.height-820){
            console.log("destoried")
            this.destroy();
        }
    }
}