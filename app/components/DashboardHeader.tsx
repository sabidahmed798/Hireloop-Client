"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { Bell, MessageSquareMore, Search } from "lucide-react"

import { useSession } from "@/lib/auth-client"

const placeholderBySection: Record<string, string> = {
  admin: "Global search...",
  recruiter: "Search for opportunities...",
  seeker: "Search for opportunities...",
}

export function DashboardHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const section = pathname.split("/")[2] ?? "seeker"
  const placeholder =
    placeholderBySection[section] ?? placeholderBySection.seeker
  const avatar = session?.user?.image || "/images/avatars/profile-user.jpg"

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.06] px-8 py-2.5">
      {/* Global search */}
      <div className="flex h-9 w-[320px] items-center gap-2 rounded-lg border border-white/10 bg-[#0C0C0F] px-3">
        <Search className="size-[18px] shrink-0 text-[#C4C7C8]" />
        <input
          type="search"
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-sm text-[#EDEDEF] outline-none placeholder:text-[#828997]"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative flex size-8 items-center justify-center rounded-lg text-[#C4C7C8] transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Messages"
        >
          <MessageSquareMore className="size-5" />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-[#EF4444]" />
        </button>
        <button
          type="button"
          className="relative flex size-8 items-center justify-center rounded-lg text-[#C4C7C8] transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-[#22C55E]" />
        </button>
        <Image
          src={avatar}
          alt="Your profile"
          width={32}
          height={32}
          className="ml-1 size-8 rounded-full border border-white/10 object-cover"
        />
      </div>
    </header>
  )
}
