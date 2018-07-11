import GageLib from 'gages-library';

var COUNT = 21;
var DEPTH = 1000;

export default class Tiles {
  constructor(options) {
    // Store values
    this.scene = options.scene;

    // The amount of tiles numbered for easy
    // use of the loaded images
    this.count = COUNT;

    // The dimensions of tiles to be used by any
    // component utilizing tile-type thingys.
    this.width = 32;
    this.height = 32;

    // Binding public functions
    this.createImage = this.createImage.bind(this);
  }

  /* ** Public Functions ** */
  preload() {
    // Load all of the tile objects/images
    for (var i = 1; i <= this.count; i++) {
      this.scene.load.image(`tile${i}`, `images/env/tiles/${i}.png`);
    }
  }
  createImage(x, y, index) {
    var index = index || Math.floor(GageLib.math.getRandom(1, this.count - 1));

    // Add the image
    var image = this.scene.add.image(x, y, `tile${index}`);

    // Set it's dimensions
    image.setDisplaySize(this.width, this.height);

    // Set it's origin
    image.setOrigin(0.5);

    // Set it's z-index
    image.setDepth(DEPTH);

    // Add the image
    return image;
  }
}
