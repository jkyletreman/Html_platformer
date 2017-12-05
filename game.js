//Variables

var gameBoard = document.getElementById("canvas"),
    grphix = canvas.getContext("2d"),
    width = 400,
    height = 800;

var player = new Object('Jungle Asset Pack/Character/sprites/idle.gif', (width/2), (height - 50));
var plat1 = new Object('Assets/platform1.png', 0, 750, 50, 20);
var isLeft = false;
var isRight = false;
// Events

function keyDown(e) {
  if (String.fromCharCode(e.keyCode) === '%') isLeft = true; // player left
  if (String.fromCharCode(e.keyCode) === "'") isRight = true; // player right
}

function keyUp(e) {
  if (String.fromCharCode(e.keyCode) === '%') isLeft = false; // player left
  if (String.fromCharCode(e.keyCode) === "'") isRight = false; // player right
}



// Main Loop
mainLoop();

function mainLoop() {
  // Pre variable adjustments
  player.X += player.Velocity_X; // move left
  player.Y += player.Velocity_Y; // move right
  // Logic
  if (isLeft) player.Velocity_X = -3; // change in movement left
  if (isRight) player.Velocity_X = 3; // change in movement right
  if (!isLeft && !isRight) player.Velocity_X = 0; // if neither key is being pressed then stop
  if (player.isColliding(plat1)) player.Velocity_X = 0; // if player collides then stop

  // Post variable adjustments
  // Rendering
  grphix.clearRect(0, 0, gameBoard.width, gameBoard.height); // refreshs screen so graphics dont pile on
  grphix.drawImage(player.Sprite, player.X, player.Y); // sets player to 'kinda bottom'
  grphix.drawImage(plat1.Sprite, plat1.X, plat1.Y);

  // player.X += 1; // cause char to move right

  setTimeout(mainLoop, 1000/60); // 60s refresh rate
}

// object class

function Object(img, x, y, width, height) {
  this.Sprite = new Image();
  this.Sprite.src = img;
  this.X = x;
  this.Y = y;
  this.Width = width; // collison
  this.Height = height; // collison
  this.Previous_X;
  this.Previous_Y;
  this.Velocity_X = 0;
  this.Velocity_Y = 0;

  this.isColliding = function(obj) {
    if (this.X > obj.X + obj.Width) return false; // obj.X + obj.width is the right side coordinate of the obj
    if (this.X + this.Width < obj.X) return false; // left side
    if (this.Y > obj.Y + obj.Height) return false; // top
    if (this.Y + this.Height < obj.Y) return false; // bottom
    return true;


  }
}
