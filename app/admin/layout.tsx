"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import IconImg from "@/assets/icon.png";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#F8F8FD] text-foreground">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-11">
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
            <div className="flex flex-col leading-tight">
              <span className="font-red-hat text-lg font-semibold">
                QuickHire
              </span>
              <span className="font-epilogue text-xs text-muted-foreground">
                Admin Dashboard
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-4 font-epilogue text-sm">
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-primary"
            >
              Overview
            </Link>
            <Link
              href="/admin/jobs"
              className="text-muted-foreground hover:text-primary"
            >
              Jobs
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-11">
        {children}
      </main>
    </div>
  );
}
