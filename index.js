"use strict";
const React = require("react");
const { useState } = require("react");
const { render, Text, Box, Newline } = require("ink");
const useLiveMatches = require("./hooks/useLiveMatches");
const MatchSelector = require("import-jsx")("./views/match-selector.js");
const LivePlayerNetworth = require("import-jsx")(
  "./views/live-player-networth.js"
);

const App = () => {
  const matches = useLiveMatches();
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [radiantTeam, setRadiantTeam] = useState(null);
  const [direTeam, setDireTeam] = useState(null);

  function onSelected({ id, radiant_team, dire_team }) {
    setSelectedMatchId(id);
    setRadiantTeam(radiant_team);
    setDireTeam(dire_team);
  }

  return (
    <Box>
      {!selectedMatchId && (
        <MatchSelector
          matches={matches}
          onSelected={onSelected}
        ></MatchSelector>
      )}
      {selectedMatchId && (
        <Text>
          {/* <Text>(matchId: {selectedMatchId})</Text> */}
          <Newline />
          <Text>radiant: {radiantTeam}</Text>
          <Text>{"  vs  "}</Text>
          <Text>dire: {direTeam}</Text>
          <Newline />
          <Newline />
          <LivePlayerNetworth
            selectedMatchId={selectedMatchId}
          ></LivePlayerNetworth>
        </Text>
      )}
    </Box>
  );
};

render(<App />);
