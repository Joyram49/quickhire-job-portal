"use client";

import { useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { useDeleteJob, useJobs, type Job } from "@/services/jobs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  MoreHorizontal,
  Eye,
  Trash2,
  Pencil,
  Briefcase,
  AlertTriangle,
  RefreshCw,
  MoreVertical,
} from "lucide-react";

// ─── Tag color map (reuse brand system) ──────────────────────────────────────
const tagColors: Record<string, string> = {
  Design: "bg-[#E8F9F0] text-[#56CDAD]",
  Marketing: "bg-[#FFF3E4] text-[#FFB836]",
  Business: "bg-[#F4F0FF] text-[#4640DE]",
  Technology: "bg-[#FFE7E7] text-[#FF6550]",
  Engineering: "bg-[#EEF0FD] text-[#4640DE]",
  Finance: "bg-[#E8F9F0] text-[#56CDAD]",
  Sales: "bg-[#FFF3E4] text-[#FFB836]",
};

function CategoryBadge({ category }: { category: string }) {
  const style = tagColors[category] ?? "bg-[#F1F2F4] text-[#7C8493]";
  return (
    <span
      className={`rounded-full px-3 py-1 font-epilogue text-xs font-semibold ${style}`}
    >
      {category}
    </span>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-sm bg-[#E9EBEE] ${className}`} />
  );
}

function TableRowSkeleton() {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="ml-auto h-8 w-8 rounded-sm" />
      </TableCell>
    </TableRow>
  );
}

