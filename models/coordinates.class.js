class Coordinates extends Images {
  world;

  // Level
  levelEndX = 720 * 3;

  // Character
  characterSizeOffsets = {
    xl: 20,
    yt: 110,
    xr: 50,
    yb: 110 + 10,
  };
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
  chickenSizeOffsets = { xl: 5, yt: 5, xr: 10, yb: 10 };
  chickenSize = 80;
  chickenX = 500; //this.levelEndX;
  chickenY = 350;
  chickenSpeed = 0.5;

  // Chicken Small
  chickenSmallSizeOffsets = { xl: 5, yt: 5, xr: 10, yb: 10 };
  chickenSmallSize = 60;
  chickenSmallY = 370;

  // Endboss
  endbossSizeOffsets = { xl: 10, yt: 75, xr: 50, yb: 90 };
  endbossSize = 400;
  endbossX = 2300;
  endbossY = 50;
  /* endbossSpeed = 0; */

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
