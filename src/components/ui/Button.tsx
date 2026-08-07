"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "md" | "lg";

/**
 * Focus ring intentionally comes from the global `:focus-visible` rule in
 * globals.css (not a Tailwind utility here) — that rule uses a two-tone
 * halo so it stays visible whether the button sits on a light or dark
 * section background.
 */
const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_1px_2px_rgba(16,21,29,0.06),0_1px_1px_rgba(31,74,140,0.3)] hover:bg-brand-700 hover:shadow-[0_6px_16px_-4px_rgba(31,74,140,0.45)]",
  secondary:
    "bg-ink-900 text-white shadow-[0_1px_2px_rgba(16,21,29,0.08)] hover:bg-ink-800 hover:shadow-[0_6px_16px_-4px_rgba(16,21,29,0.3)]",
  outline: "border border-ink-300 text-ink-900 bg-transparent hover:border-ink-900 hover:bg-ink-900/[0.04]",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  /**
   * Set this on meaningful conversion CTAs only (e.g. "cta_get_started",
   * "cta_start_project") to fire a Google Analytics event on click — not on
   * every button. See `src/lib/analytics.ts`.
   */
  gaEvent?: string;
  gaEventParams?: Record<string, string>;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Shared CTA button. Renders a Next.js Link when `href` is provided, otherwise a <button>. */
export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  gaEvent,
  gaEventParams,
  onClick,
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (gaEvent) {
      trackEvent(gaEvent, gaEventParams);
    }
    (onClick as unknown as ((event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void) | undefined)?.(
      event,
    );
  };

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={handleClick}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={handleClick}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
