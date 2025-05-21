"use client"
import Link from "next/link"
import { Calendar, CheckCircle2, PlusCircle, Target, Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample goals data
const longTermGoals = [
  {
    id: 1,
    title: "Become a Full Stack Developer",
    description: "Master both frontend and backend technologies to build complete applications",
    progress: 65,
    targetDate: "December 2025",
    category: "career",
    milestones: [
      { id: 1, title: "Learn React", completed: true },
      { id: 2, title: "Master Next.js", completed: true },
      { id: 3, title: "Learn Node.js and Express", completed: true },
      { id: 4, title: "Master Database Design", completed: false },
      { id: 5, title: "Build 3 Full Stack Projects", completed: false },
    ],
  },
  {
    id: 2,
    title: "Contribute to Open Source",
    description: "Make meaningful contributions to open source projects",
    progress: 30,
    targetDate: "Ongoing",
    category: "community",
    milestones: [
      { id: 1, title: "First Pull Request", completed: true },
      { id: 2, title: "Contribute to a Major Project", completed: false },
      { id: 3, title: "Maintain Own Open Source Project", completed: false },
    ],
  },
  {
    id: 3,
    title: "Learn Cloud Architecture",
    description: "Understand and implement cloud-based solutions",
    progress: 20,
    targetDate: "June 2026",
    category: "learning",
    milestones: [
      { id: 1, title: "AWS Fundamentals", completed: true },
      { id: 2, title: "Deploy Applications to Cloud", completed: false },
      { id: 3, title: "Implement Serverless Architecture", completed: false },
      { id: 4, title: "Get AWS Certification", completed: false },
    ],
  },
]

const achievements = [
  {
    id: 1,
    title: "100 Days of Code",
    description: "Completed the 100 Days of Code challenge",
    date: "March 15, 2025",
    badge: "🏆 Consistency Champion",
  },
  {
    id: 2,
    title: "First Open Source Contribution",
    description: "Made first meaningful contribution to an open source project",
    date: "April 5, 2025",
    badge: "🌟 Open Source Contributor",
  },
  {
    id: 3,
    title: "Built First Full Stack App",
    description: "Designed and developed a complete full stack application",
    date: "February 20, 2025",
    badge: "🚀 Full Stack Developer",
  },
]

/**
 * Renders a tabbed interface displaying current goals, long-term goals, and achievements with progress indicators and milestone tracking.
 *
 * Provides interactive cards for weekly and monthly goals, a grid of long-term goals with milestone checklists, and a summary of achievements with progress toward upcoming targets. Navigation links allow users to set, view, or add goals and achievements.
 */
export function GoalsOverview() {
  return (
    <Tabs defaultValue="current">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="current">Current Goals</TabsTrigger>
        <TabsTrigger value="long-term">Long-term Goals</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
      </TabsList>

      <TabsContent value="current" className="mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Weekly Goals</h3>
          <Button asChild>
            <Link href="/weekly-review/goals">
              <PlusCircle className="mr-2 h-4 w-4" />
              Set Weekly Goals
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Week Progress</CardTitle>
            <CardDescription>May 16 - May 22, 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Overall Progress</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">60%</span>
                  <Progress value={60} className="h-2 w-[100px]" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Goals Completed</p>
                <p className="text-2xl font-bold">1/4</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Days Remaining</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/weekly-review/progress">View Weekly Progress</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Monthly Goals</h3>
          <Button variant="outline" asChild>
            <Link href="/goals/monthly">
              <PlusCircle className="mr-2 h-4 w-4" />
              Set Monthly Goals
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>May 2025</CardTitle>
            <CardDescription>Monthly development focus</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">Learn TypeScript Generics</p>
                <Badge variant="outline">Learning</Badge>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-sm text-muted-foreground">3 weeks in - making good progress</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">Build Portfolio Website</p>
                <Badge variant="outline">Project</Badge>
              </div>
              <Progress value={40} className="h-2" />
              <p className="text-sm text-muted-foreground">Design complete, starting development</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/goals/monthly">View All Monthly Goals</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="long-term" className="mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Long-term Development Goals</h3>
          <Button asChild>
            <Link href="/goals/long-term/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Long-term Goal
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {longTermGoals.map((goal) => (
            <Card key={goal.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{goal.category}</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{goal.targetDate}</span>
                  </div>
                </div>
                <CardTitle className="mt-2">{goal.title}</CardTitle>
                <CardDescription>{goal.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Key Milestones</span>
                    <ul className="space-y-1">
                      {goal.milestones.slice(0, 3).map((milestone) => (
                        <li key={milestone.id} className="flex items-center gap-2 text-sm">
                          {milestone.completed ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Target className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                          <span className={milestone.completed ? "line-through text-muted-foreground" : ""}>
                            {milestone.title}
                          </span>
                        </li>
                      ))}
                      {goal.milestones.length > 3 && (
                        <li className="text-xs text-muted-foreground">+{goal.milestones.length - 3} more milestones</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href={`/goals/long-term/${goal.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="achievements" className="mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Your Achievements</h3>
          <Button variant="outline" asChild>
            <Link href="/goals/achievements/all">View All</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="font-medium">
                    {achievement.badge}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{achievement.date}</span>
                  </div>
                </div>
                <CardTitle className="mt-2">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Trophy className="h-8 w-8 text-amber-500" />
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Achievement Progress</CardTitle>
            <CardDescription>Upcoming achievements you're working towards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">30 Day Coding Streak</p>
                <span className="text-sm">24/30 days</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">10 Open Source Contributions</p>
                <span className="text-sm">3/10 contributions</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">Complete 5 Projects</p>
                <span className="text-sm">2/5 projects</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
