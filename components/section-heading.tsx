import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"

type SectionHeadingProps = {
  /** Small uppercase metadata label, e.g. "02 — About". */
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`flex max-w-2xl flex-col gap-4 ${align === "center" ? "mx-auto items-center text-center" : ""}`}
    >
      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-px w-6 bg-brand" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
