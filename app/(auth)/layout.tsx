import * as React from "react"

// Shared layout for the sign-in and sign-up pages.
// A dark page with a subtle starfield and a purple glow behind the card,
// matching the look of the hero section.
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative grid min-h-svh place-items-center overflow-hidden px-4 py-10">
      {/* Starfield in the sky, like the hero (pure CSS, no image) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(1px 1px at 25px 65px, rgba(255,255,255,0.65), transparent)",
            "radial-gradient(1px 1px at 150px 120px, rgba(255,255,255,0.4), transparent)",
            "radial-gradient(2px 2px at 230px 190px, rgba(205,210,255,0.5), transparent)",
            "radial-gradient(1px 1px at 300px 40px, rgba(255,255,255,0.55), transparent)",
          ].join(","),
          backgroundSize: "340px 240px",
        }}
      />
      {/* Soft purple glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-sm">{children}</div>
    </div>
  )
}
