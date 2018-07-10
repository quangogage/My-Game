var COUNT = 21;

export default class Tiles {
  constructor(options) {
    // Store values
    this.scene = options.scene;

    // The amount of tiles numbered for easy
    // use of the loaded images
    this.count = COUNT;
  }

  /* ** Public Functions ** */
  preload() {
    // Load all of the tile objects/images
    for (var i = 1; i <= this.count; i++) {
      this.scene.load.image(`tile${i}`, `images/env/tiles/${i}.png`);
    }
  }
}
