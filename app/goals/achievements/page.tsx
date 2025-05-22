import { AppShell } from "@/components/app-shell"
import { AchievementsView } from "@/components/achievements-view"

export default function AchievementsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground">Celebrate your development milestones and accomplishments</p>
        </div>
        <AchievementsView />
      </div>
    </AppShell>
  )
}
