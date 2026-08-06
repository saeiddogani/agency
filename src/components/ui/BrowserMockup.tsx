import type { ReactNode } from "react";

interface BrowserMockupProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

/**
 * A drawn (non-photographic) browser window used to preview website
 * layouts throughout the site — avoids generic stock imagery.
 */
export function BrowserMockup({ children, label = "yourbusiness.com", className = "" }: BrowserMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-ink-200/80 bg-white shadow-[0_1px_1px_rgba(16,21,29,0.03),0_2px_6px_-2px_rgba(16,21,29,0.06),0_24px_48px_-20px_rgba(16,21,29,0.22)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-ink-200/80 bg-gradient-to-b from-ink-50 to-white px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-300" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-300" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-300" aria-hidden />
        <div className="ml-3 flex-1 truncate rounded-full border border-ink-100 bg-white px-3 py-1 text-xs text-ink-500 shadow-[inset_0_1px_2px_rgba(16,21,29,0.04)]">
          {label}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
