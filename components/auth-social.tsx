"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

// Social sign-in buttons shown on both auth pages.
// For now they just log which provider was chosen.
// TODO: hook them up to better-auth's socialOnly endpoints.
const GOOGLE_LOGO = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29a7.18 7.18 0 0 1 0-4.58V6.62H1.29a11.99 11.99 0 0 0 0 10.76l3.98-3.09Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
    />
  </svg>
)

// The divider with a small label in the middle.
export function AuthDivider() {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
      <span className="uppercase tracking-wide">or continue with</span>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  )
}

// Google + GitHub buttons in a two-column row.
export function AuthSocialButtons() {
  function handleClick(provider: string) {
    console.log("Social sign-in provider:", provider)
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => handleClick("google")}
        className="h-10 justify-center"
      >
        {GOOGLE_LOGO}
        Google
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => handleClick("github")}
        className="h-10 justify-center"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
          <path d="M12 1C5.922 1 1 5.922 1 12c0 5.103 3.31 9.43 7.915 10.96.578.108.792-.243.792-.542v-1.905c-3.21.698-3.89-1.548-3.89-1.548-.526-1.337-1.285-1.692-1.285-1.692-1.05-.718.08-.703.08-.703 1.162.082 1.774 1.192 1.774 1.192 1.033 1.772 2.71 1.26 3.37.963.09-.748.404-1.26.734-1.55-2.565-.291-5.264-1.283-5.264-5.71 0-1.26.45-2.292 1.19-3.096-.12-.292-.516-1.466.112-3.055 0 0 .97-.31 3.18 1.185a11.05 11.05 0 0 1 2.9-.383c.984 0 1.976.132 2.9.383 2.21-1.495 3.18-1.185 3.18-1.185.628 1.589.232 2.763.112 3.055.74.804 1.19 1.836 1.19 3.096 0 4.439-2.704 5.414-5.28 5.703.416.357.784 1.06.784 2.136v3.164c0 .3.212.655.8.542A11.99 11.99 0 0 0 23 12c0-6.078-4.922-11-11-11Z" />
        </svg>
        GitHub
      </Button>
    </div>
  )
}
