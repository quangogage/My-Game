import Heart from '../objects/Heart';

export default class HeartHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;
    this.player = options.player;

    // The hearts
    this.hearts = [];

    // Binding public functions
    this.create = this.create.bind(this);
  }

  /* ** Public Functions ** */
  preload() {
    // Create the spritesheet
    this.scene.load.spritesheet('heart-object', 'images/hearts.png', {
      frameWidth: 8,
      frameHeight: 6
    });
  }
  update() {
    // Update them all
    for (var i = 0; i < this.hearts.length; i++) {
      var heart = this.hearts[i];

      // Update the instance
      heart.update();

      // Destroying the instance
      if (heart.delete) {
        heart.destroyAssets();
        this.hearts.splice(i, 1);
      }
    }
  }
  create(x, y) {
    // Create the animation
    this.scene.anims.create({
      key: 'heart-spin',
      frames: this.scene.anims.generateFrameNumbers('heart-object', {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: -1
    });

    // Create the heart obj
    this.hearts.push(
      new Heart({
        x: x,
        y: y,
        player: this.player,
        scene: this.scene,
        state: this.state,
        player: this.player
      })
    );
  }
}
