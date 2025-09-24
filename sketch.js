let playerX = 400;
let playerY = 300;
let playerSize = 30;
let playerSpeed = 5;

let collectibleX = 600;
let collectibleY = 200;
let collectibleSize = 20;

let collectibleColor;
let score = 0;
let gameTime = 0;
let timeLimit = 1800; // 30 seconds at 60fps

let fontRegular;
function preload() {
  fontRegular = loadFont('Anton-Regular.ttf');
 
}


function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100); // 🎨 use HSB color mode
  collectibleColor = color(random(360), 100, 100);
}
let spiralRotation = 0; // keeps track of spinning

function drawPlayer(x, y, size, hue, saturation) {
  push();
  translate(x, y);
  rotate(spiralRotation); // spin the spiral

  // base circle
  noStroke();
  fill(hue, saturation, 100);
  circle(0, 0, size);

  // complementary spiral
  let complementaryHue = (hue + 180) % 360;
  stroke(complementaryHue, 80, 80);
  noFill();

  beginShape();
  for (let a = 0; a < TWO_PI * 3; a += 0.1) { // 3 spiral turns
    let r = map(a, 0, TWO_PI * 6, 0, size / 1);
    let sx = r * cos(a);
    let sy = r * sin(a);
    vertex(sx, sy);
  }
  endShape();

  pop();

  // spin speed
  spiralRotation += 0.03;
}



function draw() {
  // 🎨 Map PLAYER position to colors
  let playerHue = map(playerX, 0, width, 0, 360);
  let playerSaturation = map(playerY, 0, height, 40, 100);

  // 🎨 Complementary background color
  let backgroundHue = (playerHue + 180) % 360;
  background(backgroundHue, playerSaturation, 90);

  // Update game time
  gameTime++;
  if (gameTime >= timeLimit) {
    drawGameOver();
    return;
  }

  // Player movement
  if (keyIsDown(LEFT_ARROW) && playerX > playerSize/2) playerX -= playerSpeed;
  if (keyIsDown(RIGHT_ARROW) && playerX < width - playerSize/2) playerX += playerSpeed;
  if (keyIsDown(UP_ARROW) && playerY > playerSize/2) playerY -= playerSpeed;
  if (keyIsDown(DOWN_ARROW) && playerY < height - playerSize/2) playerY += playerSpeed;

  // Collision detection
  let distance = dist(playerX, playerY, collectibleX, collectibleY);
  if (distance < (playerSize + collectibleSize) / 2) {
    score += 10;
    collectibleX = random(collectibleSize, width - collectibleSize);
    collectibleY = random(collectibleSize, height - collectibleSize);
    collectibleColor = color(random(360), 100, 100);
      // 🎉 grow player
  playerSize += 4;
  }

  // 🎨 Player color = based on its position
drawPlayer(playerX, playerY, playerSize, playerHue, playerSaturation);


  // 🎨 Collectible color stays random
  fill(collectibleColor);
  circle(collectibleX, collectibleY, collectibleSize);

  // UI
  textFont(fontRegular)
  fill(0, 0, 0); // black text
  textSize(20);
  text("Score: " + score, 20, 30);

  let timeLeft = (timeLimit - gameTime) / 60;
  text("Time: " + timeLeft.toFixed(1), 20, 60);

  textSize(14);
  text("Keep Munchin To Beat Your High Score!!!", 20, height - 20);
}

function drawGameOver() {
  background(0, 0, 20);
  fill(0, 0, 100);
  textAlign(CENTER);
  textSize(36);
  text("GAME OVER", width/2, height/2 - 40);
  textSize(24);
  text("Final Score: " + score, width/2, height/2);
  textSize(18);
  text("Press R to restart", width/2, height/2 + 40);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    score = 0;
    gameTime = 0;
    playerX = 400;
    playerY = 300;
    playerSize = 30;  //resets player size
    collectibleX = 600;
    collectibleY = 200;
    collectibleColor = color(random(360), 100, 100);
  }
}
