import React, { useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  ch: ReactNode;
}

// Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ ch }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((pr) => (pr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {ch}
    </ThemeContext.Provider>
  );
};
