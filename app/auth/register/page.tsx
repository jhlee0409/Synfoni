import { RegisterForm } from "@/components/auth/register-form"
import { AuthLayout } from "@/components/auth/auth-layout"

/**
 * Renders the registration page with a layout and registration form for creating a Synfoni account.
 *
 * @returns The registration page component.
 */
export default function RegisterPage() {
  return (
    <AuthLayout title="Create an account" description="Enter your information to create a Synfoni account">
      <RegisterForm />
    </AuthLayout>
  )
}
