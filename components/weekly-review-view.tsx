"use client"
import { Calendar, CheckCircle2, Clock, Tag } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

// Sample data
const weeklyData = {
  entries: 12,
  tags: 8,
  topTags: [
    { name: "react", count: 5 },
    { name: "next.js", count: 4 },
    { name: "tailwind", count: 3 },
    { name: "design", count: 2 },
  ],
  dailyEntries: [
    { day: "Mon", count: 2 },
    { day: "Tue", count: 3 },
    { day: "Wed", count: 1 },
    { day: "Thu", count: 2 },
    { day: "Fri", count: 3 },
    { day: "Sat", count: 0 },
    { day: "Sun", count: 1 },
  ],
  goals: [
    { name: "Daily entries", current: 12, target: 14, progress: 85 },
    { name: "Learning topics", current: 8, target: 10, progress: 80 },
    { name: "Project work", current: 5, target: 5, progress: 100 },
  ],
}

export function WeeklyReviewView() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyData.entries}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Tags</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyData.tags}</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Active Day</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tuesday</div>
            <p className="text-xs text-muted-foreground">3 entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1/3</div>
            <p className="text-xs text-muted-foreground">33% completion rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your daily log entries for the past week</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={weeklyData.dailyEntries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Tags</CardTitle>
              <CardDescription>Most used tags this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.topTags.map((tag) => (
                  <div key={tag.name} className="flex items-center">
                    <div className="w-[100px] flex-none">
                      <Badge variant="outline">{tag.name}</Badge>
                    </div>
                    <div className="flex-1">
                      <Progress value={(tag.count / weeklyData.entries) * 100} className="h-2" />
                    </div>
                    <div className="ml-4 w-[30px] flex-none text-right text-sm">{tag.count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Goals</CardTitle>
              <CardDescription>Track your progress towards weekly goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weeklyData.goals.map((goal) => (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{goal.name}</span>
                        {goal.progress === 100 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
