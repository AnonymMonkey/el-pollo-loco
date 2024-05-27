/**
 *
 * @returns
 */
function HTML_Startscreen() {
  return /*html*/ `
    <div id="startscreen" class="start-screen animation-fade-in">
      <h1 id="gameheadline">El pollo loco</h1>
      <img class="canvas-start-screen-background" src="assets/img/9_intro_outro_screens/start/startscreen_1.png" alt="background">
      <img onclick="startGame(true)" class="play-button c-pointer" src="assets/img/buttons/play.png" alt="start game">
      <img onclick="showGameInformations(true)" class="info-button c-pointer" src="assets/img/buttons/controlls.png" alt="info">
      <img onclick="showSubInformations(true)" class="subinfo-button c-pointer" src="assets/img/buttons/info.png" alt="info">
    </div>
    `;
}

/**
 *
 * @returns
 */
function HTML_ShowGameInformations() {
  return /*html*/ `
    <div id="infoscreen" class="information-screen animation-fade-in">
      <h1 id="gameheadline">El pollo loco</h1>
      <img onclick="showStartScreen(true, 'infoscreen')" class="back-button c-pointer" src="assets/img/buttons/home.png" alt="home">
      <h2>Controll Informations</h2>
      <div class="info-section">
        <img class="info-img" src="assets/img/buttons/arrow-keys.png" alt="arrow keys">
        <div class="f-d-column">
          <p>Push Arrow-Key <b>Left</b> to run left.</p>
          <p>Push Arrow-Key <b>Right</b> to run right.</p>
          <p>Push Arrow-Key <b>UP</b> to jump.</p>
        </div>
      </div>
      <div class="info-section">
        <img class="info-img" src="assets/img/buttons/key-d.png" alt="key D">
        <p>Push <b>D</b> to throw a bottle.</p>
      </div>
      <div class="info-section">
        <img class="info-img" src="assets/img/buttons/key-x.png" alt="key X">
        <p>Push <b>X</b> to exchange a Coin to LP.</p>
      </div>
      <div class="info-section">
        <img class="info-img" src="assets/img/buttons/key-c.png" alt="key C">
        <p>Push <b>C</b> to exchange a Coin to a Bottle.</p>
      </div>
    </div>
  `;
}

/**
 *
 * @returns
 */
function HTML_ShowSubInformations() {
  return /*html*/ `
    <div id="subinfoscreen" class="information-screen animation-fade-in">
      <h1 id="gameheadline">El pollo loco</h1>
      <img onclick="showStartScreen(true, 'subinfoscreen')" class="back-button c-pointer" src="assets/img/buttons/home.png" alt="home">
      <h2>Sub Informations</h2>
      <div onclick="showCreaterInformations(true)" class="info-section c-pointer">
        <img class="info-img" src="assets/img/buttons/createrinfo.png" alt="creater info">
        <p>Creater Informations</p>
      </div>
      <div onclick="showIconInformations(true)" class="info-section c-pointer">
        <img class="info-img" src="assets/img/buttons/icons8.png" alt="icons8">
        <p><b>icons8</b> Icons</p>
      </div>
    </div>
  `;
}

/**
 *
 * @returns
 */
function HTML_ShowCreaterInformations() {
  return /*html*/ `
    <div id="createrinfoscreen" class="information-screen animation-fade-in">
      <h1 id="gameheadline">El pollo loco</h1>
      <img onclick="showStartScreen(true, 'createrinfoscreen')" class="back-button c-pointer" src="assets/img/buttons/home.png" alt="back">
      <h2>Creater Informations</h2>
      <div class="info-section">
        <img class="info-img-sub c-pointer" src="assets/img/buttons/createrinfo.png" alt="creater info">
        <div class="info-section-sub">
          <h3>Creater Informations / Impressum</h3>
          <p>Andino Eichberger</p>
          <p>Niedersachen</p>
          <p>Deutschland</p>
        </div>
      </div>
    </div>
  `;
}

