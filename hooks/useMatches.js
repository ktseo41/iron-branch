"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { getLiveLeagueGames: getLiveLeagueMatches } = require("../lib/apis");

module.exports = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();

    async function fetchMatches() {
      setIsFetching(true);
      const { games: _matches } = (await getLiveLeagueMatches()) || {};

      if (!_matches) return console.error("No matches found");

      setMatches(_matches);
      setIsFetching(false);
    }
  }, []);

  return { matches, isFetching };
};
