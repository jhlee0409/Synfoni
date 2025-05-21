"use client"

import { ChevronRight, FileText, LineChart, PlusCircle, Target, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AppShell } from "@/components/app-shell"
import { WeeklyActivityChart } from "@/components/weekly-activity-chart"

// Sample data
const weeklyData = {
  logCount: 14,
  activeDays: 5,
  completedGoals: 8,
  totalGoals: 10,
  tags: [
    { name: "react", count: 8 },
    { name: "typescript", count: 6 },
    { name: "next.js", count: 5 },
    { name: "tailwind", count: 4 },
  ],
  dailyEntries: [
    { day: "Mon", count: 3 },
    { day: "Tue", count: 5 },
    { day: "Wed", count: 2 },
    { day: "Thu", count: 0 },
    { day: "Fri", count: 4 },
    { day: "Sat", count: 0 },
    { day: "Sun", count: 0 },
  ],
}

const recentLogs = [
  {
    id: 1,
    title: "Building a Type-Safe API with tRPC",
    date: "May 14, 2025",
    tags: ["typescript", "api", "trpc"],
    excerpt: "Implemented a fully type-safe API using tRPC with Next.js...",
  },
  {
    id: 2,
    title: "Optimizing React Components with useMemo",
    date: "May 12, 2025",
    tags: ["react", "performance", "hooks"],
    excerpt: "Explored performance optimizations using useMemo and useCallback...",
  },
  {
    id: 3,
    title: "Setting Up a CI/CD Pipeline with GitHub Actions",
    date: "May 10, 2025",
    tags: ["devops", "github", "automation"],
    excerpt: "Created a workflow for automated testing and deployment...",
  },
  {
    id: 4,
    title: "Implementing Dark Mode with Tailwind CSS",
    date: "May 8, 2025",
    tags: ["tailwind", "css", "design"],
    excerpt: "Added dark mode support to my personal website using Tailwind...",
  },
]

const quickActions = [
  {
    icon: FileText,
    label: "Add New Log Entry",
    href: "/daily-log/new",
  },
  {
    icon: Target,
    label: "Set Weekly Goals",
    href: "/weekly-review/goals",
  },
  {
    icon: LineChart,
    label: "View Timeline",
    href: "/timeline",
  },
  {
    icon: User,
    label: "Manage Public Logs",
    href: "/public-logs",
  },
  {
    icon: PlusCircle,
    label: "Add Milestone",
    href: "/timeline/milestones/new",
  },
]

export function Dashboard() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your development journey.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* This Week Section */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
              <CardDescription>Your activity summary for the week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Log Entries</p>
                  <p className="text-2xl font-bold">{weeklyData.logCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Active Days</p>
                  <p className="text-2xl font-bold">{weeklyData.activeDays}/7</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Goals Completed</p>
                  <p className="text-sm text-muted-foreground">
                    {weeklyData.completedGoals}/{weeklyData.totalGoals}
                  </p>
                </div>
                <Progress value={(weeklyData.completedGoals / weeklyData.totalGoals) * 100} />
              </div>

              <div className="flex flex-wrap gap-2">
                {weeklyData.tags.map((tag) => (
                  <Badge key={tag.name} variant="secondary" className="flex items-center gap-1">
                    {tag.name}
                    <span className="ml-1 rounded-full bg-primary/10 px-1.5 text-xs font-semibold">{tag.count}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/weekly-review">
                  View Weekly Review
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Growth Trends Section */}
          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
              <CardDescription>Your development activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <WeeklyActivityChart data={weeklyData.dailyEntries} />
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/timeline">
                  View Timeline
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions Section */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Shortcuts to common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, index) => (
                <Button key={index} className="w-full justify-start" variant="outline" asChild>
                  <a href={action.href}>
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </a>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Logs Section */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Logs</CardTitle>
                <CardDescription>Your latest development entries</CardDescription>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@username" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLogs.map((log) => (
                  <div key={log.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{log.title}</h3>
                      <span className="text-xs text-muted-foreground">{log.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{log.excerpt}</p>
                    <div className="flex flex-wrap gap-1">
                      {log.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {log.id !== recentLogs.length && <Separator className="mt-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/daily-log">
                  View All Logs
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
