import Background from '../objects/env/Background';
import WeaponHandler from '../handlers/WeaponHandler';
import Player from '../objects/Player/Player';
import Ground from '../objects/env/Ground';
import BulletHandler from '../handlers/BulletHandler';
import ParticleHandler from '../handlers/ParticleHandler';
import Interface from '../Interface/Interface';
import EnemyHandler from '../handlers/EnemyHandler';
import Tiles from '../loaders/TileLoader';
// Loads all of the handlers/loaders/objects/etc inside of
// the `Play.js`'s preload function to keep things clean.

export default function componentLoader(scene) {
  // The tile loader
  scene.tiles = new Tiles({ scene: scene });
  scene.tiles.preload();

  // The Background
  scene.background = new Background(scene);
  scene.background.preload();

  // The particle handler
  scene.particleHandler = new ParticleHandler({ scene: scene });
  scene.particleHandler.preload();

  // The bullet handler
  scene.bulletHandler = new BulletHandler({
    scene: scene,
    createParticle: scene.particleHandler.create
  });
  scene.bulletHandler.preload();

  // The Player
  scene.player = new Player({
    scene: scene,
    state: scene.state,
    createBullet: scene.bulletHandler.create,
    createParticle: scene.particleHandler.create
  });
  scene.player.preload();

  // The weapon handler
  scene.weaponHandler = new WeaponHandler({
    scene: scene,
    player: scene.player,
    state: scene.state
  });
  scene.weaponHandler.preload();

  // The enemy handler
  scene.enemyHandler = new EnemyHandler({
    scene: scene,
    state: scene.state,
    player: scene.player,
    bullets: scene.bulletHandler.bullets,
    createParticle: scene.particleHandler.create,
    createWeapon: scene.weaponHandler.create
  });
  scene.enemyHandler.preload();

  // The ground
  scene.ground = new Ground({
    scene: scene,
    player: scene.player,
    tileCount: scene.tiles.count,
    enemies: scene.enemyHandler.enemies,
    weapons: scene.weaponHandler.weapons,
    particles: scene.particleHandler.particles
  });
  scene.ground.preload();

  // The Platform handler

  // The interface
  scene.interface = new Interface({
    scene: scene,
    state: scene.state,
    player: scene.player
  });
  scene.interface.preload();

  // Add some more stuff into the particlehandler
  scene.particleHandler.player = scene.player;
  scene.particleHandler.enemies = scene.enemyHandler.enemies;

  // Add some more stuff into the player instance
  scene.player.createWeapon = scene.weaponHandler.create;
}
