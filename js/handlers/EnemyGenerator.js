import GageLib from 'gages-library';

var SPAWN_RATE = [150, 250]; // How quickly they spawn
var SPAWN_COUNT = [1, 2]; // How many spawn
var MAX_ENEMIES = 3; // How many can be alive at one time

export default class EnemyGenerator {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;
    this.enemies = options.enemies;
    this.enemyData = options.enemyData;
    this.createEnemy = options.createEnemy;
    this.totalSpawnWeight = options.totalSpawnWeight;

    // Initial generation values
    this.spawnRate = SPAWN_RATE;
    this.maxEnemies = MAX_ENEMIES;
    this.spawnCount = SPAWN_COUNT;

    // Generation values
    this.spawnTimer = 0;
    this.spawnDelay = this.spawnRate[0];
  }

  /* ** Public Functions ** */
  update() {
    if (this.state.current === 'playing') {
      // Run the timer
      this.spawnTimer++;

      // Create the enemy / reset the timer for the next
      // enemy to be created
      if (this.spawnTimer >= this.spawnDelay) {
        // Only create an enemy if the amount of enemies
        // currently active is less than the max allowed
        // amount
        if (this.enemies.length < this.maxEnemies) {
          var spawnCount = GageLib.math.getRandom(
            this.spawnCount[0],
            this.spawnCount[1]
          );
          for (var i = 0; i <= spawnCount; i++) {
            this.generateEnemy();
          }
        }
        this.resetSpawnRate();
      }
    }
  }

  /* ** Private Functions ** */

  // Creating an enemy
  generateEnemy() {
    var sceneWidth = this.scene.sys.canvas.width;
    var sceneHeight = this.scene.sys.canvas.height;
    var side = GageLib.math.getRandom(0, 1);
    var x;
    var y = sceneHeight / 2;
    var randomSpawnWeight = GageLib.math.getRandom(1, this.totalSpawnWeight);
    var enemyType;
    // Picking an enemy type
    if (randomSpawnWeight >= this.totalSpawnWeight) {
      randomSpawnWeight = this.totalSpawnWeight;
    }
    for (var i = 0; i < this.enemyData.length; i++) {
      var enemy = this.enemyData[i];

      randomSpawnWeight -= enemy.spawnWeight;
      if (randomSpawnWeight <= 0) {
        enemyType = enemy;
        break;
      }
    }

    // Setting the x coord
    if (side >= 0.5) {
      x = sceneWidth * 1.1;
    } else {
      x = -sceneWidth * 0.1;
    }

    // Create it
    this.createEnemy(x, y, enemyType.name);
  }

  // Reset the spawn timer & delay
  resetSpawnRate() {
    this.spawnTimer = 0;
    this.spawnDelay = GageLib.math.getRandom(
      this.spawnRate[0],
      this.spawnRate[1]
    );
  }
}
