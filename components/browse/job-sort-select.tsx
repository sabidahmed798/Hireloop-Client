"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "salary", label: "Highest Salary" },
] as const

/** "Sort by" dropdown next to the result count. */
export function JobSortSelect() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Sort by:</span>
      <Select
        defaultValue="recent"
        onValueChange={() => {
          // TODO: apply the chosen order to the results.
        }}
      >
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
