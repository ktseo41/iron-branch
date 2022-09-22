"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { GAME_STATE } = require("../constants");
const useLiveMatches = require("../hooks/useLiveMatches");

module.exports = ({ selectedMatchId } = {}) => {
  const matches = useLiveMatches({ useInterval: true });
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (!selectedMatchId || !matches.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId
    );

    const { scoreboard } = selectedMatch || {};

    if (!scoreboard) {
      setGameState(GAME_STATE.WAIT_IN_LOBBY);
      return;
    }

    const { duration } = scoreboard || {};

    if (!duration) {
      setGameState(GAME_STATE.BAN_PICK_PHASE);
      return;
    }

    setGameState(GAME_STATE.IN_GAME);
  }, [matches, selectedMatchId]);

  return gameState;
};
