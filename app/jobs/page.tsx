"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPinIcon, SearchIcon } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSearchParamsContext } from "@/providers/SearchParamsProvider";
import { useFilteredJobs } from "@/services/jobs";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";

const CATEGORY_OPTIONS = [
  "Design",
  "Marketing",
  "Business",
  "Technology",
  "Engineering",
  "Finance",
  "Sales",
  "Human Resource",
];

export default function JobsPage() {
  const { params, setFieldValue, resetParams } = useSearchParamsContext();
  const { searchTerm, category, location, page, limit } = params;
  const [searchInput, setSearchInput] = useState(searchTerm ?? "");

  const {
    data: jobs = [],
    isLoading,
    isError,
    refetch,
  } = useFilteredJobs({
    searchTerm: searchTerm || undefined,
    category: category || undefined,
    location: location || undefined,
  });

  const debouncedSearch = useDebounce(searchInput, 400);

  // Sync debounced value → URL params
  useEffect(() => {
    setFieldValue("searchTerm", debouncedSearch, { resetPage: true });
  }, [debouncedSearch, setFieldValue]);

  // Keep local input in sync if params are reset externally (e.g. Clear button)
  useEffect(() => {
    queueMicrotask(() => setSearchInput(searchTerm ?? ""));
  }, [searchTerm]);

  const uniqueLocations = useMemo(() => {
    const locations = jobs
      .map((job) => job.location)
      .filter(
        (loc): loc is string => typeof loc === "string" && loc.trim() !== "",
      )
      .map((loc) => loc.trim());

    return [...new Set(locations)];
  }, [jobs]);

  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;
  const totalJobs = jobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / safeLimit));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * safeLimit;
  const endIndex = startIndex + safeLimit;
  const paginatedJobs = jobs.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setFieldValue("page", currentPage - 1, { resetPage: false });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setFieldValue("page", currentPage + 1, { resetPage: false });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="pb-16">
        <section className="border-b border-[#D6DDEB] bg-[#F8F8FD] py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-11">
            <div>
              <p className="font-epilogue text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Job Listings
              </p>
              <h1 className="mt-2 font-clash-display text-3xl font-semibold text-secondary md:text-4xl">
                Find your next role
              </h1>
              <p className="mt-2 max-w-2xl font-epilogue text-sm text-[#7C8493]">
                Browse open opportunities and filter by role, category, and
                location to match your career goals.
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-none border border-[#D6DDEB] bg-white p-4 md:flex-row md:items-center md:gap-3">
              <div className="flex flex-1 items-center gap-3 border-b border-[#D6DDEB] pb-2 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                <SearchIcon className="mt-1 h-5 w-5 text-secondary" />
                <Input
                  id="search"
                  placeholder="Job title, company, or keyword"
                  className="h-10 border-0 px-0 font-epilogue text-sm text-muted placeholder:text-[#7C8493] placeholder:opacity-60 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              <div className="flex flex-1 items-center gap-3 border-b border-[#D6DDEB] pb-2 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                <MapPinIcon className="mt-1 h-5 w-5 text-secondary" />
                <Select
                  value={location?.trim() ? location : "all"}
                  onValueChange={(value) =>
                    setFieldValue("category", value === "all" ? "" : value, {
                      resetPage: true,
                    })
                  }
                >
                  <SelectTrigger className="h-10 w-full border-0 px-0 font-epilogue text-sm text-[#7C8493] focus:ring-0">
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent align="start" className="rounded-none">
                    <SelectItem value="all">All locations</SelectItem>
                    {uniqueLocations
                      .filter((loc) => loc !== "")
                      .map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-1 items-center gap-3 md:pl-1">
                <Select
                  value={category?.trim() ? category : "all"}
                  onValueChange={(value) =>
                    setFieldValue("category", value, { resetPage: true })
                  }
                >
                  <SelectTrigger className="h-10 w-full border border-[#D6DDEB] bg-white font-epilogue text-sm text-[#7C8493] focus:ring-0">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent align="start" className="rounded-none">
                    <SelectItem value="all">All categories</SelectItem>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="h-10 rounded-none border-[#D6DDEB] bg-white px-4 font-epilogue text-xs font-semibold uppercase tracking-[0.14em] text-[#7C8493]"
                  onClick={resetParams}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-11">
            {isError && (
              <div className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
                <div className="flex-1">
                  <p className="font-epilogue text-sm font-semibold text-red-700">
                    Failed to load jobs
                  </p>
                  <p className="mt-0.5 font-epilogue text-xs text-red-600">
                    Something went wrong while fetching job listings. Try again.
                  </p>
                  <button
                    onClick={() => refetch()}
                    className="mt-2 text-xs font-semibold text-red-700 underline"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {!isError && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-epilogue text-sm text-[#7C8493]">
                    Showing{" "}
                    <span className="font-semibold text-secondary">
                      {totalJobs === 0
                        ? 0
                        : `${startIndex + 1}-${Math.min(endIndex, totalJobs)}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-secondary">
                      {totalJobs}
                    </span>{" "}
                    jobs
                  </p>
                </div>

                <div className="space-y-3">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex animate-pulse items-center justify-between border border-[#D6DDEB] bg-white px-5 py-4"
                      >
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="h-4 w-40 bg-[#E9EBEE]" />
                          <div className="h-3 w-32 bg-[#E9EBEE]" />
                          <div className="h-3 w-48 bg-[#E9EBEE]" />
                        </div>
                        <div className="h-6 w-20 bg-[#E9EBEE]" />
                      </div>
                    ))
                  ) : paginatedJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-[#D6DDEB] bg-white py-12 text-center">
                      <p className="font-clash-display text-lg font-semibold text-secondary">
                        No jobs found
                      </p>
                      <p className="max-w-md font-epilogue text-sm text-[#7C8493]">
                        Try adjusting your search keywords or clearing the
                        filters to see more roles.
                      </p>
                      <Button
                        className="mt-2 h-10 rounded-none bg-primary px-6 font-epilogue text-sm font-bold text-white hover:bg-[#3730c4]"
                        onClick={resetParams}
                      >
                        Clear filters
                      </Button>
                    </div>
                  ) : (
                    paginatedJobs.map((job) => (
                      <Link
                        key={job._id}
                        href={`/jobs/${job._id}`}
                        className="block"
                      >
                        <article className="group flex cursor-pointer items-start justify-between border border-[#D6DDEB] bg-white px-6 py-5 transition hover:-translate-y-0.5 hover:border-[#C2CCE0] hover:shadow-md">
                          <div className="flex-1">
                            <h2 className="font-clash-display text-lg font-semibold text-secondary group-hover:text-primary">
                              {job.title}
                            </h2>
                            <p className="mt-1 font-epilogue text-sm text-[#515B6F]">
                              {job.company}
                              <span className="mx-2 text-[#D6DDEB]">•</span>
                              {job.location}
                            </p>
                            <p className="mt-3 max-w-2xl font-epilogue text-sm leading-relaxed text-[#7C8493]">
                              {job.description.length > 180
                                ? `${job.description.slice(0, 180)}...`
                                : job.description}
                            </p>
                          </div>
                          <div className="ml-4 flex items-center">
                            <span className="rounded-full bg-[#F1F2F4] px-3 py-1 font-epilogue text-xs font-semibold text-[#7C8493]">
                              {job.category}
                            </span>
                          </div>
                        </article>
                      </Link>
                    ))
                  )}
                </div>

                {totalJobs > 0 && (
                  <div className="mt-6 flex items-center justify-between">
                    <p className="font-epilogue text-xs text-[#7C8493]">
                      Page{" "}
                      <span className="font-semibold text-secondary">
                        {currentPage}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-secondary">
                        {totalPages}
                      </span>
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="h-9 rounded-none border-[#D6DDEB] bg-white px-3 font-epilogue text-xs font-semibold text-[#515B6F] disabled:opacity-60"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        className="h-9 rounded-none border-[#D6DDEB] bg-white px-3 font-epilogue text-xs font-semibold text-[#515B6F] disabled:opacity-60"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
