import api, { authApi } from "@/api";
import useAuthStore, { Status } from "@/store/authStore";
import { redirect } from "react-router";

export const homeLoader = async () => {
  try {
    const products = await api.get("users/products?limit=8");
    const posts = await api.get("users/posts/infinite?limit=3");

    // const [products, posts] = await Promise.all([
    //   api.get("users/products?limit=8"),
    //   api.get("users/posts/infinite?limit=3"),
    // ]);

    return { productsData: products.data, postsData: posts.data };
  } catch (error) {
    console.log("HomeLoader error:", error);
  }
};

export const loginLoader = async () => {
  try {
    const response = await authApi.get("auth-check");
    if (response.status !== 200) {
      return null;
    }
    return redirect("/");
  } catch (error) {
    console.log("Loader error:", error);
  }
};

export const otpLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.otp) {
    return redirect("/register");
  }

  return null;
};

export const confirmLoader = async () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== Status.confirm) {
    return redirect("/register");
  }

  return null;
};
