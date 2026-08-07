/**
 * ─────────────────────────────────────────────────────────────────────────
 * MOTION TOKENS — Phase 10B (homepage motion & micro-interactions)
 * ─────────────────────────────────────────────────────────────────────────
 * Every scroll-reveal and entrance animation on the site should read off
 * these values instead of hard-coding its own duration/easing/distance, so
 * the whole homepage moves with one consistent, calm feel. See
 * src/components/motion/ for the reusable components built on top of this.
 *
 * Hover/press micro-interactions (cards, buttons, browser mockups) are
 * intentionally NOT built with this library — those are implemented as
 * plain CSS transitions (transform/box-shadow/border-color) directly in
 * each component. CSS handles simple hover/active states just as smoothly
 * with zero JS cost, no hydration risk, and correct default behavior on
 * touch devices (no phantom "stuck hover" state). Motion is reserved for
 * what CSS can't do well on its own: scroll-triggered reveals with
 * viewport detection + staggering, and the hero's coordinated entrance
 * sequence, and mount/unmount exit animations (the mobile menu).
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Smooth "ease-out" curve — fast start, gentle settle. No overshoot/bounce. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.45,
  base: 0.55,
  slow: 0.65,
} as const;

/** Vertical distance (px) content travels during a fade-up reveal. */
export const REVEAL_DISTANCE = 22;

/** Delay (s) between each child in a staggered group. */
export const STAGGER = {
  tight: 0.06,
  base: 0.08,
  loose: 0.1,
} as const;

/**
 * Shared viewport settings for scroll-triggered reveals: animate only once
 * (never re-hide/replay on repeated scrolling), and trigger a little before
 * the section is fully in view (20% visible) so it doesn't feel late.
 */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

/** Fade + slight upward-motion reveal — the default for headings, cards, and grid items. */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

/** Opacity-only reveal — for contexts where any vertical motion would feel like too much. */
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

/**
 * Parent variants for StaggerContainer/AnimatedSection: has no visual state
 * of its own, it just staggers the "visible" trigger to its children
 * (which should use fadeUpVariants/fadeInVariants via <StaggerItem>).
 */
export function staggerContainer(stagger: number = STAGGER.base, delayChildren = 0) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
