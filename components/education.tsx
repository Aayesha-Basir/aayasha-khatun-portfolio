import { GraduationCap } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { education } from "@/lib/data"

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-20 border-y border-border bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          eyebrow="05 — Education"
          title="Where the coding started."
        />

        <div className="mt-12 grid grid-cols-1 gap-6">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 80}>
              <article className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card p-6 sm:grid-cols-[auto_1fr] sm:p-8">
                <div className="flex size-12 items-center justify-center rounded-xl bg-brand-muted text-brand">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <h3 className="text-balance font-display text-xl font-semibold tracking-tight">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-foreground/80">
                    {item.school}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {item.period}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {item.notes.map((note) => (
                      <li
                        key={note}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-brand"
                          aria-hidden="true"
                        />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
