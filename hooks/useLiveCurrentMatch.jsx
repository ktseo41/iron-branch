import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import useLiveMatches from "./useLiveMatches";
import useCleanUp from "./useCleanUp";

export default function useLiveCurrentMatch() {
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

  return {
    currentMatch,
  };
}
