import type { CSSProperties } from "react";
import { Space_Grotesk, Public_Sans } from "next/font/google";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Approach } from "./Approach";
import { CaseStudies } from "./CaseStudies";
import { Insights } from "./Insights";
import { About } from "./About";
import { Cta } from "./Cta";
import { Footer } from "./Footer";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-apex-heading",
});

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-apex-body",
});

export function ApexConsultingDemo() {
  return (
    <div
      className={`${heading.variable} ${body.variable} bg-white`}
      style={
        {
          "--font-heading": "var(--font-apex-heading)",
          "--font-sans": "var(--font-apex-body)",
          fontFamily: "var(--font-sans)",
        } as CSSProperties
      }
    >
      <Header />
      <main>
        <Hero />
        <Services />
        <Approach />
        <CaseStudies />
        <Insights />
        <About />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
