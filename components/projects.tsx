import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { CompactProjectCard, FeaturedProjectCard } from "@/components/project-card"
import { projects } from "@/lib/data"

export function Projects() {
  const featured = projects.filter((p) => p.featured)
  const supporting = projects.filter((p) => !p.featured)

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeading
        eyebrow="04 — Projects"
        title="Things I've built, from client work to personal experiments."
        description="A mix of professional projects and one I made purely for myself. In-house work is kept appropriately confidential."
      />

      {/* Featured, case-study layout */}
      <div className="mt-14 flex flex-col gap-10 md:gap-14">
        {featured.map((project, i) => (
          <Reveal key={project.id}>
            <FeaturedProjectCard project={project} reverse={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      {/* Supporting projects */}
      <div className="mt-14">
        <Reveal>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Also worth a look
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {supporting.map((project, i) => (
            <Reveal key={project.id} delay={i * 90}>
              <CompactProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
