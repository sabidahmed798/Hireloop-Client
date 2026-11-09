import Image from "next/image"
import Link from "next/link"

import { AuthDivider, AuthSocialButtons } from "@/components/auth-social"
import { SignInForm } from "@/components/sign-in-form"

export default function SignInPage() {
  return (
    <div className="grid gap-4">
      {/* The card: logo, then social options, then the email form */}
      <div className="rounded-2xl bg-card/90 p-6 shadow-lg ring-1 ring-foreground/10 backdrop-blur-sm sm:p-8">
        {/* Logo — click it to go back home */}
        <Link href="/" className="mx-auto block w-fit">
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
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue your job search on HireLoop
          </p>
        </div>

        {/* Fast options: social sign-in, then the email form below */}
        <div className="mt-6 grid gap-4">
          <AuthSocialButtons />
          <AuthDivider />
          <SignInForm />
        </div>
      </div>

      {/* Secondary link to go home */}
      <Link
        href="/"
        className="justify-self-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Back to home
      </Link>
    </div>
  )
}
