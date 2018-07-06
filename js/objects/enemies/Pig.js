import EnemyClass from './EnemyClass';

export default class Pig extends EnemyClass {
  constructor(options) {
    super(options);

    // Store values
    this.x = options.x;
    this.y = options.y;
    this.width = options.data.width;
    this.height = options.data.height;

    // Create the animations & sprite
    this.createAnimations();
    this.createSprite();
  }

  /* ** Public Functions ** */
  update() {
    this.animate();
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
}
