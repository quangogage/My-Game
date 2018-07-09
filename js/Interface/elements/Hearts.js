export default class Hearts {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.player = options.player;

    // The potential animations
    this.anims = ['empty-heart', 'half-heart', 'full-heart'];

    // Dimensions
    this.width = 25;
    this.height = 25;
    this.space = 5;
    this.padding = 10;
  }

  /* ** Public Functions ** */
  preload() {
    // Load the spritesheet
    this.scene.load.spritesheet('heart', 'images/interface/hearts.png', {
      frameWidth: 8,
      frameHeight: 8
    });
  }
  create() {
    var scene = this.scene;

    // Create the animations
    scene.anims.create({
      key: 'full-heart',
      frames: scene.anims.generateFrameNumbers('heart', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'half-heart',
      frames: scene.anims.generateFrameNumbers('heart', { start: 1, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'empty-heart',
      frames: scene.anims.generateFrameNumbers('heart', { start: 2, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    // Generate hearts
    this.createHearts();
  }
  update() {
    // Insert logic for subtracting hearts (full/half/empty)
    // The heart animaions are stored in an array (this.anims) which can be utilized
    // somehow dividing player.health by player.maxHealth and comparing it
    // to the amount of hearts.
    for (var i = 0; i < this.hearts.length; i++) {
      var heart = this.hearts[i];
      var highestValue = (i + 1) * 2;
      var lowestValue = highestValue - 2;
      var newAnimation;
      if (
        this.player.health <= highestValue &&
        this.player.health >= lowestValue
      ) {
        newAnimation = this.anims[this.player.health - lowestValue];
        heart.sprite.anims.play(newAnimation);
      }
    }
  }

  /* ** Private Functions ** */
  // Create the hearts based on the amount of player health
  createHearts() {
    var sceneWidth = this.scene.sys.canvas.width;
    var sceneHeight = this.scene.sys.canvas.height;

    // Array for heart data
    this.hearts = [];

    // Positioning
    var startX = this.padding + this.width / 2;
    var startY = this.padding + this.height / 2;

    // Insert data
    for (var i = 0; i < this.player.maxHealth / 2; i++) {
      var x = startX + (this.width + this.space) * i;
      var y = startY;

      // The object
      var obj = {
        sprite: this.scene.add.sprite(x, y, 'heart'),
        anim: 0
      };

      // Set them all to full
      obj.sprite.anims.play('full-heart', true);

      // Styling
      obj.sprite.stroke = '#000000';
      obj.sprite.strokeThickness = 6;

      // Size them
      obj.sprite.setDisplaySize(this.width, this.height);

      // Add it to the heart array
      this.hearts.push(obj);
    }
  }
}
