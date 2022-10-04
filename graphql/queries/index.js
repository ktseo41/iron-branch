/* eslint-disable import/prefer-default-export */
export const LIVE_MATCHES = `#graphql
query {
  live {
    matches(
      request: {
        tiers: [UNSET, AMATEUR, PROFESSIONAL, MINOR, MAJOR, INTERNATIONAL, DPC_QUALIFIER, DPC_LEAGUE_QUALIFIER, DPC_LEAGUE, DPC_LEAGUE_FINALS]
        take: 20
      }
    ) {
      matchId
      radiantScore
      direScore
      delay
      buildingState
      gameTime
      gameState
      completed
      radiantTeam {
        name
      }
      direTeam {
        name
      }
      players {
        isRadiant
        numKills
        numDeaths
        numAssists
        numLastHits
        numDenies
        level
        networth
        respawnTimer
        ultimateCooldown
        hero {
          displayName
        }
      }
    }
  }
}`;
