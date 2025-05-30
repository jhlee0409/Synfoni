import { SettingsView } from "@/components/settings-view";
import { AppShell } from "@/components/app-shell";
import { createClient } from "@/utils/supabase/server";

/**
 * Renders the settings page within the application shell layout.
 *
 * Displays the {@link SettingsView} component wrapped by {@link AppShell}.
 */
export default async function Settings() {
  const supabase = createClient();

  const { data } = await (await supabase).auth.getUser();

  return (
    <AppShell>
      <SettingsView user={data.user} />
    </AppShell>
  );
}
