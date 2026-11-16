"use client"

import { Banknote, Bookmark, Briefcase, Clock3, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/app/components/dashboard-primitives"
import type { JobRecord } from "@/lib/types/job"
import {
  CATEGORY_ICONS,
  CATEGORY_TONES,
  FREQ_SHORT,
  formatSalary,
} from "@/lib/job-display"
import { cn } from "cn"

const pillClasses =
  "inline-flex h-6 items-center gap-1.5 rounded-md border border-border bg-muted px-2 text-xs text-foreground"

/** Deadline → "Active" / "Expired" badge; nothing while no deadline is set. */
const DeadlineBadge = ({ job }: { job: JobRecord }) => {
  if (job.deadline === "") return null
  const expired = new Date(`${job.deadline}T00:00:00`) < new Date()
  return expired ? (
    <StatusBadge label="Expired" tone="gray" />
  ) : (
    <StatusBadge label="Active" tone="green" />
  )
}

/** One job post card in the browse results. */
export function JobCard({
  job,
  className,
}: {
  job: JobRecord
  className?: string
}) {
  const Icon = CATEGORY_ICONS[job.category] ?? Briefcase
  const tone = CATEGORY_TONES[job.category] ?? "bg-white/10 text-[#A0A0AB]"

  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-ring/50",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            tone
          )}
        >
          <Icon className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-foreground">{job.title}</h3>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">
              {job.company} · {job.location}
              {job.remote ? (
                <span className="text-primary"> (Remote)</span>
              ) : null}
            </span>
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Save ${job.title}`}
          onClick={() => {
            // TODO: toggle the bookmark for this job.
          }}
        >
          <Bookmark />
        </Button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={pillClasses}>
          <Banknote className="size-3.5 text-muted-foreground" />
          {formatSalary(job.minSalary, job.frequency)} –{" "}
          {formatSalary(job.maxSalary, job.frequency)} /{" "}
          {FREQ_SHORT[job.frequency] ?? job.frequency}
        </span>
        <span className={pillClasses}>
          <Clock3 className="size-3.5 text-muted-foreground" />
          {job.jobType}
        </span>
        <DeadlineBadge job={job} />
      </div>
    </article>
  )
}
