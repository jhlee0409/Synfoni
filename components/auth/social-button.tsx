"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

interface SocialButtonProps {
  children: React.ReactNode
  provider: "google" | "github" | "twitter"
  onClick?: () => void
}

/**
 * Renders a full-width outlined button for social authentication providers.
 *
 * Displays the given {@link children} inside the button and attaches an optional click handler.
 *
 * @param provider - The social provider associated with the button ("google", "github", or "twitter").
 */
export function SocialButton({ children, provider, onClick }: SocialButtonProps) {
  return (
    <Button variant="outline" type="button" className="w-full" onClick={onClick}>
      {children}
    </Button>
  )
}
