import GageLib from 'gages-library';
import Rooms from '../objects/Rooms';

export default class RoomHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.tileWidth = options.tileWidth;
    this.tileHeight = options.tileHeight;
    this.createEnemy = options.createEnemy;
    this.createPlatform = options.createPlatform;

    // Scene dimensions
    this.sceneWidth = this.scene.sys.canvas.width;
    this.sceneHeight = this.scene.sys.canvas.height;
  }

  /* ** Public Functions ** */
  update() {}

  /* ** Private Functions ** */
  // Load a room
  loadRoom(roomNumber) {
    var room = Rooms[roomNumber];

    this.generatePlatforms(room.platforms);
  }

  // Generate a room's platform
  generatePlatforms(platforms) {
    for (var i = 0; i < platforms.length; i++) {
      var plat = platforms[i];

      // Sort through the platform data
      plat = this.parseData(plat);

      this.createPlatform(plat.x, plat.y, plat.width, plat.height);
    }
  }

  // Go through and calculate custom values
  parseData(data) {
    var sceneWidth = this.sceneWidth;
    var sceneHeight = this.sceneHeight;

    for (var key in data) {
      var value = data[key];

      // Centering
      if (value == 'center') {
        // Horizontal
        if (key == 'x') {
          data[key] = sceneWidth / 2 - (data.width * this.tileWidth) / 2;
        }

        // Vertical
        if (key == 'y') {
          data[key] = sceneHeight / 2 - (data.height * this.tileHeight) / 2;
        }
      }

      // Positioning by percentage
      if (typeof value == 'string') {
        if (value.includes('%')) {
          var percentage = parseInt(value) / 100;

          // Horizontal
          if (key == 'x') {
            data[key] =
              sceneWidth * percentage - (data.width * this.tileWidth) / 2;
          }

          // Vertical
          if (key == 'y') {
            data[key] =
              sceneHeight * percentage - (data.height * this.tileHeight) / 2;
          }
        }
      }
    }
    return data;
  }
}
