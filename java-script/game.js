let canvas;
let world;
let keyboard = new Keyboard();
let coordinates = new Coordinates();

let bodyElement;

let firstLoading = false;
let isFullscreen = false;
let isSoundActiv = false;

let lose = false;

game_sound = new Audio(new Sounds().sound_backgroundMusic);
sound_endboss_battle = new Audio(new Sounds().sound_endboss_battle);
sound_gameWin = new Audio(new Sounds().sound_gameWin);
sound_gameOver = new Audio(new Sounds().sound_gameOver);
sound_click = new Audio(new Sounds().sound_click);

function init() {
  bodyElement = document.body;
  firstLoading = true;
  showStartScreen();
}

function showStartScreen(clicked) {
  checkClicked(clicked);
  if (firstLoading) {
    bodyElement.innerHTML = HTML_Startscreen();
    firstLoading = false;
  } else {
    sound_click.play();
    infoscreen = document.getElementById("infoscreen");
    infoscreen.classList.remove("animation-fade-in");
    infoscreen.classList.add("animation-fade-out");
    setTimeout(() => {
      bodyElement.innerHTML = HTML_Startscreen();
    }, 250);
  }
}

function showInformations(clicked) {
  checkClicked(clicked);
  startscreen = document.getElementById("startscreen");
  startscreen.classList.remove("animation-fade-in");
  startscreen.classList.add("animation-fade-out");
  setTimeout(() => {
    bodyElement.innerHTML = HTML_ShowInformations();
    startscreen.classList.remove("animation-fade-out");
  }, 250);
}

function startGame(clicked) {
  checkClicked(clicked);
  startscreen = document.getElementById("startscreen");
  startscreen.classList.remove("animation-fade-in");
  startscreen.classList.add("animation-fade-out");

  setTimeout(() => {
    bodyElement.innerHTML = HTML_StartGame();
    canvas = document.getElementById("canvas");
    loadLevel();
    world = new World(canvas, keyboard, coordinates);
    toggleSound();
    startscreen.classList.remove("animation-fade-out");
  }, 250);
}

function gameEnd() {
  isSoundActiv = true;
  //debugger;
  toggleSound();
  if (lose) {
    sound_gameOver.play();
    bodyElement.innerHTML = HTML_GameOver();
  } else {
    sound_gameWin.play();
    bodyElement.innerHTML = HTML_GameWin();
  }
  firstLoading = true;
  resetGame();
}

async function resetGame() {
  await clearAllIntervals();
  world = null;
  keyboard = new Keyboard();
  coordinates = new Coordinates();
}

// fullscreen
function toggleFullScreen(clicked) {
  checkClicked(clicked);
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

// toggle Sound on/off
function toggleSound(clicked) {
  checkClicked(clicked);
  if (!isSoundActiv) {
    isSoundActiv = !isSoundActiv;
    soundbutton.src = "assets/img/buttons/sound-on.png";
    backgroundMusic();
  } else {
    isSoundActiv = !isSoundActiv;
    soundbutton.src = "assets/img/buttons/sound-off.png";
    backgroundMusic();
    battleMusic();
  }
}

function backgroundMusic() {
  if (isSoundActiv) {
    game_sound.play();
    game_sound.loop = true;
    game_sound.volume = 0.5;
  } else {
    game_sound.pause();
    game_sound.currentTime = 0;
  }
}

function battleMusic() {
  if (isSoundActiv) {
    sound_endboss_battle.play();
    sound_endboss_battle.loop = true;
    sound_endboss_battle.volume = 0.5;
  } else {
    sound_endboss_battle.pause();
    sound_endboss_battle.currentTime = 0;
  }
}

function checkClicked(clicked) {
  if (clicked) {
    sound_click.play();
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
