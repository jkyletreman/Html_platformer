var gameBoard = document.getElementById("canvas"),
    grphix = canvas.getContext("2d"),
    width = 400,
    height = 800;

// Player Img
var player = new Object('Jungle Asset Pack/Character/sprites/idle.gif', (width/2), (height - 50));



// Main Loop
mainLoop();

player.X += 1;

function mainLoop() {
  grphix.clearRect(0, 0, gameBoard.width, gameBoard.height); // refreshs screen so graphics dont pile on
  grphix.drawImage(player.Sprite, player.X, player.Y); // sets player to 'kinda bottom'

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
  this.Velocity_X
  this.Velocity_Y;
}
// Pre variable adjustments
// Logic
// Post variable adjustments
// Rendering
