import { useEffect, useRef, useState } from "react";
import { Box, Text, Newline } from "ink";
import useLiveMatches from "../hooks/useLiveMatches";
import useHeroes from "../hooks/useHeroes";

// eslint-disable-next-line react/prop-types
export default function LiveBanpickPhase({ selectedMatchId } = {}) {
  const { matches } = useLiveMatches({
    useInterval: true,
    from: "live banpick phase",
  });
  const heroes = useHeroes();
  const [rPicks, setRPicks] = useState([]);
  const [rBans, setRBans] = useState([]);
  const [dPicks, setDPicks] = useState([]);
  const [dBans, setDBans] = useState([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (!selectedMatchId || !matches.length) return;

    const selectedMatch = matches.find(
      (match) => match.match_id === selectedMatchId,
    );

    const { scoreboard } = selectedMatch || {};

    const { radiant, dire } = scoreboard || {};

    const { picks: _rPicks, bans: _rBans } = radiant || {};
    const { picks: _dPicks, bans: _dBans } = dire || {};

    if (mountedRef.current) {
      setRPicks(_rPicks);
      setRBans(_rBans);
      setDPicks(_dPicks);
      setDBans(_dBans);
    }

    return () => {
      mountedRef.current = false;
    };
  }, [matches]);

  return (
    <Box flexDirection="column">
      <Text>--- ban/pick ---</Text>
      <Box>
        <Box width="9%" paddingRight={1}>
          <Text />
        </Box>
        <Box width="45%">
          <Text>radiant</Text>
        </Box>
        <Box width="45%">
          <Text>dire</Text>
        </Box>
      </Box>
      <Box>
        <Box width="9%" paddingRight={1}>
          <Text>pick</Text>
        </Box>
        <Box flexDirection="column" width="45%">
          {rPicks
            && rPicks.map(({ hero_id }, idx) => (
              <Text key={hero_id}>
                {(heroes
                  && heroes
                    .find((hero) => hero.id === hero_id)
                    ?.name?.replace("npc_dota_hero_", ""))
                  || "unknown hero"}
                {idx === rPicks.length - 1 && <Newline />}
              </Text>
            ))}
        </Box>
        <Box flexDirection="column" width="45%">
          {dPicks
            && dPicks.map(({ hero_id }, idx) => (
              <Text key={hero_id}>
                {(heroes
                  && heroes
                    .find((hero) => hero.id === hero_id)
                    ?.name?.replace("npc_dota_hero_", ""))
                  || "unknown hero"}
                {idx === dPicks.length - 1 && <Newline />}
              </Text>
            ))}
        </Box>
      </Box>
      <Box>
        <Box width="9%" paddingRight={1}>
          <Text>ban</Text>
        </Box>
        <Box flexDirection="column" width="45%">
          {rBans
            && rBans.map(({ hero_id }, idx) => (
              <Text key={hero_id}>
                {(heroes
                  && heroes
                    .find((hero) => hero.id === hero_id)
                    ?.name?.replace("npc_dota_hero_", ""))
                  || "unknown hero"}
                {idx === rBans.length - 1 && <Newline />}
              </Text>
            ))}
        </Box>
        <Box flexDirection="column" width="45%">
          {dBans
            && dBans.map(({ hero_id }, idx) => (
              <Text key={hero_id}>
                {(heroes
                  && heroes
                    .find((hero) => hero.id === hero_id)
                    ?.name?.replace("npc_dota_hero_", ""))
                  || "unknown hero"}
                {idx === dBans.length - 1 && <Newline />}
              </Text>
            ))}
        </Box>
      </Box>
    </Box>
  );
}
