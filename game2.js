let canvas = null;
let grphix = null;
let img = null;

let onImgLoad = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  grphix.drawImage(img, 0, 0);
};

let startUp= function () {
  canvas = document.getElementById('canvas');
  grphix = canvas.getContext('2d');

  img = new Image();
  img.onLoad = onImgLoad;
  img.src = 'Jungle Asset Pack/Character/sprites/idle.gif';
}
