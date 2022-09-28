import { useEffect, useState, useRef } from "react";
import { Text } from "ink";
import useLiveMatches from "../hooks/useLiveMatches";

// eslint-disable-next-line react/prop-types
export default function Timer({ selectedMatchId } = {}) {
  const { matches } = useLiveMatches({
    useInterval: true,
    from: "live banpick phase",
  });
  const [time, setTime] = useState(undefined);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!selectedMatchId || !matches.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId,
    );

    const { scoreboard: { duration } = {} } = selectedMatch || {};

    const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
    const seconds = String(parseInt(duration % 60, 10)).padStart(2, "0");

    if (mountedRef.current) {
      setTime(`${minutes}:${seconds}`);
    }

    return () => {
      mountedRef.current = false;
    };
  }, [selectedMatchId, matches]);

  return <Text>{time}</Text>;
}
