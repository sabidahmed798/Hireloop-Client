import Link from "next/link"
import { Plus, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const cardClasses =
  "rounded-xl border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_rgba(0,0,0,0.35)]"

/**
 * Stat card with label + icon on top and value below (Seeker dashboard).
 * Frame: 262x128, padding 20.
 */
export function SimpleStatCard({
  label,
  value,
  icon: Icon,
  iconClassName,
}: {
  label: string
  value: string
  icon: LucideIcon
  iconClassName?: string
}) {
  return (
    <div
      className={cn(cardClasses, "flex h-[128px] flex-col justify-between p-5")}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#A0A0AB]">{label}</p>
        <Icon className={cn("size-[18px] text-white", iconClassName)} />
      </div>
      <p className="text-2xl font-semibold tracking-tight text-[#EDEDEF]">
        {value}
      </p>
    </div>
  )
}

/**
 * Stat card with icon chip, optional delta badge, label and value
 * (Recruiter / Admin dashboards).
 */
export function ChipStatCard({
  label,
  value,
  icon: Icon,
  delta,
  deltaTone = "up",
  watermarkIcon: WatermarkIcon,
  className,
}: {
  label: string
  value: string
  icon: LucideIcon
  delta?: string
  deltaTone?: "up" | "flat"
  watermarkIcon?: LucideIcon
  className?: string
}) {
  return (
    <div
      className={cn(
        cardClasses,
        "relative flex h-[150px] flex-col gap-4 overflow-hidden p-5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex size-9 items-center justify-center rounded-[10px] bg-white/10">
          <Icon className="size-[18px] text-white" />
        </div>
        {delta ? (
          <span
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              deltaTone === "up" ? "text-[#22C55E]" : "text-[#A0A0AB]"
            )}
          >
            {deltaTone === "up" ? (
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4.5 8V1M4.5 1L1 4.5M4.5 1L8 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="8"
                height="1"
                viewBox="0 0 8 1"
                fill="none"
                aria-hidden
              >
                <path d="M0 0.5H8" stroke="currentColor" strokeWidth="1" />
              </svg>
            )}
            {delta}
          </span>
        ) : null}
      </div>
      <div className="mt-auto">
        <p className="text-sm text-[#A0A0AB]">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-[#EDEDEF]">
          {value}
        </p>
      </div>
      {WatermarkIcon ? (
        <WatermarkIcon
          className="pointer-events-none absolute right-3 -bottom-3 size-16 text-white/[0.05]"
          aria-hidden
        />
      ) : null}
    </div>
  )
}

/**
 * Pill badge with dot (job/user status, category tags).
 */
const statusTones = {
  green: "border-[#22C55E]/25 bg-[#22C55E]/10 text-[#22C55E]",
  amber: "border-[#F59E0B]/25 bg-[#F59E0B]/10 text-[#F59E0B]",
  red: "border-[#EF4444]/25 bg-[#EF4444]/10 text-[#F74C4C]",
  purple: "border-[#8F88FF]/25 bg-[#8F88FF]/10 text-[#8F88FF]",
  blue: "border-[#60A5FA]/25 bg-[#60A5FA]/10 text-[#60A5FA]",
  gray: "border-white/10 bg-white/[0.06] text-[#A0A0AB]",
} as const

export type StatusTone = keyof typeof statusTones

export function StatusBadge({
  label,
  tone,
}: {
  label: string
  tone: StatusTone
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium",
        statusTones[tone]
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "gray" ? "bg-[#A0A0AB]" : "bg-current"
        )}
      />
      {label}
    </span>
  )
}

/**
 * Plain status with dot only, no pill (admin transactions table).
 */
export function StatusDot({
  label,
  tone,
}: {
  label: string
  tone: StatusTone
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        statusTones[tone].split(" ").pop()
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

/**
 * Floating action button, bottom-right of the dashboard
 * (only on home-like dashboards per the design system).
 */
export function FAB({
  href,
  label,
  size = "sm",
}: {
  href: string
  label: string
  size?: "sm" | "lg"
}) {
  return (
    <div className="group fixed right-8 bottom-8 z-40 flex items-center">
      {size === "lg" ? (
        <span className="pointer-events-none mr-3 flex h-9 translate-x-2 items-center rounded-lg bg-[#FAFAFA] px-3 text-sm font-medium whitespace-nowrap text-[#0B0B0C] opacity-0 shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-all group-hover:translate-x-0 group-hover:opacity-100">
          {label}
        </span>
      ) : null}
      <Link
        href={href}
        aria-label={label}
        className={cn(
          "flex items-center justify-center rounded-full bg-white text-[#2F3131] shadow-[0_1px_2px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 active:scale-95",
          size === "lg" ? "size-16" : "size-14"
        )}
      >
        <Plus
          className={size === "lg" ? "size-[18px]" : "size-3.5"}
          strokeWidth={2.5}
        />
      </Link>
    </div>
  )
}

/**
 * Section heading row with optional action link.
 */
export function SectionHeading({
  title,
  actionLabel,
  actionHref,
}: {
  title: string
  actionLabel?: string
  actionHref?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold tracking-tight text-[#EDEDEF]">
        {title}
      </h2>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="text-sm text-[#A0A0AB] transition-colors hover:text-white"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}
