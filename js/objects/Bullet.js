export default class Bullet {
  constructor(options) {
    // Store references
    this.scene = options.scene;
    this.data = options.data;
    this.x = options.x;
    this.y = options.y;
    this.dir = options.dir;
    this.speed = options.data.speed;
    this.createFlash = options.createFlash;

    // Dimensions
    this.width = 32;
    this.height = 12;

    // Create the image
    this.createSprite();
  }

  // Creating the image
  createSprite() {
    var scene = this.scene;

    // Add the image
    this.sprite = scene.add.image(this.x, this.y, this.data.name);

    // Set the origin
    this.sprite.setOrigin(0.5);

    // Rotate it
    this.sprite.setRotation(this.dir);

    // Flip it (if necessary)
    if (this.dir >= Math.PI / 2) {
      this.sprite.flipY = true;
    }

    // Size it
    this.sprite.setDisplaySize(this.width, this.height);

    // Move it forward by half of it's width to account for
    // the centered origin
    this.sprite.x += Math.cos(this.dir) * (this.width * 0.8);
    this.sprite.y += Math.sin(this.dir) * (this.width * 0.8);

    // Create a flash particle
    this.createFlash(this.sprite.x, this.sprite.y);
  }

  // Updating the bullet
  update() {
    this.sprite.x += Math.cos(this.dir) * this.speed;
    this.sprite.y += Math.sin(this.dir) * this.speed;
  }
}
