"use client"

import { useState } from "react"
import { ArrowRight, Building2, Globe, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createJobs } from "@/lib/actions/jobs"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance & Accounting",
  "Customer Support",
  "Operations",
] as const

const SALARY_FREQUENCIES = [
  "per hour",
  "per day",
  "per month",
  "per year",
] as const

// All form data lives in one flat object — one field, one key, nothing nested.
export const initialForm = {
  title: "",
  company: "",
  category: "",
  jobType: "Full-time",
  remote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  requirements: "",
}

type FormState = typeof initialForm

const inputClass =
  "h-10 w-full rounded-lg border-white/[0.08] bg-[#1A1A1F] text-sm text-[#EDEDEF]"

const SectionCard = ({
  step,
  title,
  children,
}: {
  step: number
  title: string
  children: React.ReactNode
}) => (
  <section className="rounded-xl border border-white/[0.07] bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
    <div className="mb-5 flex items-center gap-2.5">
      <span className="size-1.5 rounded-full bg-[#6366F1]" />
      <h2 className="text-sm font-medium text-[#EDEDEF]">
        {step}. {title}
      </h2>
    </div>
    <div className="flex flex-col gap-5">{children}</div>
  </section>
)

const Field = ({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-baseline justify-between">
      <Label className="text-[13px] text-[#A0A0AB]">
        {label}
        {required ? <span className="text-[#8B8BF5]">*</span> : null}
      </Label>
      {hint ? <span className="text-[11px] text-[#6E6E78]">{hint}</span> : null}
    </div>
    {children}
  </div>
)

const NewJobsPage = () => {
  const [form, setForm] = useState<FormState>(initialForm)
  const [published, setPublished] = useState(false)

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: wire this to an API route / server action when persistence is added.
    console.log("Job post data:", form)
    setForm(initialForm)
    setPublished(true)

    const result = await createJobs(form)
    console.log("createJobs result:", result)
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Page header + publish action */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[#6E6E78]">
            Manage Jobs <span className="mx-1">/</span>
            <span className="text-[#A0A0AB]">Create New Listing</span>
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-[#EDEDEF]">
            Post a New Job
          </h1>
          <p className="text-sm text-[#A0A0AB]">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {published ? (
            <span className="text-sm text-emerald-400">
              Job post created (logged to console)
            </span>
          ) : null}
        </div>
      </div>

      <form
        id="new-job-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        {/* 1. Basic Information */}
        <SectionCard step={1} title="Basic Information">
          <Field label="Job Title" required>
            <Input
              className={inputClass}
              placeholder="Frontend Developer"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Company Name" required>
              <div className="relative">
                <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6E6E78]" />
                <Input
                  className={`${inputClass} pl-9`}
                  placeholder="HirePulse Network"
                  value={form.company}
                  onChange={(e) => setField("company", e.target.value)}
                  required
                />
              </div>
            </Field>
            <Field label="Job Category" required>
              <Select
                value={form.category}
                onValueChange={(value) => setField("category", value as string)}
              >
                <SelectTrigger className={`${inputClass} w-full px-3`}>
                  <SelectValue>
                    {form.category || "Select category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Job Type" required>
            <div className="grid grid-cols-4 gap-3">
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setField("jobType", type)}
                  className={`h-10 rounded-lg border text-sm transition-colors ${
                    form.jobType === type
                      ? "border-[#6366F1]/60 bg-[#1B1B2A] text-[#EDEDEF]"
                      : "border-white/[0.07] bg-[#1A1A1F] text-[#A0A0AB] hover:border-white/[0.14] hover:text-[#EDEDEF]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </Field>
        </SectionCard>

        {/* 2. Location, Compensation & Timeline */}
        <SectionCard step={2} title="Location, Compensation & Timeline">
          {/* Remote toggle */}
          <div className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-[#1A1A1F] p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#6366F1]/15">
                <Globe className="size-4 text-[#8B8BF5]" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#EDEDEF]">
                  Remote Work Allowed
                  <span className="ml-1 font-normal text-[#6E6E78]">
                    (ident remote)
                  </span>
                </p>
                <p className="text-xs text-[#A0A0AB]">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            <Switch
              checked={form.remote}
              onCheckedChange={(checked) => setField("remote", checked)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Job Location"
              required={!form.remote}
              hint={form.remote ? "Optional" : "Required"}
            >
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6E6E78]" />
                <Input
                  className={`${inputClass} pl-9`}
                  placeholder="New York, USA"
                  value={form.location}
                  onChange={(e) => setField("location", e.target.value)}
                  required={!form.remote}
                />
              </div>
            </Field>
            <Field label="Application Deadline" hint="(deadline)">
              <Input
                type="date"
                className={inputClass}
                value={form.deadline}
                onChange={(e) => setField("deadline", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Min Salary / Rate">
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-[#6E6E78]">
                  €
                </span>
                <Input
                  type="number"
                  min={0}
                  className={`${inputClass} pl-8`}
                  placeholder="25"
                  value={form.minSalary}
                  onChange={(e) => setField("minSalary", e.target.value)}
                />
              </div>
            </Field>
            <Field label="Max Salary / Rate">
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-[#6E6E78]">
                  €
                </span>
                <Input
                  type="number"
                  min={0}
                  className={`${inputClass} pl-8`}
                  placeholder="40"
                  value={form.maxSalary}
                  onChange={(e) => setField("maxSalary", e.target.value)}
                />
              </div>
            </Field>
            <Field label="Frequency">
              <Select
                value={form.frequency}
                onValueChange={(value) =>
                  setField("frequency", value as string)
                }
              >
                <SelectTrigger className={`${inputClass} w-full px-3`}>
                  <SelectValue>{form.frequency}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {SALARY_FREQUENCIES.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </SectionCard>

        {/* 3. Responsibilities & Requirements */}
        <SectionCard step={3} title="Responsibilities & Requirements">
          <Field label="Key Responsibilities" required>
            <Textarea
              className="min-h-24 rounded-lg border-white/[0.08] bg-[#1A1A1F] text-sm text-[#EDEDEF]"
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
              value={form.responsibilities}
              onChange={(e) => setField("responsibilities", e.target.value)}
              required
            />
          </Field>
          <Field label="Qualifications & Requirements" required>
            <Textarea
              className="min-h-24 rounded-lg border-white/[0.08] bg-[#1A1A1F] text-sm text-[#EDEDEF]"
              placeholder={
                "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
              }
              value={form.requirements}
              onChange={(e) => setField("requirements", e.target.value)}
              required
            />
          </Field>
        </SectionCard>
        <section>
          {" "}
          <Button type="submit" form="new-job-form" className="gap-2">
            Publish Job
            <ArrowRight className="size-4" />
          </Button>
        </section>
      </form>
    </div>
  )
}

export default NewJobsPage
