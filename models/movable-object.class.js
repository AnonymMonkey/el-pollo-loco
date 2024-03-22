class MovableObject extends DrawableObject {
    otherDirection = false;

    speedY = 0;
    acceleration = 2;

    lastHit = 0;

    applyGravity() {
        this.speedY = 0;
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 180;
    }

    /* character.isColliding(chicken) */
    isColliding(mo) {
        return (this.x + this.offset.x + this.width) >= mo.x &&
            (this.x + this.offset.x) <= (mo.x + mo.width) &&
            (this.y + this.offset.y + this.height) >= mo.y &&
            (this.y + this.offset.y) <= (mo.y + mo.height)/*  &&
            obj.onCollisionCourse */; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit() {
        this.characterEnergy -= 2;
        if (this.characterEnergy < 0) {
            this.characterEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.characterEnergy == 0;
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