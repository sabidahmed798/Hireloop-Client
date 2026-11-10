"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BriefcaseIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderCircleIcon,
  SearchIcon,
  ShieldIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/auth-client"

type Role = "seeker" | "recruiter" | "admin"

const ROLES: {
  value: Role
  label: string
  description: string
  icon: React.ReactNode
}[] = [
  {
    value: "seeker",
    label: "Job Seeker",
    description: "I'm looking for a job",
    icon: <SearchIcon className="size-4" />,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "I'm hiring talent",
    icon: <BriefcaseIcon className="size-4" />,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Platform administrator",
    icon: <ShieldIcon className="size-4" />,
  },
]

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  // Role defaults to "seeker" — the most common case.
  const [role, setRole] = React.useState<Role>("seeker")

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
      role,
      callbackURL: "/",
    })

    setIsLoading(false)

    if (authError) {
      setError(authError.message ?? "Something went wrong. Please try again.")
      return
    }

    if (data?.user) {
      router.push("/")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Role picker — shown first so the user picks context up front */}
      <div className="grid gap-2">
        <span className="text-sm font-medium">I am a…</span>
        <div className="grid grid-cols-3 gap-2">
          {ROLES.map(({ value, label, description, icon }) => {
            const isSelected = role === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value)}
                aria-pressed={isSelected}
                className={[
                  "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
                ].join(" ")}
              >
                {icon}
                <span className="text-xs leading-none font-semibold">
                  {label}
                </span>
                <span className="text-[10px] leading-tight opacity-75">
                  {description}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Full name */}
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

      {/* Email */}
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

      {/* Password */}
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

      {/* Confirm password */}
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
            aria-describedby={error ? "signup-error" : undefined}
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
          <p
            id="signup-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isLoading} className="mt-1 h-10 w-full">
        {isLoading ? (
          <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
        ) : null}
        {isLoading ? "Creating account…" : "Create account"}
      </Button>

      {/* Link to sign-in */}
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
