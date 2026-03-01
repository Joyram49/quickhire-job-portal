/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axiosClient";
import {
  QueryClient,
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

// export a shared query client instance that can be used in _app or layout
export const queryClient = new QueryClient();

// simple helpers to hit the backend and unwrap `data` property
const request = {
  get: <T>(url: string, config?: any) =>
    axiosClient.get<T>(url, config).then((r) => r.data),
  post: <T>(url: string, body?: any, config?: any) =>
    axiosClient.post<T>(url, body, config).then((r) => r.data),
  put: <T>(url: string, body?: any, config?: any) =>
    axiosClient.put<T>(url, body, config).then((r) => r.data),
  delete: <T>(url: string, config?: any) =>
    axiosClient.delete<T>(url, config).then((r) => r.data),
};

// convenience wrappers around react-query hooks
export function useApiQuery<TData = unknown, TError = unknown>(
  key: readonly unknown[],
  url: string,
  options?: UseQueryOptions<TData, TError>
) {
  return useQuery<TData, TError>({ queryKey: key, queryFn: () => Promise.resolve(request.get<TData>(url)), ...options });
}

export function useApiMutation<TData = unknown, TError = unknown, TVariables = void>(
  url: string,
  method: "post" | "put" | "delete" = "post",
  options?: UseMutationOptions<TData, TError, TVariables>
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: (body: any) => Promise.resolve(request[method]<TData>(url, body)),
    ...options
  });
}

export default request;
