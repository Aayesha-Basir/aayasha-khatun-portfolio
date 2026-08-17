import type { MetadataRoute } from "next"

// PLACEHOLDER: update to the real deployed domain (keep in sync with
// `siteUrl` in app/layout.tsx).
const siteUrl = "https://aayasha.dev"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
