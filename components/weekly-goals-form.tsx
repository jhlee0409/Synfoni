"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Sample initial goals
const initialGoals = [
  { id: 1, title: "Complete 5 daily log entries", category: "consistency", completed: false },
  { id: 2, title: "Learn React Server Components", category: "learning", completed: false },
  { id: 3, title: "Refactor authentication system", category: "project", completed: true },
]

// Goal categories
const categories = [
  { value: "learning", label: "Learning" },
  { value: "project", label: "Project Work" },
  { value: "consistency", label: "Consistency" },
  { value: "skill", label: "Skill Building" },
]

/**
 * Displays and manages a weekly goals list with add, toggle, delete, and save functionalities.
 *
 * Renders a form allowing users to view, add, complete, and remove weekly goals, each with a title and category. On submission, the current goals are logged and the user is navigated to the weekly review page.
 */
export function WeeklyGoalsForm() {
  const router = useRouter()
  const [goals, setGoals] = useState(initialGoals)
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [newGoalCategory, setNewGoalCategory] = useState("learning")

  const handleAddGoal = () => {
    if (newGoalTitle.trim()) {
      const newGoal = {
        id: Date.now(),
        title: newGoalTitle,
        category: newGoalCategory,
        completed: false,
      }
      setGoals([...goals, newGoal])
      setNewGoalTitle("")
    }
  }

  const handleToggleGoal = (id: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the goals to your database
    console.log({ goals, weekStarting: new Date().toISOString() })

    // Navigate back to weekly review
    router.push("/weekly-review")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Goals */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Current Goals</h3>
              <span className="text-sm text-muted-foreground">
                {goals.filter((g) => g.completed).length}/{goals.length} completed
              </span>
            </div>

            {goals.length === 0 ? (
              <div className="rounded-md border border-dashed p-6 text-center">
                <p className="text-sm text-muted-foreground">No goals set for this week yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between space-x-2 rounded-md border p-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`goal-${goal.id}`}
                        checked={goal.completed}
                        onCheckedChange={() => handleToggleGoal(goal.id)}
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor={`goal-${goal.id}`}
                          className={goal.completed ? "line-through text-muted-foreground" : ""}
                        >
                          {goal.title}
                        </Label>
                        <Badge variant="outline" className="text-xs">
                          {categories.find((c) => c.value === goal.category)?.label || goal.category}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteGoal(goal.id)} type="button">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Delete goal</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Add New Goal */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Add New Goal</h3>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input
                  id="goal-title"
                  placeholder="Enter your goal"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                />
              </div>
              <div className="w-full space-y-2 sm:w-[180px]">
                <Label htmlFor="goal-category">Category</Label>
                <Select value={newGoalCategory} onValueChange={setNewGoalCategory}>
                  <SelectTrigger id="goal-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddGoal} type="button">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Goal
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()} type="button">
            Cancel
          </Button>
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" />
            Save Goals
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
