// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, BrowserRouter } from "react-router-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootswatch/dist/darkly/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  // Change to HashRouter to resolve client-side routing issues because GitHub Pages only support static hosting
  <AuthProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthProvider>,
);
