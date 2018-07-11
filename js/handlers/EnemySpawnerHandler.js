import EnemySpawner from '../objects/EnemySpawner';

export default class EnemySpawnerHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;
    this.enemies = options.enemies;
    this.createEnemy = options.createEnemy;

    // The spawners
    this.spawners = [];

    // Binding public functions
    this.create = this.create.bind(this);
  }

  /* ** Public Functions ** */
  update() {
    if (this.state.current == 'playing') {
      // Update all of the spawners
      for (var i = 0; i < this.spawners.length; i++) {
        var spawner = this.spawners[i];
        spawner.update();
      }
    }
  }
  create(x, y) {
    this.spawners.push(
      new EnemySpawner({
        x: x,
        y: y,
        scene: this.scene,
        enemies: this.enemies,
        createEnemy: this.createEnemy
      })
    );
  }
}
