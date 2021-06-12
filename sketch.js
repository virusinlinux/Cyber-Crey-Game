var mode;
let ship;
let aliens = []; //array of aliens
let lasers = []; //array of lazers
let points = 0;

function preload() {
  alien1a = loadImage("img/alien1a.png");
  alien1b = loadImage("img/alien1b.png");
  alien2a = loadImage("img/alien2a.png");
  alien2b = loadImage("img/alien2b.png");
}

function setup() {
  mode = 0; // game has not started yet!
  createCanvas(600, 400);
  frameRate(60);
  imageMode(CENTER);
  
  ship = new Ship();
  // Creating bottom row of aliens
  let startX = 80;
  let startY = 80;
  for (var i = 0; i < 6; i++) {
    aliens[i] = new Alien(i * startX + 80, startY, alien1a, alien1b, 5);
  }
  // Creating up row of aliens

  startY = 40;
  let offset = 0;
  for (var j = 6; j < 12; j++) {
    aliens[j] = new Alien(offset * startX + 80, startY, alien2a, alien2b, 10);
    offset++;
  }
}

function draw() {
  clear();
  if(mode == 0){
    text('Hello World!',width/2,height/2);
  }
  background(0);
  ship.show();
  ship.move();

  // Show and move aliens
  var edge = false;
  for (var i = 0; i < aliens.length; i++) {
    aliens[i].show();
    aliens[i].move();
    if (aliens[i].x > width || aliens[i].x < 0) {
      edge = true;
    }
  }
  if (edge) {
    for (var k = 0; k < aliens.length; k++) {
      aliens[k].shiftDown();
    }
  }
  //display and move lazer
  for (var las = 0; las < lasers.length; las++) {
    lasers[las].show();
    lasers[las].move();
    // collision detection
    for (var j = 0; j < aliens.length; j++) {
      if (lasers[las].hits(aliens[j])) {
        lasers[las].remove();
        points = points + aliens[j].pts;
        aliens.splice(j, 1); //remove alien from array
      }
    } //end of alien loop
  } //end of lazer loop 1

  //loop through lasers & remove lazers with flag
  for (var z = lasers.length - 1; z >= 0; z--) {
    if (lasers[z].toDelete) {
      lasers.splice(z, 1); // remove lazer from array
    }
  } //end of the lazer loop 2
  updateHUD(); //HUD (Heads Up Display)
  // check if Game is Over
  if (aliens.length <= 0) {
    gameOver();
  }
} // end of draw function

function keyReleased() {
  ship.setDir(0);
}

function keyPressed() {
  if(keyCode===ENTER){
    mode = 1;
  }
  if (key === " ") {
    var laser = new Laser(ship.x + ship.width / 2, ship.y);
    lasers.push(laser);
  }
  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}

function updateHUD() {
  fill(25,25,25)
  text("press SPACE to shoot",180,height/2)
  fill(0,255,0);
  textSize(20)
  text("Score: " + points, 15, 20);
  text("Aliens remaining: " + aliens.length, 390, 20);
  fill(0,255,25);
  text("Made by: real_reyansh",380,390);
}

function gameOver() {
  background(0);
  textSize(75);
  textAlign(CENTER);
  fill(255,0,0);
  text("GAME OVER", width / 2, (height+60) / 2);
  textSize(50);
  fill(0,255,0);
  text("YOU WIN", width/2, height/3);
  noLoop();
}
