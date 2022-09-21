"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { getLiveLeagueGames: getLiveLeagueMatches } = require("../lib/apis");

module.exports = ({ interval } = {}) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchLiveMatches();

    if (interval) {
      const intervalId = setInterval(() => {
        fetchLiveMatches();
      }, interval);
      return () => clearInterval(intervalId);
    }

    async function fetchLiveMatches() {
      const { games: matches } = (await getLiveLeagueMatches()) || {};

      if (!matches) return console.error("No matches found");

      setMatches(matches);
    }
  }, []);

  return matches;
};
