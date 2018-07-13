import ParticleClass from './ParticleClass';

var FRAMERATE = 25;
var SCALE = 3;

export default class LandBurst extends ParticleClass {
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
      key: 'land-burst',
      frames: this.scene.anims.generateFrameNumbers('land-burst', {
        start: 0,
        end: 10
      }),
      frameRate: FRAMERATE
    });
  }

  // Run the animation
  animate() {
    this.sprite.anims.play('land-burst', true);
  }

  // Create the land-burst sprite
  createSprite() {
    this.sprite = this.scene.add.sprite(this.x, this.y, 'land-burst');
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
