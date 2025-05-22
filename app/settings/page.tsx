import { SettingsView } from "@/components/settings-view"
import { AppShell } from "@/components/app-shell"

/**
 * Renders the settings page within the application shell layout.
 *
 * Displays the {@link SettingsView} component wrapped by {@link AppShell}.
 */
export default function Settings() {
  return (
    <AppShell>
      <SettingsView />
    </AppShell>
  )
}
