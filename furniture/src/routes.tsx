import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/pages/RootLayout";
import HomePage from "@/pages/Home";
import ContactPage from "@/pages/Contact";
import ErrorPage from "./pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);
