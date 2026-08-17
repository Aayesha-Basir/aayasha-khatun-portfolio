import Image from "next/image"
import type { Project } from "@/lib/data"
import { cn } from "@/lib/utils"

/**
 * A designed cover for each project. We intentionally do NOT fabricate
 * screenshots for confidential in-house work — instead we show a clean,
 * branded panel with the project index + name. If a real screenshot is
 * available, set `project.image` and it will be used instead.
 */
export function ProjectCover({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  if (project.image) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <Image
          src={project.image || "/placeholder.svg"}
          alt={`${project.name} — project screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br to-transparent p-6 transition-transform duration-500 group-hover:scale-[1.02]",
        project.accent,
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid text-foreground/[0.05]"
      />
      <div className="relative flex items-center justify-between">
        <span className="font-display text-sm font-medium text-muted-foreground">
          {project.index}
        </span>
        {project.confidential ? (
          <span className="rounded-full border border-border bg-background/70 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            In-house
          </span>
        ) : project.personal ? (
          <span className="rounded-full border border-border bg-background/70 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            Personal
          </span>
        ) : null}
      </div>
      <div className="relative">
        <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground/90">
          {project.name}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {project.role}
        </p>
      </div>
    </div>
  )
}
