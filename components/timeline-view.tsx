"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

// Sample data
const timelineData = [
  { date: "Jan", react: 2, nextjs: 1, tailwind: 3, design: 0 },
  { date: "Feb", react: 3, nextjs: 2, tailwind: 2, design: 1 },
  { date: "Mar", react: 5, nextjs: 3, tailwind: 1, design: 2 },
  { date: "Apr", react: 4, nextjs: 5, tailwind: 2, design: 3 },
  { date: "May", react: 6, nextjs: 4, tailwind: 3, design: 2 },
]

const milestones = [
  {
    id: 1,
    date: "January 15, 2025",
    title: "Started Learning React",
    description: "Began the journey with React fundamentals and component architecture.",
    tags: ["react", "learning"],
  },
  {
    id: 2,
    date: "February 10, 2025",
    title: "First Next.js Project",
    description: "Created my first Next.js application with basic routing and data fetching.",
    tags: ["next.js", "project"],
  },
  {
    id: 3,
    date: "March 5, 2025",
    title: "Mastered Tailwind CSS",
    description: "Completed advanced Tailwind CSS course and implemented custom design system.",
    tags: ["tailwind", "css", "design"],
  },
  {
    id: 4,
    date: "April 20, 2025",
    title: "Full-Stack Application",
    description: "Developed a full-stack application with Next.js, Prisma, and PostgreSQL.",
    tags: ["next.js", "prisma", "database"],
  },
]

export function TimelineView() {
  const [timeRange, setTimeRange] = useState("6m")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Growth Timeline</h3>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Development</CardTitle>
          <CardDescription>Track your progress in different technologies over time</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="react" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="nextjs" stroke="#82ca9d" />
                <Line type="monotone" dataKey="tailwind" stroke="#ffc658" />
                <Line type="monotone" dataKey="design" stroke="#ff8042" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Heatmap</CardTitle>
          <CardDescription>Your coding and learning activity over time</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="react" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="nextjs" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="tailwind" stackId="1" stroke="#ffc658" fill="#ffc658" />
                <Area type="monotone" dataKey="design" stackId="1" stroke="#ff8042" fill="#ff8042" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Key Milestones</h3>
          <div className="flex gap-2">
            <Button size="sm" asChild>
              <Link href="/timeline/milestones">View All Milestones</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/timeline/milestones/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Milestone
              </Link>
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{milestone.date}</span>
                </div>
                <CardTitle className="text-base mt-1">{milestone.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{milestone.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {milestone.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
