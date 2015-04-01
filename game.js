/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var game;

var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3 functions
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.load.spritesheet('bird', 'images/bird_sheet.png', 68, 48);
        game.load.image('floor', 'images/floor.png');
    },
    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        this.floor = game.add.tileSprite(0, game.world.height - 40, game.world.width, game.world.height, 'floor');
        this.floor.tileScale.set(0.5);
        
        // Create a game sprite from the bird image positioned
        // at the center of the game world
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'bird');
        // The position of the sprite should be based on the
        // center of the image (default is top-left)
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.animations.add('flap', [0,1,2,1], 10, true);
        this.sprite.animations.play('flap');
        game.physics.enable(this.sprite);
        game.physics.arcade.gravity.y = 100;
        // Stop the bird from falling off the screen, for now
        this.sprite.body.collideWorldBounds = true;
        // Change background color to a gray color
        game.stage.backgroundColor = '#999999';
        // keep space from scrolling the page
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
     },
    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
        if (this.spaceKey.justDown) {
            this.sprite.body.velocity.y = -100;
        }
        this.floor.tilePosition.x -= 100;
    }
};

// Initialize Phaser
game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
