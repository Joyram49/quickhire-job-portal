import { useMutation } from "@tanstack/react-query";
import { SignupInput, LoginInput } from "@/lib/zod/auth.validation";
import { signup, login, logout, type UserResponse } from "./authService";

// convenience hooks for auth-related mutations
export function useSignup() {
  return useMutation<UserResponse, Error, SignupInput>({
    mutationFn: (payload: SignupInput) => signup(payload),
  });
}

export function useLogin() {
  return useMutation<UserResponse, Error, LoginInput>({
    mutationFn: (payload: LoginInput) => login(payload),
  });
}

export function useLogout() {
  return useMutation<void, Error, void>({
    mutationFn: () => logout(),
  });
}
