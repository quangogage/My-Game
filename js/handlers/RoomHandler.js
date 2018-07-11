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
      plat = this.parsePlatform(plat);

      this.createPlatform(plat.x, plat.y, plat.width, plat.height);
    }
  }

  // Go through and calculate custom values in one of the rooms
  // platform data objects.
  parsePlatform(plat) {
    var sceneWidth = this.sceneWidth;
    var sceneHeight = this.sceneHeight;

    for (var key in plat) {
      var value = plat[key];

      // Centering
      if (value == 'center') {
        // Horizontal
        if (key == 'x') {
          plat[key] = sceneWidth / 2 - (plat.width * this.tileWidth) / 2;
        }

        // Vertical
        if (key == 'y') {
          plat[key] = sceneHeight / 2 - (plat.height * this.tileHeight) / 2;
        }
      }

      // Positioning by percentage
      if (typeof value == 'string') {
        if (value.includes('%')) {
          var percentage = parseInt(value) / 100;

          // Horizontal
          if (key == 'x') {
            plat[key] =
              sceneWidth * percentage - (plat.width * this.tileWidth) / 2;
          }

          // Vertical
          if (key == 'y') {
            plat[key] =
              sceneHeight * percentage - (plat.height * this.tileHeight) / 2;
          }
        }
      }
    }
    return plat;
  }
}
