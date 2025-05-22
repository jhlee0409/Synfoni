"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, PlusCircle, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Goal categories
const goalCategories = [
  { value: "career", label: "Career Development" },
  { value: "learning", label: "Learning & Skills" },
  { value: "project", label: "Project Completion" },
  { value: "community", label: "Community Contribution" },
  { value: "certification", label: "Certification" },
]

// Common skill tags
const commonSkillTags = [
  "react",
  "next.js",
  "typescript",
  "javascript",
  "node.js",
  "database",
  "aws",
  "cloud",
  "ui/ux",
  "testing",
  "devops",
  "mobile",
  "architecture",
  "leadership",
  "open-source",
]

export function NewLongTermGoalForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [milestones, setMilestones] = useState<{ title: string; description: string }[]>([
    { title: "", description: "" },
  ])
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const handleAddMilestone = () => {
    setMilestones([...milestones, { title: "", description: "" }])
  }

  const handleRemoveMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index))
    }
  }

  const handleMilestoneChange = (index: number, field: "title" | "description", value: string) => {
    const updatedMilestones = [...milestones]
    updatedMilestones[index][field] = value
    setMilestones(updatedMilestones)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!category) {
      newErrors.category = "Category is required"
    }

    // Check if at least one milestone has a title
    if (milestones.length > 0 && !milestones.some((m) => m.title.trim())) {
      newErrors.milestones = "At least one milestone with a title is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // In a real app, you would save the goal to your database
    console.log({
      title,
      description,
      category,
      targetDate: targetDate ? format(targetDate, "MMMM d, yyyy") : "Ongoing",
      tags: selectedTags,
      milestones: milestones.filter((m) => m.title.trim()),
    })

    // Navigate back to long-term goals page
    router.push("/goals/long-term")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Long-term Goal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              placeholder="What do you want to achieve?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your goal in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              required
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {goalCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetDate">Target Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="targetDate"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !targetDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {targetDate ? format(targetDate, "PPP") : "Select date or leave for ongoing"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={targetDate} onSelect={setTargetDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
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
                placeholder="Add a new tag"
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
            <Label>Common Skill Tags</Label>
            <div className="flex flex-wrap gap-2">
              {commonSkillTags.map((tag) => (
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

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Key Milestones</Label>
              <Button variant="outline" size="sm" onClick={handleAddMilestone} type="button">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Milestone
              </Button>
            </div>
            {errors.milestones && <p className="text-sm text-destructive">{errors.milestones}</p>}

            {milestones.map((milestone, index) => (
              <div key={index} className="space-y-2 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Milestone {index + 1}</h4>
                  {milestones.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMilestone(index)}
                      type="button"
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove milestone</span>
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Milestone title"
                    value={milestone.title}
                    onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                  />
                  <Textarea
                    placeholder="Brief description (optional)"
                    value={milestone.description}
                    onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                    className="min-h-[60px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/goals/long-term")} type="button">
            Cancel
          </Button>
          <Button type="submit">Create Goal</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
