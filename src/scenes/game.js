class Game extends Phaser.Scene {
    constructor() {
        super("game");
    }


    preload() {
        this.load.image('sky', '../assets/img/starfield.png');
        this.load.image('ground', '../assets/img/platform.png');
        this.load.image('dude', '../assets/img/player.png');
    }


    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.sprite(0, 0, 'sky');
        platforms = this.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, this.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        player = this.add.sprite(32, this.world.height - 150, 'dude');
        this.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        // player.animations.add('left', [0, 1, 2, 3], 10, true);
        // player.animations.add('right', [5, 6, 7, 8], 10, true);

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.physics.arcade.collide(player, platforms);

        player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            // player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            // player.animations.play('right');
        }
        else {
            // player.animations.stop();
            // player.frame = 4;
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -350;
        }
    }

}