class World {
    character = new Character();
    statusBarCoin = new StatusBar(0);
    statusBarHealth = new StatusBar(1);
    statusBarBottle = new StatusBar(2);
    level = level1;
    canvas;
    ctx;
    keyboard;
    coordinates;
    camera_x = 0;
    count_png = false;
    number = 1;
    game_sound = new Audio('assets/audio/background-music.mp3');

    constructor(canvas, keyboard, coordinates) {
        /* Der Kontext ist ein Objekt mit Eigenschaften und Methoden, der Grafik innerhalb des Canvas rendert */
        /* Die Funktion getContext erstellt dabei ein Context-Objekt,
        dessen Typ durch den ersten Parameter spezifiziert wird, in unserem Beispiel ist er also 2d  */
        this.ctx = canvas.getContext('2d');

        this.canvas = canvas;
        this.keyboard = keyboard;
        this.coordinates = coordinates;
        this.movableObjectCoordination(this.number, this.level);
        this.draw();
        this.setWorld();
        this.checkCollisions();
        /*         this.game_sound.play();
                this.game_sound.loop = true;
                this.game_sound.volume = 0.1; */
    }

    movableObjectCoordination(number, level) {
        let self = this;
        this.backgroundCoordination(number, level)
        requestAnimationFrame(function () {
            /* self.chickenCoordination(number, level); */
            self.cloudCoordination(number, level);
            self.movableObjectCoordination(number, level);
        });
    }

    chickenCoordination(number, level) {
        number = 6;
        let enemies = level.enemies;
        if (enemies.length == 0) {
            for (let i = 0; i < number; i++) {
                enemies.push(new Chicken());
                enemies.push(new Chicken_Small());
            }
        };

        if (enemies.length > 1) {
            enemies.forEach((chicken, index) => {
                if (chicken.x < -180) {
                    enemies.splice(index, 1);
                    if (Math.random() < 0.5) {
                        enemies.push(new Chicken());
                    } else {
                        enemies.push(new Chicken_Small());
                    }
                }
            });
        }
    }

    cloudCoordination(number, level) {
        let coordinates = this.coordinates;
        number = 3;
        let clouds = level.clouds;
        if (clouds.length == 0) {
            for (let i = 0; i < number; i++) {
                clouds.push(new Clouds(coordinates.other_Cloud));
                coordinates.other_Cloud = !coordinates.other_Cloud;
            }
        };

        if (clouds.length > 1) {
            clouds.forEach((cloud, index) => {
                if (cloud.x < -600) {
                    clouds.splice(index, 1);
                    clouds.push(new Clouds(coordinates.other_Cloud));
                    coordinates.other_Cloud = !coordinates.other_Cloud;
                }
            });
        }
    }

    backgroundCoordination(number, level) {
        let coordinates = this.coordinates;
        number = coordinates.backgroundObjectLength;
        let backgroundObjects = level.backgroundObjects;
        if (backgroundObjects.length == 0) {
            for (let i = 0; i < number; i++) {
                for (let l = 0; l < 4; l++) {
                    backgroundObjects.push(new BackgroundObject(l, coordinates.backgroundObjectX, coordinates.BG_Rotate));
                }
                coordinates.backgroundObjectX = coordinates.backgroundObjectX + 719;
                coordinates.BG_Rotate = !coordinates.BG_Rotate;
            }
        };
    }

    draw() {
        let self = this;
        /* setzt einen Ausschnitt der Canvas auf seine Ursprungsfarbe zurück */
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        /* Verschiebt alles, was nach dem Aufrufen von translate gezeichnet wird, um die angegebenen Koordinaten */
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bosses);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        /* Draw() wird immer wieder aufgerufen */
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);

        /* spiegelt die Zeichnung */
        this.ctx.scale(-1, 1);

        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        /* restore läd die zuvor gespeicherten daten durch "save()" wieder um auf den ursprünglichen stand zu kommen */
        this.ctx.restore();

        mo.x = mo.x * -1;
    }

    setWorld() {
        this.statusBarCoin.world = this;
        this.statusBarHealth.world = this;
        this.statusBarBottle.world = this;
        this.character.world = this;
        this.coordinates.world = this;
        this.level.level_end_x = this.coordinates.levelEndX;
    }

    checkCollisions() {
        setInterval(() => {
            this.collisionsWithEnemy();
            this.collisionsWithCollectable();
        }, 200);
    }

    collisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                /* debugger */
                /* console.log('Character Energie =', this.character.characterEnergy); */
            }
        });
    }

    collisionsWithCollectable() {
        let collectables = this.level.collectables;
        collectables.forEach((collectable, index) => {
            if (this.character.isColliding(collectable)) {
                collectables.splice(index, 1);
                if (collectable.constructor.name == 'Bottle') {
                    this.statusBarBottle.bottleCache++;
                };

                if (collectable.constructor.name == 'Coin') {
                    this.statusBarCoin.coinCache++;
                };
            }
        });
    }
}