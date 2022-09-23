const { GAME_STATE } = require("../constants");

function getGameStateFromMatch(match) {
  const { scoreboard } = match || {};

  if (!scoreboard) {
    return GAME_STATE.WAIT_IN_LOBBY;
  }

  const { duration } = scoreboard;

  if (duration === 0) {
    return GAME_STATE.BAN_PICK_PHASE;
  }

  return GAME_STATE.IN_GAME;
}

module.exports = {
  getGameStateFromMatch,
};
