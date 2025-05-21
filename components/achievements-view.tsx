"use client"

import Link from "next/link"
import { Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Renders a presentational section for displaying user achievements.
 *
 * Displays a header with a title, subtitle, and a navigation button to view all achievements. Below the header, a card provides a placeholder message and icon indicating that the achievements view is not yet implemented.
 */
export function AchievementsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Your Achievements</h2>
          <p className="text-sm text-muted-foreground">Celebrate your development milestones and accomplishments</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/goals/achievements/all">View All</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>This page will display your earned achievements and badges</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <Trophy className="h-12 w-12 text-amber-500 mb-4" />
          <p className="text-muted-foreground">
            This is a placeholder for the Achievements view. The component will be fully implemented in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
