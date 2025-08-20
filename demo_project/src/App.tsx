import React from "react";
import { useTheme } from "./context/useTheme";

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: theme === "light" ? "#ffffff" : "#222222",
        color: theme === "light" ? "#000000" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
      }}
    >
      <h1>React Context API with TypeScript</h1>
      <p>
        Current Theme: <b>{theme}</b>
      </p>
      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          background: theme === "light" ? "#333" : "#ddd",
          color: theme === "light" ? "#fff" : "#000",
          marginTop: "10px",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default App;
