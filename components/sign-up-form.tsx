"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/auth-client"

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  // Toggles the eye icon to show/hide the password.
  const [showPassword, setShowPassword] = React.useState(false)
  // Shown for field-level or server-side errors.
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirmPassword") ?? "")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    const { data, error: authError } = await signUp.email({
      name,
      email,
      password,
      callbackURL: "/dashboard",
    })

    setIsLoading(false)

    if (authError) {
      setError(authError.message ?? "Something went wrong. Please try again.")
      return
    }

    // Registration succeeded — navigate to the dashboard (or wherever the
    // callbackURL resolves to after email verification if that's enabled).
    if (data?.user) {
      router.push("/dashboard")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Step 1: full name */}
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          required
          className="h-10"
        />
      </div>

      {/* Step 2: email */}
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="h-10"
        />
      </div>

      {/* Step 3: password (with a show/hide toggle) */}
      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            required
            minLength={8}
            className="h-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Step 4: confirm the password */}
      <div className="grid gap-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Repeat your password"
            autoComplete="new-password"
            required
            minLength={8}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "confirm-password-error" : undefined}
            className="h-10 pr-10"
            onChange={() => setError(null)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </button>
        </div>
        {error ? (
          <p id="confirm-password-error" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      {/* Step 5: submit */}
      <Button type="submit" disabled={isLoading} className="mt-2 h-10 w-full">
        {isLoading ? (
          <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
        ) : null}
        {isLoading ? "Creating account…" : "Create account"}
      </Button>

      {/* Toggle to the sign-in page */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
