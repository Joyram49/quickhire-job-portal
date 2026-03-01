import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import IconImg from "@/assets/icon.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background  font-inter">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-11">
        <div className="flex-1 justify-start flex gap-x-8 items-center">
          <div className="flex justify-between items-center gap-2">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl">
              <Image
                src={IconImg}
                alt="QuickHire logo"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <span className="text-2xl leading-[150%] font-bold font-red-hat tracking-tight">
              QuickHire
            </span>
          </div>

          <nav className="hidden items-center gap-4 text-base font-medium  font-epilogue md:flex">
            <Link
              href="#jobs"
              className="transition-colors text-muted hover:text-muted/90"
            >
              Jobs
            </Link>
            <Link
              href="#companies"
              className="transition-colors text-muted hover:text-muted/90"
            >
              Browse Companies
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="hidden md:inline-flex text-primary hover:bg-primary hover:text-white h-12! rounded-none"
          >
            Login
          </Button>
          <Button className=" rounded-none h-12! cursor-pointer">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
