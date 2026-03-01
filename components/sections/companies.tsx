import Image from "next/image";
import VodafoneImg from "@/assets/company/vodafone-2017-logo.png";
import IntelImg from "@/assets/company/intel-3.png";
import TeslaImg from "@/assets/company/tesla-9 1.png";
import AmdImg from "@/assets/company/amd-logo-1.png";
import TalkitImg from "@/assets/company/talkit 1.png";

const companies = [
  { name: "Vodafone", image: VodafoneImg },
  { name: "Intel", image: IntelImg },
  { name: "Tesla", image: TeslaImg },
  { name: "Amd", image: AmdImg },
  { name: "Talkit", image: TalkitImg },
];

export function CompaniesSection() {
  return (
    <section id="companies" className="bg-white opacity-50 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-11 py-12 flex flex-col gap-8">
        <p className="font-epilogue font-normal text-lg leading-custom text-[#202430]">
          Companies we helped grow
        </p>
        <div className="w-full grid grid-cols-2 gap-6 items-center justify-between sm:grid-cols-3  md:grid-cols-5">
          {companies.map((company) => (
            <div key={company.name} className="w-full h-full">
              <div className="relative h-10 w-full flex items-center justify-start ">
                <Image
                  src={company.image}
                  alt={`${company.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="sr-only">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
