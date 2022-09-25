import { useEffect, useState } from "react";
import useLiveMatches from "./useLiveMatches"
import { getGameStateFromMatch } from "../lib/match";

export default ({ selectedMatchId } = {}) => {
  const { matches } = useLiveMatches({
    useInterval: true,
    from: "useGameState",
  });
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (!selectedMatchId || !matches.length) return;

    const selectedMatch =
      matches.find((match) => match.match_id === selectedMatchId) || {};

    setGameState(getGameStateFromMatch(selectedMatch));
  }, [selectedMatchId, matches]);

  return gameState;
};
