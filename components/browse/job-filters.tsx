"use client"

import { useState } from "react"
import type { ReactNode } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { cn } from "cn"

/** One filter row: label + how many jobs match it. */
export type FilterOption = {
  label: string
  count: number
}

/** A titled section of filter rows, e.g. "Job Type". */
export type FilterGroup = {
  name: string
  options: FilterOption[]
  /**
   * "single" keeps one selection per group (radio behaviour);
   * "multiple" allows independent toggles (checkbox behaviour). Default "multiple".
   */
  mode?: "single" | "multiple"
}

/** Compact count like the mockup: 1248 → "1.2k". */
const formatCount = (count: number) => {
  if (count < 1000) return `${count}`
  return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`
}

function FilterOptionRow({
  option,
  control,
}: {
  option: FilterOption
  control: ReactNode
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 transition-colors hover:bg-muted/50">
      {control}
      <span className="truncate text-sm text-muted-foreground">
        {option.label}
      </span>
      <span className="ml-auto shrink-0 text-xs text-muted-foreground/80">
        {formatCount(option.count)}
      </span>
    </label>
  )
}

/**
 * One filter section. The parent owns the selection state for
 * single-select groups; multiple groups manage their own toggles.
 */
function FilterSection({
  group,
  selected,
  onSelect,
}: {
  group: FilterGroup
  selected: Record<string, string>
  onSelect: (group: string, value: string) => void
}) {
  return (
    <section className="mt-5 first:mt-4">
      <h3 className="text-sm font-medium text-foreground">{group.name}</h3>

      {group.mode === "single" ? (
        <RadioGroup
          value={selected[group.name]}
          onValueChange={(value) => {
            onSelect(group.name, value as string)

            // TODO: apply the selected value to the results.
          }}
          className="mt-1.5"
        >
          {group.options.map((option) => (
            <FilterOptionRow
              key={option.label}
              option={option}
              control={<Radio value={option.label} />}
            />
          ))}
        </RadioGroup>
      ) : (
        <ul className="mt-1.5 flex flex-col">
          {group.options.map((option) => (
            <li key={option.label}>
              <FilterOptionRow
                option={option}
                control={
                  <Checkbox
                    onCheckedChange={() => {
                      // TODO: toggle the filter and apply it to the results.
                    }}
                  />
                }
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/**
 * Sidebar filters for the browse page. Options are data-driven — the page
 * derives them from the loaded jobs (a `FormState` field per group).
 */
export function JobFilters({
  groups,
  className,
}: {
  groups: FilterGroup[]
  className?: string
}) {
  // Latest selection per single-select group, keyed by group name.
  const [selected, setSelected] = useState<Record<string, string>>({})

  const handleSelect = (group: string, value: string) => {
    setSelected((prev) => ({ ...prev, [group]: value }))
  }

  return (
    <aside
      className={cn(
        "h-fit shrink-0 rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
    >
      <h2 className="text-sm font-semibold text-foreground">Filters</h2>
      {groups.map((group) => (
        <FilterSection
          key={group.name}
          group={group}
          selected={selected}
          onSelect={handleSelect}
        />
      ))}
    </aside>
  )
}
