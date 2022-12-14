import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const instance = axios.create({
  baseURL: "http://api.steampowered.com",
  params: {
    key: process.env.STEAM_API_KEY,
  },
});

export async function getLiveLeagueGames() {
  const apiInterface = "IDOTA2Match_570";
  const method = "GetLiveLeagueGames";
  const version = "v1";
  try {
    const response = await instance.get(
      `/${apiInterface}/${method}/${version}`
    );

    return response.data?.result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getHeroes() {
  const apiInterface = "IEconDOTA2_570";
  const method = "GetHeroes";
  const version = "v1";
  const response = await instance.get(`/${apiInterface}/${method}/${version}`);
  return response.data?.result;
}
