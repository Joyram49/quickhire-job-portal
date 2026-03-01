import { ArrowRight } from "lucide-react";
import React from "react";

type SectionTopProps = {
  title: string;
  type: string;
  count: number; // number of accent words
};

const SectionTop = ({ title, type, count }: SectionTopProps) => {
  const words = title.split(" ");

  // Ensure count doesn't exceed word length
  const accentCount = Math.min(count, words.length);

  const remainingText = words.slice(0, words.length - accentCount).join(" ");
  const accentText = words.slice(words.length - accentCount).join(" ");

  return (
    <div className="flex items-center justify-between">
      <h2 className="font-clash-display font-semibold text-[48px] leading-[110%] tracking-[0%] text-secondary">
        {remainingText}
        {accentText && <span className="text-accent ml-2">{accentText}</span>}
      </h2>

      <div className="flex items-center gap-2 group cursor-pointer transition-transform duration-150 hover:translate-x-1">
        <p className="font-epilogue font-medium text-base leading-[160%] text-primary group-hover:text-primary/80 transition-colors duration-150">
          show all {type}
        </p>
        <ArrowRight className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors duration-150" />
      </div>
    </div>
  );
};

export default SectionTop;
