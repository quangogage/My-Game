import GageLib from 'gages-library';
import Rooms from '../objects/Rooms';

export default class RoomHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
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
      this.createPlatform(plat.x, plat.y, plat.width, plat.height);
    }
  }
}
