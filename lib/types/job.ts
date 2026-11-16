import type { StatusTone } from "@/app/components/dashboard-primitives"

/**
 * Shape of the job post form data collected on the "Post a New Job" page
 * and persisted via `createJobs` — all fields flat, one value per key.
 */
export type FormState = {
  title: string
  company: string
  category: string
  jobType: string
  remote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  requirements: string
}

/**
 * Display-only status derived from the deadline on the dashboard —
 * not part of the form payload sent to the backend.
 */
export type JobStatus = {
  label: "Active" | "Expired"
  tone: StatusTone
}
