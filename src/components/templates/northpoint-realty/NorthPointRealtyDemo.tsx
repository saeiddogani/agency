import type { CSSProperties } from "react";
import { Sora, Nunito_Sans } from "next/font/google";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Properties } from "./Properties";
import { Services } from "./Services";
import { Team } from "./Team";
import { About } from "./About";
import { Cta } from "./Cta";
import { Footer } from "./Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-np-heading",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-np-sans",
  display: "swap",
});

/**
 * NorthPoint Realty — a fully self-contained demo real estate website
 * (fictional business) shown at /templates/northpoint-realty. Uses a
 * premium slate-and-teal palette with a modern geometric heading font,
 * deliberately different from the agency site and the other template demos.
 */
export function NorthPointRealtyDemo() {
  const themeStyle = {
    "--font-heading": "var(--font-np-heading)",
    "--font-sans": "var(--font-np-sans)",
    fontFamily: "var(--font-sans)",
  } as CSSProperties;

  return (
    <div className={`${sora.variable} ${nunitoSans.variable} bg-white`} style={themeStyle}>
      <Header />
      <main>
        <Hero />
        <Properties />
        <Services />
        <Team />
        <About />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
