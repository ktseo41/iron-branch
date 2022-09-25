#! /usr/bin/env node
import { useEffect, useState } from "react";
import { render, Box, Text } from "ink";
import useMatches from "./hooks/useMatches";
import useGameState from "./hooks/useGameState";
import { GAME_STATE } from "./constants";
import TimerAndTeamNetworthDiff from "./views/TimerAndTeamNetworthDiff";
import LiveBanpickPhase from "./views/LiveBanpickPhase";
import MatchSelector from "./views/MatchSelector";
import LivePlayerNetworth from "./views/LivePlayerNetworth";

function App() {
  const { matches, isFetching, fetchLiveMatches } = useMatches();
  const [refetchInterval, setRefetchInterval] = useState(5);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const gameState = useGameState({ selectedMatchId });
  const [radiantTeam, setRadiantTeam] = useState(null);
  const [direTeam, setDireTeam] = useState(null);

  function onSelected({ id, _radiantTeam, _direTeam }) {
    setSelectedMatchId(id);
    setRadiantTeam(_radiantTeam);
    setDireTeam(_direTeam);
  }

  useEffect(() => {
    if (!matches?.length && refetchInterval) {
      setTimeout(() => {
        if (refetchInterval) {
          setRefetchInterval(refetchInterval - 1);
          return;
        }

        fetchLiveMatches();
        setRefetchInterval(5);
      }, 1000);
    }
  }, [matches, refetchInterval]);

  return (
    <Box flexDirection="column">
      {!selectedMatchId
        && (isFetching ? (
          <Text>fetching matches...</Text>
        ) : !matches?.length ? (
          <Text>
            no matches found. try refresh
            {".".repeat(4 - (refetchInterval % 4) || 0)}
          </Text>
        ) : (
          <MatchSelector matches={matches} onSelected={onSelected} />
        ))}
      {selectedMatchId && (
        <Box flexDirection="column">
          <Text>
            <Text>
              (radiant)
              {radiantTeam}
            </Text>
            {gameState === GAME_STATE.IN_GAME ? (
              <TimerAndTeamNetworthDiff
                selectedMatchId={selectedMatchId}
              />
            ) : (
              " vs "
            )}
            <Text>
              {direTeam}
              {" "}
              (dire)
            </Text>
          </Text>
        </Box>
      )}
      {gameState === GAME_STATE.WAIT_IN_LOBBY && (
        <Text>{GAME_STATE.WAIT_IN_LOBBY}</Text>
      )}
      {gameState === GAME_STATE.BAN_PICK_PHASE && (
        <LiveBanpickPhase selectedMatchId={selectedMatchId} />
      )}
      {gameState === GAME_STATE.IN_GAME && (
        <LivePlayerNetworth
          selectedMatchId={selectedMatchId}
        />
      )}
    </Box>
  );
}

render(<App />);
