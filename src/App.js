import { ColorThemeProvider } from "./components/custom_hooks/ColorThemeContext";
import CoinGallery from "./components/CoinGallery";

function App() {
  return (
    <>
      <ColorThemeProvider>
        <CoinGallery />
        {/* <CoinGallery /> */}
        {/* <CoinGallery /> */}
      </ColorThemeProvider>
    </>
  );
}

export default App;
