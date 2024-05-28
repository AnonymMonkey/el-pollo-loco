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
}

/**
 * show startscreen
 */
function showStartScreen(clicked, lastPage) {
  checkClicked(clicked);
  if (firstLoading) {
    firstStartscreenLoading();
  } else {
    secStartscreenLoading(lastPage);
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
function secStartscreenLoading(lastPage) {
  //sound_click.play();
  lastPage = document.getElementById(lastPage);
  lastPage.classList.remove("animation-fade-in");
  lastPage.classList.add("animation-fade-out");
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
 *
 * @param {*} clicked
 */
function showSubInformations(clicked) {
  checkClicked(clicked);
  startscreen = document.getElementById("startscreen");
  startscreen.classList.remove("animation-fade-in");
  startscreen.classList.add("animation-fade-out");
  setTimeout(() => {
    bodyElement.innerHTML = HTML_ShowSubInformations();
    startscreen.classList.remove("animation-fade-out");
  }, 250);
}

/**
 *
 * @param {*} clicked
 */
function showCreaterInformations(clicked) {
  checkClicked(clicked);
  subinfoscreen = document.getElementById("subinfoscreen");
  subinfoscreen.classList.remove("animation-fade-in");
  subinfoscreen.classList.add("animation-fade-out");
  setTimeout(() => {
    bodyElement.innerHTML = HTML_ShowCreaterInformations();
    subinfoscreen.classList.remove("animation-fade-out");
  }, 250);
}

/**
 *
 * @param {*} clicked
 */
function showIconInformations(clicked) {
  checkClicked(clicked);
  subinfoscreen = document.getElementById("subinfoscreen");
  subinfoscreen.classList.remove("animation-fade-in");
  subinfoscreen.classList.add("animation-fade-out");
  setTimeout(() => {
    bodyElement.innerHTML = HTML_ShowIconsInformations();
    subinfoscreen.classList.remove("animation-fade-out");
  }, 250);
}

/**
 * show loader
 */
function showLoader() {
  bodyElement.innerHTML += HTML_loader();
}

/**
 * hide loader
 */
function hideLoader() {
  let loader = document.querySelector(".wrapper");
  if (loader) {
    loader.remove();
  }
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

  showLoader();

  initialNewGame();
}

/**
 * initial for new Game
 */
function initialNewGame() {
  setTimeout(() => {
    bodyElement.innerHTML = HTML_StartGame();
    showLoader();
    canvas = document.getElementById("canvas");
    loadLevel();
    coordinates = new Coordinates();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, coordinates);
    isGameStarted = true;

    toggleSound();
  }, 250);
  setTimeout(hideLoader, 2500);
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
    if (
      window.matchMedia("(max-width: 720px) and (orientation: portrait)")
        .matches
    ) {
      document.body.innerHTML = hidePortraitMode();
    } else {
      if (!isGameStarted) {
        document.body.innerHTML = HTML_Startscreen();
      } else {
        resetAndShowStartscreen();
      }
    }
  }

  window.addEventListener("resize", applyOrientationChange);
  applyOrientationChange();
}

/**
 * Game reset if resize Window
 */
function resetAndShowStartscreen() {
  document.body.innerHTML = "";
  isSoundActiv = false;
  firstLoading = true;
  backgroundMusic();
  resetGame();
  showStartScreen();
}

document.addEventListener("DOMContentLoaded", updateOrientation);
