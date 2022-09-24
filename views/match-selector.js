"use strict";
const React = require("react");
const { Text } = require("ink");
const Prompts = require("import-jsx")("../components/prompts.js");
const { getGameStateFromMatch } = require("../lib/match");
const { GAME_STATE } = require("../constants");

function extractTeamsFromGames(games) {
  const gameSummaries = games
    .filter(({ radiant_team, dire_team }) => radiant_team && dire_team)
    .map((game) => {
      const gameState = getGameStateFromMatch(game);

      const summary = {
        id: game.match_id,
        radiantTeam: game.radiant_team?.team_name,
        direTeam: game.dire_team?.team_name,
        gameState,
      };

      if (gameState === GAME_STATE.IN_GAME) {
        summary.parsedDuration =
          String(Math.floor(game.scoreboard?.duration / 60)).padStart(2, "0") +
          ":" +
          String(Math.floor(game.scoreboard?.duration % 60)).padStart(2, "0");
      }

      return summary;
    });

  return gameSummaries.map(
    ({ id, radiantTeam, direTeam, gameState, parsedDuration }) => ({
      id,
      label: `${radiantTeam} vs ${direTeam} (${gameState}${
        parsedDuration ? " " + parsedDuration : ""
      })`,
      value: {
        radiantTeam,
        direTeam,
        id,
      },
    })
  );
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
