import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import Image from "next/image"
import { profile } from "@/lib/data"
import { SocialLinks } from "@/components/social-links"

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pt-40 md:pb-24"
    >
      {/* Soft dotted backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid text-foreground/[0.06] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:gap-8">
        {/* Left: intro */}
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            Available for frontend work · {profile.location}
          </span>

          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {profile.title}
            </p>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              {profile.name}
            </h1>
          </div>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View My Work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.resume}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>

          <div className="mt-2 flex items-center gap-4">
            <SocialLinks />
          </div>
        </div>

        {/* Right: portrait */}
        <div className="relative mx-auto w-full max-w-sm md:mx-0">
          <div className="relative aspect-[4/5] w-full">
            {/* Decorative offset frame */}
            <div
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-full w-full rounded-2xl border border-brand/40"
            />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-secondary">
              {profile.photoReady ? (
                <Image
                  src={profile.photo || "/placeholder.svg"}
                  alt={`Portrait of ${profile.name}, ${profile.title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <PortraitPlaceholder />
              )}
            </div>

            {/* Floating detail chip */}
            <div className="absolute -bottom-4 -right-2 flex animate-float-slow items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-sm sm:-right-5">
              <span className="font-display text-sm font-semibold">React</span>
              <span className="text-xs text-muted-foreground">· TypeScript</span>
              <ArrowUpRight className="size-3.5 text-brand" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


function PortraitPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-grid text-foreground/[0.08]">
      <span className="font-display text-6xl font-semibold text-foreground/70">
        {profile.initials}
      </span>
      <span className="rounded-full border border-border bg-background/80 px-3 py-1 text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        Add professional photo
      </span>
    </div>
  )
}
