import StartPrompt from './elements/StartPrompt';
import Hearts from './elements/Hearts';

export default class Interface {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;
    this.player = options.player;
  }

  /* ** Public Functions ** */
  preload() {
    this.startPrompt = new StartPrompt({
      scene: this.scene,
      state: this.state
    });
    this.hearts = new Hearts({
      scene: this.scene,
      player: this.player
    });
    this.hearts.preload();
  }
  create() {
    this.startPrompt.create();
    this.hearts.create();
  }
  update() {
    this.startPrompt.update();
    this.hearts.update();
  }
}
