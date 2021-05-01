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
        this.load.image('city','cities.png');
        this.load.image('block', 'block.png',{
            frameWideth:25, 
            frameHeight:27
        });
        this.load.image([
            { key: 'ground' },
            { key: 'object1' },
            { key: 'Object2' },
            { key: 'Cactus' },
            { key: 'Obstacle1' },
        ]);

        //load sounds
        this.load.path = './assets/audio/';
        this.load.audio('bgm', ['bgm2.mp3']);
        this.load.audio('background_music', 'endless runner.wav');
        this.load.audio('jump_music', 'jump1.wav');
        this.load.audio('death_music', 'dead1.wav');
        this.load.audio('kill_music', ['kill.mp3']);
        this.load.audio('spray_music', 'shoot2.wav');
        this.load.audio('pickup_music', 'Pickup.wav');
        this.load.audio('hit_music', 'hit.wav');
        
    }
    
    create() {
        playMusic = true;
        // nathan's code
        
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}