"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, Clock, Edit, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample weekly goals data
const weeklyGoals = [
  {
    id: 1,
    title: "Complete 5 daily log entries",
    category: "consistency",
    completed: 3,
    target: 5,
    progress: 60,
    dueDate: "May 21, 2025",
  },
  {
    id: 2,
    title: "Learn React Server Components",
    category: "learning",
    completed: 1,
    target: 1,
    progress: 100,
    dueDate: "May 19, 2025",
  },
  {
    id: 3,
    title: "Refactor authentication system",
    category: "project",
    completed: 0,
    target: 1,
    progress: 0,
    dueDate: "May 22, 2025",
  },
  {
    id: 4,
    title: "Read 3 technical articles",
    category: "learning",
    completed: 2,
    target: 3,
    progress: 67,
    dueDate: "May 20, 2025",
  },
]

// Goal categories
const categories = [
  { value: "all", label: "All Categories" },
  { value: "learning", label: "Learning" },
  { value: "project", label: "Project Work" },
  { value: "consistency", label: "Consistency" },
  { value: "skill", label: "Skill Building" },
]

export function WeeklyProgressView() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedWeek, setSelectedWeek] = useState("current")

  // Filter goals based on category
  const filteredGoals =
    selectedCategory === "all" ? weeklyGoals : weeklyGoals.filter((goal) => goal.category === selectedCategory)

  // Calculate overall progress
  const overallProgress =
    weeklyGoals.length > 0
      ? Math.round(weeklyGoals.reduce((sum, goal) => sum + goal.progress, 0) / weeklyGoals.length)
      : 0

  // Count completed goals
  const completedGoals = weeklyGoals.filter((goal) => goal.progress === 100).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="previous">Previous Week</SelectItem>
              <SelectItem value="next">Next Week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button asChild>
          <Link href="/weekly-review/goals">
            <PlusCircle className="mr-2 h-4 w-4" />
            Set New Goals
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Overall Progress</div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{overallProgress}%</span>
                <Progress value={overallProgress} className="h-2 w-[100px]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Goals Completed</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {completedGoals}/{weeklyGoals.length}
                </span>
                {completedGoals === weeklyGoals.length && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Week Ending</div>
              <div className="text-2xl font-bold">May 22, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Goal Progress</h3>

        {filteredGoals.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No goals found for the selected category.
            </CardContent>
          </Card>
        ) : (
          filteredGoals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{goal.title}</CardTitle>
                  <Badge variant="outline">{categories.find((c) => c.value === goal.category)?.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Progress:</span>
                      <span className="text-sm">
                        {goal.completed}/{goal.target} completed
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Due: {goal.dueDate}</span>
                    </div>
                  </div>

                  <Progress value={goal.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/weekly-review/goals/${goal.id}`}>
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/weekly-review/goals/${goal.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Update Progress
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/weekly-review">View Weekly Summary</Link>
        </Button>
      </div>
    </div>
  )
}
