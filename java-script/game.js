let canvas;
let world;
let keyboard;
let coordinates;

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

/**
 * load game
 */
function init() {
  bodyElement = document.body;
  firstLoading = true;
  showStartScreen();
}

/**
 * show startscreen
 */
function showStartScreen(clicked) {
  checkClicked(clicked);
  if (firstLoading) {
    firstStartscreenLoading();
  } else {
    secStartscreenLoading();
  }
}

/**
 * show startscreen on first loading
 */
function firstStartscreenLoading() {
  bodyElement.innerHTML = HTML_Startscreen();
  firstLoading = false;
}

/**
 * show startscreen on all other loadings
 */
function secStartscreenLoading() {
  sound_click.play();
  infoscreen = document.getElementById("infoscreen");
  infoscreen.classList.remove("animation-fade-in");
  infoscreen.classList.add("animation-fade-out");
  setTimeout(() => {
    bodyElement.innerHTML = HTML_Startscreen();
  }, 250);
}

/**
 * show Informations
 * @param {boolean} clicked
 */
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

/**
 * start game
 * @param {boolean} clicked
 */
function startGame(clicked) {
  checkClicked(clicked);
  startscreen = document.getElementById("startscreen");
  startscreen.classList.remove("animation-fade-in");
  startscreen.classList.add("animation-fade-out");

  initialNewGame();
}

/**
 * initial for new Game
 */
function initialNewGame() {
  setTimeout(() => {
    bodyElement.innerHTML = HTML_StartGame();
    canvas = document.getElementById("canvas");
    loadLevel();
    coordinates = new Coordinates();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, coordinates);

    toggleSound();
    startscreen.classList.remove("animation-fade-out");
  }, 250);
}

/**
 * game end
 * @param {boolean} cancel
 */
function gameEnd(cancel) {
  isSoundActiv = true;
  toggleSound();
  checkIsGameCancel(cancel);
  if (lose) {
    setScreenToGameOver();
  } else {
    setScreenToGameWin();
  }
  firstLoading = true;
  resetGame();
}

/**
 * check is game canceled
 * @param {boolean} cancel
 */
function checkIsGameCancel(cancel) {
  if (cancel) {
    lose = true;
  }
}

/**
 * show lose screen
 */
function setScreenToGameOver() {
  sound_gameOver.play();
  bodyElement.innerHTML = HTML_GameOver();
}

/**
 * show win screen
 */
function setScreenToGameWin() {
  sound_gameWin.play();
  bodyElement.innerHTML = HTML_GameWin();
}

/**
 * reset game
 */
async function resetGame() {
  await clearAllIntervals();
  world = null;
}

/**
 * toggle fullscreen
 * @param {boolean} clicked
 */
function toggleFullScreen(clicked) {
  checkClicked(clicked);
  if (!isFullscreen) {
    enterFullscreen();
    isFullscreen = true;
  } else {
    exitFullscreen();
    isFullscreen = false;
  }
}

/**
 * set fullscreen
 * @param {html element} element
 */
function enterFullscreen() {
  if (gamescreen.requestFullscreen) {
    gamescreen.requestFullscreen();
  } else if (gamescreen.msRequestFullscreen) {
    gamescreen.msRequestFullscreen();
  } else if (gamescreen.webkitRequestFullscreen) {
    gamescreen.webkitRequestFullscreen();
  }
}

/**
 * exit fullscreen
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * toggle sound
 * @param {boolean} clicked
 */
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

/**
 * set background music
 */
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

/**
 *set battle music
 */
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

/**
 * check if a element was clicked
 * @param {boolean} clicked
 */
function checkClicked(clicked) {
  if (clicked) {
    sound_click.play();
  }
}

/**
 * stop all intervals
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * set landscape mode
 */
function updateOrientation() {
  function applyOrientationChange() {
    if (
      window.matchMedia("(max-width: 720px) and (orientation: portrait)")
        .matches
    ) {
      document.body.innerHTML = hidePortraitMode();
    } else {
      document.body.innerHTML = HTML_Startscreen();
    }
  }

  window.addEventListener("resize", applyOrientationChange);
  applyOrientationChange();
}

document.addEventListener("DOMContentLoaded", updateOrientation);

/*ANCHOR - Überprüfen das der fullscreen und landscape mode richtig funktioniert - danach dann jsdoc weiter */
