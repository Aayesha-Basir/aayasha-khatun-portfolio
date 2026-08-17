"use client"

import { Send } from "lucide-react"
import { useState } from "react"
import { socials } from "@/lib/data"

type Status = "idle" | "submitting" | "success" | "error"

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    }

    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()

      if (!res.ok || !json.ok) {
        setStatus("error")
        setMessage(json.error ?? "Something went wrong. Please try again.")
        return
      }

      if (json.delivered === false) {
        // No server email provider configured yet — open the visitor's
        // mail client so the message still reaches its destination.
        const emailContact = socials.find((s) => s.kind === "email")
        const to = emailContact?.handle ?? ""
        const subject = encodeURIComponent(`Portfolio message from ${payload.name}`)
        const bodyText = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`)
        window.location.href = `mailto:${to}?subject=${subject}&body=${bodyText}`
        setStatus("success")
        setMessage("Opening your email app so you can send the message directly.")
        form.reset()
        return
      }

      setStatus("success")
      setMessage("Thanks for reaching out — I'll get back to you soon.")
      form.reset()
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again in a moment.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Tell me a little about what you have in mind…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
          <Send className="size-4" />
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${
            status === "error"
              ? "text-destructive"
              : status === "success"
                ? "text-brand"
                : "text-muted-foreground"
          }`}
        >
          {message}
        </p>
      </div>
    </form>
  )
}
