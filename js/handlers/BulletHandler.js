import Bullet from '../objects/Bullet';

export default class BulletHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.createParticle = options.createParticle;

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
        speed: 20
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
  create(x, y, dir, type, damage) {
    var data = this.getBulletObj(type);

    // Create a new `Bullet` instance
    this.bullets.push(
      new Bullet({
        x: x,
        y: y,
        dir: dir,
        scene: this.scene,
        data: data,
        damage: damage,
        createFlash: this.createFlash.bind(this)
      })
    );
  }

  /* ** Private Functions ** */
  // Update all of the bullets
  updateBullets() {
    for (var i = 0; i < this.bullets.length; i++) {
      var bullet = this.bullets[i];

      // Update the bullet
      bullet.update();

      // Deleting the bullet
      if (bullet.delete) {
        // Destroy any bullet assets
        bullet.destroyAssets();

        // Remove it from the list
        this.bullets.splice(i, 1);
      }
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

  // Create a flash
  createFlash(x, y) {
    this.createParticle(x, y, 'flash');
  }
}
