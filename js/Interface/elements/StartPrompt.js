export default class StartPrompt {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;

    // Scaling tween
    this.scaleTimer = 0;
  }

  /* ** Public Functions ** */
  create() {
    var scene = this.scene;
    var sceneWidth = this.scene.sys.canvas.width;
    var sceneHeight = this.scene.sys.canvas.height;

    // Create the text
    this.text = scene.add.text(
      sceneWidth / 2,
      sceneHeight / 2,
      'Pickup The Gun!',
      {
        fontSize: '35px',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 6
      }
    );

    // Center it
    this.text.setOrigin(0.5);
  }
  update() {
    // Scale animation
    this.scaleTimer += 0.1;
    this.text.setScale(1 + Math.sin(this.scaleTimer) * 0.2);

    // Remove when state changes
    if (this.state.current !== 'start') {
      this.text.visible = false;
    }
  }
}
