class ThrowableObject extends MovableObject {
  world;

  x = this.throwableObjectX;
  y = this.throwableObjectY;

  height = this.bottlesSize;
  width = this.bottlesSize;
  speedX = this.throwableObjectSpeedX;
  speedY = this.throwableObjectSpeedY;

  IMAGES = this.imagesBottle;

  constructor(x, y) {
    super().getAllImages(this);
    this.loadFirstImage(this, 1);
    this.loadAllImages(this);

    this.x = x;
    this.y = y;
    this.throw();

    this.animateModel();
  }

  throw() {
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 40);
  }

  animateModel() {
    setInterval(() => {
      this.playAnimation(this.bottle_Rotation());
    }, 120);
  }

  bottle_Rotation() {
    return this.IMAGES[1]["IMAGES_BOTTLE_ROTATION"];
  }

  bottle_Splash() {
    return this.IMAGES[2]["IMAGES_BOTTLE_SPLASH"];
  }
}
