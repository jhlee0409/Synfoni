import { AppShell } from "@/components/app-shell"
import { UserProfileView } from "@/components/user-profile-view"

export default function UserProfile({ params }: { params: { username: string } }) {
  return (
    <AppShell>
      <UserProfileView username={params.username} />
    </AppShell>
  )
}
