import { useEffect, useState } from "react";
import { Text } from "ink";
import useLiveMatches from "../hooks/useLiveMatches";
import Timer from "./Timer";

// eslint-disable-next-line react/prop-types
export default function TimerAndTeamNetworthDiff({ selectedMatchId } = {}) {
  const { matches } = useLiveMatches({
    useInterval: true,
    from: "timer and team networth diff",
  });
  const [direNetworthSum, setDireNetworthSum] = useState(undefined);
  const [radiantNetworthSum, setRadiantNetworthSum] = useState(undefined);

  useEffect(() => {
    if (!matches.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId,
    );

    const { scoreboard } = selectedMatch || {};
    const { radiant, dire } = scoreboard || {};
    const { players: rPlayers } = radiant || {};
    const { players: dPlayers } = dire || {};

    if (!rPlayers || !dPlayers) {
      console.log("No players found");
      return;
    }

    const _radiantNetworthSum = rPlayers.reduce(
      (acc, { net_worth }) => acc + net_worth,
      0,
    );
    const _direNetworthSum = dPlayers.reduce(
      (acc, { net_worth }) => acc + net_worth,
      0,
    );

    setRadiantNetworthSum(_radiantNetworthSum);
    setDireNetworthSum(_direNetworthSum);
  }, [matches]);

  return (
    <Text>
      {" "}
      {radiantNetworthSum > direNetworthSum && (
        <Text>
          ▲
          {(
            ((radiantNetworthSum - direNetworthSum)
              / (radiantNetworthSum + direNetworthSum))
            * 100
          ).toFixed(2)}
          %
        </Text>
      )}
      {" ["}
      <Timer selectedMatchId={selectedMatchId} />
      {"] "}
      {direNetworthSum > radiantNetworthSum && (
        <Text>
          ▲
          {(
            ((direNetworthSum - radiantNetworthSum)
              / (direNetworthSum + radiantNetworthSum))
            * 100
          ).toFixed(2)}
          %
          {" "}
        </Text>
      )}
    </Text>
  );
}
