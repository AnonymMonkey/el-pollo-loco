class Chicken extends MovableObject {
    x = this.chickenX;
    y = this.chickenY;
    speed = this.chickenSpeed;
    height = this.chickenSize;
    width = this.chickenSize;

    IMAGES = this.imagesChicken;

    constructor() {
        super().getAllImages(this);
        this.loadFirstImage(this);
        this.loadAllImages(this);

        this.x = this.x + Math.random() * this.levelEndX;
        this.speed = this.speed + Math.random() * 0.8;
        this.animateModel();
    }

    animateModel() {
        setInterval(() => {
            this.moveLeft(this.speed);
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.chicken_Walking());
        }, 160);
    }

    chicken_Walking() {
        return this.IMAGES[0]['IMAGES_WALKING'];
    }

    chicken_Dead() {
        return this.IMAGES[1]['IMAGES_DEAD'];
    }
}