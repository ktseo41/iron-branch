"use strict";
const React = require("react");
const { Text } = require("ink");
const { extractTeamsFromGames } = require("../lib/utils");
const Prompts = require("import-jsx")("../components/prompts.js");

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
