class MovableObject extends Coordinates {
    img;
    imageLength;
    imageStartAt;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;

    speedY = 0;
    acceleration = 2;

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

    getImages(basicPath, secPath, imageStartAt, imageLength, array) {
        imageLength = imageStartAt + imageLength;
        for (let i = imageStartAt; i < imageLength; i++) {
            array.push(basicPath + i + secPath);
        }
    }

    loadImage(path) {
        this.img = new Image(); /* this.img = document.getElementById('image')   <img id="image"> */
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(speed) {
        /*         setInterval(() => {
                    this.x += this.speed;
                }, 1000 / 120); */
        this.x += this.speed;
    }

    moveLeft(speed) {
        /*         setInterval(() => {
                    this.x -= speed;
                }, 1000 / 120); */
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }
}