import { WeeklyReviewView } from "@/components/weekly-review-view"
import { AppShell } from "@/components/app-shell"

/**
 * Renders the weekly review page within the application shell layout.
 *
 * Displays the {@link WeeklyReviewView} component wrapped inside {@link AppShell}.
 */
export default function WeeklyReview() {
  return (
    <AppShell>
      <WeeklyReviewView />
    </AppShell>
  )
}
