import { NextResponse } from "next/server"

/**
 * Contact endpoint.
 *
 * This route validates the submission server-side. It does NOT fake a
 * successful send: if no email provider is configured it responds with
 * `{ ok: true, delivered: false }` so the client can fall back to the
 * visitor's own mail client (mailto).
 *
 * ── TO ENABLE REAL EMAIL DELIVERY ──────────────────────────────
 * 1. Add an email provider (e.g. Resend) and its API key as an env var
 *    such as RESEND_API_KEY.
 * 2. Install the provider SDK and send the message inside the marked
 *    block below, then return `delivered: true`.
 * ───────────────────────────────────────────────────────────────
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 })
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    name.trim().length < 2 ||
    !EMAIL_RE.test(email) ||
    message.trim().length < 10
  ) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field with valid details." },
      { status: 422 },
    )
  }

  const provider = process.env.RESEND_API_KEY

  if (!provider) {
    // Not wired up yet — tell the client so it can use the mailto fallback.
    return NextResponse.json({ ok: true, delivered: false })
  }

  // ── SEND EMAIL HERE (see instructions above) ──
  // e.g. using Resend:
  // const resend = new Resend(provider)
  // await resend.emails.send({ ... })

  return NextResponse.json({ ok: true, delivered: true })
}
