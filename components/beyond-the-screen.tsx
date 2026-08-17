import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { interests } from "@/lib/data"

export function BeyondTheScreen() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        eyebrow="06 — Beyond the Screen"
        title="There's a creative person behind the code."
        description="When I'm not building interfaces, I'm usually making something else."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {interests.map((interest, i) => (
          <Reveal key={interest} delay={i * 60}>
            <div className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40">
              <span
                aria-hidden="true"
                className="font-display text-sm text-muted-foreground/60"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg font-medium leading-tight tracking-tight transition-colors group-hover:text-brand">
                {interest}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 size-16 rounded-full bg-brand-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
