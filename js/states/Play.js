import { Scene } from 'phaser';
import Background from '../objects/env/Background';

export default class PlayState extends Scene {
  constructor(options) {
    super({
      key: 'play'
    });
  }
  create() {
    // The background
    this.background = new Background();
  }
  update() {}
}
