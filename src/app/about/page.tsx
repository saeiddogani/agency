import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCta } from "@/components/home/FinalCta";
import { aboutValues } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

const title = "About";
const description = `Learn about ${siteConfig.name}, a web design and development studio helping small businesses in Vancouver look credible online.`;

export const metadata: Metadata = buildMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink-200 bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="About Us"
            title="We help small businesses look credible online"
            description={`${siteConfig.name} designs and builds websites for small and local businesses that want to look as good online as they do in person.`}
          />
        </Container>
      </section>

      <section className="py-16 lg:py-24" aria-labelledby="mission-heading">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-5 lg:col-span-2">
            <h2 id="mission-heading" className="sr-only">
              Our Mission
            </h2>
            <p className="text-base text-ink-600">
              Too many small businesses lose customers to competitors with better websites — not because
              their work is worse, but because their online presence doesn&apos;t reflect the quality of
              what they do. {siteConfig.name} exists to close that gap.
            </p>
            <p className="text-base text-ink-600">
              We focus on modern, fast, professional websites for local businesses — from home service
              companies to restaurants to professional offices. Every project is built around practical
              solutions: a site that looks credible, works properly on every device, and is easy for you
              to live with after launch.
            </p>
            <p className="text-base text-ink-600">
              We keep communication clear and straightforward throughout every project, and we stay
              available afterward — through maintenance and support — so your website keeps working for
              your business well past launch day.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-ink-200 bg-surface-alt p-8">
            <h3 className="text-lg">Where we work</h3>
            <p className="text-sm text-ink-500">
              We&apos;re based in Vancouver and work with small and local businesses across{" "}
              {siteConfig.serviceArea}.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-200 bg-surface-alt py-16 lg:py-24" aria-labelledby="values-heading">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            id="values-heading"
            align="center"
            eyebrow="What We Value"
            title="How we approach every project"
            className="mx-auto"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {aboutValues.map(({ title: valueTitle, description: valueDescription, icon: Icon }) => (
              <div key={valueTitle} className="flex flex-col gap-3 rounded-lg border border-ink-200 bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg">{valueTitle}</h3>
                <p className="text-sm text-ink-500">{valueDescription}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24" aria-labelledby="why-small-business-heading">
        <Container className="flex flex-col gap-6 lg:max-w-3xl">
          <SectionHeading
            id="why-small-business-heading"
            eyebrow="Why Small Businesses"
            title="Why we focus on small businesses"
          />
          <p className="text-base text-ink-600">
            Small and local businesses are often stuck between two bad options: expensive agencies built
            for large companies, or do-it-yourself website builders that produce something generic and
            hard to maintain. Neither is a good fit for a business that just needs a professional website
            without the overhead.
          </p>
          <p className="text-base text-ink-600">
            We focus specifically on small businesses because that&apos;s where a well-built website makes
            the most visible difference — a stronger first impression, more inquiries, and a site that
            actually represents the quality of the work you do.
          </p>
        </Container>
      </section>

      <FinalCta
        heading="Ready to start your project?"
        text="Tell us about your business and let's build a website that helps you look credible online and win more customers."
        buttonLabel="Start Your Project"
        buttonHref="/contact"
      />
    </>
  );
}
