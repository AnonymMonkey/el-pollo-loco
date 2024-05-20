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
  sleepTimer;

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
        soundBox.push(this.walking_sound);
      }

      if (keyboard.KEY_LEFT && this.x > 0) {
        this.moveLeft(this.speed);
        this.otherDirection = true;
        this.walkingSound();
        soundBox.push(this.walking_sound);
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
        this.awake();
        this.soundPlayed = false;
        if (Math.random() < 0.5) {
          this.playSound(this.hurt_sound);
        } else {
          this.playSound(this.hurt_sound_sec);
        }
        this.playAnimation(this.pepe_Hurt());
      } else if (this.isDead()) {
        this.awake();
        this.soundPlayed = false;
        this.playSound(this.dead_sound);
        this.playAnimation(this.pepe_Dead());
        setTimeout(() => {
          gameOver();
        }, 500);
      } else if (this.isAboveGround()) {
        this.awake();
        this.soundPlayed = false;
        this.playSound(this.jump_sound);
        this.playAnimation(this.pepe_Jumping());
      } else if (!this.isAboveGround() && !this.triggerLongIdle) {
        this.playAnimation(this.pepe_Idle());
        this.snoring_sound.pause();

        this.sleepTimer = setTimeout(() => {
          this.sleeping();
        }, 5000);
      } else if (!this.isAboveGround() && this.triggerLongIdle) {
        this.playAnimation(this.pepe_Long_Idle());
        this.playSound(this.snoring_sound);
        this.snoring_sound.loop = true;
      }

      if (
        (keyboard.KEY_RIGHT && !this.isAboveGround()) ||
        (keyboard.KEY_LEFT && !this.isAboveGround())
      ) {
        this.awake();
        this.playAnimation(this.pepe_Walking());
      }
    }, 140);
  }

  walkingSound() {
    if (isSoundActiv) {
      this.walking_sound.play();
    }
  }

  sleeping() {
    this.triggerLongIdle = true;
  }

  awake() {
    this.triggerLongIdle = false;
    clearTimeout(this.sleepTimer);
    this.snoring_sound.pause();
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
