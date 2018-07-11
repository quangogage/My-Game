var BURST_DELAY = 75;

export default class ShootHelper {
  constructor(player) {
    // Store player reference
    this.player = player;

    // Timing
    this.fireTimer = 0;

    // Different shooting types
    this.fireModes = [];
    this.fireModes['auto'] = this.auto.bind(this);
    this.fireModes['burst'] = this.burst.bind(this);

    // Binding public functions
    this.update = this.update.bind(this);
  }

  /* ** Public Functions ** */
  update() {
    var player = this.player;
    if (player.equipped && player.state.current == 'playing') {
      var weaponData = player.equipped;
      var fireMode = weaponData.fireMode || 'auto';
      this.fireModes[fireMode]();
    }
  }

  /* ** Private Functions ** */
  // Automatic firing
  auto() {
    var player = this.player;
    var firerate = player.equipped.fireRate;

    // Run the firing timer
    this.fireTimer++;

    if (this.fireTimer >= firerate && player.spacebar.isDown) {
      // Shoot the bullet
      this.shoot();

      // Reset the shooting timer
      this.fireTimer = 0;
    }
  }

  // Burst firing
  burst() {
    var player = this.player;
    var firerate = player.equipped.fireRate;

    // Run the firing timer
    this.fireTimer++;

    if (this.fireTimer >= firerate && player.spacebar.isDown) {
      // Create a bullet asap
      this.shoot();

      // Create two more after a day
      var createTimeout = function(_self, i) {
        setTimeout(function() {
          _self.shoot();
        }, BURST_DELAY * (i + 1));
      };
      for (var i = 0; i < 2; i++) {
        createTimeout(this, i);
      }

      // Reset the firing timer
      this.fireTimer = 0;
    }
  }

  // Shooting a bullet
  shoot() {
    var player = this.player;
    var damage = player.equipped.damage;
    var kickback = player.equipped.kickback || 5;
    var dir = player.sprite.flipX == false ? 0 : Math.PI;
    var type = player.equipped.type;

    // Calculate the position of the end of the gun
    var x = player.equipped.image.x;
    var y = player.equipped.image.y - player.equipped.image.height;

    // Create the bullet
    player.createBullet(x, y, dir, type, damage);

    // Kickback the gun
    player.equipped.kick = player.weaponKick;

    // Kick the player back
    player.xvel += Math.cos(dir + Math.PI) * kickback;
    player.yvel += Math.sin(dir + Math.PI) * kickback - kickback * 0.25;
  }
}
