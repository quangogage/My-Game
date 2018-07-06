import GageLib from 'gages-library';

var SPAWN_RATE = [150, 250];
var MAX_ENEMIES = 3;

export default class EnemyGenerator {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;
    this.enemies = options.enemies;
    this.enemyData = options.enemyData;
    this.createEnemy = options.createEnemy;

    // Initial generation values
    this.spawnRate = SPAWN_RATE;
    this.maxEnemies = MAX_ENEMIES;

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
          this.generateEnemy();
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
    var enemyType = this.enemyData[
      Math.floor(GageLib.math.getRandom(0, this.enemyData.length - 1))
    ];
    var side = GageLib.math.getRandom(0, 1);
    var x;
    var y = sceneHeight / 2;

    console.log(enemyType);

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
