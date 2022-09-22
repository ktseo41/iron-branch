"use strict";
const React = require("react");
const { useEffect, useState } = require("react");
const { Box, Text, Newline } = require("ink");
const useLiveMatches = require("../hooks/useLiveMatches");
const useHeroes = require("../hooks/useHeroes");
const LiveBanpickPhase = require("import-jsx")("./live-banpick-phase");
const { GAME_STATE } = require("../constants");

module.exports = ({ selectedMatchId } = {}) => {
  const matches = useLiveMatches({ useInterval: true });
  const heroes = useHeroes();
  const [gameState, setGameState] = useState(null);
  const [sortedPlayerNetworths, setSortedPlayerNetworths] = useState([]);

  useEffect(() => {
    if (!selectedMatchId || !matches.length || !heroes?.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId
    );

    const { scoreboard, players } = selectedMatch || {};

    if (!scoreboard) {
      setGameState(GAME_STATE.WAIT_IN_LOBBY);
      return;
    }

    const { duration, radiant, dire } = scoreboard || {};

    if (!duration) {
      setGameState(GAME_STATE.BAN_PICK_PHASE);
      return;
    }

    setGameState(GAME_STATE.IN_GAME);

    const { players: rPlayers } = radiant || {};
    const { players: dPlayers } = dire || {};

    if (!rPlayers || !dPlayers) return console.log("No players found");

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
  }, [selectedMatchId, matches, heroes]);

  return (
    <Box flexDirection="column">
      {gameState && gameState !== GAME_STATE.IN_GAME && (
        <Text>--- {gameState} ---</Text>
      )}
      {gameState === GAME_STATE.BAN_PICK_PHASE && (
        <LiveBanpickPhase selectedMatchId={selectedMatchId}></LiveBanpickPhase>
      )}
      <Box flexDirection="column">
        {sortedPlayerNetworths.map(
          ({ account_id, player_name, hero_name, net_worth, side }) => (
            <Text key={account_id + hero_name}>
              [<Text>{side.slice(0, 1).toUpperCase()}</Text>] {net_worth} ||{" "}
              {hero_name} || {player_name}
            </Text>
          )
        )}
      </Box>
    </Box>
  );
};
