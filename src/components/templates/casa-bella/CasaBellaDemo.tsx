import type { CSSProperties } from "react";
import { Playfair_Display, Mulish } from "next/font/google";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Story } from "./Story";
import { Menu } from "./Menu";
import { ChefSelection } from "./ChefSelection";
import { Gallery } from "./Gallery";
import { Experience } from "./Experience";
import { ReservationCta } from "./ReservationCta";
import { Footer } from "./Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-cb-heading",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-cb-sans",
  display: "swap",
});

/**
 * Casa Bella — a fully self-contained demo restaurant website (fictional
 * business) shown at /templates/casa-bella. Uses an elegant serif/sans
 * pairing and a warm wine-and-cream palette, deliberately different from
 * the agency site and the other template demos.
 */
export function CasaBellaDemo() {
  const themeStyle = {
    "--font-heading": "var(--font-cb-heading)",
    "--font-sans": "var(--font-cb-sans)",
    fontFamily: "var(--font-sans)",
  } as CSSProperties;

  return (
    <div className={`${playfair.variable} ${mulish.variable} bg-[#FBF7F0]`} style={themeStyle}>
      <Header />
      <main>
        <Hero />
        <Story />
        <Menu />
        <ChefSelection />
        <Gallery />
        <Experience />
        <ReservationCta />
      </main>
      <Footer />
    </div>
  );
}
