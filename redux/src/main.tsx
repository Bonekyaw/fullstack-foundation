import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import App from "./pages/App.tsx";
import { store } from "./store/index.ts";
import PostDetailPage from "./pages/PostDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path=":pid" element={<PostDetailPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
