import type { CSSProperties } from "react";
import { Bebas_Neue, Work_Sans } from "next/font/google";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Team } from "./Team";
import { Gallery } from "./Gallery";
import { About } from "./About";
import { BookingCta } from "./BookingCta";
import { Footer } from "./Footer";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-s22-heading",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-s22-sans",
  display: "swap",
});

/**
 * Studio 22 — a fully self-contained demo barbershop/salon website
 * (fictional business) shown at /templates/studio-22. Uses a bold black,
 * white, and gold palette with condensed poster-style headings, deliberately
 * different from the agency site and the other template demos.
 */
export function Studio22Demo() {
  const themeStyle = {
    "--font-heading": "var(--font-s22-heading)",
    "--font-sans": "var(--font-s22-sans)",
    fontFamily: "var(--font-sans)",
  } as CSSProperties;

  return (
    <div className={`${bebasNeue.variable} ${workSans.variable} bg-black`} style={themeStyle}>
      <Header />
      <main>
        <Hero />
        <Services />
        <Team />
        <Gallery />
        <About />
        <BookingCta />
      </main>
      <Footer />
    </div>
  );
}
