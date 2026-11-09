"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { MapPinIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// The search bar of the hero section.
// For now it just logs what the user typed.
// TODO: when the /browse-jobs page exists, send the user there.
export function HeroSearchForm() {
  // Remember what the user types in the two input fields.
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")

  // Runs when the user presses Enter or clicks the search button.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // stop the browser from reloading the page
    console.log("Searching jobs for:", { query, location })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-4 shadow-sm"
    >
      {/* Step 1: what job does the user want? */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Job title, skill or company"
          className="h-9 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Thin vertical line between the two fields */}
      <Separator orientation="vertical" className="h-6 self-center!" />

      {/* Step 2: where does the user want to work? */}
      <div className="hidden min-w-0 flex-1 items-center gap-2 sm:flex">
        <MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Location or Remote"
          className="h-9 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Step 3: the purple search button */}
      <Button type="submit" size="icon" className="size-9 rounded-lg">
        <SearchIcon />
        <span className="sr-only">Search jobs</span>
      </Button>
    </form>
  )
}