/**
 *
 * @returns
 */
function HTML_ShowIconsInformations() {
  return /*html*/ `
    <div id="iconinfoscreen" class="information-screen animation-fade-in">
      <h1 id="gameheadline">El pollo loco</h1>
      <img onclick="showStartScreen(true, 'iconinfoscreen')" class="back-button c-pointer" src="assets/img/buttons/home.png" alt="back">
      <h2>Used Icons</h2>
      <div class="icon-section">
        <div class="icon-section-list">
          <a target="_blank" href="https://icons8.com/icon/112794/eingekreistes-rangabzeichen-rechts">Eingekreistes Rangabzeichen Rechts</a>
          <a target="_blank" href="https://icons8.com/icon/122594/eingekreistes-rangabzeichen-links">Eingekreistes Rangabzeichen Links</a>
          <a target="_blank" href="https://icons8.com/icon/0XPuJ02VoSVO/in-alle-richtungen-skalieren">In alle Richtungen skalieren</a>
          <a target="_blank" href="https://icons8.com/icon/122523/hohe-lautst%C3%A4rke">Hohe Lautstärke</a>
          <a target="_blank" href="https://icons8.com/icon/1MsgfZwplLLs/informationen">Informationen</a>
          <a target="_blank" href="https://icons8.com/icon/p9Be4h9Lv7Lv/tilt">Auf Querformat drehen</a>
          <a target="_blank" href="https://icons8.com/icon/100721/contact-details">Contact Details</a>
          <a target="_blank" href="https://icons8.com/icon/tcO0Iv7jZSfm/icons8">Icons8 Neues Logo</a>
          <a target="_blank" href="https://icons8.com/icon/LuSUZvebpSVe/gaming-hand">Gaming Hand</a>
          <a target="_blank" href="https://icons8.com/icon/PchyK4ADRnOY/pfeiltasten">Pfeiltasten</a>
          <a target="_blank" href="https://icons8.com/icon/117337/target">Präzise Position</a>
          <a target="_blank" href="https://icons8.com/icon/xFKNzeO45ub2/springen">Springen</a>
          <a target="_blank" href="https://icons8.com/icon/109687/home-page">Startseite</a>
          <a target="_blank" href="https://icons8.com/icon/64164/stornieren">Stornieren</a>
          <a target="_blank" href="https://icons8.com/icon/102720/neustart">Neustart</a>
          <a target="_blank" href="https://icons8.com/icon/KPZ5j70Df1CN/mute">Stumm</a>
          <a target="_blank" href="https://icons8.com/icon/64042/ausgang">Ausgang</a>
          <a target="_blank" href="https://icons8.com/icon/122843/bilden">Bilden</a>
          <a target="_blank" href="https://icons8.com/icon/108805/play">Spielen</a>
          <a target="_blank" href="https://icons8.com/icon/tLu72cuow7xW/x">X</a>
          <a target="_blank" href="https://icons8.com/icon/nBKHe4Tn9k59/c">C</a>
          <a target="_blank" href="https://icons8.com/icon/QByB9INqGyTh/d">D</a>
        </div>
        <p>All Icons from <a target="_blank" href="https://icons8.com">Icons8</a></p>
      </div>
    </div>
  `;
}

/**
 *
 * @returns
 */
