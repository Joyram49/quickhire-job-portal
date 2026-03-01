"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  MapPinIcon,
  BriefcaseIcon,
  CalendarIcon,
  BuildingIcon,
  AlertCircleIcon,
} from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";

import { useJobById } from "@/services/jobs";

import ApplyForm from "./_components/ApplyForm";

// ─── Skeleton ────────────────────────────────────────────────────────────────

function JobDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero */}
      <div className="border-b border-[#D6DDEB] bg-[#F8F8FD] px-4 py-10 sm:px-6 lg:px-11">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 h-4 w-24 rounded bg-[#E9EBEE]" />
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-3">
              <div className="h-8 w-72 rounded bg-[#E9EBEE]" />
              <div className="h-4 w-48 rounded bg-[#E9EBEE]" />
              <div className="flex gap-3">
                <div className="h-6 w-24 rounded-full bg-[#E9EBEE]" />
                <div className="h-6 w-24 rounded-full bg-[#E9EBEE]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-11">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-[#E9EBEE]"
                style={{ width: `${85 - i * 5}%` }}
              />
            ))}
          </div>
          <div className="h-64 rounded bg-[#E9EBEE]" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: job, isLoading, isError, refetch } = useJobById(id);

  if (isLoading)
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main>
          <JobDetailSkeleton />
        </main>
        <SiteFooter />
      </div>
    );

  if (isError || !job)
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
          <AlertCircleIcon className="h-10 w-10 text-red-400" />
          <p className="font-clash-display text-xl font-semibold text-secondary">
            Failed to load job
          </p>
          <p className="font-epilogue text-sm text-[#7C8493]">
            The job may have been removed or something went wrong.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="h-9 rounded-none border-[#D6DDEB] font-epilogue text-xs font-semibold"
              onClick={() => refetch()}
            >
              Try again
            </Button>
            <Button
              className="h-9 rounded-none bg-primary font-epilogue text-xs font-bold text-white hover:bg-[#3730c4]"
              onClick={() => router.push("/jobs")}
            >
              Back to Jobs
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="pb-16">
        {/* ── Hero ── */}
        <section className="border-b border-[#D6DDEB] bg-[#F8F8FD] py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-11">
            {/* Back */}
            <button
              onClick={() => router.back()}
              className="mb-6 flex items-center gap-1.5 font-epilogue text-xs font-semibold text-[#7C8493] transition hover:text-primary"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Back to listings
            </button>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-epilogue text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {job.category}
                </p>
                <h1 className="mt-2 font-clash-display text-3xl font-semibold text-secondary md:text-4xl">
                  {job.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="flex items-center gap-1.5 font-epilogue text-sm text-[#515B6F]">
                    <BuildingIcon className="h-4 w-4 text-[#7C8493]" />
                    {job.company}
                  </span>
                  <span className="text-[#D6DDEB]">•</span>
                  <span className="flex items-center gap-1.5 font-epilogue text-sm text-[#515B6F]">
                    <MapPinIcon className="h-4 w-4 text-[#7C8493]" />
                    {job.location}
                  </span>
                  <span className="text-[#D6DDEB]">•</span>
                  <span className="flex items-center gap-1.5 font-epilogue text-sm text-[#515B6F]">
                    <CalendarIcon className="h-4 w-4 text-[#7C8493]" />
                    Posted {formatDate(job.created_at)}
                  </span>
                </div>
              </div>

              {/* Category badge */}
              <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-primary/10 px-4 py-1.5 font-epilogue text-xs font-semibold text-primary">
                <BriefcaseIcon className="h-3.5 w-3.5" />
                {job.category}
              </span>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-11">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* ── Job Description ── */}
              <div className="lg:col-span-2">
                <div className="border border-[#D6DDEB] bg-white p-6 md:p-8">
                  <h2 className="mb-4 font-clash-display text-xl font-semibold text-secondary">
                    About this role
                  </h2>
                  <div className="prose-custom">
                    {job.description.split("\n").map((para, i) =>
                      para.trim() ? (
                        <p
                          key={i}
                          className="mb-4 font-epilogue text-sm leading-relaxed text-[#515B6F] last:mb-0"
                        >
                          {para}
                        </p>
                      ) : null,
                    )}
                  </div>
                </div>

                {/* Meta card */}
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: "Company",
                      value: job.company,
                      icon: BuildingIcon,
                    },
                    {
                      label: "Location",
                      value: job.location,
                      icon: MapPinIcon,
                    },
                    {
                      label: "Category",
                      value: job.category,
                      icon: BriefcaseIcon,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="border border-[#D6DDEB] bg-white px-4 py-4"
                    >
                      <p className="mb-1 font-epilogue text-xs font-semibold uppercase tracking-[0.12em] text-[#7C8493]">
                        {label}
                      </p>
                      <p className="flex items-center gap-1.5 font-epilogue text-sm font-semibold text-secondary">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Apply Form ── */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 border border-[#D6DDEB] bg-white p-6">
                  <h2 className="mb-1 font-clash-display text-xl font-semibold text-secondary">
                    Apply for this role
                  </h2>
                  <p className="mb-6 font-epilogue text-xs text-[#7C8493]">
                    Fill in your details and we&apos;ll forward your
                    application.
                  </p>
                  <ApplyForm jobId={job._id} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
