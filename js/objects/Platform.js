export default class Platform {
  constructor(options) {
    // Store values
    this.scene = options.scene;

    // Positioning and dimensions
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.pixelWidth = this.width * (options.tileWidth + 1);
    this.pixelHeight = this.height * options.tileHeight;

    // Tile Properties
    this.tile = {
      count: options.tileCount,
      width: options.tileWidth,
      height: options.tileHeight,
      create: options.createTile
    };

    // Generate the tiles
    this.generateTiles();
  }

  /* ** Public Functions ** */

  /* ** Private Functions ** */
  // Create the tiles based on the position and
  // dimensions given
  generateTiles() {
    for (var column = 0; column < this.width; column++) {
      var x = this.x + column * this.tile.width;
      for (var row = 0; row < this.height; row++) {
        var y = this.y + row * this.tile.height;
        var image = this.tile.create(x, y);
        image.setOrigin(0);
      }
    }
  }
}
