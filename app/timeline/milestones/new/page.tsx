import { MilestoneForm } from "@/components/milestone-form"
import { AppShell } from "@/components/app-shell"

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
