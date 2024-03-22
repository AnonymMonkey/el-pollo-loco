class Coordinates extends Images {
    world;

    // Level
    levelEndX = 720 * 3;

    // Character
    characterSizeOffsets = { x: 20, y: 110, width: -50, height: -100 };
    characterSize = 250;
    characterX = 120;
    characterY = 180;
    characterSpeed = 10;
    characterEnergy = 100;
    // Status Bars Character
    characterStatusBarsSize = 60;
    characterStatusBarsX = 10;
    characterStatusBarsY = 0;

    // Chicken
    chickenSize = 80;
    chickenX = this.levelEndX;
    chickenY = 350;
    chickenSpeed = 0.5;

    // Chicken Small
    chickenSmallSize = 60;
    chickenSmallY = 370;

    // Endboss
    endbossSize = 400;
    endbossX = 2300;
    endbossY = 50;
    /* endbossSpeed = 0; */

    // Coins
    coinsSize = 120;
    coinsX = 500;
    coinsY = 100;

    // Bottles
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