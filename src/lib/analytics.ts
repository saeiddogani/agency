"use client";

import { sendGAEvent } from "@next/third-parties/google";

/**
 * Fires a Google Analytics event. Safe to call unconditionally — if
 * `NEXT_PUBLIC_GA_ID` isn't set, `<GoogleAnalytics />` never mounts (see
 * `src/app/layout.tsx`) and this quietly no-ops instead of throwing.
 *
 * Only wire this up to meaningful conversion actions (primary CTAs, the
 * contact form submission), not every button on the site.
 */
export function trackEvent(eventName: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  try {
    sendGAEvent("event", eventName, params);
  } catch {
    // Analytics not configured or not yet loaded — ignore.
  }
}
