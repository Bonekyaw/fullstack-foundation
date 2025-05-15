import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import App from "./App.tsx";
import Help from "./pages/Help.tsx";
// import { LanguageProvider } from "./providers/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
