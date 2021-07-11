import { ColorThemeProvider } from "./components/custom_hooks/ColorThemeContext";
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
