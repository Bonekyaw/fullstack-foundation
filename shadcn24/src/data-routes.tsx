import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Detail from "./pages/Detail";
import Dashboard from "./pages/Dashboard";
import ProductLayout from "./components/layouts/product";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/about/*", Component: About },
  {
    Component: ProductLayout,
    children: [
      {
        path: "/products",
        Component: Dashboard,
        children: [
          { index: true, Component: Product },
          { path: ":pid/edit/:uid?", Component: Detail },
        ],
      },
    ],
  },
]);
