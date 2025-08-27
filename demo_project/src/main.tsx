// import React from "react";
import ReactDOM from "react-dom/client";
// import Practice from "./components/Practice";
// import App from "./App";
// import { ThemeProvider } from "./context/ThemeProvider";
// import Calculation from "./Calculation";
import App from "./App";
import Timer from "./components/Timer";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    {/* <ThemeProvider> */}
    {/* <App /> */}
    {/* <Calculation initialCount={0} initialOther={false} /> */}
    {/* </ThemeProvider> */}
    {/* <Practice /> */}
    <App />
    <br />
    <Timer />
  </>
);
