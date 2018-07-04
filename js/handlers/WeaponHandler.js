import Weapon from '../objects/Weapon';
import GageLib from 'gages-library';

export default class WeaponHandler {
  constructor(scene, player) {
    // Store references
    this.scene = scene;
    this.player = player;

    // Store all of the created weapons
    this.weapons = [];

    // Controls
    this.key = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  /* ** Public Functions ** */
  preload() {
    // Store the gun objects
    this.weaponData = [
      {
        name: 'pistol',
        imageFile: 'pistol',
        width: 27,
        height: 18,
        x: 14,
        y: 20
      }
    ];

    // Load the gun images
    for (var i = 0; i < this.weaponData.length; i++) {
      var gunName = this.weaponData[i].name;
      this.scene.load.image(gunName, `images/guns/${gunName}.png`);
    }

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
        GageLib.math.getRandom(0, this.weaponData.length)
      );
      weaponData = this.weaponData[weaponIndex];
    }

    // Create the weapon and store it
    this.weapons.push(
      new Weapon({
        x: x,
        y: y,
        scene: this.scene,
        data: weaponData
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
        console.log(this.scene);
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
        player.equip(weapon.data);

        // Remove the weapon object
        weapon.delete = true;
      }
    }
  }
}
