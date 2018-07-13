import GageLib from 'gages-library';

// Variable values
var SPAWN_RATE = { value: [300, 375], rate: 4.5, min1: 50, min2: 100 };
var MAX_ENEMIES = {
  value: 3,
  rate: 0.1,
  totalMax: 10
};

export default class EnemySpawner {
  constructor(options) {
    // Store values
    this.createEnemy = options.createEnemy;
    this.enemies = options.enemies;
    this.scene = options.scene;
    this.x = options.x;
    this.y = options.y;

    // Initial values
    this.spawnRate = {
      value: [SPAWN_RATE.value[0], SPAWN_RATE.value[1]],
      rate: SPAWN_RATE.rate,
      min1: SPAWN_RATE.min1,
      min2: SPAWN_RATE.min2
    };
    this.maxEnemies = {
      value: MAX_ENEMIES.value,
      rate: MAX_ENEMIES.rate,
      totalMax: MAX_ENEMIES.totalMax
    };

    // Spawning timer
    this.timer =
      (this.spawnRate.value[0] * GageLib.math.getRandom(0.7 * 100, 0.8 * 100)) /
      100;
    this.spawnDelay = GageLib.math.getRandom(
      this.spawnRate.value[0],
      this.spawnRate.value[1]
    );

    // Increasing difficulty timer
    this.difficultyTimer = 0;
    this.difficultyRate = 500;

    // Logging stats
    this.log = {
      timer: 500,
      time: 500
    };
  }

  /* ** Public Functions ** */
  update() {
    this.generateEnemies();
    this.increaseDifficulty();
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

    if (
      this.timer >= this.spawnDelay &&
      this.enemies.length < MAX_ENEMIES.value
    ) {
      this.createEnemy(this.x, this.y);
      this.resetTimer();
    }
  }

  // Reset the spawn timer
  resetTimer() {
    this.timer = 0;
    this.spawnDelay = GageLib.math.getRandom(
      this.spawnRate.value[0],
      this.spawnRate.value[1]
    );
  }

  // Increasing the difficulty over time
  increaseDifficulty() {
    // Run the timer that it all depends on
    this.difficultyTimer += 1;

    if (this.difficultyTimer >= this.difficultyRate) {
      // Max enemies
      this.maxEnemies.value += this.maxEnemies.rate;
      if (this.maxEnemies.value >= this.maxEnemies.totalMax) {
        this.maxEnemies.value = this.maxEnemies.totalMax;
      }

      // Spawn rate
      this.spawnRate.value[0] -= this.spawnRate.rate;
      this.spawnRate.value[1] -= this.spawnRate.rate;
      if (this.spawnRate.value[0] <= this.spawnRate.min1) {
        this.spawnRate.value[0] = this.spawnRate.min1;
      }
      if (this.spawnRate.value[1] <= this.spawnRate.min2) {
        this.spawnRate.value[1] = this.spawnRate.min2;
      }
      this.difficultyTimer = 0;
    }

    // Logging the new stats
    this.log.timer++;
    if (this.log.timer >= this.log.time) {
      console.clear();
      console.log(
        '\n%c---------------------------\n---------------------------\n',
        'color:white;'
      );

      console.log(
        '%c Max Enemies ' + ' %c- ' + Math.floor(this.maxEnemies.value),
        'color:green;font-size:20px;',
        'color:white;font-size:13px;'
      );

      console.log('%c-----', 'color:grey;');

      console.log(
        '%c Spawn Rate ' +
          '%c- ' +
          Math.floor(this.spawnRate.value[0]) +
          ' / ' +
          Math.floor(this.spawnRate.value[1]),
        'color:green;font-size:20px;',
        'color:white;font-size:13px;'
      );

      console.log(
        '\n%c---------------------------\n---------------------------\n',
        'color:white;'
      );
      this.log.timer = 0;
    }
  }
}
