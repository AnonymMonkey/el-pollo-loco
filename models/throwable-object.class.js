class ThrowableObject extends MovableObject {
  world;

  x = this.throwableObjectX;
  y = this.throwableObjectY;

  height = this.bottlesSize;
  width = this.bottlesSize;
  speedX = this.throwableObjectSpeedX;
  speedY = this.throwableObjectSpeedY;

  offset = this.throwableObjectSizeOffsets;

  IMAGES = this.imagesBottle;

  isCollided = false;

  constructor(x, y) {
    super().getAllImages(this);
    this.loadFirstImage(this, 1);
    this.loadAllImages(this);

    this.x = x;
    this.y = y;
    this.throw(y);

    this.animateModel();
  }

  throw(y) {
    if (!this.isCollidingGround()) {
      this.applyGravity();
      setInterval(() => {
        this.x += 10;
        //console.log(y);
      }, 40);
    }
    if (this.isCollidingGround()) {
      debugger;
    }
  }

  animateModel() {
    let interval = setInterval(() => {
      if (this.isCollided) {
        this.playAnimation(this.bottle_Splash());
        clearInterval(interval);
      } else {
        this.playAnimation(this.bottle_Rotation());
      }
    }, 120);
  }

  bottle_Rotation() {
    return this.IMAGES[1]["IMAGES_BOTTLE_ROTATION"];
  }

  bottle_Splash() {
    return this.IMAGES[2]["IMAGES_BOTTLE_SPLASH"];
  }
}
