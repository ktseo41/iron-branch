const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const instance = axios.create({
  baseURL: "http://api.steampowered.com",
  params: {
    key: process.env.STEAM_API_KEY,
  },
});

async function getLiveLeagueGames() {
  const _interface = "IDOTA2Match_570";
  const method = "GetLiveLeagueGames";
  const version = "v1";
  const response = await instance.get(`/${_interface}/${method}/${version}`);
  return response.data?.result;
}

async function getHeroes() {
  const _interface = "IEconDOTA2_570";
  const method = "GetHeroes";
  const version = "v1";
  const response = await instance.get(`/${_interface}/${method}/${version}`);
  return response.data?.result;
}

async function getPlayerInfo(accountId) {
  const _interface = "IDOTA2Fantasy_205790";
  const method = "GetPlayerOfficialInfo";
  const version = "v1";
  const response = await instance.get(
    `/${_interface}/${method}/${version}?accountId=${accountId}`
  );
  return response.data?.result;
}

module.exports = {
  instance,
  getLiveLeagueGames,
  getHeroes,
  getPlayerInfo,
};
