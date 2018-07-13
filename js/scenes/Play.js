import { Scene } from 'phaser';
import PlayState from './PlayState';
import componentLoader from '../loaders/ComponentLoader';

export default class PlayScene extends Scene {
  constructor(options) {
    super({
      key: 'play'
    });
  }
  preload() {
    // The Game-state
    this.state = {
      current: 'start',
      timer: 0,
      resetKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    };

    // The component loader (loads all of the components!)
    componentLoader(this);
  }
  create() {
    this.background.create();
    this.player.create();
    this.ground.create();
    this.interface.create();

    // Load the first room
    this.roomHandler.loadRoom(0);
  }
  update() {
    this.player.update();
    this.weaponHandler.update();
    this.bulletHandler.update();
    this.particleHandler.update();
    this.enemyHandler.update();
    this.ground.update(this.player, this.weaponHandler.weapons);
    this.interface.update();
    this.platformHandler.update();
    this.enemySpawnerHandler.update();
    this.heartHandler.update();

    // Updating the playstate
    PlayState({
      scene: this,
      state: this.state,
      player: this.player,
      weaponHandler: this.weaponHandler
    });
  }
}
