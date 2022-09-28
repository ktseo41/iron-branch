import { useEffect, useState } from "react";
import useLiveMatches from "./useLiveMatches";
import { getGameStateFromMatch } from "../lib/match";
import useCleanUp from "./useCleanUp";

export default ({ selectedMatchId } = {}) => {
  const { matches } = useLiveMatches({
    useInterval: true,
    from: "useGameState",
  });
  const [gameState, setGameState] = useState(null);
  const mountedRef = useCleanUp();

  useEffect(() => {
    if (!selectedMatchId || !matches.length) return;

    const selectedMatch = matches.find((match) => match.match_id === selectedMatchId) || {};

    if (mountedRef.current) {
      setGameState(getGameStateFromMatch(selectedMatch));
    }
  }, [selectedMatchId, matches]);

  return { gameState, setGameState };
};
