import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Account from "./components/account/Account.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Account />
  </StrictMode>,
);
