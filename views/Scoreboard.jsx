import { useEffect, useState } from "react";
import { Text } from "ink";
import useLiveMatches from "../hooks/useLiveMatches";
import useGameState from "../hooks/useGameState";
import { GAME_STATE } from "../constants";

// eslint-disable-next-line react/prop-types
export default function Scoreboard({ selectedMatchId } = {}) {
  const { matches } = useLiveMatches({ useInterval: true, from: "scoreboard" });
  const [radiantTeamName, setRadiantTeamName] = useState();
  const [direTeamName, setDireTeamName] = useState();
  const [radiantNetworthSum, setRadiantNetworthSum] = useState();
  const [direNetworthSum, setDireNetworthSum] = useState();
  const [radiantKillScores, setRadiantKillScores] = useState();
  const [direKillScores, setDireKillScores] = useState();
  const [time, setTime] = useState();
  const { gameState } = useGameState({ selectedMatchId });

  useEffect(() => {
    if (!matches.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId,
    );

    const {
      scoreboard,
      radiant_team: {
        team_name: rTeamName,
      } = {},
      dire_team: {
        team_name: dTeamName,
      } = {},
    } = selectedMatch || {};
    const { radiant, dire, duration } = scoreboard || {};
    const { players: rPlayers } = radiant || {};
    const { players: dPlayers } = dire || {};

    if (!rPlayers || !dPlayers) {
      return;
    }

    const rNetworthSum = rPlayers.reduce(
      (acc, { net_worth: netWorth }) => acc + netWorth,
      0,
    );
    const dNetworthSum = dPlayers.reduce(
      (acc, { net_worth: netWorth }) => acc + netWorth,
      0,
    );

    const rKillScores = rPlayers.reduce(
      (acc, { kills }) => acc + kills,
      0,
    );

    const dKillScores = dPlayers.reduce(
      (acc, { kills }) => acc + kills,
      0,
    );

    const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
    const seconds = String(parseInt(duration % 60, 10)).padStart(2, "0");

    setTime(`${minutes}:${seconds}`);
    setRadiantTeamName(rTeamName.trim());
    setDireTeamName(dTeamName.trim());
    setRadiantKillScores(rKillScores);
    setDireKillScores(dKillScores);
    setRadiantNetworthSum(rNetworthSum);
    setDireNetworthSum(dNetworthSum);
  }, [selectedMatchId, matches]);

  return (
    <Text>
      (radiant)
      {" "}
      {radiantTeamName}
      {" "}
      {radiantKillScores}
      {" "}
      {radiantNetworthSum > direNetworthSum ? (
        <Text>
          ▲
          {(
            ((radiantNetworthSum - direNetworthSum)
              / (radiantNetworthSum + direNetworthSum))
            * 100
          ).toFixed(2)}
          %
        </Text>
      ) : <Text>{" ".repeat(5)}</Text>}
      {" "}
      |
      {gameState === GAME_STATE.IN_GAME && time}
      |
      {" "}
      {direNetworthSum > radiantNetworthSum ? (
        <Text>
          ▲
          {(
            ((direNetworthSum - radiantNetworthSum)
              / (direNetworthSum + radiantNetworthSum))
            * 100
          ).toFixed(2)}
          %
        </Text>
      ) : <Text>{" ".repeat(5)}</Text>}
      {" "}
      {direKillScores}
      {" "}
      {direTeamName}
      {" "}
      (dire)
    </Text>
  );
}
