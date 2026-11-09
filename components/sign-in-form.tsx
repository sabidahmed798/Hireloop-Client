"use client"

import * as React from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// The sign-in form.
// For now the handler just collects the form data and logs it.
// TODO: send the data to better-auth when the functionality is wired up.
export function SignInForm() {
  // "isLoading" fakes a short wait so the button can show a spinner.
  const [isLoading, setIsLoading] = React.useState(false)
  // Toggles the eye icon to show/hide the password.
  const [showPassword, setShowPassword] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // Collect everything the user typed.
    const formData = new FormData(event.currentTarget)
    const data = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    }

    console.log("Sign in data:", data)

    // Fake a network round-trip until the real auth is connected.
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsLoading(false)
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
        />
      </div>

      {/* Step 2: password (with a show/hide toggle) */}
      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="h-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        </div>
      </div>

      {/* Step 3: submit */}
      <Button type="submit" disabled={isLoading} className="mt-2 h-10 w-full">
        {isLoading ? <LoaderCircleIcon className="animate-spin" data-icon="inline-start" /> : null}
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
