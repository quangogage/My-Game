export default class ParticleClass {
  constructor(options) {
    // Store references
    this.x = options.x;
    this.y = options.y;
    this.flags = options.flags;
    this.data = options.data;
    this.scene = options.scene;
  }

  // Get the position of the particle
  getPos() {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }

  // Get the dimensions of the particle
  getDim() {
    var width, height;

    // If the particle only has a set size (not width/height)
    if (this.size) {
      width = this.size;
      height = this.size;
    } else {
      width: this.width;
      height: this.height;
    }

    return {
      width: width,
      height: height
    };
  }
}
