class Endboss extends MovableObject {
  x = this.endbossX;
  y = this.endbossY;
  speed = this.endbossSpeed;
  height = this.endbossSize;
  width = this.endbossSize;

  offset = this.endbossSizeOffsets;

  IMAGES = this.imagesEndboss;

  hasDiscoveredCharacter = false;
  wasHit = false;
  dead = false;

  constructor() {
    super().getAllImages(this);
    this.loadFirstImage(this);
    this.loadAllImages(this);
    this.animateModel();
  }

  animateModel() {
    setInterval(() => {
      if (this.hasDiscoveredCharacter) {
        let intervalMove = setInterval(() => {
          this.moveLeft(this.speed);
          if (this.dead) {
            clearInterval(intervalMove);
          }
        }, 200);
      }
    }, 160);

    setInterval(() => {
      if (!this.hasDiscoveredCharacter) {
        this.playAnimation(this.endboss_Alert());
      } else if (this.wasHit && !this.dead) {
        this.playAnimation(this.endboss_Hurt());
        setTimeout(() => {
          this.wasHit = false;
        }, 500);
      } else if (this.dead) {
        this.playAnimation(this.endboss_Dead());
      } else {
        this.playAnimation(this.endboss_Walking());
      }
    }, 160);
  }

  endboss_Walking() {
    return this.IMAGES[0]["IMAGES_WALKING"];
  }

  endboss_Alert() {
    return this.IMAGES[1]["IMAGES_ALERT"];
  }

  endboss_Attack() {
    return this.IMAGES[2]["IMAGES_ATTACK"];
  }

  endboss_Hurt() {
    return this.IMAGES[3]["IMAGES_HURT"];
  }

  endboss_Dead() {
    return this.IMAGES[4]["IMAGES_DEAD"];
  }
}
