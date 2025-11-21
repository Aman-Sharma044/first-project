import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Pass from "./Pass";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <QueryClientProvider client={queryClient}>
  <StrictMode>
    <Pass />
  </StrictMode>
  // </QueryClientProvider>
);
