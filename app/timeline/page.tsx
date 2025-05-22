import { TimelineView } from "@/components/timeline-view"
import { AppShell } from "@/components/app-shell"

/**
 * Renders the timeline page layout with the timeline view inside an application shell.
 */
export default function Timeline() {
  return (
    <AppShell>
      <TimelineView />
    </AppShell>
  )
}
