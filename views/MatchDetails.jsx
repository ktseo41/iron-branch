import { Text } from "ink";
import useLiveCurrentMatch from "../hooks/useLiveCurrentMatch";
import { GAME_STATE } from "../constants";
import LiveBanpickPhase from "./LiveBanpickPhase";
import LivePlayerNetworth from "./LivePlayerNetworth";

export default function MatchDetails() {
  const { currentMatch } = useLiveCurrentMatch();

  return (
    <>
      {/* <Scoreboard /> */}
      { !currentMatch ? (<Text>loading...</Text>) : (
        <>
          {currentMatch.gameState !== GAME_STATE.GAME_IN_PROGRESS && <LiveBanpickPhase />}
          {currentMatch.gameState === GAME_STATE.GAME_IN_PROGRESS && <LivePlayerNetworth />}
        </>
      )}
    </>
  );
}
