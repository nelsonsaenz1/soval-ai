export type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="border-b border-hairline bg-warm">
        <div className="container-edge py-14 md:py-16">
          <div className="container-prose mx-0">
            <span className="eyebrow eyebrow--plain">Legal</span>
            <h1 className="mt-4 font-display text-h1 text-heading">{title}</h1>
            <p className="mt-3 text-sm text-muted">Last updated {updated}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-edge">
          <div className="container-prose mx-0 flex flex-col gap-10">
            <p className="text-pretty text-lede text-secondary">{intro}</p>
            {sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-3">
                <h2 className="font-display text-h3 text-heading">
                  {section.heading}
                </h2>
                {section.body.map((p, i) => (
                  <p key={i} className="text-pretty text-secondary">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
