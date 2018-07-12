export default function PlayState(options) {
  var state = options.state;
  var weaponHandler = options.weaponHandler;
  var player = options.player;
  var scene = options.scene;

  // Run a timer for some basic utility:
  // Letting things spawn, update, etc.
  options.state.timer++;

  // Special attributes
  state.GOD_MODE = false;

  // Picking up the first weapon at the start
  // of the game.
  if (options.state.timer > 5) {
    if (state.current === 'start') {
      if (weaponHandler.weapons.length === 0) {
        state.current = 'playing';
      }
    }
  }

  // Dying
  if (player.health <= 0) {
    // Go into dead state
    if (state.current !== 'dead') {
      state.current = 'dead';
      state.timer = 0;
    }

    if (state.resetKey.isDown && state.timer > 50) {
      scene.scene.restart();
      scene.current = 'start';
    }
  }
}
