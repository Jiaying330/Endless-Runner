let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Game]
}
let game = new Phaser.Game(config);

//set UI
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;
let score = 0;
let highScore = 0;
let twoPlayers = false;
let platforms;
let player;
let cursors;


//reserve ketboard bindings
let keyUP, keyR, keyLEFT, keyRIGHT, keyT, keyW, keyA, keyD;
