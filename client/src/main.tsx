import { createRoot } from "react-dom/client";
import { AutumnProvider } from "autumn-js/react";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AutumnProvider
    backendUrl={import.meta.env.VITE_AUTUMN_BACKEND_URL || ""}
    includeCredentials={true}
  >
    <App />
  </AutumnProvider>
);
