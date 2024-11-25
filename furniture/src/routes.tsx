import { lazy, Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/pages/RootLayout";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ErrorPage from "@/pages/Error";
// import BlogRootLayout from "@/pages/blogs/BlogRootLayout";
// import BlogPage from "@/pages/blogs/Blog";
// import BlogDetailPage from "@/pages/blogs/BlogDetail";
const BlogRootLayout = lazy(() => import("@/pages/blogs/BlogRootLayout"));
const BlogPage = lazy(() => import("@/pages/blogs/Blog"));
const BlogDetailPage = lazy(() => import("@/pages/blogs/BlogDetail"));

import ProductRootLayout from "@/pages/products/ProductRootLayout";
import ProductPage from "@/pages/products/Product";
import ProductDetailPage from "@/pages/products/ProductDetail";

const SuspenseFallback = () => <div className="text-center">Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <BlogRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<SuspenseFallback />}>
                <BlogPage />
              </Suspense>
            ),
          },
          {
            path: ":postId",
            element: (
              <Suspense fallback={<SuspenseFallback />}>
                <BlogDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "products",
        element: <ProductRootLayout />,
        children: [
          { index: true, element: <ProductPage /> },
          { path: ":productId", element: <ProductDetailPage /> },
        ],
      },
    ],
  },
]);
