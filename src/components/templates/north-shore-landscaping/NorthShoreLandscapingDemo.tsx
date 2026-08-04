import type { CSSProperties } from "react";
import { Fraunces, Karla } from "next/font/google";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Projects } from "./Projects";
import { Process } from "./Process";
import { About } from "./About";
import { Cta } from "./Cta";
import { Footer } from "./Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-nsl-heading",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-nsl-sans",
  display: "swap",
});

/**
 * North Shore Landscaping — a fully self-contained demo website (fictional
 * business) shown at /templates/north-shore-landscaping. Uses its own
 * earth-toned palette and a warm serif/sans pairing, deliberately different
 * from both the agency site and the West Coast Roofing demo.
 */
export function NorthShoreLandscapingDemo() {
  const themeStyle = {
    "--font-heading": "var(--font-nsl-heading)",
    "--font-sans": "var(--font-nsl-sans)",
    fontFamily: "var(--font-sans)",
  } as CSSProperties;

  return (
    <div className={`${fraunces.variable} ${karla.variable} bg-white`} style={themeStyle}>
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <About />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
