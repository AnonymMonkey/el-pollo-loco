function HTML_Startscreen(bodyElement) {
  return /*html*/ `
    <div id="startscreen" class="start-screen animation-fade-in">
      <img class="canvas-start-screen-background" src="assets/img/9_intro_outro_screens/start/startscreen_1.png" alt="background">
      <img class="playbutton c-pointer" src="assets/img/buttons/play.png" alt="start game">
      <img onclick="showInformations(bodyElement)" class="infobutton c-pointer" src="assets/img/buttons/info.png" alt="info">
    </div>
    `;
}

function HTML_ShowInformations(bodyElement) {
  return /*html*/ `
    <div id="infoscreen" class="information-screen animation-fade-in">
      <img onclick="showStartScreen(bodyElement)" class="backbutton c-pointer" src="assets/img/buttons/back.png" alt="back">
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
