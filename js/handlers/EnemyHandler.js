import EnemyGenerator from './EnemyGenerator';
import Pig from '../objects/enemies/Pig';

var PUSHBACK = 0.45;

export default class EnemyHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;
    this.player = options.player;
    this.bullets = options.bullets;
    this.createParticle = options.createParticle;

    // All enemy instances
    this.enemies = [];
  }

  /* ** Public Functions ** */
  preload() {
    // All enemy types
    this.enemyData = [
      {
        name: 'pig',
        fileName: 'pig',
        class: Pig
      }
    ];

    // Load the spritesheets
    this.scene.load.spritesheet('pig', `images/enemies/pig.png`, {
      frameWidth: 19,
      frameHeight: 20
    });

    // The enemy generator class
    this.enemyGenerator = new EnemyGenerator({
      createEnemy: this.create.bind(this),
      state: this.state,
      enemyData: this.enemyData,
      scene: this.scene,
      enemies: this.enemies
    });
  }
  update() {
    this.updateEnemies();
    this.enemyGenerator.update();
  }

  // Creating an enemy
  create(x, y, type) {
    var enemyData = this.getEnemyObj(type);

    // Add to the list of enemy instances
    this.enemies.push(
      new enemyData.class({
        x: x,
        y: y,
        scene: this.scene,
        data: enemyData,
        player: this.player,
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

      // Pushing enemies away from each other
      this.pushBack(enemy, i);

      // Removing the enemy
      if (enemy.delete) {
        enemy.sprite.destroy();
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
        this.player.getHit(enemy);
      }
    }
  }

  // Pushing enemies away from each other
  pushBack(enemy, index) {
    for (var ia = 0; ia < this.enemies.length; ia++) {
      var enemy2 = this.enemies[ia];

      // If they aren't the same enemy
      if (ia !== index) {
        var enemyPos = enemy.getPos();
        var enemyDim = enemy.getDim();
        var enemy2Pos = enemy2.getPos();
        var enemy2Dim = enemy2.getDim();
        if (
          enemyPos.x + enemyDim.width / 2 > enemy2Pos.x - enemy2Dim.width / 2 &&
          enemyPos.x - enemyDim.width / 2 < enemy2Pos.x + enemy2Dim.width / 2 &&
          enemyPos.y + enemyDim.height / 2 >
            enemy2Pos.y - enemy2Dim.height / 2 &&
          enemyPos.y - enemyDim.height / 2 < enemy2Pos.y + enemy2Dim.height / 2
        ) {
          if (enemy2Pos.x > enemyPos.x) {
            enemy2.xvel += PUSHBACK;
          } else {
            enemy2.xvel -= PUSHBACK;
          }
        }
      }
    }
  }
}
