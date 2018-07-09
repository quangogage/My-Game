import GageLib from 'gages-library';
import ParticleClass from './ParticleClass';

var SIZE = [2, 3];
var LIFETIME = 2000;
var GRAVITY = 0.35;
var LAUNCH_SPEED = [1.5, 2];
var DIR_VARIATION = 0.3;

export default class Blood extends ParticleClass {
  constructor(options) {
    super(options);

    // Dimensions
    this.size = GageLib.math.getRandom(SIZE[0] * 100, SIZE[1] * 100) / 100;

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
    this.yvel -= this.speed * 1.25;

    // Living and dying
    this.life = 0;
    this.lifetime = LIFETIME;
  }

  /* ** Public Functions ** */
  update() {
    // Moving
    if (!this.grounded) {
      this.sprite.x += this.xvel;
      this.sprite.y += this.yvel;
      this.yvel += GRAVITY;
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
