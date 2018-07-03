var SPEED = 1;
var FRICTION = 0.785;
var GRAVITY = 0.4;

export default class Player {
  constructor(scene) {
    // Store references
    this.scene = scene;

    // Dimensions
    this.width = 48;
    this.height = 50;

    // Movement
    this.xvel = 0;
    this.yvel = 0;
    this.speed = SPEED;
    this.friction = FRICTION;

    // Controls
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  /* ** Public Functions ** */
  preload() {
    var scene = this.scene;

    // Load the spritesheet
    scene.load.spritesheet('player', 'images/player/spritesheet.png', {
      frameWidth: 19,
      frameHeight: 18
    });
  }
  create() {
    var scene = this.scene;

    // The Sprite
    this.sprite = scene.add.sprite(200, 200, 'player');

    // Set the dimensions of the sprite
    this.sprite.setDisplaySize(this.width, this.height);

    // Create the animations of the sprite
    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });
  }
  update() {
    var scene = this.scene;
    this.physics();
    this.move();
  }

  // Get the player's position
  getPos() {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  // Get the dimensions of the player
  getDim() {
    return {
      width: this.width,
      height: this.height
    };
  }

  // Set the player's position
  setPos(x, y) {
    var x = x || this.sprite.x;
    var y = y || this.sprite.y;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  /* ** Private Functions ** */
  // Basic physics
  physics() {
    this.sprite.x += this.xvel;
    this.sprite.y += this.yvel;
    this.xvel *= this.friction;
    this.yvel += GRAVITY;
  }

  // Movement
  move() {
    if (this.cursors.right.isDown) {
      // Look right
      this.sprite.flipX = false;

      // Run
      this.sprite.anims.play('run', true);

      // Move right
      this.xvel += this.speed;
    } else if (this.cursors.left.isDown) {
      // Look left
      this.sprite.flipX = true;

      // Run
      this.sprite.anims.play('run', true);

      // Move left
      this.xvel -= this.speed;
    } else {
      this.sprite.anims.play('idle', true);
    }
  }
}
