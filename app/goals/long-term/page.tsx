import { AppShell } from "@/components/app-shell"
import { LongTermGoalsView } from "@/components/long-term-goals-view"

/**
 * Renders the Long-term Goals page with a header and the long-term goals view.
 *
 * Displays a titled section introducing long-term goals and includes the {@link LongTermGoalsView} component within an {@link AppShell} layout.
 */
export default function LongTermGoalsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Long-term Goals</h1>
          <p className="text-muted-foreground">Plan and track your long-term development journey</p>
        </div>
        <LongTermGoalsView />
      </div>
    </AppShell>
  )
}
