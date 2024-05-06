class Chicken extends MovableObject {
  x = this.chickenX;
  y = this.chickenY;
  speed = this.chickenSpeed;
  height = this.chickenSize;
  width = this.chickenSize;

  dead = false;
  soundPlayed = false;

  offset = this.chickenSizeOffsets;

  IMAGES = this.imagesChicken;

  dead_sound = new Audio(this.sound_deathEnemie);

  constructor() {
    super().getAllImages(this);
    this.loadFirstImage(this);
    this.loadAllImages(this);

    this.x = this.x + 500 + Math.random() * this.levelEndX;
    this.speed = this.speed + Math.random() * 0.8;

    this.animateModel();
  }

  animateModel() {
    let intervalMove = setInterval(() => {
      this.moveLeft(this.speed);
      if (this.dead) {
        clearInterval(intervalMove);
      }
    }, 1000 / 60);

    let intervalDead = setInterval(() => {
      this.dead_sound.pause();
      if (this.dead) {
        this.playSound(this.dead_sound);
        this.playAnimation(this.chicken_Dead());
        clearInterval(intervalDead);
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
