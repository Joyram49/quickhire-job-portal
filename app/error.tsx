"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangleIcon, ArrowLeftIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    // Log to your error reporting service here (e.g. Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F8FD] px-4 text-center">
      {/* Large background text */}
      <p className="font-clash-display text-[120px] font-bold leading-none text-[#E9EBEE] select-none md:text-[160px]">
        500
      </p>

      {/* Icon */}
      <div className="relative -mt-6 mb-6 flex h-16 w-16 items-center justify-center border border-red-100 bg-white shadow-sm">
        <AlertTriangleIcon className="h-7 w-7 text-red-500" />
      </div>

      {/* Copy */}
      <h1 className="font-clash-display text-2xl font-semibold text-secondary md:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md font-epilogue text-sm text-[#7C8493]">
        An unexpected error occurred. Our team has been notified. You can try
        refreshing the page or come back in a little while.
      </p>

      {/* Error digest for support reference */}
      {error.digest && (
        <p className="mt-3 font-epilogue text-xs text-[#7C8493]">
          Error reference:{" "}
          <span className="rounded bg-[#E9EBEE] px-1.5 py-0.5 font-mono text-xs text-secondary">
            {error.digest}
          </span>
        </p>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="outline"
          className="h-11 rounded-none border-[#D6DDEB] bg-white px-6 font-epilogue text-sm font-semibold text-secondary hover:border-primary hover:text-primary"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Go back
        </Button>
        <Button
          className="h-11 rounded-none bg-primary px-6 font-epilogue text-sm font-bold text-white hover:bg-[#3730c4]"
          onClick={reset}
        >
          <RefreshCwIcon className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>

      {/* Divider + home link */}
      <div className="mt-12 border-t border-[#D6DDEB] pt-8">
        <p className="font-epilogue text-sm text-[#7C8493]">
          If the problem persists,{" "}
          <Link
            href="/"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            return to the homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
