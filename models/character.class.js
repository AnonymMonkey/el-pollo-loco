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
   * animate model
   */
  animateModel() {
    this.characterMovement();
    this.characterAnimation();
  }

  /**
   * character movement
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
   * character move right
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
   * character move left
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
   * character jump
   */
  characterJump() {
    if (keyboard.KEY_UP && !this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   * character animations
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
   * character hurt
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
   * character died
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
   * character jumping
   */
  characterJumping() {
    this.isAwake();
    this.soundPlayed = false;
    this.playSound(this.jump_sound);
    this.playAnimation(this.pepe_Jumping());
  }

  /**
   * character Idle
   */
  characterIdle() {
    this.playAnimation(this.pepe_Idle());
    this.snoring_sound.pause();

    this.isTired();
    this.checkSleeping();
  }

  /**
   * character walking
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
   * character walking sound
   */
  walkingSound() {
    if (isSoundActiv) {
      this.walking_sound.play();
    }
  }

  /**
   * character tired
   */
  isTired() {
    if (this.awake) {
      this.tired = new Date().getTime();
      this.awake = !this.awake;
    }
  }

  /**
   * character sleeping
   * @returns
   */
  sleeping() {
    let sleepTimer = new Date().getTime() - this.tired;
    sleepTimer = sleepTimer / 1000;
    return sleepTimer > 10;
  }

  /**
   * check if character is sleeping
   */
  checkSleeping() {
    if (!this.isAboveGround() && this.sleeping()) {
      this.soundPlayed = false;
      this.playAnimation(this.pepe_Long_Idle());
      this.playSound(this.snoring_sound);
    }
  }

  /**
   * character awake
   */
  isAwake() {
    this.awake = true;
  }

  /**
   * strings for character idle
   * @returns
   */
  pepe_Idle() {
    return this.IMAGES[0]["IMAGES_IDLE"];
  }

  /**
   * strings for character long idle (sleep)
   * @returns
   */
  pepe_Long_Idle() {
    return this.IMAGES[1]["IMAGES_LONG_IDLE"];
  }

  /**
   *  strings for character walking
   * @returns
   */
  pepe_Walking() {
    return this.IMAGES[2]["IMAGES_WALKING"];
  }

  /**
   * strings for character jumping
   * @returns
   */
  pepe_Jumping() {
    return this.IMAGES[3]["IMAGES_JUMPING"];
  }

  /**
   * strings for character hurt
   * @returns
   */
  pepe_Hurt() {
    return this.IMAGES[4]["IMAGES_HURT"];
  }

  /**
   * strings for character dead
   * @returns
   */
  pepe_Dead() {
    return this.IMAGES[5]["IMAGES_DEAD"];
  }
}
