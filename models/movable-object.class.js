class MovableObject extends DrawableObject {
  otherDirection = false;

  speedY = 0;
  acceleration = 2;

  lastHit = 0;

  /**
   * apply gravity
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * is above ground
   * @returns
   */
  isAboveGround() {
    if (this instanceof Character) {
      return this.y + this.height - this.offset.yb < 310;
    }
    if (this instanceof ThrowableObject) {
      return this.y - this.offset.yb - this.offset.yt < 310;
    }
  }

  /**
   * is colliding
   * @param {object} mo
   * @returns
   */
  isColliding(mo) {
    return this.collidingX(mo) && this.collidingY(mo);
  }

  /**
   * is colliding X
   * @param {object} mo
   * @returns
   */
  collidingX(mo) {
    return (
      this.x + this.width + this.offset.xl - this.offset.xr >=
        mo.x + mo.offset.xl &&
      this.x + this.offset.xl <= mo.x + mo.width - mo.offset.xl
    );
  }

  /**
   * is colliding Y
   * @param {object} mo
   * @returns
   */
  collidingY(mo) {
    return (
      this.y + this.height + this.offset.yt - this.offset.yb >=
        mo.y + mo.offset.yt &&
      this.y + this.offset.yt <= mo.y + mo.height + mo.offset.yt - mo.offset.yb
    );
  }

  /**
   * is colliding ground
   * @returns
   */
  isCollidingGround() {
    return this.y >= 310;
  }

  /**
   * enemy hit character
   * @param {object} enemy
   * @returns
   */
  hit(enemy) {
    if (enemy.isDead == false) {
      this.characterEnergy -= 2;
      if (this.characterEnergy < 0) {
        this.characterEnergy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    } else {
      return;
    }
  }

  /**
   * is hurt
   * @returns
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 500;
    return timepassed < 1;
  }

  /**
   * character is dead
   * @returns
   */
  isDead() {
    return this.characterEnergy == 0;
  }

  /**
   * sound play toggle
   * @param {*} x
   */
  playSound(x) {
    if (!this.soundPlayed && isSoundActiv) {
      x.play();
      this.soundPlayed = true;
    } else if (!isSoundActiv) {
      x.pause();
      this.soundPlayed = true;
    }
  }

  /**
   * play animation
   * @param {*} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * move right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * move left
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * jump
   */
  jump() {
    this.speedY = 25;
  }
}
