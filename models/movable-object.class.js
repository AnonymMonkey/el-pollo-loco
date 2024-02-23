class MovableObject {
    x = 120;
    y = 180;
    img;
    height = 250;
    width = 125;

    loadImage(path) {
        this.img = new Image(); /* this.img = document.getElementById('image')   <img id="image"> */
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}