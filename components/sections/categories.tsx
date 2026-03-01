import SectionTop from "../shared/SectionTop";
import category1 from "@/assets/category/category1.svg";
import category2 from "@/assets/category/category2.svg";
import category3 from "@/assets/category/category3.svg";
import category4 from "@/assets/category/category4.svg";
import category5 from "@/assets/category/category5.svg";
import category6 from "@/assets/category/category6.svg";
import category7 from "@/assets/category/cateogry7.svg";
import category8 from "@/assets/category/category8.svg";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Design", roles: 345, icon: category1 },
  { name: "Sales", roles: 278, icon: category2 },
  { name: "Marketing", roles: 192, icon: category3 },
  { name: "Finance", roles: 164, icon: category4 },
  { name: "Technology", roles: 421, icon: category5 },
  { name: "Engineering", roles: 309, icon: category6 },
  { name: "Business", roles: 203, icon: category7 },
  { name: "Human Resource", roles: 89, icon: category8 },
];

export function CategoriesSection() {
  return (
    <section id="categories" className="bg-white pt-[72px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-11">
        <SectionTop title="Explore by category" type="jobs" count={1} />

        <div className="mt-12 grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className="group flex h-[214px] w-full max-w-[274px] flex-col justify-between border border-[#D6DDEB] bg-white p-8 text-left text-sm transition hover:-translate-y-0.5 hover:border-[#C2CCE0] hover:shadow-md hover:bg-primary"
            >
              <div className="flex flex-col gap-8">
                <Image
                  src={category.icon.src ?? category.icon}
                  alt={category.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 transition duration-150 group-hover:brightness-0 group-hover:invert"
                />
                <div className="flex flex-col gap-3 max-w-fit">
                  <p className="text-2xl leading-[120%] font-semibold text-secondary font-clash-display group-hover:text-white transition-colors duration-150">
                    {category.name}
                  </p>
                  <div className="flex items-center justify-between gap-4 font-epilogue text-base leading-custom text-[#7C8493] group-hover:text-white transition-colors duration-150">
                    <span>
                      {category.roles.toLocaleString()} jobs available
                    </span>
                    <ArrowRight className="w-6 h-6 text-secondary group-hover:text-white transition-colors duration-150" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
