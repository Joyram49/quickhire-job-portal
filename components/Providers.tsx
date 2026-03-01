"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/api/api";
import { SearchParamsProvider } from "@/providers/SearchParamsProvider";
import { AuthProvider } from "@/providers/AuthProviders";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchParamsProvider>{children}</SearchParamsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
