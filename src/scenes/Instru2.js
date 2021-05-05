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
        this.add.text(centerX, centerY - 200, 'Goals:', instruConfig ).setOrigin(0.5);
        this.add.text(centerX, centerY - 140, 'Control the (Slug), adventure through (2 Stages)', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY -70, 'Diffrent (Stages) have some different (Enemies)', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use your (Mobility) to avoid (Enemies)', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY +70, 'Collecting (items) to restore (HP) or (Ammo)', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY+140, 'Survive as (Long) as you could, and collect much (Score) as possible', credit2Config).setOrigin(0.5);

        
        
        //type space to play
        this.add.text(centerX-200, 440, '[ Press (A) to Prev Page ]', creditConfig).setOrigin(0.5);
        this.add.text(centerX+200, 440, '[ Press (D) to Next Page ]', creditConfig).setOrigin(0.5);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(){
        //scroll the background
        this.background.tilePositionX += 1;

        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("instruScene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("instruScene3");
        }
    }
}