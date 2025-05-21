import { IntegratedDashboard } from "@/components/integrated-dashboard"
import { AppShell } from "@/components/app-shell"

export default function Home() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Developer Growth Dashboard</h1>
          <p className="text-muted-foreground">Track all your development activities and goals in one place</p>
        </div>
        <IntegratedDashboard />
      </div>
    </AppShell>
  )
}
