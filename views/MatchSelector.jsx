import { Text, Box } from "ink";
import { useCallback, useContext } from "react";
import Prompts from "../components/prompts";
import { GAME_STATE } from "../constants";
import useMatches from "../hooks/useMatches";
import AppContext from "../context/AppContext";

function extractSummaries(games) {
  const gameSummaries = games
    .filter(({ gameState }) => gameState !== GAME_STATE.POST_GAME)
    .map(({
      matchId, radiantTeam, direTeam, gameState, gameTime,
    }) => {
      const summary = {
        id: matchId,
        radiantTeam: radiantTeam?.name || "Unknown Team",
        direTeam: direTeam?.name || "Unknown Team",
        gameState,
      };

      if (gameState === GAME_STATE.GAME_IN_PROGRESS) {
        summary.parsedDuration = `${String(Math.floor((gameTime || 0) / 60)).padStart(2, "0")
        }:${
          String(Math.floor((gameTime || 0) % 60)).padStart(2, "0")}`;
      }

      if (gameState === GAME_STATE.HERO_SELECTION) {
        summary.gameState = "BAN/PICK";
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
export default function MatchSelector() {
  const { loading, error, matches } = useMatches();
  const { setSelectedMatch } = useContext(AppContext);
  const onSubmit = useCallback((match) => {
    setSelectedMatch(match);
  }, [setSelectedMatch]);

  return (
    <Box>
      {loading && <Text>Loading...</Text>}
      {error && <Text color="red">{error.message}</Text>}
      {matches && (matches.length ? (
        <Box flexDirection="column">
          <Text>
            BAN/PICK
            {" "}
            {">"}
            {" "}
            { GAME_STATE.STRATEGY_TIME }
            {" "}
            {">"}
            {" "}
            { GAME_STATE.PRE_GAME }
            {" "}
            {">"}
            {" "}
            { GAME_STATE.GAME_IN_PROGRESS }
            {" "}
            {">"}
            {" "}
            { GAME_STATE.POST_GAME }
          </Text>
          <Prompts
            items={extractSummaries(matches)}
            onSubmit={onSubmit}
          />
        </Box>
      ) : <Text>No matches found</Text>)}
    </Box>
  );
}
