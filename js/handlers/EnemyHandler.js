import Pig from '../objects/enemies/Pig';

export default class EnemyHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;

    // All enemy instances
    this.enemies = [];
  }

  /* ** Public Functions ** */
  preload() {
    // All enemy types
    this.enemyData = [
      {
        name: 'pig',
        fileName: 'pig',
        class: Pig,
        width: 48,
        height: 50
      }
    ];

    // Load enemy assets
    for (var i = 0; i < this.enemyData.length; i++) {
      var enemy = this.enemyData[i];
      this.scene.load.spritesheet(
        enemy.name,
        `images/enemies/${enemy.fileName}.png`,
        { frameWidth: 19, frameHeight: 18 }
      );
    }
  }
  update() {
    this.updateEnemies();
  }

  // Creating an enemy
  create(x, y, type) {
    var enemyData = this.getEnemyObj(type);

    // Add to the list of enemy instances
    this.enemies.push(
      new enemyData.class({
        x: x,
        y: y,
        scene: this.scene,
        data: enemyData
      })
    );
  }

  /* ** Private Functions ** */
  // Get an enemy data object by it's name
  getEnemyObj(name) {
    for (var i = 0; i < this.enemyData.length; i++) {
      var enemy = this.enemyData[i];

      if (enemy.name == name) {
        return enemy;
      }
    }
  }

  // Update all of the enemy instances
  updateEnemies() {
    for (var i = 0; i < this.enemies.length; i++) {
      var enemy = this.enemies[i];
      enemy.update();
    }
  }
}
