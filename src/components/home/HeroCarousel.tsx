"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { FadeUp } from "@/components/motion/FadeUp";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { IconChevronRight } from "@/components/icons";
import { templates } from "@/lib/templates";

const AUTOPLAY_MS = 4500;

/**
 * Hand-sequenced entrance delays (seconds) for the hero's initial reveal —
 * eyebrow → heading → paragraph → buttons → mockup, each starting shortly
 * after the last. Finishes in well under 1.1s total (last element starts at
 * 0.32s + ~0.55s duration ≈ 0.87s) so the page never feels like it's making
 * the visitor wait to read anything.
 */
const HERO_DELAYS = { eyebrow: 0, heading: 0.08, paragraph: 0.16, buttons: 0.24, mockup: 0.32 };

/**
 * Full-bleed hero: dark, edge-to-edge section with the headline/CTA up top
 * and an autoplaying carousel of browser-mockup previews (one per template
 * in lib/templates.ts) below. Deliberately still uses drawn browser mockups
 * rather than photos/screenshots — there are no image or video assets
 * anywhere in this project (see BrowserMockup's own comment), so this
 * mirrors the "full-bleed hero carousel" pattern (e.g. Squarespace's
 * homepage) using the site's existing, photography-free design system.
 */
export function HeroCarousel() {
  const count = templates.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const goTo = (index: number) => setActive(((index % count) + count) % count);
  // `active` is always kept in [0, count) by goTo()/the autoplay effect above,
  // so this index is guaranteed to exist.
  const current = templates[active]!;

  return (
    <section
      className="relative overflow-hidden border-b border-ink-900 bg-ink-950 py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Container className="flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center">
          <FadeUp immediate delay={HERO_DELAYS.eyebrow}>
            <span className="rounded-full border border-ink-700 px-3 py-1 text-xs font-medium text-ink-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
              Web Design for Vancouver Small Businesses
            </span>
          </FadeUp>
          <FadeUp immediate delay={HERO_DELAYS.heading} className="mt-5">
            <h1 className="max-w-3xl text-balance text-white">A Website That Turns Visitors Into Customers.</h1>
          </FadeUp>
          <FadeUp immediate delay={HERO_DELAYS.paragraph} className="mt-4">
            <p className="max-w-lg text-lg text-ink-300">
              We build fast, professional websites for small businesses — so you look credible the moment
              someone finds you, and easy to reach when they&apos;re ready to buy.
            </p>
          </FadeUp>
        </div>
        <FadeUp immediate delay={HERO_DELAYS.buttons} className="flex flex-col gap-3 sm:flex-row">
          <Button
            href="/contact"
            size="lg"
            gaEvent="cta_click"
            gaEventParams={{ cta_label: "Get Your Quote", cta_location: "hero" }}
          >
            Get Your Quote
          </Button>
          <Button
            href="/templates"
            variant="outline"
            size="lg"
            className="border-ink-600 text-white hover:border-white"
          >
            See Example Websites
          </Button>
        </FadeUp>

        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE_OUT, delay: HERO_DELAYS.mockup }}
        >
        <div
          className="relative w-full"
          role="region"
          aria-roledescription="carousel"
          aria-label="Example website designs"
        >
          <div className="relative">
            {templates.map((template, index) => (
              <div
                key={template.slug}
                aria-hidden={index !== active}
                className={
                  index === active
                    ? "relative opacity-100 transition-opacity duration-700 motion-reduce:transition-none"
                    : "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 motion-reduce:transition-none"
                }
              >
                <BrowserMockup label={`${template.name.toLowerCase().replace(/\s+/g, "")}.example`}>
                  <div
                    className="flex flex-col gap-3 p-6"
                    style={{ backgroundColor: `${template.accent}0d` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 rounded-full" style={{ backgroundColor: template.accent }} />
                      <div className="flex gap-3">
                        <div className="h-2 w-10 rounded-full bg-ink-200" />
                        <div className="h-2 w-10 rounded-full bg-ink-200" />
                        <div className="h-2 w-10 rounded-full bg-ink-200" />
                      </div>
                      <div className="h-7 w-20 rounded-md" style={{ backgroundColor: template.accent }} />
                    </div>

                    <div className="mt-2 flex flex-col gap-3 rounded-lg bg-ink-50 p-6">
                      <div className="h-4 w-3/4 rounded bg-ink-900" />
                      <div className="h-4 w-1/2 rounded bg-ink-900" />
                      <div className="h-2.5 w-2/3 rounded bg-ink-300" />
                      <div className="mt-2 h-9 w-32 rounded-md" style={{ backgroundColor: template.accent }} />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 rounded-md border border-ink-100 bg-white" />
                      <div className="h-16 rounded-md border border-ink-100 bg-white" />
                      <div className="h-16 rounded-md border border-ink-100 bg-white" />
                    </div>
                  </div>
                </BrowserMockup>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous example"
            className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700 bg-ink-900/80 text-white transition-colors hover:border-white sm:flex"
          >
            <IconChevronRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next example"
            className="absolute right-0 top-1/2 hidden h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700 bg-ink-900/80 text-white transition-colors hover:border-white sm:flex"
          >
            <IconChevronRight className="h-4 w-4" />
          </button>
        </div>
        </motion.div>

        <FadeUp immediate delay={HERO_DELAYS.mockup} className="flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {templates.map((template, index) => (
              <button
                key={template.slug}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show ${template.name} example`}
                aria-current={index === active}
                className={`h-2 rounded-full transition-all ${
                  index === active ? "w-6 bg-white" : "w-2 bg-ink-600 hover:bg-ink-400"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-ink-400" aria-live="polite">
            {current.name} — {current.category}
          </span>
        </FadeUp>
      </Container>
    </section>
  );
}
