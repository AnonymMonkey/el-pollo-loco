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

  deadSoundPlayed = false;

  sound_endboss = new Audio(new Sounds().sound_endboss);
  sound_deathEndboss = new Audio(new Sounds().sound_deathEndboss);
  sound_endboss_hit = new Audio(new Sounds().sound_endboss_hit);

  constructor() {
    super().getAllImages(this);
    this.loadFirstImage(this);
    this.loadAllImages(this);
    this.animateModel();
  }

  /**
   *
   */
  animateModel() {
    this.endbossMovement();
    this.endbossAnimation();
  }

  /**
   *
   */
  endbossMovement() {
    setInterval(() => {
      if (this.hasDiscoveredCharacter && !this.dead) {
        let intervalMove = setInterval(() => {
          this.endbossMoveLeft();
          if (this.dead) {
            this.endbossDied(intervalMove);
          }
        }, 200);
      }
    }, 160);
  }

  /**
   *
   */
  endbossMoveLeft() {
    this.moveLeft(this.speed);
    this.playSound(this.sound_endboss);
    setTimeout(() => {
      battleMusic();
    }, 500);
  }

  /**
   *
   */
  endbossDied(intervalMove) {
    if (!this.deadSoundPlayed) {
      this.soundPlayed = false;
      this.deadSoundPlayed = true;
    }
    this.playSound(this.sound_deathEndboss);
    clearInterval(intervalMove);
  }

  /**
   *
   */
  endbossAnimation() {
    setInterval(() => {
      if (!this.hasDiscoveredCharacter) {
        this.playAnimation(this.endboss_Alert());
      } else if (this.wasHit && !this.dead) {
        this.endbossHurt();
      } else if (this.dead) {
        this.playAnimation(this.endboss_Dead());
      } else {
        this.playAnimation(this.endboss_Walking());
      }
    }, 160);
  }

  /**
   *
   */
  endbossHurt() {
    this.soundPlayed = false;
    this.playAnimation(this.endboss_Hurt());
    this.playSound(this.sound_endboss_hit);
    setTimeout(() => {
      this.wasHit = false;
    }, 500);
  }

  /**
   *
   * @returns
   */
  endboss_Walking() {
    return this.IMAGES[0]["IMAGES_WALKING"];
  }

  /**
   *
   * @returns
   */
  endboss_Alert() {
    return this.IMAGES[1]["IMAGES_ALERT"];
  }

  /**
   *
   * @returns
   */
  endboss_Attack() {
    return this.IMAGES[2]["IMAGES_ATTACK"];
  }

  /**
   *
   * @returns
   */
  endboss_Hurt() {
    return this.IMAGES[3]["IMAGES_HURT"];
  }

  /**
   *
   * @returns
   */
  endboss_Dead() {
    return this.IMAGES[4]["IMAGES_DEAD"];
  }
}
