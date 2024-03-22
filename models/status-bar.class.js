class StatusBar extends DrawableObject {
    world;

    x = this.characterStatusBarsX;
    y = this.characterStatusBarsY;
    height = this.characterStatusBarsSize;
    width = this.characterStatusBarsSize * 3;

    IMAGES = this.imagesStatusBarsCharacter;

    percentege = this.characterEnergy;

    constructor() {
        /* debugger */
        super().getAllImages(this);
        this.loadFirstImage(this, 1);
        this.loadAllImages(this);
        this.setPersentege();
    }

    setPersentege() {
        setInterval(() => {
            let path = this.IMAGES[1]['IMAGES_STATUS_HEALTH'][this.resolveImageIndex()];
            this.img = this.imageCache[path];
        }, 1000 / 120);
    }

    resolveImageIndex() {
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
}