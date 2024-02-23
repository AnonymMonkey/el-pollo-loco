class Clouds extends MovableObject {
    x = Math.random() * 500;
    y = 10;
    width = 600;
    height = 300;

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
    }
}