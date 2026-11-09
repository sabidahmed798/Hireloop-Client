import Image from "next/image"
import Link from "next/link"

import { AuthDivider, AuthSocialButtons } from "@/components/auth-social"

import { SignUpForm } from "@/components/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="grid gap-4">
      {/* Signup Card */}
      <div className="rounded-2xl bg-card/90 p-6 shadow-lg ring-1 ring-foreground/10 backdrop-blur-sm sm:p-8">
        {/* Logo */}
        <Link
          href="/"
          className="mx-auto block w-fit"
          aria-label="HireLoop home"
        >
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            className="h-9 w-auto"
            priority
          />

          <span className="sr-only">Back to home</span>
        </Link>

        {/* Heading */}
        <div className="mt-5 grid gap-1 text-center">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Create your account
          </h1>

          <p className="text-sm text-muted-foreground">
            Join HireLoop and land your next role — faster
          </p>
        </div>

        {/* Signup Options */}
        <div className="mt-6 grid gap-4">
          <AuthSocialButtons />

          <AuthDivider />

          <SignUpForm />
        </div>
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="justify-self-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Back to home
      </Link>
    </div>
  )
}
