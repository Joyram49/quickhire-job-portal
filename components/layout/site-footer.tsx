import { Facebook, Instagram, Dribbble, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const aboutLinks = [
  "Companies",
  "Pricing",
  "Terms",
  "Advice",
  "Privacy Policy",
];
const resourceLinks = ["Help Docs", "Guide", "Updates", "Contact Us"];

export function SiteFooter() {
  return (
    <footer className="bg-[#202430]">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-11">
        <div className="grid gap-12 py-16 md:grid-cols-[1.8fr_1fr_1fr_1.8fr]">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="6"
                    stroke="white"
                    strokeWidth="2.5"
                  />
                  <circle cx="10" cy="10" r="2" fill="white" />
                </svg>
              </div>
              <span className="font-clash-display text-xl font-semibold text-white">
                QuickHire
              </span>
            </div>
            {/* Tagline */}
            <p className="font-epilogue text-sm leading-relaxed text-[#D6DDEB]">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* Col 2: About */}
          <div className="flex flex-col gap-6">
            <h3 className="font-clash-display text-base font-semibold text-white">
              About
            </h3>
            <ul className="flex flex-col gap-4">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-epilogue text-sm text-[#D6DDEB] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="flex flex-col gap-6">
            <h3 className="font-clash-display text-base font-semibold text-white">
              Resources
            </h3>
            <ul className="flex flex-col gap-4">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-epilogue text-sm text-[#D6DDEB] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-clash-display text-base font-semibold text-white">
              Get job notifications
            </h3>
            <p className="font-epilogue text-sm leading-relaxed text-[#D6DDEB]">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="mt-2 flex items-center gap-x-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 border border-[#D6DDEB] bg-white px-4 py-3 font-epilogue text-sm text-secondary placeholder-[#A8ADB7] outline-none focus:border-primary"
              />
              <button className="shrink-0 bg-primary px-6 py-3 font-epilogue text-sm font-semibold text-white transition hover:bg-[#3730c4] h-12.5!">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#FFFFFF1A]" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="font-epilogue text-sm text-[#D6DDEB]">
            2021 @ QuickHire. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Dribbble, label: "Dribbble" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
            ].map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF1A] text-[#D6DDEB] transition hover:border-primary hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
