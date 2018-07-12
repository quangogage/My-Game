import Weapon from '../objects/Weapon';
import GageLib from 'gages-library';

export default class WeaponHandler {
  constructor(options) {
    // Store references
    this.scene = options.scene;
    this.player = options.player;
    this.state = options.state;
    this.createWeapon = options.createWeapon;

    // Store all of the created weapons
    this.weapons = [];

    // Binding public functions
    this.create = this.create.bind(this);
  }

  /* ** Public Functions ** */
  preload() {
    // Store the gun objects
    this.weaponData = [
      {
        name: 'pistol',
        imageFile: 'pistol',
        bulletType: 'basic',
        width: 27,
        height: 18,
        x: 14,
        y: 18,
        fireRate: 20,
        kickback: 2.5,
        damage: 0.75,
        accuracy: 80
      },
      {
        name: 'ak',
        imageFile: 'ak',
        bulletType: 'basic',
        width: 46,
        height: 18,
        x: 8,
        y: 16,
        fireRate: 8,
        kickback: 0.25,
        damage: 0.5,
        accuracy: 50
      },
      {
        name: 'uzi',
        imageFile: 'uzi',
        bulletType: 'basic',
        width: 40,
        height: 18,
        x: 10,
        y: 17.5,
        fireRate: 32,
        kickback: 0.25,
        damage: 0.7,
        fireMode: 'burst',
        accuracy: 80
      },
      {
        name: 'shotgun',
        imageFile: 'shotgun',
        bulletType: 'basic',
        width: 40,
        height: 17,
        x: 10,
        y: 17.5,
        fireRate: 36,
        kickback: 0.5,
        damage: 1,
        fireMode: 'shotgun',
        accuracy: 95
      }
    ];

    // Load the gun images
    for (var i = 0; i < this.weaponData.length; i++) {
      var gunName = this.weaponData[i].name;
      this.scene.load.image(gunName, `images/guns/${gunName}.png`);
    }

    // Load the down arrow image
    this.scene.load.image(
      'down-arrow',
      'images/interface/keyboard/white-down.png'
    );

    // Picking up weapons
    this.scene.input.keyboard.on(
      'keydown_DOWN',
      function() {
        this.pickup();
      }.bind(this)
    );
  }
  update() {
    // Update all of the weapons
    this.updateWeapons();
  }

  // Create a weapon
  create(name, x, y) {
    var weaponData;

    // Get the weapon data
    if (name) {
      weaponData = this.getWeaponByName(name);
    } else {
      var weaponIndex = Math.floor(
        GageLib.math.getRandom(0, this.weaponData.length - 1)
      );
      weaponData = this.weaponData[weaponIndex];
    }

    // Create the weapon and store it
    this.weapons.push(
      new Weapon({
        x: x,
        y: y,
        scene: this.scene,
        data: weaponData,
        state: this.state,
        player: this.player
      })
    );
  }

  /* ** Private Functions ** */

  // Return a weaponData object based on it's name
  getWeaponByName(name) {
    for (var i = 0; i < this.weaponData.length; i++) {
      if (this.weaponData[i].name == name) {
        return this.weaponData[i];
      }
    }
  }

  // Update all of the weapons
  updateWeapons() {
    for (var i = 0; i < this.weapons.length; i++) {
      // Trigger their update function
      this.weapons[i].update();

      // Removing it
      if (this.weapons[i].delete) {
        this.weapons[i].sprite.destroy();
        this.weapons[i].arrow.destroy();
        this.weapons.splice(i, 1);
      }
    }
  }

  // Check if the player can/picking up a weapon
  pickup() {
    var player = this.player;
    var playerPos = player.getPos();
    var playerDim = player.getDim();
    var playerX = playerPos.x,
      playerY = playerPos.y;
    var playerWidth = playerDim.width,
      playerHeight = playerDim.height;

    // Iterate through all of the weapons
    for (var i = 0; i < this.weapons.length; i++) {
      var weapon = this.weapons[i];
      var weaponPos = weapon.getPos();
      var weaponDim = weapon.getDim();
      var weaponX = weaponPos.x,
        weaponY = weaponPos.y;
      var weaponWidth = weaponDim.width,
        weaponHeight = weaponDim.height;

      // Check if the weapon/player are overlapping
      if (
        playerX + playerWidth / 2 > weaponX - weaponWidth / 2 &&
        playerX - playerWidth / 2 < weaponX + weaponWidth / 2 &&
        playerY + playerHeight / 2 > weaponY - weaponHeight / 2 &&
        playerY - playerHeight / 2 < weaponY + weaponHeight / 2
      ) {
        // Picking it up
        player.equip(weapon.data, weapon);
      }
    }
  }
}
