class Chicken extends MovableObject {
    x = this.chickenX;
    y = this.chickenY;
    speed = this.chickenSpeed;
    height = this.chickenSize;
    width = this.chickenSize;

    IMAGES_WALKING_StartAt = 1;
    IMAGES_WALKING_Length = 3;
    IMAGES_WALKING = [];

    constructor() {
        super().getImages(
            'assets/img/3_enemies_chicken/chicken_normal/1_walk/',
            '_w.png',
            this.IMAGES_WALKING_StartAt,
            this.IMAGES_WALKING_Length,
            this.IMAGES_WALKING
        );
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.x + Math.random() * this.levelEndX;
        this.speed = this.speed + Math.random() * 0.8;
        this.animateModel();
    }

    animateModel() {
        setInterval(() => {
            this.moveLeft(this.speed);
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 160);
    }
}