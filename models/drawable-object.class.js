class DrawableObject extends Coordinates {
  img;
  imageCache = {};
  currentImage = 0;

  /**
   *
   * @param {*} object
   */
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

  /**
   *
   * @param {*} object
   * @param {*} index
   */
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

  /**
   *
   * @param {*} object
   */
  loadAllImages(object) {
    let images = object.IMAGES;
    for (let i = 0; i < images.length; i++) {
      let selectedImageCache = images[i];
      let array = Object.values(selectedImageCache)[4];

      array.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }
  }

  /**
   *
   * @param {*} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /*
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Chicken_Small ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }

    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Chicken_Small ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof ThrowableObject
    ) {
      let os = this.offset;
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + os.xl,
        this.y + os.yt,
        this.width - os.xr,
        this.height - os.yb
      );
      ctx.stroke();
    }
  } */
}
