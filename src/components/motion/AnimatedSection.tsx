"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUpVariants, VIEWPORT_ONCE } from "@/lib/motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scroll-triggered fade-up for a section-level block that doesn't need its
 * own internal stagger (e.g. TrustBar's single row). For a heading followed
 * by a staggered grid of cards, compose <FadeUp> (heading) +
 * <StaggerContainer>/<StaggerItem> (cards) instead — see
 * ServicesPreview.tsx for that pattern.
 */
export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {children}
    </motion.div>
  );
}
