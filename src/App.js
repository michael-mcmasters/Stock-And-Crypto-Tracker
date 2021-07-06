import { ColorThemeProvider } from "./components/custom_hooks/ColorThemeContext";
import CoinGallery from "./components/CoinGallery";
import Button from "./components/Button";

function App() {
  return (
    <>
      <ColorThemeProvider>
        <CoinGallery />
        <CoinGallery />
        <CoinGallery />
        <Button />
      </ColorThemeProvider>
    </>
  );
}

export default App;
