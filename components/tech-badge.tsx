import { cn } from "@/lib/utils"

type TechBadgeProps = {
  label: string
  variant?: "default" | "brand" | "outline"
  className?: string
}

export function TechBadge({ label, variant = "default", className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight",
        variant === "default" && "bg-secondary text-secondary-foreground",
        variant === "brand" && "bg-brand-muted text-brand",
        variant === "outline" && "border border-border text-muted-foreground",
        className,
      )}
    >
      {label}
    </span>
  )
}
