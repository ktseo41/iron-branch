#! /usr/bin/env node
import { useCallback, useEffect, useState } from "react";
import {
  render, Box, Text, useInput, Newline,
} from "ink";
import useMatches from "./hooks/useMatches";
import useGameState from "./hooks/useGameState";
import { GAME_STATE } from "./constants";
import LiveBanpickPhase from "./views/LiveBanpickPhase";
import MatchSelector from "./views/MatchSelector";
import LivePlayerNetworth from "./views/LivePlayerNetworth";
import useCleanUp from "./hooks/useCleanUp";
import Scoreboard from "./views/Scoreboard";

const { clear } = render(<App />);

function App() {
  const { matches, isFetching, fetchLiveMatches } = useMatches();
  const [refetchInterval, setRefetchInterval] = useState(5);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const { gameState, setGameState } = useGameState({ selectedMatchId });
  const onSelected = useCallback(({ id }) => {
    setSelectedMatchId(id);
  }, [setSelectedMatchId]);
  const mountedRef = useCleanUp();

  useInput((input) => {
    if (input === "m") {
      fetchLiveMatches().then(() => {
        clear();
        setSelectedMatchId(null);
        setGameState(null);
      });
    }
  });

  useEffect(() => {
    if (!matches?.length && refetchInterval >= 0) {
      setTimeout(() => {
        if (refetchInterval >= 0) {
          setRefetchInterval(refetchInterval - 1);
          return;
        }

        fetchLiveMatches();
        if (mountedRef.current) {
          setRefetchInterval(5);
        }
      }, 1000);
    } else if (!matches?.length && refetchInterval < 0) {
      if (mountedRef.current) {
        setRefetchInterval(5);
      }
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
        <Scoreboard selectedMatchId={selectedMatchId} />
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
      {selectedMatchId && (
      <Text>
        <Newline />
        { isFetching ? "fetching matches..." : "(m) return to Match Selector" }
      </Text>
      )}
    </Box>
  );
}
