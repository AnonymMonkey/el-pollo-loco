class Character extends MovableObject {
    world;

    x = this.characterX;
    y = this.characterY;
    speed = this.characterSpeed;
    height = this.characterSize;
    width = this.characterSize / 2;

    imageLength = 6;
    imageStartAt = 21;

    IMAGES_WALKING = [];
    walking_sound = new Audio('assets/audio/running.mp3');

    constructor() {
        super().getImages(this, 'assets/img/2_character_pepe/2_walk/W-', '.png');
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.animateModel();
    }

    animateModel() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.KEY_LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 120);

        setInterval(() => {
            if (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) {
                /* walk animation */
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 80);
    }

    jump() {

    }
}