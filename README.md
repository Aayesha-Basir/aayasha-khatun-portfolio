# Aayasha Khatun — Portfolio

A personal developer portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS**.
Minimal, editorial design with light/dark themes, subtle motion, and full responsiveness.

## Editing content

All copy, projects, skills, experience, and links live in **one place**:

```
lib/data.ts
```

Update that file and the whole site updates — components are generic and reusable.
Search for the word **`PLACEHOLDER`** to find every value that still needs a real asset.

### Assets to replace

| What | Where |
| --- | --- |
| Profile photo | Add the image to `/public`, set `profile.photo`, and flip `profile.photoReady` to `true` in `lib/data.ts`. Until then a non-fabricated monogram frame is shown. |
| Resume (PDF) | Add the file to `/public` and update `profile.resume` in `lib/data.ts`. |
| Social links | Update the `socials` array in `lib/data.ts` (email, LinkedIn, GitHub, Instagram) and `githubUrl`. |
| Project screenshots | Optional — set `image` on a project in `lib/data.ts` to replace the designed cover panel. |

## SEO & domain

Change the site metadata (title, description, Open Graph, Twitter) in:

```
app/layout.tsx        → metadata + siteUrl
app/sitemap.ts        → siteUrl
app/robots.ts         → siteUrl
```

Update `siteUrl` in all three to your real domain. JSON-LD structured data is in `app/page.tsx`.

## Contact form

The form posts to `app/api/contact/route.ts`, which validates input server-side.
It does **not** fake delivery: with no email provider configured it returns
`delivered: false`, and the client falls back to opening the visitor's mail app.

To enable real server-side email:

1. Add an email provider (e.g. Resend) and set `RESEND_API_KEY` as an env var.
2. Install the SDK and send the message in the marked block in `route.ts`.

## Accessibility & motion

- Semantic HTML, keyboard navigation, visible focus states, and skip link.
- All animations and the desktop cursor respect `prefers-reduced-motion`.
- The custom cursor is disabled on touch devices.
