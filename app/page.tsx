import { SiteNavbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="min-h-svh">
      <SiteNavbar />
      <main>
        <div className="flex max-w-md min-w-0 flex-col gap-4 p-6 text-sm leading-loose">
          <div>
            <h1 className="font-medium">Project ready!</h1>
            <p>You may now add components and start building.</p>
            <p>We&apos;ve already added the navbar for you.</p>
            <button className="mt-2">Button</button>
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            (Press <kbd>d</kbd> to toggle dark mode)
          </div>
        </div>
      </main>
    </div>
  )
}
