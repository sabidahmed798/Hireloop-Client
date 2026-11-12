import { DashboardHeader } from "@/app/components/DashboardHeader"
import { DashboardSidebar } from "@/app/components/DashboardSidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh gap-2 bg-[#08080A] p-2">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-white/[0.06] bg-[#0E0E11]">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
