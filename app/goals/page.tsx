import { AppShell } from "@/components/app-shell"
import { GoalsOverview } from "@/components/goals-overview"

export default function GoalsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Goals</h1>
          <p className="text-muted-foreground">Track and manage your development goals</p>
        </div>
        <GoalsOverview />
      </div>
    </AppShell>
  )
}
