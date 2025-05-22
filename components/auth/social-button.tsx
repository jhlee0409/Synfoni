"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

interface SocialButtonProps {
  children: React.ReactNode
  provider: "google" | "github" | "twitter"
  onClick?: () => void
}

export function SocialButton({ children, provider, onClick }: SocialButtonProps) {
  return (
    <Button variant="outline" type="button" className="w-full" onClick={onClick}>
      {children}
    </Button>
  )
}
