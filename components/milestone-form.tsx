"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  { value: "achievement", label: "Achievement" },
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
  "open-source",
  "github",
  "database",
  "prisma",
  "certification",
]

// Sample milestone data - in a real app, you would fetch this based on the ID
const milestones = [
  {
    id: 1,
    date: "January 15, 2025",
    title: "Started Learning React",
    description: "Began the journey with React fundamentals and component architecture.",
    type: "learning",
    tags: ["react", "learning"],
    relatedLinks: [
      { title: "React Documentation", url: "https://reactjs.org" },
      { title: "React Tutorial", url: "https://reactjs.org/tutorial/tutorial.html" },
    ],
    notes: "Initial learning curve was steep but the component model makes a lot of sense.",
  },
  {
    id: 2,
    date: "February 10, 2025",
    title: "First Next.js Project",
    description: "Created my first Next.js application with basic routing and data fetching.",
    type: "project",
    tags: ["next.js", "project"],
    relatedLinks: [
      { title: "Next.js Documentation", url: "https://nextjs.org/docs" },
      { title: "Project Repository", url: "https://github.com/username/project" },
    ],
    notes: "Next.js makes React development much more streamlined.",
  },
  {
    id: 3,
    date: "March 5, 2025",
    title: "Mastered Tailwind CSS",
    description: "Completed advanced Tailwind CSS course and implemented custom design system.",
    type: "skill",
    tags: ["tailwind", "css", "design"],
    relatedLinks: [{ title: "Tailwind CSS Documentation", url: "https://tailwindcss.com/docs" }],
    notes: "Tailwind CSS has completely changed how I approach styling.",
  },
  {
    id: 4,
    date: "April 20, 2025",
    title: "Full-Stack Application",
    description: "Developed a full-stack application with Next.js, Prisma, and PostgreSQL.",
    type: "project",
    tags: ["next.js", "prisma", "database"],
    relatedLinks: [{ title: "Prisma Documentation", url: "https://www.prisma.io/docs" }],
    notes: "Building a full-stack application was challenging but rewarding.",
  },
  {
    id: 5,
    date: "May 1, 2025",
    title: "Open Source Contribution",
    description: "Made my first significant contribution to an open source project on GitHub.",
    type: "achievement",
    tags: ["open-source", "github"],
    relatedLinks: [{ title: "Pull Request", url: "https://github.com/org/repo/pull/123" }],
    notes: "Contributing to open source was intimidating at first, but the community was very welcoming.",
  },
  {
    id: 6,
    date: "May 15, 2025",
    title: "TypeScript Certification",
    description: "Earned official certification in TypeScript advanced concepts.",
    type: "certification",
    tags: ["typescript", "certification"],
    relatedLinks: [
      { title: "TypeScript Documentation", url: "https://www.typescriptlang.org/docs" },
      { title: "Certification Verification", url: "https://certification.org/verify/123456" },
    ],
    notes: "TypeScript has significantly improved the quality of my code.",
  },
]

export interface RelatedLink {
  title: string
  url: string
}

export interface MilestoneFormProps {
  milestoneId?: number
  isEditing?: boolean
}

/**
 * Renders a form for creating or editing a milestone entry, supporting fields for title, description, date, type, tags, notes, and related links.
 *
 * The form initializes with existing milestone data when editing, provides validation for required fields, and allows dynamic management of tags and related links. On submission, it logs the milestone data and navigates to the appropriate page based on the editing state.
 *
 * @param milestoneId - The ID of the milestone to edit, if applicable.
 * @param isEditing - Whether the form is in editing mode. Defaults to false.
 */
export function MilestoneForm({ milestoneId, isEditing = false }: MilestoneFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [type, setType] = useState("project")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [notes, setNotes] = useState("")
  const [relatedLinks, setRelatedLinks] = useState<RelatedLink[]>([])
  const [newLinkTitle, setNewLinkTitle] = useState("")
  const [newLinkUrl, setNewLinkUrl] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load milestone data if editing
  useEffect(() => {
    if (isEditing && milestoneId) {
      const milestone = milestones.find((m) => m.id === milestoneId)
      if (milestone) {
        setTitle(milestone.title)
        setDescription(milestone.description)
        setDate(new Date(milestone.date))
        setType(milestone.type)
        setSelectedTags(milestone.tags)
        setNotes(milestone.notes || "")
        setRelatedLinks(milestone.relatedLinks || [])
      }
    }
  }, [isEditing, milestoneId])

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

  const handleAddLink = () => {
    if (newLinkTitle.trim() && newLinkUrl.trim()) {
      setRelatedLinks([...relatedLinks, { title: newLinkTitle, url: newLinkUrl }])
      setNewLinkTitle("")
      setNewLinkUrl("")
    }
  }

  const handleRemoveLink = (index: number) => {
    setRelatedLinks(relatedLinks.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!date) {
      newErrors.date = "Date is required"
    }

    if (!type) {
      newErrors.type = "Type is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // In a real app, you would save the milestone to your database
    console.log({
      id: isEditing ? milestoneId : Date.now(),
      title,
      description,
      date: date ? format(date, "MMMM d, yyyy") : "",
      type,
      tags: selectedTags,
      notes,
      relatedLinks,
    })

    // Navigate back to milestones page or milestone detail
    if (isEditing && milestoneId) {
      router.push(`/timeline/milestones/${milestoneId}`)
    } else {
      router.push("/timeline/milestones")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Milestone" : "Milestone Details"}</CardTitle>
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
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
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
              {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
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
              {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
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
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes or reflections..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
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

          <div className="space-y-2">
            <Label>Related Links (Optional)</Label>
            <div className="space-y-2">
              {relatedLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={link.title} disabled className="flex-1" />
                  <Input value={link.url} disabled className="flex-1" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveLink(index)}
                    type="button"
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove link</span>
                  </Button>
                </div>
              ))}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Input placeholder="Link Title" value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)} />
              <Input
                placeholder="URL (https://...)"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleAddLink} type="button">
              Add Link
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (isEditing && milestoneId) {
                router.push(`/timeline/milestones/${milestoneId}`)
              } else {
                router.push("/timeline/milestones")
              }
            }}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit">{isEditing ? "Save Changes" : "Create Milestone"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
