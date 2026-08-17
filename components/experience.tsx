import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { experience } from "@/lib/data"

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeading
        eyebrow="03 — Experience"
        title="A steady path at YAJ Pvt. Ltd."
        description="From internship to junior web developer, with a growing focus on frontend and React."
      />

      <ol className="mt-14 flex flex-col">
        {experience.map((item, i) => (
          <Reveal as="li" key={item.role} delay={i * 90}>
            <div className="group relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0">
              {/* Timeline rail */}
              <div className="relative flex flex-col items-center">
                <span
                  className={`mt-1.5 inline-flex size-3.5 shrink-0 rounded-full border-2 ${
                    item.current
                      ? "border-brand bg-brand"
                      : "border-border bg-card"
                  }`}
                />
                {i < experience.length - 1 ? (
                  <span className="mt-1 w-px flex-1 bg-border" aria-hidden="true" />
                ) : null}
              </div>

              {/* Content */}
              <div className="pb-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {item.role}
                  </h3>
                  {item.current ? (
                    <span className="rounded-full bg-brand-muted px-2.5 py-0.5 text-xs font-medium text-brand">
                      Current
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm font-medium text-foreground/80">
                  {item.org}
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {item.period}
                </p>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
