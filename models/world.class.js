class World {
  character = new Character();
  statusBarHealth = new StatusBar(0);
  statusBarCoin = new StatusBar(1);
  statusBarBottle = new StatusBar(2);
  statusBarEndboss = new StatusBar(3);
  throwableObjects = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  coordinates;
  camera_x = 0;
  count_png = false;
  number = 1;

  game_sound = new Audio(new Sounds().sound_backgroundMusic);

  constructor(canvas, keyboard, coordinates) {
    /* Der Kontext ist ein Objekt mit Eigenschaften und Methoden, der Grafik innerhalb des Canvas rendert */
    /* Die Funktion getContext erstellt dabei ein Context-Objekt,
        dessen Typ durch den ersten Parameter spezifiziert wird, in unserem Beispiel ist er also 2d  */
    this.ctx = canvas.getContext("2d");

    this.canvas = canvas;
    this.keyboard = keyboard;
    this.coordinates = coordinates;
    this.movableObjectCoordination(this.number, this.level);
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.game_sound.play();
    this.game_sound.loop = true;
    this.game_sound.volume = 0.5;
  }

  movableObjectCoordination(number, level) {
    let self = this;
    this.backgroundCoordination(number, level);
    requestAnimationFrame(function () {
      self.chickenCoordination(number, level);
      self.endbossCoordination(level);
      self.cloudCoordination(number, level);
      self.movableObjectCoordination(number, level);
    });
  }

  chickenCoordination(number, level) {
    number = 3;
    let enemies = level.enemies;
    if (enemies.length == 0 && this.coordinates.enemeyFirstSpawn) {
      this.coordinates.enemeyFirstSpawn = false;
      for (let i = 0; i < number; i++) {
        enemies.push(new Chicken());
        enemies.push(new Chicken_Small());
      }
    }

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

  endbossCoordination(level) {
    let endboss = level.bosses[0];
    if (this.character.x == endboss.x - 400) {
      console.log("Boss hat spieler entdeckt");
    }
  }

  cloudCoordination(number, level) {
    number = 3;
    let clouds = level.clouds;
    if (clouds.length == 0) {
      for (let i = 0; i < number; i++) {
        clouds.push(new Clouds(this.coordinates.other_Cloud));
        this.coordinates.other_Cloud = !this.coordinates.other_Cloud;
      }
    }

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
          backgroundObjects.push(
            new BackgroundObject(
              l,
              coordinates.backgroundObjectX,
              coordinates.BG_Rotate
            )
          );
        }
        coordinates.backgroundObjectX = coordinates.backgroundObjectX + 719;
        coordinates.BG_Rotate = !coordinates.BG_Rotate;
      }
    }
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
    this.addToMap(this.statusBarEndboss);

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    /* Draw() wird immer wieder aufgerufen */
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
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
    this.statusBarEndboss.world = this;
    this.character.world = this;
    this.coordinates.world = this;
    this.throwableObjects.world = this;
    this.level.level_end_x = this.coordinates.levelEndX;
  }

  checkCollisions() {
    setInterval(() => {
      this.collisionsWithCollectable();
      this.collisionsCoordinationWithThrowableObject();
      this.exchangeCoin();
    }, 1000 / 60);

    setInterval(() => {
      this.collisionsWithEnemy();
    }, 100);
  }

  collisionsWithEnemy() {
    this.level.enemies.forEach((enemy, index) => {
      if (
        this.character.isColliding(enemy) &&
        !this.character.isAboveGround()
      ) {
        this.character.hit(enemy);
      }

      if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
        enemy.dead = true;
        setTimeout(() => {
          this.level.enemies.splice(index, 1);
        }, 2000);
      }
    });
  }

  collisionsWithCollectable() {
    let collectables = this.level.collectables;
    collectables.forEach((collectable, index) => {
      if (this.character.isColliding(collectable)) {
        collectables.splice(index, 1);
        if (collectable.constructor.name == "Bottle") {
          this.statusBarBottle.bottleCache++;
        }

        if (collectable.constructor.name == "Coin") {
          this.statusBarCoin.coinCache++;
        }
      }
    });
  }

  collisionsCoordinationWithThrowableObject() {
    let throwableObjects = this.throwableObjects;
    let endboss = this.level.bosses[0];
    this.checkThrowBottle();
    throwableObjects.forEach((throwableObject, index) => {
      this.checkThrowBottle();

      this.collisionsWithEndboss(throwableObject, index, endboss);
      this.collisionsWithGround(throwableObject, index);
    });
  }

  collisionsWithEndboss(throwableObject, index, endboss) {
    if (throwableObject.isColliding(endboss)) {
      this.processForEndboss(throwableObject, index);
    }
  }

  processForEndboss(throwableObject, index) {
    console.log("flasche hat Boss getroffen");
    if (this.coordinates.wasThrown) {
      this.coordinates.wasThrown = false;
      this.statusBarEndboss.endbossEnergy--;
      this.bottleSplash(throwableObject, index);
    }
  }

  collisionsWithGround(throwableObject, index) {
    if (throwableObject.isCollidingGround()) {
      this.processForGround(throwableObject, index);
    }
  }

  processForGround(throwableObject, index) {
    console.log("flasche hat Boden getroffen");

    this.bottleSplash(throwableObject, index);

    this.coordinates.wasThrown = false;
  }

  bottleSplash(throwableObject, index) {
    let throwableObjects = this.throwableObjects;
    throwableObject.isCollided = true;
    setTimeout(() => {
      throwableObjects.splice(index, 1);
    }, 500);
  }

  //ANCHOR - Flasche buggt beim werfen
  checkThrowBottle() {
    let tOX = this.character.x + this.coordinates.throwableObjectX;
    let tOY = this.character.y + 110;
    let bottle = new ThrowableObject(tOX, tOY);
    console.log(this.coordinates.wasThrown);
    if (
      this.keyboard.KEY_D &&
      this.statusBarBottle.bottleCache > 0 &&
      !this.coordinates.wasThrown
    ) {
      this.throwBottle(bottle);
    }
  }

  throwBottle(bottle) {
    this.coordinates.wasThrown = true;
    this.throwableObjects.push(bottle);
    this.statusBarBottle.bottleCache--;
  }

  //ANCHOR - Flaschen werden nicht aufgeladen
  exchangeCoin() {
    if (this.statusBarCoin.coinCache > 0) {
      if (this.keyboard.KEY_C && !this.coordinates.gotExchanged) {
        this.toggleExchange();
        this.prozessCoinToBottle();
        setTimeout(() => {
          this.toggleExchange();
        }, 500);
      }
      if (this.keyboard.KEY_X && !this.coordinates.gotExchanged) {
        this.toggleExchange();
        this.prozessCoinToBottle();
        setTimeout(() => {
          this.toggleExchange();
        }, 500);
      }
    }
  }

  toggleExchange() {
    return (this.coordinates.gotExchanged = !this.coordinates.gotExchanged);
  }

  prozessCoinToBottle() {
    return this.statusBarCoin.coinCache-- && this.statusBarBottle.bottleCache++;
  }

  prozessCoinToBottle() {
    return (
      this.statusBarCoin.coinCache-- &&
      (this.character.characterEnergy = this.character.characterEnergy + 20)
    );
  }
}
