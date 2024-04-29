class Coordinates extends Images {
  world;

  // Canvas
  canvasWidth = 720;
  canvasHeight = 480;

  // Level
  levelEndX = 720 * 3;
  levelSpawnY = 50;

  // Character
  characterSizeOffsets = {
    xl: 20,
    yt: 110,
    xr: 50,
    yb: 110 + 10,
  };
  characterSize = 250;
  characterX = 120;
  characterY = this.canvasHeight - this.characterSize + 10 - this.levelSpawnY;
  characterSpeed = 4;
  characterEnergy = 100;

  // Status Bars
  statusBarsSize = 60;
  statusBarsX = 10;
  statusBarsY = 0;

  // Chicken
  chickenSizeOffsets = { xl: 5, yt: 5, xr: 10, yb: 5 + 5 };
  chickenSize = 80;
  chickenX = 500; //this.levelEndX;
  chickenY = this.canvasHeight - this.chickenSize + 5 - this.levelSpawnY;
  chickenSpeed = 0.5;

  // Chicken Small
  chickenSmallSizeOffsets = { xl: 5, yt: 5, xr: 10, yb: 5 + 5 };
  chickenSmallSize = 60;
  chickenSmallY =
    this.canvasHeight - this.chickenSmallSize + 5 - this.levelSpawnY;

  // Endboss
  endbossSizeOffsets = { xl: 10, yt: 75, xr: 50, yb: 75 + 45 };
  endbossSize = 400;
  endbossX = 2300;
  endbossY = this.canvasHeight - this.endbossSize + 45 - this.levelSpawnY;
  /* endbossSpeed = 0; */

  // Clouds
  cloudsSize = 300;
  cloudsX = 0;
  cloudsY = 10;
  cloudsSpeed = 0.1;
  other_Cloud = true;

  // Coins
  coinSizeOffsets = { xl: 40, yt: 40, xr: 80, yb: 80 };
  coinsSize = 120;
  coinsX = 500;
  coinsY = 100;

  // Bottles
  bottleSizeOffsets = { xl: 20, yt: 15, xr: 30, yb: 20 };
  bottlesSize = 80;
  bottlesX = 500;
  bottlesY = 344;

  // Throwable Objects
  throwableObjectSizeOffsets = { xl: 10, yt: 10, xr: 20, yb: 20 };
  throwableObjectX = this.characterSize / 2 - this.characterSizeOffsets.xr;
  throwableObjectY = this.characterY + this.characterSizeOffsets.yt;
  throwableObjectSpeedX = 50;
  throwableObjectSpeedY = 30;

  // Background Objects
  backgroundObjectX = -719;
  backgroundObjectY = 0;
  backgroundObjectLength = 5;
  BG_Rotate = true;
}
