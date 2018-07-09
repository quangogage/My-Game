import GageLib from 'gages-library';
import ParticleClass from './ParticleClass';

var SIZE = [50, 100];
var FRAMERATE = 15;

export default class Explosion extends ParticleClass {
  constructor(options) {
    super(options);

    // Dimensions
    this.size = GageLib.math.getRandom(SIZE[0], SIZE[1]);
    this.width = this.size;
    this.height = this.size;

    // Create the spritesheet animation
    this.createAnimation();

    // Create the sprite
    this.createSprite();
  }

  /* ** Public Functions ** */
  update() {
    this.animate();
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
  }

  // Run the animation
  animate() {
    this.sprite.anims.play('explode', true);
  }

  // Animation complete
  animComplete() {
    this.delete = true;
  }
}
