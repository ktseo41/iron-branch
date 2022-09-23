const fs = require("fs");
const path = require("path");

function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

function archiveMatch(match) {
  fs.writeFileSync(
    path.join(
      __dirname,
      `../matches-archive/${match.match_id} ${new Date()
        .toLocaleString()
        .replace(/\//g, "|")}.json`
    ),
    JSON.stringify(match, null, 2)
  );
}

module.exports = {
  randomId,
  archiveMatch,
};
