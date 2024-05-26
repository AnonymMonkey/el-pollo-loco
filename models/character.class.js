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

  /**
   *
   */
  animateModel() {
    this.characterMovement();
    this.characterAnimation();
  }

  /**
   *
   */
  characterMovement() {
    setInterval(() => {
      let keyboard = this.world.keyboard;

      this.walking_sound.pause();

      this.characterMoveRight(keyboard);
      this.characterMoveLeft(keyboard);
      this.characterJump(keyboard);

      this.world.camera_x = -this.x + 100;
    }, 1000 / 120);
  }

  /**
   *
   */
  characterMoveRight() {
    if (keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight(this.speed);
      this.otherDirection = false;
      this.walkingSound();
      this.isAwake();
    }
  }

  /**
   *
   */
  characterMoveLeft() {
    if (keyboard.KEY_LEFT && this.x > 0) {
      this.moveLeft(this.speed);
      this.otherDirection = true;
      this.walkingSound();
      this.isAwake();
    }
  }

  /**
   *
   */
  characterJump() {
    if (keyboard.KEY_UP && !this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   *
   */
  characterAnimation() {
    setInterval(() => {
      if (this.isHurt()) {
        this.characterHurt();
      } else if (this.isDead()) {
        this.characterDied();
      } else if (this.isAboveGround()) {
        this.characterJumping();
      } else if (!this.isAboveGround()) {
        this.characterIdle();
      }
      this.characterWalking();
    }, 140);
  }

  /**
   *
   */
  characterHurt() {
    this.isAwake();
    this.soundPlayed = false;
    if (Math.random() < 0.5) {
      this.playSound(this.hurt_sound);
    } else {
      this.playSound(this.hurt_sound_sec);
    }
    this.playAnimation(this.pepe_Hurt());
  }

  /**
   *
   */
  characterDied() {
    this.isAwake();
    this.soundPlayed = false;
    this.playSound(this.dead_sound);
    this.playAnimation(this.pepe_Dead());
    setTimeout(() => {
      lose = true;
      gameEnd();
    }, 500);
  }

  /**
   *
   */
  characterJumping() {
    this.isAwake();
    this.soundPlayed = false;
    this.playSound(this.jump_sound);
    this.playAnimation(this.pepe_Jumping());
  }

  /**
   *
   */
  characterIdle() {
    this.playAnimation(this.pepe_Idle());
    this.snoring_sound.pause();

    this.isTired();
    this.checkSleeping();
  }

  /**
   *
   */
  characterWalking() {
    let keyboard = this.world.keyboard;
    if (
      (keyboard.KEY_RIGHT && !this.isAboveGround()) ||
      (keyboard.KEY_LEFT && !this.isAboveGround())
    ) {
      this.playAnimation(this.pepe_Walking());
      this.isAwake();
    }
  }

  /**
   *
   */
  walkingSound() {
    if (isSoundActiv) {
      this.walking_sound.play();
    }
  }

  /**
   *
   */
  isTired() {
    if (this.awake) {
      this.tired = new Date().getTime();
      this.awake = !this.awake;
    }
  }

  /**
   *
   * @returns
   */
  sleeping() {
    let sleepTimer = new Date().getTime() - this.tired;
    sleepTimer = sleepTimer / 1000;
    return sleepTimer > 3;
  }

  /**
   *
   */
  checkSleeping() {
    if (!this.isAboveGround() && this.sleeping()) {
      this.soundPlayed = false;
      this.playAnimation(this.pepe_Long_Idle());
      this.playSound(this.snoring_sound);
    }
  }

  /**
   *
   */
  isAwake() {
    this.awake = true;
  }

  /**
   *
   * @returns
   */
  pepe_Idle() {
    return this.IMAGES[0]["IMAGES_IDLE"];
  }

  /**
   *
   * @returns
   */
  pepe_Long_Idle() {
    return this.IMAGES[1]["IMAGES_LONG_IDLE"];
  }

  /**
   *
   * @returns
   */
  pepe_Walking() {
    return this.IMAGES[2]["IMAGES_WALKING"];
  }

  /**
   *
   * @returns
   */
  pepe_Jumping() {
    return this.IMAGES[3]["IMAGES_JUMPING"];
  }

  /**
   *
   * @returns
   */
  pepe_Hurt() {
    return this.IMAGES[4]["IMAGES_HURT"];
  }

  /**
   *
   * @returns
   */
  pepe_Dead() {
    return this.IMAGES[5]["IMAGES_DEAD"];
  }
}
