import { redirect, ActionFunctionArgs } from "react-router";
import { AxiosError } from "axios";

import api, { authApi } from "@/api";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const authData = {
    phone: formData.get("phone"),
    password: formData.get("password"),
  };

  try {
    const response = await authApi.post("login", authData);

    if (response.status !== 200) {
      return { error: response.data || "Login Failed!" };
    }

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
