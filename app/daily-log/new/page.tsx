import { AppShell } from "@/components/app-shell"
import { NewLogEntryFormEnhanced } from "@/components/new-log-entry-form-enhanced"

/**
 * Renders the page for creating a new daily log entry, including a heading, description, and the log entry form.
 *
 * Displays a form for users to record their development activities for the current day.
 */
export default function NewLogEntry() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Daily Log</h1>
          <p className="text-muted-foreground">Record your development activities for today</p>
        </div>
        <NewLogEntryFormEnhanced />
      </div>
    </AppShell>
  )
}
