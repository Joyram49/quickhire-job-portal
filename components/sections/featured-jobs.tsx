import SectionTop from "../shared/SectionTop";
import companyOne from "@/assets/jobs/BvBoaEET_400x400 1.png";
import companyTwo from "@/assets/jobs/Dropbox.png";
import companyThree from "@/assets/jobs/fiSX9QYy_400x400 1.png";
import companyFour from "@/assets/jobs/qUvcta52_400x400 1.png";
import companyFive from "@/assets/jobs/s93HU9p3_400x400.png";
import companySix from "@/assets/jobs/v-6GHzAd_400x400.png";
import companySeven from "@/assets/jobs/godaddy-logo-0 1.png";
import companyEight from "@/assets/jobs/Btnfm47p_400x400 1.png";
import Image from "next/image";

const tagColors: Record<string, string> = {
  Marketing: "bg-[#FFF3E4] text-[#FFB836]",
  Design: "bg-[#E8F9F0] text-[#56CDAD]",
  Business: "bg-[#F4F0FF] text-[#4640DE]",
  Technology: "bg-[#FFE7E7] text-[#FF6550]",
};

const featuredJobs = [
  {
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    type: "Full Time",
    tags: ["Marketing", "Design"],
    image: companyOne,
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    type: "Full Time",
    tags: ["Design", "Business"],
    image: companyTwo,
  },
  {
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    description:
      "Pitch is looking for Customer Manager to join marketing t ...",
    type: "Full Time",
    tags: ["Marketing"],
    image: companyThree,
  },
  {
    title: "Visual Designer",
    company: "Blinkist",
    location: "Granada, Spain",
    description:
      "Blinkist is looking for Visual Designer to help team desi ...",
    type: "Full Time",
    tags: ["Design"],
    image: companyFour,
  },
  {
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    description: "ClassPass is looking for Product Designer to help us...",
    type: "Full Time",
    tags: ["Marketing", "Design"],
    image: companyFive,
  },
  {
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    type: "Full Time",
    tags: ["Design", "Business"],
    image: companySix,
  },
  {
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    type: "Full Time",
    tags: ["Marketing"],
    image: companySeven,
  },
  {
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    type: "Full Time",
    tags: ["Technology"],
    image: companyEight,
  },
];

export function FeaturedJobsSection() {
  return (
    <section id="featured-jobs" className="bg-white pt-[72px] pb-[72px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-11">
        {/* Section header */}
        <SectionTop title="Featured jobs" type="jobs" count={1} />

        {/* Jobs grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredJobs.map((job, i) => (
            <article
              key={`${job.title}-${i}`}
              className="group flex flex-col justify-between rounded-[8px] border border-[#D6DDEB] bg-white p-6 text-sm transition hover:-translate-y-0.5 hover:border-[#C2CCE0] hover:shadow-md cursor-pointer"
            >
              {/* Top row: logo + badge */}
              <div className="flex items-start justify-between">
                <Image
                  src={job.image}
                  alt={job.company}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full overflow-hidden"
                />
                <span className="rounded border border-primary px-3 py-1 font-epilogue text-xs font-semibold text-primary">
                  {job.type}
                </span>
              </div>

              {/* Job info */}
              <div className="mt-4">
                <h3 className="font-clash-display text-lg font-semibold leading-[120%] text-secondary">
                  {job.title}
                </h3>
                <p className="mt-1 font-epilogue text-sm text-[#515B6F]">
                  {job.company}
                  <span className="mx-2 text-[#D6DDEB]">•</span>
                  {job.location}
                </p>
                <p className="mt-3 font-epilogue text-sm leading-relaxed text-[#7C8493]">
                  {job.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3 py-1 font-epilogue text-xs font-semibold ${
                      tagColors[tag] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
