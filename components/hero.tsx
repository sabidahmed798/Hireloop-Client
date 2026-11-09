import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseIcon,
  ChartColumnIcon,
  ClockIcon,
  StarIcon,
  UserSearchIcon,
} from "lucide-react"

import { HeroSearchForm } from "@/components/hero-search-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// The three "trending position" pills under the search bar.
const TRENDING_POSITIONS = [
  { label: "Product Designer", href: "/browse-jobs" },
  { label: "AI Engineering", href: "/browse-jobs" },
  { label: "Dev-ops Engineer", href: "/browse-jobs" },
]

// The four stat cards at the bottom.
// icon size/value/label — change the numbers here and the cards update.
const STATS = [
  { icon: ClockIcon, value: "50K", label: "Active Jobs" },
  { icon: ChartColumnIcon, value: "12K", label: "Companies" },
  { icon: UserSearchIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
]

// A repeating CSS starfield so the dark sky above the globe has some sparkle.
const STARFIELD = {
  backgroundImage: [
    "radial-gradient(1px 1px at 25px 65px, rgba(255,255,255,0.65), transparent)",
    "radial-gradient(1px 1px at 150px 120px, rgba(255,255,255,0.4), transparent)",
    "radial-gradient(2px 2px at 230px 190px, rgba(205,210,255,0.5), transparent)",
    "radial-gradient(1px 1px at 300px 40px, rgba(255,255,255,0.55), transparent)",
  ].join(","),
  backgroundSize: "340px 240px",
}

// The hero section of the home page.
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative stars in the dark sky, behind all the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-3/4"
        style={STARFIELD}
      />

      {/* --------------------------------------------------------------
          PART 1: badge, title, text, search bar and trending pills
      -------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 pt-10 text-center sm:pt-14">
        {/* "50,000+ new jobs this month" pill, with thin lines on both sides */}
        <div className="flex w-full items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-border sm:block"
          />
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-2 py-1.5">
            <span className="grid size-6 place-items-center rounded-md bg-muted text-orange-400">
              <BriefcaseIcon className="size-3.5" />
            </span>
            <span className="text-sm font-semibold text-foreground">
              50,000+
            </span>
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              New jobs this month
            </span>
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-border sm:block"
          />
        </div>

        {/* Big title */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* Short description */}
        <p className="max-w-xl text-sm text-pretty text-muted-foreground sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster
        </p>

        {/* The search bar (client component in hero-search-form.tsx) */}
        <HeroSearchForm />

        {/* Trending pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">
            Trending Position
          </span>
          {TRENDING_POSITIONS.map((position) => (
            <Badge
              key={position.label}
              variant="outline"
              className="h-6 rounded-full py-1"
              render={<Link href={position.href} />}
            >
              {position.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------------
          PART 2: glowing globe with text and stat cards on top of it
      -------------------------------------------------------------- */}
      <div className="relative -mt-12 aspect-[4/5] sm:-mt-16 sm:aspect-[3/2] lg:-mt-20 lg:aspect-[2/1]">
        {/* The globe artwork: a fixed-aspect "window" that only shows the
            glowing top arc, cropping away the plain black bottom half */}
        <Image
          src="/images/globe-hero.png"
          alt=""
          aria-hidden="true"
          width={1440}
          height={1242}
          priority
          className="block h-full w-full object-cover object-top"
        />

        {/* Text floating just below the lit edge of the globe */}
        <p className="absolute inset-x-0 top-[18%] mx-auto max-w-md px-4 text-center text-xl text-pretty text-foreground sm:top-[26%] sm:text-2xl lg:top-[32%]">
          Assisting over <span className="font-bold">15,000 job seekers</span>{" "}
          find their dream positions.
        </p>

        {/* Stat cards pinned to the bottom of the globe */}
        <div className="absolute inset-x-0 bottom-3 px-4 sm:bottom-5 sm:px-8 lg:bottom-6 lg:px-12">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
            {STATS.map((stat) => (
              <Card
                key={stat.label}
                className="h-28 bg-card/90 md:h-36 lg:h-40 md:gap-6"
              >
                <CardHeader>
                  <stat.icon className="size-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <span className="text-3xl font-bold text-foreground sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
