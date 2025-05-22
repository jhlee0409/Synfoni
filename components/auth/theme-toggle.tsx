"use client"

import { Moon, Sun } from "lucide-react"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

/**
 * Renders a button that toggles between light and dark themes.
 *
 * Displays animated sun and moon icons to indicate the current theme, and includes an accessible label for screen readers.
 */
export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
