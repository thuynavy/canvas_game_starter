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

let xDirection = 1;
let yDirection = 1;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
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
bgImage.src = "images/background6.png";

// POWER METER
// let powerBackgroundReady = false;
// let powerBackgroundImage = new Image();
// powerBackgroundImage.onload = function() {
//   powerBackgroundReady = true;
// };
// powerBackgroundImage.src = "images/power.png"

// HERO
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/hero7.png";

// MONSTER
let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "images/monster3.png";

// OBJECTS
let hero = {
  speed: 300
};
let monster = {
  speed: 5

};
let monstersTotal = 0;
let monstersMost = 0;

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

  if (localStorage.getItem("monstersMost")) {
    monstersMost = localStorage.getItem("monstersMost")
  }

  if (monstersTotal > monstersMost) {
    monstersMost = monstersTotal;
    localStorage.setItem("monstersMost", monstersMost);
  };

  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  // RANDOM POSITION OF MONSTER
  monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// UP DOWN LEFT RIGHT
let paused = false;

let update = function (modifier) {
  if (13 in keysDown) {
    paused = true;
  }
  if (32 in keysDown) {
    paused = false;
  }

  if(!paused) {
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
    
    if (hero.x > canvas.width) {
      hero.x = 0;
    }
    if (hero.x < 0) {
      hero.x = canvas.width;
    }
    if (hero.y > canvas.height) {
      hero.y = 0;
    }
    if (hero.y < 0) {
      hero.y = canvas.height;
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
  }

// MOVE MONSTER
monster.x += monster.speed * xDirection;
monster.y += monster.speed * yDirection;
if (monster.x + 32 > canvas.width) {
  xDirection = -xDirection;
}
if (monster.x < 0) {
  xDirection = -xDirection;
}
if (monster.y < 0) {
  yDirection = -yDirection;
}
if (monster.y + 32 > canvas.height) {
  yDirection = -yDirection;
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
	ctx.font = "24px Monospace";
	ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("High score: " + monstersMost, 25, 25)
  ctx.fillText("You caught: " + monstersTotal, 25, 50);
  ctx.fillText("Time left: " + count, 25, 75);

  ctx.font = "18px Monospace";
  ctx.fillText("Enter = Pause", 25, 538);
  ctx.fillText("Space = Resume", 25, 560);  
  // Display game over message when timer finished
  if(finish == true){
    if (monstersTotal > monstersMost) {
      ctx.font = "26px Monospace";
      ctx.fillText("CONGRATS. IT'S A NEW HIGH SCORE.", 62, 290);
    } else {
      ctx.font = "26px Monospace";
      ctx.fillText("TIME'S UP. GO BACK TO WORK NOW!", 62, 290);
    }
  }
  
};

let count = 30;
let finish = false;

let counter = function() {
  setInterval(function () {
    if(!paused) {
      count = count - 1;
    }
    
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
  update(0.03); 
  render();
  
  // lastTime = thisTime;
  // Request to do this again ASAP. This is a special method for web browsers. 
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