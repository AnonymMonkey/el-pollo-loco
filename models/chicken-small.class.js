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
        this.playAnimation(this.smallChicken_Dead());
        clearInterval(intervalDead);
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
