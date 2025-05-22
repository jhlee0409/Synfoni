"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, BookOpen, Calendar, ChevronRight, Filter, Flame, Search, Star, TrendingUp, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicSharingSettings } from "@/components/public-sharing-settings"

// Sample data for public developers
const publicDevelopers = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Senior Frontend Developer",
    streak: 42,
    tags: ["react", "typescript", "next.js"],
    achievements: ["100 Days of Code", "Open Source Contributor"],
    recentLogs: [
      {
        id: 101,
        title: "Mastering React Server Components",
        date: "May 18, 2025",
        likes: 24,
        comments: 8,
      },
      {
        id: 102,
        title: "Building a Type-Safe API with tRPC",
        date: "May 15, 2025",
        likes: 18,
        comments: 5,
      },
    ],
    stats: {
      totalEntries: 187,
      weeklyAverage: 5.2,
      topTags: ["react", "typescript", "next.js"],
    },
  },
  {
    id: 2,
    name: "Sophia Chen",
    username: "sophiac",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Full Stack Developer",
    streak: 78,
    tags: ["node.js", "python", "aws"],
    achievements: ["AWS Certified", "30 Day Backend Challenge"],
    recentLogs: [
      {
        id: 201,
        title: "Implementing Serverless Functions with AWS Lambda",
        date: "May 19, 2025",
        likes: 32,
        comments: 12,
      },
      {
        id: 202,
        title: "Database Optimization Techniques I Learned This Week",
        date: "May 16, 2025",
        likes: 27,
        comments: 9,
      },
    ],
    stats: {
      totalEntries: 215,
      weeklyAverage: 6.8,
      topTags: ["aws", "serverless", "database"],
    },
  },
  {
    id: 3,
    name: "Marcus Williams",
    username: "marcusw",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Mobile Developer",
    streak: 31,
    tags: ["react-native", "flutter", "mobile"],
    achievements: ["Mobile App Launch", "UI Design Award"],
    recentLogs: [
      {
        id: 301,
        title: "Cross-Platform Animation Techniques",
        date: "May 17, 2025",
        likes: 19,
        comments: 7,
      },
      {
        id: 302,
        title: "Optimizing React Native Performance",
        date: "May 14, 2025",
        likes: 23,
        comments: 6,
      },
    ],
    stats: {
      totalEntries: 142,
      weeklyAverage: 4.5,
      topTags: ["react-native", "animation", "performance"],
    },
  },
]

// Sample trending topics
const trendingTopics = [
  { name: "react", count: 342 },
  { name: "typescript", count: 287 },
  { name: "ai", count: 256 },
  { name: "next.js", count: 198 },
  { name: "tailwind", count: 175 },
]

// Sample leaderboard data
const leaderboardData = [
  { name: "Sophia Chen", username: "sophiac", streak: 78, entries: 215 },
  { name: "David Kim", username: "davidk", streak: 65, entries: 198 },
  { name: "Alex Johnson", username: "alexj", streak: 42, entries: 187 },
  { name: "Emma Davis", username: "emmad", streak: 39, entries: 156 },
  { name: "Marcus Williams", username: "marcusw", streak: 31, entries: 142 },
]

/**
 * Renders the public developer community interface with tabs for discovering developers, viewing trending topics and logs, and checking the leaderboard, along with a toggleable view for managing public sharing settings.
 *
 * @remark
 * All data displayed is statically defined within the component; no asynchronous data fetching or filtering is performed.
 */
export function PublicLogsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Developer Community</h1>
            <p className="text-muted-foreground">Discover and learn from other developers' journeys</p>
          </div>
          <Button onClick={() => setShowSettings(!showSettings)}>
            {showSettings ? "View Community" : "My Public Settings"}
          </Button>
        </div>

        {!showSettings && (
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search developers, topics, or logs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {showSettings ? (
        <PublicSharingSettings />
      ) : (
        <Tabs defaultValue="discover">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {publicDevelopers.map((developer) => (
              <Card key={developer.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={developer.avatar || "/placeholder.svg"} alt={developer.name} />
                        <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{developer.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            @{developer.username}
                          </Badge>
                        </div>
                        <CardDescription>{developer.title}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">
                      <Flame className="h-3.5 w-3.5 text-primary" />
                      <span>{developer.streak} day streak</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1.5">
                    {developer.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {developer.achievements.map((achievement) => (
                      <div
                        key={achievement}
                        className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium"
                      >
                        <Award className="h-3 w-3 text-amber-500" />
                        {achievement}
                      </div>
                    ))}
                  </div>

                  <Separator className="my-3" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Recent Logs</h4>
                      <Link
                        href={`/public-logs/user/${developer.username}`}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        View all
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="space-y-2">
                      {developer.recentLogs.map((log) => (
                        <div key={log.id} className="rounded-md border p-2">
                          <div className="flex items-center justify-between">
                            <Link href={`/public-logs/entry/${log.id}`} className="text-sm font-medium hover:underline">
                              {log.title}
                            </Link>
                            <span className="text-xs text-muted-foreground">{log.date}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-3">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="h-3 w-3" />
                              {log.likes}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <BookOpen className="h-3 w-3" />
                              {log.comments}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {developer.stats.totalEntries} entries
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {developer.stats.weeklyAverage}/week
                    </span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/public-logs/user/${developer.username}`}>View Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>Popular topics in the developer community this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <Badge variant="outline" className="text-sm">
                            {topic.name}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{topic.count} mentions</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/public-logs/topics">
                    Explore All Topics
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Logs</CardTitle>
                <CardDescription>Highly rated developer logs from this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {publicDevelopers
                  .flatMap((dev) => dev.recentLogs)
                  .slice(0, 4)
                  .map((log) => (
                    <div key={log.id} className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <Link href={`/public-logs/entry/${log.id}`} className="font-medium hover:underline">
                          {log.title}
                        </Link>
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{log.date}</span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3" />
                            {log.likes}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <BookOpen className="h-3 w-3" />
                            {log.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Developer Leaderboard</CardTitle>
                <CardDescription>Top developers based on consistency and contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((developer, index) => (
                    <div key={developer.username} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                            index === 0
                              ? "bg-amber-500/20 text-amber-500"
                              : index === 1
                                ? "bg-slate-400/20 text-slate-400"
                                : index === 2
                                  ? "bg-amber-700/20 text-amber-700"
                                  : "bg-primary/10"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{developer.name}</div>
                          <div className="text-xs text-muted-foreground">@{developer.username}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-primary" />
                          <span>{developer.streak} days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{developer.entries} entries</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center justify-between rounded-md border bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Your Ranking: #42</span>
                  </div>
                  <Button size="sm">Improve Ranking</Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Challenges</CardTitle>
                <CardDescription>Join community challenges to boost your ranking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">7-Day Coding Streak</div>
                    <Badge>Active</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Log your coding progress every day for a week to earn bonus points
                  </p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress: 5/7 days</span>
                      <span>+500 points</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                      <div className="h-full w-[71%] bg-primary" />
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">TypeScript Deep Dive</div>
                    <Badge variant="outline">Starts in 2 days</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Complete 5 TypeScript-related logs to earn a special badge
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Join Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
