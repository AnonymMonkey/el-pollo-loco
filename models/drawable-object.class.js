class DrawableObject extends Coordinates {
    img;
    imageCache = {};
    currentImage = 0;

    getAllImages(object) {
        let images = object.IMAGES;
        for (let i = 0; i < images.length; i++) {
            let selectedImageCache = images[i];
            let basicPath = Object.values(selectedImageCache)[0];
            let secPath = Object.values(selectedImageCache)[1];
            let startAt = Object.values(selectedImageCache)[2];
            let length = Object.values(selectedImageCache)[3];
            let array = Object.values(selectedImageCache)[4];

            length = startAt + length;
            for (let p = startAt; p < length; p++) {
                array.push(basicPath + p + secPath);
            }
        }
    }

    loadFirstImage(object, index) {
        if (index == undefined) {
            index = 0;
        }
        let images = object.IMAGES;
        let firstObject = images[index];
        let firstObjectArray = Object.values(firstObject)[4];
        let firstArrayPath = firstObjectArray[0];
        this.img = new Image();
        this.img.src = firstArrayPath;
    }

    loadAllImages(object) {
        let images = object.IMAGES;
        for (let i = 0; i < images.length; i++) {
            let selectedImageCache = images[i];
            let array = Object.values(selectedImageCache)[4];

            array.forEach(path => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        /* instanceof noch für endboss, coin und bottle */
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}