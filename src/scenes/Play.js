class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.Speedup = 0;
        this.virusSpeedup = 0;
        this.physics.world.gravity.y = 2600;
        this.itemSpeed1 = -400;
        this.itemSpeed2 = -480;
        this.itemSpeed3 = -530;
        this.virus1Speed = -100;
        this.virus2Speed = -500;
        score = 0;
        level = 0;
        health = 1;
        Gameover = false;
        this.levelup = true;
        this.addSpeed = 0;
        this.levelSpeed = 0;
        this.level2Speed = 0;

        // add tile sprite
        this.background = this.add.tileSprite(0, 3, game.config.width, game.config.height, 'background').setOrigin(0);
        this.city = this.add.tileSprite(0,0, game.config.width, game.config.height, 'city').setOrigin(0);

        // make ground tiles group
        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height - tileSize, game.config.width, tileSize, 'ground').setOrigin(0);

        // set up character
        this.character = this.physics.add.sprite(120, game.config.height - tileSize, 'character').setScale(SCALE).setOrigin(1);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // add physics collider
        this.physics.add.collider(this.character, this.ground);

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });

        //add items
        this.maskGroup = this.add.group({
            runChildUpdate: true
        });
        this.sanitizerGroup = this.add.group({
            runChildUpdate: true
        });

        //add virus
        this.virus1Group = this.add.group({
            runChildUpdate: true
        });
        this.virus2Group = this.add.group({
            runChildUpdate: true
        });

        //ADD text
        this.HealthText = this.add.text(10, 10, `Health: ${health}`, {
            //backgroundColor: '#000000',
            fontFamily: 'Helvetica',
            fontSize: '30px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3
        });
        this.ScoreText = this.add.text(600, 10, `Score: ${score}`, {
            //backgroundColor: '#000000',
            fontFamily: 'Helvetica',
            fontSize: '30px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3
        });

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    //add items
    addMask() {
        let mask = new Object1(this, this.itemSpeed1).setScale(1.5);
        this.maskGroup.add(mask);
    }
    addSanitizer() {
        let sanitizer = new Object2(this, this.itemSpeed2).setScale(1.5);
        this.sanitizerGroup.add(sanitizer);
    }
    //add virus
    addVirus1() {
        let virus1 = new Cactus(this, this.virus1Speed).setScale(1.0);
        this.virus1Group.add(virus1);
    }
    addVirus2() {
        let virus2 = new Obstacle1(this, this.virus2Speed).setScale(1.1);
        this.virus2Group.add(virus2);
    }

    update() {

        // update tile sprites (tweak for more "speed")
        this.background.PositionX += 0.5;
        this.city.tilePositionX += 1;
        this.groundScroll.tilePositionX += 1;
        this.background.tilePositionX += 3;
        //check game
        if (!Gameover) {
            // check if character is grounded
            this.character.isGrounded = this.character.body.touching.down;
            // if so, we have jumps to spare
            if (this.character.isGrounded) {
                this.jumps = this.MAX_JUMPS;
                this.jumping = false;
                this.character.body.x = this.character.body.x;
                // this.character.body.velocity.x = -100;
            }

            // Move to the left
            if (keyLEFT.isDown && this.character.body.x >=  10) {
                this.character.body.x -= 6;
            }
            // Move to the right
            if (keyRIGHT.isDown && this.character.body.x <= 730) {
                this.character.body.x += 6;
            }

            // allow steady velocity change up to a certain key down duration
            if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.space, 40)) {
                this.character.body.x = this.character.body.x;
                this.character.body.velocity.y = this.JUMP_VELOCITY*1.2;
                this.jumping = true;
                this.sound.play('jump_music', { volume: 0.2, rate: 0.4 });
            }
            // finally, letting go of the UP key subtracts a jump
            if (this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.space)) {
                this.character.body.x = this.character.body.x;
                this.jumps--;
                this.jumping = false;
            }
        }
        //if not death,
        if (health > 0) {
            if (this.physics.overlap(this.character, this.virus1Group)) {
                this.virus1 = this.virus1Group.getFirst(true);
                this.virus1.destroy();
                this.virusCollision(this.virus1);
                //this.addVirus1();
                console.log("readd virus1");
            }
            if (this.physics.overlap(this.character, this.virus2Group)) {
                this.virus2 = this.virus2Group.getFirst(true);
                this.virus2.destroy();
                this.virusCollision(this.virus2);
                console.log("readd virus2");
            }
            if (this.physics.overlap(this.character, this.maskGroup)) {
                this.mask = this.maskGroup.getFirst(true);
                this.mask.destroy();
                this.itemCollision(this.mask);
            }
            if (this.physics.overlap(this.character, this.sanitizerGroup)) {
                this.sanitizer = this.sanitizerGroup.getFirst(true);
                this.sanitizer.destroy();
                this.itemCollision(this.sanitizer);
            }
        } else if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(this.level);
        } else if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            this.scene.start('menuScene');
        }
    }

    levelBump() {
        level++;
        //make game start easy to hard
        if (level % 60 == 0) {
            this.addSpeed = 0;
            this.levelSpeed = 0;
        } else {
            if (level % 10 == 0) {
                this.addSpeed++;
                if (this.levelSpeed < 4) {
                    this.levelSpeed++;
                }
                if (this.level2Speed < 3) {
                    this.level2Speed++;
                }
            }
        }
        if (level % (5 + this.addSpeed) == 0) { this.addMask(); }
        if (level % (7 + this.addSpeed) == 0) { this.addSanitizer(); }
        if (level % (5 - this.levelSpeed) == 0) { this.addVirus1(); }
        if (level % (4 - this.level2Speed) == 0) { this.addVirus2(); }
    }

    itemCollision(item) {
        this.sound.play("pickup_music", { volume: 0.2 });
        score += item.score;
        if (health < 10) {
            health += item.hp;
            this.HealthText.setText('Health: ' + health);
        }
        this.ScoreText.setText('Score: ' + score);

    }

    virusCollision(item) {
        if (health - item.hp <= 0) {
            Gameover = true;
            this.sound.play("death_music", { volume: 0.2 });
            this.character.destroy();
            this.GameOver();
            health -= item.hp;
        } else {
            this.sound.play("hit_music", { volume: 0.1 });
            health -= item.hp;
            this.HealthText.setText('Health: ' + health);
        }

    }

    GameOver() {
        this.virus1Group.clear();
        this.virus2Group.clear();
        this.maskGroup.clear();
        this.sanitizerGroup.clear();
        this.HealthText.destroy();
        this.ScoreText.destroy();
        // check for high score in local storage
        if (localStorage.getItem('highScore') != null) {
            let storedScore = parseInt(localStorage.getItem('highScore'));
            // see if current score is higher than stored score
            if (score > storedScore) {
                localStorage.setItem('highScore', score.toString());
                highScore = score;
                newHighScore = true;
            } else {
                highScore = parseInt(localStorage.getItem('highScore'));
                newHighScore = false;
            }
        } else {
            highScore = score;
            localStorage.setItem('highScore', highScore.toString());
            newHighScore = true;
        }
        // Prints out New HighScore!
        if (newHighScore) {
            this.newHighScoreText = this.add.text(centerX, centerY - 10, `Congratulation! New Hi-Score!!`, {
                backgroundColor: '#000000',
                fontFamily: 'Helvetica',
                fontSize: '40px',
                color: '#CD00CD',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);
        }
        this.add.text(centerX, centerY - 160, `You ran for: ${level}S`, {
            backgroundColor: '#000000',
            fontFamily: 'Helvetica',
            fontSize: '34px',
            color: '#CD00CD',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 120, `You score is: ${score}`, {
            backgroundColor: '#000000',
            fontFamily: 'Helvetica',
            fontSize: '34px',
            color: '#CD00CD',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
        this.add.text(centerX, centerY - 80, `Your Hi-Score: ${highScore}`, {
            backgroundColor: '#000000',
            fontFamily: 'Helvetica',
            fontSize: '34px',
            color: '#CD00CD',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.clock = this.time.delayedCall(4000, () => {
            if (newHighScore) { this.newHighScoreText.destroy(); }
            this.add.text(centerX, centerY - 40, `Press (R) to restart the game.`, {
                backgroundColor: '#000000',
                fontFamily: 'Helvetica',
                fontSize: '34px',
                color: '#CD00CD',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);
            this.add.text(centerX, centerY + 3, `Press (Q) to go back to main menu.`, {
                backgroundColor: '#000000',
                fontFamily: 'Helvetica',
                fontSize: '34px',
                color: '#CD00CD',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);
        }, null, this);
    }
}