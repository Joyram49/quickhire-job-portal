/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type UrlFilters = {
  searchTerm: string;
  page: number;
  limit: number;
  status: string;
  category: string;
  location: string;
} & Record<string, any>;

const DEFAULTS: UrlFilters = {
  searchTerm: "",
  page: 1,
  limit: 10,
  status: "",
  category: "",
  location: "",
};

function isClient() {
  return typeof window !== "undefined";
}

function joinByComma(arr: string[] | undefined): string | undefined {
  if (!arr || arr.length === 0) return undefined;
  return arr.join(",");
}

function toInt(v: string | null, fallback: number): number {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function useSearchUrlFilters() {
  const searchParams = useSearchParams();

  const filters: UrlFilters = useMemo(() => {
    const searchTerm = searchParams.get("searchTerm") || DEFAULTS.searchTerm;

    const page = toInt(searchParams.get("page"), DEFAULTS.page);
    const limit = toInt(searchParams.get("limit"), DEFAULTS.limit);

    const status = searchParams.get("status") || DEFAULTS.status;
    const category = searchParams.get("category") || DEFAULTS.category;
    const location = searchParams.get("location") || DEFAULTS.location;

    return {
      searchTerm,
      page,
      limit,
      status,
      category,
      location,
    };
  }, [searchParams]);

  const replaceParams = useCallback(
    (patch: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v === undefined || v === "") next.delete(k);
        else next.set(k, v);
      });

      if (isClient()) {
        window?.history?.replaceState(null, "", `?${next.toString()}`);
      }
    },
    [searchParams],
  );

  const replaceParamsWithResetPage = useCallback(
    (patch: Record<string, string | undefined>) => {
      replaceParams({ ...patch, page: "1" });
    },
    [replaceParams],
  );

  const setFilter = useCallback(
    (
      key: keyof UrlFilters,
      value: string | number | null | string[],
      opts?: { resetPage?: boolean },
    ) => {
      const patch: Record<string, string | undefined> = {};

      switch (key) {
        case "page":
        case "limit":
          patch[key] = String(value);
          break;
        default:
          patch[key] = (value as string) || undefined;
      }

      if (opts?.resetPage) replaceParamsWithResetPage(patch);
      else replaceParams(patch);
    },
    [replaceParams, replaceParamsWithResetPage],
  );

  const setMultipleFilters = useCallback(
    (patchObj: Partial<UrlFilters>, opts?: { resetPage?: boolean }) => {
      const patch: Record<string, string | undefined> = {};

      for (const [k, v] of Object.entries(patchObj)) {
        if (v === null || v === undefined) {
          patch[k] = undefined;
        } else if (Array.isArray(v)) {
          patch[k] = v.join(",");
        } else if (typeof v === "number") {
          patch[k] = String(v);
        } else {
          patch[k] = v as string;
        }
      }

      if (opts?.resetPage) {
        replaceParamsWithResetPage(patch);
      } else {
        replaceParams(patch);
      }
    },
    [replaceParams, replaceParamsWithResetPage],
  );

  const toggleFilterItem = useCallback(
    (key: "types" | "bedroom" | "bathroom", item: string) => {
      const current = (filters[key] as string[]) || [];
      const next = current.includes(item)
        ? current.filter((x) => x !== item)
        : [...current, item];

      replaceParamsWithResetPage({ [key]: joinByComma(next) });
    },
    [filters, replaceParamsWithResetPage],
  );

  const resetFilters = useCallback(() => {
    const sp = new URLSearchParams();

    sp.set("limit", String(DEFAULTS.limit));
    sp.set("page", String(DEFAULTS.page));

    if (isClient()) {
      window?.history?.replaceState(null, "", `?${sp.toString()}`);
    }
  }, []);

  return {
    filters,
    setFilter,
    setMultipleFilters,
    toggleFilterItem,
    resetFilters,
  } as const;
}

