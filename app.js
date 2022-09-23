"use strict";
const React = require("react");
const { useState } = require("react");
const { render, Text, Box } = require("ink");
const useMatches = require("./hooks/useMatches");
const useGameState = require("./hooks/useGameState");
const { GAME_STATE } = require("./constants");
const LiveBanpickPhase = require("import-jsx")("./views/live-banpick-phase.js");
const MatchSelector = require("import-jsx")("./views/match-selector.js");
const LivePlayerNetworth = require("import-jsx")(
  "./views/live-player-networth.js"
);
const Timer = require("import-jsx")("./views/timer.js");

const App = () => {
  const { matches, isFetching } = useMatches();
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const gameState = useGameState({ selectedMatchId });
  const [radiantTeam, setRadiantTeam] = useState(null);
  const [direTeam, setDireTeam] = useState(null);

  function onSelected({ id, radiant_team, dire_team }) {
    setSelectedMatchId(id);
    setRadiantTeam(radiant_team);
    setDireTeam(dire_team);
  }

  return (
    <Box flexDirection="column">
      {!selectedMatchId && !isFetching && matches && (
        <MatchSelector
          matches={matches}
          onSelected={onSelected}
        ></MatchSelector>
      )}
      {selectedMatchId && (
        <Box flexDirection="column">
          <Text>
            <Text>radiant: {radiantTeam}</Text>
            <Text>{"  vs  "}</Text>
            <Text>dire: {direTeam}</Text>
            <Text> </Text>
            {gameState === GAME_STATE.IN_GAME && (
              <Timer selectedMatchId={selectedMatchId}></Timer>
            )}
          </Text>
        </Box>
      )}
      {gameState === GAME_STATE.WAIT_IN_LOBBY && (
        <Text>{GAME_STATE.WAIT_IN_LOBBY}</Text>
      )}
      {gameState === GAME_STATE.BAN_PICK_PHASE && (
        <LiveBanpickPhase selectedMatchId={selectedMatchId}></LiveBanpickPhase>
      )}
      {gameState === GAME_STATE.IN_GAME && (
        <LivePlayerNetworth
          selectedMatchId={selectedMatchId}
        ></LivePlayerNetworth>
      )}
    </Box>
  );
};

render(<App />);
