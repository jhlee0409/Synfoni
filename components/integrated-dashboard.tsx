"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, CheckCircle2, Clock, LineChart, PlusCircle, Tag, Target } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DailyLog, LongTermGoal, Milestone, WeeklyGoal } from "@/lib/types"

// Sample data
const sampleData = {
  dailyLogs: [
    {
      id: "log1",
      date: "2025-05-20",
      title: "React Component Optimization",
      content: "Learned about component optimization using memoization and useCallback",
      tags: ["react", "optimization", "performance"],
    },
    {
      id: "log2",
      date: "2025-05-19",
      title: "Learning Next.js Server Components",
      content: "Studied the differences between server and client components and how to use them",
      tags: ["next.js", "server-components"],
    },
  ] as DailyLog[],

  weeklyGoals: [
    {
      id: "wg1",
      title: "Learn React Performance Optimization",
      category: "learning",
      weekStartDate: "2025-05-15",
      weekEndDate: "2025-05-21",
      completed: false,
      progress: 70,
      tags: ["react", "optimization", "performance"],
      relatedMilestoneId: "ms1",
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
      relatedMilestoneId: "ms2",
    },
  ] as WeeklyGoal[],

  milestones: [
    {
      id: "ms1",
      title: "Master Advanced React Techniques",
      description: "Learn advanced React features and optimization techniques",
      date: "2025-06-15",
      type: "learning",
      tags: ["react", "advanced"],
      status: "in-progress",
      progress: 60,
      longTermGoalId: "ltg1",
    },
    {
      id: "ms2",
      title: "Complete Personal Portfolio Website",
      description: "Create a portfolio website showcasing personal projects and skills",
      date: "2025-07-01",
      type: "project",
      tags: ["portfolio", "design", "development"],
      status: "in-progress",
      progress: 40,
      longTermGoalId: "ltg2",
    },
  ] as Milestone[],

  longTermGoals: [
    {
      id: "ltg1",
      title: "Become a Frontend Expert",
      description: "Master advanced React and related technologies for professional use",
      category: "career",
      targetDate: "2025-12-31",
      tags: ["react", "frontend", "career"],
      status: "in-progress",
      progress: 45,
      milestoneIds: ["ms1"],
    },
    {
      id: "ltg2",
      title: "Transition to Full Stack Developer",
      description: "Learn backend technologies and complete full stack projects",
      category: "career",
      targetDate: "2026-06-30",
      tags: ["fullstack", "backend", "career"],
      status: "in-progress",
      progress: 30,
      milestoneIds: ["ms2"],
    },
  ] as LongTermGoal[],
}

