import GageLib from 'gages-library';

var CAMERA_SHAKE = 16;

export default class Bullet {
  constructor(options) {
    // Store references
    this.scene = options.scene;
    this.data = options.data;
    this.x = options.x;
    this.y = options.y;
    this.dir = options.dir;
    this.damage = options.damage;
    this.speed = options.data.speed;
    this.accuracy = options.accuracy;
    this.createFlash = options.createFlash;

    // Calculate the direction of the bullet
    this.calculateDir();

    // Dimensions
    this.width = 32;
    this.height = 12;

    // Create the image
    this.createSprite();
    this.shakeCamera();
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

  // Shake the camera
  shakeCamera() {
    this.scene.cameras.main.shake(CAMERA_SHAKE);
  }

  // Updating the bullet
  update() {
    var sceneWidth = this.scene.sys.canvas.width;

    // Move
    this.sprite.x += Math.cos(this.dir) * this.speed;
    this.sprite.y += Math.sin(this.dir) * this.speed;

    // Delete if offscreen
    if (this.sprite.x <= 0 || this.sprite.x >= sceneWidth) {
      this.delete = true;
    }
  }

  // Removing the sprite
  destroyAssets() {
    this.sprite.destroy();
  }

  // Get the position of the bullet
  getPos() {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }

  // Get the dimensions of the bullet
  getDim() {
    return {
      width: this.width,
      height: this.height
    };
  }

  // Calculate the direction with accuracy in mind
  calculateDir() {
    var accuracy = this.accuracy / 100;
    var range = 0.3 * (1 - accuracy);
    this.dir += GageLib.math.getRandom(-range * 1000, range * 1000) / 1000;
  }
}
