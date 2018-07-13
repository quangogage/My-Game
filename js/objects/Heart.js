var WIDTH = 20;
var HEIGHT = 18;
var GRAVITY = 0.1;

export default class Heart {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;
    this.player = options.player;

    // Positioning/dimensions
    this.x = options.x;
    this.y = options.y;
    this.width = 20;
    this.height = 18;

    // Movement
    this.yvel = 0;

    // Animation
    this.anim = {
      value: 0,
      timer: 0
    };

    // Create the sprite
    this.createSprite();
  }

  /* ** Public Functions ** */
  update() {
    this.animate();
    this.physics();
    this.customAnim();
    this.getPickedUp();
  }

  // Destroy any of it's assets
  destroyAssets() {
    this.sprite.destroy();
  }

  // Get the position of the heart
  getPos() {
    return {
      x: this.sprite.x,
      y: this.y
    };
  }

  // Get the dimensions of the heart
  getDim() {
    return {
      width: this.width,
      height: this.height
    };
  }

  // Set the heart's position
  setPos(x, y) {
    var x = x || this.sprite.x;
    var y = y || this.sprite.y;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  /* ** Private Functions ** */
  // Create the sprite
  createSprite() {
    this.sprite = this.scene.add.sprite(this.x, this.y, 'heart-object');
    this.sprite.setDisplaySize(this.width, this.height);
    this.sprite.setOrigin(0.5, 1.5);
  }

  // Animate the sprite
  animate() {
    this.sprite.anims.play('heart-spin', true);
  }

  // Basic physics
  physics() {
    if (!this.grounded) {
      this.yvel += GRAVITY;
    }
    this.y += this.yvel;
    this.sprite.y = this.y + this.anim.value;
  }

  // Procedural animation
  customAnim() {
    // Increment the timer
    this.anim.timer += 0.1;

    // Apply the value
    this.anim.value = Math.sin(this.anim.timer) * 10;
  }

  // Having the player pick it up
  getPickedUp() {
    var playerPos = this.player.getPos();
    var playerDim = this.player.getDim();

    if (
      playerPos.x + playerDim.width / 2 > this.sprite.x - this.width / 2 &&
      playerPos.x - playerDim.width / 2 < this.sprite.x + this.width / 2 &&
      playerPos.y + playerDim.height / 2 > this.sprite.y - this.height / 2 &&
      playerPos.y - playerDim.height / 2 < this.sprite.y + this.height / 2
    ) {
      // Give the player health
      this.player.addHealth(1);

      // Remove the heart
      this.delete = true;
    }
  }
}
