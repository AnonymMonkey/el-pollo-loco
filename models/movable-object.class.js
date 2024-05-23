class MovableObject extends DrawableObject {
  otherDirection = false;

  speedY = 0;
  acceleration = 2;

  lastHit = 0;

  applyGravity() {
    //this.speedY = 0;
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof Character) {
      return this.y + this.height - this.offset.yb < 310;
    }
    if (this instanceof ThrowableObject) {
      return this.y - this.offset.yb - this.offset.yt < 310;
    }
  }

  isColliding(mo) {
    return this.collidingX(mo) && this.collidingY(mo);
  }

  collidingX(mo) {
    return (
      this.x + this.width + this.offset.xl - this.offset.xr >=
        mo.x + mo.offset.xl &&
      this.x + this.offset.xl <= mo.x + mo.width - mo.offset.xl - mo.offset.xr
    );
  }

  collidingY(mo) {
    return (
      this.y + this.height + this.offset.yt - this.offset.yb >=
        mo.y + mo.offset.yt &&
      this.y + this.offset.yt <= mo.y + mo.height + mo.offset.yt - mo.offset.yb
    );
  }

  isCollidingGround() {
    return this.y >= 310;
  }

  hit(enemy) {
    if (enemy.dead == false) {
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

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 500;
    return timepassed < 1;
  }

  isDead() {
    return this.characterEnergy == 0;
  }

  playSound(x) {
    if (!this.soundPlayed && isSoundActiv) {
      x.play();
      this.soundPlayed = true;
    } else if (!isSoundActiv) {
      x.pause();
      this.soundPlayed = true;
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight(speed) {
    this.x += this.speed;
  }

  moveLeft(speed) {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 25;
  }
}
