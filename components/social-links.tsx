import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/brand-icons"
import { socials, type SocialLink } from "@/lib/data"
import { cn } from "@/lib/utils"

const icons = {
  email: MailIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  instagram: InstagramIcon,
} as const

function isExternal(link: SocialLink) {
  return link.kind !== "email"
}

export function SocialLinks({
  className,
  iconClassName,
}: {
  className?: string
  iconClassName?: string
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map((link) => {
        const Icon = icons[link.kind]
        return (
          <li key={link.kind}>
            <a
              href={link.href}
              target={isExternal(link) ? "_blank" : undefined}
              rel={isExternal(link) ? "noopener noreferrer" : undefined}
              aria-label={
                link.personal ? `${link.label} (personal)` : link.label
              }
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand",
                iconClassName,
              )}
            >
              <Icon className="size-4" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
