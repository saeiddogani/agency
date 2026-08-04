# Placeholder Audit (Phase 6)

Full-project search for `Northlight Studio`, `placeholder`, `example@example.com`,
example phone numbers, fake URLs, `lorem ipsum`, `TODO`, `FIXME`, and other
temporary text. Nothing below has been auto-replaced — business-specific
information needs your real details.

## Clean

- No `TODO`, `FIXME`, or `lorem ipsum` anywhere in `src/`.

## 1. Agency identity — centralized in `src/lib/site-config.ts`

Good news: every one of these appears in exactly one file (`src/lib/site-config.ts`),
by design — update it there and it propagates everywhere (header, footer,
metadata, JSON-LD, emails).

| Field | Current placeholder value |
| --- | --- |
| `name` / `shortName` | Northlight Studio |
| `contact.email` | hello@northlightstudio.com |
| `contact.phone` / `phoneDisplay` | +1 (604) 555-0148 |
| `contact.location` | Vancouver, BC, Canada |
| `serviceArea` | Vancouver, BC & the Lower Mainland |
| `social.instagram` | instagram.com/northlightstudio |
| `social.linkedin` | linkedin.com/company/northlightstudio |
| `social.facebook` | facebook.com/northlightstudio |

"Northlight Studio" / "northlightstudio" otherwise only appears in `README.md`
(documentation) and `.env.example` (a placeholder default) — nowhere else in the
codebase.

**Also check:** `src/app/layout.tsx` has a `keywords` array (`"web design
Vancouver"`, etc.) and title strings that mention Vancouver as literal text
rather than pulling from `siteConfig.serviceArea`. If the service area changes,
update these by hand too.

## 2. Testimonials — `src/lib/data.ts`

Three testimonials using "Example Client" as the name, explicitly commented as
placeholder layout content. The homepage section is labeled "Example Client
Feedback" so visitors aren't misled in the meantime. Replace with real
quotes (and remove the "example" framing) once you have client feedback to
share.

## 3. Environment variable placeholders — `.env.example`

All intentionally blank or example values, not real secrets:
`NEXT_PUBLIC_SITE_URL=https://www.example.com`, `EMAIL_API_KEY=`,
`EMAIL_FROM=`, `CONTACT_EMAIL=hello@northlightstudio.com`, `NEXT_PUBLIC_GA_ID=`.
See the Launch Checklist in `README.md` for what to fill in and where.

## 4. Fictional demo businesses — intentional, do NOT "fix"

`src/components/templates/*/content.ts` (west-coast-roofing, casa-bella,
studio-22, northpoint-realty, north-shore-landscaping, apex-consulting) and
`src/lib/portfolio.ts` contain invented businesses with `.example` email
addresses, `555-` phone numbers, and Vancouver, BC placeholder locations. Each
file has a header comment stating this is fictional demo content. These are
**meant to stay fictional** — they're template/portfolio demos showing
prospective clients what we can build, not real businesses. Every page built
from them is labeled "Demo Project" / "Website Concept" in the UI.

Similarly, `.example`-suffixed labels in `BrowserMockup` components (e.g.
`westcoastroofingdemo.example`) are cosmetic browser-bar text, not real URLs.

## 5. Minor / cosmetic

- `package.json` → `"name": "agency-website"` — generic npm package name, not
  shown to visitors. Rename if you'd like, purely cosmetic.
