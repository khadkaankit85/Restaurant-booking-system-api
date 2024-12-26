import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserInfoContextProvider } from "./states/Contexts.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserInfoContextProvider>
      <App />
    </UserInfoContextProvider>
  </StrictMode>,
);
