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
    /* debugger */
    super().getAllImages(this);
    this.loadFirstImage(this, index);
    this.loadAllImages(this);
    this.setPersentege();
    this.index = index;
    this.setCoordinates();
  }

  setCoordinates() {
    this.x = this.setX();
    this.y = this.setY();
  }

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
      return this.statusBarsY;
    }
  }

  setPersentege() {
    setInterval(() => {
      let path = this.getStatusBarPath()[this.getImageIndex()];
      this.img = this.imageCache[path];
    }, 1000 / 120);
  }

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

  healthStatusBar() {
    return this.index == 0;
  }

  coinStatusBar() {
    return this.index == 1;
  }

  bottleStatusBar() {
    return this.index == 2;
  }

  endbossStatusBar() {
    return this.index == 3;
  }

  getStatusBarPath() {
    let imagesIndex = this.IMAGES[this.index];
    return Object.values(imagesIndex)[4];
  }
}
