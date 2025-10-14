// import { Suspense } from "react";

import { createBrowserRouter, redirect } from "react-router";

import RootLayout from "@/pages/RootLayout";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ErrorPage from "@/pages/Error";
// import BlogRootLayout from "@/pages/blogs/BlogRootLayout";
// import BlogPage from "@/pages/blogs/Blog";
// import BlogDetailPage from "@/pages/blogs/BlogDetail";
// const BlogRootLayout = lazy(() => import("@/pages/blogs/BlogRootLayout"));
// const BlogPage = lazy(() => import("@/pages/blogs/Blog"));
// const BlogDetailPage = lazy(() => import("@/pages/blogs/BlogDetail"));

import ProductRootLayout from "@/pages/products/ProductRootLayout";
import ProductPage from "@/pages/products/Product";
import ProductDetailPage from "@/pages/products/ProductDetail";
import LoginPage from "@/pages/auth/Login";

import {
  blogInfiniteLoader,
  confirmLoader,
  homeLoader,
  loginLoader,
  newPasswordLoader,
  otpLoader,
  postLoader,
  productInfiniteLoader,
  productLoader,
  verifyLoader,
} from "@/router/loader";
import {
  confirmAction,
  favouriteAction,
  loginAction,
  logoutAction,
  newPasswordAction,
  otpAction,
  registerAction,
  resetAction,
  verifyAction,
} from "@/router/action";
import AuthRootLayout from "@/pages/auth/AuthRootLayout";
import SignUpPage from "@/pages/auth/SignUp";
import OtpPage from "@/pages/auth/Otp";
import ConfirmPasswordPage from "@/pages/auth/ConfirmPassword";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import VerifyOtpPage from "@/pages/auth/VerifyOtp";
import NewPasswordPage from "@/pages/auth/NewPassword";
// const SuspenseFallback = () => <div className="text-center">Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <RootLayout />, // For react-router v6 & v7 declarative mode
    Component: RootLayout, // For react-router v7 data mode
    errorElement: <ErrorPage />, // ErrorBoundary: ErrorPage
    children: [
      {
        index: true,
        // element: <HomePage />, // For react-router v6 & v7 declarative mode
        Component: HomePage, // For react-router v7 data mode
        loader: homeLoader,
      },
      {
        path: "about",
        // element: <AboutPage />, // For react-router v6 & v7 declarative mode
        Component: AboutPage, // For react-router v7 data mode
      },
      {
        // For react-router v6 & v7 declarative mode
        // path: "blogs",
        // element: (
        //   <Suspense fallback={<div className="text-center">Loading...</div>}>
        //     <BlogRootLayout />
        //   </Suspense>
        // ),

        // Lazy Loading - For react-router v7 data mode
        path: "blogs",
        lazy: async () => {
          const mod = await import("@/pages/blogs/BlogRootLayout");
          return { Component: mod.default };
        },
        children: [
          {
            index: true,

            // For react-router v6 & v7 declarative mode
            // element: (
            //   <Suspense
            //     fallback={<div className="text-center">Loading...</div>}
            //   >
            //     <BlogPage />
            //   </Suspense>
            // ),

            // For react-router v7 data mode
            // Component: BlogPage
            // loader: blogInfiniteLoader,

            // Lazy Loading - For react-router v7 data mode
            lazy: async () => {
              const mod = await import("@/pages/blogs/Blog");
              // const { blogInfiniteLoader } = await import("@/router/loader");
              return { Component: mod.default, loader: blogInfiniteLoader };
            },
          },
          {
            // For react-router v6 & v7 declarative mode
            // path: ":postId",
            // element: (
            //   <Suspense
            //     fallback={<div className="text-center">Loading...</div>}
            //   >
            //     <BlogDetailPage />
            //   </Suspense>
            // ),

            // For react-router v7 data mode
            // Component: BlogDetailPage
            // loader: postLoader,

            // Lazy Loading - For react-router v7 data mode
            path: ":postId",
            lazy: async () => {
              const mod = await import("@/pages/blogs/BlogDetail");
              // const { postLoader } = await import("@/router/loader");
              return { Component: mod.default, loader: postLoader };
            },
          },
        ],
      },
      {
        path: "products",
        // element: <ProductRootLayout />, // For react-router v6 & v7 declarative mode
        Component: ProductRootLayout, // For react-router v7 data mode
        children: [
          {
            index: true,
            // For react-router v6 & v7 declarative mode
            // element: (
            //   <Suspense
            //     fallback={<div className="text-center">Loading...</div>}
            //   >
            //     <ProductPage />
            //   </Suspense>
            // ),
            Component: ProductPage, // For react-router v7 data mode
            loader: productInfiniteLoader,
          },
          {
            path: ":productId",
            // For react-router v6 & v7 declarative mode
            // element: (
            //   <Suspense
            //     fallback={<div className="text-center">Loading...</div>}
            //   >
            //     <ProductDetailPage />
            //   </Suspense>
            // ),
            Component: ProductDetailPage, // For react-router v7 data mode
            loader: productLoader,
            action: favouriteAction,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    // element: <LoginPage />, // For react-router v6 & v7 declarative mode
    Component: LoginPage, // For react-router v7 data mode
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/register",
    // element: <AuthRootLayout />, // For react-router v6 & v7 declarative mode
    Component: AuthRootLayout, // For react-router v7 data mode
    children: [
      {
        index: true,
        // element: <SignUpPage />, // For react-router v6 & v7 declarative mode
        Component: SignUpPage, // For react-router v7 data mode
        loader: loginLoader,
        action: registerAction,
      },
      {
        path: "otp",
        // element: <OtpPage />, // For react-router v6 & v7 declarative mode
        Component: OtpPage, // For react-router v7 data mode
        loader: otpLoader,
        action: otpAction,
      },
      {
        path: "confirm-password",
        // element: <ConfirmPasswordPage />, // For react-router v6 & v7 declarative mode
        Component: ConfirmPasswordPage, // For react-router v7 data mode
        loader: confirmLoader,
        action: confirmAction,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
  {
    path: "/reset",
    // element: <AuthRootLayout />, // For react-router v6 & v7 declarative mode
    Component: AuthRootLayout, // For react-router v7 data mode
    children: [
      {
        index: true,
        // element: <ResetPasswordPage />, // For react-router v6 & v7 declarative mode
        Component: ResetPasswordPage, // For react-router v7 data mode
        action: resetAction,
      },
      {
        path: "verify",
        // element: <VerifyOtpPage />, // For react-router v6 & v7 declarative mode
        Component: VerifyOtpPage, // For react-router v7 data mode
        loader: verifyLoader,
        action: verifyAction,
      },
      {
        path: "new-password",
        // element: <NewPasswordPage />, // For react-router v6 & v7 declarative mode
        Component: NewPasswordPage, // For react-router v7 data mode
        loader: newPasswordLoader,
        action: newPasswordAction,
      },
    ],
  },
]);
