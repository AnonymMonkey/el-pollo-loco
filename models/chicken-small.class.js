class Chicken_Small extends MovableObject {
  x = this.chickenX;
  y = this.chickenSmallY;
  speed = this.chickenSpeed;
  height = this.chickenSmallSize;
  width = this.chickenSmallSize;

  dead = false;
  soundPlayed = false;

  offset = this.chickenSmallSizeOffsets;

  IMAGES = this.imagesSmallChicken;

  sound_deathEnemie = new Audio(this.sound_deathEnemie);

  constructor() {
    super().getAllImages(this);
    this.loadFirstImage(this);
    this.loadAllImages(this);

    this.x = this.x + 500 + Math.random() * this.levelEndX;
    this.speed = this.speed + Math.random() * 0.8;

    this.animateModel();
  }

  /**
   *
   */
  animateModel() {
    this.smallChickenMovement();
    this.smallChickenAnimation();
  }

  /**
   *
   */
  smallChickenMovement() {
    let intervalMove = setInterval(() => {
      this.moveLeft(this.speed);
      if (this.dead) {
        clearInterval(intervalMove);
      }
    }, 1000 / 60);
  }

  /**
   *
   */
  smallChickenAnimation() {
    let intervalDead = setInterval(() => {
      this.sound_deathEnemie.pause();
      if (this.dead) {
        this.playSound(this.sound_deathEnemie);
        this.playAnimation(this.smallChicken_Dead());
        clearInterval(intervalDead);
      } else {
        this.playAnimation(this.smallChicken_Walking());
      }
    }, 160);
  }

  /**
   *
   * @returns
   */
  smallChicken_Walking() {
    return this.IMAGES[0]["IMAGES_WALKING"];
  }

  /**
   *
   * @returns
   */
  smallChicken_Dead() {
    return this.IMAGES[1]["IMAGES_DEAD"];
  }
}
