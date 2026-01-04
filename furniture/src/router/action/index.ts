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
    await authApi.post("login", credentials);

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
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
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
    authStore.setAuth(response.data.phone, response.data.token, Status.otp);

    return redirect("/register/otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
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
    authStore.setAuth(response.data.phone, response.data.token, Status.confirm);

    return redirect("/register/confirm-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
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
    await authApi.post("confirm-password", credentials);
    authStore.clearAuth();

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
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
    await api.patch("users/products/toggle-favourite", data);

    await queryClient.invalidateQueries({
      queryKey: ["products", "detail", params.productId],
    });

    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
  }
};

export const resetAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await authApi.post("forget-password", credentials);

    authStore.setAuth(response.data.phone, response.data.token, Status.verify);

    return redirect("/reset/verify");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
  }
};

export const verifyAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();

  const credentials = {
    phone: authStore.phone,
    otp: formData.get("otp"),
    token: authStore.token,
  };

  try {
    const response = await authApi.post("verify", credentials);
    authStore.setAuth(response.data.phone, response.data.token, Status.reset);

    return redirect("/reset/new-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
  }
};

export const newPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();

  const credentials = {
    phone: authStore.phone,
    password: formData.get("password"),
    token: authStore.token,
  };

  try {
    await authApi.post("reset-password", credentials);

    authStore.clearAuth();

    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { error: error.response.data.message };
      }
    }
  }
};
