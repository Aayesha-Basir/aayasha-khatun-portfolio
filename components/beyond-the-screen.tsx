import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { interests } from "@/lib/data";

export function BeyondTheScreen() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading
        eyebrow="06 — Beyond the Screen"
        title="There's a creative person behind the code."
        description="When I'm not building interfaces, I'm usually creating something in a different form."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
        {interests.map((interest, i) => (
          <Reveal key={interest.title} delay={i * 60}>
            <div className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card">
              {/* Hobby image */}
              <Image
                src={interest.image}
                alt={interest.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              {/* Number */}
              <span
                aria-hidden="true"
                className="absolute left-5 top-5 font-display text-sm text-white/70"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="font-display text-lg font-medium leading-tight tracking-tight text-white">
                  {interest.title}
                </span>
              </div>

              {/* Hover accent */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-brand-muted opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-40"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
