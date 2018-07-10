export default class Platform {
  constructor(options) {
    // Store values
    this.scene = options.scene;

    // Positioning and dimensions
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;

    // Tile Properties
    this.tile = {
      count: options.tileCount,
      width: options.tileWidth,
      height: options.tileHeight
    };

    console.log(this.x, this.y, this.width, this.height);
  }
}
