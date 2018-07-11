import GageLib from 'gages-library';
import Pig from '../objects/enemies/Pig';
import Skeleton from '../objects/enemies/Skeleton';
import FlamingSkeleton from '../objects/enemies/FlamingSkeleton';

var PUSHBACK = 0.2;
var WEAPON_CHANCE = 10;

export default class EnemyHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;
    this.player = options.player;
    this.bullets = options.bullets;
    this.createWeapon = options.createWeapon;
    this.createParticle = options.createParticle;

    // All enemy instances
    this.enemies = [];

    // Binding public functions
    this.create = this.create.bind(this);
  }

  /* ** Public Functions ** */
  preload() {
    // All enemy types
    this.enemyData = [
      {
        name: 'pig',
        fileName: 'pig',
        class: Pig,
        spawnWeight: 10
      },
      {
        name: 'skeleton',
        fileName: 'skeleton',
        class: Skeleton,
        spawnWeight: 5
      },
      {
        name: 'flaming-skeleton',
        fileName: 'flaming-skeleton',
        class: FlamingSkeleton,
        spawnWeight: 2.75
      }
    ];

    // Store the total amount of spawnWeight (how likely)
    // the enemy type is to spawn.
    this.totalSpawnWeight = 0;
    for (var i = 0; i < this.enemyData.length; i++) {
      this.totalSpawnWeight += this.enemyData[i].spawnWeight;
    }

    // Load the spritesheets
    this.scene.load.spritesheet('pig', `images/enemies/pig.png`, {
      frameWidth: 19,
      frameHeight: 20
    });
    this.scene.load.spritesheet('skeleton', `images/enemies/skeleton.png`, {
      frameWidth: 19,
      frameHeight: 20
    });
    this.scene.load.spritesheet(
      'flaming-skeleton',
      `images/enemies/flaming-skeleton.png`,
      {
        frameWidth: 19,
        frameHeight: 20
      }
    );
  }
  update() {
    this.updateEnemies();
  }

  // Creating an enemy
  create(x, y, type) {
    var enemyData;
    if (type == null) {
      enemyData = this.enemyData[
        Math.floor(GageLib.math.getRandom(0, this.enemyData.length - 1))
      ];
    } else {
      enemyData = this.getEnemyObj(type);
    }

    // Flash over the enemy
    this.createParticle(x, y, 'spawn-flash');

    // Add to the list of enemy instances
    this.enemies.push(
      new enemyData.class({
        x: x,
        y: y,
        scene: this.scene,
        data: enemyData,
        player: this.player,
        enemies: this.enemies,
        createParticle: this.createParticle
      })
    );
  }

  /* ** Private Functions ** */
  // Get an enemy data object by it's name
  getEnemyObj(name) {
    for (var i = 0; i < this.enemyData.length; i++) {
      var enemy = this.enemyData[i];

      if (enemy.name == name) {
        return enemy;
      }
    }
  }

  // Update all of the enemy instances
  updateEnemies() {
    for (var i = 0; i < this.enemies.length; i++) {
      var enemy = this.enemies[i];

      // Enemy instances update function
      enemy.update();

      // Collision with bullets
      this.getHit(enemy, this.bullets);

      // Collision with player
      this.hitPlayer(enemy);

      // Removing the enemy
      if (enemy.delete) {
        var weaponRoll = GageLib.math.getRandom(0, 100);

        // Destroy the sprite
        enemy.sprite.destroy();

        // Creating weapons
        if (weaponRoll <= WEAPON_CHANCE) {
          this.createWeapon(null, enemy.sprite.x, enemy.sprite.y);
        }

        // Remove from list of enemies
        this.enemies.splice(i, 1);
      }
    }
  }

  // Getting hit by a bullet
  getHit(enemy, bullets) {
    for (var i = 0; i < bullets.length; i++) {
      var bullet = bullets[i];
      var bulletPos = bullet.getPos();
      var bulletDim = bullet.getDim();
      var enemyPos = enemy.getPos();
      var enemyDim = enemy.getDim();

      if (
        bulletPos.x + bulletDim.width / 2 > enemyPos.x - enemyDim.width / 2 &&
        bulletPos.x - bulletDim.width / 2 < enemyPos.x + enemyDim.width / 2 &&
        bulletPos.y + bulletDim.height / 2 > enemyPos.y - enemyDim.height / 2 &&
        bulletPos.y - bulletDim.height / 2 < enemyPos.y + enemyDim.height / 2
      ) {
        enemy.getHit(bullet);
      }
    }
  }

  // Hitting the player
  hitPlayer(enemy) {
    if (this.state.current !== 'dead') {
      var playerPos = this.player.getPos();
      var playerDim = this.player.getDim();
      var enemyPos = enemy.getPos();
      var enemyDim = enemy.getDim();

      if (
        playerPos.x + playerDim.width / 2 > enemyPos.x - enemyDim.width / 2 &&
        playerPos.x - playerDim.width / 2 < enemyPos.x + enemyDim.width / 2 &&
        playerPos.y + playerDim.height / 2 > enemyPos.y - enemyDim.height / 2 &&
        playerPos.y - playerDim.height / 2 < enemyPos.y + enemyDim.height / 2
      ) {
        // On hit event function
        if (enemy.onHit) {
          enemy.onHit();
        }

        // Only damage the player if it has not been
        // explicitely stated not to.
        if (!enemy.disableHit) {
          this.player.getHit(enemy);
        }
      }
    }
  }
}
