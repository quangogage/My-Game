import GageLib from 'gages-library';
import ParticleClass from './ParticleClass';

var SIZE = [150, 150];
var FRAMERATE = 15;

export default class Explosion extends ParticleClass {
  constructor(options) {
    super(options);

    // Dimensions
    this.size = GageLib.math.getRandom(SIZE[0], SIZE[1]);
    this.width = this.size;
    this.height = this.size;

    // Knocking back the player/enemies
    this.knockback = 15;
    this.damage = 2;
    this.dontRemove = true;

    // Create the spritesheet animation
    this.createAnimation();

    // Create the sprite
    this.createSprite();
  }

  /* ** Public Functions ** */
  update() {
    this.animate();
    this.doDamage();
  }

  // Deleting the assets
  destroyAssets() {
    this.sprite.destroy();
  }

  /* ** Private Functions ** */
  // Create the explosion animation
  createAnimation() {
    this.scene.anims.create({
      key: 'explode',
      frames: this.scene.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 6
      }),
      frameRate: FRAMERATE
    });
  }

  // Create the explosions sprite
  createSprite() {
    this.sprite = this.scene.add.sprite(this.x, this.y, 'explosion');
    this.sprite.setDisplaySize(this.width, this.height);
    this.sprite.on('animationcomplete', this.animComplete.bind(this), this);
    this.sprite.setDepth(4999);
  }

  // Run the animation
  animate() {
    this.sprite.anims.play('explode', true);
  }

  // Animation complete
  animComplete() {
    this.delete = true;
  }

  // Damage anything around it
  doDamage() {
    // Player
    var playerPos = this.flags.player.getPos();
    var playerDim = this.flags.player.getDim();
    if (
      playerPos.x + playerDim.width / 2 > this.sprite.x - this.width / 2 &&
      playerPos.x - playerDim.width / 2 < this.sprite.x + this.width / 2 &&
      playerPos.y + playerDim.height / 2 > this.sprite.y - this.height / 2 &&
      playerPos.y - playerDim.height / 2 < this.sprite.y + this.height / 2
    ) {
      this.flags.player.getHit(this);
    }

    // Enemies
    var enemies = this.flags.enemies;
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      var enemyPos = enemy.getPos();
      var enemyDim = enemy.getDim();
      if (
        enemyPos.x + enemyDim.width / 2 > this.sprite.x - this.width / 2 &&
        enemyPos.x - enemyDim.width / 2 < this.sprite.x + this.width / 2 &&
        enemyPos.y + enemyDim.height / 2 > this.sprite.y - this.height / 2 &&
        enemyPos.y - enemyDim.height / 2 < this.sprite.y + this.height / 2
      ) {
        // Only do damage once and don't do damage to a skeleton
        // that created the explosion.
        if (enemy.beenHitBy != this && enemy != this.flags.createdBy) {
          enemy.getHit(this);
          enemy.beenHitBy = this;
        }
      }
    }

    // Other particles
    for (var i = 0; i < this.particles.length; i++) {
      var particle = this.particles[i];
      if (particle != this && particle.xvel != null) {
        var particle = this.particles[i];
        var particlePos = particle.getPos();
        var particleDim = particle.getDim();
        if (
          particlePos.x + particleDim.width / 2 >
            this.sprite.x - this.width / 2 &&
          particlePos.x - particleDim.width / 2 <
            this.sprite.x + this.width / 2 &&
          particlePos.y + particleDim.height / 2 >
            this.sprite.y - this.height / 2 &&
          particlePos.y - particleDim.height / 2 <
            this.sprite.y + this.height / 2
        ) {
          if (particle.beenHitBy != this) {
            var angle = Math.atan2(
              this.sprite.y - particlePos.y,
              this.sprite.x - particlePos.x
            );
            particle.xvel += Math.cos(angle) * this.knockback;
            particle.yvel += -Math.abs(Math.sin(angle) * this.knockback);
            particle.beenHitBy = this;
          }
        }
      }
    }
  }
}
