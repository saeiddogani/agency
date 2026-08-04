import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { IconShieldCheck, IconZap } from "@/components/icons";

export function Hero() {
  return (
    <section className="border-b border-ink-200 bg-white">
      <Container className="grid grid-cols-1 items-center gap-14 py-16 lg:grid-cols-2 lg:gap-10 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-ink-200 px-3 py-1 text-xs font-medium text-ink-500">
            Web Design &amp; Development for Local Businesses
          </span>
          <h1 className="text-balance">Websites That Help Your Business Grow.</h1>
          <p className="max-w-lg text-lg text-ink-500">
            We design and build modern, fast, and professional websites for businesses that want to
            stand out online and turn visitors into customers.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href="/contact"
              size="lg"
              gaEvent="cta_click"
              gaEventParams={{ cta_label: "Get Started", cta_location: "hero" }}
            >
              Get Started
            </Button>
            <Button href="/templates" variant="outline" size="lg">
              View Templates
            </Button>
          </div>
        </div>

        <div className="relative">
          <BrowserMockup label="yourbusiness.com" className="relative z-10">
            <div className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 rounded-full bg-ink-900" />
                <div className="flex gap-3">
                  <div className="h-2 w-10 rounded-full bg-ink-200" />
                  <div className="h-2 w-10 rounded-full bg-ink-200" />
                  <div className="h-2 w-10 rounded-full bg-ink-200" />
                </div>
                <div className="h-7 w-20 rounded-md bg-brand-600" />
              </div>

              <div className="mt-2 flex flex-col gap-3 rounded-lg bg-ink-50 p-6">
                <div className="h-4 w-3/4 rounded bg-ink-900" />
                <div className="h-4 w-1/2 rounded bg-ink-900" />
                <div className="h-2.5 w-2/3 rounded bg-ink-300" />
                <div className="mt-2 h-9 w-32 rounded-md bg-brand-600" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-2 rounded-md border border-ink-100 p-3">
                  <div className="h-6 w-6 rounded bg-brand-100" />
                  <div className="h-2 w-full rounded bg-ink-200" />
                  <div className="h-2 w-2/3 rounded bg-ink-100" />
                </div>
                <div className="flex flex-col gap-2 rounded-md border border-ink-100 p-3">
                  <div className="h-6 w-6 rounded bg-brand-100" />
                  <div className="h-2 w-full rounded bg-ink-200" />
                  <div className="h-2 w-2/3 rounded bg-ink-100" />
                </div>
                <div className="flex flex-col gap-2 rounded-md border border-ink-100 p-3">
                  <div className="h-6 w-6 rounded bg-brand-100" />
                  <div className="h-2 w-full rounded bg-ink-200" />
                  <div className="h-2 w-2/3 rounded bg-ink-100" />
                </div>
              </div>
            </div>
          </BrowserMockup>

          <div className="absolute -bottom-6 -left-6 z-20 hidden items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-3 shadow-lg sm:flex">
            <IconZap className="h-4 w-4 text-brand-600" />
            <span className="text-xs font-medium text-ink-700">Loads in under 1 second</span>
          </div>

          <div className="absolute -right-4 -top-4 z-20 hidden items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-3 shadow-lg sm:flex">
            <IconShieldCheck className="h-4 w-4 text-brand-600" />
            <span className="text-xs font-medium text-ink-700">Built to Convert</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
