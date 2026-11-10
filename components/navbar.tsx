"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSession, signOut } from "@/lib/auth-client"

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/browse-jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function SiteNavbar() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  console.log("user session in navber", session)
  const handleSignOut = async () => {
    await signOut()
  }
  return (
    <header className="sticky top-0 z-50 p-2 sm:p-3">
      <nav className="flex h-14 w-full items-center justify-between gap-3 rounded-xl border border-border bg-card/80 px-3 shadow-sm backdrop-blur-sm sm:px-5">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            className="h-7 w-auto"
            priority
          />
          <span className="sr-only">HireLoop</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Separator orientation="vertical" className="h-5 self-center!" />
          {session?.user ? (
            <>
              <span>Welcome, {session.user.name}</span>
              <Link
                onClick={handleSignOut}
                href="/sign-in"
                className="rounded-md px-3 py-2 text-sm text-primary transition-colors hover:opacity-80"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-md px-3 py-2 text-sm text-primary transition-colors hover:opacity-80"
              >
                Sign in
              </Link>
              <Button
                size="lg"
                nativeButton={false}
                className="ml-1"
                render={<Link href="/sign-up" />}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-xs">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="HireLoop"
                  width={154}
                  height={44}
                  className="h-7 w-auto"
                />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-1 flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 p-4">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-center text-sm text-primary transition-colors hover:opacity-80"
              >
                Sign in
              </Link>
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/sign-up" onClick={() => setOpen(false)} />}
              >
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
