import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
console.log("Sentry chargé :", Sentry);
import App from "./App";
import './index.css'

Sentry.init({
  dsn: "https://523f2873f2fc4ef7a7e0b5174122b2bd@app.glitchtip.com/24496",
  tracesSampleRate: 0.01, // 1% of transactions — adjust to your needs
  autoSessionTracking: false, // GlitchTip does not support sessions
});

setTimeout(() => {
  try {
    throw new Error("Erreur test GlitchTip");
  } catch (e) {
    Sentry.captureException(e);
    console.log("Exception envoyée");
  }
}, 3000);

export default Sentry.withErrorBoundary(App, {
  fallback: <p>Une erreur est survenue</p>,
});

Sentry.captureMessage("Test GlitchTip au démarrage");
console.log("Message envoyé à GlitchTip");

Sentry.captureMessage("Application démarrée");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

