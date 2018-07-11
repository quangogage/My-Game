import GageLib from 'gages-library';
import ParticleClass from './ParticleClass';

var SIZE = [2, 5];
var LIFETIME = 5000;
var GRAVITY = 0.35;
var LAUNCH_SPEED = [1.5, 5];
var DIR_VARIATION = 0.5;
var FRICTION = 0.9;

export default class Blood extends ParticleClass {
  constructor(options) {
    super(options);

    // Dimensions
    this.size = GageLib.math.getRandom(SIZE[0] * 100, SIZE[1] * 100) / 100;
    this.width = this.size;
    this.height = this.size;

    // Create the blood image
    this.createSprite();

    // Physics/movement
    this.dir = options.flags.dir;
    this.dir +=
      GageLib.math.getRandom(-DIR_VARIATION * 1000, DIR_VARIATION * 1000) /
      1000;
    this.speed = GageLib.math.getRandom(LAUNCH_SPEED[0], LAUNCH_SPEED[1]);
    this.xvel = Math.cos(this.dir + Math.PI) * this.speed;
    this.yvel = Math.sin(this.dir + Math.PI) * this.speed;

    // Living and dying
    this.life = 0;
    this.lifetime = LIFETIME;

    // Get pushed around when colliding
    this.getPushed = true;

    // Enable collision
    this.collision = true;
  }

  /* ** Public Functions ** */
  update() {
    // Moving
    this.sprite.x += this.xvel;
    this.sprite.y += this.yvel;
    this.yvel += GRAVITY;
    if (this.grounded) {
      this.xvel *= FRICTION;
    }

    // Dying
    this.life++;
    if (this.life >= this.lifetime) {
      this.delete = true;
    }
  }

  // Deleting the
  destroyAssets() {
    this.sprite.destroy();
  }

  /* ** Private Functions ** */
  // Creating the sprite image
  createSprite() {
    var scene = this.scene;

    // Add the image
    this.sprite = scene.add.image(this.x, this.y, 'blood');

    // Size the image
    this.sprite.setDisplaySize(this.size, this.size);
  }
}
