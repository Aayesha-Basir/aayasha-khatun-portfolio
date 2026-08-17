import type { MetadataRoute } from "next"

// PLACEHOLDER: update to the real deployed domain.
const siteUrl = "https://aayasha.dev"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
