class Endboss extends MovableObject {
    x = this.endbossX;
    y = this.endbossY;
    height = this.endbossSize;
    width = this.endbossSize;

    IMAGES_WALKING_StartAt = 5;
    IMAGES_WALKING_Length = 8;
    IMAGES_WALKING = [];

    constructor() {
        super().getImages(
            'assets/img/4_enemie_boss_chicken/2_alert/G',
            '.png',
            this.IMAGES_WALKING_StartAt,
            this.IMAGES_WALKING_Length,
            this.IMAGES_WALKING
        );
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