import GageLib from 'gages-library';
import ShootHelper from './ShootHelper';
var SPEED = 1;
var FRICTION = 0.785;
var GRAVITY = 0.4;
var JUMP_HEIGHT = 8.5;
var DAMAGE_FLASH_TIME = 100;
var MAX_HEALTH = 4;

export default class Player {
  constructor(options) {
    // Store references
    this.scene = options.scene;
    this.state = options.state;
    this.createBullet = options.createBullet;
    this.createParticle = options.createParticle;

    // Dimensions
    this.width = 48;
    this.height = 50;

    // Movement
    this.xvel = 0;
    this.yvel = 0;
    this.dir = 'right';
    this.speed = SPEED;
    this.friction = FRICTION;

    // Health
    this.maxHealth = MAX_HEALTH;
    this.health = MAX_HEALTH;

    // Shooting
    this.shootHelper = new ShootHelper(this);

    // Getting hit
    this.hit = {
      timer: 0,
      delay: 10
    };

    // Delay equipping weapons
    this.equipTimer = 0;
    this.equipDelay = 25;

    // Controls
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.spacebar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  /* ** Public Functions ** */
  preload() {
    var scene = this.scene;

    // Load the spritesheet
    scene.load.spritesheet('player', 'images/player/spritesheet.png', {
      frameWidth: 19,
      frameHeight: 18
    });
  }
  create() {
    var scene = this.scene;
    var sceneWidth = this.scene.sys.canvas.width;
    var sceneHeight = this.scene.sys.canvas.height;

    // The Sprite
    this.sprite = scene.add.sprite(
      sceneWidth * 0.33,
      sceneHeight / 2,
      'player'
    );

    // Set the dimensions of the sprite
    this.sprite.setDisplaySize(this.width, this.height);

    // Create the animations of the sprite
    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'jump',
      frames: scene.anims.generateFrameNumbers('player', { start: 3, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'dead',
      frames: scene.anims.generateFrameNumbers('player', { start: 8, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }
  update() {
    var scene = this.scene;
    this.physics();
    this.move();
    this.boundary();
    this.jump();
    this.attachGun();
    this.shootHelper.update();
    this.hit.timer++;
    this.equipTimer++;
  }

  // Get the player's position
  getPos() {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  // Get the dimensions of the player
  getDim() {
    return {
      width: this.width,
      height: this.height
    };
  }

  // Set the player's position
  setPos(x, y) {
    var x = x || this.sprite.x;
    var y = y || this.sprite.y;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  /* ** Private Functions ** */
  // Basic physics
  physics() {
    this.sprite.x += this.xvel;
    this.sprite.y += this.yvel;
    this.xvel *= this.friction;
    this.yvel += GRAVITY;
  }

  // Movement
  move() {
    if (this.state.current !== 'dead') {
      if (this.cursors.right.isDown) {
        // Look right
        this.sprite.flipX = false;

        // Run
        this.sprite.anims.play('run', true);

        // Move right
        this.xvel += this.speed;
        this.dir = 'right';
      } else if (this.cursors.left.isDown) {
        // Look left
        this.sprite.flipX = true;

        // Run
        this.sprite.anims.play('run', true);

        // Move left
        this.xvel -= this.speed;
        this.dir = 'left';
      } else {
        this.sprite.anims.play('idle', true);
      }
    }
  }

  // Staying on the screen
  boundary() {
    var sceneWidth = this.scene.sys.canvas.width;
    if (this.sprite.x - this.width / 2 < 0) {
      this.sprite.x = this.width / 2;
      this.xvel = 0;
    } else if (this.sprite.x + this.width / 2 > sceneWidth) {
      this.sprite.x = sceneWidth - this.width / 2;
      this.xvel = 0;
    }
  }

  // Jumping
  jump() {
    if (this.state.current !== 'dead') {
      // Inacting a jump
      if (this.grounded && this.cursors.up.isDown) {
        this.yvel = -JUMP_HEIGHT;
        this.grounded = false;
      }

      // Running the 'jump' animation
      if (!this.grounded) {
        this.sprite.anims.play('jump', true);
      }
    }
  }

  // Equipping a weapon
  equip(weapon, weaponInstance) {
    if (this.equipTimer >= this.equipDelay) {
      // Remove any previously equipped weapon
      if (this.hasEquippedWeapon) {
        this.equipped.image.destroy();
        this.createWeapon(this.equipped.name, this.sprite.x, this.sprite.y);
      }

      // Store the weapons info
      this.equipped = {
        x: weapon.x || 0,
        y: weapon.y || 0,
        name: weapon.name,
        width: weapon.width,
        damage: weapon.damage,
        height: weapon.height,
        type: weapon.bulletType,
        fireRate: weapon.fireRate || 5,
        fireMode: weapon.fireMode || 'auto'
      };
      this.hasEquippedWeapon = true;

      // Reset the equip-delay timer
      this.equipTimer = 0;

      // Create the image
      this.equipped.image = this.scene.add.image(
        this.sprite.x + this.equipped.x,
        this.sprite.y + this.equipped.y,
        this.equipped.name
      );

      // Size the image
      this.equipped.image.setDisplaySize(
        this.equipped.width,
        this.equipped.height
      );

      // Delete the weapon
      weaponInstance.delete = true;
    }
  }

  // Keep the gun attached to the player
  attachGun() {
    var scaleX = this.sprite.flipX ? -1 : 1;
    if (this.equipped) {
      // Positioning
      this.equipped.image.x = this.sprite.x + this.equipped.x * scaleX;
      this.equipped.image.y = this.sprite.y + this.equipped.y;

      // Flip it as well if the player is flipped
      this.equipped.image.flipX = this.sprite.flipX;
    }
  }

  // Getting hit by an enemy
  getHit(enemy) {
    if (this.hit.timer >= this.hit.delay) {
      var knockback = enemy.knockback || 20;
      var enemyPos = enemy.getPos();
      var damage = enemy.damage || 1;
      var angle =
        Math.atan2(enemyPos.y - this.sprite.y, enemyPos.x - this.sprite.x) +
        Math.PI;

      // Knockback
      this.xvel += Math.cos(angle) * knockback;
      this.sprite.y -= 8;
      this.yvel -= GRAVITY + knockback * 0.25;

      // Flashing red
      this.sprite.tint = 0xff0000;

      // Damage / dying
      this.health -= damage;
      if (this.health <= 0) {
        this.die();
      }

      // Create blood particle
      var bloodCount = GageLib.math.getRandom(2, 4);
      var angle = Math.atan2(
        this.sprite.y - enemyPos.y,
        this.sprite.x - enemyPos.x
      );
      for (var i = 0; i < bloodCount; i++) {
        this.createParticle(
          this.sprite.x + (Math.cos(angle) * this.width) / 2,
          this.sprite.y + (Math.sin(angle) * this.width) / 2,
          'blood',
          { dir: angle }
        );
      }

      // Reset to no tint
      setTimeout(
        function() {
          this.sprite.tint = 0xffffff;
        }.bind(this),
        DAMAGE_FLASH_TIME
      );

      // Reset the hit delay timer
      this.hit.timer = 0;
    }
  }

  // Dying
  die() {
    var isFlipped = this.xvel > 0 ? true : false;

    // Shoot a little farther :)
    this.y -= 5;
    this.friction = 0.95;
    this.yvel = -5;

    // Play Dead
    this.sprite.anims.play('dead');

    // Flip the sprite in the correct direction
    this.sprite.flipX = isFlipped;
  }
}
