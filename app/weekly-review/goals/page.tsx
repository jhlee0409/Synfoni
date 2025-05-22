import { AppShell } from "@/components/app-shell"
import { WeeklyGoalsForm } from "@/components/weekly-goals-form"

/**
 * Renders the weekly goals page with a header and a form for setting development goals.
 *
 * Displays a title, subtitle, and the {@link WeeklyGoalsForm} component within an {@link AppShell} layout.
 */
export default function WeeklyGoals() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Set Weekly Goals</h1>
          <p className="text-muted-foreground">Define your development goals for the week</p>
        </div>
        <WeeklyGoalsForm />
      </div>
    </AppShell>
  )
}
