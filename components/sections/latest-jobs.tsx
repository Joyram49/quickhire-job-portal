import SectionTop from "../shared/SectionTop";
import CompanyOne from "@/assets/latest/Nomad.png";
import CompanyTwo from "@/assets/latest/Dropbox.png";
import CompanyThree from "@/assets/latest/Terraform Enterprise.png";
import CompanyFour from "@/assets/latest/Packer.png";
import CompanyFive from "@/assets/latest/netlify-logo 1.png";
import CompanySix from "@/assets/latest/-7tuadqI_400x400.png";
import CompanySeven from "@/assets/latest/_1M3hz0d_400x400.png";
import CompanyEight from "@/assets/latest/Tg7Mrqk2_400x400.png";
import Image from "next/image";

// Reuse same tag color system from FeaturedJobsSection
const tagColors: Record<string, string> = {
  "Full-Time": "bg-[#E8F9F0] text-[#56CDAD] border border-[#56CDAD]",
  Marketing: "bg-white text-[#FFB836] border border-[#FFB836]",
  Design: "bg-white text-[#4640DE] border border-[#4640DE]",
  Business: "bg-white text-[#4640DE] border border-[#4640DE]",
  Technology: "bg-white text-[#FF6550] border border-[#FF6550]",
};

const latestJobs = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
    image: CompanyOne,
  },
  {
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
    image: CompanyTwo,
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
    image: CompanyThree,
  },
  {
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
    image: CompanyFour,
  },
  {
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
    image: CompanyFive,
  },
  {
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Marketing", "Design"],
    image: CompanySix,
  },
  {
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
    image: CompanySeven,
  },
  {
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Design"],
    image: CompanyEight,
  },
];

function JobRow({ job }: { job: (typeof latestJobs)[0] }) {
  return (
    <div className="group flex cursor-pointer items-center gap-5 py-6 transition bg-white px-10 ">
      {/* Logo */}
      <Image
        src={job.image}
        alt={job.company}
        width={48}
        height={48}
        className="h-12 w-12 rounded-full overflow-hidden"
      />

      {/* Info */}
      <div className="flex flex-col gap-2">
        <h3 className="font-epilogue text-xl font-semibold leading-[120%] text-secondary group-hover:text-primary transition-colors">
          {job.title}
        </h3>
        <p className="font-epilogue text-sm text-[#515B6F]">
          {job.company}
          <div className="mx-2 mb-1 w-1 h-1 bg-[#515B6F] rounded-full inline-block"></div>
          {job.location}
        </p>
        <div className="flex flex-wrap gap-2">
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
      </div>
    </div>
  );
}

export function LatestJobsSection() {
  return (
    <section id="latest-jobs" className="bg-[#F8F8FD]  py-[72px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-11">
        {/* Section header */}
        <SectionTop title="Latest jobs open" type="jobs" count={2} />

        {/* Two-column job list */}
        <div className="mt-10 grid gap-x-8 gap-y-4 md:grid-cols-2">
          {latestJobs.map((job) => (
            <JobRow key={job.company} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
