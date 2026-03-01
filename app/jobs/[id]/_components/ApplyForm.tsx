"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  LinkIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  Loader2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useCreateApplication } from "@/services/applications";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const applySchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  resume_url: z
    .string()
    .min(1, "Resume link is required.")
    .url("Enter a valid URL (e.g. https://...)."),
  cover_note: z.string().optional(),
});

type ApplyInput = z.infer<typeof applySchema>;

function ApplyForm({ jobId }: { jobId: string }) {
  const { mutate, isPending, isSuccess, isError, error, reset } =
    useCreateApplication();

  const form = useForm<ApplyInput>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      name: "",
      email: "",
      resume_url: "",
      cover_note: "",
    },
  });

  const onSubmit = (data: ApplyInput) => {
    mutate({
      job_id: jobId,
      name: data.name,
      email: data.email,
      resume_link: data.resume_url,
      cover_note: data.cover_note || undefined,
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 border border-green-200 bg-green-50 px-6 py-10 text-center">
        <CheckCircleIcon className="h-10 w-10 text-green-500" />
        <div>
          <p className="font-clash-display text-lg font-semibold text-secondary">
            Application submitted!
          </p>
          <p className="mt-1 font-epilogue text-sm text-[#515B6F]">
            We&apos;ll be in touch if your profile is a good fit.
          </p>
        </div>
        <Button
          variant="outline"
          className="mt-2 h-9 rounded-none border-green-300 font-epilogue text-xs font-semibold text-green-700"
          onClick={() => {
            reset();
            form.reset();
          }}
        >
          Apply again
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {/* API error banner */}
        {isError && (
          <div className="flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <p className="font-epilogue text-xs text-red-600">
              {(error as Error)?.message ||
                "Something went wrong. Please try again."}
            </p>
          </div>
        )}

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="font-epilogue text-sm font-semibold text-secondary">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Jane Doe"
                  className="h-12 rounded-none border border-[#D6DDEB] bg-white px-4 font-epilogue text-sm text-secondary placeholder-[#A8ADB7] focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-epilogue text-xs" />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="font-epilogue text-sm font-semibold text-secondary">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  className="h-12 rounded-none border border-[#D6DDEB] bg-white px-4 font-epilogue text-sm text-secondary placeholder-[#A8ADB7] focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-epilogue text-xs" />
            </FormItem>
          )}
        />

        {/* Resume URL */}
        <FormField
          control={form.control}
          name="resume_url"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="font-epilogue text-sm font-semibold text-secondary">
                Resume Link
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C8493]" />
                  <Input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    className="h-12 rounded-none border border-[#D6DDEB] bg-white pl-10 pr-4 font-epilogue text-sm text-secondary placeholder-[#A8ADB7] focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="font-epilogue text-xs" />
            </FormItem>
          )}
        />

        {/* Cover Note */}
        <FormField
          control={form.control}
          name="cover_note"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="font-epilogue text-sm font-semibold text-secondary">
                Cover Note{" "}
                <span className="font-normal text-[#7C8493]">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Tell us why you're a great fit for this role..."
                  className="resize-none rounded-none border border-[#D6DDEB] bg-white px-4 py-3 font-epilogue text-sm text-secondary placeholder-[#A8ADB7] focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-epilogue text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 h-12 w-full rounded-none bg-primary font-epilogue text-sm font-bold text-white hover:bg-[#3730c4] disabled:opacity-60"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Submitting…
            </span>
          ) : (
            "Apply Now"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ApplyForm;
