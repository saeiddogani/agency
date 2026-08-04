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
      className={`overflow-hidden rounded-xl border border-ink-200 bg-white shadow-[0_1px_2px_rgba(16,21,29,0.04),0_16px_40px_-16px_rgba(16,21,29,0.18)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-ink-200 bg-ink-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" aria-hidden />
        <div className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-xs text-ink-500 border border-ink-100">
          {label}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
