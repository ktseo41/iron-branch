import { useEffect, useState } from "react";
import { Text } from "ink";
import useCleanUp from "../hooks/useCleanUp";
import useLiveCurrentMatch from "../hooks/useLiveCurrentMatch";
import { GAME_STATE } from "../constants";

export default function Scoreboard() {
  const { currentMatch } = useLiveCurrentMatch();
  const [radiantTeamName, setRadiantTeamName] = useState();
  const [direTeamName, setDireTeamName] = useState();
  const [radiantNetworthSum, setRadiantNetworthSum] = useState();
  const [direNetworthSum, setDireNetworthSum] = useState();
  const [radiantKillScores, setRadiantKillScores] = useState();
  const [direKillScores, setDireKillScores] = useState();
  const [time, setTime] = useState();
  const mountedRef = useCleanUp();

  useEffect(() => {
    if (!currentMatch) return;

    const {
      radiantTeam: {
        name: rTeamName,
      } = {},
      direTeam: {
        name: dTeamName,
      } = {},
      players,
      gameTime,
      radiantScore,
      direScore,
    } = currentMatch || {};

    const rNetworthSum = players.filter((p) => p.isRadiant).reduce(
      (acc, { networth }) => acc + networth,
      0,
    );
    const dNetworthSum = players.filter((p) => !p.isRadiant).reduce(
      (acc, { networth }) => acc + networth,
      0,
    );

    const minutes = String(Math.floor(gameTime / 60)).padStart(2, "0");
    const seconds = String(parseInt(gameTime % 60, 10)).padStart(2, "0");

    if (mountedRef.current) {
      setTime(`${minutes}:${seconds}`);
      setRadiantTeamName(rTeamName.trim());
      setDireTeamName(dTeamName.trim());
      setRadiantKillScores(radiantScore);
      setDireKillScores(direScore);
      setRadiantNetworthSum(rNetworthSum);
      setDireNetworthSum(dNetworthSum);
    }
  }, [currentMatch]);

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
      {currentMatch?.gameState === GAME_STATE.GAME_IN_PROGRESS && time}
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
