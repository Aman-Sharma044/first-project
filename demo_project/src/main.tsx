import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
// import Fetch from "./components/Fetch.tsx";
import Password from "./components/Password";
createRoot(document.getElementById("root")!).render(
  <>
    {/* <App />
    <Fetch /> */}
    <Password />
  </>
);
