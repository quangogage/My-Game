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

  // Default movement function
  move() {
    var dir = this.player.sprite.x < this.sprite.x ? false : true;

    // Flip the sprite based on the direction
    this.sprite.flipX = !dir;

    // Move towards the player
    if (dir) {
      // Right
      this.xvel += this.speed;
    } else {
      // Left
      this.xvel -= this.speed;
    }
  }
}
