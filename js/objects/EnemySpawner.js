import GageLib from 'gages-library';

// Initial Values
var SPAWN_RATE = [300, 450]; // How quickly they spawn
var MAX_ENEMIES = 3; // How many can be alive at one time

export default class EnemySpawner {
  constructor(options) {
    // Store values
    this.createEnemy = options.createEnemy;
    this.enemies = options.enemies;
    this.scene = options.scene;
    this.x = options.x;
    this.y = options.y;

    // Initial values
    this.spawnRate = SPAWN_RATE;
    this.maxEnemies = MAX_ENEMIES;

    // Spawning timer
    this.timer =
      (this.spawnRate[0] * GageLib.math.getRandom(0.7 * 100, 0.8 * 100)) / 100;
    this.spawnDelay = GageLib.math.getRandom(
      this.spawnRate[0],
      this.spawnRate[1]
    );
  }

  /* ** Public Functions ** */
  update() {
    this.generateEnemies();
  }

  /* ** Private Functions ** */

  // Generate the enemies
  generateEnemies() {
    // Run the spawn timer
    this.timer++;
    if (this.enemies.length == 0) {
      this.timer += 2;
    } else if (this.enemies.length == 1) {
      this.timer += 1;
    }

    if (this.timer >= this.spawnDelay && this.enemies.length < MAX_ENEMIES) {
      this.createEnemy(this.x, this.y);
      this.resetTimer();
    }
  }

  // Reset the spawn timer
  resetTimer() {
    this.timer = 0;
    this.spawnDelay = GageLib.math.getRandom(
      this.spawnRate[0],
      this.spawnRate[1]
    );
  }
}
