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
   * animate model
   */
  animateModel() {
    this.smallChickenMovement();
    this.smallChickenAnimation();
  }

  /**
   * small chicken movement
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
   * small chicken animations
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
   * strings for small chicken walking
   * @returns
   */
  smallChicken_Walking() {
    return this.IMAGES[0]["IMAGES_WALKING"];
  }

  /**
   * strings for small chicken dead
   * @returns
   */
  smallChicken_Dead() {
    return this.IMAGES[1]["IMAGES_DEAD"];
  }
}
