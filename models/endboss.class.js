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
  isDead = false;

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
   * animate model
   */
  animateModel() {
    this.endbossMovement();
    this.endbossAnimation();
  }

  /**
   * endboss movement
   */
  endbossMovement() {
    setInterval(() => {
      if (this.hasDiscoveredCharacter && !this.isDead) {
        let intervalMove = setInterval(() => {
          this.endbossMoveLeft();
          if (this.isDead) {
            this.endbossDied(intervalMove);
          }
        }, 200);
      }
    }, 160);
  }

  /**
   * endboss move left
   */
  endbossMoveLeft() {
    this.moveLeft(this.speed);
    this.playSound(this.sound_endboss);
    setTimeout(() => {
      battleMusic();
    }, 500);
  }

  /**
   * endboss died
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
   * endboss animations
   */
  endbossAnimation() {
    setInterval(() => {
      if (!this.hasDiscoveredCharacter) {
        this.playAnimation(this.endboss_Alert());
      } else if (this.wasHit && !this.isDead) {
        this.endbossHurt();
      } else if (this.isDead) {
        this.playAnimation(this.endboss_Dead());
      } else {
        this.playAnimation(this.endboss_Walking());
      }
    }, 160);
  }

  /**
   * endboss hurt
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
   * strings for endboss walking
   * @returns
   */
  endboss_Walking() {
    return this.IMAGES[0]["IMAGES_WALKING"];
  }

  /**
   * strings for endboss alert
   * @returns
   */
  endboss_Alert() {
    return this.IMAGES[1]["IMAGES_ALERT"];
  }

  /**
   * strings for endboss attack
   * @returns
   */
  endboss_Attack() {
    return this.IMAGES[2]["IMAGES_ATTACK"];
  }

  /**
   * strings for endboss hurt
   * @returns
   */
  endboss_Hurt() {
    return this.IMAGES[3]["IMAGES_HURT"];
  }

  /**
   * strings for endboss dead
   * @returns
   */
  endboss_Dead() {
    return this.IMAGES[4]["IMAGES_DEAD"];
  }
}
