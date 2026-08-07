"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { staggerContainer, STAGGER, VIEWPORT_ONCE } from "@/lib/motion";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  /** Animate immediately on mount instead of on scroll into view. */
  immediate?: boolean;
}

/**
 * Reveals its <StaggerItem> children one after another (instead of all at
 * once) when scrolled into view. Use for card grids, feature lists, and
 * process steps. Animates once.
 */
export function StaggerContainer({
  children,
  className,
  stagger = STAGGER.base,
  delayChildren = 0,
  immediate = false,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      {...(immediate ? { animate: "visible" } : { whileInView: "visible", viewport: VIEWPORT_ONCE })}
    >
      {children}
    </motion.div>
  );
}
