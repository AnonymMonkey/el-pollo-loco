class StatusBar extends DrawableObject {
    world;
    index;

    x = this.characterStatusBarsX;
    y;
    height = this.characterStatusBarsSize;
    width = this.characterStatusBarsSize * 3;


    IMAGES = this.imagesStatusBarsCharacter;

    /* healPercentege = this.characterEnergy; */
    coinCache = 0;
    bottleCache = 0;

    constructor(index) {
        /* debugger */
        super().getAllImages(this);
        this.loadFirstImage(this, index);
        this.loadAllImages(this);
        this.setPersentege();
        this.index = index;
        this.y = this.setY();
    }

    setY() {
        /* debugger */
        if (this.index == 0) {
            return this.characterStatusBarsY + 50;
        };

        if (this.index == 1) {
            return this.characterStatusBarsY;
        };

        if (this.index == 2) {
            return this.characterStatusBarsY + 50 * 2;
        };
    }

    setPersentege() {
        setInterval(() => {
            /*             debugger
                        console.log(this.getStatusBarPath());
                        console.log(this.getImageIndex()); */
            let path = this.getStatusBarPath()[this.getImageIndex()];
            this.img = this.imageCache[path];
        }, 1000 / 120);
    }

    getImageIndex() {
        if (this.index == 0) {
            return this.getCoinImageIndex();
        };

        if (this.index == 1) {
            return this.getHealthImageIndex();
        };

        if (this.index == 2) {
            return this.getBottleImageIndex();
        };
    }

    getCoinImageIndex() {
        if (this.coinCache == 5) {
            return 5;
        } else if (this.coinCache == 4) {
            return 4;
        } else if (this.coinCache == 3) {
            return 3;
        } else if (this.coinCache == 2) {
            return 2;
        } else if (this.coinCache == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    getHealthImageIndex() {
        if (this.world.character.characterEnergy == 100) {
            return 5;
        } else if (this.world.character.characterEnergy > 80) {
            return 4;
        } else if (this.world.character.characterEnergy > 60) {
            return 3;
        } else if (this.world.character.characterEnergy > 40) {
            return 2;
        } else if (this.world.character.characterEnergy > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    getBottleImageIndex() {
        if (this.bottleCache == 5) {
            return 5;
        } else if (this.bottleCache == 4) {
            return 4;
        } else if (this.bottleCache == 3) {
            return 3;
        } else if (this.bottleCache == 2) {
            return 2;
        } else if (this.bottleCache == 1) {
            return 1;
        } else {
            return 0;
        }
    }


    getStatusBarPath() {
        let imagesIndex = this.IMAGES[this.index];
        return Object.values(imagesIndex)[4];
    }
}