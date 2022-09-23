"use strict";
const React = require("react");
const { Text } = require("ink");
const Prompts = require("import-jsx")("../components/prompts.js");
const { getGameStateFromMatch } = require("../lib/match");

function extractTeamsFromGames(games) {
  const gameSummaries = games
    .filter(({ radiant_team, dire_team }) => radiant_team && dire_team)
    .map((game) => {
      return {
        id: game.match_id,
        radiantTeam: game.radiant_team?.team_name,
        direTeam: game.dire_team?.team_name,
        gameState: getGameStateFromMatch(game),
      };
    });

  return gameSummaries.map(({ id, radiantTeam, direTeam, gameState }) => ({
    id,
    label: `${radiantTeam} vs ${direTeam} (${gameState})`,
    value: {
      radiantTeam,
      direTeam,
      id,
    },
  }));
}

module.exports = ({ matches = [], onSelected }) => {
  const onSubmit = (matchId) => {
    if (onSelected) {
      onSelected(matchId);
    }
  };

  return matches?.length > 0 ? (
    <Prompts
      items={extractTeamsFromGames(matches)}
      onSubmit={onSubmit}
    ></Prompts>
  ) : (
    <Text>no matches found. try refresh</Text>
  );
};
