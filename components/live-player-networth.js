"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const useLiveMatches = require("../hooks/useLiveMatches");
const { Text, Newline } = require("ink");

module.exports = ({ selectedMatchId } = {}) => {
  const matches = useLiveMatches({ interval: 1000 * 10 });
  const [sortedPlayerNetworths, setSortedPlayerNetworths] = useState([]);

  useEffect(() => {
    if (!selectedMatchId || !matches.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId
    );

    const {
      scoreboard: {
        radiant: { players: rPlayers } = {},
        dire: { players: dPlayers } = {},
      } = {},
    } = selectedMatch || {};

    const allPlayers = [...rPlayers, ...dPlayers];

    const sortedByNetWorth = allPlayers
      .sort((a, b) => b.net_worth - a.net_worth)
      .map(({ account_id, hero_id, net_worth }) => ({
        account_id,
        hero_id,
        net_worth,
      }));

    setSortedPlayerNetworths(sortedByNetWorth);
  }, [selectedMatchId, matches]);

  return (
    <Text>
      {sortedPlayerNetworths.map(({ account_id, hero_id, net_worth }) => (
        <Text key={account_id}>
          {net_worth} || {hero_id}
          <Newline />
        </Text>
      ))}
    </Text>
  );
};
