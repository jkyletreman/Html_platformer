//Variables

var gameBoard = document.getElementById("canvas"),
    grphix = canvas.getContext("2d"),
    width = 400,
    height = 800;

var player = new Object('Jungle Asset Pack/Character/sprites/idle.gif', (width/2), (height - 50));
var isLeft = false;
var isRight = false;
// Events

function keyDown(e) {
  if (String.fromCharCode(e.keyCode) === '%') isLeft = true;
  if (String.fromCharCode(e.keyCode) === "'") isRight = true;
}

function keyUp(e) {
  if (String.fromCharCode(e.keyCode) === '%') isLeft = false;
  if (String.fromCharCode(e.keyCode) === "'") isRight = false;
}



// Main Loop
mainLoop();

function mainLoop() {
  // Pre variable adjustments
  player.X += player.Velocity_X;
  player.Y += player.Velocity_Y;
  // Logic
  if (isLeft) player.Velocity_X = -3;
  if (isRight) player.Velocity_X = 3;
  if (!isLeft && !isRight) player.Velocity_X = 0;

  // Post variable adjustments
  // Rendering
  grphix.clearRect(0, 0, gameBoard.width, gameBoard.height); // refreshs screen so graphics dont pile on
  grphix.drawImage(player.Sprite, player.X, player.Y); // sets player to 'kinda bottom'

  // player.X += 1; // cause char to move right

  setTimeout(mainLoop, 1000/60); // 60s refresh rate
}

// object class

function Object(img, x, y) {
  this.Sprite = new Image();
  this.Sprite.src = img;
  this.X = x;
  this.Y = y;
  this.Previous_X;
  this.Previous_Y;
  this.Velocity_X = 0;
  this.Velocity_Y = 0;
}
