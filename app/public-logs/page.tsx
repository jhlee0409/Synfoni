import { PublicLogsView } from "@/components/public-logs-view"
import { AppShell } from "@/components/app-shell"

/**
 * Renders the public logs page within the application shell layout.
 *
 * Displays the {@link PublicLogsView} component inside an {@link AppShell} wrapper.
 */
export default function PublicLogs() {
  return (
    <AppShell>
      <PublicLogsView />
    </AppShell>
  )
}
