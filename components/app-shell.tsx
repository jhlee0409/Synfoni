"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, FileText, LayoutDashboard, LineChart, Moon, Settings, Sun, Target, User } from "lucide-react"

import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AppShellProps {
  children: ReactNode
}

/**
 * Provides the main application layout shell with a sidebar navigation, header, and content area.
 *
 * Renders a persistent sidebar with nested navigation menus, a sticky header with theme toggle and user avatar, and displays the provided {@link children} as the main content. The sidebar highlights the active route based on the current pathname and supports nested submenus for sections like Daily Log, Weekly Review, Timeline, and Goals.
 *
 * @param children - The content to display within the main area of the application shell.
 */
export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex h-14 items-center px-4">
              <h1 className="text-lg font-semibold">Synfoni</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Daily Log Section */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/daily-log" || pathname.startsWith("/daily-log/")}>
                  <Link href="/daily-log">
                    <FileText className="h-4 w-4" />
                    <span>Daily Log</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/daily-log/new"}>
                      <Link href="/daily-log/new">New Entry</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Weekly Review Section */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/weekly-review" || pathname.startsWith("/weekly-review/")}
                >
                  <Link href="/weekly-review">
                    <Calendar className="h-4 w-4" />
                    <span>Weekly Review</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/weekly-review/goals"}>
                      <Link href="/weekly-review/goals">Set Goals</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/weekly-review/progress"}>
                      <Link href="/weekly-review/progress">Track Progress</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Timeline Section with Milestones */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/timeline" || pathname.startsWith("/timeline/")}>
                  <Link href="/timeline">
                    <LineChart className="h-4 w-4" />
                    <span>Timeline</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === "/timeline/milestones" || pathname.startsWith("/timeline/milestones/")}
                    >
                      <Link href="/timeline/milestones">Milestones</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/timeline/milestones/new"}>
                      <Link href="/timeline/milestones/new">Add Milestone</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Goals Section */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/goals" || pathname.startsWith("/goals/")}>
                  <Link href="/goals">
                    <Target className="h-4 w-4" />
                    <span>Goals</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/goals/long-term"}>
                      <Link href="/goals/long-term">Long-term</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/goals/achievements"}>
                      <Link href="/goals/achievements">Achievements</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              {/* Public Logs */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/public-logs" || pathname.startsWith("/public-logs/")}
                >
                  <Link href="/public-logs">
                    <User className="h-4 w-4" />
                    <span>Public Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border">
            <div className="p-4">
              <SidebarMenuButton asChild isActive={pathname === "/settings" || pathname.startsWith("/settings/")}>
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <span className="text-sm font-medium">Synfoni</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@username" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </header>
            <main className="flex-1 p-4 sm:p-6">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
