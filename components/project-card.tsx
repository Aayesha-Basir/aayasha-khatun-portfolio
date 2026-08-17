import { ArrowUpRight, ExternalLink } from "lucide-react"
import type { Project } from "@/lib/data"
import { ProjectCover } from "@/components/project-cover"
import { TechBadge } from "@/components/tech-badge"
import { cn } from "@/lib/utils"

function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.sourceUrl) return null
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-brand"
        >
          View Live Site
          <ExternalLink className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      ) : null}
      {project.sourceUrl ? (
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Source
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
    </div>
  )
}

/** Larger, case-study style card used for featured projects. */
export function FeaturedProjectCard({
  project,
  reverse,
}: {
  project: Project
  reverse?: boolean
}) {
  return (
    <article className="group grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl border border-border bg-card p-4 transition-colors hover:border-brand/40 md:grid-cols-2 md:gap-10 md:p-5">
      <div
        className={cn(
          "aspect-[16/11] overflow-hidden rounded-2xl border border-border",
          reverse && "md:order-2",
        )}
      >
        <ProjectCover project={project} />
      </div>

      <div className={cn("flex flex-col gap-4 p-2 md:p-4", reverse && "md:order-1")}>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-brand">{project.index}</span>
          <span className="h-px w-6 bg-border" />
          <span>{project.role}</span>
        </div>

        <h3 className="text-balance font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {project.name}
        </h3>

        <p className="text-pretty leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="flex flex-col gap-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-foreground/90">
              <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-1 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechBadge key={t} label={t} variant="brand" />
          ))}
        </div>

        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

/** Compact card for supporting / personal projects. */
export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40">
      <div className="aspect-[16/10] overflow-hidden border-b border-border">
        <ProjectCover project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-brand">{project.index}</span>
          <span>{project.role}</span>
        </div>
        <h3 className="font-display text-xl font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </div>
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}
