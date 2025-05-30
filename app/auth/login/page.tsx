import { LoginForm } from "@/components/auth/login-form";
import { AuthLayout } from "@/components/auth/auth-layout";

/**
 * Renders the login page with a layout and login form.
 *
 * Displays an authentication layout containing a title, description, and the login form for user credential entry.
 */
export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in or sign up using your GitHub account"
    >
      <LoginForm />
    </AuthLayout>
  );
}
