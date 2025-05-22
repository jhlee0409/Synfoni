"use client"

import { Award, BookOpen, Calendar, ExternalLink, Flame, Github, Star, Tag, TrendingUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample user data - in a real app, you would fetch this based on the username
const userData = {
  name: "Alex Johnson",
  username: "alexj",
  title: "Senior Frontend Developer",
  bio: "Frontend developer specializing in React and TypeScript. Currently learning Rust and WebAssembly. Sharing my journey and helping others learn.",
  avatar: "/placeholder.svg?height=100&width=100",
  streak: 42,
  joinedDate: "January 2025",
  stats: {
    totalEntries: 187,
    weeklyAverage: 5.2,
    topTags: ["react", "typescript", "next.js"],
  },
  achievements: [
    { name: "100 Days of Code", date: "March 2025", icon: Calendar },
    { name: "Open Source Contributor", date: "February 2025", icon: Github },
    { name: "TypeScript Expert", date: "April 2025", icon: Award },
  ],
  links: [
    { name: "GitHub", url: "https://github.com/alexj" },
    { name: "Portfolio", url: "https://alexj.dev" },
    { name: "Twitter", url: "https://twitter.com/alexj" },
  ],
  recentLogs: [
    {
      id: 101,
      title: "Mastering React Server Components",
      date: "May 18, 2025",
      excerpt:
        "Today I spent time learning about React Server Components and how they can improve performance by reducing the JavaScript bundle size...",
      tags: ["react", "performance", "next.js"],
      likes: 24,
      comments: 8,
    },
    {
      id: 102,
      title: "Building a Type-Safe API with tRPC",
      date: "May 15, 2025",
      excerpt:
        "I implemented a fully type-safe API using tRPC with Next.js. The end-to-end type safety is amazing and has significantly reduced bugs...",
      tags: ["typescript", "api", "trpc"],
      likes: 18,
      comments: 5,
    },
    {
      id: 103,
      title: "Optimizing React Components with useMemo",
      date: "May 12, 2025",
      excerpt:
        "Today I explored performance optimizations using useMemo and useCallback hooks. I found some interesting patterns that help prevent unnecessary re-renders...",
      tags: ["react", "performance", "hooks"],
      likes: 15,
      comments: 3,
    },
  ],
  popularTags: [
    { name: "react", count: 42 },
    { name: "typescript", count: 38 },
    { name: "next.js", count: 27 },
    { name: "performance", count: 19 },
    { name: "hooks", count: 15 },
    { name: "api", count: 12 },
    { name: "css", count: 10 },
    { name: "testing", count: 8 },
  ],
}

interface UserProfileViewProps {
  username: string
}

/**
 * Renders a comprehensive user profile page with sections for personal information, achievements, popular tags, recent logs, activity, and milestones.
 *
 * Displays static sample data for the specified {@link username}, organized into a sidebar and a main content area with tabbed views.
 *
 * @param username - The username of the profile to display.
 *
 * @returns A React element representing the user profile interface.
 *
 * @remark This component currently uses static sample data and does not fetch dynamic user information.
 */
export function UserProfileView({ username }: UserProfileViewProps) {
  // In a real app, you would fetch the user data based on the username
  // For now, we'll just use the sample data
  const user = userData

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{user.name}'s Profile</h1>
          <Button variant="outline" size="sm">
            Follow
          </Button>
        </div>
        <p className="text-muted-foreground">Viewing public development logs and achievements</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{user.name}</CardTitle>
                <CardDescription className="flex flex-col items-center gap-1">
                  <Badge variant="outline">@{user.username}</Badge>
                  <span className="mt-1">{user.title}</span>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm">{user.bio}</p>

              <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {user.joinedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-primary" />
                  {user.streak} day streak
                </span>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-2xl font-bold">{user.stats.totalEntries}</div>
                  <div className="text-xs text-muted-foreground">Entries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{user.streak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{user.stats.weeklyAverage}</div>
                  <div className="text-xs text-muted-foreground">Weekly Avg</div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">External Links</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {user.links.map((link) => (
                    <Button key={link.name} variant="outline" size="sm" className="h-8" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.name}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.achievements.map((achievement) => (
                <div key={achievement.name} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <achievement.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">{achievement.date}</div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View All Achievements
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.popularTags.map((tag) => (
                  <Badge key={tag.name} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag.name}
                    <span className="ml-1 rounded-full bg-primary/10 px-1.5 text-xs font-semibold">{tag.count}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="logs">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
            </TabsList>

            <TabsContent value="logs" className="space-y-4 mt-4">
              {user.recentLogs.map((log) => (
                <Card key={log.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{log.title}</CardTitle>
                      <span className="text-xs text-muted-foreground">{log.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{log.excerpt}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {log.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3.5 w-3.5" />
                        {log.likes}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5" />
                        {log.comments}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/public-logs/entry/${log.id}`}>Read More</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <div className="flex justify-center">
                <Button variant="outline">Load More Logs</Button>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Graph</CardTitle>
                  <CardDescription>Contribution activity over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] rounded-md border bg-muted/50 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Activity graph visualization would appear here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Earned achievement:</span> 30 Day Streak
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Published log:</span> Mastering React Server Components
                      </p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Reached milestone:</span> 100 Log Entries
                      </p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    View Full Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Development Milestones</CardTitle>
                  <CardDescription>Key achievements in the developer's journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative border-l pl-6 pt-2">
                    <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <div className="mb-1 text-sm font-medium">Mastered TypeScript Generics</div>
                    <div className="mb-2 text-xs text-muted-foreground">April 2025</div>
                    <p className="text-sm">
                      Finally got comfortable with advanced TypeScript generics and type manipulation. Created a library
                      of utility types for my projects.
                    </p>
                  </div>

                  <div className="relative border-l pl-6 pt-2">
                    <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <div className="mb-1 text-sm font-medium">Launched First Open Source Project</div>
                    <div className="mb-2 text-xs text-muted-foreground">March 2025</div>
                    <p className="text-sm">
                      Released my first open source library for React animations. Already has 200+ stars on GitHub and
                      several contributors.
                    </p>
                  </div>

                  <div className="relative border-l pl-6 pt-2">
                    <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <div className="mb-1 text-sm font-medium">Completed Advanced React Course</div>
                    <div className="mb-2 text-xs text-muted-foreground">February 2025</div>
                    <p className="text-sm">
                      Finished an in-depth course on advanced React patterns, state management, and performance
                      optimization techniques.
                    </p>
                  </div>

                  <div className="relative border-l pl-6 pt-2">
                    <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <div className="mb-1 text-sm font-medium">Started Learning Web Development</div>
                    <div className="mb-2 text-xs text-muted-foreground">January 2025</div>
                    <p className="text-sm">
                      Began my journey into web development with HTML, CSS, and JavaScript fundamentals.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
