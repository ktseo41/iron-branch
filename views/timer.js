"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { Text } = require("ink");
const useLiveMatches = require("../hooks/useLiveMatches");

module.exports = ({ selectedMatchId } = {}) => {
  const { matches } = useLiveMatches({
    useInterval: true,
    from: "live banpick phase",
  });
  const [time, setTime] = useState(undefined);

  useEffect(() => {
    if (!selectedMatchId || !matches.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId
    );

    const { scoreboard: { duration } = {} } = selectedMatch || {};

    const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
    const seconds = String(parseInt(duration % 60)).padStart(2, "0");

    setTime(`${minutes}:${seconds}`);
  }, [selectedMatchId, matches]);

  return <Text>{time}</Text>;
};
