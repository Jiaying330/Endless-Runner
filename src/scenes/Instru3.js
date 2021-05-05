class Instru3 extends Phaser.Scene {
    constructor() {
        super("instruScene3");
    }

    create() {
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'forest').setOrigin(0.0);
        //UI and text
        let instruConfig = {
            color: '#000000',
            fontFamily: 'Pangolin',
            fontSize: '42px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        let creditConfig = {
            color: '#CD00CD',
            fontFamily: 'Pangolin',
            fontSize: '22px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }

        let credit2Config = {
            color: '#000000',
            fontFamily: 'Pangolin',
            fontSize: '24px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        //add instructions
        this.add.text(centerX, centerY - 200, 'Objects:', instruConfig).setOrigin(0.5);
        this.add.text(centerX - 225, centerY - 150, 'Slug:', credit2Config).setOrigin(0.5);
        this.add.image(centerX - 160, 80, 'character').setScale(0.7).setOrigin(0.5);
        this.add.text(centerX, centerY - 150, 'Health: Start 10, Cap 10', credit2Config).setOrigin(0.5);

        this.add.text(centerX - 225, centerY - 120, 'Weapon:', credit2Config).setOrigin(0.5);
        this.add.image(centerX - 145, 125, 'weapon').setScale(2.0).setOrigin(0.5);
        this.add.text(centerX, centerY - 120, 'Damage: 1 per bullet  ', credit2Config).setOrigin(0.5);

        this.add.text(centerX - 225, centerY - 90, 'Mole:', credit2Config).setOrigin(0.5);
        this.add.image(centerX - 155, 150, 'mole').setScale(0.5).setOrigin(0.5);
        this.add.text(centerX, centerY - 90, 'Health: 2, Damage: 2 ', credit2Config).setOrigin(0.5);

        this.add.text(centerX - 225, centerY - 60, 'Fox:', credit2Config).setOrigin(0.5);
        this.add.image(centerX - 155, 180, 'fox').setScale(0.5).setOrigin(0.5);
        this.add.text(centerX, centerY - 60, 'Health: 1, Damage: 2 ', credit2Config).setOrigin(0.5);

        this.add.text(centerX - 225, centerY - 30, 'Crow:', credit2Config).setOrigin(0.5);
        this.add.image(centerX - 155, 210, 'crow').setScale(0.5).setOrigin(0.5);
        this.add.text(centerX, centerY - 30, 'Health: 1, Damage: 2 ', credit2Config).setOrigin(0.5);

        this.add.text(centerX - 250, centerY, 'Human Foot:', credit2Config).setOrigin(0.5);
        this.add.image(centerX - 155, 245, 'Foot').setScale(0.08).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Health: inf, Damage: 4 ', credit2Config).setOrigin(0.5);

        this.add.text(centerX-225, centerY + 30, 'Car:', credit2Config).setOrigin(0.5);
        this.add.image(centerX - 155, 280, 'car').setScale(0.05).setOrigin(0.5);
        this.add.text(centerX, centerY + 30, 'Health: inf, Damage: 6 ', credit2Config).setOrigin(0.5);


        this.add.text(centerX, centerY + 80, 'Items:', instruConfig).setOrigin(0.5);
        this.add.text(centerX-225, centerY + 120, 'Ammo:', credit2Config).setOrigin(0.5);
        this.add.image(centerX - 135, 360, 'gun').setScale(0.7).setOrigin(0.5);
        this.add.text(centerX, centerY + 120, 'get 3 bullets ', credit2Config).setOrigin(0.5);

        this.add.text(centerX-225, centerY + 150, 'Mashrooms:', credit2Config).setOrigin(0.5);
        this.add.image(centerX - 125, 395, 'mushroom').setScale(0.7).setOrigin(0.5);
        this.add.text(centerX, centerY + 150, 'restore 2 health ', credit2Config).setOrigin(0.5);


        //type space to play
        this.add.text(centerX - 200, 440, '[ Press (A) to Prev Page ]', creditConfig).setOrigin(0.5);
        this.add.text(centerX + 200, 440, '[ Press (SPACE) to Menu ]', creditConfig).setOrigin(0.5);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    }

    update() {
        //scroll the background
        this.background.tilePositionX += 1;

        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("instruScene2");
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("menuScene");
        }
    }
}