import { useContext, useEffect, useState } from "react";
import { Text } from "ink";
import useLiveMatches from "../hooks/useLiveMatches";
import AppContext from "../context/AppContext";
import useCleanUp from "../hooks/useCleanUp";
import { GAME_STATE } from "../constants";

export default function MatchDetails() {
  const [currentMatch, setCurrentMatch] = useState(null);
  const { selectedMatch } = useContext(AppContext);
  const { matches } = useLiveMatches();
  const mountedRef = useCleanUp();

  useEffect(() => {
    if (!mountedRef.current || !matches?.length) {
      return;
    }

    const match = matches.find(({ matchId }) => matchId === selectedMatch.id);

    setCurrentMatch(match);
  }, [matches, selectedMatch]);

  return (
    <>
      {/* <Scoreboard /> */}
      { !currentMatch ? (<Text>loading...</Text>) : (
        <>
          {currentMatch.gameState !== GAME_STATE.GAME_IN_PROGRESS && <Text>ban pick</Text>}
          {currentMatch.gameState === GAME_STATE.GAME_IN_PROGRESS && <Text>live match</Text>}
        </>
      )}
    </>
  );
}
