import Bullet from '../objects/Bullet';

export default class BulletHandler {
  constructor(scene) {
    // Store values
    this.scene = scene;

    // The bullet instances
    this.bullets = [];

    // Binding public functions
    this.create = this.create.bind(this);
  }

  /* ** Public Functions ** */
  preload() {
    var scene = this.scene;

    // Bullet types
    this.bulletData = [
      {
        name: 'basic',
        fileName: 'basic',
        speed: 14
      }
    ];

    // Load the files
    for (var i = 0; i < this.bulletData.length; i++) {
      var bullet = this.bulletData[i];
      scene.load.image(bullet.name, `images/bullets/${bullet.fileName}.png`);
    }
  }
  update() {
    this.updateBullets();
  }

  // Create a bullet
  create(x, y, dir, type) {
    var data = this.getBulletObj(type);

    // Create a new `Bullet` instance
    this.bullets.push(
      new Bullet({
        x: x,
        y: y,
        dir: dir,
        scene: this.scene,
        data: data
      })
    );
  }

  /* ** Private Functions ** */
  // Update all of the bullets
  updateBullets() {
    for (var i = 0; i < this.bullets.length; i++) {
      var bullet = this.bullets[i];
      bullet.update();
    }
  }

  // Get a bullets data object by it's name
  getBulletObj(name) {
    for (var i = 0; i < this.bulletData.length; i++) {
      if (this.bulletData[i].name == name) {
        return this.bulletData[i];
      }
    }
  }
}
