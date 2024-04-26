class Chicken_Small extends MovableObject {
  x = this.chickenX;
  y = this.chickenSmallY;
  speed = this.chickenSpeed;
  height = this.chickenSmallSize;
  width = this.chickenSmallSize;

  dead = false;

  offset = this.chickenSmallSizeOffsets;

  IMAGES = this.imagesSmallChicken;

  constructor() {
    super().getAllImages(this);
    this.loadFirstImage(this);
    this.loadAllImages(this);
    // this.x = this.x + 500 + Math.random() * this.levelEndX;
    this.x = 600;
    this.speed = this.speed + Math.random() * 0.8;
    this.animateModel();
  }

  animateModel() {
    //setInterval(() => {
    //    this.moveLeft(this.speed);
    //}, 1000 / 60);

    setInterval(() => {
      if (this.dead == true) {
        this.playAnimation(this.smallChicken_Dead());
      } else {
        this.playAnimation(this.smallChicken_Walking());
      }
    }, 160);
  }

  smallChicken_Walking() {
    return this.IMAGES[0]["IMAGES_WALKING"];
  }

  smallChicken_Dead() {
    return this.IMAGES[1]["IMAGES_DEAD"];
  }
}
