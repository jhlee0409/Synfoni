"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, Calendar, ChevronRight, Filter, PlusCircle, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample milestone data
const milestones = [
  {
    id: 1,
    date: "January 15, 2025",
    title: "Started Learning React",
    description: "Began the journey with React fundamentals and component architecture.",
    type: "learning",
    tags: ["react", "learning"],
  },
  {
    id: 2,
    date: "February 10, 2025",
    title: "First Next.js Project",
    description: "Created my first Next.js application with basic routing and data fetching.",
    type: "project",
    tags: ["next.js", "project"],
  },
  {
    id: 3,
    date: "March 5, 2025",
    title: "Mastered Tailwind CSS",
    description: "Completed advanced Tailwind CSS course and implemented custom design system.",
    type: "skill",
    tags: ["tailwind", "css", "design"],
  },
  {
    id: 4,
    date: "April 20, 2025",
    title: "Full-Stack Application",
    description: "Developed a full-stack application with Next.js, Prisma, and PostgreSQL.",
    type: "project",
    tags: ["next.js", "prisma", "database"],
  },
  {
    id: 5,
    date: "May 1, 2025",
    title: "Open Source Contribution",
    description: "Made my first significant contribution to an open source project on GitHub.",
    type: "achievement",
    tags: ["open-source", "github"],
  },
  {
    id: 6,
    date: "May 15, 2025",
    title: "TypeScript Certification",
    description: "Earned official certification in TypeScript advanced concepts.",
    type: "certification",
    tags: ["typescript", "certification"],
  },
]

// Milestone types with icons
const milestoneTypes = [
  { value: "all", label: "All Types" },
  { value: "project", label: "Project Completion" },
  { value: "learning", label: "Learning Achievement" },
  { value: "certification", label: "Certification" },
  { value: "skill", label: "Skill Mastery" },
  { value: "achievement", label: "Achievement" },
]

// All unique tags from milestones
const allTags = Array.from(new Set(milestones.flatMap((milestone) => milestone.tags)))

/**
 * Displays a list of milestones with interactive filtering, searching, sorting, and tabbed categorization.
 *
 * Users can filter milestones by search query, type, and tags, sort them by date, and view them grouped by category tabs. The component provides controls for clearing filters and adding new milestones, and displays milestone details in card layouts.
 */
export function MilestonesView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState("newest")

  // Filter milestones based on search, type, and tags
  const filteredMilestones = milestones
    .filter((milestone) => {
      // Search filter
      if (
        searchQuery &&
        !milestone.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !milestone.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Type filter
      if (selectedType !== "all" && milestone.type !== selectedType) {
        return false
      }

      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some((tag) => milestone.tags.includes(tag))) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedType("all")
    setSelectedTags([])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search milestones..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button asChild>
          <Link href="/timeline/milestones/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Milestone
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Milestones</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort:</span>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {milestoneTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 8).map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {allTags.length > 8 && (
              <Badge variant="outline" className="cursor-pointer">
                +{allTags.length - 8} more
              </Badge>
            )}
          </div>

          {(searchQuery || selectedType !== "all" || selectedTags.length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {filteredMilestones.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Award className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No milestones found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your filters or add a new milestone.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/timeline/milestones/new">Add Milestone</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMilestones.map((milestone) => (
                  <Card key={milestone.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{milestone.date}</span>
                      </div>
                      <CardTitle className="line-clamp-1 text-base">{milestone.title}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        Type: {milestoneTypes.find((t) => t.value === milestone.type)?.label || milestone.type}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm">{milestone.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {milestone.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <Button variant="ghost" size="sm" className="ml-auto" asChild>
                        <Link href={`/timeline/milestones/${milestone.id}`}>
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {milestones
                .filter((m) => m.type === "project")
                .map((milestone) => (
                  <Card key={milestone.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{milestone.date}</span>
                      </div>
                      <CardTitle className="line-clamp-1 text-base">{milestone.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm">{milestone.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {milestone.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <Button variant="ghost" size="sm" className="ml-auto" asChild>
                        <Link href={`/timeline/milestones/${milestone.id}`}>
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {milestones
                .filter((m) => m.type === "skill")
                .map((milestone) => (
                  <Card key={milestone.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{milestone.date}</span>
                      </div>
                      <CardTitle className="line-clamp-1 text-base">{milestone.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm">{milestone.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {milestone.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <Button variant="ghost" size="sm" className="ml-auto" asChild>
                        <Link href={`/timeline/milestones/${milestone.id}`}>
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="mt-6">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {milestones
                .filter((m) => m.type === "certification")
                .map((milestone) => (
                  <Card key={milestone.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{milestone.date}</span>
                      </div>
                      <CardTitle className="line-clamp-1 text-base">{milestone.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm">{milestone.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {milestone.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <Button variant="ghost" size="sm" className="ml-auto" asChild>
                        <Link href={`/timeline/milestones/${milestone.id}`}>
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
