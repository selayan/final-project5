Game.Level1 = function(game){}

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 300;
var jumpTimer = 0;

Game.Level1.prototype = {

	create: function() {
		this.stage.backgroundColor = '#33adff';

		this.physics.arcade.gravity.y = 850;

		// //music
	 // 	this.music = game.add.audio("music");
	 // 	this.music.play('',0,.2,true);


		map = this.add.tilemap('map',64,64);

		map.addTilesetImage('tileset');

		layer = map.createLayer(0);

		layer.resizeWorld();

		map.setCollisionBetween(1,50);

		player = this.add.sprite(100,300,'player');
		player.anchor.setTo(.5,.5);


		player.animations.add('idle',[0,1],1,true);
		player.animations.add('jump',[2,3],2,true);
		player.animations.add('run',[3,4,5,6,7],6,true);

		

		this.physics.arcade.enable(player);
		this.camera.follow(player);
		player.body.collideWorldBounds = true;

		controls = {

		right: this.input.keyboard.addKey(Phaser.Keyboard.D),
		left: this.input.keyboard.addKey(Phaser.Keyboard.A),
		up: this.input.keyboard.addKey(Phaser.Keyboard.W)

		};


	},

	update: function() {
		//physics
		this.physics.arcade.collide(player,layer);

		player.body.velocity.x = 0;



		
		//right controls

		if(controls.right.isDown){
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.x += playerSpeed;

		}

		//left controls

		if(controls.left.isDown){
			player.animations.play('run');
			player.scale.setTo(-1,1);
			player.body.velocity.x -= playerSpeed;

		}

		//jump Controls

		if(controls.up.isDown && (player.body.onFloor() ||
		player.body.touching.down) && this.time.now > jumpTimer) {

			player.body.velocity.y = -750;
			jumpTimer = this.time.now + 750;
			player.animations.play('jump');
		}

		if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
			player.animations.play('idle');

		}


	},


};