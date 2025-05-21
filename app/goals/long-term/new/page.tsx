import { AppShell } from "@/components/app-shell"
import { NewLongTermGoalForm } from "@/components/new-long-term-goal-form"

export default function NewLongTermGoalPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add Long-term Goal</h1>
          <p className="text-muted-foreground">Define a new long-term development goal to track your progress</p>
        </div>
        <NewLongTermGoalForm />
      </div>
    </AppShell>
  )
}
