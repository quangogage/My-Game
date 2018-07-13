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
    this.width = WIDTH;
    this.height = HEIGHT;

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
  }
  destroyAssets() {
    this.sprite.destroy();
  }

  /* ** Private Functions ** */
  // Create the sprite
  createSprite() {
    this.sprite = this.scene.add.sprite(this.x, this.y, 'heart-object');
    this.sprite.setDisplaySize(this.width, this.height);
  }

  // Animate the sprite
  animate() {
    this.sprite.anims.play('heart-spin', true);
  }

  // Basic physics
  physics() {
    this.yvel += GRAVITY;
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
}
