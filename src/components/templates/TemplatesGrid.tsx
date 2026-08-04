"use client";

import { useMemo, useState } from "react";
import { TemplateCard } from "@/components/cards/TemplateCard";
import { templateFilterCategories, type TemplateDefinition, type TemplateFilterCategory } from "@/lib/templates";

interface TemplatesGridProps {
  templates: TemplateDefinition[];
}

export function TemplatesGrid({ templates }: TemplatesGridProps) {
  const [activeCategory, setActiveCategory] = useState<TemplateFilterCategory>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return templates;
    return templates.filter((template) => template.category === activeCategory);
  }, [templates, activeCategory]);

  return (
    <div className="flex flex-col gap-10">
      <div
        role="group"
        aria-label="Filter templates by category"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {templateFilterCategories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-ink-200 bg-white text-ink-600 hover:border-ink-900 hover:text-ink-900"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <TemplateCard key={template.slug} {...template} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-ink-200 bg-surface-alt p-10 text-center">
          <p className="text-base text-ink-600">
            No templates in this category yet — check back soon, or tell us what you have in mind.
          </p>
        </div>
      )}
    </div>
  );
}
