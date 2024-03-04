class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    coordinates;
    camera_x = 0;
    count_png = false;
    number = 1;

    constructor(canvas, keyboard, coordinates) {
        /* Der Kontext ist ein Objekt mit Eigenschaften und Methoden, der Grafik innerhalb des Canvas rendert */
        /* Die Funktion getContext erstellt dabei ein Context-Objekt,
        dessen Typ durch den ersten Parameter spezifiziert wird, in unserem Beispiel ist er also 2d  */
        this.ctx = canvas.getContext('2d');

        this.canvas = canvas;
        this.keyboard = keyboard;
        this.coordinates = coordinates;
        this.getBackgroundImages(this.camera_x);
        this.draw();
        this.setWorld();
    }

    getBackgroundImages(camera_x) {
        /* debugger */
        let length = this.coordinates.backgroundObjectLength;
        for (let i = 0; i < length; i++) {
            if (this.count_png) {
                this.number = 1;
                this.count_png = false;
            } else {
                this.number = 2;
                this.count_png = true;
            }
            this.level.backgroundObjects.push(
                new BackgroundObject('assets/img/5_background/layers/air.png', -719 + camera_x),
                new BackgroundObject(`assets/img/5_background/layers/3_third_layer/${this.number}.png`, -719 + camera_x),
                new BackgroundObject(`assets/img/5_background/layers/2_second_layer/${this.number}.png`, -719 + camera_x),
                new BackgroundObject(`assets/img/5_background/layers/1_first_layer/${this.number}.png`, -719 + camera_x),
            );
            camera_x = camera_x + 719;
        }
    }

    draw() {
        /* setzt einen Ausschnitt der Canvas auf seine Ursprungsfarbe zurück */
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        /* Verschiebt alles, was nach dem Aufrufen von translate gezeichnet wird, um die angegebenen Koordinaten */
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        /* Draw() wird immer wieder aufgerufen */
        let self = this;
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

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
        this.character.world = this;
        this.coordinates.world = this;
        this.level.level_end_x = this.coordinates.levelEndX;
    }
}