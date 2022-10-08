/* eslint-disable import/prefer-default-export */
export const LIVE_MATCHES = `#graphql
query {
  live {
    matches(
      request: {
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
        steamAccount {
          id,
          name,
        },
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
      },
      playbackData {
        pickBans {
          isPick,
          isRadiant,
          order,
          heroId,
          bannedHeroId
        }
      }
    }
  }
}`;
