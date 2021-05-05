class Instru2 extends Phaser.Scene{
    constructor(){
        super("instruScene2");
    }
    

    create(){
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
        this.add.text(centerX, centerY - 200, 'Characters:', instruConfig ).setOrigin(0.5);
        this.add.text(centerX, centerY - 150, 'Slug Origin Health: 5, up to 10', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY - 120, 'Weapon Damage: 1 per bullet  ', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY - 90, 'Mole Health: 2, Damage: 2 ', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY - 60, 'Fox Health: 1, Damage: 2 ', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY - 30, 'Crow Health: 1, Damage: 2 ', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY - 0, 'Human Foot Health: inf, Damage: 4 ', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY + 30, 'Car Health: inf, Damage: 6 ', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY + 80, 'Objects:', instruConfig ).setOrigin(0.5);
        this.add.text(centerX, centerY + 120, 'Ammo: get 3 bullets ', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY + 150, 'Mashrooms: restore 2 health ', credit2Config).setOrigin(0.5);
        
        
        //type space to play
        this.add.text(centerX, 440, '[ Press (SPACE) to Return ]', creditConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
    }

    update(){
        //scroll the background
        this.background.tilePositionX += 1;

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("menuScene");
        }
    }
}