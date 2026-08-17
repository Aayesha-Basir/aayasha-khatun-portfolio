import { About } from "@/components/about"
import { BeyondTheScreen } from "@/components/beyond-the-screen"
import { Contact } from "@/components/contact"
import { CustomCursor } from "@/components/custom-cursor"
import { Education } from "@/components/education"
import { Experience } from "@/components/experience"
import { Footer } from "@/components/footer"
import { GithubSection } from "@/components/github-section"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { profile, socials } from "@/lib/data"

// JSON-LD structured data for richer search results.
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    address: {
      "@type": "PostalAddress",
      addressCountry: profile.location,
    },
    sameAs: socials
      .filter((s) => s.kind !== "email")
      .map((s) => s.href),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function Page() {
  return (
    <>
      <StructuredData />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <BeyondTheScreen />
        <GithubSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
