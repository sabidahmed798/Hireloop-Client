"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu } from "@base-ui/react/menu"
// import { DeletejobDialog } from "@/app/components/DeletejobDialog"
import { Briefcase, MapPin, MoreHorizontal, Pencil, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/app/components/dashboard-primitives"
import type { FormState, JobStatus } from "@/lib/types/job"
import { getJobs } from "@/lib/api/jobs"
import { deleteJob } from "@/lib/actions/jobs"
import { DeletejobDialog } from "@/app/components/DeletejobDialog"
import {
  CATEGORY_ICONS,
  CATEGORY_TONES,
  FREQ_SHORT,
  formatSalary,
} from "@/lib/job-display"

/**
 * A job listing row: everything stored from the "Post a New Job" page
 * (FormState) plus display-only fields managed by the dashboard.
 */
export type JobPost = FormState & {
  _id: string
  /** Display-only: when the post went live, from the backend when present. */
  posted: string
  applicants: number
  status: JobStatus
}

/**
 * Display-only fields for jobs coming back from the API: the backend
 * may return plain FormState rows without an id, so fall back to the
 * index; otherwise keep the real backend `_id` for edit/delete.
 */
const toJobPost = (
  job: FormState & { _id?: string; posted?: string },
  index: number
): JobPost => {
  const expired =
    job.deadline !== "" && new Date(`${job.deadline}T00:00:00`) < new Date()
  return {
    ...job,
    _id: job._id ?? `${index}`,
    posted: job.posted ?? "",
    applicants: 0,
    status: expired
      ? { label: "Expired", tone: "gray" }
      : { label: "Active", tone: "green" },
  }
}

const columns = [
  "Job Title & Department",
  "Company & Location",
  "Type",
  "Compensation",
  "Applicants",
  "Status",
  "Deadline",
  "Actions",
]

const gridCols = "grid-cols-[2.1fr_1.7fr_0.7fr_1.2fr_1fr_0.9fr_1fr_1fr]"

const formatDate = (value: string) => {
  if (!value) return "—"
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const CategoryIcon = ({ job }: { job: JobPost }) => {
  const Icon = CATEGORY_ICONS[job.category] ?? Briefcase
  const tone = CATEGORY_TONES[job.category] ?? "bg-white/10 text-[#A0A0AB]"
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${tone}`}
    >
      <Icon className="size-4" />
    </span>
  )
}

const RowMenu = ({ job }: { job: JobPost }) => (
  <Menu.Root>
    <Menu.Trigger
      aria-label={`More actions for ${job.title}`}
      className="flex size-7 items-center justify-center rounded-md text-[#6E6E78] transition-colors outline-none hover:bg-white/[0.06] hover:text-[#EDEDEF] focus-visible:ring-2 focus-visible:ring-[#6366F1]/50 data-[popup-open]:bg-white/[0.06] data-[popup-open]:text-[#EDEDEF]"
    >
      <MoreHorizontal className="size-4" />
    </Menu.Trigger>
    <Menu.Portal>
      <Menu.Positioner align="end" sideOffset={6} className="z-50 outline-none">
        <Menu.Popup className="min-w-40 origin-(--transform-origin) rounded-lg border border-white/[0.08] bg-[#1A1A1F] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-[transform,opacity] duration-100 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          {[
            "View details",
            "View applications",
            "Duplicate post",
            "Mark as closed",
          ].map((label) => (
            <Menu.Item
              key={label}
              className="cursor-default rounded-md px-2.5 py-1.5 text-sm text-[#A0A0AB] outline-none data-highlighted:bg-white/[0.06] data-highlighted:text-[#EDEDEF]"
            >
              {label}
            </Menu.Item>
          ))}
          <Menu.Separator className="my-1 h-px bg-white/[0.06]" />
          <Menu.Item className="cursor-default rounded-md px-2.5 py-1.5 text-sm text-[#F74C4C] outline-none data-highlighted:bg-[#EF4444]/10">
            Delete post
          </Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
)

const DeleteButton = ({
  job,
  onDelete,
}: {
  job: JobPost
  onDelete: (id: string) => Promise<{ deleteCount: number }>
}) => <DeletejobDialog job={job} onDelete={onDelete} />

const EditButton = ({ job }: { job: JobPost }) => (
  <Button
    variant="outline"
    size="sm"
    className="border-white/[0.08] bg-transparent text-[#A0A0AB] hover:bg-white/[0.06] hover:text-[#EDEDEF] dark:border-white/[0.08] dark:bg-transparent"
    render={<Link href={`/dashboard/recruiter/jobs/new?edit=${job._id}`} />}
  >
    <Pencil data-icon="inline-start" className="size-3.5" />
    Edit
  </Button>
)

const CompensationCell = ({ job }: { job: JobPost }) => (
  <span className="text-sm text-[#A0A0AB]">
    {formatSalary(job.minSalary, job.frequency)} –{" "}
    {formatSalary(job.maxSalary, job.frequency)} /{" "}
    {FREQ_SHORT[job.frequency] ?? job.frequency}
  </span>
)

const CompanyCell = ({ job }: { job: JobPost }) => (
  <div className="flex min-w-0 flex-col gap-0.5">
    <span className="truncate text-sm font-medium text-[#EDEDEF]">
      {job.company}
    </span>
    <span className="flex items-center gap-1 truncate text-xs text-[#6E6E78]">
      <MapPin className="size-3 shrink-0" />
      {job.location}
      {job.remote ? <span className="text-[#8B8BF5]">· Remote</span> : null}
    </span>
  </div>
)

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState<JobPost[]>([])

  const handleDelete = async (id: string) => {
    const result = await deleteJob(id)
    setJobs((prev) => prev.filter((job) => job._id !== id))
    return result
  }

  useEffect(() => {
    let cancelled = false
    getJobs()
      .then((data) => {
        if (cancelled) return
        console.log("jobs data", data)
        setJobs(Array.isArray(data) ? data.map(toJobPost) : [])
      })
      .catch((error) => {
        if (!cancelled) console.error("Failed to load jobs", error)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[#6E6E78]">
            Manage Jobs <span className="mx-1">/</span>
            <span className="text-[#A0A0AB]">Job Listings &amp; Postings</span>
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-[#EDEDEF]">
            Manage Job Posts
          </h1>
          <p className="text-sm text-[#A0A0AB]">
            Review job listings, monitor applications, and update job details
            across your organization.
          </p>
        </div>
        <Button
          className="gap-2 bg-[#6366F1] text-white hover:bg-[#5558E8]"
          render={<Link href="/dashboard/recruiter/jobs/new" />}
        >
          <Plus data-icon="inline-start" className="size-4" />
          New Job Post
        </Button>
      </div>

      {/* Jobs table */}
      <section className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
        {/* Desktop header — horizontally scrollable between md and xl */}
        <div className="hidden overflow-x-auto md:block">
          <div className="min-w-[1080px]">
            {/* Column headings */}
            <div
              className={`grid ${gridCols} h-11 items-center bg-[#1A1A1F] text-[11px] font-medium tracking-[0.08em] text-[#6E6E78] uppercase`}
            >
              {columns.map((column) => (
                <span key={column} className="truncate px-4">
                  {column}
                </span>
              ))}
            </div>
            {/* Rows */}
            <div>
              {jobs.map((job, index) => (
                <div
                  key={job._id}
                  className={`grid ${gridCols} h-16 items-center px-0 transition-colors hover:bg-white/[0.02] ${
                    index < jobs.length - 1
                      ? "border-b border-white/[0.04]"
                      : ""
                  }`}
                >
                  {/* Job title & department */}
                  <div className="flex min-w-0 items-center gap-3 px-4">
                    <CategoryIcon job={job} />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="truncate text-sm font-medium text-[#EDEDEF]">
                        {job.title}
                      </span>
                      <span className="truncate text-xs text-[#6E6E78]">
                        {job.category}
                      </span>
                    </div>
                  </div>
                  {/* Company & location */}
                  <div className="min-w-0 px-4">
                    <CompanyCell job={job} />
                  </div>
                  {/* Type */}
                  <span className="truncate px-4 text-sm text-[#A0A0AB]">
                    {job.jobType}
                  </span>
                  {/* Compensation */}
                  <div className="px-4">
                    <CompensationCell job={job} />
                  </div>
                  {/* Applicants */}
                  <span className="truncate px-4 text-sm text-[#A0A0AB]">
                    {job.applicants} Candidates
                  </span>
                  {/* Status */}
                  <div className="px-4">
                    <StatusBadge
                      label={job.status.label}
                      tone={job.status.tone}
                    />
                  </div>
                  {/* Deadline */}
                  <span className="truncate px-4 text-sm text-[#A0A0AB]">
                    {formatDate(job.deadline)}
                  </span>
                  {/* Actions */}
                  <div className="flex items-center gap-2 px-4">
                    <EditButton job={job} />
                    <DeleteButton job={job} onDelete={handleDelete} />
                    <RowMenu job={job} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile — stacked cards */}
        <div className="flex flex-col md:hidden">
          {jobs.map((job, index) => (
            <div
              key={job._id}
              className={`flex flex-col gap-4 p-4 ${
                index < jobs.length - 1 ? "border-b border-white/[0.04]" : ""
              }`}
            >
              {/* Title + status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <CategoryIcon job={job} />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium text-[#EDEDEF]">
                      {job.title}
                    </span>
                    <span className="truncate text-xs text-[#6E6E78]">
                      {job.category}
                    </span>
                  </div>
                </div>
                <StatusBadge label={job.status.label} tone={job.status.tone} />
              </div>

              {/* Details */}
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div className="col-span-2">
                  <dt className="text-[11px] tracking-[0.08em] text-[#6E6E78] uppercase">
                    Company &amp; Location
                  </dt>
                  <dd className="mt-1">
                    <CompanyCell job={job} />
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.08em] text-[#6E6E78] uppercase">
                    Type
                  </dt>
                  <dd className="mt-1 text-sm text-[#A0A0AB]">{job.jobType}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.08em] text-[#6E6E78] uppercase">
                    Applicants
                  </dt>
                  <dd className="mt-1 text-sm text-[#A0A0AB]">
                    {job.applicants} Candidates
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.08em] text-[#6E6E78] uppercase">
                    Compensation
                  </dt>
                  <dd className="mt-1 text-sm text-[#A0A0AB]">
                    <CompensationCell job={job} />
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.08em] text-[#6E6E78] uppercase">
                    Deadline
                  </dt>
                  <dd className="mt-1 text-sm text-[#A0A0AB]">
                    {formatDate(job.deadline)}
                  </dd>
                </div>
              </dl>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 border-t border-white/[0.04] pt-3">
                <EditButton job={job} />
                <div className="flex items-center gap-2">
                  <DeleteButton job={job} onDelete={handleDelete} />
                  <RowMenu job={job} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ManageJobsPage
