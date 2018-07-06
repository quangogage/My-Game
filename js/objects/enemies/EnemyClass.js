export default class EnemyClass {
  constructor(options) {
    // Store references
    this.scene = options.scene;
    this.data = options.data;
    this.player = options.player;
  }

  // Get the position of the enemy
  getPos() {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }

  // Get the dimensions of the enemy
  getDim() {
    return {
      width: this.width,
      height: this.height
    };
  }
}
