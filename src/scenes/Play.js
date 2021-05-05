class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

        // the weapons global variable
        this.bullets;
        input = this.input;
        this.moleHealth = 0;
    }

    create() {
        //create background music
        this.backgroundMusic = this.sound.add('bgm', { mute: false, volume: 0.5, rate: 1, loop: true });
        this.backgroundMusic.play();

        // Add the animations
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('anims_fox', {
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('slug', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'crouch',
            frames: this.anims.generateFrameNumbers('crouch_slug', {
                start: 0,
                end: 0,
                first: 0
            }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'anims_crow',
            frames: this.anims.generateFrameNumbers('crow_spirtSheet', {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'anims_Mole',
            frames: this.anims.generateFrameNumbers('anims_mole', {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 1,
            repeat: 2
        });
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 10
        });

        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.Speedup = 0;
        this.obstacleSpeedup = 0;
        this.physics.world.gravity.y = 2600;
        this.itemSpeed1 = -400;
        this.itemSpeed2 = -480;
        this.itemSpeed3 = -530;
        this.moleSpeed = -145;
        this.carSpeed = -700;
        this.foxSpeed = -500;
        score = 0;
        level = 0;
        count = 0;
        scence = 0;
        health = 10;
        Amo = 10;
        Gameover = false;
        this.levelup = true;
        this.addSpeed = 0;
        this.levelSpeed = 0;
        this.level2Speed = 0;

        // add tile sprite
        this.city = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'forest').setOrigin(0);

        // make ground tiles group
        this.ground = this.add.group();
        for (let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height - tileSize - 1, game.config.width, tileSize, 'ground').setOrigin(0);

        // set up character
        this.character = this.physics.add.sprite(120, game.config.height - tileSize, 'character').setScale(SCALE).setOrigin(1);
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
        this.mushroomGroup = this.add.group({
            runChildUpdate: true
        });
        this.gunGroup = this.add.group({
            runChildUpdate: true
        });

        //add enemies
        this.moleGroup = this.add.group({
            runChildUpdate: true
        });
        this.foxGroup = this.add.group({
            runChildUpdate: true
        });
        this.carGroup = this.add.group({
            runChildUpdate: true
        });
        this.footGroup = this.add.group({
            runChildUpdate: true
        });
        this.crowGroup = this.add.group({
            runChildUpdate: true
        });

        //ADD text
        this.HealthText = this.add.text(10, 10, `Health: ${health}`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#FF0000 ',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });
        this.ScoreText = this.add.text(600, 10, `Score: ${score}`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#E2ED42',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });
        this.AmoText = this.add.text(10, 445, `Ammo: ${Amo}`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#D90BC4',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });
        this.TimeText = this.add.text(300, 10, `Time: ${level}s`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#5A63E0',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //Add Weapon
        this.cannon = this.add.sprite(this.character.x, this.character.y - 30, 'weapon');
        //cannonball creation according to the cannon
        this.cannonball = this.physics.add.sprite(1000, 1000, 'bullet');
        this.mouse = this.input.mousePointer;
        this.worldBounds = this.physics.world.bounds;
    }

    //add items
    addMushroom() {
        let mushroom = new Mushroom(this, this.itemSpeed1).setScale(1.5);
        this.mushroomGroup.add(mushroom);
    }
    addGun() {
        let gun = new Gun(this, this.itemSpeed2).setScale(1.5);
        this.gunGroup.add(gun);
    }
    //add enemies
    addMole() {
        let mole = new Mole(this, this.moleSpeed).setScale(1.0);
        mole.anims.play('anims_Mole');
        this.moleGroup.add(mole);
    }
    addFox() {
        let fox = new Fox(this, this.foxSpeed).setScale(1.1);
        fox.anims.play('run');
        this.foxGroup.add(fox);
    }
    addCrow() {
        let crow = new Crow(this, this.itemSpeed1).setScale(1.5);
        crow.anims.play('anims_crow');
        this.crowGroup.add(crow);
    }
    addCar() {
        let car = new Car(this, this.carSpeed).setScale(1.0);
        this.carGroup.add(car);
        this.sound.play("car_music", { volume: 20.0 });
    }
    addFoot() {
        let foot = new Foot(this, 0).setScale(1.0);
        foot.body.setGravityY(-2300);
        this.physics.add.collider(foot, this.ground);
        this.time.delayedCall(3000, () => {
            if (typeof foot.body === 'undefined') {
            } else {
                foot.body.setVelocityY(-700);
            }
        }, null, this);
        this.footGroup.add(foot);
        this.time.delayedCall(1500, () => {
            this.sound.play("foot_music", { volume: 3.0 });
        }, null, this);
        this.time.delayedCall(2000, () => {
            this.cameras.main.shake(50);
        }, null, this);
    }

    update() {
        // update tile sprites (tweak for more "speed")
        this.city.tilePositionX += 1;
        this.groundScroll.tilePositionX += 1;
        this.cannon.x = this.character.x;
        this.cannon.y = this.character.y - 30;

        //check game
        if (!Gameover) {

            this.TimeText.setText('Time: ' + level + 's');


            // --------------------------- Shooting Function -------------------------------//
            //angle between mouse and ball
            let angle = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, this.input.x, this.input.y);
            //rotation cannon
            this.cannon.setRotation(angle);
            //mouse clicked
            if (this.mouse.isDown && this.control == false && Amo >= 1) {
                //for fire again
                this.cannonball = this.physics.add.sprite(this.character.x, this.character.y - 30, 'bullet');
                //move to mouse position 
                this.cannonball.body.setAllowGravity(false);
                // this.cannonball.body.allowGravity = false;
                this.physics.moveTo(this.cannonball, this.input.x, this.input.y, 800);
                this.control = true;
                this.sound.play("shoot_music", { volume: 5.0 });
                Amo -= 1;
                this.AmoText.setText('Ammo: ' + Amo);
            }
            //check world bounds
            if (this.cannonball.x > this.worldBounds.width || this.cannonball.y > this.worldBounds.height || this.cannonball.x < 0 || this.cannonball.y < 0) {
                this.control = false;
            }
            if (this.physics.overlap(this.cannonball, this.moleGroup)) {
                this.mole1 = this.moleGroup.getFirst(true);
                this.moleHealth++;
                if (this.moleHealth >= 2) {
                    score += this.mole1.score;
                    this.ScoreText.setText('Score: ' + score);
                    this.objExplode(this.mole1);
                    this.mole1.destroy();
                }
                this.cannonball.destroy();
                this.control = false;
                this.sound.play("hit_music", { volume: 6.0 });
            }
            if (this.physics.overlap(this.cannonball, this.foxGroup)) {
                this.fox1 = this.foxGroup.getFirst(true);
                score += this.fox1.score;
                this.ScoreText.setText('Score: ' + score);
                this.objExplode(this.fox1);
                this.fox1.destroy();
                this.cannonball.destroy();
                this.control = false;
                this.sound.play("hit_music", { volume: 6.0 });
            }
            if (this.physics.overlap(this.cannonball, this.mushroomGroup)) {
                this.mushroom1 = this.mushroomGroup.getFirst(true);
                this.objExplode(this.mushroom1);
                this.mushroom1.destroy();
                this.cannonball.destroy();
                this.control = false;
                this.itemCollision(this.mushroom1);
            }
            if (this.physics.overlap(this.cannonball, this.gunGroup)) {
                this.gun1 = this.gunGroup.getFirst(true);
                this.objExplode(this.gun1);
                this.gun1.destroy();
                this.cannonball.destroy();
                Amo += 3;
                this.AmoText.setText('Ammo: ' + Amo);
                this.control = false;
                this.itemCollision(this.gun1);
            }
            if (this.physics.overlap(this.cannonball, this.crowGroup)) {
                this.crow = this.crowGroup.getFirst(true);
                score += this.crow.score;
                this.ScoreText.setText('Score: ' + score);
                this.objExplode(this.crow);
                this.crow.destroy();
                this.cannonball.destroy();
                this.control = false;
                this.sound.play("hit_music", { volume: 6.0 });
            }
            // --------------------------- Shooting Function -------------------------------//


            // --------------------------- Character Movement -------------------------------//
            // check if character is grounded
            this.character.isGrounded = this.character.body.touching.down;
            // if so, we have jumps to spare
            if (this.character.isGrounded) {
                this.jumps = this.MAX_JUMPS;
                this.jumping = false;
                this.character.body.x = this.character.body.x;
            }
            // this.character.anims.play('move', true);

            // Move to the left
            if (keyA.isDown && this.character.body.x >= 10) {
                if (!keyS.isDown) {
                    this.character.anims.play('move', true);
                }
                this.character.body.x -= 6;
            }
            // Move to the right
            if (keyD.isDown && this.character.body.x <= 730) {
                if (!keyS.isDown) {
                    this.character.anims.play('move', true);
                }
                this.character.body.x += 6;
            }
            // Character Crouching 
            if (this.character.body.touching.down) {
                if (keyS.isDown) {

                    this.character.anims.play('crouch', true);

                    this.character.setY(game.config.height - tileSize);

                    this.character.setCollideWorldBounds(true);
                }
            }
            if (keyS.isUp) {
                this.character.anims.play('move', true);
            }
            // allow steady velocity change up to a certain key down duration
            if (this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.space, 40)) {
                this.character.body.x = this.character.body.x;
                this.character.body.velocity.y = this.JUMP_VELOCITY * 1.2;
                this.jumping = true;
                this.sound.play('jump_music', { volume: 0.1 });
            }
            // finally, letting go of the UP key subtracts a jump
            if (this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.space)) {
                this.character.body.x = this.character.body.x;
                this.jumps--;
                this.jumping = false;
            }
            // --------------------------- Character Movement -------------------------------//
        }

        //if not death, collision with characters
        if (health > 0) {
            if (this.physics.overlap(this.character, this.moleGroup)) {
                this.mole1 = this.moleGroup.getFirst(true);
                this.mole1.destroy();
                this.obstacleCollision(this.mole1);
                // console.log("hit mit");
            }
            if (this.physics.overlap(this.character, this.foxGroup)) {
                this.fox1 = this.foxGroup.getFirst(true);
                this.fox1.destroy();
                this.obstacleCollision(this.fox1);
                // console.log("hit fox");
            }
            if (this.physics.overlap(this.character, this.carGroup)) {
                this.car = this.carGroup.getFirst(true);
                this.obstacleCollision(this.car);
                this.car.destroy();
                // console.log("hit car");
                this.sound.play("crash_music", { volume: 5.0 });
            }
            if (this.physics.overlap(this.character, this.mushroomGroup)) {
                this.mushroom1 = this.mushroomGroup.getFirst(true);
                this.mushroom1.destroy();
                this.itemCollision(this.mushroom1);
                // console.log("hit musroom");
            }
            if (this.physics.overlap(this.character, this.gunGroup)) {
                this.gun1 = this.gunGroup.getFirst(true);
                this.gun1.destroy();
                Amo += 3;
                this.AmoText.setText('Ammo: ' + Amo);
                this.itemCollision(this.gun1);
                // console.log("hit gun");
            }
            if (this.physics.overlap(this.character, this.crowGroup)) {
                this.crow = this.crowGroup.getFirst(true);
                this.obstacleCollision(this.crow)
                this.crow.destroy();
                // console.log("hit corw");
            }
            if (this.physics.overlap(this.character, this.footGroup)) {
                this.foot = this.footGroup.getFirst(true);
                this.foot.destroy();
                this.obstacleCollision(this.foot);
                // console.log("hit foot");
            }
        } else if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(this.level);
        } else if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            this.scene.start('menuScene');
        }
    }

    // Where to set up the game difficulties 
    levelBump() {
        level++;
        //make game start easy to hard
        if (level % 20 == 0) {
            this.addSpeed = 0;
            this.levelSpeed = 0;
            if (count % 2 == 0) {
                this.city.setTexture('city');
                this.groundScroll.setTexture('road_land');
                scence = -1;
            }
            if (count % 2 == 1) {
                this.city.setTexture('forest');
                this.groundScroll.setTexture('ground');
                scence = 1;
            }
            count++;
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
        if (scence == -1) {
            if (level % (this.addSpeed + 8) == 0) { this.addMushroom(); }
            if (level % (this.addSpeed + 3) == 0) { this.addGun(); }
            if (level % (this.addSpeed + 5) == 0) { this.addCrow(); }
            if (level % (this.levelSpeed + 6) == 0) { this.addMole(); }
            if (level % (this.level2Speed + 5) == 0) { this.addFox(); }
            if (level % (this.levelSpeed + 8) == 0) { this.addCar(); }
            if (level % (this.levelSpeed + 7) == 0) {
                this.addFoot();
            }
        } else {
            if (level % (this.addSpeed + 8) == 0) { this.addMushroom(); }
            if (level % (this.addSpeed + 5) == 0) { this.addGun(); }
            if (level % (this.addSpeed + 4) == 0) { this.addCrow(); }
            if (level % (this.levelSpeed + 5) == 0) { this.addMole(); }
            if (level % (this.level2Speed + 3) == 0) { this.addFox(); }
        }
    }

    // Dealling the collision with items
    itemCollision(item) {
        this.sound.play("eat_music", { volume: 6.0 });
        score += item.score;
        if (health < 10) {
            health += item.hp;
            this.HealthText.setText('Health: ' + health);
        }
        this.ScoreText.setText('Score: ' + score);

    }

    // Dealling the collision with enemies
    obstacleCollision(item) {
        if (health - item.hp <= 0) {
            Gameover = true;
            this.sound.play("death_music", { volume: 2.0 });
            this.character.destroy();
            this.GameOver();
            health -= item.hp;
        } else {
            this.sound.play("hit_music", { volume: 2.0 });
            health -= item.hp;
            score += item.score;
            this.HealthText.setText('Health: ' + health);
        }
    }

    // The enemies explosion
    objExplode(obj) {
        obj.alpha = 0;
        let boom = this.add.sprite(obj.x, obj.y, 'explosion').setScale(0.4).setOrigin(0.5, 0.5);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            boom.destroy();
        });
    }

    // When the game is over
    GameOver() {
        this.backgroundMusic.stop();
        this.moleGroup.clear();
        this.foxGroup.clear();
        this.carGroup.clear();
        this.mushroomGroup.clear();
        this.gunGroup.clear();
        this.crowGroup.clear();
        this.HealthText.destroy();
        this.ScoreText.destroy();
        this.cannon.destroy();
        this.AmoText.destroy();
        this.TimeText.destroy();

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