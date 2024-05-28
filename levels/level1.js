let level1;

/**
 * load level content
 */
function loadLevel() {
  level1 = new Level(
    [new Endboss()],
    [
      /* Chickens */
    ],
    [
      /* Clouds */
    ],
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ],
    [
      /* Background Objects */
    ]
  );
}
