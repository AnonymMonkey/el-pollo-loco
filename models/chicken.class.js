class Chicken extends MovableObject {
  x = this.chickenX;
  y = this.chickenY;
  speed = this.chickenSpeed;
  height = this.chickenSize;
  width = this.chickenSize;

  wasHit = false;
  isDead = false;
  soundPlayed = false;

  offset = this.chickenSizeOffsets;

  IMAGES = this.imagesChicken;

  sound_deathEnemie_sec = new Audio(this.sound_deathEnemie_sec);

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
    this.chickenMovement();
    this.chickenAnimation();
  }

  /**
   * chicken movement
   */
  chickenMovement() {
    let intervalMove = setInterval(() => {
      this.moveLeft(this.speed);
      if (this.isDead) {
        clearInterval(intervalMove);
      }
    }, 1000 / 60);
  }

  /**
   * chicken animations
   */
  chickenAnimation() {
    let intervalDead = setInterval(() => {
      this.sound_deathEnemie_sec.pause();
      if (this.isDead) {
        this.playSound(this.sound_deathEnemie_sec);
        this.playAnimation(this.chicken_Dead());
        setTimeout(() => {
          this.y += 500;
        }, 999);
        clearInterval(intervalDead);
      } else {
        this.playAnimation(this.chicken_Walking());
      }
    }, 160);
  }

  /**
   * strings for chicken walking
   * @returns
   */
  chicken_Walking() {
    return this.IMAGES[0]["IMAGES_WALKING"];
  }

  /**
   * strings for chicken walking dead
   * @returns
   */
  chicken_Dead() {
    return this.IMAGES[1]["IMAGES_DEAD"];
  }
}
