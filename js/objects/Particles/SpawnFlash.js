import ParticleClass from './ParticleClass';

var SIZE = 24;
var FRAMERATE = 25;
var SCALE = 2;

export default class SpawnFlash extends ParticleClass {
  constructor(options) {
    super(options);

    // Dimensions
    this.size = SIZE;

    // Create the flash image
    this.createAnimation();
    this.createSprite();
  }

  /* ** Public Functions ** */
  update() {
    this.animate();
  }

  // Deleting the flash image
  destroyAssets() {
    this.sprite.destroy();
  }

  /* ** Private Functions ** */
  // Create the spawn-flash animation
  createAnimation() {
    this.scene.anims.create({
      key: 'explode',
      frames: this.scene.anims.generateFrameNumbers('spawn-flash', {
        start: 0,
        end: 10
      }),
      frameRate: FRAMERATE
    });
  }

  // Run the animation
  animate() {
    this.sprite.anims.play('explode', true);
  }

  // Create the spawn-flash sprite
  createSprite() {
    this.sprite = this.scene.add.sprite(this.x, this.y, 'spawn-flash');
    this.sprite.setScale(SCALE);
    this.sprite.on('animationcomplete', this.animComplete.bind(this), this);
    this.sprite.setDepth(4999);
    this.sprite.setOrigin(0.5, 0.8);
  }

  // Animation complete
  animComplete() {
    this.delete = true;
  }
}
