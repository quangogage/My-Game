import StartPrompt from './elements/StartPrompt';
import Hearts from './elements/Hearts';
import DeathPrompt from './elements/DeathPrompt';

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
    this.deathPrompt = new DeathPrompt({
      scene: this.scene,
      state: this.state
    });
    this.deathPrompt.preload();
  }
  create() {
    this.startPrompt.create();
    this.hearts.create();
    this.deathPrompt.create();
  }
  update() {
    this.startPrompt.update();
    this.hearts.update();
    this.deathPrompt.update();
  }
}
