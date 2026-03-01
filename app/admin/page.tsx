"use client";
import { useMemo } from "react";
import { useJobs } from "@/services/jobs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Zap,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

// ─── Skeleton primitives ──────────────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-sm bg-[#E9EBEE] ${className}`} />
  );
}

function StatCardSkeleton() {
  return (
    <div className="border border-[#D6DDEB] bg-white p-6">
      <Skeleton className="h-3 w-24 mb-4" />
      <Skeleton className="h-9 w-16 mb-3" />
      <Skeleton className="h-3 w-36" />
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function ErrorBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-start gap-4 border border-red-200 bg-red-50 p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-100">
        <AlertTriangle className="h-4 w-4 text-red-500" />
      </div>
      <div className="flex-1">
        <p className="font-epilogue text-sm font-semibold text-red-700">
          Failed to load metrics
        </p>
        <p className="mt-0.5 font-epilogue text-xs text-red-500">
          Something went wrong while fetching job data. Check your connection
          and try again.
        </p>
      </div>
      <button
        onClick={onRetry}
        className="flex shrink-0 items-center gap-1.5 border border-red-300 bg-white px-3 py-1.5 font-epilogue text-xs font-semibold text-red-600 transition hover:bg-red-50"
      >
        <RefreshCw className="h-3 w-3" />
        Retry
      </button>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  description,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  description: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="group flex flex-col justify-between border border-[#D6DDEB] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#C2CCE0] hover:shadow-md">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-epilogue text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7C8493]">
          {label}
        </span>
      </div>

      {/* Value */}
      <div className="mt-6">
        <p className="font-clash-display text-[40px] font-semibold leading-none text-secondary">
          {value}
        </p>
        {sub && (
          <p className="mt-1.5 font-epilogue text-xs text-[#7C8493]">{sub}</p>
        )}
        <p className="mt-3 font-epilogue text-sm text-[#515B6F]">
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const { data: jobs = [], isLoading, isError, refetch } = useJobs();

  const totalJobs = jobs.length;
  const uniqueCompanies = useMemo(
    () => new Set(jobs.map((job) => job.company)).size,
    [jobs],
  );
  const latestJob = jobs[0];

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#D6DDEB] pb-6 md:flex-row md:items-center">
        <div>
          <p className="font-epilogue text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Overview
          </p>
          <h1 className="mt-1 font-clash-display text-2xl font-semibold text-secondary md:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1.5 font-epilogue text-sm text-[#7C8493] max-w-md">
            Manage job listings and monitor key hiring metrics in one place.
          </p>
        </div>
        <Link href="/admin/jobs">
          <Button className="flex h-11 items-center gap-2 rounded-none bg-primary px-6 font-epilogue text-sm font-bold text-white hover:bg-[#3730c4]">
            Go to jobs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* ── Error banner ── */}
      {isError && <ErrorBanner onRetry={refetch} />}

      {/* ── Stat cards ── */}
      <div className="grid gap-5 md:grid-cols-3">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              label="Total Jobs"
              description="All published job listings"
              value={totalJobs}
              sub={
                totalJobs === 1
                  ? "1 active listing"
                  : `${totalJobs} active listings`
              }
              icon={Briefcase}
              accent="bg-[#EEF0FD] text-primary"
            />
            <StatCard
              label="Companies"
              description="Unique companies currently hiring"
              value={uniqueCompanies}
              sub={
                uniqueCompanies === 1
                  ? "1 company"
                  : `${uniqueCompanies} companies`
              }
              icon={Building2}
              accent="bg-[#E8F9F0] text-[#56CDAD]"
            />
            <StatCard
              label="Latest Job"
              description={
                latestJob
                  ? `${latestJob.company} • ${latestJob.location}`
                  : "No listings yet"
              }
              value={
                latestJob ? (
                  <span className="font-clash-display text-2xl font-semibold text-secondary">
                    {latestJob.title}
                  </span>
                ) : (
                  <span className="font-clash-display text-2xl font-semibold text-[#7C8493]">
                    —
                  </span>
                )
              }
              sub={latestJob ? "Most recently added" : undefined}
              icon={Zap}
              accent="bg-[#FFF3E4] text-[#FFB836]"
            />
          </>
        )}
      </div>

      {/* ── Empty state ── */}
      {!isLoading && !isError && totalJobs === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-[#D6DDEB] bg-white py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center bg-[#EEF0FD]">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-clash-display text-lg font-semibold text-secondary">
              No jobs posted yet
            </p>
            <p className="mt-1 font-epilogue text-sm text-[#7C8493]">
              Get started by creating your first job listing.
            </p>
          </div>
          <Link href="/admin/jobs/new">
            <Button className="mt-2 flex h-11 items-center gap-2 rounded-none bg-primary px-6 font-epilogue text-sm font-bold text-white hover:bg-[#3730c4]">
              Post a job
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
