//variable
let gameBoard = document.getElementById("canvas"),
    grphix = canvas.getContext("2d"),
    width = 400,
    height = 800;

const DEFAULT_OBJECT = {
  Sprite: null,
  X: 0,
  Y: 0,
  Width: null, // collison
  Height: null, // collison
  Previous_X: 0,
  Previous_Y: 0,
  Velocity_X: 0,
  Velocity_Y: 0,
  Gravity: 0,
  Weight: 0,
  isColliding(obj) {
    if (this.X > obj.X + obj.Width) return false; // obj.X + obj.width is the right side coordinate of the obj
    if (this.X + this.Width < obj.X) return false; // left side
    if (this.Y > obj.Y + obj.Height) return false; // top
    if (this.Y + this.Height < obj.Y) return false; // bottom
    return true;
  }
}


// Gamestate variable
let player = GameObject({ spriteSrc: 'Jungle Asset Pack/Character/sprites/idle.gif', pos: [(width / 2), 744], dim: [19, 34]}); //char model + position
let platXBot = GameObject({ spriteSrc: 'Assets/platXBot.png', pos: [0, 780], dim: [400, 20]}); // bot plat position
let platXTop = GameObject({ spriteSrc: 'Assets/platXTop.png', pos: [0, 0], dim: [400, 20]}); // top
let platYL = GameObject({ spriteSrc: 'Assets/platY.png', pos: [0, 0], dim: [20, 800]}); // left
let platYR = GameObject({ spriteSrc: 'Assets/platY.png', pos: [380, 0], dim: [20, 800]}); // right
let platEnd = GameObject({ spriteSrc: 'Assets/platE.png', pos: [100, 100], dim: [200, 20]}); // end platform
let door = GameObject({ spriteSrc: 'Assets/Door.png', pos: [200, 50], dim: [35, 50]});
let jumpCount = 0;

// TODO clean this into a array
let platLA = GameObject({ spriteSrc: 'Assets/platD.png', pos: [20, 680], dim: [200, 20]});
let platRA = GameObject({ spriteSrc: 'Assets/platD.png', pos: [185, 580], dim: [200, 20]});
let platLB = GameObject({ spriteSrc: 'Assets/platD.png', pos: [20, 480], dim: [200, 20]});
let platRB = GameObject({ spriteSrc: 'Assets/platD.png', pos: [185, 380], dim: [200, 20]});
let platLC = GameObject({ spriteSrc: 'Assets/platD.png', pos: [20, 280], dim: [200, 20]});
let platRC = GameObject({ spriteSrc: 'Assets/platD.png', pos: [185, 180], dim: [200, 20]});

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

  movePlayer(player);
  checkPlatCollision([platXBot, platEnd, platLA, platRA, platLB, platRB, platLC, platRC], player);
  checkWallCollision([platYL, platYR], player);
  checkGameEnd(player, door);
  animatePlayer(player)
  // Post variable adjustments
  renderGameObjects()

  setTimeout(mainLoop, 1000 / 60); // 60s refresh rate
}



function GameObject(attrs) {
  const Sprite = new Image();
  Sprite.src = attrs.spriteSrc;

  return Object.assign(
    {},
    DEFAULT_OBJECT,
    {
      X: attrs.pos[0],
      Y: attrs.pos[1],
      Width: attrs.dim[0],
      Height: attrs.dim[1],
      Sprite
    }
  );
}

function movePlayer(player) {
    // Pre variable adjustments
    player.X += player.Velocity_X; // amt move left
    player.Y += player.Velocity_Y; // amt move right

    // Logic
    if (isLeft) player.Velocity_X = -3; // change in movement left
    if (isRight) player.Velocity_X = 3; // change in movement right
    if (!isLeft && !isRight) player.Velocity_X = 0; // if neither key is being pressed then stop
    if (player.Velocity_Y < player.Gravity) player.Velocity_Y += player.Weight; // falling effect
}

function checkPlatCollision(platforms, player) {
  // TODO use a loop here
  // platEnd collision
  platforms.forEach((plat) => {
    if (player.isColliding(plat) && ((player.Y + player.Height) < (plat.Y + player.Velocity_Y))) {
      player.Y = plat.Y - player.Height;
      player.Velocity_Y = 0; // if player collides then stop
    }
  });
}

function checkWallCollision(walls, player) {
  // Left Wall + Right wall collision
  walls.forEach((wall) => {
    if (player.isColliding(wall)) player.Velocity_X = 0.1;
  });
}

function checkGameEnd(player, door) {
  // End State Collision
  if (player.isColliding(door)) {
    // display GameOver
    let element = document.getElementById("gameOver");
    element.classList.add("gameScreenArea2");
    // Local Storage for count
    localStorage.setItem('jumpCount', JSON.stringify(jumpCount))
  }
}



function renderGameObjects() {
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

}

function animatePlayer(player) {
  //Jump
  if (isSpace && player.Velocity_Y === 0) {
    player.Velocity_Y = -4.5;
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
