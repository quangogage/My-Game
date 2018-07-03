import { Scene } from 'phaser';
import Background from '../objects/env/Background';
import Player from '../objects/Player';

export default class PlayScene extends Scene {
  constructor(options) {
    super({
      key: 'play'
    });
  }
  preload() {
    // The Background
    this.background = new Background(this);
    this.background.preload();

    // The Player
    this.player = new Player(this);
    this.player.preload();
  }
  create() {
    this.background.create();
    this.player.create();
  }
  update() {
    this.player.update();
  }
}
