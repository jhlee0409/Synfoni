import { MilestoneForm } from "@/components/milestone-form"
import { AppShell } from "@/components/app-shell"

/**
 * Renders a page for adding a new milestone, including a header and a milestone input form.
 *
 * Displays a title, a descriptive subtitle, and the {@link MilestoneForm} component within an {@link AppShell} layout.
 */
export default function NewMilestonePage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Milestone</h1>
          <p className="text-muted-foreground">Record significant achievements in your development journey</p>
        </div>
        <MilestoneForm />
      </div>
    </AppShell>
  )
}
