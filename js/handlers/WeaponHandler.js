export default class WeaponHandler {
  constructor(scene) {
    // Store references
    this.scene = scene;
  }

  /* ** Public Functions ** */
  preload() {
    // Store the gun objects
    this.weaponData = [
      {
        name: 'pistol',
        imageFile: 'pistol'
      }
    ];

    // Load the gun images
    for (var i = 0; i < this.weaponData.length; i++) {
      var gunName = this.weaponData[i].name;
      this.scene.load.image(gunName, `images/guns/${gunName}.png`);
    }
  }
  update() {}

  // Create a weapon
  create(name) {
    var weapon;

    // Get the weapon data
    if (name) {
      weapon = this.getWeaponByName(name);
    } else {
      var weaponIndex = Math.floor(
        GageLib.math.getRandom(0, this.weaponData.length)
      );
      weapon = this.weaponData[weaponIndex];
    }
  }

  /* ** Private Functions ** */
  getWeaponByName(name) {
    for (var i = 0; i < this.weaponData.length; i++) {
      if (this.weaponData[i].name == name) {
        return this.weaponData[i];
      }
    }
  }
}
