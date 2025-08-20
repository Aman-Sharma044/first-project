import { useContext } from "react";
import { ThemeContext } from "./ThemeContext"; // value import
import type { ThemeContextType } from "./ThemeContext"; // type import

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
