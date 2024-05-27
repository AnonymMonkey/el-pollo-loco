let canvas;
let world;
let keyboard;
let coordinates;

let bodyElement;

let firstLoading = false;
let isGameStarted = false;
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
  updateOrientation();
  bodyElement.innerHTML = HTML_ShowIconsInformations();
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
function showGameInformations(clicked) {
  checkClicked(clicked);
  startscreen = document.getElementById("startscreen");
  startscreen.classList.remove("animation-fade-in");
  startscreen.classList.add("animation-fade-out");
  setTimeout(() => {
    bodyElement.innerHTML = HTML_ShowGameInformations();
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
    isGameStarted = true;

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
  let gameContent = document.getElementById("gamescreen");
  checkClicked(clicked);
  if (!isFullscreen) {
    enterFullscreen(gameContent);
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
function enterFullscreen(gameContent) {
  if (gameContent.requestFullscreen) {
    gameContent.requestFullscreen();
  } else if (gameContent.msRequestFullscreen) {
    gameContent.msRequestFullscreen();
  } else if (gameContent.webkitRequestFullscreen) {
    gameContent.webkitRequestFullscreen();
  } else if (gameContent.mozRequestFullScreen) {
    gameContent.mozRequestFullScreen();
  }
}

/**
 * exit fullscreen
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
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
    if (document.fullscreenElement) {
      return;
    }

    let gameContent = document.getElementById("gamescreen");
    if (
      window.matchMedia("(max-width: 720px) and (orientation: portrait)")
        .matches
    ) {
      document.body.innerHTML = hidePortraitMode();
    } else {
      if (!isGameStarted) {
        document.body.innerHTML = HTML_Startscreen();
      } else {
        document.body.innerHTML = ""; // Clear the body
        isSoundActiv = false;
        firstLoading = true;
        backgroundMusic();
        resetGame();
        showStartScreen();
      }
    }
  }

  window.addEventListener("resize", applyOrientationChange);
  applyOrientationChange();
}

document.addEventListener("DOMContentLoaded", updateOrientation);

/*ANCHOR - Überprüfen das der fullscreen und landscape mode richtig funktioniert - danach dann jsdoc weiter */
