class Chicken_Small extends MovableObject {
    x = this.chickenX;
    y = this.chickenSmallY;
    speed = this.chickenSpeed;
    height = this.chickenSmallSize;
    width = this.chickenSmallSize;

    IMAGES_WALKING_StartAt = 1;
    IMAGES_WALKING_Length = 3;
    IMAGES_WALKING = [];

    constructor() {
        super().getImages(
            'assets/img/3_enemies_chicken/chicken_small/1_walk/',
            '_w.png',
            this.IMAGES_WALKING_StartAt,
            this.IMAGES_WALKING_Length,
            this.IMAGES_WALKING
        );
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