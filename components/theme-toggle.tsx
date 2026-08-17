"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

type Theme = "light" | "dark"

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"
  const root = document.documentElement
  if (root.classList.contains("dark")) return "dark"
  if (root.classList.contains("light")) return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(getInitialTheme())
    setMounted(true)
  }, [])

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark"
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(next)
    try {
      localStorage.setItem("theme", next)
    } catch {
      // ignore write failures (e.g. private mode)
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className ?? ""}`}
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  )
}
