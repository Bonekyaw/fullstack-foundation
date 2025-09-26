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
    element: <RootLayout />, // Component: RootLayout
    errorElement: <ErrorPage />, // ErrorBoundary: ErrorPage
    children: [
      {
        index: true,
        element: <HomePage />, // Component: HomePage
        loader: homeLoader,
      },
      {
        path: "about",
        element: <AboutPage />, // Component: AboutPage
      },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <BlogRootLayout />
          </Suspense>
        ),
        // lazy: {
        //   Component: async () =>
        //     (await import("@/pages/blogs/BlogRootLayout")).default,
        // },
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
            // Component: BlogPage
            loader: blogInfiniteLoader,
            // lazy: {
            //   loader: async () => (await import("@/router/loader")).blogInfiniteLoader,
            //   Component: async () =>
            //     (await import("@/pages/blogs/Blog")).default,
            // },
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
            // Component: BlogDetailPage
            loader: postLoader,
          },
        ],
      },
      {
        path: "products",
        element: <ProductRootLayout />, // Component: ProductRootLayout
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
            // Component: ProductPage
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
            // Component: ProductDetailPage
            loader: productLoader,
            action: favouriteAction,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />, // Component: LoginPage
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/register",
    element: <AuthRootLayout />, // Component: AuthRootLayout
    children: [
      {
        index: true,
        element: <SignUpPage />, // Component: SignUpPage
        loader: loginLoader,
        action: registerAction,
      },
      {
        path: "otp",
        element: <OtpPage />, // Component: OtpPage
        loader: otpLoader,
        action: otpAction,
      },
      {
        path: "confirm-password",
        element: <ConfirmPasswordPage />, // Component: ConfirmPasswordPage
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
    element: <AuthRootLayout />, // Component: AuthRootLayout
    children: [
      {
        index: true,
        element: <ResetPasswordPage />, // Component: ResetPasswordPage
        action: resetAction,
      },
      {
        path: "verify",
        element: <VerifyOtpPage />, // Component: VerifyOtpPage
        loader: verifyLoader,
        action: verifyAction,
      },
      {
        path: "new-password",
        element: <NewPasswordPage />, // Component: NewPasswordPage
        loader: newPasswordLoader,
        action: newPasswordAction,
      },
    ],
  },
]);
