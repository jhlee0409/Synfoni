import { AppShell } from "@/components/app-shell"
import { DailyLogView } from "@/components/daily-log-view"

export default function DailyLog() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Daily Log</h1>
            <p className="text-muted-foreground">Record and track your daily development activities</p>
          </div>
        </div>
        <DailyLogView />
      </div>
    </AppShell>
  )
}
