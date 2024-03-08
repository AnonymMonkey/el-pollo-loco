class Character extends MovableObject {
    world;

    x = this.characterX;
    y = this.characterY;
    speed = this.characterSpeed;
    height = this.characterSize;
    width = this.characterSize / 2;

    IMAGES_WALKING_StartAt = 21;
    IMAGES_WALKING_Length = 6;
    IMAGES_WALKING = [];

    IMAGES_JUMPING_StartAt = 31;
    IMAGES_JUMPING_Length = 9;
    IMAGES_JUMPING = [];
    walking_sound = new Audio('assets/audio/running.mp3');

    constructor() {
        super().getImages(
            'assets/img/2_character_pepe/2_walk/W-',
            '.png',
            this.IMAGES_WALKING_StartAt,
            this.IMAGES_WALKING_Length,
            this.IMAGES_WALKING
        );
        this.getImages(
            'assets/img/2_character_pepe/3_jump/J-',
            '.png',
            this.IMAGES_JUMPING_StartAt,
            this.IMAGES_JUMPING_Length,
            this.IMAGES_JUMPING
        );
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);

        this.applyGravity();
        this.animateModel();
    }

    animateModel() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight(this.speed);
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.KEY_LEFT && this.x > 0) {
                this.moveLeft(this.speed);
                this.otherDirection = true;
                this.walking_sound.play();
            }
            /* console.log(this.speedY) */

            if (this.world.keyboard.KEY_UP && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 120);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) {
                    /* walk animation */
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }


        }, 80);
    }
}