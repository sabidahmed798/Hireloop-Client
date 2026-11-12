import Image from "next/image"
import Link from "next/link"
import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Download,
  Users,
} from "lucide-react"

import {
  ChipStatCard,
  SectionHeading,
  StatusDot,
} from "@/app/components/dashboard-primitives"

const stats = [
  {
    label: "Total Users",
    value: "124,892",
    icon: Users,
    delta: "+12%",
    deltaTone: "up" as const,
  },
  {
    label: "Total Recruiters",
    value: "12,405",
    icon: Users,
    delta: "+8%",
    deltaTone: "up" as const,
  },
  {
    label: "Total Companies",
    value: "4,281",
    icon: Building2,
    delta: "0%",
    deltaTone: "flat" as const,
  },
  {
    label: "Jobs Posted",
    value: "8,920",
    icon: BriefcaseBusiness,
    delta: "+24%",
    deltaTone: "up" as const,
  },
  {
    label: "Platform Revenue",
    value: "$245,800",
    icon: Banknote,
    delta: "+18.5%",
    deltaTone: "up" as const,
    watermarkIcon: Banknote,
  },
]

const planTone = {
  enterprise: "border border-white/10 bg-white/[0.08] text-[#EDEDEF]",
  muted: "border border-white/[0.06] bg-[#222228] text-[#A0A0AB]",
} as const

const transactions = [
  {
    email: "marcus.k@techcorp.io",
    company: "TechCorp Inc.",
    avatar: "/images/avatars/marcus-k.jpg",
    plan: { label: "Enterprise Monthly", tone: "enterprise" as const },
    txn: "#TXN-902341",
    amount: "$1,299.00",
    date: "Oct 24, 2023, 14:20",
    relative: null,
    status: { label: "Success", tone: "green" as const },
  },
  {
    email: "sarah.l@creativestudio.com",
    company: "Creative Studio",
    avatar: "/images/avatars/sarah-l.jpg",
    plan: { label: "Professional Annual", tone: "muted" as const },
    txn: "#TXN-882103",
    amount: "$499.00",
    date: "Oct 24, 2023, 11:05",
    relative: null,
    status: { label: "Success", tone: "green" as const },
  },
  {
    email: "j.doe@freelance.org",
    company: "Independent",
    avatar: "/images/avatars/j-doe.jpg",
    plan: { label: "Starter Monthly", tone: "muted" as const },
    txn: "#TXN-774129",
    amount: "$49.00",
    date: "Oct 23, 2023, 16:45",
    relative: null,
    status: { label: "Pending", tone: "amber" as const },
  },
  {
    email: "admin@retailglobal.net",
    company: "Retail Global",
    avatar: "/images/avatars/retail-admin.jpg",
    plan: { label: "Enterprise Monthly", tone: "enterprise" as const },
    txn: "#TXN-552014",
    amount: "$1,299.00",
    date: "Oct 23, 2023, 09:12",
    relative: null,
    status: { label: "Failed", tone: "red" as const },
  },
]

const columns = [
  "User/Recruiter",
  "Plan Type",
  "Transaction ID",
  "Amount",
  "Date",
  "Status",
]
const gridCols = "grid-cols-[2.3fr_1.6fr_1.4fr_1.1fr_1.4fr_1fr]"

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#EDEDEF]">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-[#A0A0AB]">
            Real-time platform performance and growth metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-lg bg-[#1A1A1F] px-4 text-sm text-[#EDEDEF] transition-colors hover:bg-[#222228]"
          >
            <CalendarDays className="size-3.5" />
            Last 30 Days
          </button>
          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-lg bg-[#FAFAFA] px-4 text-sm font-medium text-[#0B0B0C] transition-colors hover:bg-white"
          >
            <Download className="size-3.5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats row */}
      <section className="grid grid-cols-5 gap-6">
        {stats.map((stat) => (
          <ChipStatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* Recent transactions */}
      <section className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between px-6 py-4">
          <SectionHeading title="Recent Subscription Transactions" />
          <Link
            href="/dashboard/admin/payments"
            className="text-sm text-[#EDEDEF] transition-colors hover:text-white"
          >
            View All Activity
          </Link>
        </div>
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
          {transactions.map((transaction, index) => (
            <div
              key={transaction.txn}
              className={`group grid ${gridCols} h-16 items-center transition-colors hover:bg-white/[0.02] ${
                index < transactions.length - 1
                  ? "border-b border-white/[0.04]"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3 px-4">
                <Image
                  src={transaction.avatar}
                  alt={transaction.company}
                  width={32}
                  height={32}
                  className="size-8 shrink-0 rounded-full border border-white/10 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm text-[#E5E2E3]">
                    {transaction.email}
                  </p>
                  <p className="truncate text-xs text-[#A0A0AB]">
                    {transaction.company}
                  </p>
                </div>
              </div>
              <div className="px-4">
                <span
                  className={`inline-flex h-[21px] items-center rounded-full px-2.5 text-xs font-medium ${planTone[transaction.plan.tone]}`}
                >
                  {transaction.plan.label}
                </span>
              </div>
              <span className="px-4 text-xs text-[#A0A0AB]">
                {transaction.txn}
              </span>
              <span className="px-4 text-sm text-[#EDEDEF]">
                {transaction.amount}
              </span>
              <span className="truncate px-4 text-sm text-[#A0A0AB]">
                {transaction.date}
              </span>
              <div className="px-4">
                <StatusDot
                  label={transaction.status.label}
                  tone={transaction.status.tone}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminDashboardPage
