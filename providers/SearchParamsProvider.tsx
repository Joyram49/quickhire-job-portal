/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  UrlFilters,
  useSearchUrlFilters,
} from "@/hooks/useSearchUrlFilters";

export type ParamsContextType = {
  params: UrlFilters;
  setFieldValue: <K extends keyof UrlFilters>(
    _field: K,
    _value: UrlFilters[K] | ((_prev: UrlFilters[K]) => UrlFilters[K]),
    _opts?: { resetPage?: boolean },
  ) => void;
  setMultipleFieldValues: (
    _patch: Partial<UrlFilters>,
    _opts?: { resetPage?: boolean },
  ) => void;
  resetParams: () => void;
  toggleArrayItem: (
    _key: "types" | "bedroom" | "bathroom",
    _item: string,
  ) => void;
};

const SearchParamsContext = createContext<ParamsContextType | undefined>(
  undefined,
);

export function SearchParamsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    filters,
    setFilter,
    setMultipleFilters,
    toggleFilterItem,
    resetFilters,
  } = useSearchUrlFilters();

  const setFieldValue = React.useCallback<ParamsContextType["setFieldValue"]>(
    (field, value) => {
      const next =
        typeof value === "function" ? (value as any)(filters[field]) : value;

      setFilter(field as any, next as any, { resetPage: field !== "page" });
    },
    [filters, setFilter],
  );

  const setMultipleFieldValues = React.useCallback<any>(
    (patch: any, opts: any) =>
      setMultipleFilters(patch, { resetPage: opts?.resetPage ?? true }),
    [setMultipleFilters],
  );

  const value: ParamsContextType = useMemo(
    () => ({
      params: filters,
      setFieldValue,
      setMultipleFieldValues,
      resetParams: resetFilters,
      toggleArrayItem: toggleFilterItem,
    }),
    [
      filters,
      setFieldValue,
      setMultipleFieldValues,
      resetFilters,
      toggleFilterItem,
    ],
  );

  return (
    <SearchParamsContext.Provider value={value}>
      {children}
    </SearchParamsContext.Provider>
  );
}

export function useSearchParamsContext() {
  const ctx = useContext(SearchParamsContext);
  if (!ctx)
    throw new Error(
      "useSearchParamsContext must be used within SearchParamsProvider",
    );
  return ctx;
}

