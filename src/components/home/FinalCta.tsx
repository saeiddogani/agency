import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface FinalCtaProps {
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

/** Shared closing CTA band used on the homepage and reused across other pages. */
export function FinalCta({
  heading = "Ready to Turn More Visitors Into Customers?",
  text = "Tell us about your business and we'll show you what's possible — no pressure, no obligation.",
  buttonLabel = "Start Your Project",
  buttonHref = "/contact",
}: FinalCtaProps) {
  return (
    <section className="border-t border-ink-900 bg-ink-950 py-20 lg:py-28">
      <Container className="flex flex-col items-center gap-7 text-center">
        <h2 className="text-balance max-w-2xl text-white">{heading}</h2>
        <p className="max-w-lg text-lg text-ink-300">{text}</p>
        <Button
          href={buttonHref}
          size="lg"
          gaEvent="cta_click"
          gaEventParams={{ cta_label: buttonLabel, cta_location: "final_cta" }}
        >
          {buttonLabel}
        </Button>
      </Container>
    </section>
  );
}
