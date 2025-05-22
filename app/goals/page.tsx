import { AppShell } from "@/components/app-shell"
import { GoalsOverview } from "@/components/goals-overview"

/**
 * Displays the main goals page with a header and an overview of development goals.
 *
 * Renders a layout containing a title, subtitle, and the {@link GoalsOverview} component within an {@link AppShell}.
 */
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
