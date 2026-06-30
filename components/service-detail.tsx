import type { Service } from "@/lib/services";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConsultButton } from "@/components/consult-button";
import { PriceTierTable } from "@/components/price-tier-table";
import { MidCta } from "@/components/mid-cta";
import { CtaBand } from "@/components/cta-band";

export function ServiceDetail({ service }: { service: Service }) {
  const detail = service.detail;
  if (!detail) return null;

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={detail.headline}
        description={detail.subheadline}
        meta={
          <div className="flex flex-wrap items-center gap-3">
            <span className="nums rounded-pill border border-hairline bg-surface px-4 py-1.5 font-display text-lg text-accent shadow-soft">
              {service.priceLabel}
            </span>
            {service.priceNote ? (
              <span className="text-sm text-muted">{service.priceNote}</span>
            ) : null}
          </div>
        }
        actions={
          <>
            <ConsultButton
              source={`service_${service.slug}`}
              label={service.cta.label}
              size="lg"
            />
            <Button href="/pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </>
        }
      />

      {/* What it covers */}
      <Section tone="surface">
        <div className="flex flex-col gap-12">
          {detail.sections.map((section) => (
            <div
              key={section.title}
              className="grid gap-5 border-t border-hairline pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[0.8fr_2fr] lg:gap-12"
            >
              <h2 className="font-display text-h3 text-heading">
                {section.title}
              </h2>
              <div>
                {section.body ? (
                  <p className="max-w-2xl text-pretty text-lede text-secondary">
                    {section.body}
                  </p>
                ) : null}
                {section.items ? (
                  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-secondary"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="mt-1 size-4 shrink-0 text-accent"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M3.5 8.5l2.5 2.5 6-6"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      {service.tiers ? (
        <Section tone="warm">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple, productized pricing."
            description={service.priceNote}
          />
          <div className="mt-10">
            <PriceTierTable tiers={service.tiers} source={service.slug} />
          </div>
        </Section>
      ) : null}

      {/* Fit */}
      <Section tone="default">
        <SectionHeader
          eyebrow="Honest fit"
          title="Who this is, and is not, for."
          description={service.audience}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card variant="surface">
            <h3 className="font-display text-h3 text-heading">Best fit</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {service.bestFit.map((item) => (
                <li key={item} className="flex gap-2.5 text-secondary">
                  <span className="mt-0.5 text-accent" aria-hidden="true">
                    ✓
                  </span>
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card variant="cream">
            <h3 className="font-display text-h3 text-heading">Not a fit</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {service.notFit.map((item) => (
                <li key={item} className="flex gap-2.5 text-secondary">
                  <span className="mt-0.5 text-muted" aria-hidden="true">
                    —
                  </span>
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-12">
          <MidCta source={`service_${service.slug}_mid`} />
        </div>
      </Section>

      <CtaBand source={`service_${service.slug}`} />
    </>
  );
}
