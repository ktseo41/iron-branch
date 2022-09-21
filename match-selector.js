"use strict";
const React = require("react");
const { extractTeamsFromGames } = require("./lib");
const Prompts = require("import-jsx")("./prompts.js");

module.exports = ({ matches = [], onSelected }) => {
  const onSubmit = (matchId) => {
    if (onSelected) {
      onSelected(matchId);
    }
  };

  return (
    <Prompts
      items={extractTeamsFromGames(matches)}
      onSubmit={onSubmit}
    ></Prompts>
  );
};
