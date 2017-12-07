//variable

let gameBoard = document.getElementById("canvas"),
  grphix = canvas.getContext("2d"),
  width = 400,
  height = 800;

// Gamestate variable
let player = new object('Jungle Asset Pack/Character/sprites/idle.gif', (width / 2), 744, 19, 34); //char model + position
let platXBot = new object('Assets/platXBot.png', 0, 780, 400, 20); // bot plat position
let platXTop = new object('Assets/platXTop.png', 0, 0, 400, 20); // top
let platYL = new object('Assets/platY.png', 0, 0, 20, 800); // left
let platYR = new object('Assets/platY.png', 380, 0, 20, 800); // right
let platEnd = new object('Assets/platE.png', 100, 100, 200, 20); // end platform
let door = new object('Assets/Door.png', 200, 50, 35, 50);
let jumpCount = 0;

// TODO clean this into a array
let platLA = new object('Assets/platD.png', 20, 680, 200, 20);
let platRA = new object('Assets/platD.png', 185, 580, 200, 20);
let platLB = new object('Assets/platD.png', 20, 480, 200, 20);
let platRB = new object('Assets/platD.png', 185, 380, 200, 20);
let platLC = new object('Assets/platD.png', 20, 280, 200, 20);
let platRC = new object('Assets/platD.png', 185, 180, 200, 20);

// World physics variable
let isLeft = false; // defaults for collison
let isRight = false; // defaults for collison
let isSpace = false;
player.Gravity = 20;
player.Weight = 0.1;

// Events

function keyDown(e) {
  if (String.fromCharCode(e.keyCode) === '%') isLeft = true; // player left
  if (String.fromCharCode(e.keyCode) === "'") isRight = true; // player right
  if (String.fromCharCode(e.keyCode) === " ") {
    isSpace = true; // player up
    jumpCount++;
  }
}

function keyUp(e) {
  if (String.fromCharCode(e.keyCode) === '%') isLeft = false; // player left
  if (String.fromCharCode(e.keyCode) === "'") isRight = false; // player right
  if (String.fromCharCode(e.keyCode) === " ") isSpace = false; // player up
}

// Main Loop
mainLoop();

function mainLoop() {
  //Display Previous score
  localStorage.removeItem(jumpCount);
  let previousScore = document.getElementById('previousScore');
  let oldScore = localStorage.getItem('jumpCount')
  previousScore.innerHTML = oldScore;

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


  // TODO use a loop here | TODO sticky collision bottom platforms (commented out ifs)
  // platEnd collision
  if (player.isColliding(platEnd) && (player.Y + player.Height) < (platEnd.Y + player.Velocity_Y)) {
    player.Y = platEnd.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // if (player.isColliding(platEnd) && (player.Y + player.Height) > ((platEnd.Y - platEnd.Height) - player.Velocity_Y)) {
  //   player.Velocity_Y = 0.1;
  // }
  // platLA collision
  if (player.isColliding(platLA) && (player.Y + player.Height) < (platLA.Y + player.Velocity_Y)) {
    player.Y = platLA.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // if (player.isColliding(platLA) && (player.Y + player.Height) > ((platLA.Y - platLA.Height) - player.Velocity_Y)) {
  //   player.Velocity_Y = 0.1;
  // }
  // platRA collision
  if (player.isColliding(platRA) && (player.Y + player.Height) < (platRA.Y + player.Velocity_Y)) {
    player.Y = platRA.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // if (player.isColliding(platRA) && (player.Y + player.Height) > ((platRA.Y - platRA.Height) - player.Velocity_Y)) {
  //   player.Velocity_Y = 0.1;
  // }
  // platLB collision
  if (player.isColliding(platLB) && (player.Y + player.Height) < (platLB.Y + player.Velocity_Y)) {
    player.Y = platLB.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // if (player.isColliding(platLB) && (player.Y + player.Height) > ((platLB.Y - platLB.Height) - player.Velocity_Y)) {
  //   player.Velocity_Y = 0.1;
  // }
  // platRB collision
  if (player.isColliding(platRB) && (player.Y + player.Height) < (platRB.Y + player.Velocity_Y)) {
    player.Y = platRB.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // if (player.isColliding(platRB) && (player.Y + player.Height) > ((platRB.Y - platRB.Height) - player.Velocity_Y)) {
  //   player.Velocity_Y = 0.1;
  // }
  // platLC collision
  if (player.isColliding(platLC) && (player.Y + player.Height) < (platLC.Y + player.Velocity_Y)) {
    player.Y = platLC.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // if (player.isColliding(platLC) && (player.Y + player.Height) > ((platLC.Y - platLC.Height) - player.Velocity_Y)) {
  //   player.Velocity_Y = 0.1;
  // }
  // platRC collision
  if (player.isColliding(platRC) && (player.Y + player.Height) < (platRC.Y + player.Velocity_Y)) {
    player.Y = platRC.Y - player.Height;
    player.Velocity_Y = 0; // if player collides then stop
  }
  // if (player.isColliding(platRC) && (player.Y + player.Height) > ((platRC.Y - platRC.Height) - player.Velocity_Y)) {
  //   player.Velocity_Y = 0.1;
  // }

  // Left Wall + Right wall collision
  if (player.isColliding(platYL)) player.Velocity_X = 0.1;
  if (player.isColliding(platYR)) player.Velocity_X = -0.1;

  // End State Collision
  if (player.isColliding(door)) {
    // display GameOver
    let element = document.getElementById("gameOver");
    element.classList.add("gameScreenArea2");
    // Local Storage for count
    localStorage.setItem('jumpCount', JSON.stringify(jumpCount))
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
function object(img, x, y, width, height) {
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

// David Sound Addition
var sound = new Howl({
  src: ['https://k003.kiwi6.com/hotlink/qpw7gh2m2m/jump.mp3'],
  volume: 0.05,
  loop: false,
});
var theme = new Howl({
  src: ['https://k003.kiwi6.com/hotlink/k1yu2y20on/playform.mp3'],
  volume: 0.2,
  loop: true,
});
var move = new Howl({
  src: ['http://k003.kiwi6.com/hotlink/6nvcv446vj/move.mp3'],
  volume: 0.03,
  loop: false,
});

function jumpSound(e) {
  if (e.keyCode == 32) {
    sound.play();
  }
}

function stopSound(e) {
  if (e.keyCode == 77) {
    theme.stop();
  }
}

function moveSound(e) {
  if (e.keyCode == 39) {
    move.play();
  }
  if (e.keyCode == 37) {
    move.play();
  }
}

document.getElementById('click').addEventListener("click", function() {
  sound.play();
})

// document.querySelector('#music').addEventListener('change', function(e) {
//   if (e.target.checked) {
//     theme.play();
//   } else {
//     theme.stop();
//   }
// }

document.body.addEventListener('keydown', jumpSound)
document.body.addEventListener('keydown', moveSound)
document.body.addEventListener('keydown', stopSound)
document.body.addEventListener('click', function() {
  theme.play()
})
