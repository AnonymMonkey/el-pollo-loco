class Bottle extends MovableObject {
    x = this.bottlesX;
    y = this.bottlesY;
    height = this.bottlesSize;
    width = this.bottlesSize;

    imageLength = 2;
    imageStartAt = 1;

    IMAGES_WALKING = [];

    constructor() {
        super().getImages(this, 'assets/img/6_salsa_bottle/', '_salsa_bottle_on_ground.png');
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = this.x + Math.random() * 1600;

        this.animateModel();
    }

    animateModel() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 250);
    }
}