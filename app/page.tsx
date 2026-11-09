import { Hero } from "@/components/hero"
import { SiteNavbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="min-h-svh">
      <SiteNavbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
