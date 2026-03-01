import { envConfig } from "@/config/envConfig";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import type { LoginInput, SignupInput } from "@/lib/zod/auth.validation";

export interface UserResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    // Optional JWT if backend decides to return it
    token?: string;
  };
  message?: string;
}

const AUTH_BASE_URL = `${envConfig.backendBaseUrl}/auth`;
const ACCESS_TOKEN_KEY = "access_token";

// ---------------- Cookie helpers ----------------

export const setAccessToken = (accessToken: string) => {
  setCookie(ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
    sameSite: "lax",
    secure: !envConfig.isDevlopment,
  });
};

export const getAccessToken = () => {
  return getCookie(ACCESS_TOKEN_KEY) as string | undefined;
};

export const clearTokens = (): void => {
  deleteCookie(ACCESS_TOKEN_KEY);
};

// ---------------- Auth actions ----------------

export const signup = async (payload: SignupInput): Promise<UserResponse> => {
  const res = await fetch(`${AUTH_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const result: UserResponse = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Signup failed");
  }

  // If backend returns token, persist a JS-accessible copy
  if (result.data?.token) {
    setAccessToken(result.data.token);
  }

  return result;
};

export const login = async (payload: LoginInput): Promise<UserResponse> => {
  const res = await fetch(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const result: UserResponse = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Login failed");
  }

  if (result.data?.token) {
    setAccessToken(result.data.token);
  }

  return result;
};

export const logout = async (): Promise<void> => {
  try {
    await fetch(`${AUTH_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  } finally {
    clearTokens();
  }
};

export const getMe = async (): Promise<UserResponse> => {
  const res = await fetch(`${AUTH_BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  const result: UserResponse = await res.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch user");
  }

  return result;
};
