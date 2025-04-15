import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Detail from "./pages/Detail";
import Dashboard from "./pages/Dashboard";
import ProductLayout from "./components/layouts/product";

export default function RouteList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about/*" element={<About />} />
        <Route element={<ProductLayout />}>
          <Route path="products" element={<Dashboard />}>
            <Route index element={<Product />} />
            <Route path=":pid/edit/:uid?" element={<Detail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
