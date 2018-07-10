import Platform from '../objects/Platform';

export default class PlatformHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.tileCount = options.tileCount;
    this.tileWidth = options.tileWidth;
    this.tileHeight = options.tileHeight;

    // Dimensions
    this.width = options.width;
    this.height = options.height;

    // All platforms
    this.platforms = [];

    // Binding public functions
    this.create = this.create.bind(this);
  }

  /* ** Public Functions ** */
  update() {}
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
        tileHeight: this.tileHeight
      })
    );
  }
}
