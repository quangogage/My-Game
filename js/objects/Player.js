export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.width = 48;
    this.height = 50;
  }

  preload() {
    var scene = this.scene;

    scene.load.spritesheet('player', 'images/player/spritesheet.png', {
      frameWidth: 19,
      frameHeight: 19
    });
  }
  create() {
    var scene = this.scene;
    this.sprite = scene.add.sprite(200, 200, 'player');
    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.sprite.setDisplaySize(this.width, this.height);
  }
  update() {
    var scene = this.scene;
  }
}
