/**
 * collsions between throwable object (Bottle) and Opponents or Ground
 */
function collisionsCoordinationWithThrowableObject() {
  let throwableObjects = world.throwableObjects;
  let endboss = world.level.bosses[0];
  throwableObjects.forEach((throwableObject, index) => {
    throwableObjectsCollisionsWithEndboss(throwableObject, index, endboss);
    throwableObjectsCollisionsWithChicken(throwableObject, index);
    throwableObjectsCollisionsWithGround(throwableObject, index);
  });
}

/**
 * collsions between throwable object (Bottle) and Endboss
 * @param {object} throwableObject
 * @param {index} index
 * @param {object} endboss
 */
function throwableObjectsCollisionsWithEndboss(
  throwableObject,
  index,
  endboss
) {
  if (throwableObject.isColliding(endboss) && world.coordinates.wasThrown) {
    world.coordinates.wasThrown = false;
    processForEndboss(throwableObject, index, endboss);
    endboss.wasHit = true;
  }
}

/**
 * death prozess for Endboss
 * @param {object} throwableObject
 * @param {index} index
 * @param {object} endboss
 */
function processForEndboss(throwableObject, index, endboss) {
  world.statusBarEndboss.endbossEnergy--;

  if (world.statusBarEndboss.endbossEnergy == 0) {
    endboss.isDead = true;
    setTimeout(() => {
      world.level.bosses.splice(0, 1);
      lose = false;
      gameEnd();
    }, 1500);
  }

  bottleSplash(throwableObject, index);
}

/**
 * collsions between throwable object (Bottle) and normal Enemies
 * @param {object} throwableObject
 * @param {index} indexBottle
 */
function throwableObjectsCollisionsWithChicken(throwableObject, indexBottle) {
  world.level.enemies.forEach((enemy, index) => {
    if (throwableObject.isColliding(enemy) && !enemy.wasHit) {
      enemy.wasHit = true;
      if (enemy.wasHit) {
        setTimeout(() => {
          enemy.wasHit = false;
        }, 50);

        bottleSplash(throwableObject, indexBottle);
      }
      world.enemyDied(enemy, index);
    }
  });
}

/**
 * collsions between throwable object (Bottle) and Ground
 * @param {object} throwableObject
 * @param {index} index
 */
function throwableObjectsCollisionsWithGround(throwableObject, index) {
  if (throwableObject.isCollidingGround() && world.coordinates.wasThrown) {
    world.coordinates.wasThrown = false;
    processForGround(throwableObject, index);
  }
}

/**
 * throwable object (Bottle) splice on ground prozess
 * @param {object} throwableObject
 * @param {index} index
 */
function processForGround(throwableObject, index) {
  bottleSplash(throwableObject, index);
}

/**
 * throwable object (Bottle) splice prozess
 * @param {object} throwableObject
 * @param {index} index
 */
function bottleSplash(throwableObject, index) {
  let throwableObjects = world.throwableObjects;
  world.sound_breakingBottle.play();
  throwableObject.isCollided = true;
  console.log(throwableObject.isCollided);
  setTimeout(() => {
    throwableObjects.splice(index, 1);
  }, 550);
}

/**
 * checks whether bottle can be thrown
 */
function checkThrowBottle() {
  let tOX = world.character.x + world.coordinates.throwableObjectX;
  let tOY = world.character.y + 110;
  let bottle = new ThrowableObject(tOX, tOY);

  if (
    world.keyboard.KEY_D &&
    world.statusBarBottle.bottleCache > 0 &&
    !world.coordinates.wasThrown &&
    !world.throwButtonPressed
  ) {
    throwBottle(bottle);
    world.throwButtonPressed = true;

    setTimeout(() => {
      world.throwButtonPressed = false;
    }, 2000);
  }
}

/**
 * throw Bottle
 * @param {object} bottle
 */
function throwBottle(bottle) {
  world.character.isAwake();
  world.coordinates.wasThrown = true;
  world.throwableObjects.push(bottle);
  world.statusBarBottle.bottleCache--;
  if (Math.random() < 0.5) {
    world.sound_throwBottle.play();
  } else {
    world.sound_throwBottle_sec.play();
  }
}

//ANCHOR - Flasche verschwindet noch in der Luft nach dem werfen, nachdem ich ein chicken getroffen habe.
//ANCHOR - Sounds alle stummen können
