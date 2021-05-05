class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'forest').setOrigin(0.0);

        //UI
        let menuConfig = {
            fontFamily: 'Pangolin',
            fontSize: '175px',
            color: '#FFFF00',
            stroke: '#99BF0D',
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

        // Get the key
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


        this.add.text(centerX, centerY -100, 'Slug Run!', menuConfig).setOrigin(0.5);
        let menu1Config = { fontFamily: 'Pangolin', fontSize: '40px', color: '#000000', stroke: '#FFFFFF', strokeThickness: 3, padding: { top: 5, bottom: 5, }, fixedWidth: 0 }
        this.add.text(centerX, centerY + 60, 'Press (SPACE) to Start', menu1Config).setOrigin(0.5);
        menu1Config = { fontFamily: 'Pangolin', fontSize: '30px', color: '#000000', stroke: '#FFFFFF', strokeThickness: 3, padding: { top: 5, bottom: 5, }, fixedWidth: 0 }
        this.add.text(centerX, centerY + 170, 'Press (W) for Instruction', menu1Config).setOrigin(0.5);
        this.add.text(centerX, centerY + 210, 'Press (S) for Credit', menu1Config).setOrigin(0.5);
    }

    update() {
        //scroll the background
        this.background.tilePositionX += 1;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("instruScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("creditScene");
        }

    }
}
