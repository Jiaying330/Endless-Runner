class Instru extends Phaser.Scene{
    constructor(){
        super("instruScene");
    }
    

    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, 800, 480, 'forest').setOrigin(0.0);
        //UI and text
        let instruConfig = {
            color: '#000000',
            fontFamily: 'Pangolin',
            fontSize: '22px',
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
        this.add.text(centerX, 40, 'Instruction', {color: '#000000', fontSize: '32px', strokeThickness: 5}).setOrigin(0.5);
        // this.add.image(centerX/4, 90, 'mask').setScale(1.5).setOrigin(0.5);
        // this.add.text(centerX - 80, 90, 'Mask will +1 hp & +5 points', instruConfig).setOrigin(0.5);
        // this.add.image(centerX/4, 140, 'alcohol').setScale(1.5).setOrigin(0.5);
        // this.add.text(centerX+60, 140, 'Collect Alcohol to kill Virus & +1 points, MAX: 5', instruConfig).setOrigin(0.5);
        // this.add.image(centerX/4, 190, 'sanitizer').setScale(1.5).setOrigin(0.5);
        // this.add.text(centerX- 50, 190, 'Sanitizer will +1 hp & +5 points', instruConfig).setOrigin(0.5);
        // this.add.image(centerX/4, 240, 'virus2').setScale(1.5).setOrigin(0.5);
        // this.add.text(centerX+15, 240, 'Virus-A will -2 hp OR +5 points if killed ', instruConfig).setOrigin(0.5);
        // this.add.image(centerX/4, 300, 'virus1').setScale(1.5).setOrigin(0.5);
        // this.add.text(centerX+15, 300, 'Virus-B will -4 hp OR +10 points if killed', instruConfig).setOrigin(0.5);
        this.add.text(centerX, 360, '(A) & (D) to move, (S) to crouch, (Space) to Jump', credit2Config).setOrigin(0.5);
        this.add.text(centerX, 390, 'Mouse to aim (Left Button) to shoot', credit2Config).setOrigin(0.5);
        
        //type space to play
        this.add.text(centerX, 420, '[ Press (SPACE) to Return ]', creditConfig).setOrigin(0.5);
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