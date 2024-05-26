class Bottle extends MovableObject {
  x = this.bottlesX;
  y = this.bottlesY;
  height = this.bottlesSize;
  width = this.bottlesSize;

  offset = this.bottleSizeOffsets;

  IMAGES = this.imagesBottle;

  sound_collect_bottle = new Audio(new Sounds().sound_collect_bottle);

  collected = false;

  constructor() {
    super().getAllImages(this);
    this.loadFirstImage(this);
    this.loadAllImages(this);

    this.x = this.x + Math.random() * 1600;

    this.animateModel();
  }

  /**
   *
   */
  animateModel() {
    let intervalAnimation = setInterval(() => {
      this.playAnimation(this.bottle_Normal());
      if (this.collected) {
        this.playSound(this.sound_collect_bottle);
        clearInterval(intervalAnimation);
      }
    }, 250);
  }

  /**
   *
   * @returns
   */
  bottle_Normal() {
    return this.IMAGES[0]["IMAGES_BOTTLE"];
  }

  /**
   *
   * @returns
   */
  bottle_Rotation() {
    return this.IMAGES[1]["IMAGES_BOTTLE_ROTATION"];
  }

  /**
   *
   * @returns
   */
  bottle_Splash() {
    return this.IMAGES[2]["IMAGES_BOTTLE_SPLASH"];
  }
}
