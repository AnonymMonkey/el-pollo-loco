class Chicken extends MovableObject {
  x = this.chickenX;
  y = this.chickenY;
  speed = this.chickenSpeed;
  height = this.chickenSize;
  width = this.chickenSize;

  dead = false;

  offset = this.chickenSizeOffsets;

  IMAGES = this.imagesChicken;

  constructor() {
    super().getAllImages(this);
    this.loadFirstImage(this);
    this.loadAllImages(this);

    this.x = this.x + 500 + Math.random() * this.levelEndX;
    this.speed = this.speed + Math.random() * 0.8;
    this.animateModel();
  }

  animateModel() {
    let interval = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);

    setInterval(() => {
      if (this.dead == true) {
        this.playAnimation(this.chicken_Dead());
        clearInterval(interval);
      } else {
        this.playAnimation(this.chicken_Walking());
      }
    }, 160);
  }

  chicken_Walking() {
    return this.IMAGES[0]["IMAGES_WALKING"];
  }

  chicken_Dead() {
    return this.IMAGES[1]["IMAGES_DEAD"];
  }
}
