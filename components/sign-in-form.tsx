"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/auth-client"

export function SignInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  // Toggles the eye icon to show/hide the password.
  const [showPassword, setShowPassword] = React.useState(false)
  // Holds any server-side error message (wrong password, user not found, etc.)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    const { data, error: authError } = await signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/",
    })

    console.log("sign In", data, error)
    setIsLoading(false)

    if (authError) {
      setError(
        authError.message ?? "Invalid email or password. Please try again."
      )
      return
    }

    if (data?.user) {
      router.push("/")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Step 1: email */}
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
          onChange={() => setError(null)}
        />
      </div>

      {/* Step 2: password (with a show/hide toggle) */}
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            tabIndex={-1}
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
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
      </div>

      {/* Server-side error banner */}
      {error ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      {/* Step 3: submit */}
      <Button type="submit" disabled={isLoading} className="h-10 w-full">
        {isLoading ? (
          <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
        ) : null}
        {isLoading ? "Signing in…" : "Sign in"}
      </Button>

      {/* Toggle to the sign-up page */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  )
}
