"use client";

import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 shadow-sm",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm",
      )}
      role="navigation"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#home"
          className="font-display text-sm font-semibold tracking-tight flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-lg font-bold">Aayasha</span>
          <span
            className="inline-block h-2 w-2 rounded-full bg-brand"
            aria-hidden
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-sm transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    active === id
                      ? "bg-accent/90 text-foreground rounded-full"
                      : "text-muted-foreground",
                  )}
                  aria-current={active === id ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Download className="size-4" />
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 origin-top border-b border-border bg-background/95 backdrop-blur-md transition-all duration-300 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-base transition-colors",
                    active === id
                      ? "bg-accent/90 text-foreground"
                      : "text-muted-foreground hover:bg-accent/60",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li className="mt-2">
            <a
              href={profile.resume}
              download
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
