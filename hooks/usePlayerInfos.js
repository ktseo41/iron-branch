"use strict";
const React = require("react");
const { useState } = require("react");
const { getPlayerInfo } = require("../lib/apis");

module.exports = () => {
  const [playerInfos, setPlayerInfos] = useState({});

  async function fetchPlayerInfo(accountId) {
    if (accountId in playerInfos) {
      return;
    }

    const playerInfo = await getPlayerInfo(accountId).catch((err) =>
      console.error(err)
    );

    setPlayerInfos((playerInfos) => ({
      ...playerInfos,
      [accountId]: playerInfo,
    }));
  }

  return { playerInfos, fetchPlayerInfo };
};
