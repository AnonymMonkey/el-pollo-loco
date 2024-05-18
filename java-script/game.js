let canvas;
let world;
let keyboard;
let coordinates;

let bodyElement;

let firstLoading = false;
let isFullscreen = false;

function init() {
  bodyElement = document.body;
  firstLoading = true;
  showStartScreen();
  //gameOver();
}

function showStartScreen() {
  if (firstLoading) {
    bodyElement.innerHTML = HTML_Startscreen();
    firstLoading = false;
  } else {
    infoscreen = document.getElementById("infoscreen");
    infoscreen.classList.remove("animation-fade-in");
    infoscreen.classList.add("animation-fade-out");
    setTimeout(() => {
      bodyElement.innerHTML = HTML_Startscreen();
    }, 250);
  }
}

function showInformations() {
  startscreen = document.getElementById("startscreen");
  startscreen.classList.remove("animation-fade-in");
  startscreen.classList.add("animation-fade-out");
  setTimeout(() => {
    bodyElement.innerHTML = HTML_ShowInformations();
    startscreen.classList.remove("animation-fade-out");
  }, 250);
}

function startGame() {
  startscreen = document.getElementById("startscreen");
  startscreen.classList.remove("animation-fade-in");
  startscreen.classList.add("animation-fade-out");

  setTimeout(() => {
    bodyElement.innerHTML = HTML_StartGame();
    canvas = document.getElementById("canvas");
    loadLevel();
    world = new World(canvas, keyboard, coordinates);
    startscreen.classList.remove("animation-fade-out");
  }, 250);
}

async function gameOver() {
  console.log("Spiel ende");
  await clearAllIntervals();
  bodyElement.innerHTML = HTML_GameOver();
  firstLoading = true;

  resetGame();
}

function resetGame() {
  clearAllIntervals();
}

// fullscreen
function toggleFullScreen() {
  if (!isFullscreen) {
    enterFullscreen(gamescreen);
    //enterFullscreen(canvas);
    isFullscreen = true;
  } else {
    exitFullscreen();
    isFullscreen = false;
  }
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// stop intervals
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

// Keys
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
