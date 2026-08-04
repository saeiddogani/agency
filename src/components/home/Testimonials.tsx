import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { testimonials } from "@/lib/data";

/**
 * NOTE: These are placeholder testimonials for layout purposes only.
 * Replace the entries in `src/lib/data.ts` (`testimonials`) with real,
 * verified client feedback before this section goes live for marketing use.
 */
export function Testimonials() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="testimonials-heading">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="testimonials-heading"
          align="center"
          eyebrow="Example Client Feedback"
          title="What clients could say about working with us"
          description="Placeholder testimonials shown for layout purposes — these will be replaced with real feedback as we take on clients."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name + testimonial.role} {...testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
