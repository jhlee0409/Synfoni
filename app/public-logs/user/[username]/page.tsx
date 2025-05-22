import { AppShell } from "@/components/app-shell"
import { UserProfileView } from "@/components/user-profile-view"

/**
 * Renders the user profile page for a given username.
 *
 * Displays the {@link UserProfileView} component within an {@link AppShell}, using the provided username from {@link params}.
 *
 * @param params - An object containing the username to display.
 */
export default function UserProfile({ params }: { params: { username: string } }) {
  return (
    <AppShell>
      <UserProfileView username={params.username} />
    </AppShell>
  )
}
