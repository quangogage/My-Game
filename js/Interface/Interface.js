import StartPrompt from './elements/StartPrompt';

export default class Interface {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;
  }

  /* ** Public Functions ** */
  preload() {
    this.startPrompt = new StartPrompt({
      scene: this.scene,
      state: this.state
    });
  }
  create() {
    this.startPrompt.create();
  }
  update() {
    this.startPrompt.update();
  }
}
