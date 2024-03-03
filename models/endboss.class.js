class Endboss extends MovableObject {
    x = this.endbossX;
    y = this.endbossY;
    height = this.endbossHeight;
    width = this.endbossWidth;

    imageLength = 8;
    imageStartAt = 5;

    IMAGES_WALKING = [];

    constructor() {
        super().getImages(this, 'assets/img/4_enemie_boss_chicken/2_alert/G', '.png');
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animateModel();
    }

    animateModel() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 160);
    }
}