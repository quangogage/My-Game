export default class ParticleClass {
  constructor(options) {
    // Store references
    this.x = options.x;
    this.y = options.y;
    this.flags = options.flags;
    this.data = options.data;
    this.scene = options.scene;
  }
}
