"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F8FD] px-4">
      {/* Logo */}
      <Link href="/" className="mb-12 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="6" stroke="white" strokeWidth="2.5" />
            <circle cx="10" cy="10" r="2" fill="white" />
          </svg>
        </div>
        <span className="font-clash-display text-xl font-semibold text-secondary">
          QuickHire
        </span>
      </Link>

      {/* Card */}
      <div className="relative w-full max-w-[480px] overflow-hidden border border-[#D6DDEB] bg-white px-10 py-12 text-center">
        {/* Top-left + bottom-right corner cuts */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            clipPath:
              "polygon(32px 0%, 100% 0%, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0% 100%, 0% 32px)",
            background: "white",
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Animated construction icon */}
          <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Outer pulsing ring */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-10" />
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Wrench */}
                <path
                  d="M28.5 4a7.5 7.5 0 00-7.18 9.66L6.1 28.88a3 3 0 004.24 4.24l15.22-15.22A7.5 7.5 0 1028.5 4zm0 12a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
                  fill="#4640DE"
                />
                {/* Gear hint */}
                <circle cx="10" cy="30" r="2" fill="#4640DE" opacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="font-clash-display text-[28px] font-semibold leading-[120%] text-secondary">
              Under Construction
            </h1>
            <p className="font-epilogue text-sm leading-relaxed text-[#7C8493]">
              We&apos;re working hard to bring you the{" "}
              <span className="font-semibold text-secondary">
                Forgot Password
              </span>{" "}
              feature.
              <br />
              It&apos;ll be ready very soon!
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full">
            <div className="mb-2 flex items-center justify-between font-epilogue text-xs text-[#7C8493]">
              <span>Progress</span>
              <span className="font-semibold text-primary">72%</span>
            </div>
            <div className="h-2 w-full overflow-hidden bg-[#F1F2F4]">
              <div
                className="h-full bg-primary transition-all duration-700"
                style={{ width: "72%" }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-[#D6DDEB]" />

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="font-epilogue text-xs text-[#7C8493]">
              In the meantime, contact support for help.
            </p>
            <a
              href="mailto:support@quickhire.com"
              className="w-full bg-primary py-3 text-center font-epilogue text-sm font-bold text-white transition hover:bg-[#3730c4]"
            >
              Contact Support
            </a>
            <Link
              href="/login"
              className="flex items-center gap-2 font-epilogue text-sm font-semibold text-[#515B6F] transition hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-8 font-epilogue text-xs text-[#A8ADB7]">
        © 2021 QuickHire. All rights reserved.
      </p>
    </div>
  );
}
