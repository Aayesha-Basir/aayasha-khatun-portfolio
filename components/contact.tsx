import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { ContactForm } from "@/components/contact-form"
import { socials } from "@/lib/data"

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeading
        eyebrow="08 — Contact"
        title="Let's build something thoughtful."
        description="Open to opportunities, collaboration, and interesting frontend work. Send a message or reach me directly."
      />

      <div className="mt-12">
        {/* Direct links */}
        <Reveal>
          <ul className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card">
            {socials.map((link) => (
              <li key={link.kind}>
                <a
                  href={link.href}
                  target={link.kind === "email" ? undefined : "_blank"}
                  rel={link.kind === "email" ? undefined : "noopener noreferrer"}
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-accent/50"
                >
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">
                      {link.label}
                      {link.personal ? (
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          (personal)
                        </span>
                      ) : null}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {link.handle}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

      
      </div>
    </section>
  )
}
