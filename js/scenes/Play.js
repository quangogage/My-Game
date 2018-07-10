import { Scene } from 'phaser';
import Background from '../objects/env/Background';
import WeaponHandler from '../handlers/WeaponHandler';
import Player from '../objects/Player';
import Ground from '../objects/env/Ground';
import BulletHandler from '../handlers/BulletHandler';
import ParticleHandler from '../handlers/ParticleHandler';
import Interface from '../Interface/Interface';
import PlayState from './PlayState';
import EnemyHandler from '../handlers/EnemyHandler';

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

    // The Background
    this.background = new Background(this);
    this.background.preload();

    // The particle handler
    this.particleHandler = new ParticleHandler({ scene: this });
    this.particleHandler.preload();

    // The bullet handler
    this.bulletHandler = new BulletHandler({
      scene: this,
      createParticle: this.particleHandler.create
    });
    this.bulletHandler.preload();

    // The Player
    this.player = new Player({
      scene: this,
      state: this.state,
      createBullet: this.bulletHandler.create,
      createParticle: this.particleHandler.create
    });
    this.player.preload();

    // The weapon handler
    this.weaponHandler = new WeaponHandler({
      scene: this,
      player: this.player,
      state: this.state
    });
    this.weaponHandler.preload();

    // The enemy handler
    this.enemyHandler = new EnemyHandler({
      scene: this,
      state: this.state,
      player: this.player,
      bullets: this.bulletHandler.bullets,
      createParticle: this.particleHandler.create
    });
    this.enemyHandler.preload();

    // The ground
    this.ground = new Ground({
      scene: this,
      player: this.player,
      enemies: this.enemyHandler.enemies,
      weapons: this.weaponHandler.weapons,
      particles: this.particleHandler.particles
    });
    this.ground.preload();

    // The interface
    this.interface = new Interface({
      scene: this,
      state: this.state,
      player: this.player
    });
    this.interface.preload();

    // Add some more stuff into the particlehandler
    this.particleHandler.player = this.player;
    this.particleHandler.enemies = this.enemyHandler.enemies;
  }
  create() {
    this.background.create();
    this.player.create();
    this.ground.create();
    this.interface.create();

    // Create a pistol at the start of the round
    var sceneWidth = this.sys.canvas.width;
    var sceneHeight = this.sys.canvas.height;
    this.weaponHandler.create('ak', sceneWidth * 0.66, sceneHeight * 0.5);
  }
  update() {
    this.player.update();
    this.weaponHandler.update();
    this.bulletHandler.update();
    this.particleHandler.update();
    this.enemyHandler.update();
    this.ground.update(this.player, this.weaponHandler.weapons);
    this.interface.update();

    // Updating the playstate
    PlayState({
      scene: this,
      state: this.state,
      player: this.player,
      weaponHandler: this.weaponHandler
    });
  }
}
