class Keyboard {
  KEY_LEFT = false;
  KEY_RIGHT = false;
  KEY_UP = false;
  KEY_DOWN = false;
  KEY_SPACE = false;
  KEY_D = false;
  KEY_C = false;
  KEY_X = false;

  constructor() {
    this.bindButtons();
  }

  /**
   * Mainfunction for keybindings
   */
  bindButtons() {
    this.bindTouchButtons();
    this.bindClickButtons();
  }

  /**
   * Add actions to buttons on touch-event
   */
  bindTouchButtons() {
    document
      .getElementById("left-button")
      .addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_LEFT = true;
      });

    document.getElementById("left-button").addEventListener("touchend", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_LEFT = false;
    });

    document
      .getElementById("right-button")
      .addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_RIGHT = true;
      });

    document
      .getElementById("right-button")
      .addEventListener("touchend", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_RIGHT = false;
      });

    document
      .getElementById("attack-button")
      .addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_D = true;
      });

    document
      .getElementById("attack-button")
      .addEventListener("touchend", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_D = false;
      });

    document
      .getElementById("jump-button")
      .addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_UP = true;
      });

    document.getElementById("jump-button").addEventListener("touchend", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_UP = false;
    });

    document.getElementById("c-button").addEventListener("touchstart", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_C = true;
    });

    document.getElementById("c-button").addEventListener("touchend", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_C = false;
    });

    document.getElementById("x-button").addEventListener("touchstart", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_X = true;
    });

    document.getElementById("x-button").addEventListener("touchend", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_X = false;
    });
  }

  /**
   * Add actions to buttons on click-event
   */
  bindClickButtons() {
    document.getElementById("left-button").addEventListener("click", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_LEFT = true;
    });

    document
      .getElementById("left-button")
      .addEventListener("mouseleave", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_LEFT = false;
      });

    document.getElementById("right-button").addEventListener("click", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_RIGHT = true;
    });

    document
      .getElementById("right-button")
      .addEventListener("mouseleave", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_RIGHT = false;
      });

    document.getElementById("attack-button").addEventListener("click", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_D = true;
    });

    document
      .getElementById("attack-button")
      .addEventListener("mouseleave", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_D = false;
      });
    document.getElementById("jump-button").addEventListener("click", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_UP = true;
    });

    document
      .getElementById("jump-button")
      .addEventListener("mouseleave", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_UP = false;
      });

    document.getElementById("c-button").addEventListener("click", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_C = true;
    });

    document.getElementById("c-button").addEventListener("mouseleave", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_C = false;
    });

    document.getElementById("x-button").addEventListener("click", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_X = true;
    });

    document.getElementById("x-button").addEventListener("mouseleave", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_X = false;
    });
  }
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