function HTML_StartGame() {
  return /*html*/ `
  <div id="gamescreen" class="game-screen animation-rotate-in">
    <h1 id="gameheadline">El pollo loco</h1>
    <canvas id="canvas" width="720px" height="480px"></canvas>
    <div class="game-buttons">
      <img onclick="toggleSound(true)" id="soundbutton" class="sound-button c-pointer" src="assets/img/buttons/sound-on.png" alt="toggle sound">
      <img onclick="toggleFullScreen(true)" id="fullcscreen-button" class="fullscreen-button c-pointer" src="assets/img/buttons/fullscreen.png" alt="toggle fullscreen">
    </div>
    <div class="cancel-button">
      <img onclick="gameEnd(true)" id="cancel-button" class="c-pointer" src="assets/img/buttons/cancel.png" alt="cancel">
    </div>
    <div id="landscape-nav-left" class="landscape-navigation-left">
      <img onclick="checkClicked(true)" id="left-button" class="landscape-smaller-img c-pointer" src="assets/img/buttons/left.png" alt="left">
      <img onclick="checkClicked(true)" id="right-button" class="landscape-smaller-img c-pointer" src="assets/img/buttons/right.png" alt="right">
    </div>
    <div class="landscape-navigation-mid">
      <div>
        <img class="landscape-smaller-img-sub" src="assets/img/7_statusbars/3_icons/icon_health.png" alt="exchange heal">
        <img onclick="checkClicked(true)" id="x-button" class="landscape-smaller-img c-pointer" src="assets/img/buttons/key-x.png" alt="exchange heal">
      </div>
      <div>
        <img onclick="checkClicked(true)" id="c-button" class="landscape-smaller-img c-pointer" src="assets/img/buttons/key-c.png" alt="exchange bottle">
        <img class="landscape-smaller-img-sub" src="assets/img/7_statusbars/3_icons/icon_salsa_bottle.png" alt="exchange bottle">
      </div>
    </div>
    <div id="landscape-nav-right" class="landscape-navigation-right">
      <img onclick="checkClicked(true)" id="jump-button" class="landscape-smaller-img c-pointer" src="assets/img/buttons/jump.png" alt="jump">
      <img onclick="checkClicked(true)" id="attack-button" class="landscape-smaller-img c-pointer" src="assets/img/buttons/attack.png" alt="attack">
    </div>
  </div>
      `;
}

/**
 *
 * @returns
 */
function HTML_GameOver() {
  return /*html*/ `
    <div class="game-end-screen shake">
      <h1 id="gameheadline">El pollo loco</h1>
      <div class="game-end-screen-inner">
        <img class="game-end-img animation-rotate-in animation-rotate-infinite" src="assets/img/9_intro_outro_screens/game_over/game over!.png" alt="game over">
        <div onclick="showStartScreen(true)" class="game-end-exit-section c-pointer">
          <img src="assets/img/buttons/exit.png" alt="">
          <p>Exit Game</p>
        </div>
        <div class="game-end-img-section">
          <img class="game-end-chicken-left" src="assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png" alt="">
          <img class="game-end-pepe" src="assets/img/2_character_pepe/1_idle/idle/I-10.png" alt="Pepe">
          <img class="game-end-chicken-right" src="assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png" alt="">
        </div>
      </div>
    </div>
  `;
}

/**
 *
 * @returns
 */
function HTML_GameWin() {
  return /*html*/ `
    <div class="game-end-screen">
      <h1 id="gameheadline">El pollo loco</h1>
      <div class="game-end-screen-inner">
        <img class="game-end-img animation-rotate-in animation-rotate-infinite" src="assets/img/9_intro_outro_screens/win/win_2.png" alt="game win">
        <div onclick="showStartScreen(true)" class="game-end-exit-section c-pointer">
          <img src="assets/img/buttons/exit.png" alt="">
          <p>Exit Game</p>
        </div>
        <div class="game-end-img-section">
          <img class="game-end-boss-left animation-rotate-in" src="assets/img/4_enemie_boss_chicken/5_dead/G24.png" alt="">
          <img class="game-end-pepe" src="assets/img/2_character_pepe/3_jump/J-35.png" alt="Pepe">
          <img class="game-end-boss-right animation-rotate-in" src="assets/img/4_enemie_boss_chicken/5_dead/G26.png" alt="">
        </div>
      </div>
    </div>
  `;
}

/**
 *
 * @returns
 */
function hidePortraitMode() {
  return /*html*/ `
    <div class="landscape-notification">
      <h1>Please rotate your Phone to Landscape mode.</h1>
      <img src="assets/img/buttons/landscape.png" alt="landscape mode">
    </div>
  `;
}
