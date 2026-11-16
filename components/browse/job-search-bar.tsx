"use client"

import type { FormEvent } from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "cn"

/**
 * Search bar above the job results. Submits the typed term to the
 * (still to be wired) query state — see the TODO in `handleSubmit`.
 */
export function JobSearchBar({ className }: { className?: string }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // TODO: wire the search — read the input value and pass it to the
    // results (e.g. update ?q=… in the URL so the page refetches).
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border bg-card p-2 pl-4 shadow-sm",
        className
      )}
    >
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
      <input
        type="search"
        name="search"
        placeholder="Search by job title, keywords..."
        className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <Button
        type="submit"
        className="h-9 bg-[#FAFAFA] px-4 text-[#0B0B0C] hover:bg-[#EDEDEF]"
      >
        Search Jobs
      </Button>
    </form>
  )
}
