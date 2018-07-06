import ParticleClass from './ParticleClass';

var SIZE = 24;
var LIFETIME = 2;

export default class Flash extends ParticleClass {
  constructor(options) {
    super(options);

    // Dimensions
    this.size = SIZE;

    // Create the flash image
    this.createSprite();

    // Living and dying
    this.life = 0;
    this.lifetime = LIFETIME;
  }

  /* ** Public Functions ** */
  update() {
    this.life++;
    if (this.life >= this.lifetime) {
      this.delete = true;
    }
  }

  // Deleting the flash image
  destroyAssets() {
    this.sprite.destroy();
  }

  /* ** Private Functions ** */
  // Creating the sprite image
  createSprite() {
    var scene = this.scene;

    // Add the image
    this.sprite = scene.add.image(this.x, this.y, 'flash');

    // Size the image
    this.sprite.setDisplaySize(this.size, this.size);
  }
}
