"use client"

import { useState } from "react"
import { PlusCircle, Tag } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data
const initialLogs = [
  {
    id: 1,
    date: "2025-05-13",
    content: "Learned about React Server Components and how they can improve performance.",
    tags: ["react", "learning"],
  },
  {
    id: 2,
    date: "2025-05-12",
    content: "Implemented a new feature using the Next.js App Router. The file-based routing system is very intuitive.",
    tags: ["next.js", "productivity"],
  },
  {
    id: 3,
    date: "2025-05-11",
    content: "Studied Tailwind CSS advanced concepts. Created a reusable component library for future projects.",
    tags: ["css", "tailwind", "design"],
  },
]

const allTags = ["react", "next.js", "css", "tailwind", "design", "learning", "productivity"]

export function DailyLogView() {
  const [logs, setLogs] = useState(initialLogs)
  const [newLog, setNewLog] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleAddLog = () => {
    if (newLog.trim()) {
      const newEntry = {
        id: logs.length + 1,
        date: new Date().toISOString().split("T")[0],
        content: newLog,
        tags: selectedTags,
      }
      setLogs([newEntry, ...logs])
      setNewLog("")
      setSelectedTags([])
    }
  }

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

  const toggleFilter = (tag: string) => {
    if (activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter((t) => t !== tag))
    } else {
      setActiveFilters([...activeFilters, tag])
    }
  }

  const filteredLogs = activeFilters.length
    ? logs.filter((log) => activeFilters.some((filter) => log.tags.includes(filter)))
    : logs

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Button asChild>
          <a href="/daily-log/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Log Entry
          </a>
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Filter by Tags</h3>
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])}>
              Clear Filters
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeFilters.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Entries</h3>
        {filteredLogs.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No entries found with the selected filters.
            </CardContent>
          </Card>
        ) : (
          filteredLogs.map((log) => (
            <Card key={log.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">
                    {new Date(log.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{log.content}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {log.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
