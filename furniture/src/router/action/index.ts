import { redirect, ActionFunctionArgs } from "react-router";
import { AxiosError } from "axios";

import api, { authApi } from "@/api";
import useAuthStore, { Status } from "@/store/authStore";
import { queryClient } from "@/api/query";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  // const authData = {
  //   phone: formData.get("phone"),
  //   password: formData.get("password"),
  // };

  try {
    const response = await authApi.post("login", credentials);

    if (response.status !== 200) {
      return { error: response.data || "Login Failed!" };
    }

    // await fetch(import.meta.env.VITE_API_URL + "login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(credentials),
    //   credentials: "include",
    // });

    const redirectTo = new URL(request.url).searchParams.get("redirect") || "/";
    return redirect(redirectTo);
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Login Failed!" };
    } else throw error;
  }
};

export const logoutAction = async () => {
  try {
    await api.post("logout");
    return redirect("/login");
  } catch (error) {
    console.error("logout failed!", error);
  }
};

export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await authApi.post("register", credentials);

    if (response.status !== 200) {
      return { error: response.data || "Sending OTP failed!" };
    }

    authStore.setAuth(response.data.phone, response.data.token, Status.otp);

    return redirect("/register/otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Sending OTP failed!" };
    } else throw error;
  }
};

export const otpAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();

  const credentials = {
    phone: authStore.phone,
    otp: formData.get("otp"),
    token: authStore.token,
  };

  try {
    const response = await authApi.post("verify-otp", credentials);

    if (response.status !== 200) {
      return { error: response.data || "Verifying OTP failed!" };
    }

    authStore.setAuth(response.data.phone, response.data.token, Status.confirm);

    return redirect("/register/confirm-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Verifying OTP failed!" };
    } else throw error;
  }
};

export const confirmAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();

  const credentials = {
    phone: authStore.phone,
    password: formData.get("password"),
    token: authStore.token,
  };

  try {
    const response = await authApi.post("confirm-password", credentials);

    if (response.status !== 201) {
      return { error: response.data || "Registration failed!" };
    }

    authStore.clearAuth();

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Registration failed!" };
    } else throw error;
  }
};

export const favouriteAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  if (!params.productId) {
    throw new Error("No Product ID provided");
  }

  const data = {
    productId: Number(params.productId),
    favourite: formData.get("favourite") === "true", // true
  };

  try {
    const response = await api.patch("users/products/toggle-favourite", data);
    if (response.status !== 200) {
      return { error: response.data || "Setting favourite Failed!" };
    }

    await queryClient.invalidateQueries({
      queryKey: ["products", "detail", params.productId],
    });

    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { error: "Setting favourite failed!" };
    } else throw error;
  }
};
