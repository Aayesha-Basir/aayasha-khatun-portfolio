"use client";

import React, { useState } from "react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/brand-icons";
import { socials, type SocialLink } from "@/lib/data";
import { cn } from "@/lib/utils";

const icons = {
  email: MailIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  instagram: InstagramIcon,
} as const;

function isExternal(link: SocialLink) {
  return link.kind !== "email";
}

export function SocialLinks({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map((link) => {
        const Icon = icons[link.kind];
        // Special handling for email: show a copy-to-clipboard button
        if (link.kind === "email") {
          return <EmailButton key={link.kind} link={link} Icon={Icon} />;
        }

        return (
          <li key={link.kind}>
            <a
              href={link.href}
              target={isExternal(link) ? "_blank" : undefined}
              rel={isExternal(link) ? "noopener noreferrer" : undefined}
              aria-label={
                link.personal ? `${link.label} (personal)` : link.label
              }
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand",
                iconClassName,
              )}
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function EmailButton({
  link,
  Icon,
}: {
  link: SocialLink;
  Icon: ({ className }: { className?: string }) => JSX.Element;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    // If user holds Ctrl/Meta/Shift while clicking, open mail client (mailto)
    if (e.ctrlKey || e.metaKey || e.shiftKey) {
      window.location.href = `mailto:${link.handle}`;
      return;
    }
    try {
      await navigator.clipboard.writeText(link.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // fallback: do nothing
    }
  };

  return (
    <li className="relative">
      <div className="group inline-block">
        <button
          onClick={handleClick}
          aria-label={link.label}
          title={copied ? "Copied!" : link.handle}
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand",
          )}
        >
          <Icon className="size-4" />
        </button>
        <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-background/95 px-2 py-1 text-xs font-medium text-muted-foreground group-hover:inline-block">
          {copied ? "Copied!" : "Click to copy email"}
        </span>
      </div>
    </li>
  );
}
