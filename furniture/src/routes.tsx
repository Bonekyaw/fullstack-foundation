import { Suspense } from "react";

import { createBrowserRouter, redirect } from "react-router";

import RootLayout from "@/pages/RootLayout";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ErrorPage from "@/pages/Error";
import BlogRootLayout from "@/pages/blogs/BlogRootLayout";
import BlogPage from "@/pages/blogs/Blog";
import BlogDetailPage from "@/pages/blogs/BlogDetail";
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
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      { path: "about", element: <AboutPage /> },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <BlogRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={<div className="text-center">Loading...</div>}
              >
                <BlogPage />
              </Suspense>
            ),
            loader: blogInfiniteLoader,
          },
          {
            path: ":postId",
            element: (
              <Suspense
                fallback={<div className="text-center">Loading...</div>}
              >
                <BlogDetailPage />
              </Suspense>
            ),
            loader: postLoader,
          },
        ],
      },
      {
        path: "products",
        element: <ProductRootLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={<div className="text-center">Loading...</div>}
              >
                <ProductPage />
              </Suspense>
            ),
            loader: productInfiniteLoader,
          },
          {
            path: ":productId",
            element: (
              <Suspense
                fallback={<div className="text-center">Loading...</div>}
              >
                <ProductDetailPage />
              </Suspense>
            ),
            loader: productLoader,
            action: favouriteAction,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/register",
    element: <AuthRootLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />,
        loader: loginLoader,
        action: registerAction,
      },
      {
        path: "otp",
        element: <OtpPage />,
        loader: otpLoader,
        action: otpAction,
      },
      {
        path: "confirm-password",
        element: <ConfirmPasswordPage />,
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
    element: <AuthRootLayout />,
    children: [
      {
        index: true,
        element: <ResetPasswordPage />,
        action: resetAction,
      },
      {
        path: "verify",
        element: <VerifyOtpPage />,
        loader: verifyLoader,
        action: verifyAction,
      },
      {
        path: "new-password",
        element: <NewPasswordPage />,
        loader: newPasswordLoader,
        action: newPasswordAction,
      },
    ],
  },
]);
