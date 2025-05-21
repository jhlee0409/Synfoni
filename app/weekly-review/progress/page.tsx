import { AppShell } from "@/components/app-shell"
import { WeeklyProgressView } from "@/components/weekly-progress-view"

/**
 * Renders the Weekly Progress page with a header and a detailed progress view.
 *
 * Displays a title, a descriptive subtitle, and the {@link WeeklyProgressView} component within an application shell layout.
 */
export default function WeeklyProgressPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Weekly Progress</h1>
          <p className="text-muted-foreground">Track your progress towards your weekly goals</p>
        </div>
        <WeeklyProgressView />
      </div>
    </AppShell>
  )
}
