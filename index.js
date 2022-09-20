const axios = require("axios");
const inquirer = require("inquirer");
const blessed = require("blessed");
const contrib = require("blessed-contrib");
const dotenv = require("dotenv");
dotenv.config();

const instance = axios.create({
  baseURL: "http://api.steampowered.com",
  params: {
    key: process.env.STEAM_API_KEY,
  },
});

async function main() {
  const { games } = (await getLiveLeagueGames()) || {};

  const gameSummaries = games
    .filter(({ radiant_team, dire_team }) => radiant_team && dire_team)
    .map((game) => {
      return {
        id: game.match_id,
        radiant_team: game.radiant_team?.team_name,
        dire_team: game.dire_team?.team_name,
      };
    });

  const gamePrompt = {
    type: "list",
    name: "gameId",
    message: "Which game would you like to watch?",
    choices: gameSummaries.map(({ id, radiant_team, dire_team }) => ({
      key: id,
      name: `${radiant_team} vs ${dire_team}`,
      value: id,
    })),
  };

  inquirer.prompt([gamePrompt]).then(async ({ gameId }) => {
    fetchLiveGamesAndshowSpecificGameStats(gameId);

    setInterval(
      () => fetchLiveGamesAndshowSpecificGameStats(gameId),
      1000 * 10
    );
  });
}

async function getLiveLeagueGames() {
  const _interface = "IDOTA2Match_570";
  const method = "GetLiveLeagueGames";
  const version = "v1";
  const response = await instance.get(`/${_interface}/${method}/${version}`);
  return response.data?.result;
}

async function fetchLiveGamesAndshowSpecificGameStats(gameId) {
  const { games } = (await getLiveLeagueGames()) || {};

  if (!games) return console.log("No games found");
  // ban pick 단계라면? scoreboard.경과시간인가 있음
  const targetGame = games.find((game) => game.match_id === gameId);

  renderNetworth(targetGame);
}

function renderNetworth(game) {
  const {
    scoreboard: {
      radiant: { players: rPlayers } = {},
      dire: { players: dPlayers } = {},
    } = {},
  } = game || {};

  const allPlayers = [...rPlayers, ...dPlayers];
  const sortedByNetWorth = allPlayers.sort((a, b) => b.net_worth - a.net_worth);
  const extractInfos = sortedByNetWorth.map(
    ({ account_id, hero_id, net_worth }) => ({
      account_id,
      hero_id,
      net_worth,
    })
  );

  try {
    const screen = blessed.screen();
    const bar = contrib.bar({
      barWidth: 8,
      barSpacing: 4,
      xOffset: 0,
      maxHeight: 10,
    });

    screen.append(bar);
    bar.setData({
      titles: extractInfos.map((player) => `${player.hero_id}`),
      data: extractInfos.map((player) => player.net_worth),
    });

    screen.key(["escape", "q", "C-c"], function (ch, key) {
      return process.exit(0);
    });

    screen.render();
  } catch (error) {
    console.log(error);
  }
}

main();
