import { authApi } from "@/api";
import {
  postInfiniteQuery,
  postQuery,
  productQuery,
  queryClient,
  onePostQuery,
} from "@/api/query";
import useAuthStore, { Status } from "@/store/authStore";
import { redirect, LoaderFunctionArgs } from "react-router";

// export const homeLoader = async () => {
//   try {
//     const products = await api.get("users/products?limit=8");
//     const posts = await api.get("users/posts/infinite?limit=3");

//     // const [products, posts] = await Promise.all([
//     //   api.get("users/products?limit=8"),
//     //   api.get("users/posts/infinite?limit=3"),
//     // ]);

//     return { productsData: products.data, postsData: posts.data };
//   } catch (error) {
//     console.log("HomeLoader error:", error);
//   }
// };

export const homeLoader = async () => {
  await queryClient.ensureQueryData(productQuery("?limit=8"));
  await queryClient.ensureQueryData(postQuery("?limit=3"));
  return null;
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

// 1. Login success  -->  loader (fetching data)  -->  Home Screen
// 2. Login success  -->  Home Screen  -->  useQuery (cache after fetch)
// 3. Login success  -->  loader (cache after fetch) --> Home screen

export const blogInfiniteLoader = async () => {
  await queryClient.ensureInfiniteQueryData(postInfiniteQuery());
  return null;
};

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.postId) {
    throw new Error("No Post ID provided");
  }
  await queryClient.ensureQueryData(postQuery("?limit=6"));
  await queryClient.ensureQueryData(onePostQuery(Number(params.postId)));
  return { postId: params.postId };
};
