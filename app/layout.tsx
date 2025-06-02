import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Synfoni - Developer Growth Tracker",
  description: "Track your development journey and growth",
    generator: 'v0.dev'
}

/**
 * Defines the root layout for the application, applying global font styles and theming.
 *
 * Wraps all child components with a theme provider that supports system theme detection and disables transitions during theme changes.
 *
 * @param children - The content to be rendered within the layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster richColors position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
