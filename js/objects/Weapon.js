var GRAVITY = 0.3;
var LIFETIME = 500;
var FLASH_WARNING_TIME = 130;

export default class Weapon {
  constructor(options) {
    // Store references
    this.scene = options.scene;
    this.data = options.data;
    this.state = options.state;
    this.player = options.player;

    // Dimensions and positioning
    this.x = options.x;
    this.y = options.y;
    this.width = this.data.width;
    this.height = this.data.height;

    // Movement and physics
    this.yvel = 0;

    // Living / dying
    this.lifetime = 0;
    this.alpha = 1;

    // Create the sprite
    this.createSprite(this.x, this.y);

    // Create the down arrow
    this.createArrow();
  }

  /* ** Public Functions ** */
  update() {
    this.physics();
    this.attachArrow();
    this.animateArrow();
    this.hideArrow();
    this.dying();
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

  // Create the down arrow icon
  createArrow() {
    var scene = this.scene;

    // Create the image
    this.arrow = scene.add.image(this.sprite.x, this.sprite.y, 'down-arrow');

    // Set the dimensions of the image
    this.arrow.setDisplaySize(32, 32);

    // Create the animation variables
    this.arrowTimer = 0;
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

  // Make the arrow sprite constantly stay by the weapon sprite
  attachArrow() {
    this.arrow.x = this.sprite.x;
    this.arrow.y =
      this.sprite.y -
      this.height -
      this.arrow.height * 0.25 +
      Math.sin(this.arrowTimer) * 4;
  }

  // Animate the arrow
  animateArrow() {
    this.arrowTimer += 0.15;
  }

  // Only show the arrow if the player is standing over the weapon
  hideArrow() {
    var player = this.player;
    if (
      player.sprite.x + player.width / 2 > this.sprite.x - this.width / 2 &&
      player.sprite.x - player.width / 2 < this.sprite.x + this.width / 2 &&
      player.sprite.y + player.height / 2 > this.sprite.y - this.height / 2 &&
      player.sprite.y - player.height / 2 < this.sprite.y + this.height / 2
    ) {
      this.arrow.visible = true;
    } else {
      // If it's the start of the game show it at all
      // times to help the player understand what to do.
      if (this.state.current !== 'start') {
        this.arrow.visible = false;
      }
    }
  }

  // Removing after a bit'
  dying() {
    // Short
    this.lifetime++;

    if (
      this.lifetime >= LIFETIME - FLASH_WARNING_TIME &&
      this.state.current !== 'start'
    ) {
      // Flashing
      this.sprite.alpha = Math.sin(this.lifetime);

      // Removing
      if (this.lifetime >= LIFETIME) {
        this.delete = true;
      }
    }
  }
}
