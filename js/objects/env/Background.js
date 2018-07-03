export default class Background {
  constructor(scene) {
    this.scene = scene;
    this.images = [
      {
        name: 'sky',
        file: 'sky.png'
      },
      {
        name: 'cloudsbg',
        file: 'clouds_BG.png'
      },
      {
        name: 'mountains',
        file: 'mountains.png'
      },
      {
        name: 'cloudsmg3',
        file: 'clouds_MG_3.png'
      },
      {
        name: 'cloudsmg2',
        file: 'clouds_MG_2.png'
      },
      {
        name: 'cloudsmg1',
        file: 'clouds_MG_1.png'
      }
    ];
  }

  preload() {
    var scene = this.scene;
    for (var i = 0; i < this.images.length; i++) {
      var name = this.images[i].name;
      var file = this.images[i].file;
      scene.load.image(name, `/images/env/background/${file}`);
    }
  }

  create() {
    var scene = this.scene;
    var sceneWidth = scene.sys.canvas.width;
    var sceneHeight = scene.sys.canvas.height;

    for (var i = 0; i < this.images.length; i++) {
      var name = this.images[i].name;
      this.images[i].image = scene.add.image(
        sceneWidth / 2,
        sceneHeight / 2,
        name
      );
      this.images[i].image.setDisplaySize(sceneWidth, sceneHeight);
    }
  }
}
