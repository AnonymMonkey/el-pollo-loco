class MovableObject extends Coordinates {
    img;
    imageLength;
    imageStartAt;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;

    getImages(object, basicPath, secPath) {
        let IMAGES_WALKING = object.IMAGES_WALKING;
        let imageStartAt = object.imageStartAt;
        let imageLength = imageStartAt + object.imageLength;
        for (let i = imageStartAt; i < imageLength; i++) {
            IMAGES_WALKING.push(basicPath + i + secPath);
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

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 120);
    }

    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 120);
    }
}