import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconInstagram,
  IconLinkedin,
  IconFacebook,
} from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

const title = "Contact";
const description = `Get in touch with ${siteConfig.name} to start your website project. Serving small businesses in ${siteConfig.serviceArea}.`;

export const metadata: Metadata = buildMetadata({ title, description, path: "/contact" });

// Server component — safe to read server-only env vars directly to decide
// whether to show the "demo mode" notice below the form.
const isEmailConfigured = Boolean(process.env.EMAIL_API_KEY && process.env.EMAIL_FROM);

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-ink-200 bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Let's talk about your website"
            description="Tell us a bit about your business and what you're looking for using the form below. We'll follow up by email to schedule a short conversation and put together a quote."
          />
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-6 rounded-lg border border-ink-200 bg-surface-alt p-8 lg:col-span-2 lg:order-2">
            <h2 className="text-xl">Project inquiry form</h2>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6 lg:order-1">
            <div className="flex flex-col gap-4 rounded-lg border border-ink-200 p-6">
              <h2 className="text-lg">Contact details</h2>

              <div className="flex items-start gap-3">
                <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm text-ink-500 hover:text-brand-600"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">Phone</p>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-sm text-ink-500 hover:text-brand-600"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">Location</p>
                  <p className="text-sm text-ink-500">{siteConfig.contact.location}</p>
                  <p className="text-xs text-ink-500">Serving {siteConfig.serviceArea}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-ink-200 p-6">
              <h2 className="text-lg">Follow along</h2>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.instagram}
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 text-ink-500 transition-colors hover:border-brand-600 hover:text-brand-600"
                >
                  <IconInstagram className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 text-ink-500 transition-colors hover:border-brand-600 hover:text-brand-600"
                >
                  <IconLinkedin className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-200 text-ink-500 transition-colors hover:border-brand-600 hover:text-brand-600"
                >
                  <IconFacebook className="h-4 w-4" />
                </a>
              </div>
            </div>

            <p className="text-xs text-ink-500">
              We typically respond within {siteConfig.responseTime}.{" "}
              {isEmailConfigured
                ? "If your project is time-sensitive, feel free to email or call us directly."
                : "This form is currently running in demo mode — email us directly in the meantime if your project is time-sensitive."}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
