//Variables

var gameBoard = document.getElementById("canvas"),
  grphix = canvas.getContext("2d"),
  width = 400,
  height = 800;

// Gamestate variables
var player = new Object('Jungle Asset Pack/Character/sprites/idle.gif', (width / 2), 744, 19, 34); //char model + position
var platXBot = new Object('Assets/platXBot.png', 0, 780, 400, 20); // bot plat position
var platXTop = new Object('Assets/platXTop.png', 0, 0, 400, 20); // top
var platYL = new Object('Assets/platY.png', 0, 0, 20, 800); // left
var platYR = new Object('Assets/platY.png', 380, 0, 20, 800); // right
var platEnd = new Object('Assets/platE.png', 100, 100, 200, 20); // end platform
var door = new Object('Assets/Door.png', 200, 50, 35, 50);

// TODO clean this into a array
var platLA = new Object('Assets/platD.png', 20, 680, 200, 20);
var platRA = new Object('Assets/platD.png', 185, 580, 200, 20);
var platLB = new Object('Assets/platD.png', 20, 480, 200, 20);
var platRB = new Object('Assets/platD.png', 185, 380, 200, 20);
var platLC = new Object('Assets/platD.png', 20, 280, 200, 20);
var platRC = new Object('Assets/platD.png', 185, 180, 200, 20);

// World physics variables
var isLeft = false; // defaults for collison
var isRight = false; // defaults for collison
var isSpace = false;
player.Gravity = 20;
player.Weight = 0.1;

// Events
function keyDown(e) {
  if (String.fromCharCode(e.keyCode) === '%') isLeft = true; // player left
  if (String.fromCharCode(e.keyCode) === "'") isRight = true; // player right
  if (String.fromCharCode(e.keyCode) === " ") isSpace = true; // player up

}

function keyUp(e) {
  if (String.fromCharCode(e.keyCode) === '%') isLeft = false; // player left
  if (String.fromCharCode(e.keyCode) === "'") isRight = false; // player right
  if (String.fromCharCode(e.keyCode) === " ") isSpace = false; // player up

}

// Main Loop
mainLoop();

function mainLoop() {
  // Pre variable adjustments
  player.X += player.Velocity_X; // amt move left
  player.Y += player.Velocity_Y; // amt move right

  // Logic
  if (isLeft) player.Velocity_X = -3; // change in movement left
  if (isRight) player.Velocity_X = 3; // change in movement right
  if (!isLeft && !isRight) player.Velocity_X = 0; // if neither key is being pressed then stop

  if (player.Velocity_Y < player.Gravity) player.Velocity_Y += player.Weight; // falling effect

  if (player.isColliding(platXBot) && (player.Y + player.Height) < (platXBot.Y + player.Velocity_Y)) {
    player.Y = platXBot.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // TODO use a loop here
  // platEnd collision
  if (player.isColliding(platEnd) && (player.Y + player.Height) < (platEnd.Y + player.Velocity_Y)) {
    player.Y = platEnd.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // platLA collision
  if (player.isColliding(platLA) && (player.Y + player.Height) < (platLA.Y + player.Velocity_Y)) {
    player.Y = platLA.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // platRA collision
  if (player.isColliding(platRA) && (player.Y + player.Height) < (platRA.Y + player.Velocity_Y)) {
    player.Y = platRA.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // platLB collision
  if (player.isColliding(platLB) && (player.Y + player.Height) < (platLB.Y + player.Velocity_Y)) {
    player.Y = platLB.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // platRB collision
  if (player.isColliding(platRB) && (player.Y + player.Height) < (platRB.Y + player.Velocity_Y)) {
    player.Y = platRB.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // platLC collision
  if (player.isColliding(platLC) && (player.Y + player.Height) < (platLC.Y + player.Velocity_Y)) {
    player.Y = platLC.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // platRC collision
  if (player.isColliding(platRC) && (player.Y + player.Height) < (platRC.Y + player.Velocity_Y)) {
    player.Y = platRC.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }

  // Left Wall + Right wall collision
  if (player.isColliding(platYL)) player.Velocity_X = .1;
  if (player.isColliding(platYR)) player.Velocity_X = -.1;

  // End State Collision

  if (player.isColliding(door)) {
    let end = document.querySelector('endScreenArea');
    end.className = 'popup'
  }

  // Jump
  if (isSpace && player.Velocity_Y === 0) {
    player.Velocity_Y = -4.5;
  }

  // Post variable adjustments

  // Rendering
  grphix.clearRect(0, 0, gameBoard.width, gameBoard.height); // refreshs screen so graphics dont pile on
  grphix.drawImage(player.Sprite, player.X, player.Y); // sets player position
  grphix.drawImage(platXBot.Sprite, platXBot.X, platXBot.Y); // bot platform
  grphix.drawImage(platXTop.Sprite, platXTop.X, platXTop.Y); // top platform
  grphix.drawImage(platEnd.Sprite, platEnd.X, platEnd.Y); // top platform

  // TODO loop
  grphix.drawImage(platYR.Sprite, platYR.X, platYR.Y); // right wall
  grphix.drawImage(platYL.Sprite, platYL.X, platYL.Y); // left wall
  grphix.drawImage(platLA.Sprite, platLA.X, platLA.Y);
  grphix.drawImage(platRA.Sprite, platRA.X, platRA.Y);
  grphix.drawImage(platLB.Sprite, platLB.X, platLB.Y);
  grphix.drawImage(platRB.Sprite, platRB.X, platRB.Y);
  grphix.drawImage(platLC.Sprite, platLC.X, platLC.Y);
  grphix.drawImage(platRC.Sprite, platRC.X, platRC.Y);
  grphix.drawImage(door.Sprite, door.X, door.Y);




  setTimeout(mainLoop, 1000 / 60); // 60s refresh rate
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
  this.Gravity = 0;
  this.Weight = 0;

  this.isColliding = function(obj) {
    if (this.X > obj.X + obj.Width) return false; // obj.X + obj.width is the right side coordinate of the obj
    if (this.X + this.Width < obj.X) return false; // left side
    if (this.Y > obj.Y + obj.Height) return false; // top
    if (this.Y + this.Height < obj.Y) return false; // bottom
    return true;


  }
}