export function IntegratedDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Automatic connection logic (would be handled by the server in a real app)
  const getRelatedItems = (item: DailyLog | WeeklyGoal | Milestone, type: string) => {
    if (type === "dailyToWeekly") {
      const dailyLog = item as DailyLog
      return sampleData.weeklyGoals.filter((goal) => goal.tags.some((tag) => dailyLog.tags.includes(tag)))
    } else if (type === "weeklyToMilestone") {
      const weeklyGoal = item as WeeklyGoal
      return sampleData.milestones.filter((milestone) => milestone.id === weeklyGoal.relatedMilestoneId)
    } else if (type === "milestoneToLongTerm") {
      const milestone = item as Milestone
      return sampleData.longTermGoals.filter((goal) => goal.id === milestone.longTermGoalId)
    }
    return []
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="daily">Daily Activities</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Goals</TabsTrigger>
          <TabsTrigger value="longterm">Long-term Goals</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Logs</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sampleData.dailyLogs.length}</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Goals</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sampleData.weeklyGoals.filter((g) => g.completed).length}/{sampleData.weeklyGoals.length}
                </div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Milestones</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sampleData.milestones.filter((m) => m.status === "completed").length}/{sampleData.milestones.length}
                </div>
                <p className="text-xs text-muted-foreground">In progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Long-term Goals</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    sampleData.longTermGoals.reduce((acc, goal) => acc + goal.progress, 0) /
                      sampleData.longTermGoals.length,
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Average progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Goals in Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Goals in Progress</CardTitle>
              <CardDescription>Progress of goals at all levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Long-term Goal Progress */}
              {sampleData.longTermGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{goal.category}</Badge>
                        <span>Target: {goal.targetDate || "Ongoing"}</span>
                      </div>
                    </div>
                    <span className="text-sm">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />

                  {/* Connected Milestones */}
                  <div className="ml-6 space-y-2 border-l border-dashed pl-4 pt-2">
                    {sampleData.milestones
                      .filter((m) => goal.milestoneIds.includes(m.id))
                      .map((milestone) => (
                        <div key={milestone.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                              <span className="text-sm font-medium">{milestone.title}</span>
                            </div>
                            <span className="text-xs">{milestone.progress}%</span>
                          </div>
                          <Progress value={milestone.progress} className="h-1.5" />

                          {/* Connected Weekly Goals */}
                          <div className="ml-4 space-y-1 border-l border-dotted pl-4 pt-1">
                            {sampleData.weeklyGoals
                              .filter((wg) => wg.relatedMilestoneId === milestone.id)
                              .map((weeklyGoal) => (
                                <div key={weeklyGoal.id} className="flex items-center gap-2">
                                  {weeklyGoal.completed ? (
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></div>
                                  )}
                                  <span className="text-xs">{weeklyGoal.title}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/goals">View All Goals</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Recent daily logs and related goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleData.dailyLogs.map((log) => {
                const relatedGoals = getRelatedItems(log, "dailyToWeekly") as WeeklyGoal[]

                return (
                  <div key={log.id} className="space-y-2 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{log.title}</h3>
                      <span className="text-sm text-muted-foreground">{log.date}</span>
                    </div>
                    <p className="text-sm">{log.content}</p>

                    <div className="flex flex-wrap gap-2">
                      {log.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {relatedGoals.length > 0 && (
                      <div className="mt-2 rounded-md bg-muted p-2">
                        <p className="text-xs font-medium">Related Goals:</p>
                        <div className="mt-1 space-y-1">
                          {relatedGoals.map((goal) => (
                            <div key={goal.id} className="flex items-center gap-2 text-xs">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                              <span>{goal.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/daily-log">View All Daily Logs</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Daily Activities Tab */}
        <TabsContent value="daily" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Daily Development Logs</h2>
            <Button asChild>
              <Link href="/daily-log/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Log
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Daily Log</CardTitle>
              <CardDescription>Record your development activities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                When you create a daily log, it will automatically connect to related weekly goals based on tags.
              </p>
              <div className="mt-4 flex justify-center">
                <Button asChild>
                  <Link href="/daily-log/new">Create New Log</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Logs</CardTitle>
              <CardDescription>Your recent daily development logs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleData.dailyLogs.map((log) => (
                <div key={log.id} className="space-y-2 rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{log.title}</h3>
                    <span className="text-sm text-muted-foreground">{log.date}</span>
                  </div>
                  <p className="text-sm">{log.content}</p>

                  <div className="flex flex-wrap gap-2">
                    {log.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/daily-log">View All Logs</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Weekly Goals Tab */}
        <TabsContent value="weekly" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Weekly Goals</h2>
            <Button asChild>
              <Link href="/weekly-review/goals">
                <PlusCircle className="mr-2 h-4 w-4" />
                Set Weekly Goals
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>This Week's Goals</CardTitle>
              <CardDescription>May 15 - May 21, 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleData.weeklyGoals.map((goal) => {
                const relatedMilestones = getRelatedItems(goal, "weeklyToMilestone") as Milestone[]

                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {goal.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        )}
                        <span className="font-medium">{goal.title}</span>
                      </div>
                      <Badge variant="outline">{goal.category}</Badge>
                    </div>
                    <Progress value={goal.progress} className="h-2" />

                    <div className="flex flex-wrap gap-2">
                      {goal.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {relatedMilestones.length > 0 && (
                      <div className="mt-2 rounded-md bg-muted p-2">
                        <p className="text-xs font-medium">Related Milestones:</p>
                        <div className="mt-1 space-y-1">
                          {relatedMilestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center gap-2 text-xs">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                              <span>{milestone.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/weekly-review/progress">View Weekly Progress</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Long-term Goals Tab */}
        <TabsContent value="longterm" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Long-term Goals & Milestones</h2>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/timeline/milestones/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Milestone
                </Link>
              </Button>
              <Button asChild>
                <Link href="/goals/long-term/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Long-term Goal
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Long-term Goals */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Long-term Development Goals</CardTitle>
                <CardDescription>Your long-term career development goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sampleData.longTermGoals.map((goal) => {
                  const relatedMilestones = sampleData.milestones.filter((m) => goal.milestoneIds.includes(m.id))

                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{goal.title}</h3>
                        <Badge variant="outline">{goal.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>

                      <div className="flex items-center justify-between text-sm">
                        <span>Progress: {goal.progress}%</span>
                        <span>Target: {goal.targetDate || "Ongoing"}</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />

                      <div className="flex flex-wrap gap-2">
                        {goal.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {relatedMilestones.length > 0 && (
                        <div className="mt-2 space-y-2 rounded-md border p-3">
                          <p className="text-sm font-medium">Milestones:</p>
                          {relatedMilestones.map((milestone) => (
                            <div key={milestone.id} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                                  <span className="text-sm">{milestone.title}</span>
                                </div>
                                <span className="text-xs">{milestone.progress}%</span>
                              </div>
                              <Progress value={milestone.progress} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/goals/long-term">View All Long-term Goals</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
                <CardDescription>Key development milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleData.milestones.map((milestone) => (
                  <div key={milestone.id} className="space-y-2 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{milestone.title}</h3>
                      <Badge variant="outline">{milestone.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <span>Progress: {milestone.progress}%</span>
                      <span>Date: {milestone.date}</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/timeline/milestones">View All Milestones</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Completed goals and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
                  <h3 className="text-lg font-medium">Achieve Your Goals!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Completed goals and milestones will appear here.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/goals/achievements">View Achievements</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
