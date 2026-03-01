import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero";
import { CompaniesSection } from "@/components/sections/companies";
import { CategoriesSection } from "@/components/sections/categories";
import { CTASection } from "@/components/sections/cta-banner";
import { FeaturedJobsSection } from "@/components/sections/featured-jobs";
import { LatestJobsSection } from "@/components/sections/latest-jobs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pb-12">
        <HeroSection />
        <CompaniesSection />
        <CategoriesSection />
        <CTASection />
        <FeaturedJobsSection />
        <LatestJobsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
