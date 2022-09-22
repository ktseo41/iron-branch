"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const useLiveMatches = require("../hooks/useLiveMatches");
const useHeroes = require("../hooks/useHeroes");
const { Text, Newline } = require("ink");

module.exports = ({ selectedMatchId } = {}) => {
  const matches = useLiveMatches({ interval: 1000 * 10 });
  const heroes = useHeroes();
  const [sortedPlayerNetworths, setSortedPlayerNetworths] = useState([]);

  useEffect(() => {
    if (!selectedMatchId || !matches.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId
    );

    const { scoreboard, players } = selectedMatch || {};
    const { radiant, dire } = scoreboard || {};
    const { players: rPlayers } = radiant || {};
    const { players: dPlayers } = dire || {};

    const allPlayers = rPlayers
      .map(({ ...rest }) => ({
        ...rest,
        side: "radiant",
      }))
      .concat(
        dPlayers.map(({ ...rest }) => ({
          ...rest,
          side: "dire",
        }))
      );

    const sortedByNetWorth = allPlayers
      .sort((a, b) => b.net_worth - a.net_worth)
      .map(({ account_id, hero_id, net_worth, side }) => ({
        account_id,
        player_name:
          players?.find((player) => player.account_id === account_id)?.name ||
          "unknown player",
        hero_name:
          heroes
            .find((hero) => hero.id === hero_id)
            ?.name?.replace("npc_dota_hero_", "") || "unknown hero",
        net_worth,
        side,
      }));

    setSortedPlayerNetworths(sortedByNetWorth);
  }, [selectedMatchId, matches]);

  return (
    <Text>
      {sortedPlayerNetworths.map(
        ({ account_id, player_name, hero_name, net_worth, side }) => (
          <Text key={account_id}>
            [<Text>{side.slice(0, 1).toUpperCase()}</Text>] {net_worth} ||{" "}
            {hero_name} || {player_name}
            <Newline />
          </Text>
        )
      )}
    </Text>
  );
};