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
            { key: 'car' },
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
        this.load.audio('jump_music', 'jump.mp3');
        this.load.audio('jump_music2', 'jump2.mp3');
        this.load.audio('death_music', 'dead.mp3');
        this.load.audio('pickup_music', 'pick.mp3');
        this.load.audio('hit_music', 'hit.mp3');
        this.load.audio('hit_music2', 'hit2.mp3');
        this.load.audio('select_music', 'select.mp3');
        this.load.audio('shoot_music', 'shoot.mp3');
        this.load.audio('foot_music', 'foot.mp3');
        this.load.audio('foot_music2', 'foot2.mp3');
        this.load.audio('crash_music', 'crash.mp3');
        this.load.audio('car_music', 'car.mp3');
        this.load.audio('eat_music', 'eat.mp3');
        this.load.audio('bgm', 'jiaying330 - slug.mp3');
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