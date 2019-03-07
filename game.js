/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// let bgReady, heroReady, monsterReady;
// let bgImage, heroImage, monsterImage;

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

// BACKGROUND
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background1.png";

// HERO
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/hero3.png";

// MONSTER
let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "images/monster1.png";

// OBJECTS
let hero = {
  speed: 256
};
let monster = {};
let monstersTotal = 0;

let keysDown = {};

  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true;
}, false);

addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);

// WHEN PLAYER CATCHES MONSTER
let reset = function() {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  // RANDOM POSITION OF MONSTER
  monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// UP DOWN LEFT RIGHT
let update = function (modifier) {
	if (38 in keysDown) { 
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { 
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { 
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { 
		hero.x += hero.speed * modifier;
	}

	// COLLISION
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersTotal;
		reset();
	}
};

// This function, render, runs as often as possible.
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }
  ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Ariel";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
  ctx.fillText("You caught: " + monstersTotal, 32, 32);
  ctx.fillText("Time left: " + count, 32, 60);
  
  // Display game over message when timer finished
  if(finish==true){
    ctx.fillText("MY MAMA DON'T LIKE YOU.", 100, 220);
  }
  
};

let count = 25;
let finish = false;

let counter = function() {
  setInterval(function () {
    count = count - 1;
    
    // WHEN TIME'S UP
      if (count <= 0)
      { clearInterval(counter);
        finish = true;
        count = 0;
        monsterReady = false;
        heroReady = false;
      }
  }, 1000)
};


// GAME LOOP STACKOVERFLOW
var main = function () {
  var thisTime = Date.now();
  var deltaTime = thisTime - lastTime;
  update(deltaTime / 1000); 
  render();
  lastTime = thisTime;
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var lastTime = Date.now();
reset();
main();
counter();






























// let heroX = canvas.width / 2;
// let heroY = canvas.height / 2;



// /** 
//  * Keyboard Listeners
//  * You can safely ignore this part, for now. 
//  * 
//  * This is just to let JavaScript know when the user has pressed a key.
// */
// let keysDown = {};
// function setupKeyboardListeners() {
//   // Check for keys pressed where key represents the keycode captured
//   // For now, do not worry too much about what's happening here. 
//   addEventListener("keydown", function (key) {
//     keysDown[key.keyCode] = true;
//   }, false);

//   addEventListener("keyup", function (key) {
//     delete keysDown[key.keyCode];
//   }, false);
// }












// /**
//  *  Update game objects - change player position based on key pressed
//  *  and check to see if the monster has been caught!
//  *  
//  *  If you change the value of 5, the player will move at a different rate.
//  */

// var reset = function () {
// 	hero.x = canvas.width / 2;
// 	hero.y = canvas.height / 2;

// 	// Throw the monster somewhere on the screen randomly
// 	monster.x = 32 + (Math.random() * (canvas.width - 64));
// 	monster.y = 32 + (Math.random() * (canvas.height - 64));
// };

// let update = function (modifier) {
// 	if (38 in keysDown) { // Player holding up
// 		hero.y -= hero.speed * modifier;
// 	}
// 	if (40 in keysDown) { // Player holding down
// 		hero.y += hero.speed * modifier;
// 	}
// 	if (37 in keysDown) { // Player holding left
// 		hero.x -= hero.speed * modifier;
// 	}
// 	if (39 in keysDown) { // Player holding right
// 		hero.x += hero.speed * modifier;
// 	}

// 	// Are they touching?
// 	if (
// 		hero.x <= (monster.x + 32)
// 		&& monster.x <= (hero.x + 32)
// 		&& hero.y <= (monster.y + 32)
// 		&& monster.y <= (hero.y + 32)
// 	) {
// 		++monstersCaught;
// 		reset();
// 	}
// };

// // let update = function () {
// //   if (38 in keysDown) { // Player is holding up key
// //     heroY -= 5;
// //   }
// //   if (40 in keysDown) { // Player is holding down key
// //     heroY += 5;
// //   }
// //   if (37 in keysDown) { // Player is holding left key
// //     heroX -= 5;
// //   }
// //   if (39 in keysDown) { // Player is holding right key
// //     heroX += 5;
// //   }

// //   // Check if player and monster collided. Our images
// //   // are about 32 pixels big.
// //   if (
// //     heroX <= (monsterX + 32)
// //     && monsterX <= (heroX + 32)
// //     && heroY <= (monsterY + 32)
// //     && monsterY <= (heroY + 32)
// //   ) {
// //     // Pick a new location for the monster.
// //     // Note: Change this to place the monster at a new, random location.
// //     monsterX = 32 + (Math.random() * (canvas.width - 64));
// //     monsterY = 32 + (Math.random() * (canvas.height - 64));
// //   }
// // };


// /**
//  * This function, render, runs as often as possible.
//  */
// var render = function () {
//   if (bgReady) {
//     ctx.drawImage(bgImage, 0, 0);
//   }
//   if (heroReady) {
//     ctx.drawImage(heroImage, heroX, heroY);
//   }
//   if (monsterReady) {
//     ctx.drawImage(monsterImage, monsterX, monsterY);
//   }
// };

// /**
//  * The main game loop. Most every game will have two distinct parts:
//  * update (updates the state of the game, in this case our hero and monster)
//  * render (based on the state of our game, draw the right things)
//  */
// var main = function () {
//   update(); 
//   render();
//   // Request to do this again ASAP. This is a special method
//   // for web browsers. 
//   requestAnimationFrame(main);
// };

// // Cross-browser support for requestAnimationFrame.
// // Safely ignore this line. It's mostly here for people with old web browsers.
// var w = window;
// requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// // Let's play this game!
// loadImages();
// setupKeyboardListeners();
// main();