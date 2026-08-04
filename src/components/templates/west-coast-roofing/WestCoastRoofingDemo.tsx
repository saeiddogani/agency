import type { CSSProperties } from "react";
import { Oswald, Source_Sans_3 } from "next/font/google";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { WhyUs } from "./WhyUs";
import { Projects } from "./Projects";
import { About } from "./About";
import { Cta } from "./Cta";
import { Footer } from "./Footer";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-wcr-heading",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-wcr-sans",
  display: "swap",
});

/**
 * West Coast Roofing — a fully self-contained demo website (fictional
 * business) shown at /templates/west-coast-roofing. It intentionally uses
 * its own fonts, color palette, header, and footer instead of the agency's
 * — see SiteChrome, which hides the agency chrome on this route — so it
 * reads as an independent business site rather than a page on our site.
 */
export function WestCoastRoofingDemo() {
  const themeStyle = {
    "--font-heading": "var(--font-wcr-heading)",
    "--font-sans": "var(--font-wcr-sans)",
    fontFamily: "var(--font-sans)",
  } as CSSProperties;

  return (
    <div className={`${oswald.variable} ${sourceSans.variable} bg-white`} style={themeStyle}>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Projects />
        <About />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
