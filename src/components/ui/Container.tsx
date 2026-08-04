import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Consistent max-width + horizontal padding wrapper used across all sections. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
