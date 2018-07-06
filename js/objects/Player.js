var SPEED = 1;
var FRICTION = 0.785;
var GRAVITY = 0.4;
var JUMP_HEIGHT = 8.5;

export default class Player {
  constructor(options) {
    // Store references
    this.scene = options.scene;
    this.createBullet = options.createBullet;
    this.createParticle = options.createParticle;

    // Dimensions
    this.width = 48;
    this.height = 50;

    // Movement
    this.xvel = 0;
    this.yvel = 0;
    this.speed = SPEED;
    this.friction = FRICTION;

    // Shooting
    this.shoot = {
      timer: 0
    };

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
  }
  update() {
    var scene = this.scene;
    this.physics();
    this.move();
    this.boundary();
    this.jump();
    this.attachGun();
    this.shootGun();
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
    if (this.cursors.right.isDown) {
      // Look right
      this.sprite.flipX = false;

      // Run
      this.sprite.anims.play('run', true);

      // Move right
      this.xvel += this.speed;
    } else if (this.cursors.left.isDown) {
      // Look left
      this.sprite.flipX = true;

      // Run
      this.sprite.anims.play('run', true);

      // Move left
      this.xvel -= this.speed;
    } else {
      this.sprite.anims.play('idle', true);
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

  // Equipping a weapon
  equip(weapon) {
    console.log(weapon);
    // Store the weapons info
    this.equipped = {
      x: weapon.x || 0,
      y: weapon.y || 0,
      name: weapon.name,
      width: weapon.width,
      height: weapon.height,
      type: weapon.bulletType,
      fireRate: weapon.fireRate || 5
    };

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

  // Shooting
  shootGun() {
    // Only shoot if you have a gun
    if (this.equipped) {
      var fireRate = this.equipped.fireRate;
      var kickback = this.equipped.kickback || 5;

      // Check if you are trying to/able to shoot
      if (this.shoot.timer >= fireRate && this.spacebar.isDown) {
        var dir = this.sprite.flipX == false ? 0 : Math.PI;
        var type = this.equipped.type;

        // Calculate the position of the end of the gun
        var x = this.equipped.image.x;
        var y = this.equipped.image.y - this.equipped.image.height;

        // Create the bullet
        this.createBullet(x, y, dir, type);

        // Kick the player back
        this.xvel += Math.cos(dir + Math.PI) * kickback;
        this.yvel += Math.sin(dir + Math.PI) * kickback - kickback * 0.25;

        // Reset the shooting timer
        this.shoot.timer = 0;
      }

      // Run a timer to compare with your current guns firerate
      this.shoot.timer++;
    }
  }
}
