class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        //load imgs
        this.load.path = './assets/img/';
        //load background
        this.load.image('background', 'Background.png');
        this.load.image('character', 'player.png');
        this.load.image('forest', 'forest.png');
        this.load.image('block', 'block.png', {
            frameWideth: 25,
            frameHeight: 27
        });
        
        this.load.image([
            { key: 'ground' },
            { key: 'object1' },
            { key: 'Object2' },
            { key: 'Cactus' },
            { key: 'Obstacle1' },
            { key: 'Car' },
            { key: 'weapon' },
            { key: 'crow' },
            { key: 'Foot' },
            { key: 'bullet' },
            { key: 'city' },
            { key: 'crouch_character' },
            { key: 'road_land' },
        ]);
        this.load.spritesheet('fox', 'fox.jpg', {
            frameWidth: 195,
            frameHeight: 114,
            starFrame: 0,
            endFrame: 5
          });

        //load sounds
        this.load.path = './assets/audio/';
        this.load.audio('jump_music', 'jump1.wav');
        this.load.audio('death_music', 'dead1.wav');
        this.load.audio('pickup_music', 'Pickup.wav');
        this.load.audio('hit_music', 'hit.wav');

    }

    create() {
        playMusic = true;
        // nathan's code

        if (window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}