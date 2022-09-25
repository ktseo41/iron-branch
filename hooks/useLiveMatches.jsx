import { useEffect, useState } from "react";
import { getLiveLeagueGames as getLiveLeagueMatches } from "../lib/apis";
import { randomId } from "../lib/utils";
import { TICK_RATE } from "../constants";

/**
 * @typedef {Object} Cache
 * @property {Number} time
 * @property {Array} matches
 */
const cache = {};

function getCache() {
  if (!cache.time) return null;

  const now = Date.now();
  const lastCacheTime = cache.time;
  const diff = now - lastCacheTime;

  if (diff >= TICK_RATE) return null;

  return cache.matches;
}

function setCache(matches) {
  cache.time = Date.now();
  cache.matches = matches;
}

const intervalIds = {};

export default ({ useInterval, from = randomId() } = {}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchLiveMatchesWithCache();

    if (useInterval && !intervalIds[from]) {
      intervalIds[from] = setInterval(() => {
        fetchLiveMatchesWithCache();
      }, TICK_RATE);
      return () => clearInterval(intervalIds[from]);
    }

    async function fetchLiveMatchesWithCache() {
      const cache = getCache();

      if (cache) {
        setMatches(cache);
        return;
      }

      setIsFetching(true);
      const { games: _matches } = (await getLiveLeagueMatches()) || {};

      if (!_matches) return console.error("No matches found");

      setCache(_matches);
      setMatches(_matches);
      setIsFetching(false);
    }
  }, []);

  return { matches, isFetching };
};
