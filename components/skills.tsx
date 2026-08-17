import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { TechBadge } from "@/components/tech-badge"
import { coreStrengths, skillGroups } from "@/lib/data"

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-y border-border bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          eyebrow="02 — Skills"
          title="The tools I reach for, and where I'm strongest."
          description="No made-up percentages — just the technologies I actually use and the areas I focus on most."
        />

        {/* Core strengths marquee-style emphasis */}
        <Reveal className="mt-12">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Core frontend strengths
          </p>
          <div className="flex flex-wrap gap-2.5">
            {coreStrengths.map((s) => (
              <span
                key={s}
                className="rounded-full border border-brand/30 bg-brand-muted px-4 py-2 text-sm font-medium text-brand"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Skill groups */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {group.title}
                  </h3>
                </div>
                {group.note ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {group.note}
                  </p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  {group.items.map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
