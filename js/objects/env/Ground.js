import GageLib from 'gages-library';

export default class Ground {
  constructor(scene) {
    this.scene = scene;
    this.tileCount = 21;
    this.totalHeight = 5;
    this.tileWidth = 32;
    this.tileHeight = 32;
  }

  preload() {
    var scene = this.scene;

    // Load all of the tile objects/images
    for (var i = 1; i <= this.tileCount; i++) {
      scene.load.image(`tile${i}`, `images/env/tiles/${i}.png`);
    }

    // Calculate the position of the ground
    var sceneHeight = scene.sys.canvas.height;
    this.groundY =
      sceneHeight -
      (this.totalHeight - 1) * this.tileHeight -
      this.tileHeight / 2;
  }
  create() {
    var scene = this.scene;
    var sceneWidth = scene.sys.canvas.width;
    var sceneHeight = scene.sys.canvas.height;
    var columnCount = Math.ceil(sceneWidth / this.tileWidth) + 1;

    // Create the tile grid
    for (var row = 0; row < this.totalHeight; row++) {
      for (var column = 0; column < columnCount; column++) {
        // What tile image will it be?
        var tileNumber = Math.floor(GageLib.math.getRandom(1, this.tileCount));

        // Calculate the image's position
        var x = column * this.tileWidth;
        var y =
          sceneHeight -
          (this.totalHeight - 1) * this.tileHeight +
          row * this.tileHeight;

        // Create the image
        var image = scene.add.image(x, y, `tile${tileNumber}`);

        // Size the image
        image.setDisplaySize(this.tileWidth, this.tileHeight);
      }
    }
  }
  update(player) {
    var pos = player.getPos();
    var dim = player.getDim();
    if (pos.y + dim.height / 2 > this.groundY) {
      player.setPos(null, this.groundY - dim.height / 2);
      player.yvel = 0;
    }
  }
}
