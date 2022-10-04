#! /usr/bin/env node
import {
  render, Box,
} from "ink";
import { useMemo, useState } from "react";
import AppContext from "./context/AppContext";
import MatchSelector from "./views/MatchSelector";

render(<App />);

function App() {
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const provideValue = useMemo(() => ({
    selectedMatchId,
    setSelectedMatchId,
  }), [selectedMatchId, setSelectedMatchId]);

  return (
    <AppContext.Provider value={provideValue}>
      <Box flexDirection="column">
        <MatchSelector />
      </Box>
    </AppContext.Provider>
  );
}
