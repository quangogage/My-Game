import GageLib from 'gages-library';

export default class Ground {
  constructor(options) {
    this.scene = options.scene;
    this.enemies = options.enemies;
    this.player = options.player;
    this.hearts = options.hearts;
    this.weapons = options.weapons;
    this.bullets = options.bullets;
    this.tileCount = options.tileCount;
    this.particles = options.particles;
    this.totalHeight = 3;
    this.tileWidth = options.tileWidth;
    this.tileHeight = options.tileHeight;
  }

  preload() {
    var scene = this.scene;

    // Calculate the position of the ground
    var sceneHeight = scene.sys.canvas.height;
    this.groundY =
      sceneHeight -
      (this.totalHeight - 1) * this.tileHeight -
      this.tileHeight / 2;
  }
  create() {
    var scene = this.scene;
    var sceneWidth = scene.sys.canvas.width;
    var sceneHeight = scene.sys.canvas.height;
    var columnCount = Math.ceil(sceneWidth / this.tileWidth) + 1;

    // Create the tile grid
    for (var row = 0; row < this.totalHeight; row++) {
      for (var column = 0; column < columnCount; column++) {
        // What tile image will it be?
        var tileNumber = Math.floor(GageLib.math.getRandom(1, this.tileCount));

        // Calculate the image's position
        var x = column * this.tileWidth;
        var y =
          sceneHeight -
          (this.totalHeight - 1) * this.tileHeight +
          row * this.tileHeight;

        // Create the image
        var image = scene.add.image(x, y, `tile${tileNumber}`);

        // Size the image
        image.setDisplaySize(this.tileWidth, this.tileHeight);
      }
    }
  }
  update() {
    var player = this.player;
    var hearts = this.hearts;
    var weapons = this.weapons;
    var enemies = this.enemies;
    var bullets = this.bullets;
    var particles = this.particles;

    // Handling the player landing on the ground.
    var pos = player.getPos();
    var dim = player.getDim();
    if (pos.y + dim.height / 2 > this.groundY) {
      player.setPos(null, this.groundY - dim.height / 2);
      player.yvel = 0;
      player.grounded = true;
    }

    // Handling weapons landing on the ground.
    for (var i = 0; i < weapons.length; i++) {
      var weapon = weapons[i];
      var pos = weapon.getPos();
      var dim = weapon.getDim();
      if (pos.y + dim.height / 2 > this.groundY) {
        pos.y = this.groundY - dim.height / 2;
        weapon.yvel = 0;
      }
    }

    // Handling enemies landing on the ground
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      var pos = enemy.getPos();
      var dim = enemy.getDim();
      if (pos.y + dim.height / 2 > this.groundY) {
        pos.y = this.groundY - dim.height / 2;
        enemy.yvel = 0;
      }
    }

    // Handling particles landing on the ground
    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      var particlePos = particle.getPos();
      var particleDim = particle.getDim();

      if (particlePos.y + particleDim.height / 2 > this.groundY) {
        particlePos.y = this.groundY - particleDim.height / 2;
        if (particle.yvel) {
          particle.yvel = 0;
        }
        particle.grounded = true;
      }
    }

    // Removing bullets when they hit the ground
    for (var i = 0; i < bullets.length; i++) {
      var bullet = bullets[i];
      var bulletPos = bullet.getPos();
      if (bulletPos.y >= this.groundY) {
        bullet.delete = true;
      }
    }

    // Handling hearts landing on the ground
    for (var i = 0; i < hearts.length; i++) {
      var heart = hearts[i];
      var heartPos = heart.getPos();
      var heartDim = heart.getDim();

      if (heartPos.y + heartDim.height / 2 >= this.groundY) {
        heart.setPos(null, this.groundY - heartDim.height / 2);
        heart.yvel = 0;
        heart.grounded = true;
      }
    }
  }
}
