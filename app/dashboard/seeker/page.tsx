import {
  Bell,
  Bookmark,
  CalendarDays,
  ChevronRight,
  Gift,
  Mail,
  RefreshCw,
  Send,
} from "lucide-react"

import {
  FAB,
  SectionHeading,
  SimpleStatCard,
} from "@/app/components/dashboard-primitives"

const stats = [
  {
    label: "Saved Jobs",
    value: "12",
    icon: Bookmark,
    iconClassName: "text-white",
  },
  {
    label: "Applications Submitted",
    value: "24",
    icon: Send,
    iconClassName: "text-white",
  },
  {
    label: "Interviews Scheduled",
    value: "3",
    icon: CalendarDays,
    iconClassName: "text-[#F59E0B]",
  },
  {
    label: "Offers Received",
    value: "1",
    icon: Gift,
    iconClassName: "text-[#22C55E]",
  },
]

// Three unique activity items — the design file accidentally contained
// the same set twice; rendering it once is the intended state.
const activities = [
  {
    icon: RefreshCw,
    iconClassName: "text-white",
    message: (
      <>
        Application for Senior Product Designer at TechFlow updated to{" "}
        <span className="text-[#F59E0B]">&lsquo;Under Review&rsquo;</span>
      </>
    ),
    time: "2 hours ago",
  },
  {
    icon: Bell,
    iconClassName: "text-[#22C55E]",
    message: (
      <>
        New Job Alert:{" "}
        <span className="text-[#C4C7C8]">
          Lead Frontend Engineer at FinGrid matches your profile.
        </span>
      </>
    ),
    time: "5 hours ago",
  },
  {
    icon: Mail,
    iconClassName: "text-white",
    message: (
      <>
        You have a new message from Sarah Jenkins (Hiring Manager at CloudOps).
      </>
    ),
    time: "1 day ago",
  },
]

const SeekerDashboardPage = () => {
  return (
    <div className="flex flex-col gap-7 p-8">
      {/* Stats row */}
      <section className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <SimpleStatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* Recent activity */}
      <section className="flex flex-col gap-3">
        <SectionHeading
          title="Recent Activity"
          actionLabel="View All Activity"
          actionHref="/dashboard/seeker/applications"
        />
        <div className="flex flex-col gap-1">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="group flex h-[66px] items-center gap-6 rounded-lg border border-white/[0.07] bg-[#141418] px-6 shadow-[0_1px_2px_rgba(0,0,0,0.28)]"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#222228]">
                <activity.icon className={`size-4 ${activity.iconClassName}`} />
              </div>
              <p className="min-w-0 flex-1 truncate text-sm text-white">
                {activity.message}
              </p>
              <span className="shrink-0 text-sm text-[#A0A0AB]">
                {activity.time}
              </span>
              <button
                type="button"
                aria-label="Open activity"
                className="flex size-7 shrink-0 items-center justify-center rounded-md text-[#C4C7C8] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/5"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <FAB href="/dashboard/seeker/jobs" label="Quick Search" size="sm" />
    </div>
  )
}

export default SeekerDashboardPage
