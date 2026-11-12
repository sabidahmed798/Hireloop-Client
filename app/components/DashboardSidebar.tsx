"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react"

import { signOut, useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type Role = "seeker" | "recruiter" | "admin"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: React.ElementType
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Briefcase,
    },
    {
      id: "saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "company",
      name: "My Company",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },

    {
      id: "jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },

    {
      id: "jobs",
      name: "Add Jobs",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/recruiter/applicants",
      icon: Users,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
    {
      id: "companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    {
      id: "payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

const roleMeta: Record<
  Role,
  {
    subtitle: string
    roleLabel: string
    ctaLabel: string | null
    badge: string | null
  }
> = {
  seeker: {
    subtitle: "",
    roleLabel: "Professional Tier",
    ctaLabel: "Post Resume",
    badge: null,
  },
  recruiter: {
    subtitle: "",
    roleLabel: "Recruiter",
    ctaLabel: "Post a Job",
    badge: "Premium account",
  },
  admin: {
    subtitle: "Admin Console",
    roleLabel: "System Admin",
    ctaLabel: null,
    badge: null,
  },
}

const avatarByRole: Record<Role, string> = {
  seeker: "/images/avatars/seeker-identity.jpg",
  recruiter: "/images/avatars/alex-sterling.jpg",
  admin: "/images/avatars/alex-rivera.jpg",
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = ((session?.user?.role as Role) || "seeker") satisfies Role
  const meta = roleMeta[role]
  const userName = session?.user?.name || "Alex Rivera"
  const avatar = session?.user?.image || avatarByRole[role]

  return (
    <aside className="flex w-[248px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-white/[0.06] bg-[#08080A]">
      {/* Brand */}
      <div className="flex flex-col gap-4 px-4 pt-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/hireloop-logo.png"
            alt="HireLoop"
            width={112}
            height={32}
            className="h-7 w-auto"
            priority
          />
        </Link>
        {meta.subtitle ? (
          <p className="text-xs text-[#A0A0AB]">{meta.subtitle}</p>
        ) : null}
      </div>

      {/* Identity */}
      <div className="mt-5 flex items-center gap-2.5 px-4">
        <Image
          src={avatar}
          alt={userName}
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-full border border-white/10 object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#EDEDEF]">
            {userName}
          </p>
          <p className="text-xs text-[#A0A0AB]">{meta.roleLabel}</p>
          {meta.badge ? (
            <span className="mt-1 inline-flex rounded-full bg-[#8F88FF]/15 px-2 py-0.5 text-[11px] font-medium text-[#8F88FF]">
              {meta.badge}
            </span>
          ) : null}
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-6 flex flex-col gap-1 px-3">
        {menuItemsByRole[role].map((item) => {
          const active =
            pathname === item.url ||
            (item.url !== `/dashboard/${role}` &&
              pathname.startsWith(`${item.url}/`))
          return (
            <Link
              key={item.id}
              href={item.url}
              className={cn(
                "flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm transition-colors",
                active
                  ? "bg-white/[0.06] font-medium text-white"
                  : "text-[#A0A0AB] hover:bg-white/[0.03] hover:text-[#EDEDEF]"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-2 px-4 pb-4">
        {meta.ctaLabel ? (
          <Link
            href={
              role === "seeker"
                ? "/dashboard/seeker/jobs"
                : "/dashboard/recruiter/jobs"
            }
            className="flex h-10 w-full items-center justify-center rounded-lg bg-[#FAFAFA] text-sm font-medium text-[#0B0B0C] transition-colors hover:bg-white"
          >
            {meta.ctaLabel}
          </Link>
        ) : (
          <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
            <Image
              src={avatar}
              alt={userName}
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-full border border-white/10 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#EDEDEF]">
                {userName}
              </p>
              <p className="text-xs text-[#A0A0AB]">{meta.roleLabel}</p>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => signOut()}
          className="flex h-9 items-center gap-2.5 rounded-lg px-2 text-sm text-[#A0A0AB] transition-colors hover:bg-white/[0.03] hover:text-[#EDEDEF]"
        >
          <LogOut className="size-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
