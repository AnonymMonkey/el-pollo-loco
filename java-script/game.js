let canvas;
let world;
let keyboard = new Keyboard();
let coordinates = new Coordinates();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, coordinates);
}

document.addEventListener('keydown', (e) => {
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
});

document.addEventListener('keyup', (e) => {
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
});