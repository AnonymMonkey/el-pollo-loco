class Endboss extends MovableObject {
  x = this.endbossX;
  y = this.endbossY;
  height = this.endbossSize;
  width = this.endbossSize;

  offset = this.endbossSizeOffsets;

  IMAGES = this.imagesEndboss;

  constructor() {
    super().getAllImages(this);
    this.loadFirstImage(this);
    this.loadAllImages(this);
    this.animateModel();
  }

  animateModel() {
    setInterval(() => {
      this.playAnimation(this.endboss_Alert());
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
