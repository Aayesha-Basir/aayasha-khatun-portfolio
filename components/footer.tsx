import { navLinks, profile } from "@/lib/data"
import { SocialLinks } from "@/components/social-links"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <a href="#home" className="font-display text-lg font-semibold tracking-tight">
            Aayasha<span className="text-brand">.</span>
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {profile.title} based in {profile.location}. Open to opportunities and
            interesting frontend work.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. All rights reserved.
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}
