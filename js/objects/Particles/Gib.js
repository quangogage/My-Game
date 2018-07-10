import GageLib from 'gages-library';
import ParticleClass from './ParticleClass';
import { runInThisContext } from 'vm';

var SCALING = [1.5, 2.5];
var LIFETIME = 2000;
var GRAVITY = 0.3;
var LAUNCH_SPEED = [1.5, 5.5];
var FRICTION = 0.85;
var DIR_VARIATION = 0.3;
var ROT_SPEED = [15, 35];
var ROT_FRICTION = 0.6;

export default class Gib extends ParticleClass {
  constructor(options) {
    super(options);

    // What type of gib is it
    this.type = options.flags.type || 'meat';

    // Dimensions
    this.scale =
      GageLib.math.getRandom(SCALING[0] * 100, SCALING[1] * 100) / 100;

    // Create the particle image
    this.createSprite();

    // Physics/movement
    this.dir = options.flags.dir;
    this.dir +=
      GageLib.math.getRandom(-DIR_VARIATION * 1000, DIR_VARIATION * 1000) /
      1000;
    this.speed = GageLib.math.getRandom(LAUNCH_SPEED[0], LAUNCH_SPEED[1]);
    this.xvel = Math.cos(this.dir + Math.PI) * this.speed;
    this.yvel = Math.sin(this.dir + Math.PI) * this.speed;
    this.rotVel =
      GageLib.math.getRandom(ROT_SPEED[0] * 100, ROT_SPEED[1] * 100) / 100;
    this.rotDirection = GageLib.math.getRandom(0, 100) > 50 ? 1 : -1;

    // Living and dying
    this.life = 0;
    this.lifetime = LIFETIME;

    // Get pushed around when colliding
    this.getPushed = true;
  }

  /* ** Public Functions ** */
  update() {
    // Moving
    this.sprite.x += this.xvel;
    this.sprite.y += this.yvel;
    this.yvel += GRAVITY;
    this.sprite.angle += this.rotVel * this.rotDirection;
    if (this.grounded) {
      this.xvel *= FRICTION;
      this.rotVel *= ROT_FRICTION;
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
    var frameCount, frame;
    this.sprite = scene.add.sprite(this.x, this.y, `${this.type}-gib`);

    // Set the frame
    frameCount = 9;
    frame = Math.floor(GageLib.math.getRandom(0, frameCount));
    this.sprite.setFrame(frame);

    // Rotate it
    this.sprite.setOrigin(0.5);
    this.sprite.angle = GageLib.math.getRandom(0, 360);

    // Size the image
    //this.sprite.setDisplaySize(this.width, this.height);
    this.sprite.setScale(this.scale);
    this.width = this.sprite.width * this.scale;
    this.height = this.sprite.height * this.scale;
  }
}
