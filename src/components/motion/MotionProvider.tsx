"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Wraps the app (see SiteChrome) with a global Motion default:
 * `reducedMotion="user"` makes every animation built with the components in
 * this folder automatically respect the visitor's OS-level "prefers-reduced
 * motion" setting — transform-based movement (the y/scale in our reveals)
 * is skipped and only opacity changes, with no extra code needed per
 * component. See src/lib/motion.ts for the shared timing/easing tokens.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
