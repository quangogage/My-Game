export default class BulletHandler {
  constructor(scene) {
    // Store values
    this.scene = scene;

    // The bullet instances
    this.bullets = [];
  }

  /* ** Public Functions ** */
  preload() {
    // Bullet types
    this.bulletData = [
      {
        name: 'basic'
      }
    ];
  }
  create() {}
  update() {}
}
