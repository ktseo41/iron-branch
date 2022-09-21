function extractTeamsFromGames(games) {
  const gameSummaries = games
    .filter(({ radiant_team, dire_team }) => radiant_team && dire_team)
    .map((game) => {
      return {
        id: game.match_id,
        radiant_team: game.radiant_team?.team_name,
        dire_team: game.dire_team?.team_name,
      };
    });

  return gameSummaries.map(({ id, radiant_team, dire_team }) => ({
    id,
    label: `${radiant_team} vs ${dire_team}`,
    value: {
      radiant_team,
      dire_team,
      id,
    },
  }));
}

module.exports = {
  extractTeamsFromGames,
};
