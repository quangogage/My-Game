import Platform from '../objects/Platform';

export default class PlatformHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.player = options.player;
    this.tileCount = options.tileCount;
    this.tileWidth = options.tileWidth;
    this.tileHeight = options.tileHeight;
    this.createTile = options.createTile;

    // Dimensions
    this.width = options.width;
    this.height = options.height;

    // All platforms
    this.platforms = [];

    // Binding public functions
    this.create = this.create.bind(this);
  }

  /* ** Public Functions ** */
  update() {
    this.handleCollision();
  }
  create(x, y, width, height) {
    this.platforms.push(
      new Platform({
        x: x,
        y: y,
        width: width,
        height: height,
        scene: this.scene,
        tileCount: this.tileCount,
        tileWidth: this.tileWidth,
        tileHeight: this.tileHeight,
        createTile: this.createTile
      })
    );
  }

  /* ** Private Functions ** */
  handleCollision() {
    // Player data
    var player = this.player;
    var playerPos = player.getPos();
    var playerDim = player.getDim();

    // Iterate through all of the platforms
    for (var i = 0; i < this.platforms.length; i++) {
      var platform = this.platforms[i];

      // Player

      if (
        playerPos.x + playerDim.width / 2 > platform.x &&
        playerPos.x - playerDim.width / 2 < platform.x + platform.pixelWidth &&
        playerPos.y + playerDim.height / 2 > platform.y &&
        playerPos.y - playerDim.height / 2 < platform.y + platform.pixelHeight
      ) {
        var extra = 5;

        if (
          playerPos.x + playerDim.width / 2 > platform.x + extra &&
          playerPos.x - playerDim.width / 2 <
            platform.x + platform.pixelWidth - extra
        ) {
          if (playerPos.y < platform.y + platform.pixelHeight / 2) {
            player.setPos(null, platform.y - playerDim.height / 2);
            player.yvel = 0;
            player.grounded = true;
          }
          if (playerPos.y > platform.y + platform.pixelHeight / 2) {
            player.setPos(
              null,
              platform.y + platform.pixelHeight + playerDim.height / 2 + 1
            );
            player.yvel *= -0.1;
          }
        } else {
          if (playerPos.x < platform.x + platform.pixelWidth / 2) {
            player.setPos(platform.x - playerDim.width / 2, null);
            player.xvel = 0;
          }
          if (playerPos.x > platform.x + platform.pixelWidth / 2) {
            player.setPos(
              platform.x + platform.pixelWidth + playerDim.width / 2,
              null
            );
            player.xvel = 0;
          }
        }
      }
    }
  }
}
