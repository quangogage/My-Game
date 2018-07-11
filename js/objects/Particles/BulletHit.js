import ParticleClass from './ParticleClass';

var FRAMERATE = 32;
var SCALE = 2;

export default class BulletHit extends ParticleClass {
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
      key: 'bullet-hit',
      frames: this.scene.anims.generateFrameNumbers('bullet-hit', {
        start: 0,
        end: 10
      }),
      frameRate: FRAMERATE
    });
  }

  // Run the animation
  animate() {
    this.sprite.anims.play('bullet-hit', true);
  }

  // Create the bullet-hit sprite
  createSprite() {
    this.sprite = this.scene.add.sprite(this.x, this.y, 'bullet-hit');
    this.sprite.setScale(SCALE);
    this.sprite.on('animationcomplete', this.animComplete.bind(this), this);
    this.sprite.setOrigin(0.5, 0.8);
    this.sprite.setRotation(this.flags.dir - Math.PI / 2);
  }

  // Animation complete
  animComplete() {
    this.delete = true;
  }
}
