class StatusBar extends DrawableObject {
  world;
  index;

  x;
  y;
  height = this.statusBarsSize;
  width = this.statusBarsSize * 3;

  IMAGES = this.imagesStatusBars;

  coinCache = 0;
  bottleCache = 0;

  endbossEnergy = 5;

  constructor(index) {
    super().getAllImages(this);
    this.loadFirstImage(this, index);
    this.loadAllImages(this);
    this.setPersentege();
    this.index = index;
    this.setCoordinates();
  }

  /**
   * set statusbar coordinates
   */
  setCoordinates() {
    this.x = this.setX();
    this.y = this.setY();
  }

  /**
   * set statusbar X
   * @returns
   */
  setX() {
    if (this.healthStatusBar()) {
      return this.statusBarsX;
    }
    if (this.coinStatusBar()) {
      return this.statusBarsX;
    }
    if (this.bottleStatusBar()) {
      return this.statusBarsX;
    }
    if (this.endbossStatusBar()) {
      return (this.statusBarsX =
        this.canvasWidth - this.width - this.statusBarsX);
    }
  }

  /**
   * set statusbar Y
   * @returns
   */
  setY() {
    if (this.healthStatusBar()) {
      return this.statusBarsY;
    }
    if (this.coinStatusBar()) {
      return this.statusBarsY + 50;
    }
    if (this.bottleStatusBar()) {
      return this.statusBarsY + 50 * 2;
    }
    if (this.endbossStatusBar()) {
      return this.statusBarsY + 75;
    }
  }

  /**
   * set statusbar persentege
   */
  setPersentege() {
    setInterval(() => {
      let path = this.getStatusBarPath()[this.getImageIndex()];
      this.img = this.imageCache[path];
    }, 1000 / 120);
  }

  /**
   * get statusbar image index
   * @returns
   */
  getImageIndex() {
    if (this.healthStatusBar()) {
      return this.getHealthImageIndex();
    }
    if (this.coinStatusBar()) {
      return this.getCoinImageIndex();
    }
    if (this.bottleStatusBar()) {
      return this.getBottleImageIndex();
    }
    if (this.endbossStatusBar()) {
      return this.getEndbossImageIndex();
    }
  }

  /**
   * get statusbar health image index
   * @returns
   */
  getHealthImageIndex() {
    if (this.world.character.characterEnergy == 100) {
      return 5;
    } else if (this.world.character.characterEnergy >= 80) {
      return 5;
    } else if (this.world.character.characterEnergy >= 60) {
      return 4;
    } else if (this.world.character.characterEnergy >= 40) {
      return 3;
    } else if (this.world.character.characterEnergy >= 20) {
      return 2;
    } else if (
      this.world.character.characterEnergy > 0 &&
      this.world.character.characterEnergy < 20
    ) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * get statusbar coin image index
   * @returns
   */
  getCoinImageIndex() {
    if (this.coinCache == 5) {
      return 5;
    } else if (this.coinCache == 4) {
      return 4;
    } else if (this.coinCache == 3) {
      return 3;
    } else if (this.coinCache == 2) {
      return 2;
    } else if (this.coinCache == 1) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * get statusbar bottle image index
   * @returns
   */
  getBottleImageIndex() {
    if (this.bottleCache == 5) {
      return 5;
    } else if (this.bottleCache == 4) {
      return 4;
    } else if (this.bottleCache == 3) {
      return 3;
    } else if (this.bottleCache == 2) {
      return 2;
    } else if (this.bottleCache == 1) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * get statusbar endboss image index
   * @returns
   */
  getEndbossImageIndex() {
    if (this.endbossEnergy == 0) {
      return 0;
    } else if (this.endbossEnergy == 1) {
      return 1;
    } else if (this.endbossEnergy == 2) {
      return 2;
    } else if (this.endbossEnergy == 3) {
      return 3;
    } else if (this.endbossEnergy == 4) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * statusbar health
   * @returns
   */
  healthStatusBar() {
    return this.index == 0;
  }

  /**
   * statusbar coin
   * @returns
   */
  coinStatusBar() {
    return this.index == 1;
  }

  /**
   * statusbar bottle
   * @returns
   */
  bottleStatusBar() {
    return this.index == 2;
  }

  /**
   * statusbar endboss
   * @returns
   */
  endbossStatusBar() {
    return this.index == 3;
  }

  /**
   * get statusbar path
   * @returns
   */
  getStatusBarPath() {
    let imagesIndex = this.IMAGES[this.index];
    return Object.values(imagesIndex)[4];
  }
}
