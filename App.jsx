#! /usr/bin/env node
import {
  render, Box,
} from "ink";
import { useMemo, useState } from "react";
import AppContext from "./context/AppContext";
import MatchSelector from "./views/MatchSelector";
import MatchDetails from "./views/MatchDetails";

render(<App />);

function App() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const value = useMemo(() => ({
    selectedMatch,
    setSelectedMatch,
  }), [selectedMatch, setSelectedMatch]);

  return (
    <AppContext.Provider value={value}>
      <Box flexDirection="column">
        { !selectedMatch && <MatchSelector /> }
        { selectedMatch && <MatchDetails /> }
      </Box>
    </AppContext.Provider>
  );
}
