interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Heading level for correct document outline. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  /** Optional id, so a parent <section> can reference it via aria-labelledby. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
          {eyebrow}
        </span>
      ) : null}
      <Heading id={id} className="text-balance max-w-2xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 max-w-xl text-base text-ink-500 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
