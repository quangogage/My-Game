export default class PlatformHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.tileWidth = options.tileWidth;
    this.tileHeight = options.tileHeight;

    // Dimensions
    this.width = options.width;
    this.height = options.height;
  }

  /* ** Public Functions ** */
  update() {}
}
