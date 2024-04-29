class Character extends MovableObject {
  world;

  x = this.characterX;
  y = this.characterY;
  speed = this.characterSpeed;
  height = this.characterSize;
  width = this.characterSize / 2;

  offset = this.characterSizeOffsets;

  IMAGES = this.imagesCharacter;

  triggerLongIdle = false;

  soundPlayed = false;
  dead_sound = new Audio(this.sound_deathPepe);
  hurt_sound = new Audio(this.sound_hurt);
  jump_sound = new Audio(this.sound_jump);
  walking_sound = new Audio(this.sound_running);

  constructor() {
    super().getAllImages(this);
    this.loadFirstImage(this);
    this.loadAllImages(this);

    this.hurt_sound.volume = 0.2;

    this.applyGravity();
    this.animateModel();
  }

  animateModel() {
    /* Movement */
    setInterval(() => {
      let keyboard = this.world.keyboard;
      this.walking_sound.pause();

      if (keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight(this.speed);
        this.otherDirection = false;
        this.walking_sound.play();
      }

      if (keyboard.KEY_LEFT && this.x > 0) {
        this.moveLeft(this.speed);
        this.otherDirection = true;
        this.walking_sound.play();
      }

      if (keyboard.KEY_UP && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 120);

    /* Animations */
    setInterval(() => {
      let keyboard = this.world.keyboard;
      if (this.isHurt()) {
        this.soundPlayed = false;
        this.playSound(this.hurt_sound);
        this.playAnimation(this.pepe_Hurt());
      } else if (this.isDead()) {
        this.soundPlayed = false;
        this.playSound(this.dead_sound);
        this.playAnimation(this.pepe_Dead());
      } else if (this.isAboveGround()) {
        this.soundPlayed = false;
        this.playSound(this.jump_sound);
        this.playAnimation(this.pepe_Jumping());
      } else if (!this.isAboveGround()) {
        this.playAnimation(this.pepe_Idle());
      }

      if (
        (keyboard.KEY_RIGHT && !this.isAboveGround()) ||
        (keyboard.KEY_LEFT && !this.isAboveGround())
      ) {
        this.playAnimation(this.pepe_Walking());
      }
      if (this.triggerLongIdle) {
      }
    }, 100);
  }

  sleeping() {
    return (this.triggerLongIdle = true);
  }

  awake() {
    return (this.triggerLongIdle = false);
  }

  pepe_Idle() {
    return this.IMAGES[0]["IMAGES_IDLE"];
  }

  pepe_Long_Idle() {
    return this.IMAGES[1]["IMAGES_LONG_IDLE"];
  }

  pepe_Walking() {
    return this.IMAGES[2]["IMAGES_WALKING"];
  }

  pepe_Jumping() {
    return this.IMAGES[3]["IMAGES_JUMPING"];
  }

  pepe_Hurt() {
    return this.IMAGES[4]["IMAGES_HURT"];
  }

  pepe_Dead() {
    return this.IMAGES[5]["IMAGES_DEAD"];
  }
}
