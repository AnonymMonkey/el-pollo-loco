class Coin extends MovableObject {
    x = this.coinsX;
    y = this.coinsY;
    height = this.coinsSize;
    width = this.coinsSize;

    IMAGES_WALKING_StartAt = 1;
    IMAGES_WALKING_Length = 2;
    IMAGES_WALKING = [];

    constructor() {
        /* ebugger */
        super().getImages(
            'assets/img/8_coin/coin_',
            '.png',
            this.IMAGES_WALKING_StartAt,
            this.IMAGES_WALKING_Length,
            this.IMAGES_WALKING
        );
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = this.x + Math.random() * 1600;
        this.y = this.y + Math.random() * 150;

        this.animateModel();
    }

    animateModel() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 250);
    }
}