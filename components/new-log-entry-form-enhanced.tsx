"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CheckCircle2, X } from "lucide-react"

import { useCreateDailyLog } from "@/hooks/useCreateDailyLog"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CreateDailyLogRequest, WeeklyGoal } from "@/lib/types"

// Sample data
const commonTags = [
  "react",
  "typescript",
  "next.js",
  "tailwind",
  "css",
  "javascript",
  "api",
  "performance",
  "design",
  "testing",
  "node.js",
  "database",
]

// Sample weekly goals
const weeklyGoals = [
  {
    id: "wg1",
    title: "Learn React Performance Optimization",
    category: "learning",
    weekStartDate: "2025-05-15",
    weekEndDate: "2025-05-21",
    completed: false,
    progress: 70,
    tags: ["react", "optimization", "performance"],
  },
  {
    id: "wg2",
    title: "Design Portfolio Website",
    category: "project",
    weekStartDate: "2025-05-15",
    weekEndDate: "2025-05-21",
    completed: true,
    progress: 100,
    tags: ["design", "portfolio"],
  },
] as WeeklyGoal[]

/**
 * Renders a form for creating a daily log entry with title, content, and tags, automatically linking related weekly goals based on selected tags.
 *
 * Users can add or remove tags, select from common tags, and view weekly goals that share any selected tags. Upon submission, the log entry is saved with associated goal IDs and the user is redirected to the daily log page.
 */
export function NewLogEntryFormEnhanced() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [relatedGoals, setRelatedGoals] = useState<WeeklyGoal[]>([])
  
  // useCreateDailyLog 커스텀 훅 사용
  const { createLog, isSubmitting, error } = useCreateDailyLog()

  // Automatically find related goals when tags change
  useEffect(() => {
    if (selectedTags.length > 0) {
      const matchingGoals = weeklyGoals.filter((goal) => goal.tags.some((tag) => selectedTags.includes(tag)))
      setRelatedGoals(matchingGoals)
    } else {
      setRelatedGoals([])
    }
  }, [selectedTags])

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag])
      setNewTag("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      return
    }

    // 커스텀 훅을 사용하여 로그 저장
    await createLog({
      title,
      content,
      tags: selectedTags,
      linkedGoalIds: relatedGoals.map((g) => g.id),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Create Daily Log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What did you learn or accomplish today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Describe what you learned or accomplished in detail..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                    type="button"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag}</span>
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="max-w-[200px]"
              />
              <Button variant="outline" size="sm" onClick={handleAddTag} type="button">
                Add Tag
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Common Tags</Label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Automatically connected goals */}
          {relatedGoals.length > 0 && (
            <div className="space-y-2 rounded-md border p-4">
              <Label className="font-medium">Automatically Connected Goals</Label>
              <p className="text-xs text-muted-foreground">
                Based on your selected tags, this log will be connected to these goals:
              </p>
              <div className="mt-2 space-y-2">
                {relatedGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{goal.title}</span>
                    <div className="ml-auto flex gap-1">
                      {goal.tags
                        .filter((tag) => selectedTags.includes(tag))
                        .map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()} type="button" disabled={isSubmitting}>
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
