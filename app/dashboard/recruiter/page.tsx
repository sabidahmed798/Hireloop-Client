import Image from "next/image"
import { BriefcaseBusiness, FileCheck2, Inbox, XCircle } from "lucide-react"

import {
  ChipStatCard,
  FAB,
  SectionHeading,
  StatusBadge,
} from "@/app/components/dashboard-primitives"

const stats = [
  { label: "Total Job Posts", value: "48", icon: BriefcaseBusiness },
  { label: "Total Applicants", value: "1,284", icon: Inbox },
  { label: "Active Jobs", value: "18", icon: FileCheck2 },
  { label: "Jobs Closed", value: "32", icon: XCircle },
]

// Fixed properly: the design file had a dead 203px leading column and a
// misaligned third row — replaced with a single consistent grid.
const applicants = [
  {
    name: "Julianne Moore",
    avatar: "/images/avatars/julianne-moore.jpg",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: { label: "Interviewing", tone: "purple" as const },
  },
  {
    name: "Robert Downey",
    avatar: "/images/avatars/robert-downey.jpg",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: { label: "New", tone: "blue" as const },
  },
  {
    name: "Emma Stone",
    avatar: "/images/avatars/emma-stone.jpg",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: { label: "Reviewing", tone: "amber" as const },
  },
  {
    name: "Chris Pratt",
    avatar: "/images/avatars/chris-pratt.jpg",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: { label: "Rejected", tone: "red" as const },
  },
]

const columns = [
  "Candidate Name",
  "Role",
  "Date Applied",
  "Experience",
  "Status",
]
const gridCols = "grid-cols-[2fr_1.8fr_1.1fr_0.9fr_1.2fr]"

const RecruiterDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Welcome header */}
      <h1 className="text-xl font-semibold tracking-tight text-[#EDEDEF]">
        Welcome back, Alex Sterling
      </h1>

      {/* Stats row */}
      <section className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <ChipStatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* Recent applications */}
      <section className="flex flex-col gap-3">
        <SectionHeading
          title="Recent Applications"
          actionLabel="View all"
          actionHref="/dashboard/recruiter/applicants"
        />
        <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
          {/* Table header */}
          <div
            className={`grid ${gridCols} h-11 items-center bg-[#1A1A1F] text-[11px] font-medium tracking-[0.08em] text-[#6E6E78] uppercase`}
          >
            {columns.map((column) => (
              <span key={column} className="px-4">
                {column}
              </span>
            ))}
          </div>
          {/* Table body */}
          <div>
            {applicants.map((applicant, index) => (
              <div
                key={applicant.name}
                className={`group grid ${gridCols} h-16 items-center px-0 transition-colors hover:bg-white/[0.02] ${
                  index < applicants.length - 1
                    ? "border-b border-white/[0.04]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 px-4">
                  <Image
                    src={applicant.avatar}
                    alt={applicant.name}
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-full border border-white/10 object-cover"
                  />
                  <span className="truncate text-sm text-[#EDEDEF]">
                    {applicant.name}
                  </span>
                </div>
                <span className="truncate px-4 text-sm text-[#A0A0AB]">
                  {applicant.role}
                </span>
                <span className="truncate px-4 text-sm text-[#A0A0AB]">
                  {applicant.date}
                </span>
                <span className="truncate px-4 text-sm text-[#A0A0AB]">
                  {applicant.experience}
                </span>
                <div className="px-4">
                  <StatusBadge
                    label={applicant.status.label}
                    tone={applicant.status.tone}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAB href="/dashboard/recruiter/jobs" label="Create Job Post" size="lg" />
    </div>
  )
}

export default RecruiterDashboardPage
