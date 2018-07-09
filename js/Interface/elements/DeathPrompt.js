var FADE_DELAY = 25;
var FADE_SPEED = 0.075;

export default class DeathPrompt {
  constructor(options) {
    // Store values
    this.scene = options.scene;
    this.state = options.state;

    // Delaying the fade in of the prompt.
    this.delayTimer = 0;
  }

  /* ** Public Functions ** */
  preload() {
    this.scene.load.image(
      'death-overlay',
      'images/interface/death-overlay.png'
    );
  }
  create() {
    var scene = this.scene;
    var sceneWidth = scene.sys.canvas.width;
    var sceneHeight = scene.sys.canvas.height;

    // Create / scale / position / z-order the overlay
    this.overlay = scene.add.image(
      sceneWidth / 2,
      sceneHeight / 2,
      'death-overlay'
    );
    this.overlay.setDisplaySize(sceneWidth, sceneHeight);
    this.overlay.setDepth(5000);
    this.overlayAlpha = 0;

    // Create the text
    this.text = scene.add.text(sceneWidth / 2, sceneHeight / 2, 'Game Over', {
      fontSize: '45px',
      fill: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 6
    });
    this.text.setOrigin(0.5);
    this.text.setDepth(5001);
    this.textAlpha = 0;

    // Create the sub text
    this.subText = scene.add.text(
      sceneWidth / 2,
      sceneHeight / 2 + 50,
      'Press Space to Retry!',
      {
        fontSize: '27px',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 4
      }
    );
    this.subText.setOrigin(0.5);
    this.subText.setDepth(5001);
    this.subText.alpha = 1.5;
    this.subTextAlphaTimer = 0;
    this.subTextAlpha = 0;
  }
  update() {
    // Update overlay alpha
    this.overlay.alpha = this.overlayAlpha;

    // Update text alpha
    this.text.alpha = this.textAlpha;

    // Animate sub-text alpha
    this.subTextAlphaTimer += 0.2;
    this.subText.alpha =
      this.subTextAlpha - Math.abs(Math.sin(this.subTextAlphaTimer) * 0.8);

    // Hiding / revealing everything
    if (this.state.current !== 'dead') {
      this.overlayAlpha = 0;
      this.textAlpha = 0;
      this.subTextAlpha = 0;
      this.delayTimer = 0;
    } else {
      this.delayTimer++;

      if (this.delayTimer >= FADE_DELAY) {
        if (this.overlayAlpha < 1) {
          this.overlayAlpha += FADE_SPEED;
        }
        if (this.textAlpha < 1) {
          this.textAlpha += FADE_SPEED;
        }
        if (this.subTextAlpha < 1) {
          this.subTextAlpha += FADE_SPEED;
        }
      }
    }
  }
}
