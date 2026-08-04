import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/icons";
import type { TemplateDefinition } from "@/lib/templates";

/**
 * Shown at /templates/[slug] for templates that don't have a full demo
 * site built yet. Rendered chrome-free (see SiteChrome), so it includes
 * its own minimal way back to the rest of the agency site.
 */
export function ComingSoonDemo({ template }: { template: TemplateDefinition }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-alt px-6 py-24 text-center">
      <Link href="/templates" className="mb-8 text-sm font-medium text-brand-600 hover:text-brand-700">
        ← Back to Templates
      </Link>

      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
        {template.category}
      </span>
      <h1 className="mt-3 text-balance">{template.name}</h1>
      <p className="mt-4 max-w-lg text-base text-ink-500">{template.description}</p>

      <div className="mt-8 flex max-w-sm flex-col items-center gap-3 rounded-lg border border-ink-200 bg-white p-6">
        <p className="text-sm text-ink-600">
          The full interactive demo for this template is coming soon. In the meantime, tell us about your
          business and we&apos;ll show you how this style could work for you.
        </p>
        <Button href="/contact" size="md">
          Start Your Project
          <IconArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  );
}
