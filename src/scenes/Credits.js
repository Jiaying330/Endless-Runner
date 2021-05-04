class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'forest').setOrigin(0.0);
        console.log("Here");
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
        let text2Config = {
            fontFamily: 'Courier',
            fontSize: '22px',
            color: '#000000',
            align: 'right',
        }
        let creditConfig = {
            color: '#CD00CD',
            fontFamily: 'Courier',
            fontSize: '22px',
            stroke: '#FFFFFF', 
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }

        
        //add credits
        this.add.text(centerX-280, centerY-220, 'Game Designer:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY-220, 'Yufeng Xie,  Larry Li,  Jiaying Hou', text1Config).setOrigin(0.5);

        this.add.text(centerX-294, centerY/3, 'Programmer:', titleConfig).setOrigin(0.5);
        this.add.text(centerX-60, centerY/3, 'Yufeng Xie,  Larry Li', text1Config).setOrigin(0.5);

        // this.add.text(centerX/4, centerY/3, 'Sound Effect:', titleConfig).setOrigin(0.5);
        // this.add.text(centerX/2, centerY-100, 'Larry Li', text1Config).setOrigin(0.5);

        // this.add.text(centerX/4, centerY/3, 'Art:', titleConfig).setOrigin(0.5);
        // this.add.text(centerX/2, centerY-100, 'Jiaying Hou', text1Config).setOrigin(0.5);

        // this.add.text(centerX/4, centerY, 'Music:', titleConfig).setOrigin(0.5);
        // this.add.text(centerX, centerY+55, 'Jiaying Hou', text1Config).setOrigin(0.5);
        
        //type space to play
        this.add.text(centerX, centerY+160, '[ Press (SPACE) to Return ]', creditConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        //scroll the background
        this.background.tilePositionX += 1;
    
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start("menuScene");
        }
    }
}