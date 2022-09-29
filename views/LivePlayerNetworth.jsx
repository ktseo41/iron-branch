import { useEffect, useState } from "react";
import { Box, Text } from "ink";
import useLiveMatches from "../hooks/useLiveMatches";
import useHeroes from "../hooks/useHeroes";
import useCleanUp from "../hooks/useCleanUp";

// eslint-disable-next-line react/prop-types
export default function LivePlayerNetworth({ selectedMatchId } = {}) {
  const { matches } = useLiveMatches({
    useInterval: true,
    from: "live player networth",
  });
  const heroes = useHeroes();
  const [sortedPlayerNetworths, setSortedPlayerNetworths] = useState([]);
  const mountedRef = useCleanUp();

  useEffect(() => {
    if (!selectedMatchId || !matches.length || !heroes?.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId,
    );

    const { scoreboard, players } = selectedMatch || {};
    const { radiant, dire } = scoreboard || {};
    const { players: rPlayers } = radiant || {};
    const { players: dPlayers } = dire || {};

    if (!rPlayers || !dPlayers) {
      console.log("No players found");
      return;
    }

    const allPlayers = rPlayers
      .map(({ ...rest }) => ({
        ...rest,
        side: "radiant",
      }))
      .concat(
        dPlayers.map(({ ...rest }) => ({
          ...rest,
          side: "dire",
        })),
      );

    const sortedByNetWorth = allPlayers
      .sort((a, b) => b.net_worth - a.net_worth)
      .map(({
        account_id: accountId,
        hero_id: heroId,
        net_worth: netWorth,
        side,
        respawn_timer: respawnTimer,
      }) => ({
        accountId,
        playerName:
          players?.find((player) => player.account_id === accountId)?.name
          || "unknown player",
        heroName:
          heroes
            .find((hero) => hero.id === heroId)
            ?.name?.replace("npc_dota_hero_", "") || "unknown hero",
        netWorth,
        side,
        respawnTimer,
      }));

    if (mountedRef.current) {
      setSortedPlayerNetworths(sortedByNetWorth);
    }
  }, [selectedMatchId, matches, heroes]);

  return (
    <Box flexDirection="column">
      {sortedPlayerNetworths.map(
        ({
          accountId, playerName, heroName, netWorth, side, respawnTimer,
        }) => (
          <Text key={accountId + heroName} dimColor={respawnTimer}>
            [
            <Text>{side.slice(0, 1).toUpperCase()}</Text>
            ]
            {" "}
            {netWorth}
            {" "}
            ||
            {" "}
            {heroName}
            {" "}
            ||
            {" "}
            {playerName}
            {
              respawnTimer && (
                <>
                  {" "}
                  || Respawn in
                  {" "}
                  {respawnTimer}
                </>
              )
            }
          </Text>
        ),
      )}
    </Box>
  );
}
