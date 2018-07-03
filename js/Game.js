import Phaser from 'phaser';
import PlayState from './states/Play';

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: new PlayState()
};

export default class Game {
  constructor() {
    // The Game
    this.game = new Phaser.Game(config);
  }
}