// ─── Error banner ─────────────────────────────────────────────────────────────
function ErrorBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-start gap-4 border border-red-200 bg-red-50 p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-100">
        <AlertTriangle className="h-4 w-4 text-red-500" />
      </div>
      <div className="flex-1">
        <p className="font-epilogue text-sm font-semibold text-red-700">
          Failed to load jobs
        </p>
        <p className="mt-0.5 font-epilogue text-xs text-red-500">
          Something went wrong while fetching job listings. Check your
          connection and try again.
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

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
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
      <Link href="/admin/jobs/add">
        <Button className="mt-2 flex h-11 items-center gap-2 rounded-none bg-primary px-6 font-epilogue text-sm font-bold text-white hover:bg-[#3730c4]">
          Post first job
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminJobsPage() {
  const { data, isLoading, isError, refetch } = useJobs();
  const deleteJobMutation = useDeleteJob();
  const queryClient = useQueryClient();

  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const jobs = data ?? [];

  const handleOpenView = (job: Job) => {
    setViewJob(job);
    setIsViewOpen(true);
  };

  const handleOpenDelete = (job: Job) => {
    setJobToDelete(job);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    try {
      await deleteJobMutation.mutateAsync(jobToDelete._id);
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsDeleteOpen(false);
      setJobToDelete(null);
    } catch {
      // error shown inside dialog
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#D6DDEB] pb-6 md:flex-row md:items-center">
        <div>
          <p className="font-epilogue text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Management
          </p>
          <h1 className="mt-1 font-clash-display text-2xl font-semibold text-secondary md:text-3xl">
            Job Listings
          </h1>
          <p className="mt-1.5 font-epilogue text-sm text-[#7C8493] max-w-md">
            Add new job listings and manage existing roles.
          </p>
        </div>
        <Link href="/admin/jobs/add">
          <Button className="flex h-11 items-center gap-2 rounded-none bg-primary px-6 font-epilogue text-sm font-bold text-white hover:bg-[#3730c4]">
            Add job
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* ── Error banner ── */}
      {isError && <ErrorBanner onRetry={refetch} />}

      {/* ── Table / States ── */}
      {!isError && (
        <div className="border border-[#D6DDEB] bg-white">
          {isLoading ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8F8FD] hover:bg-[#F8F8FD]">
                  <TableHead className="font-epilogue text-xs font-semibold uppercase tracking-widest text-[#7C8493]">
                    Title
                  </TableHead>
                  <TableHead className="font-epilogue text-xs font-semibold uppercase tracking-widest text-[#7C8493]">
                    Company
                  </TableHead>
                  <TableHead className="font-epilogue text-xs font-semibold uppercase tracking-widest text-[#7C8493]">
                    Location
                  </TableHead>
                  <TableHead className="font-epilogue text-xs font-semibold uppercase tracking-widest text-[#7C8493]">
                    Category
                  </TableHead>
                  <TableHead className="w-[60px] text-right font-epilogue text-xs font-semibold uppercase tracking-widest text-[#7C8493]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </TableBody>
            </Table>
          ) : jobs.length === 0 ? (
            <EmptyState />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8F8FD] hover:bg-[#F8F8FD]">
                  <TableHead className="font-epilogue text-xs font-semibold uppercase tracking-widest text-[#7C8493]">
                    Title
                  </TableHead>
                  <TableHead className="font-epilogue text-xs font-semibold uppercase tracking-widest text-[#7C8493]">
                    Company
                  </TableHead>
                  <TableHead className="font-epilogue text-xs font-semibold uppercase  text-[#7C8493]">
                    Location
                  </TableHead>
                  <TableHead className="font-epilogue text-xs font-semibold uppercase tracking-widest text-[#7C8493]">
                    Category
                  </TableHead>
                  <TableHead className="w-[60px] text-right font-epilogue text-xs font-semibold uppercase tracking-widest text-[#7C8493]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow
                    key={job._id}
                    className="group border-b border-[#D6DDEB] transition-colors hover:bg-[#F8F8FD]"
                  >
                    <TableCell className="py-4">
                      <p className="font-epilogue text-sm font-semibold text-secondary">
                        {job.title}
                      </p>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="font-epilogue text-sm text-[#515B6F]">
                        {job.company}
                      </p>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="font-epilogue text-sm text-[#515B6F]">
                        {job.location}
                      </p>
                    </TableCell>
                    <TableCell className="py-4">
                      <CategoryBadge category={job.category} />
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#D6DDEB] bg-white text-[#7C8493] transition hover:border-primary hover:text-primary focus:outline-none">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open actions</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-44 rounded-none border border-[#D6DDEB] p-1 shadow-md"
                        >
                          <DropdownMenuItem
                            className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 font-epilogue text-sm text-secondary hover:bg-[#F8F8FD] focus:bg-[#F8F8FD]"
                            onClick={() => handleOpenView(job)}
                          >
                            <Eye className="h-4 w-4 text-[#7C8493]" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 font-epilogue text-sm text-secondary hover:bg-[#F8F8FD] focus:bg-[#F8F8FD]"
                            asChild
                          >
                            <Link href={`/admin/jobs/${job._id}/edit`}>
                              <Pencil className="h-4 w-4 text-[#7C8493]" />
                              Edit listing
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 bg-[#D6DDEB]" />
                          <DropdownMenuItem
                            className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 font-epilogue text-sm text-red-600 hover:bg-red-50 focus:bg-red-50"
                            onClick={() => handleOpenDelete(job)}
                            disabled={deleteJobMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}

      {/* ── View job dialog ── */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="rounded-none border border-[#D6DDEB] p-0 sm:max-w-lg">
          <DialogHeader className="border-b border-[#D6DDEB] px-6 py-5">
            <DialogTitle className="font-clash-display text-xl text-secondary">
              {viewJob?.title ?? "Job details"}
            </DialogTitle>
            {viewJob && (
              <DialogDescription className="font-epilogue text-xs text-[#7C8493]">
                {viewJob.company}
                <span className="mx-1.5 text-[#D6DDEB]">•</span>
                {viewJob.location}
              </DialogDescription>
            )}
          </DialogHeader>

          {viewJob && (
            <div className="flex flex-col gap-5 px-6 py-5">
              <div>
                <p className="font-epilogue text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7C8493]">
                  Category
                </p>
                <div className="mt-2">
                  <CategoryBadge category={viewJob.category} />
                </div>
              </div>
              <div>
                <p className="font-epilogue text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7C8493]">
                  Description
                </p>
                <p className="mt-2 whitespace-pre-line font-epilogue text-sm leading-relaxed text-[#515B6F]">
                  {viewJob.description}
                </p>
              </div>
            </div>
          )}

          <div className="border-t border-[#D6DDEB] px-6 py-4">
            <Button
              className="h-10 rounded-none border border-[#D6DDEB] bg-white px-5 font-epilogue text-sm font-semibold text-secondary hover:bg-[#F8F8FD]"
              onClick={() => setIsViewOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Delete confirmation dialog ── */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="rounded-none border border-[#D6DDEB] p-0 sm:max-w-md">
          <DialogHeader className="border-b border-[#D6DDEB] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-red-100">
                <Trash2 className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <DialogTitle className="font-clash-display text-lg text-secondary">
                  Delete job listing?
                </DialogTitle>
                <DialogDescription className="mt-0.5 font-epilogue text-xs text-[#7C8493]">
                  This action cannot be undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {jobToDelete && (
            <div className="px-6 py-5">
              <p className="font-epilogue text-sm text-[#515B6F]">
                You&apos;re about to permanently remove this listing for all
                candidates:
              </p>
              <div className="mt-3 border border-[#D6DDEB] bg-[#F8F8FD] px-4 py-3">
                <p className="font-epilogue text-sm font-semibold text-secondary">
                  {jobToDelete.title}
                </p>
                <p className="mt-0.5 font-epilogue text-xs text-[#7C8493]">
                  {jobToDelete.company}
                  <span className="mx-1.5 text-[#D6DDEB]">•</span>
                  {jobToDelete.location}
                </p>
              </div>

              {deleteJobMutation.isError && (
                <div className="mt-3 flex items-center gap-2 border border-red-200 bg-red-50 px-3 py-2">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                  <p className="font-epilogue text-xs text-red-600">
                    Failed to delete. Please try again.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 border-t border-[#D6DDEB] px-6 py-4">
            <Button
              className="h-10 rounded-none border border-[#D6DDEB] bg-white px-5 font-epilogue text-sm font-semibold text-secondary hover:bg-[#F8F8FD]"
              onClick={() => setIsDeleteOpen(false)}
              disabled={deleteJobMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              className="h-10 rounded-none bg-red-500 px-5 font-epilogue text-sm font-bold text-white hover:bg-red-600 disabled:opacity-60"
              onClick={handleConfirmDelete}
              disabled={deleteJobMutation.isPending}
            >
              {deleteJobMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete listing"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
