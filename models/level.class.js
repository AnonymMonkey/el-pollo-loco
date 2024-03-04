class Level {
    world;

    enemies;
    clouds;
    collectables;
    backgroundObjects;
    level_end_x;

    constructor(enemies, clouds, collectables, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectables = collectables;
        this.backgroundObjects = backgroundObjects;
    }


}