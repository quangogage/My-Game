import { Scene } from 'phaser';
import Background from '../objects/env/Background';
import WeaponHandler from '../handlers/WeaponHandler';
import Player from '../objects/Player';
import Ground from '../objects/env/Ground';

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

    // The ground
    this.ground = new Ground(this);
    this.ground.preload();

    // The weapon handler
    this.weaponHandler = new WeaponHandler(this);
    this.weaponHandler.preload();
  }
  create() {
    this.background.create();
    this.player.create();
    this.ground.create();
  }
  update() {
    this.player.update();
    this.ground.update(this.player);
    this.weaponHandler.update();
  }
}
