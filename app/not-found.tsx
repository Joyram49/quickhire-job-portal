"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F8FD] px-4 text-center">
      {/* Large 404 */}
      <p className="font-clash-display text-[120px] font-bold leading-none text-[#E9EBEE] select-none md:text-[160px]">
        404
      </p>

      {/* Icon */}
      <div className="relative -mt-6 mb-6 flex h-16 w-16 items-center justify-center border border-[#D6DDEB] bg-white shadow-sm">
        <SearchIcon className="h-7 w-7 text-primary" />
      </div>

      {/* Copy */}
      <h1 className="font-clash-display text-2xl font-semibold text-secondary md:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md font-epilogue text-sm text-[#7C8493]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Double-check the URL or head back to find what you need.
      </p>

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
          asChild
          className="h-11 rounded-none bg-primary px-6 font-epilogue text-sm font-bold text-white hover:bg-[#3730c4]"
        >
          <Link href="/">Back to home</Link>
        </Button>
      </div>

      {/* Helpful links */}
      <div className="mt-12 border-t border-[#D6DDEB] pt-8">
        <p className="mb-4 font-epilogue text-xs font-semibold uppercase tracking-[0.14em] text-[#7C8493]">
          You might be looking for
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { label: "Browse Jobs", href: "/jobs" },
            { label: "Admin Dashboard", href: "/admin" },
            { label: "Sign In", href: "/login" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-epilogue text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
