/**
 * exchange Coin to Bottle or Health
 */
function exchangeCoin() {
  if (world.statusBarCoin.coinCache > 0) {
    if (world.keyboard.KEY_C && !world.coordinates.gotExchanged) {
      coinToBottle();
    }
    if (world.keyboard.KEY_X && !world.coordinates.gotExchanged) {
      coinToHealth();
    }
  }
}

/**
 * exchange Coin to Bottle
 */
function coinToBottle() {
  if (world.statusBarBottle.bottleCache < 5) {
    soundActiv(sound_exchange);
    toggleExchange();
    prozessCoinToBottle();
    setTimeout(() => {
      toggleExchange();
    }, 500);
  }
}

/**
 * exchange Coin to Health
 */
function coinToHealth() {
  if (world.character.characterEnergy < 100) {
    soundActiv(sound_exchange);
    toggleExchange();
    prozessCoinToHealth();
    setTimeout(() => {
      toggleExchange();
    }, 500);
  }
}

/**
 * toggle exchange boolean
 * @returns
 */
function toggleExchange() {
  return (world.coordinates.gotExchanged = !world.coordinates.gotExchanged);
}

/**
 * Coin to Bottle
 * @returns
 */
function prozessCoinToBottle() {
  return world.statusBarCoin.coinCache-- && world.statusBarBottle.bottleCache++;
}

/**
 * Coin to Health
 * @returns
 */
function prozessCoinToHealth() {
  return world.statusBarCoin.coinCache-- && checkMaxHealth();
}

/**
 * check if character health full or not
 * @returns
 */
function checkMaxHealth() {
  if (world.character.characterEnergy <= 80) {
    return (world.character.characterEnergy =
      world.character.characterEnergy + 20);
  }
  if (world.character.characterEnergy > 80) {
    return (world.character.characterEnergy =
      world.character.characterEnergy - world.character.characterEnergy + 100);
  }
}
