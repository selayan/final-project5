
(function() {
	

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 3 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {
			
	var coin,
		coinImage,
		canvas;					

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);

	  coin.update();
	  coin.render();
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {
		
		  // Clear the canvas
		  that.context.clearRect(1, 1, that.width, that.height);
		  
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    1,
		    that.width / numberOfFrames,
		    that.height,
		    1,
		    1,
		    that.width / numberOfFrames,
		    that.height);
		};
		
		return that;
	}
	
	// Get canvas
	canvas = document.getElementById("coinAnimation");
	canvas.width = 230;
	canvas.height = 1000;
	
	// Create sprite sheet
	coinImage = new Image();	
	
	// Create sprite
	coin = sprite({
		context: canvas.getContext("2d"),
		width: 915,
		height: 1000,
		image: coinImage,
		numberOfFrames: 3,
		ticksPerFrame: 11
	});
	
	// Load sprite sheet
	coinImage.addEventListener("load", gameLoop);
	coinImage.src = "nimzy-animate/images/coin-sprite-animation.png";

} ());

