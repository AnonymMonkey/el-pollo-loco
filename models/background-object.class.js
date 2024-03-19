class BackgroundObject extends MovableObject {
    x;
    y = this.backgroundObjectY;

    width = 720;
    height = 480;

    layer;

    IMAGES = this.imagesBackground;

    constructor(layer, backgroundObjectX, BG_Rotate) {
        super().getAllImages(this);
        this.loadFirstImage(this);
        this.loadAllImages(this);
        this.layer = layer;
        this.BG_Rotate = BG_Rotate;
        this.x = backgroundObjectX;
        this.y = 480 - this.height;
        this.loadBackground(this.layer);
    }

    loadBackground(layer) {
        let index;
        if (this.BG_Rotate) {
            index = 0;
            this.loadFullLayer(layer, index);
        } else {
            index = 1;
            this.loadFullLayer(layer, index);
        }
    }

    loadFullLayer(layer, index) {
        if (layer == 0) {
            this.loadLayer(this.background_Air());
        };
        if (layer == 1) {
            this.loadLayer(this.background_ThirdLayer(index));
        };
        if (layer == 2) {
            this.loadLayer(this.background_SecLayer(index));
        };
        if (layer == 3) {
            this.loadLayer(this.background_FirstLayer(index));
        };
    }

    loadLayer(currentLayer) {
        this.img = new Image();
        this.img.src = currentLayer;
    }

    background_Air() {
        return this.IMAGES[0]['IMAGES_AIR_BACKGROUND'][0];
    }

    background_FirstLayer(index) {
        return this.IMAGES[1]['IMAGES_FIRST_BACKGROUND'][index];
    }

    background_SecLayer(index) {
        return this.IMAGES[2]['IMAGES_SEC_BACKGROUND'][index];
    }

    background_ThirdLayer(index) {
        return this.IMAGES[3]['IMAGES_THIRD_BACKGROUND'][index];
    }
}