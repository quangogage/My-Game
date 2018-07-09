import EnemyClass from './EnemyClass';

var WIDTH = 52;
var HEIGHT = 60;
var FRICTION = 0.8;
var SPEED = 0.825;
var GRAVITY = 0.35;
var HEALTH = 1;

export default class FlamingSkeleton extends EnemyClass {
  constructor(options) {
    super(options);

    // Store values
    this.x = options.x;
    this.y = options.y;

    // Movement
    this.xvel = 0;
    this.yvel = 0;
    this.friction = FRICTION;
    this.speed = SPEED;

    // Dimensions
    this.width = WIDTH;
    this.height = HEIGHT;

    // Life
    this.health = HEALTH;

    // Create the animations & sprite
    this.createAnimations();
    this.createSprite();
  }

  /* ** Public Functions ** */
  update() {
    this.animate();
    this.physics();
    this.move();
  }

  /* ** Private Functions ** */
  // Create the animations from the spritesheets
  // loaded in `EnemyHandler`
  createAnimations() {
    var scene = this.scene;

    // Create the animatino
    scene.anims.create({
      key: 'flaming-skeleton-run',
      frames: scene.anims.generateFrameNumbers('flaming-skeleton', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
  }

  // Create the sprite
  createSprite() {
    // Create the sprite
    this.sprite = this.scene.add.sprite(this.x, this.y, 'flaming-skeleton');

    // Set the size
    this.sprite.setDisplaySize(this.width, this.height);
  }

  // Run the animation
  animate() {
    this.sprite.anims.play('flaming-skeleton-run', true);
  }

  // Moving
  move() {
    var sceneWidth = this.scene.sys.canvas.width;

    // Set the running direction (once)
    if (this.dir == null) {
      if (this.player.sprite.x < this.sprite.x) {
        this.dir = -1;
        this.sprite.flipX = true;
      } else {
        this.dir = 1;
        this.sprite.flipX = false;
      }
    }

    // Move
    this.xvel += this.speed * this.dir;

    // Dying when you go off screen
    if (
      (this.dir == -1 && this.sprite.x < 0) ||
      (this.dir == 1 && this.sprite.x > sceneWidth)
    ) {
      this.delete = true;
    }
  }

  // Basic physics
  physics() {
    this.sprite.x += this.xvel;
    this.sprite.y += this.yvel;
    this.xvel *= this.friction;
    this.yvel += GRAVITY;
  }

  onDeath() {
    this.createParticle(this.sprite.x, this.sprite.y, 'explosion', {
      player: this.player,
      enemies: this.enemies
    });
  }
}
