// base game board and player

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 400,
    height = 800,
    player = {
      x : width/2,
      y : height - 5,
      width : 5,
      height : 5
    };

canvas.width = width;
canvas.height = height;

// draw a small red box, which will eventually become our player.
ctx.fillStyle = "red";
ctx.fillRect(player.x, player.y, player.width, player.height);
