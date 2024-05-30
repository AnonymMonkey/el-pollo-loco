/**
 * collisions with collectable (bottle, coin)
 */
function collisionsWithCollectable() {
  let collectables = world.level.collectables;
  collectables.forEach((collectable, index) => {
    if (world.character.isColliding(collectable)) {
      collectables.splice(index, 1);
      collectedBottle(collectable);
      collectedCoin(collectable);
    }
  });
}

/**
 * collected Bottle
 * @param {object} collectable
 */
function collectedBottle(collectable) {
  if (collectable.constructor.name == "Bottle") {
    collectable.collected = true;
    world.statusBarBottle.bottleCache++;
  }
}

/**
 * collected Coin
 * @param {object} collectable
 */
function collectedCoin(collectable) {
  if (collectable.constructor.name == "Coin") {
    collectable.collected = true;
    world.statusBarCoin.coinCache++;
  }
}
