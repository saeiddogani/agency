"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeInVariants, VIEWPORT_ONCE } from "@/lib/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before starting — for hand-sequencing a few elements (e.g. the hero). */
  delay?: number;
  /** Animate immediately on mount instead of on scroll into view — use for above-the-fold content. */
  immediate?: boolean;
}

/** Opacity-only reveal. Prefer <FadeUp> for most content; use this where any vertical motion would be too much. */
export function FadeIn({ children, className, delay = 0, immediate = false }: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInVariants}
      initial="hidden"
      transition={{ delay }}
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: VIEWPORT_ONCE })}
    >
      {children}
    </motion.div>
  );
}
