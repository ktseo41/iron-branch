"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { getLiveLeagueGames: getLiveLeagueMatches } = require("../lib/apis");
const fs = require("fs");
const path = require("path");

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

let intervalId;

module.exports = ({ useInterval } = {}) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchLiveMatchesWithCache();

    if (useInterval && !intervalId) {
      intervalId = setInterval(() => {
        fetchLiveMatchesWithCache();
      }, 1000 * 10);
      return () => clearInterval(intervalId);
    }

    async function fetchLiveMatchesWithCache() {
      const cache = getCache();

      if (cache) {
        setMatches(cache);
        return;
      }

      const { games: matches } = (await getLiveLeagueMatches()) || {};

      if (!matches) return console.error("No matches found");

      setCache(matches);
      setMatches(matches);
    }
  }, []);

  return matches;
};
