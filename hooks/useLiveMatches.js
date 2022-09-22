"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { getLiveLeagueGames: getLiveLeagueMatches } = require("../lib/apis");
const { randomId } = require("../lib");

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

  if (diff > 1000 * 10) return null;

  return cache.matches;
}

function setCache(matches) {
  cache.time = Date.now();
  cache.matches = matches;
}

const intervalIds = {};

module.exports = ({ useInterval, from = randomId() } = {}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchLiveMatchesWithCache();

    if (useInterval && !intervalIds[from]) {
      intervalIds[from] = setInterval(() => {
        fetchLiveMatchesWithCache();
      }, 1000 * 10);
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
