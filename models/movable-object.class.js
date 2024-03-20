class MovableObject extends Coordinates {
    img;
    /*     imageLength;
        imageStartAt; */
    imageCache = {};
    currentImage = 0;
    otherDirection = false;

    speedY = 0;
    acceleration = 2;

    energy = 100;
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

    getAllImages(object) {
        let images = object.IMAGES;
        for (let i = 0; i < images.length; i++) {
            let selectedImageCache = images[i];
            let basicPath = Object.values(selectedImageCache)[0];
            let secPath = Object.values(selectedImageCache)[1];
            let startAt = Object.values(selectedImageCache)[2];
            let length = Object.values(selectedImageCache)[3];
            let array = Object.values(selectedImageCache)[4];

            length = startAt + length;
            for (let p = startAt; p < length; p++) {
                array.push(basicPath + p + secPath);
            }
        }
    }

    loadFirstImage(object, index) {
        if (index == undefined) {
            index = 0;
        }
        let images = object.IMAGES;
        let firstObject = images[index];
        let firstObjectArray = Object.values(firstObject)[4];
        let firstArrayPath = firstObjectArray[0];
        this.img = new Image();
        this.img.src = firstArrayPath;
    }

    loadAllImages(object) {
        let images = object.IMAGES;
        for (let i = 0; i < images.length; i++) {
            let selectedImageCache = images[i];
            let array = Object.values(selectedImageCache)[4];

            array.forEach(path => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        /* instanceof noch für endboss, coin und bottle */
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
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
        return this.energy == 0;
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