"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, X } from "lucide-react"

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

// Sample milestone types
const milestoneTypes = [
  { value: "project", label: "Project Completion" },
  { value: "learning", label: "Learning Achievement" },
  { value: "certification", label: "Certification" },
  { value: "skill", label: "Skill Mastery" },
  { value: "career", label: "Career Milestone" },
]

// Sample common tags
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
]

/**
 * Renders a form for creating a new milestone entry with fields for title, date, type, description, and tags.
 *
 * Users can select a date, choose a milestone type, enter a description, and manage tags by selecting from common options or adding custom tags. Upon submission, the milestone data is logged and the user is redirected to the timeline page.
 *
 * @returns The milestone creation form component.
 */
export function NewMilestoneForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [type, setType] = useState("project")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally save the milestone to your database
    console.log({ title, description, date, type, tags: selectedTags })

    // Navigate back to timeline
    router.push("/timeline")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Milestone Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What did you achieve?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Milestone Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {milestoneTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your milestone in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()} type="button">
            Cancel
          </Button>
          <Button type="submit">Save Milestone</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
