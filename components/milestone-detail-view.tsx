"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Edit, Share2, Tag, Trash } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Sample milestone data - in a real app, you would fetch this based on the ID
const milestones = [
  {
    id: 1,
    date: "January 15, 2025",
    title: "Started Learning React",
    description:
      "Began the journey with React fundamentals and component architecture. Completed the official React tutorial and built a small tic-tac-toe game. Started exploring the React ecosystem and understanding core concepts like components, props, and state.",
    type: "learning",
    tags: ["react", "learning"],
    relatedLinks: [
      { title: "React Documentation", url: "https://reactjs.org" },
      { title: "React Tutorial", url: "https://reactjs.org/tutorial/tutorial.html" },
    ],
    notes:
      "Initial learning curve was steep but the component model makes a lot of sense. Need to practice more with state management and hooks.",
    createdAt: "January 15, 2025",
    updatedAt: "January 16, 2025",
  },
  {
    id: 2,
    date: "February 10, 2025",
    title: "First Next.js Project",
    description:
      "Created my first Next.js application with basic routing and data fetching. Implemented server-side rendering and static site generation. Deployed the application to Vercel and set up continuous deployment.",
    type: "project",
    tags: ["next.js", "project"],
    relatedLinks: [
      { title: "Next.js Documentation", url: "https://nextjs.org/docs" },
      { title: "Project Repository", url: "https://github.com/username/project" },
      { title: "Live Demo", url: "https://project.vercel.app" },
    ],
    notes:
      "Next.js makes React development much more streamlined. The file-based routing system is intuitive and the built-in API routes are very convenient.",
    createdAt: "February 10, 2025",
    updatedAt: "February 12, 2025",
  },
  {
    id: 3,
    date: "March 5, 2025",
    title: "Mastered Tailwind CSS",
    description:
      "Completed advanced Tailwind CSS course and implemented custom design system. Created a component library using Tailwind CSS and published it as an npm package. Contributed to the Tailwind CSS community by sharing tips and tricks.",
    type: "skill",
    tags: ["tailwind", "css", "design"],
    relatedLinks: [
      { title: "Tailwind CSS Documentation", url: "https://tailwindcss.com/docs" },
      { title: "Component Library", url: "https://github.com/username/tailwind-components" },
    ],
    notes:
      "Tailwind CSS has completely changed how I approach styling. The utility-first approach is very productive once you get used to it.",
    createdAt: "March 5, 2025",
    updatedAt: "March 7, 2025",
  },
  {
    id: 4,
    date: "April 20, 2025",
    title: "Full-Stack Application",
    description:
      "Developed a full-stack application with Next.js, Prisma, and PostgreSQL. Implemented authentication, authorization, and CRUD operations. Set up a CI/CD pipeline and deployed the application to production.",
    type: "project",
    tags: ["next.js", "prisma", "database"],
    relatedLinks: [
      { title: "Prisma Documentation", url: "https://www.prisma.io/docs" },
      { title: "Project Repository", url: "https://github.com/username/fullstack-app" },
      { title: "Live Demo", url: "https://fullstack-app.vercel.app" },
    ],
    notes:
      "Building a full-stack application was challenging but rewarding. Prisma makes database operations much easier and type-safe.",
    createdAt: "April 20, 2025",
    updatedAt: "April 25, 2025",
  },
  {
    id: 5,
    date: "May 1, 2025",
    title: "Open Source Contribution",
    description:
      "Made my first significant contribution to an open source project on GitHub. Fixed a bug in a popular library and added a new feature. Pull request was merged and received positive feedback from the maintainers.",
    type: "achievement",
    tags: ["open-source", "github"],
    relatedLinks: [
      { title: "Pull Request", url: "https://github.com/org/repo/pull/123" },
      { title: "Project Repository", url: "https://github.com/org/repo" },
    ],
    notes:
      "Contributing to open source was intimidating at first, but the community was very welcoming. Looking forward to contributing more in the future.",
    createdAt: "May 1, 2025",
    updatedAt: "May 3, 2025",
  },
  {
    id: 6,
    date: "May 15, 2025",
    title: "TypeScript Certification",
    description:
      "Earned official certification in TypeScript advanced concepts. Completed a comprehensive course and passed the certification exam with a high score. Demonstrated proficiency in generics, type manipulation, and advanced type inference.",
    type: "certification",
    tags: ["typescript", "certification"],
    relatedLinks: [
      { title: "TypeScript Documentation", url: "https://www.typescriptlang.org/docs" },
      { title: "Certification Verification", url: "https://certification.org/verify/123456" },
    ],
    notes:
      "TypeScript has significantly improved the quality of my code. The static type checking catches many bugs before they even make it to runtime.",
    createdAt: "May 15, 2025",
    updatedAt: "May 15, 2025",
  },
]

// Milestone types with labels
const milestoneTypes: Record<string, string> = {
  project: "Project Completion",
  learning: "Learning Achievement",
  certification: "Certification",
  skill: "Skill Mastery",
  achievement: "Achievement",
}

interface MilestoneDetailViewProps {
  id: number
}

export function MilestoneDetailView({ id }: MilestoneDetailViewProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Find the milestone with the given ID
  const milestone = milestones.find((m) => m.id === id)

  if (!milestone) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold">Milestone not found</h1>
        <p className="text-muted-foreground">The milestone you're looking for doesn't exist or has been removed.</p>
        <Button className="mt-4" asChild>
          <Link href="/timeline/milestones">Back to Milestones</Link>
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    // In a real app, you would delete the milestone from your database
    console.log(`Deleting milestone with ID: ${id}`)

    // Navigate back to milestones page
    window.location.href = "/timeline/milestones"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/timeline/milestones">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Milestones
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/timeline/milestones/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the milestone and remove it from your
                  timeline.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{milestone.date}</span>
              </div>
              <CardTitle className="text-2xl">{milestone.title}</CardTitle>
              <CardDescription>{milestoneTypes[milestone.type] || milestone.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{milestone.description}</p>

              <div className="flex flex-wrap gap-2">
                {milestone.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {milestone.notes && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium">Notes</h3>
                    <p className="text-sm">{milestone.notes}</p>
                  </div>
                </>
              )}

              {milestone.relatedLinks && milestone.relatedLinks.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium">Related Links</h3>
                    <ul className="space-y-1">
                      {milestone.relatedLinks.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <div className="flex flex-col gap-1">
                <span>Created: {milestone.createdAt}</span>
                {milestone.updatedAt !== milestone.createdAt && <span>Last updated: {milestone.updatedAt}</span>}
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Milestone Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@username" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Created by</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span>{milestoneTypes[milestone.type] || milestone.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span>{milestone.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tags</span>
                  <span>{milestone.tags.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Related Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones
                .filter((m) => m.id !== id && m.tags.some((tag) => milestone.tags.includes(tag)))
                .slice(0, 3)
                .map((relatedMilestone) => (
                  <div key={relatedMilestone.id} className="space-y-1">
                    <Link href={`/timeline/milestones/${relatedMilestone.id}`} className="font-medium hover:underline">
                      {relatedMilestone.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{relatedMilestone.date}</p>
                  </div>
                ))}

              {milestones.filter((m) => m.id !== id && m.tags.some((tag) => milestone.tags.includes(tag))).length ===
                0 && <p className="text-sm text-muted-foreground">No related milestones found.</p>}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/timeline/milestones">View All Milestones</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
