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

    document
      .getElementById("c-button")
      .addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_C = true;
      });

    document.getElementById("c-button").addEventListener("touchend", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_C = false;
    });

    document
      .getElementById("x-button")
      .addEventListener("touchstart", (e) => {
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

    document
      .getElementById("c-button")
      .addEventListener("mouseleave", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_C = false;
      });

    document.getElementById("x-button").addEventListener("click", (e) => {
      if (e.cancelable) e.preventDefault();
      this.KEY_X = true;
    });

    document
      .getElementById("x-button")
      .addEventListener("mouseleave", (e) => {
        if (e.cancelable) e.preventDefault();
        this.KEY_X = false;
      });
  }
}
