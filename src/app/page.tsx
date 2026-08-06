import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TemplatesPreview } from "@/components/home/TemplatesPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Process } from "@/components/home/Process";
import { FinalCta } from "@/components/home/FinalCta";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

const title = `${siteConfig.name} — Web Design & Development for Small Businesses in Vancouver`;
const description =
  "We design and build modern, fast, professional websites for small and local businesses in Vancouver and the surrounding areas — helping you look credible online and win more customers.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/" });

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <TrustBar />
      <ServicesPreview />
      <TemplatesPreview />
      <WhyChooseUs />
      <Process />
      <FinalCta />
    </>
  );
}
