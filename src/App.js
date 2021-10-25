import { ColorThemeProvider } from "./components/wrappers/ColorThemeContext";
import TickerGallery from "./components/TickerGallery";

function App() {
  return (
    <>
      <ColorThemeProvider>
        <TickerGallery />
      </ColorThemeProvider>
    </>
  );
}

export default App;
