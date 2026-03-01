"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import IconImg from "@/assets/icon.png";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 bg-background font-inter">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-11">
        {/* LEFT */}
        <div className="flex flex-1 items-center gap-x-8">
          <div
            className="flex cursor-pointer items-center gap-2"
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

            <span className="font-red-hat text-2xl font-bold tracking-tight">
              QuickHire
            </span>
          </div>

          <nav className="hidden items-center gap-4 font-epilogue md:flex">
            <Link href="/jobs" className="text-muted hover:text-muted/90">
              Jobs
            </Link>

            <Link href="/companies" className="text-muted hover:text-muted/90">
              Browse Companies
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {!user ? (
                <>
                  <Button
                    variant="ghost"
                    className="hidden h-12 rounded-none text-primary hover:bg-primary hover:text-white md:inline-flex"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>

                  <Button
                    className="h-12 rounded-none"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none">
                      <Avatar className="h-10 w-10 cursor-pointer">
                        {/* future profile image */}
                        <AvatarImage src={user.image ?? ""} />

                        <AvatarFallback className="bg-primary text-white font-semibold">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-40 rounded-none"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer font-medium text-red-600 focus:text-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
