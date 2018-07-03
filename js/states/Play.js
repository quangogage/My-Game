import { Scene } from 'phaser';
import Background from '../objects/env/Background';

export default class PlayState extends Scene {
  constructor(options) {
    super({
      key: 'play'
    });
  }
  preload() {
    // The background
    this.background = new Background(this);
    this.background.preload(this);
  }
  create() {
    this.background.create();
  }
  update() {}
}
