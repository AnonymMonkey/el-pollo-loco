class Chicken extends MovableObject {
    x = this.chickenX;
    y = this.chickenY;
    speed = this.chickenSpeed;
    height = this.chickenHeight;
    width = this.chickenWidth;

    imageLength = 3;
    imageStartAt = 1;

    IMAGES_WALKING = [];

    constructor() {
        super().getImages(this, 'assets/img/3_enemies_chicken/chicken_normal/1_walk/', '_w.png');
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.x + Math.random() * 500;
        this.speed = this.speed + Math.random() * 0.25;
        this.animateModel();
    }

    animateModel() {
        this.moveLeft(this.speed);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 160);
    }
}