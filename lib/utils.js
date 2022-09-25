import fs from "fs";
import path from "path";

export function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

export function archiveMatch(match) {
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
