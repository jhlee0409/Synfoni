import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth/auth-layout"

/**
 * Renders a password reset page with a form for users to request a reset link via email.
 *
 * The page includes an email input field, a submit button, and a link to return to the login page.
 */
export default function ResetPasswordPage() {
  return (
    <AuthLayout title="Reset password" description="Enter your email to receive a password reset link">
      <div className="grid gap-6">
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" autoComplete="email" required />
            </div>
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </div>
        </form>
        <div className="text-center text-sm">
          <Link href="/auth/login" className="text-primary hover:underline">
            <ChevronLeft className="mr-1 inline-block h-3 w-3" />
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
