"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUpVariants, VIEWPORT_ONCE } from "@/lib/motion";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before starting — for hand-sequencing a few elements (e.g. the hero). */
  delay?: number;
  /** Animate immediately on mount instead of on scroll into view — use for above-the-fold content. */
  immediate?: boolean;
}

/** The default section/heading reveal: fades in while easing up ~22px. Animates once. */
export function FadeUp({ children, className, delay = 0, immediate = false }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      transition={{ delay }}
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: VIEWPORT_ONCE })}
    >
      {children}
    </motion.div>
  );
}
