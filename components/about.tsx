import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { TechBadge } from "@/components/tech-badge"
import { about } from "@/lib/data"

const process = [
  "Understand the idea",
  "Shape how it looks & feels",
  "Build the interface",
  "Make it responsive",
  "Connect functionality",
  "Ship something usable",
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        eyebrow="01 — About"
        title="A frontend developer who cares how a site works and how it feels."
      />

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_0.7fr]">
        <div className="flex flex-col gap-5">
          {about.paragraphs.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 80} className="text-pretty text-lg leading-relaxed text-foreground/90">
              {p}
            </Reveal>
          ))}

          <Reveal className="mt-2 flex flex-wrap gap-2">
            {about.traits.map((t) => (
              <TechBadge key={t} label={t} variant="outline" />
            ))}
          </Reveal>
        </div>

        {/* How I work */}
        <Reveal delay={120}>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              How I turn an idea into an interface
            </h3>
            <ol className="mt-5 flex flex-col gap-4">
              {process.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-muted text-xs font-semibold text-brand">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/90">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
