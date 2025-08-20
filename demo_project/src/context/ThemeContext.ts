import { createContext } from "react";

// Define the shape of context
export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Create Context with default value undefined
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
