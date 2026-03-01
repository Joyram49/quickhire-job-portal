import Image from "next/image";

import { Button } from "@/components/ui/button";
import UnderlineSvg from "@/assets/underline.svg";
import { MapPinIcon, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import HeroPersonImg from "@/assets/hero-person.png";

const locations = [
  "Florence, Italy",
  "New York, USA",
  "London, UK",
  "Paris, France",
];

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FigmaShape from "../shared/FigmaShape";

const popularSearches = ["UI Designer", "UX Researcher", "Android", "Admin"];

export function HeroSection() {
  return (
    <section className="bg-background overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-11 ">
        <div className="w-full min-h-[720px] relative ">
          <FigmaShape
            width={283}
            height={716}
            top={449}
            left={438}
            opacity={0.7}
          />

          <FigmaShape
            width={320}
            height={779}
            top={83}
            left={712}
            opacity={0.7}
          />

          <FigmaShape
            width={328}
            height={796}
            top={-120}
            left={859}
            opacity={0.7}
          />

          <FigmaShape
            width={192}
            height={416}
            top={-49}
            left={703}
            opacity={0.6}
          />
          {/* Hero Image */}
          <Image
            src={HeroPersonImg}
            alt="landing page img"
            height={707}
            width={501}
            className="absolute top-[13px] left-[690px] object-cover"
          />
          {/* Overlapping SVG rectangle */}
          <svg
            width="283.38"
            height="716.25"
            viewBox="0 0 283.38 716.25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
            style={{
              top: "484px",
              left: "856px",
              transform: "rotate(64deg)",
              background: "#FFFFFF",
              opacity: 1,
            }}
          >
            <rect width="283.38" height="716.25" fill="#FFFFFF" />
          </svg>

          {/* left section */}
          <div className="space-y-[23px] relative pt-[82px]">
            <div className="space-y-[13px] w-full md:max-w-[533px]">
              <h1 className="text-7xl text-secondary leading-[110%] font-semibold tracking-0 font-clash-display">
                Discover <br /> more than <br />
                <span className="text-accent">5000+ Jobs</span>
              </h1>
              <Image
                src={UnderlineSvg}
                alt="Jobs-mark"
                height={39}
                width={455}
              />
            </div>

            <p className="font-epilogue font-normal text-[20px] leading-[160%] tracking-normal text-muted opacity-70 w-full md:max-w-[521px]">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            <div className="flex items-stretch bg-white shadow-[0px_2.71px_4.4px_#C0C0C007,0px_6.86px_11.12px_#C0C0C00A,0px_14px_22.68px_#C0C0C00C,0px_28.84px_46.72px_#C0C0C00F,0px_79px_128px_#C0C0C017] p-4  font-epilogue w-full md:max-w-[852px]">
              <div
                className="flex-1 flex items-center gap-3 px-3
               "
              >
                <SearchIcon className="w-6 h-6 text-secondary shrink-0 mt-2" />
                <Input
                  id="role"
                  placeholder="Job title or keyword"
                  className="border-0! border-b-px! border-[#D6DDEB]! ring-0! rounded-none px-0 h-10 text-muted placeholder:text-[#7C8493] placeholder:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent mt-4"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-5 ">
                <MapPinIcon className="w-6 h-6 text-secondary shrink-0 mt-2" />
                <Select>
                  <SelectTrigger className="w-full border-0 border-b-px! border-[#D6DDEB]! bg-transparent rounded-none py-4 mt-4">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    {locations.map((loc, i) => (
                      <SelectItem
                        key={i}
                        value={loc}
                        className="hover:text-white"
                      >
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-primary text-white font-bold px-[27px] h-[57px]! rounded-none"
              >
                Search my job
              </Button>
            </div>
            <p className="-mt-[7px] text-[#202430] font-epilogue text-base leading-[160%] flex items-center gap-x-2">
              <span className="font-normal opacity-70">Popular: </span>
              <div className="flex items-center gap-x-2">
                {popularSearches.map((term, i) => (
                  <span key={i}>
                    <Link
                      href={"#"}
                      className="font-medium hover:text-primary transition-colors opacity-70"
                    >
                      {term}
                      {i !== popularSearches.length - 1 && ","}
                    </Link>
                  </span>
                ))}
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
