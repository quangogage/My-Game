import ParticleClass from './ParticleClass';

var FRAMERATE = 35;
var SCALE = 3;

export default class FootStep extends ParticleClass {
  constructor(options) {
    super(options);

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
      key: 'footstep',
      frames: this.scene.anims.generateFrameNumbers('footstep', {
        start: 0,
        end: 10
      }),
      frameRate: FRAMERATE
    });
  }

  // Run the animation
  animate() {
    this.sprite.anims.play('footstep', true);
  }

  // Create the footstep sprite
  createSprite() {
    this.sprite = this.scene.add.sprite(this.x, this.y, 'footstep');
    this.sprite.setScale(SCALE);
    this.sprite.flipX = this.flags.flipX;
    this.sprite.on('animationcomplete', this.animComplete.bind(this), this);
    this.sprite.setOrigin(0.5, 1);
  }

  // Animation complete
  animComplete() {
    this.delete = true;
  }
}
