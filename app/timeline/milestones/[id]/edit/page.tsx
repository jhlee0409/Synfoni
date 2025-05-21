import { MilestoneForm } from "@/components/milestone-form"
import { AppShell } from "@/components/app-shell"

export default function EditMilestonePage({ params }: { params: { id: string } }) {
  const milestoneId = Number.parseInt(params.id)

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Milestone</h1>
          <p className="text-muted-foreground">Update the details of your milestone</p>
        </div>
        <MilestoneForm milestoneId={milestoneId} isEditing={true} />
      </div>
    </AppShell>
  )
}
