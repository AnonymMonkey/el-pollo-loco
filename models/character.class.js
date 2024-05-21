class Character extends MovableObject {
  world;

  x = this.characterX;
  y = this.characterY;
  speed = this.characterSpeed;
  height = this.characterSize;
  width = this.characterSize / 2;

  offset = this.characterSizeOffsets;

  IMAGES = this.imagesCharacter;

  awake = true;
  tired = null;

  soundPlayed = false;
  dead_sound = new Audio(new Sounds().sound_deathPepe);
  snoring_sound = new Audio(new Sounds().sound_snoring);
  hurt_sound = new Audio(new Sounds().sound_hurt);
  hurt_sound_sec = new Audio(new Sounds().sound_hurt_sec);
  jump_sound = new Audio(new Sounds().sound_jump);
  walking_sound = new Audio(new Sounds().sound_running);

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
        this.walkingSound();
        this.isAwake();
      }

      if (keyboard.KEY_LEFT && this.x > 0) {
        this.moveLeft(this.speed);
        this.otherDirection = true;
        this.walkingSound();
        this.isAwake();
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
        this.isAwake();
        this.soundPlayed = false;
        if (Math.random() < 0.5) {
          this.playSound(this.hurt_sound);
        } else {
          this.playSound(this.hurt_sound_sec);
        }
        this.playAnimation(this.pepe_Hurt());
      } else if (this.isDead()) {
        this.isAwake();
        this.soundPlayed = false;
        this.playSound(this.dead_sound);
        this.playAnimation(this.pepe_Dead());
        setTimeout(() => {
          lose = true;
          gameEnd();
        }, 500);
      } else if (this.isAboveGround()) {
        this.isAwake();
        this.soundPlayed = false;
        this.playSound(this.jump_sound);
        this.playAnimation(this.pepe_Jumping());
      } else if (!this.isAboveGround()) {
        this.playAnimation(this.pepe_Idle());
        this.snoring_sound.pause();

        this.isTired();
        this.checkSleeping();
      }
      if (
        (keyboard.KEY_RIGHT && !this.isAboveGround()) ||
        (keyboard.KEY_LEFT && !this.isAboveGround())
      ) {
        this.playAnimation(this.pepe_Walking());
        this.isAwake();
      }
    }, 140);
  }

  walkingSound() {
    if (isSoundActiv) {
      this.walking_sound.play();
    }
  }

  isTired() {
    if (this.awake) {
      this.tired = new Date().getTime();
      this.awake = !this.awake;
    }
  }

  sleeping() {
    let sleepTimer = new Date().getTime() - this.tired;
    sleepTimer = sleepTimer / 1000;
    return sleepTimer > 3;
  }

  checkSleeping() {
    if (!this.isAboveGround() && this.sleeping()) {
      this.soundPlayed = false;
      this.playAnimation(this.pepe_Long_Idle());
      this.playSound(this.snoring_sound);
    }
  }

  isAwake() {
    this.awake = true;
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
