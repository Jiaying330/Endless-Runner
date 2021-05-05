// Demo version(1.0)

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    // scale: {
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 230
            }
        }
    },
    scene: [Load, Menu, Play, Credits, Instru]
};

let game = new Phaser.Game(config);

//reserve keyboard variables
let keySPACE, keyUP, keyDOWN, keyF, keyR, keyQ, keyA, keyD, keyS, keyW;

//define Game Settings
game.settings = {
    initialLevel: 0,
    initialSpeed: 1,
}

// define globals
let cursors;
let currentScene = 0;
const SCALE = 1;
const tileSize = 27;
let playMusic;
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
const textSpacer = 50;
let level;
let score;
let count;
let scence;
let health;
let highScore;
let newHighScore = false;
let Gameover;
let bullets;
let input;
let Amo;
