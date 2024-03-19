class Clouds extends MovableObject {
    x = this.cloudsX;
    y = this.cloudsY;
    height = this.cloudsSize;
    width = this.cloudsSize * 2;
    speed = this.cloudsSpeed;

    IMAGES = this.imagesClouds;

    constructor(other_Cloud) {
        super().getAllImages(this);
        this.other_Cloud = other_Cloud;
        if (this.other_Cloud) {
            this.loadFirstImage(this, 0);
        } else {
            this.loadFirstImage(this, 1);
        }
        this.loadAllImages(this);
        this.x = this.x + Math.random() * this.levelEndX;
        this.speed = this.speed + Math.random() * 0.8;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft(this.speed);
        }, 1000 / 60);
    }

    clouds() {
        return this.IMAGES[0]['IMAGES_CLOUDS'];
    }

    sec_Clouds() {
        return this.IMAGES[1]['IMAGES_SEC_CLOUDS'];
    }
}

