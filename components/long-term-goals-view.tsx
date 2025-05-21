"use client"

import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Renders a static user interface section for managing and viewing long-term career goals.
 *
 * Displays a header with a title, subtitle, and a button linking to the goal creation page, followed by a card containing a placeholder message for future implementation.
 */
export function LongTermGoalsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Your Long-term Goals</h2>
          <p className="text-sm text-muted-foreground">Track your progress towards major career milestones</p>
        </div>
        <Button asChild>
          <Link href="/goals/long-term/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Goal
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Long-term Goals</CardTitle>
          <CardDescription>This page will display your long-term development goals and progress</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-muted-foreground">
            This is a placeholder for the Long-term Goals view. The component will be fully implemented in a future
            update.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
