import GageLib from 'gages-library';
import ParticleClass from './ParticleClass';

var SIZE = [250, 250];
var FRAMERATE = 15;

export default class Explosion extends ParticleClass {
  constructor(options) {
    super(options);

    // Dimensions
    this.size = GageLib.math.getRandom(SIZE[0], SIZE[1]);
    this.width = this.size;
    this.height = this.size;

    // Knocking back the player/enemies
    this.knockback = 35;
    this.damage = 2;

    // Create the spritesheet animation
    this.createAnimation();

    // Create the sprite
    this.createSprite();
  }

  /* ** Public Functions ** */
  update() {
    this.animate();
    this.doDamage();
  }

  // Deleting the assets
  destroyAssets() {
    this.sprite.destroy();
  }

  /* ** Private Functions ** */
  // Create the explosion animation
  createAnimation() {
    this.scene.anims.create({
      key: 'explode',
      frames: this.scene.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 6
      }),
      frameRate: FRAMERATE
    });
  }

  // Create the explosions sprite
  createSprite() {
    this.sprite = this.scene.add.sprite(this.x, this.y, 'explosion');
    this.sprite.setDisplaySize(this.width, this.height);
    this.sprite.on('animationcomplete', this.animComplete.bind(this), this);
  }

  // Run the animation
  animate() {
    this.sprite.anims.play('explode', true);
  }

  // Animation complete
  animComplete() {
    this.delete = true;
  }

  // Damage anything around it
  doDamage() {
    // Player
    var playerPos = this.flags.player.getPos();
    var playerDim = this.flags.player.getDim();
    if (
      playerPos.x + playerDim.width / 2 > this.sprite.x - this.width / 2 &&
      playerPos.x - playerDim.width / 2 < this.sprite.x + this.width / 2 &&
      playerPos.y + playerDim.height / 2 > this.sprite.y - this.height / 2 &&
      playerPos.y - playerDim.height / 2 < this.sprite.y + this.height / 2
    ) {
      this.flags.player.getHit(this);
    }
  }
}
