Game.Preloader = function(game) {

	this.preloaderBar = null;


};

Game.Preloader.prototype = {

		preload:function() {

			this.preloadBar = this.add.sprite(this.world.centerX,
				this.world.centerY, 'preloadBar');


			this.preloadBar.anchor.setTo(0.5,0.5);
			this.time.advancedTiming = true;
			this.load.setPreloadSprite(this.preloadBar);

			//Load all assets
			this.load.tilemap('map','assets/level1.csv');
			this.load.image('tileset','assets/tileset.png');
			// this.game.load.audio('music',['assets/robotic.m4a','assets/robotic.ogg']); 
	 	// 	this.game.load.audio('jump',['assets/jump.wav','assets/jump.ogg']);

			this.load.spritesheet('player', 'assets/nimzy1020.png',75,145,8);
			this.game.load.atlasJSONArray('assets/nimzy1020');

			



		},

		create:function() {

			this.state.start('Level1');

		}

};

