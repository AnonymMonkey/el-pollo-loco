let canvas;
let world;
let keyboard = new Keyboard();
let coordinates = new Coordinates();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, coordinates);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.KEY_RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.KEY_LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.KEY_UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.KEY_DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.KEY_SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.KEY_D = true;
  }
  if (e.keyCode == 67) {
    keyboard.KEY_C = true;
  }
  if (e.keyCode == 88) {
    keyboard.KEY_X = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.KEY_RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.KEY_LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.KEY_UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.KEY_DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.KEY_SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.KEY_D = false;
  }
  if (e.keyCode == 67) {
    keyboard.KEY_C = false;
  }
  if (e.keyCode == 88) {
    keyboard.KEY_X = false;
  }
});
