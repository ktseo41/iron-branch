"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { Box, Text } = require("ink");
const useLiveMatches = require("../hooks/useLiveMatches");
const useHeroes = require("../hooks/useHeroes");

module.exports = ({ selectedMatchId } = {}) => {
  const matches = useLiveMatches({ useInterval: true });
  const heroes = useHeroes();
  const [rPicks, setRPicks] = useState([]);
  const [rBans, setRBans] = useState([]);
  const [dPicks, setDPicks] = useState([]);
  const [dBans, setDBans] = useState([]);

  useEffect(() => {
    if (!selectedMatchId || !matches.length || !heroes?.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId
    );

    const { scoreboard } = selectedMatch || {};

    const { radiant, dire } = scoreboard || {};

    const { picks: rPicks, bans: rBans } = radiant || {};
    const { picks: dPicks, bans: dBans } = dire || {};

    setRPicks(rPicks);
    setRBans(rBans);
    setDPicks(dPicks);
    setDBans(dBans);
  }, [selectedMatchId, matches, heroes]);

  return (
    <Box flexDirection="column">
      <Box>
        <Box width="6%">
          <Text></Text>
        </Box>
        <Box width="47%">
          <Text>radiant</Text>
        </Box>
        <Box width="47%">
          <Text>dire</Text>
        </Box>
      </Box>
      <Box>
        <Box width="6%">
          <Text>pick</Text>
        </Box>
        <Box width="47%">
          {rPicks &&
            rPicks.map(({ hero_id }, idx) => (
              <Text key={hero_id}>
                {heroes
                  .find((hero) => hero.id === hero_id)
                  ?.name?.replace("npc_dota_hero_", "") || "unknown hero"}
                {idx !== rPicks.length - 1 && " | "}
              </Text>
            ))}
        </Box>
        <Box width="47%">
          {dPicks &&
            dPicks.map(({ hero_id }, idx) => (
              <Text key={hero_id}>
                {heroes
                  .find((hero) => hero.id === hero_id)
                  ?.name?.replace("npc_dota_hero_", "") || "unknown hero"}
                {idx !== dPicks.length - 1 && " | "}
              </Text>
            ))}
        </Box>
      </Box>
      <Box>
        <Box width="6%">
          <Text>ban</Text>
        </Box>
        <Box width="47%">
          {rBans &&
            rBans.map(({ hero_id }, idx) => (
              <Text key={hero_id}>
                {heroes
                  .find((hero) => hero.id === hero_id)
                  ?.name?.replace("npc_dota_hero_", "") || "unknown hero"}
                {idx !== rBans.length - 1 && " | "}
              </Text>
            ))}
        </Box>
        <Box width="47%">
          {dBans &&
            dBans.map(({ hero_id }, idx) => (
              <Text key={hero_id}>
                {heroes
                  .find((hero) => hero.id === hero_id)
                  ?.name?.replace("npc_dota_hero_", "") || "unknown hero"}
                {idx !== dBans.length - 1 && " | "}
              </Text>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
