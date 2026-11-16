import { SiteNavbar } from "@/components/navbar"
import { JobSearchBar } from "@/components/browse/job-search-bar"
import { JobFilters, type FilterGroup } from "@/components/browse/job-filters"
import { JobSortSelect } from "@/components/browse/job-sort-select"
import { JobCard } from "@/components/browse/job-card"
import { getJobs } from "@/lib/api/jobs"
import type { FormState, JobRecord } from "@/lib/types/job"

/**
 * Filter options derived from the loaded jobs, one group per common
 * `FormState` field: job type, category and the remote flag.
 */
const buildFilterGroups = (jobs: JobRecord[]): FilterGroup[] => {
  const countByField = (field: keyof FormState) => {
    const counts = new Map<string, number>()
    for (const job of jobs) {
      const value = job[field]
      if (typeof value !== "string" || value === "") continue
      counts.set(value, (counts.get(value) ?? 0) + 1)
    }
    return [...counts.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, count]) => ({ label, count }))
  }

  return [
    { name: "Job Type", mode: "single", options: countByField("jobType") },
    { name: "Category", mode: "single", options: countByField("category") },
    {
      name: "Work Mode",
      options: [
        { label: "Remote", count: jobs.filter((job) => job.remote).length },
      ],
    },
  ]
}

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()

  const jobs = (await getJobs(query)) as JobRecord[]
  const filterGroups = buildFilterGroups(jobs)

  return (
    <div className="min-h-svh">
      <SiteNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <JobSearchBar />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          <JobFilters groups={filterGroups} className="lg:w-60" />

          <section className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-lg font-semibold text-foreground">
                Found {jobs.length.toLocaleString()} Jobs
              </h1>
              <JobSortSelect />
            </div>

            {jobs.length === 0 ? (
              <p className="mt-4 rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
                No jobs match your search yet — try clearing the filters.
              </p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default BrowseJobsPage
