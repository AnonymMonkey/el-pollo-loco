/**
 * collsions between throwable object (Bottle) and Opponents or Ground
 */
function collisionsCoordinationWithThrowableObject() {
  let throwableObjects = world.throwableObjects;
  let endboss = world.level.bosses[0];
  throwableObjects.forEach((throwableObject, index) => {
    if (!throwableObject.hasCollided) {
      throwableObjectsCollisionsWithEndboss(throwableObject, index, endboss);
      throwableObjectsCollisionsWithChicken(throwableObject, index);
      throwableObjectsCollisionsWithGround(throwableObject, index);
    }
  });
}

/**
 * collsions between throwable object (Bottle) and Endboss
 * @param {object} throwableObject
 * @param {index} index
 * @param {object} endboss
 */
function throwableObjectsCollisionsWithEndboss(throwableObject, index, endboss) {
  if (throwableObject.isColliding(endboss) && world.coordinates.wasThrown) {
    processForEndboss(throwableObject, index, endboss);
  }
}

/**
 * death prozess for Endboss
 * @param {object} throwableObject
 * @param {index} index
 * @param {object} endboss
 */
function processForEndboss(throwableObject, index, endboss) {
  world.coordinates.wasThrown = false;
  throwableObject.hasCollided = true;
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
      processForChicken(throwableObject, indexBottle, enemy, index);
    }
  });
}

/**
 * Process for bottle collision with chicken
 * @param {object} throwableObject
 * @param {index} indexBottle
 * @param {object} enemy
 * @param {index} index
 */
function processForChicken(throwableObject, indexBottle, enemy, enemyIndex) {
  world.coordinates.wasThrown = false;
  throwableObject.hasCollided = true;

  setTimeout(() => {
    enemy.wasHit = false;
  }, 50);

  bottleSplash(throwableObject, indexBottle);
  world.enemyDied(enemy, enemyIndex);
}

/**
 * collsions between throwable object (Bottle) and Ground
 * @param {object} throwableObject
 * @param {index} index
 */
function throwableObjectsCollisionsWithGround(throwableObject, index) {
  if (throwableObject.isCollidingGround() && world.coordinates.wasThrown) {
    processForGround(throwableObject, index);
  }
}

/**
 * Process for bottle collision with ground
 * @param {object} throwableObject
 * @param {index} index
 */
function processForGround(throwableObject, index) {
  world.coordinates.wasThrown = false;
  throwableObject.hasCollided = true;
  bottleSplash(throwableObject, index);
}

/**
 * Process for Splash Bottle
 * @param {object} throwableObject
 * @param {index} index
 */
function bottleSplash(throwableObject, index) {
  let throwableObjects = world.throwableObjects;
  soundActiv(world.sound_breakingBottle);
  throwableObject.isCollided = true;
  setTimeout(() => {
    throwableObjects.splice(index, 1);
  }, 550);
}

/**
 * Check if bottle can be thrown
 */
function checkThrowBottle() {
  let tOX = world.character.x + world.coordinates.throwableObjectX;
  let tOY = world.character.y + 110;
  let bottle = new ThrowableObject(tOX, tOY);
  bottle.hasCollided = false;

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
    soundActiv(world.sound_throwBottle);
  } else {
    soundActiv(world.sound_throwBottle_sec);
  }
}