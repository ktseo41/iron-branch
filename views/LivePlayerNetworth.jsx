import { useEffect, useState } from "react";
import { Box, Text } from "ink";
import useLiveCurrentMatch from "../hooks/useLiveCurrentMatch";
import useCleanUp from "../hooks/useCleanUp";

// eslint-disable-next-line react/prop-types
export default function LivePlayerNetworth() {
  const { currentMatch } = useLiveCurrentMatch();
  const [sortedPlayerNetworths, setSortedPlayerNetworths] = useState([]);
  const mountedRef = useCleanUp();

  useEffect(() => {
    if (!currentMatch) return;

    const { players = [] } = currentMatch || {};

    const sortedByNetWorth = players.sort((a, b) => b.networth - a.networth);

    if (mountedRef.current) {
      setSortedPlayerNetworths(sortedByNetWorth);
    }
  }, [currentMatch]);

  return (
    <Box flexDirection="column">
      {sortedPlayerNetworths.map(
        ({
          steamAccount: {
            name,
          },
          isRadiant,
          hero: {
            displayName,
          },
          networth,
          respawnTimer,
          numKills,
          numDeaths,
          numAssists,
        }) => (
          <Text key={name} dimColor={respawnTimer}>
            [
            <Text>{isRadiant ? "R" : "D" }</Text>
            ]
            {" "}
            {networth}
            {" "}
            {`(${numKills}/${numDeaths}/${numAssists})`}
            {" "}
            ||
            {" "}
            {displayName}
            {" "}
            ||
            {" "}
            {name}
            {
              respawnTimer && (
                <>
                  {" "}
                  || Respawn in
                  {" "}
                  {respawnTimer}
                </>
              )
            }
          </Text>
        ),
      )}
    </Box>
  );
}
