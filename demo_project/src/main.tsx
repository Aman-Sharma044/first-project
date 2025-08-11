import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Fetch from "./components/Fetch.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Fetch />
  </StrictMode>
);
