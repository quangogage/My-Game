export default function PlayState(options) {
  var state = options.state;
  var weaponHandler = options.weaponHandler;
  var player = options.player;

  // Run a timer for some basic utility:
  // Letting things spawn, update, etc.
  options.state.timer++;

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
    state.current = 'dead';
  }
}
