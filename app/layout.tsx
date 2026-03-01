import type { Metadata } from "next";
import { Epilogue, Inter, Red_Hat_Display } from "next/font/google";
import LocalFont from "next/font/local";

import "./globals.css";
import { Providers } from "@/components/Providers";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat",
});

const clash = LocalFont({
  src: [
    {
      path: "../assets/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },

    {
      path: "../assets/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuickHire – Discover 5000+ Jobs",
  description:
    "QuickHire is a modern platform for job seekers looking for new career heights and exciting opportunities at top companies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${clash.variable} ${inter.variable} ${epilogue.variable} ${redHat.variable} `}
    >
      <body className="bg-background text-foreground antialiased">
        {/* providers contains QueryClientProvider and any future context providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
