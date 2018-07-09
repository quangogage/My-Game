import GageLib from 'gages-library';

export default class EnemyClass {
  constructor(options) {
    // Store references
    this.scene = options.scene;
    this.data = options.data;
    this.player = options.player;
    this.createParticle = options.createParticle;

    // Getting hit
    this.hit = {
      active: false,
      timer: 0,
      flashTime: 100
    };
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

  // Getting hit
  getHit(bullet) {
    var knockback = bullet.knockback || 7;
    var bulletPos = bullet.getPos();
    var bulletDim = bullet.getDim();
    var damage = bullet.damage || 1;
    var angle =
      Math.atan2(bulletPos.y - this.sprite.y, bulletPos.x - this.sprite.x) +
      Math.PI;

    // Knockback
    this.xvel += Math.cos(angle) * knockback;
    this.yvel += Math.sin(angle) * knockback;

    // Flashing red
    this.sprite.tint = 0xff0000;

    // Reset to no tint
    setTimeout(
      function() {
        this.sprite.tint = 0xffffff;
      }.bind(this),
      this.hit.flashTime
    );

    // Losing health / dying
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }

    // Create blood particle
    var bloodCount = GageLib.math.getRandom(2, 4);
    for (var i = 0; i < bloodCount; i++) {
      this.createParticle(
        bulletPos.x + (Math.cos(bullet.dir) * bulletDim.width) / 2,
        bulletPos.y + (Math.sin(bullet.dir) * bulletDim.width) / 2,
        'blood',
        { dir: bullet.dir }
      );
    }

    // Delete the bullet
    bullet.delete = true;
  }

  // Dying
  die() {
    this.delete = true;
  }
}