import { useEffect, useState } from "react";
import { getLiveLeagueGames as getLiveLeagueMatches } from "../lib/apis";
import { randomId } from "../lib/utils";
import { TICK_RATE } from "../constants";
import useCleanUp from "./useCleanUp";

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
  const mountedRef = useCleanUp();

  useEffect(() => {
    async function fetchLiveMatchesWithCache() {
      if (!mountedRef.current) return;

      const prevCache = getCache();

      if (prevCache) {
        setMatches(prevCache);
        return;
      }

      setIsFetching(true);
      const { games: _matches } = (await getLiveLeagueMatches()) || {};

      if (!_matches) {
        console.error("No matches found");
        return;
      }

      setCache(_matches);
      setMatches(_matches);
      setIsFetching(false);
    }

    fetchLiveMatchesWithCache();

    if (useInterval && !intervalIds[from]) {
      intervalIds[from] = setInterval(() => {
        if (!mountedRef.current) {
          clearInterval(intervalIds[from]);
          return;
        }
        fetchLiveMatchesWithCache();
      }, TICK_RATE);
      return () => clearInterval(intervalIds[from]);
    }

    return () => {};
  }, []);

  return { matches, isFetching };
};
