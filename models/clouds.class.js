class Clouds extends MovableObject {
    x = this.cloudsX;
    y = this.cloudsY;
    height = this.cloudsHeight;
    width = this.cloudsWidth;
    speed = this.cloudsSpeed;

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = this.x + Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft(this.speed);
    }
}

