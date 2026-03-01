"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/zod/auth.validation";
import { useLogin } from "@/services/auth/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import IconImg from "@/assets/icon.png";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const { refreshUser } = useAuth();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        refreshUser();
        router.push("/admin");
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F8F8FD]">
      {/* Left panel — brand / illustration */}
      <div
        className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-12 lg:flex"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 60px 100%)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2"
          onClick={() => router.push("/")}
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-xl">
            <Image
              src={IconImg}
              alt="QuickHire logo"
              fill
              className="object-contain"
              sizes="32px"
            />
          </div>
          <span className="font-clash-display text-xl font-semibold text-white">
            QuickHire
          </span>
        </div>

        {/* Center copy */}
        <div className="flex flex-col gap-6">
          <h2 className="font-clash-display text-[48px] font-bold leading-[110%] text-white">
            Find your
            <br />
            dream job
            <br />
            today.
          </h2>
          <p className="font-epilogue text-base text-white/75 max-w-xs">
            Great platform for the job seeker that is passionate about startups.
          </p>

          {/* Stats row */}
          <div className="mt-4 flex gap-8">
            {[
              { value: "1.8k+", label: "Companies" },
              { value: "12k+", label: "Jobs Posted" },
              { value: "20M+", label: "Job Seekers" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-clash-display text-2xl font-bold text-white">
                  {s.value}
                </span>
                <span className="font-epilogue text-xs text-white/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative lines */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 opacity-10"
          aria-hidden
        >
          <svg viewBox="0 0 192 192" fill="none">
            {[0, 20, 40, 60, 80].map((o) => (
              <line
                key={o}
                x1={o}
                y1="192"
                x2="192"
                y2={o}
                stroke="white"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>

        {/* Copyright bottom */}
        <p className="font-epilogue text-xs text-white/40">
          © 2021 QuickHire. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div
            className="mb-8 flex items-center gap-2 lg:hidden"
            onClick={() => router.push("/")}
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-xl">
              <Image
                src={IconImg}
                alt="QuickHire logo"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <span className="font-clash-display text-lg font-semibold text-secondary">
              QuickHire
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-clash-display text-[32px] font-semibold leading-[120%] text-secondary">
              Welcome back
            </h1>
            <p className="mt-2 font-epilogue text-sm text-[#515B6F]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1.5">
                    <FormLabel
                      htmlFor="email"
                      className="font-epilogue text-sm font-semibold text-secondary"
                    >
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        className="h-12 rounded-none border border-[#D6DDEB] bg-white px-4 font-epilogue text-sm text-secondary placeholder-[#A8ADB7] focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-epilogue text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <FormLabel
                        htmlFor="password"
                        className="font-epilogue text-sm font-semibold text-secondary"
                      >
                        Password
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        className="font-epilogue text-xs font-semibold text-primary hover:underline underline-offset-4"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        className="h-12 rounded-none border border-[#D6DDEB] bg-white px-4 font-epilogue text-sm text-secondary placeholder-[#A8ADB7] focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-epilogue text-xs" />
                  </FormItem>
                )}
              />

              {/* Error message */}
              {loginMutation.isError && (
                <p className="font-epilogue text-sm text-red-500">
                  {String(
                    (loginMutation.error as unknown as { message?: string })
                      ?.message,
                  ) || "An error occurred."}
                </p>
              )}

              <Button
                type="submit"
                disabled={loginMutation.status === "pending"}
                className="mt-2 h-12 w-full rounded-none bg-primary font-epilogue text-sm font-bold text-white hover:bg-[#3730c4] disabled:opacity-60"
              >
                {loginMutation.status === "pending"
                  ? "Logging in..."
                  : "Log In"}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 border-t border-[#D6DDEB]" />
                <span className="font-epilogue text-xs text-[#7C8493]">
                  or continue with
                </span>
                <div className="flex-1 border-t border-[#D6DDEB]" />
              </div>

              {/* Google SSO button */}
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 border border-[#D6DDEB] bg-white font-epilogue text-sm font-semibold text-secondary transition hover:border-primary hover:bg-[#F8F8FD]"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
