class Chicken_Small extends MovableObject {
    x = this.chickenX;
    y = this.chickenSmallY;
    speed = this.chickenSpeed;
    height = this.chickenSmallSize;
    width = this.chickenSmallSize;

    imageLength = 3;
    imageStartAt = 1;

    IMAGES_WALKING = [];

    constructor() {
        super().getImages(this, 'assets/img/3_enemies_chicken/chicken_small/1_walk/', '_w.png');
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.x + 500 + Math.random() * this.levelEndX;
        this.speed = this.speed + Math.random() * 0.8;
        this.animateModel();
    }

    animateModel() {
        this.moveLeft(this.speed);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 160);
    }
}