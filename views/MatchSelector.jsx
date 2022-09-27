import { Text } from "ink";
import Prompts from "../components/prompts";
import { getGameStateFromMatch } from "../lib/match";
import { GAME_STATE } from "../constants";

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
        summary.parsedDuration = `${String(Math.floor((game.scoreboard?.duration || 0) / 60)).padStart(2, "0")
        }:${
          String(Math.floor((game.scoreboard?.duration || 0) % 60)).padStart(2, "0")}`;
      }

      return summary;
    });

  return gameSummaries.map(
    ({
      id, radiantTeam, direTeam, gameState, parsedDuration,
    }) => ({
      id,
      label: `${radiantTeam} vs ${direTeam} (${gameState}${
        parsedDuration ? ` ${parsedDuration}` : ""
      })`,
      value: {
        radiantTeam,
        direTeam,
        id,
      },
    }),
  );
}

// eslint-disable-next-line react/prop-types
export default function MatchSelector({ matches = [], onSelected }) {
  const onSubmit = (matchId) => {
    if (onSelected) {
      onSelected(matchId);
    }
  };

  return matches?.length > 0 ? (
    <Prompts
      items={extractTeamsFromGames(matches)}
      onSubmit={onSubmit}
    />
  ) : (
    <Text>no matches found. try refresh</Text>
  );
}
