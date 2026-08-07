"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/motion";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/** One item inside a <StaggerContainer> — must be a descendant of one for variant propagation to reach it. */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}
