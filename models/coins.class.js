class Coin extends MovableObject {
    x = this.coinsX;
    y = this.coinsY;
    height = this.coinsHeight;
    width = this.coinsWidth;

    imageLength = 2;
    imageStartAt = 1;

    IMAGES_WALKING = [];

    constructor() {
        /* ebugger */
        super().getImages(this, 'assets/img/8_coin/coin_', '.png');
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