import { createRoot } from "react-dom/client";
import { AutumnProvider } from "autumn-js/react";
import App from "./App";
import "./index.css";

// Get backend URL - use current origin if not specified
const backendUrl = import.meta.env.VITE_AUTUMN_BACKEND_URL || "";

createRoot(document.getElementById("root")!).render(
  <AutumnProvider
    backendUrl={backendUrl}
    includeCredentials={true}
  >
    <App />
  </AutumnProvider>
);
