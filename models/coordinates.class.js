class Coordinates extends Images {
  world;

  // Level
  levelEndX = 720 * 3;

  // Character
  characterSizeOffsets = { x: 20, y: 110, width: 50, height: 120 };
  characterSize = 250;
  characterX = 120;
  characterY = 180;
  characterSpeed = 4;
  characterEnergy = 100;
  // Status Bars Character
  characterStatusBarsSize = 60;
  characterStatusBarsX = 10;
  characterStatusBarsY = 0;

  // Chicken
  chickenSizeOffsets = { x: 0, y: 0, width: 0, height: 0 };
  chickenSize = 80;
  chickenX = 500; //this.levelEndX;
  chickenY = 350;
  chickenSpeed = 0.5;

  // Chicken Small
  chickenSmallSizeOffsets = { x: 0, y: 0, width: 0, height: 0 };
  chickenSmallSize = 60;
  chickenSmallY = 370;

  // Endboss
  endbossSizeOffsets = { x: 10, y: 75, width: 50, height: 90 };
  endbossSize = 400;
  endbossX = 2300;
  endbossY = 50;
  /* endbossSpeed = 0; */

  // Coins
  coinSizeOffsets = { x: 40, y: 40, width: 80, height: 80 };
  coinsSize = 120;
  coinsX = 500;
  coinsY = 100;

  // Bottles
  bottleSizeOffsets = { x: 20, y: 15, width: 30, height: 20 };
  bottlesSize = 80;
  bottlesX = 500;
  bottlesY = 344;

  // Clouds
  cloudsSize = 300;
  cloudsX = 0;
  cloudsY = 10;
  cloudsSpeed = 0.1;
  other_Cloud = true;

  // Background Objects
  backgroundObjectX = -719;
  backgroundObjectY = 0;
  backgroundObjectLength = 5;
  BG_Rotate = true;
}
