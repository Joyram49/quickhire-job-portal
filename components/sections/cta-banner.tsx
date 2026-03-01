import Image from "next/image";
import dashboardMockup from "@/assets/cta.png";

export function CTASection() {
  return (
    <section id="cta" className="bg-white py-[72px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-11">
        {/* Outer wrapper with clip-path to cut top-left and bottom-right corners */}
        <div
          className="relative w-full overflow-hidden bg-primary"
          style={{
            clipPath:
              "polygon(60px 0%, 100% 0%, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0% 100%, 0% 60px)",
          }}
        >
          <div className="flex flex-col items-center gap-8 px-10 py-14 md:flex-row md:gap-0 md:px-16 md:py-0">
            {/* Left: Text content */}
            <div className="flex flex-col gap-6 md:w-1/2 md:py-16 md:pr-12">
              <h2 className="font-clash-display text-[48px] font-bold leading-[110%] text-white">
                Start posting
                <br />
                jobs today
              </h2>
              <p className="font-epilogue text-base  font-medium leading-custom text-white/80">
                Start posting jobs for only $10.
              </p>
              <div className="mt-2">
                <button className="border-2 border-white bg-transparent px-8 py-4 font-epilogue text-base font-bold text-white transition hover:bg-white hover:text-primary">
                  Sign Up For Free
                </button>
              </div>
            </div>

            {/* Right: Dashboard mockup — overflows upward */}
            <div className="relative hidden md:flex md:w-1/2 md:items-end md:justify-end">
              <div
                className="relative w-full max-w-[620px] overflow-hidden rounded-tl-[8px] rounded-tr-[8px] shadow-2xl"
                style={{ marginTop: "-40px" }}
              >
                <Image
                  src={dashboardMockup}
                  alt="QuickHire Dashboard"
                  width={620}
                  height={480}
                  className="w-full object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Decorative diagonal lines — bottom right accent */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 opacity-20"
            aria-hidden
          >
            <svg
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="160"
                x2="160"
                y2="0"
                stroke="white"
                strokeWidth="1.5"
              />
              <line
                x1="20"
                y1="160"
                x2="160"
                y2="20"
                stroke="white"
                strokeWidth="1.5"
              />
              <line
                x1="40"
                y1="160"
                x2="160"
                y2="40"
                stroke="white"
                strokeWidth="1.5"
              />
              <line
                x1="60"
                y1="160"
                x2="160"
                y2="60"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
