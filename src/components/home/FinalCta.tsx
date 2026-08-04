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
  heading = "Ready to Build a Better Website?",
  text = "Let's create a website that makes your business look professional and helps you attract more customers.",
  buttonLabel = "Start Your Project",
  buttonHref = "/contact",
}: FinalCtaProps) {
  return (
    <section className="bg-ink-950 py-20 lg:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
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
