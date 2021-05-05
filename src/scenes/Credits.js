class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'forest').setOrigin(0.0);
        //UI and text
        let titleConfig = {
            fontFamily: 'Pangolin',
            fontSize: '32px',
            color: '#000000',
            align: 'right',
        }
        let text1Config = {
            fontFamily: 'Pangolin',
            fontSize: '24px',
            color: '#000000',
            align: 'right',
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

        
        //add credits
        this.add.text(centerX, centerY-220, 'Game Designer:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY-180, 'Yufeng Xie,  Larry Li,  Jiaying Hou', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY/3+30, 'Programmer:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY/3+70, 'Yufeng Xie,  Larry Li', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY-40, 'Sound Effect:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Larry Li', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY+45, 'Art:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+85, 'Jiaying Hou', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY+130, 'Music:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+170, 'Jiaying Hou', text1Config).setOrigin(0.5);
        
        //type space to play
        this.add.text(centerX, centerY+210, '[ Press (SPACE) to Return ]', creditConfig).setOrigin(0.5);
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