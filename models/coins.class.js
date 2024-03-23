class Coin extends MovableObject {
    x = this.coinsX;
    y = this.coinsY;
    height = this.coinsSize;
    width = this.coinsSize;

    offset = this.coinSizeOffsets;

    IMAGES = this.imagesCoin;

    constructor() {
        super().getAllImages(this);
        this.loadFirstImage(this);
        this.loadAllImages(this);

        this.x = this.x + Math.random() * 1600;
        this.y = this.y + Math.random() * 150;

        this.animateModel();
    }

    animateModel() {
        setInterval(() => {
            this.playAnimation(this.coin());
        }, 250);
    }

    coin() {
        return this.IMAGES[0]['IMAGES_COIN'];
    }
}