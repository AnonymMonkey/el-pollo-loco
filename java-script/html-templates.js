function HTML_Startscreen() {
  return /*html*/ `
    <div id="startscreen" class="start-screen animation-fade-in">
      <h1>El pollo loco</h1>
      <img class="canvas-start-screen-background" src="assets/img/9_intro_outro_screens/start/startscreen_1.png" alt="background">
      <img onclick="startGame(true)" class="play-button c-pointer" src="assets/img/buttons/play.png" alt="start game">
      <img onclick="showInformations(true)" class="info-button c-pointer" src="assets/img/buttons/info.png" alt="info">
    </div>
    `;
}

function HTML_ShowInformations() {
  return /*html*/ `
    <div id="infoscreen" class="information-screen animation-fade-in">
      <h1>El pollo loco</h1>
      <img onclick="showStartScreen(true)" class="back-button c-pointer" src="assets/img/buttons/back.png" alt="back">
      <h2>Controll Informations</h2>
      <div class="info-section">
        <img class="info-img" src="assets/img/buttons/arrow-keys.png" alt="arrow keys">
        <div class="f-d-column">
          <p>Push Arrow-Key <b>Left</b> to run left.</p>
          <p>Push Arrow-Key <b>Right</b> to run right.</p>
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

function HTML_StartGame() {
  return /*html*/ `
  <div id="gamescreen" class="game-screen animation-rotate-in">
    <h1>El pollo loco</h1>
    <canvas id="canvas" width="720px" height="480px"></canvas>
    <div class="game-buttons">
      <img onclick="toggleSound(true)" id="soundbutton" class="sound-button c-pointer" src="assets/img/buttons/sound-on.png" alt="toggle sound">
      <img onclick="toggleFullScreen(true)" class="fullscreen-button c-pointer" src="assets/img/buttons/fullscreen.png" alt="toggle fullscreen">
    </div>
  </div>
      `;
}

function HTML_GameOver() {
  return /*html*/ `
    <div class="game-end-screen shake">
      <h1>El pollo loco</h1>
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

function HTML_GameWin() {
  return /*html*/ `
    <div class="game-end-screen">
      <h1>El pollo loco</h1>
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
