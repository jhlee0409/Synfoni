import { MilestoneDetailView } from "@/components/milestone-detail-view"
import { AppShell } from "@/components/app-shell"

export default function MilestoneDetailPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <MilestoneDetailView id={Number.parseInt(params.id)} />
    </AppShell>
  )
}
