import EnemyClass from './EnemyClass';

var WIDTH = 48;
var HEIGHT = 50;
var FRICTION = 0.8;
var SPEED = 0.3;
var GRAVITY = 0.35;
var HEALTH = 2.2;

export default class Pig extends EnemyClass {
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
    this.resetAtSpawn();
  }

  /* ** Private Functions ** */
  // Create the animations from the spritesheets
  // loaded in `EnemyHandler`
  createAnimations() {
    var scene = this.scene;

    // Create the animatino
    scene.anims.create({
      key: 'pig-run',
      frames: scene.anims.generateFrameNumbers('pig', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  }

  // Create the sprite
  createSprite() {
    // Create the sprite
    this.sprite = this.scene.add.sprite(this.x, this.y, 'pig');

    // Set the size
    this.sprite.setDisplaySize(this.width, this.height);
  }

  // Run the animation
  animate() {
    this.sprite.anims.play('pig-run', true);
  }

  // Basic physics
  physics() {
    this.sprite.x += this.xvel;
    this.sprite.y += this.yvel;
    this.xvel *= this.friction;
    this.yvel += GRAVITY;
  }
}
