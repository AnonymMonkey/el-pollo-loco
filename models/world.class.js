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

  sound_exchange = new Audio(new Sounds().sound_exchange);
  sound_breakingBottle = new Audio(new Sounds().sound_breakingBottle);
  sound_throwBottle = new Audio(new Sounds().sound_throwBottle);
  sound_throwBottle_sec = new Audio(new Sounds().sound_throwBottle_sec);

  constructor(canvas, keyboard, coordinates) {
    this.ctx = canvas.getContext("2d");

    this.canvas = canvas;
    this.keyboard = keyboard;
    this.coordinates = coordinates;
    this.movableObjectCoordination(this.number, this.level);
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  /**
   *
   * @param {*} number
   * @param {*} level
   */
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

  /**
   *
   * @param {*} number
   * @param {*} level
   */
  chickenCoordination(number, level) {
    number = 3;
    let enemies = level.enemies;
    this.chickenCoordinationSpawner(number, enemies);
    this.chickenCoordinationRandomizer(enemies);
  }

  /**
   *
   * @param {*} number
   * @param {*} enemies
   */
  chickenCoordinationSpawner(number, enemies) {
    if (enemies.length == 0 && this.coordinates.enemeyFirstSpawn) {
      this.coordinates.enemeyFirstSpawn = false;
      for (let i = 0; i < number; i++) {
        enemies.push(new Chicken());
        enemies.push(new Chicken_Small());
      }
    }
  }

  /**
   *
   * @param {*} enemies
   */
  chickenCoordinationRandomizer(enemies) {
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

  /**
   *
   * @param {*} level
   * @returns
   */
  endbossCoordination(level) {
    let endboss = level.bosses[0];
    if (endboss == undefined) {
      return;
    } else {
      if (this.character.x == endboss.x - 400) {
        endboss.hasDiscoveredCharacter = true;
      }
    }
  }

  /**
   *
   * @param {*} number
   * @param {*} level
   */
  cloudCoordination(number, level) {
    number = 3;
    let clouds = level.clouds;
    this.cloudCoordinationSpawner(number, clouds);
    this.cloudCoordinationChanger(clouds);
  }

  /**
   *
   * @param {*} number
   * @param {*} clouds
   */
  cloudCoordinationSpawner(number, clouds) {
    if (clouds.length == 0) {
      for (let i = 0; i < number; i++) {
        clouds.push(new Clouds(this.coordinates.other_Cloud));
        this.coordinates.other_Cloud = !this.coordinates.other_Cloud;
      }
    }
  }

  /**
   *
   * @param {*} clouds
   */
  cloudCoordinationChanger(clouds) {
    if (clouds.length > 1) {
      clouds.forEach((cloud, index) => {
        if (cloud.x < -600) {
          cloud.deleteCloud = true;
          clouds.splice(index, 1);
          clouds.push(new Clouds(coordinates.other_Cloud));
          coordinates.other_Cloud = !coordinates.other_Cloud;
        }
      });
    }
  }

  /**
   *
   * @param {*} number
   * @param {*} level
   */
  backgroundCoordination(number, level) {
    let coordinates = this.coordinates;
    number = coordinates.backgroundObjectLength;
    let backgroundObjects = level.backgroundObjects;
    this.backgroundCoordinationSpawner(coordinates, number, backgroundObjects);
  }

  /**
   *
   * @param {*} coordinates
   * @param {*} number
   * @param {*} backgroundObjects
   */
  backgroundCoordinationSpawner(coordinates, number, backgroundObjects) {
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

  /**
   *
   */
  draw() {
    let self = this;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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

    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   *
   * @param {*} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   *
   * @param {*} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    //mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   *
   * @param {*} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);

    this.ctx.scale(-1, 1);

    mo.x = mo.x * -1;
  }

  /**
   *
   * @param {*} mo
   */
  flipImageBack(mo) {
    this.ctx.restore();

    mo.x = mo.x * -1;
  }

  /**
   *
   */
  checkCollisions() {
    setInterval(() => {
      this.exchangeCoin();
      this.checkThrowBottle();
      this.collisionsWithEnemy();
      this.collisionsWithEndboss();
      this.collisionsWithCollectable();
      this.collisionsCoordinationWithThrowableObject();
    }, 100);
  }

  /**
   *
   */
  collisionsWithEnemy() {
    this.level.enemies.forEach((enemy, index) => {
      this.enemyHurtCharacter(enemy);
      this.enemyDiedProzess(enemy, index);
    });
  }

  /**
   *
   * @param {*} enemy
   */
  enemyHurtCharacter(enemy) {
    if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
      this.character.hit(enemy);
    }
  }

  /**
   *
   * @param {*} enemy
   * @param {*} index
   */
  enemyDiedProzess(enemy, index) {
    if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
      this.enemyDied(enemy, index);
    }
  }

  /**
   *
   */
  enemyDied(enemy, index) {
    enemy.dead = true;
    setTimeout(() => {
      this.level.enemies.splice(index, 1);
    }, 1000);
  }

  /**
   *
   * @returns
   */
  collisionsWithEndboss() {
    let endboss = this.level.bosses[0];
    if (endboss == undefined) {
      return;
    } else {
      if (this.character.isColliding(endboss)) {
        this.character.characterEnergy = 0;
      }
    }
  }

  /**
   *
   */
  collisionsWithCollectable() {
    let collectables = this.level.collectables;
    collectables.forEach((collectable, index) => {
      if (this.character.isColliding(collectable)) {
        collectables.splice(index, 1);
        this.collectedBottle(collectable);
        this.collectedCoin(collectable);
      }
    });
  }

  /**
   *
   * @param {*} collectable
   */
  collectedBottle(collectable) {
    if (collectable.constructor.name == "Bottle") {
      collectable.collected = true;
      this.statusBarBottle.bottleCache++;
    }
  }

  /**
   *
   * @param {*} collectable
   */
  collectedCoin(collectable) {
    if (collectable.constructor.name == "Coin") {
      collectable.collected = true;
      this.statusBarCoin.coinCache++;
    }
  }

  /**
   *
   */
  collisionsCoordinationWithThrowableObject() {
    let throwableObjects = this.throwableObjects;
    let endboss = this.level.bosses[0];
    throwableObjects.forEach((throwableObject, index) => {
      this.throwableObjectsCollisionsWithEndboss(
        throwableObject,
        index,
        endboss
      );
      this.throwableObjectsCollisionsWithChicken(throwableObject, index);
      this.throwableObjectsCollisionsWithGround(throwableObject, index);
    });
  }

  /**
   *
   * @param {*} throwableObject
   * @param {*} index
   * @param {*} endboss
   */
  throwableObjectsCollisionsWithEndboss(throwableObject, index, endboss) {
    if (throwableObject.isColliding(endboss) && this.coordinates.wasThrown) {
      this.coordinates.wasThrown = false;
      this.processForEndboss(throwableObject, index, endboss);
      endboss.wasHit = true;
    }
  }

  /**
   *
   * @param {*} throwableObject
   * @param {*} index
   * @param {*} endboss
   */
  processForEndboss(throwableObject, index, endboss) {
    this.statusBarEndboss.endbossEnergy--;

    if (this.statusBarEndboss.endbossEnergy == 0) {
      endboss.dead = true;
      setTimeout(() => {
        this.level.bosses.splice(0, 1);
        lose = false;
        gameEnd();
      }, 1500);
    }

    this.bottleSplash(throwableObject, index);
  }

  /**
   *
   * @param {*} throwableObject
   * @param {*} indexBottle
   */
  throwableObjectsCollisionsWithChicken(throwableObject, indexBottle) {
    this.level.enemies.forEach((enemy, index) => {
      if (throwableObject.isColliding(enemy)) {
        this.enemyDied(enemy, index);
        this.bottleSplash(throwableObject, indexBottle);
      }
    });
  }

  /**
   *
   * @param {*} throwableObject
   * @param {*} index
   */
  throwableObjectsCollisionsWithGround(throwableObject, index) {
    if (throwableObject.isCollidingGround() && this.coordinates.wasThrown) {
      this.coordinates.wasThrown = false;
      this.processForGround(throwableObject, index);
    }
  }

  /**
   *
   * @param {*} throwableObject
   * @param {*} index
   */
  processForGround(throwableObject, index) {
    this.bottleSplash(throwableObject, index);
  }

  /**
   *
   * @param {*} throwableObject
   * @param {*} index
   */
  bottleSplash(throwableObject, index) {
    let throwableObjects = this.throwableObjects;
    throwableObject.isCollided = true;
    this.sound_breakingBottle.play();

    setTimeout(() => {
      throwableObjects.splice(index, 1);
    }, 500);
  }

  /**
   *
   */
  checkThrowBottle() {
    let tOX = this.character.x + this.coordinates.throwableObjectX;
    let tOY = this.character.y + 110;
    let bottle = new ThrowableObject(tOX, tOY);

    if (
      this.keyboard.KEY_D &&
      this.statusBarBottle.bottleCache > 0 &&
      !this.coordinates.wasThrown &&
      !this.throwButtonPressed
    ) {
      this.throwBottle(bottle);
      this.throwButtonPressed = true;

      setTimeout(() => {
        this.throwButtonPressed = false;
      }, 2000);
    }
  }

  /**
   *
   * @param {*} bottle
   */
  throwBottle(bottle) {
    this.coordinates.wasThrown = true;
    this.throwableObjects.push(bottle);
    this.statusBarBottle.bottleCache--;
    if (Math.random() < 0.5) {
      this.sound_throwBottle.play();
    } else {
      this.sound_throwBottle_sec.play();
    }
  }

  /**
   *
   */
  exchangeCoin() {
    if (this.statusBarCoin.coinCache > 0) {
      if (this.keyboard.KEY_C && !this.coordinates.gotExchanged) {
        this.coinToBottle();
      }
      if (this.keyboard.KEY_X && !this.coordinates.gotExchanged) {
        this.coinToHealth();
      }
    }
  }

  /**
   *
   */
  coinToBottle() {
    if (this.statusBarBottle.bottleCache < 5) {
      this.sound_exchange.play();
      this.toggleExchange();
      this.prozessCoinToBottle();
      setTimeout(() => {
        this.toggleExchange();
      }, 500);
    }
  }

  /**
   *
   */
  coinToHealth() {
    if (this.character.characterEnergy < 100) {
      this.sound_exchange.play();
      this.toggleExchange();
      this.prozessCoinToHealth();
      setTimeout(() => {
        this.toggleExchange();
      }, 500);
    }
  }

  /**
   *
   * @returns
   */
  toggleExchange() {
    return (this.coordinates.gotExchanged = !this.coordinates.gotExchanged);
  }

  /**
   *
   * @returns
   */
  prozessCoinToBottle() {
    return this.statusBarCoin.coinCache-- && this.statusBarBottle.bottleCache++;
  }

  /**
   *
   * @returns
   */
  prozessCoinToHealth() {
    return this.statusBarCoin.coinCache-- && this.checkMaxHealth();
  }

  /**
   *
   * @returns
   */
  checkMaxHealth() {
    if (this.character.characterEnergy <= 80) {
      return (this.character.characterEnergy =
        this.character.characterEnergy + 20);
    }
    if (this.character.characterEnergy > 80) {
      return (this.character.characterEnergy =
        this.character.characterEnergy - this.character.characterEnergy + 100);
    }
  }

  /**
   *
   */
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
}
