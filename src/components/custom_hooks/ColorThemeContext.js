import React, { createContext, useState } from "react";

export const COLORS = {
  lightMode: {
    blue: "#00E8C5",
    green: "#689557",
    purple: "#9942B6",
    yellow: "#E9D466",
    black: "#23262E",
    white: "#C6C6C6"
  },
  darkMode: {
    blue: "#00E8C5",
    green: "#689557",
    purple: "#9942B6",
    yellow: "#E9D466",
    black: "#23262E",
    white: "#C6C6C6"
  },
};

export const ColorThemeContext = createContext();
export const SetColorThemeContext = createContext();

export function ColorThemeProvider({ children }) {
  const [colorTheme, setColorTheme] = useState(COLORS.lightMode);

  function handleToggleColorTheme() {
    if (colorTheme === COLORS.lightMode) {
      setColorTheme(COLORS.darkMode);
    } else {
      setColorTheme(COLORS.lightMode);
    }
  }

  return (
    <ColorThemeContext.Provider value={colorTheme}>
      <SetColorThemeContext.Provider value={handleToggleColorTheme}>
        {children}
      </SetColorThemeContext.Provider>
    </ColorThemeContext.Provider>
  );
}