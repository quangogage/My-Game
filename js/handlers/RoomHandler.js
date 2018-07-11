import GageLib from 'gages-library';
import Rooms from '../objects/Rooms';

export default class RoomHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.player = options.player;
    this.tileWidth = options.tileWidth;
    this.tileHeight = options.tileHeight;
    this.createEnemy = options.createEnemy;
    this.createParticle = options.createParticle;
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
    this.generateEnemies(room.enemies);
    this.spawnPlayer(room.playerSpawn);
  }

  // Generate a room's platforms
  generatePlatforms(platforms) {
    for (var i = 0; i < platforms.length; i++) {
      var plat = platforms[i];

      // Sort through the platform data
      plat = this.parsePlat(plat);

      this.createPlatform(plat.x, plat.y, plat.width, plat.height);
    }
  }

  // Generate a room's enemies
  generateEnemies(enemies) {
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];

      // Sort through the enemy data
      enemy = this.parseEnemy(enemy);

      // Move up a lil
      enemy.y -= this.tileHeight * 2.5;

      this.createEnemy(enemy.x, enemy.y);
    }
  }

  // Spawning the player
  spawnPlayer(playerSpawn) {
    playerSpawn = this.parseEnemy(playerSpawn);

    this.player.setPos(playerSpawn.x, playerSpawn.y);
    this.createParticle(playerSpawn.x, playerSpawn.y, 'spawn-flash');
  }

  // Go through and calculate custom values for platforms
  parsePlat(data) {
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

  // Go through and calculate custom values for enemies
  parseEnemy(data) {
    var sceneWidth = this.sceneWidth;
    var sceneHeight = this.sceneHeight;

    for (var key in data) {
      var value = data[key];

      // Centering
      if (value == 'center') {
        // Horizontal
        if (key == 'x') {
          data[key] = sceneWidth / 2;
        }

        // Vertical
        if (key == 'y') {
          data[key] = sceneHeight / 2;
        }
      }

      // Positioning by percentage
      if (typeof value == 'string') {
        if (value.includes('%')) {
          var percentage = parseInt(value) / 100;

          // Horizontal
          if (key == 'x') {
            data[key] = sceneWidth * percentage;
          }

          // Vertical
          if (key == 'y') {
            data[key] = sceneHeight * percentage;
          }
        }
      }
    }
    return data;
  }
}
