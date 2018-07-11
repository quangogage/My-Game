import Platform from '../objects/Platform';

export default class PlatformHandler {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.player = options.player;
    this.enemies = options.enemies;
    this.particles = options.particles;
    this.tileCount = options.tileCount;
    this.tileWidth = options.tileWidth;
    this.tileHeight = options.tileHeight;
    this.createTile = options.createTile;

    // Dimensions
    this.width = options.width;
    this.height = options.height;

    // All platforms
    this.platforms = [];

    // Binding public functions
    this.create = this.create.bind(this);
  }

  /* ** Public Functions ** */
  update() {
    this.handleCollision();
  }
  create(x, y, width, height) {
    this.platforms.push(
      new Platform({
        x: x,
        y: y,
        width: width,
        height: height,
        scene: this.scene,
        tileCount: this.tileCount,
        tileWidth: this.tileWidth,
        tileHeight: this.tileHeight,
        createTile: this.createTile
      })
    );
  }

  /* ** Private Functions ** */
  handleCollision() {
    // Player data
    var player = this.player;
    var playerPos = player.getPos();
    var playerDim = player.getDim();

    // Iterate through all of the platforms
    for (var i = 0; i < this.platforms.length; i++) {
      var platform = this.platforms[i];

      // Player
      if (
        playerPos.x + playerDim.width / 2 > platform.x &&
        playerPos.x - playerDim.width / 2 < platform.x + platform.pixelWidth &&
        playerPos.y + playerDim.height / 2 > platform.y &&
        playerPos.y - playerDim.height / 2 < platform.y + platform.pixelHeight
      ) {
        var extra = 5;

        if (
          playerPos.x + playerDim.width / 2 > platform.x + extra &&
          playerPos.x - playerDim.width / 2 <
            platform.x + platform.pixelWidth - extra
        ) {
          if (playerPos.y < platform.y + platform.pixelHeight / 2) {
            player.setPos(null, platform.y - playerDim.height / 2);
            player.yvel = 0;
            player.grounded = true;
          }
          if (playerPos.y > platform.y + platform.pixelHeight / 2) {
            player.setPos(
              null,
              platform.y + platform.pixelHeight + playerDim.height / 2 + 1
            );
            player.yvel *= -0.1;
          }
        } else {
          if (playerPos.x < platform.x + platform.pixelWidth / 2) {
            player.setPos(platform.x - playerDim.width / 2, null);
            player.xvel = 0;
          }
          if (playerPos.x > platform.x + platform.pixelWidth / 2) {
            player.setPos(
              platform.x + platform.pixelWidth + playerDim.width / 2,
              null
            );
            player.xvel = 0;
          }
        }
      }

      // Enemies
      for (var ia = 0; ia < this.enemies.length; ia++) {
        var enemy = this.enemies[ia];
        var enemyPos = enemy.getPos();
        var enemyDim = enemy.getDim();

        if (
          enemyPos.x + enemyDim.width / 2 > platform.x &&
          enemyPos.x - enemyDim.width / 2 < platform.x + platform.pixelWidth &&
          enemyPos.y + enemyDim.height / 2 > platform.y &&
          enemyPos.y - enemyDim.height / 2 < platform.y + platform.pixelHeight
        ) {
          var extra = 5;

          if (
            enemyPos.x + enemyDim.width / 2 > platform.x + extra &&
            enemyPos.x - enemyDim.width / 2 <
              platform.x + platform.pixelWidth - extra
          ) {
            if (enemyPos.y < platform.y + platform.pixelHeight / 2) {
              enemy.setPos(null, platform.y - enemyDim.height / 2);
              enemy.yvel = 0;
              enemy.grounded = true;
            }
            if (enemyPos.y > platform.y + platform.pixelHeight / 2) {
              enemy.setPos(
                null,
                platform.y + platform.pixelHeight + enemyDim.height / 2 + 1
              );
              enemy.yvel *= -0.1;
            }
          } else {
            if (enemyPos.x < platform.x + platform.pixelWidth / 2) {
              enemy.setPos(platform.x - enemyDim.width / 2, null);
              enemy.dir = -1;
              enemy.xvel *= -1;
            }
            if (enemyPos.x > platform.x + platform.pixelWidth / 2) {
              enemy.setPos(
                platform.x + platform.pixelWidth + enemyDim.width / 2,
                null
              );
              enemy.dir = 1;
              enemy.xvel *= -1;
            }
          }
        }
      }

      // Particles
      for (var ia = 0; ia < this.particles.length; ia++) {
        var particle = this.particles[ia];
        var particlePos = particle.getPos();
        var particleDim = particle.getDim();

        if (
          particlePos.x + particleDim.width / 2 > platform.x &&
          particlePos.x - particleDim.width / 2 <
            platform.x + platform.pixelWidth &&
          particlePos.y + particleDim.height / 2 > platform.y &&
          particlePos.y - particleDim.height / 2 <
            platform.y + platform.pixelHeight &&
          particle.collision
        ) {
          var extra = 5;

          if (
            particlePos.x + particleDim.width / 2 > platform.x + extra &&
            particlePos.x - particleDim.width / 2 <
              platform.x + platform.pixelWidth - extra
          ) {
            if (particlePos.y < platform.y + platform.pixelHeight / 2) {
              particle.setPos(null, platform.y - particleDim.height / 2);
              particle.yvel = 0;
              particle.grounded = true;
            }
            if (particlePos.y > platform.y + platform.pixelHeight / 2) {
              particle.setPos(
                null,
                platform.y + platform.pixelHeight + particleDim.height / 2 + 1
              );
              particle.yvel *= -0.1;
            }
          } else {
            if (particlePos.x < platform.x + platform.pixelWidth / 2) {
              particle.setPos(platform.x - particleDim.width / 2, null);
              particle.dir = -1;
              particle.xvel = 0;
            }
            if (particlePos.x > platform.x + platform.pixelWidth / 2) {
              particle.setPos(
                platform.x + platform.pixelWidth + particleDim.width / 2,
                null
              );
              particle.dir = 1;
              particle.xvel = 0;
            }
          }
        }
      }
    }
  }
}
