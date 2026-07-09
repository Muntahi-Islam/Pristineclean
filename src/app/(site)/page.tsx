import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Testimonials } from "@/components/home/Testimonials";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { CoverageMap } from "@/components/home/CoverageMap";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <TrustedCompanies />
      <ServicesPreview />
      <ProcessTimeline />
      <BeforeAfter />
      <Testimonials />
      <GalleryPreview />
      <CoverageMap />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
