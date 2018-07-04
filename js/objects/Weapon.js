var GRAVITY = 0.3;

export default class Weapon {
  constructor(options) {
    // Store references
    this.scene = options.scene;
    this.data = options.data;

    // Dimensions and positioning
    this.x = options.x;
    this.y = options.y;
    this.width = this.data.width;
    this.height = this.data.height;

    // Movement and physics
    this.yvel = 0;

    // Create the sprite
    this.createSprite(this.x, this.y);
  }

  /* ** Public Functions ** */
  update() {
    this.physics();
  }

  /* ** Private Functions ** */
  // Create the sprite
  createSprite(x, y) {
    var scene = this.scene;

    // Create the image
    this.sprite = scene.add.image(x, y, this.data.name);

    // Set the dimensions of the image
    this.sprite.setDisplaySize(this.width, this.height);
  }

  // Basic physics
  physics() {
    this.sprite.y += this.yvel;
    this.yvel += GRAVITY;
  }

  // Get position
  getPos() {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  // Get dimensions
  getDim() {
    return { width: this.width, height: this.height };
  }

  // Set the position
  setPos(x, y) {
    var x = x || this.sprite.x;
    var y = y || this.sprite.y;
    this.sprite.x = x;
    this.sprite.y = y;
  }
}
