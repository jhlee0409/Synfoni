import { MilestoneDetailView } from "@/components/milestone-detail-view"
import { AppShell } from "@/components/app-shell"

/**
 * Displays the detail view for a specific milestone based on the provided route parameter.
 *
 * @param params - An object containing the milestone's string identifier as {@link params.id}.
 */
export default function MilestoneDetailPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <MilestoneDetailView id={Number.parseInt(params.id)} />
    </AppShell>
  )
}
