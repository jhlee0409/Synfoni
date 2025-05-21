import { MilestonesView } from "@/components/milestones-view"
import { AppShell } from "@/components/app-shell"

/**
 * Renders the Milestones page with a header and a view of significant achievements.
 *
 * Displays a title, descriptive subtitle, and the {@link MilestonesView} component within an {@link AppShell} layout.
 *
 * @returns The Milestones page React element.
 */
export default function MilestonesPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Milestones</h1>
          <p className="text-muted-foreground">Track significant achievements in your development journey</p>
        </div>
        <MilestonesView />
      </div>
    </AppShell>
  )
}
