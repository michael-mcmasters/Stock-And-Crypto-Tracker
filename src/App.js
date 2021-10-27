import { ColorThemeProvider } from "./components/wrappers/ColorThemeContext";
import TickersGrid from "./components/TickersGrid";

function App() {
  return (
    <>
      <ColorThemeProvider>
        <TickersGrid />
      </ColorThemeProvider>
    </>
  );
}

export default App;
