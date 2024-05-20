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

  sound_endboss = new Audio(new Sounds().sound_endboss);
  sound_endboss_battle = new Audio(new Sounds().sound_endboss_battle);
  sound_deathEndboss = new Audio(new Sounds().sound_deathEndboss);
  sound_endboss_hit = new Audio(new Sounds().sound_endboss_hit);

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
          this.playSound(this.sound_endboss);
          setTimeout(() => {
            this.soundPlayed = false;
            this.playSound(this.sound_endboss_battle);
          }, 500);
          if (this.dead) {
            clearInterval(intervalMove);
          }
        }, 200);
      }
    }, 160);

    setInterval(() => {
      this.soundPlayed = false;
      if (!this.hasDiscoveredCharacter) {
        this.playAnimation(this.endboss_Alert());
      } else if (this.wasHit && !this.dead) {
        this.soundPlayed = false;
        this.playAnimation(this.endboss_Hurt());
        this.playSound(this.sound_endboss_hit);
        setTimeout(() => {
          this.wasHit = false;
        }, 500);
      } else if (this.dead) {
        this.soundPlayed = false;
        let deadSoundPlayed = false;
        if (!deadSoundPlayed) {
          this.playSound(this.sound_deathEndboss);
          deadSoundPlayed = true;
          //ANCHOR - Vielleicht liegts am x error
        }
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
