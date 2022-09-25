import { useEffect, useState } from "react";
import { getLiveLeagueGames as getLiveLeagueMatches } from "../lib/apis";

export default () => {
  const [isFetching, setIsFetching] = useState(true);
  const [matches, setMatches] = useState([]);

  // eslint-disable-next-line consistent-return
  async function fetchLiveMatches() {
    setIsFetching(true);
    const { games: _matches } = (await getLiveLeagueMatches()) || {};

    if (!_matches) {
      setIsFetching(false);
      return console.error("No matches found");
    }

    setMatches(_matches);
    setIsFetching(false);
  }

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  return { matches, isFetching, fetchLiveMatches };
};
