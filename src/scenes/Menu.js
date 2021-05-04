class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'background').setOrigin(0.0);

        //UI
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#CD00CD',
            stroke: '#FFFFFF',
            strokeThickness: 5,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //menu text UI
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;

        // Get the key
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


        this.add.text(centerX, centerY - textSpacer, 'EndlessRunner(Demo)', menuConfig).setOrigin(0.5);
        let menu1Config = { fontFamily: 'Courier', fontSize: '32px', color: '#000000', stroke: '#FFFFFF', strokeThickness: 3, padding: { top: 5, bottom: 5, }, fixedWidth: 0 }
        this.add.text(centerX, centerY + textSpacer, 'Press (SPACE) to Start', menu1Config).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*2, 'Press (W) for Instruction', menu1Config).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*3, 'Press (S) for Credit', menu1Config).setOrigin(0.5);
    }

    update() {
        //scroll the background
        this.background.tilePositionX += 3;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            // playMusic = false;
            this.scene.start("instruScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            // playMusic = false;
            this.scene.start("creditScene");
        }

    }
}
