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
   * movable object coordination
   * @param {number} number
   * @param {object} level
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
   * chicken coordination
   * @param {number} number
   * @param {object} level
   */
  chickenCoordination(number, level) {
    number = 6;
    let enemies = level.enemies;
    this.chickenCoordinationSpawner(number, enemies);
    this.chickenCoordinationRandomizer(enemies);
  }

  /**
   * chicken spawner
   * @param {number} number
   * @param {object} enemies
   */
  chickenCoordinationSpawner(number, enemies) {
    if (enemies.length == 0 && this.coordinates.enemeyFirstSpawn) {
      this.coordinates.enemeyFirstSpawn = false;
      for (let i = 0; i < number; i++) {
        if (Math.random() < 0.5) {
          enemies.push(new Chicken());
        } else {
          enemies.push(new Chicken_Small());
        }
      }
    }
  }

  /**
   * chicken splice and respawn coordination
   * @param {object} enemies
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
   * endboss coordination
   * @param {object} level
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
   * cloud coordination
   * @param {number} number
   * @param {object} level
   */
  cloudCoordination(number, level) {
    number = 3;
    let clouds = level.clouds;
    this.cloudCoordinationSpawner(number, clouds);
    this.cloudCoordinationChanger(clouds);
  }

  /**
   * cloud spawner
   * @param {number} number
   * @param {object} clouds
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
   * cloud splice and respawn coordination
   * @param {object} clouds
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
   * coordination for Background
   * @param {number} number
   * @param {object} level
   */
  backgroundCoordination(number, level) {
    let coordinates = this.coordinates;
    number = coordinates.backgroundObjectLength;
    let backgroundObjects = level.backgroundObjects;
    this.backgroundCoordinationSpawner(coordinates, number, backgroundObjects);
  }

  /**
   * spawns the backgrounds
   * @param {object} coordinates
   * @param {number} number
   * @param {object} backgroundObjects
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
   * draws the objects in canvas
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
   * draw several objects to Map
   * @param {objects} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * draw object to Map
   * @param {object} mo
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
   * flip image from object
   * @param {object} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);

    this.ctx.scale(-1, 1);

    mo.x = mo.x * -1;
  }

  /**
   * flip image from object back
   * @param {object} mo
   */
  flipImageBack(mo) {
    this.ctx.restore();

    mo.x = mo.x * -1;
  }

  /**
   * check collisions
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
   * collsions with enemy
   */
  collisionsWithEnemy() {
    let enemiesToRemove = new Set();

    this.level.enemies.forEach((enemy, index) => {
      this.enemyHurtCharacter(enemy);
      if (this.enemyDiedProzess(enemy, index)) {
        enemiesToRemove.add(index);
      }
    });

    setTimeout(() => {
      this.removeEnemies(enemiesToRemove);
    }, 1000);
  }

  /**
   * enemy hurting character
   * @param {object} enemy
   */
  enemyHurtCharacter(enemy) {
    if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
      this.character.hit(enemy);
    }
  }

  /**
   * death process for enemy
   * @param {object} enemy
   * @param {index} index
   */
  enemyDiedProzess(enemy, index) {
    if (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      !enemy.isDead
    ) {
      this.enemyDied(enemy);
      return true; // Markiere zum Löschen
    }
    return false;
  }

  /**
   * Enemy marked as dead
   */
  enemyDied(enemy) {
    enemy.isDead = true;
  }

  /**
   * splice enemy after index sort
   * @param {object} indices
   */
  removeEnemies(indices) {
    Array.from(indices)
      .sort((a, b) => b - a)
      .forEach((index) => {
        if (this.level.enemies[index] && this.level.enemies[index].isDead) {
          this.level.enemies.splice(index, 1);
        }
      });
  }

  /**
   * collisions with Endboss
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
   * collisions with collectable (bottle, coin)
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
   * collected Bottle
   * @param {object} collectable
   */
  collectedBottle(collectable) {
    if (collectable.constructor.name == "Bottle") {
      collectable.collected = true;
      this.statusBarBottle.bottleCache++;
    }
  }

  /**
   * collected Coin
   * @param {*} collectable
   */
  collectedCoin(collectable) {
    if (collectable.constructor.name == "Coin") {
      collectable.collected = true;
      this.statusBarCoin.coinCache++;
    }
  }

  /**
   * collsions between throwable object (Bottle) and Opponents or Ground
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
   * collsions between throwable object (Bottle) and Endboss
   * @param {object} throwableObject
   * @param {index} index
   * @param {object} endboss
   */
  throwableObjectsCollisionsWithEndboss(throwableObject, index, endboss) {
    if (throwableObject.isColliding(endboss) && this.coordinates.wasThrown) {
      this.coordinates.wasThrown = false;
      this.processForEndboss(throwableObject, index, endboss);
      endboss.wasHit = true;
    }
  }

  /**
   * death prozess for Endboss
   * @param {object} throwableObject
   * @param {index} index
   * @param {object} endboss
   */
  processForEndboss(throwableObject, index, endboss) {
    this.statusBarEndboss.endbossEnergy--;

    if (this.statusBarEndboss.endbossEnergy == 0) {
      endboss.isDead = true;
      setTimeout(() => {
        this.level.bosses.splice(0, 1);
        lose = false;
        gameEnd();
      }, 1500);
    }

    this.bottleSplash(throwableObject, index);
  }

  /**
   * collsions between throwable object (Bottle) and normal Enemies
   * @param {object} throwableObject
   * @param {index} indexBottle
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
   * collsions between throwable object (Bottle) and Ground
   * @param {object} throwableObject
   * @param {index} index
   */
  throwableObjectsCollisionsWithGround(throwableObject, index) {
    if (throwableObject.isCollidingGround() && this.coordinates.wasThrown) {
      this.coordinates.wasThrown = false;
      this.processForGround(throwableObject, index);
    }
  }

  /**
   * throwable object (Bottle) splice on ground prozess
   * @param {object} throwableObject
   * @param {index} index
   */
  processForGround(throwableObject, index) {
    this.bottleSplash(throwableObject, index);
  }

  /**
   * throwable object (Bottle) splice prozess
   * @param {object} throwableObject
   * @param {index} index
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
   * checks whether bottle can be thrown
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
   * throw Bottle
   * @param {object} bottle
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
   * exchange Coin to Bottle or Health
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
   * exchange Coin to Bottle
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
   * exchange Coin to Health
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
   * toggle exchange boolean
   * @returns
   */
  toggleExchange() {
    return (this.coordinates.gotExchanged = !this.coordinates.gotExchanged);
  }

  /**
   * Coin to Bottle
   * @returns
   */
  prozessCoinToBottle() {
    return this.statusBarCoin.coinCache-- && this.statusBarBottle.bottleCache++;
  }

  /**
   * Coin to Health
   * @returns
   */
  prozessCoinToHealth() {
    return this.statusBarCoin.coinCache-- && this.checkMaxHealth();
  }

  /**
   * check if character health full or not
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
   * set world
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
