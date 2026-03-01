"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useCreateJob, type CreateJobPayload } from "@/services/jobs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  MapPin,
  Tag,
  FileText,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
});

type JobFormValues = z.infer<typeof jobSchema>;

const categories = [
  { value: "Design", color: "bg-[#E8F9F0] text-[#56CDAD]" },
  { value: "Marketing", color: "bg-[#FFF3E4] text-[#FFB836]" },
  { value: "Business", color: "bg-[#F4F0FF] text-[#4640DE]" },
  { value: "Technology", color: "bg-[#FFE7E7] text-[#FF6550]" },
  { value: "Engineering", color: "bg-[#EEF0FD] text-[#4640DE]" },
  { value: "Finance", color: "bg-[#E8F9F0] text-[#56CDAD]" },
  { value: "Sales", color: "bg-[#FFF3E4] text-[#FFB836]" },
  { value: "Human Resource", color: "bg-[#F4F0FF] text-[#4640DE]" },
];

// ─── Field wrapper with left icon accent ─────────────────────────────────────
function FieldIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center border-r border-[#D6DDEB] bg-[#F8F8FD]">
      <Icon className="h-4 w-4 text-[#7C8493]" />
    </div>
  );
}

export default function AddJobPage() {
  const router = useRouter();
  const createJobMutation = useCreateJob();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      category: "",
      description: "",
    },
  });

  const onSubmit = (values: JobFormValues) => {
    const payload: CreateJobPayload = values;
    createJobMutation.mutate(payload, {
      onSuccess: () => {
        router.push("/admin/jobs");
      },
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* ── Page header ── */}
      <div className="flex flex-col gap-4 border-b border-[#D6DDEB] pb-6">
        <Link
          href="/admin/jobs"
          className="flex w-fit items-center gap-1.5 font-epilogue text-xs font-semibold text-[#7C8493] transition hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to jobs
        </Link>
        <div>
          <p className="font-epilogue text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Management
          </p>
          <h1 className="mt-1 font-clash-display text-2xl font-semibold text-secondary md:text-3xl">
            Add New Job
          </h1>
          <p className="mt-1.5 font-epilogue text-sm text-[#7C8493]">
            Create a new listing that will appear on the public jobs page.
          </p>
        </div>
      </div>

      {/* ── Form card ── */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          {/* Section: Role info */}
          <div className="border border-[#D6DDEB] bg-white">
            {/* Section header */}
            <div className="flex items-center gap-3 border-b border-[#D6DDEB] bg-[#F8F8FD] px-5 py-3.5">
              <div className="flex h-7 w-7 items-center justify-center bg-[#EEF0FD]">
                <Briefcase className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="font-epilogue text-xs font-semibold uppercase tracking-[0.12em] text-[#515B6F]">
                Role Information
              </p>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {/* Job title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="font-epilogue text-sm font-semibold text-secondary">
                      Job Title
                    </FormLabel>
                    <FormControl>
                      <div className="flex border border-[#D6DDEB] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                        <FieldIcon icon={Briefcase} />
                        <Input
                          placeholder="e.g. Senior Product Designer"
                          className="h-11 flex-1 rounded-none border-0 font-epilogue text-sm shadow-none focus-visible:ring-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-epilogue text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Company + Location */}
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="font-epilogue text-sm font-semibold text-secondary">
                        Company
                      </FormLabel>
                      <FormControl>
                        <div className="flex border border-[#D6DDEB] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                          <FieldIcon icon={Building2} />
                          <Input
                            placeholder="Company name"
                            className="h-11 flex-1 rounded-none border-0 font-epilogue text-sm shadow-none focus-visible:ring-0"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-epilogue text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="font-epilogue text-sm font-semibold text-secondary">
                        Location
                      </FormLabel>
                      <FormControl>
                        <div className="flex border border-[#D6DDEB] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                          <FieldIcon icon={MapPin} />
                          <Input
                            placeholder="e.g. Berlin, Germany"
                            className="h-11 flex-1 rounded-none border-0 font-epilogue text-sm shadow-none focus-visible:ring-0"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-epilogue text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="font-epilogue text-sm font-semibold text-secondary">
                      Category
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <div className="flex border border-[#D6DDEB] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                          <FieldIcon icon={Tag} />
                          <SelectTrigger className="h-11 flex-1 rounded-none border-0 font-epilogue text-sm shadow-none focus:ring-0">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="rounded-none border border-[#D6DDEB] p-1 shadow-md">
                        {categories.map((cat) => (
                          <SelectItem
                            key={cat.value}
                            value={cat.value}
                            className="rounded-sm font-epilogue text-sm focus:bg-[#F8F8FD]"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cat.color}`}
                              >
                                {cat.value}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-epilogue text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section: Description */}
          <div className="border border-t-0 border-[#D6DDEB] bg-white">
            <div className="flex items-center gap-3 border-b border-[#D6DDEB] bg-[#F8F8FD] px-5 py-3.5">
              <div className="flex h-7 w-7 items-center justify-center bg-[#EEF0FD]">
                <FileText className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="font-epilogue text-xs font-semibold uppercase tracking-[0.12em] text-[#515B6F]">
                Job Description
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="font-epilogue text-sm font-semibold text-secondary">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the role, responsibilities, and requirements..."
                        className="rounded-none border-[#D6DDEB] font-epilogue text-sm focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
                        rows={7}
                        {...field}
                      />
                    </FormControl>
                    <p className="font-epilogue text-xs text-[#7C8493]">
                      Be specific about the role to attract the right
                      candidates.
                    </p>
                    <FormMessage className="font-epilogue text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* ── Error banner ── */}
          {createJobMutation.isError && (
            <div className="flex items-start gap-3 border border-red-200 bg-red-50 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-red-100">
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="font-epilogue text-sm font-semibold text-red-700">
                  Failed to create job
                </p>
                <p className="mt-0.5 font-epilogue text-xs text-red-500">
                  Please check all fields and try again.
                </p>
              </div>
            </div>
          )}

          {/* ── Actions ── */}
          <div className="flex items-center justify-between border border-t-0 border-[#D6DDEB] bg-[#F8F8FD] px-5 py-4 sm:px-6">
            <p className="font-epilogue text-xs text-[#7C8493]">
              All fields are required.
            </p>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                className="h-11 rounded-none border border-[#D6DDEB] bg-white px-5 font-epilogue text-sm font-semibold text-secondary hover:bg-[#F8F8FD]"
                onClick={() => router.push("/admin/jobs")}
                disabled={createJobMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 rounded-none bg-primary px-6 font-epilogue text-sm font-bold text-white hover:bg-[#3730c4] disabled:opacity-60"
                disabled={createJobMutation.isPending}
              >
                {createJobMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Job"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
